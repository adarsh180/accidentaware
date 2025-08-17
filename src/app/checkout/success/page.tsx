'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { useCart } from '@/lib/cart-context';

export default function CheckoutSuccessPage() {
  const router = useRouter();
  const { dispatch } = useCart();

  useEffect(() => {
    // Clear cart after successful payment
    dispatch({ type: 'CLEAR_CART' });
    // Clear any sensitive payment data from localStorage if any
    localStorage.removeItem('paymentIntent');
    
    // Redirect to orders page after 3 seconds
    const timer = setTimeout(() => {
      router.push('/orders');
    }, 3000);
    
    return () => clearTimeout(timer);
  }, [dispatch, router]);

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
        <p className="text-gray-600 mb-4">
          Thank you for your purchase. We'll send you an email with your order details shortly.
        </p>
        <p className="text-sm text-gray-500 mb-8">
          Redirecting to your orders in 3 seconds...
        </p>
      </div>

      <div className="flex gap-4 justify-center">
        <Button
          onClick={() => router.push('/orders')}
          className="bg-cyan-600 hover:bg-cyan-700 text-white"
        >
          View My Orders
        </Button>
        <Button
          onClick={() => router.push('/product')}
          variant="outline"
        >
          Continue Shopping
        </Button>
      </div>
    </div>
  );
}