<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\CompanyRequest;
use App\Http\Resources\Admin\CompanyResource;
use App\Models\Company;
use App\Services\Shared\FileService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Response;

class CompanyController extends Controller
{
    public function __construct(protected FileService $fileService) {}

    /**
     * Display a listing of the companies.
     *
     * @return \Inertia\Response
     */
    public function index(): Response
    {
        $user = Auth::user();
        $companies = $user->ownedCompanies()
            ->with('users')
            ->search(request('search'), ['name', 'industry', 'email', 'phone'])
            ->filterBy('companies.is_active', request()->has('status') ? request('status') === 'active' : null)
            ->latest()
            ->paginate(12)
            ->withQueryString();

        $employeesCount = $user->companies()
            ->withCount(['nonOwnerUsers'])
            ->get()
            ->sum('non_owner_users_count');

        $companies = CompanyResource::collection($companies)->additional(['meta' => ['employees_count' => $employeesCount]]);
        // $companies['meta']['employees_count'] = $employeesCount;
        return inertia()->render('Admin/Companies/Index', [
            'companies' => $companies,
        ]);
    }

    /**
     * Render the company creation form.
     *
     * @return \Inertia\Response
     */
    public function create(): Response
    {
        return inertia()->render('Admin/Companies/Create');
    }

    /**
     * Store a newly created Company.
     *
     * @param \App\Http\Requests\Admin\CompanyRequest $request
     * @return \Illuminate\Http\RedirectResponse
     */
    public function store(CompanyRequest $request)
    {
        $data = $request->validated();
        $data['slug'] = generateSlug($data['name']);
        if ($request->hasFile('logo_image')) {
            $data['logo_path'] = $this->fileService->storeImage($request->file('logo_image'), 'companies');
        }
        $company = Company::create($data);
        $company->users()->attach(Auth::id(), ['role' => 'owner', 'created_at' => now(), 'updated_at' => now()]);

        return to_route('dashboard.companies.index')->with('success', 'Company created successfully.');
    }

    /**
     * Display the specified company.
     *
     * @param \App\Models\Company $company
     * @return \Inertia\Response
     */
    public function show(Company $company)
    {
        return inertia()->render('Admin/Companies/Show', [
            'company' => CompanyResource::make($company)->resolve()
        ]);
    }

    /**
     * Show the form for editing the specified company.
     *
     * @param \App\Models\Company $company
     * @return \Inertia\Response
     */
    public function edit(Company $company)
    {
        return inertia()->render('Admin/Companies/Edit', [
            'company' => CompanyResource::make($company)->resolve()
        ]);
    }

    /**
     * Update the specified company in storage.
     *
     * @param \Illuminate\Http\Request $request
     * @param \App\Models\Company $company
     * @return \Illuminate\Http\RedirectResponse
     */
    public function update(CompanyRequest $request, Company $company)
    {
        $data = $request->validated();
        if ($request->hasFile('logo_image')) {
            $data['logo_path'] = $this->fileService->storeImage($request->file('logo_image'), 'companies');
        }
        $company->update($data);

        return back()->with('success', 'Company updated successfully.');
    }

    /**
     * Remove the specified company from storage.
     *
     * @param \App\Models\Company $company
     * @return \Illuminate\Http\RedirectResponse
     */
    public function destroy(Company $company)
    {
        $company->delete();
        return back()->with('success', 'Company deleted successfully.');
    }
}
