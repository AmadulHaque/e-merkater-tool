<?php

namespace App\Services;

use App\Models\User;
use Illuminate\Support\Facades\Log;

class ShopifyService
{
    public function __construct(protected User $shop) {}

    /**
     * Test connection by fetching shop details
     */
    public function getShopDetails()
    {
        $response = $this->shop->api()->rest('GET', '/admin/shop.json');
        
        if ($response['errors']) {
            Log::error('Shopify API Error', $response['errors']);
            throw new \Exception('Failed to fetch shop details');
        }

        return $response['body']['shop'];
    }

    /**
     * Fetch products with pagination
     */
    public function getProducts($params = [])
    {
        return $this->shop->api()->rest('GET', '/admin/products.json', $params);
    }

    /**
     * Fetch orders with pagination
     */
    public function getOrders($params = [])
    {
        return $this->shop->api()->rest('GET', '/admin/orders.json', $params);
    }
}
