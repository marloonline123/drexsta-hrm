<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\JobTitleRequest;
use App\Http\Resources\Admin\JobTitleResource;
use App\Models\JobTitle;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;
use Inertia\Inertia;

class JobTitleController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $user = Auth::user();
        $company = $user->activeCompany();
        
        $jobTitles = $company?->jobTitles()
            ->search($request->get('search'), ['title', 'description'])
            ->filterBy('is_active', $request->has('status') ? $request->get('status') === 'active' : null)
            ->latest()
            ->paginate(12)
            ->withQueryString() ?? [];

        $totalJobTitles = $company?->jobTitles()->count() ?? 0;
        $jobTitlesCollection = JobTitleResource::collection($jobTitles)
            ->additional(['meta' => ['total_job_titles' => $totalJobTitles]]);

        Log::debug($jobTitles);
        // For regular page loads, return Inertia response  
        return Inertia::render('Admin/JobTitles/Index', [
            'jobTitles' => $jobTitlesCollection ?? [],
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(JobTitleRequest $request)
    {
        $user = Auth::user();
        $data = $request->validated();
        $data['company_id'] = $user->active_company_id;
        $data['slug'] = generateSlug($data['title']);
        JobTitle::create($data);

        return back()->with('success', 'Job title created successfully');
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(JobTitleRequest $request, JobTitle $jobTitle)
    {
        $data = $request->validated();
        $jobTitle->update($data);

        return back()->with('success', 'Job title updated successfully');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(JobTitle $jobTitle)
    {
        $jobTitle->delete();

        return back()->with('success', 'Job title deleted successfully');
    }
}