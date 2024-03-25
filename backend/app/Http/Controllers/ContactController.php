<?php

namespace App\Http\Controllers;

use App\Models\Company;
use App\Models\Contact;
use App\Models\Department;
use App\Models\Geolocation;
use Illuminate\Http\Request;

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

  public function postGeolocation(Request $request)
  {
    $lat = $request->input('latitude');
    $lon = $request->input('longitude');

    $geolocation = Geolocation::create([
      'latitude' => $lat,
      'longitude' => $lon,
    ]);

    $geolocation->save();
  }

  public function getGeolocation()
  {
    $geolocation = Geolocation::latest()->first();

    return response()->json($geolocation);
  }
}
