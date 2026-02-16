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
import { Edit, Trash2 } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

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

    if (isLoading) {
        return <div>Loading...</div>;
    }

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h1 className="text-3xl font-bold">Videos Management</h1>
                <Button onClick={() => navigate('/admin/videos/create')}>Add Video</Button>
            </div>

            {/* Filters */}
            <div className="flex gap-4">
                <Select value={status} onValueChange={setStatus}>
                    <SelectTrigger className="w-40">
                        <SelectValue placeholder="Filter by status" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="all">All Status</SelectItem>
                        <SelectItem value="draft">Draft</SelectItem>
                        <SelectItem value="published">Published</SelectItem>
                    </SelectContent>
                </Select>

                <Select value={category} onValueChange={setCategory}>
                    <SelectTrigger className="w-40">
                        <SelectValue placeholder="Filter by category" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="all">All Categories</SelectItem>
                        <SelectItem value="event">Event</SelectItem>
                        <SelectItem value="tutorial">Tutorial</SelectItem>
                        <SelectItem value="news">News</SelectItem>
                    </SelectContent>
                </Select>
            </div>

            {/* Videos List */}
            <div className="grid gap-4">
                {videosList.map((video) => (
                    <Card key={video._id} className="p-4">
                        <div className="flex gap-4">
                            <div className="w-32 h-24 bg-gray-200 rounded flex items-center justify-center">
                                🎥
                            </div>
                            <div className="flex-1">
                                <h3 className="text-lg font-semibold">{video.title}</h3>
                                {/* hide full path; show host and a view link instead */}
                                <div className="flex items-center gap-3 text-sm text-gray-600">
                                    <span>
                                        {(() => {
                                            try {
                                                const u = new URL(video.videoUrl);
                                                return `Hosted: ${u.hostname}`;
                                            } catch (e) {
                                                return 'Hosted: external';
                                            }
                                        })()}
                                    </span>
                                    <a
                                        href={video.videoUrl}
                                        target="_blank"
                                        rel="noreferrer"
                                        className="text-indigo-600 hover:underline"
                                    >
                                        View
                                    </a>
                                </div>
                                <div className="flex gap-4 mt-2 text-sm">
                                    <span className={`px-2 py-1 rounded ${video.status === 'published' ? 'bg-green-100' : 'bg-yellow-100'}`}>
                                        {video.status}
                                    </span>
                                    <span className="text-gray-600">{video.category}</span>
                                    <span className="text-gray-600">Duration: {video.duration}s</span>
                                    <span className="text-gray-600">Views: {video.views}</span>
                                </div>
                            </div>
                            <div className="flex gap-2">
                                <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={() => handleToggleFeatured(video._id)}
                                >
                                    {video.featured ? '⭐' : '☆'}
                                </Button>
                                <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={() => navigate(`/admin/videos/${video._id}`)}
                                >
                                    <Edit className="w-4 h-4" />
                                </Button>
                                <AlertDialog>
                                    <AlertDialogTrigger asChild>
                                        <Button variant="destructive" size="sm">
                                            <Trash2 className="w-4 h-4" />
                                        </Button>
                                    </AlertDialogTrigger>
                                    <AlertDialogContent>
                                        <AlertDialogTitle>Delete Video</AlertDialogTitle>
                                        <AlertDialogDescription>
                                            Are you sure you want to delete this video?
                                        </AlertDialogDescription>
                                        <div className="flex gap-4 justify-end">
                                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                                            <AlertDialogAction onClick={() => handleDelete(video._id)}>
                                                Delete
                                            </AlertDialogAction>
                                        </div>
                                    </AlertDialogContent>
                                </AlertDialog>
                            </div>
                        </div>
                    </Card>
                ))}
            </div>

            {videosList.length === 0 && (
                <Card className="p-8 text-center">
                    <p className="text-gray-600">No videos found. Add your first video.</p>
                </Card>
            )}
        </div>
    );
}
