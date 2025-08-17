'use client';

import { Card } from '@/components/ui/card';

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-100 py-20">
      <div className="max-w-4xl mx-auto px-4">
        <Card className="p-10 space-y-8 rounded-3xl shadow-2xl bg-white/90 backdrop-blur-lg">
          <div className="text-center space-y-4">
            <h1 className="text-5xl font-extrabold text-blue-800 mb-6">
              Privacy Policy
            </h1>
            <p className="text-lg text-gray-600">
              Last updated: January 1, 2024
            </p>
          </div>

          <div className="prose prose-lg max-w-none space-y-8">
            <section>
              <h2 className="text-2xl font-semibold text-blue-700 mb-4">1. Information We Collect</h2>
              <div className="space-y-4 text-gray-700">
                <h3 className="text-xl font-semibold">Personal Information</h3>
                <p>We collect information you provide directly to us, including:</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Name, email address, and phone number</li>
                  <li>Emergency contact information</li>
                  <li>Medical information (optional, for emergency purposes)</li>
                  <li>Account credentials and preferences</li>
                </ul>

                <h3 className="text-xl font-semibold">Device and Usage Data</h3>
                <ul className="list-disc pl-6 space-y-2">
                  <li>GPS location data (only when helmet is active)</li>
                  <li>Sensor data from accelerometers and gyroscopes</li>
                  <li>Ride history and patterns</li>
                  <li>Device performance and diagnostic information</li>
                </ul>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-blue-700 mb-4">2. How We Use Your Information</h2>
              <div className="space-y-4 text-gray-700">
                <p>We use the information we collect to:</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Provide emergency response services and accident detection</li>
                  <li>Send alerts to your designated emergency contacts</li>
                  <li>Improve our safety algorithms and product features</li>
                  <li>Provide customer support and technical assistance</li>
                  <li>Send important safety updates and product notifications</li>
                  <li>Analyze usage patterns to enhance user experience</li>
                </ul>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-blue-700 mb-4">3. Information Sharing and Disclosure</h2>
              <div className="space-y-4 text-gray-700">
                <h3 className="text-xl font-semibold">Emergency Situations</h3>
                <p>In case of detected accidents, we share your location and emergency information with:</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Your designated emergency contacts</li>
                  <li>Emergency services (when applicable)</li>
                  <li>Medical personnel (if medical information is provided)</li>
                </ul>

                <h3 className="text-xl font-semibold">Service Providers</h3>
                <p>We may share information with trusted third parties who assist us in:</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Cloud storage and data processing</li>
                  <li>SMS and communication services</li>
                  <li>Analytics and performance monitoring</li>
                  <li>Customer support services</li>
                </ul>

                <h3 className="text-xl font-semibold">Legal Requirements</h3>
                <p>We may disclose information when required by law or to protect our rights and safety.</p>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-blue-700 mb-4">4. Data Security</h2>
              <div className="space-y-4 text-gray-700">
                <p>We implement industry-standard security measures to protect your information:</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>End-to-end encryption for sensitive data transmission</li>
                  <li>Secure cloud storage with access controls</li>
                  <li>Regular security audits and vulnerability assessments</li>
                  <li>Employee training on data protection practices</li>
                  <li>Multi-factor authentication for account access</li>
                </ul>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-blue-700 mb-4">5. Your Privacy Rights</h2>
              <div className="space-y-4 text-gray-700">
                <p>You have the right to:</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Access and review your personal information</li>
                  <li>Correct inaccurate or incomplete data</li>
                  <li>Delete your account and associated data</li>
                  <li>Opt-out of non-essential communications</li>
                  <li>Control location sharing settings</li>
                  <li>Request data portability</li>
                </ul>
                <p>To exercise these rights, contact us at privacy@accidentaware.com</p>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-blue-700 mb-4">6. Location Data</h2>
              <div className="space-y-4 text-gray-700">
                <p>Location data is critical for our safety services:</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>GPS data is only collected when the helmet is active</li>
                  <li>Location sharing can be controlled through app settings</li>
                  <li>Historical location data is stored for ride history and analytics</li>
                  <li>Emergency location sharing cannot be disabled for safety reasons</li>
                  <li>You can delete location history at any time</li>
                </ul>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-blue-700 mb-4">7. Data Retention</h2>
              <div className="space-y-4 text-gray-700">
                <p>We retain your information for as long as necessary to provide our services:</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Account information: Until account deletion</li>
                  <li>Ride history: 2 years or until deletion requested</li>
                  <li>Emergency contact data: Until updated or account deleted</li>
                  <li>Sensor data: 30 days for performance optimization</li>
                  <li>Support communications: 3 years for quality assurance</li>
                </ul>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-blue-700 mb-4">8. Children's Privacy</h2>
              <div className="space-y-4 text-gray-700">
                <p>Our services are not intended for children under 13. We do not knowingly collect personal information from children under 13. If we become aware that we have collected such information, we will take steps to delete it promptly.</p>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-blue-700 mb-4">9. International Data Transfers</h2>
              <div className="space-y-4 text-gray-700">
                <p>Your information may be transferred to and processed in countries other than your own. We ensure appropriate safeguards are in place to protect your information in accordance with applicable data protection laws.</p>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-blue-700 mb-4">10. Changes to This Policy</h2>
              <div className="space-y-4 text-gray-700">
                <p>We may update this privacy policy from time to time. We will notify you of any material changes by:</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Sending an email notification</li>
                  <li>Posting a notice in the mobile app</li>
                  <li>Updating the "Last updated" date at the top of this policy</li>
                </ul>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-blue-700 mb-4">11. Contact Us</h2>
              <div className="space-y-4 text-gray-700">
                <p>If you have any questions about this privacy policy or our data practices, please contact us:</p>
                <ul className="list-none space-y-2">
                  <li><strong>Email:</strong> privacy@accidentaware.com</li>
                  <li><strong>Phone:</strong> +1-555-PRIVACY</li>
                  <li><strong>Address:</strong> AccidentAware Privacy Team, 123 Safety Lane, Tech City, TC 12345</li>
                </ul>
              </div>
            </section>
          </div>
        </Card>
      </div>
    </div>
  );
}