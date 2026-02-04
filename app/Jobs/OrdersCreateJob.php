<?php

namespace App\Jobs;

use Illuminate\Support\Facades\Log;
use Illuminate\Foundation\Queue\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;

class OrdersCreateJob implements ShouldQueue
{
    use Queueable;

    protected $shopDomain;
    protected $data;
    /**
     * Create a new job instance.
     */
    public function __construct($shopDomain, $data)
    {
        $this->shopDomain = $shopDomain;
        $this->data = $data;
    }


    /**
     * Execute the job.
     */
    public function handle(): void
    {
        try {
            // $this->shopDomain = ShopDomain::fromNative($this->shopDomain);
            // $domain = $this->shopDomain->toNative();
            // $data = $this->data;
            Log::info("Order create", ['domain' => $this->shopDomain, 'data' => $this->data]);

        } catch (\Exception $ex) {
            logger()->error($ex->getMessage());
        }
    }
}
