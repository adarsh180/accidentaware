'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { z } from 'zod';
import { FaEye, FaEyeSlash, FaGoogle } from 'react-icons/fa';

const passwordSchema = z
  .string()
  .min(8, 'Password must be at least 8 characters')
  .regex(/[A-Z]/, 'Password must contain at least one uppercase letter')
  .regex(/[a-z]/, 'Password must contain at least one lowercase letter')
  .regex(/[0-9]/, 'Password must contain at least one number')
  .regex(/[^A-Za-z0-9]/, 'Password must contain at least one special character');

const signupSchema = z.object({
  fullName: z.string().min(1, 'Full name is required'),
  email: z.string().email('Invalid email address'),
  password: passwordSchema,
  confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
  message: 'Passwords do not match',
  path: ['confirmPassword'],
});

export default function SignupPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isLoading, setIsLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [agreedToTerms, setAgreedToTerms] = useState(false);

  const validateField = (name: string, value: string) => {
    try {
      if (name === 'confirmPassword') {
        if (value !== formData.password) {
          setErrors(prev => ({ ...prev, [name]: 'Passwords do not match' }));
        } else {
          setErrors(prev => ({ ...prev, [name]: '' }));
        }
      } else {
        // Create a single-field schema based on the field being validated
        const fieldSchema = name === 'password' 
          ? passwordSchema 
          : name === 'email'
          ? z.string().email('Invalid email address')
          : name === 'fullName'
          ? z.string().min(1, 'Full name is required')
          : z.string();
          
        fieldSchema.parse(value);
        setErrors(prev => ({ ...prev, [name]: '' }));
        
        // Also validate confirm password if password field changes
        if (name === 'password' && formData.confirmPassword) {
          if (value !== formData.confirmPassword) {
            setErrors(prev => ({ ...prev, confirmPassword: 'Passwords do not match' }));
          } else {
            setErrors(prev => ({ ...prev, confirmPassword: '' }));
          }
        }
      }
    } catch (error) {
      if (error instanceof z.ZodError) {
        const fieldError = error.errors.find(e => e.path.includes(name));
        if (fieldError) {
          setErrors(prev => ({ ...prev, [name]: fieldError.message }));
        }
      }
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    validateField(name, value);
  };

  const getPasswordStrength = (password: string) => {
    if (!password) return { strength: 0, label: '' };
    let strength = 0;
    if (password.length >= 8) strength++;
    if (/[A-Z]/.test(password)) strength++;
    if (/[a-z]/.test(password)) strength++;
    if (/[0-9]/.test(password)) strength++;
    if (/[^A-Za-z0-9]/.test(password)) strength++;
    
    const labels = ['Very Weak', 'Weak', 'Fair', 'Good', 'Strong'];
    return { strength, label: labels[strength - 1] || '' };
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!agreedToTerms) {
      setErrors(prev => ({ ...prev, terms: 'You must agree to the Terms and Privacy Policy' }));
      return;
    }
    setIsLoading(true);
    setErrors({});

    try {
      // Validate form data
      signupSchema.parse(formData);
      
      console.log('Sending registration request with data:', {
        ...formData,
        password: '[REDACTED]',
        confirmPassword: '[REDACTED]'
      });
      
      const response = await fetch('/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: formData.email,
          password: formData.password,
          fullName: formData.fullName
        }),
      });

      const data = await response.json();
      console.log('Registration response:', {
        status: response.status,
        statusText: response.statusText,
        data
      });

      if (!response.ok) {
        throw new Error(data.error || 'Registration failed');
      }

      setSuccess(true);
      // Add delay before redirecting to ensure success message is visible
      setTimeout(() => {
        router.push('/dashboard');
      }, 2000);
    } catch (error) {
      console.error('Registration error:', error);
      if (error instanceof z.ZodError) {
        const newErrors: Record<string, string> = {};
        error.errors.forEach(err => {
          newErrors[err.path[0]] = err.message;
        });
        setErrors(newErrors);
      } else if (error instanceof Error) {
        setErrors({ general: error.message });
      } else {
        setErrors({ general: 'Registration failed. Please try again.' });
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleSocialSignup = (provider: string) => {
    // TODO: Implement social signup
    console.log(`Signing up with ${provider}`);
  };

  const passwordStrength = getPasswordStrength(formData.password);

  return (
    <div className="max-w-4xl mx-auto px-4 py-16">
      <Card className="p-8 space-y-6">
        <div className="text-center space-y-2">
          <h1 className="text-3xl font-bold">Create Your Account</h1>
          <p className="text-gray-600">Join our community of safety-conscious drivers</p>
        </div>
        
        {success ? (
          <div className="text-center space-y-4 p-6 bg-green-50 rounded-lg border border-green-200">
            <div className="text-green-600 text-2xl font-semibold">
              ✅ Account Created Successfully!
            </div>
            <p className="text-green-700">
              Welcome to AccidentAware! You can now access your dashboard.
            </p>
            <div className="text-green-600">
              Redirecting to dashboard...
            </div>
          </div>
        ) : (
          <div className="space-y-6">
            <div className="w-full">
              <button
                onClick={() => handleSocialSignup('google')}
                className="w-full flex items-center justify-center gap-2 p-2 border rounded hover:bg-gray-50 transition-colors"
              >
                <FaGoogle className="text-red-500" />
                Sign up with Google
              </button>
            </div>

            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500">Or continue with</span>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">Full Name</label>
                <input
                  type="text"
                  name="fullName"
                  required
                  className="w-full p-2 border rounded focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
                  value={formData.fullName}
                  onChange={handleChange}
                />
                {errors.fullName && (
                  <p className="text-red-500 text-sm mt-1">{errors.fullName}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Email</label>
                <input
                  type="email"
                  name="email"
                  required
                  className="w-full p-2 border rounded focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
                  value={formData.email}
                  onChange={handleChange}
                />
                {errors.email && (
                  <p className="text-red-500 text-sm mt-1">{errors.email}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Password</label>
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    name="password"
                    required
                    className="w-full p-2 border rounded focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
                    value={formData.password}
                    onChange={handleChange}
                  />
                  <button
                    type="button"
                    className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-500"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                  </button>
                </div>
                {formData.password && (
                  <div className="mt-2">
                    <div className="flex gap-2 mb-1">
                      {[...Array(5)].map((_, i) => (
                        <div
                          key={i}
                          className={`h-1 flex-1 rounded-full ${i < passwordStrength.strength ? 'bg-cyan-500' : 'bg-gray-200'}`}
                        />
                      ))}
                    </div>
                    <p className={`text-sm ${passwordStrength.strength >= 4 ? 'text-green-500' : 'text-gray-500'}`}>
                      {passwordStrength.label}
                    </p>
                  </div>
                )}
                {errors.password && (
                  <p className="text-red-500 text-sm mt-1">{errors.password}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Confirm Password</label>
                <div className="relative">
                  <input
                    type={showConfirmPassword ? 'text' : 'password'}
                    name="confirmPassword"
                    required
                    className="w-full p-2 border rounded focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                  />
                  <button
                    type="button"
                    className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-500"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  >
                    {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                  </button>
                </div>
                {errors.confirmPassword && (
                  <p className="text-red-500 text-sm mt-1">{errors.confirmPassword}</p>
                )}
              </div>

              <div className="flex items-start gap-2">
                <input
                  type="checkbox"
                  id="terms"
                  className="mt-1"
                  checked={agreedToTerms}
                  onChange={(e) => setAgreedToTerms(e.target.checked)}
                />
                <label htmlFor="terms" className="text-sm text-gray-600">
                  I agree to the{' '}
                  <a href="/terms" className="text-cyan-600 hover:underline">Terms of Service</a>
                  {' '}and{' '}
                  <a href="/privacy" className="text-cyan-600 hover:underline">Privacy Policy</a>
                </label>
              </div>
              {errors.terms && (
                <p className="text-red-500 text-sm">{errors.terms}</p>
              )}

              <Button
                type="submit"
                disabled={isLoading}
                className="w-full bg-cyan-600 hover:bg-cyan-700 text-white disabled:bg-gray-400"
              >
                {isLoading ? 'Creating Account...' : 'Create Account'}
              </Button>
            </form>
          </div>
        )}

        <p className="text-center text-gray-600">
          Already have an account?{' '}
          <button
            onClick={() => router.push('/signin')}
            className="text-cyan-600 hover:underline"
          >
            Sign In
          </button>
        </p>
      </Card>
    </div>
  );
}