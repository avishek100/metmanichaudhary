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

export default function CreatePhoto() {
    const { token } = useAuth();
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);
    const [image, setImage] = useState<File | null>(null);
    const [formData, setFormData] = useState({
        title: '',
        titleHindi: '',
        description: '',
        descriptionHindi: '',
        album: '',
        status: 'draft',
        tags: '',
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

            const response = await apiFetch('/api/photos', {
                method: 'POST',
                headers: {
                    Authorization: `Bearer ${token}`,
                },
                body: formDataToSend,
            });

            if (response.ok) {
                toast.success('Photo created successfully');
                navigate('/admin/photos');
            } else {
                toast.error('Failed to create photo');
            }
        } catch (error) {
            toast.error('Error creating photo');
            console.error(error);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-3xl font-bold">Add Photo</h1>
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
                            <Input
                                type="file"
                                accept="image/*"
                                onChange={handleImageChange}
                                required
                            />
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium mb-2">Album Name</label>
                                <Input
                                    name="album"
                                    value={formData.album}
                                    onChange={handleInputChange}
                                    placeholder="e.g., Events 2024"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-2">Tags</label>
                                <Input
                                    name="tags"
                                    value={formData.tags}
                                    onChange={handleInputChange}
                                    placeholder="Comma separated tags"
                                />
                            </div>
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

                        <div className="flex gap-4">
                            <Button type="submit" disabled={isLoading}>
                                {isLoading ? 'Creating...' : 'Add Photo'}
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
