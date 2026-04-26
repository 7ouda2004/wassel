import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { MapPin, Phone, Clock, Calendar, ChevronRight, Building } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { useTranslation } from 'react-i18next';

interface Branch {
  id: string;
  name: string;
  address: string;
  phone: string;
  workingHours: string;
}

interface Center {
  id: string;
  name: string;
  description: string;
  location: string;
  address: string;
  phone: string;
  workingHours: string;
  images: string[];
  branches: Branch[];
  services: string[];
  specialists: {
    name: string;
    title: string;
    image: string;
  }[];
}

const CenterDetails = () => {
  const { id } = useParams<{ id: string }>();
  const { t, i18n } = useTranslation();
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [selectedBranch, setSelectedBranch] = useState<Branch | null>(null);

  useEffect(() => {
    document.documentElement.dir = i18n.dir();
    window.scrollTo(0, 0);
  }, [i18n.language]);

  // Translate labels and data
  const center: Center = {
    id: id || '1',
    name: t('center_details.data.name'),
    description: t('center_details.data.desc'),
    location: t('center_details.data.location'),
    address: t('center_details.data.addr'),
    phone: '02-123-4567',
    workingHours: t('center_details.data.hours'),
    images: [
      'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1586773860418-d37222d8fce3?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1551190822-a9333d879b1f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80'
    ],
    branches: [
      {
        id: 'b1',
        name: t('center_details.data.branches.nasr'),
        address: i18n.language === 'ar' ? 'شارع عباس العقاد، مدينة نصر، القاهرة' : 'Abbas El Akkad St, Nasr City, Cairo',
        phone: '02-123-4568',
        workingHours: i18n.language === 'ar' ? 'السبت - الخميس: 10 صباحاً - 8 مساءً' : 'Sat - Thu: 10 AM - 8 PM'
      },
      {
        id: 'b2',
        name: t('center_details.data.branches.maadi'),
        address: i18n.language === 'ar' ? 'شارع 9، المعادي، القاهرة' : 'Road 9, Maadi, Cairo',
        phone: '02-123-4569',
        workingHours: i18n.language === 'ar' ? 'السبت - الخميس: 10 صباحاً - 8 مساءً' : 'Sat - Thu: 10 AM - 8 PM'
      }
    ],
    services: t('center_details.data.services_list', { returnObjects: true }) as string[],
    specialists: [
      {
        name: i18n.language === 'ar' ? 'محمود إبراهيم' : 'Mahmoud Ebrahim',
        title: t('center_details.data.titles.prosthetist'),
        image: '/public/images/mahmoud.jpg'
      },
      {
        name: i18n.language === 'ar' ? 'باسل أحمد' : 'Bassel Ahmed',
        title: t('center_details.data.titles.orthotist'),
        image: '/public/images/bassel.jpg'
      }
    ]
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      {/* Hero Section with Image Slider */}
      <section className="relative h-[500px] overflow-hidden">
        <motion.div
          key={activeImageIndex}
          className="h-full w-full"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <img
            src={center.images[activeImageIndex]}
            alt={center.name}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/40">
            <div className="container mx-auto px-4 h-full flex items-center">
              <div className="max-w-4xl">
                <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
                  {center.name}
                </h1>
                <p className="text-xl text-white/90 mb-6">
                  {center.description}
                </p>
              </div>
            </div>
          </div>
        </motion.div>
        <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex gap-3">
          {center.images.map((_, index) => (
            <button
              key={index}
              onClick={() => setActiveImageIndex(index)}
              className={`w-3 h-3 rounded-full transition-all ${index === activeImageIndex ? 'bg-white scale-125' : 'bg-white/50'}`}
            />
          ))}
        </div>
      </section>

      {/* Center Information */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-16">
              <div className="space-y-6">
                <h2 className="text-3xl font-bold mb-6 text-gray-900 border-b pb-4">
                  {t('center_details.contact_info')}
                </h2>
                <div className="flex items-start gap-4">
                  <div className="bg-medical-50 p-3 rounded-lg">
                    <MapPin className="h-6 w-6 text-medical-600" />
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900">{t('center_details.address')}</h3>
                    <p className="text-gray-600 text-lg">{center.address}</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="bg-medical-50 p-3 rounded-lg">
                    <Phone className="h-6 w-6 text-medical-600" />
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900">{t('center_details.phone')}</h3>
                    <p className="text-gray-600 text-lg">{center.phone}</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="bg-medical-50 p-3 rounded-lg">
                    <Clock className="h-6 w-6 text-medical-600" />
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900">{t('center_details.working_hours')}</h3>
                    <p className="text-gray-600 text-lg">{center.workingHours}</p>
                  </div>
                </div>
              </div>
              
              <div>
                <h2 className="text-3xl font-bold mb-6 text-gray-900 border-b pb-4">
                  {t('center_details.services')}
                </h2>
                <ul className="grid grid-cols-1 gap-3">
                  {center.services.map((service, index) => (
                    <li key={index} className="flex items-center gap-3 bg-gray-50 p-3 rounded-lg hover:bg-medical-50 transition-colors">
                      <ChevronRight className="h-5 w-5 text-medical-600 rtl:rotate-180" />
                      <span className="text-gray-800 font-medium">{service}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Branches Section */}
            <div className="mb-16">
              <h2 className="text-3xl font-bold mb-8 text-gray-900 text-center">
                {t('center_details.branches')}
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {center.branches.map((branch) => (
                  <motion.div
                    key={branch.id}
                    className="bg-white rounded-xl p-8 shadow-lg border border-gray-100 hover:border-medical-200 transition-all"
                    whileHover={{ y: -5 }}
                  >
                    <div className="flex items-center mb-6">
                      <div className="bg-medical-100 p-3 rounded-full mr-4 rtl:ml-4 rtl:mr-0">
                        <Building className="h-7 w-7 text-medical-600" />
                      </div>
                      <h3 className="text-2xl font-bold text-gray-900">{branch.name}</h3>
                    </div>
                    <div className="space-y-4 mb-8">
                      <div className="flex items-start text-gray-600 text-lg">
                        <MapPin className="h-5 w-5 mr-3 rtl:ml-3 rtl:mr-0 mt-1 flex-shrink-0" />
                        <span>{branch.address}</span>
                      </div>
                      <div className="flex items-center text-gray-600 text-lg">
                        <Phone className="h-5 w-5 mr-3 rtl:ml-3 rtl:mr-0 flex-shrink-0" />
                        <span>{branch.phone}</span>
                      </div>
                      <div className="flex items-center text-gray-600 text-lg">
                        <Clock className="h-5 w-5 mr-3 rtl:ml-3 rtl:mr-0 flex-shrink-0" />
                        <span>{branch.workingHours}</span>
                      </div>
                    </div>
                    <Link to="/booking">
                      <Button className="w-full py-6 text-lg medical-btn">
                        {t('center_details.book_appointment')}
                        <Calendar className="ml-2 h-5 w-5" />
                      </Button>
                    </Link>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Specialists Section */}
            <div>
              <h2 className="text-3xl font-bold mb-10 text-gray-900 text-center">
                {t('center_details.team')}
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 gap-12 max-w-3xl mx-auto">
                {center.specialists.map((specialist, index) => (
                  <motion.div 
                    key={index} 
                    className="text-center group"
                    whileHover={{ scale: 1.05 }}
                  >
                    <div className="relative inline-block mb-6">
                      <div className="absolute inset-0 bg-medical-500 rounded-full blur-lg opacity-20 group-hover:opacity-40 transition-opacity"></div>
                      <img
                        src={specialist.image}
                        alt={specialist.name}
                        className="relative w-48 h-48 rounded-full mx-auto object-cover border-4 border-white shadow-xl"
                      />
                    </div>
                    <h3 className="font-bold text-2xl text-gray-900 mb-2">{specialist.name}</h3>
                    <p className="text-medical-600 font-semibold text-lg">{specialist.title}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default CenterDetails;