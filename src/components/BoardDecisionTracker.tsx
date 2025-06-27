
import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Lock, Unlock, Eye, Plus, ArrowUp, Calendar } from 'lucide-react';
import { Decision } from '../types/boardTypes';

interface BoardDecisionTrackerProps {
  boardId: string;
  boardName: string;
  decisions: Decision[];
  onCreateDecision: () => void;
  onEscalateDecision: (decisionId: string) => void;
  onToggleConfidentiality: (decisionId: string) => void;
}

const BoardDecisionTracker: React.FC<BoardDecisionTrackerProps> = ({
  boardId,
  boardName,
  decisions,
  onCreateDecision,
  onEscalateDecision,
  onToggleConfidentiality
}) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'approved': return 'bg-green-100 text-green-800';
      case 'rejected': return 'bg-red-100 text-red-800';
      case 'under-review': return 'bg-yellow-100 text-yellow-800';
      case 'pending': return 'bg-blue-100 text-blue-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <Card className="p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-semibold text-gray-900">Decision Tracker - {boardName}</h3>
        <div className="flex space-x-2">
          <Button onClick={onCreateDecision} size="sm">
            <Plus className="h-4 w-4 mr-2" />
            New Decision
          </Button>
        </div>
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Decision</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Confidentiality</TableHead>
            <TableHead>Date</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {decisions.map((decision) => (
            <TableRow key={decision.id}>
              <TableCell>
                <div>
                  <div className="font-medium">{decision.title}</div>
                  <div className="text-sm text-gray-500">{decision.description}</div>
                  {decision.escalatedFrom && (
                    <Badge variant="outline" className="mt-1 text-xs">
                      <ArrowUp className="h-3 w-3 mr-1" />
                      Escalated
                    </Badge>
                  )}
                </div>
              </TableCell>
              <TableCell>
                <Badge className={getStatusColor(decision.status)}>
                  {decision.status.replace('-', ' ')}
                </Badge>
              </TableCell>
              <TableCell>
                <div className="flex items-center space-x-2">
                  {decision.isConfidential ? (
                    <Lock className="h-4 w-4 text-red-500" />
                  ) : (
                    <Unlock className="h-4 w-4 text-green-500" />
                  )}
                  <Switch
                    checked={decision.isConfidential}
                    onCheckedChange={() => onToggleConfidentiality(decision.id)}
                  />
                </div>
              </TableCell>
              <TableCell>
                {new Date(decision.createdDate).toLocaleDateString()}
              </TableCell>
              <TableCell>
                <div className="flex space-x-2">
                  <Button variant="outline" size="sm">
                    <Eye className="h-4 w-4" />
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => onEscalateDecision(decision.id)}
                  >
                    <ArrowUp className="h-4 w-4" />
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Card>
  );
};

export default BoardDecisionTracker;
