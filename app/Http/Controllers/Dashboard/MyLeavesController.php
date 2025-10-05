<?php

namespace App\Http\Controllers\Dashboard;

use App\Http\Controllers\BaseController;
use Illuminate\Http\Request;
use Inertia\Inertia;

class MyLeavesController extends BaseController
{
    public function index(Request $request)
    {
        // Mock data for leaves
        $leaves = [
            [
                'id' => 1,
                'type' => 'annual',
                'start_date' => now()->subDays(10),
                'end_date' => now()->subDays(5),
                'days' => 6,
                'status' => 'approved',
                'reason' => 'Family vacation',
            ],
            [
                'id' => 2,
                'type' => 'sick',
                'start_date' => now()->addDays(5),
                'end_date' => now()->addDays(7),
                'days' => 3,
                'status' => 'pending',
                'reason' => 'Medical appointment',
            ],
        ];

        $leaveBalance = [
            'annual' => ['used' => 6, 'total' => 25],
            'sick' => ['used' => 2, 'total' => 10],
            'personal' => ['used' => 0, 'total' => 5],
        ];

        return Inertia::render('Dashboard/Main/MyLeaves', [
            'leaves' => $leaves,
            'leaveBalance' => $leaveBalance,
        ]);
    }
}
