// src/app/api/payment/callback/route.js
// Midtrans Payment Notification Handler (Webhook)

import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import crypto from 'crypto';
import { logError, logInfo } from '@/utils/logger';

// Initialize Supabase Admin (server-side)
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

function buildResponse(success, data = null, error = null, status = 200) {
  return NextResponse.json(
    { success, data, error },
    { status }
  );
}

// Verify Midtrans signature
const verifySignature = (orderId, statusCode, grossAmount, serverKey) => {
  const payload = orderId + statusCode + grossAmount + serverKey;
  const signature = crypto.createHash('sha512').update(payload).digest('hex');
  return signature;
};

export async function POST(request) {
  try {
    const body = await request.json();

    const {
      order_id,
      transaction_status,
      fraud_status,
      status_code,
      gross_amount,
      signature_key,
    } = body;

    const serverKey = process.env.MIDTRANS_SERVER_KEY;
    if (!serverKey) {
      logError('PaymentCallback', new Error('MIDTRANS_SERVER_KEY is not configured'));
      return buildResponse(false, null, 'Payment gateway is not configured', 500);
    }

    // Verify signature from Midtrans
    const expectedSignature = verifySignature(order_id, status_code, gross_amount, serverKey);

    if (signature_key !== expectedSignature) {
      logError('PaymentCallback', new Error('Invalid signature'), {
        order_id,
        status_code,
        gross_amount,
      });
      return buildResponse(false, null, 'Invalid signature', 403);
    }

    // Extract transaction ID from order_id (format: TRX-{id}-{timestamp})
    const parts = order_id.split('-');
    const transactionId = parts[1];

    // Determine payment status
    let paymentStatus = 'Pending';

    if (transaction_status === 'capture' || transaction_status === 'settlement') {
      if (fraud_status === 'accept' || !fraud_status) {
        paymentStatus = 'Paid';
      }
    } else if (
      transaction_status === 'cancel' ||
      transaction_status === 'deny' ||
      transaction_status === 'expire'
    ) {
      paymentStatus = 'Failed';
    } else if (transaction_status === 'pending') {
      paymentStatus = 'Pending';
    }

    // Update transaction in Supabase (idempotent: same update can be applied multiple times)
    const { error, data } = await supabase
      .from('transactions')
      .update({
        payment_status: paymentStatus,
        status: paymentStatus === 'Paid' ? 'Done' : undefined,
        payment_updated_at: new Date().toISOString(),
        midtrans_response: JSON.stringify(body),
      })
      .eq('id', transactionId)
      .select('id, payment_status')
      .maybeSingle();

    if (error) {
      logError('PaymentCallback', error);
      return buildResponse(false, null, 'Database update failed', 500);
    }

    const result = {
      transactionId,
      paymentStatus,
      updated: !!data,
    };

    logInfo('PaymentCallback', 'Updated transaction', result);
    return buildResponse(true, result);
  } catch (error) {
    logError('PaymentCallback', error);
    return buildResponse(false, null, error.message || 'Callback failed', 500);
  }
}

// Allow GET for webhook verification/health checks
export async function GET() {
  return buildResponse(true, {
    status: 'Midtrans callback endpoint active',
    timestamp: new Date().toISOString(),
  });
}

