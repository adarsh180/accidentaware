import { NextResponse } from 'next/server';
import crypto from 'crypto';
import { razorpayConfig } from '@/lib/razorpay';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = body;

    // Verify the payment signature
    const text = `${razorpay_order_id}|${razorpay_payment_id}`;
    const generated_signature = crypto
      .createHmac('sha256', razorpayConfig.key_secret)
      .update(text)
      .digest('hex');

    if (generated_signature === razorpay_signature) {
      return NextResponse.json(
        { success: true, message: 'Payment verified successfully' },
        { status: 200 }
      );
    } else {
      return NextResponse.json(
        { success: false, error: 'Invalid payment signature' },
        { status: 400 }
      );
    }
  } catch (error) {
    console.error('Error verifying payment:', error);
    return NextResponse.json(
      { success: false, error: 'Payment verification failed' },
      { status: 500 }
    );
  }
}