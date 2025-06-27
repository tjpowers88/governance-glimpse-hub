
import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Calendar, Clock, MapPin, Users, Shield, Video, Copy, ExternalLink } from 'lucide-react';
import { Meeting } from '../types/boardTypes';

interface MeetingDetailModalProps {
  meeting: Meeting & { 
    boardName: string; 
    boardType: string;
    isConfidential?: boolean;
    teamsLink?: string;
    dialInNumber?: string;
    conferenceId?: string;
  } | null;
  isOpen: boolean;
  onClose: () => void;
  userAccess: 'member' | 'invited' | 'public'; // determines what user can see
}

const MeetingDetailModal: React.FC<MeetingDetailModalProps> = ({ 
  meeting, 
  isOpen, 
  onClose, 
  userAccess 
}) => {
  if (!meeting) return null;

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      weekday: 'long'
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'scheduled': return 'bg-blue-100 text-blue-800';
      case 'in-progress': return 'bg-green-100 text-green-800';
      case 'completed': return 'bg-gray-100 text-gray-800';
      case 'cancelled': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  const hasAccess = userAccess === 'member' || userAccess === 'invited';
  const isConfidentialMeeting = meeting.isConfidential && !hasAccess;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold text-gray-900 pr-8 flex items-center gap-2">
            {meeting.boardName} Meeting
            {meeting.isConfidential && (
              <Shield className="h-5 w-5 text-orange-500" />
            )}
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <Badge className={getStatusColor(meeting.status)}>
              {meeting.status.replace('-', ' ')}
            </Badge>
            <div className="text-sm text-gray-500">
              Meeting ID: {meeting.id}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex items-center space-x-2 text-sm text-gray-600">
              <Calendar className="h-4 w-4" />
              <span>{formatDate(meeting.date)}</span>
            </div>
            <div className="flex items-center space-x-2 text-sm text-gray-600">
              <Clock className="h-4 w-4" />
              <span>{meeting.startTime} - {meeting.endTime}</span>
            </div>
          </div>

          {isConfidentialMeeting ? (
            <div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
              <div className="flex items-start space-x-3">
                <Shield className="h-5 w-5 text-orange-500 mt-0.5" />
                <div>
                  <p className="font-medium text-orange-900">Confidential Meeting</p>
                  <p className="text-sm text-orange-700 mt-1">
                    This meeting contains confidential information. Only board members and invited participants can view the details.
                  </p>
                </div>
              </div>
            </div>
          ) : (
            <>
              <div className="flex items-center space-x-2 text-sm text-gray-600">
                <MapPin className="h-4 w-4" />
                <span>{meeting.location}</span>
              </div>

              {/* Microsoft Teams Integration */}
              {meeting.teamsLink && (
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <div className="flex items-start space-x-3">
                    <Video className="h-5 w-5 text-blue-500 mt-0.5" />
                    <div className="flex-1">
                      <p className="font-medium text-blue-900 mb-2">Join via Microsoft Teams</p>
                      <div className="space-y-2">
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => window.open(meeting.teamsLink, '_blank')}
                          className="text-blue-600 border-blue-300 hover:bg-blue-50"
                        >
                          <ExternalLink className="h-4 w-4 mr-2" />
                          Join Meeting
                        </Button>
                        <div className="text-xs text-blue-700">
                          <p>Dial-in number: {meeting.dialInNumber || '+1 (555) 123-4567'}</p>
                          <div className="flex items-center gap-2 mt-1">
                            <span>Conference ID: {meeting.conferenceId || '123456789'}</span>
                            <Button 
                              variant="ghost" 
                              size="sm"
                              onClick={() => copyToClipboard(meeting.conferenceId || '123456789')}
                              className="h-auto p-1"
                            >
                              <Copy className="h-3 w-3" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Meeting Details</h3>
                <div className="space-y-3">
                  <div className="flex items-start space-x-3">
                    <Users className="h-5 w-5 text-gray-400 mt-0.5" />
                    <div>
                      <p className="font-medium text-gray-900">Chairperson</p>
                      <p className="text-sm text-gray-600">{meeting.chairperson}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-3">
                    <Users className="h-5 w-5 text-gray-400 mt-0.5" />
                    <div>
                      <p className="font-medium text-gray-900">Attendees ({meeting.attendees.length})</p>
                      <div className="text-sm text-gray-600 mt-1">
                        {meeting.attendees.slice(0, 3).map((attendee, index) => (
                          <span key={index}>
                            {attendee}
                            {index < Math.min(2, meeting.attendees.length - 1) && ', '}
                          </span>
                        ))}
                        {meeting.attendees.length > 3 && (
                          <span className="text-gray-500"> and {meeting.attendees.length - 3} more</span>
                        )}
                      </div>
                    </div>
                  </div>

                  {meeting.agenda.length > 0 && (
                    <div className="flex items-start space-x-3">
                      <Calendar className="h-5 w-5 text-gray-400 mt-0.5" />
                      <div>
                        <p className="font-medium text-gray-900">Agenda Items</p>
                        <p className="text-sm text-gray-600">{meeting.agenda.length} items scheduled</p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </>
          )}

          <div className="flex justify-end space-x-3 pt-4 border-t">
            <Button variant="outline" onClick={onClose}>
              Close
            </Button>
            {hasAccess && meeting.status === 'scheduled' && (
              <Button>
                Add to Calendar
              </Button>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default MeetingDetailModal;
