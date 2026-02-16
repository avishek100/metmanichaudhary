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

export default function EditVideo() {
    const { id } = useParams<{ id: string }>();
    const { token } = useAuth();
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);
    const [isFetching, setIsFetching] = useState(true);
    const [videoFile, setVideoFile] = useState<File | null>(null);
    const [formData, setFormData] = useState({
        title: '',
        titleHindi: '',
        description: '',
        descriptionHindi: '',
        videoUrl: '',
        duration: '',
        category: 'other',
        status: 'draft',
        tags: '',
    });

    useEffect(() => {
        fetchVideo();
    }, [id]);

    const fetchVideo = async () => {
        try {
            const response = await apiFetch(`/api/videos/${id}`);
            if (response.ok) {
                const data = await response.json();
                setFormData({
                    title: data.title || '',
                    titleHindi: data.titleHindi || '',
                    description: data.description || '',
                    descriptionHindi: data.descriptionHindi || '',
                    videoUrl: data.videoUrl || '',
                    duration: data.duration?.toString() || '',
                    category: data.category || 'other',
                    status: data.status || 'draft',
                    tags: data.tags?.join(', ') || '',
                });
            } else {
                toast.error('Failed to fetch video');
                navigate('/admin/videos');
            }
        } catch (error) {
            toast.error('Error fetching video');
            console.error(error);
            navigate('/admin/videos');
        } finally {
            setIsFetching(false);
        }
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleVideoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setVideoFile(file);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);

        try {
            const formDataToSend = new FormData();
            Object.entries(formData).forEach(([key, value]) => {
                if (value) formDataToSend.append(key, value);
            });
            if (videoFile) {
                formDataToSend.append('video', videoFile);
            }

            const response = await apiFetch(`/api/videos/${id}`, {
                method: 'PUT',
                headers: {
                    Authorization: `Bearer ${token}`,
                },
                body: formDataToSend,
            });

            if (response.ok) {
                toast.success('Video updated successfully');
                navigate('/admin/videos');
            } else {
                toast.error('Failed to update video');
            }
        } catch (error) {
            toast.error('Error updating video');
            console.error(error);
        } finally {
            setIsLoading(false);
        }
    };

    if (isFetching) {
        return (
            <div className="space-y-6">
                <div className="text-center py-12">
                    <p className="text-muted-foreground">Loading video...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-3xl font-bold">Edit Video</h1>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle>Video Details</CardTitle>
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
                                    placeholder="Enter video title"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-2">Title (Hindi)</label>
                                <Input
                                    name="titleHindi"
                                    value={formData.titleHindi}
                                    onChange={handleInputChange}
                                    placeholder="वीडियो शीर्षक दर्ज करें"
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
                                    placeholder="Enter video description"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-2">Description (Hindi)</label>
                                <Textarea
                                    name="descriptionHindi"
                                    value={formData.descriptionHindi}
                                    onChange={handleInputChange}
                                    placeholder="वीडियो विवरण दर्ज करें"
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium mb-2">Upload New Video File (MP4, WebM)</label>
                            <Input
                                type="file"
                                accept="video/mp4,video/webm,video/mpeg"
                                onChange={handleVideoChange}
                            />
                            {videoFile && (
                                <p className="text-sm text-green-600 mt-2">✓ {videoFile.name} selected</p>
                            )}
                            <p className="text-sm text-muted-foreground mt-2">Upload a new file to replace the current one</p>
                        </div>

                        <div className="relative">
                            <div className="absolute inset-0 flex items-center">
                                <div className="w-full border-t"></div>
                            </div>
                            <div className="relative flex justify-center text-sm">
                                <span className="px-2 bg-background text-muted-foreground">OR</span>
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium mb-2">Video URL (YouTube or other)</label>
                            <Input
                                name="videoUrl"
                                value={formData.videoUrl}
                                onChange={handleInputChange}
                                placeholder="Enter YouTube or video URL"
                                disabled={!!videoFile}
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium mb-2">Duration (seconds)</label>
                            <Input
                                type="number"
                                name="duration"
                                value={formData.duration}
                                onChange={handleInputChange}
                                placeholder="Enter video duration in seconds"
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
                                        <SelectItem value="event">Event</SelectItem>
                                        <SelectItem value="tutorial">Tutorial</SelectItem>
                                        <SelectItem value="announcement">Announcement</SelectItem>
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

                        <div>
                            <label className="block text-sm font-medium mb-2">Tags (comma-separated)</label>
                            <Input
                                name="tags"
                                value={formData.tags}
                                onChange={handleInputChange}
                                placeholder="Enter tags separated by commas"
                            />
                        </div>

                        <div className="flex gap-4">
                            <Button type="submit" disabled={isLoading}>
                                {isLoading ? 'Updating...' : 'Update Video'}
                            </Button>
                            <Button
                                type="button"
                                variant="outline"
                                onClick={() => navigate('/admin/videos')}
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
