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

    return (
        <div className="space-y-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                    <h1 className="text-3xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">News Management</h1>
                    <p className="text-muted-foreground mt-1">Manage and organize your news articles</p>
                </div>
                <Button
                    onClick={() => navigate('/admin/news/create')}
                    className="bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90 shadow-lg"
                >
                    Create News
                </Button>
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
            {isLoading ? (
                <div className="grid gap-4">
                    {[...Array(5)].map((_, i) => (
                        <Card key={i} className="p-4">
                            <div className="flex gap-4">
                                <div className="skeleton w-24 h-24 rounded-lg" />
                                <div className="flex-1 space-y-2">
                                    <div className="skeleton h-6 w-3/4" />
                                    <div className="skeleton h-4 w-full" />
                                    <div className="skeleton h-4 w-2/3" />
                                    <div className="flex gap-2 mt-2">
                                        <div className="skeleton h-6 w-20 rounded" />
                                        <div className="skeleton h-6 w-24 rounded" />
                                    </div>
                                </div>
                            </div>
                        </Card>
                    ))}
                </div>
            ) : newsList.length > 0 ? (
                <div className="grid gap-4">
                    {newsList.map((news) => (
                        <Card key={news._id} className="p-4 hover:shadow-lg transition-all duration-300 border-2 hover:border-primary/20">
                            <div className="flex flex-col sm:flex-row gap-4">
                                {news.image && (
                                    <img
                                        src={news.image}
                                        alt={news.title}
                                        className="w-full sm:w-32 h-32 object-cover rounded-lg"
                                    />
                                )}
                                <div className="flex-1 min-w-0">
                                    <div className="flex items-start justify-between gap-4 mb-2">
                                        <h3 className="text-lg font-semibold line-clamp-2">{news.title}</h3>
                                        {news.featured && (
                                            <span className="text-yellow-500 text-xl flex-shrink-0">⭐</span>
                                        )}
                                    </div>
                                    <p className="text-sm text-muted-foreground line-clamp-2 mb-3">{news.description}</p>
                                    <div className="flex flex-wrap items-center gap-3 text-sm">
                                        <span className={`px-3 py-1 rounded-full font-medium ${
                                            news.status === 'published'
                                                ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400'
                                                : 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400'
                                        }`}>
                                            {news.status.charAt(0).toUpperCase() + news.status.slice(1)}
                                        </span>
                                        <span className="px-3 py-1 rounded-full bg-primary/10 text-primary font-medium">
                                            {news.category}
                                        </span>
                                        <span className="text-muted-foreground flex items-center gap-1">
                                            👁️ {news.views || 0} views
                                        </span>
                                    </div>
                                </div>
                                <div className="flex sm:flex-col gap-2 sm:justify-start">
                                    <Button
                                        variant="outline"
                                        size="sm"
                                        onClick={() => handleToggleFeatured(news._id)}
                                        className="flex-1 sm:flex-none"
                                        title={news.featured ? 'Remove from featured' : 'Mark as featured'}
                                    >
                                        {news.featured ? '⭐ Featured' : '☆ Feature'}
                                    </Button>
                                    <Button
                                        variant="outline"
                                        size="sm"
                                        onClick={() => navigate(`/admin/news/${news._id}`)}
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
                                            <AlertDialogTitle>Delete News Article</AlertDialogTitle>
                                            <AlertDialogDescription>
                                                Are you sure you want to delete "{news.title}"? This action cannot be undone and will permanently remove this news article.
                                            </AlertDialogDescription>
                                            <div className="flex gap-4 justify-end mt-4">
                                                <AlertDialogCancel>Cancel</AlertDialogCancel>
                                                <AlertDialogAction
                                                    onClick={() => handleDelete(news._id)}
                                                    className="bg-destructive hover:bg-destructive/90"
                                                >
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
            ) : (
                <Card className="p-12 text-center border-2 border-dashed">
                    <div className="text-6xl mb-4">📰</div>
                    <h3 className="text-xl font-semibold mb-2">No news articles found</h3>
                    <p className="text-muted-foreground mb-6">
                        {status !== 'all' || category !== 'all'
                            ? 'Try adjusting your filters to see more results.'
                            : 'Get started by creating your first news article.'}
                    </p>
                    <Button onClick={() => navigate('/admin/news/create')} className="bg-gradient-to-r from-primary to-secondary">
                        Create News Article
                    </Button>
                </Card>
            )}
        </div>
    );
}
