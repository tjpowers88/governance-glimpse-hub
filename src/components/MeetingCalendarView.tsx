import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Clock, MapPin, Users, Filter, ChevronLeft, ChevronRight, Shield } from 'lucide-react';
import { Meeting, Board } from '../types/boardTypes';
import MeetingDetailModal from './MeetingDetailModal';

interface MeetingCalendarViewProps {
  boards?: Board[];
  userRole?: 'admin' | 'member' | 'viewer'; // determines user access level
  userBoards?: string[]; // board IDs user is member of
}

const MeetingCalendarView: React.FC<MeetingCalendarViewProps> = ({ 
  boards = [],
  userRole = 'viewer',
  userBoards = []
}) => {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selectedFilter, setSelectedFilter] = useState<'all' | 'strategic' | 'tactical'>('all');
  const [activeView, setActiveView] = useState<'calendar' | 'list'>('calendar');
  const [selectedMeeting, setSelectedMeeting] = useState<any>(null);
  const [isMeetingModalOpen, setIsMeetingModalOpen] = useState(false);

  // Sample data with Teams integration and confidentiality
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
          location: 'Conference Room A / Microsoft Teams',
          status: 'scheduled',
          agenda: [],
          attendees: ['Sarah Johnson', 'Michael Chen', 'David Wilson'],
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
          location: 'Microsoft Teams Meeting',
          status: 'scheduled',
          agenda: [],
          attendees: ['Catherine Miller', 'Security Team', 'IT Admin'],
          chairperson: 'Catherine Miller',
          secretary: 'Security Admin'
        }
      ]
    }
  ];

  const getAllMeetings = () => {
    return allBoards.flatMap(board => 
      board.meetings.map(meeting => ({
        ...meeting,
        boardName: board.name,
        boardType: board.type,
        isConfidential: Math.random() > 0.7, // Random confidentiality for demo
        teamsLink: 'https://teams.microsoft.com/l/meetup-join/19%3a...',
        dialInNumber: '+1 (555) 123-4567',
        conferenceId: Math.floor(Math.random() * 1000000000).toString()
      }))
    );
  };

  const getFilteredMeetings = () => {
    const allMeetings = getAllMeetings();
    if (selectedFilter === 'all') return allMeetings;
    return allMeetings.filter(meeting => meeting.boardType === selectedFilter);
  };

  const getUpcomingMeetings = () => {
    const today = new Date();
    const filteredMeetings = getFilteredMeetings();
    return filteredMeetings.filter(meeting => 
      new Date(meeting.date) >= today
    ).sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
    .slice(0, 10);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', { 
      weekday: 'long',
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
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

  const getUserAccess = (meeting: any): 'member' | 'invited' | 'public' => {
    if (userRole === 'admin') return 'member';
    if (userBoards.includes(meeting.boardId)) return 'member';
    if (meeting.attendees.includes('Current User')) return 'invited'; // In real app, check against actual user
    return 'public';
  };

  const handleMeetingClick = (meeting: any) => {
    setSelectedMeeting(meeting);
    setIsMeetingModalOpen(true);
  };

  const handleCloseMeetingModal = () => {
    setIsMeetingModalOpen(false);
    setSelectedMeeting(null);
  };

  // Generate calendar grid - simplified for SharePoint compatibility
  const generateCalendarDays = () => {
    const firstDay = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), 1);
    const lastDay = new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 0);
    const startDate = new Date(firstDay);
    startDate.setDate(startDate.getDate() - firstDay.getDay());
    
    const days = [];
    const currentDate = new Date(startDate);
    
    for (let i = 0; i < 42; i++) {
      const dayMeetings = getFilteredMeetings().filter(meeting => 
        meeting.date === currentDate.toISOString().split('T')[0]
      );
      
      days.push({
        date: new Date(currentDate),
        meetings: dayMeetings,
        isCurrentMonth: currentDate.getMonth() === currentMonth.getMonth(),
        isToday: currentDate.toDateString() === new Date().toDateString()
      });
      
      currentDate.setDate(currentDate.getDate() + 1);
    }
    
    return days;
  };

  const calendarDays = generateCalendarDays();
  const upcomingMeetings = getUpcomingMeetings();

  return (
    <>
      <div style={{ backgroundColor: 'white', borderRadius: '8px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)', border: '1px solid #e5e7eb', padding: '24px' }}>
        {/* Header Section - SharePoint friendly */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '24px', flexWrap: 'wrap', gap: '16px' }}>
          <h2 style={{ fontSize: '24px', fontWeight: 'bold', color: '#111827', margin: '0' }}>Meeting Calendar</h2>
          
          {/* Filter Controls - Standard HTML elements */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flexWrap: 'wrap' }}>
            <Filter className="h-4 w-4 text-gray-500" />
            <select 
              value={selectedFilter}
              onChange={(e) => setSelectedFilter(e.target.value as 'all' | 'strategic' | 'tactical')}
              style={{ 
                border: '1px solid #d1d5db', 
                borderRadius: '6px', 
                padding: '6px 12px', 
                fontSize: '14px',
                backgroundColor: 'white'
              }}
            >
              <option value="all">All Boards</option>
              <option value="strategic">Strategic</option>
              <option value="tactical">Tactical</option>
            </select>
            
            {/* View Toggle - Simple buttons */}
            <div style={{ display: 'flex', border: '1px solid #d1d5db', borderRadius: '6px', overflow: 'hidden' }}>
              <button
                onClick={() => setActiveView('calendar')}
                style={{
                  padding: '6px 16px',
                  fontSize: '14px',
                  border: 'none',
                  backgroundColor: activeView === 'calendar' ? '#3b82f6' : 'white',
                  color: activeView === 'calendar' ? 'white' : '#374151',
                  cursor: 'pointer'
                }}
              >
                Calendar
              </button>
              <button
                onClick={() => setActiveView('list')}
                style={{
                  padding: '6px 16px',
                  fontSize: '14px',
                  border: 'none',
                  borderLeft: '1px solid #d1d5db',
                  backgroundColor: activeView === 'list' ? '#3b82f6' : 'white',
                  color: activeView === 'list' ? 'white' : '#374151',
                  cursor: 'pointer'
                }}
              >
                List
              </button>
            </div>
          </div>
        </div>

        {/* Calendar View */}
        {activeView === 'calendar' && (
          <div>
            {/* Calendar Header */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '24px' }}>
              <h3 style={{ fontSize: '20px', fontWeight: '600', color: '#111827', margin: '0' }}>
                {formatMonthYear(currentMonth)}
              </h3>
              <div style={{ display: 'flex', gap: '8px' }}>
                <Button variant="outline" size="sm" onClick={() => navigateMonth('prev')}>
                  <ChevronLeft className="h-4 w-4" />
                </Button>
                <Button variant="outline" size="sm" onClick={() => navigateMonth('next')}>
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
            </div>

            {/* Calendar Grid - Table structure for SharePoint compatibility */}
            <div style={{ border: '1px solid #e5e7eb', borderRadius: '8px', overflow: 'hidden' }}>
              {/* Day Headers */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', backgroundColor: '#f9fafb' }}>
                {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
                  <div key={day} style={{ 
                    padding: '12px 8px', 
                    textAlign: 'center', 
                    fontSize: '14px', 
                    fontWeight: '500',
                    color: '#6b7280',
                    borderRight: '1px solid #e5e7eb'
                  }}>
                    {day}
                  </div>
                ))}
              </div>

              {/* Calendar Days */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)' }}>
                {calendarDays.map((day, index) => (
                  <div 
                    key={index}
                    style={{
                      minHeight: '100px',
                      padding: '8px',
                      borderRight: index % 7 !== 6 ? '1px solid #e5e7eb' : '',
                      borderBottom: index < 35 ? '1px solid #e5e7eb' : '',
                      backgroundColor: day.isToday ? '#eff6ff' : 'white',
                      opacity: day.isCurrentMonth ? 1 : 0.3
                    }}
                  >
                    <div style={{ 
                      fontSize: '14px', 
                      fontWeight: day.isToday ? 'bold' : 'normal',
                      color: day.isToday ? '#2563eb' : '#374151',
                      marginBottom: '4px'
                    }}>
                      {day.date.getDate()}
                    </div>
                    
                    {/* Meeting indicators */}
                    {day.meetings.map((meeting, meetingIndex) => (
                      <div 
                        key={meetingIndex}
                        onClick={() => handleMeetingClick(meeting)}
                        style={{
                          fontSize: '10px',
                          padding: '2px 4px',
                          marginBottom: '2px',
                          backgroundColor: meeting.boardType === 'strategic' ? '#ddd6fe' : '#dcfce7',
                          color: meeting.boardType === 'strategic' ? '#7c3aed' : '#16a34a',
                          borderRadius: '3px',
                          overflow: 'hidden',
                          textOverflow: 'ellipsis',
                          whiteSpace: 'nowrap',
                          cursor: 'pointer',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '2px'
                        }}
                        title={`${meeting.boardName} - ${meeting.startTime} - Click for details`}
                      >
                        {meeting.isConfidential && <Shield style={{ width: '8px', height: '8px' }} />}
                        {meeting.startTime} {meeting.boardName}
                      </div>
                    ))}
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* List View */}
        {activeView === 'list' && (
          <div>
            <h3 style={{ fontSize: '20px', fontWeight: '600', color: '#111827', marginBottom: '16px' }}>
              Upcoming Meetings ({upcomingMeetings.length})
            </h3>
            
            {upcomingMeetings.length === 0 ? (
              <div style={{ 
                textAlign: 'center', 
                padding: '48px 24px', 
                color: '#6b7280',
                backgroundColor: '#f9fafb',
                borderRadius: '8px'
              }}>
                <div style={{ fontSize: '32px', marginBottom: '16px' }}>📅</div>
                <p style={{ margin: '0' }}>No upcoming meetings scheduled</p>
              </div>
            ) : (
              <div style={{ display: 'grid', gap: '16px' }}>
                {upcomingMeetings.map((meeting) => (
                  <Card 
                    key={meeting.id} 
                    className="p-4 cursor-pointer hover:shadow-md transition-shadow"
                    onClick={() => handleMeetingClick(meeting)}
                  >
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '12px' }}>
                      <div>
                        <h4 style={{ fontSize: '18px', fontWeight: '600', color: '#111827', margin: '0 0 4px 0', display: 'flex', alignItems: 'center', gap: '8px' }}>
                          {meeting.boardName}
                          {meeting.isConfidential && <Shield className="h-4 w-4 text-orange-500" />}
                        </h4>
                        <p style={{ fontSize: '14px', color: '#6b7280', margin: '0' }}>
                          {formatDate(meeting.date)}
                        </p>
                      </div>
                      <div style={{ display: 'flex', gap: '8px' }}>
                        <Badge className={meeting.boardType === 'strategic' ? 'bg-purple-100 text-purple-800' : 'bg-green-100 text-green-800'}>
                          {meeting.boardType}
                        </Badge>
                        <Badge className="bg-blue-100 text-blue-800">
                          {meeting.status.replace('-', ' ')}
                        </Badge>
                      </div>
                    </div>
                    
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '12px', fontSize: '14px', color: '#6b7280' }}>
                      <div style={{ display: 'flex', alignItems: 'center' }}>
                        <Clock className="h-4 w-4 mr-2" />
                        {meeting.startTime} - {meeting.endTime}
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center' }}>
                        <MapPin className="h-4 w-4 mr-2" />
                        {meeting.location}
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center' }}>
                        <Users className="h-4 w-4 mr-2" />
                        {meeting.attendees.length} attendees
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            )}
          </div>
        )}
      </div>

      <MeetingDetailModal
        meeting={selectedMeeting}
        isOpen={isMeetingModalOpen}
        onClose={handleCloseMeetingModal}
        userAccess={selectedMeeting ? getUserAccess(selectedMeeting) : 'public'}
      />
    </>
  );
};

export default MeetingCalendarView;
