
import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { FileText, Download, Eye } from 'lucide-react';
import { Meeting, Board, SlideTemplate } from '../types/boardTypes';

interface SlideGeneratorProps {
  board: Board;
  meeting: Meeting;
  onClose: () => void;
}

const SlideGenerator: React.FC<SlideGeneratorProps> = ({ board, meeting, onClose }) => {
  const [selectedTemplate, setSelectedTemplate] = useState<string>('standard');
  const [slidesGenerated, setSlidesGenerated] = useState(false);

  const standardTemplate: SlideTemplate = {
    id: 'standard',
    name: 'Standard Board Template',
    slides: [
      {
        title: 'Title Slide',
        content: `${board.name}\nMeeting Date: ${new Date(meeting.date).toLocaleDateString()}\nChairperson: ${meeting.chairperson}`,
        type: 'title'
      },
      {
        title: 'Agenda Overview',
        content: meeting.agenda
          .sort((a, b) => a.order - b.order)
          .map((item, index) => `${index + 1}. ${item.title} (${item.duration} min)`)
          .join('\n'),
        type: 'agenda'
      },
      ...meeting.agenda
        .filter(item => item.type === 'decision')
        .map(item => ({
          title: `Decision: ${item.title}`,
          content: `Presenter: ${item.presenter}\nDescription: ${item.description}\n${item.escalatedFrom ? `Escalated from: ${item.escalatedFrom}` : ''}`,
          type: 'decision' as const
        })),
      {
        title: 'Next Steps & Actions',
        content: 'Action items and follow-ups will be documented here during the meeting.',
        type: 'conclusion'
      }
    ]
  };

  const generateSlides = () => {
    setSlidesGenerated(true);
    console.log('Generating slides with template:', selectedTemplate);
    // In a real implementation, this would generate actual PowerPoint/PDF slides
  };

  const previewSlide = (slideIndex: number) => {
    console.log('Previewing slide:', slideIndex);
  };

  return (
    <Card className="p-6 max-w-6xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-semibold text-gray-900">Meeting Slides Generator</h3>
        <Button variant="outline" onClick={onClose}>
          Close
        </Button>
      </div>

      <div className="mb-6">
        <Badge variant="outline" className="mb-4">
          <FileText className="h-3 w-3 mr-1" />
          Auto-generated for {board.name}
        </Badge>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <h4 className="font-medium mb-2">Template Selection</h4>
            <div className="space-y-2">
              <label className="flex items-center">
                <input
                  type="radio"
                  name="template"
                  value="standard"
                  checked={selectedTemplate === 'standard'}
                  onChange={(e) => setSelectedTemplate(e.target.value)}
                  className="mr-2"
                />
                Standard Board Template
              </label>
            </div>
          </div>
          
          <div>
            <h4 className="font-medium mb-2">Meeting Information</h4>
            <div className="text-sm text-gray-600 space-y-1">
              <p>Date: {new Date(meeting.date).toLocaleDateString()}</p>
              <p>Agenda Items: {meeting.agenda.length}</p>
              <p>Total Duration: {meeting.agenda.reduce((sum, item) => sum + item.duration, 0)} minutes</p>
            </div>
          </div>
        </div>
      </div>

      <div className="mb-6">
        <h4 className="font-medium mb-3">Slide Preview</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {standardTemplate.slides.map((slide, index) => (
            <div key={index} className="border rounded-lg p-4 bg-white shadow-sm">
              <div className="flex items-center justify-between mb-2">
                <h5 className="font-medium text-sm">{slide.title}</h5>
                <Badge variant="outline" className="text-xs">
                  {slide.type}
                </Badge>
              </div>
              <div className="text-xs text-gray-600 whitespace-pre-wrap">
                {slide.content.substring(0, 100)}
                {slide.content.length > 100 ? '...' : ''}
              </div>
              <Button
                variant="outline"
                size="sm"
                className="mt-2 w-full"
                onClick={() => previewSlide(index)}
              >
                <Eye className="h-3 w-3 mr-1" />
                Preview
              </Button>
            </div>
          ))}
        </div>
      </div>

      <div className="flex space-x-2">
        <Button onClick={generateSlides}>
          <FileText className="h-4 w-4 mr-2" />
          Generate Slides
        </Button>
        {slidesGenerated && (
          <Button variant="outline">
            <Download className="h-4 w-4 mr-2" />
            Download PowerPoint
          </Button>
        )}
      </div>

      {slidesGenerated && (
        <div className="mt-4 p-3 bg-green-50 border border-green-200 rounded-lg">
          <p className="text-sm text-green-700">
            Slides generated successfully! You can now download the PowerPoint presentation.
          </p>
        </div>
      )}
    </Card>
  );
};

export default SlideGenerator;
