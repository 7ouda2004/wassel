
import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Medal, Book, Award, Heart, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { useTranslation } from 'react-i18next';

const About = () => {
  const { t } = useTranslation();

  useEffect(() => {
    document.documentElement.dir = 'rtl';
    document.body.classList.add('font-cairo');
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-b from-medical-100 to-white overflow-hidden">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-block oval-header">
              <span>{t('about.about_app')}</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              {t('about.our_story_mission')}
            </h1>
            <p className="text-xl text-gray-600 mb-8">
               {t('about.hero_desc')}
            </p>
          </div>
          
          <motion.div 
            className="mt-12 relative max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <img 
              src="/images/new.png" 
              alt="فريق عمل أورثو إيد برو" 
              className="w-full rounded-2xl shadow-2xl"
            />
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-tr from-medical-600/30 to-transparent"></div>
          </motion.div>
        </div>
      </section>

      {/* About Content */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="mb-16">
              <h2 className="text-3xl font-bold mb-6">{t('about.who_we_are')}</h2>
              <p className="text-lg text-gray-600 mb-4">
                 {t('about.about_desc_1')}
              </p>
              <p className="text-lg text-gray-600 mb-4">
                {t('about.about_desc_2')}
              </p>
              <p className="text-lg text-gray-600">
                {t('about.about_desc_3')}
              </p>
            </div>
            
            <div className="mb-16">
              <h2 className="text-3xl font-bold mb-6">{t('about.our_vision')}</h2>
              <div className="flex items-start space-x-4 rtl:space-x-reverse mb-6">
                <div className="h-12 w-12 rounded-full bg-medical-100 flex items-center justify-center flex-shrink-0">
                  <Medal className="h-6 w-6 text-medical-600" />
                </div>
                <div>
                  <p className="text-lg text-gray-600">
                    {t('about.vision_desc')}
                  </p>
                </div>
              </div>
            </div>
            
            <div className="mb-16">
              <h2 className="text-3xl font-bold mb-6">{t('about.our_mission')}</h2>
              <div className="flex items-start space-x-4 rtl:space-x-reverse mb-6">
                <div className="h-12 w-12 rounded-full bg-medical-100 flex items-center justify-center flex-shrink-0">
                  <Book className="h-6 w-6 text-medical-600" />
                </div>
                <div>
                  <p className="text-lg text-gray-600">
                    {t('about.mission_desc')}
                  </p>
                </div>
              </div>
            </div>
            
            <div className="mb-16">
              <h2 className="text-3xl font-bold mb-6">{t('about.our_values')}</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="bg-medical-50 rounded-lg p-6">
                  <div className="flex items-center mb-4">
                    <div className="h-10 w-10 rounded-full bg-medical-100 flex items-center justify-center mr-3">
                      <Award className="h-5 w-5 text-medical-600" />
                    </div>
                    <h3 className="text-xl font-semibold">{t('about.value_1_title')}</h3>
                  </div>
                  <p className="text-gray-600">
                    {t('about.value_1_desc')}
                  </p>
                </div>
                
                <div className="bg-medical-50 rounded-lg p-6">
                  <div className="flex items-center mb-4">
                    <div className="h-10 w-10 rounded-full bg-medical-100 flex items-center justify-center mr-3">
                      <Heart className="h-5 w-5 text-medical-600" />
                    </div>
                    <h3 className="text-xl font-semibold">{t('about.value_2_title')}</h3>
                  </div>
                  <p className="text-gray-600">
                    {t('about.value_2_desc')}
                  </p>
                </div>
                
                <div className="bg-medical-50 rounded-lg p-6">
                  <div className="flex items-center mb-4">
                    <div className="h-10 w-10 rounded-full bg-medical-100 flex items-center justify-center mr-3">
                      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-medical-600">
                        <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"></path>
                        <polyline points="14 2 14 8 20 8"></polyline>
                        <path d="M16 13v2"></path>
                        <path d="M8 13v2"></path>
                        <path d="M12 10v8"></path>
                      </svg>
                    </div>
                    <h3 className="text-xl font-semibold">{t('about.value_3_title')}</h3>
                  </div>
                  <p className="text-gray-600">
                    {t('about.value_3_desc')}
                  </p>
                </div>
                
                <div className="bg-medical-50 rounded-lg p-6">
                  <div className="flex items-center mb-4">
                    <div className="h-10 w-10 rounded-full bg-medical-100 flex items-center justify-center mr-3">
                      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-medical-600">
                        <path d="M17 6.1H3"></path>
                        <path d="M21 12.1H3"></path>
                        <path d="M15.1 18H3"></path>
                      </svg>
                    </div>
                    <h3 className="text-xl font-semibold">{t('about.value_4_title')}</h3>
                  </div>
                  <p className="text-gray-600">
                    {t('about.value_4_desc')}
                  </p>
                </div>
              </div>
            </div>
            
            <div className="mb-16">
              <h2 className="text-3xl font-bold mb-6">{t('about.why_us')}</h2>
              <div className="space-y-4">
                <div className="flex items-start">
                  <div className="h-8 w-8 rounded-full bg-medical-100 flex items-center justify-center mr-3 mt-1">
                    <span className="text-medical-600 font-bold">1</span>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2">{t('about.why_1_title')}</h3>
                    <p className="text-gray-600">
                      {t('about.why_1_desc')}
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="h-8 w-8 rounded-full bg-medical-100 flex items-center justify-center mr-3 mt-1">
                    <span className="text-medical-600 font-bold">2</span>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2">{t('about.why_2_title')}</h3>
                    <p className="text-gray-600">
                      {t('about.why_2_desc')}
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="h-8 w-8 rounded-full bg-medical-100 flex items-center justify-center mr-3 mt-1">
                    <span className="text-medical-600 font-bold">3</span>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2">{t('about.why_3_title')}</h3>
                    <p className="text-gray-600">
                      {t('about.why_3_desc')}
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="h-8 w-8 rounded-full bg-medical-100 flex items-center justify-center mr-3 mt-1">
                    <span className="text-medical-600 font-bold">4</span>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2">{t('about.why_4_title')}</h3>
                    <p className="text-gray-600">
                      {t('about.why_4_desc')}
                    </p>
                  </div>
                </div>
              </div>
            </div>
            
            <div>
              <h2 className="text-3xl font-bold mb-6">{t('about.our_certs')}</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mb-8">
                <div className="bg-white border border-gray-200 rounded-lg p-4 text-center shadow-sm">
                  <div className="h-16 w-16 mx-auto mb-3">
                    <img 
                      src="https://img.icons8.com/color/96/000000/diploma.png" 
                      alt="شهادة" 
                      className="h-full w-full object-contain"
                    />
                  </div>
                  <h3 className="font-semibold mb-1">{t('about.cert_1')}</h3>
                  <p className="text-sm text-gray-500">2023</p>
                </div>
                
                <div className="bg-white border border-gray-200 rounded-lg p-4 text-center shadow-sm">
                  <div className="h-16 w-16 mx-auto mb-3">
                    <img 
                      src="https://img.icons8.com/color/96/000000/certificate.png" 
                      alt="شهادة" 
                      className="h-full w-full object-contain"
                    />
                  </div>
                  <h3 className="font-semibold mb-1">{t('about.cert_2')}</h3>
                  <p className="text-sm text-gray-500">2024</p>
                </div>
                
                <div className="bg-white border border-gray-200 rounded-lg p-4 text-center shadow-sm">
                  <div className="h-16 w-16 mx-auto mb-3">
                    <img 
                      src="https://img.icons8.com/color/96/000000/warranty.png" 
                      alt="شهادة" 
                      className="h-full w-full object-contain"
                    />
                  </div>
                  <h3 className="font-semibold mb-1">{t('about.cert_3')}</h3>
                  <p className="text-sm text-gray-500">2025</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-medical-600 to-medical-800">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              {t('about.cta_title')}
            </h2>
            <p className="text-medical-100 text-lg mb-8">
              {t('about.cta_desc')}
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link to="/contact">
                <Button size="lg" className="bg-white text-medical-700 hover:bg-medical-50 px-6 py-6 w-full sm:w-auto">
                  {t('about.contact_us')}
                  <ChevronRight className="mr-2 h-5 w-5 rtl:rotate-180" />
                </Button>
              </Link>
              <Link to="/team">
                <Button variant="outline" size="lg" className="border-white text-white hover:bg-white/10 px-6 py-6 w-full sm:w-auto">
                  {t('about.meet_team')}
                  <ChevronRight className="mr-2 h-5 w-5 rtl:rotate-180" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default About;

