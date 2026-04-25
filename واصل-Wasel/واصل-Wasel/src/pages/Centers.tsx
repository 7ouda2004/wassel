import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { MapPin, Phone, Clock, ChevronRight, Search, Filter } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

interface Center {
  id: string;
  name: string;
  location: string;
  address: string;
  phone: string;
  workingHours: string;
  image: string;
  region: string;
}

const centers: Center[] = [
  {
    id: '1',
    name: ' واصل-wasselv - المركز الرئيسي',
    location: 'القاهرة',
    address: 'شارع التحرير، وسط البلد، القاهرة',
    phone: '02-123-4567',
    workingHours: 'السبت - الخميس: 9 صباحاً - 9 مساءً',
    image: 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
    region: 'القاهرة الكبرى'
  },
  {
    id: '2',
    name: 'أورثوميدكس - فرع الإسكندرية',
    location: 'الإسكندرية',
    address: 'شارع الكورنيش، سموحة، الإسكندرية',
    phone: '03-456-7890',
    workingHours: 'السبت - الخميس: 10 صباحاً - 8 مساءً',
    image: 'https://images.unsplash.com/photo-1586773860418-d37222d8fce3?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
    region: 'الإسكندرية'
  },
  {
    id: '3',
    name: 'مركز  واصل-wassel - المنصورة',
    location: 'المنصورة',
    address: 'شارع الجمهورية، برج الأطباء، الدور الثالث، المنصورة',
    phone: '050-123-4567',
    workingHours: 'السبت - الخميس: 9 صباحاً - 9 مساءً',
    image: 'https://images.unsplash.com/photo-1629909613654-28e377c37b09?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
    region: 'الدلتا'
  },
  {
    id: '4',
    name: 'مركز  واصل-wassel - أسيوط',
    location: 'أسيوط',
    address: 'شارع الجمهورية، برج النور، أسيوط',
    phone: '088-123-4567',
    workingHours: 'السبت - الخميس: 9 صباحاً - 8 مساءً',
    image: 'https://images.unsplash.com/photo-1551190822-a9333d879b1f?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
    region: 'الصعيد'
  },
  {
    id: '5',
    name: 'مركز  واصل-wassel - طنطا',
    location: 'طنطا',
    address: 'شارع البحر، برج الأطباء، طنطا',
    phone: '040-123-4567',
    workingHours: 'السبت - الخميس: 9 صباحاً - 9 مساءً',
    image: 'https://images.unsplash.com/photo-1538108149393-fbbd81895907?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
    region: 'الدلتا'
  }
];

const regions = ['الكل', 'القاهرة الكبرى', 'الإسكندرية', 'الدلتا', 'الصعيد'];

const Centers = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRegion, setSelectedRegion] = useState('الكل');
  const [filteredCenters, setFilteredCenters] = useState(centers);

  useEffect(() => {
    document.documentElement.dir = 'rtl';
    document.body.classList.add('font-cairo');
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    const filtered = centers.filter(center => {
      const matchesSearch = center.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        center.location.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesRegion = selectedRegion === 'الكل' || center.region === selectedRegion;
      return matchesSearch && matchesRegion;
    });
    setFilteredCenters(filtered);
  }, [searchTerm, selectedRegion]);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-b from-medical-100 to-white overflow-hidden">
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-block py-2 px-6 bg-medical-200 text-medical-800 rounded-full text-sm font-semibold mb-4 shadow-sm"
            >
              <span>شبكة مراكزنا</span>
            </motion.div>
            <motion.h1
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-gray-900 mb-6"
            >
              مراكز الأطراف الصناعية والأجهزة التقويمية
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-xl text-gray-600 mb-8 leading-relaxed font-medium"
            >
              اكتشف شبكة مراكزنا المتصلة في جميع أنحاء مصر. نحن نربط خبرائنا ومراكزنا ببعضها البعض لضمان حصولك على أعلى جودة من الخدمة، أينما كنت.
            </motion.p>
          </div>

          {/* Visual Network Link */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.5 }}
            className="w-full max-w-5xl mx-auto h-64 mt-12 bg-gray-100 rounded-3xl overflow-hidden shadow-inner relative flex justify-center items-center border-[6px] border-white"
          >
            {/* Map Placeholder showing connected points */}
            <img src="https://images.unsplash.com/photo-1596484552993-9ce3?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80" className="absolute inset-0 w-full h-full object-cover opacity-30 mix-blend-multiply" alt="Map Route" />
            <div className="absolute inset-0 bg-medical-900/50"></div>

            <div className="relative z-10 flex flex-col md:flex-row items-center gap-4 md:gap-16 w-full justify-center">
              <motion.div animate={{ y: [0, -10, 0] }} transition={{ repeat: Infinity, duration: 2 }} className="flex flex-col items-center">
                <MapPin className="h-12 w-12 text-white drop-shadow-md mb-2" />
                <span className="text-white font-bold text-lg drop-shadow-md">القاهرة</span>
              </motion.div>
              <div className="hidden md:block h-1 w-16 md:w-32 bg-gradient-to-r from-medical-200 to-white rounded-full animate-pulse"></div>
              <motion.div animate={{ y: [0, -10, 0], scale: [1, 1.1, 1] }} transition={{ repeat: Infinity, duration: 2, delay: 0.5 }} className="flex flex-col items-center">
                <MapPin className="h-16 w-16 text-medical-300 drop-shadow-lg mb-2" />
                <span className="text-white font-black text-2xl drop-shadow-md">المركز الرئيسي</span>
              </motion.div>
              <div className="hidden md:block h-1 w-16 md:w-32 bg-gradient-to-l from-medical-200 to-white rounded-full animate-pulse"></div>
              <motion.div animate={{ y: [0, -10, 0] }} transition={{ repeat: Infinity, duration: 2, delay: 1 }} className="flex flex-col items-center">
                <MapPin className="h-12 w-12 text-white drop-shadow-md mb-2" />
                <span className="text-white font-bold text-lg drop-shadow-md">الإسكندرية</span>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Search and Filter Section */}
      <section className="py-8 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="flex flex-col md:flex-row gap-4 mb-8">
              <div className="flex-1 relative">
                <Input
                  type="text"
                  placeholder="ابحث عن مركز..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 pr-4"
                />
                <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              </div>
              <div className="flex gap-2 overflow-x-auto pb-2 md:pb-0">
                {regions.map((region) => (
                  <Button
                    key={region}
                    variant={selectedRegion === region ? 'default' : 'outline'}
                    onClick={() => setSelectedRegion(region)}
                    className="whitespace-nowrap"
                  >
                    {region}
                  </Button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Centers Grid */}
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredCenters.map((center) => (
                <motion.div
                  key={center.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  className="bg-white rounded-lg shadow-md overflow-hidden"
                >
                  <img
                    src={center.image}
                    alt={center.name}
                    className="w-full h-48 object-cover"
                  />
                  <div className="p-6">
                    <h3 className="text-xl font-semibold mb-2">{center.name}</h3>
                    <div className="space-y-3 mb-4">
                      <div className="flex items-center text-gray-600">
                        <MapPin className="h-5 w-5 ml-2" />
                        <span>{center.address}</span>
                      </div>
                      <div className="flex items-center text-gray-600">
                        <Phone className="h-5 w-5 ml-2" />
                        <span>{center.phone}</span>
                      </div>
                      <div className="flex items-center text-gray-600">
                        <Clock className="h-5 w-5 ml-2" />
                        <span>{center.workingHours}</span>
                      </div>
                    </div>
                    <Link to={`/centers/${center.id}`}>
                      <Button className="w-full">
                        عرض التفاصيل
                        <ChevronRight className="mr-2 h-5 w-5 rtl:rotate-180" />
                      </Button>
                    </Link>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Centers;