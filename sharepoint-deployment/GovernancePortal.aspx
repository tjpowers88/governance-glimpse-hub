
<%@ Page Language="C#" MasterPageFile="~masterurl/default.master" Inherits="Microsoft.SharePoint.WebPartPages.WebPartPage, Microsoft.SharePoint, Version=16.0.0.0, Culture=neutral, PublicKeyToken=71e9bce111e9429c" %>
<%@ Register Tagprefix="SharePoint" Namespace="Microsoft.SharePoint.WebControls" Assembly="Microsoft.SharePoint, Version=16.0.0.0, Culture=neutral, PublicKeyToken=71e9bce111e9429c" %>
<%@ Register Tagprefix="WebPartPages" Namespace="Microsoft.SharePoint.WebPartPages" Assembly="Microsoft.SharePoint, Version=16.0.0.0, Culture=neutral, PublicKeyToken=71e9bce111e9429c" %>

<asp:Content ContentPlaceHolderID="PlaceHolderPageTitle" runat="server">
    IT Governance Portal
</asp:Content>

<asp:Content ContentPlaceHolderID="PlaceHolderAdditionalPageHead" runat="server">
    <SharePoint:CssRegistration Name="/_layouts/15/1033/styles/Themable/corev15.css" runat="server"/>
    <style type="text/css">
        .governance-container {
            margin: 20px;
            font-family: "Segoe UI", "Segoe UI Web Regular", "Segoe UI Symbol", "Helvetica Neue", "BBAlpha Sans", "S60 Sans", Arial, sans-serif;
        }
        
        .governance-header {
            background-color: #0078d4;
            color: white;
            padding: 20px;
            margin-bottom: 20px;
            border-radius: 2px;
        }
        
        .governance-nav {
            background-color: #f3f2f1;
            padding: 10px 0;
            margin-bottom: 20px;
            border-radius: 2px;
        }
        
        .nav-link {
            display: inline-block;
            padding: 10px 20px;
            margin: 0 5px;
            background-color: #ffffff;
            border: 1px solid #c8c6c4;
            text-decoration: none;
            color: #323130;
            border-radius: 2px;
        }
        
        .nav-link:hover, .nav-link.active {
            background-color: #0078d4;
            color: white;
            border-color: #0078d4;
        }
        
        .dashboard-stats {
            display: flex;
            gap: 20px;
            margin-bottom: 30px;
            flex-wrap: wrap;
        }
        
        .stat-card {
            flex: 1;
            min-width: 200px;
            background-color: white;
            border: 1px solid #c8c6c4;
            padding: 20px;
            text-align: center;
            border-radius: 2px;
        }
        
        .stat-number {
            font-size: 36px;
            font-weight: bold;
            color: #0078d4;
            margin-bottom: 10px;
        }
        
        .stat-label {
            color: #605e5c;
            font-size: 14px;
        }
        
        .content-section {
            display: none;
            background-color: white;
            border: 1px solid #c8c6c4;
            padding: 20px;
            border-radius: 2px;
        }
        
        .content-section.active {
            display: block;
        }
        
        .section-title {
            color: #323130;
            font-size: 24px;
            margin-bottom: 20px;
            border-bottom: 2px solid #0078d4;
            padding-bottom: 10px;
        }
        
        .ms-button {
            background-color: #0078d4;
            color: white;
            border: none;
            padding: 10px 20px;
            border-radius: 2px;
            cursor: pointer;
            font-size: 14px;
            margin: 5px;
        }
        
        .ms-button:hover {
            background-color: #106ebe;
        }
        
        .ms-button-secondary {
            background-color: #f3f2f1;
            color: #323130;
            border: 1px solid #c8c6c4;
        }
        
        .ms-button-secondary:hover {
            background-color: #edebe9;
        }
        
        .list-item {
            padding: 15px;
            border-bottom: 1px solid #edebe9;
            display: flex;
            justify-content: space-between;
            align-items: center;
        }
        
        .list-item:last-child {
            border-bottom: none;
        }
        
        .item-title {
            font-weight: 600;
            color: #323130;
            margin-bottom: 5px;
        }
        
        .item-details {
            color: #605e5c;
            font-size: 13px;
        }
        
        .status-badge {
            padding: 4px 12px;
            border-radius: 12px;
            font-size: 12px;
            font-weight: 600;
        }
        
        .status-approved { background-color: #dff6dd; color: #107c10; }
        .status-pending { background-color: #fff4ce; color: #f7630c; }
        .status-review { background-color: #deecf9; color: #0078d4; }
        
        @media (max-width: 768px) {
            .dashboard-stats {
                flex-direction: column;
            }
            
            .governance-container {
                margin: 10px;
            }
        }
    </style>
</asp:Content>

<asp:Content ContentPlaceHolderID="PlaceHolderMain" runat="server">
    <div class="governance-container">
        <div class="governance-header">
            <h1>IT Governance Portal</h1>
            <p>Centralized governance decisions, meetings, and policy management</p>
        </div>
        
        <div class="governance-nav">
            <a href="#" class="nav-link active" onclick="showSection('dashboard')">Dashboard</a>
            <a href="#" class="nav-link" onclick="showSection('meetings')">Meetings</a>
            <a href="#" class="nav-link" onclick="showSection('boards')">Governance Boards</a>
            <a href="#" class="nav-link" onclick="showSection('decisions')">Decisions</a>
            <a href="#" class="nav-link" onclick="showSection('policies')">Policies</a>
            <a href="#" class="nav-link" onclick="showSection('audit')">Audit</a>
        </div>
        
        <!-- Dashboard Section -->
        <div id="dashboard" class="content-section active">
            <div class="dashboard-stats">
                <div class="stat-card">
                    <div class="stat-number">12</div>
                    <div class="stat-label">Active Boards</div>
                </div>
                <div class="stat-card">
                    <div class="stat-number">34</div>
                    <div class="stat-label">Pending Decisions</div>
                </div>
                <div class="stat-card">
                    <div class="stat-number">18</div>
                    <div class="stat-label">Upcoming Meetings</div>
                </div>
            </div>
            
            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px;">
                <div style="background: white; border: 1px solid #c8c6c4; padding: 20px; border-radius: 2px;">
                    <h3 class="section-title">Recent Decisions</h3>
                    <div class="list-item">
                        <div>
                            <div class="item-title">Cloud Migration Strategy</div>
                            <div class="item-details">IT Strategy Board • Jan 15, 2025</div>
                        </div>
                        <span class="status-badge status-approved">Approved</span>
                    </div>
                    <div class="list-item">
                        <div>
                            <div class="item-title">Security Framework Update</div>
                            <div class="item-details">Security Board • Jan 12, 2025</div>
                        </div>
                        <span class="status-badge status-review">Under Review</span>
                    </div>
                    <div class="list-item">
                        <div>
                            <div class="item-title">Budget Allocation Q1</div>
                            <div class="item-details">Investment Board • Jan 10, 2025</div>
                        </div>
                        <span class="status-badge status-pending">Pending</span>
                    </div>
                </div>
                
                <div style="background: white; border: 1px solid #c8c6c4; padding: 20px; border-radius: 2px;">
                    <h3 class="section-title">Upcoming Meetings</h3>
                    <div class="list-item">
                        <div>
                            <div class="item-title">IT Strategy Board Meeting</div>
                            <div class="item-details">Jan 25, 2025 • 10:00 AM - Conference Room A</div>
                        </div>
                        <button class="ms-button" onclick="openTeamsMeeting('strategy-board')">Join Teams</button>
                    </div>
                    <div class="list-item">
                        <div>
                            <div class="item-title">Security Governance Review</div>
                            <div class="item-details">Jan 30, 2025 • 2:00 PM - Microsoft Teams</div>
                        </div>
                        <button class="ms-button" onclick="openTeamsMeeting('security-review')">Join Teams</button>
                    </div>
                </div>
            </div>
        </div>
        
        <!-- Meetings Section -->
        <div id="meetings" class="content-section">
            <h2 class="section-title">Meeting Calendar</h2>
            <button class="ms-button" onclick="createSharePointEvent()">Add New Meeting</button>
            <button class="ms-button ms-button-secondary" onclick="openOutlookCalendar()">View in Outlook</button>
            
            <div style="margin-top: 20px; background: white; border: 1px solid #c8c6c4; padding: 20px;">
                <h3>Scheduled Meetings</h3>
                <div class="list-item">
                    <div>
                        <div class="item-title">Quarterly Strategy Review</div>
                        <div class="item-details">IT Strategy Board • Jan 25, 2025 • 10:00 AM - 12:00 PM</div>
                    </div>
                    <div>
                        <button class="ms-button ms-button-secondary" onclick="viewMeetingAgenda('meeting-1')">View Agenda</button>
                        <button class="ms-button" onclick="openTeamsMeeting('meeting-1')">Join Teams</button>
                    </div>
                </div>
            </div>
        </div>
        
        <!-- Boards Section -->
        <div id="boards" class="content-section">
            <h2 class="section-title">Governance Boards</h2>
            <button class="ms-button" onclick="openSharePointList('GovernanceBoards')">Manage Boards</button>
            
            <div style="margin-top: 20px; background: white; border: 1px solid #c8c6c4; padding: 20px;">
                <h3>Active Boards</h3>
                <div class="list-item">
                    <div>
                        <div class="item-title">IT Strategy Board</div>
                        <div class="item-details">Chair: Sarah Johnson • 8 members • Next: Jan 25, 2025</div>
                    </div>
                    <span class="status-badge status-approved">Active</span>
                </div>
                <div class="list-item">
                    <div>
                        <div class="item-title">Security Board</div>
                        <div class="item-details">Chair: Michael Chen • 12 members • Next: Jan 30, 2025</div>
                    </div>
                    <span class="status-badge status-approved">Active</span>
                </div>
            </div>
        </div>
        
        <!-- Decisions Section -->
        <div id="decisions" class="content-section">
            <h2 class="section-title">Decision Tracking</h2>
            <button class="ms-button" onclick="openSharePointList('BoardDecisions')">Add Decision</button>
            <button class="ms-button ms-button-secondary" onclick="exportDecisions()">Export Report</button>
            
            <div style="margin-top: 20px; background: white; border: 1px solid #c8c6c4; padding: 20px;">
                <h3>Recent Decisions</h3>
                <div class="list-item">
                    <div>
                        <div class="item-title">Cloud Migration Strategy Approved</div>
                        <div class="item-details">High Priority • Owner: Sarah Johnson • Due: Feb 15, 2025</div>
                    </div>
                    <span class="status-badge status-approved">Approved</span>
                </div>
            </div>
        </div>
        
        <!-- Policies Section -->
        <div id="policies" class="content-section">
            <h2 class="section-title">Policy Management</h2>
            <button class="ms-button" onclick="openDocumentLibrary('Policies')">Upload Policy</button>
            <button class="ms-button ms-button-secondary" onclick="reviewPolicies()">Review Schedule</button>
            
            <div style="margin-top: 20px; background: white; border: 1px solid #c8c6c4; padding: 20px;">
                <h3>Active Policies</h3>
                <div class="list-item">
                    <div>
                        <div class="item-title">IT Security Policy v2.1</div>
                        <div class="item-details">Owner: Michael Chen • Review: Mar 15, 2025</div>
                    </div>
                    <button class="ms-button ms-button-secondary" onclick="downloadPolicy('security-policy')">Download</button>
                </div>
            </div>
        </div>
        
        <!-- Audit Section -->
        <div id="audit" class="content-section">
            <h2 class="section-title">Audit Management</h2>
            <button class="ms-button" onclick="createAuditReport()">Generate Report</button>
            <button class="ms-button ms-button-secondary" onclick="scheduleAudit()">Schedule Audit</button>
            
            <div style="margin-top: 20px; background: white; border: 1px solid #c8c6c4; padding: 20px;">
                <h3>Audit Status</h3>
                <div class="list-item">
                    <div>
                        <div class="item-title">Q4 2024 IT Governance Audit</div>
                        <div class="item-details">Score: 87% • 12 findings addressed</div>
                    </div>
                    <span class="status-badge status-approved">Completed</span>
                </div>
            </div>
        </div>
    </div>
    
    <script type="text/javascript">
        function showSection(sectionName) {
            // Hide all sections
            var sections = document.getElementsByClassName('content-section');
            for (var i = 0; i < sections.length; i++) {
                sections[i].classList.remove('active');
            }
            
            // Remove active from nav links
            var navLinks = document.getElementsByClassName('nav-link');
            for (var i = 0; i < navLinks.length; i++) {
                navLinks[i].classList.remove('active');
            }
            
            // Show selected section
            document.getElementById(sectionName).classList.add('active');
            
            // Add active to clicked nav link
            event.target.classList.add('active');
        }
        
        // SharePoint integration functions
        function openSharePointList(listName) {
            var siteUrl = _spPageContextInfo.webAbsoluteUrl;
            window.open(siteUrl + '/Lists/' + listName + '/AllItems.aspx', '_blank');
        }
        
        function openDocumentLibrary(libraryName) {
            var siteUrl = _spPageContextInfo.webAbsoluteUrl;
            window.open(siteUrl + '/' + libraryName + '/Forms/AllItems.aspx', '_blank');
        }
        
        function createSharePointEvent() {
            var siteUrl = _spPageContextInfo.webAbsoluteUrl;
            window.open(siteUrl + '/_layouts/15/calendar.aspx?cmd=new', '_blank');
        }
        
        function openOutlookCalendar() {
            window.open('https://outlook.office.com/calendar', '_blank');
        }
        
        function openTeamsMeeting(meetingId) {
            // This would link to actual Teams meeting
            alert('Opening Teams meeting: ' + meetingId);
            // window.open('https://teams.microsoft.com/l/meetup-join/...', '_blank');
        }
        
        function viewMeetingAgenda(meetingId) {
            var siteUrl = _spPageContextInfo.webAbsoluteUrl;
            window.open(siteUrl + '/Lists/MeetingAgendas/DispForm.aspx?ID=' + meetingId, '_blank');
        }
        
        function downloadPolicy(policyId) {
            var siteUrl = _spPageContextInfo.webAbsoluteUrl;
            window.open(siteUrl + '/Policies/' + policyId + '.pdf', '_blank');
        }
        
        function exportDecisions() {
            var siteUrl = _spPageContextInfo.webAbsoluteUrl;
            window.open(siteUrl + '/_layouts/15/xlviewer.aspx?listguid={list-guid}', '_blank');
        }
        
        function createAuditReport() {
            alert('This would trigger a Power Automate flow to generate audit report');
        }
        
        function scheduleAudit() {
            var siteUrl = _spPageContextInfo.webAbsoluteUrl;
            window.open(siteUrl + '/Lists/AuditSchedule/NewForm.aspx', '_blank');
        }
        
        function reviewPolicies() {
            var siteUrl = _spPageContextInfo.webAbsoluteUrl;
            window.open(siteUrl + '/Lists/PolicyReview/AllItems.aspx', '_blank');
        }
    </script>
</asp:Content>
