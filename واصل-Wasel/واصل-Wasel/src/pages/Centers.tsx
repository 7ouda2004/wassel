import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MapPin, Phone, Clock, ChevronDown, Search, Users, Star, Award, Calendar, Sparkles, Building2, ExternalLink } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

import { getLocalCenters, getLocalSpecialists, type Center, type Specialist, EGYPT_GOVERNORATES, FALLBACK_CENTER_IMAGES, FALLBACK_SPECIALIST_IMAGES } from '@/lib/db';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';

const REGIONS = ['الكل', 'القاهرة الكبرى', 'الإسكندرية', 'الدلتا', 'الصعيد', 'القناة', 'الحدود'] as const;

const Centers = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRegion, setSelectedRegion] = useState<string>('الكل');
  const [selectedGov, setSelectedGov] = useState<string>('الكل');
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
    
    // Load active centers & specialists
    const activeCenters = getLocalCenters().filter(c => c.status !== 'pending' && c.status !== 'rejected');
    const activeSpecs = getLocalSpecialists().filter(s => s.status !== 'pending' && s.status !== 'rejected');
    
    setCentersList(activeCenters);
    setSpecialists(activeSpecs);
  }, []);

  useEffect(() => {
    const filtered = centersList.filter(center => {
      const matchesSearch = center.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           center.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           center.address.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesRegion = selectedRegion === 'الكل' || center.region === selectedRegion;
      const matchesGov = selectedGov === 'الكل' || center.location === selectedGov;
      return matchesSearch && matchesRegion && matchesGov;
    });
    setFilteredCenters(filtered);
  }, [searchTerm, selectedRegion, selectedGov, centersList]);

  // Auto expand governorate if search has results
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
    <div className="min-h-screen flex flex-col bg-slate-50/50">
      <Navbar />
      
      {/* Blatchford Mobility Inspired Hero Header */}
      <section className="relative py-20 bg-gradient-to-b from-medical-950 via-medical-900 to-medical-850 text-white overflow-hidden">
        {/* Modern glowing mobility shapes */}
        <div className="absolute inset-0 opacity-20 pointer-events-none">
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-medical-500 rounded-full blur-[140px] -translate-y-1/2 translate-x-1/3" />
          <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-sky-400 rounded-full blur-[120px] translate-y-1/3 -translate-x-1/4" />
        </div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div 
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="inline-flex items-center gap-2 py-1.5 px-4 bg-white/10 text-medical-200 rounded-full text-xs font-bold mb-6 border border-white/15 backdrop-blur-md"
            >
              <Building2 className="h-4 w-4 text-medical-400" />
              <span>شبكة المراكز الطبية المعتمدة في كافة المحافظات</span>
            </motion.div>
            
            <motion.h1 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-3xl sm:text-5xl lg:text-6xl font-black mb-6 leading-tight font-cairo tracking-tight"
            >
              حلول الحركة والأطراف الصناعية
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-medical-300 via-sky-200 to-white">في كافة أنحاء جمهورية مصر العربية</span>
            </motion.h1>
            
            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-base sm:text-lg text-gray-300 mb-8 max-w-2xl mx-auto leading-relaxed font-medium"
            >
              اختر محافظتك واستكشف الفروع المعتمدة القريبة منك للحصول على أفضل استشارة طبية وتأهيل حركي شامل.
            </motion.p>

            {/* Quick Metrics */}
            <motion.div 
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="flex flex-wrap justify-center gap-8 text-center pt-2"
            >
              <div className="bg-white/5 backdrop-blur-md border border-white/10 px-6 py-3.5 rounded-2xl">
                <p className="text-2xl font-black text-white font-mono">{centersList.length}+</p>
                <p className="text-xs text-medical-200 font-bold mt-0.5">فرع معتمد</p>
              </div>
              <div className="bg-white/5 backdrop-blur-md border border-white/10 px-6 py-3.5 rounded-2xl">
                <p className="text-2xl font-black text-white font-mono">{EGYPT_GOVERNORATES.length}</p>
                <p className="text-xs text-medical-200 font-bold mt-0.5">محافظة مغطاة بالكامل</p>
              </div>
              <div className="bg-white/5 backdrop-blur-md border border-white/10 px-6 py-3.5 rounded-2xl">
                <p className="text-2xl font-black text-white font-mono">{specialists.length}+</p>
                <p className="text-xs text-medical-200 font-bold mt-0.5">أخصائي خبير</p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Sticky Filter & Search Bar - Blatchford Aesthetics */}
      <section className="py-5 bg-white border-b border-gray-200/80 sticky top-16 z-30 shadow-xs">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto space-y-3">
            <div className="flex flex-col md:flex-row gap-3 items-center">
              
              {/* Search Field */}
              <div className="w-full md:flex-1 relative">
                <Input
                  type="text"
                  placeholder="ابحث عن مركز، فرع، أو عنوان..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 pr-11 h-11 rounded-xl border-gray-200 bg-gray-50/60 text-sm focus:bg-white transition-colors"
                />
                <Search className="absolute right-3.5 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              </div>

              {/* Governorate Dropdown Filter for all 27 governorates */}
              <div className="w-full md:w-56">
                <select 
                  value={selectedGov}
                  onChange={(e) => setSelectedGov(e.target.value)}
                  className="w-full h-11 rounded-xl border border-gray-200 bg-gray-50/60 px-3.5 text-xs font-bold text-gray-800 focus:bg-white transition-colors"
                >
                  <option value="الكل">جميع المحافظات الـ 27</option>
                  {EGYPT_GOVERNORATES.map(gov => (
                    <option key={gov} value={gov}>{gov}</option>
                  ))}
                </select>
              </div>

            </div>

            {/* Region Pills */}
            <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-hide">
              {REGIONS.map((region) => (
                <button
                  key={region}
                  onClick={() => setSelectedRegion(region)}
                  className={`whitespace-nowrap text-xs font-bold rounded-xl h-9 px-4 transition-all duration-200 ${
                    selectedRegion === region 
                      ? 'bg-medical-700 text-white shadow-sm' 
                      : 'bg-gray-100/80 text-gray-600 hover:bg-gray-200/80'
                  }`}
                >
                  {region}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Main Governorates & Centers Listing */}
      <section className="py-10 flex-grow">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto space-y-4">
            {Object.keys(groupedCenters).length > 0 ? (
              Object.entries(groupedCenters).map(([locationName, locationCenters], idx) => (
                <motion.div 
                  key={locationName}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: idx * 0.03 }}
                  className="bg-white rounded-2xl shadow-xs border border-gray-200/70 overflow-hidden hover:shadow-md transition-shadow duration-300"
                >
                  <button
                    onClick={() => setExpandedLocation(expandedLocation === locationName ? null : locationName)}
                    className="w-full px-6 py-4.5 flex justify-between items-center hover:bg-slate-50/60 transition-colors duration-200"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-medical-50 text-medical-700 flex items-center justify-center font-bold">
                        <MapPin className="h-5 w-5" />
                      </div>
                      <div className="text-right">
                        <span className="text-lg font-bold text-gray-900 font-cairo block">{locationName}</span>
                        <span className="text-xs text-gray-400 font-medium">مصر</span>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-3">
                      <span className="text-xs font-bold text-medical-800 bg-medical-50 border border-medical-100 px-3 py-1 rounded-full">
                        {locationCenters.length} {locationCenters.length === 1 ? 'فرع معتمد' : 'فروع معتمدة'}
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
                        <div className="p-5 bg-slate-50/50 border-t border-gray-100 grid grid-cols-1 md:grid-cols-2 gap-5">
                          {locationCenters.map((center, centerIdx) => {
                            const centerSpecs = specialists.filter(s => s.centerId === center.id || s.centerName === center.name);
                            const displayImage = center.image || FALLBACK_CENTER_IMAGES[centerIdx % FALLBACK_CENTER_IMAGES.length];
                            
                            return (
                              <motion.div
                                key={center.id}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.3, delay: centerIdx * 0.04 }}
                                className="bg-white rounded-2xl shadow-xs overflow-hidden border border-gray-200/80 flex flex-col justify-between hover:border-medical-300 transition-all duration-300"
                              >
                                {/* Center Image with Robust Fallback handling */}
                                <div className="relative h-44 bg-gray-100 overflow-hidden">
                                  <img
                                    src={displayImage}
                                    alt={center.name}
                                    className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                                    onError={(e) => {
                                      e.currentTarget.src = FALLBACK_CENTER_IMAGES[centerIdx % FALLBACK_CENTER_IMAGES.length];
                                    }}
                                  />
                                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
                                  <div className="absolute bottom-3 right-3">
                                    <span className="bg-white/95 text-gray-900 text-xs font-bold px-3 py-1 rounded-lg shadow-sm">
                                      {center.location}
                                    </span>
                                  </div>
                                </div>
                                
                                <div className="p-5 flex-grow flex flex-col justify-between">
                                  <div>
                                    <h3 className="text-lg font-bold text-gray-900 mb-3 leading-snug">{center.name}</h3>
                                    
                                    <div className="space-y-2 mb-4 text-xs text-gray-600">
                                      <div className="flex items-start gap-2">
                                        <MapPin className="h-4 w-4 text-medical-600 flex-shrink-0 mt-0.5" />
                                        <span className="leading-relaxed">{center.address}</span>
                                      </div>
                                      <div className="flex items-center gap-2">
                                        <Phone className="h-4 w-4 text-emerald-600 flex-shrink-0" />
                                        <span dir="ltr" className="font-mono font-bold text-gray-800">{center.phone}</span>
                                      </div>
                                      <div className="flex items-center gap-2">
                                        <Clock className="h-4 w-4 text-amber-600 flex-shrink-0" />
                                        <span>{center.workingHours}</span>
                                      </div>
                                    </div>

                                    {/* Specialists list for this specific center */}
                                    {centerSpecs.length > 0 && (
                                      <div className="border-t border-gray-100 pt-3 mt-3 mb-4">
                                        <h4 className="text-[11px] font-bold text-gray-400 mb-2 flex items-center gap-1.5">
                                          <Users className="h-3.5 w-3.5 text-medical-600" />
                                          الأخصائيون المعينون بالفرع:
                                        </h4>
                                        <div className="flex flex-wrap gap-1.5">
                                          {centerSpecs.map(spec => (
                                            <button
                                              key={spec.id}
                                              onClick={() => setSelectedSpec(spec)}
                                              className="flex items-center gap-2 bg-gray-50 hover:bg-medical-50 border border-gray-200/80 hover:border-medical-200 rounded-xl px-2.5 py-1.5 transition-all text-xs group"
                                            >
                                              <img
                                                src={spec.image || FALLBACK_SPECIALIST_IMAGES[0]}
                                                alt={spec.name}
                                                className="h-6 w-6 rounded-full object-cover border border-white shadow-xs"
                                                onError={(e) => { e.currentTarget.src = FALLBACK_SPECIALIST_IMAGES[0]; }}
                                              />
                                              <span className="font-bold text-gray-800 text-[11px]">{spec.name}</span>
                                            </button>
                                          ))}
                                        </div>
                                      </div>
                                    )}
                                  </div>
                                  
                                  <div className="flex gap-2 pt-2">
                                    <Link 
                                      to={`/booking?center=${center.id}`}
                                      className="flex-grow"
                                    >
                                      <Button className="w-full text-xs py-2.5 bg-medical-700 hover:bg-medical-800 text-white font-bold rounded-xl transition-colors shadow-xs">
                                        <Calendar className="h-3.5 w-3.5 ml-1.5" />
                                        حجز موعد
                                      </Button>
                                    </Link>
                                    <a 
                                      href={`https://wa.me/${center.phone.replace(/\D/g, '')}`} 
                                      target="_blank" 
                                      rel="noopener noreferrer" 
                                      className="flex-1"
                                    >
                                      <Button className="w-full text-xs py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white border-none font-bold rounded-xl">
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
              <div className="text-center bg-white p-14 rounded-2xl shadow-xs border border-gray-200/80">
                <Building2 className="h-12 w-12 text-gray-300 mx-auto mb-3" />
                <p className="text-gray-600 font-bold text-base">لا توجد مراكز مطابقة لخيارات الفلترة الحالية.</p>
                <p className="text-gray-400 text-xs mt-1">جرب اختر جميع المحافظات أو تغيير كلمة البحث.</p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Accredited Specialists Section - Blatchford Modern Aesthetics */}
      {specialists.length > 0 && (
        <section className="py-16 bg-white border-t border-gray-100">
          <div className="container mx-auto px-4">
            <div className="max-w-5xl mx-auto">
              <div className="text-center mb-10">
                <span className="text-xs font-bold text-medical-700 bg-medical-50 px-3.5 py-1 rounded-full border border-medical-100 inline-block mb-2">
                  فريق الخبراء
                </span>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900 font-cairo">
                  أخصائيو واصل المعتمدون بالجمهورية
                </h2>
                <p className="text-gray-500 text-sm max-w-xl mx-auto mt-2 font-medium">
                  نخبة من الكوادر الطبية المتخصصة في تصميم وضبط وتقويم الأطراف والجبائر.
                </p>
              </div>
              
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                {specialists.map((spec, idx) => (
                  <motion.div
                    key={spec.id}
                    initial={{ opacity: 0, y: 15 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: idx * 0.04 }}
                    viewport={{ once: true }}
                    onClick={() => setSelectedSpec(spec)}
                    className="bg-slate-50/70 hover:bg-white border border-gray-200/70 hover:border-medical-300 p-4 rounded-2xl text-center cursor-pointer transition-all duration-300 hover:shadow-md group flex flex-col justify-between"
                  >
                    <div>
                      <div className="relative w-18 h-18 mx-auto mb-3">
                        <img
                          src={spec.image || FALLBACK_SPECIALIST_IMAGES[idx % FALLBACK_SPECIALIST_IMAGES.length]}
                          alt={spec.name}
                          className="h-18 w-18 rounded-full object-cover border-2 border-white shadow-xs mx-auto group-hover:scale-105 transition-transform duration-300"
                          onError={(e) => { e.currentTarget.src = FALLBACK_SPECIALIST_IMAGES[idx % FALLBACK_SPECIALIST_IMAGES.length]; }}
                        />
                      </div>
                      
                      <h3 className="font-bold text-sm text-gray-900 line-clamp-1 group-hover:text-medical-700 transition-colors">{spec.name}</h3>
                      <p className="text-[11px] text-gray-500 line-clamp-1 mt-0.5">{spec.role}</p>
                    </div>

                    <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-lg mt-3 inline-block border border-emerald-100">
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
            <div className="py-2 text-center">
              <img
                src={selectedSpec.image || FALLBACK_SPECIALIST_IMAGES[0]}
                alt={selectedSpec.name}
                className="w-24 h-24 rounded-full object-cover mx-auto border-3 border-medical-100 shadow-md mb-3"
                onError={(e) => { e.currentTarget.src = FALLBACK_SPECIALIST_IMAGES[0]; }}
              />
              
              <h3 className="text-xl font-bold text-gray-900 mb-0.5">{selectedSpec.name}</h3>
              <p className="text-xs text-medical-700 font-bold mb-3">{selectedSpec.role}</p>
              
              {selectedSpec.centerName && (
                <div className="bg-emerald-50 text-emerald-800 px-3.5 py-1.5 rounded-xl text-xs font-bold inline-flex items-center gap-1.5 mb-4 border border-emerald-100">
                  <MapPin className="h-3.5 w-3.5" />
                  الفرع: {selectedSpec.centerName}
                </div>
              )}

              <div className="text-right space-y-3 border-t border-gray-100 pt-4 mt-1">
                <div>
                  <h4 className="font-bold text-xs text-gray-900 mb-1">نبذة عن الأخصائي:</h4>
                  <p className="text-xs text-gray-600 leading-relaxed font-medium">{selectedSpec.bio || 'أخصائي معتمد لدى شبكة واصل الطبية للأطراف الصناعية والأجهزة التقويمية.'}</p>
                </div>

                {selectedSpec.phone && (
                  <div className="flex items-center justify-between bg-slate-50 p-3 rounded-xl border border-gray-100">
                    <span className="text-xs font-bold text-gray-700">رقم التواصل:</span>
                    <a href={`tel:${selectedSpec.phone}`} className="text-xs font-mono font-bold text-medical-700 hover:underline" dir="ltr">
                      {selectedSpec.phone}
                    </a>
                  </div>
                )}

                <Link
                  to={`/booking?center=${selectedSpec.centerId || ''}&specialist=${selectedSpec.id}`}
                  onClick={() => setSelectedSpec(null)}
                  className="block w-full mt-4"
                >
                  <Button className="w-full bg-medical-700 hover:bg-medical-800 text-white font-bold py-2.5 rounded-xl text-xs">
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