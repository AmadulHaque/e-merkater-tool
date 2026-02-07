<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Role;
use App\Models\Permission;
use App\Models\Staff;
use Illuminate\Support\Facades\Hash;

class StaffSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Create Permissions
        $permissions = [
            'view_dashboard',
            'manage_users',
            'manage_roles',
            'manage_orders',
            'manage_products',
            'manage_couriers',
            'view_reports',
        ];

        foreach ($permissions as $slug) {
            Permission::firstOrCreate(
                ['slug' => $slug],
                ['name' => ucwords(str_replace('_', ' ', $slug))]
            );
        }

        // Create Roles
        $adminRole = Role::firstOrCreate(
            ['slug' => 'admin'],
            ['name' => 'Administrator', 'description' => 'Full access']
        );

        $opsRole = Role::firstOrCreate(
            ['slug' => 'operations'],
            ['name' => 'Operations', 'description' => 'Manage orders and products']
        );

        $supportRole = Role::firstOrCreate(
            ['slug' => 'support'],
            ['name' => 'Support', 'description' => 'View orders and chat']
        );

        // Assign Permissions to Roles
        $adminRole->permissions()->sync(Permission::all());
        $opsRole->permissions()->sync(Permission::whereIn('slug', ['view_dashboard', 'manage_orders', 'manage_products', 'manage_couriers'])->get());
        $supportRole->permissions()->sync(Permission::whereIn('slug', ['view_dashboard', 'manage_orders'])->get());

        // Create Admin User
        $admin = Staff::firstOrCreate(
            ['email' => 'admin@example.com'],
            [
                'name' => 'Admin User',
                'password' => Hash::make('password'),
            ]
        );

        if (!$admin->roles()->where('slug', 'admin')->exists()) {
            $admin->roles()->attach($adminRole);
        }
    }
}
