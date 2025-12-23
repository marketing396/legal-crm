# Database Management Guide

## Overview

You have three ways to manage your CRM database:

1. **Built-in Database UI** (Easiest - via Management Panel)
2. **SQL Queries** (Advanced - direct database access)
3. **Admin Interface** (Coming soon - custom management tools)

---

## Option 1: Built-in Database UI (Recommended)

The Manus platform provides a built-in database management interface accessible from the Management UI.

### Accessing the Database UI

1. Open your CRM application
2. Click the **hamburger menu** icon (☰) in the top-right corner
3. Select **"Database"** from the management panel
4. You'll see a full CRUD interface for all tables

### What You Can Do

**View Data**
- Browse all enquiries, payments, and users
- Search and filter records
- Sort by any column

**Edit Records**
- Click any row to edit
- Modify field values directly
- Save changes instantly

**Delete Records**
- Select one or more rows
- Click delete button
- Confirm deletion

**Export Data**
- Select records to export
- Download as CSV or JSON
- Import into Excel or other tools

**Database Connection Info**
- Click the settings icon (⚙️) in bottom-left of Database panel
- Copy connection string for external tools
- **Important**: Enable SSL when connecting externally

### Common Tasks

**Remove All Enquiries**
1. Go to Database → enquiries table
2. Select all rows (checkbox in header)
3. Click "Delete Selected"
4. Confirm deletion

**Export All Client Details**
1. Go to Database → enquiries table
2. Select all rows or apply filters
3. Click "Export" button
4. Choose CSV format
5. Open in Excel

**Find Specific Records**
1. Use the search box at top of table
2. Or click column headers to sort
3. Or use filter dropdown for specific values

---

## Option 2: Direct SQL Access (Advanced)

For advanced operations, you can execute SQL queries directly.

### Using the Built-in SQL Executor

The system includes a SQL execution tool for admin users.

**Example: Delete All Enquiries**
```sql
DELETE FROM enquiries;
```

**Example: Export All Client Details**
```sql
SELECT 
  enquiryId,
  clientName,
  email,
  phoneNumber,
  serviceRequested,
  currentStatus,
  dateOfEnquiry
FROM enquiries
ORDER BY dateOfEnquiry DESC;
```

**Example: Find Converted Clients**
```sql
SELECT * FROM enquiries 
WHERE currentStatus = 'Converted'
ORDER BY conversionDate DESC;
```

**Example: Get Revenue Summary**
```sql
SELECT 
  COUNT(*) as total_converted,
  SUM(CAST(proposalValue AS DECIMAL(10,2))) as total_revenue
FROM enquiries 
WHERE currentStatus = 'Converted';
```

### External Database Tools

You can connect external tools like MySQL Workbench, TablePlus, or DBeaver.

**Connection Details** (from Database panel settings):
- Host: [provided in settings]
- Port: 3306
- Database: [your database name]
- Username: [provided in settings]
- Password: [provided in settings]
- **SSL**: Required (enable SSL/TLS)

---

## Option 3: Admin Management Interface (In Development)

I'm adding a custom admin interface with these features:

### Bulk Operations
- Delete multiple enquiries at once
- Bulk status updates
- Mass email notifications

### Data Export
- One-click export to Excel
- Custom report generation
- Filtered exports by date range, status, etc.

### Database Maintenance
- Clear test data
- Archive old enquiries
- Database backup/restore

This will be ready shortly and accessible only to admin users.

---

## Email Notifications

### Current Setup

The system uses the Manus built-in notification API to notify the project owner.

### Customizing Lawyer Notifications

To add email notifications when lawyers are assigned, you'll need:

1. **Lawyer Email Addresses**: Store lawyer emails in the system
2. **Email Service**: Configure an email provider (SendGrid, AWS SES, etc.)
3. **Notification Triggers**: Automatic emails when:
   - Lawyer is assigned to an enquiry
   - Status changes to specific values
   - Deadlines are approaching
   - Follow-ups are overdue

I can implement this with:
- **Option A**: Use a third-party email service (requires API key)
- **Option B**: Use Manus built-in notification system (notifies via Manus app)

Let me know which approach you prefer, and I'll implement it.

---

## Security Best Practices

### Access Control

**Admin Users**
- Full database access
- Can delete records
- Can export all data
- Can modify any enquiry

**Regular Users**
- Can view and create enquiries
- Can edit their own enquiries
- Cannot delete records
- Limited export capabilities

### Data Protection

1. **Regular Backups**: Use the Database UI to export data regularly
2. **Test Before Delete**: Always filter and preview before bulk deletes
3. **Audit Trail**: Consider adding a "deleted_at" field instead of hard deletes
4. **SSL Required**: Always use SSL for external database connections

---

## Quick Reference: Common SQL Queries

### View All Enquiries
```sql
SELECT * FROM enquiries ORDER BY createdAt DESC;
```

### Count by Status
```sql
SELECT currentStatus, COUNT(*) as count 
FROM enquiries 
GROUP BY currentStatus;
```

### Find Overdue Follow-ups
```sql
SELECT * FROM enquiries 
WHERE deadline < CURDATE() 
AND currentStatus NOT IN ('Converted', 'Declined');
```

### Delete Test Data
```sql
DELETE FROM enquiries 
WHERE clientName LIKE '%Test%';
```

### Get This Month's Enquiries
```sql
SELECT * FROM enquiries 
WHERE MONTH(dateOfEnquiry) = MONTH(CURDATE())
AND YEAR(dateOfEnquiry) = YEAR(CURDATE());
```

### Export Payment Summary
```sql
SELECT 
  e.enquiryId,
  e.clientName,
  e.matterCode,
  p.totalAmount,
  p.amountPaid,
  p.paymentStatus
FROM enquiries e
LEFT JOIN payments p ON e.id = p.enquiryId
WHERE e.currentStatus = 'Converted';
```

---

## Need Help?

- **Database UI Issues**: Check the Management Panel → Database section
- **SQL Questions**: Refer to MySQL documentation
- **Custom Features**: Let me know what you need, and I'll implement it
- **Connection Problems**: Verify SSL is enabled and credentials are correct

---

**Next Steps**: Would you like me to implement the admin management interface with bulk operations and email notifications now?
