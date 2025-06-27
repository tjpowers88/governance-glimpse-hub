
import React from 'react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Calendar, Clock, MapPin, Users } from 'lucide-react';
import { Meeting } from '../types/boardTypes';

interface BoardMeetingCalendarProps {
  boardName: string;
  meetings: Meeting[];
}

const BoardMeetingCalendar: React.FC<BoardMeetingCalendarProps> = ({
  boardName,
  meetings
}) => {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toISOString().split('T')[0];
  };

  const upcomingMeetings = meetings
    .filter(m => m.status === 'scheduled' || m.status === 'in-progress')
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'scheduled': return 'bg-blue-100 text-blue-800';
      case 'in-progress': return 'bg-green-100 text-green-800';
      case 'completed': return 'bg-gray-100 text-gray-800';
      case 'cancelled': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <Card className="p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-semibold text-gray-900">Upcoming Meetings</h3>
        <Calendar className="h-5 w-5 text-gray-500" />
      </div>
      
      {upcomingMeetings.length === 0 ? (
        <div className="text-center py-8 text-gray-500">
          <Calendar className="h-12 w-12 mx-auto mb-4 text-gray-300" />
          <p>No upcoming meetings scheduled</p>
        </div>
      ) : (
        <div className="space-y-4">
          {upcomingMeetings.map((meeting) => (
            <div key={meeting.id} className="border-l-4 border-blue-500 pl-4 py-3 bg-gray-50 rounded-r-lg">
              <div className="flex items-start justify-between mb-2">
                <h4 className="font-semibold text-gray-900">{boardName} Meeting</h4>
                <Badge className={getStatusColor(meeting.status)}>
                  {meeting.status.replace('-', ' ')}
                </Badge>
              </div>
              
              <div className="space-y-2 text-sm text-gray-600">
                <div className="flex items-center">
                  <Calendar className="h-4 w-4 mr-2" />
                  {formatDate(meeting.date)}
                </div>
                <div className="flex items-center">
                  <Clock className="h-4 w-4 mr-2" />
                  {meeting.startTime} - {meeting.endTime}
                </div>
                <div className="flex items-center">
                  <MapPin className="h-4 w-4 mr-2" />
                  {meeting.location}
                </div>
                <div className="flex items-center">
                  <Users className="h-4 w-4 mr-2" />
                  {meeting.attendees.length} attendees
                </div>
              </div>
              
              <div className="mt-3 text-sm">
                <p><span className="font-medium">Chair:</span> {meeting.chairperson}</p>
                <p><span className="font-medium">Agenda items:</span> {meeting.agenda.length}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </Card>
  );
};

export default BoardMeetingCalendar;
