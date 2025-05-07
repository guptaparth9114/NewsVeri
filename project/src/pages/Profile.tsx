import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { User, Mail, Bell, Settings, CreditCard } from 'lucide-react';

const Profile: React.FC = () => {
  const { user, logout } = useAuth();
  const [activeTab, setActiveTab] = useState('profile');
  
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });
  
  const [notificationSettings, setNotificationSettings] = useState({
    emailUpdates: true,
    breakingNews: true,
    weeklyDigest: true,
    sentimentAlerts: false,
  });
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };
  
  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    setNotificationSettings({
      ...notificationSettings,
      [name]: checked,
    });
  };
  
  const handleProfileSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle profile update
    console.log('Profile update:', formData);
  };
  
  const handlePasswordSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle password change
    console.log('Password change:', {
      currentPassword: formData.currentPassword,
      newPassword: formData.newPassword,
    });
  };
  
  const handleNotificationSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle notification settings
    console.log('Notification settings:', notificationSettings);
  };

  return (
    <div className="container mx-auto px-4 py-6">
      <h1 className="text-3xl font-serif font-bold mb-6">Your Profile</h1>
      
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        {/* Tabs */}
        <div className="flex border-b">
          <button
            onClick={() => setActiveTab('profile')}
            className={`px-6 py-3 font-medium text-sm flex items-center ${
              activeTab === 'profile'
                ? 'border-b-2 border-blue-700 text-blue-700'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            <User size={18} className="mr-2" /> Profile
          </button>
          
          <button
            onClick={() => setActiveTab('security')}
            className={`px-6 py-3 font-medium text-sm flex items-center ${
              activeTab === 'security'
                ? 'border-b-2 border-blue-700 text-blue-700'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            <Settings size={18} className="mr-2" /> Security
          </button>
          
          <button
            onClick={() => setActiveTab('notifications')}
            className={`px-6 py-3 font-medium text-sm flex items-center ${
              activeTab === 'notifications'
                ? 'border-b-2 border-blue-700 text-blue-700'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            <Bell size={18} className="mr-2" /> Notifications
          </button>
          
          <button
            onClick={() => setActiveTab('subscription')}
            className={`px-6 py-3 font-medium text-sm flex items-center ${
              activeTab === 'subscription'
                ? 'border-b-2 border-blue-700 text-blue-700'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            <CreditCard size={18} className="mr-2" /> Subscription
          </button>
        </div>
        
        <div className="p-6">
          {/* Profile Tab */}
          {activeTab === 'profile' && (
            <form onSubmit={handleProfileSubmit}>
              <div className="flex flex-col md:flex-row space-y-6 md:space-y-0 md:space-x-12">
                <div className="md:w-1/3">
                  <div className="flex flex-col items-center">
                    <div className="w-32 h-32 bg-blue-100 rounded-full flex items-center justify-center text-blue-700 text-4xl font-bold mb-4">
                      {formData.name.charAt(0)}
                    </div>
                    
                    <button
                      type="button"
                      className="text-blue-700 hover:text-blue-900"
                    >
                      Change profile picture
                    </button>
                  </div>
                </div>
                
                <div className="md:w-2/3">
                  <h2 className="text-xl font-bold mb-4">Personal Information</h2>
                  
                  <div className="mb-4">
                    <label htmlFor="name" className="block text-gray-700 mb-2">Full Name</label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  
                  <div className="mb-6">
                    <label htmlFor="email" className="block text-gray-700 mb-2">Email</label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  
                  <button
                    type="submit"
                    className="bg-blue-700 hover:bg-blue-800 text-white font-medium py-2 px-6 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                  >
                    Save Changes
                  </button>
                </div>
              </div>
            </form>
          )}
          
          {/* Security Tab */}
          {activeTab === 'security' && (
            <form onSubmit={handlePasswordSubmit}>
              <h2 className="text-xl font-bold mb-4">Password Settings</h2>
              
              <div className="max-w-md">
                <div className="mb-4">
                  <label htmlFor="currentPassword" className="block text-gray-700 mb-2">Current Password</label>
                  <input
                    type="password"
                    id="currentPassword"
                    name="currentPassword"
                    value={formData.currentPassword}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                
                <div className="mb-4">
                  <label htmlFor="newPassword" className="block text-gray-700 mb-2">New Password</label>
                  <input
                    type="password"
                    id="newPassword"
                    name="newPassword"
                    value={formData.newPassword}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                
                <div className="mb-6">
                  <label htmlFor="confirmPassword" className="block text-gray-700 mb-2">Confirm New Password</label>
                  <input
                    type="password"
                    id="confirmPassword"
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                
                <button
                  type="submit"
                  className="bg-blue-700 hover:bg-blue-800 text-white font-medium py-2 px-6 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                >
                  Update Password
                </button>
                
                <hr className="my-8" />
                
                <h3 className="text-lg font-semibold mb-4">Account Actions</h3>
                
                <button
                  type="button"
                  onClick={logout}
                  className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-medium py-2 px-6 rounded focus:outline-none focus:ring-2 focus:ring-gray-500 transition mr-4"
                >
                  Log Out
                </button>
                
                <button
                  type="button"
                  className="bg-red-100 hover:bg-red-200 text-red-700 font-medium py-2 px-6 rounded focus:outline-none focus:ring-2 focus:ring-red-500 transition"
                >
                  Delete Account
                </button>
              </div>
            </form>
          )}
          
          {/* Notifications Tab */}
          {activeTab === 'notifications' && (
            <form onSubmit={handleNotificationSubmit}>
              <h2 className="text-xl font-bold mb-4">Notification Preferences</h2>
              
              <div className="space-y-4 max-w-lg">
                <div className="flex items-start">
                  <div className="flex items-center h-5">
                    <input
                      id="emailUpdates"
                      name="emailUpdates"
                      type="checkbox"
                      checked={notificationSettings.emailUpdates}
                      onChange={handleCheckboxChange}
                      className="h-4 w-4 text-blue-600 border-gray-300 rounded"
                    />
                  </div>
                  <div className="ml-3">
                    <label htmlFor="emailUpdates" className="font-medium text-gray-700">Email Updates</label>
                    <p className="text-gray-500 text-sm">Receive email notifications about your account and subscription</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="flex items-center h-5">
                    <input
                      id="breakingNews"
                      name="breakingNews"
                      type="checkbox"
                      checked={notificationSettings.breakingNews}
                      onChange={handleCheckboxChange}
                      className="h-4 w-4 text-blue-600 border-gray-300 rounded"
                    />
                  </div>
                  <div className="ml-3">
                    <label htmlFor="breakingNews" className="font-medium text-gray-700">Breaking News Alerts</label>
                    <p className="text-gray-500 text-sm">Get notifications for major breaking news events</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="flex items-center h-5">
                    <input
                      id="weeklyDigest"
                      name="weeklyDigest"
                      type="checkbox"
                      checked={notificationSettings.weeklyDigest}
                      onChange={handleCheckboxChange}
                      className="h-4 w-4 text-blue-600 border-gray-300 rounded"
                    />
                  </div>
                  <div className="ml-3">
                    <label htmlFor="weeklyDigest" className="font-medium text-gray-700">Weekly Digest</label>
                    <p className="text-gray-500 text-sm">Receive a weekly summary of top news and sentiment trends</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="flex items-center h-5">
                    <input
                      id="sentimentAlerts"
                      name="sentimentAlerts"
                      type="checkbox"
                      checked={notificationSettings.sentimentAlerts}
                      onChange={handleCheckboxChange}
                      className="h-4 w-4 text-blue-600 border-gray-300 rounded"
                    />
                  </div>
                  <div className="ml-3">
                    <label htmlFor="sentimentAlerts" className="font-medium text-gray-700">Sentiment Alerts</label>
                    <p className="text-gray-500 text-sm">Get notified when sentiment significantly shifts for topics you follow</p>
                  </div>
                </div>
                
                <div className="pt-4">
                  <button
                    type="submit"
                    className="bg-blue-700 hover:bg-blue-800 text-white font-medium py-2 px-6 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                  >
                    Save Preferences
                  </button>
                </div>
              </div>
            </form>
          )}
          
          {/* Subscription Tab */}
          {activeTab === 'subscription' && (
            <div>
              <h2 className="text-xl font-bold mb-4">Your Subscription</h2>
              
              <div className="bg-gray-100 p-6 rounded-lg mb-6">
                <div className="flex justify-between items-center">
                  <div>
                    <h3 className="font-bold text-lg">
                      {user?.isPremium ? 'Premium Plan' : 'Basic (Free) Plan'}
                    </h3>
                    
                    {user?.isPremium ? (
                      <p className="text-gray-600">Your subscription renews on November 15, 2023</p>
                    ) : (
                      <p className="text-gray-600">Limited features and functionality</p>
                    )}
                  </div>
                  
                  {user?.isPremium ? (
                    <span className="inline-block px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-medium">
                      Active
                    </span>
                  ) : (
                    <span className="inline-block px-3 py-1 bg-gray-100 text-gray-800 rounded-full text-sm font-medium">
                      Free Tier
                    </span>
                  )}
                </div>
              </div>
              
              {user?.isPremium ? (
                <div className="space-y-6">
                  <div>
                    <h3 className="font-semibold text-lg mb-2">Payment Method</h3>
                    <div className="flex items-center">
                      <div className="bg-white border border-gray-300 rounded px-4 py-3 flex items-center">
                        <div className="bg-blue-100 rounded p-2 mr-3">
                          <CreditCard size={20} className="text-blue-700" />
                        </div>
                        <div>
                          <p className="font-medium">•••• •••• •••• 4242</p>
                          <p className="text-gray-500 text-sm">Expires 12/2025</p>
                        </div>
                      </div>
                      
                      <button className="ml-4 text-blue-700 hover:text-blue-900">
                        Update
                      </button>
                    </div>
                  </div>
                  
                  <div className="pt-4">
                    <h3 className="font-semibold text-lg mb-2">Subscription Management</h3>
                    <div className="space-x-4">
                      <button className="bg-white border border-gray-300 hover:bg-gray-50 text-gray-800 font-medium py-2 px-6 rounded focus:outline-none focus:ring-2 focus:ring-gray-500 transition">
                        Upgrade Plan
                      </button>
                      
                      <button className="text-red-600 hover:text-red-800 font-medium py-2 px-0">
                        Cancel Subscription
                      </button>
                    </div>
                  </div>
                </div>
              ) : (
                <div>
                  <p className="mb-4">Upgrade to Premium for enhanced features:</p>
                  <ul className="list-disc pl-5 mb-6 space-y-1">
                    <li>Advanced sentiment analysis</li>
                    <li>Complete fake news detection</li>
                    <li>Personalized news recommendations</li>
                    <li>Ad-free experience</li>
                    <li>Exclusive premium content</li>
                  </ul>
                  
                  <a
                    href="/premium"
                    className="bg-blue-700 hover:bg-blue-800 text-white font-medium py-2 px-6 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 transition inline-block"
                  >
                    Upgrade to Premium
                  </a>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;