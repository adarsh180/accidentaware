'use client';

import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import LoadingSpinner from '@/components/ui/loading-spinner';

interface RidingHistory {
  id: string;
  startTime: string;
  endTime: string | null;
  distance: number;
  coordinates: any; // In a real app, this would be properly typed
}

export default function RidingHistoryPage() {
  const { data: session } = useSession();
  const [ridingHistory, setRidingHistory] = useState<RidingHistory[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all'); // 'all', 'week', 'month', 'year'

  useEffect(() => {
    const fetchRidingHistory = async () => {
      try {
        const response = await fetch('/api/user/riding-history');
        if (response.ok) {
          const data = await response.json();
          setRidingHistory(data);
        }
      } catch (error) {
        console.error('Error fetching riding history:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchRidingHistory();
  }, []);

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

  // Calculate ride duration in minutes
  const calculateDuration = (startTime: string, endTime: string | null) => {
    if (!endTime) return 'In progress';
    
    const start = new Date(startTime).getTime();
    const end = new Date(endTime).getTime();
    const durationMinutes = Math.round((end - start) / (1000 * 60));
    
    return `${durationMinutes} minutes`;
  };

  // Filter riding history based on selected filter
  const filteredHistory = () => {
    const now = new Date();
    
    switch (filter) {
      case 'week':
        const weekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
        return ridingHistory.filter(ride => new Date(ride.startTime) >= weekAgo);
      
      case 'month':
        const monthAgo = new Date(now.getFullYear(), now.getMonth() - 1, now.getDate());
        return ridingHistory.filter(ride => new Date(ride.startTime) >= monthAgo);
      
      case 'year':
        const yearAgo = new Date(now.getFullYear() - 1, now.getMonth(), now.getDate());
        return ridingHistory.filter(ride => new Date(ride.startTime) >= yearAgo);
      
      default:
        return ridingHistory;
    }
  };

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Riding History</h1>
        <div className="flex gap-2">
          <Button 
            variant={filter === 'all' ? 'default' : 'outline'} 
            onClick={() => setFilter('all')}
          >
            All Time
          </Button>
          <Button 
            variant={filter === 'week' ? 'default' : 'outline'} 
            onClick={() => setFilter('week')}
          >
            This Week
          </Button>
          <Button 
            variant={filter === 'month' ? 'default' : 'outline'} 
            onClick={() => setFilter('month')}
          >
            This Month
          </Button>
          <Button 
            variant={filter === 'year' ? 'default' : 'outline'} 
            onClick={() => setFilter('year')}
          >
            This Year
          </Button>
        </div>
      </div>

      <Card className="p-6">
        {filteredHistory().length > 0 ? (
          <div className="space-y-6">
            <div className="grid grid-cols-4 font-semibold text-gray-700 pb-2 border-b">
              <div>Date & Time</div>
              <div>Duration</div>
              <div>Distance</div>
              <div>Status</div>
            </div>
            
            {filteredHistory().map((ride) => (
              <div key={ride.id} className="grid grid-cols-4 py-4 border-b last:border-0 hover:bg-gray-50">
                <div>
                  <p className="font-medium">{formatDate(ride.startTime)}</p>
                </div>
                <div>
                  <p>{calculateDuration(ride.startTime, ride.endTime)}</p>
                </div>
                <div>
                  <p>{ride.distance.toFixed(2)} km</p>
                </div>
                <div>
                  <span className={`px-3 py-1 rounded-full text-sm ${ride.endTime ? 'bg-green-100 text-green-800' : 'bg-blue-100 text-blue-800'}`}>
                    {ride.endTime ? 'Completed' : 'In Progress'}
                  </span>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-8">
            <p className="text-gray-500 mb-4">No riding history available for the selected period.</p>
            <Button onClick={() => setFilter('all')}>View All History</Button>
          </div>
        )}
      </Card>

      {/* Statistics Card */}
      {filteredHistory().length > 0 && (
        <Card className="p-6">
          <h2 className="text-xl font-semibold mb-4">Riding Statistics</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-4 bg-blue-50 rounded-lg">
              <h3 className="text-lg font-medium text-blue-800">Total Rides</h3>
              <p className="text-3xl font-bold text-blue-600">{filteredHistory().length}</p>
            </div>
            
            <div className="p-4 bg-green-50 rounded-lg">
              <h3 className="text-lg font-medium text-green-800">Total Distance</h3>
              <p className="text-3xl font-bold text-green-600">
                {filteredHistory().reduce((sum, ride) => sum + ride.distance, 0).toFixed(2)} km
              </p>
            </div>
            
            <div className="p-4 bg-purple-50 rounded-lg">
              <h3 className="text-lg font-medium text-purple-800">Average Ride Time</h3>
              <p className="text-3xl font-bold text-purple-600">
                {(() => {
                  const completedRides = filteredHistory().filter(ride => ride.endTime);
                  if (completedRides.length === 0) return '0';
                  
                  const totalMinutes = completedRides.reduce((sum, ride) => {
                    if (!ride.endTime) return sum;
                    const start = new Date(ride.startTime).getTime();
                    const end = new Date(ride.endTime).getTime();
                    return sum + (end - start) / (1000 * 60);
                  }, 0);
                  
                  return Math.round(totalMinutes / completedRides.length);
                })()} min
              </p>
            </div>
          </div>
        </Card>
      )}
    </div>
  );
}