
import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Calendar, Users, FileText, X } from 'lucide-react';

interface DecisionDetailModalProps {
  decision: {
    id: number;
    title: string;
    board: string;
    date: string;
    status: string;
    confidential: boolean;
    summary: string;
  } | null;
  isOpen: boolean;
  onClose: () => void;
}

const DecisionDetailModal: React.FC<DecisionDetailModalProps> = ({ decision, isOpen, onClose }) => {
  if (!decision) return null;

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'approved': return 'bg-green-100 text-green-800';
      case 'under-review': return 'bg-yellow-100 text-yellow-800';
      case 'rejected': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold text-gray-900 pr-8">
            {decision.title}
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <Badge className={getStatusColor(decision.status)}>
              {decision.status.replace('-', ' ')}
            </Badge>
            <div className="text-sm text-gray-500">
              Decision #{decision.id}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex items-center space-x-2 text-sm text-gray-600">
              <Users className="h-4 w-4" />
              <span>{decision.board}</span>
            </div>
            <div className="flex items-center space-x-2 text-sm text-gray-600">
              <Calendar className="h-4 w-4" />
              <span>{formatDate(decision.date)}</span>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-3">Decision Summary</h3>
            <div className="bg-gray-50 rounded-lg p-4">
              <p className="text-gray-700 leading-relaxed">{decision.summary}</p>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-3">Additional Details</h3>
            <div className="space-y-3">
              <div className="flex items-start space-x-3">
                <FileText className="h-5 w-5 text-gray-400 mt-0.5" />
                <div>
                  <p className="font-medium text-gray-900">Impact Assessment</p>
                  <p className="text-sm text-gray-600">
                    This decision will affect system architecture, timeline, and resource allocation.
                  </p>
                </div>
              </div>
              
              <div className="flex items-start space-x-3">
                <Users className="h-5 w-5 text-gray-400 mt-0.5" />
                <div>
                  <p className="font-medium text-gray-900">Stakeholders</p>
                  <p className="text-sm text-gray-600">
                    IT Teams, Security Team, Project Managers, Executive Leadership
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="flex justify-end space-x-3 pt-4 border-t">
            <Button variant="outline" onClick={onClose}>
              Close
            </Button>
            <Button>
              Download Full Report
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default DecisionDetailModal;
