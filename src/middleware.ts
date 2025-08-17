import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { getToken } from 'next-auth/jwt';

// List of public routes that don't require authentication
const publicPaths = ['/', '/signin', '/signup', '/about', '/contact', '/features', '/product', '/upgrade'];

// Admin-only roles
const adminRoles = ['ADMIN', 'CEO', 'RND_HEAD', 'CTO', 'MARKETING_HEAD'];

export async function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  // Allow public paths
  if (publicPaths.some(path => pathname === path || pathname.startsWith(`${path}/`))) {
    return NextResponse.next();
  }

  // Check authentication
  const token = await getToken({
    req: request,
    secret: process.env.NEXTAUTH_SECRET,
  });

  if (!token) {
    const signInUrl = new URL('/signin', request.url);
    signInUrl.searchParams.set('callbackUrl', pathname);
    return NextResponse.redirect(signInUrl);
  }

  // Admin routes protection
  if (pathname.startsWith('/admin')) {
    const userRoles = token.roles as string[] || [];
    const isAdmin = userRoles.some(role => adminRoles.includes(role));
    
    if (!isAdmin) {
      return NextResponse.redirect(new URL('/dashboard', request.url));
    }
  }

  // Cart and checkout protection
  if (pathname.startsWith('/checkout') || pathname.includes('/api/process-payment')) {
    // You can implement cart validation here if needed
    // For now, we'll just let authenticated users through
    return NextResponse.next();
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/dashboard/:path*',
    '/admin/:path*',
    '/checkout/:path*',
    '/product/:path*'
  ]
}