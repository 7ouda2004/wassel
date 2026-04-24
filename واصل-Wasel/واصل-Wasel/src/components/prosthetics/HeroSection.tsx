
import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Award, Users, Shield, Star } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Link } from 'react-router-dom';

const stats = [
  { icon: Users, value: '+500', label: 'مريض سعيد' },
  { icon: Award, value: '+10', label: 'سنوات خبرة' },
  { icon: Shield, value: '100%', label: 'جودة مضمونة' },
];

const HeroSection: React.FC = () => {
  return (
    <section className="relative min-h-[90vh] overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 bg-gradient-to-bl from-medical-50 via-white to-blue-50">
        {/* Floating Circles */}
        <motion.div
          animate={{ 
            scale: [1, 1.2, 1], 
            x: [0, 30, 0], 
            y: [0, -20, 0] 
          }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-20 right-20 w-72 h-72 rounded-full bg-gradient-to-br from-medical-200/40 to-blue-200/30 blur-3xl"
        />
        <motion.div
          animate={{ 
            scale: [1, 1.3, 1], 
            x: [0, -20, 0], 
            y: [0, 30, 0] 
          }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 1 }}
          className="absolute bottom-20 left-20 w-96 h-96 rounded-full bg-gradient-to-tr from-teal-200/30 to-medical-200/20 blur-3xl"
        />
        <motion.div
          animate={{ 
            scale: [1, 1.15, 1], 
          }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 2 }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-gradient-to-br from-purple-100/20 to-pink-100/20 blur-3xl"
        />
        {/* Grid Pattern */}
        <div className="absolute inset-0 opacity-[0.03]" style={{
          backgroundImage: 'radial-gradient(circle at 1px 1px, black 1px, transparent 0)',
          backgroundSize: '40px 40px'
        }} />
      </div>

      <div className="relative container mx-auto px-4 h-full flex items-center py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center w-full">
          {/* Text Content */}
          <div className="z-10">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
            >
              {/* Badge */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2, duration: 0.5 }}
                className="inline-flex items-center gap-2 bg-medical-100/80 backdrop-blur-sm text-medical-700 px-4 py-2 rounded-full text-sm font-bold mb-6 border border-medical-200/50"
              >
                <Star className="w-4 h-4 fill-medical-500 text-medical-500" />
                أحدث التقنيات العالمية
              </motion.div>

              <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-gray-900 mb-6 leading-tight">
                <span className="block">الأطراف الصناعية</span>
                <span className="bg-gradient-to-l from-medical-600 via-medical-500 to-teal-500 bg-clip-text text-transparent">
                  المتطورة
                </span>
              </h1>

              <p className="text-xl text-gray-600 mb-8 leading-relaxed max-w-lg">
                نقدم أحدث التقنيات في الأطراف الصناعية لمساعدتك على استعادة حريتك واستقلاليتك. نجمع بين الخبرة الطبية والتكنولوجيا المتطورة لتوفير حلول مخصصة.
              </p>

              {/* CTA Buttons */}
              <div className="flex flex-wrap gap-4 mb-12">
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Button size="lg" className="bg-gradient-to-l from-medical-600 to-medical-700 hover:from-medical-700 hover:to-medical-800 shadow-xl shadow-medical-600/30 text-lg px-8 py-6 rounded-xl">
                    <Link to="/contact" className="flex items-center gap-2">
                      تواصل معنا
                      <ArrowRight className="w-5 h-5" />
                    </Link>
                  </Button>
                </motion.div>
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Button size="lg" variant="outline" className="border-2 border-medical-300 text-medical-700 hover:bg-medical-50 text-lg px-8 py-6 rounded-xl">
                    <a href="#amputation-levels" className="flex items-center gap-2">
                      تعرف على المزيد
                      <ArrowRight className="w-5 h-5" />
                    </a>
                  </Button>
                </motion.div>
              </div>

              {/* Stats */}
              <div className="flex flex-wrap gap-8">
                {stats.map((stat, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 + index * 0.15, duration: 0.5 }}
                    className="flex items-center gap-3"
                  >
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-medical-100 to-medical-200 flex items-center justify-center shadow-sm">
                      <stat.icon className="w-6 h-6 text-medical-700" />
                    </div>
                    <div>
                      <div className="text-2xl font-black text-gray-900">{stat.value}</div>
                      <div className="text-sm text-gray-500 font-medium">{stat.label}</div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Image */}
          <motion.div
            className="z-10 hidden lg:block"
            initial={{ opacity: 0, scale: 0.8, rotate: -3 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
          >
            <div className="relative">
              {/* Decorative Ring */}
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
                className="absolute -inset-4 rounded-3xl border-2 border-dashed border-medical-200/50"
              />
              
              <div className="relative rounded-3xl overflow-hidden shadow-2xl">
                <img
                  src="https://images.unsplash.com/photo-1530497610245-b1bca5e79b29?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                  alt="طرف صناعي متطور"
                  className="w-full h-[500px] object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-medical-900/30 to-transparent" />
              </div>

              {/* Floating Card */}
              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -bottom-6 -right-6 bg-white rounded-2xl shadow-xl p-4 border border-gray-100"
              >
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-green-400 to-emerald-500 flex items-center justify-center">
                    <Award className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <p className="font-bold text-gray-900">جودة ألمانية</p>
                    <p className="text-sm text-gray-500">تقنيات 2024</p>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
