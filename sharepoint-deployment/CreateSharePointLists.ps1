
# PowerShell script to create SharePoint Lists for IT Governance Portal
# Run this in SharePoint Online Management Shell

# Connect to SharePoint Online (replace with your site URL)
$siteUrl = "https://yourtenant.sharepoint.com/sites/yoursite"
Connect-PnPOnline -Url $siteUrl -Interactive

# Create Governance Boards List
Write-Host "Creating Governance Boards list..."
New-PnPList -Title "GovernanceBoards" -Template GenericList -OnQuickLaunch

# Add fields to Governance Boards
Add-PnPField -List "GovernanceBoards" -DisplayName "Board Type" -InternalName "BoardType" -Type Choice -Choices "Strategic","Tactical","Operational","Financial"
Add-PnPField -List "GovernanceBoards" -DisplayName "Chair Person" -InternalName "ChairPerson" -Type Text
Add-PnPField -List "GovernanceBoards" -DisplayName "Member Count" -InternalName "MemberCount" -Type Number
Add-PnPField -List "GovernanceBoards" -DisplayName "Next Meeting Date" -InternalName "NextMeetingDate" -Type DateTime
Add-PnPField -List "GovernanceBoards" -DisplayName "Status" -InternalName "BoardStatus" -Type Choice -Choices "Active","Inactive","Under Review"

# Create Board Meetings List
Write-Host "Creating Board Meetings list..."
New-PnPList -Title "BoardMeetings" -Template GenericList -OnQuickLaunch

# Add fields to Board Meetings
Add-PnPField -List "BoardMeetings" -DisplayName "Board Name" -InternalName "BoardName" -Type Text
Add-PnPField -List "BoardMeetings" -DisplayName "Meeting Date" -InternalName "MeetingDate" -Type DateTime
Add-PnPField -List "BoardMeetings" -DisplayName "Location" -InternalName "MeetingLocation" -Type Text
Add-PnPField -List "BoardMeetings" -DisplayName "Teams Link" -InternalName "TeamsLink" -Type URL
Add-PnPField -List "BoardMeetings" -DisplayName "Agenda" -InternalName "MeetingAgenda" -Type Note
Add-PnPField -List "BoardMeetings" -DisplayName "Attendees" -InternalName "Attendees" -Type User -Required $false

# Create Board Decisions List
Write-Host "Creating Board Decisions list..."
New-PnPList -Title "BoardDecisions" -Template GenericList -OnQuickLaunch

# Add fields to Board Decisions
Add-PnPField -List "BoardDecisions" -DisplayName "Decision Title" -InternalName "DecisionTitle" -Type Text -Required $true
Add-PnPField -List "BoardDecisions" -DisplayName "Board Name" -InternalName "BoardName" -Type Text
Add-PnPField -List "BoardDecisions" -DisplayName "Decision Status" -InternalName "DecisionStatus" -Type Choice -Choices "Pending","Approved","Rejected","Under Review"
Add-PnPField -List "BoardDecisions" -DisplayName "Priority" -InternalName "Priority" -Type Choice -Choices "High","Medium","Low"
Add-PnPField -List "BoardDecisions" -DisplayName "Decision Date" -InternalName "DecisionDate" -Type DateTime
Add-PnPField -List "BoardDecisions" -DisplayName "Owner" -InternalName "DecisionOwner" -Type User
Add-PnPField -List "BoardDecisions" -DisplayName "Description" -InternalName "DecisionDescription" -Type Note

# Create Policies Document Library
Write-Host "Creating Policies document library..."
New-PnPList -Title "Policies" -Template DocumentLibrary -OnQuickLaunch

# Add fields to Policies
Add-PnPField -List "Policies" -DisplayName "Policy Category" -InternalName "PolicyCategory" -Type Choice -Choices "Security","Governance","Operations","Financial","HR"
Add-PnPField -List "Policies" -DisplayName "Version" -InternalName "PolicyVersion" -Type Text
Add-PnPField -List "Policies" -DisplayName "Policy Status" -InternalName "PolicyStatus" -Type Choice -Choices "Active","Under Review","Retired","Draft"
Add-PnPField -List "Policies" -DisplayName "Policy Owner" -InternalName "PolicyOwner" -Type User
Add-PnPField -List "Policies" -DisplayName "Review Date" -InternalName "ReviewDate" -Type DateTime

# Create Audit Management List
Write-Host "Creating Audit Management list..."
New-PnPList -Title "AuditManagement" -Template GenericList -OnQuickLaunch

# Add fields to Audit Management
Add-PnPField -List "AuditManagement" -DisplayName "Audit Type" -InternalName "AuditType" -Type Choice -Choices "Internal","External","Compliance","Security"
Add-PnPField -List "AuditManagement" -DisplayName "Audit Status" -InternalName "AuditStatus" -Type Choice -Choices "Planned","In Progress","Completed","Cancelled"
Add-PnPField -List "AuditManagement" -DisplayName "Start Date" -InternalName "StartDate" -Type DateTime
Add-PnPField -List "AuditManagement" -DisplayName "End Date" -InternalName "EndDate" -Type DateTime
Add-PnPField -List "AuditManagement" -DisplayName "Auditor" -InternalName "Auditor" -Type User
Add-PnPField -List "AuditManagement" -DisplayName "Findings Count" -InternalName "FindingsCount" -Type Number
Add-PnPField -List "AuditManagement" -DisplayName "Overall Score" -InternalName "OverallScore" -Type Number

# Create Meeting Agendas List
Write-Host "Creating Meeting Agendas list..."
New-PnPList -Title "MeetingAgendas" -Template GenericList -OnQuickLaunch

# Add fields to Meeting Agendas
Add-PnPField -List "MeetingAgendas" -DisplayName "Meeting ID" -InternalName "MeetingID" -Type Text
Add-PnPField -List "MeetingAgendas" -DisplayName "Agenda Items" -InternalName "AgendaItems" -Type Note
Add-PnPField -List "MeetingAgendas" -DisplayName "Action Items" -InternalName "ActionItems" -Type Note
Add-PnPField -List "MeetingAgendas" -DisplayName "Meeting Minutes" -InternalName "MeetingMinutes" -Type Note

Write-Host "All SharePoint lists created successfully!"
Write-Host "Next steps:"
Write-Host "1. Upload the GovernancePortal.aspx file to your Site Pages library"
Write-Host "2. Set appropriate permissions on the lists"
Write-Host "3. Add sample data to test functionality"
