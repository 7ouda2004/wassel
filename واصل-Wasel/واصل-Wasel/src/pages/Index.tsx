
import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Users, Award, MapPin, Calendar, ChevronRight, Sparkles, Heart, Shield } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const Index = () => {
  useEffect(() => {
    document.documentElement.dir = 'rtl';
    document.body.classList.add('font-cairo');
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      {/* Hero Section - Lightweight with static decorations */}
      <section className="relative h-[80vh] bg-gradient-to-b from-medical-50 via-medical-50/30 to-white overflow-hidden">
        {/* Static background decorations - NO infinite animations */}
        <div className="absolute top-0 left-0 right-0 bottom-0">
          <div className="absolute w-72 h-72 rounded-full bg-medical-200/20 top-16 right-16 blur-3xl" />
          <div className="absolute w-96 h-96 rounded-full bg-medical-300/10 bottom-20 left-16 blur-3xl" />
          <div className="absolute w-48 h-48 rounded-full bg-blue-200/15 top-40 left-40 blur-2xl" />
        </div>
        
        <div className="container mx-auto h-full flex flex-col md:flex-row items-center justify-between px-4 relative z-10">
          <motion.div 
            className="text-center md:text-right md:w-1/2 pt-20 md:pt-0"
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
          >
            <h1 className="text-4xl md:text-5xl lg:text-7xl font-extrabold text-medical-950 leading-tight tracking-tight">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-medical-600 to-medical-400 block mb-2 drop-shadow-md pb-2"> واصل </span>
              لحلول الجبائر والأطراف الصناعية المتطورة
            </h1>
            <p className="mt-6 text-xl text-gray-600 max-w-xl mx-auto md:mx-0 leading-relaxed font-medium">
              أفضل الحلول التقويمية والأطراف الصناعية المصممة خصيصًا لتلبية احتياجاتك بأحدث التقنيات والمعايير العالمية، بأسعار واقعية وجودة لا تُضاهى.
            </p>
            <motion.div 
              className="mt-10 flex flex-col sm:flex-row justify-center md:justify-start space-y-4 sm:space-y-0 sm:space-x-4 rtl:space-x-reverse"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <Link to="/orthoses">
                <Button size="lg" variant="default" className="px-8 py-7 text-lg bg-medical-600 hover:bg-medical-700 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 shimmer-btn">
                  استكشاف الجبائر الطبية
                  <ChevronRight className="mr-2 h-6 w-6 rtl:rotate-180" />
                </Button>
              </Link>
              <Link to="/prosthetics">
                <Button size="lg" variant="outline" className="px-8 py-7 text-lg border-2 hover:bg-medical-50 transition-all duration-300 hover:-translate-y-1">
                  استكشاف الأطراف الصناعية
                  <ChevronRight className="mr-2 h-6 w-6 rtl:rotate-180" />
                </Button>
              </Link>
            </motion.div>
          </motion.div>
          
          <motion.div 
            className="md:w-1/2 mt-8 md:mt-0"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div className="relative group">
              <img 
                src="/images/prosthetic_leg.png" 
                alt="Advanced Prosthetic Limb" 
                className="rounded-2xl shadow-2xl max-w-full mx-auto object-cover h-[55vh] transform transition-all duration-500 group-hover:scale-[1.02] group-hover:shadow-3xl"
              />
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-tr from-medical-600/10 to-transparent pointer-events-none"></div>
              
              <motion.div 
                className="absolute -bottom-6 -left-6 bg-white p-4 rounded-xl shadow-xl border-l-4 border-medical-500"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8, duration: 0.5 }}
              >
                <div className="flex items-center gap-3">
                  <div className="bg-medical-100 p-2 rounded-full">
                    <Award className="h-6 w-6 text-medical-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 font-bold">جودة ألمانية</p>
                    <p className="text-medical-800 font-extrabold text-lg">تقنيات 2024</p>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
        
        <div className="absolute bottom-0 left-0 right-0">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
            <path fill="#ffffff" fillOpacity="1" d="M0,224L60,213.3C120,203,240,181,360,181.3C480,181,600,203,720,213.3C840,224,960,224,1080,208C1200,192,1320,160,1380,144L1440,128L1440,320L1380,320C1320,320,1200,320,1080,320C960,320,840,320,720,320C600,320,480,320,360,320C240,320,120,320,60,320L0,320Z"></path>
          </svg>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <motion.h2 
            className="section-title"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            خدماتنا المميزة
          </motion.h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
            {[
              {
                icon: "https://img.icons8.com/color/48/000000/leg.png",
                alt: "Prosthetic Leg",
                title: "الأطراف الصناعية المتطورة",
                desc: "نوفر أحدث تقنيات الأطراف الصناعية المصممة خصيصًا لتلبية احتياجاتك اليومية بأعلى معايير الجودة والراحة.",
                link: "/prosthetics",
                linkText: "المزيد",
                lucideIcon: Sparkles,
                delay: 0
              },
              {
                icon: "https://img.icons8.com/color/48/000000/knee-joint.png",
                alt: "Orthotic Brace",
                title: "الجبائر الطبية المتخصصة",
                desc: "مجموعة متنوعة من الجبائر الطبية عالية الجودة لمختلف الحالات، مصممة لتوفير الدعم الأمثل والراحة.",
                link: "/orthoses",
                linkText: "المزيد",
                lucideIcon: Shield,
                delay: 0.1
              },
              {
                icon: "https://img.icons8.com/color/48/000000/treatment-plan.png",
                alt: "Customized Solutions",
                title: "حلول مخصصة",
                desc: "نقدم حلولًا مخصصة تمامًا وفقًا لاحتياجاتك الفردية، مع مراعاة نمط حياتك ومستوى نشاطك.",
                link: "/contact",
                linkText: "تواصل معنا",
                lucideIcon: Heart,
                delay: 0.2
              }
            ].map((item, idx) => (
              <motion.div 
                key={idx}
                className="medical-card p-6 glow-card"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: item.delay }}
                viewport={{ once: true }}
              >
                <div className="h-14 w-14 rounded-2xl bg-medical-50 flex items-center justify-center mb-4 border border-medical-100">
                  <img 
                    src={item.icon} 
                    alt={item.alt} 
                    className="h-9 w-9"
                  />
                </div>
                <h3 className="text-xl font-bold mb-2">{item.title}</h3>
                <p className="text-gray-600 leading-relaxed">
                  {item.desc}
                </p>
                <Link to={item.link} className="block mt-4 text-medical-600 hover:text-medical-700 font-semibold inline-flex items-center group transition-colors duration-200">
                  {item.linkText}
                  <ArrowRight className="h-4 w-4 mr-1 rtl:rotate-180 group-hover:translate-x-1 transition-transform duration-200" />
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-20 bg-medical-50/50">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center">
            <div className="md:w-1/2 mb-10 md:mb-0">
              <motion.div 
                className="relative"
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
              >
                <img 
                  src="https://cdn.prod.website-files.com/620223123d75ce5495043bfa/66db04615b2315f1de64875b_644b902cb10b9a0ca0f5e18a_how%20much%20is%20a%20prosthetic%20leg.webp" 
                  alt="Medical Professional" 
                  className="rounded-2xl shadow-xl max-w-full transition-shadow duration-300 hover:shadow-2xl"
                />
                <motion.div 
                  className="absolute -bottom-6 -right-6 bg-white rounded-xl shadow-lg p-4 z-10"
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.3, duration: 0.5 }}
                  viewport={{ once: true }}
                >
                  <div className="text-3xl font-bold text-medical-600">10+</div>
                  <div className="text-gray-600 font-medium">سنوات من الخبرة</div>
                </motion.div>
              </motion.div>
            </div>
            
            <div className="md:w-1/2 md:pr-10">
              <motion.h2 
                className="section-title text-right"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
              >
                لماذا تختارنا؟
              </motion.h2>
              
              <div className="space-y-6 mt-8">
                {[
                  { icon: Users, title: "فريق متخصص", desc: "يضم فريقنا خبراء متخصصين في مجال الأطراف الصناعية والجبائر الطبية ذوي خبرة واسعة.", delay: 0.1 },
                  { icon: Award, title: "معايير عالمية", desc: "نعتمد على أعلى المعايير العالمية في تصميم وتصنيع منتجاتنا لضمان الجودة والأمان.", delay: 0.15 },
                  { icon: Calendar, title: "متابعة مستمرة", desc: "نقدم خدمة متابعة مستمرة بعد التركيب لضمان أفضل النتائج والتأقلم مع الجهاز.", delay: 0.2 },
                  { icon: MapPin, title: "مراكز متعددة", desc: "لدينا مراكز متعددة في مختلف المناطق لتسهيل الوصول إلى خدماتنا.", delay: 0.25 }
                ].map((item, idx) => (
                  <motion.div 
                    key={idx}
                    className="flex group"
                    initial={{ opacity: 0, y: 15 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: item.delay }}
                    viewport={{ once: true }}
                  >
                    <div className="mr-4 h-12 w-12 bg-medical-100 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:bg-medical-200 transition-colors duration-300">
                      <item.icon className="h-6 w-6 text-medical-600" />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-gray-900 mb-1">{item.title}</h3>
                      <p className="text-gray-600 leading-relaxed">{item.desc}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
              
              <div className="mt-8">
                <Link to="/about">
                  <Button variant="default" size="lg" className="medical-btn shimmer-btn">
                    معرفة المزيد عنا
                    <ChevronRight className="h-5 w-5 mr-1 rtl:rotate-180" />
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Index;
