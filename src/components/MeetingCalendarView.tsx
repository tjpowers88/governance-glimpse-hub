
import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Calendar, Clock, MapPin, Users, Filter, ChevronLeft, ChevronRight } from 'lucide-react';
import { Meeting, Board } from '../types/boardTypes';

interface MeetingCalendarViewProps {
  boards?: Board[];
}

const MeetingCalendarView: React.FC<MeetingCalendarViewProps> = ({ boards = [] }) => {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selectedFilter, setSelectedFilter] = useState<'all' | 'strategic' | 'tactical'>('all');

  // Sample data for all boards with meetings
  const allBoards: Board[] = boards.length > 0 ? boards : [
    {
      id: '1',
      name: 'IT Steering Committee',
      type: 'strategic',
      chair: 'Sarah Johnson',
      members: ['Sarah Johnson', 'Michael Chen'],
      description: 'Strategic IT oversight',
      decisions: [],
      documents: [],
      meetings: [
        {
          id: '1',
          boardId: '1',
          date: '2024-01-25',
          startTime: '09:00',
          endTime: '11:00',
          location: 'Conference Room A',
          status: 'scheduled',
          agenda: [],
          attendees: ['Sarah Johnson', 'Michael Chen'],
          chairperson: 'Sarah Johnson',
          secretary: 'Assistant'
        }
      ]
    },
    {
      id: '2',
      name: 'Security Board',
      type: 'tactical',
      chair: 'Catherine Miller',
      members: ['Catherine Miller', 'Security Team'],
      description: 'Security oversight',
      decisions: [],
      documents: [],
      meetings: [
        {
          id: '2',
          boardId: '2',
          date: '2024-01-30',
          startTime: '14:00',
          endTime: '16:00',
          location: 'Virtual Meeting',
          status: 'scheduled',
          agenda: [],
          attendees: ['Catherine Miller', 'Security Team'],
          chairperson: 'Catherine Miller',
          secretary: 'Security Admin'
        }
      ]
    },
    {
      id: '3',
      name: 'Enterprise Architecture Board',
      type: 'strategic',
      chair: 'Michael Chen',
      members: ['Michael Chen', 'Architects'],
      description: 'Architecture governance',
      decisions: [],
      documents: [],
      meetings: [
        {
          id: '3',
          boardId: '3',
          date: '2024-02-05',
          startTime: '10:00',
          endTime: '12:00',
          location: 'Architecture Room',
          status: 'scheduled',
          agenda: [],
          attendees: ['Michael Chen', 'Architects'],
          chairperson: 'Michael Chen',
          secretary: 'Arch Admin'
        }
      ]
    }
  ];

  const formatDate = (dateString: string) => {
    return new Date(dateString).toISOString().split('T')[0];
  };

  const formatMonthYear = (date: Date) => {
    return date.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
  };

  const getAllMeetings = () => {
    return allBoards.flatMap(board => 
      board.meetings.map(meeting => ({
        ...meeting,
        boardName: board.name,
        boardType: board.type
      }))
    );
  };

  const getFilteredMeetings = () => {
    const allMeetings = getAllMeetings();
    if (selectedFilter === 'all') return allMeetings;
    return allMeetings.filter(meeting => meeting.boardType === selectedFilter);
  };

  const getMeetingsForMonth = () => {
    const filteredMeetings = getFilteredMeetings();
    const currentMonthStr = currentMonth.toISOString().substring(0, 7); // YYYY-MM
    return filteredMeetings.filter(meeting => 
      meeting.date.startsWith(currentMonthStr)
    ).sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
  };

  const getUpcomingMeetings = () => {
    const today = new Date();
    const filteredMeetings = getFilteredMeetings();
    return filteredMeetings.filter(meeting => 
      new Date(meeting.date) >= today
    ).sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
    .slice(0, 5);
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

  const getTypeColor = (type: string) => {
    return type === 'strategic' ? 'bg-purple-100 text-purple-800' : 'bg-green-100 text-green-800';
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

  const monthMeetings = getMeetingsForMonth();
  const upcomingMeetings = getUpcomingMeetings();

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-900">Meeting Calendar</h2>
        <div className="flex items-center space-x-2">
          <Filter className="h-4 w-4 text-gray-500" />
          <select 
            value={selectedFilter}
            onChange={(e) => setSelectedFilter(e.target.value as 'all' | 'strategic' | 'tactical')}
            className="border border-gray-300 rounded px-3 py-1 text-sm"
          >
            <option value="all">All Boards</option>
            <option value="strategic">Strategic</option>
            <option value="tactical">Tactical</option>
          </select>
        </div>
      </div>

      <Tabs defaultValue="monthly" className="w-full">
        <TabsList className="grid w-full grid-cols-2 mb-6">
          <TabsTrigger value="monthly">Monthly View</TabsTrigger>
          <TabsTrigger value="upcoming">Upcoming Meetings</TabsTrigger>
        </TabsList>

        <TabsContent value="monthly">
          <Card className="p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-semibold text-gray-900">
                {formatMonthYear(currentMonth)}
              </h3>
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
                  <div key={meeting.id} className="border-l-4 border-blue-500 pl-4 py-3 bg-gray-50 rounded-r-lg">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <h4 className="font-semibold text-gray-900">{meeting.boardName}</h4>
                        <p className="text-sm text-gray-600">Meeting</p>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Badge className={getTypeColor(meeting.boardType)}>
                          {meeting.boardType}
                        </Badge>
                        <Badge className={getStatusColor(meeting.status)}>
                          {meeting.status.replace('-', ' ')}
                        </Badge>
                      </div>
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
                    
                    <div className="mt-2 text-sm">
                      <p><span className="font-medium">Chair:</span> {meeting.chairperson}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </Card>
        </TabsContent>

        <TabsContent value="upcoming">
          <Card className="p-6">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">Next 5 Upcoming Meetings</h3>
            
            {upcomingMeetings.length === 0 ? (
              <div className="text-center py-8 text-gray-500">
                <Calendar className="h-12 w-12 mx-auto mb-4 text-gray-300" />
                <p>No upcoming meetings scheduled</p>
              </div>
            ) : (
              <div className="space-y-4">
                {upcomingMeetings.map((meeting) => (
                  <div key={meeting.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h4 className="font-semibold text-gray-900">{meeting.boardName}</h4>
                        <p className="text-sm text-gray-600">Board Meeting</p>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Badge className={getTypeColor(meeting.boardType)}>
                          {meeting.boardType}
                        </Badge>
                        <Badge className={getStatusColor(meeting.status)}>
                          {meeting.status.replace('-', ' ')}
                        </Badge>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-gray-600">
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

export default MeetingCalendarView;
