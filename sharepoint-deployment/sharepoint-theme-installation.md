
# SharePoint Theme Installation Guide

## Overview
This guide explains how to install the IT Governance Portal theme in SharePoint Online modern sites.

## Step 1: Access Theme Settings

### Method 1: Site Settings (Site Owner/Admin)
1. **Go to your SharePoint site**
2. **Click the gear icon** (⚙️) in the top right
3. **Select "Change the look"**
4. **Click "Custom"** at the bottom of the theme gallery

### Method 2: SharePoint Admin Center (Global Admin)
1. **Go to SharePoint Admin Center**
2. **Navigate to**: Active sites
3. **Select your site** → Settings
4. **Click "Change the look"**

## Step 2: Import Custom Theme

1. **Click "Import theme"** or "Add a custom theme"
2. **Upload the file**: `governance-portal-theme.json`
3. **Give it a name**: "IT Governance Portal"
4. **Add description**: "Custom theme for IT Governance Portal matching the application design"
5. **Click "Add"**

## Step 3: Apply Theme

1. **Select the newly imported theme**
2. **Preview** the theme to see how it looks
3. **Click "Save"** to apply to your site
4. **Wait** for the theme to propagate (may take a few minutes)

## Step 4: Verify Theme Application

Check these elements to ensure the theme is applied correctly:

### Navigation
- ✅ Top navigation bar uses dark slate colors
- ✅ Left navigation (if enabled) matches design
- ✅ Hub site navigation reflects theme

### Content Areas
- ✅ Page backgrounds are clean white
- ✅ Cards and web parts use proper borders
- ✅ Text colors are appropriate contrast

### Interactive Elements
- ✅ Buttons use the governance portal blue
- ✅ Links are the correct blue shade
- ✅ Form inputs have proper styling

## Theme Color Breakdown

### Primary Colors
- **Primary**: `#1e293b` (Dark slate for main elements)
- **Accent**: `#3b82f6` (Blue for links and actions)
- **Background**: `#ffffff` (Clean white)
- **Text**: `#0a0a0a` (Near black for readability)

### Status Colors
- **Success**: `#16a34a` (Green for approved/success states)
- **Warning**: `#d97706` (Orange for warnings)
- **Error**: `#dc2626` (Red for errors/rejected)
- **Info**: `#2563eb` (Blue for information)

### Neutral Colors
- **Light Gray**: `#f4f4f5` (Subtle backgrounds)
- **Medium Gray**: `#a1a1aa` (Disabled states)
- **Dark Gray**: `#525252` (Secondary text)

## Advanced Customization

### Site Collection Theme
To apply across multiple sites in a hub:

1. **Go to SharePoint Admin Center**
2. **Select "Active sites"**
3. **Choose your hub site**
4. **Apply theme** to hub
5. **Associated sites** will inherit the theme

### PowerShell Application
For bulk deployment across multiple sites:

```powershell
# Connect to SharePoint Online
Connect-PnPOnline -Url "https://yourtenant-admin.sharepoint.com"

# Apply theme to specific site
Set-PnPWebTheme -Theme "IT Governance Portal" -Web "https://yourtenant.sharepoint.com/sites/yoursite"

# Apply to multiple sites
$sites = @(
    "https://yourtenant.sharepoint.com/sites/site1",
    "https://yourtenant.sharepoint.com/sites/site2"
)

foreach ($site in $sites) {
    Set-PnPWebTheme -Theme "IT Governance Portal" -Web $site
}
```

## Troubleshooting

### Theme Not Applying
- **Clear browser cache** (Ctrl+F5)
- **Wait up to 24 hours** for propagation
- **Check permissions** - you need site owner rights
- **Try incognito/private browsing** to test

### Colors Look Wrong
- **Verify JSON file** uploaded correctly
- **Check for cached styles** in browser
- **Ensure modern experience** is enabled
- **Test on different browsers**

### Hub Site Issues
- **Apply theme to hub first**, then associated sites
- **Check hub site settings** for theme inheritance
- **Verify site association** is active

## Best Practices

### Theme Management
- ✅ **Test themes** in development environment first
- ✅ **Document customizations** for future reference
- ✅ **Regular backups** of theme configurations
- ✅ **User training** on new look and feel

### Maintenance
- 🔄 **Regular reviews** of theme effectiveness
- 🔄 **Update themes** when corporate branding changes
- 🔄 **Monitor user feedback** on usability
- 🔄 **Keep backup** of original themes

## Integration with Governance Portal

This theme works perfectly with:
- ✅ Native SharePoint HTML version (`governance-portal-native.html`)
- ✅ Custom CSS styles (`governance-portal-styles.css`)
- ✅ SharePoint lists and libraries
- ✅ Power Platform applications
- ✅ Microsoft 365 integration

## Support

### Common Issues
- **Theme not visible**: Check site permissions
- **Partial application**: Clear cache and wait
- **Color inconsistencies**: Verify JSON syntax
- **Mobile issues**: Test responsive behavior

### Getting Help
- Contact SharePoint administrator
- Check Microsoft 365 message center
- Review SharePoint service health
- Test in different browsers

---

**Installation time**: 5-10 minutes
**Technical requirements**: Site Owner permissions or higher
**Compatibility**: SharePoint Online modern experience

