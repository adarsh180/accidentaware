import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth.config';
import { z } from 'zod';
import { prisma } from '@/lib/prisma';

const addressSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  address: z.string().min(5, 'Address must be at least 5 characters'),
  city: z.string().min(2, 'City must be at least 2 characters'),
  state: z.string().min(2, 'State must be at least 2 characters'),
  pincode: z.string().regex(/^\d{6}$/, 'Pincode must be 6 digits'),
  phone: z.string().regex(/^[0-9]{10}$/, 'Phone number must be 10 digits'),
  email: z.string().email('Invalid email format'),
  landmark: z.string().optional(),
  isDefault: z.boolean().optional()
});

export async function GET(request: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const addresses = await prisma.address.findMany({
      where: { userId: session.user.id },
      orderBy: { createdAt: 'desc' }
    });

    return NextResponse.json(addresses);
  } catch (error) {
    console.error('Failed to fetch addresses:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const body = await request.json();
    const validatedData = addressSchema.parse(body);

    // If this is set as default, unset any existing default address
    if (validatedData.isDefault) {
      await prisma.address.updateMany({
        where: { 
          userId: session.user.id,
          isDefault: true
        },
        data: { isDefault: false }
      });
    }

    const address = await prisma.address.create({
      data: {
        ...validatedData,
        userId: session.user.id
      }
    });

    return NextResponse.json(address, { status: 201 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: error.errors },
        { status: 400 }
      );
    }

    console.error('Failed to create address:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function DELETE(request: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const { searchParams } = new URL(request.url);
    const addressId = searchParams.get('id');

    if (!addressId) {
      return NextResponse.json(
        { error: 'Address ID is required' },
        { status: 400 }
      );
    }

    const address = await prisma.address.findUnique({
      where: { id: addressId }
    });

    if (!address || address.userId !== session.user.id) {
      return NextResponse.json(
        { error: 'Address not found or unauthorized' },
        { status: 404 }
      );
    }

    await prisma.address.delete({
      where: { id: addressId }
    });

    return NextResponse.json(
      { message: 'Address deleted successfully' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Failed to delete address:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function PUT(request: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const body = await request.json();
    const { id, ...updateData } = body;
    const validatedData = addressSchema.parse(updateData);

    // Check if address exists and belongs to user
    const existingAddress = await prisma.address.findUnique({
      where: { id }
    });

    if (!existingAddress || existingAddress.userId !== session.user.id) {
      return NextResponse.json(
        { error: 'Address not found or unauthorized' },
        { status: 404 }
      );
    }

    // If setting as default, unset any existing default
    if (validatedData.isDefault) {
      await prisma.address.updateMany({
        where: { 
          userId: session.user.id,
          isDefault: true
        },
        data: { isDefault: false }
      });
    }

    const address = await prisma.address.update({
      where: { id },
      data: validatedData
    });

    return NextResponse.json(address);
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: error.errors },
        { status: 400 }
      );
    }

    console.error('Failed to update address:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}