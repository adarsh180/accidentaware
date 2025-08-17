import { NextResponse } from 'next/server';
import { hash } from 'bcryptjs';
import { z } from 'zod';
import { prisma } from '@/lib/prisma';


const registerSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(8, 'Password must be at least 8 characters')
    .regex(/[A-Z]/, 'Password must contain at least one uppercase letter')
    .regex(/[a-z]/, 'Password must contain at least one lowercase letter')
    .regex(/[0-9]/, 'Password must contain at least one number')
    .regex(/[^A-Za-z0-9]/, 'Password must contain at least one special character'),
  fullName: z.string().min(2, 'Full name must be at least 2 characters'),
});

export async function POST(request: Request) {
  try {
    console.log('Registration request received');
    const body = await request.json();
    console.log('Request body:', { ...body, password: '[REDACTED]' });

    // First validate the data
    let validatedData;
    try {
      validatedData = registerSchema.parse(body);
      console.log('Validation passed');
    } catch (validationError) {
      console.error('Validation failed:', validationError);
      return NextResponse.json(
        { error: 'Validation failed', details: validationError },
        { status: 400 }
      );
    }

    // Check if user already exists
    const existingUser = await prisma.user.findUnique({
      where: { email: validatedData.email.toLowerCase() }  // Convert email to lowercase
    });

    if (existingUser) {
      console.log('User already exists with email:', validatedData.email);
      return NextResponse.json(
        { error: 'User with this email already exists' },
        { status: 400 }
      );
    }

    // Hash password
    const hashedPassword = await hash(validatedData.password, 12);
    console.log('Password hashed successfully');

    // Create user with default USER role
    try {
      const user = await prisma.user.create({
        data: {
          email: validatedData.email.toLowerCase(),
          passwordHash: hashedPassword,
          fullName: validatedData.fullName,
          roles: {
            create: {
              role: 'USER'
            }
          }
        },
        include: {
          roles: true
        }
      });

      console.log('User created successfully:', { id: user.id, email: user.email });

      return NextResponse.json({ success: true, userId: user.id }, { status: 201 });
    } catch (dbError) {
      console.error('Database error creating user:', dbError);
      throw dbError;
    }
  } catch (error) {
    console.error('Registration error:', error);
    return NextResponse.json(
      { error: 'Registration failed', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}