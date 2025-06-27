
import React from 'react';
import { Card } from '@/components/ui/card';
import { Calendar, Clock, MapPin } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

const MeetingCalendar = () => {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toISOString().split('T')[0];
  };

  const meetings = [
    {
      id: 1,
      title: 'IT Strategy Board',
      date: '2025-01-25',
      time: '10:00 AM',
      location: 'Conference Room A',
      type: 'quarterly',
      attendees: 8
    },
    {
      id: 2,
      title: 'Security Governance Board',
      date: '2025-01-30',
      time: '2:00 PM',
      location: 'Virtual Meeting',
      type: 'monthly',
      attendees: 12
    },
    {
      id: 3,
      title: 'Data Governance Board',
      date: '2025-02-05',
      time: '9:00 AM',
      location: 'Conference Room B',
      type: 'monthly',
      attendees: 6
    },
    {
      id: 4,
      title: 'IT Investment Board',
      date: '2025-02-12',
      time: '11:00 AM',
      location: 'Executive Boardroom',
      type: 'quarterly',
      attendees: 10
    }
  ];

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'quarterly': return 'bg-blue-100 text-blue-800';
      case 'monthly': return 'bg-green-100 text-green-800';
      case 'weekly': return 'bg-purple-100 text-purple-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <Card className="p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold text-gray-900">Upcoming Meetings</h2>
        <Calendar className="h-5 w-5 text-gray-500" />
      </div>
      
      <div className="space-y-4">
        {meetings.map((meeting) => (
          <div key={meeting.id} className="border-l-4 border-blue-500 pl-4 py-2">
            <div className="flex items-start justify-between mb-1">
              <h3 className="font-semibold text-gray-900">{meeting.title}</h3>
              <Badge className={getTypeColor(meeting.type)}>
                {meeting.type}
              </Badge>
            </div>
            
            <div className="space-y-1 text-sm text-gray-600">
              <div className="flex items-center">
                <Calendar className="h-3 w-3 mr-1" />
                {formatDate(meeting.date)}
              </div>
              <div className="flex items-center">
                <Clock className="h-3 w-3 mr-1" />
                {meeting.time}
              </div>
              <div className="flex items-center">
                <MapPin className="h-3 w-3 mr-1" />
                {meeting.location}
              </div>
            </div>
            
            <div className="mt-2 text-xs text-gray-500">
              {meeting.attendees} attendees
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
};

export default MeetingCalendar;
