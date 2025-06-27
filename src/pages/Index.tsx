
import React, { useState } from 'react';
import Dashboard from '../components/Dashboard';
import Navigation from '../components/Navigation';
import GovernanceBoards from '../components/GovernanceBoards';
import MeetingCalendarView from '../components/MeetingCalendarView';
import AuditManagement from '../components/AuditManagement';
import PolicyManagement from '../components/PolicyManagement';
import ITGovernancePerformance from '../components/ITGovernancePerformance';

const Index = () => {
  const [activeSection, setActiveSection] = useState('dashboard');

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <Navigation activeSection={activeSection} setActiveSection={setActiveSection} />
      <div className="flex-1 ml-64">
        <div className="bg-slate-900 border-b border-slate-700 px-8 py-6 shadow-sm">
          <h1 className="text-3xl font-bold text-white mb-1">IT Governance Portal</h1>
          <p className="text-gray-300">Centralized governance decisions, meetings, and resources</p>
        </div>
        <div className="p-8">
          {activeSection === 'dashboard' && <Dashboard />}
          {activeSection === 'calendar' && <MeetingCalendarView />}
          {activeSection === 'boards' && <GovernanceBoards />}
          {activeSection === 'governance' && <ITGovernancePerformance />}
          {activeSection === 'audit' && <AuditManagement />}
          {activeSection === 'policy' && <PolicyManagement />}
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
