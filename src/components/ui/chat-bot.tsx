'use client';

import { useState, useEffect, useRef } from 'react';
import { Card } from './card';
import { Button } from './button';
import { Input } from './input';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';

interface ChatContext {
  lastCategory?: string;
  followUpExpected?: boolean;
  userIntent?: string;
  lastQuestion?: string;
}

interface ActionButton {
  label: string;
  action: string;
  href?: string;
}

interface ChatMessage {
  text: string;
  sender: 'user' | 'bot';
  actions?: ActionButton[];
  isTyping?: boolean;
  timestamp?: Date;
}

type CategoryKeywords = {
  [key: string]: string[];
};

const categories: CategoryKeywords = {
  greetings: ['hi', 'hello', 'hey', 'help'],
  emergency: ['emergency', 'sos', 'accident', 'help', 'danger', 'crash'],
  connectivity: ['bluetooth', 'connect', 'pair', 'connection', 'helmet', 'device'],
  subscription: ['subscription', 'plan', 'price', 'pricing', 'cost', 'payment', 'upgrade'],
  features: ['feature', 'tracking', 'monitor', 'detect', 'alert', 'notification'],
  troubleshooting: ['problem', 'issue', 'error', 'not working', 'help', 'fix', 'trouble'],
  account: ['account', 'profile', 'login', 'signin', 'signup', 'register'],
  contacts: ['contact', 'emergency contact', 'phone', 'number', 'email'],
  safety: ['safety', 'protection', 'secure', 'safe', 'prevent']
};

export function ChatBot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputMessage, setInputMessage] = useState('');
  const [context, setContext] = useState<ChatContext>({});
  const [isTyping, setIsTyping] = useState(false);
  const { data: session } = useSession();
  const router = useRouter();
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const scrollToBottom = () => {
    if (messagesEndRef.current) {
      const behavior = isTyping ? "auto" : "smooth";
      messagesEndRef.current.scrollIntoView({ behavior, block: "end" });
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  useEffect(() => {
    if (isOpen && messages.length === 0) {
      const initialGreeting = `Hello ${session?.user?.name || 'there'}! 👋 I'm SafeRide AI, how can I help you today?`;
      setMessages([{ text: initialGreeting, sender: 'bot' }]);
    }
  }, [isOpen, session?.user?.name]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        setIsOpen(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen]);

  useEffect(() => {
    if (isOpen) {
      // Focus the input when chat opens
      inputRef.current?.focus();
    }
  }, [isOpen]);

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputMessage.trim() || isTyping) return;

    const userMessage = inputMessage.trim();
    setMessages(prev => [...prev, { text: userMessage, sender: 'user', timestamp: new Date() }]);
    setInputMessage('');
    setIsTyping(true);

    setMessages(prev => [...prev, { text: '', sender: 'bot', isTyping: true }]);

    await new Promise(resolve => setTimeout(resolve, 500));

    const botResponse = await simulateBotResponse(userMessage, session?.user?.name, context);
    
    setContext(prevContext => ({
      ...prevContext,
      lastQuestion: userMessage,
      lastCategory: detectCategory(userMessage)
    }));

    setMessages(prev => prev.filter(msg => !msg.isTyping));
    setMessages(prev => [...prev, { 
      text: botResponse.text, 
      sender: 'bot', 
      actions: botResponse.actions,
      timestamp: new Date()
    }]);
    setIsTyping(false);
  };

  const handleAction = (action: string, href?: string) => {
    if (href) {
      router.push(href);
      return;
    }

    switch (action) {
      case 'connect_helmet':
        setMessages(prev => [...prev, 
          { text: "Opening helmet connection wizard...", sender: 'bot' }
        ]);
        router.push('/dashboard');
        break;
      case 'emergency_contacts':
        setMessages(prev => [...prev, 
          { text: "Taking you to emergency contacts setup...", sender: 'bot' }
        ]);
        router.push('/dashboard/profile');
        break;
      case 'upgrade_plan':
        setMessages(prev => [...prev, 
          { text: "Opening subscription plans...", sender: 'bot' }
        ]);
        router.push('/upgrade');
        break;
    }
  };

  const detectCategory = (message: string): string | undefined => {
    const message_lower = message.toLowerCase();
    
    for (const [category, keywords] of Object.entries(categories)) {
      if (keywords.some((keyword: string) => message_lower.includes(keyword))) {
        return category;
      }
    }
    return undefined;
  };

  const getContextualResponse = (category: string, context: ChatContext) => {
    if (context.lastCategory === 'emergency' && category === 'contacts') {
      return `I see you were asking about emergency services. I'll help you set up your emergency contacts right away. Would you like to:
1. Add new emergency contacts
2. Review your current contacts
3. Test the emergency alert system`;
    }

    if (context.lastCategory === 'subscription' && category === 'features') {
      return `Great! Let me show you the premium features included in our subscription plans:
1. Advanced accident detection with AI
2. Real-time location sharing
3. 24/7 emergency support
4. Family account management

Would you like to try these features with a free trial?`;
    }

    return null;
  };

  const simulateBotResponse = async (message: string, userName?: string | null, context?: ChatContext): Promise<ChatMessage> => {
    const message_lower = message.toLowerCase();
    const category = detectCategory(message_lower);
    
    if (category && context) {
      const contextualResponse = getContextualResponse(category, context);
      if (contextualResponse) return { text: contextualResponse, sender: 'bot' };
    }

    if (message_lower.includes('connect') || message_lower.includes('pair')) {
      return {
        text: `📱 Would you like me to help you connect your helmet?`,
        sender: 'bot',
        actions: [
          { label: 'Connect Helmet', action: 'connect_helmet', href: '/dashboard' },
          { label: 'View Guide', action: 'view_guide', href: '/features#connection' }
        ]
      };
    }

    if (message_lower.includes('emergency') || message_lower.includes('sos')) {
      return {
        text: `🚨 How can I help you with emergency services?`,
        sender: 'bot',
        actions: [
          { label: 'Setup Emergency Contacts', action: 'emergency_contacts' },
          { label: 'Test Emergency System', action: 'test_emergency' },
          { label: 'View Safety Guide', action: 'safety_guide', href: '/features#safety' }
        ]
      };
    }

    if (message_lower.includes('subscription') || message_lower.includes('upgrade')) {
      return {
        text: `💎 Let me help you with our subscription plans:`,
        sender: 'bot',
        actions: [
          { label: 'View Plans', action: 'upgrade_plan', href: '/upgrade' },
          { label: 'Compare Features', action: 'compare_features', href: '/features' }
        ]
      };
    }

    for (const [category, keywords] of Object.entries(categories)) {
      if (keywords.some(keyword => message_lower.includes(keyword))) {
        switch (category) {
          case 'greetings':
            return {
              text: `Hello ${userName || 'there'}! 👋 I'm here to help you with SafeRide AI. You can ask me about:
- Connecting your smart helmet
- Emergency features and contacts
- Subscription plans and pricing
- Account management
- Safety features and monitoring
What would you like to know more about?`,
              sender: 'bot'
            };

          case 'emergency':
            return {
              text: `🚨 If you're currently in an emergency situation:
1. Stay calm and if possible, remain where you are
2. Emergency services will be automatically notified if an accident is detected
3. Your emergency contacts will receive your location automatically

To manage your emergency settings:
- Go to Dashboard > Profile > Emergency Contacts
- You can add up to 5 emergency contacts
- Test the emergency alert system in the safety settings

Would you like me to guide you to the emergency settings page?`,
              sender: 'bot'
            };

          case 'connectivity':
            return {
              text: `📱 To connect your smart helmet:
1. Ensure your helmet is charged and within range
2. Go to Dashboard > Connect Helmet
3. Put your helmet in pairing mode by pressing the power button for 5 seconds
4. Select your helmet from the list of available devices

Common connection issues:
- Make sure Bluetooth is enabled on your device
- Keep the helmet within 10 meters of your phone
- Try restarting both your phone and helmet if connection fails

Would you like help troubleshooting connection issues?`,
              sender: 'bot'
            };

          case 'subscription':
            return {
              text: `💎 Our subscription plans include:

1. Basic Safety (Free)
- Basic accident detection
- Emergency contact alerts
- Limited tracking history

2. Premium Safety ($9.99/month)
- Advanced accident detection
- Real-time tracking
- Unlimited history
- Premium support
- Family sharing up to 3 helmets

3. Enterprise
- Custom solutions for businesses
- Fleet management
- Advanced analytics

Visit our Upgrade page for more details. Would you like me to show you a comparison of all features?`,
              sender: 'bot'
            };

          case 'features':
            return {
              text: `🛡️ SafeRide AI's key features include:

1. Real-time Accident Detection
- Advanced sensors monitor your movement
- Automatic emergency response
- Impact force analysis

2. Live Location Tracking
- Real-time GPS tracking
- Safe route suggestions
- Location history

3. Smart Notifications
- Emergency alerts
- Battery status
- Maintenance reminders

Which feature would you like to learn more about?`,
              sender: 'bot'
            };

          case 'troubleshooting':
            return {
              text: `🔧 Let's help you resolve any issues. Common solutions:

1. For helmet connection issues:
- Ensure Bluetooth is enabled
- Reset your helmet
- Update your app

2. For tracking problems:
- Enable location services
- Check internet connection
- Verify GPS permissions

3. For app issues:
- Clear cache
- Reinstall the app
- Update to latest version

What specific issue are you experiencing?`,
              sender: 'bot'
            };

          case 'account':
            return {
              text: `👤 Account Management:

1. Profile Settings
- Update personal information
- Change password
- Manage notifications

2. Subscription Management
- View current plan
- Update payment method
- Cancel or upgrade subscription

3. Privacy Settings
- Location sharing preferences
- Data management
- Account deletion

What would you like to manage in your account?`,
              sender: 'bot'
            };

          case 'contacts':
            return {
              text: `📞 Emergency Contact Management:

1. Current Setup
- Add up to 5 emergency contacts
- Set contact priority
- Configure automatic alerts

2. Contact Features
- SMS notifications
- Email alerts
- Location sharing during emergencies

Would you like to add or modify your emergency contacts?`,
              sender: 'bot'
            };

          case 'safety':
            return {
              text: `🛡️ Safety Features:

1. Preventive Measures
- Real-time safety alerts
- Hazard detection
- Weather warnings

2. Emergency Response
- Automatic accident detection
- Instant emergency service notification
- Location sharing

3. Safety Statistics
- Ride analysis
- Safety score
- Improvement suggestions

Which safety feature would you like to explore?`,
              sender: 'bot'
            };
        }
      }
    }

    return {
      text: `I understand you're asking about "${message}". To help you better, could you please:
1. Use specific keywords like "emergency", "connect", or "subscription"
2. Ask about a specific feature or issue
3. Or type "help" to see all available topics

How can I clarify this for you?`,
      sender: 'bot'
    };
  };

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <AnimatePresence>
        {isOpen ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: "spring", duration: 0.5 }}
          >
            <Card className="w-80 h-96 flex flex-col shadow-xl overflow-hidden">
              <motion.div 
                className="p-4 border-b flex justify-between items-center bg-cyan-600 text-white rounded-t-xl"
                initial={{ backgroundColor: "#0891b2" }}
                whileHover={{ backgroundColor: "#0e7490" }}
                transition={{ duration: 0.2 }}
              >
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                  <h3 className="font-semibold">SafeRide AI</h3>
                </div>
                <Button 
                  variant="ghost" 
                  className="text-white hover:bg-cyan-700 transition-colors"
                  onClick={() => setIsOpen(false)}
                  aria-label="Close chat"
                >
                  ×
                </Button>
              </motion.div>
              
              <div 
                className="flex-1 overflow-y-auto p-4 space-y-4 scroll-smooth"
                aria-live="polite"
                aria-atomic="true"
              >
                <AnimatePresence mode="popLayout">
                  {messages.map((msg, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.2 }}
                      className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'} group`}
                    >
                      <div className={`flex items-end gap-2 ${msg.sender === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
                        <div className={`w-6 h-6 rounded-full flex-shrink-0 ${
                          msg.sender === 'user' ? 'bg-cyan-600' : 'bg-gray-200'
                        } flex items-center justify-center text-xs ${
                          msg.sender === 'user' ? 'text-white' : 'text-gray-600'
                        }`}>
                          {msg.sender === 'user' ? 'U' : 'AI'}
                        </div>
                        <motion.div
                          initial={{ scale: 0.9 }}
                          animate={{ scale: 1 }}
                          className={`relative max-w-[80%] rounded-lg p-3 ${
                            msg.sender === 'user'
                              ? 'bg-cyan-600 text-white'
                              : 'bg-gray-100 text-gray-800'
                          } shadow-md`}
                        >
                          {msg.isTyping ? (
                            <div className="flex gap-2 items-center h-6 px-2">
                              <motion.div
                                className="w-2 h-2 bg-gray-400 rounded-full"
                                animate={{ y: [0, -5, 0] }}
                                transition={{ 
                                  duration: 0.5, 
                                  repeat: Infinity,
                                  ease: "easeInOut"
                                }}
                              />
                              <motion.div
                                className="w-2 h-2 bg-gray-400 rounded-full"
                                animate={{ y: [0, -5, 0] }}
                                transition={{ 
                                  duration: 0.5, 
                                  repeat: Infinity,
                                  ease: "easeInOut",
                                  delay: 0.15 
                                }}
                              />
                              <motion.div
                                className="w-2 h-2 bg-gray-400 rounded-full"
                                animate={{ y: [0, -5, 0] }}
                                transition={{ 
                                  duration: 0.5, 
                                  repeat: Infinity,
                                  ease: "easeInOut",
                                  delay: 0.3 
                                }}
                              />
                            </div>
                          ) : (
                            <>
                              <div className="whitespace-pre-wrap break-words">{msg.text}</div>
                              {msg.actions && (
                                <motion.div 
                                  className="mt-2 flex flex-col gap-2"
                                  initial={{ opacity: 0 }}
                                  animate={{ opacity: 1 }}
                                  transition={{ delay: 0.3 }}
                                >
                                  {msg.actions.map((action, index) => (
                                    <Button
                                      key={index}
                                      variant="secondary"
                                      className="w-full text-sm hover:bg-gray-200 transition-colors"
                                      onClick={() => handleAction(action.action, action.href)}
                                    >
                                      {action.label}
                                    </Button>
                                  ))}
                                </motion.div>
                              )}
                              {msg.timestamp && (
                                <div 
                                  className={`absolute bottom-1 ${
                                    msg.sender === 'user' ? 'left-2' : 'right-2'
                                  } text-[10px] opacity-0 group-hover:opacity-50 transition-opacity ${
                                    msg.sender === 'user' ? 'text-white' : 'text-gray-500'
                                  }`}
                                >
                                  {msg.timestamp.toLocaleTimeString([], { 
                                    hour: '2-digit', 
                                    minute: '2-digit' 
                                  })}
                                </div>
                              )}
                            </>
                          )}
                        </motion.div>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
                <div ref={messagesEndRef} />
              </div>
              
              <form onSubmit={handleSendMessage} className="p-4 border-t">
                <div className="flex gap-2">
                  <Input
                    ref={inputRef}
                    value={inputMessage}
                    onChange={(e) => setInputMessage(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' && !e.shiftKey) {
                        e.preventDefault();
                        handleSendMessage(e as any);
                      }
                    }}
                    placeholder="Type your message..."
                    className="flex-1"
                    disabled={isTyping}
                    aria-label="Chat message"
                  />
                  <Button 
                    type="submit" 
                    disabled={isTyping || !inputMessage.trim()}
                    className={`bg-cyan-600 hover:bg-cyan-700 text-white transition-colors ${
                      (isTyping || !inputMessage.trim()) ? 'opacity-50 cursor-not-allowed' : ''
                    }`}
                    aria-label="Send message"
                  >
                    Send
                  </Button>
                </div>
              </form>
            </Card>
          </motion.div>
        ) : (
          <motion.div
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <Button
              onClick={() => setIsOpen(true)}
              className="rounded-full w-12 h-12 bg-cyan-600 hover:bg-cyan-700 text-white shadow-lg transition-all"
              aria-label="Open chat"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                className="w-6 h-6"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"
                />
              </svg>
            </Button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}