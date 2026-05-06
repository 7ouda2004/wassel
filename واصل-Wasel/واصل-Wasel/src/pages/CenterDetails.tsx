import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { MapPin, Phone, Clock, Calendar, ShieldCheck, CheckCircle2, User, Users, Star, Award, MessageCircle, ChevronRight, Navigation } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { useTranslation } from 'react-i18next';
import { supabase } from '@/lib/supabase';
import { toast } from 'sonner';

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

  const [center, setCenter] = useState<any | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    window.scrollTo(0, 0);
    const fetchCenter = async () => {
      try {
        const { data, error } = await supabase.from('centers').select('*, specialists(*), products(*)').eq('id', id).single();
        if (data && !error) {
          setCenter(data);
        } else {
          setCenter(null);
        }
      } catch (err) {
        console.error('Error fetching center details:', err);
        setCenter(null);
      } finally {
        setIsLoading(false);
      }
    };
    fetchCenter();
  }, [id]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <div className="flex-grow flex items-center justify-center py-20">
          <div className="text-medical-600">
            <p className="font-bold text-lg">{isAr ? 'جاري تحميل تفاصيل المركز...' : 'Loading center details...'}</p>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

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
  const workingHours = center.workingHours_ar ? (isAr ? center.workingHours_ar : center.workingHours_en) : (isAr ? 'السبت - الخميس: ٩ ص - ٥ م' : 'Sat - Thu: 9 AM - 5 PM');
  const services = center.services_ar ? (isAr ? center.services_ar : center.services_en) : [];

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
            <span className="flex items-center gap-2"><Users className="w-4 h-4 text-medical-500" />{center.specialists?.length || 0} {isAr ? 'أخصائي' : 'specialists'}</span>
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
              {center.specialists && center.specialists.map((spec: any, idx: number) => (
                <motion.div
                  key={spec.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.1 }}
                  className="bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-lg hover:border-medical-200 transition-all duration-300 overflow-hidden"
                >
                  <div className="p-6">
                    <div className="flex items-start gap-4 mb-4">
                      <img src={spec.image || 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80'} alt={isAr ? spec.full_name : spec.name_en} className="w-16 h-16 rounded-xl object-cover shadow-md" />
                      <div className="flex-1 min-w-0">
                        <h3 className="font-bold text-gray-900 text-lg">{isAr ? spec.full_name : spec.name_en}</h3>
                        <p className="text-medical-600 text-sm font-medium">{isAr ? spec.specialization : spec.specialization_en}</p>
                      </div>
                    </div>

                    <div className="bg-medical-50 rounded-xl p-3 mb-4">
                      <div className="flex items-center gap-2 mb-1">
                        <Award className="w-4 h-4 text-medical-600" />
                        <span className="text-sm font-semibold text-gray-900">{isAr ? 'التخصص' : 'Specialization'}</span>
                      </div>
                      <p className="text-sm text-medical-700 font-medium">{isAr ? spec.specialization : spec.specialization_en}</p>
                    </div>

                    <div className="flex items-center justify-between mb-4 text-sm">
                      <div className="flex items-center gap-2">
                        <StarRating rating={spec.rating || 5} />
                        <span className="text-gray-600 font-semibold">{(spec.rating || 5).toFixed(1)}</span>
                        <span className="text-gray-400">({spec.review_count || 0})</span>
                      </div>
                      <span className="text-gray-500">{spec.experience} {isAr ? 'سنة خبرة' : 'yrs exp'}</span>
                    </div>

                    <Link to={`/booking?center=${center.id}&centerName=${encodeURIComponent(isAr ? center.governorate_ar : center.governorate_en)}&specialist=${encodeURIComponent(isAr ? spec.full_name : spec.name_en)}&specId=${spec.id}`}>
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

          {/* Products Section */}
          {center.products && center.products.length > 0 && (
            <div className="mb-12">
              <div className="flex items-center gap-3 mb-8">
                <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                  <Award className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">{isAr ? 'منتجات وأجهزة المركز' : 'Center Products & Devices'}</h2>
                  <p className="text-gray-500 text-sm">{isAr ? 'تصفح أحدث الأجهزة المتوفرة' : 'Browse latest available devices'}</p>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {center.products.map((prod: any, idx: number) => (
                  <motion.div key={prod.id} initial={{opacity: 0, y: 20}} animate={{opacity: 1, y: 0}} transition={{delay: idx * 0.1}} className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden hover:shadow-lg transition-all duration-300">
                    <div className="w-full h-48 relative overflow-hidden flex items-center justify-center border-b border-gray-100">
                      {/* Blurred Background */}
                      <div 
                        className="absolute inset-0 bg-cover bg-center blur-xl opacity-20 scale-110"
                        style={{ backgroundImage: `url(${prod.image_url || prod.image})` }}
                      ></div>
                      
                      {/* Actual Image */}
                      <img 
                        src={prod.image_url || prod.image} 
                        alt={isAr ? prod.name_ar : prod.name_en} 
                        className="relative z-10 max-w-full max-h-full object-contain transform transition-transform duration-500 hover:scale-105" 
                      />
                    </div>
                    <div className="p-5">
                      <div className="flex justify-between items-start mb-2">
                        <h3 className="font-bold text-gray-900">{isAr ? prod.name_ar : prod.name_en}</h3>
                        {prod.price > 0 && (
                          <span className="bg-teal-50 text-teal-700 px-2 py-1 rounded-md text-sm font-bold whitespace-nowrap">
                            {prod.price} {isAr ? 'ج.م' : 'EGP'}
                          </span>
                        )}
                      </div>
                      <p className="text-sm text-gray-500 leading-relaxed line-clamp-3">{isAr ? prod.description_ar : prod.description_en}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          )}

          {/* Reviews & Ratings Section */}
          <div className="mb-12 bg-white rounded-3xl p-8 border border-gray-100 shadow-sm">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 bg-amber-50 rounded-xl flex items-center justify-center">
                <Star className="w-6 h-6 text-amber-500" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-gray-900">{isAr ? 'التقييمات والمراجعات' : 'Ratings & Reviews'}</h2>
                <p className="text-gray-500 text-sm">{isAr ? 'شارك تجربتك مع المركز والأخصائيين' : 'Share your experience with the center and specialists'}</p>
              </div>
            </div>
            
            <div className="flex flex-col md:flex-row items-center gap-8 bg-gray-50 p-6 rounded-2xl border border-gray-100">
              <div className="text-center md:text-start">
                <p className="text-4xl font-bold text-gray-900 mb-2">{center.rating.toFixed(1)}</p>
                <div className="mb-2"><StarRating rating={center.rating} size="lg" /></div>
                <p className="text-sm text-gray-500">{isAr ? 'بناءً على التقييمات' : 'Based on ratings'}</p>
              </div>
              
              <div className="flex-1 flex flex-col gap-4 border-t md:border-t-0 md:border-s border-gray-200 pt-6 md:pt-0 md:ps-8 w-full">
                <p className="text-gray-700 font-medium">{isAr ? 'لإضافة تقييم يرجى تسجيل الدخول' : 'To add a review please login'}</p>
                <Button 
                  onClick={() => toast.info(isAr ? 'سيتم تفعيل تسجيل الدخول بجوجل قريباً' : 'Google sign-in will be enabled soon')}
                  className="w-full md:w-auto bg-white border border-gray-200 text-gray-700 hover:bg-gray-50 rounded-xl flex items-center justify-center shadow-sm py-6">
                  <svg className="w-5 h-5 me-2" viewBox="0 0 24 24"><path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/><path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/><path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/><path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/></svg>
                  {isAr ? 'تسجيل الدخول باستخدام Google' : 'Sign in with Google'}
                </Button>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left: Info + Insurance + Map */}
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

              {/* Google Maps */}
              {center.google_maps_url && (
                <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center">
                      <Navigation className="w-6 h-6 text-blue-600" />
                    </div>
                    <div>
                      <h2 className="text-2xl font-bold text-gray-900">{isAr ? 'الموقع على الخريطة' : 'Location on Map'}</h2>
                      <p className="text-sm text-gray-500">{isAr ? 'اضغط لفتح الموقع في خرائط جوجل' : 'Click to open in Google Maps'}</p>
                    </div>
                  </div>
                  <div className="rounded-2xl overflow-hidden border border-gray-200">
                    <iframe
                      src={center.google_maps_url}
                      width="100%"
                      height="350"
                      style={{ border: 0 }}
                      allowFullScreen
                      loading="lazy"
                      referrerPolicy="no-referrer-when-downgrade"
                      title={`${name} location`}
                    />
                  </div>
                </div>
              )}

              {/* Insurance Coverage */}
              <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 bg-green-50 rounded-xl flex items-center justify-center">
                    <ShieldCheck className="w-6 h-6 text-green-600" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900">{isAr ? 'التغطية التأمينية' : 'Insurance Coverage'}</h2>
                    <p className="text-sm text-gray-500">{isAr ? 'شركات التأمين المعتمدة في هذا المركز' : 'Approved insurance providers at this center'}</p>
                  </div>
                </div>
                <p className="text-gray-600 mb-6">
                  {isAr
                    ? 'هذا المركز معتمد من منظومة الشراء الموحد وشركات التأمين التالية. يمكن للتأمين توجيه المريض للمركز المناسب وتغطية تكلفة الأجهزة.'
                    : 'This center is approved by the unified procurement system and the following insurance companies.'}
                </p>
                <div className="flex flex-wrap gap-3">
                  {(center.supported_insurers || []).map((insurer, idx) => (
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

                {services && services.length > 0 && (
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
                )}
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