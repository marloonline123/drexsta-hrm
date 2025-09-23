<?php

use App\Http\Controllers\Admin\ApprovalPolicyController;
use App\Http\Controllers\Admin\CompanyController;
use App\Http\Controllers\Admin\DepartmentController;
use App\Http\Controllers\Admin\Employee\EmployeeActionsController;
use App\Http\Controllers\Admin\Employee\EmployeeExcelController;
use App\Http\Controllers\Admin\Employee\EmployeesResourceController;
use App\Http\Controllers\Admin\Employee\UpdateEmployeePasswordController;
use App\Http\Controllers\Admin\EmploymentTypeController;
use App\Http\Controllers\Admin\JobPostingController as AdminJobPostingController;
use App\Http\Controllers\Admin\JobRequisitionController;
use App\Http\Controllers\Admin\JobTitleController;
use App\Http\Controllers\Admin\RolesController;
use App\Http\Controllers\JobPostingController;
use App\Http\Controllers\SelectCompanyController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::redirect('/', '/dashboard')->name('home');

Route::middleware(['auth', 'verified'])->group(function () {
    // Route::get('/dashboard', function () {
    //     return Inertia::render('dashboard');
    // })->name('dashboard');
    Route::prefix('dashboard')->name('dashboard.')->middleware('hasActiveCompany')->group(function () {

        // Main dashboard page
        Route::get('/', function () {
            return Inertia::render('dashboard');
        })->name('index');

        // Companies
        Route::resource('companies', CompanyController::class);
        
        // Departments
        Route::resource('departments', DepartmentController::class);

        // Employment Types
        Route::apiResource('employment-types', EmploymentTypeController::class);
        
        // Job Titles
        Route::apiResource('job-titles', JobTitleController::class);

        // Roles
        Route::get('roles/permissions', [RolesController::class, 'permissions'])->name('roles.permissions');
        Route::apiResource('roles', RolesController::class);
        
        // Approval Policies
        Route::get('approval-policies', [ApprovalPolicyController::class, 'index'])->name('approval-policies.index');
        Route::patch('approval-policies/{approvalPolicy}', [ApprovalPolicyController::class, 'update'])->name('approval-policies.update');
        
        // Job Requisitions
        Route::resource('job-requisitions', JobRequisitionController::class);
        
        // Job Postings
        Route::resource('job-postings', AdminJobPostingController::class);
        Route::patch('job-postings/{jobPosting}/status', [AdminJobPostingController::class, 'updateStatus'])->name('job-postings.update-status');
        
        // Employees
        Route::resource('employees', EmployeesResourceController::class);
        Route::patch('employees/{employee}/update-password', [UpdateEmployeePasswordController::class, 'updatePassword'])->name('employees.update-password');
        Route::get('employees/{employee}/assign-roles', [EmployeeActionsController::class, 'showAssignRoles'])->name('employees.assign-roles');
        Route::get('employees/{employee}/assign-abilities', [EmployeeActionsController::class, 'showAssignAbilities'])->name('employees.assign-abilities');
        Route::get('employees/{employee}/assign-departments', [EmployeeActionsController::class, 'showAssigndepartments'])->name('employees.assign-departments');
        Route::post('employees/{employee}/assign-roles', [EmployeeActionsController::class, 'assignRoles'])->name('employees.assign-roles.store');
        Route::post('employees/{employee}/assign-abilities', [EmployeeActionsController::class, 'assignAbilities'])->name('employees.assign-abilities.store');
        Route::post('employees/{employee}/assign-departments', [EmployeeActionsController::class, 'assigndepartments'])->name('employees.assign-departments.store');
        Route::get('employees/export', [EmployeeExcelController::class, 'export'])->name('employees.export');
        Route::post('employees/import', [EmployeeExcelController::class, 'import'])->name('employees.import');
    });

    Route::get('select-company', [SelectCompanyController::class, 'select'])->name('select-company.show');
    Route::post('select-company/{company}', [SelectCompanyController::class, 'save'])->name('select-company.save');
    
    // HRM Routes
    Route::prefix('hrm')->group(function () {
        Route::get('employees', function () {
            return Inertia::render('hrm/employees');
        })->name('hrm.employees');
        
        Route::get('attendance', function () {
            return Inertia::render('hrm/attendance');
        })->name('hrm.attendance');
        
        Route::get('payroll', function () {
            return Inertia::render('hrm/payroll');
        })->name('hrm.payroll');
        
        Route::get('leaves', function () {
            return Inertia::render('hrm/leaves');
        })->name('hrm.leaves');
        
        Route::get('banks', function () {
            return Inertia::render('hrm/banks');
        })->name('hrm.banks');
    });
    
    // Administration Routes
    Route::prefix('admin')->group(function () {
        Route::get('security', function () {
            return Inertia::render('admin/security');
        })->name('admin.security');
        
        Route::get('users', function () {
            return Inertia::render('admin/users');
        })->name('admin.users');
    });
});

// Public Job Postings Routes
Route::get('jobs/{company}', [JobPostingController::class, 'index'])->name('jobs.index');
Route::get('jobs/{company}/{jobPosting}', [JobPostingController::class, 'show'])->name('jobs.show');
Route::post('jobs/{company}/{jobPosting}/apply', [JobPostingController::class, 'apply'])->name('jobs.apply');
Route::get('applications/{company}/{token}/edit', [JobPostingController::class, 'editApplication'])->name('applications.edit');
Route::put('applications/{company}/{token}', [JobPostingController::class, 'updateApplication'])->name('applications.update');

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';