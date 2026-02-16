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

interface Photo {
    _id: string;
    title: string;
    image: string;
    album: string;
    status: string;
    views: number;
    featured: boolean;
    createdAt: string;
}

export default function PhotosList() {
    const { token } = useAuth();
    const navigate = useNavigate();
    const [photosList, setPhotosList] = useState<Photo[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [status, setStatus] = useState('all');
    const [albums, setAlbums] = useState<string[]>([]);
    const [selectedAlbum, setSelectedAlbum] = useState('all');

    useEffect(() => {
        fetchPhotos();
        fetchAlbums();
    }, [status, selectedAlbum]);

    const fetchPhotos = async () => {
        try {
            const params = new URLSearchParams();
            if (status && status !== 'all') params.append('status', status);
            if (selectedAlbum && selectedAlbum !== 'all') params.append('album', selectedAlbum);

            const response = await apiFetch(`/api/photos?${params}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            if (response.ok) {
                const data = await response.json();
                setPhotosList(data.photos);
            }
        } catch (error) {
            toast.error('Failed to fetch photos');
        } finally {
            setIsLoading(false);
        }
    };

    const fetchAlbums = async () => {
        try {
            const response = await apiFetch('/api/photos/albums', {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            if (response.ok) {
                const data = await response.json();
                setAlbums(data.albums);
            }
        } catch (error) {
            console.error('Failed to fetch albums');
        }
    };

    const handleDelete = async (id: string) => {
        try {
            const response = await apiFetch(`/api/photos/${id}`, {
                method: 'DELETE',
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            if (response.ok) {
                toast.success('Photo deleted successfully');
                fetchPhotos();
            }
        } catch (error) {
            toast.error('Failed to delete photo');
        }
    };

    const handleToggleFeatured = async (id: string) => {
        try {
            const response = await apiFetch(`/api/photos/${id}/featured`, {
                method: 'PATCH',
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            if (response.ok) {
                toast.success('Featured status updated');
                fetchPhotos();
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
                <h1 className="text-3xl font-bold">Photos Management</h1>
                <Button onClick={() => navigate('/admin/photos/create')}>Add Photo</Button>
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

                <Select value={selectedAlbum} onValueChange={setSelectedAlbum}>
                    <SelectTrigger className="w-40">
                        <SelectValue placeholder="Filter by album" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="all">All Albums</SelectItem>
                        {albums.filter(album => album && album.trim()).map((album) => (
                            <SelectItem key={album} value={album}>
                                {album}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>
            </div>

            {/* Photos Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {photosList.map((photo) => (
                    <Card key={photo._id} className="overflow-hidden">
                        <div className="relative">
                            <img
                                src={photo.image}
                                alt={photo.title}
                                className="w-full h-48 object-cover"
                            />
                            <div className="absolute top-2 right-2 flex gap-2">
                                <Button
                                    size="sm"
                                    variant="outline"
                                    onClick={() => handleToggleFeatured(photo._id)}
                                    className="bg-white"
                                >
                                    {photo.featured ? '⭐' : '☆'}
                                </Button>
                            </div>
                        </div>
                        <div className="p-4">
                            <h3 className="font-semibold">{photo.title}</h3>
                            <p className="text-sm text-gray-600">{photo.album}</p>
                            <div className="flex gap-2 mt-2">
                                <span className={`text-xs px-2 py-1 rounded ${photo.status === 'published' ? 'bg-green-100' : 'bg-yellow-100'}`}>
                                    {photo.status}
                                </span>
                                <span className="text-xs text-gray-600">Views: {photo.views}</span>
                            </div>
                            <div className="flex gap-2 mt-4">
                                <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={() => navigate(`/admin/photos/${photo._id}`)}
                                    className="flex-1"
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
                                        <AlertDialogTitle>Delete Photo</AlertDialogTitle>
                                        <AlertDialogDescription>
                                            Are you sure you want to delete this photo?
                                        </AlertDialogDescription>
                                        <div className="flex gap-4 justify-end">
                                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                                            <AlertDialogAction onClick={() => handleDelete(photo._id)}>
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

            {photosList.length === 0 && (
                <Card className="p-8 text-center">
                    <p className="text-gray-600">No photos found. Add your first photo.</p>
                </Card>
            )}
        </div>
    );
}
