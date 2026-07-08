import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { useEffect } from "react";
import { ThemeProvider } from "./providers/theme-provider";
import { AnimatePresence } from "framer-motion";

// Import pages
import Index from "./pages/Index";
import Orthoses from "./pages/Orthoses";
import Prosthetics from "./pages/Prosthetics";
import About from "./pages/About";
import Team from "./pages/Team";
import Locations from "./pages/Locations";
import Contact from "./pages/Contact";
import SpecialistDashboard from "./pages/SpecialistDashboard";
import AdminDashboard from "./pages/AdminDashboard";
import NotFound from "./pages/NotFound";
import Booking from '@/pages/Booking';
import Login from "./pages/Login";
import { syncDatabase } from "@/lib/registrations";

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
        <Route path="/admin-dashboard" element={<AdminDashboard />} />
        <Route path="/booking" element={<Booking />} />
        <Route path="/login" element={<Login />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </AnimatePresence>
  );
};

const App = () => {
  useEffect(() => {
    // Set RTL direction for the entire app
    document.documentElement.dir = 'rtl';
    
    // Sync shared specialists and centers from Supabase cloud database
    syncDatabase();
  }, []);

  return (
    <ThemeProvider defaultTheme="light">
      <QueryClientProvider client={queryClient}>
        <TooltipProvider>
          <BrowserRouter>
            <Sonner />
            <Toaster />
            <AnimatedRoutes />
          </BrowserRouter>
        </TooltipProvider>
      </QueryClientProvider>
    </ThemeProvider>
  );
};

export default App;