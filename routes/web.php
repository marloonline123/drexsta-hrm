<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\Admin\RolesController;

Route::get('/', function () {
    return Inertia::render('landing');
})->name('home');

Route::get('/pricing', function () {
    return Inertia::render('pricing');
})->name('pricing');

Route::get('/about', function () {
    return Inertia::render('about');
})->name('about');

Route::get('/contact', function () {
    return Inertia::render('contact');
})->name('contact');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', function () {
        return Inertia::render('simple-dashboard');
    })->name('dashboard');
    
    // Companies Management
    Route::get('companies', function () {
        return Inertia::render('companies');
    })->name('companies');
    
    // Billing & Subscriptions
    Route::get('billing', function () {
        return Inertia::render('billing');
    })->name('billing');
    
    Route::get('subscriptions', function () {
        return Inertia::render('subscriptions');
    })->name('subscriptions');
    
    // HRM Routes
    Route::prefix('hrm')->group(function () {
        Route::get('employees', function () {
            return Inertia::render('hrm/employees');
        })->name('hrm.employees');
        
        Route::get('departments', function () {
            return Inertia::render('hrm/departments');
        })->name('hrm.departments');
        
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
        Route::get('employment-types', function () {
            return Inertia::render('admin/employment-types');
        })->name('admin.employment-types');
        
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
