
import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Eye, Calendar, Users } from 'lucide-react';
import DecisionDetailModal from './DecisionDetailModal';

const LatestDecisions = () => {
  const [selectedDecision, setSelectedDecision] = useState<any>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toISOString().split('T')[0];
  };

  const decisions = [
    {
      id: 1,
      title: 'AI Ethics Framework Implementation',
      board: 'IT Strategy Board',
      date: '2025-06-28',
      status: 'approved',
      confidential: false,
      summary: 'Approved comprehensive AI ethics framework for all machine learning initiatives with mandatory review process.'
    },
    {
      id: 2,
      title: 'Zero Trust Security Architecture',
      board: 'Security Governance Board',
      date: '2025-06-20',
      status: 'approved',
      confidential: false,
      summary: 'Approved implementation of zero trust security model across all enterprise systems by Q4 2025.'
    },
    {
      id: 3,
      title: 'Cloud Cost Optimization Initiative',
      board: 'IT Investment Board',
      date: '2025-06-15',
      status: 'under-review',
      confidential: true,
      summary: 'Confidential decision - access restricted.'
    },
    {
      id: 4,
      title: 'Data Retention Policy Update',
      board: 'Data Governance Board',
      date: '2025-06-08',
      status: 'approved',
      confidential: false,
      summary: 'Updated data retention policies to comply with new regulatory requirements and reduce storage costs by 30%.'
    },
    {
      id: 5,
      title: 'Remote Work Technology Standards',
      board: 'IT Strategy Board',
      date: '2025-05-25',
      status: 'approved',
      confidential: false,
      summary: 'Established standardized technology stack for remote workers including approved devices and security tools.'
    },
    {
      id: 6,
      title: 'Incident Response Plan Enhancement',
      board: 'Security Governance Board',
      date: '2025-05-18',
      status: 'approved',
      confidential: false,
      summary: 'Enhanced incident response procedures with automated threat detection and 24/7 monitoring capabilities.'
    },
    {
      id: 7,
      title: 'Vendor Risk Assessment Framework',
      board: 'IT Investment Board',
      date: '2025-05-10',
      status: 'under-review',
      confidential: false,
      summary: 'New framework for assessing third-party vendor security and compliance risks before contract approval.'
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

  const handleViewDecision = (decision: any) => {
    setSelectedDecision(decision);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedDecision(null);
  };

  return (
    <>
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
                  {formatDate(decision.date)}
                </div>
              </div>
              
              <p className="text-gray-700">{decision.summary}</p>
              
              <div 
                className="mt-3 flex items-center text-sm text-blue-600 hover:text-blue-800 cursor-pointer"
                onClick={() => handleViewDecision(decision)}
              >
                <Eye className="h-4 w-4 mr-1" />
                View full decision
              </div>
            </div>
          ))}
        </div>
      </Card>

      <DecisionDetailModal
        decision={selectedDecision}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
      />
    </>
  );
};

export default LatestDecisions;
