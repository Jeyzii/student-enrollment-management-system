<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\EnrollmentController;
use App\Http\Controllers\StudentController;
use App\Http\Controllers\ParentController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

// Limit login to 5 requests per 1 minute
Route::post('/staff/login', [AuthController::class, 'login'])
    ->middleware('throttle:5,1');

// Limit enrollment submissions to 5 per 1 minute
Route::post('/enroll', [EnrollmentController::class, 'store'])
    ->middleware('throttle:5,1');

// Protected routes
Route::middleware(['auth:sanctum', 'throttle:5,1'])->group(function() {
    Route::get('/students', [StudentController::class, 'index']);
    // Route::get('/enrollments', [EnrollmentController::class, 'index']);
    Route::patch('/enrollments/{id}', [EnrollmentController::class, 'update']);
});
