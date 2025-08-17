'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';

export default function CheckoutSuccessPage() {
  const router = useRouter();

  useEffect(() => {
    // Clear any sensitive payment data from localStorage if any
    localStorage.removeItem('paymentIntent');
  }, []);

  return (
    <div className="max-w-4xl mx-auto px-4 py-16 text-center">
      <div className="mb-8">
        <svg
          className="w-16 h-16 text-green-500 mx-auto mb-4"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M5 13l4 4L19 7"
          />
        </svg>
        <h1 className="text-3xl font-bold mb-4">Order Placed Successfully!</h1>
        <p className="text-gray-600 mb-8">
          Thank you for your purchase. We'll send you an email with your order details shortly.
        </p>
      </div>

      <div className="space-y-4">
        <Button
          onClick={() => router.push('/product')}
          className="bg-cyan-600 hover:bg-cyan-700 text-white"
        >
          Continue Shopping
        </Button>
      </div>
    </div>
  );
}