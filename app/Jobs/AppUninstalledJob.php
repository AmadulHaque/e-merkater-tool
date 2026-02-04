<?php

namespace App\Jobs;


use stdClass;
use Exception;
use App\Models\User;
use Illuminate\Support\Facades\Log;
use Illuminate\Foundation\Queue\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Osiset\ShopifyApp\Actions\CancelCurrentPlan;
use Osiset\ShopifyApp\Objects\Values\ShopDomain;
use Osiset\ShopifyApp\Contracts\Queries\Shop as IShopQuery;
use Osiset\ShopifyApp\Contracts\Commands\Shop as IShopCommand;

class AppUninstalledJob implements ShouldQueue
{
    use Queueable;

    
    /**
     * Create a new job instance.
     */
    protected ShopDomain|string $domain;
    protected stdClass $data;

    public function __construct(string $domain, stdClass $data)
    {
        $this->domain = $domain;
        $this->data = $data;
    }

    /**
     * Execute the job.
     */
    public function handle(
        IShopCommand $shopCommand,
        IShopQuery $shopQuery,
        CancelCurrentPlan $cancelCurrentPlanAction
    ): void
    {
        try {

            // 1. Clean up user data
            Log::info("User delete", ['domain' => $this->domain]);

            // 2. Clean up Shopify-related data
            // $shopDomain = ShopDomain::fromNative($this->domain);
            // $shop = $shopQuery->getByDomain($shopDomain);
            
            // if ($shop) {
            //     $shopId = $shop->getId();
                
            //     // Cancel current plan
            //     $cancelCurrentPlanAction($shopId);
                
            //     // Clean shop data
            //     $shopCommand->clean($shopId);
                
            //     // Soft delete the shop
            //     $shopCommand->softDelete($shopId);
            // }

        }catch (Exception $exception) {
            logger()->error($exception->getMessage());
        }
    }
}
