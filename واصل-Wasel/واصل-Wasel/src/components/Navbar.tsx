import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, User, Phone } from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

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

  // Navigation Links - Clean, elegant typography without icons as requested
  const navLinks = [
    { path: "/", label: "الرئيسية" },
    { path: "/orthoses", label: "الجبائر الطبية" },
    { path: "/prosthetics", label: "الأطراف الصناعية" },
    { path: "/about", label: "عن التطبيق" },
    { path: "/team", label: "فريق العمل" },
    { path: "/centers", label: "مراكزنا" },
    { path: "/contact", label: "تواصل معنا" },
    { path: "/booking", label: "حجز موعد" }
  ];

  return (
    <nav className="bg-white/95 backdrop-blur-md sticky top-0 z-50 border-b border-gray-100 shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex-shrink-0 flex items-center group">
              <div className="h-10 w-10 rounded-xl bg-gradient-to-tr from-medical-700 via-medical-600 to-medical-500 flex items-center justify-center shadow-md group-hover:scale-105 transition-transform duration-300">
                <span className="text-white font-extrabold text-xl font-cairo">W</span>
              </div>
              <div className="mx-3 flex flex-col">
                <span className="font-extrabold text-xl text-gray-900 font-cairo tracking-tight">واصــــل</span>
                <span className="text-[10px] font-semibold text-medical-600 tracking-wider font-sans -mt-1">WASEL MOBILITY</span>
              </div>
            </Link>
          </div>
          
          {/* Desktop Clean Navigation Links without icons */}
          <div className="hidden lg:flex lg:items-center lg:space-x-7 lg:rtl:space-x-reverse">
            {navLinks.map((link) => {
              const isActive = location.pathname === link.path;
              return (
                <Link 
                  key={link.path}
                  to={link.path} 
                  className={`text-sm font-bold relative transition-all duration-200 font-cairo py-1 ${
                    isActive 
                      ? 'text-medical-600' 
                      : 'text-gray-700 hover:text-medical-600'
                  }`}
                >
                  {link.label}
                  {/* Clean line indicator */}
                  <span className={`absolute -bottom-1 left-0 h-0.5 rounded-full bg-medical-600 transition-all duration-300 ${
                    isActive ? 'w-full' : 'w-0 hover:w-full'
                  }`} />
                </Link>
              );
            })}
          </div>
          
          {/* Desktop Right Side Actions */}
          <div className="flex items-center space-x-3 rtl:space-x-reverse">
            {isLoggedIn ? (
              <div className="flex items-center gap-2">
                {isPatient ? (
                  <span className="text-xs font-bold text-medical-900 bg-medical-50 border border-medical-200/60 px-3.5 py-2 rounded-xl hidden sm:inline-block font-cairo">
                    👤 مرحباً: {loggedInName}
                  </span>
                ) : (
                  <Link to={isAdmin ? "/admin-dashboard" : "/specialist-dashboard"}>
                    <Button variant="outline" className="flex items-center border-medical-200 text-medical-800 hover:bg-medical-50 font-cairo text-sm rounded-xl font-bold">
                      <User className="mr-1.5 h-4 w-4 text-medical-600" />
                      لوحة التحكم ({loggedInName})
                    </Button>
                  </Link>
                )}
                <Button variant="destructive" onClick={handleLogout} className="font-cairo text-sm rounded-xl font-bold">
                  خروج
                </Button>
              </div>
            ) : (
              <Link to="/login">
                <Button variant="outline" className="flex items-center border-gray-200 text-gray-800 hover:text-medical-600 hover:border-medical-300 hover:bg-medical-50/50 font-bold font-cairo text-sm rounded-xl transition-all duration-200">
                  <User className="mr-2 h-4 w-4 text-medical-600" />
                  الدخول / التسجيل
                </Button>
              </Link>
            )}
            
            <a href="https://wa.me/201119056895" target="_blank" rel="noopener noreferrer">
              <Button variant="default" className="flex items-center bg-medical-600 hover:bg-medical-700 text-white font-bold font-cairo text-sm rounded-xl shadow-md hover:shadow-lg transition-all duration-200">
                <Phone className="mr-2 h-4 w-4" />
                تواصل معنا
              </Button>
            </a>
            
            <div className="lg:hidden flex items-center">
              <button
                onClick={toggleMenu}
                className="text-gray-700 hover:text-medical-600 transition-colors duration-200 p-2 rounded-lg"
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
              className="lg:hidden py-3 border-t border-gray-100 overflow-hidden"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.25, ease: 'easeInOut' }}
            >
              <div className="flex flex-col space-y-1">
                {navLinks.map((link) => {
                  const isActive = location.pathname === link.path;
                  return (
                    <Link 
                      key={link.path}
                      to={link.path} 
                      className={`block py-2.5 px-4 rounded-xl transition-all duration-200 font-bold font-cairo text-sm ${
                        isActive 
                          ? 'bg-medical-50 text-medical-700' 
                          : 'text-gray-700 hover:bg-gray-50'
                      }`}
                      onClick={toggleMenu}
                    >
                      {link.label}
                    </Link>
                  );
                })}
                
                {/* Mobile login button */}
                {!isLoggedIn && (
                  <Link to="/login" onClick={toggleMenu} className="block w-full mt-2 px-4">
                    <Button variant="outline" className="w-full font-cairo flex items-center justify-center text-sm font-bold rounded-xl">
                      <User className="h-4 w-4 mr-2 text-medical-600" /> الدخول / التسجيل
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