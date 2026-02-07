<?php

namespace App\Services\Courier;

use App\Models\Courier;
use Exception;

class CourierFactory
{
    public static function make(Courier $courier): CourierServiceInterface
    {
        if (!$courier->is_active) {
            throw new Exception("Courier {$courier->name} is not active.");
        }

        return match ($courier->code) {
            'dhl' => new DHLCourierService(),
            'fedex' => new FedExCourierService(),
            default => throw new Exception("Courier implementation not found for {$courier->code}"),
        };
    }
}
