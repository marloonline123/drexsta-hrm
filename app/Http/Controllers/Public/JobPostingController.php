<?php

namespace App\Http\Controllers\Public;

use App\Enums\JobApplicationStatus;
use App\Http\Controllers\BaseController;
use App\Http\Requests\JobApplicationRequest;
use App\Http\Resources\JobPostingResource;
use App\Models\Company;
use App\Models\JobApplication;
use App\Models\JobPosting;
use App\Services\Shared\FileService;
use Illuminate\Http\Request;
use Inertia\Inertia;

class JobPostingController extends BaseController
{

    public function __construct(private FileService $fileService) {}
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
     * Show the application success page.
     */
    public function applicationSuccess(Company $company, JobPosting $jobPosting, string $applicationNumber)
    {
        return Inertia::render('Public/JobPostings/ApplicationSuccess', [
            'posting' => JobPostingResource::make($jobPosting)->resolve(),
            'company' => $company,
            'applicationNumber' => $applicationNumber,
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

        if (JobApplication::whereDate('created_at', today())->count() >= 9999) {
            return redirect()->back()->with('error', 'Application Limit Reached Try again tomorrow');
        }

        // Check for duplicate applications
        $validated = $request->validated();
        $existingApplication = JobApplication::where('job_posting_id', $jobPosting->id)
            ->where('email', $validated['email'])
            ->first();

        if ($existingApplication) {
            return redirect()->back()->with('error', 'You have already applied for this position. Please check your email for confirmation.');
        }

        if ($request->has('resume_file')) {
            $validated['resume_path'] = $this->fileService->storeFile($request->file('resume_file'), $company->id, 'job-applications/resumes');
        }

        // Store the application
        $application = JobApplication::create($validated + [
            'company_id' => $jobPosting->company_id,
            'job_posting_id' => $jobPosting->id,
            'status' => JobApplicationStatus::APPLIED,
            'number' => $this->generateJobApplicationNumber($jobPosting)
        ]);

        // Generate token for editing
        $application->generateToken();

        // TODO: Send confirmation email to candidate

        return redirect()->route('jobs.apply.success', [
            'company' => $company->slug,
            'jobPosting' => $jobPosting->slug,
            'applicationNumber' => $application->number
        ]);
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

    private function generateJobApplicationNumber(JobPosting $jobPosting): string
    {
        $prefix = 'CMP_' . $jobPosting->company_id . '_' . now()->format('Ymd') . '_Job-';
        $lastJobApplication = JobApplication::where('number', 'like', $prefix . '%')
            ->orderBy('id', 'desc')
            ->first();

        if ($lastJobApplication) {
            $lastJobApplicationNumber = str_replace($prefix, '', $lastJobApplication->number);
            $newNumber = $lastJobApplicationNumber + 1;
        } else {
            $newNumber = 1;
        }

        return $prefix . str_pad($newNumber, 4, '0', STR_PAD_LEFT);
    }
}