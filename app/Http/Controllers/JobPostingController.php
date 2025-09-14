<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Http\Requests\JobApplicationRequest;
use App\Http\Resources\Admin\JobPostingResource;
use App\Models\JobApplication;
use App\Models\JobPosting;
use Illuminate\Http\Request;
use Inertia\Inertia;

class JobPostingController extends Controller
{
    /**
     * Display a listing of open job postings for candidates.
     */
    public function index()
    {
        $postings = JobPosting::open()
            ->with(['jobRequisition.department', 'jobRequisition.jobTitle', 'employmentType'])
            ->latest()
            ->paginate(10)
            ->withQueryString();

        return Inertia::render('JobPostings/Index', [
            'postings' => JobPostingResource::collection($postings),
        ]);
    }

    /**
     * Display the specified job posting for candidates.
     */
    public function show(JobPosting $jobPosting)
    {
        // Only show open job postings
        if ($jobPosting->status !== 'open') {
            abort(404);
        }

        $jobPosting->load(['jobRequisition.department', 'jobRequisition.jobTitle', 'employmentType']);

        return Inertia::render('JobPostings/Show', [
            'posting' => JobPostingResource::make($jobPosting)->resolve(),
        ]);
    }

    /**
     * Store a new job application.
     */
    public function apply(JobApplicationRequest $request, JobPosting $jobPosting)
    {
        // Only allow applications for open job postings
        if ($jobPosting->status !== 'open') {
            return redirect()->back()->with('error', 'This job posting is no longer accepting applications.');
        }

        // Check for duplicate applications
        $existingApplication = JobApplication::where('job_posting_id', $jobPosting->id)
            ->where('email', $request->email)
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

        return Inertia::render('JobPostings/EditApplication', [
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