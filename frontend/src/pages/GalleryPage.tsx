import Layout from '@/components/Layout';
import { useLanguage } from '@/contexts/LanguageContext';
import apiFetch from '@/lib/api';
import { motion } from 'framer-motion';
import { X } from 'lucide-react';
import { useEffect, useState } from 'react';

const GalleryPage = () => {
  const { t, isNepali } = useLanguage();
  const [selectedImage, setSelectedImage] = useState<number | null>(null);
  const [galleryImages, setGalleryImages] = useState<any[]>([]);
  const [viewMode, setViewMode] = useState<'photos' | 'videos'>('photos');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    if (viewMode === 'photos') fetchPhotos();
    else fetchVideos();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [viewMode]);

  const fetchPhotos = async () => {
    try {
      const response = await apiFetch('/api/photos?status=published');
      if (response.ok) {
        const data = await response.json();
        setGalleryImages(data.photos || []);
      }
    } catch (error) {
      console.error('Failed to fetch photos:', error);
      setGalleryImages([]);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchVideos = async () => {
    try {
      const response = await apiFetch('/api/videos?status=published');
      if (response.ok) {
        const data = await response.json();
        setGalleryImages(data.videos || []);
      }
    } catch (error) {
      console.error('Failed to fetch videos:', error);
      setGalleryImages([]);
    } finally {
      setIsLoading(false);
    }
  };

  // Increment view count for a video by calling the public video endpoint
  const incrementVideoView = async (videoId: string, index: number) => {
    try {
      const response = await apiFetch(`/api/videos/${videoId}`);
      if (response.ok) {
        const data = await response.json();
        // update local state with new views
        setGalleryImages((prev) => {
          const copy = [...prev];
          if (copy[index]) copy[index] = { ...copy[index], views: data.views };
          return copy;
        });
      }
    } catch (err) {
      console.error('Failed to increment video view', err);
    }
  };

  return (
    <Layout>
      {/* Hero Section */}
      <section className="py-16 lg:py-24" style={{ background: 'var(--gradient-hero)' }}>
        <div className="container-main">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center text-white"
          >
            <h1 className={`text-4xl lg:text-5xl font-bold mb-4 ${isNepali ? 'font-nepali' : ''}`}>
              {t('gallery.title')}
            </h1>
            <p className={`text-xl text-white/90 ${isNepali ? 'font-nepali' : ''}`}>
              {t('gallery.subtitle')}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Toggle */}
      <section className="py-6 lg:py-8 bg-background">
        <div className="container-main flex justify-center">
          <div className="inline-flex rounded-lg bg-white/5 p-1">
            <button
              className={`px-4 py-2 rounded-lg font-medium ${viewMode === 'photos' ? 'bg-white/10' : 'hover:bg-white/5'}`}
              onClick={() => setViewMode('photos')}
            >
              {t('gallery.photos') || 'Photos'}
            </button>
            <button
              className={`px-4 py-2 rounded-lg font-medium ${viewMode === 'videos' ? 'bg-white/10' : 'hover:bg-white/5'}`}
              onClick={() => setViewMode('videos')}
            >
              {t('gallery.videos') || 'Videos'}
            </button>
          </div>
        </div>
      </section>

      {/* Gallery Grid */}
      <section className="py-16 lg:py-24 bg-background">
        <div className="container-main">
          {isLoading ? (
            <div className="text-center py-12">
              <p className={`text-muted-foreground ${isNepali ? 'font-nepali' : ''}`}>Loading gallery...</p>
            </div>
          ) : galleryImages.length > 0 ? (
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 lg:gap-6">
              {galleryImages.map((item, index) => (
                <motion.div
                  key={item._id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.05 }}
                  className="relative group cursor-pointer overflow-hidden rounded-xl aspect-square"
                  onClick={() => {
                    setSelectedImage(index);
                    if (viewMode === 'videos' && item._id) incrementVideoView(item._id, index);
                  }}
                >
                  {viewMode === 'photos' ? (
                    <img
                      src={item.image}
                      alt={isNepali ? item.titleHindi || item.title : item.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                  ) : (
                    <div className="w-full h-full bg-black/5 flex items-center justify-center relative">
                      {item.thumbnail ? (
                        <img
                          src={item.thumbnail}
                          alt={item.title}
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                        />
                      ) : (
                        <video
                          src={item.videoUrl}
                          className="w-full h-full object-cover"
                          muted
                          playsInline
                          preload="metadata"
                        />
                      )}
                      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                        <div className="w-12 h-12 bg-black/60 rounded-full flex items-center justify-center">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                            <path d="M5 3v18l15-9L5 3z" />
                          </svg>
                        </div>
                      </div>
                    </div>
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="absolute bottom-0 left-0 right-0 p-4">
                      <p className={`text-white text-sm font-medium ${isNepali ? 'font-nepali' : ''}`}>
                        {isNepali ? item.titleHindi || item.title : item.title}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className={`text-muted-foreground ${isNepali ? 'font-nepali' : ''}`}>{viewMode === 'photos' ? 'No photos published yet.' : 'No videos published yet.'}</p>
            </div>
          )}
        </div>
      </section>

      {/* Lightbox */}
      {selectedImage !== null && galleryImages.length > 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4"
          onClick={() => setSelectedImage(null)}
        >
          <button
            className="absolute top-4 right-4 text-white p-2 hover:bg-white/10 rounded-full transition-colors"
            onClick={() => setSelectedImage(null)}
          >
            <X size={32} />
          </button>
          <div className="max-w-4xl max-h-[80vh] relative" onClick={(e) => e.stopPropagation()}>
            {viewMode === 'photos' ? (
              <>
                <img
                  src={galleryImages[selectedImage].image}
                  alt={isNepali ? galleryImages[selectedImage].titleHindi || galleryImages[selectedImage].title : galleryImages[selectedImage].title}
                  className="max-w-full max-h-[80vh] object-contain rounded-lg"
                />
                <p className={`text-white text-center mt-4 ${isNepali ? 'font-nepali' : ''}`}>
                  {isNepali ? galleryImages[selectedImage].titleHindi || galleryImages[selectedImage].title : galleryImages[selectedImage].title}
                </p>
              </>
            ) : (
              <div>
                <video
                  src={galleryImages[selectedImage].videoUrl}
                  controls
                  autoPlay
                  className="max-w-full max-h-[80vh] object-contain rounded-lg"
                />
                <p className={`text-white text-center mt-4 ${isNepali ? 'font-nepali' : ''}`}>
                  {isNepali ? galleryImages[selectedImage].titleHindi || galleryImages[selectedImage].title : galleryImages[selectedImage].title}
                </p>
              </div>
            )}
          </div>
        </motion.div>
      )}
    </Layout>
  );
};

export default GalleryPage;
