import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Users, FileText, Shield, Eye, Lock, Calendar, User } from 'lucide-react';
import { Board, Decision, Meeting, AgendaItem } from '../types/boardTypes';
import BoardDetailView from './BoardDetailView';

const GovernanceBoards = () => {
  const [selectedBoard, setSelectedBoard] = useState<Board | null>(null);

  // Mock current user - in a real app this would come from authentication
  const currentUser = {
    id: '1',
    name: 'Sarah Johnson',
    email: 'sarah.johnson@company.com'
  };

  // Sample data with integrated decision tracking and meeting management
  const sampleDecisions: Decision[] = [
    {
      id: '1',
      title: 'Cloud Migration Strategy',
      description: 'Approve migration to Azure cloud infrastructure',
      boardId: '1',
      status: 'approved',
      isConfidential: true,
      createdDate: '2024-01-15',
      createdBy: 'John Smith'
    },
    {
      id: '2',
      title: 'Security Framework Update',
      description: 'Update cybersecurity framework to NIST standards',
      boardId: '1',
      status: 'under-review',
      isConfidential: false,
      createdDate: '2024-01-12',
      createdBy: 'Jane Doe'
    }
  ];

  const sampleAgenda: AgendaItem[] = [
    {
      id: '1',
      title: 'Cloud Migration Budget Review',
      type: 'decision',
      duration: 30,
      presenter: 'Sarah Johnson',
      description: 'Review and approve cloud migration budget allocation',
      relatedDecisionId: '1',
      order: 1
    },
    {
      id: '2',
      title: 'Q2 Strategic Planning',
      type: 'discussion',
      duration: 45,
      presenter: 'Michael Chen',
      description: 'Discuss strategic initiatives for Q2',
      order: 2
    }
  ];

  const sampleMeeting: Meeting = {
    id: '1',
    boardId: '1',
    date: '2024-01-25',
    startTime: '09:00',
    endTime: '11:00',
    location: 'Conference Room A',
    status: 'scheduled',
    agenda: sampleAgenda,
    attendees: ['Sarah Johnson', 'Michael Chen', 'Emma Rodriguez'],
    chairperson: 'Sarah Johnson',
    secretary: 'Assistant Secretary'
  };

  const strategicBoards: Board[] = [
    {
      id: '1',
      name: 'IT Steering Committee',
      description: 'High-level oversight of IT strategy and major technology decisions',
      type: 'strategic',
      chair: 'Sarah Johnson',
      members: ['Sarah Johnson', 'Michael Chen', 'Emma Rodriguez'],
      nextMeeting: '2024-01-25',
      decisions: sampleDecisions.filter(d => d.boardId === '1'),
      meetings: [sampleMeeting],
      documents: [
        {
          id: '1',
          title: 'Cloud Migration Strategy Document',
          fileName: 'cloud-migration-strategy-2024.pdf',
          uploadedBy: 'Sarah Johnson',
          uploadedDate: '2024-01-10',
          boardId: '1',
          isConfidential: true,
          fileType: 'pdf',
          fileSize: 2048000,
          description: 'Comprehensive strategy for cloud migration initiative'
        }
      ]
    },
    {
      id: '2',
      name: 'Enterprise Architecture Board',
      description: 'Governs enterprise architecture standards and technology roadmap',
      type: 'strategic',
      chair: 'Michael Chen',
      members: ['Michael Chen', 'Tech Lead 1', 'Tech Lead 2'],
      nextMeeting: '2024-01-30',
      decisions: [],
      meetings: [],
      documents: []
    },
    {
      id: '3',
      name: 'Strategic Contract Board',
      description: 'Reviews and approves major vendor contracts and partnerships',
      type: 'strategic',
      chair: 'Emma Rodriguez',
      members: ['Emma Rodriguez', 'Legal Counsel', 'Procurement Lead'],
      nextMeeting: '2024-02-05',
      decisions: [],
      meetings: [],
      documents: []
    },
    {
      id: '4',
      name: 'Strategic Finance Board',
      description: 'Oversees IT financial planning and budget allocation strategy',
      type: 'strategic',
      chair: 'David Park',
      members: ['David Park', 'CFO', 'Finance Director'],
      nextMeeting: '2024-02-12',
      decisions: [],
      meetings: [],
      documents: []
    },
    {
      id: '5',
      name: 'Strategic IT Business Board',
      description: 'Aligns IT initiatives with business objectives and priorities',
      type: 'strategic',
      chair: 'Lisa Thompson',
      members: ['Lisa Thompson', 'Business Lead 1', 'Business Lead 2'],
      nextMeeting: '2024-02-15',
      decisions: [],
      meetings: [],
      documents: []
    },
    {
      id: '6',
      name: 'Strategic Project Portfolio Board',
      description: 'Governs major project investments and portfolio management',
      type: 'strategic',
      chair: 'James Wilson',
      members: ['James Wilson', 'PMO Director', 'Portfolio Manager'],
      nextMeeting: '2024-02-20',
      decisions: [],
      meetings: [],
      documents: []
    },
    {
      id: '7',
      name: 'Vendor Executive Steering Board',
      description: 'Manages strategic vendor relationships and executive partnerships',
      type: 'strategic',
      chair: 'Maria Garcia',
      members: ['Maria Garcia', 'Vendor Relations', 'Executive Sponsor'],
      nextMeeting: '2024-02-25',
      decisions: [],
      meetings: [],
      documents: []
    }
  ];

  const tacticalBoards: Board[] = [
    {
      id: '8',
      name: 'Audit Board',
      description: 'Conducts IT audits and compliance reviews',
      type: 'tactical',
      chair: 'Robert Brown',
      members: ['Robert Brown', 'Auditor 1', 'Compliance Officer'],
      nextMeeting: '2024-01-28',
      decisions: [],
      meetings: [],
      documents: []
    },
    {
      id: '9',
      name: 'Contract Board',
      description: 'Reviews and manages day-to-day vendor contracts',
      type: 'tactical',
      chair: 'Jennifer Lee',
      members: ['Jennifer Lee', 'Contract Manager', 'Legal Review'],
      nextMeeting: '2024-02-02',
      decisions: [],
      meetings: [],
      documents: []
    },
    {
      id: '10',
      name: 'HR & Workforce Planning Board',
      description: 'Manages IT staffing, skills development, and workforce planning',
      type: 'tactical',
      chair: 'Alex Kumar',
      members: ['Alex Kumar', 'HR Business Partner', 'Training Manager'],
      nextMeeting: '2024-02-08',
      decisions: [],
      meetings: [],
      documents: []
    },
    {
      id: '11',
      name: 'Information Cyber Security Board',
      description: 'Oversees cybersecurity policies and incident response',
      type: 'tactical',
      chair: 'Catherine Miller',
      members: ['Catherine Miller', 'Security Analyst', 'CISO'],
      nextMeeting: '2024-02-10',
      decisions: [],
      meetings: [],
      documents: []
    },
    {
      id: '12',
      name: 'IT Strategy Board',
      description: 'Implements tactical IT strategy and operational decisions',
      type: 'tactical',
      chair: 'Thomas Anderson',
      members: ['Thomas Anderson', 'Strategy Lead', 'Operations Manager'],
      nextMeeting: '2024-02-14',
      decisions: [],
      meetings: [],
      documents: []
    },
    {
      id: '13',
      name: 'Practice Ownership Board',
      description: 'Manages IT practice standards and ownership responsibilities',
      type: 'tactical',
      chair: 'Rachel Green',
      members: ['Rachel Green', 'Practice Owner 1', 'Standards Lead'],
      nextMeeting: '2024-02-18',
      decisions: [],
      meetings: [],
      documents: []
    },
    {
      id: '14',
      name: 'Project Portfolio Board',
      description: 'Manages ongoing project execution and operational portfolio',
      type: 'tactical',
      chair: 'Kevin Davis',
      members: ['Kevin Davis', 'Project Manager 1', 'Resource Manager'],
      nextMeeting: '2024-02-22',
      decisions: [],
      meetings: [],
      documents: []
    },
    {
      id: '15',
      name: 'Tactical Budget Board',
      description: 'Manages operational budget allocation and expense tracking',
      type: 'tactical',
      chair: 'Nicole White',
      members: ['Nicole White', 'Budget Analyst', 'Finance Lead'],
      nextMeeting: '2024-02-26',
      decisions: [],
      meetings: [],
      documents: []
    }
  ];

  const BoardCard = ({ board }: { board: Board }) => (
    <div className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow bg-white">
      <div className="flex items-start justify-between mb-3">
        <h3 className="text-lg font-semibold text-gray-900">{board.name}</h3>
        <Badge variant="outline" className="text-xs">
          <Users className="h-3 w-3 mr-1" />
          {board.members.length}
        </Badge>
      </div>
      
      <p className="text-gray-600 text-sm mb-4">{board.description}</p>
      
      <div className="space-y-2 text-sm text-gray-700 mb-4">
        <div className="flex items-center">
          <User className="h-4 w-4 mr-2" />
          <span><strong>Chair:</strong> {board.chair}</span>
        </div>
        {board.nextMeeting && (
          <div className="flex items-center">
            <Calendar className="h-4 w-4 mr-2" />
            <span><strong>Next Meeting:</strong> {new Date(board.nextMeeting).toLocaleDateString()}</span>
          </div>
        )}
      </div>
      
      <div className="flex items-center justify-between text-sm text-gray-600 mb-4">
        <div className="flex items-center space-x-4">
          <div className="flex items-center">
            <FileText className="h-4 w-4 mr-1" />
            {board.decisions.filter(d => !d.isConfidential).length} public
          </div>
          <div className="flex items-center">
            <Lock className="h-4 w-4 mr-1" />
            {board.decisions.filter(d => d.isConfidential).length} confidential
          </div>
        </div>
        <Badge variant="secondary" className="text-xs">
          {board.decisions.length} decisions
        </Badge>
      </div>
      
      <div className="flex space-x-2">
        <Button 
          variant="outline" 
          size="sm" 
          className="flex-1"
          onClick={() => setSelectedBoard(board)}
        >
          <Eye className="h-4 w-4 mr-1" />
          Manage Board
        </Button>
        <Button variant="outline" size="sm">
          <Shield className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );

  if (selectedBoard) {
    return (
      <BoardDetailView
        board={selectedBoard}
        currentUser={currentUser}
        onBack={() => setSelectedBoard(null)}
      />
    );
  }

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
