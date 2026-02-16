@component('mail::message')
# Hello {{ $student->parent->name }}

Thank you for enrolling {{ $student->name }} at our school.  

**Enrollment Details:**  
- Child Name: {{ $student->name }}  
- Birthday: {{ $student->birthday }}  
- Student ID: {{ $student->id }}  
- Status: Pending

We will notify you once the enrollment is approved.

Thanks,<br>
{{ config('app.name') }}
@endcomponent
