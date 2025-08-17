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

export async function GET(request: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    // Get user's riding history
    const ridingHistory = await prisma.ridingHistory.findMany({
      where: { userId: session.user.id },
      orderBy: { startTime: 'desc' },
      take: 100 // Analyze last 100 rides
    });

    // Calculate driving analytics
    let safeCount = 0;
    let mediumCount = 0;
    let rashCount = 0;

    ridingHistory.forEach((ride: RidingHistory) => {
      try {
        const coordinates = JSON.parse(ride.coordinates) as Array<{ speed: number }>;
        const maxSpeed = Math.max(...coordinates.map(coord => coord.speed));

        if (maxSpeed <= 50) {
          safeCount++;
        } else if (maxSpeed <= 80) {
          mediumCount++;
        } else {
          rashCount++;
        }
      } catch (error) {
        console.error('Error parsing coordinates for ride:', ride.id, error);
      }
    });

    return NextResponse.json({
      safeCount,
      mediumCount,
      rashCount,
      totalRides: ridingHistory.length
    });
  } catch (error) {
    console.error('Failed to fetch driving analytics:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}