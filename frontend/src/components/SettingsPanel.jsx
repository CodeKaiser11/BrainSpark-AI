import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';

export default function SettingsPanel() {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('basic');

  const tabs = [
    { id: 'basic', label: 'Basic Info' },
    { id: 'security', label: 'Security' },
    { id: 'preferences', label: 'Preferences' },
    { id: 'notifications', label: 'Notifications' },
    { id: 'appearance', label: 'Appearance' },
  ];

  return (
    <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
      {/* Settings Navigation */}
      <div className="flex border-b border-gray-100 overflow-x-auto no-scrollbar">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`px-6 py-4 font-medium text-sm whitespace-nowrap transition-colors border-b-2 ${
              activeTab === tab.id
                ? 'border-brand-orange text-brand-orange'
                : 'border-transparent text-gray-500 hover:text-brand-dark'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Settings Content */}
      <div className="p-8">
        
        {/* Basic Info Tab */}
        {activeTab === 'basic' && (
          <div className="space-y-6">
            <h3 className="text-xl font-bold mb-4">Basic Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">Full Name</label>
                <input 
                  type="text" 
                  defaultValue={user?.name || 'Guest Student'} 
                  className="w-full p-3 border border-gray-200 rounded-xl focus:border-brand-orange focus:ring-1 focus:ring-brand-orange outline-none transition-colors"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">Email Address</label>
                <input 
                  type="email" 
                  defaultValue={user?.email || 'guest@brainspark.ai'} 
                  className="w-full p-3 border border-gray-200 rounded-xl focus:border-brand-orange focus:ring-1 focus:ring-brand-orange outline-none transition-colors"
                />
              </div>
              <div className="space-y-2 md:col-span-2">
                <label className="text-sm font-medium text-gray-700">Bio</label>
                <textarea 
                  rows="3"
                  defaultValue="Lifelong learner and AI enthusiast." 
                  className="w-full p-3 border border-gray-200 rounded-xl focus:border-brand-orange focus:ring-1 focus:ring-brand-orange outline-none transition-colors"
                ></textarea>
              </div>
            </div>
            <div className="pt-4 flex justify-end gap-3">
              <button className="px-6 py-2 rounded-xl font-medium text-gray-600 hover:bg-gray-50 transition-colors">Cancel</button>
              <button className="px-6 py-2 rounded-xl font-bold bg-brand-orange text-white hover:bg-orange-600 transition-colors">Save Changes</button>
            </div>
          </div>
        )}

        {/* Security Tab */}
        {activeTab === 'security' && (
          <div className="space-y-6">
            <h3 className="text-xl font-bold mb-4">Security Settings</h3>
            <div className="space-y-4 max-w-md">
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">Current Password</label>
                <input 
                  type="password" 
                  className="w-full p-3 border border-gray-200 rounded-xl focus:border-brand-orange outline-none"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">New Password</label>
                <input 
                  type="password" 
                  className="w-full p-3 border border-gray-200 rounded-xl focus:border-brand-orange outline-none"
                />
              </div>
            </div>
            <div className="pt-4 flex justify-start gap-3">
              <button className="px-6 py-2 rounded-xl font-bold bg-brand-orange text-white hover:bg-orange-600 transition-colors">Update Password</button>
            </div>

            <div className="mt-12 pt-8 border-t border-gray-100">
              <h4 className="text-lg font-bold text-red-600 mb-2">Danger Zone</h4>
              <p className="text-sm text-gray-500 mb-4">Once you delete your account, there is no going back. Please be certain.</p>
              <button className="px-6 py-2 rounded-xl font-bold border border-red-200 text-red-600 hover:bg-red-50 transition-colors">Delete Account</button>
            </div>
          </div>
        )}

        {/* Preferences, Notifications, Appearance Mock Tabs */}
        {['preferences', 'notifications', 'appearance'].includes(activeTab) && (
          <div className="flex flex-col items-center justify-center py-12 text-center">
            <div className="text-6xl mb-4">⚙️</div>
            <h3 className="text-xl font-bold mb-2 capitalize">{activeTab} Settings</h3>
            <p className="text-gray-500 max-w-sm">This settings pane is currently under construction and will be available in the next phase.</p>
          </div>
        )}

      </div>
    </div>
  );
}
