<?php

namespace App\Jobs;

use App\Models\User;
use App\Services\ShopifyService;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Queue\Queueable;
use Illuminate\Support\Facades\Log;

class SyncProductsJob implements ShouldQueue
{
    use Queueable;

    /**
     * Create a new job instance.
     */
    public function __construct(public User $shop)
    {
        //
    }

    /**
     * Execute the job.
     */
    public function handle(): void
    {
        Log::info("Starting product sync for shop: {$this->shop->name}");
        
        try {
            $service = new ShopifyService($this->shop);
            $response = $service->getProducts(['limit' => 50]);
            
            if ($response['errors']) {
                Log::error('Product Sync Error', $response['errors']);
                return;
            }

            // Logic to save products to DB
            foreach ($response['body']['products'] as $shopifyProduct) {
                $product = $this->shop->products()->updateOrCreate(
                    ['shopify_id' => $shopifyProduct['id']],
                    [
                        'title' => $shopifyProduct['title'],
                        'body_html' => $shopifyProduct['body_html'],
                        'vendor' => $shopifyProduct['vendor'],
                        'product_type' => $shopifyProduct['product_type'],
                        'handle' => $shopifyProduct['handle'],
                        'status' => $shopifyProduct['status'],
                        'tags' => $shopifyProduct['tags'],
                        'images' => $shopifyProduct['images'],
                    ]
                );

                foreach ($shopifyProduct['variants'] as $variant) {
                    $product->variants()->updateOrCreate(
                        ['shopify_id' => $variant['id']],
                        [
                            'title' => $variant['title'],
                            'price' => $variant['price'],
                            'sku' => $variant['sku'],
                            'barcode' => $variant['barcode'],
                            'inventory_quantity' => $variant['inventory_quantity'],
                            'inventory_policy' => $variant['inventory_policy'],
                            'weight' => $variant['weight'],
                            'weight_unit' => $variant['weight_unit'],
                        ]
                    );
                }
            }

            Log::info("Synced " . count($response['body']['products']) . " products for shop {$this->shop->name}");
            
        } catch (\Exception $e) {
            Log::error("Product Sync Failed: " . $e->getMessage());
            $this->fail($e);
        }
    }
}
