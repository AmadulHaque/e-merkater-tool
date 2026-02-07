<?php

namespace App\Http\Controllers;

use App\Jobs\Webhooks\OrdersUpdateJob;
use App\Jobs\Webhooks\ProductsUpdateJob;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;

class WebhookController extends Controller
{
    public function productsUpdate(Request $request)
    {
        $shopDomain = $request->header('x-shopify-shop-domain');
        $user = User::where('name', $shopDomain)->first();

        if ($user) {
            ProductsUpdateJob::dispatch($user, $request->all());
        } else {
            Log::warning("Webhook received for unknown shop: $shopDomain");
        }

        return response()->json(['status' => 'success']);
    }

    public function ordersUpdate(Request $request)
    {
        $shopDomain = $request->header('x-shopify-shop-domain');
        $user = User::where('name', $shopDomain)->first();

        if ($user) {
            OrdersUpdateJob::dispatch($user, $request->all());
        } else {
            Log::warning("Webhook received for unknown shop: $shopDomain");
        }

        return response()->json(['status' => 'success']);
    }
}
