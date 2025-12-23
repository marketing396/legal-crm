# Client Enquiry CRM System - TODO

## Core Features
- [x] Database schema with enquiries, payments, and user tables
- [x] Auto-generated Enquiry IDs (ENQ-0001 format)
- [x] Auto-generated Matter Codes (MAT-2025-001 format)
- [x] Enquiry Log with 40 fields
- [x] Dropdown lists for data consistency
- [x] Status Tracker dashboard
- [x] KPI Dashboard
- [x] Payment Tracker
- [x] Pipeline Forecast
- [x] Conditional formatting and color coding
- [x] Multi-user access with role-based permissions
- [x] Authentication and authorization

## Implementation Tasks
- [x] Design and implement database schema
- [x] Create backend API endpoints for enquiries
- [x] Create backend API endpoints for payments
- [x] Build enquiry list view with filters
- [x] Build enquiry creation form
- [x] Build enquiry edit form
- [x] Implement auto-ID generation logic
- [x] Build Status Tracker dashboard
- [x] Build KPI Dashboard
- [x] Build Payment Tracker interface
- [x] Build Pipeline Forecast dashboard
- [x] Add role-based access control
- [x] Test all features
- [x] Create user documentation

## New Feature Requests

- [ ] Email notification system for lawyer assignments
- [ ] Admin database management interface
- [ ] Bulk delete functionality for enquiries
- [ ] Export client details to CSV/Excel
- [ ] Database backup and restore functionality

## User Management Dashboard (In Progress)

- [x] Add user activity tracking to schema
- [x] Create backend API for user management
- [x] Build User Management dashboard page
- [x] Display all registered users
- [x] Show user roles (Admin/User)
- [x] Display last login dates
- [x] Show user activity metrics
- [x] Display email addresses
- [x] Show account status
- [x] Add role change functionality (admin only)

## Email Notifications for Lawyer Assignments

- [x] Add email notification preferences to user schema
- [x] Create email template for lawyer assignment notifications
- [x] Implement email sending service integration (both Manus and third-party)
- [ ] Add notification settings page for users
- [ ] Trigger email when lawyer is assigned to enquiry
- [ ] Add email notification history tracking

## Advanced Filtering & Bulk Operations

- [x] Add date range filter to Enquiry Log
- [x] Add status filter to Enquiry Log
- [ ] Add lawyer filter to Enquiry Log
- [x] Add service type filter to Enquiry Log
- [x] Add urgency level filter to Enquiry Log
- [x] Implement bulk select functionality
- [x] Add bulk delete operation
- [ ] Add bulk status update operation
- [ ] Add bulk lawyer assignment operation
- [x] Add export filtered results to Excel/CSV

## Activity Audit Log

- [x] Create audit log database schema
- [x] Track enquiry creation events
- [ ] Track enquiry modification events
- [ ] Track enquiry deletion events
- [x] Track user who made changes
- [ ] Display audit log in enquiry details
- [x] Add audit log search and filtering
- [x] Show change history with timestamps
- [ ] Add audit log export functionality
