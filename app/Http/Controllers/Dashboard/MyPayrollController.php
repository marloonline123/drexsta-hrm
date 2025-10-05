<?php

namespace App\Http\Controllers\Dashboard;

use App\Http\Controllers\BaseController;
use Illuminate\Http\Request;
use Inertia\Inertia;

class MyPayrollController extends BaseController
{
    public function index(Request $request)
    {
        // Mock data for payslips
        $payslips = [
            [
                'id' => 1,
                'period' => 'September 2025',
                'gross_salary' => 5000,
                'net_salary' => 4200,
                'deductions' => 800,
                'bonuses' => 200,
                'payment_date' => now()->subDays(5),
                'payment_method' => 'Bank Transfer',
            ],
            [
                'id' => 2,
                'period' => 'August 2025',
                'gross_salary' => 5000,
                'net_salary' => 4150,
                'deductions' => 850,
                'bonuses' => 150,
                'payment_date' => now()->subDays(35),
                'payment_method' => 'Bank Transfer',
            ],
        ];

        return Inertia::render('Dashboard/Main/MyPayroll', [
            'payslips' => $payslips,
        ]);
    }
}
