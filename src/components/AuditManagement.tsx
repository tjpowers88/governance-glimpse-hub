
import React from 'react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ClipboardCheck, Calendar, AlertTriangle, CheckCircle, Clock, FileText, Users } from 'lucide-react';

const AuditManagement = () => {
  const auditItems = [
    {
      id: '1',
      title: 'IT Security Audit 2024',
      type: 'Security',
      status: 'in-progress',
      dueDate: '2024-03-15',
      assignee: 'Security Team',
      findings: 3,
      severity: 'medium'
    },
    {
      id: '2',
      title: 'Data Governance Compliance Review',
      type: 'Compliance',
      status: 'completed',
      dueDate: '2024-01-30',
      assignee: 'Data Team',
      findings: 1,
      severity: 'low'
    },
    {
      id: '3',
      title: 'Infrastructure Risk Assessment',
      type: 'Risk',
      status: 'scheduled',
      dueDate: '2024-04-01',
      assignee: 'IT Operations',
      findings: 0,
      severity: 'high'
    },
    {
      id: '4',
      title: 'Vendor Management Audit',
      type: 'Vendor',
      status: 'overdue',
      dueDate: '2024-01-15',
      assignee: 'Procurement',
      findings: 5,
      severity: 'high'
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-green-100 text-green-800';
      case 'in-progress': return 'bg-blue-100 text-blue-800';
      case 'scheduled': return 'bg-gray-100 text-gray-800';
      case 'overdue': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'high': return 'text-red-600';
      case 'medium': return 'text-yellow-600';
      case 'low': return 'text-green-600';
      default: return 'text-gray-600';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed': return CheckCircle;
      case 'in-progress': return Clock;
      case 'scheduled': return Calendar;
      case 'overdue': return AlertTriangle;
      default: return Clock;
    }
  };

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Audit Management</h1>
          <p className="text-gray-600 mt-2">Track and manage IT governance audits and compliance reviews</p>
        </div>
        <Button className="bg-blue-600 hover:bg-blue-700">
          <ClipboardCheck className="h-4 w-4 mr-2" />
          New Audit
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="p-6">
          <div className="flex items-center">
            <CheckCircle className="h-8 w-8 text-green-600 mr-3" />
            <div>
              <p className="text-2xl font-bold text-gray-900">2</p>
              <p className="text-sm text-gray-600">Completed</p>
            </div>
          </div>
        </Card>
        
        <Card className="p-6">
          <div className="flex items-center">
            <Clock className="h-8 w-8 text-blue-600 mr-3" />
            <div>
              <p className="text-2xl font-bold text-gray-900">1</p>
              <p className="text-sm text-gray-600">In Progress</p>
            </div>
          </div>
        </Card>
        
        <Card className="p-6">
          <div className="flex items-center">
            <Calendar className="h-8 w-8 text-gray-600 mr-3" />
            <div>
              <p className="text-2xl font-bold text-gray-900">1</p>
              <p className="text-sm text-gray-600">Scheduled</p>
            </div>
          </div>
        </Card>
        
        <Card className="p-6">
          <div className="flex items-center">
            <AlertTriangle className="h-8 w-8 text-red-600 mr-3" />
            <div>
              <p className="text-2xl font-bold text-gray-900">1</p>
              <p className="text-sm text-gray-600">Overdue</p>
            </div>
          </div>
        </Card>
      </div>

      <Card className="p-6">
        <h2 className="text-xl font-bold text-gray-900 mb-6">Active Audits</h2>
        
        <div className="space-y-4">
          {auditItems.map((audit) => {
            const StatusIcon = getStatusIcon(audit.status);
            
            return (
              <div key={audit.id} className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50 transition-colors">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center mb-2">
                      <StatusIcon className="h-5 w-5 mr-2 text-gray-600" />
                      <h3 className="font-semibold text-gray-900">{audit.title}</h3>
                      <Badge className={`ml-2 ${getStatusColor(audit.status)}`}>
                        {audit.status}
                      </Badge>
                    </div>
                    
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm text-gray-600">
                      <div className="flex items-center">
                        <FileText className="h-4 w-4 mr-1" />
                        {audit.type}
                      </div>
                      <div className="flex items-center">
                        <Calendar className="h-4 w-4 mr-1" />
                        Due: {audit.dueDate}
                      </div>
                      <div className="flex items-center">
                        <Users className="h-4 w-4 mr-1" />
                        {audit.assignee}
                      </div>
                      <div className="flex items-center">
                        <AlertTriangle className={`h-4 w-4 mr-1 ${getSeverityColor(audit.severity)}`} />
                        {audit.findings} findings
                      </div>
                    </div>
                  </div>
                  
                  <Button variant="outline" size="sm">
                    View Details
                  </Button>
                </div>
              </div>
            );
          })}
        </div>
      </Card>
    </div>
  );
};

export default AuditManagement;
