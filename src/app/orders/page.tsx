'use client';

import { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Image from 'next/image';

interface Order {
  id: string;
  razorpayOrderId: string;
  razorpayPaymentId: string;
  amount: number;
  status: string;
  items: any[];
  createdAt: string;
}

export default function OrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const response = await fetch('/api/orders');
      if (response.ok) {
        const data = await response.json();
        setOrders(data);
      }
    } catch (error) {
      console.error('Error fetching orders:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleCancelOrder = async (orderId: string) => {
    try {
      const response = await fetch(`/api/orders/${orderId}/cancel`, {
        method: 'POST'
      });
      if (response.ok) {
        fetchOrders();
      }
    } catch (error) {
      console.error('Error cancelling order:', error);
    }
  };

  if (loading) {
    return (
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="text-center">Loading orders...</div>
      </div>
    );
  }

  if (orders.length === 0) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-16 text-center">
        <div className="space-y-6">
          <div className="text-6xl">📦</div>
          <h1 className="text-3xl font-bold text-gray-900">No orders yet</h1>
          <p className="text-gray-600">Start shopping to see your orders here!</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">My Orders</h1>
      
      <div className="space-y-6">
        {orders.map((order) => (
          <Card key={order.id} className="p-6">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="text-lg font-semibold">Order #{order.id.slice(-8)}</h3>
                <p className="text-sm text-gray-500">
                  Placed on {new Date(order.createdAt).toLocaleDateString()}
                </p>
              </div>
              <div className="text-right">
                <p className="text-lg font-bold">₹{order.amount}</p>
                <span className={`inline-block px-3 py-1 rounded-full text-sm ${
                  order.status === 'completed' ? 'bg-green-100 text-green-800' :
                  order.status === 'cancelled' ? 'bg-red-100 text-red-800' :
                  'bg-yellow-100 text-yellow-800'
                }`}>
                  {order.status}
                </span>
              </div>
            </div>
            
            <div className="space-y-4">
              {order.items.map((item: any, index: number) => (
                <div key={index} className="flex gap-4 border-b pb-4 last:border-b-0">
                  <div className="relative w-16 h-16">
                    <Image
                      src={item.product.images[0]}
                      alt={item.product.name}
                      fill
                      className="object-cover rounded"
                    />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-medium">{item.product.name}</h4>
                    <p className="text-sm text-gray-600">Qty: {item.quantity}</p>
                    <p className="text-sm font-medium">₹{item.product.price * item.quantity}</p>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="flex gap-4 mt-4">
              {order.status === 'completed' && (
                <Button
                  variant="outline"
                  onClick={() => handleCancelOrder(order.id)}
                >
                  Cancel Order
                </Button>
              )}
              <Button variant="outline">
                Write Review
              </Button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}