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
        $abilities = Ability::search(request()->input('search'), ['key', 'label', 'description'])
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
        $data = $request->validated();
        Ability::create($data);
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
        $ability->delete();
        return back()->with('success', 'Ability deleted successfully');
    }
}