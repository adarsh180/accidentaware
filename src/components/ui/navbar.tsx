"use client";

import Link from "next/link";
import { useSession } from "next-auth/react";

export default function Navbar() {
  const { data: session } = useSession();

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
            
            {session?.user ? (
              <>
                <Link href="/dashboard" className="text-sm font-medium text-gray-700 hover:text-gray-900">
                  Dashboard
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