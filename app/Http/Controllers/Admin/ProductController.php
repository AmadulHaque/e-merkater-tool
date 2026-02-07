<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Resources\ProductResource;
use App\Models\Product;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ProductController extends Controller
{
    public function index()
    {
        $products = Product::withCount('variants')
            ->latest()
            ->paginate(10);

        return Inertia::render('Admin/Products/Index', [
            'products' => ProductResource::collection($products),
        ]);
    }
}
