
import React, { useState } from 'react';
import Dashboard from '../components/Dashboard';
import Navigation from '../components/Navigation';

const Index = () => {
  const [activeSection, setActiveSection] = useState('dashboard');

  return (
    <div className="min-h-screen bg-white flex">
      <Navigation activeSection={activeSection} setActiveSection={setActiveSection} />
      <div className="flex-1 ml-64">
        <div className="p-8">
          <div className="mb-8">
            <h1 className="text-4xl font-bold text-gray-900 mb-2">IT Governance Portal</h1>
            <p className="text-lg text-gray-600">Centralized governance decisions, meetings, and resources</p>
          </div>
          {activeSection === 'dashboard' && <Dashboard />}
          {activeSection === 'calendar' && (
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Meeting Calendar</h2>
              <p className="text-gray-600">Calendar view coming soon...</p>
            </div>
          )}
          {activeSection === 'boards' && (
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Governance Boards</h2>
              <p className="text-gray-600">Board management interface coming soon...</p>
            </div>
          )}
          {activeSection === 'templates' && (
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Templates & Resources</h2>
              <p className="text-gray-600">Templates and resources coming soon...</p>
            </div>
          )}
          {activeSection === 'settings' && (
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Settings</h2>
              <p className="text-gray-600">Settings panel coming soon...</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Index;
