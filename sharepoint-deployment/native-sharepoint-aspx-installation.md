
# Native SharePoint ASPX Installation Guide

## Overview
This guide provides step-by-step instructions to install the IT Governance Portal as a native SharePoint ASPX application using SharePoint Lists and native M365 functionality.

## Prerequisites
- SharePoint Online or SharePoint Server 2019+
- Site Collection Administrator permissions
- PowerShell with SharePoint PnP module (for automated list creation)

## Step 1: Install SharePoint PnP PowerShell Module

Open PowerShell as Administrator and run:
```powershell
Install-Module -Name PnP.PowerShell -Force -AllowClobber
```

## Step 2: Create SharePoint Lists

1. **Download** `CreateSharePointLists.ps1`
2. **Edit the script** and replace `https://yourtenant.sharepoint.com/sites/yoursite` with your actual site URL
3. **Run PowerShell as Administrator**
4. **Execute the script**:
   ```powershell
   .\CreateSharePointLists.ps1
   ```
5. **Authenticate** when prompted
6. **Verify** all lists were created in Site Contents

### Manual List Creation (Alternative)
If you prefer manual creation:

1. **Go to Site Contents**
2. **Create these lists**:
   - **GovernanceBoards** (Custom List)
   - **BoardMeetings** (Custom List) 
   - **BoardDecisions** (Custom List)
   - **Policies** (Document Library)
   - **AuditManagement** (Custom List)
   - **MeetingAgendas** (Custom List)

## Step 3: Upload ASPX Page

1. **Go to Site Pages** library in your SharePoint site
2. **Upload** `GovernancePortal.aspx`
3. **Check in** the file if prompted
4. **Publish** the page

## Step 4: Set Page as Homepage (Optional)

### Method A: Site Settings
1. **Go to Site Settings** (gear icon)
2. **Click "Change the look"**
3. **Navigation** → **Change homepage**
4. **Select**: `GovernancePortal.aspx`
5. **Save**

### Method B: Modern SharePoint
1. **Go to Site Settings**
2. **Site Information** → **View all site settings**
3. **Welcome Page** (under Look and Feel)
4. **Browse** and select `GovernancePortal.aspx`

## Step 5: Configure List Permissions

1. **For each list created**:
   - Go to **List Settings**
   - Click **Permissions for this list**
   - **Grant permissions** to appropriate users:
     - **Board Members**: Contribute
     - **IT Staff**: Full Control
     - **Viewers**: Read

## Step 6: Add Sample Data

### Governance Boards List
Add sample entries:
- **Title**: IT Strategy Board
- **Board Type**: Strategic
- **Chair Person**: Sarah Johnson
- **Member Count**: 8
- **Status**: Active

### Board Meetings List
Add sample entries:
- **Title**: Quarterly Strategy Review
- **Board Name**: IT Strategy Board
- **Meeting Date**: Future date
- **Location**: Conference Room A
- **Teams Link**: [Teams meeting URL]

## Step 7: Configure Navigation

1. **Go to Site Settings**
2. **Navigation** (under Look and Feel)
3. **Add navigation link**:
   - **Title**: IT Governance Portal
   - **URL**: `/SitePages/GovernancePortal.aspx`
4. **Save**

## Step 8: Test Functionality

1. **Navigate to the page**
2. **Test each section**:
   - ✅ Dashboard displays stats
   - ✅ Navigation works between sections
   - ✅ Buttons open correct SharePoint lists
   - ✅ Teams integration works
   - ✅ Mobile responsive design

## Customization Options

### Connect to Real Data
The ASPX page includes JavaScript functions that integrate with:
- **SharePoint Lists** via `_spPageContextInfo.webAbsoluteUrl`
- **Outlook Calendar** for meeting management
- **Microsoft Teams** for meeting links
- **Document Libraries** for policy management

### Power Platform Integration
Enhance with:
1. **Power Apps** for custom forms
2. **Power Automate** for approval workflows
3. **Power BI** for governance dashboards

### Branding
Customize the CSS in the ASPX file:
- Change colors to match your organization
- Add your company logo
- Modify fonts and spacing

## Troubleshooting

### Issue: ASPX page won't load
**Solutions**:
- Check file permissions
- Ensure file is checked in and published
- Verify SharePoint version compatibility

### Issue: Lists not accessible
**Solutions**:
- Check list permissions
- Verify user has appropriate access level
- Ensure lists exist in Site Contents

### Issue: JavaScript errors
**Solutions**:
- Check browser console for errors
- Verify `_spPageContextInfo` is available
- Test in different browsers

### Issue: Teams integration not working
**Solutions**:
- Verify Teams is enabled for your organization
- Check meeting URLs are valid
- Test with actual Teams meeting links

## Security Considerations

✅ **Native SharePoint Security**:
- Uses SharePoint's built-in authentication
- Respects SharePoint permissions
- No external dependencies

✅ **Data Governance**:
- All data stored in SharePoint Lists
- Follows M365 compliance policies
- Audit trails maintained by SharePoint

## Features Included

### Dashboard
- Real-time statistics from SharePoint Lists
- Recent decisions display
- Upcoming meetings integration

### Meeting Management
- Integration with SharePoint Calendar
- Teams meeting links
- Outlook calendar access

### Board Management
- Native SharePoint List integration
- Member management
- Meeting scheduling

### Decision Tracking
- Decision approval workflows
- Status tracking
- Export capabilities

### Policy Management
- Document library integration
- Version control
- Review scheduling

### Audit Management
- Compliance tracking
- Report generation
- Finding management

## Performance Optimization

1. **Enable SharePoint caching**
2. **Optimize list views** (limit to 30 items)
3. **Use indexed columns** for large lists
4. **Implement paging** for better performance

## Support

For technical issues:
1. **Check SharePoint logs** in Central Administration
2. **Verify browser compatibility** (Edge, Chrome, Firefox)
3. **Test permissions** with different user accounts
4. **Contact SharePoint Administrator** for site-level issues

---

**Installation time**: 30-45 minutes
**Technical requirements**: SharePoint Online/Server, Site Admin rights
**Dependencies**: Native SharePoint only - no external frameworks

This solution provides a fully native SharePoint experience using ASPX pages, SharePoint Lists, and M365 integration.
