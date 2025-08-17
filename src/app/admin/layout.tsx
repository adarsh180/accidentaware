'use client';

import { useSession } from 'next-auth/react';
import { redirect } from 'next/navigation';
import LoadingSpinner from '@/components/ui/loading-spinner';

export default function AdminLayout({
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

  // Check if user has admin role
  const userRoles = session.user.roles || [];
  const isAdmin = userRoles.some((role: string) => ['ADMIN', 'CEO', 'RND_HEAD', 'CTO', 'MARKETING_HEAD'].includes(role));

  if (!isAdmin) {
    redirect('/dashboard');
  }

  return (
    <div className="flex min-h-screen flex-col">
      <nav className="bg-primary p-4 text-white">
        <div className="container mx-auto flex items-center justify-between">
          <h1 className="text-xl font-bold">AccidentAware Admin</h1>
          <div className="flex items-center gap-4">
            <a href="/admin" className="hover:text-gray-200">
              Dashboard
            </a>
            <a href="/admin/users" className="hover:text-gray-200">
              Users
            </a>
            <a href="/admin/analytics" className="hover:text-gray-200">
              Analytics
            </a>
            <a href="/dashboard" className="hover:text-gray-200">
              User Dashboard
            </a>
          </div>
        </div>
      </nav>
      <main className="container mx-auto flex-1 p-4">{children}</main>
    </div>
  );
}