<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class ProductVariant extends Model
{
    protected $fillable = [
        'product_id',
        'shopify_id',
        'title',
        'price',
        'sku',
        'barcode',
        'inventory_quantity',
        'inventory_policy',
        'weight',
        'weight_unit'
    ];

    public function product(): BelongsTo
    {
        return $this->belongsTo(Product::class);
    }
}
