<?php

namespace App\Jobs;

use App\Models\User;
use App\Models\Order;
use App\Models\Customer;
use App\Models\Product;
use App\Models\ProductVariant;
use App\Services\ShopifyService;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Queue\Queueable;
use Illuminate\Support\Facades\Log;

class SyncOrdersJob implements ShouldQueue
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
        Log::info("Starting order sync for shop: {$this->shop->name}");
        
        try {
            $service = new ShopifyService($this->shop);
            $response = $service->getOrders(['status' => 'any', 'limit' => 50]);
            
            if ($response['errors']) {
                Log::error('Order Sync Error', $response['errors']);
                return;
            }

            // Logic to save orders to DB
            foreach ($response['body']['orders'] as $shopifyOrder) {
                // Handle Customer
                $customer = null;
                if (isset($shopifyOrder['customer'])) {
                    $customer = $this->shop->customers()->updateOrCreate(
                        ['shopify_id' => $shopifyOrder['customer']['id']],
                        [
                            'first_name' => $shopifyOrder['customer']['first_name'] ?? null,
                            'last_name' => $shopifyOrder['customer']['last_name'] ?? null,
                            'email' => $shopifyOrder['customer']['email'] ?? null,
                            'phone' => $shopifyOrder['customer']['phone'] ?? null,
                            'default_address' => $shopifyOrder['customer']['default_address'] ?? null,
                        ]
                    );
                }

                // Handle Order
                $order = $this->shop->orders()->updateOrCreate(
                    ['shopify_id' => $shopifyOrder['id']],
                    [
                        'customer_id' => $customer?->id,
                        'order_number' => $shopifyOrder['order_number'],
                        'email' => $shopifyOrder['email'],
                        'financial_status' => $shopifyOrder['financial_status'],
                        'fulfillment_status' => $shopifyOrder['fulfillment_status'],
                        'currency' => $shopifyOrder['currency'],
                        'total_price' => $shopifyOrder['total_price'],
                        'subtotal_price' => $shopifyOrder['subtotal_price'],
                        'total_tax' => $shopifyOrder['total_tax'],
                        'created_at_shopify' => $shopifyOrder['created_at'],
                        'shipping_address' => $shopifyOrder['shipping_address'] ?? null,
                        'billing_address' => $shopifyOrder['billing_address'] ?? null,
                    ]
                );

                // Handle Line Items
                foreach ($shopifyOrder['line_items'] as $item) {
                    // Find local product/variant
                    $productId = null;
                    $variantId = null;
                    
                    if ($item['product_id']) {
                        $productId = Product::where('shopify_id', $item['product_id'])->value('id');
                    }
                    if ($item['variant_id']) {
                        $variantId = ProductVariant::where('shopify_id', $item['variant_id'])->value('id');
                    }

                    $order->items()->updateOrCreate(
                        ['shopify_id' => $item['id']],
                        [
                            'product_id' => $productId,
                            'variant_id' => $variantId,
                            'title' => $item['title'],
                            'quantity' => $item['quantity'],
                            'price' => $item['price'],
                            'sku' => $item['sku'],
                        ]
                    );
                }
            }

            Log::info("Synced " . count($response['body']['orders']) . " orders for shop {$this->shop->name}");
            
        } catch (\Exception $e) {
            Log::error("Order Sync Failed: " . $e->getMessage());
            $this->fail($e);
        }
    }
}
