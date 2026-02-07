import { Head, Link, useForm } from '@inertiajs/react';
import AdminLayout from '@/Layouts/AdminLayout';
import { Package, Truck, ArrowLeft, ExternalLink, Printer } from 'lucide-react';
import { useState } from 'react';

interface OrderItem {
    id: number;
    title: string;
    quantity: number;
    price: string;
    sku: string;
}

interface Shipment {
    id: number;
    tracking_number: string;
    status: string;
    label_url: string;
    courier: {
        name: string;
        code: string;
    };
    created_at: string;
}

interface Order {
    id: number;
    order_number: string;
    email: string;
    financial_status: string;
    fulfillment_status: string;
    currency: string;
    total_price: string;
    created_at_shopify: string;
    items: OrderItem[];
    shipments: Shipment[];
    shipping_address: any;
    customer: {
        name: string;
        email: string;
    };
}

interface Courier {
    id: number;
    name: string;
    code: string;
}

interface Props {
    order: Order;
    couriers: Courier[];
}

export default function Show({ order, couriers }: Props) {
    const [selectedCourier, setSelectedCourier] = useState<string>('');
    const [rates, setRates] = useState<any[]>([]);
    const [loadingRates, setLoadingRates] = useState(false);

    const { data, setData, post, processing, errors, reset } = useForm({
        order_id: order.id,
        courier_id: '',
    });

    const fetchRates = async (courierId: string) => {
        if (!courierId) return;
        setLoadingRates(true);
        try {
            // In a real app, we would fetch rates from the backend
            // const response = await axios.post(route('admin.shipments.rates'), { order_id: order.id, courier_id: courierId });
            // setRates(response.data.rates);
            
            // For now, we'll just set the selected courier and allow creation
            setData('courier_id', courierId);
        } catch (error) {
            console.error('Failed to fetch rates', error);
        } finally {
            setLoadingRates(false);
        }
    };

    const handleCreateShipment = (e: React.FormEvent) => {
        e.preventDefault();
        post(route('admin.shipments.store'), {
            onSuccess: () => {
                reset();
                setSelectedCourier('');
            },
        });
    };

    return (
        <AdminLayout>
            <Head title={`Order #${order.order_number}`} />

            <div className="mb-6">
                <Link
                    href={route('admin.orders.index')}
                    className="flex items-center text-gray-600 hover:text-gray-900 mb-4"
                >
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    Back to Orders
                </Link>
                <div className="flex justify-between items-start">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900">Order #{order.order_number}</h1>
                        <p className="text-gray-500 mt-1">
                            Placed on {order.created_at_shopify}
                        </p>
                    </div>
                    <div className="flex space-x-3">
                        <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                            order.financial_status === 'paid' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                        }`}>
                            {order.financial_status.toUpperCase()}
                        </span>
                        <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                            order.fulfillment_status === 'fulfilled' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                        }`}>
                            {order.fulfillment_status ? order.fulfillment_status.toUpperCase() : 'UNFULFILLED'}
                        </span>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Order Details & Items */}
                <div className="lg:col-span-2 space-y-6">
                    <div className="bg-white rounded-lg shadow p-6">
                        <h2 className="text-lg font-semibold mb-4">Order Items</h2>
                        <div className="divide-y">
                            {order.items.map((item) => (
                                <div key={item.id} className="py-4 flex justify-between items-center">
                                    <div>
                                        <p className="font-medium text-gray-900">{item.title}</p>
                                        <p className="text-sm text-gray-500">SKU: {item.sku}</p>
                                    </div>
                                    <div className="text-right">
                                        <p className="font-medium text-gray-900">
                                            {item.quantity} x {order.currency} {item.price}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div className="border-t mt-4 pt-4 flex justify-between items-center font-bold text-lg">
                            <span>Total</span>
                            <span>{order.currency} {order.total_price}</span>
                        </div>
                    </div>

                    {/* Shipments List */}
                    <div className="bg-white rounded-lg shadow p-6">
                        <h2 className="text-lg font-semibold mb-4 flex items-center">
                            <Truck className="w-5 h-5 mr-2" />
                            Shipments
                        </h2>
                        {order.shipments.length > 0 ? (
                            <div className="space-y-4">
                                {order.shipments.map((shipment) => (
                                    <div key={shipment.id} className="border rounded-lg p-4">
                                        <div className="flex justify-between items-start mb-2">
                                            <div>
                                                <p className="font-medium text-gray-900">{shipment.courier.name}</p>
                                                <p className="text-sm text-gray-500 font-mono">{shipment.tracking_number}</p>
                                            </div>
                                            <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">
                                                {shipment.status.toUpperCase()}
                                            </span>
                                        </div>
                                        <div className="flex space-x-3 mt-3">
                                            {shipment.label_url && (
                                                <a
                                                    href={shipment.label_url}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="flex items-center text-sm text-blue-600 hover:text-blue-800"
                                                >
                                                    <Printer className="w-4 h-4 mr-1" />
                                                    Print Label
                                                </a>
                                            )}
                                            <a
                                                href="#"
                                                className="flex items-center text-sm text-gray-600 hover:text-gray-900"
                                            >
                                                <ExternalLink className="w-4 h-4 mr-1" />
                                                Track Shipment
                                            </a>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <p className="text-gray-500 text-sm">No shipments created yet.</p>
                        )}
                    </div>
                </div>

                {/* Sidebar: Customer & Actions */}
                <div className="space-y-6">
                    {/* Customer Info */}
                    <div className="bg-white rounded-lg shadow p-6">
                        <h2 className="text-lg font-semibold mb-4">Customer</h2>
                        <div className="space-y-3">
                            <p className="font-medium">{order.customer.name}</p>
                            <p className="text-sm text-blue-600">{order.customer.email}</p>
                            <div className="text-sm text-gray-600 mt-2">
                                <p className="font-medium text-gray-900 mb-1">Shipping Address:</p>
                                {order.shipping_address ? (
                                    <>
                                        <p>{order.shipping_address.address1}</p>
                                        <p>{order.shipping_address.city}, {order.shipping_address.province} {order.shipping_address.zip}</p>
                                        <p>{order.shipping_address.country}</p>
                                    </>
                                ) : (
                                    <p className="italic">No shipping address provided</p>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Create Shipment Form */}
                    {order.fulfillment_status !== 'fulfilled' && (
                        <div className="bg-white rounded-lg shadow p-6">
                            <h2 className="text-lg font-semibold mb-4 flex items-center">
                                <Package className="w-5 h-5 mr-2" />
                                Create Shipment
                            </h2>
                            <form onSubmit={handleCreateShipment} className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Select Courier
                                    </label>
                                    <select
                                        className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                                        value={data.courier_id}
                                        onChange={(e) => {
                                            setSelectedCourier(e.target.value);
                                            setData('courier_id', e.target.value);
                                        }}
                                        required
                                    >
                                        <option value="">Choose a courier...</option>
                                        {couriers.map((courier) => (
                                            <option key={courier.id} value={courier.id}>
                                                {courier.name}
                                            </option>
                                        ))}
                                    </select>
                                    {errors.courier_id && (
                                        <p className="text-red-500 text-xs mt-1">{errors.courier_id}</p>
                                    )}
                                </div>

                                <button
                                    type="submit"
                                    disabled={processing || !data.courier_id}
                                    className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
                                >
                                    {processing ? 'Creating Shipment...' : 'Generate Label'}
                                </button>
                            </form>
                        </div>
                    )}
                </div>
            </div>
        </AdminLayout>
    );
}
