import React from 'react';
import { Calendar, Shield, FileText, Users, Settings, Home, ClipboardCheck, BookOpen, BarChart3 } from 'lucide-react';

interface NavigationProps {
  activeSection: string;
  setActiveSection: (section: string) => void;
}

const Navigation = ({ activeSection, setActiveSection }: NavigationProps) => {
  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: Home },
    { id: 'calendar', label: 'Meeting Calendar', icon: Calendar },
    { id: 'boards', label: 'Governance Boards', icon: Users },
    { id: 'governance', label: 'IT Governance', icon: BarChart3 },
    { id: 'audit', label: 'Audit Management', icon: ClipboardCheck },
    { id: 'policy', label: 'Policy Management', icon: BookOpen },
    { id: 'templates', label: 'Templates & Resources', icon: FileText },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  return (
    <nav className="fixed left-0 top-0 h-full w-64 bg-slate-900 border-r border-slate-700 shadow-lg z-50">
      <div className="p-6">
        <div className="flex items-center mb-8">
          <Shield className="h-8 w-8 text-blue-400 mr-3" />
          <span className="text-xl font-bold text-white">IT Governance</span>
        </div>
        
        <div className="space-y-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <button
                key={item.id}
                onClick={() => setActiveSection(item.id)}
                className={`w-full flex items-center px-4 py-3 rounded-lg text-left transition-all duration-200 ${
                  activeSection === item.id
                    ? 'bg-blue-600 text-white border-l-4 border-blue-400 shadow-md'
                    : 'text-gray-300 hover:text-white hover:bg-slate-800'
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
        <div className="bg-slate-800 rounded-lg p-4 border border-slate-700">
          <div className="flex items-center">
            <Settings className="h-5 w-5 text-gray-400 mr-2" />
            <span className="text-white text-sm font-medium">Admin Panel</span>
          </div>
          <p className="text-gray-400 text-xs mt-1">Manage system settings</p>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
