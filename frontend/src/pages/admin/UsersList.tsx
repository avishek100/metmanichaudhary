import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogTitle,
    AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { useAuth } from '@/contexts/AdminAuthContext';
import apiFetch from '@/lib/api';
import { Trash2 } from 'lucide-react';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';

interface User {
    _id: string;
    name: string;
    email: string;
    role: 'admin' | 'editor' | 'user';
    isActive: boolean;
    lastLogin: string;
    createdAt: string;
}

export default function UsersList() {
    const { token } = useAuth();
    const [usersList, setUsersList] = useState<User[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = async () => {
        try {
            const response = await apiFetch('/api/admin/users', {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            if (response.ok) {
                const data = await response.json();
                setUsersList(data.users);
            }
        } catch (error) {
            toast.error('Failed to fetch users');
        } finally {
            setIsLoading(false);
        }
    };

    const handleUpdateRole = async (userId: string, role: string) => {
        try {
            const response = await apiFetch(`/api/admin/users/${userId}/role`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({ role }),
            });

            if (response.ok) {
                toast.success('User role updated');
                fetchUsers();
            }
        } catch (error) {
            toast.error('Failed to update user role');
        }
    };

    const handleToggleStatus = async (userId: string) => {
        try {
            const response = await apiFetch(`/api/admin/users/${userId}/status`, {
                method: 'PATCH',
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            if (response.ok) {
                toast.success('User status updated');
                fetchUsers();
            }
        } catch (error) {
            toast.error('Failed to update user status');
        }
    };

    const handleDelete = async (userId: string) => {
        try {
            const response = await apiFetch(`/api/admin/users/${userId}`, {
                method: 'DELETE',
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            if (response.ok) {
                toast.success('User deleted successfully');
                fetchUsers();
            }
        } catch (error) {
            toast.error('Failed to delete user');
        }
    };

    if (isLoading) {
        return <div>Loading...</div>;
    }

    return (
        <div className="space-y-6">
            <h1 className="text-3xl font-bold">Users Management</h1>

            {/* Users Table */}
            <div className="overflow-x-auto">
                <Card>
                    <table className="w-full">
                        <thead className="border-b bg-gray-50">
                            <tr>
                                <th className="px-6 py-3 text-left text-sm font-semibold">Name</th>
                                <th className="px-6 py-3 text-left text-sm font-semibold">Email</th>
                                <th className="px-6 py-3 text-left text-sm font-semibold">Role</th>
                                <th className="px-6 py-3 text-left text-sm font-semibold">Status</th>
                                <th className="px-6 py-3 text-left text-sm font-semibold">Last Login</th>
                                <th className="px-6 py-3 text-left text-sm font-semibold">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {usersList.map((user) => (
                                <tr key={user._id} className="border-b hover:bg-gray-50">
                                    <td className="px-6 py-4">{user.name}</td>
                                    <td className="px-6 py-4">{user.email}</td>
                                    <td className="px-6 py-4">
                                        <Select
                                            value={user.role}
                                            onValueChange={(role) => handleUpdateRole(user._id, role)}
                                        >
                                            <SelectTrigger className="w-24">
                                                <SelectValue />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="user">User</SelectItem>
                                                <SelectItem value="editor">Editor</SelectItem>
                                                <SelectItem value="admin">Admin</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </td>
                                    <td className="px-6 py-4">
                                        <span
                                            className={`px-3 py-1 rounded text-sm ${user.isActive ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                                                }`}
                                        >
                                            {user.isActive ? 'Active' : 'Inactive'}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 text-sm">
                                        {user.lastLogin ? new Date(user.lastLogin).toLocaleDateString() : 'Never'}
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="flex gap-2">
                                            <Button
                                                variant="outline"
                                                size="sm"
                                                onClick={() => handleToggleStatus(user._id)}
                                            >
                                                {user.isActive ? 'Deactivate' : 'Activate'}
                                            </Button>
                                            <AlertDialog>
                                                <AlertDialogTrigger asChild>
                                                    <Button variant="destructive" size="sm">
                                                        <Trash2 className="w-4 h-4" />
                                                    </Button>
                                                </AlertDialogTrigger>
                                                <AlertDialogContent>
                                                    <AlertDialogTitle>Delete User</AlertDialogTitle>
                                                    <AlertDialogDescription>
                                                        Are you sure you want to delete this user? This action cannot be undone.
                                                    </AlertDialogDescription>
                                                    <div className="flex gap-4 justify-end">
                                                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                                                        <AlertDialogAction onClick={() => handleDelete(user._id)}>
                                                            Delete
                                                        </AlertDialogAction>
                                                    </div>
                                                </AlertDialogContent>
                                            </AlertDialog>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </Card>
            </div>

            {usersList.length === 0 && (
                <Card className="p-8 text-center">
                    <p className="text-gray-600">No users found.</p>
                </Card>
            )}
        </div>
    );
}
