import { motion } from 'framer-motion';
import { Calendar, ArrowRight } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import Layout from '@/components/Layout';

const NewsPage = () => {
  const { t, isNepali } = useLanguage();

  const newsItems = [
    {
      id: 1,
      dateEn: 'January 28, 2024',
      dateNe: 'माघ १५, २०८०',
      titleEn: 'New Education Initiative Launched in Karnali Province',
      titleNe: 'कर्णाली प्रदेशमा नयाँ शिक्षा पहल शुरू',
      excerptEn: 'A comprehensive program to improve educational infrastructure and teacher training has been launched in partnership with local governments.',
      excerptNe: 'स्थानीय सरकारसँगको साझेदारीमा शैक्षिक पूर्वाधार र शिक्षक तालिम सुधार गर्ने व्यापक कार्यक्रम शुरू गरिएको छ।',
      category: isNepali ? 'शिक्षा' : 'Education',
    },
    {
      id: 2,
      dateEn: 'January 15, 2024',
      dateNe: 'माघ २, २०८०',
      titleEn: 'Health Camp Serves 2,000+ Citizens in Rural Areas',
      titleNe: 'ग्रामीण क्षेत्रमा स्वास्थ्य शिविरले २,०००+ नागरिकहरूलाई सेवा',
      excerptEn: 'Free medical checkups and medicines were distributed during the week-long health camp in collaboration with local hospitals.',
      excerptNe: 'स्थानीय अस्पतालहरूसँगको सहकार्यमा एक हप्ते स्वास्थ्य शिविरमा निःशुल्क स्वास्थ्य परीक्षण र औषधि वितरण गरियो।',
      category: isNepali ? 'स्वास्थ्य' : 'Healthcare',
    },
    {
      id: 3,
      dateEn: 'December 28, 2023',
      dateNe: 'पुष १३, २०८०',
      titleEn: 'Infrastructure Project Connects 5 Remote Villages',
      titleNe: 'पूर्वाधार परियोजनाले ५ दुर्गम गाउँहरू जोड्यो',
      excerptEn: 'The newly constructed road network will provide year-round connectivity to communities that were previously isolated during monsoon.',
      excerptNe: 'नयाँ निर्माण गरिएको सडक नेटवर्कले पहिले मनसुनमा विच्छेद हुने समुदायहरूलाई वर्षभरि जडान प्रदान गर्नेछ।',
      category: isNepali ? 'पूर्वाधार' : 'Infrastructure',
    },
    {
      id: 4,
      dateEn: 'December 15, 2023',
      dateNe: 'पुष १, २०८०',
      titleEn: 'Youth Entrepreneurship Program Graduates First Batch',
      titleNe: 'युवा उद्यमशीलता कार्यक्रमबाट पहिलो ब्याचले स्नातक',
      excerptEn: '50 young entrepreneurs completed the training program and received seed funding to start their businesses.',
      excerptNe: '५० युवा उद्यमीहरूले तालिम कार्यक्रम पूरा गरे र आफ्नो व्यवसाय सुरु गर्न बीज कोष प्राप्त गरे।',
      category: isNepali ? 'युवा' : 'Youth',
    },
    {
      id: 5,
      dateEn: 'November 20, 2023',
      dateNe: 'मंसिर ५, २०८०',
      titleEn: 'Environmental Conservation Drive Plants 10,000 Trees',
      titleNe: 'वातावरण संरक्षण अभियानले १०,००० रुख रोप्यो',
      excerptEn: 'Community members and students joined hands to plant trees across multiple wards as part of the green initiative.',
      excerptNe: 'हरित पहलको भागको रूपमा समुदायका सदस्यहरू र विद्यार्थीहरूले विभिन्न वडाहरूमा रुख रोप्न हात मिलाए।',
      category: isNepali ? 'वातावरण' : 'Environment',
    },
    {
      id: 6,
      dateEn: 'November 5, 2023',
      dateNe: 'कार्तिक २०, २०८०',
      titleEn: 'Women\'s Cooperative Receives Government Recognition',
      titleNe: 'महिला सहकारीले सरकारी मान्यता प्राप्त गर्‍यो',
      excerptEn: 'The women\'s cooperative supported by our initiative was recognized for its outstanding contribution to local economy.',
      excerptNe: 'हाम्रो पहलद्वारा समर्थित महिला सहकारीलाई स्थानीय अर्थतन्त्रमा उत्कृष्ट योगदानको लागि मान्यता दिइयो।',
      category: isNepali ? 'महिला' : 'Women',
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
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {newsItems.map((news, index) => (
              <motion.article
                key={news.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="card-agenda group cursor-pointer"
              >
                <div className="flex items-center gap-2 text-muted-foreground text-sm mb-3">
                  <Calendar size={16} />
                  <span className={isNepali ? 'font-nepali' : ''}>{isNepali ? news.dateNe : news.dateEn}</span>
                </div>
                
                <span className={`inline-block px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-medium mb-3 ${isNepali ? 'font-nepali' : ''}`}>
                  {news.category}
                </span>
                
                <h3 className={`text-lg font-semibold text-foreground mb-3 group-hover:text-primary transition-colors ${isNepali ? 'font-nepali' : ''}`}>
                  {isNepali ? news.titleNe : news.titleEn}
                </h3>
                
                <p className={`text-sm text-muted-foreground leading-relaxed mb-4 ${isNepali ? 'font-nepali' : ''}`}>
                  {isNepali ? news.excerptNe : news.excerptEn}
                </p>
                
                <span className={`inline-flex items-center gap-2 text-sm font-medium text-primary group-hover:gap-3 transition-all ${isNepali ? 'font-nepali' : ''}`}>
                  {t('news.readmore')}
                  <ArrowRight size={16} />
                </span>
              </motion.article>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default NewsPage;
