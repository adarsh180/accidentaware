'use client';

import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { FaChevronDown, FaChevronUp } from 'react-icons/fa';

export default function FAQPage() {
  const [openItems, setOpenItems] = useState<number[]>([]);

  const toggleItem = (index: number) => {
    setOpenItems(prev => 
      prev.includes(index) 
        ? prev.filter(i => i !== index)
        : [...prev, index]
    );
  };

  const faqCategories = [
    {
      category: 'General Questions',
      questions: [
        {
          question: 'What is AccidentAware and how does it work?',
          answer: 'AccidentAware is an AI-powered smart helmet system that detects accidents in real-time using advanced sensors and machine learning algorithms. When an accident is detected, it automatically sends SOS alerts to your emergency contacts with your exact location.'
        },
        {
          question: 'How accurate is the accident detection?',
          answer: 'Our system achieves 95%+ accuracy in accident detection using a combination of accelerometers, gyroscopes, and AI algorithms. The system is trained to differentiate between normal riding activities and actual accidents to minimize false alarms.'
        },
        {
          question: 'What happens if there\'s a false alarm?',
          answer: 'If the system detects a potential accident, you have 30 seconds to cancel the alert through the mobile app or helmet controls. If no response is received, emergency contacts are automatically notified.'
        },
        {
          question: 'Do I need internet connectivity for the helmet to work?',
          answer: 'Basic safety features work offline, but emergency alerts, GPS tracking, and app connectivity require internet access. The helmet can store data locally and sync when connectivity is restored.'
        }
      ]
    },
    {
      category: 'Technical Specifications',
      questions: [
        {
          question: 'What is the battery life of the smart helmet?',
          answer: 'The helmet provides 8-12 hours of continuous use depending on features enabled. GPS tracking and Bluetooth connectivity consume more power. The helmet includes a USB-C charging port for convenient charging.'
        },
        {
          question: 'Is the helmet waterproof?',
          answer: 'Yes, all AccidentAware helmets are IP67 rated, making them fully waterproof and dustproof. They can withstand heavy rain and harsh weather conditions without affecting functionality.'
        },
        {
          question: 'What sensors are included in the helmet?',
          answer: 'Each helmet includes a 9-axis IMU (accelerometer, gyroscope, magnetometer), GPS module, Bluetooth 5.0 chip, and environmental sensors for temperature and humidity monitoring.'
        },
        {
          question: 'Can I use the helmet without the mobile app?',
          answer: 'Basic safety features work independently, but for full functionality including emergency contact management, ride history, and settings customization, the mobile app is required.'
        }
      ]
    },
    {
      category: 'Safety & Emergency Features',
      questions: [
        {
          question: 'How many emergency contacts can I add?',
          answer: 'You can add up to 5 emergency contacts who will be notified in case of an accident. The system will attempt to contact them in the order you specify until someone responds.'
        },
        {
          question: 'What information is sent during an emergency alert?',
          answer: 'Emergency alerts include your exact GPS location, timestamp, severity level of the detected impact, and a link to track your location in real-time. Medical information from your profile is also included if available.'
        },
        {
          question: 'Does the system work internationally?',
          answer: 'Yes, the GPS and cellular connectivity work globally. However, emergency service integration may vary by country. We recommend updating your emergency contacts when traveling internationally.'
        },
        {
          question: 'Can I manually trigger an emergency alert?',
          answer: 'Yes, you can manually trigger an SOS alert through the helmet\'s emergency button or the mobile app. This is useful in situations where you need help but haven\'t been in an accident.'
        }
      ]
    },
    {
      category: 'Product & Pricing',
      questions: [
        {
          question: 'What\'s the difference between Basic and Smart helmets?',
          answer: 'Basic helmets provide essential safety protection with ISI certification. Smart helmets include all safety features plus accident detection, GPS tracking, emergency alerts, Bluetooth connectivity, and mobile app integration.'
        },
        {
          question: 'Is there a subscription fee for the smart features?',
          answer: 'The first year of smart features is included with your helmet purchase. After that, there\'s a small monthly subscription fee to cover cellular connectivity and cloud services.'
        },
        {
          question: 'What warranty is provided with the helmets?',
          answer: 'All helmets come with a 2-year manufacturer warranty covering defects and hardware issues. Smart features are covered for 1 year, with extended warranty options available.'
        },
        {
          question: 'Can I upgrade my basic helmet to smart features?',
          answer: 'Unfortunately, smart features require integrated hardware that cannot be retrofitted to basic helmets. However, we offer trade-in programs for existing customers looking to upgrade.'
        }
      ]
    },
    {
      category: 'Setup & Troubleshooting',
      questions: [
        {
          question: 'How do I set up my smart helmet for the first time?',
          answer: 'Download the AccidentAware app, create an account, pair your helmet via Bluetooth, add emergency contacts, and complete the safety profile setup. The entire process takes about 10 minutes.'
        },
        {
          question: 'My helmet won\'t connect to the app. What should I do?',
          answer: 'Ensure Bluetooth is enabled, the helmet is charged, and you\'re within 10 meters. Try restarting both devices and clearing the app cache. If issues persist, contact our support team.'
        },
        {
          question: 'How do I calibrate the accident detection sensors?',
          answer: 'Sensor calibration is automatic during the first few rides. For manual calibration, go to Settings > Sensors in the app and follow the calibration wizard while wearing the helmet.'
        },
        {
          question: 'Can multiple people use the same helmet?',
          answer: 'While physically possible, each helmet should be paired with one user\'s profile for optimal safety. Different users have different emergency contacts and medical information that are crucial during emergencies.'
        }
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-red-100 py-20">
      <div className="max-w-4xl mx-auto px-4">
        <Card className="p-10 space-y-10 rounded-3xl shadow-2xl bg-white/90 backdrop-blur-lg">
          <div className="text-center space-y-4">
            <h1 className="text-5xl font-extrabold text-orange-800 mb-6">
              Frequently Asked Questions
            </h1>
            <p className="text-xl text-gray-700 max-w-3xl mx-auto">
              Find answers to common questions about AccidentAware smart helmets, safety features, and technical specifications.
            </p>
          </div>

          <div className="space-y-8">
            {faqCategories.map((category, categoryIndex) => (
              <div key={categoryIndex} className="space-y-4">
                <h2 className="text-2xl font-semibold text-orange-700 border-b border-orange-200 pb-2">
                  {category.category}
                </h2>
                <div className="space-y-3">
                  {category.questions.map((faq, questionIndex) => {
                    const itemIndex = categoryIndex * 100 + questionIndex;
                    const isOpen = openItems.includes(itemIndex);
                    
                    return (
                      <div key={questionIndex} className="border border-gray-200 rounded-lg overflow-hidden">
                        <button
                          onClick={() => toggleItem(itemIndex)}
                          className="w-full p-4 text-left bg-gray-50 hover:bg-gray-100 transition-colors flex items-center justify-between"
                        >
                          <span className="font-semibold text-gray-900">{faq.question}</span>
                          {isOpen ? (
                            <FaChevronUp className="text-orange-600 flex-shrink-0 ml-2" />
                          ) : (
                            <FaChevronDown className="text-orange-600 flex-shrink-0 ml-2" />
                          )}
                        </button>
                        {isOpen && (
                          <div className="p-4 bg-white border-t border-gray-200">
                            <p className="text-gray-700 leading-relaxed">{faq.answer}</p>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>

          <div className="text-center space-y-6 pt-8 border-t border-gray-200">
            <h2 className="text-2xl font-semibold text-gray-900">Still Have Questions?</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Can't find the answer you're looking for? Our support team is here to help you with any questions about AccidentAware products and services.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button className="bg-orange-600 hover:bg-orange-700 text-white px-6 py-3">
                Contact Support
              </Button>
              <Button variant="outline" className="border-orange-600 text-orange-600 hover:bg-orange-50 px-6 py-3">
                Live Chat
              </Button>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}