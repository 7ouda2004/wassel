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
import { 
  getLocalSpecialists, saveLocalSpecialists, type Specialist 
} from '@/lib/db';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const { theme, setTheme } = useTheme();

  // Registration States
  const [isRegisterMode, setIsRegisterMode] = useState(false);
  const [regName, setRegName] = useState('');
  const [regUsername, setRegUsername] = useState('');
  const [regPassword, setRegPassword] = useState('');
  const [regPhone, setRegPhone] = useState('');
  const [regRole, setRegRole] = useState('أخصائي أطراف صناعية وجبائر طبية');
  const [regBio, setRegBio] = useState('');

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
      
      // Admin Account Check
      if (username === 'admin' && password === 'admin123') {
        sessionStorage.setItem('isAdmin', 'true');
        sessionStorage.setItem('username', 'admin');
        toast.success('تم تسجيل دخول المسؤول بنجاح');
        window.location.href = '/admin-dashboard';
        return;
      }

      // Check against dynamic Specialists database in localStorage
      const allSpecs = getLocalSpecialists();
      const foundSpec = allSpecs.find(s => s.username === username && s.password === password);
      
      if (foundSpec) {
        if (foundSpec.status === 'pending') {
          toast.error('حسابك قيد الانتظار لموافقة المسؤول (الادمن)');
          return;
        }
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

  const handleRegisterSpec = (e) => {
    e.preventDefault();
    if (!regName || !regUsername || !regPassword) {
      toast.error('يرجى تعبئة الحقول المطلوبة');
      return;
    }
    
    const allSpecs = getLocalSpecialists();
    if (allSpecs.some(s => s.username === regUsername) || regUsername === 'admin') {
      toast.error('اسم المستخدم هذا مستخدم بالفعل');
      return;
    }

    const newSpec: Specialist = {
      id: Date.now().toString(),
      name: regName,
      username: regUsername,
      password: regPassword,
      role: regRole,
      bio: regBio || 'أخصائي متمرس في الأطراف الصناعية والأجهزة التقويمية الحديثة.',
      image: '/images/new.jpg',
      expertise: [],
      status: 'pending',
      phone: regPhone
    };

    const updated = [...allSpecs, newSpec];
    saveLocalSpecialists(updated);
    toast.success('تم تسجيل طلبك بنجاح! يرجى انتظار موافقة المسؤول لتفعيل حسابك.');
    
    // Reset form & toggle back to login
    setRegName('');
    setRegUsername('');
    setRegPassword('');
    setRegPhone('');
    setRegBio('');
    setIsRegisterMode(false);
  };

  const handleLogout = () => {
    sessionStorage.removeItem('isSpecialist');
    sessionStorage.removeItem('isAdmin');
    sessionStorage.removeItem('username');
    toast.success('تم تسجيل الخروج بنجاح');
    window.location.href = '/';
  };

  const isLoggedIn = sessionStorage.getItem('isSpecialist') === 'true' || sessionStorage.getItem('isAdmin') === 'true';
  const isAdmin = sessionStorage.getItem('isAdmin') === 'true';

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
              <div className="flex items-center gap-2">
                <Link to={isAdmin ? "/admin-dashboard" : "/specialist-dashboard"}>
                  <Button variant="outline" className="flex items-center hover:scale-105 transition-transform duration-200">
                    <User className="mr-2 h-4 w-4" />
                    لوحة التحكم
                  </Button>
                </Link>
                <Button variant="destructive" onClick={handleLogout} className="hover:scale-105 transition-transform duration-200">
                  خروج
                </Button>
              </div>
            ) : (
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.1 }}
              >
                <Dialog onOpenChange={(open) => { if (!open) setIsRegisterMode(false); }}>
                  <DialogTrigger asChild>
                    <Button variant="outline" className="flex items-center hover:scale-105 transition-transform duration-200">
                      <User className="mr-2 h-4 w-4" />
                        الدخول كـأخصائي
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-md">
                    <DialogHeader>
                      <DialogTitle className="text-center">
                        {isRegisterMode ? 'تقديم طلب انضمام كأخصائي' : 'تسجيل دخول الأخصائي / المسؤول'}
                      </DialogTitle>
                    </DialogHeader>

                    {!isRegisterMode ? (
                      <form onSubmit={handleSpecialistLogin} className="space-y-4">
                        <div>
                          <Label htmlFor="navbar-username">اسم المستخدم</Label>
                          <Input 
                            id="navbar-username" 
                            type="text" 
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            className="mt-1"
                            placeholder="اسم المستخدم"
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
                        <Button type="submit" className="w-full bg-medical-600 hover:bg-medical-700 text-white">تسجيل الدخول</Button>
                        <div className="text-center mt-4">
                          <button 
                            type="button" 
                            onClick={() => setIsRegisterMode(true)}
                            className="text-sm text-medical-600 hover:underline font-semibold"
                          >
                            ليس لديك حساب؟ سجل كأخصائي جديد
                          </button>
                        </div>
                      </form>
                    ) : (
                      <form onSubmit={handleRegisterSpec} className="space-y-3">
                        <div>
                          <Label htmlFor="reg-name">الاسم بالكامل *</Label>
                          <Input 
                            id="reg-name" 
                            type="text" 
                            value={regName}
                            onChange={(e) => setRegName(e.target.value)}
                            className="mt-1"
                            placeholder="أدخل اسمك الثلاثي"
                            required
                          />
                        </div>
                        <div>
                          <Label htmlFor="reg-username">اسم المستخدم *</Label>
                          <Input 
                            id="reg-username" 
                            type="text" 
                            value={regUsername}
                            onChange={(e) => setRegUsername(e.target.value)}
                            className="mt-1"
                            placeholder="مثال: ahmad_ali"
                            required
                          />
                        </div>
                        <div>
                          <Label htmlFor="reg-password">كلمة المرور *</Label>
                          <Input 
                            id="reg-password" 
                            type="password" 
                            value={regPassword}
                            onChange={(e) => setRegPassword(e.target.value)}
                            className="mt-1"
                            placeholder="•••••••• (6 خانات على الأقل)"
                            required
                          />
                        </div>
                        <div>
                          <Label htmlFor="reg-phone">رقم الهاتف</Label>
                          <Input 
                            id="reg-phone" 
                            type="text" 
                            value={regPhone}
                            onChange={(e) => setRegPhone(e.target.value)}
                            className="mt-1"
                            placeholder="مثال: 01012345678"
                          />
                        </div>
                        <div>
                          <Label htmlFor="reg-role">الوظيفة / التخصص العلمي</Label>
                          <Input 
                            id="reg-role" 
                            type="text" 
                            value={regRole}
                            onChange={(e) => setRegRole(e.target.value)}
                            className="mt-1"
                            placeholder="أخصائي أطراف صناعية"
                          />
                        </div>
                        <div>
                          <Label htmlFor="reg-bio">نبذة تعريفية سريعة</Label>
                          <Textarea 
                            id="reg-bio" 
                            value={regBio}
                            onChange={(e) => setRegBio(e.target.value)}
                            className="mt-1"
                            placeholder="اكتب نبذة مختصرة عن مؤهلاتك..."
                            rows={2}
                          />
                        </div>
                        <Button type="submit" className="w-full bg-green-600 hover:bg-green-700 text-white mt-2">تقديم طلب التسجيل</Button>
                        <div className="text-center mt-3">
                          <button 
                            type="button" 
                            onClick={() => setIsRegisterMode(false)}
                            className="text-sm text-medical-600 hover:underline font-semibold"
                          >
                            لديك حساب بالفعل؟ تسجيل الدخول
                          </button>
                        </div>
                      </form>
                    )}
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