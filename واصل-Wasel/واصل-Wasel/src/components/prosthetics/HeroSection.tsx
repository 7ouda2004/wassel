
import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Link } from 'react-router-dom';

const HeroSection: React.FC = () => {
  return (
    <section className="relative h-[80vh] bg-gradient-to-b from-medical-100 to-white overflow-hidden">
      <div className="absolute top-0 left-0 right-0 bottom-0 opacity-10">
        <div className="absolute w-64 h-64 rounded-full bg-medical-300 top-20 right-20 animate-pulse-slow"></div>
        <div className="absolute w-96 h-96 rounded-full bg-medical-400 bottom-20 left-20 animate-pulse-slow" style={{ animationDelay: '1s' }}></div>
      </div>
      
      <div className="container mx-auto px-4 h-full flex items-center">
        <div className="md:w-1/2 z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-4">الأطراف الصناعية المتطورة</h1>
            <p className="text-xl text-gray-700 mb-8 leading-relaxed">
              نقدم أحدث التقنيات في الأطراف الصناعية لمساعدتك على استعادة حريتك واستقلاليتك. نجمع بين الخبرة الطبية والتكنولوجيا المتطورة لتوفير حلول مخصصة تناسب احتياجاتك.
            </p>
            <div className="flex flex-wrap gap-4">
              <Button size="lg" className="bg-medical-600 hover:bg-medical-700">
                <Link to="/contact" className="flex items-center gap-2">
                  تواصل معنا
                  <ArrowRight className="w-5 h-5" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" className="border-medical-600 text-medical-600 hover:bg-medical-50">
                <a href="#amputation-levels" className="flex items-center gap-2">
                  تعرف على المزيد
                  <ArrowRight className="w-5 h-5" />
                </a>
              </Button>
            </div>
          </motion.div>
        </div>
        
        <motion.div
          className="hidden md:block md:w-1/2 z-10"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
        >
          <img 
            src="https://wamu.org/wp-content/uploads/legacy/drs/images/headline/130513_prosthetics-600x329.png" 
            alt="طرف صناعي متطور" 
            className="rounded-lg shadow-2xl object-cover h-[60vh]"
          />
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
