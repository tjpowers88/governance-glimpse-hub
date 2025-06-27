
export interface Decision {
  id: string;
  title: string;
  description: string;
  boardId: string;
  status: 'pending' | 'approved' | 'rejected' | 'under-review';
  isConfidential: boolean;
  createdDate: string;
  decidedDate?: string;
  createdBy: string;
  attachments?: string[];
  escalatedFrom?: string; // Board ID if escalated
  escalationReason?: string;
}

export interface AgendaItem {
  id: string;
  title: string;
  type: 'decision' | 'discussion' | 'presentation' | 'escalation';
  duration: number; // in minutes
  presenter: string;
  description: string;
  attachments?: string[];
  relatedDecisionId?: string;
  escalatedFrom?: string;
  order: number;
}

export interface Meeting {
  id: string;
  boardId: string;
  date: string;
  startTime: string;
  endTime: string;
  location: string;
  status: 'scheduled' | 'in-progress' | 'completed' | 'cancelled';
  agenda: AgendaItem[];
  attendees: string[];
  chairperson: string;
  secretary: string;
}

export interface Board {
  id: string;
  name: string;
  description: string;
  type: 'strategic' | 'tactical';
  chair: string;
  members: string[];
  nextMeeting?: string;
  decisions: Decision[];
  meetings: Meeting[];
  escalationTargets?: string[]; // Board IDs that can receive escalations
}

export interface SlideTemplate {
  id: string;
  name: string;
  slides: {
    title: string;
    content: string;
    type: 'title' | 'agenda' | 'decision' | 'discussion' | 'conclusion';
  }[];
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'member' | 'viewer';
}
