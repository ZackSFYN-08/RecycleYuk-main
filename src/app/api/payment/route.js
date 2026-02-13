// src/app/api/payment/route.js
import { NextResponse } from 'next/server';
import Midtrans from 'midtrans-client';
import { logError } from '@/utils/logger';

function buildResponse(success, data = null, error = null, status = 200) {
  return NextResponse.json(
    { success, data, error },
    { status }
  );
}

export async function POST(request) {
  try {
    // 1. Terima data dari Frontend
    const { id, amount, firstName, email, title } = await request.json();

    if (!id || !amount) {
      return buildResponse(false, null, 'Missing required payment parameters', 400);
    }

    const serverKey = process.env.MIDTRANS_SERVER_KEY;
    if (!serverKey) {
      console.error('[Payment] MIDTRANS_SERVER_KEY is not configured');
      return buildResponse(false, null, 'Payment gateway is not configured', 500);
    }

    // 2. Inisialisasi Midtrans
    const snap = new Midtrans.Snap({
      isProduction: process.env.NODE_ENV === 'production',
      serverKey,
    });

    // 3. Pastikan amount adalah integer (bulat) untuk mata uang IDR
    const grossAmount = Math.round(Number(amount));
    if (!Number.isFinite(grossAmount) || grossAmount <= 0) {
      return buildResponse(false, null, 'Invalid payment amount', 400);
    }

    // 4. Konfigurasi Parameter
    const parameter = {
      transaction_details: {
        order_id: `TRX-${id}-${Date.now()}`, // Prefix TRX lebih umum
        gross_amount: grossAmount,
      },
      item_details: [
        {
          id: String(id), // Pastikan string
          price: grossAmount,
          quantity: 1,
          name: title ? title.substring(0, 50) : 'Layanan Kebersihan', // Fallback name
        },
      ],
      customer_details: {
        first_name: firstName || 'Pelanggan',
        email: email || 'customer@example.com',
      },
      credit_card: {
        secure: true,
      },
    };

    const transaction = await snap.createTransaction(parameter);

    return buildResponse(true, { token: transaction.token }, null, 200);
  } catch (error) {
    logError('Payment', error);
    return buildResponse(false, null, error.message || 'Payment initiation failed', 500);
  }
}
