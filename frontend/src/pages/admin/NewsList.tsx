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

interface News {
    _id: string;
    title: string;
    description: string;
    image: string;
    status: string;
    category: string;
    views: number;
    featured: boolean;
    createdAt: string;
}

export default function NewsList() {
    const { token } = useAuth();
    const navigate = useNavigate();
    const [newsList, setNewsList] = useState<News[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [status, setStatus] = useState('all');
    const [category, setCategory] = useState('all');

    useEffect(() => {
        fetchNews();
    }, [status, category]);

    const fetchNews = async () => {
        try {
            const params = new URLSearchParams();
            if (status && status !== 'all') params.append('status', status);
            if (category && category !== 'all') params.append('category', category);

            const response = await apiFetch(`/api/news?${params}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            if (response.ok) {
                const data = await response.json();
                setNewsList(data.news);
            }
        } catch (error) {
            toast.error('Failed to fetch news');
        } finally {
            setIsLoading(false);
        }
    };

    const handleDelete = async (id: string) => {
        try {
            const response = await apiFetch(`/api/news/${id}`, {
                method: 'DELETE',
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            if (response.ok) {
                toast.success('News deleted successfully');
                fetchNews();
            }
        } catch (error) {
            toast.error('Failed to delete news');
        }
    };

    const handleToggleFeatured = async (id: string) => {
        try {
            const response = await apiFetch(`/api/news/${id}/featured`, {
                method: 'PATCH',
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            if (response.ok) {
                toast.success('Featured status updated');
                fetchNews();
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
                <h1 className="text-3xl font-bold">News Management</h1>
                <Button onClick={() => navigate('/admin/news/create')}>Create News</Button>
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
                        <SelectItem value="announcement">Announcement</SelectItem>
                        <SelectItem value="event">Event</SelectItem>
                        <SelectItem value="update">Update</SelectItem>
                    </SelectContent>
                </Select>
            </div>

            {/* News List */}
            <div className="grid gap-4">
                {newsList.map((news) => (
                    <Card key={news._id} className="p-4">
                        <div className="flex gap-4">
                            <img
                                src={news.image}
                                alt={news.title}
                                className="w-24 h-24 object-cover rounded"
                            />
                            <div className="flex-1">
                                <h3 className="text-lg font-semibold">{news.title}</h3>
                                <p className="text-sm text-gray-600">{news.description}</p>
                                <div className="flex gap-4 mt-2 text-sm">
                                    <span className={`px-2 py-1 rounded ${news.status === 'published' ? 'bg-green-100' : 'bg-yellow-100'}`}>
                                        {news.status}
                                    </span>
                                    <span className="text-gray-600">{news.category}</span>
                                    <span className="text-gray-600">Views: {news.views}</span>
                                </div>
                            </div>
                            <div className="flex gap-2">
                                <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={() => handleToggleFeatured(news._id)}
                                >
                                    {news.featured ? '⭐' : '☆'}
                                </Button>
                                <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={() => navigate(`/admin/news/${news._id}`)}
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
                                        <AlertDialogTitle>Delete News</AlertDialogTitle>
                                        <AlertDialogDescription>
                                            Are you sure you want to delete this news? This action cannot be undone.
                                        </AlertDialogDescription>
                                        <div className="flex gap-4 justify-end">
                                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                                            <AlertDialogAction onClick={() => handleDelete(news._id)}>
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

            {newsList.length === 0 && (
                <Card className="p-8 text-center">
                    <p className="text-gray-600">No news found. Create your first news item.</p>
                </Card>
            )}
        </div>
    );
}
