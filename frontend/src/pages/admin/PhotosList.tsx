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
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { useAuth } from '@/contexts/AdminAuthContext';
import apiFetch from '@/lib/api';
import { Edit, Trash2, Image as ImageIcon, Plus, Eye, Star } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { motion } from 'framer-motion';

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

    return (
        <div className="space-y-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                    <h1 className="text-3xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                        Photos Management
                    </h1>
                    <p className="text-muted-foreground mt-1">Manage and organize your photo gallery</p>
                </div>
                <Button
                    onClick={() => navigate('/admin/photos/create')}
                    className="bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90 shadow-lg"
                >
                    <Plus className="w-4 h-4 mr-2" />
                    Add Photo
                </Button>
            </div>

            {/* Filters */}
            <Card className="border-2 border-border">
                <CardContent className="pt-6">
                    <div className="flex flex-wrap gap-4">
                        <div className="flex-1 min-w-[150px]">
                            <label className="text-sm font-medium text-muted-foreground mb-2 block">Status</label>
                            <Select value={status} onValueChange={setStatus}>
                                <SelectTrigger>
                                    <SelectValue placeholder="Filter by status" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="all">All Status</SelectItem>
                                    <SelectItem value="draft">Draft</SelectItem>
                                    <SelectItem value="published">Published</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>

                        <div className="flex-1 min-w-[150px]">
                            <label className="text-sm font-medium text-muted-foreground mb-2 block">Album</label>
                            <Select value={selectedAlbum} onValueChange={setSelectedAlbum}>
                                <SelectTrigger>
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
                    </div>
                </CardContent>
            </Card>

            {/* Photos Grid */}
            {isLoading ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {[...Array(6)].map((_, i) => (
                        <Card key={i} className="overflow-hidden">
                            <div className="skeleton h-48 w-full" />
                            <CardContent className="p-4 space-y-2">
                                <div className="skeleton h-4 w-3/4" />
                                <div className="skeleton h-3 w-1/2" />
                                <div className="skeleton h-6 w-full mt-4" />
                            </CardContent>
                        </Card>
                    ))}
                </div>
            ) : photosList.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {photosList.map((photo, index) => (
                        <motion.div
                            key={photo._id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.05 }}
                        >
                            <Card className="overflow-hidden hover:shadow-xl transition-all duration-300 border-2 hover:border-primary/20 group">
                                <div className="relative overflow-hidden">
                                    <img
                                        src={photo.image}
                                        alt={photo.title}
                                        className="w-full h-48 object-cover transition-transform duration-500 group-hover:scale-110"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                                    <div className="absolute top-2 right-2 flex gap-2">
                                        <Button
                                            size="sm"
                                            variant="outline"
                                            onClick={() => handleToggleFeatured(photo._id)}
                                            className={`bg-white/95 backdrop-blur-sm hover:bg-white ${
                                                photo.featured ? 'border-yellow-400' : ''
                                            }`}
                                            title={photo.featured ? 'Remove from featured' : 'Mark as featured'}
                                        >
                                            <Star className={`w-4 h-4 ${photo.featured ? 'fill-yellow-400 text-yellow-400' : ''}`} />
                                        </Button>
                                    </div>
                                    {photo.featured && (
                                        <div className="absolute top-2 left-2">
                                            <span className="px-2 py-1 bg-yellow-400 text-yellow-900 text-xs font-semibold rounded">
                                                Featured
                                            </span>
                                        </div>
                                    )}
                                </div>
                                <CardContent className="p-4">
                                    <h3 className="font-semibold text-lg mb-1 line-clamp-1">{photo.title}</h3>
                                    <p className="text-sm text-muted-foreground mb-3 flex items-center gap-1">
                                        <ImageIcon className="w-3 h-3" />
                                        {photo.album}
                                    </p>
                                    <div className="flex items-center justify-between mb-4">
                                        <span className={`text-xs px-2 py-1 rounded-full font-medium ${
                                            photo.status === 'published'
                                                ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400'
                                                : 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400'
                                        }`}>
                                            {photo.status.charAt(0).toUpperCase() + photo.status.slice(1)}
                                        </span>
                                        <span className="text-xs text-muted-foreground flex items-center gap-1">
                                            <Eye className="w-3 h-3" />
                                            {photo.views || 0} views
                                        </span>
                                    </div>
                                    <div className="flex gap-2">
                                        <Button
                                            variant="outline"
                                            size="sm"
                                            onClick={() => navigate(`/admin/photos/${photo._id}`)}
                                            className="flex-1"
                                        >
                                            <Edit className="w-4 h-4 mr-1" />
                                            Edit
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
                                                    Are you sure you want to delete "{photo.title}"? This action cannot be undone.
                                                </AlertDialogDescription>
                                                <div className="flex gap-4 justify-end mt-4">
                                                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                                                    <AlertDialogAction
                                                        onClick={() => handleDelete(photo._id)}
                                                        className="bg-destructive hover:bg-destructive/90"
                                                    >
                                                        Delete
                                                    </AlertDialogAction>
                                                </div>
                                            </AlertDialogContent>
                                        </AlertDialog>
                                    </div>
                                </CardContent>
                            </Card>
                        </motion.div>
                    ))}
                </div>
            ) : (
                <Card className="p-12 text-center border-2 border-dashed">
                    <div className="text-6xl mb-4">📷</div>
                    <h3 className="text-xl font-semibold mb-2">No photos found</h3>
                    <p className="text-muted-foreground mb-6">
                        {status !== 'all' || selectedAlbum !== 'all'
                            ? 'Try adjusting your filters to see more results.'
                            : 'Get started by adding your first photo.'}
                    </p>
                    <Button onClick={() => navigate('/admin/photos/create')} className="bg-gradient-to-r from-primary to-secondary">
                        <Plus className="w-4 h-4 mr-2" />
                        Add Photo
                    </Button>
                </Card>
            )}
        </div>
    );
}
