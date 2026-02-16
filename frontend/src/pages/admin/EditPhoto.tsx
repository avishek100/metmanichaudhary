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

export default function EditPhoto() {
    const { id } = useParams<{ id: string }>();
    const { token } = useAuth();
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);
    const [isFetching, setIsFetching] = useState(true);
    const [image, setImage] = useState<File | null>(null);
    const [currentImage, setCurrentImage] = useState<string>('');
    const [albums, setAlbums] = useState<string[]>([]);
    const [formData, setFormData] = useState({
        title: '',
        titleHindi: '',
        description: '',
        descriptionHindi: '',
        album: '',
        status: 'draft',
        tags: '',
    });

    useEffect(() => {
        fetchAlbums();
        fetchPhoto();
    }, [id]);

    const fetchAlbums = async () => {
        try {
            const response = await apiFetch('/api/photos/albums');
            if (response.ok) {
                const data = await response.json();
                setAlbums(data.albums.filter((a: string) => a && a.trim()));
            }
        } catch (error) {
            console.error('Failed to fetch albums');
        }
    };

    const fetchPhoto = async () => {
        try {
            const response = await apiFetch(`/api/photos/${id}`);
            if (response.ok) {
                const data = await response.json();
                setFormData({
                    title: data.title || '',
                    titleHindi: data.titleHindi || '',
                    description: data.description || '',
                    descriptionHindi: data.descriptionHindi || '',
                    album: data.album || '',
                    status: data.status || 'draft',
                    tags: data.tags?.join(', ') || '',
                });
                setCurrentImage(data.image || '');
            } else {
                toast.error('Failed to fetch photo');
                navigate('/admin/photos');
            }
        } catch (error) {
            toast.error('Error fetching photo');
            console.error(error);
            navigate('/admin/photos');
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

            const response = await apiFetch(`/api/photos/${id}`, {
                method: 'PUT',
                headers: {
                    Authorization: `Bearer ${token}`,
                },
                body: formDataToSend,
            });

            if (response.ok) {
                toast.success('Photo updated successfully');
                navigate('/admin/photos');
            } else {
                toast.error('Failed to update photo');
            }
        } catch (error) {
            toast.error('Error updating photo');
            console.error(error);
        } finally {
            setIsLoading(false);
        }
    };

    if (isFetching) {
        return (
            <div className="space-y-6">
                <div className="text-center py-12">
                    <p className="text-muted-foreground">Loading photo...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-3xl font-bold">Edit Photo</h1>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle>Photo Details</CardTitle>
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
                                    placeholder="Enter photo title"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-2">Title (Hindi)</label>
                                <Input
                                    name="titleHindi"
                                    value={formData.titleHindi}
                                    onChange={handleInputChange}
                                    placeholder="फोटो शीर्षक दर्ज करें"
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
                                    placeholder="Enter photo description"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-2">Description (Hindi)</label>
                                <Textarea
                                    name="descriptionHindi"
                                    value={formData.descriptionHindi}
                                    onChange={handleInputChange}
                                    placeholder="फोटो विवरण दर्ज करें"
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium mb-2">Photo Image</label>
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
                                <label className="block text-sm font-medium mb-2">Album</label>
                                <Select
                                    value={formData.album}
                                    onValueChange={(value) =>
                                        setFormData((prev) => ({ ...prev, album: value }))
                                    }
                                >
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select album" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {albums.map((album) => (
                                            <SelectItem key={album} value={album}>
                                                {album}
                                            </SelectItem>
                                        ))}
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
                                {isLoading ? 'Updating...' : 'Update Photo'}
                            </Button>
                            <Button
                                type="button"
                                variant="outline"
                                onClick={() => navigate('/admin/photos')}
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
