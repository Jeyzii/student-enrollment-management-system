@component('mail::message')
# Hello {{ $enrollment->student->parent->name }}

The enrollment status for your child **{{ $enrollment->student->name }}** has been updated.

**Status:** {{ $enrollment->status }}

@if($enrollment->status === 'Approved')
Congratulations! Your child has been approved for enrollment.
@elseif($enrollment->status === 'Rejected')
We are sorry, your child’s enrollment has been rejected.
@endif

Thanks,<br>
{{ config('app.name') }}
@endcomponent
