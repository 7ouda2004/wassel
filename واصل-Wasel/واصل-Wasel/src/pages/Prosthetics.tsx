
import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, ChevronRight } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { useTranslation } from 'react-i18next';

// Import component sections
import HeroSection from '@/components/prosthetics/HeroSection';
import AmputationLevels from '@/components/prosthetics/AmputationLevels';
import FootAmputationTypes from '@/components/prosthetics/FootAmputationTypes';
import KneeTypes from '@/components/prosthetics/KneeTypes';
import FootTypes from '@/components/prosthetics/FootTypes';
import SocketInfo from '@/components/prosthetics/SocketInfo';
import ManufacturingSteps from '@/components/prosthetics/ManufacturingSteps';
import FAQSection from '@/components/prosthetics/FAQSection';

const Prosthetics = () => {
  const { i18n } = useTranslation();

  useEffect(() => {
    document.documentElement.dir = i18n.language === 'ar' ? 'rtl' : 'ltr';
    document.body.classList.add('font-cairo');
  }, [i18n.language]);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      {/* Hero Section */}
      <HeroSection />

      {/* Amputation Levels */}
      <AmputationLevels />

      {/* Foot Amputation Types - NEW */}
      <FootAmputationTypes />

      {/* Knee Types */}
      <KneeTypes />

      {/* Foot Types (Prosthetic Feet) */}
      <FootTypes />

      {/* Socket Info */}
      <SocketInfo />

      {/* Manufacturing Steps */}
      <ManufacturingSteps />

      {/* FAQ Section */}
      <FAQSection />

      <Footer />
    </div>
  );
};

export default Prosthetics;
