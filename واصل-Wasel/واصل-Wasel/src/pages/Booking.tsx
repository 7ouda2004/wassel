import React, { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useSearchParams, useNavigate, useLocation } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { toast } from 'sonner';
import { format } from 'date-fns';
import {
  CalendarDays, Clock, User, Phone, Mail, FileText, Upload, X,
  MessageCircle, Send, CheckCircle2, ArrowRight, ArrowLeft,
  Camera, MapPin, Stethoscope, Info, Building2, UserCheck
} from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useAuth } from '@/providers/auth-provider';
import { bookingsService } from '@/services/bookings.service';

// EmailJS - سنستخدمه لإرسال الإيميل
// import emailjs from '@emailjs/browser';

const appointmentTypes = [
  { value: 'معاينة', label: 'معاينة', desc: 'الكشف الأولي وتقييم الحالة', icon: Stethoscope, color: 'from-blue-500 to-blue-600' },
  { value: 'قياس', label: 'قياس', desc: 'أخذ المقاسات وتحديد المواصفات', icon: FileText, color: 'from-purple-500 to-purple-600' },
  { value: 'تركيب', label: 'تركيب', desc: 'تجربة وتركيب الجهاز', icon: CheckCircle2, color: 'from-teal-500 to-teal-600' },
  { value: 'متابعة', label: 'متابعة', desc: 'فحص دوري للتأكد من الكفاءة', icon: CalendarDays, color: 'from-amber-500 to-amber-600' },
  { value: 'صيانة', label: 'صيانة', desc: 'إصلاح أو تعديل الجهاز', icon: Info, color: 'from-red-500 to-red-600' },
];

const serviceTypes = [
  'طرف صناعي تحت الركبة', 'طرف صناعي فوق الركبة', 'طرف صناعي يد',
  'جبيرة AFO', 'جبيرة KAFO', 'جبيرة عمود فقري', 'جبيرة يد/رسغ',
  'حذاء طبي', 'نعل طبي', 'أخرى'
];

const governorates = [
  'القاهرة', 'الجيزة', 'الإسكندرية', 'الدقهلية', 'المنصورة', 'الشرقية',
  'الغربية', 'كفر الشيخ', 'البحيرة', 'المنوفية', 'القليوبية', 'الفيوم',
  'بني سويف', 'المنيا', 'أسيوط', 'سوهاج', 'قنا', 'الأقصر', 'أسوان',
  'دمياط', 'بورسعيد', 'الإسماعيلية', 'السويس', 'شمال سيناء', 'جنوب سيناء',
  'البحر الأحمر', 'الوادي الجديد', 'مطروح'
];

const Booking = () => {
  const { t, i18n } = useTranslation();
  const isRtl = i18n.dir() === 'rtl';
  const isAr = i18n.language === 'ar';
  const [searchParams] = useSearchParams();

  // Pre-selected center/specialist from URL
  const selectedCenter = searchParams.get('centerName') || '';
  const selectedCenterId = searchParams.get('center') || '';
  const selectedSpecialist = searchParams.get('specialist') || '';

  const translatedTypes = t('booking.appointment_types', { returnObjects: true }) as any[];
  const localizedAppointmentTypes = appointmentTypes.map((type, index) => {
    const translated = Array.isArray(translatedTypes) ? translatedTypes[index] : null;
    return {
      ...type,
      label: translated?.label || type.label,
      desc: translated?.desc || type.desc,
      value: translated?.value || type.value,
    };
  });
  
  const translatedServiceTypes = t('booking.service_types', { returnObjects: true }) as string[];
  const localizedServiceTypes = Array.isArray(translatedServiceTypes) ? translatedServiceTypes : serviceTypes;
  
  const translatedGovernorates = t('booking.governorates', { returnObjects: true }) as string[];
  const localizedGovernorates = Array.isArray(translatedGovernorates) ? translatedGovernorates : governorates;

  const { user, isAuthenticated, isLoading } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    // If not authenticated, redirect to login
    if (!isLoading && !isAuthenticated) {
      navigate('/login', { state: { from: location } });
    }
  }, [isAuthenticated, isLoading, navigate, location]);

  const formRef = useRef<HTMLFormElement>(null);
  const [step, setStep] = useState(1);
  const [sendMethod, setSendMethod] = useState<'whatsapp' | 'email'>('whatsapp');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [files, setFiles] = useState<File[]>([]);
  const [previews, setPreviews] = useState<string[]>([]);

  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    age: '',
    governorate: selectedCenter || '',
    date: format(new Date(), 'yyyy-MM-dd'),
    time: '09:00',
    type: 'معاينة',
    service: '',
    notes: ''
  });

  useEffect(() => {
    if (localizedAppointmentTypes.length > 0 && !formData.type) {
      setFormData(prev => ({ ...prev, type: localizedAppointmentTypes[0].value }));
    }
  }, [localizedAppointmentTypes]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const newFiles = Array.from(e.target.files);
      const totalFiles = [...files, ...newFiles].slice(0, 5); // max 5 files
      setFiles(totalFiles);

      // Generate previews
      const newPreviews: string[] = [];
      totalFiles.forEach(file => {
        if (file.type.startsWith('image/')) {
          const reader = new FileReader();
          reader.onload = (ev) => {
            newPreviews.push(ev.target?.result as string);
            if (newPreviews.length === totalFiles.length) {
              setPreviews([...newPreviews]);
            }
          };
          reader.readAsDataURL(file);
        } else {
          newPreviews.push('');
          if (newPreviews.length === totalFiles.length) {
            setPreviews([...newPreviews]);
          }
        }
      });
    }
  };

  const removeFile = (index: number) => {
    setFiles(prev => prev.filter((_, i) => i !== index));
    setPreviews(prev => prev.filter((_, i) => i !== index));
  };

  const buildWhatsAppMessage = () => {
    const selectedType = appointmentTypes.find(t => t.value === formData.type);
    let msg = `*${t('booking.whatsapp_msg.header')}*\n\n`;
    if (selectedCenter) msg += ` *${isAr ? 'المركز' : 'Center'}:* ${decodeURIComponent(selectedCenter)}\n`;
    if (selectedSpecialist) msg += ` *${isAr ? 'الأخصائي' : 'Specialist'}:* ${decodeURIComponent(selectedSpecialist)}\n`;
    msg += ` *${t('booking.whatsapp_msg.name')}:* ${formData.name}\n`;
    msg += ` *${t('booking.whatsapp_msg.phone')}:* ${formData.phone}\n`;
    if (formData.email) msg += ` *${t('booking.whatsapp_msg.email')}:* ${formData.email}\n`;
    if (formData.age) msg += ` *${t('booking.whatsapp_msg.age')}:* ${formData.age}\n`;
    if (formData.governorate) msg += ` *${t('booking.whatsapp_msg.governorate')}:* ${formData.governorate}\n`;
    msg += `\n *${t('booking.whatsapp_msg.date')}:* ${formData.date}\n`;
    msg += ` *${t('booking.whatsapp_msg.time')}:* ${formData.time}\n`;
    msg += ` *${t('booking.whatsapp_msg.type')}:* ${selectedType?.label} - ${selectedType?.desc}\n`;
    if (formData.service) msg += ` *${t('booking.whatsapp_msg.service')}:* ${formData.service}\n`;
    if (formData.notes) msg += `\n *${t('booking.whatsapp_msg.notes')}:*\n${formData.notes}\n`;
    if (files.length > 0) msg += `\n *${t('booking.whatsapp_msg.attachments')}:* ${files.length} ${t('booking.whatsapp_msg.files_note')}`;
    return encodeURIComponent(msg);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Save booking to DB if user is authenticated
      if (user) {
        await bookingsService.create({
          user_id: user.id,
          center_id: selectedCenterId || 'wasel-center', // Default to a Wasel center if none selected
          booking_date: formData.date,
          booking_time: formData.time,
          appointment_type: formData.type,
          service_type: formData.service,
          notes: formData.notes,
          patient_name: formData.name,
          patient_phone: formData.phone,
          patient_email: formData.email,
        }).catch(err => {
          console.error("Failed to save booking to database", err);
          // Don't fail the whole process if DB fails
        });
      }

      if (sendMethod === 'whatsapp') {
        const message = buildWhatsAppMessage();
        window.open(`https://wa.me/201119056895?text=${message}`, '_blank');
        setIsSubmitting(false);
        setSubmitted(true);
        toast.success(t('booking.toasts.whatsapp_success'));
      } else {
        // EmailJS integration
        // For now, simulate email sending
        await new Promise(resolve => setTimeout(resolve, 2000));

        // Also open mailto as fallback
        const subject = encodeURIComponent(`${t('booking.email_subject')} - ${formData.name}`);
        const body = encodeURIComponent(
          `${t('booking.email_subject')}\n\n${t('booking.whatsapp_msg.name')}: ${formData.name}\n${t('booking.whatsapp_msg.phone')}: ${formData.phone}\n${t('booking.whatsapp_msg.email')}: ${formData.email}\n${t('booking.whatsapp_msg.age')}: ${formData.age}\n${t('booking.whatsapp_msg.governorate')}: ${formData.governorate}\n${t('booking.whatsapp_msg.date')}: ${formData.date}\n${t('booking.whatsapp_msg.time')}: ${formData.time}\n${t('booking.whatsapp_msg.type')}: ${formData.type}\n${t('booking.whatsapp_msg.service')}: ${formData.service}\n${t('booking.whatsapp_msg.notes')}: ${formData.notes}`
        );
        window.open(`mailto:mahmoudebrahim049@gmail.com?subject=${subject}&body=${body}`, '_blank');

        setIsSubmitting(false);
        setSubmitted(true);
        toast.success(t('booking.toasts.email_success'));
      }
    } catch (error) {
      setIsSubmitting(false);
      toast.error(t('booking.toasts.error'));
    }
  };

  const validateStep = (s: number): boolean => {
    if (s === 1) {
      return !!(formData.name && formData.phone);
    }
    if (s === 2) {
      return !!(formData.date && formData.time && formData.type);
    }
    return true;
  };

  const nextStep = () => {
    if (validateStep(step)) {
      setStep(prev => Math.min(prev + 1, 3));
    } else {
      toast.error(t('booking.toasts.fill_fields'));
    }
  };

  const prevStep = () => setStep(prev => Math.max(prev - 1, 1));

  if (submitted) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <div className="flex-grow flex items-center justify-center bg-gradient-to-b from-green-50 to-white py-20">
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: 'spring', stiffness: 200 }}
            className="text-center max-w-lg mx-auto px-6"
          >
            <div className="w-24 h-24 rounded-full bg-gradient-to-br from-green-400 to-emerald-600 flex items-center justify-center mx-auto mb-6 shadow-2xl shadow-green-500/30">
              <CheckCircle2 className="w-12 h-12 text-white" />
            </div>
            <h2 className="text-3xl font-bold text-gray-900 mb-4">{t('booking.success.title')}</h2>
            <p className="text-gray-600 text-lg mb-2">
              {sendMethod === 'whatsapp'
                ? t('booking.success.whatsapp_desc')
                : t('booking.success.email_desc')
              }
            </p>
            <p className="text-gray-500 text-sm mb-8">{t('booking.success.footer')}</p>
            <Button
              onClick={() => { setSubmitted(false); setStep(1); setFiles([]); setPreviews([]); }}
              className="bg-gradient-to-l from-medical-600 to-medical-700 text-white px-8 py-3 rounded-xl text-lg"
            >
              {t('booking.success.book_another')}
            </Button>
          </motion.div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      {/* Hero */}
      <section className="relative py-16 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-bl from-medical-50 via-white to-blue-50">
          <motion.div animate={{ scale: [1, 1.2, 1] }} transition={{ duration: 8, repeat: Infinity }} className="absolute top-10 right-20 w-72 h-72 rounded-full bg-medical-200/30 blur-3xl" />
          <motion.div animate={{ scale: [1, 1.3, 1] }} transition={{ duration: 10, repeat: Infinity, delay: 1 }} className="absolute bottom-10 left-20 w-64 h-64 rounded-full bg-teal-200/20 blur-3xl" />
        </div>
        <div className="relative container mx-auto px-4 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <div className="inline-flex items-center gap-2 bg-medical-100 text-medical-700 px-4 py-2 rounded-full text-sm font-bold mb-4">
              <CalendarDays className="w-4 h-4" />
              {t('booking.badge')}
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              <span className="bg-gradient-to-l from-medical-600 to-teal-600 bg-clip-text text-transparent">
                {t('booking.title')}
              </span>
            </h1>
            <p className="text-gray-500 text-lg max-w-xl mx-auto">
              {t('booking.desc')}
            </p>

            {/* Center/Specialist Selection Banner */}
            {(selectedCenter || selectedSpecialist) && (
              <div className="mt-6 inline-flex flex-col sm:flex-row gap-3">
                {selectedCenter && (
                  <div className="flex items-center gap-2 bg-medical-100 text-medical-700 px-5 py-2.5 rounded-full text-sm font-bold border border-medical-200">
                    <Building2 className="w-4 h-4" />
                    {isAr ? 'المركز:' : 'Center:'} {decodeURIComponent(selectedCenter)}
                  </div>
                )}
                {selectedSpecialist && (
                  <div className="flex items-center gap-2 bg-teal-100 text-teal-700 px-5 py-2.5 rounded-full text-sm font-bold border border-teal-200">
                    <UserCheck className="w-4 h-4" />
                    {isAr ? 'الأخصائي:' : 'Specialist:'} {decodeURIComponent(selectedSpecialist)}
                  </div>
                )}
              </div>
            )}
          </motion.div>
        </div>
      </section>

      {/* Booking Form */}
      <section className="pb-20 -mt-4">
        <div className="container mx-auto px-4 max-w-3xl">
          {/* Step Indicator */}
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="flex items-center justify-center gap-0 mb-10">
            {[1, 2, 3].map((s, i) => (
              <React.Fragment key={s}>
                <button
                  onClick={() => s < step && setStep(s)}
                  className={`relative w-12 h-12 rounded-xl flex items-center justify-center text-base font-bold transition-all duration-300 ${step >= s
                    ? 'bg-gradient-to-br from-medical-500 to-medical-700 text-white shadow-lg shadow-medical-500/30'
                    : 'bg-gray-100 text-gray-400 border-2 border-gray-200'
                    }`}
                >
                  {step > s ? <CheckCircle2 className="w-5 h-5" /> : s}
                </button>
                {i < 2 && (
                  <div className={`w-16 h-1 rounded-full mx-2 transition-all duration-500 ${step > s ? 'bg-medical-500' : 'bg-gray-200'}`} />
                )}
              </React.Fragment>
            ))}
          </motion.div>

          <form ref={formRef} onSubmit={handleSubmit}>
            <div className="bg-white rounded-3xl shadow-xl border border-gray-100 p-8 md:p-10">
              <AnimatePresence mode="wait">
                {/* Step 1: Personal Info */}
                {step === 1 && (
                  <motion.div key="step1" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.3 }}>
                    <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                      <User className="w-6 h-6 text-medical-600" />
                      {t('booking.steps.personal.title')}
                    </h2>

                    <div className="space-y-5">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                        <div>
                          <Label htmlFor="name" className="text-sm font-semibold text-gray-700 mb-1 block">{t('booking.steps.personal.name_label')} *</Label>
                          <Input id="name" name="name" value={formData.name} onChange={handleInputChange} placeholder={t('booking.steps.personal.name_placeholder')} required className="rounded-xl border-gray-200 focus:border-medical-500 h-12" />
                        </div>
                        <div>
                          <Label htmlFor="phone" className="text-sm font-semibold text-gray-700 mb-1 block">{t('booking.steps.personal.phone_label')} *</Label>
                          <Input id="phone" name="phone" value={formData.phone} onChange={handleInputChange} placeholder="01xxxxxxxxx" required className="rounded-xl border-gray-200 focus:border-medical-500 h-12" />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                        <div>
                          <Label htmlFor="email" className="text-sm font-semibold text-gray-700 mb-1 block">{t('booking.steps.personal.email_label')}</Label>
                          <Input id="email" name="email" type="email" value={formData.email} onChange={handleInputChange} placeholder="example@mail.com" className="rounded-xl border-gray-200 focus:border-medical-500 h-12" />
                        </div>
                        <div>
                          <Label htmlFor="age" className="text-sm font-semibold text-gray-700 mb-1 block">{t('booking.steps.personal.age_label')}</Label>
                          <Input id="age" name="age" type="number" min="1" max="120" value={formData.age} onChange={handleInputChange} placeholder={t('booking.steps.personal.age_label')} className="rounded-xl border-gray-200 focus:border-medical-500 h-12" />
                        </div>
                      </div>

                      <div>
                        <Label htmlFor="governorate" className="text-sm font-semibold text-gray-700 mb-1 block">{t('booking.steps.personal.governorate_label')}</Label>
                        <select id="governorate" name="governorate" value={formData.governorate} onChange={handleInputChange} className="w-full rounded-xl border border-gray-200 p-3 h-12 focus:ring-2 focus:ring-medical-500 focus:border-transparent bg-white text-sm">
                          <option value="">{t('booking.steps.personal.governorate_placeholder')}</option>
                          {localizedGovernorates.map(g => <option key={g} value={g}>{g}</option>)}
                        </select>
                      </div>
                    </div>
                  </motion.div>
                )}

                {/* Step 2: Appointment Details */}
                {step === 2 && (
                  <motion.div key="step2" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.3 }}>
                    <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                      <CalendarDays className="w-6 h-6 text-medical-600" />
                      {t('booking.steps.details.title')}
                    </h2>

                    <div className="space-y-6">
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="date" className="text-sm font-semibold text-gray-700 mb-1 block">{t('booking.steps.details.date_label')} *</Label>
                          <Input id="date" name="date" type="date" value={formData.date} onChange={handleInputChange} required className="rounded-xl border-gray-200 h-12" />
                        </div>
                        <div>
                          <Label htmlFor="time" className="text-sm font-semibold text-gray-700 mb-1 block">{t('booking.steps.details.time_label')} *</Label>
                          <Input id="time" name="time" type="time" value={formData.time} onChange={handleInputChange} required className="rounded-xl border-gray-200 h-12" />
                        </div>
                      </div>

                      {/* Appointment Type */}
                      <div>
                        <Label className="text-sm font-semibold text-gray-700 mb-3 block">{t('booking.steps.details.type_label')} *</Label>
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                          {localizedAppointmentTypes.map(type => (
                            <button
                              key={type.value}
                              type="button"
                              onClick={() => setFormData(prev => ({ ...prev, type: type.value }))}
                              className={`relative p-4 rounded-xl border-2 transition-all duration-300 text-right ${formData.type === type.value
                                ? 'border-medical-500 bg-medical-50 shadow-lg shadow-medical-500/10'
                                : 'border-gray-200 hover:border-gray-300 bg-white'
                                }`}
                            >
                              <div className={`w-8 h-8 rounded-lg bg-gradient-to-br ${type.color} flex items-center justify-center mb-2`}>
                                <type.icon className="w-4 h-4 text-white" />
                              </div>
                              <p className="font-bold text-sm text-gray-900 text-start">{type.label}</p>
                              <p className="text-xs text-gray-500 mt-0.5 text-start">{type.desc}</p>
                              {formData.type === type.value && (
                                <div className="absolute top-2 left-2 w-5 h-5 rounded-full bg-medical-500 flex items-center justify-center">
                                  <CheckCircle2 className="w-3.5 h-3.5 text-white" />
                                </div>
                              )}
                            </button>
                          ))}
                        </div>
                      </div>

                      {/* Service Type */}
                      <div>
                        <Label htmlFor="service" className="text-sm font-semibold text-gray-700 mb-1 block">{t('booking.steps.details.service_label')}</Label>
                        <select id="service" name="service" value={formData.service} onChange={handleInputChange} className="w-full rounded-xl border border-gray-200 p-3 h-12 focus:ring-2 focus:ring-medical-500 focus:border-transparent bg-white text-sm">
                          <option value="">{t('booking.steps.details.service_placeholder')}</option>
                          {localizedServiceTypes.map(s => <option key={s} value={s}>{s}</option>)}
                        </select>
                      </div>
                    </div>
                  </motion.div>
                )}

                {/* Step 3: Files & Method */}
                {step === 3 && (
                  <motion.div key="step3" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.3 }}>
                    <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                      <Send className="w-6 h-6 text-medical-600" />
                      {t('booking.steps.files.title')}
                    </h2>

                    <div className="space-y-6">
                      {/* File Upload */}
                      <div>
                        <Label className="text-sm font-semibold text-gray-700 mb-2 block">{t('booking.steps.files.upload_label')}</Label>
                        <div className="border-2 border-dashed border-gray-300 rounded-2xl p-6 text-center hover:border-medical-400 transition-colors">
                          <input
                            type="file"
                            accept="image/*,.pdf,.doc,.docx"
                            multiple
                            onChange={handleFileChange}
                            className="hidden"
                            id="file-upload"
                          />
                          <label htmlFor="file-upload" className="cursor-pointer">
                            <div className="w-14 h-14 rounded-2xl bg-medical-100 flex items-center justify-center mx-auto mb-3">
                              <Camera className="w-7 h-7 text-medical-600" />
                            </div>
                            <p className="text-gray-700 font-semibold">{t('booking.steps.files.upload_placeholder')}</p>
                            <p className="text-gray-400 text-sm mt-1">PNG, JPG, PDF {t('booking.steps.files.max_size')}</p>
                          </label>
                        </div>

                        {/* File Previews */}
                        {files.length > 0 && (
                          <div className="grid grid-cols-3 md:grid-cols-5 gap-3 mt-4">
                            {files.map((file, idx) => (
                              <div key={idx} className="relative group">
                                {previews[idx] ? (
                                  <img src={previews[idx]} alt={file.name} className="w-full h-20 object-cover rounded-xl border border-gray-200" />
                                ) : (
                                  <div className="w-full h-20 bg-gray-100 rounded-xl flex items-center justify-center border border-gray-200">
                                    <FileText className="w-6 h-6 text-gray-400" />
                                  </div>
                                )}
                                <button
                                  type="button"
                                  onClick={() => removeFile(idx)}
                                  className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-red-500 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity shadow-lg"
                                >
                                  <X className="w-3 h-3" />
                                </button>
                                <p className="text-xs text-gray-500 mt-1 truncate">{file.name}</p>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>

                      {/* Notes */}
                      <div>
                        <Label htmlFor="notes" className="text-sm font-semibold text-gray-700 mb-1 block">{t('booking.steps.files.notes_label')}</Label>
                        <Textarea id="notes" name="notes" value={formData.notes} onChange={handleInputChange} rows={3} placeholder={t('booking.steps.files.notes_placeholder')} className="rounded-xl border-gray-200 resize-none" />
                      </div>

                      {/* Send Method */}
                      <div>
                        <Label className="text-sm font-semibold text-gray-700 mb-3 block">{t('booking.steps.files.method_label')} *</Label>
                        <div className="grid grid-cols-2 gap-4">
                          <button
                            type="button"
                            onClick={() => setSendMethod('whatsapp')}
                            className={`p-5 rounded-2xl border-2 transition-all duration-300 text-center ${sendMethod === 'whatsapp'
                              ? 'border-green-500 bg-green-50 shadow-lg shadow-green-500/10'
                              : 'border-gray-200 hover:border-gray-300'
                              }`}
                          >
                            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-green-400 to-green-600 flex items-center justify-center mx-auto mb-3 shadow-lg shadow-green-500/20">
                              <MessageCircle className="w-6 h-6 text-white" />
                            </div>
                            <p className="font-bold text-gray-900">{t('booking.methods.whatsapp.title')}</p>
                            <p className="text-xs text-gray-500 mt-1">{t('booking.methods.whatsapp.desc')}</p>
                          </button>

                          <button
                            type="button"
                            onClick={() => setSendMethod('email')}
                            className={`p-5 rounded-2xl border-2 transition-all duration-300 text-center ${sendMethod === 'email'
                              ? 'border-blue-500 bg-blue-50 shadow-lg shadow-blue-500/10'
                              : 'border-gray-200 hover:border-gray-300'
                              }`}
                          >
                            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center mx-auto mb-3 shadow-lg shadow-blue-500/20">
                              <Mail className="w-6 h-6 text-white" />
                            </div>
                            <p className="font-bold text-gray-900">{t('booking.methods.email.title')}</p>
                            <p className="text-xs text-gray-500 mt-1">{t('booking.methods.email.desc')}</p>
                          </button>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Navigation Buttons */}
              <div className="flex items-center justify-between mt-8 pt-6 border-t border-gray-100">
                {step > 1 ? (
                  <Button type="button" variant="outline" onClick={prevStep} className="flex items-center gap-2 rounded-xl px-6 py-3 border-2 border-gray-200">
                    <ArrowRight className={`w-4 h-4 ${isRtl ? '' : 'rotate-180'}`} />
                    {t('booking.nav.prev')}
                  </Button>
                ) : <div />}

                {step < 3 ? (
                  <Button type="button" onClick={nextStep} className="flex items-center gap-2 bg-gradient-to-l from-medical-600 to-medical-700 text-white rounded-xl px-8 py-3 shadow-lg shadow-medical-600/20">
                    {t('booking.nav.next')}
                    <ArrowLeft className={`w-4 h-4 ${isRtl ? '' : 'rotate-180'}`} />
                  </Button>
                ) : (
                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className={`flex items-center gap-2 rounded-xl px-8 py-3 shadow-xl text-white text-base font-bold ${sendMethod === 'whatsapp'
                      ? 'bg-gradient-to-l from-green-500 to-green-600 shadow-green-500/20'
                      : 'bg-gradient-to-l from-blue-500 to-blue-600 shadow-blue-500/20'
                      }`}
                  >
                    {isSubmitting ? (
                      <>
                        <svg className="animate-spin w-5 h-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                        </svg>
                        {t('booking.nav.sending')}
                      </>
                    ) : sendMethod === 'whatsapp' ? (
                      <>
                        <MessageCircle className="w-5 h-5" />
                        {t('booking.nav.send_whatsapp')}
                      </>
                    ) : (
                      <>
                        <Send className="w-5 h-5" />
                        {t('booking.nav.send_email')}
                      </>
                    )}
                  </Button>
                )}
              </div>
            </div>
          </form>

          {/* Info Note */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="mt-8 bg-amber-50 border border-amber-200 rounded-2xl p-6 flex items-start gap-4"
          >
            <div className="w-10 h-10 rounded-xl bg-amber-100 flex items-center justify-center flex-shrink-0">
              <Info className="w-5 h-5 text-amber-600" />
            </div>
            <div>
              <h4 className="font-bold text-gray-900 mb-1">{t('booking.note.title')}</h4>
              <p className="text-gray-600 text-sm leading-relaxed">
                {t('booking.note.desc')}
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Booking;