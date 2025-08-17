'use client';

import { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import LoadingSpinner from '@/components/ui/loading-spinner';

interface BluetoothDevice {
  id: string;
  name: string;
}

export function BluetoothConnector() {
  const [isScanning, setIsScanning] = useState(false);
  const [devices, setDevices] = useState<BluetoothDevice[]>([]);
  const [connectedDevice, setConnectedDevice] = useState<BluetoothDevice | null>(null);
  const [error, setError] = useState('');
  const [bluetoothAvailable, setBluetoothAvailable] = useState(true);

  useEffect(() => {
    // Check if Bluetooth API is available in the browser
    if (!navigator.bluetooth) {
      setBluetoothAvailable(false);
      setError('Bluetooth is not available in your browser. Please use a browser that supports Web Bluetooth API.');
    }
  }, []);

  const startScan = async () => {
    if (!navigator.bluetooth) {
      setError('Bluetooth is not available in your browser');
      return;
    }

    try {
      setIsScanning(true);
      setError('');
      setDevices([]);

      const device = await navigator.bluetooth.requestDevice({
        acceptAllDevices: true,
        optionalServices: [
          '0000ffe0-0000-1000-8000-00805f9b34fb', // HC-05 main service
          '0000ffe1-0000-1000-8000-00805f9b34fb', // HC-05 characteristic
          'battery_service',
          'device_information'
        ]
      });

      if (device) {
        const newDevice = {
          id: device.id,
          name: device.name || 'Unknown Device'
        };
        
        setDevices(prev => [...prev, newDevice]);
      }
    } catch (err) {
      console.error('Bluetooth scan error:', err);
      setError(err instanceof Error ? err.message : 'Failed to scan for devices');
    } finally {
      setIsScanning(false);
    }
  };

  const connectToDevice = async (device: BluetoothDevice) => {
    try {
      console.log(`Connecting to HC-05 device: ${device.name}`);
      
      // In a real implementation with HC-05:
      // 1. Establish GATT connection
      // 2. Get the SPP service
      // 3. Get the characteristic for communication
      // For now, we'll simulate the connection

      setConnectedDevice(device);
      localStorage.setItem('connectedHelmet', JSON.stringify(device));
      
      return true;
    } catch (err) {
      console.error('Connection error:', err);
      setError(err instanceof Error ? err.message : 'Failed to connect to device');
      return false;
    }
  };

  const disconnectDevice = () => {
    // In a real implementation, you would close the GATT connection
    setConnectedDevice(null);
    localStorage.removeItem('connectedHelmet');
  };

  // Load previously connected device from local storage
  useEffect(() => {
    const savedDevice = localStorage.getItem('connectedHelmet');
    if (savedDevice) {
      try {
        setConnectedDevice(JSON.parse(savedDevice));
      } catch (err) {
        console.error('Error parsing saved device:', err);
        localStorage.removeItem('connectedHelmet');
      }
    }
  }, []);

  if (!bluetoothAvailable) {
    return (
      <Card className="p-6 bg-red-50">
        <h2 className="text-xl font-semibold mb-4">Bluetooth Not Available</h2>
        <p className="text-red-600">
          {error || 'Your browser does not support the Web Bluetooth API. Please use Chrome, Edge, or another compatible browser.'}
        </p>
      </Card>
    );
  }

  return (
    <Card className="p-6">
      <h2 className="text-xl font-semibold mb-4">Smart Helmet Connection</h2>
      
      {error && <p className="text-red-600 mb-4">{error}</p>}
      
      {connectedDevice ? (
        <div className="space-y-4">
          <div className="flex items-center gap-4 p-4 bg-green-50 rounded-md">
            <div className="h-12 w-12 rounded-full bg-green-100 flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div>
              <h3 className="font-medium">Connected to {connectedDevice.name}</h3>
              <p className="text-sm text-gray-600">Your helmet is actively monitoring for accidents</p>
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="p-4 border rounded-md">
              <h4 className="font-medium mb-1">Battery Status</h4>
              <p className="text-green-600">85%</p>
            </div>
            <div className="p-4 border rounded-md">
              <h4 className="font-medium mb-1">Signal Strength</h4>
              <p className="text-green-600">Excellent</p>
            </div>
          </div>
          
          <Button 
            variant="destructive" 
            onClick={disconnectDevice} 
            className="w-full"
          >
            Disconnect Helmet
          </Button>
        </div>
      ) : (
        <div className="space-y-4">
          <p className="text-gray-600">
            Connect your AccidentAware smart helmet via Bluetooth for real-time accident detection and monitoring.
          </p>
          
          <Button 
            onClick={startScan} 
            disabled={isScanning} 
            className="w-full bg-blue-600 hover:bg-blue-700"
          >
            {isScanning ? <LoadingSpinner /> : 'Scan for Helmets'}
          </Button>
          
          {isScanning && (
            <div className="flex justify-center py-4">
              <LoadingSpinner />
              <span className="ml-2">Scanning for nearby devices...</span>
            </div>
          )}
          
          {devices.length > 0 && (
            <div className="space-y-2">
              <h3 className="font-medium">Available Devices</h3>
              {devices.map(device => (
                <div key={device.id} className="flex justify-between items-center p-3 border rounded-md">
                  <span>{device.name}</span>
                  <Button 
                    size="sm" 
                    onClick={() => connectToDevice(device)}
                  >
                    Connect
                  </Button>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </Card>
  );
}