import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { MapPin, Phone, Clock, Calendar, ChevronRight, ChevronLeft, Building2, Users, Star, Award, CheckCircle2, Shield, Heart, X, User, Briefcase, Sparkles, ExternalLink, Maximize2, Play, Pause, ImageIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

import { getLocalCenters, getLocalSpecialists, type Center, type Specialist, DEFAULT_CENTER_IMAGE, FALLBACK_CENTER_IMAGES, FALLBACK_SPECIALIST_IMAGES, DEFAULT_AVATAR, DEFAULT_CASES } from '@/lib/db';

const CenterDetails = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [center, setCenter] = useState<Center | null>(null);
  const [centerSpecs, setCenterSpecs] = useState<Specialist[]>([]);
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);

  // Floating modal state
  const [isSpecialistsModalOpen, setIsSpecialistsModalOpen] = useState(false);
  const [selectedSpecialist, setSelectedSpecialist] = useState<Specialist | null>(null);

  useEffect(() => {
    document.documentElement.dir = 'rtl';
    document.body.classList.add('font-cairo');
    window.scrollTo(0, 0);

    const centers = getLocalCenters();
    const foundCenter = centers.find(c => c.id === id) || centers[0];
    setCenter(foundCenter);

    if (foundCenter) {
      const specs = getLocalSpecialists().filter(s => s.centerId === foundCenter.id || s.centerName === foundCenter.name);
      setCenterSpecs(specs);
    }
  }, [id]);

  const galleryImages = center
    ? ((center.images && center.images.length > 0) ? center.images : [center.image || DEFAULT_CENTER_IMAGE])
    : [DEFAULT_CENTER_IMAGE];

  useEffect(() => {
    if (!isAutoPlaying || galleryImages.length <= 1) return;
    const timer = setInterval(() => {
      setActiveImageIndex(prev => (prev + 1) % galleryImages.length);
    }, 3800);
    return () => clearInterval(timer);
  }, [isAutoPlaying, galleryImages.length]);

  if (!center) {
    return null;
  }

  const casesList = center.casesWorkedOn && center.casesWorkedOn.length > 0 ? center.casesWorkedOn : DEFAULT_CASES;

  return (
    <div className="min-h-screen flex flex-col bg-slate-50/50">
      <Navbar />

      {/* Hero Showcase Header */}
      <section className="relative py-16 bg-gradient-to-b from-medical-950 via-medical-900 to-medical-850 text-white overflow-hidden">
        <div className="container mx-auto px-4 max-w-6xl relative z-10">
          
          <div className="flex flex-col lg:flex-row gap-8 items-center">
            
            {/* Ultra Animated Multi-Image Gallery Slider */}
            <div className="w-full lg:w-1/2">
              <div className="relative h-80 sm:h-96 rounded-3xl overflow-hidden shadow-2xl border border-white/15 group bg-medical-950">
                <AnimatePresence mode="wait">
                  <motion.img
                    key={activeImageIndex}
                    src={galleryImages[activeImageIndex] || DEFAULT_CENTER_IMAGE}
                    alt={center.name}
                    initial={{ opacity: 0, scale: 1.05 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.96 }}
                    transition={{ duration: 0.5, ease: 'easeOut' }}
                    className="w-full h-full object-cover cursor-pointer"
                    onClick={() => setIsLightboxOpen(true)}
                    onError={(e) => { e.currentTarget.src = DEFAULT_CENTER_IMAGE; }}
                  />
                </AnimatePresence>

                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent pointer-events-none" />

                {/* Slider Top Badges */}
                <div className="absolute top-4 right-4 flex items-center gap-2 z-10">
                  <span className="bg-black/60 backdrop-blur-md text-white text-xs font-bold px-3 py-1 rounded-full border border-white/20">
                    {center.location} ({center.region})
                  </span>
                  {galleryImages.length > 1 && (
                    <span className="bg-medical-600/90 backdrop-blur-md text-white text-xs font-bold px-2.5 py-1 rounded-full shadow-sm">
                      {activeImageIndex + 1} / {galleryImages.length}
                    </span>
                  )}
                </div>

                {/* Slider Controls (Next/Prev & Lightbox) */}
                {galleryImages.length > 1 && (
                  <>
                    <button
                      onClick={() => setActiveImageIndex((prev) => (prev === 0 ? galleryImages.length - 1 : prev - 1))}
                      className="absolute right-3 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/80 text-white rounded-full p-2.5 backdrop-blur-sm transition-all opacity-80 group-hover:opacity-100"
                      title="الصورة السابقة"
                    >
                      <ChevronRight className="w-5 h-5" />
                    </button>
                    <button
                      onClick={() => setActiveImageIndex((prev) => (prev + 1) % galleryImages.length)}
                      className="absolute left-3 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/80 text-white rounded-full p-2.5 backdrop-blur-sm transition-all opacity-80 group-hover:opacity-100"
                      title="الصورة التالية"
                    >
                      <ChevronLeft className="w-5 h-5" />
                    </button>
                  </>
                )}

                {/* Play/Pause & Fullscreen Button */}
                <div className="absolute bottom-4 left-4 flex items-center gap-2 z-10">
                  {galleryImages.length > 1 && (
                    <button
                      onClick={() => setIsAutoPlaying(!isAutoPlaying)}
                      className="bg-black/60 hover:bg-black/90 text-white p-2 rounded-full backdrop-blur-md border border-white/20 transition-all"
                      title={isAutoPlaying ? 'إيقاف التكبير التلقائي' : 'تشغيل العرض التلقائي'}
                    >
                      {isAutoPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                    </button>
                  )}
                  <button
                    onClick={() => setIsLightboxOpen(true)}
                    className="bg-black/60 hover:bg-black/90 text-white p-2 rounded-full backdrop-blur-md border border-white/20 transition-all"
                    title="تكبير الصورة بحجم كامل"
                  >
                    <Maximize2 className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Thumbnails Showcase */}
              {galleryImages.length > 1 && (
                <div className="flex gap-2.5 justify-center mt-4 overflow-x-auto py-1">
                  {galleryImages.map((img, idx) => (
                    <button
                      key={idx}
                      onClick={() => setActiveImageIndex(idx)}
                      className={`relative w-20 h-14 rounded-2xl overflow-hidden border-2 transition-all duration-300 ${
                        idx === activeImageIndex 
                          ? 'border-medical-400 scale-105 shadow-lg ring-2 ring-medical-400/40' 
                          : 'border-white/20 opacity-60 hover:opacity-100'
                      }`}
                    >
                      <img 
                        src={img || DEFAULT_CENTER_IMAGE} 
                        alt={`معاينة ${idx}`} 
                        className="w-full h-full object-cover" 
                        onError={(e) => { e.currentTarget.src = DEFAULT_CENTER_IMAGE; }}
                      />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Content Header */}
            <div className="w-full lg:w-1/2 space-y-4">
              <div className="inline-flex items-center gap-2 bg-white/10 px-3.5 py-1 rounded-full text-xs font-bold text-medical-200 border border-white/15">
                <Building2 className="w-4 h-4 text-medical-300" />
                فرع معتمد ومجهز بالكامل
              </div>

              <h1 className="text-2xl sm:text-4xl font-extrabold text-white font-cairo leading-tight">
                {center.name}
              </h1>

              <p className="text-gray-300 text-sm leading-relaxed font-medium">
                {center.description || `مركز واصل المعتمد في محافظة ${center.location} لتصميم وتركيب الأطراف الصناعية والجبائر الطبية المبتكرة.`}
              </p>

              <div className="space-y-2 pt-2 text-xs text-gray-300">
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-medical-400 flex-shrink-0" />
                  <span>{center.address}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Phone className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                  <span dir="ltr" className="font-mono font-bold text-white">{center.phone}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-amber-400 flex-shrink-0" />
                  <span>{center.workingHours}</span>
                </div>
              </div>

              <div className="pt-4 flex flex-wrap gap-3">
                <Link to={`/booking?center=${center.id}`}>
                  <Button className="bg-medical-500 hover:bg-medical-400 text-white font-bold rounded-xl px-7 py-5 text-sm shadow-lg">
                    <Calendar className="w-4 h-4 ml-2" />
                    حجز موعد بالفرع
                  </Button>
                </Link>

                <Button 
                  onClick={() => {
                    setIsSpecialistsModalOpen(true);
                    if (centerSpecs.length > 0) setSelectedSpecialist(centerSpecs[0]);
                  }}
                  variant="outline" 
                  className="border-medical-400 text-medical-200 hover:bg-white/10 font-bold rounded-xl px-6 py-5 text-sm"
                >
                  <Users className="w-4 h-4 ml-2 text-medical-300" />
                  تصفح أخصائيي الفرع ({centerSpecs.length})
                </Button>

                <a href={`https://wa.me/${center.phone.replace(/\D/g, '')}`} target="_blank" rel="noopener noreferrer">
                  <Button variant="outline" className="border-white/30 text-white hover:bg-white/10 font-bold rounded-xl px-6 py-5 text-sm">
                    تواصل عبر الواتساب
                  </Button>
                </a>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* Profile Body */}
      <section className="py-12 flex-grow">
        <div className="container mx-auto px-4 max-w-6xl space-y-12">
          
          {/* Dedicated Floating Trigger Banner for Specialists */}
          <div className="bg-gradient-to-r from-medical-900 via-medical-800 to-medical-950 p-6 sm:p-8 rounded-3xl text-white shadow-xl flex flex-col md:flex-row items-center justify-between gap-6 border border-white/10">
            <div className="space-y-2 text-center md:text-right">
              <span className="bg-white/15 text-medical-200 text-xs font-bold px-3 py-1 rounded-full border border-white/10">
                الفريق الطبي بالفرع
              </span>
              <h2 className="text-xl sm:text-2xl font-bold font-cairo">
                أخصائيو فرع {center.name}
              </h2>
              <p className="text-gray-300 text-xs sm:text-sm max-w-xl">
                اطّلع على الملفات الشخصية الكاملة للأخصائيين المعتمدين، خبراتهم الحركية، وسجل الحالات الناجحة التي قاموا بتأهيلها.
              </p>
            </div>
            
            <Button 
              onClick={() => {
                setIsSpecialistsModalOpen(true);
                if (centerSpecs.length > 0) setSelectedSpecialist(centerSpecs[0]);
              }}
              className="bg-white text-medical-950 hover:bg-medical-50 font-extrabold rounded-2xl px-8 py-6 text-sm shadow-lg whitespace-nowrap"
            >
              <Users className="w-5 h-5 ml-2 text-medical-700" />
              عرض كادر الأخصائيين بالتفصيل
            </Button>
          </div>

          {/* Services & Features */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white p-6 sm:p-8 rounded-3xl shadow-xs border border-gray-200/80">
              <h2 className="text-xl font-bold text-gray-900 font-cairo mb-4 flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-medical-600" />
                الخدمات المقدمة بالفرع
              </h2>
              <ul className="space-y-3">
                {(center.services || [
                  'تصميم وتركيب الأطراف الصناعية الذكية (علوية وسفلية)',
                  'جبائر تقويم العظام المخصصة (AFO, KAFO)',
                  'تصميم الفرش الطبي والأحذية الطبية المخصصة',
                  'صيانة دورية فورية وتعديل مقاسات الأجهزة والجبائر',
                  'جلسات تدريب وتأهيل حركي مجانية للمرضى الجدد'
                ]).map((srv, idx) => (
                  <li key={idx} className="flex items-start gap-2 text-xs text-gray-700 font-medium">
                    <span className="w-2 h-2 rounded-full bg-medical-500 mt-1.5 flex-shrink-0" />
                    <span>{srv}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Cases Worked On */}
            <div className="bg-white p-6 sm:p-8 rounded-3xl shadow-xs border border-gray-200/80">
              <h2 className="text-xl font-bold text-gray-900 font-cairo mb-4 flex items-center gap-2">
                <Award className="w-5 h-5 text-emerald-600" />
                الحالات والسجلات المنجزة بالفرع
              </h2>
              <div className="space-y-4">
                {casesList.map((cs, idx) => (
                  <div key={idx} className="p-4 bg-slate-50 rounded-2xl border border-gray-100 space-y-1.5">
                    <h3 className="font-bold text-xs text-gray-900">{cs.title}</h3>
                    <p className="text-[11px] text-gray-600 leading-relaxed">{cs.description}</p>
                    {(cs.beforeImage || cs.afterImage) && (
                      <div className="grid grid-cols-2 gap-2 pt-1.5 pb-1">
                        {cs.beforeImage && (
                          <div className="space-y-1">
                            <span className="text-[10px] font-bold text-rose-600 block">قبل التركيب/العلاج:</span>
                            <img src={cs.beforeImage} alt="قبل" className="w-full h-28 object-cover rounded-xl border border-rose-200" />
                          </div>
                        )}
                        {cs.afterImage && (
                          <div className="space-y-1">
                            <span className="text-[10px] font-bold text-emerald-600 block">بعد التعافي والتركيب:</span>
                            <img src={cs.afterImage} alt="بعد" className="w-full h-28 object-cover rounded-xl border border-emerald-200" />
                          </div>
                        )}
                      </div>
                    )}
                    <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full inline-block">
                      النتيجة: {cs.outcome}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Branch Specialists Grid Preview */}
          <div className="bg-white p-6 sm:p-8 rounded-3xl shadow-xs border border-gray-200/80">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold text-gray-900 font-cairo flex items-center gap-2">
                <Users className="w-5 h-5 text-medical-600" />
                أخصائيو هذا الفرع المعتمدون
              </h2>
              <Button 
                onClick={() => {
                  setIsSpecialistsModalOpen(true);
                  if (centerSpecs.length > 0) setSelectedSpecialist(centerSpecs[0]);
                }}
                variant="ghost" 
                className="text-xs font-bold text-medical-700 hover:bg-medical-50 rounded-xl"
              >
                توسع في العرض
                <ChevronRight className="w-4 h-4 mr-1 rtl:rotate-180" />
              </Button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              {centerSpecs.length > 0 ? centerSpecs.map((spec) => (
                <div 
                  key={spec.id} 
                  onClick={() => {
                    setSelectedSpecialist(spec);
                    setIsSpecialistsModalOpen(true);
                  }}
                  className="bg-slate-50/80 hover:bg-slate-100/90 p-5 rounded-2xl border border-gray-200/80 text-center cursor-pointer transition-all duration-300 hover:shadow-md hover:border-medical-300 group"
                >
                  <img 
                    src={spec.image || DEFAULT_AVATAR} 
                    alt={spec.name}
                    className="w-24 h-24 rounded-full object-cover border-4 border-white shadow-sm mx-auto mb-3 group-hover:scale-105 transition-transform"
                    onError={(e) => { e.currentTarget.src = DEFAULT_AVATAR; }}
                  />
                  <h3 className="font-bold text-sm text-gray-900">{spec.name}</h3>
                  <p className="text-xs text-medical-600 font-semibold mt-0.5">{spec.role}</p>
                  <p className="text-xs text-gray-500 mt-2 line-clamp-2">{spec.bio}</p>
                  
                  <div className="mt-4 pt-3 border-t border-gray-200/60 flex items-center justify-center text-xs font-bold text-medical-700">
                    <span>عرض البروفايل والحجز</span>
                    <ChevronRight className="w-4 h-4 mr-1 rtl:rotate-180" />
                  </div>
                </div>
              )) : (
                <div className="col-span-full text-center py-10 bg-slate-50/50 rounded-2xl border border-dashed border-gray-300">
                  <Users className="w-10 h-10 text-gray-300 mx-auto mb-3" />
                  <p className="text-gray-500 font-bold text-sm">لم يتم إضافة أخصائيين بعد</p>
                  <p className="text-gray-400 text-xs mt-1">سيتم إضافة الأخصائيين المعتمدين لهذا الفرع قريباً</p>
                </div>
              )}
            </div>
          </div>

        </div>
      </section>

      {/* Floating Specialists & Full Specialist Profile Modal */}
      <AnimatePresence>
        {isSpecialistsModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="bg-white rounded-3xl shadow-2xl border border-gray-100 w-full max-w-4xl max-h-[90vh] overflow-hidden flex flex-col"
            >
              {/* Modal Header */}
              <div className="p-5 sm:p-6 bg-gradient-to-r from-medical-950 via-medical-900 to-medical-850 text-white flex justify-between items-center border-b border-white/10">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center text-medical-200">
                    <Users className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-bold text-base sm:text-lg font-cairo">أخصائيو فرع {center.name}</h3>
                    <p className="text-xs text-gray-300">اختر الأخصائي لعرض البروفايل الكامل وتحديد موعد الاستشارة</p>
                  </div>
                </div>
                
                <button
                  onClick={() => {
                    setIsSpecialistsModalOpen(false);
                    setSelectedSpecialist(null);
                  }}
                  className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Modal Body: Left sidebar specialist list + Right full profile */}
              <div className="flex flex-col md:flex-row flex-grow overflow-hidden">
                
                {/* Specialists Sidebar Selector */}
                <div className="w-full md:w-1/3 bg-slate-50 border-b md:border-b-0 md:border-l border-gray-200 p-4 overflow-y-auto space-y-3 max-h-48 md:max-h-none">
                  <span className="text-[11px] font-bold text-gray-500 uppercase tracking-wider block mb-1 px-1">
                    أخصائيو الفرع المتاحون ({centerSpecs.length})
                  </span>

                  {centerSpecs.length > 0 ? centerSpecs.map((spec) => {
                    const isSelected = selectedSpecialist?.id === spec.id;
                    return (
                      <button
                        key={spec.id}
                        onClick={() => setSelectedSpecialist(spec)}
                        className={`w-full text-right p-3.5 rounded-2xl flex items-center gap-3 transition-all ${
                          isSelected 
                            ? 'bg-medical-700 text-white shadow-md font-bold' 
                            : 'bg-white text-gray-800 hover:bg-slate-100 border border-gray-200/80'
                        }`}
                      >
                        <img 
                          src={spec.image || DEFAULT_AVATAR} 
                          alt={spec.name}
                          className="w-12 h-12 rounded-full object-cover border-2 border-white flex-shrink-0"
                          onError={(e) => { e.currentTarget.src = DEFAULT_AVATAR; }}
                        />
                        <div className="overflow-hidden">
                          <h4 className="text-xs font-bold truncate">{spec.name}</h4>
                          <p className={`text-[11px] truncate mt-0.5 ${isSelected ? 'text-medical-200' : 'text-gray-500'}`}>
                            {spec.role}
                          </p>
                        </div>
                      </button>
                    );
                  }) : (
                    <div className="text-center py-6 text-gray-400">
                      <Users className="w-8 h-8 mx-auto mb-2 text-gray-300" />
                      <p className="text-xs font-bold">لم يتم إضافة أخصائيين بعد</p>
                    </div>
                  )}
                </div>

                {/* Right Area: Selected Specialist Full Detailed Profile */}
                <div className="w-full md:w-2/3 p-6 sm:p-8 overflow-y-auto space-y-6">
                  {selectedSpecialist ? (
                    <div className="space-y-6">
                      
                      {/* Top Header Card */}
                      <div className="flex flex-col sm:flex-row items-center sm:items-start gap-5 bg-gradient-to-br from-slate-50 to-medical-50/50 p-6 rounded-3xl border border-medical-100">
                        <img 
                          src={selectedSpecialist.image || DEFAULT_AVATAR} 
                          alt={selectedSpecialist.name}
                          className="w-28 h-28 rounded-full object-cover border-4 border-white shadow-md flex-shrink-0"
                          onError={(e) => { e.currentTarget.src = DEFAULT_AVATAR; }}
                        />
                        
                        <div className="text-center sm:text-right space-y-1.5 flex-grow">
                          <span className="bg-medical-100 text-medical-800 text-[10px] font-bold px-3 py-0.5 rounded-full inline-block">
                            أخصائي معتمد في {center.name}
                          </span>
                          <h3 className="text-xl font-extrabold text-gray-900 font-cairo">
                            {selectedSpecialist.name}
                          </h3>
                          <p className="text-xs font-semibold text-medical-700">
                            {selectedSpecialist.role}
                          </p>

                          <div className="flex flex-wrap justify-center sm:justify-start gap-1.5 pt-2">
                            {(selectedSpecialist.expertise || ['الأطراف الصناعية الذكية', 'الجبائر التقويمية']).map((exp, i) => (
                              <span key={i} className="bg-white text-gray-700 text-[10px] font-bold px-2.5 py-1 rounded-lg border border-gray-200">
                                {exp}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>

                      {/* Biography */}
                      <div className="space-y-2">
                        <h4 className="text-sm font-bold text-gray-900 font-cairo flex items-center gap-2">
                          <User className="w-4 h-4 text-medical-600" />
                          السيرة الذاتية والخبرات
                        </h4>
                        <p className="text-xs text-gray-600 leading-relaxed font-medium bg-slate-50 p-4 rounded-2xl border border-gray-100">
                          {selectedSpecialist.bio || 'يمتلك الأخصائي خبرة واسعة في فحص وتصميم وتأهيل حالات الأطراف الصناعية والجبائر الطبية المعقدة وفق أحدث البروتوكولات الدولية.'}
                        </p>
                      </div>

                      {/* Specialist Cases Worked On */}
                      <div className="space-y-3">
                        <h4 className="text-sm font-bold text-gray-900 font-cairo flex items-center gap-2">
                          <Award className="w-4 h-4 text-emerald-600" />
                          الحالات التي عمل عليها وتأهيلها
                        </h4>
                        <div className="space-y-2">
                          {(selectedSpecialist.casesWorkedOn || DEFAULT_CASES).map((cs, idx) => (
                            <div key={idx} className="p-3.5 bg-white rounded-2xl border border-gray-200/80 space-y-1">
                              <h5 className="font-bold text-xs text-gray-900">{cs.title}</h5>
                              <p className="text-[11px] text-gray-600 leading-relaxed">{cs.description}</p>
                              {(cs.beforeImage || cs.afterImage) && (
                                <div className="grid grid-cols-2 gap-2 pt-1 pb-1">
                                  {cs.beforeImage && (
                                    <div className="space-y-0.5">
                                      <span className="text-[9px] font-bold text-rose-600 block">قبل:</span>
                                      <img src={cs.beforeImage} alt="قبل" className="w-full h-24 object-cover rounded-lg border border-rose-200" />
                                    </div>
                                  )}
                                  {cs.afterImage && (
                                    <div className="space-y-0.5">
                                      <span className="text-[9px] font-bold text-emerald-600 block">بعد:</span>
                                      <img src={cs.afterImage} alt="بعد" className="w-full h-24 object-cover rounded-lg border border-emerald-200" />
                                    </div>
                                  )}
                                </div>
                              )}
                              <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md inline-block">
                                النتيجة: {cs.outcome}
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Action Buttons for Patients */}
                      <div className="pt-4 border-t border-gray-200 flex flex-col sm:flex-row gap-3">
                        <Button 
                          onClick={() => {
                            setIsSpecialistsModalOpen(false);
                            navigate(`/booking?center=${center.id}&specialist=${selectedSpecialist.id}`);
                          }}
                          className="flex-1 bg-medical-600 hover:bg-medical-700 text-white font-bold rounded-xl py-5 text-sm shadow-md"
                        >
                          <Calendar className="w-4 h-4 ml-2" />
                          حجز موعد كشف مع {selectedSpecialist.name}
                        </Button>

                        <a 
                          href={`https://wa.me/${(selectedSpecialist.phone || center.phone).replace(/\D/g, '')}`} 
                          target="_blank" 
                          rel="noopener noreferrer"
                        >
                          <Button variant="outline" className="w-full sm:w-auto border-emerald-500 text-emerald-700 hover:bg-emerald-50 font-bold rounded-xl py-5 text-sm">
                            <Phone className="w-4 h-4 ml-2" />
                            تواصل واتساب
                          </Button>
                        </a>
                      </div>

                    </div>
                  ) : (
                    <div className="text-center py-12 text-gray-400">
                      اختر أخصائي لعرض البروفايل الكامل
                    </div>
                  )}
                </div>

              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* FULLSCREEN LIGHTBOX MODAL */}
      <Dialog open={isLightboxOpen} onOpenChange={setIsLightboxOpen}>
        <DialogContent className="max-w-4xl bg-black/95 border-white/10 text-white p-2 font-cairo shadow-2xl">
          <DialogHeader className="sr-only">
            <DialogTitle>معاينة صورة المركز بحجم كامل</DialogTitle>
          </DialogHeader>
          <div className="relative w-full h-[75vh] flex items-center justify-center overflow-hidden rounded-2xl bg-black">
            <img 
              src={galleryImages[activeImageIndex] || DEFAULT_CENTER_IMAGE} 
              alt={center.name}
              className="max-w-full max-h-full object-contain shadow-2xl"
              onError={(e) => { e.currentTarget.src = DEFAULT_CENTER_IMAGE; }}
            />
            {galleryImages.length > 1 && (
              <>
                <button
                  onClick={() => setActiveImageIndex((prev) => (prev === 0 ? galleryImages.length - 1 : prev - 1))}
                  className="absolute right-4 bg-white/10 hover:bg-white/20 text-white rounded-full p-3 backdrop-blur-md transition-all"
                  title="السابقة"
                >
                  <ChevronRight className="w-6 h-6" />
                </button>
                <button
                  onClick={() => setActiveImageIndex((prev) => (prev + 1) % galleryImages.length)}
                  className="absolute left-4 bg-white/10 hover:bg-white/20 text-white rounded-full p-3 backdrop-blur-md transition-all"
                  title="التالية"
                >
                  <ChevronLeft className="w-6 h-6" />
                </button>
              </>
            )}
            <div className="absolute bottom-4 bg-black/70 px-4 py-1.5 rounded-full text-xs font-bold text-gray-200 border border-white/10">
              {activeImageIndex + 1} من {galleryImages.length}
            </div>
          </div>
        </DialogContent>
      </Dialog>

      <Footer />
    </div>
  );
};

export default CenterDetails;