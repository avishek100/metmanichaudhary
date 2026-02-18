import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
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
import { FileText, Image as ImageIcon, Save, X, Loader2 } from 'lucide-react';
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
            if (!formData.title || !formData.description || !image) {
                toast.error('Please fill in all required fields');
                setIsLoading(false);
                return;
            }

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

            const data = await response.json();

            if (response.ok) {
                toast.success('News created successfully!');
                navigate('/admin/news');
            } else {
                toast.error(data.message || 'Failed to create news');
            }
        } catch (error: any) {
            toast.error(error?.message || 'Error creating news');
            console.error(error);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-3xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                    Create News Article
                </h1>
                <p className="text-muted-foreground mt-1">Add a new news article to your website</p>
            </div>

            <Card className="border-2 border-border shadow-lg">
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <FileText className="w-5 h-5 text-primary" />
                        News Details
                    </CardTitle>
                    <CardDescription>Fill in the information below to create a new news article</CardDescription>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSubmit} className="space-y-6">
                        {/* Titles */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <Label htmlFor="title" className="text-sm font-semibold">
                                    Title (English) <span className="text-destructive">*</span>
                                </Label>
                                <Input
                                    id="title"
                                    name="title"
                                    value={formData.title}
                                    onChange={handleInputChange}
                                    placeholder="Enter news title"
                                    required
                                    className="h-11"
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="titleHindi" className="text-sm font-semibold">
                                    Title (Hindi)
                                </Label>
                                <Input
                                    id="titleHindi"
                                    name="titleHindi"
                                    value={formData.titleHindi}
                                    onChange={handleInputChange}
                                    placeholder="समाचार शीर्षक दर्ज करें"
                                    className="h-11"
                                />
                            </div>
                        </div>

                        {/* Descriptions */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <Label htmlFor="description" className="text-sm font-semibold">
                                    Description (English) <span className="text-destructive">*</span>
                                </Label>
                                <Textarea
                                    id="description"
                                    name="description"
                                    value={formData.description}
                                    onChange={handleInputChange}
                                    placeholder="Enter news description"
                                    required
                                    rows={4}
                                    className="resize-none"
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="descriptionHindi" className="text-sm font-semibold">
                                    Description (Hindi)
                                </Label>
                                <Textarea
                                    id="descriptionHindi"
                                    name="descriptionHindi"
                                    value={formData.descriptionHindi}
                                    onChange={handleInputChange}
                                    placeholder="समाचार विवरण दर्ज करें"
                                    rows={4}
                                    className="resize-none"
                                />
                            </div>
                        </div>

                        {/* Content */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <Label htmlFor="content" className="text-sm font-semibold">
                                    Content (English)
                                </Label>
                                <Textarea
                                    id="content"
                                    name="content"
                                    value={formData.content}
                                    onChange={handleInputChange}
                                    placeholder="Enter full news content"
                                    rows={8}
                                    className="resize-none"
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="contentHindi" className="text-sm font-semibold">
                                    Content (Hindi)
                                </Label>
                                <Textarea
                                    id="contentHindi"
                                    name="contentHindi"
                                    value={formData.contentHindi}
                                    onChange={handleInputChange}
                                    placeholder="पूरा समाचार सामग्री दर्ज करें"
                                    rows={8}
                                    className="resize-none"
                                />
                            </div>
                        </div>

                        {/* Image Upload */}
                        <div className="space-y-2">
                            <Label htmlFor="image" className="text-sm font-semibold flex items-center gap-2">
                                <ImageIcon className="w-4 h-4" />
                                Featured Image <span className="text-destructive">*</span>
                            </Label>
                            <div className="border-2 border-dashed border-border rounded-lg p-6 hover:border-primary/50 transition-colors">
                                <Input
                                    id="image"
                                    type="file"
                                    accept="image/*"
                                    onChange={handleImageChange}
                                    required
                                    className="cursor-pointer"
                                />
                                {image && (
                                    <div className="mt-4 flex items-center gap-2 text-sm text-muted-foreground">
                                        <ImageIcon className="w-4 h-4" />
                                        Selected: {image.name}
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Category and Status */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <Label htmlFor="category" className="text-sm font-semibold">
                                    Category
                                </Label>
                                <Select
                                    value={formData.category}
                                    onValueChange={(value) =>
                                        setFormData((prev) => ({ ...prev, category: value }))
                                    }
                                >
                                    <SelectTrigger id="category">
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
                            <div className="space-y-2">
                                <Label htmlFor="status" className="text-sm font-semibold">
                                    Status
                                </Label>
                                <Select
                                    value={formData.status}
                                    onValueChange={(value) =>
                                        setFormData((prev) => ({ ...prev, status: value }))
                                    }
                                >
                                    <SelectTrigger id="status">
                                        <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="draft">Draft</SelectItem>
                                        <SelectItem value="published">Published</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>

                        {/* Actions */}
                        <div className="flex gap-4 pt-4 border-t border-border">
                            <Button
                                type="submit"
                                disabled={isLoading}
                                className="bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90 shadow-lg"
                            >
                                {isLoading ? (
                                    <>
                                        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                                        Creating...
                                    </>
                                ) : (
                                    <>
                                        <Save className="w-4 h-4 mr-2" />
                                        Create News
                                    </>
                                )}
                            </Button>
                            <Button
                                type="button"
                                variant="outline"
                                onClick={() => navigate('/admin/news')}
                                disabled={isLoading}
                            >
                                <X className="w-4 h-4 mr-2" />
                                Cancel
                            </Button>
                        </div>
                    </form>
                </CardContent>
            </Card>
        </div>
    );
}
