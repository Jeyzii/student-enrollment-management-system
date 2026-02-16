<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class student_parent extends Model
{
    use HasFactory;

    protected $table = 'parents'; //changed model name to avoid conflict with reserved keyword "Parent"

    protected $fillable = ['name', 'email', 'contact_number', 'relationship_to_child'];

    public function students()
    {       
        return $this->hasMany(Student::class, 'parent_id');
    }
}
