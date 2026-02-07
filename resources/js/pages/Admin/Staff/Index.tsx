import { Head, Link, router } from '@inertiajs/react';
import { Plus, Edit, Trash2 } from 'lucide-react';
import AdminLayout from '@/Layouts/AdminLayout';


declare const route: any;

interface Role {
    id: number;
    name: string;
    slug: string;
}

interface Staff {
    id: number;
    name: string;
    email: string;
    roles: Role[];
}

interface PaginationLink {
    url: string | null;
    label: string;
    active: boolean;
}

interface Props {
    staff: {
        data: Staff[];
        meta: {
            links: PaginationLink[];
        };
    };
}

export default function StaffIndex({ staff }: Props) {
    const handleDelete = (id: number) => {
        if (confirm('Are you sure you want to delete this staff member?')) {
            router.delete(route('admin.staff.destroy', id));
        }
    };

    return (
        <AdminLayout>
            <Head title="Staff Management" />

            <div className="flex justify-between items-center mb-6">
                <h1 className="text-3xl font-bold text-gray-900">Staff Management</h1>
                <button
                    className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                    onClick={() => alert('Create functionality pending implementation')}
                >
                    <Plus className="w-5 h-5 mr-2" />
                    Add Staff
                </button>
            </div>

            <div className="bg-white rounded-lg shadow overflow-hidden border">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Roles</th>
                            <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {staff.data.map((user) => (
                            <tr key={user.id}>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="text-sm font-medium text-gray-900">{user.name}</div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="text-sm text-gray-500">{user.email}</div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="flex flex-wrap gap-1">
                                        {user.roles.map(role => (
                                            <span key={role.id} className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800">
                                                {role.name}
                                            </span>
                                        ))}
                                    </div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                    <button 
                                        className="text-indigo-600 hover:text-indigo-900 mr-4"
                                        onClick={() => alert('Edit functionality pending implementation')}
                                    >
                                        <Edit className="w-4 h-4" />
                                    </button>
                                    <button 
                                        className="text-red-600 hover:text-red-900"
                                        onClick={() => handleDelete(user.id)}
                                    >
                                        <Trash2 className="w-4 h-4" />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                {staff.data.length === 0 && (
                     <div className="p-6 text-center text-gray-500">No staff members found.</div>
                )}
            </div>
            
             {/* Pagination (Simplified) */}
             {staff.meta && staff.meta.links && (
                <div className="mt-4 flex justify-end">
                    <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px">
                        {staff.meta.links.map((link, i) => (
                            <Link
                                key={i}
                                href={link.url || '#'}
                                className={`relative inline-flex items-center px-4 py-2 border text-sm font-medium ${
                                    link.active
                                        ? 'z-10 bg-indigo-50 border-indigo-500 text-indigo-600'
                                        : 'bg-white border-gray-300 text-gray-500 hover:bg-gray-50'
                                } ${!link.url ? 'cursor-not-allowed opacity-50' : ''}`}
                                dangerouslySetInnerHTML={{ __html: link.label }}
                            />
                        ))}
                    </nav>
                </div>
            )}
        </AdminLayout>
    );
}
