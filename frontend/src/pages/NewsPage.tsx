import Layout from '@/components/Layout';
import { useLanguage } from '@/contexts/LanguageContext';
import apiFetch from '@/lib/api';
import { motion } from 'framer-motion';
import { ArrowRight, Calendar } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const NewsPage = () => {
  const { t, isNepali } = useLanguage();
  const navigate = useNavigate();
  const [newsItems, setNewsItems] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchNews();
  }, []);

  const fetchNews = async () => {
    try {
      const response = await apiFetch('/api/news?status=published');
      if (response.ok) {
        const data = await response.json();
        setNewsItems(data.news || []);
      }
    } catch (error) {
      console.error('Failed to fetch news:', error);
    } finally {
      setIsLoading(false);
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
              {t('news.title')}
            </h1>
            <p className={`text-xl text-white/90 ${isNepali ? 'font-nepali' : ''}`}>
              {t('news.subtitle')}
            </p>
          </motion.div>
        </div>
      </section>

      {/* News Grid */}
      <section className="py-16 lg:py-24 bg-background">
        <div className="container-main">
          {isLoading ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="card-agenda">
                  <div className="skeleton h-40 w-full rounded-lg mb-4" />
                  <div className="skeleton h-4 w-24 mb-3" />
                  <div className="skeleton h-4 w-20 mb-3" />
                  <div className="skeleton h-6 w-full mb-2" />
                  <div className="skeleton h-4 w-full mb-1" />
                  <div className="skeleton h-4 w-3/4" />
                </div>
              ))}
            </div>
          ) : newsItems.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
              {newsItems.map((news, index) => {
                const createdDate = new Date(news.createdAt);
                const dateStr = createdDate.toLocaleDateString(isNepali ? 'ne-NP' : 'en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                });

                return (
                  <motion.article
                    key={news._id}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    onClick={() => navigate(`/news/${news._id}`)}
                    className="card-agenda group cursor-pointer"
                  >
                    {news.image && (
                      <img
                        src={news.image}
                        alt={isNepali ? news.titleHindi : news.title}
                        className="w-full h-40 object-cover rounded-lg mb-4"
                      />
                    )}

                    <div className="flex items-center gap-2 text-muted-foreground text-sm mb-3">
                      <Calendar size={16} />
                      <span className={isNepali ? 'font-nepali' : ''}>{dateStr}</span>
                    </div>

                    <span className={`inline-block px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-medium mb-3 ${isNepali ? 'font-nepali' : ''}`}>
                      {news.category}
                    </span>

                    <h3 className={`text-lg font-semibold text-foreground mb-3 group-hover:text-primary transition-colors ${isNepali ? 'font-nepali' : ''}`}>
                      {isNepali ? news.titleHindi || news.title : news.title}
                    </h3>

                    <p className={`text-sm text-muted-foreground leading-relaxed mb-4 ${isNepali ? 'font-nepali' : ''}`}>
                      {isNepali ? (news.descriptionHindi || news.description)?.substring(0, 100) : news.description?.substring(0, 100)}...
                    </p>

                    <span className={`inline-flex items-center gap-2 text-sm font-medium text-primary group-hover:gap-3 transition-all ${isNepali ? 'font-nepali' : ''}`}>
                      {t('news.readmore')}
                      <ArrowRight size={16} />
                    </span>
                  </motion.article>
                );
              })}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className={`text-muted-foreground ${isNepali ? 'font-nepali' : ''}`}>No news published yet.</p>
            </div>
          )}
        </div>
      </section>
    </Layout>
  );
};

export default NewsPage;
