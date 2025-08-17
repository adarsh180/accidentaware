'use client';

import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function DocsPage() {
  const sections = [
    {
      title: 'Getting Started',
      items: [
        { title: 'Quick Setup Guide', description: 'Set up your AccidentAware helmet in 5 minutes' },
        { title: 'Mobile App Installation', description: 'Download and configure the companion app' },
        { title: 'Account Registration', description: 'Create your safety profile and emergency contacts' },
        { title: 'First Ride Setup', description: 'Configure your first safety ride' }
      ]
    },
    {
      title: 'Smart Helmet Features',
      items: [
        { title: 'Accident Detection', description: 'How our AI-powered crash detection works' },
        { title: 'Emergency Response', description: 'Automatic SOS alerts and location sharing' },
        { title: 'GPS Tracking', description: 'Real-time location monitoring and history' },
        { title: 'Bluetooth Connectivity', description: 'Pairing with smartphones and devices' }
      ]
    },
    {
      title: 'Mobile App Guide',
      items: [
        { title: 'Dashboard Overview', description: 'Understanding your safety dashboard' },
        { title: 'Emergency Contacts', description: 'Managing your SOS contact list' },
        { title: 'Ride History', description: 'Viewing and analyzing your trips' },
        { title: 'Settings & Preferences', description: 'Customizing your safety preferences' }
      ]
    },
    {
      title: 'Technical Specifications',
      items: [
        { title: 'Hardware Components', description: 'Sensors, processors, and connectivity modules' },
        { title: 'Battery & Charging', description: 'Power management and charging cycles' },
        { title: 'Environmental Ratings', description: 'IP67 waterproofing and temperature ranges' },
        { title: 'Certification Standards', description: 'ISO 26262, IEC 61508 compliance details' }
      ]
    },
    {
      title: 'API Documentation',
      items: [
        { title: 'REST API Reference', description: 'Complete API endpoints and authentication' },
        { title: 'Webhook Integration', description: 'Real-time event notifications' },
        { title: 'SDK Downloads', description: 'iOS, Android, and web SDKs' },
        { title: 'Code Examples', description: 'Sample implementations and use cases' }
      ]
    },
    {
      title: 'Troubleshooting',
      items: [
        { title: 'Common Issues', description: 'Solutions to frequently encountered problems' },
        { title: 'Connectivity Problems', description: 'Bluetooth and network troubleshooting' },
        { title: 'Battery Issues', description: 'Charging and power-related solutions' },
        { title: 'Sensor Calibration', description: 'Recalibrating accident detection sensors' }
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-20">
      <div className="max-w-6xl mx-auto px-4">
        <Card className="p-10 space-y-10 rounded-3xl shadow-2xl bg-white/90 backdrop-blur-lg">
          <div className="text-center space-y-4">
            <h1 className="text-5xl font-extrabold text-indigo-800 mb-6">
              Documentation
            </h1>
            <p className="text-xl text-gray-700 max-w-3xl mx-auto">
              Complete guides, API references, and technical documentation for AccidentAware smart helmet system.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {sections.map((section) => (
              <div key={section.title} className="space-y-4">
                <h2 className="text-2xl font-semibold text-indigo-700 border-b border-indigo-200 pb-2">
                  {section.title}
                </h2>
                <div className="space-y-3">
                  {section.items.map((item) => (
                    <div key={item.title} className="p-4 rounded-lg border border-gray-200 hover:border-indigo-300 hover:bg-indigo-50/50 transition-all cursor-pointer">
                      <h3 className="font-semibold text-gray-900 mb-1">{item.title}</h3>
                      <p className="text-sm text-gray-600">{item.description}</p>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <div className="text-center space-y-6 pt-8 border-t border-gray-200">
            <h2 className="text-2xl font-semibold text-gray-900">Need More Help?</h2>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/support">
                <Button className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3">
                  Contact Support
                </Button>
              </Link>
              <Link href="/contact">
                <Button variant="outline" className="border-indigo-600 text-indigo-600 hover:bg-indigo-50 px-6 py-3">
                  Get in Touch
                </Button>
              </Link>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}