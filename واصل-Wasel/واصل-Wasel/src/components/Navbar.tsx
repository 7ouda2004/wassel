import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Menu, X, User, Phone, Moon, Sun, Globe, LogOut, LayoutDashboard, Building } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useTheme } from "@/providers/theme-provider";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { useAuth } from '@/providers/auth-provider';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [password, setPassword] = useState('');
  const { theme, setTheme } = useTheme();
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const { isAuthenticated, user, signOut } = useAuth();

  const toggleLanguage = () => {
    i18n.changeLanguage(i18n.language === 'ar' ? 'en' : 'ar');
  };

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleSpecialistLogin = async (e) => {
    e.preventDefault();
    try {
      // TODO: استبدل هذا بطلب API حقيقي للتحقق من كلمة المرور
      if (password.length < 6) {
        toast.error('كلمة المرور يجب أن تكون 6 أحرف على الأقل');
        return;
      }
      
      // محاكاة طلب API
      const isValid = password === 'daizer616';
      if (isValid) {
        // استخدام sessionStorage بدلاً من localStorage للأمان
        sessionStorage.setItem('isSpecialist', 'true');
        sessionStorage.setItem('username', '616');
        toast.success('تم تسجيل الدخول بنجاح');
        window.location.href = '/specialist-dashboard';
      } else {
        toast.error('كلمة المرور غير صحيحة');
      }
    } catch (error) {
      console.error('خطأ في تسجيل الدخول:', error);
      toast.error('حدث خطأ أثناء تسجيل الدخول');
    }
  };

  const isLoggedIn = sessionStorage.getItem('isSpecialist') === 'true';

  // Define navigation links once to avoid duplication
  const navLinks = [
    { path: "/", label: t('nav.home') },
    { path: "/orthoses", label: t('nav.orthoses') },
    { path: "/prosthetics", label: t('nav.prosthetics') },
    { path: "/centers", label: i18n.language === 'ar' ? 'المراكز' : 'Centers' },
    { path: "/smart-recommendation", label: i18n.language === 'ar' ? 'اختبار ذكي' : 'Smart Quiz' },
    { path: "/about", label: t('nav.about') },
    { path: "/contact", label: t('nav.contact') },
    { path: "/booking", label: t('nav.booking') }
  ];

  return (
    <nav className="bg-white/90 backdrop-blur-md shadow-md sticky top-0 z-50 transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex-shrink-0 flex items-center">
              <div className="h-10 w-10 rounded-full bg-gradient-to-tr from-medical-500 to-medical-700 flex items-center justify-center">
                <span className="text-white font-bold text-lg">W</span>
              </div>
              <span className="mx-2 font-bold text-xl text-medical-800">واصــل</span>
            </Link>
          </div>
          
          {/* Desktop menu */}
          <div className="hidden lg:flex lg:items-center lg:space-x-3 lg:rtl:space-x-reverse flex-1 justify-center px-3">
            {navLinks.map((link) => (
              <Link 
                key={link.path} 
                to={link.path} 
                className="text-gray-700 hover:text-primary font-medium text-sm whitespace-nowrap"
              >
                {link.label}
              </Link>
            ))}
          </div>
          
          <div className="flex items-center space-x-2 rtl:space-x-reverse flex-shrink-0">
            {isAuthenticated ? (
              <div className="hidden sm:flex items-center gap-2">
                <Link 
                  to={
                    user?.role === 'admin' ? '/admin-dashboard' : 
                    (user?.role === 'center' || user?.role === 'specialist' || sessionStorage.getItem('isSpecialist') === 'true') ? '/specialist-dashboard' : 
                    '/dashboard'
                  }
                >
                  <Button variant="outline" className="flex items-center whitespace-nowrap">
                    <LayoutDashboard className="mr-2 h-4 w-4" />
                    {i18n.language === 'ar' ? 'لوحة التحكم' : 'Dashboard'}
                  </Button>
                </Link>
                <Button variant="ghost" size="icon" onClick={() => { signOut(); navigate('/'); }} className="text-red-500 hover:text-red-600 hover:bg-red-50">
                  <LogOut className="h-5 w-5" />
                </Button>
              </div>
            ) : (
              <div className="hidden sm:flex items-center gap-2">
                <Link to="/login">
                  <Button variant="ghost" size="sm" className="flex items-center whitespace-nowrap">
                    <User className="mr-1.5 h-4 w-4" />
                    {i18n.language === 'ar' ? 'تسجيل الدخول' : 'Login'}
                  </Button>
                </Link>
                <Link to="/specialist-login">
                  <Button variant="outline" size="sm" className="flex items-center whitespace-nowrap border-teal-500 text-teal-600 hover:bg-teal-50">
                    <Building className="mr-1.5 h-4 w-4" />
                    {i18n.language === 'ar' ? 'أخصائي' : 'Specialist'}
                  </Button>
                </Link>
              </div>
            )}
            
            <a href="https://wa.me/201119056895" target="_blank" rel="noopener noreferrer">
              <Button variant="default" size="sm" className="hidden sm:flex items-center medical-btn whitespace-nowrap">
                <Phone className="mr-1.5 h-4 w-4" />
                {t('nav.contact_us')}
              </Button>
            </a>

            <Button variant="ghost" size="icon" onClick={toggleLanguage} title="تغيير اللغة / Change Language">
              <Globe className="h-5 w-5 text-gray-700" />
              <span className="sr-only">Toggle language</span>
            </Button>
            
            <div className="lg:hidden flex items-center">
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
        
        {/* Mobile menu - integrated within the same navbar container */}
        {isOpen && (
          <div className="lg:hidden py-2 border-t border-gray-200">
            <div className="flex flex-col space-y-1">
              {navLinks.map((link) => (
                <Link 
                  key={link.path} 
                  to={link.path} 
                  className="block py-2 px-3 rounded-md hover:bg-primary/10" 
                  onClick={toggleMenu}
                >
                  {link.label}
                </Link>
              ))}
              {!isAuthenticated ? (
                <>
                  <Link 
                    to="/login" 
                    className="block py-2 px-3 rounded-md hover:bg-primary/10 text-gray-700 font-medium" 
                    onClick={toggleMenu}
                  >
                    {i18n.language === 'ar' ? 'تسجيل الدخول / حساب جديد' : 'Login / Register'}
                  </Link>
                  <Link 
                    to="/specialist-login" 
                    className="block py-2 px-3 rounded-md hover:bg-teal-50 text-teal-600 font-bold" 
                    onClick={toggleMenu}
                  >
                    {i18n.language === 'ar' ? 'تسجيل كأخصائي' : 'Specialist Login'}
                  </Link>
                </>
              ) : (
                <>
                  <Link 
                    to={
                      user?.role === 'admin' ? '/admin-dashboard' : 
                      (user?.role === 'center' || user?.role === 'specialist' || sessionStorage.getItem('isSpecialist') === 'true') ? '/specialist-dashboard' : 
                      '/dashboard'
                    }
                    className="block py-2 px-3 rounded-md hover:bg-primary/10 font-bold text-medical-700" 
                    onClick={toggleMenu}
                  >
                    {i18n.language === 'ar' ? 'لوحة التحكم' : 'Dashboard'}
                  </Link>
                  <button 
                    className="w-full text-start py-2 px-3 rounded-md hover:bg-red-50 text-red-500 font-bold" 
                    onClick={() => { signOut(); toggleMenu(); navigate('/'); }}
                  >
                    {i18n.language === 'ar' ? 'تسجيل الخروج' : 'Logout'}
                  </button>
                </>
              )}
              <a 
                href="https://wa.me/201119056895" 
                target="_blank" 
                rel="noopener noreferrer"
                className="block py-2 px-3 rounded-md hover:bg-primary/10 font-bold text-medical-700"
              >
                {t('nav.contact_us')}
              </a>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;