import React, { useEffect, useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { MapPin, Phone, Clock, ChevronRight, Search, Star, Users, ShieldCheck, Building2, Loader2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { useTranslation } from 'react-i18next';
import { regions } from '@/data/centers-database';
import { supabase } from '@/lib/supabase';

const Centers = () => {
  const { t, i18n } = useTranslation();
  const isAr = i18n.language === 'ar';
  const isRtl = i18n.dir() === 'rtl';

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRegion, setSelectedRegion] = useState('الكل');
  const [dbCenters, setDbCenters] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => { 
    window.scrollTo(0, 0); 
    
    const fetchCenters = async () => {
      try {
        const { data, error } = await supabase.from('centers').select('*, specialists(id)').order('created_at', { ascending: true });
        if (!error && data) {
          setDbCenters(data);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchCenters();
  }, []);

  const centers = useMemo(() => {
    return dbCenters.map(c => ({
      ...c,
      id: c.id,
      name_ar: c.name_ar,
      name_en: c.name_en,
      governorate_ar: c.governorate_ar,
      governorate_en: c.governorate_en,
      region_ar: c.region_ar,
      region_en: c.region_en,
      address_ar: c.address_ar,
      address_en: c.address_en,
      image_url: c.image,
      rating: c.rating || 5.0,
      insurance_supported: c.insurance_supported,
      specialists_count: c.specialists?.length || 0,
      phone: c.phone
    }));
  }, [dbCenters]);

  const filteredCenters = useMemo(() => {
    return centers.filter(center => {
      const name = isAr ? center.name_ar : center.name_en;
      const gov = isAr ? center.governorate_ar : center.governorate_en;
      const matchesSearch = name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        gov.toLowerCase().includes(searchTerm.toLowerCase());
      const regionKey = isAr ? center.region_ar : center.region_en;
      const allLabel = isAr ? 'الكل' : 'All';
      const matchesRegion = selectedRegion === allLabel || selectedRegion === 'الكل' || regionKey === selectedRegion ||
        regions.find(r => (isAr ? r.ar : r.en) === selectedRegion && (r.ar === center.region_ar || r.en === center.region_en));
      return matchesSearch && matchesRegion;
    });
  }, [centers, searchTerm, selectedRegion, isAr]);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-b from-medical-100 to-white overflow-hidden">
        <div className="absolute inset-0">
          <motion.div animate={{ scale: [1, 1.2, 1] }} transition={{ duration: 8, repeat: Infinity }} className="absolute top-10 right-20 w-72 h-72 rounded-full bg-medical-200/30 blur-3xl" />
          <motion.div animate={{ scale: [1, 1.3, 1] }} transition={{ duration: 10, repeat: Infinity, delay: 1 }} className="absolute bottom-10 left-20 w-64 h-64 rounded-full bg-teal-200/20 blur-3xl" />
        </div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-flex items-center gap-2 py-2 px-6 bg-medical-200 text-medical-800 rounded-full text-sm font-semibold mb-4 shadow-sm"
            >
              <Building2 className="w-4 h-4" />
              <span>{isAr ? 'الشراء الموحد - مصر' : 'Unified Procurement - Egypt'}</span>
            </motion.div>
            <motion.h1
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-gray-900 mb-6"
            >
              {isAr ? '28 مركز أطراف صناعية متكامل' : '28 Integrated Prosthetic Centers'}
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-xl text-gray-600 mb-4 leading-relaxed font-medium"
            >
              {isAr
                ? 'مركز متكامل في كل محافظة مصرية، مربوط بمنظومة الشراء الموحد والتأمين الصحي الشامل'
                : 'An integrated center in every Egyptian governorate, connected to the unified procurement system and universal health insurance'}
            </motion.p>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="text-base text-medical-700 font-semibold"
            >
              {isAr
                ? 'احجز مع المركز أو مع الأخصائي مباشرة • تقييمات حقيقية • تغطية تأمينية كاملة'
                : 'Book with the center or directly with a specialist • Real ratings • Full insurance coverage'}
            </motion.p>
          </div>

          {/* Stats Strip */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="max-w-4xl mx-auto mt-10 grid grid-cols-2 md:grid-cols-4 gap-4"
          >
            {[
              { icon: Building2, value: '28', label: isAr ? 'مركز متكامل' : 'Centers' },
              { icon: Users, value: '120+', label: isAr ? 'أخصائي' : 'Specialists' },
              { icon: ShieldCheck, value: '7+', label: isAr ? 'شركة تأمين' : 'Insurers' },
              { icon: Star, value: '4.8', label: isAr ? 'تقييم عام' : 'Rating' },
            ].map((stat, idx) => (
              <div key={idx} className="bg-white/80 backdrop-blur-sm rounded-2xl p-4 text-center border border-white shadow-md">
                <stat.icon className="w-6 h-6 text-medical-600 mx-auto mb-2" />
                <div className="text-2xl font-bold text-gray-900">{stat.value}</div>
                <div className="text-sm text-gray-500">{stat.label}</div>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Search and Filter Section */}
      <section className="py-8 bg-white sticky top-16 z-30 shadow-sm">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <div className="flex flex-col md:flex-row gap-4 mb-4">
              <div className="flex-1 relative">
                <Input
                  type="text"
                  placeholder={isAr ? 'ابحث بالمحافظة أو اسم المركز...' : 'Search by governorate or center name...'}
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className={`h-12 rounded-xl ${isRtl ? 'pr-12' : 'pl-12'}`}
                />
                <Search className={`absolute ${isRtl ? 'right-4' : 'left-4'} top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5`} />
              </div>
            </div>
            <div className="flex gap-2 overflow-x-auto pb-2 md:pb-0 scrollbar-hide">
              {regions.map((region) => {
                const label = isAr ? region.ar : region.en;
                return (
                  <Button
                    key={region.ar}
                    variant={selectedRegion === region.ar || selectedRegion === region.en ? 'default' : 'outline'}
                    onClick={() => setSelectedRegion(isAr ? region.ar : region.en)}
                    className="whitespace-nowrap rounded-full text-sm"
                    size="sm"
                  >
                    {label}
                  </Button>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Results Count */}
      <section className="py-4 bg-gray-50">
        <div className="container mx-auto px-4">
          <p className="text-gray-500 text-sm text-center">
            {isAr ? `عرض ${filteredCenters.length} مركز` : `Showing ${filteredCenters.length} centers`}
          </p>
        </div>
      </section>

      {/* Centers Grid */}
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {isLoading ? (
                <div className="col-span-full flex flex-col items-center justify-center py-20 text-medical-600">
                  <Loader2 className="w-10 h-10 animate-spin mb-4" />
                  <p className="font-bold text-lg">{isAr ? 'جاري تحميل المراكز...' : 'Loading centers...'}</p>
                </div>
              ) : filteredCenters.length === 0 ? (
                <div className="col-span-full flex flex-col items-center justify-center py-20 text-gray-500">
                  <Building2 className="w-16 h-16 mb-4 text-gray-300" />
                  <p className="font-bold text-xl mb-2">{isAr ? 'لا توجد مراكز مطابقة' : 'No centers found'}</p>
                  <p>{isAr ? 'جرب البحث بكلمات مختلفة أو تغيير المنطقة' : 'Try searching with different terms or changing region'}</p>
                </div>
              ) : (
                filteredCenters.map((center, index) => (
                  <motion.div
                    key={center.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: index * 0.05 }}
                    className="bg-white rounded-2xl shadow-md overflow-hidden border border-gray-100 hover:shadow-xl hover:border-medical-200 transition-all duration-300 group"
                  >
                  <div className="relative h-48 overflow-hidden">
                    <img
                      src={center.image_url || center.image}
                      alt={isAr ? center.name_ar : center.name_en}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                    <div className="absolute bottom-4 left-4 right-4">
                      <h3 className="text-white font-bold text-lg leading-tight">
                        {isAr ? center.governorate_ar : center.governorate_en}
                      </h3>
                    </div>
                    {/* Assume insurance supported for all centers based on project requirements */}
                    <div className="absolute top-3 left-3 bg-green-500/90 text-white text-xs font-bold px-3 py-1 rounded-full flex items-center gap-1 backdrop-blur-sm">
                      <ShieldCheck className="w-3 h-3" />
                      {isAr ? 'معتمد تأمينياً' : 'Insured'}
                    </div>
                    <div className="absolute top-3 right-3 bg-white/90 text-amber-600 text-xs font-bold px-2 py-1 rounded-full flex items-center gap-1 backdrop-blur-sm">
                      <Star className="w-3 h-3 fill-amber-500" />
                      {center.rating.toFixed(1)}
                    </div>
                  </div>
                  <div className="p-5">
                    <h3 className="text-base font-bold text-gray-900 mb-3 line-clamp-1">
                      {isAr ? center.name_ar : center.name_en}
                    </h3>
                    <div className="space-y-2 mb-4 text-sm">
                      <div className="flex items-center text-gray-600 gap-2">
                        <MapPin className="h-4 w-4 text-medical-500 flex-shrink-0" />
                        <span className="line-clamp-1">{isAr ? center.address_ar : center.address_en}</span>
                      </div>
                      <div className="flex items-center text-gray-600 gap-2">
                        <Phone className="h-4 w-4 text-medical-500 flex-shrink-0" />
                        <span dir="ltr">{center.phone}</span>
                      </div>
                      <div className="flex items-center text-gray-600 gap-2">
                        <Users className="h-4 w-4 text-medical-500 flex-shrink-0" />
                        <span>{center.specialists_count || center.specialists?.length || 0} {isAr ? 'أخصائي' : 'specialists'}</span>
                      </div>
                    </div>
                    <Link to={`/center/${center.id}`}>
                      <Button className="w-full rounded-xl bg-gradient-to-l from-medical-600 to-medical-700 text-white shadow-md hover:shadow-lg transition-all">
                        {isAr ? 'عرض التفاصيل والحجز' : 'View Details & Book'}
                        <ChevronRight className={`h-4 w-4 ${isRtl ? 'rotate-180 mr-2' : 'ml-2'}`} />
                      </Button>
                    </Link>
                  </div>
                </motion.div>
              ))
              )}
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Centers;