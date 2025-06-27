
import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { Lock, Unlock, Eye, EyeOff, Shield, AlertTriangle } from 'lucide-react';

const ConfidentialityManager = () => {
  const [items, setItems] = useState([
    {
      id: 1,
      title: 'Cloud Migration Budget Analysis',
      type: 'document',
      board: 'IT Strategy Board',
      isConfidential: true,
      accessLevel: 'Restricted',
      lastModified: '2024-01-15'
    },
    {
      id: 2,
      title: 'Security Incident Q4 Report',
      type: 'decision',
      board: 'Security Governance Board',
      isConfidential: true,
      accessLevel: 'Confidential',
      lastModified: '2024-01-12'
    },
    {
      id: 3,
      title: 'Data Classification Standards',
      type: 'document',
      board: 'Data Governance Board',
      isConfidential: false,
      accessLevel: 'Internal',
      lastModified: '2024-01-10'
    },
    {
      id: 4,
      title: 'Vendor Assessment Results',
      type: 'decision',
      board: 'IT Investment Board',
      isConfidential: true,
      accessLevel: 'Confidential',
      lastModified: '2024-01-08'
    }
  ]);

  const toggleConfidentiality = (id: number) => {
    setItems(items.map(item => 
      item.id === id 
        ? { 
            ...item, 
            isConfidential: !item.isConfidential,
            accessLevel: !item.isConfidential ? 'Confidential' : 'Internal'
          }
        : item
    ));
  };

  const getAccessLevelColor = (level: string) => {
    switch (level) {
      case 'Public': return 'bg-green-100 text-green-800';
      case 'Internal': return 'bg-blue-100 text-blue-800';
      case 'Confidential': return 'bg-yellow-100 text-yellow-800';
      case 'Restricted': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getTypeIcon = (type: string) => {
    return type === 'document' ? 'FileText' : 'Shield';
  };

  return (
    <Card className="p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-900">Confidentiality Management</h2>
        <div className="flex items-center space-x-2">
          <Shield className="h-5 w-5 text-blue-500" />
          <span className="text-sm text-gray-600">
            {items.filter(item => item.isConfidential).length} confidential items
          </span>
        </div>
      </div>

      <div className="mb-6 p-4 bg-amber-50 border border-amber-200 rounded-lg">
        <div className="flex items-start">
          <AlertTriangle className="h-5 w-5 text-amber-600 mr-2 mt-0.5" />
          <div>
            <h3 className="text-sm font-medium text-amber-800">Security Notice</h3>
            <p className="text-sm text-amber-700 mt-1">
              Confidential items are hidden from public dashboard views and require appropriate access permissions.
            </p>
          </div>
        </div>
      </div>
      
      <div className="space-y-4">
        {items.map((item) => (
          <div key={item.id} className="border border-gray-200 rounded-lg p-4">
            <div className="flex items-start justify-between mb-3">
              <div className="flex-1">
                <div className="flex items-center mb-2">
                  <h3 className="text-lg font-semibold text-gray-900 mr-3">{item.title}</h3>
                  <Badge className={getAccessLevelColor(item.accessLevel)}>
                    {item.accessLevel}
                  </Badge>
                </div>
                <div className="flex items-center space-x-4 text-sm text-gray-600">
                  <span>{item.board}</span>
                  <span>•</span>
                  <span>{item.type}</span>
                  <span>•</span>
                  <span>Modified {new Date(item.lastModified).toLocaleDateString()}</span>
                </div>
              </div>
              
              <div className="flex items-center space-x-3">
                <div className="flex items-center space-x-2">
                  {item.isConfidential ? (
                    <Lock className="h-4 w-4 text-red-500" />
                  ) : (
                    <Unlock className="h-4 w-4 text-green-500" />
                  )}
                  <span className="text-sm font-medium">
                    {item.isConfidential ? 'Confidential' : 'Public'}
                  </span>
                  <Switch
                    checked={item.isConfidential}
                    onCheckedChange={() => toggleConfidentiality(item.id)}
                  />
                </div>
              </div>
            </div>
            
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2 text-sm text-gray-500">
                {item.isConfidential ? (
                  <>
                    <EyeOff className="h-4 w-4" />
                    <span>Hidden from public views</span>
                  </>
                ) : (
                  <>
                    <Eye className="h-4 w-4" />
                    <span>Visible in public dashboard</span>
                  </>
                )}
              </div>
              
              <Button variant="outline" size="sm">
                Manage Access
              </Button>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
};

export default ConfidentialityManager;
