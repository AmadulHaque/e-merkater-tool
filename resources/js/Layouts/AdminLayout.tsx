import { Link, usePage } from '@inertiajs/react';
import { LayoutDashboard, Users, LogOut, Package, ShoppingBag } from 'lucide-react';
import { PropsWithChildren } from 'react';

// Define strict types for route and auth
declare global {
    // eslint-disable-next-line no-var
    var route: (name?: string, params?: any, absolute?: boolean) => string & { current: (name?: string) => boolean };
}

interface User {
    id: number;
    name: string;
    email: string;
}

interface Auth {
    user: User | null;
}

interface PageProps {
    auth: Auth;
    [key: string]: any;
}

export default function AdminLayout({ children }: PropsWithChildren) {
    const { auth } = usePage<PageProps>().props;

    return (
        <div className="flex h-screen bg-gray-100">
            {/* Sidebar */}
            <aside className="w-64 bg-white shadow-md flex flex-col">
                <div className="p-6 border-b">
                    <h1 className="text-2xl font-bold text-gray-800">Admin Panel</h1>
                    <p className="text-sm text-gray-500 mt-1">
                        {auth?.user?.name || 'Staff Member'}
                    </p>
                </div>
                <nav className="p-4 space-y-2 flex-1">
                    <Link
                        href={route('admin.dashboard')}
                        className={`flex items-center px-4 py-2 rounded-lg ${
                            route().current('admin.dashboard')
                                ? 'bg-blue-50 text-blue-700'
                                : 'text-gray-700 hover:bg-gray-100'
                        }`}
                    >
                        <LayoutDashboard className="w-5 h-5 mr-3" />
                        Dashboard
                    </Link>
                    <Link
                        href={route('admin.orders.index')}
                        className={`flex items-center px-4 py-2 rounded-lg ${
                            route().current('admin.orders.*')
                                ? 'bg-blue-50 text-blue-700'
                                : 'text-gray-700 hover:bg-gray-100'
                        }`}
                    >
                        <ShoppingBag className="w-5 h-5 mr-3" />
                        Orders
                    </Link>
                    <Link
                        href={route('admin.products.index')}
                        className={`flex items-center px-4 py-2 rounded-lg ${
                            route().current('admin.products.*')
                                ? 'bg-blue-50 text-blue-700'
                                : 'text-gray-700 hover:bg-gray-100'
                        }`}
                    >
                        <Package className="w-5 h-5 mr-3" />
                        Products
                    </Link>
                    <Link
                        href={route('admin.staff.index')}
                        className={`flex items-center px-4 py-2 rounded-lg ${
                            route().current('admin.staff.*')
                                ? 'bg-blue-50 text-blue-700'
                                : 'text-gray-700 hover:bg-gray-100'
                        }`}
                    >
                        <Users className="w-5 h-5 mr-3" />
                        Staff
                    </Link>
                </nav>
                <div className="p-4 border-t bg-gray-50">
                    <Link
                        href={route('admin.logout')}
                        method="post"
                        as="button"
                        className="flex items-center w-full px-4 py-2 text-red-600 hover:bg-red-50 rounded-lg"
                    >
                        <LogOut className="w-5 h-5 mr-3" />
                        Logout
                    </Link>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 overflow-y-auto p-8">
                {children}
            </main>
        </div>
    );
}
