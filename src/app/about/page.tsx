'use client';

import { Card } from '@/components/ui/card';
import Image from 'next/image';

const teamMembers = [
  {
    name: 'Adarsh Tiwari',
    role: 'Team Leader',
    image: '/assets/images/admins/Adarsh-Tiwari.jpg',
  },
];

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 to-purple-100 py-20">
      <div className="max-w-6xl mx-auto px-4">
        <Card className="p-10 space-y-10 rounded-3xl shadow-2xl bg-white/90 backdrop-blur-lg">
          <div className="text-center">
            <h1 className="text-5xl font-extrabold text-indigo-800 mb-6 tracking-tight">
              About AccidentAware
            </h1>
            <p className="text-lg text-gray-700 leading-relaxed max-w-2xl mx-auto">
              We're dedicated to revolutionizing road safety with cutting-edge AI-powered solutions.
            </p>
          </div>

          <section className="space-y-8">
            <div className="text-center">
              <h2 className="text-3xl font-semibold text-indigo-700 mb-4 tracking-wide">
                Our Mission
              </h2>
              <p className="text-xl text-gray-700 leading-relaxed max-w-3xl mx-auto">
                To create a safer world through innovative accident detection and rapid response technologies.
              </p>
            </div>
          </section>

          <section className="space-y-8">
            <div className="text-center">
              <h2 className="text-3xl font-semibold text-indigo-700 mb-4 tracking-wide">
                Technology & Innovation
              </h2>
              <p className="text-xl text-gray-700 leading-relaxed max-w-3xl mx-auto">
                We leverage state-of-the-art technologies to ensure real-time accident detection and emergency notifications.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-4">
                <h3 className="text-2xl font-semibold text-indigo-600">Smart Sensors & IoT</h3>
                <p className="text-lg text-gray-700 leading-relaxed">
                  High-sensitivity sensors and seamless IoT integration for instant communication.
                </p>
              </div>
              <div className="space-y-4">
                <h3 className="text-2xl font-semibold text-indigo-600">AI-Driven Analytics</h3>
                <p className="text-lg text-gray-700 leading-relaxed">
                  Advanced machine learning algorithms for precise impact analysis.
                </p>
              </div>
              <div className="space-y-4">
                <h3 className="text-2xl font-semibold text-indigo-600">GPS & Location Tracking</h3>
                <p className="text-lg text-gray-700 leading-relaxed">
                  Real-time location data for rapid emergency response.
                </p>
              </div>
              <div className="space-y-4">
                <h3 className="text-2xl font-semibold text-indigo-600">Advanced Microcontrollers</h3>
                <p className="text-lg text-gray-700 leading-relaxed">
                  Robust processing for efficient data handling.
                </p>
              </div>
            </div>
          </section>

          <section className="space-y-8">
            <div className="text-center">
              <h2 className="text-3xl font-semibold text-indigo-700 mb-4 tracking-wide">
                Our Team
              </h2>
              <p className="text-xl text-gray-700 leading-relaxed max-w-3xl mx-auto">
                Meet the passionate individuals driving our mission forward.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-8">
              {teamMembers.map((member) => (
                <div key={member.name} className="text-center">
                  <div className="w-48 h-48 rounded-full overflow-hidden mx-auto mb-4">
                    <Image
                      src={member.image}
                      alt={member.name}
                      width={192}
                      height={192}
                      className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                    />
                  </div>
                  <h3 className="font-semibold text-lg text-indigo-800">{member.name}</h3>
                  <p className="text-gray-600">{member.role}</p>
                </div>
              ))}
            </div>
          </section>
        </Card>
      </div>
    </div>
  );
}