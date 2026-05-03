import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { useEffect, lazy, Suspense } from "react";
import { ThemeProvider } from "./providers/theme-provider";
import { AuthProvider } from "./providers/auth-provider";
import { AnimatePresence } from "framer-motion";
import { useTranslation } from "react-i18next";
import ErrorBoundary from "@/components/shared/ErrorBoundary";

// Core pages (eager load)
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import WhatsAppButton from '@/components/WhatsAppButton';

// Lazy-loaded pages (code splitting)
const Orthoses = lazy(() => import("./pages/Orthoses"));
const Prosthetics = lazy(() => import("./pages/Prosthetics"));
const About = lazy(() => import("./pages/About"));
const Team = lazy(() => import("./pages/Team"));
const Locations = lazy(() => import("./pages/Locations"));
const Contact = lazy(() => import("./pages/Contact"));
const SpecialistDashboard = lazy(() => import("./pages/SpecialistDashboard"));
const Booking = lazy(() => import("./pages/Booking"));
const Centers = lazy(() => import("./pages/Centers"));
const CenterDetails = lazy(() => import("./pages/CenterDetails"));
const Login = lazy(() => import("./pages/Login"));
const Register = lazy(() => import("./pages/Register"));
const InsuranceRequest = lazy(() => import("./pages/InsuranceRequest"));
const SmartRecommendation = lazy(() => import("./pages/SmartRecommendation"));
const PatientDashboard = lazy(() => import("./pages/dashboard/PatientDashboard"));
const Blog = lazy(() => import("./pages/Blog"));

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000, // 5 minutes
      retry: 2,
    },
  },
});

// Loading fallback for lazy-loaded pages
const PageLoader = () => (
  <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-medical-50 to-white">
    <div className="flex flex-col items-center gap-4">
      <div className="w-12 h-12 rounded-full border-4 border-medical-200 border-t-medical-600 animate-spin" />
      <p className="text-gray-500 font-cairo">جاري التحميل...</p>
    </div>
  </div>
);

// Create a separate component for routes to access useLocation
const AnimatedRoutes = () => {
  const location = useLocation();
  
  return (
    <AnimatePresence mode="wait">
      <Suspense fallback={<PageLoader />}>
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
          <Route path="/centers" element={<Centers />} />
          <Route path="/center/:id" element={<CenterDetails />} />
          <Route path="/centers/:id" element={<CenterDetails />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/insurance-request" element={<InsuranceRequest />} />
          <Route path="/smart-recommendation" element={<SmartRecommendation />} />
          <Route path="/dashboard" element={<PatientDashboard />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
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
    <ErrorBoundary>
      <ThemeProvider defaultTheme="light">
        <QueryClientProvider client={queryClient}>
          <AuthProvider>
            <TooltipProvider>
              <BrowserRouter>
                <Sonner />
                <Toaster />
                <AnimatedRoutes />
                <WhatsAppButton />
              </BrowserRouter>
            </TooltipProvider>
          </AuthProvider>
        </QueryClientProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
};

export default App;