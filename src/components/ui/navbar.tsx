"use client";

import Link from "next/link";
import { useSession } from "next-auth/react";
import { useCart } from '@/lib/cart-context';
import { useState, useEffect } from 'react';

export default function Navbar() {
  const { data: session } = useSession();
  const { state } = useCart();
  const [mounted, setMounted] = useState(false);
  
  useEffect(() => {
    setMounted(true);
  }, []);
  
  const totalItems = mounted ? state.items.reduce((sum, item) => sum + item.quantity, 0) : 0;

  return (
    <header className="bg-white shadow-sm">
      <div className="mx-auto max-w-7xl px-4 py-3">
        <div className="flex items-center justify-between">
          <Link href="/" className="text-lg font-bold text-gray-900">
            AccidentAware
          </Link>
          
          <nav className="flex items-center space-x-6">
            <Link href="/about" className="text-sm font-medium text-gray-700 hover:text-gray-900">
              About
            </Link>
            <Link href="/features" className="text-sm font-medium text-gray-700 hover:text-gray-900">
              Features
            </Link>
            <Link href="/product" className="text-sm font-medium text-gray-700 hover:text-gray-900">
              Products
            </Link>
            <Link href="/cart" className="relative text-sm font-medium text-gray-700 hover:text-gray-900">
              Cart
              {totalItems > 0 && (
                <span className="absolute -top-2 -right-2 bg-cyan-600 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
                  {totalItems}
                </span>
              )}
            </Link>
            
            {session?.user ? (
              <>
                <Link href="/dashboard" className="text-sm font-medium text-gray-700 hover:text-gray-900">
                  Dashboard
                </Link>
                <Link href="/orders" className="text-sm font-medium text-gray-700 hover:text-gray-900">
                  Orders
                </Link>
                <button className="text-sm font-medium text-gray-700 hover:text-gray-900">
                  Sign Out
                </button>
              </>
            ) : (
              <Link href="/signin" className="text-sm font-medium text-gray-700 hover:text-gray-900">
                Sign In
              </Link>
            )}
          </nav>
        </div>
      </div>
    </header>
  );
}