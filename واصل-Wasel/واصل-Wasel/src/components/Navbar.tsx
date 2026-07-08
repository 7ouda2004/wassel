import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X, User, Phone, Moon, Sun } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from "@/providers/theme-provider";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const { theme, setTheme } = useTheme();

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleSpecialistLogin = async (e) => {
    e.preventDefault();
    try {
      if (!username) {
        toast.error('يرجى إدخال اسم المستخدم');
        return;
      }
      if (password.length < 6) {
        toast.error('كلمة المرور يجب أن تكون 6 أحرف على الأقل');
        return;
      }
      
      // Check credentials
      const isMahmoud = username === 'mahmoud' && password === 'daizer';
      const isSpecialist = username === 'specialist' && password === 'specialist123';
      
      if (isMahmoud || isSpecialist) {
        sessionStorage.setItem('isSpecialist', 'true');
        sessionStorage.setItem('username', username);
        toast.success('تم تسجيل الدخول بنجاح');
        window.location.href = '/specialist-dashboard';
      } else {
        toast.error('اسم المستخدم أو كلمة المرور غير صحيحة');
      }
    } catch (error) {
      console.error('خطأ في تسجيل الدخول:', error);
      toast.error('حدث خطأ أثناء تسجيل الدخول');
    }
  };

  const isLoggedIn = sessionStorage.getItem('isSpecialist') === 'true';

  // Define navigation links once to avoid duplication
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
              <div className="h-10 w-10 rounded-full bg-gradient-to-tr from-medical-500 to-medical-700 flex items-center justify-center">
                <span className="text-white font-bold text-lg">W</span>
              </div>
              <span className="mx-3 font-bold text-xl text-medical-800">واصــــل</span>
            </Link>
          </div>
          
          {/* Desktop menu */}
          <div className="hidden md:flex md:items-center md:space-x-6 md:rtl:space-x-reverse">
            {navLinks.map((link, index) => (
              <motion.div
                key={link.path}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Link 
                  to={link.path} 
                  className="text-gray-700 hover:text-primary font-medium relative group transition-colors duration-300"
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
          
          <div className="flex items-center space-x-4 rtl:space-x-reverse">
            {isLoggedIn ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
              >
                <Link to="/specialist-dashboard">
                  <Button variant="outline" className="flex items-center hover:scale-105 transition-transform duration-200">
                    <User className="mr-2 h-4 w-4" />
                    لوحة التحكم
                  </Button>
                </Link>
              </motion.div>
            ) : (
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.1 }}
              >
                <Dialog>
                  <DialogTrigger asChild>
                    <Button variant="outline" className="flex items-center hover:scale-105 transition-transform duration-200">
                      <User className="mr-2 h-4 w-4" />
                        الدخول كـأخصائي
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle className="text-center">تسجيل دخول الأخصائي</DialogTitle>
                    </DialogHeader>
                    <form onSubmit={handleSpecialistLogin} className="space-y-4">
                      <div>
                        <Label htmlFor="navbar-username">اسم المستخدم</Label>
                        <Input 
                          id="navbar-username" 
                          type="text" 
                          value={username}
                          onChange={(e) => setUsername(e.target.value)}
                          className="mt-1"
                          placeholder="مثال: mahmoud أو specialist"
                          required
                        />
                      </div>
                      <div>
                        <Label htmlFor="navbar-password">كلمة المرور</Label>
                        <Input 
                          id="navbar-password" 
                          type="password" 
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          className="mt-1"
                          placeholder="••••••••"
                          required
                        />
                      </div>
                      <Button type="submit" className="w-full">تسجيل الدخول</Button>
                    </form>
                  </DialogContent>
                </Dialog>
              </motion.div>
            )}
            
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <a href="https://wa.me/201119056895" target="_blank" rel="noopener noreferrer">
                <Button variant="default" className="flex items-center medical-btn hover:scale-105 transition-transform duration-200">
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
        
        {/* Mobile menu - integrated within the same navbar container */}
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
                    transition={{ delay: index * 0.1 }}
                  >
                    <Link 
                      to={link.path} 
                      className="block py-2 px-3 rounded-md hover:bg-primary/10 transition-colors duration-200" 
                      onClick={toggleMenu}
                    >
                      {link.label}
                    </Link>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </nav>
  );
};

export default Navbar;