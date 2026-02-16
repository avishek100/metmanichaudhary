import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useAuth } from '@/contexts/AdminAuthContext';
import apiFetch from '@/lib/api';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

interface DashboardStats {
    totalUsers: number;
    totalNews: number;
    totalPhotos: number;
    totalVideos: number;
    publishedNews: number;
    publishedPhotos: number;
    publishedVideos: number;
    totalNewsViews: number;
    totalPhotoViews: number;
    totalVideoViews: number;
}

export default function AdminDashboard() {
    const { token } = useAuth();
    const navigate = useNavigate();
    const [stats, setStats] = useState<DashboardStats | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchStats = async () => {
            try {
                const response = await apiFetch('/api/admin/stats', {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                if (response.ok) {
                    const data = await response.json();
                    setStats(data);
                }
            } catch (error) {
                console.error('Failed to fetch stats:', error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchStats();
    }, [token]);

    if (isLoading) {
        return <div>Loading...</div>;
    }

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-3xl font-bold">Dashboard</h1>
                <p className="text-gray-600 mt-2">Welcome to your Metmani Chaudhary panel</p>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <Card>
                    <CardHeader className="pb-2 flex items-center justify-between">
                        <CardTitle className="text-sm font-medium">Total Users</CardTitle>
                        <div className="text-sm text-slate-500">👥</div>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{stats?.totalUsers || 0}</div>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader className="pb-2 flex items-center justify-between">
                        <CardTitle className="text-sm font-medium">Total News</CardTitle>
                        <div className="text-sm text-slate-500">📰</div>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{stats?.totalNews || 0}</div>
                        <p className="text-xs text-gray-500">Published: {stats?.publishedNews || 0}</p>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader className="pb-2 flex items-center justify-between">
                        <CardTitle className="text-sm font-medium">Total Photos</CardTitle>
                        <div className="text-sm text-slate-500">📷</div>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{stats?.totalPhotos || 0}</div>
                        <p className="text-xs text-gray-500">Published: {stats?.publishedPhotos || 0}</p>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader className="pb-2 flex items-center justify-between">
                        <CardTitle className="text-sm font-medium">Total Videos</CardTitle>
                        <div className="text-sm text-slate-500">🎥</div>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{stats?.totalVideos || 0}</div>
                        <p className="text-xs text-gray-500">Published: {stats?.publishedVideos || 0}</p>
                    </CardContent>
                </Card>
            </div>

            {/* Views Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Card>
                    <CardHeader className="pb-2">
                        <CardTitle className="text-sm font-medium">News Views</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{stats?.totalNewsViews || 0}</div>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader className="pb-2">
                        <CardTitle className="text-sm font-medium">Photo Views</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{stats?.totalPhotoViews || 0}</div>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader className="pb-2">
                        <CardTitle className="text-sm font-medium">Video Views</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{stats?.totalVideoViews || 0}</div>
                    </CardContent>
                </Card>
            </div>

            {/* Quick Actions */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <Button onClick={() => navigate('/admin/news/create')} size="lg" className="w-full bg-gradient-to-r from-indigo-500 to-pink-500 text-white">
                    Create News
                </Button>
                <Button onClick={() => navigate('/admin/photos/create')} size="lg" className="w-full bg-gradient-to-r from-emerald-400 to-green-600 text-white">
                    Add Photo
                </Button>
                <Button onClick={() => navigate('/admin/videos/create')} size="lg" className="w-full bg-gradient-to-r from-yellow-400 to-orange-500 text-white">
                    Add Video
                </Button>
                <Button onClick={() => navigate('/admin/users')} size="lg" variant="outline" className="w-full">
                    Manage Users
                </Button>
            </div>
        </div>
    );
}
