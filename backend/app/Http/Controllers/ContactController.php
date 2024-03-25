<?php

namespace App\Http\Controllers;

use App\Models\Company;
use App\Models\Contact;
use App\Models\Department;

class ContactController extends Controller
{
    public function getContacts()
    {
        $contacts = Contact::all();

        return response()->json($contacts);
    }

    public function getRevenueSum()
    {
        $sum = Contact::sum('revenue');

        return response()->json($sum);
    }

    public function getDepartments()
    {
        $departments = Department::all();

        return response()->json($departments);
    }

    public function getCompanies()
    {
        $companies = Company::all();

        return response()->json($companies);
    }
}
