'use client';

import { useSession } from 'next-auth/react';
import { redirect } from 'next/navigation';
import LoadingSpinner from '@/components/ui/loading-spinner';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { data: session, status } = useSession();

  if (status === 'loading') {
    return (
      <div className="flex h-screen items-center justify-center">
        <LoadingSpinner />
      </div>
    );
  }

  if (!session?.user) {
    redirect('/signin');
  }

  return (
    <div className="flex min-h-screen flex-col">
      <nav className="bg-primary p-4 text-white">
        <div className="container mx-auto flex items-center justify-between">
          <h1 className="text-xl font-bold">AccidentAware Dashboard</h1>
          <div className="flex items-center gap-4">
            <a href="/dashboard" className="hover:text-gray-200">
              Home
            </a>
            <a href="/dashboard/profile" className="hover:text-gray-200">
              Profile
            </a>
            {session.user.roles.includes('ADMIN') && (
              <a href="/admin" className="hover:text-gray-200">
                Admin
              </a>
            )}
          </div>
        </div>
      </nav>
      <main className="container mx-auto flex-1 p-4">{children}</main>
    </div>
  );
}