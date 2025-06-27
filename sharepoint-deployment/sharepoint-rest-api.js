
// SharePoint REST API integration for IT Governance Portal
// This file contains functions to interact with SharePoint Lists

class SharePointGovernanceAPI {
    constructor() {
        this.baseUrl = _spPageContextInfo.webAbsoluteUrl;
        this.listNames = {
            boards: 'Governance Boards',
            meetings: 'Board Meetings', 
            decisions: 'Board Decisions',
            policies: 'Policies'
        };
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
}

// Usage example:
// const api = new SharePointGovernanceAPI();

// Example functions to populate the dashboard
async function loadDashboardData() {
    try {
        const api = new SharePointGovernanceAPI();
        
        // Load all data simultaneously
        const [boards, upcomingMeetings, recentDecisions, policies] = await Promise.all([
            api.getBoards(),
            api.getUpcomingMeetings(),
            api.getRecentDecisions(),
            api.getPolicies()
        ]);

        // Update dashboard statistics
        updateDashboardStats(boards, upcomingMeetings, recentDecisions, policies);
        
        // Populate upcoming meetings
        populateUpcomingMeetings(upcomingMeetings);
        
        // Populate recent decisions
        populateRecentDecisions(recentDecisions);
        
    } catch (error) {
        console.error('Error loading dashboard data:', error);
        showErrorMessage('Failed to load dashboard data. Please refresh the page.');
    }
}

function updateDashboardStats(boards, meetings, decisions, policies) {
    document.querySelector('.stat-number:nth-of-type(1)').textContent = boards.length;
    document.querySelector('.stat-number:nth-of-type(2)').textContent = 
        decisions.filter(d => d.Status === 'Pending').length;
    document.querySelector('.stat-number:nth-of-type(3)').textContent = meetings.length;
}

function populateUpcomingMeetings(meetings) {
    const container = document.querySelector('#upcoming-meetings-container');
    if (!container) return;
    
    container.innerHTML = meetings.slice(0, 5).map(meeting => `
        <div class="meeting-item">
            <div class="meeting-title">${meeting.Title}</div>
            <div class="meeting-details">
                📅 ${formatDate(meeting.MeetingDate)} • ${meeting.StartTime} - ${meeting.EndTime}<br>
                📍 ${meeting.Location}
            </div>
        </div>
    `).join('');
}

function populateRecentDecisions(decisions) {
    const container = document.querySelector('#recent-decisions-container');
    if (!container) return;
    
    container.innerHTML = decisions.slice(0, 5).map(decision => `
        <div class="meeting-item">
            <div class="meeting-title">${decision.Title}</div>
            <div class="meeting-details">${decision.BoardName} • ${formatDate(decision.DecisionDate)}</div>
        </div>
    `).join('');
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

// Initialize when page loads
if (typeof _spPageContextInfo !== 'undefined') {
    document.addEventListener('DOMContentLoaded', loadDashboardData);
}
