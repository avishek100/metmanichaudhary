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
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { useAuth } from '@/contexts/AdminAuthContext';
import apiFetch from '@/lib/api';
import { Trash2, Users, Shield, UserCheck, UserX, Mail, Calendar } from 'lucide-react';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';
import { motion } from 'framer-motion';

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

    const getRoleIcon = (role: string) => {
        switch (role) {
            case 'admin':
                return <Shield className="w-4 h-4" />;
            case 'editor':
                return <UserCheck className="w-4 h-4" />;
            default:
                return <Users className="w-4 h-4" />;
        }
    };

    const getRoleColor = (role: string) => {
        switch (role) {
            case 'admin':
                return 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400';
            case 'editor':
                return 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400';
            default:
                return 'bg-gray-100 text-gray-700 dark:bg-gray-900/30 dark:text-gray-400';
        }
    };

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-3xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                    Users Management
                </h1>
                <p className="text-muted-foreground mt-1">Manage user accounts, roles, and permissions</p>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <Card className="border-2 border-border">
                    <CardContent className="pt-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm text-muted-foreground">Total Users</p>
                                <p className="text-2xl font-bold mt-1">{usersList.length}</p>
                            </div>
                            <Users className="w-8 h-8 text-primary" />
                        </div>
                    </CardContent>
                </Card>
                <Card className="border-2 border-border">
                    <CardContent className="pt-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm text-muted-foreground">Admins</p>
                                <p className="text-2xl font-bold mt-1">{usersList.filter(u => u.role === 'admin').length}</p>
                            </div>
                            <Shield className="w-8 h-8 text-red-500" />
                        </div>
                    </CardContent>
                </Card>
                <Card className="border-2 border-border">
                    <CardContent className="pt-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm text-muted-foreground">Editors</p>
                                <p className="text-2xl font-bold mt-1">{usersList.filter(u => u.role === 'editor').length}</p>
                            </div>
                            <UserCheck className="w-8 h-8 text-blue-500" />
                        </div>
                    </CardContent>
                </Card>
                <Card className="border-2 border-border">
                    <CardContent className="pt-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm text-muted-foreground">Active</p>
                                <p className="text-2xl font-bold mt-1">{usersList.filter(u => u.isActive).length}</p>
                            </div>
                            <UserCheck className="w-8 h-8 text-green-500" />
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* Users Table */}
            {isLoading ? (
                <Card className="border-2 border-border">
                    <CardContent className="pt-6">
                        <div className="space-y-4">
                            {[...Array(5)].map((_, i) => (
                                <div key={i} className="flex gap-4">
                                    <div className="skeleton h-12 w-12 rounded-full" />
                                    <div className="flex-1 space-y-2">
                                        <div className="skeleton h-4 w-1/4" />
                                        <div className="skeleton h-3 w-1/3" />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>
            ) : usersList.length > 0 ? (
                <Card className="border-2 border-border overflow-hidden">
                    <CardHeader>
                        <CardTitle>All Users</CardTitle>
                        <CardDescription>Manage user roles and account status</CardDescription>
                    </CardHeader>
                    <CardContent className="p-0">
                        <div className="overflow-x-auto">
                            <table className="w-full">
                                <thead className="bg-muted/50 border-b border-border">
                                    <tr>
                                        <th className="px-6 py-4 text-left text-sm font-semibold">User</th>
                                        <th className="px-6 py-4 text-left text-sm font-semibold">Role</th>
                                        <th className="px-6 py-4 text-left text-sm font-semibold">Status</th>
                                        <th className="px-6 py-4 text-left text-sm font-semibold">Last Login</th>
                                        <th className="px-6 py-4 text-left text-sm font-semibold">Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {usersList.map((user, index) => (
                                        <motion.tr
                                            key={user._id}
                                            initial={{ opacity: 0, x: -20 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            transition={{ delay: index * 0.05 }}
                                            className="border-b border-border hover:bg-muted/30 transition-colors"
                                        >
                                            <td className="px-6 py-4">
                                                <div className="flex items-center gap-3">
                                                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-white font-semibold">
                                                        {user.name.charAt(0).toUpperCase()}
                                                    </div>
                                                    <div>
                                                        <p className="font-semibold">{user.name}</p>
                                                        <p className="text-sm text-muted-foreground flex items-center gap-1">
                                                            <Mail className="w-3 h-3" />
                                                            {user.email}
                                                        </p>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4">
                                                <Select
                                                    value={user.role}
                                                    onValueChange={(role) => handleUpdateRole(user._id, role)}
                                                >
                                                    <SelectTrigger className="w-32">
                                                        <div className="flex items-center gap-2">
                                                            {getRoleIcon(user.role)}
                                                            <SelectValue />
                                                        </div>
                                                    </SelectTrigger>
                                                    <SelectContent>
                                                        <SelectItem value="user">
                                                            <div className="flex items-center gap-2">
                                                                <Users className="w-4 h-4" />
                                                                User
                                                            </div>
                                                        </SelectItem>
                                                        <SelectItem value="editor">
                                                            <div className="flex items-center gap-2">
                                                                <UserCheck className="w-4 h-4" />
                                                                Editor
                                                            </div>
                                                        </SelectItem>
                                                        <SelectItem value="admin">
                                                            <div className="flex items-center gap-2">
                                                                <Shield className="w-4 h-4" />
                                                                Admin
                                                            </div>
                                                        </SelectItem>
                                                    </SelectContent>
                                                </Select>
                                            </td>
                                            <td className="px-6 py-4">
                                                <span className={`px-3 py-1 rounded-full text-sm font-medium flex items-center gap-1 w-fit ${
                                                    user.isActive
                                                        ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400'
                                                        : 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400'
                                                }`}>
                                                    {user.isActive ? (
                                                        <>
                                                            <UserCheck className="w-3 h-3" />
                                                            Active
                                                        </>
                                                    ) : (
                                                        <>
                                                            <UserX className="w-3 h-3" />
                                                            Inactive
                                                        </>
                                                    )}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 text-sm text-muted-foreground">
                                                {user.lastLogin ? (
                                                    <div className="flex items-center gap-1">
                                                        <Calendar className="w-3 h-3" />
                                                        {new Date(user.lastLogin).toLocaleDateString()}
                                                    </div>
                                                ) : (
                                                    <span className="text-muted-foreground">Never</span>
                                                )}
                                            </td>
                                            <td className="px-6 py-4">
                                                <div className="flex gap-2">
                                                    <Button
                                                        variant="outline"
                                                        size="sm"
                                                        onClick={() => handleToggleStatus(user._id)}
                                                        className={user.isActive ? 'hover:bg-red-50 hover:text-red-600' : 'hover:bg-green-50 hover:text-green-600'}
                                                    >
                                                        {user.isActive ? (
                                                            <>
                                                                <UserX className="w-4 h-4 mr-1" />
                                                                Deactivate
                                                            </>
                                                        ) : (
                                                            <>
                                                                <UserCheck className="w-4 h-4 mr-1" />
                                                                Activate
                                                            </>
                                                        )}
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
                                                                Are you sure you want to delete "{user.name}"? This action cannot be undone and will permanently remove this user account.
                                                            </AlertDialogDescription>
                                                            <div className="flex gap-4 justify-end mt-4">
                                                                <AlertDialogCancel>Cancel</AlertDialogCancel>
                                                                <AlertDialogAction
                                                                    onClick={() => handleDelete(user._id)}
                                                                    className="bg-destructive hover:bg-destructive/90"
                                                                >
                                                                    Delete
                                                                </AlertDialogAction>
                                                            </div>
                                                        </AlertDialogContent>
                                                    </AlertDialog>
                                                </div>
                                            </td>
                                        </motion.tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </CardContent>
                </Card>
            ) : (
                <Card className="p-12 text-center border-2 border-dashed">
                    <div className="text-6xl mb-4">👥</div>
                    <h3 className="text-xl font-semibold mb-2">No users found</h3>
                    <p className="text-muted-foreground">No users have been registered yet.</p>
                </Card>
            )}
        </div>
    );
}
