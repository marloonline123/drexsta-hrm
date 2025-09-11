<?php

use App\Http\Controllers\Admin\CompanyController;
use App\Http\Controllers\Admin\DepartmentController;
use App\Http\Controllers\Admin\EmploymentTypeController;
use App\Http\Controllers\Admin\JobTitleController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\Admin\RolesController;

Route::redirect('/', '/dashboard')->name('home');

Route::middleware(['auth', 'verified'])->group(function () {
    // Route::get('/dashboard', function () {
    //     return Inertia::render('dashboard');
    // })->name('dashboard');
    Route::prefix('dashboard')->name('dashboard.')->group(function () {

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
    });
    
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
        
        Route::get('roles', [RolesController::class, 'index'])->name('admin.roles');
        Route::post('roles', [RolesController::class, 'store'])->name('admin.roles.store');
        Route::put('roles/{id}', [RolesController::class, 'update'])->name('admin.roles.update');
        Route::delete('roles/{id}', [RolesController::class, 'destroy'])->name('admin.roles.destroy');
        Route::get('roles/permissions', [RolesController::class, 'permissions'])->name('admin.roles.permissions');
        
        Route::get('users', function () {
            return Inertia::render('admin/users');
        })->name('admin.users');
    });
});

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';