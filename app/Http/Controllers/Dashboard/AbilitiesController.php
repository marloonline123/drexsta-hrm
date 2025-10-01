<?php

namespace App\Http\Controllers\Dashboard;

use App\Http\Controllers\BaseController;
use App\Http\Requests\AbilityRequest;
use App\Http\Resources\AbilityResource;
use App\Models\Ability;
use Inertia\Inertia;

class AbilitiesController extends BaseController
{
    /**
     * Display the abilities management page.
     */
    public function index()
    {
        $this->authorize('viewAny', Ability::class);
        $abilities = Ability::search(request()->input('search'), ['key', 'label', 'description'])
            ->latest()
            ->paginate(12)
            ->withQueryString();

        $abilitiesCollection = AbilityResource::collection($abilities);

        return Inertia::render('Dashboard/Abilities/Index', [
            'abilities' => $abilitiesCollection,
        ]);
    }

    /**
     * Store a newly created ability.
     */
    public function store(AbilityRequest $request)
    {
        $this->authorize('create', Ability::class);
        $data = $request->validated();
        Ability::create($data);
        return back()->with('success', 'Ability created successfully');
    }

    /**
     * Update the specified ability.
     */
    public function update(AbilityRequest $request, Ability $ability)
    {
        $this->authorize('update', $ability);
        $data = $request->validated();
        $ability->update($data);
        return back()->with('success', 'Ability updated successfully');
    }

    /**
     * Remove the specified ability.
     */
    public function destroy(Ability $ability)
    {
        $this->authorize('delete', $ability);
        $ability->delete();
        return back()->with('success', 'Ability deleted successfully');
    }
}