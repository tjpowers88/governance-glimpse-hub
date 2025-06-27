
import React from 'react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Users, FileText, Shield, Eye, Lock, Calendar, User } from 'lucide-react';

const GovernanceBoards = () => {
  const strategicBoards = [
    {
      id: 1,
      name: 'IT Steering Committee',
      description: 'High-level oversight of IT strategy and major technology decisions',
      chair: 'Sarah Johnson',
      members: 12,
      nextMeeting: '2024-01-25',
      confidentialFiles: 8,
      publicFiles: 15,
      recentDecisions: 5
    },
    {
      id: 2,
      name: 'Enterprise Architecture Board',
      description: 'Governs enterprise architecture standards and technology roadmap',
      chair: 'Michael Chen',
      members: 8,
      nextMeeting: '2024-01-30',
      confidentialFiles: 6,
      publicFiles: 22,
      recentDecisions: 3
    },
    {
      id: 3,
      name: 'Strategic Contract Board',
      description: 'Reviews and approves major vendor contracts and partnerships',
      chair: 'Emma Rodriguez',
      members: 10,
      nextMeeting: '2024-02-05',
      confidentialFiles: 12,
      publicFiles: 8,
      recentDecisions: 4
    },
    {
      id: 4,
      name: 'Strategic Finance Board',
      description: 'Oversees IT financial planning and budget allocation strategy',
      chair: 'David Park',
      members: 9,
      nextMeeting: '2024-02-12',
      confidentialFiles: 15,
      publicFiles: 5,
      recentDecisions: 6
    },
    {
      id: 5,
      name: 'Strategic IT Business Board',
      description: 'Aligns IT initiatives with business objectives and priorities',
      chair: 'Lisa Thompson',
      members: 11,
      nextMeeting: '2024-02-15',
      confidentialFiles: 7,
      publicFiles: 18,
      recentDecisions: 4
    },
    {
      id: 6,
      name: 'Strategic Project Portfolio Board',
      description: 'Governs major project investments and portfolio management',
      chair: 'James Wilson',
      members: 13,
      nextMeeting: '2024-02-20',
      confidentialFiles: 10,
      publicFiles: 12,
      recentDecisions: 7
    },
    {
      id: 7,
      name: 'Vendor Executive Steering Board',
      description: 'Manages strategic vendor relationships and executive partnerships',
      chair: 'Maria Garcia',
      members: 8,
      nextMeeting: '2024-02-25',
      confidentialFiles: 9,
      publicFiles: 6,
      recentDecisions: 3
    }
  ];

  const tacticalBoards = [
    {
      id: 8,
      name: 'Audit Board',
      description: 'Conducts IT audits and compliance reviews',
      chair: 'Robert Brown',
      members: 6,
      nextMeeting: '2024-01-28',
      confidentialFiles: 5,
      publicFiles: 14,
      recentDecisions: 2
    },
    {
      id: 9,
      name: 'Contract Board',
      description: 'Reviews and manages day-to-day vendor contracts',
      chair: 'Jennifer Lee',
      members: 7,
      nextMeeting: '2024-02-02',
      confidentialFiles: 4,
      publicFiles: 16,
      recentDecisions: 5
    },
    {
      id: 10,
      name: 'HR & Workforce Planning Board',
      description: 'Manages IT staffing, skills development, and workforce planning',
      chair: 'Alex Kumar',
      members: 8,
      nextMeeting: '2024-02-08',
      confidentialFiles: 6,
      publicFiles: 11,
      recentDecisions: 3
    },
    {
      id: 11,
      name: 'Information Cyber Security Board',
      description: 'Oversees cybersecurity policies and incident response',
      chair: 'Catherine Miller',
      members: 10,
      nextMeeting: '2024-02-10',
      confidentialFiles: 11,
      publicFiles: 9,
      recentDecisions: 6
    },
    {
      id: 12,
      name: 'IT Strategy Board',
      description: 'Implements tactical IT strategy and operational decisions',
      chair: 'Thomas Anderson',
      members: 9,
      nextMeeting: '2024-02-14',
      confidentialFiles: 3,
      publicFiles: 19,
      recentDecisions: 4
    },
    {
      id: 13,
      name: 'Practice Ownership Board',
      description: 'Manages IT practice standards and ownership responsibilities',
      chair: 'Rachel Green',
      members: 7,
      nextMeeting: '2024-02-18',
      confidentialFiles: 2,
      publicFiles: 13,
      recentDecisions: 2
    },
    {
      id: 14,
      name: 'Project Portfolio Board',
      description: 'Manages ongoing project execution and operational portfolio',
      chair: 'Kevin Davis',
      members: 11,
      nextMeeting: '2024-02-22',
      confidentialFiles: 7,
      publicFiles: 15,
      recentDecisions: 8
    },
    {
      id: 15,
      name: 'Tactical Budget Board',
      description: 'Manages operational budget allocation and expense tracking',
      chair: 'Nicole White',
      members: 6,
      nextMeeting: '2024-02-26',
      confidentialFiles: 8,
      publicFiles: 7,
      recentDecisions: 3
    }
  ];

  const BoardCard = ({ board }: { board: typeof strategicBoards[0] }) => (
    <div className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow bg-white">
      <div className="flex items-start justify-between mb-3">
        <h3 className="text-lg font-semibold text-gray-900">{board.name}</h3>
        <Badge variant="outline" className="text-xs">
          <Users className="h-3 w-3 mr-1" />
          {board.members}
        </Badge>
      </div>
      
      <p className="text-gray-600 text-sm mb-4">{board.description}</p>
      
      <div className="space-y-2 text-sm text-gray-700 mb-4">
        <div className="flex items-center">
          <User className="h-4 w-4 mr-2" />
          <span><strong>Chair:</strong> {board.chair}</span>
        </div>
        <div className="flex items-center">
          <Calendar className="h-4 w-4 mr-2" />
          <span><strong>Next Meeting:</strong> {new Date(board.nextMeeting).toLocaleDateString()}</span>
        </div>
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
  );

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-900">Governance Boards</h2>
        <Button variant="outline" size="sm">
          <Users className="h-4 w-4 mr-2" />
          Manage Boards
        </Button>
      </div>
      
      <Tabs defaultValue="strategic" className="w-full">
        <TabsList className="grid w-full grid-cols-2 mb-6">
          <TabsTrigger value="strategic" className="text-sm">
            Strategic Boards ({strategicBoards.length})
          </TabsTrigger>
          <TabsTrigger value="tactical" className="text-sm">
            Tactical Boards ({tacticalBoards.length})
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="strategic">
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {strategicBoards.map((board) => (
              <BoardCard key={board.id} board={board} />
            ))}
          </div>
        </TabsContent>
        
        <TabsContent value="tactical">
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {tacticalBoards.map((board) => (
              <BoardCard key={board.id} board={board} />
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default GovernanceBoards;
