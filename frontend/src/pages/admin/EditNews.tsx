import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { useAuth } from '@/contexts/AdminAuthContext';
import apiFetch from '@/lib/api';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'sonner';

export default function EditNews() {
    const { id } = useParams<{ id: string }>();
    const { token } = useAuth();
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);
    const [isFetching, setIsFetching] = useState(true);
    const [image, setImage] = useState<File | null>(null);
    const [currentImage, setCurrentImage] = useState<string>('');
    const [formData, setFormData] = useState({
        title: '',
        titleHindi: '',
        description: '',
        descriptionHindi: '',
        content: '',
        contentHindi: '',
        category: 'update',
        status: 'draft',
    });

    useEffect(() => {
        fetchNews();
    }, [id]);

    const fetchNews = async () => {
        try {
            const response = await apiFetch(`/api/news/${id}`);
            if (response.ok) {
                const data = await response.json();
                setFormData({
                    title: data.title || '',
                    titleHindi: data.titleHindi || '',
                    description: data.description || '',
                    descriptionHindi: data.descriptionHindi || '',
                    content: data.content || '',
                    contentHindi: data.contentHindi || '',
                    category: data.category || 'update',
                    status: data.status || 'draft',
                });
                setCurrentImage(data.image || '');
            } else {
                toast.error('Failed to fetch news');
                navigate('/admin/news');
            }
        } catch (error) {
            toast.error('Error fetching news');
            console.error(error);
            navigate('/admin/news');
        } finally {
            setIsFetching(false);
        }
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setImage(file);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);

        try {
            const formDataToSend = new FormData();
            Object.entries(formData).forEach(([key, value]) => {
                formDataToSend.append(key, value);
            });
            if (image) {
                formDataToSend.append('image', image);
            }

            const response = await apiFetch(`/api/news/${id}`, {
                method: 'PUT',
                headers: {
                    Authorization: `Bearer ${token}`,
                },
                body: formDataToSend,
            });

            if (response.ok) {
                toast.success('News updated successfully');
                navigate('/admin/news');
            } else {
                toast.error('Failed to update news');
            }
        } catch (error) {
            toast.error('Error updating news');
            console.error(error);
        } finally {
            setIsLoading(false);
        }
    };

    if (isFetching) {
        return (
            <div className="space-y-6">
                <div className="text-center py-12">
                    <p className="text-muted-foreground">Loading news...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-3xl font-bold">Edit News</h1>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle>News Details</CardTitle>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium mb-2">Title (English)</label>
                                <Input
                                    name="title"
                                    value={formData.title}
                                    onChange={handleInputChange}
                                    placeholder="Enter news title"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-2">Title (Hindi)</label>
                                <Input
                                    name="titleHindi"
                                    value={formData.titleHindi}
                                    onChange={handleInputChange}
                                    placeholder="समाचार शीर्षक दर्ज करें"
                                />
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium mb-2">Description (English)</label>
                                <Textarea
                                    name="description"
                                    value={formData.description}
                                    onChange={handleInputChange}
                                    placeholder="Enter news description"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-2">Description (Hindi)</label>
                                <Textarea
                                    name="descriptionHindi"
                                    value={formData.descriptionHindi}
                                    onChange={handleInputChange}
                                    placeholder="समाचार विवरण दर्ज करें"
                                />
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium mb-2">Content (English)</label>
                                <Textarea
                                    name="content"
                                    value={formData.content}
                                    onChange={handleInputChange}
                                    placeholder="Enter full news content"
                                    rows={6}
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-2">Content (Hindi)</label>
                                <Textarea
                                    name="contentHindi"
                                    value={formData.contentHindi}
                                    onChange={handleInputChange}
                                    placeholder="पूरा समाचार सामग्री दर्ज करें"
                                    rows={6}
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium mb-2">Featured Image</label>
                            {currentImage && (
                                <div className="mb-4">
                                    <img
                                        src={currentImage}
                                        alt="Current"
                                        className="max-w-xs h-auto rounded"
                                    />
                                    <p className="text-sm text-muted-foreground mt-2">
                                        Current image. Upload a new one to replace it.
                                    </p>
                                </div>
                            )}
                            <Input
                                type="file"
                                accept="image/*"
                                onChange={handleImageChange}
                            />
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium mb-2">Category</label>
                                <Select
                                    value={formData.category}
                                    onValueChange={(value) =>
                                        setFormData((prev) => ({ ...prev, category: value }))
                                    }
                                >
                                    <SelectTrigger>
                                        <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="announcement">Announcement</SelectItem>
                                        <SelectItem value="event">Event</SelectItem>
                                        <SelectItem value="update">Update</SelectItem>
                                        <SelectItem value="other">Other</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-2">Status</label>
                                <Select
                                    value={formData.status}
                                    onValueChange={(value) =>
                                        setFormData((prev) => ({ ...prev, status: value }))
                                    }
                                >
                                    <SelectTrigger>
                                        <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="draft">Draft</SelectItem>
                                        <SelectItem value="published">Published</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>

                        <div className="flex gap-4">
                            <Button type="submit" disabled={isLoading}>
                                {isLoading ? 'Updating...' : 'Update News'}
                            </Button>
                            <Button
                                type="button"
                                variant="outline"
                                onClick={() => navigate('/admin/news')}
                            >
                                Cancel
                            </Button>
                        </div>
                    </form>
                </CardContent>
            </Card>
        </div>
    );
}
