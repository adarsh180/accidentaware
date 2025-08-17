'use client';

import { useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';
import { Card } from '@/components/ui/card';
import LoadingSpinner from '@/components/ui/loading-spinner';

type AnalyticsData = {
  userGrowth: {
    labels: string[];
    data: number[];
  };
  rideDistribution: {
    labels: string[];
    data: number[];
  };
  keyMetrics: {
    averageDistance: string;
    activeUsers: number;
    totalRides: number;
  };
};

export default function AdminAnalyticsPage() {
  const { data: session } = useSession();
  const [analyticsData, setAnalyticsData] = useState<AnalyticsData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAnalyticsData = async () => {
      try {
        const response = await fetch('/api/admin/analytics');
        if (response.ok) {
          const data = await response.json();
          setAnalyticsData(data);
        } else {
          console.error('Failed to fetch analytics data');
        }
      } catch (error) {
        console.error('Error fetching analytics data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchAnalyticsData();
  }, []);

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Analytics Dashboard</h1>
      
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <Card className="p-6">
          <h2 className="mb-4 text-xl font-semibold">User Growth</h2>
          <div className="h-64 w-full">
            {/* This would be replaced with an actual chart component */}
            <div className="flex h-full w-full flex-col justify-end">
              <div className="flex h-full items-end space-x-2">
                {analyticsData?.userGrowth.data.map((value, index) => (
                  <div key={index} className="flex flex-1 flex-col items-center">
                    <div 
                      className="w-full bg-primary" 
                      style={{ height: `${(value / Math.max(...analyticsData.userGrowth.data)) * 100}%` }}
                    ></div>
                    <span className="mt-2 text-xs">{analyticsData.userGrowth.labels[index]}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Card>
        
        <Card className="p-6">
          <h2 className="mb-4 text-xl font-semibold">Ride Distance Distribution</h2>
          <div className="h-64 w-full">
            {/* This would be replaced with an actual chart component */}
            <div className="flex h-full w-full flex-col justify-end">
              <div className="flex h-full items-end space-x-2">
                {analyticsData?.rideDistribution.data.map((value, index) => (
                  <div key={index} className="flex flex-1 flex-col items-center">
                    <div 
                      className="w-full bg-primary" 
                      style={{ height: `${(value / Math.max(...analyticsData.rideDistribution.data)) * 100}%` }}
                    ></div>
                    <span className="mt-2 text-xs">{analyticsData.rideDistribution.labels[index]}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Card>
      </div>

      <Card className="p-6">
        <h2 className="mb-4 text-xl font-semibold">Key Metrics</h2>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          <div className="rounded-lg bg-gray-100 p-4">
            <h3 className="text-lg font-medium">Average Ride Distance</h3>
            <p className="mt-2 text-2xl font-bold">{analyticsData?.keyMetrics?.averageDistance || '0'} km</p>
          </div>
          <div className="rounded-lg bg-gray-100 p-4">
            <h3 className="text-lg font-medium">Total Rides</h3>
            <p className="mt-2 text-2xl font-bold">{analyticsData?.keyMetrics?.totalRides || 0}</p>
          </div>
          <div className="rounded-lg bg-gray-100 p-4">
            <h3 className="text-lg font-medium">Active Users</h3>
            <p className="mt-2 text-2xl font-bold">{analyticsData?.keyMetrics?.activeUsers || 0}</p>
          </div>
        </div>
      </Card>
    </div>
  );
}