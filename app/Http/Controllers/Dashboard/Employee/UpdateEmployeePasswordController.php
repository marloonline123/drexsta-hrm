<?php

namespace App\Http\Controllers\Dashboard\Employee;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rules\Password;
use App\Models\User;

class UpdateEmployeePasswordController extends Controller
{
    /**
     * handle the form for updating the password.
     */
    public function updatePassword(Request $request, User $employee)
    {
        $validated = $request->validate([
            'password' => ['required', Password::defaults(), 'confirmed'],
        ]);

        $employee->update([
            'password' => Hash::make($validated['password']),
        ]);

        return back()->with('success', 'Password updated successfully');
    }
}
