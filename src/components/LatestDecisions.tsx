import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Eye, Calendar, Users } from 'lucide-react';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
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
      date: '2025-07-01',
      status: 'approved',
      confidential: false,
      summary: 'Approved comprehensive AI ethics framework for all machine learning initiatives with mandatory review process and quarterly audits.'
    },
    {
      id: 2,
      title: 'Zero Trust Security Architecture Rollout',
      board: 'Security Governance Board',
      date: '2025-06-28',
      status: 'approved',
      confidential: false,
      summary: 'Approved phased implementation of zero trust security model across all enterprise systems, starting with critical infrastructure by Q4 2025.'
    },
    {
      id: 3,
      title: 'Cloud Migration Strategy Phase 3',
      board: 'IT Investment Board',
      date: '2025-06-25',
      status: 'under-review',
      confidential: true,
      summary: 'Confidential decision - access restricted.'
    },
    {
      id: 4,
      title: 'Enterprise Data Governance Policy 2025',
      board: 'Data Governance Board',
      date: '2025-06-20',
      status: 'approved',
      confidential: false,
      summary: 'Updated comprehensive data governance policies including new AI/ML data handling procedures, GDPR compliance updates, and cross-border data transfer protocols.'
    },
    {
      id: 5,
      title: 'Remote Work Security Standards v2.0',
      board: 'IT Strategy Board',
      date: '2025-06-15',
      status: 'approved',
      confidential: false,
      summary: 'Enhanced remote work technology standards including mandatory VPN usage, endpoint detection requirements, and updated BYOD policies for hybrid workforce.'
    },
    {
      id: 6,
      title: 'Incident Response Automation Initiative',
      board: 'Security Governance Board',
      date: '2025-06-10',
      status: 'approved',
      confidential: false,
      summary: 'Approved implementation of automated incident response procedures with AI-powered threat detection and 24/7 SOAR integration capabilities.'
    },
    {
      id: 7,
      title: 'Third-Party Risk Management Framework',
      board: 'IT Investment Board',
      date: '2025-06-05',
      status: 'under-review',
      confidential: false,
      summary: 'Comprehensive framework for assessing and managing third-party vendor security, compliance, and operational risks throughout the contract lifecycle.'
    },
    {
      id: 8,
      title: 'Digital Transformation Roadmap 2025-2027',
      board: 'IT Strategy Board',
      date: '2025-05-30',
      status: 'approved',
      confidential: false,
      summary: 'Approved three-year digital transformation strategy focusing on cloud-first architecture, API standardization, and customer experience modernization.'
    },
    {
      id: 9,
      title: 'Cybersecurity Training Mandatory Program',
      board: 'Security Governance Board',
      date: '2025-05-25',
      status: 'approved',
      confidential: false,
      summary: 'Implementation of mandatory quarterly cybersecurity training for all employees with role-based modules and phishing simulation testing.'
    },
    {
      id: 10,
      title: 'IT Budget Reallocation Q3-Q4 2025',
      board: 'IT Investment Board',
      date: '2025-05-20',
      status: 'approved',
      confidential: true,
      summary: 'Confidential decision - access restricted.'
    },
    {
      id: 11,
      title: 'Master Data Management Strategy',
      board: 'Data Governance Board',
      date: '2025-05-15',
      status: 'approved',
      confidential: false,
      summary: 'Approved enterprise-wide master data management strategy with data quality metrics, stewardship roles, and integration with existing ERP systems.'
    },
    {
      id: 12,
      title: 'Green IT Sustainability Initiative',
      board: 'IT Strategy Board',
      date: '2025-05-10',
      status: 'under-review',
      confidential: false,
      summary: 'Proposal for sustainable IT practices including carbon footprint reduction targets, energy-efficient infrastructure, and green software development practices.'
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

  const publicDecisions = decisions.filter(decision => !decision.confidential);

  return (
    <>
      <Card className="p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-900">Latest Governance Decisions</h2>
          <Badge variant="outline" className="text-sm">
            {publicDecisions.length} Public Decisions
          </Badge>
        </div>
        
        <Carousel
          opts={{
            align: "start",
            loop: true,
          }}
          orientation="vertical"
          className="w-full max-h-96"
        >
          <CarouselContent className="-mt-2 h-96">
            {publicDecisions.map((decision) => (
              <CarouselItem key={decision.id} className="pt-2 basis-1/3">
                <div className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50 transition-colors h-full">
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="text-lg font-semibold text-gray-900 line-clamp-2">{decision.title}</h3>
                    <Badge className={getStatusColor(decision.status)}>
                      {decision.status.replace('-', ' ')}
                    </Badge>
                  </div>
                  
                  <div className="flex items-center space-x-4 text-sm text-gray-600 mb-2">
                    <div className="flex items-center">
                      <Users className="h-4 w-4 mr-1" />
                      <span className="truncate">{decision.board}</span>
                    </div>
                  </div>
                  
                  <div className="flex items-center text-sm text-gray-600 mb-2">
                    <Calendar className="h-4 w-4 mr-1" />
                    {formatDate(decision.date)}
                  </div>
                  
                  <p className="text-gray-700 text-sm line-clamp-3 mb-3">{decision.summary}</p>
                  
                  <div 
                    className="flex items-center text-sm text-blue-600 hover:text-blue-800 cursor-pointer"
                    onClick={() => handleViewDecision(decision)}
                  >
                    <Eye className="h-4 w-4 mr-1" />
                    View full decision
                  </div>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
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
