<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Jobs\SyncOrdersJob;
use App\Jobs\SyncProductsJob;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;

class SyncController extends Controller
{
    public function products()
    {
        $shops = User::all();
        
        foreach ($shops as $shop) {
            SyncProductsJob::dispatch($shop);
        }

        return back()->with('success', 'Product sync started for ' . $shops->count() . ' shops.');
    }

    public function orders()
    {
        $shops = User::all();
        
        foreach ($shops as $shop) {
            SyncOrdersJob::dispatch($shop);
        }

        return back()->with('success', 'Order sync started for ' . $shops->count() . ' shops.');
    }
}
