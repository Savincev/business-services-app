<?php

use App\Http\Controllers\ContactController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::get('/contacts', [ContactController::class, 'getContacts']);
Route::get('/departments', [ContactController::class, 'getDepartments']);
Route::get('/companies', [ContactController::class, 'getCompanies']);
Route::get('/revenueSum', [ContactController::class, 'getRevenueSum']);
