<?php

namespace App\Listeners;

use App\Events\JobRequisitionCreated;
use App\Services\Business\JobPostingService;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Queue\InteractsWithQueue;

class GenerateJobPosting implements ShouldQueue
{
    use InteractsWithQueue;
    /**
     * Create the event listener.
     */
    public function __construct(protected JobPostingService $jobPostingService) {}

    /**
     * Handle the event.
     */
    public function handle(JobRequisitionCreated $event): void
    {
        $this->jobPostingService->create([], $event->jobRequisition, $event->jobRequisition->company);
    }
}
