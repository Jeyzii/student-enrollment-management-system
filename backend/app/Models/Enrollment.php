<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Enrollment extends Model
{
    use HasFactory;

    protected $table = 'enrollments';


    protected $fillable = ['student_id', 'status'];

    public function student()
    {
        return $this->belongsTo(Student::class);
    }
}
