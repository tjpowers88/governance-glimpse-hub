// SharePoint REST API integration with Microsoft 365 Graph API for IT Governance Portal
// This file contains functions to interact with SharePoint Lists and Microsoft 365 services

class SharePointGovernanceAPI {
    constructor() {
        this.baseUrl = _spPageContextInfo.webAbsoluteUrl;
        this.graphBaseUrl = 'https://graph.microsoft.com/v1.0';
        this.listNames = {
            boards: 'Governance Boards',
            meetings: 'Board Meetings', 
            decisions: 'Board Decisions',
            policies: 'Policies'
        };
        
        // Microsoft 365 configuration - replace with your tenant values
        this.tenantConfig = {
            clientId: 'YOUR_CLIENT_ID', // Replace with your Azure AD app registration
            tenantId: 'YOUR_TENANT_ID', // Replace with your tenant ID
            redirectUri: window.location.origin
        };
        
        this.accessToken = null;
    }

    // Get request digest for POST operations
    async getRequestDigest() {
        try {
            const response = await fetch(`${this.baseUrl}/_api/contextinfo`, {
                method: 'POST',
                headers: {
                    'Accept': 'application/json;odata=verbose',
                    'Content-Type': 'application/json;odata=verbose'
                }
            });
            const data = await response.json();
            return data.d.GetContextWebInformation.FormDigestValue;
        } catch (error) {
            console.error('Error getting request digest:', error);
            throw error;
        }
    }

    // Generic function to get list items
    async getListItems(listName, filter = '', expand = '') {
        try {
            let url = `${this.baseUrl}/_api/web/lists/getbytitle('${listName}')/items`;
            
            const params = [];
            if (filter) params.push(`$filter=${filter}`);
            if (expand) params.push(`$expand=${expand}`);
            
            if (params.length > 0) {
                url += '?' + params.join('&');
            }

            const response = await fetch(url, {
                method: 'GET',
                headers: {
                    'Accept': 'application/json;odata=verbose',
                    'Content-Type': 'application/json;odata=verbose'
                }
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();
            return data.d.results;
        } catch (error) {
            console.error(`Error fetching ${listName}:`, error);
            throw error;
        }
    }

    // Get all governance boards
    async getBoards() {
        return await this.getListItems(this.listNames.boards);
    }

    // Get meetings for a specific board or all meetings
    async getMeetings(boardName = null) {
        const filter = boardName ? `BoardName eq '${boardName}'` : '';
        return await this.getListItems(this.listNames.meetings, filter);
    }

    // Get upcoming meetings
    async getUpcomingMeetings() {
        const today = new Date().toISOString().split('T')[0];
        const filter = `MeetingDate ge datetime'${today}T00:00:00Z'`;
        return await this.getListItems(this.listNames.meetings, filter);
    }

    // Get decisions for a specific board or all decisions
    async getDecisions(boardName = null) {
        const filter = boardName ? `BoardName eq '${boardName}'` : '';
        return await this.getListItems(this.listNames.decisions, filter);
    }

    // Get recent decisions
    async getRecentDecisions(days = 30) {
        const dateLimit = new Date();
        dateLimit.setDate(dateLimit.getDate() - days);
        const filter = `DecisionDate ge datetime'${dateLimit.toISOString()}'`;
        return await this.getListItems(this.listNames.decisions, filter);
    }

    // Get all policies
    async getPolicies() {
        return await this.getListItems(this.listNames.policies);
    }

    // Add a new board
    async addBoard(boardData) {
        try {
            const digest = await this.getRequestDigest();
            
            const response = await fetch(`${this.baseUrl}/_api/web/lists/getbytitle('${this.listNames.boards}')/items`, {
                method: 'POST',
                headers: {
                    'Accept': 'application/json;odata=verbose',
                    'Content-Type': 'application/json;odata=verbose',
                    'X-RequestDigest': digest
                },
                body: JSON.stringify({
                    __metadata: { type: 'SP.Data.Governance_x0020_BoardsListItem' },
                    ...boardData
                })
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            return await response.json();
        } catch (error) {
            console.error('Error adding board:', error);
            throw error;
        }
    }

    // Add a new meeting
    async addMeeting(meetingData) {
        try {
            const digest = await this.getRequestDigest();
            
            const response = await fetch(`${this.baseUrl}/_api/web/lists/getbytitle('${this.listNames.meetings}')/items`, {
                method: 'POST',
                headers: {
                    'Accept': 'application/json;odata=verbose',
                    'Content-Type': 'application/json;odata=verbose',
                    'X-RequestDigest': digest
                },
                body: JSON.stringify({
                    __metadata: { type: 'SP.Data.Board_x0020_MeetingsListItem' },
                    ...meetingData
                })
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            return await response.json();
        } catch (error) {
            console.error('Error adding meeting:', error);
            throw error;
        }
    }

    // Add a new decision
    async addDecision(decisionData) {
        try {
            const digest = await this.getRequestDigest();
            
            const response = await fetch(`${this.baseUrl}/_api/web/lists/getbytitle('${this.listNames.decisions}')/items`, {
                method: 'POST',
                headers: {
                    'Accept': 'application/json;odata=verbose',
                    'Content-Type': 'application/json;odata=verbose',
                    'X-RequestDigest': digest
                },
                body: JSON.stringify({
                    __metadata: { type: 'SP.Data.Board_x0020_DecisionsListItem' },
                    ...decisionData
                })
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            return await response.json();
        } catch (error) {
            console.error('Error adding decision:', error);
            throw error;
        }
    }

    // Update an existing item
    async updateItem(listName, itemId, itemData) {
        try {
            const digest = await this.getRequestDigest();
            
            const response = await fetch(`${this.baseUrl}/_api/web/lists/getbytitle('${listName}')/items(${itemId})`, {
                method: 'POST',
                headers: {
                    'Accept': 'application/json;odata=verbose',
                    'Content-Type': 'application/json;odata=verbose',
                    'X-RequestDigest': digest,
                    'X-HTTP-Method': 'MERGE',
                    'IF-MATCH': '*'
                },
                body: JSON.stringify(itemData)
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            return response;
        } catch (error) {
            console.error('Error updating item:', error);
            throw error;
        }
    }

    // Delete an item
    async deleteItem(listName, itemId) {
        try {
            const digest = await this.getRequestDigest();
            
            const response = await fetch(`${this.baseUrl}/_api/web/lists/getbytitle('${listName}')/items(${itemId})`, {
                method: 'POST',
                headers: {
                    'Accept': 'application/json;odata=verbose',
                    'X-RequestDigest': digest,
                    'X-HTTP-Method': 'DELETE',
                    'IF-MATCH': '*'
                }
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            return response;
        } catch (error) {
            console.error('Error deleting item:', error);
            throw error;
        }
    }

    // Get current user information
    async getCurrentUser() {
        try {
            const response = await fetch(`${this.baseUrl}/_api/web/currentuser`, {
                method: 'GET',
                headers: {
                    'Accept': 'application/json;odata=verbose'
                }
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();
            return data.d;
        } catch (error) {
            console.error('Error getting current user:', error);
            throw error;
        }
    }

    // Check user permissions for a list
    async checkUserPermissions(listName) {
        try {
            const response = await fetch(`${this.baseUrl}/_api/web/lists/getbytitle('${listName}')/EffectiveBasePermissions`, {
                method: 'GET',
                headers: {
                    'Accept': 'application/json;odata=verbose'
                }
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();
            return data.d;
        } catch (error) {
            console.error('Error checking permissions:', error);
            throw error;
        }
    }

    // Microsoft 365 Graph API Authentication
    async getGraphAccessToken() {
        if (this.accessToken && !this.isTokenExpired()) {
            return this.accessToken;
        }

        try {
            // Use MSAL for authentication in production
            // For demo purposes, assuming token is available
            const response = await fetch(`${this.baseUrl}/_api/SP.OAuth.Token/Acquire`, {
                method: 'POST',
                headers: {
                    'Accept': 'application/json;odata=verbose',
                    'Content-Type': 'application/json;odata=verbose',
                    'X-RequestDigest': await this.getRequestDigest()
                },
                body: JSON.stringify({
                    resource: 'https://graph.microsoft.com',
                    scope: 'https://graph.microsoft.com/.default'
                })
            });

            const data = await response.json();
            this.accessToken = data.access_token;
            return this.accessToken;
        } catch (error) {
            console.error('Error getting Graph access token:', error);
            throw error;
        }
    }

    // Teams Integration Methods
    async createTeamsChannelForBoard(boardName, boardId, teamId) {
        try {
            const token = await this.getGraphAccessToken();
            
            const channelData = {
                displayName: `${boardName} Governance`,
                description: `Governance discussions for ${boardName}`,
                membershipType: 'standard'
            };

            const response = await fetch(`${this.graphBaseUrl}/teams/${teamId}/channels`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(channelData)
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const channel = await response.json();
            
            // Update board with Teams channel ID
            await this.updateItem(this.listNames.boards, boardId, {
                TeamsChannelId: channel.id
            });

            return channel;
        } catch (error) {
            console.error('Error creating Teams channel:', error);
            throw error;
        }
    }

    async createTeamsMeeting(meetingDetails) {
        try {
            const token = await this.getGraphAccessToken();
            
            const meetingData = {
                subject: meetingDetails.title,
                startTime: new Date(meetingDetails.date + 'T' + meetingDetails.startTime).toISOString(),
                endTime: new Date(meetingDetails.date + 'T' + meetingDetails.endTime).toISOString(),
                attendees: meetingDetails.attendees.map(attendee => ({
                    emailAddress: {
                        address: attendee.email || attendee,
                        name: attendee.name || attendee
                    }
                }))
            };

            const response = await fetch(`${this.graphBaseUrl}/me/onlineMeetings`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(meetingData)
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const meeting = await response.json();
            
            // Update meeting with Teams link
            await this.updateItem(this.listNames.meetings, meetingDetails.id, {
                TeamsLink: meeting.joinWebUrl,
                TeamsMeetingId: meeting.id
            });

            return meeting;
        } catch (error) {
            console.error('Error creating Teams meeting:', error);
            throw error;
        }
    }

    async postTeamsChannelMessage(teamId, channelId, message) {
        try {
            const token = await this.getGraphAccessToken();
            
            const messageData = {
                body: {
                    content: message,
                    contentType: 'text'
                }
            };

            const response = await fetch(`${this.graphBaseUrl}/teams/${teamId}/channels/${channelId}/messages`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(messageData)
            });

            return await response.json();
        } catch (error) {
            console.error('Error posting Teams message:', error);
            throw error;
        }
    }

    // Planner Integration Methods
    async createPlannerPlanForBoard(boardName, groupId) {
        try {
            const token = await this.getGraphAccessToken();
            
            const planData = {
                title: `${boardName} - Governance Tasks`,
                owner: groupId
            };

            const response = await fetch(`${this.graphBaseUrl}/planner/plans`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(planData)
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const plan = await response.json();
            return plan;
        } catch (error) {
            console.error('Error creating Planner plan:', error);
            throw error;
        }
    }

    async createPlannerTaskForDecision(decisionData, planId, bucketId) {
        try {
            const token = await this.getGraphAccessToken();
            
            const taskData = {
                planId: planId,
                bucketId: bucketId,
                title: decisionData.Title,
                assignments: {},
                dueDateTime: decisionData.DueDate ? new Date(decisionData.DueDate).toISOString() : null
            };

            // Add assignee if specified
            if (decisionData.AssignedTo) {
                taskData.assignments[decisionData.AssignedTo] = {
                    '@odata.type': 'microsoft.graph.plannerAssignment',
                    orderHint: ' !'
                };
            }

            const response = await fetch(`${this.graphBaseUrl}/planner/tasks`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(taskData)
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const task = await response.json();
            
            // Update decision with Planner task ID
            await this.updateItem(this.listNames.decisions, decisionData.id, {
                PlannerTaskId: task.id
            });

            return task;
        } catch (error) {
            console.error('Error creating Planner task:', error);
            throw error;
        }
    }

    async updatePlannerTaskProgress(taskId, percentComplete) {
        try {
            const token = await this.getGraphAccessToken();
            
            // First get the task to get the etag
            const getResponse = await fetch(`${this.graphBaseUrl}/planner/tasks/${taskId}`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            
            const task = await getResponse.json();
            
            const updateData = {
                percentComplete: percentComplete
            };

            const response = await fetch(`${this.graphBaseUrl}/planner/tasks/${taskId}`, {
                method: 'PATCH',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                    'If-Match': task['@odata.etag']
                },
                body: JSON.stringify(updateData)
            });

            return await response.json();
        } catch (error) {
            console.error('Error updating Planner task:', error);
            throw error;
        }
    }

    // Outlook Integration Methods
    async createOutlookEvent(meetingDetails) {
        try {
            const token = await this.getGraphAccessToken();
            
            const eventData = {
                subject: meetingDetails.title,
                start: {
                    dateTime: new Date(meetingDetails.date + 'T' + meetingDetails.startTime).toISOString(),
                    timeZone: 'UTC'
                },
                end: {
                    dateTime: new Date(meetingDetails.date + 'T' + meetingDetails.endTime).toISOString(),
                    timeZone: 'UTC'
                },
                location: {
                    displayName: meetingDetails.location
                },
                attendees: meetingDetails.attendees.map(attendee => ({
                    emailAddress: {
                        address: attendee.email || attendee,
                        name: attendee.name || attendee
                    },
                    type: 'required'
                })),
                body: {
                    contentType: 'HTML',
                    content: `<p>Board meeting for ${meetingDetails.boardName}</p><p>Location: ${meetingDetails.location}</p>`
                },
                isOnlineMeeting: true,
                onlineMeetingProvider: 'teamsForBusiness'
            };

            const response = await fetch(`${this.graphBaseUrl}/me/events`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(eventData)
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const event = await response.json();
            
            // Update meeting with Outlook event ID
            await this.updateItem(this.listNames.meetings, meetingDetails.id, {
                OutlookEventId: event.id,
                TeamsLink: event.onlineMeeting ? event.onlineMeeting.joinUrl : null
            });

            return event;
        } catch (error) {
            console.error('Error creating Outlook event:', error);
            throw error;
        }
    }

    // Power Automate Integration
    async triggerPowerAutomateFlow(flowUrl, data) {
        try {
            const response = await fetch(flowUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            });

            return await response.json();
        } catch (error) {
            console.error('Error triggering Power Automate flow:', error);
            throw error;
        }
    }

    // Notification Methods
    async sendBoardMemberNotification(boardName, memberEmail, notificationType) {
        const flowUrl = 'YOUR_POWER_AUTOMATE_FLOW_URL'; // Replace with your flow URL
        
        const data = {
            boardName: boardName,
            memberEmail: memberEmail,
            notificationType: notificationType,
            timestamp: new Date().toISOString()
        };

        return await this.triggerPowerAutomateFlow(flowUrl, data);
    }

    async sendMeetingReminder(meetingId) {
        try {
            const meeting = await this.getListItems(this.listNames.meetings, `Id eq ${meetingId}`);
            if (meeting.length === 0) return;

            const meetingData = meeting[0];
            const flowUrl = 'YOUR_MEETING_REMINDER_FLOW_URL'; // Replace with your flow URL
            
            const data = {
                meetingTitle: meetingData.Title,
                meetingDate: meetingData.MeetingDate,
                attendees: meetingData.Attendees,
                teamsLink: meetingData.TeamsLink,
                location: meetingData.Location
            };

            return await this.triggerPowerAutomateFlow(flowUrl, data);
        } catch (error) {
            console.error('Error sending meeting reminder:', error);
            throw error;
        }
    }

    // Utility Methods
    isTokenExpired() {
        // Simple token expiration check - implement proper JWT parsing in production
        return false; // Placeholder
    }

    async getTeamsChannelMessages(teamId, channelId) {
        try {
            const token = await this.getGraphAccessToken();
            
            const response = await fetch(`${this.graphBaseUrl}/teams/${teamId}/channels/${channelId}/messages`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            return await response.json();
        } catch (error) {
            console.error('Error getting Teams messages:', error);
            throw error;
        }
    }

    async getPlannerTasks(planId) {
        try {
            const token = await this.getGraphAccessToken();
            
            const response = await fetch(`${this.graphBaseUrl}/planner/plans/${planId}/tasks`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            return await response.json();
        } catch (error) {
            console.error('Error getting Planner tasks:', error);
            throw error;
        }
    }
}

// Enhanced dashboard loading with M365 integrations
async function loadDashboardWithM365Data() {
    try {
        const api = new SharePointGovernanceAPI();
        
        // Load SharePoint data
        const [boards, upcomingMeetings, recentDecisions, policies] = await Promise.all([
            api.getBoards(),
            api.getUpcomingMeetings(),
            api.getRecentDecisions(),
            api.getPolicies()
        ]);

        // Update dashboard statistics
        updateDashboardStats(boards, upcomingMeetings, recentDecisions, policies);
        
        // Populate upcoming meetings with Teams integration
        await populateUpcomingMeetingsWithTeams(upcomingMeetings, api);
        
        // Populate recent decisions with Planner integration
        await populateRecentDecisionsWithPlanner(recentDecisions, api);
        
        // Load Teams activity data
        await loadTeamsActivityData(boards, api);
        
    } catch (error) {
        console.error('Error loading dashboard with M365 data:', error);
        showErrorMessage('Failed to load dashboard data. Please refresh the page.');
    }
}

function updateDashboardStats(boards, meetings, decisions, policies) {
    document.querySelector('.stat-number:nth-of-type(1)').textContent = boards.length;
    document.querySelector('.stat-number:nth-of-type(2)').textContent = 
        decisions.filter(d => d.Status === 'Pending').length;
    document.querySelector('.stat-number:nth-of-type(3)').textContent = meetings.length;
}

async function populateUpcomingMeetingsWithTeams(meetings, api) {
    const container = document.querySelector('#upcoming-meetings-container');
    if (!container) return;
    
    const meetingsHtml = await Promise.all(meetings.slice(0, 5).map(async (meeting) => {
        let teamsInfo = '';
        if (meeting.TeamsLink) {
            teamsInfo = `<div class="teams-link">
                <a href="${meeting.TeamsLink}" target="_blank" style="color: #6264a7; text-decoration: none;">
                    🎥 Join Teams Meeting
                </a>
            </div>`;
        }
        
        return `
            <div class="meeting-item" style="border-left: 4px solid #6264a7; padding-left: 12px; margin-bottom: 12px;">
                <div class="meeting-title" style="font-weight: 600; color: #323130;">${meeting.Title}</div>
                <div class="meeting-details" style="font-size: 14px; color: #605e5c; margin-top: 4px;">
                    📅 ${formatDate(meeting.MeetingDate)} • ${meeting.StartTime} - ${meeting.EndTime}<br>
                    📍 ${meeting.Location}
                </div>
                ${teamsInfo}
            </div>
        `;
    }));
    
    container.innerHTML = meetingsHtml.join('');
}

async function populateRecentDecisionsWithPlanner(decisions, api) {
    const container = document.querySelector('#recent-decisions-container');
    if (!container) return;
    
    const decisionsHtml = await Promise.all(decisions.slice(0, 5).map(async (decision) => {
        let plannerInfo = '';
        if (decision.PlannerTaskId) {
            plannerInfo = `<div class="planner-task" style="font-size: 12px; color: #0078d4;">
                📋 Tracked in Planner
            </div>`;
        }
        
        const statusColor = decision.Status === 'Approved' ? '#107c10' : 
                           decision.Status === 'Pending' ? '#ff8c00' : '#d13438';
        
        return `
            <div class="decision-item" style="border-left: 4px solid ${statusColor}; padding-left: 12px; margin-bottom: 12px;">
                <div class="decision-title" style="font-weight: 600; color: #323130;">${decision.Title}</div>
                <div class="decision-details" style="font-size: 14px; color: #605e5c; margin-top: 4px;">
                    ${decision.BoardName} • ${formatDate(decision.DecisionDate)}
                    <span style="background: ${statusColor}; color: white; padding: 2px 6px; border-radius: 3px; margin-left: 8px; font-size: 12px;">
                        ${decision.Status}
                    </span>
                </div>
                ${plannerInfo}
            </div>
        `;
    }));
    
    container.innerHTML = decisionsHtml.join('');
}

async function loadTeamsActivityData(boards, api) {
    // Load Teams activity for boards with Teams channels
    const teamsActivity = document.querySelector('#teams-activity');
    if (!teamsActivity) return;
    
    try {
        let activityHtml = '<h3 style="margin-bottom: 16px; color: #323130;">Teams Activity</h3>';
        
        for (const board of boards.slice(0, 3)) {
            if (board.TeamsChannelId) {
                activityHtml += `
                    <div style="padding: 8px 0; border-bottom: 1px solid #edebe9;">
                        <div style="font-weight: 600; color: #6264a7;">${board.Title}</div>
                        <div style="font-size: 14px; color: #605e5c;">Recent activity in Teams channel</div>
                    </div>
                `;
            }
        }
        
        teamsActivity.innerHTML = activityHtml;
    } catch (error) {
        console.error('Error loading Teams activity:', error);
    }
}

function formatDate(dateString) {
    return new Date(dateString).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
    });
}

function showErrorMessage(message) {
    console.error(message);
    // You could show a user-friendly error message here
}

// Initialize enhanced dashboard when page loads
if (typeof _spPageContextInfo !== 'undefined') {
    document.addEventListener('DOMContentLoaded', loadDashboardWithM365Data);
}

// Export for use in SharePoint pages
window.SharePointGovernanceAPI = SharePointGovernanceAPI;
window.loadDashboardWithM365Data = loadDashboardWithM365Data;
