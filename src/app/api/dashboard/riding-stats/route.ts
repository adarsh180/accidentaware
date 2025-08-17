import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth.config';
import { prisma } from '@/lib/prisma';

interface RidingHistory {
  id: string;
  userId: string;
  startTime: Date;
  endTime: Date | null;
  distance: number;
  coordinates: string;
}

export const dynamic = 'force-dynamic';

export async function GET() {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    // Get user's riding history
    const ridingHistory = await prisma.ridingHistory.findMany({
      where: {
        userId: session.user.id,
      },
    });

    // Calculate statistics
    const totalRides = ridingHistory.length;
    const totalDistance = ridingHistory.reduce(
      (sum: number, ride: RidingHistory) => sum + ride.distance,
      0
    );

    // Calculate average ride time in minutes
    let totalRideTimeMinutes = 0;
    let ridesWithEndTime = 0;

    ridingHistory.forEach((ride: RidingHistory) => {
      if (ride.endTime) {
        const durationMs = new Date(ride.endTime).getTime() - new Date(ride.startTime).getTime();
        totalRideTimeMinutes += durationMs / (1000 * 60);
        ridesWithEndTime++;
      }
    });

    const averageRideTimeMinutes = ridesWithEndTime > 0 
      ? Math.round(totalRideTimeMinutes / ridesWithEndTime)
      : 0;

    return NextResponse.json({
      totalRides,
      totalDistance: Math.round(totalDistance * 100) / 100,
      averageRideTimeMinutes,
    });
  } catch (error) {
    console.error('Error fetching riding stats:', error);
    return NextResponse.json(
      { error: 'Failed to fetch riding stats' },
      { status: 500 }
    );
  }
}