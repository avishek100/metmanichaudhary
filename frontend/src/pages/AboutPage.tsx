import { motion } from 'framer-motion';
import { Award, BookOpen, Users, Heart, Target, Lightbulb } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import Layout from '@/components/Layout';
import heroImage from '@/assets/hero-leader.jpg';

const AboutPage = () => {
  const { t, isNepali } = useLanguage();

  const timeline = [
    {
      year: isNepali ? '२०००' : '2000',
      titleEn: 'Started Political Journey',
      titleNe: 'राजनीतिक यात्रा शुरू',
      descEn: 'Began grassroots activism in local community development projects.',
      descNe: 'स्थानीय सामुदायिक विकास परियोजनाहरूमा जमिनी स्तरको सक्रियता शुरू।',
    },
    {
      year: isNepali ? '२००८' : '2008',
      titleEn: 'Elected to Local Government',
      titleNe: 'स्थानीय सरकारमा निर्वाचित',
      descEn: 'First electoral victory as a ward representative, focusing on education reform.',
      descNe: 'वडा प्रतिनिधिको रूपमा पहिलो चुनावी जित, शिक्षा सुधारमा केन्द्रित।',
    },
    {
      year: isNepali ? '२०१५' : '2015',
      titleEn: 'Provincial Leadership',
      titleNe: 'प्रादेशिक नेतृत्व',
      descEn: 'Took on provincial responsibilities, leading infrastructure development initiatives.',
      descNe: 'प्रादेशिक जिम्मेवारी लिए, पूर्वाधार विकास पहलहरूको नेतृत्व।',
    },
    {
      year: isNepali ? '२०२०' : '2020',
      titleEn: 'National Recognition',
      titleNe: 'राष्ट्रिय मान्यता',
      descEn: 'Recognized for excellence in public service and community development.',
      descNe: 'सार्वजनिक सेवा र सामुदायिक विकासमा उत्कृष्टताको लागि मान्यता।',
    },
  ];

  const values = [
    {
      icon: Heart,
      titleKey: 'about.values.integrity',
      descEn: 'Honest and ethical conduct in all decisions and actions.',
      descNe: 'सबै निर्णय र कार्यमा इमानदार र नैतिक आचरण।',
    },
    {
      icon: Users,
      titleKey: 'about.values.transparency',
      descEn: 'Open governance with accountability to the people.',
      descNe: 'जनताप्रति जवाफदेहीसहित खुला शासन।',
    },
    {
      icon: Target,
      titleKey: 'about.values.service',
      descEn: 'Dedicated to serving the needs of every citizen.',
      descNe: 'प्रत्येक नागरिकको आवश्यकता पूरा गर्न समर्पित।',
    },
    {
      icon: Lightbulb,
      titleKey: 'about.values.progress',
      descEn: 'Embracing innovation for sustainable development.',
      descNe: 'दिगो विकासको लागि नवप्रवर्तन अपनाउने।',
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
              {t('about.title')}
            </h1>
            <p className={`text-xl text-white/90 ${isNepali ? 'font-nepali' : ''}`}>
              {t('about.subtitle')}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Personal Story */}
      <section className="py-16 lg:py-24 bg-background">
        <div className="container-main">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <img
                src={heroImage}
                alt="Leader portrait"
                className="rounded-2xl shadow-xl w-full max-w-md mx-auto"
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <span className={`text-secondary font-semibold ${isNepali ? 'font-nepali' : ''}`}>
                {t('about.story.title')}
              </span>
              <h2 className={`text-3xl lg:text-4xl font-bold text-foreground mt-2 mb-6 ${isNepali ? 'font-nepali' : ''}`}>
                {isNepali ? 'एक साधारण पृष्ठभूमिबाट' : 'From Humble Beginnings'}
              </h2>
              <div className={`space-y-4 text-muted-foreground leading-relaxed ${isNepali ? 'font-nepali' : ''}`}>
                <p>{t('about.story.content')}</p>
                <p>
                  {isNepali
                    ? 'मेरो शिक्षा नेपालको सार्वजनिक विद्यालयहरूमा भयो। कठिनाइहरू बाबजुद, मैले राजनीति विज्ञानमा डिग्री हासिल गरें र सार्वजनिक सेवामा आफ्नो जीवन समर्पित गर्ने निर्णय गरें।'
                    : 'My education was in Nepal\'s public schools. Despite challenges, I earned a degree in Political Science and decided to dedicate my life to public service.'
                  }
                </p>
                <p>
                  {isNepali
                    ? 'आज, मेरो मिशन स्पष्ट छ: हरेक नेपाली नागरिकको जीवनस्तर उठाउने र हाम्रो देशलाई समृद्धिको बाटोमा लैजाने।'
                    : 'Today, my mission is clear: to uplift the lives of every Nepali citizen and lead our nation on the path to prosperity.'
                  }
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Education & Experience */}
      <section className="py-16 lg:py-24 section-gradient">
        <div className="container-main">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12 lg:mb-16"
          >
            <h2 className={`text-3xl lg:text-4xl font-bold text-foreground mb-4 ${isNepali ? 'font-nepali' : ''}`}>
              {t('about.education.title')}
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="card-agenda"
            >
              <BookOpen size={40} className="text-primary mb-4" />
              <h3 className={`text-xl font-semibold text-foreground mb-3 ${isNepali ? 'font-nepali' : ''}`}>
                {isNepali ? 'शैक्षिक पृष्ठभूमि' : 'Educational Background'}
              </h3>
              <ul className={`space-y-2 text-muted-foreground ${isNepali ? 'font-nepali' : ''}`}>
                <li>• {isNepali ? 'राजनीति विज्ञानमा स्नातक (त्रिभुवन विश्वविद्यालय)' : 'Bachelor\'s in Political Science (Tribhuvan University)'}</li>
                <li>• {isNepali ? 'लोक प्रशासनमा स्नातकोत्तर' : 'Master\'s in Public Administration'}</li>
                <li>• {isNepali ? 'नेतृत्व र शासन तालिम' : 'Leadership & Governance Training'}</li>
              </ul>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="card-agenda"
            >
              <Award size={40} className="text-secondary mb-4" />
              <h3 className={`text-xl font-semibold text-foreground mb-3 ${isNepali ? 'font-nepali' : ''}`}>
                {isNepali ? 'अनुभव र पदहरू' : 'Experience & Positions'}
              </h3>
              <ul className={`space-y-2 text-muted-foreground ${isNepali ? 'font-nepali' : ''}`}>
                <li>• {isNepali ? '१५+ वर्ष सार्वजनिक सेवामा' : '15+ years in public service'}</li>
                <li>• {isNepali ? 'स्थानीय सरकार प्रतिनिधि' : 'Local government representative'}</li>
                <li>• {isNepali ? 'शिक्षा सुधार समिति अध्यक्ष' : 'Education Reform Committee Chair'}</li>
              </ul>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-16 lg:py-24 bg-background">
        <div className="container-main">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12 lg:mb-16"
          >
            <h2 className={`text-3xl lg:text-4xl font-bold text-foreground mb-4 ${isNepali ? 'font-nepali' : ''}`}>
              {isNepali ? 'राजनीतिक यात्रा' : 'Political Journey'}
            </h2>
          </motion.div>

          <div className="relative">
            {/* Timeline Line */}
            <div className="absolute left-4 lg:left-1/2 top-0 bottom-0 w-0.5 bg-border lg:-translate-x-0.5" />

            <div className="space-y-8 lg:space-y-12">
              {timeline.map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className={`relative pl-12 lg:pl-0 lg:w-1/2 ${index % 2 === 0 ? 'lg:pr-12' : 'lg:ml-auto lg:pl-12'}`}
                >
                  {/* Dot */}
                  <div className={`absolute left-2 lg:left-auto ${index % 2 === 0 ? 'lg:right-0 lg:translate-x-1/2' : 'lg:left-0 lg:-translate-x-1/2'} top-2 w-4 h-4 rounded-full bg-primary border-4 border-background`} />
                  
                  <div className="card-agenda">
                    <span className="text-secondary font-bold text-lg">{item.year}</span>
                    <h3 className={`text-xl font-semibold text-foreground mt-2 mb-2 ${isNepali ? 'font-nepali' : ''}`}>
                      {isNepali ? item.titleNe : item.titleEn}
                    </h3>
                    <p className={`text-muted-foreground ${isNepali ? 'font-nepali' : ''}`}>
                      {isNepali ? item.descNe : item.descEn}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="py-16 lg:py-24 section-gradient">
        <div className="container-main">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12 lg:mb-16"
          >
            <h2 className={`text-3xl lg:text-4xl font-bold text-foreground mb-4 ${isNepali ? 'font-nepali' : ''}`}>
              {t('about.values.title')}
            </h2>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
            {values.map((value, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="text-center p-6"
              >
                <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                  <value.icon size={32} className="text-primary" />
                </div>
                <h3 className={`text-lg font-semibold text-foreground mb-2 ${isNepali ? 'font-nepali' : ''}`}>
                  {t(value.titleKey)}
                </h3>
                <p className={`text-sm text-muted-foreground ${isNepali ? 'font-nepali' : ''}`}>
                  {isNepali ? value.descNe : value.descEn}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default AboutPage;
