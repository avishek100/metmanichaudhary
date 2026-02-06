import { motion } from 'framer-motion';
import { MapPin, Phone, Mail, Clock, Facebook, Instagram, Twitter, Youtube } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import Layout from '@/components/Layout';

const ContactPage = () => {
  const { t, isNepali } = useLanguage();

  const contactInfo = [
    {
      icon: MapPin,
      labelKey: 'contact.office',
      valueEn: 'Singhadurbar, Kathmandu, Nepal',
      valueNe: 'सिंहदरबार, काठमाडौं, नेपाल',
    },
    {
      icon: Phone,
      labelKey: 'contact.phone',
      valueEn: '+977-1-4211234, +977-1-4211235',
      valueNe: '+977-1-4211234, +977-1-4211235',
    },
    {
      icon: Mail,
      labelKey: 'contact.email',
      valueEn: 'contact@leadername.gov.np',
      valueNe: 'contact@leadername.gov.np',
    },
    {
      icon: Clock,
      labelKey: 'contact.hours',
      valueEn: 'Sunday - Friday: 10:00 AM - 5:00 PM',
      valueNe: 'आइतबार - शुक्रबार: बिहान १०:०० - साँझ ५:००',
    },
  ];

  const socialLinks = [
    { icon: Facebook, href: 'https://facebook.com', label: 'Facebook', color: 'hover:bg-blue-600' },
    { icon: Instagram, href: 'https://instagram.com', label: 'Instagram', color: 'hover:bg-pink-600' },
    { icon: Twitter, href: 'https://twitter.com', label: 'X (Twitter)', color: 'hover:bg-gray-800' },
    { icon: Youtube, href: 'https://youtube.com', label: 'YouTube', color: 'hover:bg-red-600' },
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
              {t('contact.title')}
            </h1>
            <p className={`text-xl text-white/90 ${isNepali ? 'font-nepali' : ''}`}>
              {t('contact.subtitle')}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Contact Info */}
      <section className="py-16 lg:py-24 bg-background">
        <div className="container-main">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16">
            {/* Contact Details */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className={`text-2xl lg:text-3xl font-bold text-foreground mb-8 ${isNepali ? 'font-nepali' : ''}`}>
                {isNepali ? 'हामीसँग सम्पर्क गर्नुहोस्' : 'Get in Touch'}
              </h2>

              <div className="space-y-6">
                {contactInfo.map((info, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-start gap-4"
                  >
                    <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                      <info.icon size={24} className="text-primary" />
                    </div>
                    <div>
                      <h3 className={`font-semibold text-foreground mb-1 ${isNepali ? 'font-nepali' : ''}`}>
                        {t(info.labelKey)}
                      </h3>
                      <p className={`text-muted-foreground ${isNepali ? 'font-nepali' : ''}`}>
                        {isNepali ? info.valueNe : info.valueEn}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Social Links */}
              <div className="mt-10">
                <h3 className={`font-semibold text-foreground mb-4 ${isNepali ? 'font-nepali' : ''}`}>
                  {t('contact.follow')}
                </h3>
                <div className="flex items-center gap-3">
                  {socialLinks.map((social) => (
                    <a
                      key={social.label}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`w-12 h-12 rounded-xl bg-muted flex items-center justify-center transition-all duration-300 ${social.color} hover:text-white`}
                      aria-label={social.label}
                    >
                      <social.icon size={22} />
                    </a>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* Map Placeholder */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="rounded-2xl overflow-hidden shadow-card"
            >
              <div className="w-full h-[400px] lg:h-full min-h-[400px] bg-muted flex items-center justify-center">
                <div className="text-center p-8">
                  <MapPin size={48} className="text-muted-foreground mx-auto mb-4" />
                  <p className={`text-muted-foreground ${isNepali ? 'font-nepali' : ''}`}>
                    {isNepali ? 'नक्सा यहाँ देखिनेछ' : 'Map will be displayed here'}
                  </p>
                  <p className={`text-sm text-muted-foreground mt-2 ${isNepali ? 'font-nepali' : ''}`}>
                    {isNepali ? 'सिंहदरबार, काठमाडौं' : 'Singhadurbar, Kathmandu'}
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Quick Message Section */}
      <section className="py-16 lg:py-24 section-gradient">
        <div className="container-main text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className={`text-2xl lg:text-3xl font-bold text-foreground mb-4 ${isNepali ? 'font-nepali' : ''}`}>
              {isNepali ? 'तपाईंको सुझाव महत्त्वपूर्ण छ' : 'Your Suggestions Matter'}
            </h2>
            <p className={`text-muted-foreground max-w-2xl mx-auto mb-8 ${isNepali ? 'font-nepali' : ''}`}>
              {isNepali
                ? 'हामी तपाईंको प्रतिक्रिया र सुझावहरूको कदर गर्छौं। कृपया हाम्रो प्रतिक्रिया फारम भर्नुहोस् वा हामीलाई सीधै सम्पर्क गर्नुहोस्।'
                : 'We value your feedback and suggestions. Please fill out our feedback form or contact us directly.'
              }
            </p>
            <a
              href="/feedback"
              className={`inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-primary text-primary-foreground font-semibold hover:bg-primary/90 transition-colors ${isNepali ? 'font-nepali' : ''}`}
            >
              {t('feedback.submit')}
            </a>
          </motion.div>
        </div>
      </section>
    </Layout>
  );
};

export default ContactPage;
