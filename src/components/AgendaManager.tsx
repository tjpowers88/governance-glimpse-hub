
import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Calendar, Mail, FileText, Plus, ArrowUp, ArrowDown } from 'lucide-react';
import { AgendaItem, Meeting } from '../types/boardTypes';

interface AgendaManagerProps {
  boardId: string;
  boardName: string;
  nextMeeting?: Meeting;
  onGenerateEmail: () => void;
  onGenerateSlides: () => void;
  onAddAgendaItem: () => void;
  onReorderItem: (itemId: string, direction: 'up' | 'down') => void;
}

const AgendaManager: React.FC<AgendaManagerProps> = ({
  boardId,
  boardName,
  nextMeeting,
  onGenerateEmail,
  onGenerateSlides,
  onAddAgendaItem,
  onReorderItem
}) => {
  const getTypeColor = (type: string) => {
    switch (type) {
      case 'decision': return 'bg-blue-100 text-blue-800';
      case 'discussion': return 'bg-green-100 text-green-800';
      case 'presentation': return 'bg-purple-100 text-purple-800';
      case 'escalation': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const totalDuration = nextMeeting?.agenda.reduce((sum, item) => sum + item.duration, 0) || 0;

  return (
    <Card className="p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-semibold text-gray-900">Meeting Agenda - {boardName}</h3>
        <div className="flex space-x-2">
          <Button variant="outline" onClick={onGenerateEmail} size="sm">
            <Mail className="h-4 w-4 mr-2" />
            Generate Email
          </Button>
          <Button variant="outline" onClick={onGenerateSlides} size="sm">
            <FileText className="h-4 w-4 mr-2" />
            Generate Slides
          </Button>
          <Button onClick={onAddAgendaItem} size="sm">
            <Plus className="h-4 w-4 mr-2" />
            Add Item
          </Button>
        </div>
      </div>

      {nextMeeting ? (
        <>
          <div className="mb-4 p-4 bg-blue-50 rounded-lg">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-medium text-blue-900">Next Meeting</h4>
                <p className="text-sm text-blue-700">
                  {new Date(nextMeeting.date).toLocaleDateString()} at {nextMeeting.startTime}
                </p>
                <p className="text-sm text-blue-700">{nextMeeting.location}</p>
              </div>
              <div className="text-right">
                <p className="text-sm text-blue-700">Total Duration</p>
                <p className="font-medium text-blue-900">{totalDuration} minutes</p>
              </div>
            </div>
          </div>

          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Order</TableHead>
                <TableHead>Item</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Presenter</TableHead>
                <TableHead>Duration</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {nextMeeting.agenda
                .sort((a, b) => a.order - b.order)
                .map((item, index) => (
                  <TableRow key={item.id}>
                    <TableCell className="font-medium">{index + 1}</TableCell>
                    <TableCell>
                      <div>
                        <div className="font-medium">{item.title}</div>
                        <div className="text-sm text-gray-500">{item.description}</div>
                        {item.escalatedFrom && (
                          <Badge variant="outline" className="mt-1 text-xs">
                            Escalated from {item.escalatedFrom}
                          </Badge>
                        )}
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge className={getTypeColor(item.type)}>
                        {item.type}
                      </Badge>
                    </TableCell>
                    <TableCell>{item.presenter}</TableCell>
                    <TableCell>{item.duration} min</TableCell>
                    <TableCell>
                      <div className="flex space-x-1">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => onReorderItem(item.id, 'up')}
                          disabled={index === 0}
                        >
                          <ArrowUp className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => onReorderItem(item.id, 'down')}
                          disabled={index === nextMeeting.agenda.length - 1}
                        >
                          <ArrowDown className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </>
      ) : (
        <div className="text-center py-8 text-gray-500">
          <Calendar className="h-12 w-12 mx-auto mb-4 text-gray-300" />
          <p>No upcoming meeting scheduled</p>
        </div>
      )}
    </Card>
  );
};

export default AgendaManager;
