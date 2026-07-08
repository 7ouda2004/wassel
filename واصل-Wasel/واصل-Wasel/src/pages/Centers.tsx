import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { MapPin, Phone, Clock, ChevronRight, Search, Users, ExternalLink, Calendar } from 'lucide-react';
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
            <img src="https://images.unsplash.com/photo-1596484552993-9c8e146ebce3?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80" className="absolute inset-0 w-full h-full object-cover opacity-30 mix-blend-multiply" alt="Map Route" />
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

      {/* Governorates Collapsible Sections */}
      <section className="py-12 bg-gray-50 flex-grow">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto space-y-4">
            {Object.keys(groupedCenters).length > 0 ? (
              Object.entries(groupedCenters).map(([locationName, locationCenters]) => (
                <div 
                  key={locationName} 
                  className="bg-white rounded-xl shadow-sm border border-gray-200/60 overflow-hidden transition-all duration-300"
                >
                  <button
                    onClick={() => setExpandedLocation(expandedLocation === locationName ? null : locationName)}
                    className="w-full px-6 py-5 flex justify-between items-center bg-gradient-to-r from-medical-50/20 to-white hover:from-medical-50/50 transition-colors duration-350"
                  >
                    <div className="flex items-center gap-3">
                      <MapPin className="h-6 w-6 text-medical-600" />
                      <span className="text-xl font-bold text-gray-900">{locationName}</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="text-sm font-semibold text-medical-700 bg-medical-50 px-3 py-1 rounded-full">
                        {locationCenters.length} {locationCenters.length === 1 ? 'مركز' : 'مراكز'}
                      </span>
                      <ChevronRight className={`h-5 w-5 text-gray-400 transition-transform duration-300 ${expandedLocation === locationName ? 'rotate-90' : 'rtl:rotate-180'}`} />
                    </div>
                  </button>
                  
                  <AnimatePresence initial={false}>
                    {expandedLocation === locationName && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3, ease: 'easeInOut' }}
                        className="p-6 bg-gray-50/30 border-t border-gray-100 grid grid-cols-1 md:grid-cols-2 gap-6 overflow-hidden"
                      >
                        {locationCenters.map(center => {
                          const centerSpecs = specialists.filter(s => s.centerId === center.id);
                          return (
                            <motion.div
                              key={center.id}
                              initial={{ opacity: 0, y: 15 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ duration: 0.3 }}
                              className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-100 flex flex-col justify-between"
                            >
                              <img
                                src={center.image || '/images/ortho.png'}
                                alt={center.name}
                                className="w-full h-40 object-cover"
                                onError={(e) => {
                                  e.currentTarget.src = '/images/ortho.png';
                                }}
                              />
                              <div className="p-5 flex-grow flex flex-col justify-between">
                                <div>
                                  <h3 className="text-lg font-bold text-gray-900 mb-3">{center.name}</h3>
                                  <div className="space-y-2 mb-4 text-sm text-gray-600">
                                    <div className="flex items-start">
                                      <MapPin className="h-4 w-4 ml-2 mt-0.5 text-medical-500 flex-shrink-0" />
                                      <span>{center.address}</span>
                                    </div>
                                    <div className="flex items-center">
                                      <Phone className="h-4 w-4 ml-2 text-medical-500 flex-shrink-0" />
                                      <span>{center.phone}</span>
                                    </div>
                                    <div className="flex items-start">
                                      <Clock className="h-4 w-4 ml-2 mt-0.5 text-medical-500 flex-shrink-0" />
                                      <span>{center.workingHours}</span>
                                    </div>
                                  </div>

                                  {/* Specialists list for this specific center */}
                                  {centerSpecs.length > 0 && (
                                    <div className="border-t pt-3 mt-3 mb-4">
                                      <h4 className="text-xs font-bold text-gray-400 mb-2 font-cairo flex items-center gap-1">
                                        <Users className="h-3.5 w-3.5 text-medical-500" />
                                        الأخصائيون المعتمدون بالفرع:
                                      </h4>
                                      <div className="flex flex-wrap gap-1.5">
                                        {centerSpecs.map(spec => (
                                          <button
                                            key={spec.id}
                                            onClick={() => setSelectedSpec(spec)}
                                            className="flex items-center gap-1.5 bg-gray-50 hover:bg-medical-50 border border-gray-100 hover:border-medical-200 rounded-full px-2.5 py-1 transition-all text-xs text-gray-700 font-semibold"
                                          >
                                            <img
                                              src={spec.image || '/images/new.jpg'}
                                              alt={spec.name}
                                              className="h-5 w-5 rounded-full object-cover border"
                                              onError={(e) => { e.currentTarget.src = '/images/new.jpg'; }}
                                            />
                                            <span className="font-bold line-clamp-1">{spec.name}</span>
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
                                    <Button className="w-full text-xs py-2 bg-red-600 hover:bg-red-700 text-white font-bold rounded-lg border-none transition-colors">
                                      حجز موعد بالفرع
                                    </Button>
                                  </Link>
                                  <a 
                                    href={`https://wa.me/${center.phone.replace(/[^0-9]/g, '')}`} 
                                    target="_blank" 
                                    rel="noopener noreferrer" 
                                    className="flex-1"
                                  >
                                    <Button className="w-full text-xs py-2 bg-green-600 hover:bg-green-700 text-white border-none font-bold rounded-lg">
                                      واتساب
                                    </Button>
                                  </a>
                                </div>
                              </div>
                            </motion.div>
                          );
                        })}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))
            ) : (
              <div className="text-center bg-white p-12 rounded-xl shadow-sm border border-gray-100">
                <MapPin className="h-12 w-12 text-gray-300 mx-auto mb-4" />
                <p className="text-gray-500 text-lg">لا توجد مراكز مطابقة لبحثك في المحافظات المحددة.</p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Accredited Specialists Grid Section at the bottom */}
      {specialists.length > 0 && (
        <section className="py-16 bg-white border-t border-gray-100">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center mb-10">
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-3 font-cairo">فريق أخصائيي واصل المعتمدين بالفروع</h2>
              <p className="text-gray-600 text-sm md:text-base max-w-xl mx-auto font-medium">تضم شبكتنا نخبة من أفضل الأخصائيين المعتمدين في فروعنا لمتابعة وتأهيل الحالات حركياً.</p>
            </div>
            
            <div className="max-w-4xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-4">
              {specialists.map(spec => (
                <motion.div
                  key={spec.id}
                  whileHover={{ y: -5 }}
                  onClick={() => setSelectedSpec(spec)}
                  className="bg-gray-50/50 hover:bg-medical-50/30 border border-gray-100 hover:border-medical-200 p-4 rounded-xl text-center cursor-pointer transition-all duration-300 flex flex-col items-center justify-between"
                >
                  <div className="flex flex-col items-center">
                    <img
                      src={spec.image || '/images/new.jpg'}
                      alt={spec.name}
                      className="h-16 w-16 rounded-full object-cover border-2 border-white shadow-xs mb-3"
                      onError={(e) => { e.currentTarget.src = '/images/new.jpg'; }}
                    />
                    <h3 className="font-bold text-sm text-gray-900 line-clamp-1">{spec.name}</h3>
                    <p className="text-xs text-gray-550 mt-1 line-clamp-1">{spec.role}</p>
                  </div>
                  <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full mt-3 inline-block">
                    {spec.centerName || 'فرع معتمد'}
                  </span>
                </motion.div>
              ))}
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
              <img
                src={selectedSpec.image || '/images/new.jpg'}
                alt={selectedSpec.name}
                className="w-24 h-24 rounded-full object-cover mx-auto border-4 border-medical-50 shadow-md mb-4"
                onError={(e) => { e.currentTarget.src = '/images/new.jpg'; }}
              />
              <h3 className="text-xl font-bold text-gray-900 mb-1">{selectedSpec.name}</h3>
              <p className="text-sm text-medical-600 font-semibold mb-4">{selectedSpec.role}</p>
              
              {selectedSpec.centerName && (
                <div className="bg-emerald-50 text-emerald-850 px-3 py-1.5 rounded-lg text-xs font-bold inline-flex items-center gap-1 mb-4">
                  <MapPin className="h-3.5 w-3.5" />
                  يعمل لدى: {selectedSpec.centerName}
                </div>
              )}

              <div className="text-right space-y-4 border-t pt-4 mt-2">
                <div>
                  <h4 className="font-bold text-sm text-gray-900 mb-1">نبذة عن الأخصائي:</h4>
                  <p className="text-sm text-gray-600 leading-relaxed font-semibold">{selectedSpec.bio || 'أخصائي معتمد لدى شبكة واصل الطبية للأطراف الصناعية والأجهزة التقويمية.'}</p>
                </div>

                {selectedSpec.expertise && selectedSpec.expertise.length > 0 && (
                  <div>
                    <h4 className="font-bold text-sm text-gray-900 mb-2">مجالات التخصص:</h4>
                    <div className="flex flex-wrap gap-1.5">
                      {selectedSpec.expertise.map((exp, i) => (
                        <span key={i} className="text-xs bg-medical-50 text-medical-800 px-2.5 py-1 rounded-full font-bold">
                          {exp}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {selectedSpec.phone && (
                  <div className="flex items-center justify-between bg-gray-50 p-3 rounded-lg border mb-4">
                    <span className="text-sm font-bold text-gray-700">رقم الهاتف للتواصل:</span>
                    <a href={`tel:${selectedSpec.phone}`} className="text-sm font-bold text-medical-600 hover:underline font-mono">
                      {selectedSpec.phone}
                    </a>
                  </div>
                )}

                {/* Direct Booking with Specialist Button */}
                <Link
                  to={`/booking?center=${selectedSpec.centerId || ''}&specialist=${selectedSpec.id}`}
                  onClick={() => setSelectedSpec(null)}
                  className="block w-full mt-4"
                >
                  <Button className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-2.5 rounded-xl transition-all duration-200">
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

export default Centers;0 mx-auto mb-4" />
                <p className="text-gray-500 text-lg">لا توجد مراكز مطابقة لبحثك في المحافظات المحددة.</p>
              </div>
            )}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Centers;