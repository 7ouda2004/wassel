import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { MapPin, Phone, Clock, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { useTranslation } from 'react-i18next';

const locations = [
  {
    id: 1,
    name: 'المركز الرئيسي - القاهرة',
    address: '15 شارع جامعة الدول العربية، المهندسين، القاهرة',
    phone: '+201119056895',
    hours: 'السبت - الخميس: 9 صباحًا - 6 مساءً',
    mapUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d13819.134309871092!2d31.20493971135394!3d30.053742635558787!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14584132d6eb5851%3A0xb19c7600694af9c5!2z2KfZhNmF2YfZhtiv2LPZitmG2Iwg2KfZhNis2YrYstip!5e0!3m2!1sar!2seg!4v1708440134399!5m2!1sar!2seg'
  },
  {
    id: 2,
    name: 'فرع الإسكندرية',
    address: '120 طريق الحرية، سبورتنج، الإسكندرية',
    phone: '+201119056895',
    hours: 'السبت - الخميس: 9 صباحًا - 5 مساءً',
    mapUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d54803.31018606754!2d29.89121595767993!3d31.20495242201441!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14f5c3fa29b53c0f%3A0x86c62fc5d4d3865b!2z2LPYqNmI2LHYqtmG2KzYjCDYp9mE2KXYs9mD2YbYr9ix2YrYqQ!5e0!3m2!1sar!2seg!4v1708440199631!5m2!1sar!2seg'
  },
  {
    id: 3,
    name: 'فرع المنصورة',
    address: '45 شارع جيهان، المنصورة، الدقهلية',
    phone: '+201119056895',
    hours: 'السبت - الخميس: 10 صباحًا - 6 مساءً',
    mapUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d13769.811808774256!2d31.371969111513693!3d31.040839135950583!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14f79c2b088dc6e9%3A0xb290248c326f786e!2z2KfZhNmF2YbYtdmI2LHYqdiMINin2YTZhdmG2LXZiNix2KkgKNin2YTZhdmG2LXZiNix2KkpLCDYp9mE2K_ZgtmH2YTZitip!5e0!3m2!1sar!2seg!4v1708440233144!5m2!1sar!2seg'
  }
];

const Locations = () => {
  const { t, i18n } = useTranslation();
  
  useEffect(() => {
    document.documentElement.dir = i18n.dir();
    window.scrollTo(0, 0);
  }, [i18n.language]);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      {/* Header Section */}
      <section className="py-20 bg-medical-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-block oval-header">
              <span>{t('locations_page.badge')}</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              {t('locations_page.title')}
            </h1>
            <p className="text-xl text-gray-600 mb-8">
              {t('locations_page.desc')}
            </p>
          </div>
        </div>
      </section>

      {/* Locations */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="section-title">{t('locations_page.section_title')}</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
            {locations.map((location, index) => (
              <motion.div 
                key={location.id}
                className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-100"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <div className="h-64">
                  <iframe 
                    src={location.mapUrl} 
                    width="100%" 
                    height="100%" 
                    style={{ border: 0 }} 
                    allowFullScreen 
                    loading="lazy" 
                    referrerPolicy="no-referrer-when-downgrade"
                    title={location.name}
                  ></iframe>
                </div>
                
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-4">{location.name}</h3>
                  
                  <div className="space-y-3 text-gray-600">
                    <div className="flex items-start">
                      <MapPin className="h-5 w-5 text-medical-500 mr-2 flex-shrink-0 mt-1" />
                      <span>{location.address}</span>
                    </div>
                    
                    <div className="flex items-center">
                      <Phone className="h-5 w-5 text-medical-500 mr-2 flex-shrink-0" />
                      <a href={`tel:${location.phone}`} className="hover:text-medical-600">
                        {location.phone}
                      </a>
                    </div>
                    
                    <div className="flex items-start">
                      <Clock className="h-5 w-5 text-medical-500 mr-2 flex-shrink-0 mt-1" />
                      <span>{location.hours}</span>
                    </div>
                  </div>
                  
                  <div className="mt-6">
                    <a href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(location.address)}`} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-medical-600 hover:text-medical-700 font-medium inline-flex items-center"
                    >
                      {t('locations_page.view_on_map')}
                      <ChevronRight className="h-4 w-4 mr-1 rtl:rotate-180" />
                    </a>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Find Nearest Branch */}
      <section className="py-20 bg-medical-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="section-title">{t('locations_page.find_nearest')}</h2>
            
            <div className="relative h-[500px] mt-12 rounded-lg overflow-hidden shadow-xl">
              <iframe 
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3456035.7335417513!2d28.26171635!3d29.2400254!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14368976c35c36e9%3A0x2c45a00925c4c444!2z2YXYtdix!5e0!3m2!1sar!2seg!4v1708440300058!5m2!1sar!2seg" 
                width="100%" 
                height="100%" 
                style={{ border: 0 }} 
                allowFullScreen 
                loading="lazy" 
                referrerPolicy="no-referrer-when-downgrade"
                title={t('locations_page.map_title')}
              ></iframe>
            </div>
            
            <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white p-6 rounded-lg shadow-md">
                <div className="h-12 w-12 rounded-full bg-medical-100 flex items-center justify-center mb-4">
                  <img 
                    src="https://img.icons8.com/color/48/000000/marker.png" 
                    alt={t('locations_page.steps.locate.title')} 
                    className="h-6 w-6"
                  />
                </div>
                <h3 className="text-lg font-semibold mb-2">{t('locations_page.steps.locate.title')}</h3>
                <p className="text-gray-600">
                  {t('locations_page.steps.locate.desc')}
                </p>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-md">
                <div className="h-12 w-12 rounded-full bg-medical-100 flex items-center justify-center mb-4">
                  <img 
                    src="https://img.icons8.com/color/48/000000/search-location.png" 
                    alt={t('locations_page.steps.find.title')} 
                    className="h-6 w-6"
                  />
                </div>
                <h3 className="text-lg font-semibold mb-2">{t('locations_page.steps.find.title')}</h3>
                <p className="text-gray-600">
                  {t('locations_page.steps.find.desc')}
                </p>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-md">
                <div className="h-12 w-12 rounded-full bg-medical-100 flex items-center justify-center mb-4">
                  <img 
                    src="https://img.icons8.com/color/48/000000/calendar--v1.png" 
                    alt={t('locations_page.steps.book.title')} 
                    className="h-6 w-6"
                  />
                </div>
                <h3 className="text-lg font-semibold mb-2">{t('locations_page.steps.book.title')}</h3>
                <p className="text-gray-600">
                  {t('locations_page.steps.book.desc')}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Home Visits */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="bg-medical-50 rounded-xl overflow-hidden shadow-md">
              <div className="md:flex">
                <div className="md:w-1/2">
                  <img 
                    src="https://images.unsplash.com/photo-1631815588090-d4bfec5b1ccb?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" 
                    alt={t('locations_page.home_visits.title')} 
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-8 md:w-1/2">
                  <h2 className="text-3xl font-bold mb-4">{t('locations_page.home_visits.title')}</h2>
                  <p className="text-gray-600 mb-6">
                    {t('locations_page.home_visits.desc')}
                  </p>
                  
                  <h3 className="font-semibold text-lg mb-3">{t('locations_page.home_visits.coverage')}</h3>
                  <ul className="space-y-2 mb-6">
                    {(t('locations_page.home_visits.areas', { returnObjects: true }) as string[]).map((area, idx) => (
                      <li key={idx} className="flex items-center">
                        <span className="h-2 w-2 bg-medical-500 rounded-full mr-2"></span>
                        <span>{area}</span>
                      </li>
                    ))}
                  </ul>
                  
                  <div className="mt-6">
                    <a href="https://wa.me/201119056895" target="_blank" rel="noopener noreferrer">
                      <Button className="medical-btn">
                        {t('locations_page.home_visits.cta')}
                        <ChevronRight className="mr-2 h-4 w-4 rtl:rotate-180" />
                      </Button>
                    </a>
                  </div>
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
              {t('locations_page.cta_title')}
            </h2>
            <p className="text-medical-100 text-lg mb-8">
              {t('locations_page.cta_desc')}
            </p>
            <Link to="/contact">
              <Button size="lg" className="bg-white text-medical-700 hover:bg-medical-50 px-6 py-6">
                {t('locations_page.cta_button')}
                <ChevronRight className="mr-2 h-5 w-5 rtl:rotate-180" />
              </Button>
            </Link>
          </div>
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default Locations;