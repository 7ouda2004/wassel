import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, User, Phone, Home, Bone, Hand, Info, Users, MapPin, MessageCircle, Calendar, Building2 } from 'lucide-react';
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

  const navLinks = [
    { path: "/", label: "الرئيسية", icon: Home },
    { path: "/orthoses", label: "الجبائر الطبية", icon: Bone },
    { path: "/prosthetics", label: "الأطراف الصناعية", icon: Hand },
    { path: "/about", label: "عن التطبيق", icon: Info },
    { path: "/team", label: "فريق العمل", icon: Users },
    { path: "/centers", label: "مراكزنا", icon: Building2 },
    { path: "/contact", label: "تواصل معنا", icon: MessageCircle },
    { path: "/booking", label: "حجز موعد", icon: Calendar }
  ];

  return (
    <nav className="bg-white/95 backdrop-blur-lg shadow-sm sticky top-0 z-50 border-b border-gray-100/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex-shrink-0 flex items-center group">
              <div className="h-10 w-10 rounded-full bg-gradient-to-tr from-medical-500 to-medical-700 flex items-center justify-center shadow-md group-hover:shadow-lg transition-shadow duration-300">
                <span className="text-white font-bold text-lg">W</span>
              </div>
              <span className="mx-3 font-bold text-xl text-medical-850 font-cairo">واصــــل</span>
            </Link>
          </div>
          
          {/* Desktop Navigation Links */}
          <div className="hidden lg:flex lg:items-center lg:space-x-5 lg:rtl:space-x-reverse">
            {navLinks.map((link) => {
              const isActive = location.pathname === link.path;
              const IconComponent = link.icon;
              return (
                <Link 
                  key={link.path}
                  to={link.path} 
                  className={`flex items-center gap-1.5 text-sm font-semibold relative transition-colors duration-300 font-cairo py-1 ${
                    isActive 
                      ? 'text-medical-600' 
                      : 'text-gray-600 hover:text-medical-600'
                  }`}
                >
                  <IconComponent className={`h-3.5 w-3.5 transition-colors duration-300 ${isActive ? 'text-medical-500' : 'text-gray-400 group-hover:text-medical-400'}`} />
                  {link.label}
                  {/* Active indicator */}
                  <span className={`absolute -bottom-1 left-0 h-0.5 rounded-full bg-gradient-to-r from-medical-500 to-medical-400 transition-all duration-300 ${
                    isActive ? 'w-full' : 'w-0'
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
                  <span className="text-xs font-bold text-medical-800 bg-medical-50/80 border border-medical-200 px-3 py-2 rounded-full hidden sm:inline-block shadow-sm font-cairo">
                    👤 مرحباً بك: {loggedInName} (حالة/مريض)
                  </span>
                ) : (
                  <Link to={isAdmin ? "/admin-dashboard" : "/specialist-dashboard"}>
                    <Button variant="outline" className="flex items-center hover:scale-[1.02] transition-transform duration-200 border-medical-200 text-medical-800 font-cairo text-sm">
                      <User className="mr-1 h-4 w-4" />
                      لوحة التحكم ({loggedInName})
                    </Button>
                  </Link>
                )}
                <Button variant="destructive" onClick={handleLogout} className="hover:scale-[1.02] transition-transform duration-200 font-cairo text-sm">
                  خروج
                </Button>
              </div>
            ) : (
              <Link to="/login">
                <Button variant="outline" className="flex items-center hover:scale-[1.02] transition-all duration-200 border-medical-200 text-medical-800 hover:bg-medical-50 shadow-sm font-semibold font-cairo text-sm">
                  <User className="mr-2 h-4 w-4 text-medical-600" />
                  الدخول / التسجيل
                </Button>
              </Link>
            )}
            
            <a href="https://wa.me/201119056895" target="_blank" rel="noopener noreferrer">
              <Button variant="default" className="flex items-center medical-btn shimmer-btn hover:scale-[1.02] transition-all duration-200 font-cairo text-sm">
                <Phone className="mr-2 h-4 w-4" />
                تواصل معنا
              </Button>
            </a>
            
            <div className="lg:hidden flex items-center">
              <button
                onClick={toggleMenu}
                className="text-gray-700 hover:text-medical-600 transition-colors duration-200 p-1"
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
                  const IconComponent = link.icon;
                  return (
                    <Link 
                      key={link.path}
                      to={link.path} 
                      className={`flex items-center gap-3 py-2.5 px-4 rounded-xl transition-all duration-200 font-semibold font-cairo text-sm ${
                        isActive 
                          ? 'bg-medical-50 text-medical-700' 
                          : 'text-gray-600 hover:bg-gray-50'
                      }`}
                      onClick={toggleMenu}
                    >
                      <IconComponent className={`h-4 w-4 ${isActive ? 'text-medical-500' : 'text-gray-400'}`} />
                      {link.label}
                    </Link>
                  );
                })}
                
                {/* Mobile login button */}
                {!isLoggedIn && (
                  <Link to="/login" onClick={toggleMenu} className="block w-full mt-2 px-4">
                    <Button variant="outline" className="w-full font-cairo flex items-center justify-center text-sm">
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