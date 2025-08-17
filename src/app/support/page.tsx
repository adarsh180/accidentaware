'use client';

import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { FaPhone, FaEnvelope, FaClock, FaHeadset } from 'react-icons/fa';

export default function SupportPage() {
  const supportChannels = [
    {
      title: '24/7 Emergency Support',
      icon: FaHeadset,
      description: 'Immediate assistance for safety-critical issues',
      contact: '+1-800-ACCIDENT',
      availability: 'Available 24/7'
    },
    {
      title: 'Technical Support',
      icon: FaPhone,
      description: 'Help with setup, configuration, and troubleshooting',
      contact: '+1-555-TECH-HELP',
      availability: 'Mon-Fri 9AM-6PM EST'
    },
    {
      title: 'Email Support',
      icon: FaEnvelope,
      description: 'Detailed technical queries and documentation requests',
      contact: 'support@accidentaware.com',
      availability: 'Response within 24 hours'
    }
  ];

  const commonIssues = [
    {
      category: 'Connectivity Issues',
      problems: [
        { issue: 'Helmet not connecting to phone', solution: 'Reset Bluetooth, ensure app permissions are granted' },
        { issue: 'GPS not working', solution: 'Check location permissions, ensure clear sky view' },
        { issue: 'App crashes on startup', solution: 'Update app, restart phone, clear app cache' }
      ]
    },
    {
      category: 'Hardware Problems',
      problems: [
        { issue: 'Battery draining quickly', solution: 'Check for background apps, reduce sensor sensitivity' },
        { issue: 'Sensors not responding', solution: 'Calibrate sensors in app settings, check for physical damage' },
        { issue: 'Charging issues', solution: 'Clean charging port, use original cable, check power source' }
      ]
    },
    {
      category: 'Safety Features',
      problems: [
        { issue: 'False accident alerts', solution: 'Adjust sensitivity settings, ensure proper helmet fit' },
        { issue: 'Emergency contacts not receiving alerts', solution: 'Verify contact numbers, check network connectivity' },
        { issue: 'Location sharing not working', solution: 'Enable location services, check data connection' }
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-100 py-20">
      <div className="max-w-6xl mx-auto px-4">
        <Card className="p-10 space-y-10 rounded-3xl shadow-2xl bg-white/90 backdrop-blur-lg">
          <div className="text-center space-y-4">
            <h1 className="text-5xl font-extrabold text-green-800 mb-6">
              Support Center
            </h1>
            <p className="text-xl text-gray-700 max-w-3xl mx-auto">
              Get help with your AccidentAware helmet. Our support team is here to ensure your safety system works perfectly.
            </p>
          </div>

          <section className="space-y-8">
            <h2 className="text-3xl font-semibold text-green-700 text-center">Contact Support</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {supportChannels.map((channel) => (
                <div key={channel.title} className="p-6 rounded-xl border border-gray-200 hover:border-green-300 hover:bg-green-50/50 transition-all">
                  <div className="text-center space-y-4">
                    <channel.icon className="w-12 h-12 text-green-600 mx-auto" />
                    <h3 className="text-xl font-semibold text-gray-900">{channel.title}</h3>
                    <p className="text-gray-600">{channel.description}</p>
                    <div className="space-y-2">
                      <p className="font-semibold text-green-700">{channel.contact}</p>
                      <p className="text-sm text-gray-500 flex items-center justify-center gap-2">
                        <FaClock className="w-4 h-4" />
                        {channel.availability}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section className="space-y-8">
            <h2 className="text-3xl font-semibold text-green-700 text-center">Common Issues & Solutions</h2>
            <div className="space-y-6">
              {commonIssues.map((category) => (
                <div key={category.category} className="space-y-4">
                  <h3 className="text-2xl font-semibold text-green-600 border-b border-green-200 pb-2">
                    {category.category}
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {category.problems.map((problem, index) => (
                      <div key={index} className="p-4 rounded-lg border border-gray-200 hover:border-green-300 hover:bg-green-50/30 transition-all">
                        <h4 className="font-semibold text-gray-900 mb-2">{problem.issue}</h4>
                        <p className="text-sm text-gray-600">{problem.solution}</p>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section className="space-y-6 pt-8 border-t border-gray-200">
            <h2 className="text-2xl font-semibold text-gray-900 text-center">Additional Resources</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <Link href="/docs">
                <Button variant="outline" className="w-full border-green-600 text-green-600 hover:bg-green-50">
                  Documentation
                </Button>
              </Link>
              <Link href="/faq">
                <Button variant="outline" className="w-full border-green-600 text-green-600 hover:bg-green-50">
                  FAQ
                </Button>
              </Link>
              <Link href="/contact">
                <Button variant="outline" className="w-full border-green-600 text-green-600 hover:bg-green-50">
                  Contact Us
                </Button>
              </Link>
              <Button className="w-full bg-green-600 hover:bg-green-700 text-white">
                Live Chat
              </Button>
            </div>
          </section>
        </Card>
      </div>
    </div>
  );
}