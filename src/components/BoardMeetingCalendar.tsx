
import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Calendar, Clock, MapPin, Users, ChevronLeft, ChevronRight, Plus } from 'lucide-react';
import { Meeting } from '../types/boardTypes';

interface BoardMeetingCalendarProps {
  boardName: string;
  meetings: Meeting[];
  isMember?: boolean;
}

const BoardMeetingCalendar: React.FC<BoardMeetingCalendarProps> = ({
  boardName,
  meetings,
  isMember = false
}) => {
  const [currentMonth, setCurrentMonth] = useState(new Date());

  const formatDate = (dateString: string) => {
    return new Date(dateString).toISOString().split('T')[0];
  };

  const formatMonthYear = (date: Date) => {
    return date.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
  };

  const navigateMonth = (direction: 'prev' | 'next') => {
    setCurrentMonth(prev => {
      const newDate = new Date(prev);
      if (direction === 'prev') {
        newDate.setMonth(prev.getMonth() - 1);
      } else {
        newDate.setMonth(prev.getMonth() + 1);
      }
      return newDate;
    });
  };

  const upcomingMeetings = meetings
    .filter(m => m.status === 'scheduled' || m.status === 'in-progress')
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

  const getMeetingsForMonth = () => {
    const currentMonthStr = currentMonth.toISOString().substring(0, 7); // YYYY-MM
    return meetings.filter(meeting => 
      meeting.date.startsWith(currentMonthStr)
    ).sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
  };

  const getAllMeetings = () => {
    return meetings.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
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

  const monthMeetings = getMeetingsForMonth();
  const allMeetings = getAllMeetings();

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-xl font-semibold text-gray-900">{boardName} - Meeting Calendar</h3>
        {isMember && (
          <Button variant="outline" size="sm">
            <Plus className="h-4 w-4 mr-2" />
            Schedule Meeting
          </Button>
        )}
      </div>

      <Tabs defaultValue="upcoming" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
          <TabsTrigger value="monthly">Monthly View</TabsTrigger>
          <TabsTrigger value="all">All Meetings</TabsTrigger>
        </TabsList>

        <TabsContent value="upcoming">
          <Card className="p-6">
            <h4 className="text-lg font-medium text-gray-900 mb-4">Upcoming Meetings</h4>
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
                      <h5 className="font-semibold text-gray-900">{boardName} Meeting</h5>
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
        </TabsContent>

        <TabsContent value="monthly">
          <Card className="p-6">
            <div className="flex items-center justify-between mb-6">
              <h4 className="text-lg font-medium text-gray-900">
                {formatMonthYear(currentMonth)}
              </h4>
              <div className="flex items-center space-x-2">
                <Button variant="outline" size="sm" onClick={() => navigateMonth('prev')}>
                  <ChevronLeft className="h-4 w-4" />
                </Button>
                <Button variant="outline" size="sm" onClick={() => navigateMonth('next')}>
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
            </div>

            {monthMeetings.length === 0 ? (
              <div className="text-center py-8 text-gray-500">
                <Calendar className="h-12 w-12 mx-auto mb-4 text-gray-300" />
                <p>No meetings scheduled for {formatMonthYear(currentMonth)}</p>
              </div>
            ) : (
              <div className="space-y-4">
                {monthMeetings.map((meeting) => (
                  <div key={meeting.id} className="border border-gray-200 rounded-lg p-4">
                    <div className="flex items-start justify-between mb-2">
                      <h5 className="font-semibold text-gray-900">{boardName} Meeting</h5>
                      <Badge className={getStatusColor(meeting.status)}>
                        {meeting.status.replace('-', ' ')}
                      </Badge>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-600">
                      <div className="space-y-1">
                        <div className="flex items-center">
                          <Calendar className="h-4 w-4 mr-2" />
                          {formatDate(meeting.date)}
                        </div>
                        <div className="flex items-center">
                          <Clock className="h-4 w-4 mr-2" />
                          {meeting.startTime} - {meeting.endTime}
                        </div>
                      </div>
                      <div className="space-y-1">
                        <div className="flex items-center">
                          <MapPin className="h-4 w-4 mr-2" />
                          {meeting.location}
                        </div>
                        <div className="flex items-center">
                          <Users className="h-4 w-4 mr-2" />
                          {meeting.attendees.length} attendees
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </Card>
        </TabsContent>

        <TabsContent value="all">
          <Card className="p-6">
            <h4 className="text-lg font-medium text-gray-900 mb-4">All Meetings</h4>
            {allMeetings.length === 0 ? (
              <div className="text-center py-8 text-gray-500">
                <Calendar className="h-12 w-12 mx-auto mb-4 text-gray-300" />
                <p>No meetings found</p>
              </div>
            ) : (
              <div className="space-y-3">
                {allMeetings.map((meeting) => (
                  <div key={meeting.id} className="border border-gray-200 rounded-lg p-3 hover:bg-gray-50">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <div>
                          <p className="font-medium text-gray-900">{formatDate(meeting.date)}</p>
                          <p className="text-sm text-gray-600">{meeting.startTime} - {meeting.endTime}</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-600">{meeting.location}</p>
                          <p className="text-xs text-gray-500">{meeting.attendees.length} attendees</p>
                        </div>
                      </div>
                      <Badge className={getStatusColor(meeting.status)}>
                        {meeting.status.replace('-', ' ')}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default BoardMeetingCalendar;
