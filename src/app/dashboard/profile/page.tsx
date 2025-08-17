'use client';

import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import LoadingSpinner from '@/components/ui/loading-spinner';

interface SOSContact {
  id: string;
  name: string;
  phone: string;
}

export default function ProfilePage() {
  const { data: session } = useSession();
  const [loading, setLoading] = useState(true);
  const [sosContacts, setSosContacts] = useState<SOSContact[]>([]);
  const [newContact, setNewContact] = useState({ name: '', phone: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  // Fetch SOS contacts
  useEffect(() => {
    const fetchSOSContacts = async () => {
      try {
        const response = await fetch('/api/user/sos-contacts');
        if (response.ok) {
          const data = await response.json();
          setSosContacts(data);
        }
      } catch (error) {
        console.error('Error fetching SOS contacts:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchSOSContacts();
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewContact(prev => ({ ...prev, [name]: value }));
  };

  const handleAddContact = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');
    setSuccess('');

    try {
      const response = await fetch('/api/user/sos-contacts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newContact),
      });

      if (response.ok) {
        const addedContact = await response.json();
        setSosContacts(prev => [...prev, addedContact]);
        setNewContact({ name: '', phone: '' });
        setSuccess('Contact added successfully!');
      } else {
        const errorData = await response.json();
        setError(errorData.error || 'Failed to add contact');
      }
    } catch (error) {
      setError('An error occurred. Please try again.');
      console.error('Error adding SOS contact:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDeleteContact = async (id: string) => {
    try {
      const response = await fetch(`/api/user/sos-contacts?id=${id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        setSosContacts(prev => prev.filter(contact => contact.id !== id));
        setSuccess('Contact deleted successfully!');
      } else {
        const errorData = await response.json();
        setError(errorData.error || 'Failed to delete contact');
      }
    } catch (error) {
      setError('An error occurred. Please try again.');
      console.error('Error deleting SOS contact:', error);
    }
  };

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold">Profile Settings</h1>

      <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
        {/* User Profile Card */}
        <Card className="p-6">
          <h2 className="text-xl font-semibold mb-4">User Information</h2>
          <div className="flex items-center space-x-4 mb-6">
            <div className="h-20 w-20 rounded-full bg-primary/20 flex items-center justify-center text-2xl font-bold text-primary">
              {session?.user?.name?.charAt(0) || 'U'}
            </div>
            <div>
              <h3 className="font-medium text-lg">{session?.user?.name || 'User'}</h3>
              <p className="text-gray-600">{session?.user?.email || 'No email'}</p>
            </div>
          </div>
          <div className="space-y-4">
            <Button className="w-full">Change Profile Photo</Button>
            <Button variant="outline" className="w-full">Change Password</Button>
          </div>
        </Card>

        {/* SOS Contacts Card */}
        <Card className="p-6">
          <h2 className="text-xl font-semibold mb-4">SOS Contacts</h2>
          <p className="text-gray-600 mb-4">
            These contacts will be notified in case of an emergency.
          </p>

          {error && <div className="bg-red-100 text-red-700 p-3 rounded-md mb-4">{error}</div>}
          {success && <div className="bg-green-100 text-green-700 p-3 rounded-md mb-4">{success}</div>}

          <form onSubmit={handleAddContact} className="mb-6">
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 mb-4">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                  Contact Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={newContact.name}
                  onChange={handleInputChange}
                  required
                  className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>
              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                  Phone Number
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={newContact.phone}
                  onChange={handleInputChange}
                  required
                  placeholder="+1234567890"
                  className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>
            </div>
            <Button type="submit" disabled={isSubmitting} className="w-full">
              {isSubmitting ? <LoadingSpinner /> : 'Add Contact'}
            </Button>
          </form>

          <div className="space-y-4">
            {sosContacts.length === 0 ? (
              <p className="text-gray-500 text-center py-4">No SOS contacts added yet.</p>
            ) : (
              sosContacts.map((contact) => (
                <div key={contact.id} className="flex justify-between items-center p-3 border rounded-md">
                  <div>
                    <h4 className="font-medium">{contact.name}</h4>
                    <p className="text-gray-600">{contact.phone}</p>
                  </div>
                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={() => handleDeleteContact(contact.id)}
                  >
                    Delete
                  </Button>
                </div>
              ))
            )}
          </div>
        </Card>
      </div>

      {/* Bluetooth Connection Card */}
      <Card className="p-6">
        <h2 className="text-xl font-semibold mb-4">Device Connection</h2>
        <p className="text-gray-600 mb-6">
          Connect your AccidentAware smart helmet via Bluetooth for real-time accident detection and monitoring.
        </p>
        <div className="flex justify-center">
          <Button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg flex items-center gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10 3a7 7 0 100 14 7 7 0 000-14zm0 1.5a5.5 5.5 0 100 11 5.5 5.5 0 000-11z" clipRule="evenodd" />
              <path d="M10 6.5a.5.5 0 01.5.5v2.5l2.354 1.177a.5.5 0 01-.708.707L9.5 10V7a.5.5 0 01.5-.5z" />
            </svg>
            Connect Helmet
          </Button>
        </div>
      </Card>
    </div>
  );
}