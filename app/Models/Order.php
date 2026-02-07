<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Order extends Model
{
    protected $fillable = [
        'user_id',
        'customer_id',
        'shopify_id',
        'order_number',
        'email',
        'financial_status',
        'fulfillment_status',
        'currency',
        'total_price',
        'subtotal_price',
        'total_tax',
        'created_at_shopify',
        'shipping_address',
        'billing_address'
    ];

    protected $casts = [
        'created_at_shopify' => 'datetime',
        'shipping_address' => 'array',
        'billing_address' => 'array',
    ];

    public function customer(): BelongsTo
    {
        return $this->belongsTo(Customer::class);
    }

    public function items(): HasMany
    {
        return $this->hasMany(OrderItem::class);
    }

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    public function shipments(): HasMany
    {
        return $this->hasMany(Shipment::class);
    }
}
