<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;

use App\Models\Company;

class PublicPagesController extends Controller
{
    public function about(Company $company)
    {
        return Inertia::render('Public/About', [
            'company' => $company
        ]);
    }

    public function contact(Company $company)
    {
        return Inertia::render('Public/Contact', [
            'company' => $company
        ]);
    }

    public function storeContactForm(Request $request, Company $company)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|email|max:255',
            'subject' => 'required|string|max:255',
            'message' => 'required|string|max:2000',
        ]);

        // TODO: Implement mail sending logic

        return redirect()->back()->with('success', 'Your message has been sent successfully!');
    }
}