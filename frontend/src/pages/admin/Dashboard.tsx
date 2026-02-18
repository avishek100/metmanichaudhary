import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useAuth } from '@/contexts/AdminAuthContext';
import apiFetch from '@/lib/api';
import { FileText, Image, Users, Video, TrendingUp, Eye, Plus } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { toast } from 'sonner';

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

function StatCard({ title, value, subtitle, icon: Icon, gradient, delay = 0 }: {
    title: string;
    value: number | string;
    subtitle?: string;
    icon: any;
    gradient: string;
    delay?: number;
}) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay }}
        >
            <Card className="relative overflow-hidden border-0 shadow-lg hover:shadow-xl transition-shadow duration-300">
                <div className={`absolute top-0 right-0 w-32 h-32 ${gradient} opacity-10 rounded-full -mr-16 -mt-16`} />
                <CardHeader className="pb-3">
                    <div className="flex items-center justify-between">
                        <CardTitle className="text-sm font-medium text-muted-foreground">{title}</CardTitle>
                        <div className={`p-2 rounded-lg ${gradient} bg-opacity-10`}>
                            <Icon className={`w-5 h-5 ${gradient.includes('blue') ? 'text-blue-600' : gradient.includes('green') ? 'text-green-600' : gradient.includes('purple') ? 'text-purple-600' : 'text-orange-600'}`} />
                        </div>
                    </div>
                </CardHeader>
                <CardContent>
                    <div className="text-3xl font-bold mb-1">{value}</div>
                    {subtitle && <p className="text-xs text-muted-foreground">{subtitle}</p>}
                </CardContent>
            </Card>
        </motion.div>
    );
}

function LoadingSkeleton() {
    return (
        <div className="space-y-6">
            <div className="space-y-2">
                <div className="skeleton h-10 w-64" />
                <div className="skeleton h-5 w-96" />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {[...Array(4)].map((_, i) => (
                    <Card key={i} className="p-6">
                        <div className="skeleton h-4 w-24 mb-4" />
                        <div className="skeleton h-8 w-16 mb-2" />
                        <div className="skeleton h-3 w-32" />
                    </Card>
                ))}
            </div>
        </div>
    );
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
                } else {
                    const errorData = await response.json().catch(() => ({}));
                    toast.error(errorData.message || 'Failed to fetch dashboard stats');
                }
            } catch (error) {
                console.error('Failed to fetch stats:', error);
                toast.error('Failed to load dashboard data');
            } finally {
                setIsLoading(false);
            }
        };

        if (token) {
            fetchStats();
        }
    }, [token]);

    if (isLoading) {
        return <LoadingSkeleton />;
    }

    const totalViews = (stats?.totalNewsViews || 0) + (stats?.totalPhotoViews || 0) + (stats?.totalVideoViews || 0);

    return (
        <div className="space-y-6">
            <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
            >
                <h1 className="text-4xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                    Dashboard
                </h1>
                <p className="text-muted-foreground mt-2">Welcome back! Here's what's happening with your content.</p>
            </motion.div>

            {/* Main Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <StatCard
                    title="Total Users"
                    value={stats?.totalUsers || 0}
                    icon={Users}
                    gradient="bg-blue-500"
                    delay={0.1}
                />
                <StatCard
                    title="Total News"
                    value={stats?.totalNews || 0}
                    subtitle={`${stats?.publishedNews || 0} published`}
                    icon={FileText}
                    gradient="bg-green-500"
                    delay={0.2}
                />
                <StatCard
                    title="Total Photos"
                    value={stats?.totalPhotos || 0}
                    subtitle={`${stats?.publishedPhotos || 0} published`}
                    icon={Image}
                    gradient="bg-purple-500"
                    delay={0.3}
                />
                <StatCard
                    title="Total Videos"
                    value={stats?.totalVideos || 0}
                    subtitle={`${stats?.publishedVideos || 0} published`}
                    icon={Video}
                    gradient="bg-orange-500"
                    delay={0.4}
                />
            </div>

            {/* Views Stats */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
            >
                <Card className="border-2 border-primary/20 shadow-lg">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <Eye className="w-5 h-5 text-primary" />
                            Engagement Analytics
                        </CardTitle>
                        <CardDescription>Total views across all content types</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                            <div className="text-center p-4 rounded-lg bg-primary/5">
                                <div className="text-2xl font-bold text-primary">{totalViews.toLocaleString()}</div>
                                <div className="text-sm text-muted-foreground mt-1">Total Views</div>
                            </div>
                            <div className="text-center p-4 rounded-lg bg-green-500/5">
                                <div className="text-2xl font-bold text-green-600">{stats?.totalNewsViews?.toLocaleString() || 0}</div>
                                <div className="text-sm text-muted-foreground mt-1">News Views</div>
                            </div>
                            <div className="text-center p-4 rounded-lg bg-purple-500/5">
                                <div className="text-2xl font-bold text-purple-600">{stats?.totalPhotoViews?.toLocaleString() || 0}</div>
                                <div className="text-sm text-muted-foreground mt-1">Photo Views</div>
                            </div>
                            <div className="text-center p-4 rounded-lg bg-orange-500/5">
                                <div className="text-2xl font-bold text-orange-600">{stats?.totalVideoViews?.toLocaleString() || 0}</div>
                                <div className="text-sm text-muted-foreground mt-1">Video Views</div>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </motion.div>

            {/* Quick Actions */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
            >
                <Card className="border-2 border-secondary/20 shadow-lg">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <Plus className="w-5 h-5 text-secondary" />
                            Quick Actions
                        </CardTitle>
                        <CardDescription>Create new content or manage existing items</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                            <Button
                                onClick={() => navigate('/admin/news/create')}
                                size="lg"
                                className="w-full h-auto py-6 bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white shadow-lg hover:shadow-xl transition-all duration-300"
                            >
                                <FileText className="w-5 h-5 mr-2" />
                                Create News
                            </Button>
                            <Button
                                onClick={() => navigate('/admin/photos/create')}
                                size="lg"
                                className="w-full h-auto py-6 bg-gradient-to-r from-emerald-500 to-green-600 hover:from-emerald-600 hover:to-green-700 text-white shadow-lg hover:shadow-xl transition-all duration-300"
                            >
                                <Image className="w-5 h-5 mr-2" />
                                Add Photo
                            </Button>
                            <Button
                                onClick={() => navigate('/admin/videos/create')}
                                size="lg"
                                className="w-full h-auto py-6 bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700 text-white shadow-lg hover:shadow-xl transition-all duration-300"
                            >
                                <Video className="w-5 h-5 mr-2" />
                                Add Video
                            </Button>
                            <Button
                                onClick={() => navigate('/admin/users')}
                                size="lg"
                                variant="outline"
                                className="w-full h-auto py-6 border-2 hover:bg-primary hover:text-primary-foreground transition-all duration-300"
                            >
                                <Users className="w-5 h-5 mr-2" />
                                Manage Users
                            </Button>
                        </div>
                    </CardContent>
                </Card>
            </motion.div>
        </div>
    );
}
