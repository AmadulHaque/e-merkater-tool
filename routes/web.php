<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\Admin\AuthController;
use App\Http\Controllers\Admin\StaffController;
use App\Http\Controllers\Admin\SyncController;
use App\Http\Controllers\Admin\ProductController;
use App\Http\Controllers\Admin\OrderController;
use App\Http\Controllers\Admin\ShipmentController;
use App\Http\Controllers\WebhookController;

Route::group([], function () {
    Route::post('/webhook/products/update', [WebhookController::class, 'productsUpdate']);
    Route::post('/webhook/orders/update', [WebhookController::class, 'ordersUpdate']);
});

Route::middleware(['verify.shopify'])->group(function () {

    Route::get('/', function () {
        return Inertia::render('welcome');
    })->name('home');


});

Route::prefix('admin')->name('admin.')->group(function () {
    // Guest routes
    Route::middleware('guest:staff')->group(function () {
        Route::get('login', [AuthController::class, 'create'])->name('login');
        Route::post('login', [AuthController::class, 'store']);
    });

    // Authenticated routes
    Route::middleware('auth:staff')->group(function () {
        Route::post('logout', [AuthController::class, 'destroy'])->name('logout');
        
        Route::get('dashboard', function () {
            return Inertia::render('Admin/Dashboard');
        })->name('dashboard');

        Route::resource('staff', StaffController::class)->only(['index', 'store', 'update', 'destroy']);
        Route::resource('products', ProductController::class)->only(['index']);
        Route::resource('orders', OrderController::class)->only(['index', 'show']);

        // Shipments
        Route::post('/shipments', [ShipmentController::class, 'store'])->name('shipments.store');
        Route::post('/shipments/rates', [ShipmentController::class, 'getRates'])->name('shipments.rates');

        // Manual Sync Routes
        Route::post('sync/products', [SyncController::class, 'products'])->name('sync.products');
        Route::post('sync/orders', [SyncController::class, 'orders'])->name('sync.orders');
    });
});
