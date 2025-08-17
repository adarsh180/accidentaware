'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { useCart } from '@/lib/cart-context';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

export function Cart() {
  const [isOpen, setIsOpen] = useState(false);
  const { state, dispatch } = useCart();
  const router = useRouter();

  const handleUpdateQuantity = (productId: string, quantity: number) => {
    if (quantity < 1) return;
    dispatch({
      type: 'UPDATE_QUANTITY',
      payload: { productId, quantity }
    });
  };

  const handleRemoveItem = (productId: string) => {
    dispatch({
      type: 'REMOVE_FROM_CART',
      payload: productId
    });
  };

  const handleCheckout = () => {
    setIsOpen(false);
    router.push('/checkout');
  };

  const totalItems = state.items.reduce((sum, item) => sum + item.quantity, 0);

  if (!isOpen) {
    return (
      <button
        className="fixed right-4 bottom-4 bg-cyan-600 text-white p-4 rounded-full shadow-lg hover:bg-cyan-700 transition-colors"
        onClick={() => setIsOpen(true)}
      >
        <div className="relative">
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            viewBox="0 0 24 24"
          >
            <path d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
          </svg>
          {totalItems > 0 && (
            <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
              {totalItems}
            </span>
          )}
        </div>
      </button>
    );
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-end">
      <div className="bg-white w-full max-w-md h-full flex flex-col">
        <div className="flex items-center justify-between p-4 border-b">
          <h2 className="text-xl font-semibold">Shopping Cart {totalItems > 0 && `(${totalItems})`}</h2>
          <button
            onClick={() => setIsOpen(false)}
            className="text-gray-500 hover:text-gray-700"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {state.items.length === 0 ? (
            <p className="text-center text-gray-500">Your cart is empty</p>
          ) : (
            state.items.map((item) => (
              <Card key={item.product.id} className="p-4">
                <div className="flex gap-4">
                  <div className="relative w-20 h-20">
                    <Image
                      src={item.product.images[0]}
                      alt={item.product.name}
                      fill
                      className="object-cover rounded"
                    />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold">{item.product.name}</h3>
                    <p className="text-cyan-600 font-medium">₹{item.product.price}</p>
                    <div className="flex items-center gap-2 mt-2">
                      <button
                        className="w-6 h-6 rounded-full border flex items-center justify-center"
                        onClick={() => handleUpdateQuantity(item.product.id, item.quantity - 1)}
                      >
                        -
                      </button>
                      <span>{item.quantity}</span>
                      <button
                        className="w-6 h-6 rounded-full border flex items-center justify-center"
                        onClick={() => handleUpdateQuantity(item.product.id, item.quantity + 1)}
                      >
                        +
                      </button>
                      <button
                        className="ml-auto text-red-500 hover:text-red-700"
                        onClick={() => handleRemoveItem(item.product.id)}
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                </div>
              </Card>
            ))
          )}
        </div>

        {state.items.length > 0 && (
          <div className="border-t p-4 space-y-4">
            <div className="flex items-center justify-between font-semibold">
              <span>Total:</span>
              <span>₹{state.total}</span>
            </div>
            <Button
              className="w-full bg-cyan-600 hover:bg-cyan-700 text-white"
              onClick={handleCheckout}
            >
              Proceed to Checkout
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}