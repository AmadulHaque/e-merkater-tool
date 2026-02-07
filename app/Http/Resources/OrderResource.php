<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class OrderResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'order_number' => $this->order_number,
            'shopify_id' => $this->shopify_id,
            'email' => $this->email,
            'financial_status' => $this->financial_status,
            'fulfillment_status' => $this->fulfillment_status,
            'currency' => $this->currency,
            'total_price' => $this->total_price,
            'created_at_shopify' => $this->created_at_shopify->format('Y-m-d H:i:s'),
            'items_count' => $this->whenCounted('items'),
            'customer' => [
                'name' => $this->customer ? $this->customer->first_name . ' ' . $this->customer->last_name : 'Guest',
                'email' => $this->customer ? $this->customer->email : $this->email,
            ],
            'items' => $this->whenLoaded('items'),
            'shipments' => $this->whenLoaded('shipments'),
            'shipping_address' => $this->shipping_address,
            'billing_address' => $this->billing_address,
        ];
    }
}
