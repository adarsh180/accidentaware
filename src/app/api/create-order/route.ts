import { NextResponse } from 'next/server';
import Razorpay from 'razorpay';
import { razorpayConfig, formatAmountForRazorpay } from '@/lib/razorpay';

const razorpay = new Razorpay({
  key_id: razorpayConfig.key_id,
  key_secret: razorpayConfig.key_secret,
});

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { amount, receipt } = body;

    const razorpayAmount = formatAmountForRazorpay(amount);

    if (razorpayAmount < 100) {
      return NextResponse.json(
        { success: false, error: 'Amount must be at least ₹1' },
        { status: 400 }
      );
    }

    const options = {
      amount: razorpayAmount,
      currency: razorpayConfig.currency,
      receipt,
    };

    console.log('Creating Razorpay order with options:', options);
    const order = await razorpay.orders.create(options);

    return NextResponse.json(
      { success: true, order },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error creating Razorpay order:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to create order' },
      { status: 500 }
    );
  }
}