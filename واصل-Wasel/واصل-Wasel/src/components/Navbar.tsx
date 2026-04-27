import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X, User, Phone, Moon, Sun, Globe } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useTheme } from "@/providers/theme-provider";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [password, setPassword] = useState('');
  const { theme, setTheme } = useTheme();
  const { t, i18n } = useTranslation();

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
      const isValid = password === 'daizer';
      if (isValid) {
        // استخدام sessionStorage بدلاً من localStorage للأمان
        sessionStorage.setItem('isSpecialist', 'true');
        sessionStorage.setItem('username', 'mahmoud');
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
    { path: "/about", label: t('nav.about') },
    { path: "/team", label: t('nav.team') },
    { path: "/locations", label: t('nav.locations') },
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
              <span className="mx-3 font-bold text-xl text-medical-800">واصــــل</span>
            </Link>
          </div>
          
          {/* Desktop menu */}
          <div className="hidden lg:flex lg:items-center lg:space-x-4 lg:rtl:space-x-reverse flex-1 justify-center px-4">
            {navLinks.map((link) => (
              <Link 
                key={link.path} 
                to={link.path} 
                className="text-gray-700 hover:text-primary font-medium text-sm xl:text-base whitespace-nowrap"
              >
                {link.label}
              </Link>
            ))}
          </div>
          
          <div className="flex items-center space-x-4 rtl:space-x-reverse">
            {isLoggedIn ? (
              <Link to="/specialist-dashboard">
                <Button variant="outline" className="flex items-center whitespace-nowrap">
                  <User className="mr-2 h-4 w-4" />
                  {t('nav.specialist_dashboard')}
                </Button>
              </Link>
            ) : (
              <Dialog>
                <DialogTrigger asChild>
                  <Button variant="outline" className="hidden sm:flex items-center whitespace-nowrap">
                    <User className="mr-2 h-4 w-4" />
                      {t('nav.login_specialist')}
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle className="text-center">تسجيل دخول الأخصائي</DialogTitle>
                  </DialogHeader>
                  <form onSubmit={handleSpecialistLogin} className="space-y-4">
                    <div>
                      <Label htmlFor="password">كلمة المرور</Label>
                      <Input 
                        id="password" 
                        type="password" 
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="mt-1"
                      />
                    </div>
                    <Button type="submit" className="w-full">تسجيل الدخول</Button>
                  </form>
                </DialogContent>
              </Dialog>
            )}
            
            <a href="https://wa.me/201119056895" target="_blank" rel="noopener noreferrer">
              <Button variant="default" className="hidden sm:flex items-center medical-btn whitespace-nowrap">
                <Phone className="mr-2 h-4 w-4" />
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
              {!isLoggedIn ? (
                <Dialog>
                  <DialogTrigger asChild>
                    <button className="block w-full text-start py-2 px-3 rounded-md hover:bg-primary/10 text-gray-700 font-medium">
                      {t('nav.login_specialist')}
                    </button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle className="text-center">تسجيل دخول الأخصائي</DialogTitle>
                    </DialogHeader>
                    <form onSubmit={handleSpecialistLogin} className="space-y-4">
                      <div>
                        <Label htmlFor="mobile-password">كلمة المرور</Label>
                        <Input 
                          id="mobile-password" 
                          type="password" 
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          className="mt-1"
                        />
                      </div>
                      <Button type="submit" className="w-full">تسجيل الدخول</Button>
                    </form>
                  </DialogContent>
                </Dialog>
              ) : (
                <Link 
                  to="/specialist-dashboard" 
                  className="block py-2 px-3 rounded-md hover:bg-primary/10 font-bold text-medical-700" 
                  onClick={toggleMenu}
                >
                  {t('nav.specialist_dashboard')}
                </Link>
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