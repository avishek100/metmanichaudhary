import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { GraduationCap, Heart, Briefcase, Building2, ChevronRight, ArrowRight } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import Layout from '@/components/Layout';
import heroImage from '@/assets/hero-leader.jpg';

const HomePage = () => {
  const { t, isNepali } = useLanguage();

  const agendaItems = [
    {
      icon: GraduationCap,
      titleKey: 'agenda.education.title',
      descKey: 'agenda.education.desc',
      color: 'bg-blue-500',
    },
    {
      icon: Heart,
      titleKey: 'agenda.health.title',
      descKey: 'agenda.health.desc',
      color: 'bg-red-500',
    },
    {
      icon: Briefcase,
      titleKey: 'agenda.employment.title',
      descKey: 'agenda.employment.desc',
      color: 'bg-green-500',
    },
    {
      icon: Building2,
      titleKey: 'agenda.infrastructure.title',
      descKey: 'agenda.infrastructure.desc',
      color: 'bg-amber-500',
    },
  ];

  const stats = [
    { value: '150+', labelEn: 'Projects Completed', labelNe: 'परियोजना सम्पन्न' },
    { value: '50,000+', labelEn: 'Families Helped', labelNe: 'परिवारलाई सहयोग' },
    { value: '25', labelEn: 'Schools Built', labelNe: 'विद्यालय निर्माण' },
    { value: '200km', labelEn: 'Roads Constructed', labelNe: 'सडक निर्माण' },
  ];

  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center overflow-hidden" style={{ background: 'var(--gradient-hero)' }}>
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }} />
        </div>

        <div className="container-main relative z-10 py-16 lg:py-24">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* Content */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center lg:text-left"
            >
              <motion.span
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
                className={`inline-block px-4 py-2 rounded-full bg-white/20 text-white text-sm font-medium mb-6 ${isNepali ? 'font-nepali' : ''}`}
              >
                {isNepali ? 'नेपालको लागि नेतृत्व' : 'Leadership for Nepal'}
              </motion.span>

              <h1 className={`text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight mb-6 ${isNepali ? 'font-nepali' : ''}`}>
                {t('hero.tagline')}
              </h1>

              <p className={`text-lg lg:text-xl text-white/90 leading-relaxed mb-8 max-w-xl mx-auto lg:mx-0 ${isNepali ? 'font-nepali' : ''}`}>
                {t('hero.vision')}
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <Link to="/vision" className={`btn-hero-primary ${isNepali ? 'font-nepali' : ''}`}>
                  {t('hero.cta.agenda')}
                  <ArrowRight size={20} />
                </Link>
                <Link to="/feedback" className={`btn-hero-secondary ${isNepali ? 'font-nepali' : ''}`}>
                  {t('hero.cta.feedback')}
                </Link>
              </div>
            </motion.div>

            {/* Image */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="relative hidden lg:block"
            >
              <div className="relative">
                <div className="absolute -inset-4 bg-gradient-to-tr from-secondary/40 to-accent/40 rounded-3xl blur-2xl" />
                <img
                  src={heroImage}
                  alt="Leader"
                  className="relative rounded-2xl shadow-2xl w-full max-w-lg mx-auto object-cover"
                />
              </div>
            </motion.div>
          </div>
        </div>

        {/* Wave Divider */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full">
            <path d="M0 120L60 110C120 100 240 80 360 75C480 70 600 80 720 85C840 90 960 90 1080 85C1200 80 1320 70 1380 65L1440 60V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0Z" fill="hsl(var(--background))" />
          </svg>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-background">
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

      {/* Agenda Section */}
      <section className="py-16 lg:py-24 section-gradient">
        <div className="container-main">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12 lg:mb-16"
          >
            <h2 className={`text-3xl lg:text-4xl font-bold text-foreground mb-4 ${isNepali ? 'font-nepali' : ''}`}>
              {t('agenda.title')}
            </h2>
            <p className={`text-lg text-muted-foreground max-w-2xl mx-auto ${isNepali ? 'font-nepali' : ''}`}>
              {t('agenda.subtitle')}
            </p>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
            {agendaItems.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="card-agenda group"
              >
                <div className={`w-14 h-14 rounded-xl ${item.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                  <item.icon size={28} className="text-white" />
                </div>
                <h3 className={`text-xl font-semibold text-foreground mb-3 ${isNepali ? 'font-nepali' : ''}`}>
                  {t(item.titleKey)}
                </h3>
                <p className={`text-muted-foreground text-sm leading-relaxed ${isNepali ? 'font-nepali' : ''}`}>
                  {t(item.descKey)}
                </p>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mt-12"
          >
            <Link
              to="/vision"
              className={`inline-flex items-center gap-2 text-primary font-semibold hover:gap-4 transition-all ${isNepali ? 'font-nepali' : ''}`}
            >
              {t('common.viewall')}
              <ChevronRight size={20} />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* About Preview Section */}
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
                alt="Leader speaking"
                className="rounded-2xl shadow-xl w-full max-w-md mx-auto"
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <span className={`text-secondary font-semibold ${isNepali ? 'font-nepali' : ''}`}>
                {t('about.title')}
              </span>
              <h2 className={`text-3xl lg:text-4xl font-bold text-foreground mt-2 mb-6 ${isNepali ? 'font-nepali' : ''}`}>
                {t('about.subtitle')}
              </h2>
              <p className={`text-muted-foreground leading-relaxed mb-6 ${isNepali ? 'font-nepali' : ''}`}>
                {t('about.story.content')}
              </p>
              
              <div className="flex flex-wrap gap-3 mb-8">
                {['about.values.integrity', 'about.values.transparency', 'about.values.service', 'about.values.progress'].map((key) => (
                  <span
                    key={key}
                    className={`px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium ${isNepali ? 'font-nepali' : ''}`}
                  >
                    {t(key)}
                  </span>
                ))}
              </div>

              <Link
                to="/about"
                className={`inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-primary text-primary-foreground font-semibold hover:bg-primary/90 transition-colors ${isNepali ? 'font-nepali' : ''}`}
              >
                {t('common.learnmore')}
                <ArrowRight size={18} />
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 lg:py-24" style={{ background: 'var(--gradient-hero)' }}>
        <div className="container-main text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className={`text-3xl lg:text-4xl font-bold text-white mb-6 ${isNepali ? 'font-nepali' : ''}`}>
              {isNepali ? 'आफ्नो आवाज सुनाउनुहोस्' : 'Your Voice Matters'}
            </h2>
            <p className={`text-lg text-white/90 max-w-2xl mx-auto mb-8 ${isNepali ? 'font-nepali' : ''}`}>
              {isNepali 
                ? 'तपाईंको सुझाव र प्रतिक्रिया हाम्रो नीति निर्माणमा महत्त्वपूर्ण छ। हामीलाई थाहा दिनुहोस् तपाईं के सोच्नुहुन्छ।'
                : 'Your suggestions and feedback are valuable in shaping our policies. Let us know what matters to you.'
              }
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/feedback" className={`btn-hero-primary ${isNepali ? 'font-nepali' : ''}`}>
                {t('feedback.submit')}
              </Link>
              <Link to="/contact" className={`btn-hero-secondary ${isNepali ? 'font-nepali' : ''}`}>
                {t('nav.contact')}
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </Layout>
  );
};

export default HomePage;
