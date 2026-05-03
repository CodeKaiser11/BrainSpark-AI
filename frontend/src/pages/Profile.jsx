import React from 'react';
import ProfileCard from '../components/ProfileCard';
import SettingsPanel from '../components/SettingsPanel';

export default function Profile() {
  return (
    <div className="max-w-6xl mx-auto space-y-8">
      <section className="mb-8">
        <h1 className="text-4xl font-bold text-brand-dark">Your Profile</h1>
        <p className="text-gray-500 mt-2">Manage your account settings and preferences.</p>
      </section>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Left Column - Profile Card */}
        <div className="w-full lg:w-1/3">
          <ProfileCard />
        </div>

        {/* Right Column - Settings Panel */}
        <div className="w-full lg:w-2/3">
          <SettingsPanel />
        </div>
      </div>
    </div>
  );
}
