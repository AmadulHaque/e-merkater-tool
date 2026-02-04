<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::middleware(['verify.shopify'])->group(function () {

    Route::get('/', function () {
        return Inertia::render('welcome');
    })->name('home');


});