import { motion } from 'framer-motion';
import { GraduationCap, Heart, Briefcase, Building2, Leaf, Users, ChevronRight } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import Layout from '@/components/Layout';

const VisionPage = () => {
  const { t, isNepali } = useLanguage();

  const agendaAreas = [
    {
      icon: GraduationCap,
      titleEn: 'Quality Education',
      titleNe: 'गुणस्तरीय शिक्षा',
      color: 'bg-blue-500',
      problemEn: 'Many schools lack proper infrastructure, trained teachers, and modern learning resources. Rural areas face even greater challenges with limited access.',
      problemNe: 'धेरै विद्यालयहरूमा उचित पूर्वाधार, प्रशिक्षित शिक्षक र आधुनिक शिक्षण स्रोतहरूको अभाव छ। ग्रामीण क्षेत्रहरूमा सीमित पहुँचसँग झन् ठूला चुनौतीहरू छन्।',
      solutionEn: 'Investing in teacher training programs, digital learning initiatives, and school infrastructure upgrades across all districts.',
      solutionNe: 'सबै जिल्लाहरूमा शिक्षक तालिम कार्यक्रम, डिजिटल शिक्षण पहल र विद्यालय पूर्वाधार सुधारमा लगानी।',
      futureEn: 'A Nepal where every child, regardless of location, has access to world-class education and opportunities.',
      futureNe: 'एउटा नेपाल जहाँ हरेक बालबालिकाले, स्थान जहाँसुकै भए पनि, विश्वस्तरीय शिक्षा र अवसरहरूमा पहुँच पाउँछ।',
    },
    {
      icon: Heart,
      titleEn: 'Healthcare for All',
      titleNe: 'सबैका लागि स्वास्थ्य सेवा',
      color: 'bg-red-500',
      problemEn: 'Healthcare facilities are concentrated in urban areas. Medicine costs are high, and many citizens cannot afford quality treatment.',
      problemNe: 'स्वास्थ्य सुविधाहरू शहरी क्षेत्रहरूमा केन्द्रित छन्। औषधिको मूल्य उच्च छ र धेरै नागरिकहरूले गुणस्तरीय उपचार गर्न सक्दैनन्।',
      solutionEn: 'Building health posts in rural areas, subsidizing essential medicines, and training local health workers.',
      solutionNe: 'ग्रामीण क्षेत्रहरूमा स्वास्थ्य चौकीहरू निर्माण, आवश्यक औषधिहरूमा अनुदान र स्थानीय स्वास्थ्य कार्यकर्ताहरूलाई तालिम।',
      futureEn: 'Affordable, accessible healthcare within reach of every citizen, from mountains to plains.',
      futureNe: 'पहाडदेखि तराईसम्म हरेक नागरिकको पहुँचमा सस्तो, पहुँचयोग्य स्वास्थ्य सेवा।',
    },
    {
      icon: Briefcase,
      titleEn: 'Youth Employment',
      titleNe: 'युवा रोजगारी',
      color: 'bg-green-500',
      problemEn: 'Millions of young Nepalis leave the country for employment abroad due to lack of opportunities at home.',
      problemNe: 'घरमा अवसरको अभावले लाखौं युवा नेपालीहरू विदेशमा रोजगारीको लागि देश छोड्छन्।',
      solutionEn: 'Creating local industries, supporting startups with funding, and developing vocational training centers.',
      solutionNe: 'स्थानीय उद्योगहरू सिर्जना, कोषसँग स्टार्टअपहरूलाई सहयोग र व्यावसायिक तालिम केन्द्रहरूको विकास।',
      futureEn: 'A thriving economy where our youth find meaningful careers and build their futures in Nepal.',
      futureNe: 'एउटा समृद्ध अर्थतन्त्र जहाँ हाम्रा युवाहरूले अर्थपूर्ण करियर पाउँछन् र नेपालमा आफ्नो भविष्य निर्माण गर्छन्।',
    },
    {
      icon: Building2,
      titleEn: 'Infrastructure Development',
      titleNe: 'पूर्वाधार विकास',
      color: 'bg-amber-500',
      problemEn: 'Many communities remain cut off during monsoon. Unreliable electricity hampers business and education.',
      problemNe: 'धेरै समुदायहरू मनसुनमा विच्छेद हुन्छन्। अविश्वसनीय बिजुलीले व्यापार र शिक्षामा बाधा पुर्‍याउँछ।',
      solutionEn: 'Building all-weather roads, expanding hydropower, and improving internet connectivity nationwide.',
      solutionNe: 'सबै मौसममा चल्ने सडक निर्माण, जलविद्युतको विस्तार र देशव्यापी इन्टरनेट कनेक्टिभिटी सुधार।',
      futureEn: 'A connected Nepal where no community is isolated and every region has access to modern infrastructure.',
      futureNe: 'एउटा जोडिएको नेपाल जहाँ कुनै समुदाय एक्लो छैन र प्रत्येक क्षेत्रको आधुनिक पूर्वाधारमा पहुँच छ।',
    },
    {
      icon: Users,
      titleEn: 'Youth Empowerment',
      titleNe: 'युवा सशक्तिकरण',
      color: 'bg-purple-500',
      problemEn: 'Young people often lack platforms to voice their ideas and participate in decision-making processes.',
      problemNe: 'युवाहरूसँग प्रायः आफ्ना विचारहरू व्यक्त गर्ने र निर्णय प्रक्रियामा भाग लिने मञ्चहरूको अभाव हुन्छ।',
      solutionEn: 'Creating youth councils, leadership programs, and ensuring youth representation in policy-making.',
      solutionNe: 'युवा परिषदहरू सिर्जना, नेतृत्व कार्यक्रमहरू र नीति निर्माणमा युवा प्रतिनिधित्व सुनिश्चित गर्ने।',
      futureEn: 'A nation where young voices shape policies and drive innovation for tomorrow.',
      futureNe: 'एउटा राष्ट्र जहाँ युवा आवाजले नीतिहरू आकार दिन्छ र भोलिको लागि नवप्रवर्तन गर्छ।',
    },
    {
      icon: Leaf,
      titleEn: 'Environmental Protection',
      titleNe: 'वातावरण संरक्षण',
      color: 'bg-teal-500',
      problemEn: 'Climate change threatens our glaciers, forests, and agricultural lands. Pollution affects urban health.',
      problemNe: 'जलवायु परिवर्तनले हाम्रो हिमनदी, वन र कृषि भूमिलाई खतरा छ। प्रदूषणले शहरी स्वास्थ्यलाई असर गर्छ।',
      solutionEn: 'Promoting renewable energy, strengthening forest conservation, and implementing clean air initiatives.',
      solutionNe: 'नवीकरणीय ऊर्जाको प्रवर्द्धन, वन संरक्षणलाई सुदृढ र स्वच्छ हावा पहलहरू कार्यान्वयन।',
      futureEn: 'A green Nepal that leads in sustainable development while preserving our natural heritage.',
      futureNe: 'एउटा हरियो नेपाल जसले हाम्रो प्राकृतिक सम्पदा संरक्षण गर्दै दिगो विकासमा अगाडि बढ्छ।',
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
              {t('vision.title')}
            </h1>
            <p className={`text-xl text-white/90 max-w-3xl mx-auto ${isNepali ? 'font-nepali' : ''}`}>
              {t('vision.subtitle')}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Vision Statement */}
      <section className="py-16 lg:py-24 bg-background">
        <div className="container-main">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-4xl mx-auto text-center"
          >
            <h2 className={`text-3xl lg:text-4xl font-bold text-foreground mb-6 ${isNepali ? 'font-nepali' : ''}`}>
              {isNepali ? 'हाम्रो दृष्टि' : 'Our Vision'}
            </h2>
            <p className={`text-xl text-muted-foreground leading-relaxed ${isNepali ? 'font-nepali' : ''}`}>
              {isNepali
                ? 'एउटा समृद्ध, न्यायपूर्ण र समावेशी नेपाल जहाँ प्रत्येक नागरिकको शिक्षा, स्वास्थ्य र रोजगारीमा समान पहुँच छ। हाम्रो लक्ष्य देशलाई आधुनिकीकरण गर्दै हाम्रो समृद्ध संस्कृति र परम्पराको संरक्षण गर्नु हो।'
                : 'A prosperous, just, and inclusive Nepal where every citizen has equal access to education, healthcare, and employment. Our goal is to modernize the nation while preserving our rich culture and traditions.'
              }
            </p>
          </motion.div>
        </div>
      </section>

      {/* Agenda Areas */}
      <section className="py-16 lg:py-24 section-gradient">
        <div className="container-main">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12 lg:mb-16"
          >
            <h2 className={`text-3xl lg:text-4xl font-bold text-foreground mb-4 ${isNepali ? 'font-nepali' : ''}`}>
              {isNepali ? 'प्राथमिकता क्षेत्रहरू' : 'Priority Areas'}
            </h2>
          </motion.div>

          <div className="space-y-12 lg:space-y-16">
            {agendaAreas.map((area, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="bg-card rounded-3xl p-6 lg:p-10 shadow-card"
              >
                <div className="flex flex-col lg:flex-row gap-6 lg:gap-10">
                  {/* Header */}
                  <div className="lg:w-1/4">
                    <div className={`w-16 h-16 rounded-2xl ${area.color} flex items-center justify-center mb-4`}>
                      <area.icon size={32} className="text-white" />
                    </div>
                    <h3 className={`text-2xl font-bold text-foreground ${isNepali ? 'font-nepali' : ''}`}>
                      {isNepali ? area.titleNe : area.titleEn}
                    </h3>
                  </div>

                  {/* Content */}
                  <div className="lg:w-3/4 grid md:grid-cols-3 gap-6">
                    <div>
                      <h4 className={`text-sm font-semibold text-destructive uppercase tracking-wide mb-3 ${isNepali ? 'font-nepali' : ''}`}>
                        {t('vision.problem')}
                      </h4>
                      <p className={`text-muted-foreground text-sm leading-relaxed ${isNepali ? 'font-nepali' : ''}`}>
                        {isNepali ? area.problemNe : area.problemEn}
                      </p>
                    </div>
                    <div>
                      <h4 className={`text-sm font-semibold text-primary uppercase tracking-wide mb-3 ${isNepali ? 'font-nepali' : ''}`}>
                        {t('vision.solution')}
                      </h4>
                      <p className={`text-muted-foreground text-sm leading-relaxed ${isNepali ? 'font-nepali' : ''}`}>
                        {isNepali ? area.solutionNe : area.solutionEn}
                      </p>
                    </div>
                    <div>
                      <h4 className={`text-sm font-semibold text-secondary uppercase tracking-wide mb-3 ${isNepali ? 'font-nepali' : ''}`}>
                        {t('vision.future')}
                      </h4>
                      <p className={`text-muted-foreground text-sm leading-relaxed ${isNepali ? 'font-nepali' : ''}`}>
                        {isNepali ? area.futureNe : area.futureEn}
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default VisionPage;
