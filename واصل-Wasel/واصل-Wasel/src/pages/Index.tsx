
import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Users, Award, MapPin, Calendar, ChevronRight, Mail, Sparkles } from 'lucide-react';
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
          <div className="absolute w-64 h-64 rounded-full bg-medical-300 top-20 right-20 animate-pulse-slow"></div>
          <div className="absolute w-96 h-96 rounded-full bg-medical-400 bottom-20 left-20 animate-pulse-slow" style={{ animationDelay: '1s' }}></div>
          <div className="absolute w-48 h-48 rounded-full bg-medical-200 top-40 left-40 animate-pulse-slow" style={{ animationDelay: '0.5s' }}></div>
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
              <Link to="/orthoses">
                <motion.div
                  whileHover={{ scale: 1.03, y: -2 }}
                  whileTap={{ scale: 0.97 }}
                >
                  <Button size="lg" className="px-8 py-7 text-lg bg-sky-400 hover:bg-sky-500 text-white shadow-md hover:shadow-lg transition-all rounded-xl border-0">
                    <Sparkles className="ml-2 h-5 w-5" />
                    <span className="font-bold">استكشف الجبائر الطبية</span>
                    <ChevronRight className="mr-2 h-5 w-5 rtl:rotate-180" />
                  </Button>
                </motion.div>
              </Link>
              <Link to="/prosthetics">
                <motion.div
                  whileHover={{ scale: 1.03, y: -2 }}
                  whileTap={{ scale: 0.97 }}
                >
                  <Button size="lg" className="px-8 py-7 text-lg bg-sky-400 hover:bg-sky-500 text-white shadow-md hover:shadow-lg transition-all rounded-xl border-0">
                    <Sparkles className="ml-2 h-5 w-5" />
                    <span className="font-bold">استكشف الأطراف الصناعية</span>
                    <ChevronRight className="mr-2 h-5 w-5 rtl:rotate-180" />
                  </Button>
                </motion.div>
              </Link>
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
                whileHover={{ rotateZ: 2 }}
              />
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-tr from-medical-600/20 to-transparent pointer-events-none"></div>

              <motion.div
                className="absolute -bottom-6 -left-6 bg-white p-4 rounded-xl shadow-xl border-l-4 border-medical-500"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1, duration: 0.6 }}
              >
                <div className="flex items-center gap-3">
                  <div className="bg-medical-100 p-2 rounded-full">
                    <Award className="h-6 w-6 text-medical-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 font-bold">جودة ألمانية</p>
                    <p className="text-医療-800 font-extrabold text-lg">تقنيات 2026</p>
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
          <h2 className="section-title">خدماتنا المميزة</h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
            <motion.div
              className="medical-card p-6"
              whileHover={{ y: -10, boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)' }}
              transition={{ duration: 0.3 }}
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
              whileHover={{ y: -10, boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)' }}
              transition={{ duration: 0.3 }}
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
              whileHover={{ y: -10, boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)' }}
              transition={{ duration: 0.3 }}
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
          </div>
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
                <img
                  src="https://cdn.prod.website-files.com/620223123d75ce5495043bfa/66db04615b2315f1de64875b_644b902cb10b9a0ca0f5e18a_how%2520much%2520is%2520a%2520prosthetic%2520leg.webp"
                  alt="Medical Professional"
                  className="rounded-lg shadow-xl max-w-full"
                />
                <div className="absolute -bottom-6 -right-6 bg-white rounded-lg shadow-lg p-4 z-10">
                  <div className="text-3xl font-bold text-medical-600">10+</div>
                  <div className="text-gray-600">سنوات من الخبرة</div>
                </div>
              </motion.div>
            </div>

            <div className="md:w-1/2 md:pr-10">
              <h2 className="section-title text-right">لماذا تختارنا؟</h2>

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

      {/* Featured Products */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="section-title">منتجاتنا المميزة</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-12">
            <motion.div
              className="medical-card overflow-hidden group"
              whileHover={{ y: -15, scale: 1.02 }}
              transition={{ duration: 0.4, type: "spring" }}
            >
              <div className="relative h-30 erflow-hidden">
                <img
                  src="https://www.crispinorthotics.com/wp-content/uploads/2023/04/JCZ00106.png"
                  alt="جبيرة الكاحل والقدم"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute top-2 right-2 bg-gradient-to-r from-medical-600 to-medical-500 text-white px-3 py-1 rounded-full text-xs font-bold shadow-lg">
                  الأكثر مبيعًا
                </div>
              </div>
              <div className="p-5">
                <h3 className="text-lg font-extrabold text-gray-900 group-hover:text-medical-600 transition-colors">جبيرة الكاحل والقدم (AFO)</h3>
                <p className="text-sm text-gray-600 mt-2 line-clamp-2">
                  جبيرة طبية حديثة لدعم الكاحل والقدم، تناسب حالات سقوط القدم.
                </p>
                <div className="flex justify-between items-center mt-5">
                  <span className="text-medical-700 font-black text-lg">تبدأ من 1,500 ج.م</span>
                  <Link to="/orthoses">
                    <Button variant="outline" size="sm" className="hover:bg-medical-50">التفاصيل</Button>
                  </Link>
                </div>
              </div>
            </motion.div>

            <motion.div
              className="medical-card overflow-hidden group"
              whileHover={{ y: -15, scale: 1.02 }}
              transition={{ duration: 0.4, type: "spring", delay: 0.1 }}
            >
              <div className="relative h-30 verflow-hidden">
                <img
                  src="https://cdn.prod.website-files.com/61fd1a8c835a084cd90fb602/63eb8699d8c4c1efea79255a_kafo%20leg%20brace.webp"
                  alt="جبيرة الركبة"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
              </div>
              <div className="p-5">
                <h3 className="text-lg font-extrabold text-gray-900 group-hover:text-medical-600 transition-colors">جبيرة الركبة المفصلية</h3>
                <p className="text-sm text-gray-600 mt-2 line-clamp-2">
                  دعم متقدم للركبة والأربطة أثناء التعافي وبجودة عالية.
                </p>
                <div className="flex justify-between items-center mt-5">
                  <span className="text-medical-700 font-black text-lg">تبدأ من 2,500 ج.م</span>
                  <Link to="/orthoses">
                    <Button variant="outline" size="sm" className="hover:bg-medical-50">التفاصيل</Button>
                  </Link>
                </div>
              </div>
            </motion.div>

            <motion.div
              className="medical-card overflow-hidden group"
              whileHover={{ y: -15, scale: 1.02 }}
              transition={{ duration: 0.4, type: "spring", delay: 0.2 }}
            >
              <div className="relative h-30 verflow-hidden bg-gray-100">
                <img
                  src="/images/prosthetic_leg.png"
                  alt="طرف صناعي ذكي"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute top-2 right-2 bg-gradient-to-r from-medical-800 to-medical-600 text-white px-3 py-1 rounded-full text-xs font-bold shadow-lg">
                  تقنية ألمانية
                </div>
              </div>
              <div className="p-5">
                <h3 className="text-lg font-extrabold text-gray-900 group-hover:text-medical-600 transition-colors">طرف صناعي ديناميكي</h3>
                <p className="text-sm text-gray-600 mt-2 line-clamp-2">
                  قدم صناعية من ألياف الكربون للاستجابة الديناميكية العالية.
                </p>
                <div className="flex justify-between items-center mt-5">
                  <span className="text-medical-700 font-black text-lg">تبدأ من 35,000 ج.م</span>
                  <Link to="/prosthetics">
                    <Button variant="outline" size="sm" className="hover:bg-medical-50">التفاصيل</Button>
                  </Link>
                </div>
              </div>
            </motion.div>

            <motion.div
              className="medical-card overflow-hidden group"
              whileHover={{ y: -15, scale: 1.02 }}
              transition={{ duration: 0.4, type: "spring", delay: 0.3 }}
            >
              <div className="relative h-30 verflow-hidden bg-gray-100">
                <img
                  src="/images/prosthetic_arm.png"
                  alt="ذراع إلكتروني"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
              </div>
              <div className="p-5">
                <h3 className="text-lg font-extrabold text-gray-900 group-hover:text-medical-600 transition-colors">ذراع إلكتروني حديث</h3>
                <p className="text-sm text-gray-600 mt-2 line-clamp-2">
                  ذراع روبوتي ذكي يستجيب للإشارات العصبية بدقة متناهية.
                </p>
                <div className="flex justify-between items-center mt-5">
                  <span className="text-medical-700 font-black text-lg">تبدأ من 150,000 ج.م</span>
                  <Link to="/prosthetics">
                    <Button variant="outline" size="sm" className="hover:bg-medical-50">التفاصيل</Button>
                  </Link>
                </div>
              </div>
            </motion.div>
          </div>

          <div className="text-center mt-16">
            <Link to="/prosthetics">
              <Button variant="outline" size="lg" className="mr-4">
                عرض الأطراف الصناعية
                <ChevronRight className="h-5 w-5 mr-1 rtl:rotate-180" />
              </Button>
            </Link>
            <Link to="/orthoses">
              <Button variant="outline" size="lg">
                عرض الجبائر الطبية
                <ChevronRight className="h-5 w-5 mr-1 rtl:rotate-180" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-gradient-to-b from-white to-medical-50">
        <div className="container mx-auto px-4">
          <h2 className="section-title">ماذا يقول عملاؤنا</h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
            <Card className="bg-white/50 backdrop-blur-sm border-medical-100">
              <CardContent className="pt-6">
                <div className="flex items-center mb-4">
                  <div className="h-12 w-12 rounded-full bg-medical-100 flex items-center justify-center mr-4">
                    <img
                      src="https://randomuser.me/api/portraits/men/32.jpg"
                      alt="أحمد محمد"
                      className="h-12 w-12 rounded-full object-cover"
                    />
                  </div>
                  <div>
                    <h4 className="font-semibold">أحمد محمد</h4>
                    <p className="text-sm text-gray-500">مستخدم طرف صناعي</p>
                  </div>
                </div>
                <p className="text-gray-600">
                  "حياتي تغيرت بشكل كبير بعد الحصول على الطرف الصناعي من   واصــل. الجودة ممتازة والحركة طبيعية جدًا. الفريق الطبي كان متعاونًا جدًا وقدموا لي كل الدعم اللازم."
                </p>
                <div className="flex mt-4">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <svg key={star} className="h-5 w-5 text-yellow-500" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118l-2.8-2.034c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white/50 backdrop-blur-sm border-medical-100">
              <CardContent className="pt-6">
                <div className="flex items-center mb-4">
                  <div className="h-12 w-12 rounded-full bg-medical-100 flex items-center justify-center mr-4">
                    <img
                      src="https://randomuser.me/api/portraits/women/44.jpg"
                      alt="سارة أحمد"
                      className="h-12 w-12 rounded-full object-cover"
                    />
                  </div>
                  <div>
                    <h4 className="font-semibold">سارة أحمد</h4>
                    <p className="text-sm text-gray-500">مستخدمة جبيرة AFO</p>
                  </div>
                </div>
                <p className="text-gray-600">
                  "الجبيرة التي حصلت عليها من   فريق واصــل مريحة جدًا وساعدتني كثيرًا في المشي بشكل أفضل. أشكر الفريق على احترافيتهم والتصميم المناسب لحالتي."
                </p>
                <div className="flex mt-4">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <svg key={star} className="h-5 w-5 text-yellow-500" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118l-2.8-2.034c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white/50 backdrop-blur-sm border-medical-100">
              <CardContent className="pt-6">
                <div className="flex items-center mb-4">
                  <div className="h-12 w-12 rounded-full bg-medical-100 flex items-center justify-center mr-4">
                    <img
                      src="https://randomuser.me/api/portraits/men/67.jpg"
                      alt="محمود علي"
                      className="h-12 w-12 rounded-full object-cover"
                    />
                  </div>
                  <div>
                    <h4 className="font-semibold">محمود علي</h4>
                    <p className="text-sm text-gray-500">مستخدم ركبة صناعية</p>
                  </div>
                </div>
                <p className="text-gray-600">
                  "الركبة الصناعية المحوسبة التي حصلت عليها غيرت حياتي. أستطيع الآن ممارسة حياتي بشكل طبيعي والمشي لمسافات طويلة بدون تعب. شكرًا بشمهندس محمود على هذه التقنية المتطورة."
                </p>
                <div className="flex mt-4">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <svg key={star} className="h-5 w-5 text-yellow-500" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118l-2.8-2.034c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-medical-800 via-medical-700 to-teal-800" />
        <div className="absolute inset-0 opacity-10">
          <div className="absolute w-96 h-96 rounded-full bg-white/20 -top-20 -right-20 blur-3xl" />
          <div className="absolute w-64 h-64 rounded-full bg-teal-300/20 bottom-10 left-10 blur-3xl" />
        </div>
        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            className="max-w-4xl mx-auto text-center"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm text-white/90 px-5 py-2 rounded-full text-sm font-bold mb-6 border border-white/20">
              <Sparkles className="w-4 h-4" />
              استشارة مجانية
            </div>
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-5">
              استشارة مجانية مع خبرائنا
            </h2>
            <p className="text-medical-100/90 text-lg mb-10 max-w-2xl mx-auto leading-relaxed">
              تواصل معنا اليوم للحصول على استشارة مجانية وتقييم شامل لاحتياجاتك. فريقنا المتخصص في انتظارك.
            </p>
            <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4 rtl:space-x-reverse">
              <motion.a
                href="https://wa.me/201119056895"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.97 }}
              >
                <Button size="lg" className="bg-[#25D366] hover:bg-[#1fb855] text-white px-8 py-7 text-lg rounded-xl shadow-xl animate-whatsapp-glow">
                  <svg className="h-6 w-6 ml-2" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                  </svg>
                  تواصل على واتساب
                </Button>
              </motion.a>
              <motion.a
                href="mailto:mahmoudebrahim049@gmail.com"
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.97 }}
              >
                <Button variant="outline" size="lg" className="border-2 border-white/30 text-white hover:bg-white/10 px-8 py-7 text-lg rounded-xl backdrop-blur-sm">
                  <Mail className="h-5 w-5 ml-2" />
                  راسلنا عبر البريد الإلكتروني
                </Button>
              </motion.a>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Index;
