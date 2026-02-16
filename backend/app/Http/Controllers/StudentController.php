<?php

namespace App\Http\Controllers;

use App\Models\Student;
use Illuminate\Http\Request;

class StudentController extends Controller
{
    public function index() {
        $students = Student::with('parent', 'enrollment')->get();

        return response()->json($students->map(function($s) {
        return [
        'enrollment_id' => $s->enrollment->id,
        'student_name' => $s->name,
        'birthday' => $s->birthday,
        'student_id' => $s->id,
        'parent_name' => $s->parent->name,
        'parent_contact' => $s->parent->contact_number,
        'parent_email' => $s->parent->email,
        'parent_relationship' => $s->parent->relationship_to_child,
        'status' => $s->enrollment->status,
        ];
        }));

    }

}
