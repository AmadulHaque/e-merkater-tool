<?php

namespace App\Models;

use App\Enums\Status;
use Osiset\ShopifyApp\Traits\ShopModel;
use Illuminate\Notifications\Notifiable;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Osiset\ShopifyApp\Contracts\ShopModel as IShopModel;

class User extends Authenticatable implements IShopModel
{
   
    use HasFactory, Notifiable, ShopModel;

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'name',
        'email',
        'password',
        'status',
    ];


    /**
     * The attributes that should be hidden for serialization.
     *
     * @var list<string>
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * Get the attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'email_verified_at' => 'datetime',
            'password' => 'hashed',
            'status' => Status::class,
        ];
    }
}
