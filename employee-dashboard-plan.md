# Employee Dashboard Implementation Plan

## Overview
This plan outlines the comprehensive implementation of employee-specific features for the HRM system. In addition to modifying the dashboard for role-based content, new pages and features will be added to provide employees with full access to their personal HRM data. The system will include payment methods management, loans tracking, and dedicated pages for viewing personal records.

## Current State Analysis
- **Existing Dashboard**: Shows company-wide statistics for managers, needs employee personalization
- **Navigation**: Role-based access via permissions
- **Architecture**: Laravel + Inertia.js + React with permission-based UI
- **Existing Features**: Attendance, Leaves, Payroll, Bonuses, Fines, Loans, Payslips, Performance Reviews

## Employee Dashboard Features

### 1. Personal Statistics Cards (4 cards)
- **Today's Attendance**: Clock-in time, hours worked today, attendance status
- **Leave Balance**: Available leave days, used this year, pending requests
- **Monthly Hours**: Total hours worked this month
- **Next Payslip**: Date and amount of latest payslip

### 2. Quick Actions (Employee-focused)
- **Clock In/Out**: Links to personal attendance page
- **Request Leave**: Links to leave request form
- **View Profile**: Links to enhanced profile with payment methods
- **View Payslip**: Links to salary payment records
- **Request Loan**: Links to loans management
- **View Loans**: Links to loans tracking

### 3. Recent Activities (Personal)
- Clock in/out events
- Leave request submissions and approvals
- Payslip issuances
- Loan approvals/rejections
- Personal notifications

### 4. Performance Overview (Personal metrics)
- Attendance rate for the month
- Leave utilization
- Salary progression
- Performance review scores

## New Employee Pages

as i said this:
- **System Methods**: Predefined payment methods (Bank Transfer, Check, Cash, etc.)

is for admin or someone with the permission to do the crud on them.

### 1. Payment Methods Management (Admin)
- **CRUD Operations**: Create, read, update, delete payment methods (admin only)
- **System Methods**: Predefined payment methods (Bank Transfer, Check, Cash, etc.)
- **Permissions**: New permissions for payment methods management
- **Database**: New migration for payment methods (company_id, name, slug, description, is_active, softDelete)
- **UI**: Admin interface for managing payment methods

### 1b. Employee Payment Method Selection (Profile Tab)
- **Selection**: Employees choose from predefined payment methods
- **Custom Option**: "Other" option allows employees to add custom payment details
- **Database**: User payment preferences table (user_id, payment_method_id, custom_details JSON)
- **UI**: Integrated into profile page as new tab


### 2. Loans Management Page
- **Request Loan**: Form to submit loan requests
- **Track Loans**: View all personal loans with status, amounts, payments
- **Loan History**: Past and current loans
- **Mock Data**: UI implementation with sample data, routes without backend logic

### 3. My Leaves Records Page
- **Leave History**: All leave requests with status, dates, approvals
- **Leave Balance**: Current balance by leave type
- **Upcoming Leaves**: Scheduled leaves
- **UI Only**: Frontend implementation, route setup

### 4. My Attendance Records Page
- **Daily Attendance**: Clock in/out times, hours worked
- **Monthly Summary**: Total hours, attendance rate
- **Attendance Trends**: Charts and statistics
- **UI Only**: Frontend implementation, route setup

### 5. My Salary Payment Records Page
- **Payslip History**: All payslips with download links
- **Salary Breakdown**: Base salary, bonuses, deductions
- **Payment Methods**: Linked payment methods used
- **UI Only**: Frontend implementation, route setup

### Additional Pages (Based on Existing Features)
- **My Bonuses Page**: View bonus history and details
- **My Fines/Deductions Page**: Track disciplinary actions and fines
- **My Performance Reviews Page**: View review history and feedback
- **My Conversations Page**: Access personal messages and announcements

## Navigation Updates

### Sidebar Additions (HRM Category)
- **My Dasboard**: `/dashboard`
- **My Attendance**: `/dashboard/my-attendance`
- **My Leaves**: `/dashboard/my-leaves`
- **My Payroll**: `/dashboard/my-payroll`
- **My Loans**: `/dashboard/my-loans`
- **My Bonuses**: `/dashboard/my-bonuses`
- **My Performance**: `/dashboard/my-performance`

### Profile Enhancements
- **Payment Methods Tab**: Integrated into existing profile page
- **Additional Tabs**: Potentially for personal settings, notifications

## Data Sources

### Models Used
- **Attendances**: Personal attendance records
- **Leaves**: Personal leave requests and balances
- **Payslips**: Salary payment records
- **Loans**: Loan requests and tracking
- **Bonuses**: Bonus records
- **Fines**: Deduction records
- **PerformanceReviews**: Review data
- **PaymentMethods**: New model for payment methods
- **UserPaymentMethods**: New model for user payment preferences

### New Models Required
- **PaymentMethod**: company_id, name, slug, description, is_active, soft deletes
- **UserPaymentMethod**: user_id, payment_method_id, custom_details (JSON), is_active

## Implementation Approach

### Backend Changes
1. **Create DashboardController**
   - Handle role-based dashboard data
   - Fetch personal vs company statistics

2. **Payment Methods System**
   - Create PaymentMethod model and migration
   - Create UserPaymentMethod model and migration
   - Add permissions to PermissionRoleSetupService
   - Create PaymentMethodController with CRUD
   - Create PaymentMethodPolicy
   - Update ProfileController for user payment methods

3. **New Controllers**
   - LoansController (UI only with mock data)
   - MyLeavesController (UI only)
   - MyAttendanceController (UI only)
   - MyPayrollController (UI only)

4. **Update Routes**
   - Add new routes for employee pages
   - Update dashboard route to use controller

### Frontend Changes
1. **Dashboard Modifications**
   - Role-based content rendering
   - Personal statistics and actions

2. **New Pages**
   - Payment methods management in profile
   - Loans management page
   - Personal records pages (leaves, attendance, payroll)

3. **Navigation Updates**
   - Add new sidebar items for employees
   - Update NavItemsData.ts

### Permission Logic
- **Employee Pages**: Accessible to all authenticated users (no permission locks)
- **Payment Methods**: CRUD permissions for admins, read/create for employees
- **Dashboard**: Content based on user permissions

## File Structure Changes

### New Files
- `app/Http/Controllers/DashboardController.php`
- `app/Http/Controllers/PaymentMethodController.php`
- `app/Http/Controllers/LoansController.php`
- `app/Http/Controllers/MyLeavesController.php`
- `app/Http/Controllers/MyAttendanceController.php`
- `app/Http/Controllers/MyPayrollController.php`
- `app/Models/PaymentMethod.php`
- `app/Models/UserPaymentMethod.php`
- `app/Policies/PaymentMethodPolicy.php`
- `database/migrations/XXXX_XX_XX_create_payment_methods_table.php`
- `database/migrations/XXXX_XX_XX_create_user_payment_methods_table.php`
- `resources/js/Pages/Profile/PaymentMethods.tsx`
- `resources/js/Pages/Main/MyLoans.tsx`
- `resources/js/Pages/Main/MyLeaves.tsx`
- `resources/js/Pages/Main/MyAttendance.tsx`
- `resources/js/Pages/Main/MyPayroll.tsx`
- `resources/js/Pages/Main/MyBonuses.tsx`
- `resources/js/Pages/Main/MyPerformance.tsx`
- `resources/js/Components/Main/` (directory for page components)
- `resources/js/Types/main.ts` (types for main pages)

### Modified Files
- `routes/web.php`: Add new routes
- `resources/js/Pages/dashboard.tsx`: Role-based rendering
- `resources/js/Pages/Profile/Info.tsx`: Add payment methods tab
- `resources/js/Const/NavItemsData.ts`: Add employee navigation items
- `app/Services/Business/CompanySetup/PermissionRoleSetupService.php`: Add payment method permissions

## Testing Strategy
1. **Navigation Testing**: Verify sidebar shows correct items for employees
2. **Permission Testing**: Ensure proper access control
3. **UI Consistency**: Maintain design system across new pages
4. **Data Display**: Verify mock data and real data integration
5. **Responsive Design**: Test on different screen sizes

## Implementation Steps
1. Implement payment methods system (backend + frontend)
2. Create employee pages with UI and routes
3. Update dashboard for role-based content
4. Add navigation items
5. Test and refine all features

This expanded plan provides employees with comprehensive access to their HRM data while maintaining the existing manager functionality.