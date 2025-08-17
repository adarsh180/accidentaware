import { NextResponse } from 'next/server';
import { auth } from '@/auth';
import { prisma } from '@/lib/prisma';

export async function GET(request: Request) {
  try {
    const session = await auth();
    if (!session?.user?.id) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const ridingHistory = await prisma.ridingHistory.findMany({
      where: { userId: session.user.id },
      orderBy: { startTime: 'desc' },
      take: 10
    });

    return NextResponse.json(ridingHistory);
  } catch (error) {
    console.error('Failed to fetch riding history:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const session = await auth();
    if (!session?.user?.id) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const body = await request.json();
    const { startTime, endTime, distance, coordinates } = body;

    const ridingHistory = await prisma.ridingHistory.create({
      data: {
        userId: session.user.id,
        startTime,
        endTime,
        distance,
        coordinates
      }
    });

    return NextResponse.json(ridingHistory, { status: 201 });
  } catch (error) {
    console.error('Failed to create riding history:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}