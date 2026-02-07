import AdminLayout from '@/Layouts/AdminLayout';
import { Head, router } from '@inertiajs/react';
import { RefreshCw } from 'lucide-react';

declare const route: any;

export default function Dashboard() {
    const handleSync = (type: 'products' | 'orders') => {
        router.post(route(`admin.sync.${type}`), {}, {
            onSuccess: () => alert(`${type} sync started!`),
        });
    };

    return (
        <AdminLayout>
            <Head title="Admin Dashboard" />
            
            <div className="mb-6 flex justify-between items-center">
                <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
                <div className="space-x-4">
                    <button 
                        onClick={() => handleSync('products')}
                        className="inline-flex items-center px-4 py-2 bg-blue-600 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-blue-700 active:bg-blue-900 focus:outline-none focus:border-blue-900 focus:ring ring-blue-300 disabled:opacity-25 transition ease-in-out duration-150"
                    >
                        <RefreshCw className="w-4 h-4 mr-2" />
                        Sync Products
                    </button>
                    <button 
                        onClick={() => handleSync('orders')}
                        className="inline-flex items-center px-4 py-2 bg-green-600 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-green-700 active:bg-green-900 focus:outline-none focus:border-green-900 focus:ring ring-green-300 disabled:opacity-25 transition ease-in-out duration-150"
                    >
                        <RefreshCw className="w-4 h-4 mr-2" />
                        Sync Orders
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white p-6 rounded-lg shadow-sm border">
                    <h3 className="text-lg font-medium text-gray-900">Total Orders</h3>
                    <p className="text-3xl font-bold text-blue-600 mt-2">0</p>
                </div>
                <div className="bg-white p-6 rounded-lg shadow-sm border">
                    <h3 className="text-lg font-medium text-gray-900">Total Products</h3>
                    <p className="text-3xl font-bold text-green-600 mt-2">0</p>
                </div>
                <div className="bg-white p-6 rounded-lg shadow-sm border">
                    <h3 className="text-lg font-medium text-gray-900">Pending Issues</h3>
                    <p className="text-3xl font-bold text-red-600 mt-2">0</p>
                </div>
            </div>
        </AdminLayout>
    );
}
