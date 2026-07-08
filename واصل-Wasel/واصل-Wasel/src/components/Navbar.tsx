import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X, User, Phone } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleLogout = () => {
    sessionStorage.removeItem('isSpecialist');
    sessionStorage.removeItem('isAdmin');
    sessionStorage.removeItem('isPatient');
    sessionStorage.removeItem('username');
    sessionStorage.removeItem('patientName');
    sessionStorage.removeItem('patientPhone');
    toast.success('تم تسجيل الخروج بنجاح');
    window.location.href = '/';
  };

  const isSpecialist = sessionStorage.getItem('isSpecialist') === 'true';
  const isAdmin = sessionStorage.getItem('isAdmin') === 'true';
  const isPatient = sessionStorage.getItem('isPatient') === 'true';
  const isLoggedIn = isSpecialist || isAdmin || isPatient;
  const loggedInName = sessionStorage.getItem('patientName') || sessionStorage.getItem('username') || 'مستخدم';

  const navLinks = [
    { path: "/", label: "الرئيسية" },
    { path: "/orthoses", label: "الجبائر الطبية" },
    { path: "/prosthetics", label: "الأطراف الصناعية" },
    { path: "/about", label: "عن التطبيق" },
    { path: "/team", label: "فريق العمل" },
    { path: "/locations", label: "مراكزنا" },
    { path: "/contact", label: "تواصل معنا" },
    { path: "/booking", label: "حجز موعد" }
  ];

  return (
    <nav className="bg-white/90 backdrop-blur-md shadow-md sticky top-0 z-50 transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex-shrink-0 flex items-center">
              <div className="h-10 w-10 rounded-full bg-gradient-to-tr from-medical-500 to-medical-700 flex items-center justify-center shadow-md">
                <span className="text-white font-bold text-lg">W</span>
              </div>
              <span className="mx-3 font-bold text-xl text-medical-850 font-cairo">واصــــل</span>
            </Link>
          </div>
          
          {/* Desktop Navigation Links */}
          <div className="hidden md:flex md:items-center md:space-x-6 md:rtl:space-x-reverse">
            {navLinks.map((link, index) => (
              <motion.div
                key={link.path}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.05 }}
              >
                <Link 
                  to={link.path} 
                  className="text-gray-750 hover:text-medical-600 font-semibold relative group transition-colors duration-300 font-cairo"
                >
                  {link.label}
                  <motion.span 
                    className="absolute bottom-0 left-0 w-0 h-0.5 bg-medical-600 group-hover:w-full transition-all duration-300"
                    initial={{ width: 0 }}
                    whileHover={{ width: '100%' }}
                  />
                </Link>
              </motion.div>
            ))}
          </div>
          
          {/* Desktop Right Side Actions */}
          <div className="flex items-center space-x-4 rtl:space-x-reverse">
            {isLoggedIn ? (
              <div className="flex items-center gap-2">
                {isPatient ? (
                  <span className="text-xs font-bold text-medical-800 bg-medical-50/80 border border-medical-200 px-3 py-2 rounded-full hidden sm:inline-block shadow-sm font-cairo">
                    👤 مرحباً بك: {loggedInName} (حالة/مريض)
                  </span>
                ) : (
                  <Link to={isAdmin ? "/admin-dashboard" : "/specialist-dashboard"}>
                    <Button variant="outline" className="flex items-center hover:scale-105 transition-transform duration-200 border-medical-200 text-medical-800 font-cairo">
                      <User className="mr-1 h-4 w-4" />
                      لوحة التحكم ({loggedInName})
                    </Button>
                  </Link>
                )}
                <Button variant="destructive" onClick={handleLogout} className="hover:scale-105 transition-transform duration-200 font-cairo">
                  خروج
                </Button>
              </div>
            ) : (
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.1 }}
              >
                <Link to="/login">
                  <Button variant="outline" className="flex items-center hover:scale-105 transition-transform duration-200 border-medical-200 text-medical-800 hover:bg-medical-50 shadow-sm font-semibold font-cairo">
                    <User className="mr-2 h-4 w-4 text-medical-600" />
                    الدخول / التسجيل
                  </Button>
                </Link>
              </motion.div>
            )}
            
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <a href="https://wa.me/201119056895" target="_blank" rel="noopener noreferrer">
                <Button variant="default" className="flex items-center medical-btn hover:scale-105 transition-transform duration-200 font-cairo">
                  <Phone className="mr-2 h-4 w-4" />
                  تواصل معنا
                </Button>
              </a>
            </motion.div>
            
            <div className="md:hidden flex items-center">
              <button
                onClick={toggleMenu}
                className="text-gray-700 hover:text-primary"
                aria-label="Toggle menu"
              >
                {isOpen ? (
                  <X className="h-6 w-6" />
                ) : (
                  <Menu className="h-6 w-6" />
                )}
              </button>
            </div>
          </div>
        </div>
        
        {/* Mobile Navigation Links */}
        <AnimatePresence>
          {isOpen && (
            <motion.div 
              className="md:hidden py-2 border-t border-gray-200 overflow-hidden"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <div className="flex flex-col space-y-1">
                {navLinks.map((link, index) => (
                  <motion.div
                    key={link.path}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 }}
                  >
                    <Link 
                      to={link.path} 
                      className="block py-2 px-3 rounded-md hover:bg-primary/10 transition-colors duration-200 font-semibold text-gray-750 font-cairo" 
                      onClick={toggleMenu}
                    >
                      {link.label}
                    </Link>
                  </motion.div>
                ))}
                
                {/* Mobile login button */}
                {!isLoggedIn && (
                  <Link to="/login" onClick={toggleMenu} className="block w-full mt-2">
                    <Button variant="outline" className="w-full font-cairo flex items-center justify-center">
                      <User className="h-4 w-4 mr-2" /> الدخول / التسجيل
                    </Button>
                  </Link>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </nav>
  );
};

export default Navbar;