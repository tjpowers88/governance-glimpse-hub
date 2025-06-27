
import React, { useState } from 'react';
import { Calendar, Shield, FileText, Users, Settings, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Navigation = () => {
  const [activeSection, setActiveSection] = useState('dashboard');

  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: FileText },
    { id: 'calendar', label: 'Meeting Calendar', icon: Calendar },
    { id: 'boards', label: 'Governance Boards', icon: Users },
    { id: 'templates', label: 'Templates & Resources', icon: Shield },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  return (
    <nav className="bg-white shadow-sm border-b border-gray-200">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-8">
            <div className="flex items-center">
              <Shield className="h-8 w-8 text-blue-600 mr-2" />
              <span className="text-xl font-bold text-gray-900">IT Governance</span>
            </div>
            <div className="hidden md:flex space-x-6">
              {navItems.map((item) => {
                const Icon = item.icon;
                return (
                  <button
                    key={item.id}
                    onClick={() => setActiveSection(item.id)}
                    className={`flex items-center px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                      activeSection === item.id
                        ? 'text-blue-600 bg-blue-50'
                        : 'text-gray-700 hover:text-blue-600 hover:bg-gray-50'
                    }`}
                  >
                    <Icon className="h-4 w-4 mr-2" />
                    {item.label}
                  </button>
                );
              })}
            </div>
          </div>
          <Button variant="outline" size="sm">
            <Settings className="h-4 w-4 mr-2" />
            Admin
          </Button>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
