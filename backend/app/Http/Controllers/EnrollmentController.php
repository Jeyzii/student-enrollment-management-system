<?php

namespace App\Http\Controllers;

use App\Models\Enrollment;
use App\Models\Student;
use App\Models\student_parent;
use Illuminate\Http\Request;

class EnrollmentController extends Controller
{
public function store(Request $request)
{
    $request->validate([
        'parent_name' => 'required|string|max:255',
        'parent_email' => 'required|email|unique:student_parents,email',
        'parent_contact' => 'required|string',
        'parent_relationship' => 'required|string',
        'child_name' => 'required|string|max:255',
        'child_birthday' => 'required|date',
    ]);

    try {
        $parent = student_parent::create([
            'name' => $request->parent_name,
            'email' => $request->parent_email,
            'contact_number' => $request->parent_contact,
            'relationship_to_child' => $request->parent_relationship,
        ]);

        $student = Student::create([
            'name' => $request->child_name,
            'birthday' => $request->child_birthday,
            'parent_id' => $parent->id,
        ]);

        $enrollment = Enrollment::create([
            'student_id' => $student->id,
            'status' => 'Pending',
        ]);

        return response()->json([
            'success' => true,
            'message' => 'Enrollment submitted successfully',
            'data' => compact('parent', 'student', 'enrollment'),
        ], 201);

    } catch (\Exception $e) {
        return response()->json([
            'success' => false,
            'message' => $e->getMessage(),
        ], 500);
    }
}


    /**
     * Update the enrollment status
     * PUT /api/enrollments/{id}
     */
    public function update(Request $request, $id)
    {
        $enrollment = Enrollment::findOrFail($id);

        $request->validate([
            'status' => 'required|in:Pending,Approved,Rejected',
        ]);

        $enrollment->update(['status' => $request->status]);

        return response()->json([
            'success' => true,
            'message' => 'Enrollment status updated successfully',
            'data' => $enrollment,
        ], 200);
    }
}
