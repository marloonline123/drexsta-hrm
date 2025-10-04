<?php

namespace App\Http\Controllers\Dashboard;

use App\Enums\JobApplicationStatus;
use App\Http\Controllers\BaseController;
use App\Http\Resources\JobApplicationResource;
use App\Models\JobApplication;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;
use Inertia\Inertia;

class JobApplicationController extends BaseController
{
    /**
     * Display a listing of the job applications.
     */
    public function index()
    {
        $this->authorize('viewAny', JobApplication::class);
        $applications = JobApplication::with(['jobPosting', 'company'])
            ->where('company_id', request()->user()->active_company_id)
            ->latest()
            ->paginate(10);

        return Inertia::render('Dashboard/JobApplications/Index', [
            'applications' => JobApplicationResource::collection($applications),
        ]);
    }

    /**
     * Display the specified job application.
     */
    public function show(JobApplication $jobApplication)
    {
        $this->authorize('view', $jobApplication);
        $jobApplication->load(['jobPosting', 'company']);

        return Inertia::render('Dashboard/JobApplications/Show', [
            'application' => (new JobApplicationResource($jobApplication))->resolve(),
        ]);
    }

    /**
     * Update the specified job application in storage.
     */
    public function update(Request $request, JobApplication $jobApplication)
    {
        $this->authorize('update', $jobApplication);

        $request->validate([
            'status' => ['required', Rule::enum(JobApplicationStatus::class)],
        ]);

        $jobApplication->update($request->only(['status']));

        return redirect()->back()->with('success', 'Job application updated successfully.');
    }

    /**
     * Remove the specified job application from storage.
     */
    public function destroy(JobApplication $jobApplication)
    {
        $this->authorize('delete', $jobApplication);

        $jobApplication->delete();

        return redirect()->route('dashboard.job-applications.index')
            ->with('success', 'Job application deleted successfully.');
    }
}