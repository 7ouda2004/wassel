import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { MapPin, Phone, Clock, Calendar, ShieldCheck, ChevronRight, CheckCircle2, User, Users } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { useTranslation } from 'react-i18next';
import { centersService } from '@/services/centers.service';
import type { Center } from '@/types/database';
import { LoadingSkeleton } from '@/components/shared/LoadingSkeleton';
import EmptyState from '@/components/shared/EmptyState';

const CenterDetails = () => {
  const { id } = useParams<{ id: string }>();
  const { t, i18n } = useTranslation();
  const isAr = i18n.language === 'ar';
  const isRtl = i18n.dir() === 'rtl';

  const [center, setCenter] = useState<Center | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  useEffect(() => {
    window.scrollTo(0, 0);
    const fetchCenter = async () => {
      if (!id) return;
      setIsLoading(true);
      try {
        const data = await centersService.getById(id);
        setCenter(data);
      } catch (error) {
        console.error('Error fetching center:', error);
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
        <div className="flex-grow container mx-auto px-4 py-20">
          <LoadingSkeleton variant="card" count={1} className="h-96 w-full mb-8" />
          <LoadingSkeleton variant="text" count={3} />
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
          <EmptyState type="no-results" message={isAr ? 'لم يتم العثور على المركز' : 'Center not found'} />
        </div>
        <Footer />
      </div>
    );
  }

  const name = isAr ? center.name_ar : center.name_en;
  const description = isAr ? center.description_ar : center.description_en;
  const address = isAr ? center.address_ar : center.address_en;
  const workingHours = isAr ? center.working_hours_ar : center.working_hours_en;
  const services = center.services as any[] || [];
  const insurers = center.supported_insurers || [];

  // Mock team based on center id to show "specialists and technicians" as requested
  const team = [
    {
      name: isAr ? 'د. محمود إبراهيم' : 'Dr. Mahmoud Ebrahim',
      role: isAr ? 'أخصائي أطراف صناعية' : 'Prosthetics Specialist',
      image: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=400',
      technicians: isAr ? ['أحمد سيد', 'مصطفى كامل'] : ['Ahmed Sayed', 'Mostafa Kamel']
    },
    {
      name: isAr ? 'د. باسل أحمد' : 'Dr. Bassel Ahmed',
      role: isAr ? 'أخصائي جبائر طبية' : 'Orthotics Specialist',
      image: 'https://images.unsplash.com/photo-1537368910025-700350fe46c7?w=400',
      technicians: isAr ? ['علي حسين'] : ['Ali Hussein']
    }
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      {/* Hero Section */}
      <section className="relative h-[500px] overflow-hidden">
        <motion.div
          key={activeImageIndex}
          className="h-full w-full"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <img
            src={center.images?.[activeImageIndex] || 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=1200'}
            alt={name}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/60 to-transparent">
            <div className="container mx-auto px-4 h-full flex flex-col justify-end pb-16">
              <div className="max-w-4xl">
                <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
                  {name}
                </h1>
                <p className="text-xl text-white/90 mb-6">
                  {description || (isAr ? 'مركز متخصص في تقديم خدمات الأطراف الصناعية والجبائر الطبية بأعلى جودة.' : 'Specialized center for high quality prosthetics and orthotics.')}
                </p>
                <div className="flex flex-wrap gap-4">
                  <div className="flex items-center text-white/90 bg-white/10 px-4 py-2 rounded-full backdrop-blur-sm">
                    <MapPin className="w-5 h-5 me-2 text-medical-300" />
                    {isAr ? center.city_ar : center.city_en}
                  </div>
                  {center.insurance_supported && (
                    <div className="flex items-center text-white/90 bg-green-500/20 px-4 py-2 rounded-full backdrop-blur-sm border border-green-500/30">
                      <ShieldCheck className="w-5 h-5 me-2 text-green-400" />
                      {isAr ? 'معتمد تأمينياً' : 'Insurance Approved'}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </motion.div>
        {center.images && center.images.length > 1 && (
          <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex gap-3">
            {center.images.map((_, index) => (
              <button
                key={index}
                onClick={() => setActiveImageIndex(index)}
                className={`w-3 h-3 rounded-full transition-all ${index === activeImageIndex ? 'bg-white scale-125' : 'bg-white/50'}`}
              />
            ))}
          </div>
        )}
      </section>

      {/* Main Content */}
      <section className="py-16 bg-gray-50 flex-grow">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            
            {/* Right Column: Details & Insurance */}
            <div className="lg:col-span-2 space-y-8">
              
              {/* Contact Info */}
              <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100">
                <h2 className="text-2xl font-bold mb-6 text-gray-900">{isAr ? 'معلومات التواصل' : 'Contact Information'}</h2>
                <div className="space-y-6">
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
                      <p className="text-gray-600 mt-1">{center.phone}</p>
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

              {/* Insurance Info - Highly requested */}
              <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 bg-green-50 rounded-xl flex items-center justify-center">
                    <ShieldCheck className="w-6 h-6 text-green-600" />
                  </div>
                  <h2 className="text-2xl font-bold text-gray-900">{isAr ? 'التغطية التأمينية' : 'Insurance Coverage'}</h2>
                </div>
                
                {center.insurance_supported ? (
                  <>
                    <p className="text-gray-600 mb-6">
                      {isAr ? 'هذا المركز معتمد من قبل شركات التأمين التالية ويمكنك تغطية تكلفة الأجهزة طبقا لوثيقتك.' : 'This center is approved by the following insurance companies.'}
                    </p>
                    <div className="flex flex-wrap gap-3">
                      {insurers.map((insurer, idx) => (
                        <div key={idx} className="flex items-center gap-2 bg-gray-50 border border-gray-200 px-4 py-2 rounded-full">
                          <CheckCircle2 className="w-4 h-4 text-green-500" />
                          <span className="font-semibold text-gray-800">{insurer}</span>
                        </div>
                      ))}
                    </div>
                    <div className="mt-6 pt-6 border-t border-gray-100">
                      <Link to="/insurance-request">
                        <Button variant="outline" className="text-medical-600 border-medical-200 hover:bg-medical-50">
                          {isAr ? 'تقديم طلب موافقة تأمين' : 'Submit Insurance Request'}
                        </Button>
                      </Link>
                    </div>
                  </>
                ) : (
                  <p className="text-gray-500 bg-gray-50 p-4 rounded-xl border border-gray-100">
                    {isAr ? 'هذا المركز لا يدعم التغطية التأمينية حالياً.' : 'This center does not support insurance coverage currently.'}
                  </p>
                )}
              </div>

              {/* Team Specialists & Technicians */}
              <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100">
                <h2 className="text-2xl font-bold mb-6 text-gray-900 flex items-center gap-3">
                  <User className="w-6 h-6 text-medical-600" />
                  {isAr ? 'الفريق الطبي' : 'Medical Team'}
                </h2>
                <div className="space-y-6">
                  {team.map((member, idx) => (
                    <div key={idx} className="flex flex-col sm:flex-row items-center sm:items-start gap-6 p-6 rounded-2xl bg-gray-50 border border-gray-100 hover:border-medical-200 transition-colors">
                      <img src={member.image} alt={member.name} className="w-24 h-24 rounded-full object-cover shadow-md" />
                      <div className="flex-grow text-center sm:text-start">
                        <h3 className="text-xl font-bold text-gray-900">{member.name}</h3>
                        <p className="text-medical-600 font-medium mb-4">{member.role}</p>
                        <div className="flex items-center justify-center sm:justify-start gap-2 text-sm text-gray-500">
                          <Users className="w-4 h-4" />
                          <span>{isAr ? 'يعاونه الفنيون:' : 'Assisted by:'}</span>
                          <span className="font-medium text-gray-700">{member.technicians.join('، ')}</span>
                        </div>
                      </div>
                      <div className="mt-4 sm:mt-0 self-center">
                        <Link to={`/booking?center=${center.id}&specialist=${encodeURIComponent(member.name)}`}>
                          <Button className="bg-gradient-to-l from-medical-600 to-medical-700 text-white shadow-lg shadow-medical-600/20 rounded-xl px-6">
                            {isAr ? 'احجز مع الطبيب' : 'Book with Doctor'}
                          </Button>
                        </Link>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

            </div>

            {/* Left Column: Services & Actions */}
            <div className="space-y-6">
              
              {/* Quick Actions */}
              <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100 sticky top-24">
                <h3 className="font-bold text-lg text-gray-900 mb-4">{isAr ? 'إجراء سريع' : 'Quick Actions'}</h3>
                <Link to={`/booking?center=${center.id}`}>
                  <Button className="w-full py-6 text-lg mb-3 bg-gradient-to-l from-medical-600 to-medical-700 text-white rounded-xl shadow-lg shadow-medical-600/20 hover:scale-[1.02] transition-transform">
                    {t('center_details.book_appointment')}
                    <Calendar className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
                <a href={`tel:${center.phone}`} className="block">
                  <Button variant="outline" className="w-full py-6 text-lg border-2 border-gray-200 text-gray-700 rounded-xl hover:bg-gray-50 hover:border-gray-300 transition-colors">
                    <Phone className="mr-2 h-5 w-5 rtl:ml-2 rtl:mr-0" />
                    {isAr ? 'اتصل بالمركز' : 'Call Center'}
                  </Button>
                </a>
              </div>

              {/* Services List */}
              <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100">
                <h3 className="font-bold text-lg text-gray-900 mb-4 border-b pb-3">{t('center_details.services')}</h3>
                {services.length > 0 ? (
                  <ul className="space-y-3">
                    {services.map((service, idx) => (
                      <li key={idx} className="flex items-center gap-3 p-2 hover:bg-gray-50 rounded-lg transition-colors">
                        <div className="w-2 h-2 rounded-full bg-medical-500" />
                        <span className="text-gray-700 font-medium">
                          {isAr ? service.name_ar : service.name_en}
                        </span>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-gray-500 text-sm">{isAr ? 'لا توجد خدمات محددة' : 'No specific services listed'}</p>
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