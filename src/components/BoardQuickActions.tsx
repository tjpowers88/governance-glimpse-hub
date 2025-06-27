
import React from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Plus, Calendar, Upload } from 'lucide-react';

interface BoardQuickActionsProps {
  boardId: string;
  boardName: string;
  isMember: boolean;
  onCreateDecision: () => void;
  onScheduleMeeting: () => void;
  onUploadDocument: () => void;
}

const BoardQuickActions: React.FC<BoardQuickActionsProps> = ({
  boardId,
  boardName,
  isMember,
  onCreateDecision,
  onScheduleMeeting,
  onUploadDocument
}) => {
  if (!isMember) {
    return null; // Don't show quick actions for non-members
  }

  const actions = [
    {
      title: 'New Decision',
      description: `Record a new decision for ${boardName}`,
      icon: Plus,
      color: 'bg-blue-800 hover:bg-blue-900',
      onClick: onCreateDecision
    },
    {
      title: 'Schedule Meeting',
      description: `Add a meeting to ${boardName} calendar`,
      icon: Calendar,
      color: 'bg-gray-600 hover:bg-gray-700',
      onClick: onScheduleMeeting
    },
    {
      title: 'Upload Document',
      description: `Add files to ${boardName} repository`,
      icon: Upload,
      color: 'bg-gray-500 hover:bg-gray-600',
      onClick: onUploadDocument
    }
  ];

  return (
    <Card className="p-4 border border-gray-100 shadow-sm bg-white">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
      
      <div className="space-y-2">
        {actions.map((action, index) => {
          const Icon = action.icon;
          return (
            <Button
              key={index}
              variant="outline"
              className="w-full justify-start h-auto p-3 hover:bg-gray-50 border-gray-200 hover:border-blue-300 hover:shadow-md transition-all duration-200"
              onClick={action.onClick}
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
    </Card>
  );
};

export default BoardQuickActions;
