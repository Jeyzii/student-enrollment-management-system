@component('mail::message')
# New Enrollment Submitted

A new student has been enrolled by a parent.

**Student Details:**  
- Child Name: {{ $student->name }}  
- Birthday: {{ $student->birthday }}  
- Student ID: {{ $student->id }}

**Parent Details:**  
- Name: {{ $student->parent->name }}  
- Email: {{ $student->parent->email }}  
- Contact Number: {{ $student->parent->contact_number }}  
- Relationship: {{ $student->parent->relationship_to_child }}

Please review the enrollment in the dashboard.

Thanks,<br>
{{ config('app.name') }}
@endcomponent
