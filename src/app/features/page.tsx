'use client';

import { Card } from '@/components/ui/card';
import { GiArtificialIntelligence, GiEarthCrack, GiGps, GiNetworkBars, GiProgression, GiRadarSweep, GiTestTubes, GiThorHammer } from 'react-icons/gi';
import { MdSecurity, MdSpeed, MdSettingsRemote } from 'react-icons/md';
import { FaShieldAlt, FaChartLine } from 'react-icons/fa';

export default function FeaturesPage() {
  const coreFeatures = [
    {
      title: 'Real-Time Accident Detection',
      icon: GiRadarSweep,
      description: 'High-precision MEMS sensors with robust microcontrollers for instant impact recognition.',
    },
    {
      title: 'AI-Driven Analytics',
      icon: GiArtificialIntelligence,
      description: 'Advanced machine learning algorithms differentiate between minor bumps and severe collisions.',
    },
    {
      title: 'Emergency Response System',
      icon: GiEarthCrack,
      description: 'Automated alerts to contacts & authorities with 500ms response time.',
    },
    {
      title: 'Precision GPS Tracking',
      icon: GiGps,
      description: 'Dual-band GNSS modules provide <2m accuracy for real-time location sharing.',
    },
    {
      title: 'IoT Ecosystem Integration',
      icon: GiNetworkBars,
      description: 'Secure MQTT protocol enables seamless communication across smart devices.',
    },
    {
      title: 'Military-Grade Durability',
      icon: GiThorHammer,
      description: 'IP67 rated housing withstands extreme temperatures (-20°C to 60°C).',
    },
    {
      title: 'Predictive Analytics',
      icon: GiProgression,
      description: 'Machine learning models predict accident-prone scenarios using historical data.',
    },
    {
      title: 'Certified Safety Standards',
      icon: GiTestTubes,
      description: 'Compliant with ISO 26262 (ASIL-B) and IEC 61508 (SIL-2) safety protocols.',
    },
  ];

  const advancedFeatures = [
    {
      title: 'Enhanced Security Protocols',
      icon: MdSecurity,
      description: 'End-to-end encryption and secure authentication for data protection.',
    },
    {
      title: 'High-Speed Processing',
      icon: MdSpeed,
      description: 'Optimized algorithms and powerful processors for rapid data analysis.',
    },
    {
      title: 'Remote Configuration & Updates',
      icon: MdSettingsRemote,
      description: 'Over-the-air updates and remote configuration for seamless system management.',
    },
    {
      title: 'Advanced Shielding',
      icon: FaShieldAlt,
      description: 'Electromagnetic interference shielding for reliable operation in harsh environments.',
    },
  ];

  const analyticsAndInsights = [
    {
      title: 'Comprehensive Data Analytics',
      icon: FaChartLine,
      description: 'Detailed reports and analytics on accident data and system performance.',
    },
    {
      title: 'Predictive Maintenance',
      icon: GiProgression,
      description: 'AI-driven insights to predict and prevent system failures.',
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-indigo-200 py-20">
      <div className="max-w-7xl mx-auto px-4">
        <Card className="p-10 space-y-16 rounded-3xl shadow-2xl bg-white/90 backdrop-blur-lg">
          <div className="text-center space-y-4">
            <h1 className="text-5xl font-extrabold bg-gradient-to-r from-blue-600 to-indigo-800 bg-clip-text text-transparent">
              Advanced Safety Features
            </h1>
            <p className="text-xl text-gray-700 max-w-3xl mx-auto leading-relaxed">
              Our system combines cutting-edge hardware with intelligent software to create a comprehensive protection ecosystem.
            </p>
          </div>

          {/* Core Features Section */}
          <section className="space-y-8">
            <h2 className="text-4xl font-semibold text-indigo-700 text-center">Core Safety Features</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {coreFeatures.map((feature) => (
                <div key={feature.title} className="group p-6 rounded-xl border border-gray-200 hover:border-indigo-200 hover:bg-indigo-50/20 transition-all duration-300">
                  <div className="flex flex-col items-center text-center space-y-4">
                    <feature.icon className="w-12 h-12 text-indigo-600 group-hover:text-indigo-800 transition-colors" />
                    <h3 className="text-xl font-semibold text-gray-900">{feature.title}</h3>
                    <p className="text-gray-600 leading-relaxed">{feature.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Advanced Features Section */}
          <section className="space-y-8">
            <h2 className="text-4xl font-semibold text-indigo-700 text-center">Advanced Technology Features</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {advancedFeatures.map((feature) => (
                <div key={feature.title} className="group p-6 rounded-xl border border-gray-200 hover:border-indigo-200 hover:bg-indigo-50/20 transition-all duration-300">
                  <div className="flex flex-col items-center text-center space-y-4">
                    <feature.icon className="w-12 h-12 text-indigo-600 group-hover:text-indigo-800 transition-colors" />
                    <h3 className="text-xl font-semibold text-gray-900">{feature.title}</h3>
                    <p className="text-gray-600 leading-relaxed">{feature.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Analytics and Insights Section */}
          <section className="space-y-8">
            <h2 className="text-4xl font-semibold text-indigo-700 text-center">Analytics and Insights</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {analyticsAndInsights.map((feature) => (
                <div key={feature.title} className="group p-6 rounded-xl border border-gray-200 hover:border-indigo-200 hover:bg-indigo-50/20 transition-all duration-300">
                  <div className="flex flex-col items-center text-center space-y-4">
                    <feature.icon className="w-12 h-12 text-indigo-600 group-hover:text-indigo-800 transition-colors" />
                    <h3 className="text-xl font-semibold text-gray-900">{feature.title}</h3>
                    <p className="text-gray-600 leading-relaxed">{feature.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          <div className="text-center space-y-6">
            <h2 className="text-3xl font-bold text-gray-900">Continuous Safety Innovation</h2>
            <p className="text-gray-600 max-w-2xl mx-auto leading-relaxed">
              Our R&D team constantly updates algorithms and expands hardware capabilities through over-the-air updates, ensuring your protection evolves with advancing technology.
            </p>
          </div>
        </Card>
      </div>
    </div>
  );
}