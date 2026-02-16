<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Models\Staff;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Log;

class AuthController extends Controller
{
    public function login(Request $request)
    {
        try {
            $request->validate([
                'email' => 'required|email',
                'password' => 'required|string',
            ]);

            $staff = Staff::where('email', $request->email)->first();

            if (!$staff || !Hash::check($request->password, $staff->password)) {
                return response()->json(['message' => 'Invalid credentials'], 401);
            }

            // Create token
            $token = $staff->createToken('api-token')->plainTextToken;

            return response()->json([
                'message' => 'Login successful',
                'staff' => [
                    'id' => $staff->id,
                    'name' => $staff->name,
                    'email' => $staff->email
                ],
                'token' => $token
            ], 200);

        } catch (\Illuminate\Validation\ValidationException $e) {
            return response()->json(['errors' => $e->errors()], 422);
        } catch (\Exception $e) {
            Log::error('Staff Login Error: ' . $e->getMessage());
            return response()->json(['error' => 'Server error. Please try again later.'], 500);
        }
    }
}
