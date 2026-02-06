import { Link } from 'react-router-dom';
import { Facebook, Instagram, Twitter, Youtube, Mail, Phone, MapPin } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

const Footer = () => {
  const { t, isNepali } = useLanguage();

  const quickLinks = [
    { key: 'nav.about', path: '/about' },
    { key: 'nav.vision', path: '/vision' },
    { key: 'nav.achievements', path: '/achievements' },
    { key: 'nav.news', path: '/news' },
    { key: 'nav.feedback', path: '/feedback' },
  ];

  const socialLinks = [
    { icon: Facebook, href: 'https://facebook.com', label: 'Facebook' },
    { icon: Instagram, href: 'https://instagram.com', label: 'Instagram' },
    { icon: Twitter, href: 'https://twitter.com', label: 'X (Twitter)' },
    { icon: Youtube, href: 'https://youtube.com', label: 'YouTube' },
  ];

  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="container-main py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {/* Brand */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-full bg-secondary flex items-center justify-center">
                <span className="text-secondary-foreground font-bold text-xl">N</span>
              </div>
              <div>
                <p className={`font-semibold text-lg ${isNepali ? 'font-nepali' : ''}`}>
                  {isNepali ? 'जनताको नेता' : 'Leader Name'}
                </p>
              </div>
            </div>
            <p className={`text-primary-foreground/80 text-sm leading-relaxed ${isNepali ? 'font-nepali' : ''}`}>
              {t('footer.tagline')}
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className={`font-semibold text-lg mb-4 ${isNepali ? 'font-nepali' : ''}`}>
              {t('footer.quicklinks')}
            </h3>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className={`text-primary-foreground/80 hover:text-secondary transition-colors text-sm ${
                      isNepali ? 'font-nepali' : ''
                    }`}
                  >
                    {t(link.key)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className={`font-semibold text-lg mb-4 ${isNepali ? 'font-nepali' : ''}`}>
              {t('contact.title')}
            </h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-3 text-sm text-primary-foreground/80">
                <MapPin size={18} className="shrink-0 mt-0.5" />
                <span className={isNepali ? 'font-nepali' : ''}>
                  {isNepali ? 'सिंहदरबार, काठमाडौं' : 'Singhadurbar, Kathmandu'}
                </span>
              </li>
              <li className="flex items-center gap-3 text-sm text-primary-foreground/80">
                <Phone size={18} className="shrink-0" />
                <span>+977-1-4211234</span>
              </li>
              <li className="flex items-center gap-3 text-sm text-primary-foreground/80">
                <Mail size={18} className="shrink-0" />
                <span>contact@leadername.gov.np</span>
              </li>
            </ul>
          </div>

          {/* Social Links */}
          <div>
            <h3 className={`font-semibold text-lg mb-4 ${isNepali ? 'font-nepali' : ''}`}>
              {t('contact.follow')}
            </h3>
            <div className="flex items-center gap-3">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full bg-primary-foreground/10 hover:bg-secondary hover:text-secondary-foreground flex items-center justify-center transition-all duration-300"
                  aria-label={social.label}
                >
                  <social.icon size={18} />
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-primary-foreground/20 text-center">
          <p className={`text-sm text-primary-foreground/60 ${isNepali ? 'font-nepali' : ''}`}>
            {t('footer.copyright')}
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
