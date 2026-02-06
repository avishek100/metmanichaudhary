import { useState } from 'react';
import { motion } from 'framer-motion';
import { X } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import Layout from '@/components/Layout';
import heroImage from '@/assets/hero-leader.jpg';

const GalleryPage = () => {
  const { t, isNepali } = useLanguage();
  const [selectedImage, setSelectedImage] = useState<number | null>(null);

  const galleryImages = [
    {
      id: 1,
      src: heroImage,
      captionEn: 'Meeting with community leaders',
      captionNe: 'समुदायका नेताहरूसँग भेटघाट',
    },
    {
      id: 2,
      src: heroImage,
      captionEn: 'Inaugurating new school building',
      captionNe: 'नयाँ विद्यालय भवनको उद्घाटन',
    },
    {
      id: 3,
      src: heroImage,
      captionEn: 'Health camp in rural village',
      captionNe: 'ग्रामीण गाउँमा स्वास्थ्य शिविर',
    },
    {
      id: 4,
      src: heroImage,
      captionEn: 'Tree plantation drive',
      captionNe: 'वृक्षारोपण अभियान',
    },
    {
      id: 5,
      src: heroImage,
      captionEn: 'Youth employment program launch',
      captionNe: 'युवा रोजगार कार्यक्रम शुभारम्भ',
    },
    {
      id: 6,
      src: heroImage,
      captionEn: 'Infrastructure project inspection',
      captionNe: 'पूर्वाधार परियोजना निरीक्षण',
    },
    {
      id: 7,
      src: heroImage,
      captionEn: 'Women\'s cooperative visit',
      captionNe: 'महिला सहकारी भ्रमण',
    },
    {
      id: 8,
      src: heroImage,
      captionEn: 'Public gathering and interaction',
      captionNe: 'सार्वजनिक सभा र अन्तर्क्रिया',
    },
    {
      id: 9,
      src: heroImage,
      captionEn: 'Education scholarship distribution',
      captionNe: 'शिक्षा छात्रवृत्ति वितरण',
    },
  ];

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

      {/* Gallery Grid */}
      <section className="py-16 lg:py-24 bg-background">
        <div className="container-main">
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 lg:gap-6">
            {galleryImages.map((image, index) => (
              <motion.div
                key={image.id}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
                className="relative group cursor-pointer overflow-hidden rounded-xl aspect-square"
                onClick={() => setSelectedImage(index)}
              >
                <img
                  src={image.src}
                  alt={isNepali ? image.captionNe : image.captionEn}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="absolute bottom-0 left-0 right-0 p-4">
                    <p className={`text-white text-sm font-medium ${isNepali ? 'font-nepali' : ''}`}>
                      {isNepali ? image.captionNe : image.captionEn}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Lightbox */}
      {selectedImage !== null && (
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
            <img
              src={galleryImages[selectedImage].src}
              alt={isNepali ? galleryImages[selectedImage].captionNe : galleryImages[selectedImage].captionEn}
              className="max-w-full max-h-[80vh] object-contain rounded-lg"
            />
            <p className={`text-white text-center mt-4 ${isNepali ? 'font-nepali' : ''}`}>
              {isNepali ? galleryImages[selectedImage].captionNe : galleryImages[selectedImage].captionEn}
            </p>
          </div>
        </motion.div>
      )}
    </Layout>
  );
};

export default GalleryPage;
