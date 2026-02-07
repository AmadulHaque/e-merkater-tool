<?php

namespace Database\Seeders;

use App\Models\Courier;
use Illuminate\Database\Seeder;

class CourierSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Courier::firstOrCreate(
            ['code' => 'dhl'],
            ['name' => 'DHL Express', 'is_active' => true]
        );

        Courier::firstOrCreate(
            ['code' => 'fedex'],
            ['name' => 'FedEx', 'is_active' => true]
        );
    }
}
