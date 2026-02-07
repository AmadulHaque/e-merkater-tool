<?php

namespace App\Services\Courier;

use App\Models\Order;
use Illuminate\Support\Str;

class FedExCourierService implements CourierServiceInterface
{
    public function getRates(Order $order): array
    {
        // Mock FedEx Rates
        return [
            [
                'service_code' => 'FEDEX_PRIORITY',
                'service_name' => 'FedEx International Priority',
                'total_price' => 30.00,
                'currency' => 'USD',
                'estimated_delivery' => now()->addDays(2)->format('Y-m-d'),
            ],
            [
                'service_code' => 'FEDEX_ECONOMY',
                'service_name' => 'FedEx International Economy',
                'total_price' => 18.00,
                'currency' => 'USD',
                'estimated_delivery' => now()->addDays(5)->format('Y-m-d'),
            ]
        ];
    }

    public function createShipment(Order $order, array $params = []): array
    {
        // Mock FedEx Shipment Creation
        return [
            'tracking_number' => 'FEDEX-' . Str::upper(Str::random(12)),
            'label_url' => 'https://example.com/labels/fedex-mock-label.pdf',
            'courier_response' => [
                'status' => 'success',
                'service' => 'FEDEX_PRIORITY',
                'master_tracking_id' => Str::uuid(),
            ]
        ];
    }

    public function cancelShipment(string $shipmentId): bool
    {
        return true;
    }

    public function trackShipment(string $trackingNumber): array
    {
        return [
            'status' => 'delivered',
            'events' => [
                ['timestamp' => now()->subDays(2), 'status' => 'picked_up', 'location' => 'Los Angeles'],
                ['timestamp' => now(), 'status' => 'delivered', 'location' => 'Tokyo'],
            ]
        ];
    }
}
