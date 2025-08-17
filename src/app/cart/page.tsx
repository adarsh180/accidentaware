'use client';

import { useCart } from '@/lib/cart-context';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function CartPage() {
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
    router.push('/checkout');
  };

  if (state.items.length === 0) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-16 text-center">
        <div className="space-y-6">
          <div className="text-6xl">🛒</div>
          <h1 className="text-3xl font-bold text-gray-900">Your cart is empty</h1>
          <p className="text-gray-600">Add some helmets to get started!</p>
          <Link href="/product">
            <Button className="bg-cyan-600 hover:bg-cyan-700 text-white">
              Browse Products
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Shopping Cart ({state.items.reduce((sum, item) => sum + item.quantity, 0)} items)</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-4">
          {state.items.map((item) => (
            <Card key={item.product.id} className="p-6">
              <div className="flex gap-6">
                <div className="relative w-32 h-32 flex-shrink-0">
                  <Image
                    src={item.product.images[0]}
                    alt={item.product.name}
                    fill
                    className="object-cover rounded-lg"
                  />
                </div>
                <div className="flex-1 space-y-4">
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900">{item.product.name}</h3>
                    <p className="text-gray-600 mt-1">{item.product.description}</p>
                    <p className="text-sm text-gray-500 mt-1">Category: {item.product.category}</p>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <span className="text-lg font-semibold text-cyan-600">₹{item.product.price}</span>
                      <div className="flex items-center gap-3">
                        <button
                          className="w-8 h-8 rounded-full border-2 border-gray-300 flex items-center justify-center hover:border-cyan-500 transition-colors"
                          onClick={() => handleUpdateQuantity(item.product.id, item.quantity - 1)}
                        >
                          -
                        </button>
                        <span className="font-medium text-lg w-8 text-center">{item.quantity}</span>
                        <button
                          className="w-8 h-8 rounded-full border-2 border-gray-300 flex items-center justify-center hover:border-cyan-500 transition-colors"
                          onClick={() => handleUpdateQuantity(item.product.id, item.quantity + 1)}
                        >
                          +
                        </button>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-4">
                      <span className="text-lg font-bold">₹{item.product.price * item.quantity}</span>
                      <button
                        className="text-red-500 hover:text-red-700 font-medium transition-colors"
                        onClick={() => handleRemoveItem(item.product.id)}
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>

        <div className="lg:col-span-1">
          <Card className="p-6 sticky top-4">
            <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span>Subtotal ({state.items.reduce((sum, item) => sum + item.quantity, 0)} items)</span>
                <span>₹{state.total}</span>
              </div>
              <div className="flex justify-between">
                <span>Shipping</span>
                <span className="text-green-600">FREE</span>
              </div>
              <div className="border-t pt-3">
                <div className="flex justify-between items-center">
                  <span className="text-xl font-bold">Total</span>
                  <span className="text-2xl font-bold text-cyan-600">₹{state.total}</span>
                </div>
              </div>
            </div>
            <Button
              className="w-full mt-6 bg-cyan-600 hover:bg-cyan-700 text-white py-3"
              onClick={handleCheckout}
            >
              Proceed to Checkout
            </Button>
            <Link href="/product">
              <Button variant="outline" className="w-full mt-3">
                Continue Shopping
              </Button>
            </Link>
          </Card>
        </div>
      </div>
    </div>
  );
}