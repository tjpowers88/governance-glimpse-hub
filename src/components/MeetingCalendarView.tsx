
import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Calendar } from '@/components/ui/calendar';
import { Clock, MapPin, Users, Filter, ChevronLeft, ChevronRight } from 'lucide-react';
import { Meeting, Board } from '../types/boardTypes';

interface MeetingCalendarViewProps {
  boards?: Board[];
}

const MeetingCalendarView: React.FC<MeetingCalendarViewProps> = ({ boards = [] }) => {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selectedFilter, setSelectedFilter] = useState<'all' | 'strategic' | 'tactical'>('all');
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);

  // Sample data for all boards with meetings - updated to current year
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
          date: '2025-01-25',
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
          date: '2025-01-30',
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
          date: '2025-02-05',
          startTime: '10:00',
          endTime: '12:00',
          location: 'Architecture Room',
          status: 'scheduled',
          agenda: [],
          attendees: ['Michael Chen', 'Architects'],
          chairperson: 'Michael Chen',
          secretary: 'Arch Admin'
        },
        {
          id: '4',
          boardId: '3',
          date: '2025-02-12',
          startTime: '15:00',
          endTime: '17:00',
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

  const getMeetingDates = () => {
    const filteredMeetings = getFilteredMeetings();
    return filteredMeetings.map(meeting => new Date(meeting.date));
  };

  const getMeetingsForDate = (date: Date) => {
    const dateStr = date.toISOString().split('T')[0];
    const filteredMeetings = getFilteredMeetings();
    return filteredMeetings.filter(meeting => meeting.date === dateStr);
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

  const upcomingMeetings = getUpcomingMeetings();
  const meetingDates = getMeetingDates();
  const selectedDateMeetings = selectedDate ? getMeetingsForDate(selectedDate) : [];

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

      <Tabs defaultValue="calendar" className="w-full">
        <TabsList className="grid w-full grid-cols-2 mb-6">
          <TabsTrigger value="calendar">Calendar View</TabsTrigger>
          <TabsTrigger value="upcoming">Upcoming Meetings</TabsTrigger>
        </TabsList>

        <TabsContent value="calendar">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
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

                <Calendar
                  mode="single"
                  selected={selectedDate}
                  onSelect={setSelectedDate}
                  month={currentMonth}
                  onMonthChange={setCurrentMonth}
                  modifiers={{
                    meeting: meetingDates
                  }}
                  modifiersStyles={{
                    meeting: {
                      backgroundColor: '#3b82f6',
                      color: 'white',
                      fontWeight: 'bold'
                    }
                  }}
                  className="rounded-md border"
                />

                <div className="mt-4 text-sm text-gray-600">
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center">
                      <div className="w-3 h-3 bg-blue-500 rounded mr-2"></div>
                      <span>Meeting scheduled</span>
                    </div>
                  </div>
                </div>
              </Card>
            </div>

            <div className="lg:col-span-1">
              <Card className="p-6">
                <h4 className="text-lg font-semibold text-gray-900 mb-4">
                  {selectedDate ? `Meetings on ${selectedDate.toLocaleDateString()}` : 'Select a date'}
                </h4>
                
                {selectedDate && selectedDateMeetings.length === 0 && (
                  <p className="text-gray-500 text-sm">No meetings scheduled for this date.</p>
                )}

                {selectedDateMeetings.length > 0 && (
                  <div className="space-y-3">
                    {selectedDateMeetings.map((meeting) => (
                      <div key={meeting.id} className="border border-gray-200 rounded-lg p-3">
                        <div className="flex items-start justify-between mb-2">
                          <h5 className="font-medium text-gray-900">{meeting.boardName}</h5>
                          <Badge className={getTypeColor(meeting.boardType)}>
                            {meeting.boardType}
                          </Badge>
                        </div>
                        
                        <div className="space-y-1 text-sm text-gray-600">
                          <div className="flex items-center">
                            <Clock className="h-3 w-3 mr-2" />
                            {meeting.startTime} - {meeting.endTime}
                          </div>
                          <div className="flex items-center">
                            <MapPin className="h-3 w-3 mr-2" />
                            {meeting.location}
                          </div>
                          <div className="flex items-center">
                            <Users className="h-3 w-3 mr-2" />
                            {meeting.attendees.length} attendees
                          </div>
                        </div>

                        <Badge className={`${getStatusColor(meeting.status)} mt-2`} variant="outline">
                          {meeting.status.replace('-', ' ')}
                        </Badge>
                      </div>
                    ))}
                  </div>
                )}

                {!selectedDate && (
                  <div className="text-center py-8 text-gray-400">
                    <div className="text-4xl mb-2">📅</div>
                    <p className="text-sm">Click on a date to view meetings</p>
                  </div>
                )}
              </Card>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="upcoming">
          <Card className="p-6">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">Next 5 Upcoming Meetings</h3>
            
            {upcomingMeetings.length === 0 ? (
              <div className="text-center py-8 text-gray-500">
                <div className="text-4xl mb-4">📅</div>
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
                        <div className="h-4 w-4 mr-2">📅</div>
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
