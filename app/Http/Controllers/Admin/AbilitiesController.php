<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\AbilityRequest;
use App\Http\Resources\Admin\AbilityResource;
use App\Models\Ability;
use App\Models\Company;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class AbilitiesController extends Controller
{
    /**
     * Display the abilities management page.
     */
    public function index()
    {
        $user = Auth::user();
        $company = $user->activeCompany;
        
        if (!$company) {
            return redirect()->route('select-company.show');
        }
        
        $abilities = $company->abilities()
            ->search(request()->input('search'), ['key', 'label', 'description'])
            ->latest()
            ->paginate(12)
            ->withQueryString();
            
        $abilitiesCollection = AbilityResource::collection($abilities);

        return Inertia::render('Admin/Abilities/Index', [
            'abilities' => $abilitiesCollection,
        ]);
    }

    /**
     * Store a newly created ability.
     */
    public function store(AbilityRequest $request)
    {
        $user = Auth::user();
        $company = $user->activeCompany;
        
        $data = $request->validated();
        
        $ability = Ability::create([
            'company_id' => $company->id,
            'key' => $data['key'],
            'label' => $data['label'],
            'description' => $data['description'] ?? null,
        ]);

        return back()->with('success', 'Ability created successfully');
    }

    /**
     * Update the specified ability.
     */
    public function update(AbilityRequest $request, Ability $ability)
    {
        $data = $request->validated();
        
        $ability->update($data);

        return back()->with('success', 'Ability updated successfully');
    }

    /**
     * Remove the specified ability.
     */
    public function destroy(Ability $ability)
    {
        $user = Auth::user();
        $company = $user->activeCompany;
        
        if (!$company) {
            return back()->with('error', 'No active company found');
        }
        
        // Ensure the ability belongs to the current company
        if ($ability->company_id !== $company->id) {
            return back()->with('error', 'Unauthorized access to ability');
        }
        
        // Check if ability has users assigned
        if ($ability->users()->count() > 0) {
            return back()->with('error', 'Cannot delete ability with assigned users');
        }

        $ability->delete();

        return back()->with('success', 'Ability deleted successfully');
    }
}