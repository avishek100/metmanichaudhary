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
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

export default function CreateNews() {
    const { token } = useAuth();
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);
    const [image, setImage] = useState<File | null>(null);
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

            const response = await apiFetch('/api/news', {
                method: 'POST',
                headers: {
                    Authorization: `Bearer ${token}`,
                },
                body: formDataToSend,
            });

            if (response.ok) {
                toast.success('News created successfully');
                navigate('/admin/news');
            } else {
                toast.error('Failed to create news');
            }
        } catch (error) {
            toast.error('Error creating news');
            console.error(error);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-3xl font-bold">Create News</h1>
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
                            <Input
                                type="file"
                                accept="image/*"
                                onChange={handleImageChange}
                                required
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
                                {isLoading ? 'Creating...' : 'Create News'}
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
