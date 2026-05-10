import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';

export default function SettingsPanel() {
  const { user } = useAuth();
  const { theme, setTheme } = useTheme();
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

        {/* Appearance Tab */}
        {activeTab === 'appearance' && (
          <div className="space-y-8">
            <div>
              <h3 className="text-xl font-bold mb-2">Theme Selection</h3>
              <p className="text-gray-500 mb-6">Choose a theme that matches your study style.</p>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {[
                  { id: 'light', name: 'Cloud White', desc: 'Classic and clean', bg: '#faf7f2', accent: '#d4500a' },
                  { id: 'dark', name: 'Dim Gray', desc: 'Easy on the eyes', bg: '#0c0a09', accent: '#ea580c' },
                  { id: 'midnight', name: 'Midnight', desc: 'Deep space black', bg: '#000000', accent: '#6366f1' },
                  { id: 'ocean', name: 'Deep Ocean', desc: 'Calming blue hues', bg: '#0f172a', accent: '#06b6d4' },
                  { id: 'forest', name: 'Greenwood', desc: 'Eco-focused emerald', bg: '#061e16', accent: '#10b981' },
                  { id: 'sunset', name: 'Twilight', desc: 'Warm sunset purple', bg: '#1a0b1e', accent: '#f43f5e' },
                ].map((t) => (
                  <button
                    key={t.id}
                    onClick={() => setTheme(t.id)}
                    className={`group relative flex flex-col items-start p-4 rounded-2xl border-2 transition-all duration-200 text-left ${
                      theme === t.id 
                        ? 'border-brand-orange bg-brand-orange/5 shadow-md' 
                        : 'border-gray-100 hover:border-gray-200 bg-white'
                    }`}
                  >
                    <div className="flex items-center gap-3 mb-3 w-full">
                      <div 
                        className="w-10 h-10 rounded-full border border-gray-100 shadow-inner flex items-center justify-center overflow-hidden"
                        style={{ backgroundColor: t.bg }}
                      >
                        <div className="w-4 h-4 rounded-full" style={{ backgroundColor: t.accent }}></div>
                      </div>
                      <div className="flex-1">
                        <div className="text-sm font-bold truncate">{t.name}</div>
                        <div className="text-[10px] text-gray-400 uppercase tracking-wider">{t.id}</div>
                      </div>
                      {theme === t.id && (
                        <div className="text-brand-orange text-lg">✓</div>
                      )}
                    </div>
                    <div className="text-xs text-gray-500 leading-relaxed">{t.desc}</div>
                    
                    {/* Visual Preview Bars */}
                    <div className="mt-4 flex gap-1 w-full opacity-60">
                      <div className="h-1.5 flex-1 rounded-full" style={{ backgroundColor: t.accent }}></div>
                      <div className="h-1.5 flex-2 rounded-full bg-gray-200"></div>
                      <div className="h-1.5 flex-1 rounded-full bg-gray-100"></div>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            <div className="pt-8 border-t border-gray-100">
              <h4 className="text-lg font-bold mb-4">Accessibility</h4>
              <div className="flex items-center justify-between p-4 rounded-2xl bg-gray-50 border border-gray-100">
                <div>
                  <div className="font-bold">High Contrast Mode</div>
                  <div className="text-sm text-gray-500">Enhance visibility for easier reading</div>
                </div>
                <div className="w-12 h-6 bg-gray-200 rounded-full relative cursor-pointer opacity-50">
                   <div className="absolute left-1 top-1 w-4 h-4 bg-white rounded-full"></div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Preferences & Notifications Mock Tabs */}
        {['preferences', 'notifications'].includes(activeTab) && (
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
