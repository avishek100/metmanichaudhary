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
import { Edit, Trash2, Video, Plus, Eye, Star, ExternalLink, Clock } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { motion } from 'framer-motion';

interface Video {
    _id: string;
    title: string;
    videoUrl: string;
    category: string;
    status: string;
    duration: number;
    views: number;
    featured: boolean;
    createdAt: string;
}

export default function VideosList() {
    const { token } = useAuth();
    const navigate = useNavigate();
    const [videosList, setVideosList] = useState<Video[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [status, setStatus] = useState('all');
    const [category, setCategory] = useState('all');

    useEffect(() => {
        fetchVideos();
    }, [status, category]);

    const fetchVideos = async () => {
        try {
            const params = new URLSearchParams();
            if (status && status !== 'all') params.append('status', status);
            if (category && category !== 'all') params.append('category', category);

            const response = await apiFetch(`/api/videos?${params}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            if (response.ok) {
                const data = await response.json();
                setVideosList(data.videos);
            }
        } catch (error) {
            toast.error('Failed to fetch videos');
        } finally {
            setIsLoading(false);
        }
    };

    const handleDelete = async (id: string) => {
        try {
            const response = await apiFetch(`/api/videos/${id}`, {
                method: 'DELETE',
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            if (response.ok) {
                toast.success('Video deleted successfully');
                fetchVideos();
            }
        } catch (error) {
            toast.error('Failed to delete video');
        }
    };

    const handleToggleFeatured = async (id: string) => {
        try {
            const response = await apiFetch(`/api/videos/${id}/featured`, {
                method: 'PATCH',
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            if (response.ok) {
                toast.success('Featured status updated');
                fetchVideos();
            }
        } catch (error) {
            toast.error('Failed to update featured status');
        }
    };

    const formatDuration = (seconds: number) => {
        if (!seconds) return 'N/A';
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins}:${secs.toString().padStart(2, '0')}`;
    };

    return (
        <div className="space-y-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                    <h1 className="text-3xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                        Videos Management
                    </h1>
                    <p className="text-muted-foreground mt-1">Manage and organize your video content</p>
                </div>
                <Button
                    onClick={() => navigate('/admin/videos/create')}
                    className="bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90 shadow-lg"
                >
                    <Plus className="w-4 h-4 mr-2" />
                    Add Video
                </Button>
            </div>

            {/* Filters */}
            <Card className="border-2 border-border">
                <CardContent className="pt-6">
                    <div className="flex flex-wrap gap-4">
                        <div className="flex-1 min-w-[150px]">
                            <label className="text-sm font-medium text-muted-foreground mb-2 block">Status</label>
                            <Select value={status} onValueChange={setStatus}>
                                <SelectTrigger>
                                    <SelectValue placeholder="Filter by status" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="all">All Status</SelectItem>
                                    <SelectItem value="draft">Draft</SelectItem>
                                    <SelectItem value="published">Published</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>

                        <div className="flex-1 min-w-[150px]">
                            <label className="text-sm font-medium text-muted-foreground mb-2 block">Category</label>
                            <Select value={category} onValueChange={setCategory}>
                                <SelectTrigger>
                                    <SelectValue placeholder="Filter by category" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="all">All Categories</SelectItem>
                                    <SelectItem value="event">Event</SelectItem>
                                    <SelectItem value="tutorial">Tutorial</SelectItem>
                                    <SelectItem value="news">News</SelectItem>
                                    <SelectItem value="other">Other</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                    </div>
                </CardContent>
            </Card>

            {/* Videos List */}
            {isLoading ? (
                <div className="grid gap-4">
                    {[...Array(5)].map((_, i) => (
                        <Card key={i} className="p-4">
                            <div className="flex gap-4">
                                <div className="skeleton w-32 h-24 rounded-lg" />
                                <div className="flex-1 space-y-2">
                                    <div className="skeleton h-6 w-3/4" />
                                    <div className="skeleton h-4 w-full" />
                                    <div className="skeleton h-4 w-2/3" />
                                </div>
                            </div>
                        </Card>
                    ))}
                </div>
            ) : videosList.length > 0 ? (
                <div className="grid gap-4">
                    {videosList.map((video, index) => (
                        <motion.div
                            key={video._id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.05 }}
                        >
                            <Card className="p-4 hover:shadow-xl transition-all duration-300 border-2 hover:border-primary/20">
                                <div className="flex flex-col sm:flex-row gap-4">
                                    <div className="relative w-full sm:w-48 h-32 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-lg flex items-center justify-center overflow-hidden group">
                                        <Video className="w-12 h-12 text-primary/50" />
                                        {video.featured && (
                                            <div className="absolute top-2 left-2">
                                                <span className="px-2 py-1 bg-yellow-400 text-yellow-900 text-xs font-semibold rounded">
                                                    Featured
                                                </span>
                                            </div>
                                        )}
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <div className="flex items-start justify-between gap-4 mb-2">
                                            <h3 className="text-lg font-semibold line-clamp-2">{video.title}</h3>
                                            {video.featured && (
                                                <Star className="w-5 h-5 text-yellow-500 fill-yellow-500 flex-shrink-0" />
                                            )}
                                        </div>
                                        <div className="flex items-center gap-3 text-sm text-muted-foreground mb-3">
                                            <span className="flex items-center gap-1">
                                                {(() => {
                                                    try {
                                                        const u = new URL(video.videoUrl);
                                                        return (
                                                            <>
                                                                <Video className="w-3 h-3" />
                                                                {u.hostname}
                                                            </>
                                                        );
                                                    } catch (e) {
                                                        return (
                                                            <>
                                                                <Video className="w-3 h-3" />
                                                                External
                                                            </>
                                                        );
                                                    }
                                                })()}
                                            </span>
                                            <a
                                                href={video.videoUrl}
                                                target="_blank"
                                                rel="noreferrer"
                                                className="text-primary hover:underline flex items-center gap-1"
                                            >
                                                <ExternalLink className="w-3 h-3" />
                                                View
                                            </a>
                                        </div>
                                        <div className="flex flex-wrap items-center gap-3 text-sm mb-4">
                                            <span className={`px-3 py-1 rounded-full font-medium ${
                                                video.status === 'published'
                                                    ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400'
                                                    : 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400'
                                            }`}>
                                                {video.status.charAt(0).toUpperCase() + video.status.slice(1)}
                                            </span>
                                            <span className="px-3 py-1 rounded-full bg-primary/10 text-primary font-medium">
                                                {video.category}
                                            </span>
                                            <span className="text-muted-foreground flex items-center gap-1">
                                                <Clock className="w-3 h-3" />
                                                {formatDuration(video.duration)}
                                            </span>
                                            <span className="text-muted-foreground flex items-center gap-1">
                                                <Eye className="w-3 h-3" />
                                                {video.views || 0} views
                                            </span>
                                        </div>
                                        <div className="flex gap-2">
                                            <Button
                                                variant="outline"
                                                size="sm"
                                                onClick={() => handleToggleFeatured(video._id)}
                                                className="flex-1 sm:flex-none"
                                                title={video.featured ? 'Remove from featured' : 'Mark as featured'}
                                            >
                                                <Star className={`w-4 h-4 mr-1 ${video.featured ? 'fill-yellow-400 text-yellow-400' : ''}`} />
                                                {video.featured ? 'Featured' : 'Feature'}
                                            </Button>
                                            <Button
                                                variant="outline"
                                                size="sm"
                                                onClick={() => navigate(`/admin/videos/${video._id}`)}
                                                className="flex-1 sm:flex-none"
                                            >
                                                <Edit className="w-4 h-4 mr-1" />
                                                Edit
                                            </Button>
                                            <AlertDialog>
                                                <AlertDialogTrigger asChild>
                                                    <Button variant="destructive" size="sm" className="flex-1 sm:flex-none">
                                                        <Trash2 className="w-4 h-4 mr-1" />
                                                        Delete
                                                    </Button>
                                                </AlertDialogTrigger>
                                                <AlertDialogContent>
                                                    <AlertDialogTitle>Delete Video</AlertDialogTitle>
                                                    <AlertDialogDescription>
                                                        Are you sure you want to delete "{video.title}"? This action cannot be undone.
                                                    </AlertDialogDescription>
                                                    <div className="flex gap-4 justify-end mt-4">
                                                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                                                        <AlertDialogAction
                                                            onClick={() => handleDelete(video._id)}
                                                            className="bg-destructive hover:bg-destructive/90"
                                                        >
                                                            Delete
                                                        </AlertDialogAction>
                                                    </div>
                                                </AlertDialogContent>
                                            </AlertDialog>
                                        </div>
                                    </div>
                                </div>
                            </Card>
                        </motion.div>
                    ))}
                </div>
            ) : (
                <Card className="p-12 text-center border-2 border-dashed">
                    <div className="text-6xl mb-4">🎥</div>
                    <h3 className="text-xl font-semibold mb-2">No videos found</h3>
                    <p className="text-muted-foreground mb-6">
                        {status !== 'all' || category !== 'all'
                            ? 'Try adjusting your filters to see more results.'
                            : 'Get started by adding your first video.'}
                    </p>
                    <Button onClick={() => navigate('/admin/videos/create')} className="bg-gradient-to-r from-primary to-secondary">
                        <Plus className="w-4 h-4 mr-2" />
                        Add Video
                    </Button>
                </Card>
            )}
        </div>
    );
}
