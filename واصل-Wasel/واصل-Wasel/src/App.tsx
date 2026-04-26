import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { useEffect } from "react";
import { ThemeProvider } from "./providers/theme-provider";
import { AnimatePresence } from "framer-motion";
import { useTranslation } from "react-i18next";

// Import pages
import Index from "./pages/Index";
import Orthoses from "./pages/Orthoses";
import Prosthetics from "./pages/Prosthetics";
import About from "./pages/About";
import Team from "./pages/Team";
import Locations from "./pages/Locations";
import Contact from "./pages/Contact";
import SpecialistDashboard from "./pages/SpecialistDashboard";
import NotFound from "./pages/NotFound";
import Booking from '@/pages/Booking';
import WhatsAppButton from '@/components/WhatsAppButton';

const queryClient = new QueryClient();

// Create a separate component for routes to access useLocation
const AnimatedRoutes = () => {
  const location = useLocation();
  
  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<Index />} />
        <Route path="/orthoses" element={<Orthoses />} />
        <Route path="/prosthetics" element={<Prosthetics />} />
        <Route path="/about" element={<About />} />
        <Route path="/team" element={<Team />} />
        <Route path="/locations" element={<Locations />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/specialist-dashboard" element={<SpecialistDashboard />} />
        <Route path="/booking" element={<Booking />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </AnimatePresence>
  );
};

const App = () => {
  const { i18n } = useTranslation();

  useEffect(() => {
    // Set direction based on language
    document.documentElement.dir = i18n.language === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.lang = i18n.language;
  }, [i18n.language]);

  return (
    <ThemeProvider defaultTheme="light">
      <QueryClientProvider client={queryClient}>
        <TooltipProvider>
          <BrowserRouter>
            <Sonner />
            <Toaster />
            <AnimatedRoutes />
            <WhatsAppButton />
          </BrowserRouter>
        </TooltipProvider>
      </QueryClientProvider>
    </ThemeProvider>
  );
};

export default App;