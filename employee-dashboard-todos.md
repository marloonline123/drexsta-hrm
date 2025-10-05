# Employee Dashboard Implementation Todos

This file contains all the actionable todos for implementing the Employee Dashboard plan.

## Backend Changes
1. Create PaymentMethod model and migration (company_id, name, slug, description, is_active, soft deletes)
2. Create UserPaymentMethod model and migration (user_id, payment_method_id, custom_details JSON, is_active)
3. Add payment method permissions to PermissionRoleSetupService
4. Create PaymentMethodController with CRUD operations
5. Create PaymentMethodPolicy for access control
6. Update ProfileController to handle user payment method selection
7. Create MyDashboardController for employee specfic dashboard insights and inside show the main data any will see and data locked with permission like if department manager show stats about department and so on.
8. Create LoansController (UI only with mock data)
9. Create MyLeavesController (UI only)
10. Create MyAttendanceController (UI only)
11. Create MyPayrollController (UI only)
12. Update routes/web.php to add new employee routes

## Frontend Changes
13. create MyDashboard.tsx .
14. Create PaymentMethods.tsx component for profile tab
15. Create MyLoans.tsx page with loan request and tracking UI
16. Create MyLeaves.tsx page with leave history and balance UI
17. Create MyAttendance.tsx page with attendance records and summary UI
18. Create MyPayroll.tsx page with payslip history and breakdown UI
19. Create MyBonuses.tsx page for bonus history
20. Create MyPerformance.tsx page for performance reviews
21. Update NavItemsData.ts to add employee navigation items in HRM category
22. Update Profile/Info.tsx to integrate payment methods tab
23. Create resources/js/Components/Main/ directory for page components if needed
24. Create resources/js/Types/main.ts for type definitions

## Testing
25. Test navigation items display correctly for employees
26. Test permission access control for payment methods and pages
27. Test UI consistency and responsive design across new pages
28. Test data display with mock data and verify integration points