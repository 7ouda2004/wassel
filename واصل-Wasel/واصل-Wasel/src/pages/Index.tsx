
import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Users, Award, MapPin, Calendar, ChevronRight, Mail } from 'lucide-react';
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
      
      {/* Hero Section */}
      <section className="relative h-[80vh] bg-gradient-to-b from-medical-100 to-white overflow-hidden">
        <div className="absolute top-0 left-0 right-0 bottom-0 opacity-10">
          <motion.div 
            className="absolute w-64 h-64 rounded-full bg-medical-300 top-20 right-20"
            animate={{ 
              scale: [1, 1.2, 1], 
              x: [0, 30, 0], 
              y: [0, -20, 0] 
            }}
            transition={{ 
              duration: 8, 
              repeat: Infinity, 
              ease: "easeInOut" 
            }}
          />
          <motion.div 
            className="absolute w-96 h-96 rounded-full bg-medical-400 bottom-20 left-20"
            animate={{ 
              scale: [1, 1.3, 1], 
              x: [0, -40, 0], 
              y: [0, 30, 0] 
            }}
            transition={{ 
              duration: 10, 
              repeat: Infinity, 
              ease: "easeInOut",
              delay: 1
            }}
          />
          <motion.div 
            className="absolute w-48 h-48 rounded-full bg-medical-200 top-40 left-40"
            animate={{ 
              scale: [1, 1.1, 1], 
              rotate: [0, 180, 360],
              x: [0, 20, 0], 
              y: [0, -10, 0] 
            }}
            transition={{ 
              duration: 12, 
              repeat: Infinity, 
              ease: "easeInOut",
              delay: 0.5
            }}
          />
          <motion.div 
            className="absolute w-32 h-32 rounded-full bg-medical-500 top-60 right-60"
            animate={{ 
              scale: [1, 1.5, 1], 
              opacity: [0.3, 0.8, 0.3] 
            }}
            transition={{ 
              duration: 6, 
              repeat: Infinity, 
              ease: "easeInOut",
              delay: 2
            }}
          />
        </div>
        
        <div className="container mx-auto h-full flex flex-col md:flex-row items-center justify-between px-4 relative z-10">
          <motion.div 
            className="text-center md:text-right md:w-1/2 pt-20 md:pt-0"
            initial={{ opacity: 0, x: -50, scale: 0.9 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            transition={{ duration: 1, type: "spring", stiffness: 50 }}
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
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              <motion.div
                whileHover={{ scale: 1.05, y: -5 }}
                whileTap={{ scale: 0.95 }}
                transition={{ type: "spring", stiffness: 400 }}
              >
                <Link to="/orthoses">
                  <Button size="lg" variant="default" className="px-8 py-7 text-lg bg-medical-600 hover:bg-medical-700 shadow-xl hover:shadow-2xl transition-all hover:-translate-y-1">
                    استكشاف الجبائر الطبية
                    <ChevronRight className="mr-2 h-6 w-6 rtl:rotate-180" />
                  </Button>
                </Link>
              </motion.div>
              <motion.div
                whileHover={{ scale: 1.05, y: -5 }}
                whileTap={{ scale: 0.95 }}
                transition={{ type: "spring", stiffness: 400 }}
              >
                <Link to="/prosthetics">
                  <Button size="lg" variant="outline" className="px-8 py-7 text-lg border-2 hover:bg-medical-50 transition-all hover:-translate-y-1">
                    استكشاف الأطراف الصناعية
                    <ChevronRight className="mr-2 h-6 w-6 rtl:rotate-180" />
                  </Button>
                </Link>
              </motion.div>
            </motion.div>
          </motion.div>
          
          <motion.div 
            className="md:w-1/2 mt-8 md:mt-0"
            initial={{ opacity: 0, scale: 0.8, rotateY: 15 }}
            animate={{ opacity: 1, scale: 1, rotateY: 0 }}
            transition={{ duration: 1.2, delay: 0.3, type: "spring" }}
          >
            <div className="relative group perspective-1000">
              <motion.img 
                src="/images/prosthetic_leg.png" 
                alt="Advanced Prosthetic Limb" 
                className="rounded-2xl shadow-2xl max-w-full mx-auto object-cover h-[55vh] transform transition-transform duration-700 group-hover:scale-[1.02]"
                whileHover={{ 
                  scale: 1.05, 
                  rotateY: 5, 
                  rotateX: 5 
                }}
                transition={{ type: "spring", stiffness: 300 }}
              />
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-tr from-medical-600/20 to-transparent pointer-events-none"></div>
              
              <motion.div 
                className="absolute -bottom-6 -left-6 bg-white p-4 rounded-xl shadow-xl border-l-4 border-medical-500"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1, duration: 0.6 }}
                whileHover={{ scale: 1.1, rotate: 2 }}
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
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            خدماتنا المميزة
          </motion.h2>
          
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <motion.div 
              className="medical-card p-6"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              viewport={{ once: true }}
              whileHover={{ 
                y: -15, 
                boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)', 
                scale: 1.02 
              }}
            >
              <div className="h-14 w-14 rounded-full bg-medical-100 flex items-center justify-center mb-4">
                <img 
                  src="https://img.icons8.com/color/48/000000/leg.png" 
                  alt="Prosthetic Leg" 
                  className="h-10 w-10"
                />
              </div>
              <h3 className="text-xl font-bold mb-2">الأطراف الصناعية المتطورة</h3>
              <p className="text-gray-600">
                نوفر أحدث تقنيات الأطراف الصناعية المصممة خصيصًا لتلبية احتياجاتك اليومية بأعلى معايير الجودة والراحة.
              </p>
              <Link to="/prosthetics" className="block mt-4 text-medical-600 hover:text-medical-700 font-medium inline-flex items-center">
                المزيد
                <ArrowRight className="h-4 w-4 mr-1 rtl:rotate-180" />
              </Link>
            </motion.div>
            
            <motion.div 
              className="medical-card p-6"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
              whileHover={{ 
                y: -15, 
                boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)', 
                scale: 1.02 
              }}
            >
              <div className="h-14 w-14 rounded-full bg-medical-100 flex items-center justify-center mb-4">
                <img 
                  src="https://img.icons8.com/color/48/000000/knee-joint.png" 
                  alt="Orthotic Brace" 
                  className="h-10 w-10"
                />
              </div>
              <h3 className="text-xl font-bold mb-2">الجبائر الطبية المتخصصة</h3>
              <p className="text-gray-600">
                مجموعة متنوعة من الجبائر الطبية عالية الجودة لمختلف الحالات، مصممة لتوفير الدعم الأمثل والراحة.
              </p>
              <Link to="/orthoses" className="block mt-4 text-medical-600 hover:text-medical-700 font-medium inline-flex items-center">
                المزيد
                <ArrowRight className="h-4 w-4 mr-1 rtl:rotate-180" />
              </Link>
            </motion.div>
            
            <motion.div 
              className="medical-card p-6"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              viewport={{ once: true }}
              whileHover={{ 
                y: -15, 
                boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)', 
                scale: 1.02 
              }}
            >
              <div className="h-14 w-14 rounded-full bg-medical-100 flex items-center justify-center mb-4">
                <img 
                  src="https://img.icons8.com/color/48/000000/treatment-plan.png" 
                  alt="Customized Solutions" 
                  className="h-10 w-10"
                />
              </div>
              <h3 className="text-xl font-bold mb-2">حلول مخصصة</h3>
              <p className="text-gray-600">
                نقدم حلولًا مخصصة تمامًا وفقًا لاحتياجاتك الفردية، مع مراعاة نمط حياتك ومستوى نشاطك.
              </p>
              <Link to="/contact" className="block mt-4 text-medical-600 hover:text-medical-700 font-medium inline-flex items-center">
                تواصل معنا
                <ArrowRight className="h-4 w-4 mr-1 rtl:rotate-180" />
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-20 bg-medical-50">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center">
            <div className="md:w-1/2 mb-10 md:mb-0">
              <motion.div 
                className="relative"
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
              >
                <motion.img 
                  src="https://cdn.prod.website-files.com/620223123d75ce5495043bfa/66db04615b2315f1de64875b_644b902cb10b9a0ca0f5e18a_how%2520much%2520is%2520a%2520prosthetic%2520leg.webp" 
                  alt="Medical Professional" 
                  className="rounded-lg shadow-xl max-w-full"
                  whileHover={{ scale: 1.05, rotate: 1 }}
                  transition={{ type: "spring", stiffness: 300 }}
                />
                <motion.div 
                  className="absolute -bottom-6 -right-6 bg-white rounded-lg shadow-lg p-4 z-10"
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.5, duration: 0.6, type: "spring" }}
                  viewport={{ once: true }}
                  whileHover={{ scale: 1.1, rotate: -5 }}
                >
                  <div className="text-3xl font-bold text-medical-600">10+</div>
                  <div className="text-gray-600">سنوات من الخبرة</div>
                </motion.div>
              </motion.div>
            </div>
            
            <div className="md:w-1/2 md:pr-10">
              <motion.h2 
                className="section-title text-right"
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
              >
                لماذا تختارنا؟
              </motion.h2>
              
              <div className="space-y-6 mt-8">
                <motion.div 
                  className="flex"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.1 }}
                  viewport={{ once: true }}
                >
                  <div className="mr-4 h-12 w-12 bg-medical-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <Users className="h-6 w-6 text-medical-600" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-1">فريق متخصص</h3>
                    <p className="text-gray-600">يضم فريقنا خبراء متخصصين في مجال الأطراف الصناعية والجبائر الطبية ذوي خبرة واسعة.</p>
                  </div>
                </motion.div>
                
                <motion.div 
                  className="flex"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  viewport={{ once: true }}
                >
                  <div className="mr-4 h-12 w-12 bg-medical-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <Award className="h-6 w-6 text-medical-600" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-1">معايير عالمية</h3>
                    <p className="text-gray-600">نعتمد على أعلى المعايير العالمية في تصميم وتصنيع منتجاتنا لضمان الجودة والأمان.</p>
                  </div>
                </motion.div>
                
                <motion.div 
                  className="flex"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                  viewport={{ once: true }}
                >
                  <div className="mr-4 h-12 w-12 bg-medical-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <Calendar className="h-6 w-6 text-medical-600" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-1">متابعة مستمرة</h3>
                    <p className="text-gray-600">نقدم خدمة متابعة مستمرة بعد التركيب لضمان أفضل النتائج والتأقلم مع الجهاز.</p>
                  </div>
                </motion.div>
                
                <motion.div 
                  className="flex"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.4 }}
                  viewport={{ once: true }}
                >
                  <div className="mr-4 h-12 w-12 bg-medical-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <MapPin className="h-6 w-6 text-medical-600" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-1">مراكز متعددة</h3>
                    <p className="text-gray-600">لدينا مراكز متعددة في مختلف المناطق لتسهيل الوصول إلى خدماتنا.</p>
                  </div>
                </motion.div>
              </div>
              
              <div className="mt-8">
                <Link to="/about">
                  <Button variant="default" size="lg" className="medical-btn">
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
