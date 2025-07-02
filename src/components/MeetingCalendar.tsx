
import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Calendar, Clock, MapPin, Shield } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import MeetingDetailModal from './MeetingDetailModal';

const MeetingCalendar = () => {
  const [selectedMeeting, setSelectedMeeting] = useState<any>(null);
  const [isMeetingModalOpen, setIsMeetingModalOpen] = useState(false);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toISOString().split('T')[0];
  };

  const meetings = [
    {
      id: '1',
      boardId: '1',
      title: 'IT Strategy Board - Q3 Planning',
      boardName: 'IT Strategy Board',
      boardType: 'strategic',
      date: '2025-07-15',
      startTime: '10:00 AM',
      endTime: '12:00 PM',
      location: 'Executive Conference Room / Microsoft Teams',
      type: 'quarterly',
      attendees: ['Sarah Johnson', 'Michael Chen', 'David Wilson', 'Lisa Brown', 'Tom Anderson', 'Maria Garcia', 'John Smith', 'Amy Davis'],
      chairperson: 'Sarah Johnson',
      secretary: 'Executive Assistant',
      status: 'scheduled',
      agenda: [],
      isConfidential: false,
      teamsLink: 'https://teams.microsoft.com/l/meetup-join/19%3a...',
      dialInNumber: '+1 (555) 123-4567',
      conferenceId: '123456789'
    },
    {
      id: '2',
      boardId: '2',
      title: 'Security Governance Board - Monthly Review',
      boardName: 'Security Governance Board',
      boardType: 'tactical',
      date: '2025-07-25',
      startTime: '2:00 PM',
      endTime: '4:00 PM',
      location: 'Security Operations Center / Microsoft Teams',
      type: 'monthly',
      attendees: ['Catherine Miller', 'Security Team Lead', 'CISO', 'Compliance Officer', 'Risk Manager', 'Network Admin', 'Incident Response Lead', 'Policy Analyst', 'External Security Auditor', 'Legal Counsel', 'Privacy Officer', 'Data Protection Officer'],
      chairperson: 'Catherine Miller',
      secretary: 'Security Admin',
      status: 'scheduled',
      agenda: [],
      isConfidential: true,
      teamsLink: 'https://teams.microsoft.com/l/meetup-join/19%3a...',
      dialInNumber: '+1 (555) 987-6543',
      conferenceId: '987654321'
    },
    {
      id: '3',
      boardId: '3',
      title: 'Data Governance Board - AI Ethics Review',
      boardName: 'Data Governance Board',
      boardType: 'tactical',
      date: '2025-08-05',
      startTime: '9:00 AM',
      endTime: '11:00 AM',
      location: 'Data Center Conference Room / Microsoft Teams Hybrid',
      type: 'monthly',
      attendees: ['Chief Data Officer', 'AI Ethics Lead', 'Analytics Team Lead', 'Database Admin', 'Quality Assurance Manager', 'Business Intelligence Analyst', 'IT Manager', 'Legal Advisor'],
      chairperson: 'Chief Data Officer',
      secretary: 'Data Analyst',
      status: 'scheduled',
      agenda: [],
      isConfidential: false,
      teamsLink: 'https://teams.microsoft.com/l/meetup-join/19%3a...',
      dialInNumber: '+1 (555) 456-7890',
      conferenceId: '456789123'
    },
    {
      id: '4',
      boardId: '4',
      title: 'IT Investment Board - Budget Review Q3',
      boardName: 'IT Investment Board',
      boardType: 'strategic',
      date: '2025-08-20',
      startTime: '11:00 AM',
      endTime: '1:00 PM',
      location: 'Executive Boardroom / Microsoft Teams',
      type: 'quarterly',
      attendees: ['CFO', 'CTO', 'IT Director', 'Project Portfolio Manager', 'Budget Analyst', 'Procurement Officer', 'Finance Manager', 'Strategy Consultant', 'Vendor Relations Manager', 'Executive Assistant'],
      chairperson: 'CFO',
      secretary: 'Executive Assistant',
      status: 'scheduled',
      agenda: [],
      isConfidential: true,
      teamsLink: 'https://teams.microsoft.com/l/meetup-join/19%3a...',
      dialInNumber: '+1 (555) 234-5678',
      conferenceId: '234567890'
    },
    {
      id: '5',
      boardId: '1',
      title: 'IT Strategy Board - Architecture Review',
      boardName: 'IT Strategy Board',
      boardType: 'strategic',
      date: '2025-09-10',
      startTime: '1:00 PM',
      endTime: '3:00 PM',
      location: 'Innovation Lab / Microsoft Teams',
      type: 'monthly',
      attendees: ['Sarah Johnson', 'Chief Architect', 'Technology Director', 'Solutions Architect', 'Platform Lead', 'DevOps Manager'],
      chairperson: 'Sarah Johnson',
      secretary: 'Technical Writer',
      status: 'scheduled',
      agenda: [],
      isConfidential: false,
      teamsLink: 'https://teams.microsoft.com/l/meetup-join/19%3a...',
      dialInNumber: '+1 (555) 345-6789',
      conferenceId: '345678901'
    },
    {
      id: '6',
      boardId: '2',
      title: 'Security Governance Board - Incident Response Review',
      boardName: 'Security Governance Board',
      boardType: 'tactical',
      date: '2025-09-28',
      startTime: '10:00 AM',
      endTime: '12:00 PM',
      location: 'Security Command Center / Microsoft Teams',
      type: 'quarterly',
      attendees: ['Catherine Miller', 'Incident Response Team', 'Forensics Lead', 'Threat Intelligence Analyst', 'Security Operations Manager', 'External Security Consultant'],
      chairperson: 'Catherine Miller',
      secretary: 'Security Coordinator',
      status: 'scheduled',
      agenda: [],
      isConfidential: true,
      teamsLink: 'https://teams.microsoft.com/l/meetup-join/19%3a...',
      dialInNumber: '+1 (555) 567-8901',
      conferenceId: '567890123'
    },
    {
      id: '7',
      boardId: '3',
      title: 'Data Governance Board - Compliance Audit Prep',
      boardName: 'Data Governance Board',
      boardType: 'tactical',
      date: '2025-10-12',
      startTime: '2:00 PM',
      endTime: '4:00 PM',
      location: 'Compliance Conference Room / Microsoft Teams',
      type: 'special',
      attendees: ['Chief Data Officer', 'Compliance Manager', 'External Auditor', 'Legal Team', 'Data Privacy Officer', 'Records Manager'],
      chairperson: 'Chief Data Officer',
      secretary: 'Compliance Assistant',
      status: 'scheduled',
      agenda: [],
      isConfidential: false,
      teamsLink: 'https://teams.microsoft.com/l/meetup-join/19%3a...',
      dialInNumber: '+1 (555) 678-9012',
      conferenceId: '678901234'
    },
    {
      id: '8',
      boardId: '4',
      title: 'IT Investment Board - Q4 Budget Planning',
      boardName: 'IT Investment Board',
      boardType: 'strategic',
      date: '2025-10-25',
      startTime: '9:00 AM',
      endTime: '12:00 PM',
      location: 'Executive Boardroom / Microsoft Teams',
      type: 'quarterly',
      attendees: ['CFO', 'CTO', 'IT Director', 'Finance Director', 'Budget Committee', 'Strategic Planning Team', 'Procurement Head'],
      chairperson: 'CFO',
      secretary: 'Financial Analyst',
      status: 'scheduled',
      agenda: [],
      isConfidential: true,
      teamsLink: 'https://teams.microsoft.com/l/meetup-join/19%3a...',
      dialInNumber: '+1 (555) 789-0123',
      conferenceId: '789012345'
    }
  ];

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'quarterly': return 'bg-blue-100 text-blue-800';
      case 'monthly': return 'bg-green-100 text-green-800';
      case 'weekly': return 'bg-purple-100 text-purple-800';
      case 'special': return 'bg-orange-100 text-orange-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const handleMeetingClick = (meeting: any) => {
    setSelectedMeeting(meeting);
    setIsMeetingModalOpen(true);
  };

  const handleCloseMeetingModal = () => {
    setIsMeetingModalOpen(false);
    setSelectedMeeting(null);
  };

  // Simulate user access - in real app this would come from auth/context
  const getUserAccess = (meeting: any): 'member' | 'invited' | 'public' => {
    // For demo purposes, let's assume user has different access to different boards
    if (meeting.boardId === '1' || meeting.boardId === '3') return 'member';
    if (meeting.boardId === '2') return 'invited';
    return 'public';
  };

  return (
    <>
      <Card className="p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-gray-900">Upcoming Meetings</h2>
          <Calendar className="h-5 w-5 text-gray-500" />
        </div>
        
        <div className="space-y-4">
          {meetings.map((meeting) => (
            <div 
              key={meeting.id} 
              className="border-l-4 border-blue-500 pl-4 py-2 cursor-pointer hover:bg-gray-50 transition-colors rounded-r-lg"
              onClick={() => handleMeetingClick(meeting)}
            >
              <div className="flex items-start justify-between mb-1">
                <div className="flex items-center gap-2">
                  <h3 className="font-semibold text-gray-900">{meeting.title}</h3>
                  {meeting.isConfidential && (
                    <Shield className="h-4 w-4 text-orange-500" />
                  )}
                </div>
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
                  {meeting.startTime} - {meeting.endTime}
                </div>
                <div className="flex items-center">
                  <MapPin className="h-3 w-3 mr-1" />
                  {meeting.location}
                </div>
              </div>
              
              <div className="mt-2 text-xs text-gray-500">
                {meeting.attendees.length} attendees • Click for details
              </div>
            </div>
          ))}
        </div>
      </Card>

      <MeetingDetailModal
        meeting={selectedMeeting}
        isOpen={isMeetingModalOpen}
        onClose={handleCloseMeetingModal}
        userAccess={selectedMeeting ? getUserAccess(selectedMeeting) : 'public'}
      />
    </>
  );
};

export default MeetingCalendar;
