
# Native SharePoint Installation Guide

## Overview
This guide provides step-by-step instructions to install the IT Governance Portal as a native SharePoint application without any React dependencies.

## Step 1: Download the Native Version

1. **Download the file**: `governance-portal-native.html`
2. **Save it locally** on your computer

## Step 2: Upload to SharePoint

### Method 1: Site Pages Library (Recommended)
1. **Go to your SharePoint site**
2. **Navigate to**: Site Contents → Site Pages
3. **Click "Upload"** → Files
4. **Select** `governance-portal-native.html`
5. **Upload and wait** for completion

### Method 2: Site Assets Library
1. **Go to your SharePoint site**
2. **Navigate to**: Site Contents → Site Assets
3. **Click "Upload"** → Files
4. **Select** `governance-portal-native.html`
5. **Upload and wait** for completion

## Step 3: Set Permissions

1. **Select the uploaded file**
2. **Click "Manage Access"**
3. **Ensure** all users who need access have "Read" permissions
4. **Share with** additional users if needed

## Step 4: Create Navigation Link

### Option A: Add to Site Navigation
1. **Go to Site Settings** (gear icon → Site Settings)
2. **Click "Navigation"**
3. **Add new link**:
   - **Title**: IT Governance Portal
   - **URL**: `/SitePages/governance-portal-native.html`
4. **Save**

### Option B: Create SharePoint Page with Redirect
1. **Create a new SharePoint page**
2. **Title**: IT Governance Portal
3. **Add "Embed" web part**
4. **Paste this code**:
```html
<script>
window.location.href = window.location.origin + '/sites/[YOURSITE]/SitePages/governance-portal-native.html';
</script>
```
5. **Replace [YOURSITE]** with your actual site name
6. **Publish the page**

## Step 5: Set as Homepage (Optional)

1. **Go to Site Settings**
2. **Click "Change the look"**
3. **Navigation** → **Change homepage**
4. **Select**: governance-portal-native.html
5. **Save**

## Step 6: Test the Installation

1. **Navigate to the page** using one of these methods:
   - Direct URL: `/SitePages/governance-portal-native.html`
   - Through navigation menu
   - As homepage

2. **Verify functionality**:
   - ✅ Navigation between sections works
   - ✅ All buttons show appropriate messages
   - ✅ Mobile responsive design works
   - ✅ No console errors

## Troubleshooting

### Issue: File won't open
**Solution**: 
- Check file permissions
- Ensure file uploaded completely
- Try accessing direct URL

### Issue: Navigation doesn't work
**Solution**:
- Clear browser cache
- Check JavaScript is enabled
- Verify no browser extensions blocking scripts

### Issue: Mobile menu not working
**Solution**:
- Test on different mobile browsers
- Check screen size detection
- Verify touch events are enabled

### Issue: Styling looks broken
**Solution**:
- Hard refresh (Ctrl+F5)
- Check if file uploaded completely
- Verify browser compatibility

## Browser Compatibility

✅ **Supported Browsers**:
- Microsoft Edge (recommended for SharePoint)
- Google Chrome
- Mozilla Firefox
- Safari
- Mobile browsers

## Security Considerations

- ✅ No external dependencies
- ✅ All code runs client-side
- ✅ No data transmission to external servers
- ✅ Compatible with SharePoint security policies

## Future Enhancements

To integrate with SharePoint data:

1. **Connect to SharePoint Lists**:
   - Replace static data with SharePoint REST API calls
   - Add CRUD operations for real data management

2. **Add Power Automate Flows**:
   - Email notifications for meetings
   - Approval workflows for decisions
   - Automated audit scheduling

3. **Integrate with Microsoft 365**:
   - Teams meeting creation
   - Outlook calendar integration
   - OneDrive document storage

## Support

For issues or customization requests:
- Check SharePoint admin permissions
- Verify site collection features
- Test in different browsers
- Contact your SharePoint administrator

---

**Installation time**: 10-15 minutes
**Technical requirements**: SharePoint Online or SharePoint Server 2019+
**Dependencies**: None - pure HTML/CSS/JavaScript
