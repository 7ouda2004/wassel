import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { MapPin, Phone, Clock, Calendar, ShieldCheck, CheckCircle2, User, Users, Star, Award, MessageCircle, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { useTranslation } from 'react-i18next';
import { egyptCenters } from '@/data/centers-database';
import type { GovernorateCenter, Specialist } from '@/data/centers-database';

const StarRating = ({ rating, size = 'sm' }: { rating: number; size?: string }) => {
  const sz = size === 'sm' ? 'w-4 h-4' : 'w-5 h-5';
  return (
    <div className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map(s => (
        <Star key={s} className={`${sz} ${s <= Math.round(rating) ? 'fill-amber-400 text-amber-400' : 'text-gray-300'}`} />
      ))}
    </div>
  );
};

const CenterDetails = () => {
  const { id } = useParams<{ id: string }>();
  const { t, i18n } = useTranslation();
  const isAr = i18n.language === 'ar';
  const isRtl = i18n.dir() === 'rtl';

  const [center, setCenter] = useState<GovernorateCenter | null>(null);

  useEffect(() => {
    window.scrollTo(0, 0);
    const found = egyptCenters.find(c => c.id === id);
    setCenter(found || null);
  }, [id]);

  if (!center) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <div className="flex-grow flex items-center justify-center py-20">
          <div className="text-center">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <MapPin className="w-8 h-8 text-gray-400" />
            </div>
            <p className="text-gray-500 text-xl">{isAr ? 'لم يتم العثور على المركز' : 'Center not found'}</p>
            <Link to="/centers">
              <Button className="mt-4">{isAr ? 'العودة للمراكز' : 'Back to Centers'}</Button>
            </Link>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  const name = isAr ? center.name_ar : center.name_en;
  const address = isAr ? center.address_ar : center.address_en;
  const workingHours = isAr ? center.workingHours_ar : center.workingHours_en;
  const services = isAr ? center.services_ar : center.services_en;

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      {/* Hero Section */}
      <section className="relative h-[420px] overflow-hidden">
        <img src={center.image} alt={name} className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/60 to-transparent">
          <div className="container mx-auto px-4 h-full flex flex-col justify-end pb-12">
            <div className="max-w-4xl">
              <div className="flex flex-wrap gap-3 mb-4">
                {center.insurance_supported && (
                  <span className="flex items-center text-white/90 bg-green-500/20 px-4 py-2 rounded-full backdrop-blur-sm border border-green-500/30 text-sm">
                    <ShieldCheck className="w-4 h-4 me-2 text-green-400" />
                    {isAr ? 'معتمد - الشراء الموحد' : 'Unified Procurement Approved'}
                  </span>
                )}
                <span className="flex items-center text-white/90 bg-amber-500/20 px-4 py-2 rounded-full backdrop-blur-sm border border-amber-500/30 text-sm">
                  <Star className="w-4 h-4 me-2 fill-amber-400 text-amber-400" />
                  {center.rating.toFixed(1)}
                </span>
              </div>
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-3">{name}</h1>
              <div className="flex items-center text-white/80 gap-2 text-lg">
                <MapPin className="w-5 h-5" />
                {isAr ? center.governorate_ar : center.governorate_en} - {address}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Book Bar */}
      <section className="bg-white border-b border-gray-100 py-4 sticky top-16 z-20 shadow-sm">
        <div className="container mx-auto px-4 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-6 text-sm text-gray-600">
            <span className="flex items-center gap-2"><Phone className="w-4 h-4 text-medical-500" /><span dir="ltr">{center.phone}</span></span>
            <span className="flex items-center gap-2"><Clock className="w-4 h-4 text-medical-500" />{workingHours}</span>
            <span className="flex items-center gap-2"><Users className="w-4 h-4 text-medical-500" />{center.specialists.length} {isAr ? 'أخصائي' : 'specialists'}</span>
          </div>
          <div className="flex gap-3">
            <Link to={`/booking?center=${center.id}&centerName=${encodeURIComponent(isAr ? center.governorate_ar : center.governorate_en)}`}>
              <Button className="bg-gradient-to-l from-medical-600 to-medical-700 text-white rounded-xl shadow-lg">
                <Calendar className="w-4 h-4 me-2" />
                {isAr ? 'احجز مع المركز' : 'Book with Center'}
              </Button>
            </Link>
            <a href={`https://wa.me/${center.whatsapp}`} target="_blank" rel="noopener noreferrer">
              <Button variant="outline" className="rounded-xl border-green-300 text-green-700 hover:bg-green-50">
                <MessageCircle className="w-4 h-4 me-2" />
                {isAr ? 'واتساب' : 'WhatsApp'}
              </Button>
            </a>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-12 bg-gray-50 flex-grow">
        <div className="container mx-auto px-4 max-w-7xl">

          {/* Specialists Section */}
          <div className="mb-12">
            <div className="flex items-center gap-3 mb-8">
              <div className="w-12 h-12 bg-medical-100 rounded-xl flex items-center justify-center">
                <Users className="w-6 h-6 text-medical-600" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-gray-900">{isAr ? 'الأخصائيون' : 'Specialists'}</h2>
                <p className="text-gray-500 text-sm">{isAr ? 'اختر الأخصائي المناسب واحجز مباشرة' : 'Choose the right specialist and book directly'}</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {center.specialists.map((spec, idx) => (
                <motion.div
                  key={spec.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.1 }}
                  className="bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-lg hover:border-medical-200 transition-all duration-300 overflow-hidden"
                >
                  <div className="p-6">
                    <div className="flex items-start gap-4 mb-4">
                      <img src={spec.image} alt={isAr ? spec.name_ar : spec.name_en} className="w-16 h-16 rounded-xl object-cover shadow-md" />
                      <div className="flex-1 min-w-0">
                        <h3 className="font-bold text-gray-900 text-lg">{isAr ? spec.name_ar : spec.name_en}</h3>
                        <p className="text-medical-600 text-sm font-medium">{isAr ? spec.title_ar : spec.title_en}</p>
                      </div>
                    </div>

                    <div className="bg-medical-50 rounded-xl p-3 mb-4">
                      <div className="flex items-center gap-2 mb-1">
                        <Award className="w-4 h-4 text-medical-600" />
                        <span className="text-sm font-semibold text-gray-900">{isAr ? 'التخصص' : 'Specialization'}</span>
                      </div>
                      <p className="text-sm text-medical-700 font-medium">{isAr ? spec.specialization_ar : spec.specialization_en}</p>
                    </div>

                    <div className="flex items-center justify-between mb-4 text-sm">
                      <div className="flex items-center gap-2">
                        <StarRating rating={spec.rating} />
                        <span className="text-gray-600 font-semibold">{spec.rating.toFixed(1)}</span>
                        <span className="text-gray-400">({spec.reviewCount})</span>
                      </div>
                      <span className="text-gray-500">{spec.experience} {isAr ? 'سنة خبرة' : 'yrs exp'}</span>
                    </div>

                    <Link to={`/booking?center=${center.id}&centerName=${encodeURIComponent(isAr ? center.governorate_ar : center.governorate_en)}&specialist=${encodeURIComponent(isAr ? spec.name_ar : spec.name_en)}&specId=${spec.id}`}>
                      <Button className="w-full rounded-xl bg-gradient-to-l from-medical-600 to-medical-700 text-white shadow-md hover:shadow-lg">
                        <Calendar className="w-4 h-4 me-2" />
                        {isAr ? 'احجز مع الأخصائي' : 'Book with Specialist'}
                      </Button>
                    </Link>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left: Info + Insurance */}
            <div className="lg:col-span-2 space-y-8">
              {/* Contact Info */}
              <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100">
                <h2 className="text-2xl font-bold mb-6 text-gray-900">{isAr ? 'معلومات التواصل' : 'Contact Information'}</h2>
                <div className="space-y-5">
                  <div className="flex items-start gap-4">
                    <div className="bg-medical-50 p-3 rounded-xl"><MapPin className="h-6 w-6 text-medical-600" /></div>
                    <div>
                      <h3 className="font-bold text-gray-900">{isAr ? 'العنوان' : 'Address'}</h3>
                      <p className="text-gray-600 mt-1">{address}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="bg-medical-50 p-3 rounded-xl"><Phone className="h-6 w-6 text-medical-600" /></div>
                    <div>
                      <h3 className="font-bold text-gray-900">{isAr ? 'رقم الهاتف' : 'Phone'}</h3>
                      <p className="text-gray-600 mt-1" dir="ltr">{center.phone}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="bg-medical-50 p-3 rounded-xl"><Clock className="h-6 w-6 text-medical-600" /></div>
                    <div>
                      <h3 className="font-bold text-gray-900">{isAr ? 'مواعيد العمل' : 'Working Hours'}</h3>
                      <p className="text-gray-600 mt-1">{workingHours}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Insurance Coverage */}
              <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 bg-green-50 rounded-xl flex items-center justify-center">
                    <ShieldCheck className="w-6 h-6 text-green-600" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900">{isAr ? 'التغطية التأمينية' : 'Insurance Coverage'}</h2>
                    <p className="text-sm text-gray-500">{isAr ? 'مربوط بمنظومة الشراء الموحد' : 'Connected to Unified Procurement'}</p>
                  </div>
                </div>
                <p className="text-gray-600 mb-6">
                  {isAr
                    ? 'هذا المركز معتمد من منظومة الشراء الموحد وشركات التأمين التالية. يمكن للتأمين توجيه المريض للمركز المناسب وتغطية تكلفة الأجهزة.'
                    : 'This center is approved by the unified procurement system and the following insurance companies.'}
                </p>
                <div className="flex flex-wrap gap-3">
                  {center.supported_insurers.map((insurer, idx) => (
                    <div key={idx} className="flex items-center gap-2 bg-green-50 border border-green-200 px-4 py-2 rounded-full">
                      <CheckCircle2 className="w-4 h-4 text-green-500" />
                      <span className="font-semibold text-gray-800 text-sm">{insurer}</span>
                    </div>
                  ))}
                </div>
                <div className="mt-6 pt-6 border-t border-gray-100">
                  <Link to="/insurance-request">
                    <Button variant="outline" className="text-medical-600 border-medical-200 hover:bg-medical-50 rounded-xl">
                      {isAr ? 'تقديم طلب موافقة تأمين' : 'Submit Insurance Request'}
                    </Button>
                  </Link>
                </div>
              </div>
            </div>

            {/* Right: Services + Quick Actions */}
            <div className="space-y-6">
              <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100 sticky top-36">
                <h3 className="font-bold text-lg text-gray-900 mb-4">{isAr ? 'إجراء سريع' : 'Quick Actions'}</h3>
                <Link to={`/booking?center=${center.id}&centerName=${encodeURIComponent(isAr ? center.governorate_ar : center.governorate_en)}`}>
                  <Button className="w-full py-5 text-base mb-3 bg-gradient-to-l from-medical-600 to-medical-700 text-white rounded-xl shadow-lg hover:scale-[1.02] transition-transform">
                    {isAr ? 'احجز ميعاد' : 'Book Appointment'}
                    <Calendar className="ms-2 h-5 w-5" />
                  </Button>
                </Link>
                <a href={`tel:${center.phone}`} className="block mb-3">
                  <Button variant="outline" className="w-full py-5 text-base border-2 border-gray-200 rounded-xl">
                    <Phone className="me-2 h-5 w-5" />
                    {isAr ? 'اتصل بالمركز' : 'Call Center'}
                  </Button>
                </a>
                <a href={`https://wa.me/${center.whatsapp}`} target="_blank" rel="noopener noreferrer" className="block">
                  <Button variant="outline" className="w-full py-5 text-base border-2 border-green-200 text-green-700 hover:bg-green-50 rounded-xl">
                    <MessageCircle className="me-2 h-5 w-5" />
                    {isAr ? 'تواصل واتساب' : 'WhatsApp'}
                  </Button>
                </a>

                <div className="mt-6 pt-6 border-t border-gray-100">
                  <h3 className="font-bold text-lg text-gray-900 mb-4">{isAr ? 'الخدمات' : 'Services'}</h3>
                  <ul className="space-y-2">
                    {services.map((service, idx) => (
                      <li key={idx} className="flex items-center gap-3 p-2 hover:bg-gray-50 rounded-lg transition-colors text-sm">
                        <div className="w-2 h-2 rounded-full bg-medical-500" />
                        <span className="text-gray-700 font-medium">{service}</span>
                      </li>
                    ))}
                  </ul>
                </div>
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