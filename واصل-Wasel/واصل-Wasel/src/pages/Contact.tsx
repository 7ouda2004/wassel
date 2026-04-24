
import React, { useEffect, useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { MapPin, Phone, Mail, Clock, Send, CheckCircle, MessageCircle, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { toast } from "sonner";
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const contactInfo = [
  {
    icon: Phone,
    title: 'الهاتف',
    subtitle: 'اتصل بنا على:',
    value: '+201119056895',
    href: 'tel:+201119056895',
    color: 'from-blue-500 to-blue-600'
  },
  {
    icon: Mail,
    title: 'البريد الإلكتروني',
    subtitle: 'راسلنا على:',
    value: 'mahmoudebrahim049@gmail.com',
    href: 'mailto:mahmoudebrahim049@gmail.com',
    color: 'from-purple-500 to-purple-600'
  },
  {
    icon: MapPin,
    title: 'العنوان',
    subtitle: 'المركز الرئيسي:',
    value: 'المنصورة، مصر',
    href: '#map',
    color: 'from-red-500 to-red-600'
  },
  {
    icon: Clock,
    title: 'ساعات العمل',
    subtitle: 'مواعيد العمل:',
    value: 'السبت - الخميس: 9ص - 6م',
    href: null,
    color: 'from-amber-500 to-amber-600'
  }
];

const Contact = () => {
  useEffect(() => {
    document.documentElement.dir = 'rtl';
    document.body.classList.add('font-cairo');
    window.scrollTo(0, 0);
  }, []);

  const formRef = useRef<HTMLFormElement>(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [sendVia, setSendVia] = useState<'email' | 'whatsapp'>('email');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    if (sendVia === 'whatsapp') {
      const msg = encodeURIComponent(
        `*رسالة جديدة من موقع واصل*\n\n` +
        `👤 *الاسم:* ${formData.name}\n` +
        `📧 *الإيميل:* ${formData.email}\n` +
        `📱 *الهاتف:* ${formData.phone}\n` +
        `📋 *الموضوع:* ${formData.subject}\n\n` +
        `💬 *الرسالة:*\n${formData.message}`
      );
      window.open(`https://wa.me/201119056895?text=${msg}`, '_blank');
      setIsSubmitting(false);
      setSubmitted(true);
      toast.success('تم فتح واتساب بالرسالة الجاهزة!');
    } else {
      // Send via email (mailto fallback + EmailJS when configured)
      try {
        // EmailJS integration (uncomment when installed):
        // await emailjs.sendForm('SERVICE_ID', 'TEMPLATE_ID', formRef.current!, 'PUBLIC_KEY');

        const subject = encodeURIComponent(formData.subject || 'رسالة من موقع واصل');
        const body = encodeURIComponent(
          `الاسم: ${formData.name}\nالهاتف: ${formData.phone}\nالإيميل: ${formData.email}\n\nالرسالة:\n${formData.message}`
        );
        window.open(`mailto:mahmoudebrahim049@gmail.com?subject=${subject}&body=${body}`, '_blank');

        setIsSubmitting(false);
        setSubmitted(true);
        toast.success('تم فتح برنامج الإيميل بالرسالة الجاهزة!');
      } catch {
        setIsSubmitting(false);
        toast.error('حدث خطأ. يرجى المحاولة مرة أخرى.');
      }
    }

    // Reset
    setFormData({ name: '', email: '', phone: '', subject: '', message: '' });
    setTimeout(() => setSubmitted(false), 5000);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-bl from-medical-50 via-white to-indigo-50">
          <motion.div animate={{ scale: [1, 1.2, 1], y: [0, -20, 0] }} transition={{ duration: 8, repeat: Infinity }} className="absolute top-20 right-20 w-72 h-72 rounded-full bg-medical-200/30 blur-3xl" />
          <motion.div animate={{ scale: [1, 1.3, 1] }} transition={{ duration: 10, repeat: Infinity, delay: 1 }} className="absolute bottom-20 left-20 w-96 h-96 rounded-full bg-indigo-200/20 blur-3xl" />
        </div>
        <div className="relative container mx-auto px-4 text-center">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
            <div className="inline-flex items-center gap-2 bg-medical-100 text-medical-700 px-4 py-2 rounded-full text-sm font-bold mb-4">
              <Mail className="w-4 h-4" />
              نحن هنا لمساعدتك
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              <span className="bg-gradient-to-l from-medical-600 to-indigo-600 bg-clip-text text-transparent">
                تواصل معنا
              </span>
            </h1>
            <p className="text-gray-500 text-lg max-w-2xl mx-auto">
              فريقنا مستعد للرد على جميع أسئلتك وتقديم المساعدة. تواصل معنا عبر الطريقة المناسبة لك.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Contact Cards */}
      <section className="py-6 -mt-10 relative z-10">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
            {contactInfo.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <motion.div whileHover={{ y: -5 }} className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100 hover:shadow-xl transition-all duration-300 h-full">
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${item.color} flex items-center justify-center mb-4 shadow-lg`}>
                    <item.icon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 mb-1">{item.title}</h3>
                  <p className="text-gray-500 text-sm mb-2">{item.subtitle}</p>
                  {item.href ? (
                    <a href={item.href} className="text-medical-600 hover:text-medical-800 font-medium text-sm transition-colors break-all">
                      {item.value}
                    </a>
                  ) : (
                    <p className="text-gray-800 font-medium text-sm">{item.value}</p>
                  )}
                </motion.div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form & Map */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="bg-white rounded-3xl shadow-xl overflow-hidden border border-gray-100">
              <div className="md:flex">
                {/* Form */}
                <div className="md:w-1/2 p-8 md:p-10">
                  <h2 className="text-2xl font-bold text-gray-900 mb-2">أرسل لنا رسالة</h2>
                  <p className="text-gray-500 text-sm mb-6">اختر طريقة الإرسال المفضلة لك</p>

                  {submitted ? (
                    <motion.div initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="text-center py-12">
                      <div className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-4">
                        <CheckCircle className="w-10 h-10 text-green-600" />
                      </div>
                      <h3 className="text-xl font-bold text-gray-900 mb-2">تم الإرسال بنجاح!</h3>
                      <p className="text-gray-600">شكرًا للتواصل معنا. سنرد عليك في أقرب وقت.</p>
                    </motion.div>
                  ) : (
                    <form ref={formRef} onSubmit={handleSubmit} className="space-y-4">
                      {/* Send Method Toggle */}
                      <div className="flex gap-3 mb-2">
                        <button type="button" onClick={() => setSendVia('email')}
                          className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl text-sm font-bold transition-all ${
                            sendVia === 'email' ? 'bg-blue-500 text-white shadow-lg shadow-blue-500/20' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                          }`}>
                          <Mail className="w-4 h-4" /> إيميل
                        </button>
                        <button type="button" onClick={() => setSendVia('whatsapp')}
                          className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl text-sm font-bold transition-all ${
                            sendVia === 'whatsapp' ? 'bg-green-500 text-white shadow-lg shadow-green-500/20' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                          }`}>
                          <MessageCircle className="w-4 h-4" /> واتساب
                        </button>
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="name" className="text-sm font-semibold text-gray-700">الاسم *</Label>
                          <Input id="name" name="name" value={formData.name} onChange={handleChange} placeholder="الاسم الكامل" required className="rounded-xl mt-1 h-11" />
                        </div>
                        <div>
                          <Label htmlFor="phone" className="text-sm font-semibold text-gray-700">الهاتف *</Label>
                          <Input id="phone" name="phone" value={formData.phone} onChange={handleChange} placeholder="رقم الهاتف" required className="rounded-xl mt-1 h-11" />
                        </div>
                      </div>

                      <div>
                        <Label htmlFor="email" className="text-sm font-semibold text-gray-700">البريد الإلكتروني</Label>
                        <Input id="email" name="email" type="email" value={formData.email} onChange={handleChange} placeholder="البريد الإلكتروني" className="rounded-xl mt-1 h-11" />
                      </div>

                      <div>
                        <Label htmlFor="subject" className="text-sm font-semibold text-gray-700">الموضوع *</Label>
                        <select id="subject" name="subject" value={formData.subject} onChange={handleChange} required
                          className="w-full rounded-xl border border-gray-200 p-2.5 h-11 focus:ring-2 focus:ring-medical-500 focus:border-transparent bg-white text-sm mt-1">
                          <option value="" disabled>اختر الموضوع</option>
                          <option value="استفسار عام">استفسار عام</option>
                          <option value="حجز موعد">حجز موعد</option>
                          <option value="استشارة فنية">استشارة فنية</option>
                          <option value="خدمة ما بعد البيع">خدمة ما بعد البيع</option>
                          <option value="شكوى أو اقتراح">شكوى أو اقتراح</option>
                          <option value="أخرى">أخرى</option>
                        </select>
                      </div>

                      <div>
                        <Label htmlFor="message" className="text-sm font-semibold text-gray-700">الرسالة *</Label>
                        <Textarea id="message" name="message" value={formData.message} onChange={handleChange} placeholder="اكتب رسالتك هنا..." rows={4} required className="rounded-xl mt-1 resize-none" />
                      </div>

                      <Button type="submit" disabled={isSubmitting}
                        className={`w-full rounded-xl py-3 text-base font-bold shadow-xl ${
                          sendVia === 'whatsapp'
                            ? 'bg-gradient-to-l from-green-500 to-green-600 shadow-green-500/20'
                            : 'bg-gradient-to-l from-blue-500 to-blue-600 shadow-blue-500/20'
                        }`}>
                        {isSubmitting ? (
                          <span className="flex items-center justify-center gap-2">
                            <svg className="animate-spin w-5 h-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                            </svg>
                            جاري الإرسال...
                          </span>
                        ) : (
                          <span className="flex items-center justify-center gap-2">
                            {sendVia === 'whatsapp' ? <MessageCircle className="w-5 h-5" /> : <Send className="w-5 h-5" />}
                            {sendVia === 'whatsapp' ? 'إرسال عبر واتساب' : 'إرسال عبر الإيميل'}
                          </span>
                        )}
                      </Button>
                    </form>
                  )}
                </div>

                {/* Map */}
                <div className="md:w-1/2 min-h-[400px]" id="map">
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3453.2881743856403!2d31.195894275777928!3d30.059242474992!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14584132d6eb5851%3A0xb19c7600694af9c5!2z2KfZhNmF2YfZhtiv2LPZitmG2Iwg2KfZhNis2YrYstip!5e0!3m2!1sar!2seg!4v1708440655752!5m2!1sar!2seg"
                    width="100%"
                    height="100%"
                    style={{ border: 0, minHeight: '400px' }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title="موقع المركز الرئيسي"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* WhatsApp CTA */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-3xl mx-auto"
          >
            <div className="bg-gradient-to-l from-green-500 to-green-600 rounded-3xl p-10 text-center shadow-2xl shadow-green-500/20 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 rounded-full bg-white/5 -translate-y-1/2 translate-x-1/2" />
              <div className="relative z-10">
                <div className="w-16 h-16 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center mx-auto mb-4">
                  <MessageCircle className="w-8 h-8 text-white" />
                </div>
                <h2 className="text-3xl font-bold text-white mb-3">تواصل معنا عبر واتساب</h2>
                <p className="text-white/80 text-lg mb-6 max-w-lg mx-auto">
                  للحصول على استجابة فورية، تواصل معنا مباشرة عبر واتساب. متاحون للرد على استفساراتك.
                </p>
                <a href="https://wa.me/201119056895" target="_blank" rel="noopener noreferrer">
                  <Button className="bg-white text-green-600 hover:bg-green-50 px-8 py-3 rounded-xl text-lg font-bold shadow-xl">
                    <MessageCircle className="w-5 h-5 ml-2" />
                    فتح محادثة واتساب
                  </Button>
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Contact;
