<?php

namespace Tests\Feature\Webhook;

use App\Jobs\Webhooks\OrdersUpdateJob;
use App\Jobs\Webhooks\ProductsUpdateJob;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Facades\Queue;
use Tests\TestCase;

class WebhookIntegrationTest extends TestCase
{
    use RefreshDatabase;

    public function test_products_update_webhook_dispatches_job()
    {
        Queue::fake();

        $user = User::factory()->create(['name' => 'test-shop.myshopify.com']);

        $payload = [
            'id' => 123456789,
            'title' => 'Test Product',
            'vendor' => 'Test Vendor',
            'product_type' => 'T-Shirt',
            'handle' => 'test-product',
            'status' => 'active',
            'tags' => 'tag1, tag2',
            'images' => [],
            'variants' => [],
        ];

        $response = $this->postJson('/webhook/products/update', $payload, [
            'x-shopify-shop-domain' => 'test-shop.myshopify.com',
            'x-shopify-hmac-sha256' => 'mock-hmac', // Middleware verification is disabled for this path in bootstrap/app.php
        ]);

        $response->assertStatus(200);

        Queue::assertPushed(ProductsUpdateJob::class, function ($job) use ($user, $payload) {
            return $job->user->id === $user->id && $job->data['id'] === $payload['id'];
        });
    }

    public function test_orders_update_webhook_dispatches_job()
    {
        Queue::fake();

        $user = User::factory()->create(['name' => 'test-shop.myshopify.com']);

        $payload = [
            'id' => 987654321,
            'order_number' => 1001,
            'email' => 'customer@example.com',
            'financial_status' => 'paid',
            'fulfillment_status' => null,
            'currency' => 'USD',
            'total_price' => '50.00',
            'subtotal_price' => '45.00',
            'total_tax' => '5.00',
            'created_at' => now()->toIso8601String(),
            'line_items' => [],
        ];

        $response = $this->postJson('/webhook/orders/update', $payload, [
            'x-shopify-shop-domain' => 'test-shop.myshopify.com',
            'x-shopify-hmac-sha256' => 'mock-hmac',
        ]);

        $response->assertStatus(200);

        Queue::assertPushed(OrdersUpdateJob::class, function ($job) use ($user, $payload) {
            return $job->user->id === $user->id && $job->data['id'] === $payload['id'];
        });
    }
}
