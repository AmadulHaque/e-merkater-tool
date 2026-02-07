<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('order_items', function (Blueprint $table) {
            $table->id();
            $table->foreignId('order_id')->constrained()->cascadeOnDelete();
            $table->bigInteger('shopify_id')->unique();
            $table->foreignId('product_id')->nullable()->constrained('products')->nullOnDelete();
            // Note: variant_id in Shopify is bigInteger, but we might want to link to our variants table.
            // However, our variants table uses 'id' as primary key (bigint unsigned auto_increment), and 'shopify_id' as bigint.
            // If we want to link to our local table, we need to find the local ID first.
            // For now, let's just store the shopify variant ID or try to link if possible.
            // Let's assume we link to local variants if they exist.
            // But wait, SyncOrders might run before SyncProducts.
            // So we should probably just store shopify_variant_id as well, or make the FK nullable and not strict.
            // Let's stick to simple shopify_id refs for now or nullable FKs.
            // I'll use nullable FK to 'product_variants' table.
            $table->foreignId('variant_id')->nullable()->constrained('product_variants')->nullOnDelete();
            
            $table->string('title');
            $table->integer('quantity');
            $table->decimal('price', 10, 2);
            $table->string('sku')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('order_items');
    }
};
