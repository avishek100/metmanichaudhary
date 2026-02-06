import { useState } from 'react';
import { motion } from 'framer-motion';
import { Send, CheckCircle } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import Layout from '@/components/Layout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';

const FeedbackPage = () => {
  const { t, isNepali } = useLanguage();
  const { toast } = useToast();
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    district: '',
    subject: '',
    message: '',
  });

  const districts = isNepali
    ? ['काठमाडौं', 'ललितपुर', 'भक्तपुर', 'पोखरा', 'बिराटनगर', 'विरगंज', 'जनकपुर', 'धनगढी', 'बुटवल', 'अन्य']
    : ['Kathmandu', 'Lalitpur', 'Bhaktapur', 'Pokhara', 'Biratnagar', 'Birgunj', 'Janakpur', 'Dhangadhi', 'Butwal', 'Other'];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Form submission logic would go here
    setSubmitted(true);
    toast({
      title: isNepali ? 'सफलतापूर्वक पठाइयो!' : 'Successfully Submitted!',
      description: t('feedback.success'),
    });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  if (submitted) {
    return (
      <Layout>
        <section className="py-16 lg:py-24" style={{ background: 'var(--gradient-hero)' }}>
          <div className="container-main">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center text-white"
            >
              <h1 className={`text-4xl lg:text-5xl font-bold mb-4 ${isNepali ? 'font-nepali' : ''}`}>
                {t('feedback.title')}
              </h1>
            </motion.div>
          </div>
        </section>
        
        <section className="py-16 lg:py-24 bg-background">
          <div className="container-main">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="max-w-md mx-auto text-center"
            >
              <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-6">
                <CheckCircle size={48} className="text-primary" />
              </div>
              <h2 className={`text-2xl font-bold text-foreground mb-4 ${isNepali ? 'font-nepali' : ''}`}>
                {isNepali ? 'धन्यवाद!' : 'Thank You!'}
              </h2>
              <p className={`text-muted-foreground mb-8 ${isNepali ? 'font-nepali' : ''}`}>
                {t('feedback.success')}
              </p>
              <Button onClick={() => setSubmitted(false)} className={isNepali ? 'font-nepali' : ''}>
                {isNepali ? 'अर्को प्रतिक्रिया पठाउनुहोस्' : 'Submit Another Feedback'}
              </Button>
            </motion.div>
          </div>
        </section>
      </Layout>
    );
  }

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
              {t('feedback.title')}
            </h1>
            <p className={`text-xl text-white/90 max-w-2xl mx-auto ${isNepali ? 'font-nepali' : ''}`}>
              {t('feedback.subtitle')}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Feedback Form */}
      <section className="py-16 lg:py-24 bg-background">
        <div className="container-main">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-2xl mx-auto"
          >
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid sm:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="name" className={isNepali ? 'font-nepali' : ''}>
                    {t('feedback.name')} *
                  </Label>
                  <Input
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className={isNepali ? 'font-nepali' : ''}
                    placeholder={isNepali ? 'तपाईंको पूरा नाम' : 'Your full name'}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email" className={isNepali ? 'font-nepali' : ''}>
                    {t('feedback.email')} *
                  </Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    placeholder="example@email.com"
                  />
                </div>
              </div>

              <div className="grid sm:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="phone" className={isNepali ? 'font-nepali' : ''}>
                    {t('feedback.phone')}
                  </Label>
                  <Input
                    id="phone"
                    name="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="+977-98XXXXXXXX"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="district" className={isNepali ? 'font-nepali' : ''}>
                    {t('feedback.district')} *
                  </Label>
                  <select
                    id="district"
                    name="district"
                    value={formData.district}
                    onChange={handleChange}
                    required
                    className={`flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring ${isNepali ? 'font-nepali' : ''}`}
                  >
                    <option value="">{isNepali ? 'जिल्ला छान्नुहोस्' : 'Select District'}</option>
                    {districts.map((district) => (
                      <option key={district} value={district}>{district}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="subject" className={isNepali ? 'font-nepali' : ''}>
                  {t('feedback.subject')} *
                </Label>
                <Input
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                  className={isNepali ? 'font-nepali' : ''}
                  placeholder={isNepali ? 'तपाईंको प्रतिक्रियाको विषय' : 'Subject of your feedback'}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="message" className={isNepali ? 'font-nepali' : ''}>
                  {t('feedback.message')} *
                </Label>
                <Textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={6}
                  className={isNepali ? 'font-nepali' : ''}
                  placeholder={isNepali ? 'तपाईंको विस्तृत सन्देश वा सुझाव लेख्नुहोस्...' : 'Write your detailed message or suggestion...'}
                />
              </div>

              <Button type="submit" size="lg" className={`w-full sm:w-auto ${isNepali ? 'font-nepali' : ''}`}>
                {t('feedback.submit')}
                <Send size={18} className="ml-2" />
              </Button>
            </form>
          </motion.div>
        </div>
      </section>
    </Layout>
  );
};

export default FeedbackPage;
