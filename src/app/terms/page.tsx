'use client';

import { Card } from '@/components/ui/card';

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-gray-100 py-20">
      <div className="max-w-4xl mx-auto px-4">
        <Card className="p-10 space-y-8 rounded-3xl shadow-2xl bg-white/90 backdrop-blur-lg">
          <div className="text-center space-y-4">
            <h1 className="text-5xl font-extrabold text-slate-800 mb-6">
              Terms of Service
            </h1>
            <p className="text-lg text-gray-600">
              Last updated: January 1, 2024
            </p>
          </div>

          <div className="prose prose-lg max-w-none space-y-8">
            <section>
              <h2 className="text-2xl font-semibold text-slate-700 mb-4">1. Acceptance of Terms</h2>
              <div className="space-y-4 text-gray-700">
                <p>By accessing and using AccidentAware products and services, you accept and agree to be bound by the terms and provision of this agreement. If you do not agree to abide by the above, please do not use this service.</p>
                <p>These terms apply to all users of AccidentAware smart helmets, mobile applications, and related services.</p>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-slate-700 mb-4">2. Description of Service</h2>
              <div className="space-y-4 text-gray-700">
                <p>AccidentAware provides:</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Smart helmet hardware with integrated safety sensors</li>
                  <li>AI-powered accident detection and emergency response system</li>
                  <li>Mobile applications for iOS and Android devices</li>
                  <li>Cloud-based data processing and storage services</li>
                  <li>GPS tracking and location sharing capabilities</li>
                  <li>Emergency contact notification services</li>
                </ul>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-slate-700 mb-4">3. User Responsibilities</h2>
              <div className="space-y-4 text-gray-700">
                <h3 className="text-xl font-semibold">Proper Usage</h3>
                <p>You agree to:</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Use the helmet according to manufacturer instructions</li>
                  <li>Maintain the device in good working condition</li>
                  <li>Keep emergency contact information current and accurate</li>
                  <li>Ensure the helmet is properly charged before use</li>
                  <li>Report any malfunctions or safety concerns immediately</li>
                </ul>

                <h3 className="text-xl font-semibold">Account Security</h3>
                <p>You are responsible for:</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Maintaining the confidentiality of your account credentials</li>
                  <li>All activities that occur under your account</li>
                  <li>Notifying us immediately of any unauthorized use</li>
                  <li>Providing accurate and complete information</li>
                </ul>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-slate-700 mb-4">4. Safety Disclaimers</h2>
              <div className="space-y-4 text-gray-700">
                <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 rounded">
                  <p className="font-semibold text-yellow-800">IMPORTANT SAFETY NOTICE:</p>
                  <ul className="list-disc pl-6 space-y-2 text-yellow-700">
                    <li>AccidentAware is a safety assistance system, not a replacement for safe riding practices</li>
                    <li>The system may not detect all types of accidents or impacts</li>
                    <li>False positives and false negatives may occur</li>
                    <li>Emergency response depends on network connectivity and may be delayed</li>
                    <li>Users should always wear additional protective gear as recommended</li>
                  </ul>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-slate-700 mb-4">5. Limitation of Liability</h2>
              <div className="space-y-4 text-gray-700">
                <p>To the maximum extent permitted by law:</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>AccidentAware shall not be liable for any indirect, incidental, special, or consequential damages</li>
                  <li>Our total liability shall not exceed the amount paid for the product or service</li>
                  <li>We do not guarantee uninterrupted or error-free service</li>
                  <li>Emergency response times may vary based on location and network conditions</li>
                  <li>The system's effectiveness may be impacted by environmental factors</li>
                </ul>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-slate-700 mb-4">6. Warranty and Returns</h2>
              <div className="space-y-4 text-gray-700">
                <h3 className="text-xl font-semibold">Hardware Warranty</h3>
                <ul className="list-disc pl-6 space-y-2">
                  <li>2-year limited warranty on hardware defects</li>
                  <li>1-year warranty on smart features and software</li>
                  <li>Warranty void if device is modified or misused</li>
                  <li>Normal wear and tear not covered</li>
                </ul>

                <h3 className="text-xl font-semibold">Return Policy</h3>
                <ul className="list-disc pl-6 space-y-2">
                  <li>30-day return period for unused products</li>
                  <li>Products must be in original condition with all accessories</li>
                  <li>Return shipping costs may apply</li>
                  <li>Refunds processed within 5-10 business days</li>
                </ul>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibent text-slate-700 mb-4">7. Subscription Services</h2>
              <div className="space-y-4 text-gray-700">
                <p>Smart features require a subscription after the first year:</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Monthly or annual subscription plans available</li>
                  <li>Automatic renewal unless cancelled</li>
                  <li>30-day notice required for cancellation</li>
                  <li>Pro-rated refunds not available</li>
                  <li>Price changes with 30-day advance notice</li>
                </ul>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-slate-700 mb-4">8. Intellectual Property</h2>
              <div className="space-y-4 text-gray-700">
                <p>All content, features, and functionality are owned by AccidentAware and protected by:</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Copyright, trademark, and patent laws</li>
                  <li>International intellectual property treaties</li>
                  <li>Trade secret protections</li>
                </ul>
                <p>You may not reproduce, distribute, or create derivative works without written permission.</p>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-slate-700 mb-4">9. Privacy and Data</h2>
              <div className="space-y-4 text-gray-700">
                <p>Your privacy is important to us. Please review our Privacy Policy, which also governs your use of the service, to understand our practices.</p>
                <p>By using our services, you consent to the collection and use of information as outlined in our Privacy Policy.</p>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-slate-700 mb-4">10. Prohibited Uses</h2>
              <div className="space-y-4 text-gray-700">
                <p>You may not use our services:</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>For any unlawful purpose or to solicit unlawful acts</li>
                  <li>To violate any international, federal, provincial, or state regulations or laws</li>
                  <li>To transmit or procure the sending of any advertising or promotional material</li>
                  <li>To impersonate or attempt to impersonate the company or other users</li>
                  <li>To engage in any other conduct that restricts or inhibits anyone's use of the service</li>
                </ul>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-slate-700 mb-4">11. Termination</h2>
              <div className="space-y-4 text-gray-700">
                <p>We may terminate or suspend your account and access to services:</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Immediately, without prior notice, for violation of these terms</li>
                  <li>For non-payment of subscription fees</li>
                  <li>For misuse of the service or safety features</li>
                  <li>At our sole discretion for any reason</li>
                </ul>
                <p>Upon termination, your right to use the service will cease immediately.</p>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-slate-700 mb-4">12. Governing Law</h2>
              <div className="space-y-4 text-gray-700">
                <p>These terms shall be governed by and construed in accordance with the laws of [Your Jurisdiction], without regard to its conflict of law provisions.</p>
                <p>Any disputes arising from these terms will be resolved through binding arbitration.</p>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-slate-700 mb-4">13. Changes to Terms</h2>
              <div className="space-y-4 text-gray-700">
                <p>We reserve the right to modify these terms at any time. Changes will be effective immediately upon posting. Your continued use of the service after changes constitutes acceptance of the new terms.</p>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-slate-700 mb-4">14. Contact Information</h2>
              <div className="space-y-4 text-gray-700">
                <p>For questions about these Terms of Service, please contact us:</p>
                <ul className="list-none space-y-2">
                  <li><strong>Email:</strong> legal@accidentaware.com</li>
                  <li><strong>Phone:</strong> +1-555-LEGAL-HELP</li>
                  <li><strong>Address:</strong> AccidentAware Legal Department, 123 Safety Lane, Tech City, TC 12345</li>
                </ul>
              </div>
            </section>
          </div>
        </Card>
      </div>
    </div>
  );
}