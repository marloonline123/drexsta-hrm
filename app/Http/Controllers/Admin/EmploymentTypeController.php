<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\EmploymentTypeRequest;
use App\Http\Resources\Admin\EmploymentTypeResource;
use App\Models\EmploymentType;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Validator;
use Illuminate\Validation\Rule;
use Inertia\Inertia;

class EmploymentTypeController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $user = Auth::user();
        $company = $user->activeCompany;
        
        $employmentTypes = EmploymentType::search($request->get('search'), ['name', 'description'])
            ->filterBy('is_active', $request->has('status') ? $request->get('status') === 'active' : null)
            ->latest()
            ->paginate(12)
            ->withQueryString() ?? [];

        $totalEmploymentTypes = $company?->employmentTypes()->count() ?? 0;
        $employmentTypesCollection = EmploymentTypeResource::collection($employmentTypes)
            ->additional(['meta' => ['total_employment_types' => $totalEmploymentTypes]]);

        Log::debug($employmentTypes);
        // For regular page loads, return Inertia response  
        return Inertia::render('Dashboard/EmploymentTypes/Index', [
            'employmentTypes' => $employmentTypesCollection ?? [],
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(EmploymentTypeRequest $request)
    {
        $data = $request->validated();
        $data['slug'] = generateSlug($data['name']);
        EmploymentType::create($data);

        return back()->with('success', 'Employment type created successfully');
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(EmploymentTypeRequest $request, EmploymentType $employmentType)
    {
        $data = $request->validated();
        $employmentType->update($data);

        return back()->with('success', 'Employment type updated successfully');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(EmploymentType $employmentType)
    {
        $employmentType->delete();

        return back()->with('success', 'Employment type deleted successfully');
    }
}
