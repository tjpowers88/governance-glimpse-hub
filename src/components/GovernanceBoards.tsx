
import React from 'react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Users, FileText, Shield, Eye, Lock } from 'lucide-react';

const GovernanceBoards = () => {
  const boards = [
    {
      id: 1,
      name: 'IT Strategy Board',
      description: 'Sets overall IT strategy and direction for the organization',
      chair: 'Sarah Johnson',
      members: 8,
      nextMeeting: '2024-01-25',
      confidentialFiles: 2,
      publicFiles: 15,
      recentDecisions: 3
    },
    {
      id: 2,
      name: 'Security Governance Board',
      description: 'Oversees cybersecurity policies and incident response',
      chair: 'Michael Chen',
      members: 12,
      nextMeeting: '2024-01-30',
      confidentialFiles: 8,
      publicFiles: 22,
      recentDecisions: 5
    },
    {
      id: 3,
      name: 'Data Governance Board',
      description: 'Manages data quality, privacy, and compliance initiatives',
      chair: 'Emma Rodriguez',
      members: 6,
      nextMeeting: '2024-02-05',
      confidentialFiles: 4,
      publicFiles: 11,
      recentDecisions: 2
    },
    {
      id: 4,
      name: 'IT Investment Board',
      description: 'Reviews and approves IT investments and budget allocations',
      chair: 'David Park',
      members: 10,
      nextMeeting: '2024-02-12',
      confidentialFiles: 12,
      publicFiles: 8,
      recentDecisions: 4
    }
  ];

  return (
    <Card className="p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-900">Governance Boards</h2>
        <Button variant="outline" size="sm">
          <Users className="h-4 w-4 mr-2" />
          Manage Boards
        </Button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {boards.map((board) => (
          <div key={board.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
            <div className="flex items-start justify-between mb-3">
              <h3 className="text-lg font-semibold text-gray-900">{board.name}</h3>
              <Badge variant="outline" className="text-xs">
                {board.members} members
              </Badge>
            </div>
            
            <p className="text-gray-600 text-sm mb-4">{board.description}</p>
            
            <div className="space-y-2 text-sm text-gray-700 mb-4">
              <div><strong>Chair:</strong> {board.chair}</div>
              <div><strong>Next Meeting:</strong> {new Date(board.nextMeeting).toLocaleDateString()}</div>
            </div>
            
            <div className="flex items-center justify-between text-sm text-gray-600 mb-4">
              <div className="flex items-center space-x-4">
                <div className="flex items-center">
                  <FileText className="h-4 w-4 mr-1" />
                  {board.publicFiles} public
                </div>
                <div className="flex items-center">
                  <Lock className="h-4 w-4 mr-1" />
                  {board.confidentialFiles} confidential
                </div>
              </div>
              <Badge variant="secondary" className="text-xs">
                {board.recentDecisions} recent decisions
              </Badge>
            </div>
            
            <div className="flex space-x-2">
              <Button variant="outline" size="sm" className="flex-1">
                <Eye className="h-4 w-4 mr-1" />
                View Board
              </Button>
              <Button variant="outline" size="sm">
                <Shield className="h-4 w-4" />
              </Button>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
};

export default GovernanceBoards;
