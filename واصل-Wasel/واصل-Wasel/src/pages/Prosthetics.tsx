
import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, ChevronRight } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

// Import component sections
import HeroSection from '@/components/prosthetics/HeroSection';
import AmputationLevels from '@/components/prosthetics/AmputationLevels';
import FootAmputationTypes from '@/components/prosthetics/FootAmputationTypes';
import KneeTypes from '@/components/prosthetics/KneeTypes';
import FootTypes from '@/components/prosthetics/FootTypes';
import SocketInfo from '@/components/prosthetics/SocketInfo';
import LimbCareSection from '@/components/prosthetics/LimbCareSection';
import ManufacturingSteps from '@/components/prosthetics/ManufacturingSteps';
import FAQSection from '@/components/prosthetics/FAQSection';

const Prosthetics = () => {
  useEffect(() => {
    document.documentElement.dir = 'rtl';
    document.body.classList.add('font-cairo');
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-slate-50/30">
      <Navbar />

      {/* Hero Section */}
      <HeroSection />

      {/* Amputation Levels Section */}
      <AmputationLevels />

      {/* Foot Amputation Specific Types Section */}
      <FootAmputationTypes />

      {/* Microprocessor & Hydraulic Knee Technologies */}
      <KneeTypes />

      {/* Prosthetic Foot & Ankle Systems */}
      <FootTypes />

      {/* Advanced Socket Systems & Liners */}
      <SocketInfo />

      {/* Residual Limb Care & Hygiene Guidelines */}
      <LimbCareSection />

      {/* Custom Fitting & Fabrication Workflow */}
      <ManufacturingSteps />

      {/* Frequently Asked Questions */}
      <FAQSection />

      <Footer />
    </div>
  );
};

export default Prosthetics;
