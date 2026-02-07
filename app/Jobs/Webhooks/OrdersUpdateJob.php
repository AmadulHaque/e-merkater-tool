<?php

namespace App\Jobs\Webhooks;

use App\Models\Product;
use App\Models\ProductVariant;
use App\Models\User;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;

class OrdersUpdateJob implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    public function __construct(
        public User $user,
        public array $data
    ) {}

    public function handle(): void
    {
        $orderData = $this->data;

        // Handle Customer
        $customer = null;
        if (isset($orderData['customer'])) {
            $customer = $this->user->customers()->updateOrCreate(
                ['shopify_id' => $orderData['customer']['id']],
                [
                    'first_name' => $orderData['customer']['first_name'] ?? null,
                    'last_name' => $orderData['customer']['last_name'] ?? null,
                    'email' => $orderData['customer']['email'] ?? null,
                    'phone' => $orderData['customer']['phone'] ?? null,
                    'default_address' => $orderData['customer']['default_address'] ?? null,
                ]
            );
        }

        // Handle Order
        $order = $this->user->orders()->updateOrCreate(
            ['shopify_id' => $orderData['id']],
            [
                'customer_id' => $customer?->id,
                'order_number' => $orderData['order_number'],
                'email' => $orderData['email'],
                'financial_status' => $orderData['financial_status'],
                'fulfillment_status' => $orderData['fulfillment_status'],
                'currency' => $orderData['currency'],
                'total_price' => $orderData['total_price'],
                'subtotal_price' => $orderData['subtotal_price'],
                'total_tax' => $orderData['total_tax'],
                'created_at_shopify' => $orderData['created_at'],
                'shipping_address' => $orderData['shipping_address'] ?? null,
                'billing_address' => $orderData['billing_address'] ?? null,
            ]
        );

        // Handle Line Items
        foreach ($orderData['line_items'] as $item) {
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
}
