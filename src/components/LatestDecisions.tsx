
import React from 'react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Eye, Calendar, Users } from 'lucide-react';

const LatestDecisions = () => {
  const decisions = [
    {
      id: 1,
      title: 'Cloud Migration Strategy Approval',
      board: 'IT Strategy Board',
      date: '2024-01-15',
      status: 'approved',
      confidential: false,
      summary: 'Approved migration to Azure cloud infrastructure with timeline of 18 months.'
    },
    {
      id: 2,
      title: 'Security Framework Update',
      board: 'Security Governance Board',
      date: '2024-01-12',
      status: 'under-review',
      confidential: false,
      summary: 'Updated cybersecurity framework to align with NIST standards.'
    },
    {
      id: 3,
      title: 'Budget Allocation Q2',
      board: 'IT Investment Board',
      date: '2024-01-10',
      status: 'approved',
      confidential: true,
      summary: 'Confidential decision - access restricted.'
    },
    {
      id: 4,
      title: 'Data Governance Policy',
      board: 'Data Governance Board',
      date: '2024-01-08',
      status: 'approved',
      confidential: false,
      summary: 'New data classification and retention policies implemented.'
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'approved': return 'bg-green-100 text-green-800';
      case 'under-review': return 'bg-yellow-100 text-yellow-800';
      case 'rejected': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <Card className="p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-900">Latest Governance Decisions</h2>
        <Badge variant="outline" className="text-sm">
          {decisions.filter(d => !d.confidential).length} Public Decisions
        </Badge>
      </div>
      
      <div className="space-y-4">
        {decisions.filter(decision => !decision.confidential).map((decision) => (
          <div key={decision.id} className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50 transition-colors">
            <div className="flex items-start justify-between mb-2">
              <h3 className="text-lg font-semibold text-gray-900">{decision.title}</h3>
              <Badge className={getStatusColor(decision.status)}>
                {decision.status.replace('-', ' ')}
              </Badge>
            </div>
            
            <div className="flex items-center space-x-4 text-sm text-gray-600 mb-2">
              <div className="flex items-center">
                <Users className="h-4 w-4 mr-1" />
                {decision.board}
              </div>
              <div className="flex items-center">
                <Calendar className="h-4 w-4 mr-1" />
                {new Date(decision.date).toLocaleDateString()}
              </div>
            </div>
            
            <p className="text-gray-700">{decision.summary}</p>
            
            <div className="mt-3 flex items-center text-sm text-blue-600 hover:text-blue-800 cursor-pointer">
              <Eye className="h-4 w-4 mr-1" />
              View full decision
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
};

export default LatestDecisions;
