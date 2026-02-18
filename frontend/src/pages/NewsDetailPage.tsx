import Layout from '@/components/Layout';
import { useLanguage } from '@/contexts/LanguageContext';
import apiFetch from '@/lib/api';
import { motion } from 'framer-motion';
import { ArrowLeft, Calendar } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const NewsDetailPage = () => {
    const { id } = useParams<{ id: string }>();
    const { isNepali } = useLanguage();
    const navigate = useNavigate();
    const [news, setNews] = useState<any>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        fetchNewsDetail();
    }, [id]);

    const fetchNewsDetail = async () => {
        try {
            if (!id) {
                setError('News ID not found');
                return;
            }

            const response = await apiFetch(`/api/news/${id}`);
            const data = await response.json();

            if (response.ok) {
                console.log('News data received:', data);
                setNews(data);
            } else {
                console.error('API error:', data);
                setError(data.message || 'News not found');
            }
        } catch (err) {
            console.error('Failed to fetch news:', err);
            setError('Failed to load news');
        } finally {
            setIsLoading(false);
        }
    };

    if (isLoading) {
        return (
            <Layout>
                <div className="py-16 lg:py-24 bg-background">
                    <div className="container-main max-w-3xl">
                        <div className="skeleton h-6 w-32 mb-6" />
                        <div className="skeleton h-12 w-3/4 mb-4" />
                        <div className="skeleton h-64 w-full mb-6 rounded-lg" />
                        <div className="skeleton h-4 w-full mb-2" />
                        <div className="skeleton h-4 w-full mb-2" />
                        <div className="skeleton h-4 w-2/3" />
                    </div>
                </div>
            </Layout>
        );
    }

    if (error || !news) {
        return (
            <Layout>
                <div className="py-16 lg:py-24 bg-background">
                    <div className="container-main max-w-3xl text-center">
                        <div className="text-6xl mb-4">📰</div>
                        <h2 className="text-2xl font-bold text-foreground mb-2">News Not Found</h2>
                        <p className="text-muted-foreground mb-6">{error || 'The news article you are looking for does not exist or has been removed.'}</p>
                        <button
                            onClick={() => navigate('/news')}
                            className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-primary text-primary-foreground font-semibold hover:bg-primary/90 transition-colors"
                        >
                            <ArrowLeft size={18} />
                            Back to News
                        </button>
                    </div>
                </div>
            </Layout>
        );
    }

    const createdDate = new Date(news.createdAt);
    const dateStr = createdDate.toLocaleDateString(isNepali ? 'ne-NP' : 'en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    });

    return (
        <Layout>
            {/* Back Button */}
            <div className="bg-background py-4 border-b">
                <div className="container-main">
                    <button
                        onClick={() => navigate('/news')}
                        className="inline-flex items-center gap-2 text-primary hover:text-primary/80 transition-colors"
                    >
                        <ArrowLeft size={20} />
                        <span className={isNepali ? 'font-nepali' : ''}>Back to News</span>
                    </button>
                </div>
            </div>

            {/* News Detail */}
            <article className="py-16 lg:py-24 bg-background">
                <div className="container-main max-w-3xl">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                    >
                        {/* Metadata */}
                        <div className="flex flex-wrap items-center gap-4 mb-6">
                            <div className="flex items-center gap-2 text-muted-foreground text-sm">
                                <Calendar size={16} />
                                <span className={isNepali ? 'font-nepali' : ''}>{dateStr}</span>
                            </div>
                            <span className="inline-block px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-medium">
                                {news.category}
                            </span>
                            <span className="text-xs text-muted-foreground">
                                {news.views || 0} views
                            </span>
                        </div>

                        {/* Title */}
                        <h1 className={`text-4xl lg:text-5xl font-bold text-foreground mb-6 leading-tight ${isNepali ? 'font-nepali' : ''}`}>
                            {isNepali ? news.titleHindi || news.title : news.title}
                        </h1>

                        {/* Featured Image */}
                        {news.image && (
                            <img
                                src={news.image}
                                alt={isNepali ? news.titleHindi : news.title}
                                className="w-full rounded-lg mb-8 shadow-lg"
                            />
                        )}

                        {/* Description */}
                        <p className={`text-lg text-muted-foreground leading-relaxed mb-8 ${isNepali ? 'font-nepali' : ''}`}>
                            {isNepali ? news.descriptionHindi || news.description : news.description}
                        </p>

                        {/* Content */}
                        <div className={`prose prose-sm max-w-none mb-8 ${isNepali ? 'font-nepali' : ''}`}>
                            <div className="text-foreground leading-relaxed whitespace-pre-wrap">
                                {isNepali ? news.contentHindi || news.content : news.content}
                            </div>
                        </div>

                        {/* Author Info */}
                        {news.author && (
                            <div className="border-t pt-8">
                                <p className={`text-sm text-muted-foreground mb-2 ${isNepali ? 'font-nepali' : ''}`}>
                                    Written by:
                                </p>
                                <p className="font-semibold text-foreground">{news.author.name}</p>
                            </div>
                        )}
                    </motion.div>
                </div>
            </article>

            {/* Related News Section */}
            <section className="py-16 bg-card/50">
                <div className="container-main">
                    <h2 className={`text-2xl font-bold text-foreground mb-8 ${isNepali ? 'font-nepali' : ''}`}>
                        More News
                    </h2>
                    <button
                        onClick={() => navigate('/news')}
                        className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-primary text-primary-foreground font-semibold hover:bg-primary/90 transition-colors"
                    >
                        View All News
                    </button>
                </div>
            </section>
        </Layout>
    );
};

export default NewsDetailPage;
