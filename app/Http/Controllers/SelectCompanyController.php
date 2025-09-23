<?php

namespace App\Http\Controllers;

use App\Http\Resources\CompanyResource;
use App\Models\Company;
use Illuminate\Http\Request;

class SelectCompanyController extends Controller
{
    public function select()
    {
        $companies = request()->user()->companies()->with('jobTitles', 'users')->active(column: 'companies.is_active')->get();
        return inertia('SelectCompany', [
            'companies' => CompanyResource::collection($companies)->resolve(),
        ]);
    }

    public function save(Company $company)
    {
        $user = request()->user();
        $company->load('users');
        if (! $company->users->contains($user->id)) {
            abort(403);
        }

        $user->active_company_id = $company->id;
        $user->save();

        return redirect()->route('dashboard.index');
    }
}
