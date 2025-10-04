<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Http\Requests\JobApplicationRequest;
use App\Http\Resources\JobPostingResource;
use App\Models\Company;
use App\Models\JobApplication;
use App\Models\JobPosting;
use Illuminate\Http\Request;
use Inertia\Inertia;

class JobPostingController extends Controller
{
    /**
     * Display a listing of open job postings for candidates.
     */
    public function index(Request $request, Company $company)
    {
        $query = $company->jobPostings()->open()
            ->with(['company', 'jobRequisition.department', 'jobRequisition.jobTitle', 'employmentType']);

        if ($request->filled('search')) {
            $query->where('title', 'like', '%' . $request->input('search') . '%');
        }

        if ($request->filled('department')) {
            $query->whereHas('jobRequisition', function ($q) use ($request) {
                $q->where('department_id', $request->input('department'));
            });
        }

        if ($request->filled('employment_type')) {
            $query->where('employment_type_id', $request->input('employment_type'));
        }

        $postings = $query->latest()->paginate(9)->withQueryString();

        return Inertia::render('Public/JobPostings/Index', [
            'postings' => JobPostingResource::collection($postings),
            'company' => $company,
            'departments' => $company->departments()->get(['id', 'name']),
            'employmentTypes' => \App\Models\EmploymentType::all(['id', 'name']),
            'filters' => $request->only(['search', 'department', 'employment_type']),
        ]);
    }

    /**
     * Display the specified job posting for candidates.
     */
    public function show(Company $company, JobPosting $jobPosting)
    {
        // Only show open job postings
        if ($jobPosting->status !== 'open') {
            abort(404);
        }

        $jobPosting->load(['company', 'jobRequisition.department', 'jobRequisition.jobTitle', 'employmentType']);

        return Inertia::render('Public/JobPostings/Show', [
            'posting' => JobPostingResource::make($jobPosting)->resolve(),
        ]);
    }

    /**
     * Store a new job application.
     */
    public function apply(Company $company, JobPosting $jobPosting)
    {
        return Inertia::render('Public/JobPostings/Apply', [
            'posting' => JobPostingResource::make($jobPosting)->resolve(),
            'company' => $company,
        ]);
    }

    /**
     * Store a new job application.
     */
    public function storeApplication(JobApplicationRequest $request, Company $company, JobPosting $jobPosting)
    {
        // Only allow applications for open job postings
        if ($jobPosting->status !== 'open') {
            return redirect()->back()->with('error', 'This job posting is no longer accepting applications.');
        }

        // Check for duplicate applications
        $validated = $request->validated();
        $existingApplication = JobApplication::where('job_posting_id', $jobPosting->id)
            ->where('email', $validated['email'])
            ->first();

        if ($existingApplication) {
            return redirect()->back()->with('error', 'You have already applied for this position. Please check your email for confirmation.');
        }

        // Store the application
        $application = JobApplication::create($request->validated() + [
            'company_id' => $jobPosting->company_id,
            'job_posting_id' => $jobPosting->id,
        ]);

        // Generate token for editing
        $application->generateToken();

        // TODO: Send confirmation email to candidate

        return redirect()->back()->with('success', 'Your application has been submitted successfully. A confirmation email has been sent to your email address.');
    }

    /**
     * Show the form for editing a job application.
     */
    public function editApplication(Request $request, $token)
    {
        $application = JobApplication::where('application_token', $token)
            ->where('token_expires_at', '>', now())
            ->firstOrFail();

        // Check if application can be edited
        if (!$application->canBeEdited()) {
            abort(403, 'This application cannot be edited.');
        }

        return Inertia::render('Public/JobPostings/EditApplication', [
            'application' => $application,
            'posting' => $application->jobPosting,
        ]);
    }

    /**
     * Update a job application.
     */
    public function updateApplication(JobApplicationRequest $request, $token)
    {
        $application = JobApplication::where('application_token', $token)
            ->where('token_expires_at', '>', now())
            ->firstOrFail();

        // Check if application can be edited
        if (!$application->canBeEdited()) {
            return redirect()->back()->with('error', 'This application cannot be edited.');
        }

        $application->update($request->validated());

        return redirect()->back()->with('success', 'Your application has been updated successfully.');
    }
}