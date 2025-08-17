'use client';

import { useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import ReCAPTCHA from 'react-google-recaptcha';

const formSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  subject: z.string().min(5, 'Subject must be at least 5 characters'),
  message: z.string().min(10, 'Message must be at least 10 characters'),
  phone: z.string().optional(),
  recaptcha: z.string().min(1, 'reCAPTCHA verification required'),
});

type ContactFormData = z.infer<typeof formSchema>;

export default function ContactPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<ContactFormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      email: '',
      subject: '',
      message: '',
      phone: '',
      recaptcha: '',
    },
    mode: 'onChange',
  });

  const onSubmit = async (data: ContactFormData) => {
    setIsSubmitting(true);
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      if (!response.ok) throw new Error('Submission failed');
      alert('Message sent successfully!');
    } catch (error) {
      alert('Failed to send message. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 to-gray-200 py-20">
      <div className="max-w-5xl mx-auto bg-white rounded-2xl shadow-lg overflow-hidden">
        <div className="grid md:grid-cols-2">
          <div className="p-12 md:p-16 bg-gradient-to-r from-cyan-50 to-cyan-100">
            <h1 className="text-3xl font-extrabold text-cyan-800 mb-6">
              Get in Touch
            </h1>
            <p className="text-gray-600 mb-8">
              We're here to help! Feel free to reach out with any questions or
              feedback.
            </p>
            <div className="space-y-6">
              <div>
                <h2 className="text-lg font-semibold text-cyan-700 mb-2">
                  Contact Information
                </h2>
                <div className="space-y-3">
                  <Link
                    href="mailto:tiwariadarsh908@gmail.com"
                    className="flex items-center gap-3 text-gray-700 hover:text-cyan-600 transition-colors duration-300"
                  >
                    <span className="i-lucide-mail w-5 h-5 text-cyan-600" />
                    tiwariadarsh908@gmail.com
                  </Link>
                  <Link
                    href="tel:+919556678923"
                    className="flex items-center gap-3 text-gray-700 hover:text-cyan-600 transition-colors duration-300"
                  >
                    <span className="i-lucide-phone w-5 h-5 text-cyan-600" />
                    +91 9556678923
                  </Link>
                </div>
              </div>
              <div>
                <h2 className="text-lg font-semibold text-cyan-700 mb-2">
                  Follow Us
                </h2>
                <div className="flex gap-4">
                  <Link
                    href="https://twitter.com"
                    className="p-3 bg-white rounded-full shadow-md hover:bg-cyan-100 transition-colors duration-300"
                  >
                    <img src="/assets/icons/twitter.svg" className="h-6 w-6" alt="Twitter" />
                  </Link>
                  <Link
                    href="https://www.linkedin.com/in/adarsh-tiwari-6a41a6217/"
                    className="p-3 bg-white rounded-full shadow-md hover:bg-cyan-100 transition-colors duration-300"
                  >
                    <img src="/assets/icons/linkedin.svg" className="h-6 w-6" alt="LinkedIn" />
                  </Link>
                  <Link
                    href="https://github.com/adarsh180"
                    className="p-3 bg-white rounded-full shadow-md hover:bg-cyan-100 transition-colors duration-300"
                  >
                    <img src="/assets/icons/github.svg" className="h-6 w-6" alt="GitHub" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
          <div className="p-12 md:p-16">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <div>
                <label className="block text-sm font-medium mb-2">Name</label>
                <input
                  {...register('name')}
                  className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-cyan-600 focus:border-transparent bg-gray-50"
                />
                {errors.name && (
                  <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Email</label>
                <input
                  {...register('email')}
                  className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-cyan-600 focus:border-transparent bg-gray-50"
                />
                {errors.email && (
                  <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Subject</label>
                <input
                  {...register('subject')}
                  className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-cyan-600 focus:border-transparent bg-gray-50"
                />
                {errors.subject && (
                  <p className="text-red-500 text-sm mt-1">{errors.subject.message}</p>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Message</label>
                <textarea
                  {...register('message')}
                  className="w-full px-4 py-3 border rounded-lg h-32 focus:ring-2 focus:ring-cyan-600 focus:border-transparent bg-gray-50"
                />
                {errors.message && (
                  <p className="text-red-500 text-sm mt-1">{errors.message.message}</p>
                )}
              </div>
              <div className="space-y-4">
                <ReCAPTCHA
                  sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY || '6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI'}
                  onChange={(token) => setValue('recaptcha', token ?? '')}
                  className="mx-auto"
                />
                {errors.recaptcha && (
                  <p className="text-red-500 text-sm text-center">
                    {errors.recaptcha.message}
                  </p>
                )}
                <Button
                  type="submit"
                  className="w-full bg-cyan-600 hover:bg-cyan-700 text-white py-3 rounded-lg"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? 'Sending...' : 'Send Message'}
                </Button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}