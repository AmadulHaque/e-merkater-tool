<?php

namespace App\Jobs\Webhooks;

use App\Models\User;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;
use Illuminate\Support\Facades\Log;

class ProductsUpdateJob implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    public function __construct(
        public User $user,
        public array $data
    ) {}

    public function handle(): void
    {
        $productData = $this->data;
        
        $product = $this->user->products()->updateOrCreate(
            ['shopify_id' => $productData['id']],
            [
                'title' => $productData['title'],
                'body_html' => $productData['body_html'] ?? '',
                'vendor' => $productData['vendor'],
                'product_type' => $productData['product_type'],
                'handle' => $productData['handle'],
                'status' => $productData['status'],
                'tags' => $productData['tags'],
                'images' => $productData['images'],
            ]
        );

        foreach ($productData['variants'] as $variant) {
            $product->variants()->updateOrCreate(
                ['shopify_id' => $variant['id']],
                [
                    'title' => $variant['title'],
                    'price' => $variant['price'],
                    'sku' => $variant['sku'],
                    'barcode' => $variant['barcode'] ?? null,
                    'inventory_quantity' => $variant['inventory_quantity'] ?? 0,
                    'inventory_policy' => $variant['inventory_policy'],
                    'weight' => $variant['weight'],
                    'weight_unit' => $variant['weight_unit'],
                ]
            );
        }
    }
}
