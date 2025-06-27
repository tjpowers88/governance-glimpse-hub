
import React from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Plus, FileText, Calendar, Users, BookOpen, AlertCircle } from 'lucide-react';

const QuickActions = () => {
  const actions = [
    {
      title: 'New Decision',
      description: 'Record a new governance decision',
      icon: Plus,
      color: 'bg-blue-500 hover:bg-blue-600'
    },
    {
      title: 'Schedule Meeting',
      description: 'Add a board meeting to calendar',
      icon: Calendar,
      color: 'bg-green-500 hover:bg-green-600'
    },
    {
      title: 'Upload Document',
      description: 'Add files to board repository',
      icon: FileText,
      color: 'bg-purple-500 hover:bg-purple-600'
    },
    {
      title: 'Board Guidelines',
      description: 'View dos and don\'ts',
      icon: BookOpen,
      color: 'bg-orange-500 hover:bg-orange-600'
    }
  ];

  return (
    <Card className="p-6">
      <h2 className="text-xl font-bold text-gray-900 mb-6">Quick Actions</h2>
      
      <div className="space-y-3">
        {actions.map((action, index) => {
          const Icon = action.icon;
          return (
            <Button
              key={index}
              variant="outline"
              className="w-full justify-start h-auto p-4 hover:bg-gray-50"
            >
              <div className={`p-2 rounded-md mr-3 text-white ${action.color}`}>
                <Icon className="h-4 w-4" />
              </div>
              <div className="text-left">
                <div className="font-medium text-gray-900">{action.title}</div>
                <div className="text-sm text-gray-600">{action.description}</div>
              </div>
            </Button>
          );
        })}
      </div>
      
      <div className="mt-6 p-4 bg-amber-50 border border-amber-200 rounded-lg">
        <div className="flex items-start">
          <AlertCircle className="h-5 w-5 text-amber-600 mr-2 mt-0.5" />
          <div>
            <h3 className="text-sm font-medium text-amber-800">Governance Reminder</h3>
            <p className="text-sm text-amber-700 mt-1">
              Remember to mark sensitive decisions as confidential to maintain security compliance.
            </p>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default QuickActions;
