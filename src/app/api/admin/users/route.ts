import { NextResponse } from 'next/server';
import { auth } from '@/auth';
import { prisma } from '@/lib/prisma';
import { UserRole } from '@/lib/auth.config';
import type { Prisma, PrismaClient } from '@prisma/client';

const ADMIN_ROLES: UserRole[] = ['ADMIN', 'CEO', 'RND_HEAD', 'CTO', 'MARKETING_HEAD'];

interface DbUser {
  id: string;
  email: string;
  fullName: string | null;
  createdAt: Date;
  roles: Array<{
    role: UserRole;
  }>;
}

// Helper function to check if user has admin privileges
async function checkAdminAccess(session: any) {
  if (!session?.user?.id) {
    return { authorized: false, status: 401, message: 'Unauthorized' };
  }
  
  // Fetch user with roles from database to ensure we have the latest roles
  const user = await prisma.user.findUnique({
    where: { id: session.user.id },
    include: { roles: true }
  });

  if (!user) {
    return { authorized: false, status: 401, message: 'User not found' };
  }

  // Get user roles
  const userRoles = user.roles.map(r => r.role as UserRole);
  
  // Check if user has admin role or CEO role (CEO has full access)
  const hasAccess = userRoles.some(role => ADMIN_ROLES.includes(role as UserRole));
  
  if (!hasAccess) {
    return { authorized: false, status: 403, message: 'Forbidden' };
  }
  
  // Special handling for CEO role
  const isCEO = userRoles.includes('CEO');
  
  return { 
    authorized: true,
    isCEO
  };
}

export async function GET() {
  const session = await auth();
  const accessCheck = await checkAdminAccess(session);
  
  if (!accessCheck.authorized) {
    return NextResponse.json({ error: accessCheck.message }, { status: accessCheck.status });
  }

  try {
    const users = await prisma.user.findMany({
      include: {
        roles: true
      },
      orderBy: {
        createdAt: 'desc'
      }
    }) as DbUser[];

    const transformedUsers = users.map((user: DbUser) => ({
      id: user.id,
      email: user.email,
      fullName: user.fullName || '',
      roles: user.roles.map(r => r.role),
      createdAt: user.createdAt.toISOString()
    }));

    return NextResponse.json(transformedUsers);
  } catch (error) {
    console.error('Error fetching users:', error);
    return NextResponse.json(
      { error: 'Failed to fetch users' },
      { status: 500 }
    );
  }
}

export async function PATCH(request: Request) {
  const session = await auth();
  const accessCheck = await checkAdminAccess(session);
  
  if (!accessCheck.authorized) {
    return NextResponse.json({ error: accessCheck.message }, { status: accessCheck.status });
  }

  try {
    const { userId, roles } = await request.json();
    
    if (!userId || !roles || !Array.isArray(roles)) {
      return NextResponse.json(
        { error: 'Invalid request data' },
        { status: 400 }
      );
    }

    // Only CEO can modify other admin roles
    if (!accessCheck.isCEO) {
      const hasAdminRole = roles.some(role => ADMIN_ROLES.includes(role as UserRole));
      if (hasAdminRole) {
        return NextResponse.json(
          { error: 'Only CEO can modify admin roles' },
          { status: 403 }
        );
      }
    }

    // Validate that all roles are valid UserRole values
    const validRoles = roles.every((role: string) => 
      typeof role === 'string' && (ADMIN_ROLES.includes(role as UserRole) || role === 'USER')
    );

    if (!validRoles) {
      return NextResponse.json(
        { error: 'Invalid role provided' },
        { status: 400 }
      );
    }

    // Check if user exists
    const user = await prisma.user.findUnique({
      where: { id: userId }
    });

    if (!user) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      );
    }

    // Update roles in a transaction
    await prisma.$transaction(async (tx) => {
      // Delete existing roles
      await tx.userRole.deleteMany({
        where: { userId }
      });

      // Add new roles
      await tx.userRole.createMany({
        data: roles.map((role: UserRole) => ({
          userId,
          role
        }))
      });
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error updating user roles:', error);
    return NextResponse.json(
      { error: 'Failed to update user roles' },
      { status: 500 }
    );
  }
}

export async function DELETE(request: Request) {
  const session = await auth();
  const accessCheck = await checkAdminAccess(session);
  
  if (!accessCheck.authorized) {
    return NextResponse.json({ error: accessCheck.message }, { status: accessCheck.status });
  }

  try {
    const url = new URL(request.url);
    const userId = url.searchParams.get('userId');

    if (!userId) {
      return NextResponse.json(
        { error: 'User ID is required' },
        { status: 400 }
      );
    }

    // Only CEO can delete users with admin roles
    if (!accessCheck.isCEO) {
      const userToDelete = await prisma.user.findUnique({
        where: { id: userId },
        include: { roles: true }
      });

      if (userToDelete?.roles.some(r => ADMIN_ROLES.includes(r.role as UserRole))) {
        return NextResponse.json(
          { error: 'Only CEO can delete admin users' },
          { status: 403 }
        );
      }
    }

    // Delete all user data in a transaction
    await prisma.$transaction(async (tx) => {
      // Delete user roles
      await tx.userRole.deleteMany({
        where: { userId }
      });
      
      // Delete riding history
      await tx.ridingHistory.deleteMany({
        where: { userId }
      });
      
      // Delete SOS contacts
      await tx.sOSContact.deleteMany({
        where: { userId }
      });
      
      // Delete orders
      await tx.order.deleteMany({
        where: { userId }
      });
      
      // Delete addresses
      await tx.address.deleteMany({
        where: { userId }
      });
      
      // Finally, delete the user
      await tx.user.delete({
        where: { id: userId }
      });
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error deleting user:', error);
    return NextResponse.json(
      { error: 'Failed to delete user' },
      { status: 500 }
    );
  }
}