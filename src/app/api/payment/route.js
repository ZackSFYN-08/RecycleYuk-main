// src/app/api/payment/route.js
import { NextResponse } from "next/server";
import Midtrans from "midtrans-client"; // Ubah require jadi import

export async function POST(request) {
  // 1. Terima data dari Frontend
  const { id, amount, firstName, email, title } = await request.json();

  // 2. Inisialisasi Midtrans
  const snap = new Midtrans.Snap({
    isProduction: false,
    serverKey: process.env.MIDTRANS_SERVER_KEY,
  });

  // 3. Pastikan amount adalah integer (bulat) untuk mata uang IDR
  const grossAmount = Math.round(amount);

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
        name: title ? title.substring(0, 50) : "Layanan Kebersihan", // Fallback name
      },
    ],
    customer_details: {
      first_name: firstName || "Pelanggan",
      email: email || "customer@example.com",
    },
    credit_card: {
      secure: true,
    },
  };

  try {
    const transaction = await snap.createTransaction(parameter);
    return NextResponse.json({ token: transaction.token });
  } catch (error) {
    console.error("Midtrans Error:", error.message); // Log di terminal server
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
