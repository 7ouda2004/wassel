import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { MapPin, Phone, Clock, Calendar, ChevronRight, Building2, Users, Star, Award, CheckCircle2, Shield, Heart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

import { getLocalCenters, getLocalSpecialists, type Center, type Specialist, FALLBACK_CENTER_IMAGES, FALLBACK_SPECIALIST_IMAGES, DEFAULT_CASES } from '@/lib/db';

const CenterDetails = () => {
  const { id } = useParams<{ id: string }>();
  const [center, setCenter] = useState<Center | null>(null);
  const [centerSpecs, setCenterSpecs] = useState<Specialist[]>([]);
  const [activeImageIndex, setActiveImageIndex] = useState(0);

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

  if (!center) {
    return null;
  }

  const galleryImages = (center.images && center.images.length > 0) 
    ? center.images 
    : [center.image || FALLBACK_CENTER_IMAGES[0], FALLBACK_CENTER_IMAGES[1], FALLBACK_CENTER_IMAGES[2]];

  const casesList = center.casesWorkedOn && center.casesWorkedOn.length > 0 ? center.casesWorkedOn : DEFAULT_CASES;

  return (
    <div className="min-h-screen flex flex-col bg-slate-50/50">
      <Navbar />

      {/* Hero Showcase Header */}
      <section className="relative py-16 bg-gradient-to-b from-medical-950 via-medical-900 to-medical-850 text-white overflow-hidden">
        <div className="container mx-auto px-4 max-w-6xl relative z-10">
          
          <div className="flex flex-col lg:flex-row gap-8 items-center">
            
            {/* Image Slider */}
            <div className="w-full lg:w-1/2">
              <div className="relative h-80 rounded-3xl overflow-hidden shadow-2xl border border-white/10 group">
                <img
                  src={galleryImages[activeImageIndex] || FALLBACK_CENTER_IMAGES[0]}
                  alt={center.name}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  onError={(e) => { e.currentTarget.src = FALLBACK_CENTER_IMAGES[0]; }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                <div className="absolute bottom-4 right-4">
                  <span className="bg-white/90 backdrop-blur-md text-gray-900 text-xs font-bold px-3 py-1 rounded-full shadow-sm">
                    {center.location} ({center.region})
                  </span>
                </div>
              </div>

              {/* Thumbnails */}
              {galleryImages.length > 1 && (
                <div className="flex gap-2 justify-center mt-3">
                  {galleryImages.map((img, idx) => (
                    <button
                      key={idx}
                      onClick={() => setActiveImageIndex(idx)}
                      className={`w-16 h-12 rounded-xl overflow-hidden border-2 transition-all ${
                        idx === activeImageIndex ? 'border-medical-400 scale-105' : 'border-white/20 opacity-60'
                      }`}
                    >
                      <img src={img} alt="Thumbnail" className="w-full h-full object-cover" />
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
                    <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full inline-block">
                      النتيجة: {cs.outcome}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Branch Specialists */}
          {centerSpecs.length > 0 && (
            <div className="bg-white p-6 sm:p-8 rounded-3xl shadow-xs border border-gray-200/80">
              <h2 className="text-xl font-bold text-gray-900 font-cairo mb-6 flex items-center gap-2">
                <Users className="w-5 h-5 text-medical-600" />
                أخصائيو هذا الفرع المعتمدون
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                {centerSpecs.map((spec) => (
                  <div key={spec.id} className="bg-slate-50/70 p-5 rounded-2xl border border-gray-200/80 text-center">
                    <img 
                      src={spec.image || FALLBACK_SPECIALIST_IMAGES[0]} 
                      alt={spec.name}
                      className="w-20 h-20 rounded-full object-cover border-2 border-white shadow-xs mx-auto mb-3"
                      onError={(e) => { e.currentTarget.src = FALLBACK_SPECIALIST_IMAGES[0]; }}
                    />
                    <h3 className="font-bold text-sm text-gray-900">{spec.name}</h3>
                    <p className="text-xs text-medical-600 font-semibold mt-0.5">{spec.role}</p>
                    <p className="text-xs text-gray-500 mt-2 line-clamp-2">{spec.bio}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

        </div>
      </section>

      <Footer />
    </div>
  );
};

export default CenterDetails;