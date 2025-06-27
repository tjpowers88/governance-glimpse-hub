
# SharePoint IT Governance Portal - Test Setup Instructions

## Quick Setup (5 minutes)

### Step 1: Upload to SharePoint
1. **Navigate to your SharePoint site** (any site will work for testing)
2. **Go to Site Contents > Site Assets** (or create a new document library called "Apps")
3. **Upload the file** `governance-portal-test.html` 
4. **Click on the uploaded file** to open it directly in your browser

### Step 2: Test the Interface
- Click through the navigation menu to see different sections
- Click the action buttons to see what each would do in production
- Notice the "Test Version" banner explaining the demo functionality

## Alternative Setup Methods

### Method 1: Embed in SharePoint Page
1. Create a new SharePoint page
2. Add an "Embed" web part
3. Use this code:
```html
<iframe src="/sites/yoursite/SiteAssets/governance-portal-test.html" 
        width="100%" height="900px" frameborder="0" 
        style="border: none;">
</iframe>
```

### Method 2: Add as App Part
1. Upload the HTML file to Site Assets
2. Create a new page or edit an existing one
3. Add a "File viewer" web part
4. Select the uploaded HTML file

## What You'll See

### Dashboard
- **Statistics cards** showing sample governance metrics
- **Recent decisions** with status badges
- **Upcoming meetings** with action buttons
- **Test notice** explaining this is a demo version

### Governance Boards
- **Table view** of sample boards with different types (Strategic, Tactical, Operational)
- **Status indicators** (active, pending, inactive)
- **Action buttons** for viewing board details

### Meetings
- **Meeting list** with date, time, location, and attendee information
- **Join meeting buttons** (would integrate with Teams/Outlook in production)
- **Agenda viewing** capabilities

### Decisions
- **Decision tracking table** with status, priority, and board information
- **Status badges** (Approved, Under Review, Pending)
- **Priority levels** (High, Medium, Low)

### Policies
- **Policy management table** with versions, categories, and review dates
- **Status tracking** for policy lifecycle
- **Owner assignment** and review scheduling

## Test Scenarios

### Click Through These Actions:
1. **Navigation** - Switch between different sections
2. **View buttons** - See what production functionality would provide
3. **Add buttons** - Understand how new items would be created
4. **Join meeting buttons** - See M365 integration points

### What Each Button Demonstrates:
- **Join Meeting** → Would open Outlook calendar or Teams
- **View Board** → Would show SharePoint list item with Teams channel
- **Add Decision** → Would create new SharePoint list item
- **View Policy** → Would open document from SharePoint library

## Moving to Production

When ready for full implementation:

1. **Create SharePoint Lists** as specified in the integration guide
2. **Set up Azure AD App** for M365 Graph API access
3. **Replace test file** with full `governance-portal.html`
4. **Configure M365 integrations** (Teams, Planner, Outlook)
5. **Set up Power Automate flows** for notifications and workflows

## Troubleshooting

### If the page doesn't load:
- Check that the file was uploaded to Site Assets
- Verify the file name is correct (`governance-portal-test.html`)
- Try opening the file directly by clicking on it in the document library

### If embedded in a page:
- Make sure the iframe src path is correct for your site
- Adjust the height if the content is cut off
- Check that the site allows iframe embedding

### Browser compatibility:
- Works in all modern browsers
- Optimized for Edge (recommended for SharePoint)
- Mobile responsive design included

## Next Steps

1. **Test the interface** with your team to gather feedback
2. **Review the integration guide** for full production setup
3. **Plan your SharePoint list structure** based on your governance needs
4. **Consider customization** for your organization's branding and workflows

This test version gives you a complete preview of the governance portal functionality without requiring any SharePoint configuration or M365 app registrations.
