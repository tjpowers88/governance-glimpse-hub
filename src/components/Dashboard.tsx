
import React from 'react';
import LatestDecisions from './LatestDecisions';
import MeetingCalendar from './MeetingCalendar';
import GovernanceBoards from './GovernanceBoards';
import QuickActions from './QuickActions';

const Dashboard = () => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      <div className="lg:col-span-2 space-y-8">
        <LatestDecisions />
        <GovernanceBoards />
      </div>
      <div className="space-y-8">
        <MeetingCalendar />
        <QuickActions />
      </div>
    </div>
  );
};

export default Dashboard;
