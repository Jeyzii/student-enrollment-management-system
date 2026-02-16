<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;
use App\Models\Enrollment;

class EnrollmentStatusUpdate extends Mailable
{
    use Queueable, SerializesModels;

    public $enrollment;

    public function __construct(Enrollment $enrollment)
    {
        $this->enrollment = $enrollment;
    }

    public function build()
    {
        $subject = "Enrollment Status Update: {$this->enrollment->status}";
        return $this->subject($subject)
                    ->markdown('emails.parent.status_update');
    }
}
