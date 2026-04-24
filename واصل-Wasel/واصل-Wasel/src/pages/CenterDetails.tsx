import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { MapPin, Phone, Clock, Calendar, ChevronRight, Building } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

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

// بيانات تجريبية للمركز
const centerData: Center = {
  id: '1',
  name: 'واصل-Wasel - المركز الرئيسي',
  description: 'مركز متخصص في تقديم أحدث خدمات الأطراف الصناعية والأجهزة التقويمية بأعلى معايير الجودة العالمية. نحن نجمع بين الخبرة الطويلة والتقنيات المتطورة لتقديم حلول مخصصة تناسب احتياجات كل مريض.',
  location: 'القاهرة',
  address: 'شارع التحرير، وسط البلد، القاهرة',
  phone: '02-123-4567',
  workingHours: 'السبت - الخميس: 9 صباحاً - 9 مساءً',
  images: [
    'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
    'https://images.unsplash.com/photo-1586773860418-d37222d8fce3?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
    'https://images.unsplash.com/photo-1551190822-a9333d879b1f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80'
  ],
  branches: [
    {
      id: 'b1',
      name: 'فرع مدينة نصر',
      address: 'شارع عباس العقاد، مدينة نصر، القاهرة',
      phone: '02-123-4568',
      workingHours: 'السبت - الخميس: 10 صباحاً - 8 مساءً'
    },
    {
      id: 'b2',
      name: 'فرع المعادي',
      address: 'شارع 9، المعادي، القاهرة',
      phone: '02-123-4569',
      workingHours: 'السبت - الخميس: 10 صباحاً - 8 مساءً'
    }
  ],
  services: [
    'الأطراف الصناعية العلوية',
    'الأطراف الصناعية السفلية',
    'الأجهزة التقويمية للعمود الفقري',
    'الأجهزة التقويمية للأطراف',
    'جبائر القدم والكاحل',
    'الأحذية الطبية المخصصة'
  ],
  specialists: [
    {
      name: 'محمود إبراهيم',
      title: 'أخصائي الأطراف الصناعية',
      image: '/public/images/mahmoud.jpg'
    },
    {
      name: 'باسل أحمد',
      title: 'أخصائي الأجهزة التقويمية',
      image: '/public/images/bassel.jpg'
    }
  ]
};

const CenterDetails = () => {
  const { id } = useParams<{ id: string }>();
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [selectedBranch, setSelectedBranch] = useState<Branch | null>(null);

  useEffect(() => {
    document.documentElement.dir = 'rtl';
    document.body.classList.add('font-cairo');
    window.scrollTo(0, 0);
  }, []);

  // في التطبيق الحقيقي، سنقوم بجلب بيانات المركز باستخدام الـ ID
  // const center = fetchCenterById(id);
  const center = centerData; // نستخدم البيانات التجريبية حالياً

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      {/* Hero Section with Image Slider */}
      <section className="relative h-[500px] overflow-hidden">
        <motion.div
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
          <div className="absolute inset-0 bg-black bg-opacity-40">
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
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2">
          {center.images.map((_, index) => (
            <button
              key={index}
              onClick={() => setActiveImageIndex(index)}
              className={`w-3 h-3 rounded-full ${index === activeImageIndex ? 'bg-white' : 'bg-white/50'}`}
            />
          ))}
        </div>
      </section>

      {/* Center Information */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
              <div className="space-y-4">
                <h2 className="text-2xl font-bold mb-4">معلومات الاتصال</h2>
                <div className="flex items-start space-x-4 rtl:space-x-reverse">
                  <MapPin className="h-6 w-6 text-medical-600 mt-1" />
                  <div>
                    <h3 className="font-semibold">العنوان</h3>
                    <p className="text-gray-600">{center.address}</p>
                  </div>
                </div>
                <div className="flex items-start space-x-4 rtl:space-x-reverse">
                  <Phone className="h-6 w-6 text-medical-600 mt-1" />
                  <div>
                    <h3 className="font-semibold">رقم الهاتف</h3>
                    <p className="text-gray-600">{center.phone}</p>
                  </div>
                </div>
                <div className="flex items-start space-x-4 rtl:space-x-reverse">
                  <Clock className="h-6 w-6 text-medical-600 mt-1" />
                  <div>
                    <h3 className="font-semibold">ساعات العمل</h3>
                    <p className="text-gray-600">{center.workingHours}</p>
                  </div>
                </div>
              </div>
              
              <div>
                <h2 className="text-2xl font-bold mb-4">خدماتنا</h2>
                <ul className="grid grid-cols-1 gap-2">
                  {center.services.map((service, index) => (
                    <li key={index} className="flex items-center">
                      <ChevronRight className="h-5 w-5 text-medical-600 ml-2" />
                      <span>{service}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Branches Section */}
            <div className="mb-12">
              <h2 className="text-2xl font-bold mb-6">فروعنا</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {center.branches.map((branch) => (
                  <div
                    key={branch.id}
                    className="bg-gray-50 rounded-lg p-6 hover:bg-gray-100 transition-colors"
                  >
                    <div className="flex items-center mb-4">
                      <Building className="h-6 w-6 text-medical-600 ml-3" />
                      <h3 className="text-xl font-semibold">{branch.name}</h3>
                    </div>
                    <div className="space-y-3 mb-4">
                      <div className="flex items-center text-gray-600">
                        <MapPin className="h-5 w-5 ml-2" />
                        <span>{branch.address}</span>
                      </div>
                      <div className="flex items-center text-gray-600">
                        <Phone className="h-5 w-5 ml-2" />
                        <span>{branch.phone}</span>
                      </div>
                      <div className="flex items-center text-gray-600">
                        <Clock className="h-5 w-5 ml-2" />
                        <span>{branch.workingHours}</span>
                      </div>
                    </div>
                    <Button
                      onClick={() => setSelectedBranch(branch)}
                      className="w-full"
                    >
                      حجز موعد
                      <Calendar className="mr-2 h-5 w-5" />
                    </Button>
                  </div>
                ))}
              </div>
            </div>

            {/* Specialists Section */}
            <div>
              <h2 className="text-2xl font-bold mb-6">فريقنا المتخصص</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                {center.specialists.map((specialist, index) => (
                  <div key={index} className="text-center">
                    <img
                      src={specialist.image}
                      alt={specialist.name}
                      className="w-32 h-32 rounded-full mx-auto mb-4 object-cover"
                    />
                    <h3 className="font-semibold text-lg">{specialist.name}</h3>
                    <p className="text-gray-600">{specialist.title}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Booking Modal - يمكن إضافته لاحقاً */}

      <Footer />
    </div>
  );
};

export default CenterDetails;