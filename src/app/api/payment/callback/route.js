// src/app/api/payment/callback/route.js
// Midtrans Payment Notification Handler (Webhook)

import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import crypto from 'crypto';

// Initialize Supabase Admin (server-side)
const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

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
            signature_key
        } = body;

        // Verify signature from Midtrans
        const serverKey = process.env.MIDTRANS_SERVER_KEY;
        const expectedSignature = verifySignature(order_id, status_code, gross_amount, serverKey);

        if (signature_key !== expectedSignature) {
            console.error('Invalid signature');
            return NextResponse.json({ error: 'Invalid signature' }, { status: 403 });
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
        } else if (transaction_status === 'cancel' || transaction_status === 'deny' || transaction_status === 'expire') {
            paymentStatus = 'Failed';
        } else if (transaction_status === 'pending') {
            paymentStatus = 'Pending';
        }

        // Update transaction in Supabase
        const { error } = await supabase
            .from('transactions')
            .update({
                payment_status: paymentStatus,
                status: paymentStatus === 'Paid' ? 'Done' : undefined,
                payment_updated_at: new Date().toISOString(),
                midtrans_response: JSON.stringify(body)
            })
            .eq('id', transactionId);

        if (error) {
            console.error('Supabase update error:', error);
            return NextResponse.json({ error: 'Database update failed' }, { status: 500 });
        }

        // Return OK to Midtrans
        return NextResponse.json({
            status: 'ok',
            message: `Transaction ${transactionId} updated to ${paymentStatus}`
        });

    } catch (error) {
        console.error('Callback error:', error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

// Allow GET for webhook verification
export async function GET() {
    return NextResponse.json({
        status: 'Midtrans callback endpoint active',
        timestamp: new Date().toISOString()
    });
}
