
# SharePoint Manual Setup Guide for IT Governance Portal

## Overview
This guide provides step-by-step instructions to manually set up the IT Governance Portal in SharePoint without uploading ASPX files or having direct code access. All customizations use SharePoint's built-in capabilities.

## Prerequisites
- SharePoint Online or SharePoint Server 2019+
- Site Collection Administrator or Site Owner permissions
- Basic knowledge of SharePoint Lists and Libraries

## Step 1: Create Document Library for Assets

1. **Navigate to your SharePoint site**
2. **Click "New"** → **Document Library**
3. **Name**: `GovernancePortalAssets`
4. **Click "Create"**

## Step 2: Upload CSS File

1. **Open the GovernancePortalAssets library**
2. **Click "Upload"** → **Files**
3. **Select** `governance-portal-styles.css`
4. **Upload the file**
5. **Right-click the uploaded file** → **Copy link**
6. **Save this URL** - you'll need it later

## Step 3: Upload HTML File

1. **In the same library**, upload `governance-portal-native.html`
2. **Right-click the file** → **Copy link**
3. **Save this URL** - this is your portal URL

## Step 4: Create SharePoint Page (Method 1 - Recommended)

### Using Script Editor Web Part (SharePoint Server)
1. **Go to Site Contents** → **Site Pages**
2. **Click "New"** → **Web Part Page**
3. **Name**: `ITGovernancePortal`
4. **Choose layout**: Full Page, Vertical
5. **Add a Script Editor web part**
6. **Click "Edit Snippet"**
7. **Paste this code**:
```html
<link rel="stylesheet" href="[YOUR_SITE_URL]/GovernancePortalAssets/governance-portal-styles.css">
<iframe src="[YOUR_SITE_URL]/GovernancePortalAssets/governance-portal-native.html" 
        width="100%" 
        height="800px" 
        frameborder="0" 
        style="border:none; overflow:hidden;">
</iframe>
<script>
// Auto-resize iframe
function resizeIframe() {
    const iframe = document.querySelector('iframe');
    if (iframe) {
        iframe.style.height = (window.innerHeight - 100) + 'px';
    }
}
window.addEventListener('resize', resizeIframe);
resizeIframe();
</script>
```
8. **Replace [YOUR_SITE_URL]** with your actual SharePoint site URL
9. **Save the page**

### Using Embed Web Part (SharePoint Online)
1. **Create a new page**: Site Pages → **New** → **Page**
2. **Choose template**: Blank
3. **Add web part**: **Embed**
4. **Paste this code**:
```html
<style>
@import url('[YOUR_SITE_URL]/GovernancePortalAssets/governance-portal-styles.css');
</style>
<iframe src="[YOUR_SITE_URL]/GovernancePortalAssets/governance-portal-native.html" 
        width="100%" 
        height="800px" 
        frameborder="0">
</iframe>
```
5. **Replace [YOUR_SITE_URL]** with your SharePoint site URL
6. **Publish the page**

## Step 5: Create Direct Access Method (Alternative)

### Option A: Create Redirect Page
1. **Create new SharePoint page**: `GovernancePortal`
2. **Add Script Editor or Embed web part**
3. **Add this code**:
```html
<script>
window.location.href = '[YOUR_SITE_URL]/GovernancePortalAssets/governance-portal-native.html';
</script>
<noscript>
<meta http-equiv="refresh" content="0; url='[YOUR_SITE_URL]/GovernancePortalAssets/governance-portal-native.html'">
</noscript>
```

### Option B: Direct Library Access
1. **Share the document library publicly** (if security allows)
2. **Direct URL**: `[YOUR_SITE_URL]/GovernancePortalAssets/governance-portal-native.html`
3. **Users can bookmark this URL**

## Step 6: Apply Custom CSS Without Code Access

### Method 1: Site Theme Customization
1. **Go to Site Settings** → **Change the look**
2. **Customize** → **Advanced settings**
3. **CSS Override**: Paste critical CSS from `governance-portal-styles.css`

### Method 2: Content Editor Web Part
1. **Add Content Editor web part** to your page
2. **Insert** → **HTML Source**
3. **Add**:
```html
<style>
/* Paste governance-portal-styles.css content here */
</style>
```

### Method 3: User Custom Actions (PowerShell)
```powershell
Add-PnPCustomAction -Name "GovernancePortalCSS" -Location "ScriptLink" -ScriptSrc "~sitecollection/GovernancePortalAssets/governance-portal-styles.css"
```

## Step 7: Set Up Navigation

### Add to Site Navigation
1. **Site Settings** → **Navigation**
2. **Current Navigation** → **Add Link**
3. **Title**: IT Governance Portal
4. **URL**: `/SitePages/ITGovernancePortal.aspx` or your page URL

### Add to Quick Launch
1. **Site Settings** → **Quick Launch**
2. **New Link**
3. **Title**: IT Governance Portal
4. **URL**: Link to your created page

## Step 8: Configure Permissions

1. **Site Settings** → **Site Permissions**
2. **Grant access** to appropriate users/groups
3. **Consider creating** a "Governance Portal Users" group
4. **Set appropriate permissions**:
   - Read access for general users
   - Contribute access for board members
   - Full control for administrators

## Step 9: Test the Installation

### Functionality Checklist
- ✅ Page loads without errors
- ✅ Navigation between sections works
- ✅ CSS styling is applied correctly
- ✅ Mobile responsive design works
- ✅ All buttons show appropriate messages
- ✅ Scrolling in decision and meeting sections works

### Browser Testing
- ✅ Microsoft Edge (recommended for SharePoint)
- ✅ Google Chrome
- ✅ Mozilla Firefox
- ✅ Mobile browsers

## Step 10: Integrate with SharePoint Data (Optional)

### Connect to SharePoint Lists
1. **Create lists** for:
   - Governance Decisions
   - Meeting Calendar
   - Board Members
   - Audit Items
   - Policy Documents

2. **Modify JavaScript** in the HTML file to use SharePoint REST API:
```javascript
// Example: Fetch from SharePoint list
fetch("/_api/web/lists/getbytitle('Governance Decisions')/items")
    .then(response => response.json())
    .then(data => {
        // Populate decisions from SharePoint data
        populateDecisionsFromSharePoint(data.value);
    });
```

### Set Up Power Automate Flows
1. **Create flows** for:
   - Email notifications for new meetings
   - Approval workflows for decisions
   - Automated audit reminders

## Troubleshooting

### Common Issues and Solutions

**Issue**: CSS not loading
- **Solution**: Check file permissions and URL path
- **Alternative**: Embed CSS directly in HTML

**Issue**: JavaScript errors
- **Solution**: Check browser console for specific errors
- **Verify**: All script references are correct

**Issue**: Mobile layout broken
- **Solution**: Ensure viewport meta tag is present
- **Check**: CSS media queries are working

**Issue**: SharePoint security blocking content
- **Solution**: Upload files to a trusted location
- **Alternative**: Use SharePoint Online CDN

### Security Considerations
- ✅ Files are hosted within SharePoint (no external dependencies)
- ✅ Uses only client-side technologies
- ✅ No external API calls or data transmission
- ✅ Respects SharePoint permission model

## Maintenance and Updates

### Updating the Portal
1. **Upload new files** to the GovernancePortalAssets library
2. **Clear browser cache** after updates
3. **Test thoroughly** in different browsers
4. **Notify users** of any significant changes

### Monitoring Usage
1. **Use SharePoint analytics** to track page views
2. **Set up alerts** for any file modifications
3. **Regular reviews** of user feedback

## Advanced Integration Options

### Power BI Integration
1. **Embed Power BI reports** for governance metrics
2. **Use SharePoint web parts** for Power BI content
3. **Create dashboards** using SharePoint data

### Microsoft Teams Integration
1. **Add as Teams tab** for governance boards
2. **Create Teams channels** for each governance board
3. **Integrate meeting scheduling** with Teams calendar

### Automation Options
1. **Power Automate** for workflow automation
2. **Power Apps** for data entry forms
3. **Microsoft Forms** for feedback collection

## Support and Resources

### SharePoint Resources
- SharePoint REST API documentation
- Power Platform learning paths
- Microsoft 365 admin center

### Customization Support
- Modify HTML file for layout changes
- Update CSS file for styling adjustments
- Extend JavaScript for additional functionality

---

**Setup Time**: 30-60 minutes
**Technical Requirements**: SharePoint site permissions
**Dependencies**: None - pure HTML/CSS/JavaScript
**Maintenance**: Minimal - update files as needed
