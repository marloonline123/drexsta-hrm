<?php

namespace App\Http\Controllers\Admin;

use App\Events\JobRequisitionCreated;
use App\Http\Controllers\Controller;
use App\Http\Requests\JobRequisitionRequest;
use App\Http\Resources\JobRequisitionResource;
use App\Models\Department;
use App\Models\JobRequisition;
use App\Models\JobTitle;
use Inertia\Inertia;

class JobRequisitionController extends Controller
{
    /**
     * Display a listing of the job requisitions.
     */
    public function index()
    {
        $requisitions = JobRequisition::with(['department', 'jobTitle', 'requester'])
            ->latest()
            ->paginate(10);

        $departments = Department::all();
        $jobTitles = JobTitle::all();

        return Inertia::render('Dashboard/JobRequisitions/Index', [
            'requisitions' => JobRequisitionResource::collection($requisitions),
            'departments' => $departments,
            'jobTitles' => $jobTitles,
        ]);
    }

    /**
     * Show the form for creating a new job requisition.
     */
    public function create()
    {
        $company = request()->user()->activeCompany;
        
        $departments = Department::all();
        $jobTitles = JobTitle::all();

        return Inertia::render('Dashboard/JobRequisitions/Create', [
            'departments' => $departments,
            'jobTitles' => $jobTitles,
            'employmentTypes' => $company?->employmentTypes,
        ]);
    }

    /**
     * Store a newly created job requisition in storage.
     */
    public function store(JobRequisitionRequest $request)
    {
        $data = $request->validated();
        $requisition = JobRequisition::create($data + [
            'requisition_code' => $this->generateRequisitionCode(),
            'requested_by' => request()->user()->id
        ]);

        event(new JobRequisitionCreated($requisition));

        return redirect()->route('dashboard.job-requisitions.index')
            ->with('success', 'Job requisition created successfully.');
    }

    /**
     * Display the specified job requisition.
     */
    public function show(JobRequisition $jobRequisition)
    {
        // $this->authorize('view', $jobRequisition);
        $jobRequisition->load(['department', 'jobTitle', 'requester', 'company', 'employmentType']);
        
        return Inertia::render('Dashboard/JobRequisitions/Show', [
            'requisition' => (new JobRequisitionResource($jobRequisition))->resolve(),
        ]);
    }

    /**
     * Show the form for editing the specified job requisition.
     */
    public function edit(JobRequisition $jobRequisition)
    {
        // $this->authorize('update', $jobRequisition);
        $jobRequisition->load(['department', 'jobTitle', 'requester', 'company', 'employmentType']);
        $company = request()->user()->activeCompany;
        
        $departments = Department::all();
        $jobTitles = JobTitle::all();

        return Inertia::render('Dashboard/JobRequisitions/Edit', [
            'requisition' => (new JobRequisitionResource($jobRequisition))->resolve(),
            'departments' => $departments,
            'jobTitles' => $jobTitles,
            'employmentTypes' => $company?->employmentTypes,
        ]);
    }

    /**
     * Update the specified job requisition in storage.
     */
    public function update(JobRequisitionRequest $request, JobRequisition $jobRequisition)
    {
        // $this->authorize('update', $jobRequisition);
        $data = $request->validated();
        $jobRequisition->update($data);

        return redirect()->back()->with('success', 'Job requisition updated successfully.');
    }

    /**
     * Remove the specified job requisition from storage.
     */
    public function destroy(JobRequisition $jobRequisition)
    {
        // $this->authorize('delete', $jobRequisition);
        
        $jobRequisition->delete();

        return redirect()->route('dashboard.job-requisitions.index')
            ->with('success', 'Job requisition deleted successfully.');
    }

    /**
     * Generate a unique requisition code.
     */
    private function generateRequisitionCode(): string
    {
        $companyId = request()->user()->active_company_id;
        $prefix = 'JR_' . 'CMPID' . '-' . $companyId . '_' . now()->format('Y-m-d') . '_';
        $lastRequisition = JobRequisition::where('requisition_code', 'like', $prefix . '%')
            ->orderBy('id', 'desc')
            ->first();

        if ($lastRequisition) {
            $lastNumber = (int) str_replace($prefix . '_', '', $lastRequisition->requisition_code);
            $newNumber = $lastNumber + 1;
        } else {
            $newNumber = 1;
        }

        return $prefix . '_' . str_pad($newNumber, 4, '0', STR_PAD_LEFT);
    }
}