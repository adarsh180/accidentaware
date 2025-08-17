'use client';

import { useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';
import { Card } from '@/components/ui/card';
import LoadingSpinner from '@/components/ui/loading-spinner';
import { BluetoothConnector } from '@/components/bluetooth-connector';
import { Button } from '@/components/ui/button';
import { LineChart, PieChart } from '@/components/ui/charts';
import Link from 'next/link';

type RidingStats = {
  totalRides: number;
  totalDistance: number;
  averageRideTime: number;
};

type RidingHistory = {
  id: string;
  startTime: string;
  endTime: string | null;
  distance: number;
};

type DrivingAnalytics = {
  safePercentage: number;
  mediumPercentage: number;
  rashPercentage: number;
  recommendation: string;
};

export default function DashboardPage() {
  const { data: session } = useSession();
  const [ridingStats, setRidingStats] = useState<RidingStats | null>(null);
  const [ridingHistory, setRidingHistory] = useState<RidingHistory[]>([]);
  const [drivingAnalytics, setDrivingAnalytics] = useState<DrivingAnalytics | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        // Fetch riding stats
        const statsResponse = await fetch('/api/dashboard/riding-stats');
        if (statsResponse.ok) {
          const statsData = await statsResponse.json();
          setRidingStats(statsData);
        }

        // Fetch riding history
        const historyResponse = await fetch('/api/user/riding-history');
        if (historyResponse.ok) {
          const historyData = await historyResponse.json();
          setRidingHistory(historyData);
        }

        // Fetch driving analytics
        const analyticsResponse = await fetch('/api/user/driving-analytics');
        if (analyticsResponse.ok) {
          const analyticsData = await analyticsResponse.json();
          setDrivingAnalytics(analyticsData);
        }
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  if (loading) {
    return <LoadingSpinner />;
  }

  const userRoles = session?.user?.roles || [];
  const isAdmin = userRoles.some(role => ['ADMIN', 'CEO', 'RND_HEAD', 'CTO', 'MARKETING_HEAD'].includes(role));

  // Format date for display
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold">Welcome, {session?.user?.name || 'User'}</h1>
      
      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        <Card className="p-6">
          <h2 className="text-xl font-semibold">Total Rides</h2>
          <p className="mt-2 text-3xl font-bold">{ridingStats?.totalRides || 0}</p>
          <p className="mt-1 text-sm text-gray-500">Lifetime rides tracked</p>
        </Card>
        
        <Card className="p-6">
          <h2 className="text-xl font-semibold">Total Distance</h2>
          <p className="mt-2 text-3xl font-bold">{ridingStats?.totalDistance || 0} km</p>
          <p className="mt-1 text-sm text-gray-500">Distance covered</p>
        </Card>
        
        <Card className="p-6">
          <h2 className="text-xl font-semibold">Average Ride Time</h2>
          <p className="mt-2 text-3xl font-bold">{ridingStats?.averageRideTime || 0} min</p>
          <p className="mt-1 text-sm text-gray-500">Per riding session</p>
        </Card>
      </div>

      {/* Driving Analytics */}
      <div className="mt-8">
        <h2 className="mb-4 text-2xl font-bold">Driving Analytics</h2>
        <Card className="p-6">
          {drivingAnalytics ? (
            <div className="space-y-6">
              <div className="flex flex-col space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-green-600 font-medium">Safe Driving</span>
                  <span className="text-green-600 font-medium">{drivingAnalytics.safePercentage}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2.5">
                  <div 
                    className="bg-green-600 h-2.5 rounded-full" 
                    style={{ width: `${drivingAnalytics.safePercentage}%` }}
                  ></div>
                </div>
              </div>

              <div className="flex flex-col space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-yellow-500 font-medium">Medium Zone</span>
                  <span className="text-yellow-500 font-medium">{drivingAnalytics.mediumPercentage}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2.5">
                  <div 
                    className="bg-yellow-500 h-2.5 rounded-full" 
                    style={{ width: `${drivingAnalytics.mediumPercentage}%` }}
                  ></div>
                </div>
              </div>

              <div className="flex flex-col space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-red-600 font-medium">Rash Driving</span>
                  <span className="text-red-600 font-medium">{drivingAnalytics.rashPercentage}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2.5">
                  <div 
                    className="bg-red-600 h-2.5 rounded-full" 
                    style={{ width: `${drivingAnalytics.rashPercentage}%` }}
                  ></div>
                </div>
              </div>

              <div className="mt-4 p-4 bg-blue-50 rounded-md">
                <p className="text-blue-800 font-medium">Recommendation:</p>
                <p className="text-blue-600">{drivingAnalytics.recommendation}</p>
              </div>
            </div>
          ) : (
            <p className="text-gray-600">No driving analytics available yet. Connect your helmet and start riding to see your analytics.</p>
          )}
        </Card>
      </div>

      {/* Charts Section */}
      <div className="mt-8">
        <h2 className="mb-4 text-2xl font-bold">Safety Analytics</h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card className="p-6">
            <h3 className="text-xl font-semibold mb-4">Monthly Ride Trends</h3>
            <LineChart />
          </Card>
          <Card className="p-6">
            <h3 className="text-xl font-semibold mb-4">Safety Score Distribution</h3>
            <PieChart />
          </Card>
        </div>
      </div>

      {/* Bluetooth Connection */}
      <div className="mt-8">
        <h2 className="mb-4 text-2xl font-bold">Device Connection</h2>
        <BluetoothConnector />
      </div>

      {/* Admin Quick Access */}
      {isAdmin && (
        <div className="mt-8">
          <h2 className="mb-4 text-2xl font-bold">Admin Quick Access</h2>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <Card className="p-6 hover:bg-gray-50">
              <h3 className="text-lg font-semibold">User Management</h3>
              <p className="mt-2 text-gray-600">Manage user accounts and permissions</p>
              <Link href="/admin/users" className="mt-4 inline-block text-primary hover:underline">Go to User Management →</Link>
            </Card>
            
            <Card className="p-6 hover:bg-gray-50">
              <h3 className="text-lg font-semibold">Analytics Dashboard</h3>
              <p className="mt-2 text-gray-600">View detailed analytics and reports</p>
              <Link href="/admin/analytics" className="mt-4 inline-block text-primary hover:underline">Go to Analytics →</Link>
            </Card>
          </div>
        </div>
      )}

      {/* Recent Riding History */}
      <div className="mt-8">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold">Recent Rides</h2>
          <Link href="/dashboard/riding-history">
            <Button variant="outline">View All</Button>
          </Link>
        </div>
        
        <Card className="p-6">
          {ridingHistory.length > 0 ? (
            <div className="space-y-4">
              {ridingHistory.slice(0, 5).map((ride) => (
                <div key={ride.id} className="p-4 border rounded-md hover:bg-gray-50">
                  <div className="flex justify-between">
                    <div>
                      <p className="font-medium">Ride on {formatDate(ride.startTime)}</p>
                      <p className="text-sm text-gray-600">
                        Duration: {ride.endTime ? 
                          `${Math.round((new Date(ride.endTime).getTime() - new Date(ride.startTime).getTime()) / (1000 * 60))} minutes` : 
                          'In progress'}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="font-medium">{ride.distance.toFixed(2)} km</p>
                      <p className="text-sm text-gray-600">
                        {ride.endTime ? formatDate(ride.endTime) : 'In progress'}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-600">No riding history available yet. Start a ride to see your history here.</p>
          )}
        </Card>
      </div>
    </div>
  );
}