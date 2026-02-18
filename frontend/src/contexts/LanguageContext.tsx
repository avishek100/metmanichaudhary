import React, { createContext, useContext, useState, useCallback, useEffect } from 'react';

type Language = 'en' | 'ne';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
  isNepali: boolean;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

// Translations
const translations: Record<Language, Record<string, string>> = {
  en: {
    // Navigation
    'nav.home': 'Home',
    'nav.about': 'About',
    'nav.vision': 'Vision & Agenda',
    'nav.achievements': 'Achievements',
    'nav.news': 'News',
    'nav.gallery': 'Gallery',
    'nav.feedback': 'Feedback',
    'nav.contact': 'Contact',
    
    // Hero Section
    'hero.tagline': 'Building a Better Nepal Together',
    'hero.vision': 'A leader committed to transparency, progress, and the prosperity of every Nepali citizen. Together, we can build a nation of opportunities, justice, and sustainable development.',
    'hero.cta.agenda': 'View My Agenda',
    'hero.cta.feedback': 'Share Your Voice',
    
    // Agenda Section
    'agenda.title': 'Key Priorities',
    'agenda.subtitle': 'Focused on what matters most to our nation',
    'agenda.education.title': 'Quality Education',
    'agenda.education.desc': 'Modernizing schools, training teachers, and ensuring every child has access to quality education regardless of location.',
    'agenda.health.title': 'Healthcare for All',
    'agenda.health.desc': 'Building health infrastructure, making medicines affordable, and bringing healthcare services closer to rural communities.',
    'agenda.employment.title': 'Youth Employment',
    'agenda.employment.desc': 'Creating jobs, supporting startups, and developing skills training programs to keep our talented youth in Nepal.',
    'agenda.infrastructure.title': 'Infrastructure',
    'agenda.infrastructure.desc': 'Connecting communities through roads, bridges, and reliable electricity to drive economic growth in every region.',
    
    // About Section
    'about.title': 'About the Leader',
    'about.subtitle': 'A journey of service and dedication',
    'about.story.title': 'Personal Story',
    'about.story.content': 'Born in a humble village in Nepal, I grew up understanding the struggles of ordinary citizens. From walking miles to school to witnessing the challenges my parents faced as farmers, these experiences shaped my commitment to public service.',
    'about.education.title': 'Education & Experience',
    'about.education.content': 'Graduated with honors in Political Science and Public Administration. Served in local government for over 15 years, leading initiatives in education reform and rural development.',
    'about.values.title': 'Core Values',
    'about.values.integrity': 'Integrity',
    'about.values.transparency': 'Transparency',
    'about.values.service': 'Public Service',
    'about.values.progress': 'Progressive Thinking',
    
    // Vision Page
    'vision.title': 'Vision & Agenda',
    'vision.subtitle': 'A comprehensive plan for Nepal\'s future',
    'vision.problem': 'The Challenge',
    'vision.solution': 'Our Approach',
    'vision.future': 'Future Vision',
    
    // Achievements
    'achievements.title': 'Achievements',
    'achievements.subtitle': 'Work completed for the people',
    'achievements.projects': 'Projects Completed',
    'achievements.families': 'Families Helped',
    'achievements.schools': 'Schools Built',
    'achievements.roads': 'km Roads Constructed',
    
    // News
    'news.title': 'News & Updates',
    'news.subtitle': 'Latest activities and announcements',
    'news.readmore': 'Read More',
    
    // Gallery
    'gallery.title': 'Photo Gallery',
    'gallery.subtitle': 'Moments with the people',
    'gallery.photos': 'Photos',
    'gallery.videos': 'Videos',
    
    // Feedback
    'feedback.title': 'Share Your Voice',
    'feedback.subtitle': 'Your opinions matter. Help us serve you better.',
    'feedback.name': 'Your Name',
    'feedback.email': 'Email Address',
    'feedback.phone': 'Phone Number (Optional)',
    'feedback.district': 'Your District',
    'feedback.subject': 'Subject',
    'feedback.message': 'Your Message or Suggestion',
    'feedback.submit': 'Submit Feedback',
    'feedback.success': 'Thank you! Your feedback has been submitted.',
    
    // Contact
    'contact.title': 'Contact Us',
    'contact.subtitle': 'Get in touch with our office',
    'contact.office': 'Office Address',
    'contact.phone': 'Phone',
    'contact.email': 'Email',
    'contact.hours': 'Office Hours',
    'contact.follow': 'Follow Us',
    
    // Footer
    'footer.tagline': 'Working for a prosperous Nepal',
    'footer.quicklinks': 'Quick Links',
    'footer.connect': 'Connect',
    'footer.copyright': '© 2024 All Rights Reserved',
    
    // Common
    'common.learnmore': 'Learn More',
    'common.viewall': 'View All',
  },
  ne: {
    // Navigation
    'nav.home': 'गृहपृष्ठ',
    'nav.about': 'परिचय',
    'nav.vision': 'दृष्टिकोण र एजेन्डा',
    'nav.achievements': 'उपलब्धिहरू',
    'nav.news': 'समाचार',
    'nav.gallery': 'ग्यालरी',
    'nav.feedback': 'प्रतिक्रिया',
    'nav.contact': 'सम्पर्क',
    
    // Hero Section
    'hero.tagline': 'सँगै राम्रो नेपाल बनाउँदै',
    'hero.vision': 'पारदर्शिता, प्रगति र प्रत्येक नेपाली नागरिकको समृद्धिप्रति प्रतिबद्ध नेता। सँगै, हामी अवसर, न्याय र दिगो विकासको राष्ट्र निर्माण गर्न सक्छौं।',
    'hero.cta.agenda': 'मेरो एजेन्डा हेर्नुहोस्',
    'hero.cta.feedback': 'आफ्नो आवाज सुनाउनुहोस्',
    
    // Agenda Section
    'agenda.title': 'मुख्य प्राथमिकताहरू',
    'agenda.subtitle': 'हाम्रो राष्ट्रको लागि सबैभन्दा महत्त्वपूर्ण कुरामा केन्द्रित',
    'agenda.education.title': 'गुणस्तरीय शिक्षा',
    'agenda.education.desc': 'विद्यालयहरूको आधुनिकीकरण, शिक्षकहरूको तालिम, र स्थान जहाँसुकै भए पनि प्रत्येक बालबालिकालाई गुणस्तरीय शिक्षामा पहुँच सुनिश्चित गर्ने।',
    'agenda.health.title': 'सबैका लागि स्वास्थ्य सेवा',
    'agenda.health.desc': 'स्वास्थ्य पूर्वाधार निर्माण, औषधि सस्तो बनाउने, र ग्रामीण समुदायहरूमा स्वास्थ्य सेवा नजिक ल्याउने।',
    'agenda.employment.title': 'युवा रोजगारी',
    'agenda.employment.desc': 'रोजगारी सिर्जना, स्टार्टअपहरूलाई सहयोग, र हाम्रो प्रतिभाशाली युवालाई नेपालमै राख्न सीप विकास कार्यक्रमहरू।',
    'agenda.infrastructure.title': 'पूर्वाधार',
    'agenda.infrastructure.desc': 'प्रत्येक क्षेत्रमा आर्थिक वृद्धि गर्न सडक, पुल र भरपर्दो बिजुली मार्फत समुदायहरूलाई जोड्ने।',
    
    // About Section
    'about.title': 'नेताको बारेमा',
    'about.subtitle': 'सेवा र समर्पणको यात्रा',
    'about.story.title': 'व्यक्तिगत कथा',
    'about.story.content': 'नेपालको एउटा साधारण गाउँमा जन्मिएको, मैले साधारण नागरिकहरूको संघर्ष बुझेँ। विद्यालय जान माइलौं हिँड्नुपर्ने देखि मेरा आमाबुबाले किसानको रूपमा भोगेका चुनौतीहरू देख्दा, यी अनुभवहरूले मेरो सार्वजनिक सेवाप्रतिको प्रतिबद्धता बनायो।',
    'about.education.title': 'शिक्षा र अनुभव',
    'about.education.content': 'राजनीति विज्ञान र लोक प्रशासनमा उत्कृष्ट अंकसहित स्नातक। शिक्षा सुधार र ग्रामीण विकासमा अगुवाई गर्दै १५ वर्षभन्दा बढी स्थानीय सरकारमा सेवा।',
    'about.values.title': 'मूल मान्यताहरू',
    'about.values.integrity': 'इमानदारिता',
    'about.values.transparency': 'पारदर्शिता',
    'about.values.service': 'सार्वजनिक सेवा',
    'about.values.progress': 'प्रगतिशील सोच',
    
    // Vision Page
    'vision.title': 'दृष्टिकोण र एजेन्डा',
    'vision.subtitle': 'नेपालको भविष्यको लागि व्यापक योजना',
    'vision.problem': 'चुनौती',
    'vision.solution': 'हाम्रो दृष्टिकोण',
    'vision.future': 'भविष्य दृष्टि',
    
    // Achievements
    'achievements.title': 'उपलब्धिहरू',
    'achievements.subtitle': 'जनताको लागि सम्पन्न कार्यहरू',
    'achievements.projects': 'परियोजनाहरू सम्पन्न',
    'achievements.families': 'परिवारहरूलाई सहयोग',
    'achievements.schools': 'विद्यालयहरू निर्माण',
    'achievements.roads': 'कि.मि. सडक निर्माण',
    
    // News
    'news.title': 'समाचार र अपडेटहरू',
    'news.subtitle': 'पछिल्ला गतिविधिहरू र घोषणाहरू',
    'news.readmore': 'थप पढ्नुहोस्',
    
    // Gallery
    'gallery.title': 'फोटो ग्यालरी',
    'gallery.subtitle': 'जनतासँगको क्षणहरू',
    'gallery.photos': 'फोटोहरू',
    'gallery.videos': 'भिडियोहरू',
    
    // Feedback
    'feedback.title': 'आफ्नो आवाज सुनाउनुहोस्',
    'feedback.subtitle': 'तपाईंको विचार महत्त्वपूर्ण छ। हामीलाई राम्रोसँग सेवा गर्न मद्दत गर्नुहोस्।',
    'feedback.name': 'तपाईंको नाम',
    'feedback.email': 'इमेल ठेगाना',
    'feedback.phone': 'फोन नम्बर (ऐच्छिक)',
    'feedback.district': 'तपाईंको जिल्ला',
    'feedback.subject': 'विषय',
    'feedback.message': 'तपाईंको सन्देश वा सुझाव',
    'feedback.submit': 'प्रतिक्रिया पठाउनुहोस्',
    'feedback.success': 'धन्यवाद! तपाईंको प्रतिक्रिया पेश गरिएको छ।',
    
    // Contact
    'contact.title': 'सम्पर्क गर्नुहोस्',
    'contact.subtitle': 'हाम्रो कार्यालयसँग सम्पर्कमा रहनुहोस्',
    'contact.office': 'कार्यालय ठेगाना',
    'contact.phone': 'फोन',
    'contact.email': 'इमेल',
    'contact.hours': 'कार्यालय समय',
    'contact.follow': 'हामीलाई फलो गर्नुहोस्',
    
    // Footer
    'footer.tagline': 'समृद्ध नेपालको लागि काम गर्दै',
    'footer.quicklinks': 'द्रुत लिंकहरू',
    'footer.connect': 'सम्पर्क',
    'footer.copyright': '© २०२४ सर्वाधिकार सुरक्षित',
    
    // Common
    'common.learnmore': 'थप जान्नुहोस्',
    'common.viewall': 'सबै हेर्नुहोस्',
  },
};

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState<Language>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('preferred-language');
      return (saved as Language) || 'en';
    }
    return 'en';
  });

  useEffect(() => {
    localStorage.setItem('preferred-language', language);
    document.documentElement.lang = language;
  }, [language]);

  const setLanguage = useCallback((lang: Language) => {
    setLanguageState(lang);
  }, []);

  const t = useCallback((key: string): string => {
    return translations[language][key] || key;
  }, [language]);

  const isNepali = language === 'ne';

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t, isNepali }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
