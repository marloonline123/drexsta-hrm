<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\JobPostingRequest;
use App\Http\Resources\Admin\JobPostingResource;
use App\Http\Resources\Admin\JobRequisitionResource;
use App\Models\Company;
use App\Models\JobPosting;
use App\Models\JobRequisition;
use App\Services\Business\JobPostingService;
use Illuminate\Http\Request;
use Inertia\Inertia;

class JobPostingController extends Controller
{
    function __construct(protected JobPostingService $jobPostingService) {}

    /**
     * Display a listing of the job postings.
     */
    public function index()
    {
        $company = request()->user()->activeCompany();
        
        $postings = JobPosting::where('company_id', $company?->id)
            ->with(['jobRequisition.department', 'jobRequisition.jobTitle'])
            ->latest()
            ->paginate(10);

        return Inertia::render('Admin/JobPostings/Index', [
            'postings' => JobPostingResource::collection($postings),
        ]);
    }

    /**
     * Show the form for creating a new job posting.
     */
    public function create()
    {
        $company = request()->user()->activeCompany();
        $employmentTypes = $company?->employmentTypes()->active()->get();
        $requisitions = $company?->jobRequisitions()
            // ->where('status', 'approved')
            ->with(['department', 'jobTitle'])
            ->get();

        return Inertia::render('Admin/JobPostings/Create', [
            'requisitions' => JobRequisitionResource::collection($requisitions)->resolve(),
            'employmentTypes' => $employmentTypes
        ]);
    }

    /**
     * Store a newly created job posting in storage.
     */
    public function store(JobPostingRequest $request)
    {
        $data = $request->validated();
        $requisition = JobRequisition::findOrFail($data['job_requisition_id']);
        try {
            $this->jobPostingService->create($data, $requisition, $requisition->company);
            return redirect()->route('dashboard.job-postings.index')
                ->with('success', 'Job posting created successfully.');
        } catch (\Exception $e) {
            return redirect()->back()->with('error', $e->getMessage());
        }
    }

    /**
     * Display the specified job posting.
     */
    public function show(JobPosting $jobPosting)
    {
        $jobPosting->load(['jobRequisition.department', 'jobRequisition.jobTitle', 'jobRequisition.requester', 'company', 'employmentType']);
        
        return Inertia::render('Admin/JobPostings/Show', [
            'posting' => (new JobPostingResource($jobPosting))->resolve(),
        ]);
    }

    /**
     * Show the form for editing the specified job posting.
     */
    public function edit(JobPosting $jobPosting)
    {
        $jobPosting->load(['jobRequisition.department', 'jobRequisition.jobTitle', 'jobRequisition.requester', 'company']);
        $company = request()->user()->activeCompany();
        $employmentTypes = $company?->employmentTypes()->active()->get();
        
        $requisitions = JobRequisition::where('company_id', $company?->id)
            // ->where('status', 'approved')
            ->with(['department', 'jobTitle'])
            ->get();

        return Inertia::render('Admin/JobPostings/Edit', [
            'posting' => (new JobPostingResource($jobPosting))->resolve(),
            'requisitions' => $requisitions,
            'employmentTypes' => $employmentTypes
        ]);
    }

    /**
     * Update the specified job posting in storage.
     */
    public function update(JobPostingRequest $request, JobPosting $jobPosting)
    {
        $data = $request->validated();
        $jobPosting->update($data);

        return redirect()->back()->with('success', 'Job posting updated successfully.');
    }

    /**
     * Remove the specified job posting from storage.
     */
    public function destroy(JobPosting $jobPosting)
    {
        $jobPosting->delete();

        return redirect()->route('dashboard.job-postings.index')
            ->with('success', 'Job posting deleted successfully.');
    }

    /**
     * Update the status of the job posting.
     */
    public function updateStatus(Request $request, JobPosting $jobPosting)
    {
        $request->validate([
            'status' => 'required|in:draft,open,closed',
        ]);

        $jobPosting->update(['status' => $request->status]);

        return redirect()->back()->with('success', 'Job posting status updated successfully.');
    }
}