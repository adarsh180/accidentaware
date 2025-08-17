// Razorpay configuration and helper functions

export interface RazorpayOrder {
  id: string;
  amount: number;
  currency: string;
  receipt: string;
  status: string;
}

export interface RazorpayPayment {
  razorpay_payment_id: string;
  razorpay_order_id: string;
  razorpay_signature: string;
}

// Validate Razorpay configuration
const validateConfig = () => {
  // Only validate on server side
  if (typeof window === 'undefined') {
    if (!process.env.RAZORPAY_KEY_ID) {
      throw new Error('RAZORPAY_KEY_ID is not configured in environment variables');
    }
    if (!process.env.RAZORPAY_KEY_SECRET) {
      throw new Error('RAZORPAY_KEY_SECRET is not configured in environment variables');
    }
  }
};

export const razorpayConfig = {
  key_id: typeof window === 'undefined' ? process.env.RAZORPAY_KEY_ID : process.env.NEXT_PUBLIC_RAZORPAY_KEY,
  key_secret: process.env.RAZORPAY_KEY_SECRET || '',
  currency: 'INR',
};

// Validate on import (server-side only)
validateConfig();

// Helper function to format amount for Razorpay (converts to smallest currency unit)
export const formatAmountForRazorpay = (amount: number): number => {
  return Math.round(amount * 100); // Convert to paise and ensure integer
};

// Helper function to create Razorpay order options
export const createRazorpayOptions = (order: RazorpayOrder, userDetails: any) => {
  return {
    key: process.env.NEXT_PUBLIC_RAZORPAY_KEY,
    amount: order.amount,
    currency: order.currency,
    name: 'AccidentAware',
    description: 'Product Purchase',
    order_id: order.id,
    prefill: {
      name: userDetails.name || '',
      email: userDetails.email || '',
      contact: userDetails.phone || '',
    },
    notes: {
      shipping_address: userDetails.address,
      city: userDetails.city,
      state: userDetails.state,
      pincode: userDetails.pincode,
    },
    theme: {
      color: '#2563eb'
    }
  };
};