import React from 'react';
import { useAuth } from '../context/AuthContext';

export default function ProfileCard() {
  const { user } = useAuth();

  return (
    <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 flex flex-col items-center text-center">
      <div className="relative mb-6 cursor-pointer group">
        <div className="w-32 h-32 rounded-full bg-brand-orange text-white flex items-center justify-center font-bold text-5xl shadow-md overflow-hidden">
          {user?.name ? user.name.charAt(0).toUpperCase() : 'S'}
        </div>
        <div className="absolute inset-0 bg-black/40 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
          <span className="text-white text-xl">📷</span>
        </div>
      </div>
      
      <h2 className="text-2xl font-bold text-brand-dark mb-1">{user?.name || 'Guest Student'}</h2>
      <p className="text-gray-500 mb-6">{user?.email || 'guest@brainspark.ai'}</p>
      
      <div className="w-full grid grid-cols-2 gap-4 mb-6">
        <div className="bg-orange-50 p-4 rounded-2xl border border-orange-100">
          <div className="text-sm text-gray-600 mb-1">Level</div>
          <div className="text-2xl font-bold text-brand-orange">5</div>
        </div>
        <div className="bg-green-50 p-4 rounded-2xl border border-green-100">
          <div className="text-sm text-gray-600 mb-1">XP</div>
          <div className="text-2xl font-bold text-green-600">{user?.xp || '1,250'}</div>
        </div>
      </div>

      <div className="w-full flex items-center justify-between px-4 py-3 bg-gray-50 rounded-xl border border-gray-100 mb-2 text-sm">
        <span className="text-gray-500">Member Since</span>
        <span className="font-semibold text-gray-700">Aug 2026</span>
      </div>
      <div className="w-full flex items-center justify-between px-4 py-3 bg-gray-50 rounded-xl border border-gray-100 text-sm">
        <span className="text-gray-500">Current Streak</span>
        <span className="font-semibold text-brand-orange flex items-center gap-1">
          {user?.streak || 0} Days 🔥
        </span>
      </div>
    </div>
  );
}
