import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, ChevronRight, Sparkles, Award, CheckCircle2 } from 'lucide-react';
import { Button } from "@/components/ui/button";
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { DEFAULT_CENTER_IMAGE, FALLBACK_CENTER_IMAGES } from '@/lib/db';

const Index = () => {
  useEffect(() => {
    document.documentElement.dir = 'rtl';
    document.body.classList.add('font-cairo');
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-slate-50/40">
      <Navbar />

      {/* Blatchford Mobility Inspired Hero Section */}
      <section className="relative py-20 lg:py-28 bg-gradient-to-b from-medical-950 via-medical-900 to-medical-850 text-white overflow-hidden">
        {/* Soft glowing ambient circles */}
        <div className="absolute inset-0 opacity-25 pointer-events-none">
          <div className="absolute -top-20 right-0 w-[600px] h-[600px] bg-medical-500 rounded-full blur-[150px]" />
          <div className="absolute bottom-0 left-10 w-[500px] h-[500px] bg-sky-400 rounded-full blur-[130px]" />
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-12 max-w-7xl mx-auto">

            {/* Text Content */}
            <motion.div
              className="text-center lg:text-right lg:w-1/2"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="inline-flex items-center gap-2 py-1.5 px-4 bg-white/10 text-medical-200 rounded-full text-xs font-bold mb-6 border border-white/15 backdrop-blur-md">
                <Sparkles className="h-4 w-4 text-sky-300" />
                <span>الجيل الجديد من تقنيات التأهيل والأطراف الذكية</span>
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black leading-tight tracking-tight font-cairo mb-6">
                استعد حريتك الحركية
                <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-300 via-medical-200 to-white">بأحدث التقنيات العالمية</span>
              </h1>

              <p className="text-base sm:text-lg text-gray-300 max-w-xl mx-auto lg:mx-0 leading-relaxed font-medium mb-8">
                نجمع لك نخبة المراكز والأخصائيين المعتمدين في كافة محافظات مصر لتوفير أحدث الجبائر الطبية والأطراف الصناعية المصممة خصيصاً لراحة حركتك.
              </p>

              <div className="flex flex-col sm:flex-row justify-center lg:justify-start gap-4">
                <Link to="/centers">
                  <Button size="lg" className="w-full sm:w-auto px-8 py-6 text-base font-bold bg-medical-500 hover:bg-medical-400 text-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300">
                    استكشاف مراكز مصر المعتمده
                    <ChevronRight className="mr-2 h-5 w-5 rtl:rotate-180" />
                  </Button>
                </Link>
                <Link to="/booking">
                  <Button size="lg" variant="outline" className="w-full sm:w-auto px-8 py-6 text-base font-bold border-white/30 text-white hover:bg-white/10 rounded-xl transition-all duration-300">
                    حجز موعد استشارة
                  </Button>
                </Link>
              </div>
            </motion.div>

            {/* Hero Image Showcase - User Selected Hero Image */}
            <motion.div
              className="lg:w-1/2 w-full max-w-lg mx-auto"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.7, delay: 0.2 }}
            >
              <div className="relative rounded-3xl overflow-hidden shadow-2xl border border-white/10 group">
                <img
                  src="/images/wasel_hero.jpg"
                  alt="Wasel Advanced Prosthetics and Mobility"
                  className="w-full h-[520px] object-cover object-top transition-transform duration-700 group-hover:scale-105"
                  onError={(e) => { e.currentTarget.src = '/images/prosthetic_leg.png'; }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-medical-950/80 via-transparent to-transparent" />

                {/* Floating Quality Badge */}
                <div className="absolute bottom-6 right-6 left-6 bg-white/95 backdrop-blur-md p-4 rounded-2xl border border-white shadow-xl text-gray-900 flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-medical-50 text-medical-700 flex items-center justify-center flex-shrink-0">
                    <Award className="h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="font-bold text-sm">معايير ألمانية وتكنولوجيا ذكية</h3>
                    <p className="text-xs text-gray-500 mt-0.5">ضمان جودة واستدامة لكافة أجهزتنا والجبائر الطبية</p>
                  </div>
                </div>
              </div>
            </motion.div>

          </div>
        </div>
      </section>

      {/* Modern Features Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="text-center mb-16">
            <span className="text-xs font-bold text-medical-700 bg-medical-50 px-4 py-1.5 rounded-full border border-medical-100 inline-block mb-3">
              خدمات واصل المتكاملة
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 font-cairo">
              كل ما تحتاجه لرحلة التعافي والحركة
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: "الأطراف الصناعية الذكية",
                desc: "أطراف صناعية علوية وسفلية متطورة مصممة وفق أحدث المعايير لتمنحك حركة طبيعية وثبات تام.",
                image: "/images/prosthetic_leg.png",
                fallback: "https://images.unsplash.com/photo-1586773860418-d37222d8fce3?auto=format&fit=crop&w=600&q=80",
                link: "/prosthetics",
                linkText: "استكشف الأطراف"
              },
              {
                title: "الجبائر والأجهزة التقويمية",
                desc: "تشكيلة مخصصة من جبائر الركبة، الكاحل، والعمود الفقري لتوفير الدعم الأمثل ومساعدة الأطفال والكبار.",
                image: "/images/afo.jpg",
                fallback: "https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&w=600&q=80",
                link: "/orthoses",
                linkText: "استكشف الجبائر"
              },
              {
                title: "شبكة مراكزنا بالمحافظات",
                desc: "فروع معتمدة في كافة أنحاء مصر لتسهيل الوصول للأخصائيين ومتابعة التأهيل والصيانة الدورية.",
                image: "/images/default_center.png",
                fallback: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&w=600&q=80",
                link: "/centers",
                linkText: "تصفح الفروع"
              }
            ].map((item, idx) => (
              <div key={idx} className="bg-slate-50/60 rounded-3xl overflow-hidden border border-gray-200/70 hover:shadow-lg transition-all duration-300 flex flex-col justify-between group">
                <div>
                  <div className="h-56 overflow-hidden bg-gray-50 relative flex items-center justify-center">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-full h-full object-contain p-2 group-hover:scale-105 transition-transform duration-500"
                      onError={(e) => { e.currentTarget.src = item.fallback; }}
                    />
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-gray-900 mb-2 font-cairo">{item.title}</h3>
                    <p className="text-sm text-gray-600 leading-relaxed font-medium">{item.desc}</p>
                  </div>
                </div>

                <div className="px-6 pb-6 pt-2">
                  <Link to={item.link} className="inline-flex items-center text-sm font-bold text-medical-700 hover:text-medical-800 group-hover:translate-x-1 transition-transform">
                    {item.linkText}
                    <ArrowRight className="h-4 w-4 mr-1 rtl:rotate-180" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Wasel */}
      <section className="py-20 bg-slate-50/70">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="flex flex-col lg:flex-row items-center gap-12">
            <div className="lg:w-1/2">
              <div className="rounded-3xl overflow-hidden shadow-xl border border-gray-200/80 bg-gray-50">
                <img
                  src="/images/new.png"
                  alt="Quality Care Team"
                  className="w-full h-auto max-h-[500px] object-contain"
                  onError={(e) => { e.currentTarget.src = DEFAULT_CENTER_IMAGE; }}
                />
              </div>
            </div>

            <div className="lg:w-1/2 space-y-6">
              <span className="text-xs font-bold text-medical-700 bg-medical-50 px-3.5 py-1 rounded-full border border-medical-100 inline-block">
                لماذا منصة واصل؟
              </span>
              <h2 className="text-3xl font-extrabold text-gray-900 font-cairo">
                رعاية متكاملة ومتابعة حركية مستمرة
              </h2>

              <div className="space-y-4 pt-2">
                {[
                  { title: "أخصائيون معتمدون وخبرات مثبتة", desc: "نخبة من كوادر التأهيل والحركة ذوي الخبرة العالية." },
                  { title: "تغطية شاملة لكل المحافظات", desc: "فروع ومراكز متصلة لتقديم الخدمة أينما كنت." },
                  { title: "صيانة ودعم دوري مستمر", desc: "متابعة الحالات وضبط الأجهزة لضمان أعلى مستويات الراحة." }
                ].map((feature, i) => (
                  <div key={i} className="flex items-start gap-3.5 bg-white p-4 rounded-2xl border border-gray-100 shadow-xs">
                    <div className="w-8 h-8 rounded-xl bg-medical-50 text-medical-700 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <CheckCircle2 className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="font-bold text-sm text-gray-900">{feature.title}</h4>
                      <p className="text-xs text-gray-500 mt-0.5 leading-relaxed">{feature.desc}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="pt-2">
                <Link to="/about">
                  <Button className="bg-medical-700 hover:bg-medical-800 text-white font-bold rounded-xl px-7 py-5 text-sm">
                    تعرف على رؤية واصل
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
