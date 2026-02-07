<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Resources\OrderResource;
use App\Models\Courier;
use App\Models\Order;
use Illuminate\Http\Request;
use Inertia\Inertia;

class OrderController extends Controller
{
    public function index()
    {
        $orders = Order::with(['customer'])
            ->withCount('items')
            ->latest()
            ->paginate(10);

        return Inertia::render('Admin/Orders/Index', [
            'orders' => OrderResource::collection($orders),
        ]);
    }

    public function show(Order $order)
    {
        $order->load(['customer', 'items.product', 'items.variant', 'shipments.courier']);

        return Inertia::render('Admin/Orders/Show', [
            'order' => new OrderResource($order),
            'couriers' => Courier::where('is_active', true)->get(),
        ]);
    }
}
