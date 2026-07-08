
import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { MapPin, Phone, Mail, Clock, Send, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { toast } from "sonner";
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const Contact = () => {
  useEffect(() => {
    document.documentElement.dir = 'rtl';
    document.body.classList.add('font-cairo');
    window.scrollTo(0, 0);
  }, []);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
      toast.success('تم إرسال رسالتك بنجاح، سنتواصل معك قريبًا');
      
      // Reset form
      setFormData({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: ''
      });
      
      // Reset submitted state after some time
      setTimeout(() => setSubmitted(false), 3000);
    }, 1500);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-b from-medical-100 to-white overflow-hidden">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-block oval-header">
              <span>تواصل معنا</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              نحن هنا لمساعدتك
            </h1>
            <p className="text-xl text-gray-600 mb-8">
              سواء كنت تبحث عن معلومات أو ترغب في حجز موعد أو لديك استفسارات،
              فريقنا مستعد للرد على جميع أسئلتك وتقديم المساعدة اللازمة.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Information */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <motion.div 
              className="bg-white rounded-lg shadow-md p-6 border border-gray-100"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
            >
              <div className="h-12 w-12 rounded-full bg-medical-100 flex items-center justify-center mb-4">
                <Phone className="h-6 w-6 text-medical-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">الهاتف</h3>
              <p className="text-gray-600 mb-3">اتصل بنا على:</p>
              <a href="tel:+201119056895" className="text-medical-600 hover:text-medical-700 font-medium">
                +201119056895
              </a>
            </motion.div>
            
            <motion.div 
              className="bg-white rounded-lg shadow-md p-6 border border-gray-100"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              viewport={{ once: true }}
            >
              <div className="h-12 w-12 rounded-full bg-medical-100 flex items-center justify-center mb-4">
                <Mail className="h-6 w-6 text-medical-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">البريد الإلكتروني</h3>
              <p className="text-gray-600 mb-3">راسلنا على:</p>
              <a href="mailto:mahmoudebrahim049@gmail.com" className="text-medical-600 hover:text-medical-700 font-medium break-all">
                mahmoudebrahim049@gmail.com
              </a>
            </motion.div>
            
            <motion.div 
              className="bg-white rounded-lg shadow-md p-6 border border-gray-100"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <div className="h-12 w-12 rounded-full bg-medical-100 flex items-center justify-center mb-4">
                <MapPin className="h-6 w-6 text-medical-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">العنوان</h3>
              <p className="text-gray-600 mb-3">المركز الرئيسي:</p>
              <p className="text-gray-800">
                15 شارع جامعة الدول العربية،<br />
                المهندسين، القاهرة
              </p>
            </motion.div>
            
            <motion.div 
              className="bg-white rounded-lg shadow-md p-6 border border-gray-100"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              viewport={{ once: true }}
            >
              <div className="h-12 w-12 rounded-full bg-medical-100 flex items-center justify-center mb-4">
                <Clock className="h-6 w-6 text-medical-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">ساعات العمل</h3>
              <p className="text-gray-600 mb-3">مواعيد العمل:</p>
              <ul className="text-gray-800 space-y-1">
                <li>السبت - الخميس: 9 صباحًا - 6 مساءً</li>
                <li>الجمعة: مغلق</li>
              </ul>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Contact Form & Map */}
      <section className="py-20 bg-medical-50">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="bg-white rounded-xl shadow-md overflow-hidden">
              <div className="md:flex">
                <div className="md:w-1/2 p-8">
                  <h2 className="text-2xl font-bold mb-6">أرسل لنا رسالة</h2>
                  
                  {submitted ? (
                    <div className="text-center py-8">
                      <div className="mx-auto w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mb-4">
                        <CheckCircle className="h-8 w-8 text-green-600" />
                      </div>
                      <h3 className="text-xl font-semibold mb-2">تم إرسال رسالتك بنجاح!</h3>
                      <p className="text-gray-600">
                        شكرًا للتواصل معنا. سيقوم فريقنا بالرد عليك في أقرب وقت ممكن.
                      </p>
                    </div>
                  ) : (
                    <form onSubmit={handleSubmit} className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="name">الاسم</Label>
                          <Input 
                            id="name"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            placeholder="الاسم الكامل"
                            required
                          />
                        </div>
                        
                        <div className="space-y-2">
                          <Label htmlFor="phone">رقم الهاتف</Label>
                          <Input 
                            id="phone"
                            name="phone"
                            value={formData.phone}
                            onChange={handleChange}
                            placeholder="رقم الهاتف"
                            required
                          />
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="email">البريد الإلكتروني</Label>
                        <Input 
                          id="email"
                          name="email"
                          type="email"
                          value={formData.email}
                          onChange={handleChange}
                          placeholder="البريد الإلكتروني"
                          required
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="subject">الموضوع</Label>
                        <select
                          id="subject"
                          name="subject"
                          value={formData.subject}
                          onChange={handleChange}
                          className="w-full rounded-md border border-gray-300 p-2 focus:ring-2 focus:ring-medical-500 focus:border-transparent"
                          required
                        >
                          <option value="" disabled>اختر الموضوع</option>
                          <option value="استفسار عام">استفسار عام</option>
                          <option value="حجز موعد">حجز موعد</option>
                          <option value="استشارة فنية">استشارة فنية</option>
                          <option value="خدمة ما بعد البيع">خدمة ما بعد البيع</option>
                          <option value="أخرى">أخرى</option>
                        </select>
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="message">الرسالة</Label>
                        <Textarea 
                          id="message"
                          name="message"
                          value={formData.message}
                          onChange={handleChange}
                          placeholder="اكتب رسالتك هنا..."
                          rows={5}
                          required
                        />
                      </div>
                      
                      <Button type="submit" className="w-full medical-btn" disabled={isSubmitting}>
                        {isSubmitting ? (
                          <span className="flex items-center">
                            <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                            جاري الإرسال...
                          </span>
                        ) : (
                          <span className="flex items-center">
                            <Send className="h-5 w-5 mr-2" />
                            إرسال الرسالة
                          </span>
                        )}
                      </Button>
                    </form>
                  )}
                </div>
                
                <div className="md:w-1/2">
                  <div className="h-full">
                    <iframe 
                      src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3453.2881743856403!2d31.195894275777928!3d30.059242474992!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14584132d6eb5851%3A0xb19c7600694af9c5!2z2KfZhNmF2YfZhtiv2LPZitmG2Iwg2KfZhNis2YrYstip!5e0!3m2!1sar!2seg!4v1708440655752!5m2!1sar!2seg" 
                      width="100%" 
                      height="100%" 
                      style={{ border: 0 }} 
                      allowFullScreen 
                      loading="lazy" 
                      referrerPolicy="no-referrer-when-downgrade"
                      title="موقع المركز الرئيسي"
                    ></iframe>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* WhatsApp Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <div className="h-20 w-20 mx-auto mb-6">
              <img 
                src="https://upload.wikimedia.org/wikipedia/commons/thumb/6/6b/WhatsApp.svg/1200px-WhatsApp.svg.png" 
                alt="WhatsApp" 
                className="h-full w-full object-contain"
              />
            </div>
            <h2 className="text-3xl font-bold mb-4">تواصل معنا عبر واتساب</h2>
            <p className="text-xl text-gray-600 mb-8">
              للحصول على استجابة سريعة، يمكنك التواصل معنا مباشرة عبر تطبيق واتساب.
              نحن متاحون للرد على استفساراتك وحجز المواعيد وتقديم المساعدة.
            </p>
            <a 
              href="https://wa.me/201119056895" 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center bg-green-500 text-white px-6 py-3 rounded-full font-medium hover:bg-green-600 transition-colors"
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 mr-2">
                <path d="M17.6 6.3A8.3 8.3 0 0 0 3.3 15.6L2 22l6.5-1.7a8.3 8.3 0 0 0 4 1 8.3 8.3 0 0 0 5.3-14.7zm-5.2 12.7a6.9 6.9 0 0 1-3.5-1l-.3-.1-2.7.7.7-2.7-.1-.3a6.9 6.9 0 0 1-1-3.5 6.9 6.9 0 0 1 11.9-4.7A6.9 6.9 0 0 1 12.4 19z"/>
                <path d="M17.4 14.5c-.2-.1-1.3-.6-1.5-.7-.2-.1-.3-.1-.4.1-.1.2-.6.7-.7.9-.1.1-.2.1-.4 0-.6-.3-1.2-.5-1.7-1.2-.4-.4-.8-.9-1-1.3 0-.2 0-.3.1-.3l.4-.3.2-.4c.1-.1 0-.3 0-.4l-.6-1.5c-.2-.4-.3-.4-.5-.4h-.4c-.2 0-.4.1-.5.2-.6.7-.9 1.4-.9 2.2a3.8 3.8 0 0 0 .8 2c1 1.2 1.7 1.5 2.8 2 .4.1.8.2 1.2.2.3.1.7 0 1-.1.3-.1.9-.4 1.1-.8.2-.3.2-.7.1-.8 0-.2-.2-.1-.4-.2z"/>
              </svg>
              التواصل عبر واتساب
            </a>
          </div>
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default Contact;
