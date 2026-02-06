<?php

namespace App\Jobs;

use Illuminate\Support\Facades\Log;
use Illuminate\Foundation\Queue\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;

class AfterAuthenticateJob implements ShouldQueue
{
    use Queueable;

    /**
     * Create a new job instance.
     */
    protected $domain;

    public function __construct( $domain)
    {
        $this->domain = $domain;
    }

    /**
     * Execute the job.
     */
    public function handle(): void
    {
        try {

            Log::info("AfterAuthenticateJob domain", ["domain"=> $this->domain]);

        } catch (\Exception $e) {
            logger()->error($e->getMessage());
        }
    }
}
