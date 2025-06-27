
import React from 'react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { BookOpen, Calendar, Clock, Users, FileText, AlertCircle, CheckCircle } from 'lucide-react';

const PolicyManagement = () => {
  const policies = [
    {
      id: '1',
      title: 'IT Security Policy',
      version: '2.1',
      status: 'active',
      lastReviewed: '2024-01-15',
      nextReview: '2024-07-15',
      owner: 'Security Team',
      category: 'Security',
      compliance: 'SOC 2, ISO 27001'
    },
    {
      id: '2',
      title: 'Data Governance Policy',
      version: '1.3',
      status: 'under-review',
      lastReviewed: '2023-12-01',
      nextReview: '2024-03-01',
      owner: 'Data Team',
      category: 'Data',
      compliance: 'GDPR, CCPA'
    },
    {
      id: '3',
      title: 'Vendor Management Policy',
      version: '3.0',
      status: 'draft',
      lastReviewed: '2024-01-01',
      nextReview: '2024-04-01',
      owner: 'Procurement',
      category: 'Vendor',
      compliance: 'SOX'
    },
    {
      id: '4',
      title: 'Business Continuity Policy',
      version: '1.8',
      status: 'expired',
      lastReviewed: '2023-06-15',
      nextReview: '2023-12-15',
      owner: 'Risk Management',
      category: 'Risk',
      compliance: 'ISO 22301'
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800';
      case 'under-review': return 'bg-yellow-100 text-yellow-800';
      case 'draft': return 'bg-blue-100 text-blue-800';
      case 'expired': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'active': return CheckCircle;
      case 'under-review': return Clock;
      case 'draft': return FileText;
      case 'expired': return AlertCircle;
      default: return FileText;
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'Security': return 'bg-red-50 text-red-700 border-red-200';
      case 'Data': return 'bg-blue-50 text-blue-700 border-blue-200';
      case 'Vendor': return 'bg-purple-50 text-purple-700 border-purple-200';
      case 'Risk': return 'bg-orange-50 text-orange-700 border-orange-200';
      default: return 'bg-gray-50 text-gray-700 border-gray-200';
    }
  };

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Policy Management</h1>
          <p className="text-gray-600 mt-2">Manage governance policies, procedures, and compliance documentation</p>
        </div>
        <Button className="bg-blue-600 hover:bg-blue-700">
          <BookOpen className="h-4 w-4 mr-2" />
          New Policy
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="p-6">
          <div className="flex items-center">
            <CheckCircle className="h-8 w-8 text-green-600 mr-3" />
            <div>
              <p className="text-2xl font-bold text-gray-900">1</p>
              <p className="text-sm text-gray-600">Active</p>
            </div>
          </div>
        </Card>
        
        <Card className="p-6">
          <div className="flex items-center">
            <Clock className="h-8 w-8 text-yellow-600 mr-3" />
            <div>
              <p className="text-2xl font-bold text-gray-900">1</p>
              <p className="text-sm text-gray-600">Under Review</p>
            </div>
          </div>
        </Card>
        
        <Card className="p-6">
          <div className="flex items-center">
            <FileText className="h-8 w-8 text-blue-600 mr-3" />
            <div>
              <p className="text-2xl font-bold text-gray-900">1</p>
              <p className="text-sm text-gray-600">Draft</p>
            </div>
          </div>
        </Card>
        
        <Card className="p-6">
          <div className="flex items-center">
            <AlertCircle className="h-8 w-8 text-red-600 mr-3" />
            <div>
              <p className="text-2xl font-bold text-gray-900">1</p>
              <p className="text-sm text-gray-600">Expired</p>
            </div>
          </div>
        </Card>
      </div>

      <Card className="p-6">
        <h2 className="text-xl font-bold text-gray-900 mb-6">Policy Repository</h2>
        
        <div className="space-y-4">
          {policies.map((policy) => {
            const StatusIcon = getStatusIcon(policy.status);
            
            return (
              <div key={policy.id} className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50 transition-colors">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center mb-3">
                      <StatusIcon className="h-5 w-5 mr-2 text-gray-600" />
                      <h3 className="font-semibold text-gray-900">{policy.title}</h3>
                      <Badge className={`ml-2 ${getStatusColor(policy.status)}`}>
                        {policy.status}
                      </Badge>
                      <Badge className={`ml-2 border ${getCategoryColor(policy.category)}`}>
                        {policy.category}
                      </Badge>
                    </div>
                    
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-sm text-gray-600 mb-3">
                      <div>
                        <span className="font-medium">Version:</span> {policy.version}
                      </div>
                      <div>
                        <span className="font-medium">Owner:</span> {policy.owner}
                      </div>
                      <div>
                        <span className="font-medium">Last Reviewed:</span> {policy.lastReviewed}
                      </div>
                      <div>
                        <span className="font-medium">Next Review:</span> {policy.nextReview}
                      </div>
                      <div className="col-span-2">
                        <span className="font-medium">Compliance:</span> {policy.compliance}
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex space-x-2">
                    <Button variant="outline" size="sm">
                      View
                    </Button>
                    <Button variant="outline" size="sm">
                      Edit
                    </Button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </Card>
    </div>
  );
};

export default PolicyManagement;
