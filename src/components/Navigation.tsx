
import React from 'react';
import { Calendar, Shield, FileText, Users, Settings, Home } from 'lucide-react';

interface NavigationProps {
  activeSection: string;
  setActiveSection: (section: string) => void;
}

const Navigation = ({ activeSection, setActiveSection }: NavigationProps) => {
  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: Home },
    { id: 'calendar', label: 'Meeting Calendar', icon: Calendar },
    { id: 'boards', label: 'Governance Boards', icon: Users },
    { id: 'templates', label: 'Templates & Resources', icon: FileText },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  return (
    <nav className="fixed left-0 top-0 h-full w-64 bg-gradient-to-b from-indigo-900 via-purple-900 to-blue-900 shadow-xl z-50">
      <div className="p-6">
        <div className="flex items-center mb-8">
          <Shield className="h-8 w-8 text-white mr-3" />
          <span className="text-xl font-bold text-white">IT Governance</span>
        </div>
        
        <div className="space-y-2">
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <button
                key={item.id}
                onClick={() => setActiveSection(item.id)}
                className={`w-full flex items-center px-4 py-3 rounded-lg text-left transition-all duration-200 ${
                  activeSection === item.id
                    ? 'bg-white/20 text-white shadow-lg backdrop-blur-sm'
                    : 'text-gray-300 hover:text-white hover:bg-white/10'
                }`}
              >
                <Icon className="h-5 w-5 mr-3" />
                <span className="font-medium">{item.label}</span>
              </button>
            );
          })}
        </div>
      </div>
      
      <div className="absolute bottom-6 left-6 right-6">
        <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/20">
          <div className="flex items-center">
            <Settings className="h-5 w-5 text-white mr-2" />
            <span className="text-white text-sm font-medium">Admin Panel</span>
          </div>
          <p className="text-gray-300 text-xs mt-1">Manage system settings</p>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
