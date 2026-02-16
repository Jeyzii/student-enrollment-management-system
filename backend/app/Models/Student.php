<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Student extends Model
{
    use HasFactory;

    protected $table = 'students';


    protected $fillable = [
        'name',
        'birthday',
        'parent_id',
    ];

    public function parent()
    {
        return $this->belongsTo(student_parent::class, 'parent_id');
    }

    public function enrollment()
    {
        return $this->hasOne(Enrollment::class, 'student_id');
    }
}
