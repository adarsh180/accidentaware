'use client';

import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { useEffect } from 'react';

declare global {
  interface Window {
    Razorpay: any;
  }
}

export default function UpgradePage() {
  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://checkout.razorpay.com/v1/checkout.js';
    script.async = true;
    document.body.appendChild(script);
    return () => {
      document.body.removeChild(script);
    };
  }, []);

  const handleSubscription = (plan: string) => {
    const options = {
      key: process.env.NEXT_PUBLIC_RAZORPAY_KEY,
      amount: plan === 'pro' ? '500000' : '300000',
      name: 'AccidentAware',
      description: `${plan} Plan Subscription`,
      image: '/logo.svg',
      handler: function (response: any) {
        alert('Payment successful! Payment ID: ' + response.razorpay_payment_id);
      },
      prefill: {
        email: 'user@example.com',
        contact: '+919876543210',
      }
    };

    try {

      const rzp = new window.Razorpay({
        ...options,
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY
      });
      rzp.open();
    } catch (error) {
      console.error('Failed to initialize Razorpay:', error);
      alert('Payment initialization failed - please try again');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-blue-900 py-20">
      <div className="max-w-6xl mx-auto px-4">
        <Card className="p-10 space-y-10 rounded-3xl shadow-2xl bg-white/90 backdrop-blur-lg">
          <div className="text-center space-y-4">
            <h1 className="text-5xl font-extrabold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
              Upgrade Your Safety Experience
            </h1>
            <p className="text-xl text-gray-700 max-w-3xl mx-auto leading-relaxed">
              Elevate your accident detection system with our flexible subscription plans. Choose the protection that matches your needs.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mt-10">
            {/* Free Plan */}
            <div className="p-8 rounded-2xl border border-gray-300 hover:border-blue-400 transition-all duration-300">
              <h3 className="text-3xl font-semibold text-gray-800 mb-6">Free Plan</h3>
              <ul className="space-y-4 text-gray-600 mb-8">
                <li className="flex items-center"><span className="mr-2 text-blue-500">✓</span> Basic sensor monitoring</li>
                <li className="flex items-center"><span className="mr-2 text-blue-500">✓</span> Emergency notifications</li>
                <li className="flex items-center"><span className="mr-2 text-blue-500">✓</span> Standard alert protocols</li>
              </ul>
              <Link href="/signup" className="block w-full text-center py-3 px-6 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition-colors">
                Get Started
              </Link>
            </div>

            {/* Basics Plan */}
            <div className="p-8 rounded-2xl border border-blue-400 bg-blue-50/20">
              <div className="mb-4">
                <span className="bg-blue-200 text-blue-800 px-3 py-1 rounded-full text-sm">Popular</span>
              </div>
              <h3 className="text-3xl font-semibold text-blue-800 mb-6">Basics Plan</h3>
              <div className="text-4xl font-bold text-blue-700 mb-6">₹3,000<span className="text-sm text-gray-600">/year</span></div>
              <ul className="space-y-4 text-gray-600 mb-8">
                <li className="flex items-center"><span className="mr-2 text-blue-500">✓</span> Enhanced sensor integration</li>
                <li className="flex items-center"><span className="mr-2 text-blue-500">✓</span> Priority alert management</li>
                <li className="flex items-center"><span className="mr-2 text-blue-500">✓</span> Real-time monitoring</li>
              </ul>
              <button onClick={() => handleSubscription('basic')} className="w-full py-3 px-6 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition-colors">
                Choose Plan
              </button>
            </div>

            {/* Pro Plan */}
            <div className="p-8 rounded-2xl border border-cyan-400 bg-cyan-50/20">
              <div className="mb-4">
                <span className="bg-cyan-200 text-cyan-800 px-3 py-1 rounded-full text-sm">Most Popular</span>
              </div>
              <h3 className="text-3xl font-semibold text-cyan-800 mb-6">Pro Plan</h3>
              <div className="text-4xl font-bold text-cyan-700 mb-6">₹5,000<span className="text-sm text-gray-600">/year</span></div>
              <ul className="space-y-4 text-gray-600 mb-8">
                <li className="flex items-center"><span className="mr-2 text-cyan-500">✓</span> AI-driven analytics</li>
                <li className="flex items-center"><span className="mr-2 text-cyan-500">✓</span> Multi-sensor fusion</li>
                <li className="flex items-center"><span className="mr-2 text-cyan-500">✓</span> Priority support</li>
                <li className="flex items-center"><span className="mr-2 text-cyan-500">✓</span> Detailed reports</li>
              </ul>
              <button onClick={() => handleSubscription('pro')} className="w-full py-3 px-6 rounded-lg bg-cyan-600 text-white hover:bg-cyan-700 transition-colors">
                Choose Plan
              </button>
            </div>
          </div>

          {/* Enterprise Plan */}
          <div className="mt-16 pt-10 border-t border-gray-300">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-3xl font-semibold text-gray-800 mb-6">Enterprise Plan</h2>
              <p className="text-lg text-gray-600 mb-8">
                Custom solutions for large organizations. Contact us for pricing and features.
              </p>
              <Link href="/contact" className="inline-block py-3 px-8 rounded-lg bg-gradient-to-r from-blue-500 to-cyan-500 text-white hover:opacity-90 transition-opacity">
                Contact Sales
              </Link>
            </div>
          </div>

          <div className="mt-16 pt-10 border-t border-gray-300 text-sm text-gray-600 text-center">
            Secure payments processed by Razorpay. View our <Link href="/terms" className="text-blue-500 hover:underline">Terms of Service</Link>.
          </div>
        </Card>
      </div>
    </div>
  );
}