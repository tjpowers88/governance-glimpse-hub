
import React from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Calendar, BookOpen, AlertCircle, Eye } from 'lucide-react';

const QuickActions = () => {
  const actions = [
    {
      title: 'View Boards',
      description: 'Browse governance boards and meetings',
      icon: Eye,
      color: 'bg-blue-800 hover:bg-blue-900'
    },
    {
      title: 'Meeting Calendar',
      description: 'View upcoming board meetings',
      icon: Calendar,
      color: 'bg-gray-600 hover:bg-gray-700'
    },
    {
      title: 'Board Guidelines',
      description: 'View governance guidelines and policies',
      icon: BookOpen,
      color: 'bg-blue-700 hover:bg-blue-800'
    }
  ];

  return (
    <Card className="p-6 border border-gray-100 shadow-sm bg-white">
      <h2 className="text-xl font-bold text-gray-900 mb-6">Quick Actions</h2>
      
      <div className="space-y-3">
        {actions.map((action, index) => {
          const Icon = action.icon;
          return (
            <Button
              key={index}
              variant="outline"
              className="w-full justify-start h-auto p-4 hover:bg-gray-50 border-gray-200 hover:border-blue-300 hover:shadow-md transition-all duration-200"
            >
              <div className={`p-2 rounded-lg mr-3 text-white ${action.color} shadow-sm`}>
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
      
      <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
        <div className="flex items-start">
          <AlertCircle className="h-5 w-5 text-blue-800 mr-2 mt-0.5" />
          <div>
            <h3 className="text-sm font-medium text-blue-900">Governance Information</h3>
            <p className="text-sm text-blue-800 mt-1">
              Access board information and meetings based on your permissions and role.
            </p>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default QuickActions;
