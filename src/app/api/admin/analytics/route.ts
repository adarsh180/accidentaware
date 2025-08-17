import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth.config';
import { prisma } from '@/lib/prisma';
import { UserRole } from '@/lib/auth.config';

export const dynamic = 'force-dynamic';

const ADMIN_ROLES: UserRole[] = ['ADMIN', 'CEO', 'RND_HEAD', 'CTO', 'MARKETING_HEAD'];

export async function GET(req: NextRequest) {
  const session = await getServerSession(authOptions);

  if (!session?.user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  // Check if user has admin role
  const userRoles = (session.user.roles || []) as UserRole[];
  const isAdmin = userRoles.some(role => ADMIN_ROLES.includes(role));

  if (!isAdmin) {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
  }
  
  try {
    // Get user growth data (users created per month for the last 6 months)
    const sixMonthsAgo = new Date();
    sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 6);
    
    const users = await prisma.user.findMany({
      where: {
        createdAt: {
          gte: sixMonthsAgo
        }
      },
      select: {
        createdAt: true
      }
    });

    // Group users by month
    const monthlyUsers = new Array(6).fill(0);
    const monthLabels: string[] = [];
    
    for (let i = 0; i < 6; i++) {
      const date = new Date();
      date.setMonth(date.getMonth() - i);
      monthLabels.unshift(date.toLocaleString('default', { month: 'short' }));
    }

    users.forEach((user: { createdAt: Date }) => {
      const monthsAgo = Math.floor((Date.now() - user.createdAt.getTime()) / (1000 * 60 * 60 * 24 * 30));
      if (monthsAgo < 6) {
        monthlyUsers[5 - monthsAgo]++;
      }
    });

    // Get ride distribution data
    const rides = await prisma.ridingHistory.findMany({
      select: {
        distance: true
      }
    });

    const distances = [0, 0, 0, 0, 0]; // 0-5km, 5-10km, 10-20km, 20-50km, 50km+
    const distanceLabels = ['0-5km', '5-10km', '10-20km', '20-50km', '50km+'];

    rides.forEach((ride: { distance: number }) => {
      if (ride.distance <= 5) distances[0]++;
      else if (ride.distance <= 10) distances[1]++;
      else if (ride.distance <= 20) distances[2]++;
      else if (ride.distance <= 50) distances[3]++;
      else distances[4]++;
    });

    // Get key metrics
    const totalRides = rides.length;
    const activeUsers = await prisma.user.count({
      where: {
        ridingHistory: {
          some: {
            createdAt: {
              gte: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000) // Last 30 days
            }
          }
        }
      }
    });

    const averageDistance = rides.length > 0
      ? (rides.reduce((acc: number, ride: { distance: number }) => acc + ride.distance, 0) / rides.length).toFixed(1)
      : '0';

    return NextResponse.json({
      userGrowth: {
        labels: monthLabels,
        data: monthlyUsers
      },
      rideDistribution: {
        labels: distanceLabels,
        data: distances
      },
      keyMetrics: {
        averageDistance: `${averageDistance}km`,
        activeUsers,
        totalRides
      }
    });

  } catch (error) {
    console.error('Error fetching analytics data:', error);
    return NextResponse.json(
      { error: 'Failed to fetch analytics data' },
      { status: 500 }
    );
  }
}