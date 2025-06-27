
# SharePoint Deployment Guide for IT Governance Portal

## Overview
This guide explains how to deploy the IT Governance Portal to SharePoint using native components and SharePoint Lists for data storage.

## Required SharePoint Lists

### 1. Governance Boards List
Create a SharePoint list with these columns:
- **Title** (Single line of text) - Board name
- **BoardType** (Choice: Strategic, Tactical, Operational)
- **Chair** (Person or Group)
- **Description** (Multiple lines of text)
- **Members** (Person or Group - Allow multiple selections)
- **NextMeeting** (Date and Time)
- **Status** (Choice: Active, Inactive, Under Review)

### 2. Board Meetings List
Create a SharePoint list with these columns:
- **Title** (Single line of text) - Meeting title
- **BoardName** (Lookup to Governance Boards list)
- **MeetingDate** (Date and Time)
- **StartTime** (Single line of text)
- **EndTime** (Single line of text)
- **Location** (Single line of text)
- **TeamsLink** (Hyperlink)
- **Attendees** (Person or Group - Allow multiple selections)
- **Chairperson** (Person or Group)
- **Status** (Choice: Scheduled, In Progress, Completed, Cancelled)
- **IsConfidential** (Yes/No)

### 3. Board Decisions List
Create a SharePoint list with these columns:
- **Title** (Single line of text) - Decision title
- **BoardName** (Lookup to Governance Boards list)
- **DecisionDate** (Date and Time)
- **Description** (Multiple lines of text)
- **Status** (Choice: Pending, Approved, Rejected, Under Review)
- **Priority** (Choice: High, Medium, Low)
- **IsConfidential** (Yes/No)
- **Escalated** (Yes/No)

### 4. Policies List
Create a SharePoint list with these columns:
- **Title** (Single line of text) - Policy name
- **Version** (Single line of text)
- **Status** (Choice: Active, Under Review, Draft, Expired)
- **Category** (Choice: Security, Data, Vendor, Risk, IT)
- **Owner** (Person or Group)
- **LastReviewed** (Date and Time)
- **NextReview** (Date and Time)
- **ComplianceFrameworks** (Multiple lines of text)
- **PolicyDocument** (Hyperlink or Link to Document)

## Deployment Steps

### Step 1: Upload HTML File
1. Go to your SharePoint site
2. Navigate to **Site Contents** > **Site Pages**
3. Click **New** > **Web Part Page** or **Site Page**
4. Add an **Embed** web part or **Script Editor** web part
5. Copy the HTML content from `governance-portal.html`
6. Paste it into the web part

### Step 2: Configure Permissions
1. Set appropriate permissions for each SharePoint list
2. Configure who can view/edit board information
3. Set up confidential content permissions

### Step 3: SharePoint REST API Integration
Add this JavaScript to connect to SharePoint lists:

```javascript
// SharePoint REST API functions
function getSharePointData(listName) {
    return fetch(`/_api/web/lists/getbytitle('${listName}')/items`, {
        method: 'GET',
        headers: {
            'Accept': 'application/json;odata=verbose',
            'Content-Type': 'application/json;odata=verbose'
        }
    })
    .then(response => response.json())
    .then(data => data.d.results);
}

function addToSharePointList(listName, itemData) {
    return fetch(`/_api/web/lists/getbytitle('${listName}')/items`, {
        method: 'POST',
        headers: {
            'Accept': 'application/json;odata=verbose',
            'Content-Type': 'application/json;odata=verbose',
            'X-RequestDigest': $('#__REQUESTDIGEST').val()
        },
        body: JSON.stringify(itemData)
    });
}
```

### Step 4: Customize for Your Environment
1. Update the HTML/CSS to match your SharePoint theme
2. Modify the navigation to work with SharePoint's structure
3. Integrate with existing SharePoint workflows
4. Configure email notifications using SharePoint workflows

## Features Available

### ✅ Native SharePoint Integration
- Uses SharePoint Lists for all data storage
- Works with SharePoint permissions and security
- Integrates with SharePoint Calendar
- Uses SharePoint search functionality

### ✅ Mobile Responsive
- Works on desktop, tablet, and mobile devices
- Compatible with SharePoint mobile app

### ✅ Security & Compliance
- Leverages SharePoint's built-in security model
- Supports confidential content restrictions
- Audit trail through SharePoint version history

### ✅ Integration Points
- **Teams**: Link to Teams meetings
- **Outlook**: Calendar integration
- **Power Automate**: Workflow automation
- **Power BI**: Reporting and analytics

## Customization Options

### 1. Branding
- Modify CSS to match your organization's colors
- Add your company logo
- Customize the navigation structure

### 2. Workflows
- Set up approval workflows for decisions
- Automate meeting reminders
- Create escalation processes

### 3. Reporting
- Connect to Power BI for advanced analytics
- Create SharePoint views for different user roles
- Set up automated reports

## Maintenance

### Regular Tasks
1. Update SharePoint list permissions as needed
2. Archive old meetings and decisions
3. Review and update policies
4. Monitor usage and performance

### Backup Strategy
- SharePoint automatically backs up list data
- Export important configurations
- Document customizations for future reference

## Support and Troubleshooting

### Common Issues
1. **Permissions errors**: Check SharePoint list permissions
2. **Script not loading**: Verify Script Editor web part settings
3. **Data not displaying**: Check REST API calls and list names

### Getting Help
- Contact your SharePoint administrator
- Review SharePoint documentation
- Use SharePoint community forums
