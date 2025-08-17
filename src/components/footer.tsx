'use client';

import Link from 'next/link';
import { Card } from '@/components/ui/card';
import { FaTwitter, FaLinkedin, FaGithub, FaEnvelope, FaPhone, FaMapMarkerAlt } from 'react-icons/fa';

export function Footer() {
  return (
    <Card className="mt-12 border-t rounded-none bg-gray-900 text-gray-300">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="space-y-4">
            <h3 className="font-semibold text-lg text-white">AccidentAware</h3>
            <p className="text-sm text-gray-400">
              Next-generation safety solutions designed to protect lives.
            </p>
            <div className="flex items-center space-x-2">
              <FaMapMarkerAlt className="text-gray-500" />
              <p className="text-sm text-gray-400">123 Safety Lane, Tech City</p>
            </div>
            <div className="flex items-center space-x-2">
              <FaEnvelope className="text-gray-500" />
              <p className="text-sm text-gray-400">tiwariadarsh908@gmail.com</p>
            </div>
            <div className="flex items-center space-x-2">
              <FaPhone className="text-gray-500" />
              <p className="text-sm text-gray-400">+1 (555) 123-4567</p>
            </div>
          </div>

          <div className="space-y-4">
            <h4 className="font-medium text-white">Quick Links</h4>
            <div className="flex flex-col space-y-2">
              <Link href="/about" className="hover:text-indigo-400 transition-colors">About Us</Link>
              <Link href="/features" className="hover:text-indigo-400 transition-colors">Features</Link>
              <Link href="/contact" className="hover:text-indigo-400 transition-colors">Contact</Link>
              <Link href="/privacy" className="hover:text-indigo-400 transition-colors">Privacy Policy</Link>
              <Link href="/terms" className="hover:text-indigo-400 transition-colors">Terms of Service</Link>
            </div>
          </div>

          <div className="space-y-4">
            <h4 className="font-medium text-white">Resources</h4>
            <div className="flex flex-col space-y-2">
              <Link href="/docs" className="hover:text-indigo-400 transition-colors">Documentation</Link>
              <Link href="/support" className="hover:text-indigo-400 transition-colors">Support</Link>
              <Link href="/blog" className="hover:text-indigo-400 transition-colors">Blog</Link>
              <Link href="/faq" className="hover:text-indigo-400 transition-colors">FAQ</Link>
            </div>
          </div>

          <div className="space-y-4">
            <h4 className="font-medium text-white">Connect with Us</h4>
            <div className="flex space-x-4">
              <Link href="https://twitter.com" className="hover:text-indigo-400 transition-colors">
                <FaTwitter className="h-6 w-6" />
              </Link>
              <Link href="https://www.linkedin.com/in/adarsh-tiwari-6a41a6217/" className="hover:text-indigo-400 transition-colors">
                <FaLinkedin className="h-6 w-6" />
              </Link>
              <Link href="https://github.com/adarsh180" className="hover:text-indigo-400 transition-colors">
                <FaGithub className="h-6 w-6" />
              </Link>
            </div>
            <div className="mt-4">
              <h5 className="font-medium text-white">Subscribe to our newsletter</h5>
              <div className="mt-2">
                <input
                  type="email"
                  placeholder="Your email"
                  className="bg-gray-800 border border-gray-700 rounded-md px-3 py-2 w-full text-sm text-gray-400 focus:outline-none focus:border-indigo-500"
                />
                <button className="bg-indigo-600 hover:bg-indigo-700 text-white rounded-md px-4 py-2 mt-2 w-full transition-colors">Subscribe</button>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-gray-700 text-sm text-gray-400 text-center">
          © {new Date().getFullYear()} AccidentAware. All rights reserved.
        </div>
      </div>
    </Card>
  );
}