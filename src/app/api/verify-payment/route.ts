import { NextResponse } from 'next/server';
import crypto from 'crypto';
import { razorpayConfig } from '@/lib/razorpay';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth.config';
import { prisma } from '@/lib/prisma';

export async function POST(request: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature, amount, items } = body;

    // Verify the payment signature
    const text = `${razorpay_order_id}|${razorpay_payment_id}`;
    const generated_signature = crypto
      .createHmac('sha256', razorpayConfig.key_secret)
      .update(text)
      .digest('hex');

    if (generated_signature === razorpay_signature) {
      // Save order to database
      const order = await prisma.order.create({
        data: {
          userId: session.user.id,
          razorpayOrderId: razorpay_order_id,
          razorpayPaymentId: razorpay_payment_id,
          amount: amount || 0,
          status: 'completed',
          items: JSON.stringify(items || [])
        }
      });

      return NextResponse.json(
        { success: true, message: 'Payment verified successfully', orderId: order.id },
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