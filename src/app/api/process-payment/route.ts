import { NextResponse } from 'next/server';
import { razorpayConfig } from '@/lib/razorpay';
import Razorpay from 'razorpay';
import { auth } from '@/auth';
import { prisma } from '@/lib/prisma';
import type { Prisma } from '@prisma/client';

const razorpay = new Razorpay({
  key_id: razorpayConfig.key_id,
  key_secret: razorpayConfig.key_secret,
});

export async function POST(request: Request) {
  try {
    const session = await auth();
    if (!session?.user) {
      return NextResponse.json(
        { success: false, message: 'Unauthorized' },
        { status: 401 }
      );
    }

    const body = await request.json();
    const { orderId, paymentId, signature } = body;

    // Verify the payment with Razorpay
    const payment = await razorpay.payments.fetch(paymentId);
    
    if (payment.status !== 'captured') {
      return NextResponse.json(
        { success: false, message: 'Payment not captured' },
        { status: 400 }
      );
    }

    // Save the order in the database using raw query with proper typing
    const [newOrder] = await prisma.$queryRaw<[{ id: string; amount: number; status: string }]>`
      INSERT INTO "Order" ("userId", "razorpayOrderId", "razorpayPaymentId", "amount", "status", "items", "createdAt", "updatedAt")
      VALUES (${session.user.id}, ${orderId}, ${paymentId}, ${Number(payment.amount) / 100}, 'COMPLETED', ${payment.notes || {}}, NOW(), NOW())
      RETURNING id, amount, status
    `;

    return NextResponse.json(
      { 
        success: true, 
        message: 'Payment processed successfully',
        order: {
          id: newOrder.id,
          amount: newOrder.amount,
          status: newOrder.status
        }
      },
      { status: 200 }
    );

  } catch (error) {
    console.error('Payment processing error:', error);
    return NextResponse.json(
      { success: false, message: 'Payment processing failed' },
      { status: 500 }
    );
  }
}