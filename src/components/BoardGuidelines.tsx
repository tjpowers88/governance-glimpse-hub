
import React from 'react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { CheckCircle, XCircle, AlertTriangle, FileText } from 'lucide-react';

const BoardGuidelines = () => {
  const dos = [
    'Prepare agenda items 48 hours before meetings',
    'Ensure all decisions are properly documented',
    'Mark confidential items appropriately',
    'Include risk assessments in major decisions',
    'Follow established voting procedures',
    'Maintain accurate meeting minutes'
  ];

  const donts = [
    'Share confidential information outside the board',
    'Make decisions without proper quorum',
    'Skip documentation requirements',
    'Ignore conflict of interest policies',
    'Rush through complex decisions',
    'Bypass approval processes'
  ];

  const rules = [
    {
      title: 'Quorum Requirements',
      description: 'Minimum 60% of board members must be present for official decisions'
    },
    {
      title: 'Decision Documentation',
      description: 'All decisions must be recorded with rationale and voting details'
    },
    {
      title: 'Confidentiality Levels',
      description: 'Use Public, Internal, Confidential, or Restricted classifications'
    },
    {
      title: 'Meeting Frequency',
      description: 'Strategic boards meet quarterly, operational boards meet monthly'
    }
  ];

  const templates = [
    'Meeting Agenda Template',
    'Decision Record Template',
    'Risk Assessment Template',
    'Meeting Minutes Template',
    'Proposal Template',
    'Action Items Template'
  ];

  return (
    <div className="space-y-6">
      <Card className="p-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Board Guidelines</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h3 className="text-lg font-semibold text-green-700 mb-4 flex items-center">
              <CheckCircle className="h-5 w-5 mr-2" />
              Do's
            </h3>
            <ul className="space-y-3">
              {dos.map((item, index) => (
                <li key={index} className="flex items-start">
                  <CheckCircle className="h-4 w-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-700">{item}</span>
                </li>
              ))}
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold text-red-700 mb-4 flex items-center">
              <XCircle className="h-5 w-5 mr-2" />
              Don'ts
            </h3>
            <ul className="space-y-3">
              {donts.map((item, index) => (
                <li key={index} className="flex items-start">
                  <XCircle className="h-4 w-4 text-red-500 mr-2 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-700">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Card>

      <Card className="p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
          <AlertTriangle className="h-5 w-5 mr-2 text-amber-500" />
          Governance Rules
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {rules.map((rule, index) => (
            <div key={index} className="border border-gray-200 rounded-lg p-4">
              <h4 className="font-medium text-gray-900 mb-2">{rule.title}</h4>
              <p className="text-sm text-gray-600">{rule.description}</p>
            </div>
          ))}
        </div>
      </Card>

      <Card className="p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
          <FileText className="h-5 w-5 mr-2 text-blue-500" />
          Document Templates
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {templates.map((template, index) => (
            <div key={index} className="flex items-center justify-between p-3 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer">
              <span className="text-sm font-medium text-gray-700">{template}</span>
              <Badge variant="outline" className="text-xs">Download</Badge>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
};

export default BoardGuidelines;
