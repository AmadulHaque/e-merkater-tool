<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Courier;
use App\Models\Order;
use App\Models\Shipment;
use App\Services\Courier\CourierFactory;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ShipmentController extends Controller
{
    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $request->validate([
            'order_id' => 'required|exists:orders,id',
            'courier_id' => 'required|exists:couriers,id',
        ]);

        $order = Order::findOrFail($request->order_id);
        $courier = Courier::findOrFail($request->courier_id);

        try {
            $service = CourierFactory::make($courier);
            $shipmentData = $service->createShipment($order);

            $shipment = Shipment::create([
                'order_id' => $order->id,
                'courier_id' => $courier->id,
                'tracking_number' => $shipmentData['tracking_number'],
                'label_url' => $shipmentData['label_url'],
                'status' => 'pending',
                'courier_response' => $shipmentData['courier_response'],
            ]);

            // Update Order fulfillment status
            $order->update(['fulfillment_status' => 'fulfilled']);

            return back()->with('success', 'Shipment created successfully.');
        } catch (\Exception $e) {
            return back()->with('error', 'Failed to create shipment: ' . $e->getMessage());
        }
    }

    /**
     * Get rates for an order.
     */
    public function getRates(Request $request)
    {
        $request->validate([
            'order_id' => 'required|exists:orders,id',
            'courier_id' => 'required|exists:couriers,id',
        ]);

        $order = Order::findOrFail($request->order_id);
        $courier = Courier::findOrFail($request->courier_id);

        try {
            $service = CourierFactory::make($courier);
            $rates = $service->getRates($order);

            return response()->json(['rates' => $rates]);
        } catch (\Exception $e) {
            return response()->json(['error' => $e->getMessage()], 422);
        }
    }
}
