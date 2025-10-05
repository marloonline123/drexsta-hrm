<?php

namespace App\Http\Controllers\Dashboard;

use App\Http\Controllers\BaseController;
use Illuminate\Http\Request;
use Inertia\Inertia;

class MyLoansController extends BaseController
{
    public function index(Request $request)
    {
        // Mock data for loans
        $loans = [
            [
                'id' => 1,
                'amount' => 5000,
                'remaining_amount' => 3000,
                'monthly_payment' => 500,
                'status' => 'active',
                'created_at' => now()->subMonths(3),
                'next_payment_date' => now()->addDays(15),
            ],
            [
                'id' => 2,
                'amount' => 2000,
                'remaining_amount' => 0,
                'monthly_payment' => 200,
                'status' => 'completed',
                'created_at' => now()->subMonths(6),
                'next_payment_date' => null,
            ],
        ];

        return Inertia::render('Dashboard/Main/MyLoans', [
            'loans' => $loans,
        ]);
    }
}
