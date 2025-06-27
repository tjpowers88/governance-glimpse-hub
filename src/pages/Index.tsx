
import React from 'react';
import Dashboard from '../components/Dashboard';
import Navigation from '../components/Navigation';

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      <Navigation />
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">IT Governance Portal</h1>
          <p className="text-lg text-gray-600">Centralized governance decisions, meetings, and resources</p>
        </div>
        <Dashboard />
      </div>
    </div>
  );
};

export default Index;
