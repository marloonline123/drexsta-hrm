<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\BaseControlller;
use App\Http\Controllers\Controller;
use App\Http\Requests\ApprovalPolicyRequest;
use App\Http\Resources\Admin\ApprovalPolicyResource;
use App\Models\Ability;
use App\Models\ApprovalPolicy;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ApprovalPolicyController extends BaseControlller
{
    /**
     * Display a listing of the approval policies.
     */
    public function index()
    {
        $company = request()->user()->activeCompany();
        
        $policies = $company?->approvalPolicies()
            ->with('company')
            ->latest()
            ->get();

        $abilities = $company?->abilities()->get();

        return Inertia::render('Admin/ApprovalPolicies/Index', [
            'policies' => ApprovalPolicyResource::collection($policies)->resolve(),
            'abilities' => $abilities,
        ]);
    }

    /**
     * Update the specified approval policy in storage.
     */
    public function update(ApprovalPolicyRequest $request, ApprovalPolicy $approvalPolicy)
    {
        // $this->authorize('update', $approvalPolicy);
        $data = $request->validated();
        $approvalPolicy->update([
            'steps' => $data['steps'],
        ]);

        return redirect()->back()->with('success', 'Approval policy updated successfully.');
    }
}