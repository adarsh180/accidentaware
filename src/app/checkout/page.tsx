'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { useCart } from '@/lib/cart-context';
import Image from 'next/image';
import { createRazorpayOptions } from '@/lib/razorpay';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';

declare global {
  interface Window {
    Razorpay: any;
  }
}

interface Address {
  id: string;
  name: string;
  address: string;
  city: string;
  state: string;
  pincode: string;
  phone: string;
  email: string;
  landmark?: string;
  isDefault: boolean;
}

interface ShippingDetails {
  address: string;
  city: string;
  state: string;
  pincode: string;
  phone: string;
  email: string;
  name: string;
  landmark: string;
}

export default function CheckoutPage() {
  const router = useRouter();
  const { state, dispatch } = useCart();
  const [step, setStep] = useState<'shipping' | 'payment'>('shipping');
  const [shippingDetails, setShippingDetails] = useState<ShippingDetails>({
    address: '',
    city: '',
    state: '',
    pincode: '',
    phone: '',
    email: '',
    name: '',
    landmark: ''
  });
  const [isProcessing, setIsProcessing] = useState(false);
  const [addresses, setAddresses] = useState<Address[]>([]);
  const [selectedAddressId, setSelectedAddressId] = useState<string | null>(null);
  const [isNewAddress, setIsNewAddress] = useState(false);
  const [isAddressDialogOpen, setIsAddressDialogOpen] = useState(false);
  const [newAddress, setNewAddress] = useState<Omit<Address, 'id'>>({
    name: '',
    address: '',
    city: '',
    state: '',
    pincode: '',
    phone: '',
    email: '',
    landmark: '',
    isDefault: false
  });

  useEffect(() => {
    // Load Razorpay script
    const script = document.createElement('script');
    script.src = 'https://checkout.razorpay.com/v1/checkout.js';
    script.async = true;
    document.body.appendChild(script);

    // Load saved addresses
    fetchAddresses();

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  const fetchAddresses = async () => {
    try {
      const response = await fetch('/api/user/address');
      if (response.ok) {
        const data = await response.json();
        setAddresses(data);
        const defaultAddress = data.find((addr: Address) => addr.isDefault);
        if (defaultAddress) {
          setSelectedAddressId(defaultAddress.id);
          setShippingDetails({
            name: defaultAddress.name,
            address: defaultAddress.address,
            city: defaultAddress.city,
            state: defaultAddress.state,
            pincode: defaultAddress.pincode,
            phone: defaultAddress.phone,
            email: defaultAddress.email,
            landmark: defaultAddress.landmark || ''
          });
        }
      }
    } catch (error) {
      console.error('Error fetching addresses:', error);
    }
  };

  const handleAddressSelect = (address: Address) => {
    setSelectedAddressId(address.id);
    setShippingDetails({
      name: address.name,
      address: address.address,
      city: address.city,
      state: address.state,
      pincode: address.pincode,
      phone: address.phone,
      email: address.email,
      landmark: address.landmark || ''
    });
    setIsNewAddress(false);
  };

  const [formErrors, setFormErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleAddNewAddress = async () => {
    try {
      setIsSubmitting(true);
      setFormErrors({});
      
      // Basic validation before sending to API
      const errors: Record<string, string> = {};
      if (!newAddress.name) errors.name = 'Name is required';
      if (!newAddress.address) errors.address = 'Address is required';
      if (!newAddress.city) errors.city = 'City is required';
      if (!newAddress.state) errors.state = 'State is required';
      if (!newAddress.pincode || !/^\d{6}$/.test(newAddress.pincode)) {
        errors.pincode = 'Valid 6-digit pincode is required';
      }
      if (!newAddress.phone || !/^[0-9]{10}$/.test(newAddress.phone)) {
        errors.phone = 'Valid 10-digit phone number is required';
      }
      if (!newAddress.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(newAddress.email)) {
        errors.email = 'Valid email is required';
      }
      
      if (Object.keys(errors).length > 0) {
        setFormErrors(errors);
        return;
      }

      const response = await fetch('/api/user/address', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newAddress)
      });

      const data = await response.json();

      if (response.ok) {
        setAddresses(prev => [...prev, data]);
        handleAddressSelect(data);
        setIsAddressDialogOpen(false);
        setNewAddress({
          name: '',
          address: '',
          city: '',
          state: '',
          pincode: '',
          phone: '',
          email: '',
          landmark: '',
          isDefault: false
        });
      } else {
        // Handle API validation errors
        if (data.error) {
          if (Array.isArray(data.error)) {
            const apiErrors: Record<string, string> = {};
            data.error.forEach((err: any) => {
              apiErrors[err.path[0]] = err.message;
            });
            setFormErrors(apiErrors);
          } else {
            setFormErrors({ general: 'Failed to save address' });
          }
        }
      }
    } catch (error) {
      console.error('Error saving address:', error);
      setFormErrors({ general: 'An unexpected error occurred' });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handlePayment = async () => {
    try {
      setIsProcessing(true);
      const response = await fetch('/api/create-order', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          amount: state.total,
          receipt: `order_${Date.now()}`
        })
      });

      const { order } = await response.json();
      
      if (!order) {
        throw new Error('Failed to create order');
      }

      const options = createRazorpayOptions(order, shippingDetails);

      const rzp = new window.Razorpay(options);

      rzp.on('payment.success', async (response: any) => {
        const verifyResponse = await fetch('/api/verify-payment', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            ...response,
            amount: state.total,
            items: state.items
          })
        });

        if (verifyResponse.ok) {
          dispatch({ type: 'CLEAR_CART' });
          router.push('/checkout/success');
        } else {
          alert('Payment verification failed. Please contact support.');
        }
      });

      rzp.on('payment.failed', (response: any) => {
        alert('Payment failed. Please try again.');
        console.error('Payment failed:', response.error);
      });

      rzp.open();
    } catch (error) {
      console.error('Payment error:', error);
      alert('Payment failed. Please try again.');
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <h2 className="text-2xl font-bold mb-6">Checkout</h2>
          {step === 'shipping' ? (
            <div className="space-y-6">
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <h3 className="text-xl font-semibold">Saved Addresses</h3>
                  <Button
                    onClick={() => setIsAddressDialogOpen(true)}
                    variant="outline"
                    className="border-cyan-600 text-cyan-600 hover:bg-cyan-50 flex items-center justify-center gap-2"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
                    </svg>
                    Add New Address
                  </Button>
                </div>
                {addresses.length > 0 ? (
                  addresses.map((address) => (
                    <Card
                      key={address.id}
                      className={`p-4 cursor-pointer transition-all hover:shadow-md ${
                        selectedAddressId === address.id 
                          ? 'border-2 border-cyan-500 bg-cyan-50 shadow-sm' 
                          : 'hover:bg-muted/50'
                      }`}
                      onClick={() => handleAddressSelect(address)}
                    >
                      <div className="flex justify-between items-start">
                        <div className="space-y-1">
                          <h4 className="font-semibold text-gray-900">{address.name}</h4>
                          <p className="text-sm text-gray-700">{address.address}</p>
                          <p className="text-sm text-gray-700">
                            {address.city}, {address.state} - {address.pincode}
                          </p>
                          <p className="text-sm text-gray-700 mt-1">
                            <span className="font-medium">Phone:</span> {address.phone}
                          </p>
                          <p className="text-sm text-gray-700">{address.email}</p>
                        </div>
                        <div className="flex items-center gap-2">
                          {address.isDefault && (
                            <span className="inline-flex items-center rounded-full bg-cyan-100 text-cyan-800 px-2.5 py-0.5 text-xs font-medium">
                              Default
                            </span>
                          )}
                          <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                            selectedAddressId === address.id ? 'border-cyan-500' : 'border-gray-400'
                          }`}>
                            {selectedAddressId === address.id && (
                              <div className="w-3 h-3 rounded-full bg-cyan-500"></div>
                            )}
                          </div>
                        </div>
                      </div>
                    </Card>
                  ))
                ) : (
                  <div className="text-center py-8 border border-dashed rounded-lg">
                    <p className="text-gray-500 mb-4">No saved addresses found</p>
                  </div>
                )}
              </div>
              <Button 
                onClick={() => setStep('payment')}
                disabled={!selectedAddressId && !isNewAddress}
                className="w-full bg-cyan-600 hover:bg-cyan-700 text-white py-2.5 text-base font-medium transition-all"
              >
                Continue to Payment
              </Button>
            </div>
          ) : (
            <form onSubmit={(e) => { e.preventDefault(); handlePayment(); }} className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">Name</label>
                <input
                  type="text"
                  required
                  className="w-full p-2 border rounded"
                  value={shippingDetails.name}
                  onChange={(e) => setShippingDetails({ ...shippingDetails, name: e.target.value })}
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Email</label>
                <input
                  type="email"
                  required
                  className="w-full p-2 border rounded"
                  value={shippingDetails.email}
                  onChange={(e) => setShippingDetails({ ...shippingDetails, email: e.target.value })}
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Landmark</label>
                <input
                  type="text"
                  className="w-full p-2 border rounded"
                  value={shippingDetails.landmark}
                  onChange={(e) => setShippingDetails({ ...shippingDetails, landmark: e.target.value })}
                />
              </div>
              <Button
                onClick={handlePayment}
                disabled={isProcessing}
                className="w-full bg-cyan-600 hover:bg-cyan-700 text-white"
              >
                {isProcessing ? 'Processing...' : 'Pay Now'}
              </Button>
              <div className="flex gap-4">
                <Button
                  type="button"
                  className="flex-1"
                  onClick={() => setStep('shipping')}
                >
                  Back
                </Button>
              </div>
            </form>
          )}
        </div>

        <div>
          <Card className="p-6">
            <h2 className="text-2xl font-bold mb-6 text-gray-900">Order Summary</h2>
            <div className="space-y-6">
              {state.items.map((item) => (
                <div key={item.product.id} className="border-b border-gray-100 pb-6 last:border-b-0 last:pb-0">
                  <div className="flex gap-4">
                    <div className="relative w-24 h-24 flex-shrink-0">
                      <Image
                        src={item.product.images[0]}
                        alt={item.product.name}
                        fill
                        className="object-cover rounded-lg"
                      />
                    </div>
                    <div className="flex-1 space-y-2">
                      <h3 className="font-semibold text-lg text-gray-900">{item.product.name}</h3>
                      <p className="text-sm text-gray-600 line-clamp-2">{item.product.description}</p>
                      <div className="flex items-center gap-4">
                        <span className="text-sm text-gray-500">Category: <span className="capitalize font-medium">{item.product.category}</span></span>
                        <span className="text-sm text-gray-500">Qty: <span className="font-medium">{item.quantity}</span></span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-500">₹{item.product.price} × {item.quantity}</span>
                        <span className="text-lg font-bold text-cyan-600">₹{item.product.price * item.quantity}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
              
              <div className="border-t border-gray-200 pt-4 space-y-3">
                <div className="flex justify-between text-gray-600">
                  <span>Subtotal ({state.items.reduce((sum, item) => sum + item.quantity, 0)} items)</span>
                  <span>₹{state.total}</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Shipping & Handling</span>
                  <span className="text-green-600 font-medium">FREE</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Tax</span>
                  <span>Included</span>
                </div>
                <div className="border-t border-gray-200 pt-3">
                  <div className="flex justify-between items-center">
                    <span className="text-xl font-bold text-gray-900">Total Amount</span>
                    <span className="text-2xl font-bold text-cyan-600">₹{state.total}</span>
                  </div>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </div>

      <Dialog open={isAddressDialogOpen} onOpenChange={setIsAddressDialogOpen}>
        <DialogContent className="max-w-md mx-auto">
          <DialogHeader>
            <DialogTitle className="text-xl font-bold text-center">Add New Address</DialogTitle>
          </DialogHeader>
          
          {formErrors.general && (
            <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded mb-4">
              {formErrors.general}
            </div>
          )}
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">Full Name</label>
              <input
                type="text"
                className={`w-full p-2.5 border rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all ${formErrors.name ? 'border-red-500' : 'border-gray-300'}`}
                value={newAddress.name}
                onChange={(e) => {
                  setNewAddress({ ...newAddress, name: e.target.value });
                  if (formErrors.name) {
                    setFormErrors({ ...formErrors, name: '' });
                  }
                }}
              />
              {formErrors.name && (
                <p className="text-red-500 text-sm mt-1">{formErrors.name}</p>
              )}
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-1">Address</label>
              <textarea
                className={`w-full p-2.5 border rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all ${formErrors.address ? 'border-red-500' : 'border-gray-300'}`}
                value={newAddress.address}
                rows={3}
                onChange={(e) => {
                  setNewAddress({ ...newAddress, address: e.target.value });
                  if (formErrors.address) {
                    setFormErrors({ ...formErrors, address: '' });
                  }
                }}
              />
              {formErrors.address && (
                <p className="text-red-500 text-sm mt-1">{formErrors.address}</p>
              )}
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1">City</label>
                <input
                  type="text"
                  className={`w-full p-2.5 border rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all ${formErrors.city ? 'border-red-500' : 'border-gray-300'}`}
                  value={newAddress.city}
                  onChange={(e) => {
                    setNewAddress({ ...newAddress, city: e.target.value });
                    if (formErrors.city) {
                      setFormErrors({ ...formErrors, city: '' });
                    }
                  }}
                />
                {formErrors.city && (
                  <p className="text-red-500 text-sm mt-1">{formErrors.city}</p>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">State</label>
                <input
                  type="text"
                  className={`w-full p-2.5 border rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all ${formErrors.state ? 'border-red-500' : 'border-gray-300'}`}
                  value={newAddress.state}
                  onChange={(e) => {
                    setNewAddress({ ...newAddress, state: e.target.value });
                    if (formErrors.state) {
                      setFormErrors({ ...formErrors, state: '' });
                    }
                  }}
                />
                {formErrors.state && (
                  <p className="text-red-500 text-sm mt-1">{formErrors.state}</p>
                )}
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1">PIN Code</label>
                <input
                  type="text"
                  pattern="[0-9]{6}"
                  placeholder="6-digit pincode"
                  className={`w-full p-2.5 border rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all ${formErrors.pincode ? 'border-red-500' : 'border-gray-300'}`}
                  value={newAddress.pincode}
                  onChange={(e) => {
                    setNewAddress({ ...newAddress, pincode: e.target.value });
                    if (formErrors.pincode) {
                      setFormErrors({ ...formErrors, pincode: '' });
                    }
                  }}
                />
                {formErrors.pincode && (
                  <p className="text-red-500 text-sm mt-1">{formErrors.pincode}</p>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Phone</label>
                <input
                  type="tel"
                  pattern="[0-9]{10}"
                  placeholder="10-digit number"
                  className={`w-full p-2.5 border rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all ${formErrors.phone ? 'border-red-500' : 'border-gray-300'}`}
                  value={newAddress.phone}
                  onChange={(e) => {
                    setNewAddress({ ...newAddress, phone: e.target.value });
                    if (formErrors.phone) {
                      setFormErrors({ ...formErrors, phone: '' });
                    }
                  }}
                />
                {formErrors.phone && (
                  <p className="text-red-500 text-sm mt-1">{formErrors.phone}</p>
                )}
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-1">Email</label>
              <input
                type="email"
                className={`w-full p-2.5 border rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all ${formErrors.email ? 'border-red-500' : 'border-gray-300'}`}
                value={newAddress.email}
                onChange={(e) => {
                  setNewAddress({ ...newAddress, email: e.target.value });
                  if (formErrors.email) {
                    setFormErrors({ ...formErrors, email: '' });
                  }
                }}
              />
              {formErrors.email && (
                <p className="text-red-500 text-sm mt-1">{formErrors.email}</p>
              )}
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-1">Landmark (Optional)</label>
              <input
                type="text"
                className="w-full p-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all"
                value={newAddress.landmark || ''}
                onChange={(e) => setNewAddress({ ...newAddress, landmark: e.target.value })}
              />
            </div>
            
            <div className="flex items-center gap-2 mt-2">
              <input
                type="checkbox"
                id="isDefault"
                className="rounded border-gray-300 text-cyan-600 focus:ring-cyan-500"
                checked={newAddress.isDefault}
                onChange={(e) => setNewAddress({ ...newAddress, isDefault: e.target.checked })}
              />
              <label htmlFor="isDefault" className="text-sm">Set as default address</label>
            </div>
            
            <div className="flex justify-end gap-4 mt-6">
              <Button
                type="button"
                variant="outline"
                onClick={() => setIsAddressDialogOpen(false)}
                className="border-gray-300"
              >
                Cancel
              </Button>
              <Button
                onClick={handleAddNewAddress}
                className="bg-cyan-600 hover:bg-cyan-700 text-white min-w-[100px]"
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Saving...' : 'Save Address'}
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}