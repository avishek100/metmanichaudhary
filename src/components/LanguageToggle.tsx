import { motion } from 'framer-motion';
import { useLanguage } from '@/contexts/LanguageContext';

const LanguageToggle = () => {
  const { language, setLanguage } = useLanguage();

  return (
    <div className="lang-toggle">
      <motion.div
        className="lang-toggle-indicator"
        initial={false}
        animate={{
          left: language === 'en' ? '4px' : '50%',
          width: 'calc(50% - 4px)',
        }}
        transition={{ type: 'spring', stiffness: 300, damping: 25 }}
      />
      <button
        onClick={() => setLanguage('en')}
        className={`lang-toggle-btn ${language === 'en' ? 'active' : ''}`}
      >
        EN
      </button>
      <button
        onClick={() => setLanguage('ne')}
        className={`lang-toggle-btn font-nepali ${language === 'ne' ? 'active' : ''}`}
      >
        नेपाली
      </button>
    </div>
  );
};

export default LanguageToggle;
