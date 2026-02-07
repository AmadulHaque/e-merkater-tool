<?php

namespace App\Services\Courier;

use App\Models\Order;

interface CourierServiceInterface
{
    /**
     * Get shipping rates for an order.
     */
    public function getRates(Order $order): array;

    /**
     * Create a shipment for an order.
     */
    public function createShipment(Order $order, array $params = []): array;

    /**
     * Cancel a shipment.
     */
    public function cancelShipment(string $shipmentId): bool;

    /**
     * Track a shipment.
     */
    public function trackShipment(string $trackingNumber): array;
}
