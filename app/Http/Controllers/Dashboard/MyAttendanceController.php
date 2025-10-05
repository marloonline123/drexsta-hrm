<?php

namespace App\Http\Controllers\Dashboard;

use App\Http\Controllers\BaseController;
use Illuminate\Http\Request;
use Inertia\Inertia;

class MyAttendanceController extends BaseController
{
    public function index(Request $request)
    {
        // Mock data for attendance
        $attendances = [
            [
                'id' => 1,
                'date' => now()->subDays(1),
                'clock_in' => '09:00',
                'clock_out' => '17:30',
                'hours_worked' => 8.5,
                'status' => 'present',
            ],
            [
                'id' => 2,
                'date' => now()->subDays(2),
                'clock_in' => '08:45',
                'clock_out' => '17:15',
                'hours_worked' => 8.5,
                'status' => 'present',
            ],
        ];

        $monthlySummary = [
            'total_hours' => 170,
            'total_days' => 20,
            'attendance_rate' => 95,
        ];

        return Inertia::render('Dashboard/Main/MyAttendance', [
            'attendances' => $attendances,
            'monthlySummary' => $monthlySummary,
        ]);
    }
}
