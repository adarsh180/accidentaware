'use client';

import { useSession } from 'next-auth/react';
import { Card } from '@/components/ui/card';
import Link from 'next/link';

export default function AdminDashboardPage() {
  const { data: session } = useSession();
  
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Admin Dashboard</h1>
      
      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        <Card className="p-6">
          <h2 className="text-xl font-semibold">Total Users</h2>
          <p className="mt-2 text-3xl font-bold">142</p>
          <Link href="/admin/users" className="mt-4 inline-block text-primary hover:underline">
            View all users →
          </Link>
        </Card>
        
        <Card className="p-6">
          <h2 className="text-xl font-semibold">Total Rides</h2>
          <p className="mt-2 text-3xl font-bold">1,248</p>
          <Link href="/admin/analytics" className="mt-4 inline-block text-primary hover:underline">
            View analytics →
          </Link>
        </Card>
        
        <Card className="p-6">
          <h2 className="text-xl font-semibold">Active Devices</h2>
          <p className="mt-2 text-3xl font-bold">98</p>
          <Link href="/admin/devices" className="mt-4 inline-block text-primary hover:underline">
            View devices →
          </Link>
        </Card>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <Card className="p-6">
          <h2 className="mb-4 text-xl font-semibold">Recent Users</h2>
          <div className="space-y-4">
            <div className="flex items-center justify-between border-b pb-2">
              <div>
                <p className="font-medium">John Doe</p>
                <p className="text-sm text-gray-500">john.doe@example.com</p>
              </div>
              <span className="rounded-full bg-green-100 px-2 py-1 text-xs font-medium text-green-800">New</span>
            </div>
            <div className="flex items-center justify-between border-b pb-2">
              <div>
                <p className="font-medium">Jane Smith</p>
                <p className="text-sm text-gray-500">jane.smith@example.com</p>
              </div>
              <span className="rounded-full bg-green-100 px-2 py-1 text-xs font-medium text-green-800">New</span>
            </div>
            <div className="flex items-center justify-between border-b pb-2">
              <div>
                <p className="font-medium">Robert Johnson</p>
                <p className="text-sm text-gray-500">robert.johnson@example.com</p>
              </div>
              <span className="rounded-full bg-blue-100 px-2 py-1 text-xs font-medium text-blue-800">Active</span>
            </div>
          </div>
          <Link href="/admin/users" className="mt-4 inline-block text-primary hover:underline">
            View all users →
          </Link>
        </Card>
        
        <Card className="p-6">
          <h2 className="mb-4 text-xl font-semibold">System Status</h2>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <p className="font-medium">API Server</p>
              <span className="rounded-full bg-green-100 px-2 py-1 text-xs font-medium text-green-800">Operational</span>
            </div>
            <div className="flex items-center justify-between">
              <p className="font-medium">Database</p>
              <span className="rounded-full bg-green-100 px-2 py-1 text-xs font-medium text-green-800">Operational</span>
            </div>
            <div className="flex items-center justify-between">
              <p className="font-medium">Storage</p>
              <span className="rounded-full bg-green-100 px-2 py-1 text-xs font-medium text-green-800">Operational</span>
            </div>
            <div className="flex items-center justify-between">
              <p className="font-medium">Authentication</p>
              <span className="rounded-full bg-green-100 px-2 py-1 text-xs font-medium text-green-800">Operational</span>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}