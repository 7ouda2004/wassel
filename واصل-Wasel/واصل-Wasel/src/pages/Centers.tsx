import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MapPin, Phone, Clock, ChevronDown, Search, Users, Star, Award, Calendar, Sparkles, Building2, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

import { getLocalCenters, getLocalSpecialists, type Center, type Specialist } from '@/lib/db';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';

const regions = ['الكل', 'القاهرة الكبرى', 'الإسكندرية', 'الدلتا', 'الصعيد', 'القناة', 'الحدود'];

const Centers = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRegion, setSelectedRegion] = useState('الكل');
  const [centersList, setCentersList] = useState<Center[]>([]);
  const [filteredCenters, setFilteredCenters] = useState<Center[]>([]);
  const [expandedLocation, setExpandedLocation] = useState<string | null>(null);

  // Specialists state
  const [specialists, setSpecialists] = useState<Specialist[]>([]);
  const [selectedSpec, setSelectedSpec] = useState<Specialist | null>(null);

  useEffect(() => {
    document.documentElement.dir = 'rtl';
    document.body.classList.add('font-cairo');
    window.scrollTo(0, 0);
    setCentersList(getLocalCenters());
    // Load all active specialists from DB
    const activeSpecs = getLocalSpecialists().filter(s => s.status === 'active');
    setSpecialists(activeSpecs);
  }, []);

  useEffect(() => {
    const filtered = centersList.filter(center => {
      const matchesSearch = center.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           center.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           center.address.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesRegion = selectedRegion === 'الكل' || center.region === selectedRegion;
      return matchesSearch && matchesRegion;
    });
    setFilteredCenters(filtered);
  }, [searchTerm, selectedRegion, centersList]);

  // Auto expand governorate if search term has results
  useEffect(() => {
    if (searchTerm.trim() !== '') {
      const match = filteredCenters.find(c => 
        c.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        c.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
        c.address.toLowerCase().includes(searchTerm.toLowerCase())
      );
      if (match) {
        setExpandedLocation(match.location);
      }
    }
  }, [searchTerm, filteredCenters]);

  // Group centers by governorate (location)
  const groupedCenters = filteredCenters.reduce((groups, center) => {
    const loc = center.location || 'أخرى';
    if (!groups[loc]) {
      groups[loc] = [];
    }
    groups[loc].push(center);
    return groups;
  }, {} as Record<string, Center[]>);

  return (
    <div className="min-h-screen flex flex-col bg-gray-50/30">
      <Navbar />
      
      {/* Hero Section - Clean and Light */}
      <section className="relative py-16 md:py-24 overflow-hidden">
        {/* Background decorations - static, lightweight */}
        <div className="absolute inset-0 bg-gradient-to-br from-medical-50 via-white to-blue-50/30" />
        <div className="absolute top-0 right-0 w-96 h-96 bg-medical-100/30 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3" />
        <div className="absolute bottom-0 left-0 w-72 h-72 bg-blue-100/20 rounded-full blur-3xl translate-y-1/2 -translate-x-1/3" />
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div 
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="inline-flex items-center gap-2 py-2 px-5 bg-medical-100/60 text-medical-700 rounded-full text-sm font-semibold mb-5 backdrop-blur-sm border border-medical-200/40"
            >
              <Building2 className="h-4 w-4" />
              <span>شبكة مراكزنا المعتمدة</span>
            </motion.div>
            
            <motion.h1 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-gray-900 mb-5 leading-tight"
            >
              مراكز الأطراف الصناعية
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-medical-600 to-medical-400">والأجهزة التقويمية</span>
            </motion.h1>
            
            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-lg text-gray-500 mb-8 max-w-2xl mx-auto leading-relaxed font-medium"
            >
              اكتشف شبكة مراكزنا المتصلة في جميع أنحاء مصر. نربط خبرائنا ومراكزنا ببعضها لضمان حصولك على أعلى جودة من الخدمة.
            </motion.p>

            {/* Stats Row */}
            <motion.div 
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="flex flex-wrap justify-center gap-6 md:gap-10"
            >
              <div className="flex items-center gap-2.5 text-gray-600">
                <div className="w-10 h-10 rounded-xl bg-medical-100 flex items-center justify-center">
                  <Building2 className="h-5 w-5 text-medical-600" />
                </div>
                <div className="text-right">
                  <p className="text-xl font-extrabold text-gray-900">{centersList.length}+</p>
                  <p className="text-xs text-gray-500 font-medium">مركز معتمد</p>
                </div>
              </div>
              <div className="flex items-center gap-2.5 text-gray-600">
                <div className="w-10 h-10 rounded-xl bg-emerald-100 flex items-center justify-center">
                  <Users className="h-5 w-5 text-emerald-600" />
                </div>
                <div className="text-right">
                  <p className="text-xl font-extrabold text-gray-900">{specialists.length}+</p>
                  <p className="text-xs text-gray-500 font-medium">أخصائي معتمد</p>
                </div>
              </div>
              <div className="flex items-center gap-2.5 text-gray-600">
                <div className="w-10 h-10 rounded-xl bg-amber-100 flex items-center justify-center">
                  <Award className="h-5 w-5 text-amber-600" />
                </div>
                <div className="text-right">
                  <p className="text-xl font-extrabold text-gray-900">10+</p>
                  <p className="text-xs text-gray-500 font-medium">سنوات خبرة</p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Search and Filter Section */}
      <section className="py-6 bg-white/80 backdrop-blur-sm sticky top-16 z-30 border-y border-gray-100/80 shadow-sm">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1 relative">
                <Input
                  type="text"
                  placeholder="ابحث عن مركز أو محافظة..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 pr-12 h-12 rounded-xl border-gray-200 bg-gray-50/50 focus:bg-white transition-colors text-base"
                />
                <Search className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              </div>
              <div className="flex gap-2 overflow-x-auto pb-1 md:pb-0 scrollbar-hide">
                {regions.map((region) => (
                  <Button
                    key={region}
                    variant={selectedRegion === region ? 'default' : 'outline'}
                    onClick={() => setSelectedRegion(region)}
                    className={`whitespace-nowrap text-sm rounded-xl h-12 px-4 transition-all duration-200 ${
                      selectedRegion === region 
                        ? 'bg-medical-600 hover:bg-medical-700 shadow-md shadow-medical-500/20' 
                        : 'hover:border-medical-300 hover:text-medical-700'
                    }`}
                  >
                    {region}
                  </Button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Governorates Collapsible Sections */}
      <section className="py-10 flex-grow">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto space-y-4">
            {Object.keys(groupedCenters).length > 0 ? (
              Object.entries(groupedCenters).map(([locationName, locationCenters], idx) => (
                <motion.div 
                  key={locationName}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: idx * 0.05 }}
                  className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow duration-300"
                >
                  <button
                    onClick={() => setExpandedLocation(expandedLocation === locationName ? null : locationName)}
                    className="w-full px-6 py-5 flex justify-between items-center hover:bg-gray-50/50 transition-colors duration-200"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-medical-100 to-medical-50 flex items-center justify-center">
                        <MapPin className="h-5 w-5 text-medical-600" />
                      </div>
                      <span className="text-lg font-bold text-gray-900">{locationName}</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="text-xs font-bold text-medical-700 bg-medical-50 px-3 py-1.5 rounded-full border border-medical-100">
                        {locationCenters.length} {locationCenters.length === 1 ? 'مركز' : 'مراكز'}
                      </span>
                      <ChevronDown className={`h-5 w-5 text-gray-400 transition-transform duration-300 ${expandedLocation === locationName ? 'rotate-180' : ''}`} />
                    </div>
                  </button>
                  
                  <AnimatePresence initial={false}>
                    {expandedLocation === locationName && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3, ease: 'easeInOut' }}
                        className="overflow-hidden"
                      >
                        <div className="p-5 bg-gray-50/30 border-t border-gray-100 grid grid-cols-1 md:grid-cols-2 gap-5">
                          {locationCenters.map((center, centerIdx) => {
                            const centerSpecs = specialists.filter(s => s.centerId === center.id);
                            return (
                              <motion.div
                                key={center.id}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.3, delay: centerIdx * 0.05 }}
                                className="bg-white rounded-2xl shadow-sm overflow-hidden border border-gray-100 flex flex-col justify-between glow-card"
                              >
                                {/* Center Image */}
                                <div className="relative">
                                  <img
                                    src={center.image || '/images/ortho.png'}
                                    alt={center.name}
                                    className="w-full h-40 object-cover"
                                    onError={(e) => {
                                      e.currentTarget.src = '/images/ortho.png';
                                    }}
                                  />
                                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
                                  <div className="absolute bottom-3 right-3">
                                    <span className="bg-white/90 backdrop-blur-sm text-medical-700 text-xs font-bold px-3 py-1 rounded-full shadow-sm">
                                      {center.location}
                                    </span>
                                  </div>
                                </div>
                                
                                <div className="p-5 flex-grow flex flex-col justify-between">
                                  <div>
                                    <h3 className="text-lg font-bold text-gray-900 mb-3">{center.name}</h3>
                                    <div className="space-y-2.5 mb-4 text-sm text-gray-600">
                                      <div className="flex items-start gap-2.5">
                                        <div className="w-7 h-7 rounded-lg bg-medical-50 flex items-center justify-center flex-shrink-0 mt-0.5">
                                          <MapPin className="h-3.5 w-3.5 text-medical-500" />
                                        </div>
                                        <span className="leading-relaxed">{center.address}</span>
                                      </div>
                                      <div className="flex items-center gap-2.5">
                                        <div className="w-7 h-7 rounded-lg bg-emerald-50 flex items-center justify-center flex-shrink-0">
                                          <Phone className="h-3.5 w-3.5 text-emerald-500" />
                                        </div>
                                        <span dir="ltr" className="font-medium">{center.phone}</span>
                                      </div>
                                      <div className="flex items-start gap-2.5">
                                        <div className="w-7 h-7 rounded-lg bg-amber-50 flex items-center justify-center flex-shrink-0 mt-0.5">
                                          <Clock className="h-3.5 w-3.5 text-amber-500" />
                                        </div>
                                        <span>{center.workingHours}</span>
                                      </div>
                                    </div>

                                    {/* Specialists list for this specific center */}
                                    {centerSpecs.length > 0 && (
                                      <div className="border-t border-gray-100 pt-4 mt-4 mb-4">
                                        <h4 className="text-xs font-bold text-gray-500 mb-3 flex items-center gap-1.5">
                                          <Sparkles className="h-3.5 w-3.5 text-medical-500" />
                                          الأخصائيون المعتمدون:
                                        </h4>
                                        <div className="flex flex-wrap gap-2">
                                          {centerSpecs.map(spec => (
                                            <button
                                              key={spec.id}
                                              onClick={() => setSelectedSpec(spec)}
                                              className="flex items-center gap-2 bg-gradient-to-r from-gray-50 to-white hover:from-medical-50 hover:to-medical-50/30 border border-gray-100 hover:border-medical-200 rounded-xl px-3 py-2 transition-all duration-300 text-xs group"
                                            >
                                              <img
                                                src={spec.image || '/images/new.jpg'}
                                                alt={spec.name}
                                                className="h-7 w-7 rounded-full object-cover border-2 border-white shadow-sm group-hover:border-medical-200 transition-colors"
                                                onError={(e) => { e.currentTarget.src = '/images/new.jpg'; }}
                                              />
                                              <div className="text-right">
                                                <span className="font-bold text-gray-800 line-clamp-1 block">{spec.name}</span>
                                                <span className="text-[10px] text-gray-400 line-clamp-1 block">{spec.role}</span>
                                              </div>
                                            </button>
                                          ))}
                                        </div>
                                      </div>
                                    )}
                                  </div>
                                  
                                  <div className="flex gap-2">
                                    <Link 
                                      to={`/booking?center=${center.id}`}
                                      className="flex-grow"
                                    >
                                      <Button className="w-full text-xs py-2.5 bg-gradient-to-l from-red-600 to-red-500 hover:from-red-700 hover:to-red-600 text-white font-bold rounded-xl border-none transition-all duration-300 shadow-sm hover:shadow-md shimmer-btn">
                                        <Calendar className="h-3.5 w-3.5 ml-1.5" />
                                        حجز موعد
                                      </Button>
                                    </Link>
                                    <a 
                                      href={`https://wa.me/${center.phone.replace(/[^0-9]/g, '')}`} 
                                      target="_blank" 
                                      rel="noopener noreferrer" 
                                      className="flex-1"
                                    >
                                      <Button className="w-full text-xs py-2.5 bg-gradient-to-l from-emerald-600 to-emerald-500 hover:from-emerald-700 hover:to-emerald-600 text-white border-none font-bold rounded-xl transition-all duration-300 shadow-sm hover:shadow-md">
                                        <Phone className="h-3.5 w-3.5 ml-1.5" />
                                        واتساب
                                      </Button>
                                    </a>
                                  </div>
                                </div>
                              </motion.div>
                            );
                          })}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              ))
            ) : (
              <div className="text-center bg-white p-16 rounded-2xl shadow-sm border border-gray-100">
                <div className="w-16 h-16 bg-gray-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <MapPin className="h-8 w-8 text-gray-300" />
                </div>
                <p className="text-gray-500 text-lg font-medium">لا توجد مراكز مطابقة لبحثك.</p>
                <p className="text-gray-400 text-sm mt-2">جرب البحث بكلمات مختلفة أو اختر منطقة أخرى</p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Accredited Specialists Grid Section */}
      {specialists.length > 0 && (
        <section className="py-16 bg-white border-t border-gray-100">
          <div className="container mx-auto px-4">
            <div className="max-w-5xl mx-auto">
              {/* Section Header */}
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
                className="text-center mb-12"
              >
                <div className="inline-flex items-center gap-2 py-1.5 px-4 bg-medical-50 text-medical-700 rounded-full text-xs font-bold mb-4 border border-medical-100">
                  <Star className="h-3.5 w-3.5" />
                  نخبة المتخصصين
                </div>
                <h2 className="text-2xl md:text-3xl font-extrabold text-gray-900 mb-3 font-cairo">
                  فريق أخصائيي واصل المعتمدين
                </h2>
                <p className="text-gray-500 text-sm md:text-base max-w-xl mx-auto font-medium leading-relaxed">
                  تضم شبكتنا نخبة من أفضل الأخصائيين المعتمدين في فروعنا لمتابعة وتأهيل الحالات حركياً.
                </p>
              </motion.div>
              
              {/* Specialists Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 md:gap-5">
                {specialists.map((spec, idx) => (
                  <motion.div
                    key={spec.id}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: idx * 0.04 }}
                    viewport={{ once: true }}
                    onClick={() => setSelectedSpec(spec)}
                    className="specialist-card text-center group"
                  >
                    {/* Profile Image */}
                    <div className="relative w-20 h-20 mx-auto mb-3">
                      <div className="absolute inset-0 rounded-full bg-gradient-to-br from-medical-400 to-medical-600 opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-md scale-110" />
                      <img
                        src={spec.image || '/images/new.jpg'}
                        alt={spec.name}
                        className="relative h-20 w-20 rounded-full object-cover border-3 border-white shadow-md group-hover:shadow-lg transition-shadow duration-300"
                        onError={(e) => { e.currentTarget.src = '/images/new.jpg'; }}
                      />
                      {/* Online indicator */}
                      <div className="absolute bottom-0.5 right-0.5 w-4 h-4 bg-emerald-500 rounded-full border-2 border-white shadow-sm" />
                    </div>
                    
                    {/* Info */}
                    <h3 className="font-bold text-sm text-gray-900 line-clamp-1 mb-1 group-hover:text-medical-700 transition-colors">{spec.name}</h3>
                    <p className="text-xs text-gray-400 line-clamp-1 mb-3">{spec.role}</p>
                    
                    {/* Branch Badge */}
                    <span className="inline-flex items-center gap-1 text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-lg border border-emerald-100">
                      <MapPin className="h-2.5 w-2.5" />
                      {spec.centerName || 'فرع معتمد'}
                    </span>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Specialist Details Dialog */}
      <Dialog open={selectedSpec !== null} onOpenChange={(o) => { if (!o) setSelectedSpec(null); }}>
        <DialogContent className="max-w-md font-cairo">
          <DialogHeader>
            <DialogTitle className="text-center font-bold text-xl text-gray-900">الملف التعريفي للأخصائي</DialogTitle>
          </DialogHeader>
          
          {selectedSpec && (
            <div className="py-4 text-center">
              {/* Profile Image with glow */}
              <div className="relative w-28 h-28 mx-auto mb-5">
                <div className="absolute inset-0 rounded-full bg-gradient-to-br from-medical-400 to-medical-600 blur-xl opacity-20 scale-125" />
                <img
                  src={selectedSpec.image || '/images/new.jpg'}
                  alt={selectedSpec.name}
                  className="relative w-28 h-28 rounded-full object-cover border-4 border-white shadow-lg"
                  onError={(e) => { e.currentTarget.src = '/images/new.jpg'; }}
                />
              </div>
              
              <h3 className="text-xl font-bold text-gray-900 mb-1">{selectedSpec.name}</h3>
              <p className="text-sm text-medical-600 font-semibold mb-4">{selectedSpec.role}</p>
              
              {selectedSpec.centerName && (
                <div className="bg-gradient-to-r from-emerald-50 to-emerald-50/50 text-emerald-800 px-4 py-2 rounded-xl text-xs font-bold inline-flex items-center gap-1.5 mb-5 border border-emerald-100">
                  <MapPin className="h-3.5 w-3.5" />
                  يعمل لدى: {selectedSpec.centerName}
                </div>
              )}

              <div className="text-right space-y-4 border-t border-gray-100 pt-5 mt-2">
                <div>
                  <h4 className="font-bold text-sm text-gray-900 mb-1.5 flex items-center gap-1.5">
                    <Users className="h-4 w-4 text-medical-500" />
                    نبذة عن الأخصائي:
                  </h4>
                  <p className="text-sm text-gray-600 leading-relaxed font-medium pr-6">{selectedSpec.bio || 'أخصائي معتمد لدى شبكة واصل الطبية للأطراف الصناعية والأجهزة التقويمية.'}</p>
                </div>

                {selectedSpec.expertise && selectedSpec.expertise.length > 0 && (
                  <div>
                    <h4 className="font-bold text-sm text-gray-900 mb-2 flex items-center gap-1.5">
                      <Award className="h-4 w-4 text-amber-500" />
                      مجالات التخصص:
                    </h4>
                    <div className="flex flex-wrap gap-1.5 pr-6">
                      {selectedSpec.expertise.map((exp, i) => (
                        <span key={i} className="text-xs bg-gradient-to-r from-medical-50 to-medical-50/50 text-medical-800 px-3 py-1.5 rounded-lg font-bold border border-medical-100">
                          {exp}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {selectedSpec.phone && (
                  <div className="flex items-center justify-between bg-gray-50 p-3.5 rounded-xl border border-gray-100">
                    <span className="text-sm font-bold text-gray-700 flex items-center gap-1.5">
                      <Phone className="h-4 w-4 text-emerald-500" />
                      رقم التواصل:
                    </span>
                    <a href={`tel:${selectedSpec.phone}`} className="text-sm font-bold text-medical-600 hover:underline font-mono" dir="ltr">
                      {selectedSpec.phone}
                    </a>
                  </div>
                )}

                {/* Direct Booking with Specialist Button */}
                <Link
                  to={`/booking?center=${selectedSpec.centerId || ''}&specialist=${selectedSpec.id}`}
                  onClick={() => setSelectedSpec(null)}
                  className="block w-full mt-5"
                >
                  <Button className="w-full bg-gradient-to-l from-red-600 to-red-500 hover:from-red-700 hover:to-red-600 text-white font-bold py-3 rounded-xl transition-all duration-300 shadow-md hover:shadow-lg shimmer-btn text-sm">
                    <Calendar className="h-4 w-4 ml-2" />
                    حجز موعد كشف ومقابلة الأخصائي
                  </Button>
                </Link>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      <Footer />
    </div>
  );
};

export default Centers;