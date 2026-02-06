import { motion } from 'framer-motion';
import { School, Stethoscope, Route, Users, TreePine, Droplets } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import Layout from '@/components/Layout';

const AchievementsPage = () => {
  const { t, isNepali } = useLanguage();

  const stats = [
    { value: '150+', labelEn: 'Projects Completed', labelNe: 'परियोजना सम्पन्न' },
    { value: '50,000+', labelEn: 'Families Helped', labelNe: 'परिवारलाई सहयोग' },
    { value: '25', labelEn: 'Schools Built', labelNe: 'विद्यालय निर्माण' },
    { value: '200km', labelEn: 'Roads Constructed', labelNe: 'सडक निर्माण' },
  ];

  const achievements = [
    {
      icon: School,
      titleEn: 'Educational Infrastructure',
      titleNe: 'शैक्षिक पूर्वाधार',
      color: 'bg-blue-500',
      items: [
        { en: 'Built 25 new school buildings in rural areas', ne: 'ग्रामीण क्षेत्रमा २५ नयाँ विद्यालय भवन निर्माण' },
        { en: 'Provided computers to 50 schools', ne: '५० विद्यालयहरूमा कम्प्युटर प्रदान' },
        { en: 'Trained 500+ teachers in modern methods', ne: '५००+ शिक्षकहरूलाई आधुनिक विधिमा तालिम' },
        { en: 'Established 10 scholarship programs', ne: '१० छात्रवृत्ति कार्यक्रमहरू स्थापना' },
      ],
    },
    {
      icon: Stethoscope,
      titleEn: 'Healthcare Initiatives',
      titleNe: 'स्वास्थ्य पहलहरू',
      color: 'bg-red-500',
      items: [
        { en: 'Set up 15 health posts in remote villages', ne: 'दुर्गम गाउँहरूमा १५ स्वास्थ्य चौकी स्थापना' },
        { en: 'Organized 100+ free health camps', ne: '१००+ निःशुल्क स्वास्थ्य शिविर आयोजना' },
        { en: 'Distributed medicines to 10,000+ patients', ne: '१०,०००+ बिरामीहरूलाई औषधि वितरण' },
        { en: 'Trained 200 local health workers', ne: '२०० स्थानीय स्वास्थ्य कार्यकर्ताहरूलाई तालिम' },
      ],
    },
    {
      icon: Route,
      titleEn: 'Infrastructure Development',
      titleNe: 'पूर्वाधार विकास',
      color: 'bg-amber-500',
      items: [
        { en: 'Constructed 200km of rural roads', ne: '२०० कि.मि. ग्रामीण सडक निर्माण' },
        { en: 'Built 15 suspension bridges', ne: '१५ झोलुङ्गे पुल निर्माण' },
        { en: 'Installed solar lights in 30 villages', ne: '३० गाउँमा सौर्य बत्ती जडान' },
        { en: 'Upgraded electricity in 50+ communities', ne: '५०+ समुदायमा बिजुली सुधार' },
      ],
    },
    {
      icon: Users,
      titleEn: 'Community Development',
      titleNe: 'सामुदायिक विकास',
      color: 'bg-green-500',
      items: [
        { en: 'Supported 500+ women entrepreneurs', ne: '५००+ महिला उद्यमीहरूलाई सहयोग' },
        { en: 'Established 20 community centers', ne: '२० सामुदायिक केन्द्र स्थापना' },
        { en: 'Created 1,000+ local jobs', ne: '१,०००+ स्थानीय रोजगारी सिर्जना' },
        { en: 'Launched youth skill training programs', ne: 'युवा सीप तालिम कार्यक्रमहरू शुरू' },
      ],
    },
    {
      icon: TreePine,
      titleEn: 'Environmental Conservation',
      titleNe: 'वातावरण संरक्षण',
      color: 'bg-teal-500',
      items: [
        { en: 'Planted 50,000+ trees across districts', ne: 'जिल्लाहरूमा ५०,०००+ रुख रोपण' },
        { en: 'Established 5 community forests', ne: '५ सामुदायिक वन स्थापना' },
        { en: 'Launched clean village campaigns', ne: 'सफा गाउँ अभियान शुरू' },
        { en: 'Installed waste management systems', ne: 'फोहोर व्यवस्थापन प्रणाली जडान' },
      ],
    },
    {
      icon: Droplets,
      titleEn: 'Water & Sanitation',
      titleNe: 'पानी र सरसफाई',
      color: 'bg-cyan-500',
      items: [
        { en: 'Built drinking water systems for 40 villages', ne: '४० गाउँको लागि खानेपानी प्रणाली निर्माण' },
        { en: 'Constructed 500+ toilets in schools', ne: 'विद्यालयहरूमा ५००+ शौचालय निर्माण' },
        { en: 'Repaired 20 traditional water sources', ne: '२० परम्परागत पानीको स्रोत मर्मत' },
        { en: 'Implemented rainwater harvesting in 15 areas', ne: '१५ क्षेत्रमा वर्षाको पानी सङ्कलन' },
      ],
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
              {t('achievements.title')}
            </h1>
            <p className={`text-xl text-white/90 ${isNepali ? 'font-nepali' : ''}`}>
              {t('achievements.subtitle')}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-background relative -mt-8">
        <div className="container-main">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="text-center p-6 rounded-2xl bg-card shadow-card"
              >
                <p className="text-3xl lg:text-4xl font-bold text-primary mb-2">{stat.value}</p>
                <p className={`text-sm text-muted-foreground ${isNepali ? 'font-nepali' : ''}`}>
                  {isNepali ? stat.labelNe : stat.labelEn}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Achievements Grid */}
      <section className="py-16 lg:py-24 section-gradient">
        <div className="container-main">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {achievements.map((category, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="card-agenda"
              >
                <div className={`w-14 h-14 rounded-xl ${category.color} flex items-center justify-center mb-4`}>
                  <category.icon size={28} className="text-white" />
                </div>
                <h3 className={`text-xl font-semibold text-foreground mb-4 ${isNepali ? 'font-nepali' : ''}`}>
                  {isNepali ? category.titleNe : category.titleEn}
                </h3>
                <ul className="space-y-3">
                  {category.items.map((item, itemIndex) => (
                    <li key={itemIndex} className="flex items-start gap-3">
                      <span className="w-2 h-2 rounded-full bg-secondary mt-2 shrink-0" />
                      <span className={`text-sm text-muted-foreground ${isNepali ? 'font-nepali' : ''}`}>
                        {isNepali ? item.ne : item.en}
                      </span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default AchievementsPage;
