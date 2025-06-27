
import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ArrowLeft, Users, Calendar, Shield } from 'lucide-react';
import { Board } from '../types/boardTypes';
import BoardDecisionTracker from './BoardDecisionTracker';
import AgendaManager from './AgendaManager';
import EmailGenerator from './EmailGenerator';
import SlideGenerator from './SlideGenerator';

interface BoardDetailViewProps {
  board: Board;
  onBack: () => void;
}

const BoardDetailView: React.FC<BoardDetailViewProps> = ({ board, onBack }) => {
  const [showEmailGenerator, setShowEmailGenerator] = useState(false);
  const [showSlideGenerator, setShowSlideGenerator] = useState(false);

  const handleCreateDecision = () => {
    console.log('Creating new decision for board:', board.id);
  };

  const handleEscalateDecision = (decisionId: string) => {
    console.log('Escalating decision:', decisionId);
  };

  const handleToggleConfidentiality = (decisionId: string) => {
    console.log('Toggling confidentiality for decision:', decisionId);
  };

  const handleGenerateEmail = () => {
    setShowEmailGenerator(true);
  };

  const handleGenerateSlides = () => {
    setShowSlideGenerator(true);
  };

  const nextMeeting = board.meetings.find(m => m.status === 'scheduled');

  if (showEmailGenerator && nextMeeting) {
    return (
      <EmailGenerator
        board={board}
        meeting={nextMeeting}
        onClose={() => setShowEmailGenerator(false)}
      />
    );
  }

  if (showSlideGenerator && nextMeeting) {
    return (
      <SlideGenerator
        board={board}
        meeting={nextMeeting}
        onClose={() => setShowSlideGenerator(false)}
      />
    );
  }

  return (
    <div className="space-y-6">
      <Card className="p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-4">
            <Button variant="outline" onClick={onBack}>
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Boards
            </Button>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">{board.name}</h1>
              <p className="text-gray-600">{board.description}</p>
            </div>
          </div>
          <div className="flex items-center space-x-4 text-sm text-gray-600">
            <div className="flex items-center">
              <Users className="h-4 w-4 mr-1" />
              {board.members.length} members
            </div>
            <div className="flex items-center">
              <Shield className="h-4 w-4 mr-1" />
              {board.decisions.filter(d => d.isConfidential).length} confidential
            </div>
            {board.nextMeeting && (
              <div className="flex items-center">
                <Calendar className="h-4 w-4 mr-1" />
                Next: {new Date(board.nextMeeting).toLocaleDateString()}
              </div>
            )}
          </div>
        </div>

        <div className="grid grid-cols-3 gap-4 text-sm">
          <div>
            <span className="text-gray-600">Chair:</span>
            <p className="font-medium">{board.chair}</p>
          </div>
          <div>
            <span className="text-gray-600">Type:</span>
            <p className="font-medium capitalize">{board.type}</p>
          </div>
          <div>
            <span className="text-gray-600">Total Decisions:</span>
            <p className="font-medium">{board.decisions.length}</p>
          </div>
        </div>
      </Card>

      <Tabs defaultValue="decisions" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="decisions">Decision Tracking</TabsTrigger>
          <TabsTrigger value="agenda">Agenda Management</TabsTrigger>
        </TabsList>

        <TabsContent value="decisions">
          <BoardDecisionTracker
            boardId={board.id}
            boardName={board.name}
            decisions={board.decisions}
            onCreateDecision={handleCreateDecision}
            onEscalateDecision={handleEscalateDecision}
            onToggleConfidentiality={handleToggleConfidentiality}
          />
        </TabsContent>

        <TabsContent value="agenda">
          <AgendaManager
            boardId={board.id}
            boardName={board.name}
            nextMeeting={nextMeeting}
            onGenerateEmail={handleGenerateEmail}
            onGenerateSlides={handleGenerateSlides}
            onAddAgendaItem={() => console.log('Adding agenda item')}
            onReorderItem={(itemId, direction) => console.log('Reordering item:', itemId, direction)}
          />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default BoardDetailView;
