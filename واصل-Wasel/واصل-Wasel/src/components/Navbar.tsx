import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X, User, Phone, Moon, Sun, Upload, Sparkles, Building, UserCheck } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from "@/providers/theme-provider";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "sonner";
import { 
  getLocalSpecialists, saveLocalSpecialists, type Specialist,
  getLocalCenters, type Center 
} from '@/lib/db';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { theme, setTheme } = useTheme();

  // Login States (Specialist / Admin)
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  // Patient Login States
  const [patientName, setPatientName] = useState('');
  const [patientPhone, setPatientPhone] = useState('');

  // Specialist Registration States
  const [regName, setRegName] = useState('');
  const [regUsername, setRegUsername] = useState('');
  const [regPassword, setRegPassword] = useState('');
  const [regPhone, setRegPhone] = useState('');
  const [regRole, setRegRole] = useState('أخصائي أطراف صناعية وجبائر طبية');
  const [regBio, setRegBio] = useState('');
  const [regImage, setRegImage] = useState('/images/new.jpg');

  // Center Registration States
  const [regCenterName, setRegCenterName] = useState('');
  const [regCenterLocation, setRegCenterLocation] = useState('');
  const [regCenterAddress, setRegCenterAddress] = useState('');
  const [regCenterPhone, setRegCenterPhone] = useState('');
  const [regCenterWorkingHours, setRegCenterWorkingHours] = useState('السبت - الخميس: 9 صباحاً - 9 مساءً');
  const [regCenterRegion, setRegCenterRegion] = useState('القاهرة الكبرى');
  const [centerImage, setCenterImage] = useState('/images/ortho.png');

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  // Base64 file reader helper
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, type: 'spec' | 'center') => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 2 * 1024 * 1024) {
        toast.error('حجم الصورة كبير جداً، الحد الأقصى 2 ميجا بايت');
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        if (type === 'spec') {
          setRegImage(reader.result as string);
        } else {
          setCenterImage(reader.result as string);
        }
        toast.success('تم تحميل الصورة بنجاح وتحديث المعاينة');
      };
      reader.readAsDataURL(file);
    }
  };

  // Specialist/Admin Login Handler
  const handleSpecialistLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (!username.trim()) {
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

  // Patient/Case Login Handler
  const handlePatientLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (!patientName.trim() || !patientPhone.trim()) {
      toast.error('يرجى إدخال اسمك ورقم الهاتف');
      return;
    }

    const phoneRegex = /^01[0125][0-9]{8}$/;
    if (!phoneRegex.test(patientPhone)) {
      toast.error('رقم الهاتف غير صحيح، يرجى إدخال رقم هاتف مصري (01xxxxxxxxx)');
      return;
    }

    sessionStorage.setItem('isPatient', 'true');
    sessionStorage.setItem('patientName', patientName.trim());
    sessionStorage.setItem('patientPhone', patientPhone.trim());
    toast.success(`مرحباً بك يا ${patientName}! تم تسجيل الدخول كحالة/مريض.`);
    window.location.reload();
  };

  // Specialist Registration Request Handler
  const handleRegisterSpec = (e: React.FormEvent) => {
    e.preventDefault();
    if (!regName.trim() || !regUsername.trim() || !regPassword) {
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
      name: regName.trim(),
      username: regUsername.trim(),
      password: regPassword,
      role: regRole,
      bio: regBio || 'أخصائي متمرس في الأطراف الصناعية والأجهزة التقويمية الحديثة.',
      image: regImage,
      expertise: [],
      status: 'pending',
      phone: regPhone
    };

    const updated = [...allSpecs, newSpec];
    saveLocalSpecialists(updated);
    toast.success('تم تسجيل طلبك بنجاح! في انتظار موافقة المسؤول (الادمن) لتفعيل حسابك.');
    
    // Reset Form
    setRegName('');
    setRegUsername('');
    setRegPassword('');
    setRegPhone('');
    setRegBio('');
    setRegImage('/images/new.jpg');
  };

  // Center Registration Request Handler
  const handleRegisterCenter = (e: React.FormEvent) => {
    e.preventDefault();
    if (!regCenterName.trim() || !regCenterLocation.trim() || !regCenterAddress.trim() || !regCenterPhone.trim()) {
      toast.error('يرجى تعبئة جميع الحقول الإلزامية للمركز (*)');
      return;
    }

    const allCenters = getLocalCenters();
    const newCenter: Center = {
      id: Date.now().toString(),
      name: regCenterName.trim(),
      location: regCenterLocation.trim(),
      address: regCenterAddress.trim(),
      phone: regCenterPhone.trim(),
      workingHours: regCenterWorkingHours,
      image: centerImage,
      region: regCenterRegion,
      description: `مركز واصل المعتمد في محافظة ${regCenterLocation}. يوفر أحدث خدمات تصنيع وتركيب الأطراف الصناعية والجبائر الطبية بدقة متناهية وبأسعار مخفضة.`,
      services: [
        'تصميم وتركيب الأطراف الصناعية الذكية (علوية وسفلية)',
        'جبائر تقويم العظام المخصصة (AFO, KAFO)',
        'تصميم الفرش الطبي والأحذية الطبية المخصصة باستخدام تقنيات قياس الضغط',
        'صيانة دورية فورية وتعديل مقاسات الأجهزة والجبائر',
        'جلسات تدريب وتأهيل حركي مجانية للمرضى الجدد'
      ],
      reviews: [],
      status: 'pending' // Admin must approve
    };

    const updated = [...allCenters, newCenter];
    localStorage.setItem('centers', JSON.stringify(updated));
    toast.success('تم إرسال طلب تسجيل مركزك الجديد بنجاح! في انتظار تفعيل الأدمن للفرع.');
    
    // Reset Form
    setRegCenterName('');
    setRegCenterLocation('');
    setRegCenterAddress('');
    setRegCenterPhone('');
    setCenterImage('/images/ortho.png');
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
              <span className="mx-3 font-bold text-xl text-medical-850">واصــــل</span>
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
                  className="text-gray-750 hover:text-medical-600 font-semibold relative group transition-colors duration-300"
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
                  <span className="text-xs font-bold text-medical-800 bg-medical-50/80 border border-medical-200 px-3 py-2 rounded-full hidden sm:inline-block shadow-sm">
                    👤 مرحباً بك: {loggedInName} (حالة/مريض)
                  </span>
                ) : (
                  <Link to={isAdmin ? "/admin-dashboard" : "/specialist-dashboard"}>
                    <Button variant="outline" className="flex items-center hover:scale-105 transition-transform duration-200 border-medical-200 text-medical-800">
                      <User className="mr-1 h-4 w-4" />
                      لوحة التحكم ({loggedInName})
                    </Button>
                  </Link>
                )}
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
                <Dialog>
                  <DialogTrigger asChild>
                    <Button variant="outline" className="flex items-center hover:scale-105 transition-transform duration-200 border-medical-200 text-medical-800 hover:bg-medical-50 shadow-sm font-semibold">
                      <User className="mr-2 h-4 w-4 text-medical-600" />
                      الدخول / التسجيل
                    </Button>
                  </DialogTrigger>
                  
                  <DialogContent className="max-w-2xl max-h-[85vh] overflow-y-auto">
                    <DialogHeader>
                      <DialogTitle className="text-center text-xl font-bold text-gray-900">
                        بوابة واصل - الدخول والتسجيل
                      </DialogTitle>
                    </DialogHeader>
                    
                    <Tabs defaultValue="login" className="w-full mt-2">
                      <TabsList className="grid grid-cols-4 mb-6">
                        <TabsTrigger value="login">دخول الأخصائي</TabsTrigger>
                        <TabsTrigger value="patient">دخول الحالات</TabsTrigger>
                        <TabsTrigger value="spec_reg">تسجيل أخصائي</TabsTrigger>
                        <TabsTrigger value="center_reg">تسجيل مركز</TabsTrigger>
                      </TabsList>
                      
                      {/* --- Specialist/Admin Login Tab --- */}
                      <TabsContent value="login">
                        <form onSubmit={handleSpecialistLogin} className="space-y-4 max-w-md mx-auto py-2">
                          <div>
                            <Label htmlFor="navbar-username">اسم المستخدم للأخصائي / المسؤول</Label>
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
                          <Button type="submit" className="w-full bg-medical-600 hover:bg-medical-700 text-white font-semibold">تسجيل دخول الأخصائيين</Button>
                        </form>
                      </TabsContent>
                      
                      {/* --- Patient Login Tab --- */}
                      <TabsContent value="patient">
                        <form onSubmit={handlePatientLogin} className="space-y-4 max-w-md mx-auto py-2">
                          <div className="bg-medical-50 p-4 rounded-xl border border-medical-100 text-xs text-medical-800 leading-relaxed mb-4">
                            ✨ <strong>مرحباً بك في واصل!</strong> كحالة أو مريض، يمكنك تسجيل الدخول السريع باسمك ورقم هاتفك لتقييم المراكز والأطباء وحجز مواعيدك بسهولة وسرعة فائقة.
                          </div>
                          <div>
                            <Label htmlFor="patient-name">اسم المريض الكامل *</Label>
                            <Input 
                              id="patient-name" 
                              type="text" 
                              value={patientName}
                              onChange={(e) => setPatientName(e.target.value)}
                              className="mt-1"
                              placeholder="أدخل اسمك"
                              required
                            />
                          </div>
                          <div>
                            <Label htmlFor="patient-phone">رقم الهاتف (الواتساب) *</Label>
                            <Input 
                              id="patient-phone" 
                              type="text" 
                              value={patientPhone}
                              onChange={(e) => setPatientPhone(e.target.value)}
                              className="mt-1"
                              placeholder="مثال: 01012345678"
                              required
                            />
                          </div>
                          <Button type="submit" className="w-full bg-amber-500 hover:bg-amber-600 text-white font-semibold flex items-center justify-center gap-2">
                            <UserCheck className="h-5 w-5" /> تسجيل دخول المريض
                          </Button>
                        </form>
                      </TabsContent>
                      
                      {/* --- Specialist Register Tab --- */}
                      <TabsContent value="spec_reg">
                        <form onSubmit={handleRegisterSpec} className="grid grid-cols-1 md:grid-cols-2 gap-4 py-2 text-right">
                          <div className="space-y-3">
                            <div>
                              <Label htmlFor="reg-name">الاسم بالكامل *</Label>
                              <Input 
                                id="reg-name" 
                                value={regName}
                                onChange={(e) => setRegName(e.target.value)}
                                placeholder="أدخل اسمك الثلاثي"
                                required
                              />
                            </div>
                            <div>
                              <Label htmlFor="reg-username">اسم المستخدم المقترح *</Label>
                              <Input 
                                id="reg-username" 
                                value={regUsername}
                                onChange={(e) => setRegUsername(e.target.value)}
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
                                placeholder="•••••••• (6 خانات على الأقل)"
                                required
                              />
                            </div>
                            <div>
                              <Label htmlFor="reg-phone">رقم الهاتف (الواتساب) *</Label>
                              <Input 
                                id="reg-phone" 
                                value={regPhone}
                                onChange={(e) => setRegPhone(e.target.value)}
                                placeholder="مثال: 01012345678"
                                required
                              />
                            </div>
                          </div>
                          <div className="space-y-3">
                            <div>
                              <Label htmlFor="reg-role">الوظيفة / التخصص العلمي</Label>
                              <Input 
                                id="reg-role" 
                                value={regRole}
                                onChange={(e) => setRegRole(e.target.value)}
                              />
                            </div>
                            <div>
                              <Label htmlFor="reg-image-upload" className="flex items-center gap-1.5 cursor-pointer text-medical-700 hover:text-medical-800">
                                <Upload className="h-4 w-4" /> تحميل صورتك الشخصية
                              </Label>
                              <Input 
                                id="reg-image-upload" 
                                type="file" 
                                accept="image/*"
                                onChange={(e) => handleFileChange(e, 'spec')}
                                className="mt-1 text-xs"
                              />
                              <div className="mt-2 h-16 w-16 rounded-full overflow-hidden border bg-gray-50 flex items-center justify-center">
                                <img src={regImage} alt="المعاينة" className="w-full h-full object-cover" />
                              </div>
                            </div>
                            <div>
                              <Label htmlFor="reg-bio">نبذة تعريفية سريعة</Label>
                              <Textarea 
                                id="reg-bio" 
                                value={regBio}
                                onChange={(e) => setRegBio(e.target.value)}
                                placeholder="اكتب نبذة مختصرة عن مؤهلاتك وخبرتك..."
                                rows={2}
                              />
                            </div>
                          </div>
                          <div className="md:col-span-2 mt-2">
                            <Button type="submit" className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold">
                              تقديم طلب الانضمام كأخصائي
                            </Button>
                          </div>
                        </form>
                      </TabsContent>
                      
                      {/* --- Center Register Tab --- */}
                      <TabsContent value="center_reg">
                        <form onSubmit={handleRegisterCenter} className="grid grid-cols-1 md:grid-cols-2 gap-4 py-2 text-right">
                          <div className="space-y-3">
                            <div>
                              <Label htmlFor="reg-center-name">اسم المركز / الفرع *</Label>
                              <Input 
                                id="reg-center-name" 
                                value={regCenterName}
                                onChange={(e) => setRegCenterName(e.target.value)}
                                placeholder="مثال: مركز واصل - فرع المنوفية"
                                required
                              />
                            </div>
                            <div>
                              <Label htmlFor="reg-center-location">المحافظة التابع لها *</Label>
                              <Input 
                                id="reg-center-location" 
                                value={regCenterLocation}
                                onChange={(e) => setRegCenterLocation(e.target.value)}
                                placeholder="مثال: المنوفية"
                                required
                              />
                            </div>
                            <div>
                              <Label htmlFor="reg-center-address">العنوان التفصيلي بالكامل *</Label>
                              <Input 
                                id="reg-center-address" 
                                value={regCenterAddress}
                                onChange={(e) => setRegCenterAddress(e.target.value)}
                                placeholder="مثال: شبين الكوم، بجوار المستشفى التعليمي"
                                required
                              />
                            </div>
                            <div>
                              <Label htmlFor="reg-center-phone">رقم هاتف الفرع (الواتساب للمتابعة) *</Label>
                              <Input 
                                id="reg-center-phone" 
                                value={regCenterPhone}
                                onChange={(e) => setRegCenterPhone(e.target.value)}
                                placeholder="مثال: 01012345678"
                                required
                              />
                            </div>
                          </div>
                          
                          <div className="space-y-3">
                            <div>
                              <Label htmlFor="reg-center-hours">ساعات العمل الرسمية</Label>
                              <Input 
                                id="reg-center-hours" 
                                value={regCenterWorkingHours}
                                onChange={(e) => setRegCenterWorkingHours(e.target.value)}
                              />
                            </div>
                            <div>
                              <Label htmlFor="reg-center-region">المنطقة الجغرافية</Label>
                              <select 
                                id="reg-center-region"
                                value={regCenterRegion}
                                onChange={(e) => setRegCenterRegion(e.target.value)}
                                className="w-full mt-1 border rounded-md p-2 text-sm bg-white"
                              >
                                <option value="القاهرة الكبرى">القاهرة الكبرى</option>
                                <option value="الإسكندرية">الإسكندرية</option>
                                <option value="الدلتا">الدلتا</option>
                                <option value="الصعيد">الصعيد</option>
                                <option value="القناة">القناة</option>
                                <option value="الحدود">الحدود</option>
                              </select>
                            </div>
                            
                            <div>
                              <Label htmlFor="center-image-upload" className="flex items-center gap-1.5 cursor-pointer text-medical-700 hover:text-medical-800">
                                <Upload className="h-4 w-4" /> تحميل واجهة وصورة المركز
                              </Label>
                              <Input 
                                id="center-image-upload" 
                                type="file" 
                                accept="image/*"
                                onChange={(e) => handleFileChange(e, 'center')}
                                className="mt-1 text-xs"
                              />
                              <div className="mt-2 h-16 w-24 rounded-lg overflow-hidden border bg-gray-50 flex items-center justify-center">
                                <img src={centerImage} alt="المعاينة" className="w-full h-full object-cover" />
                              </div>
                            </div>
                          </div>
                          
                          <div className="md:col-span-2 mt-2">
                            <Button type="submit" className="w-full bg-medical-600 hover:bg-medical-700 text-white font-semibold">
                              تقديم طلب تسجيل مركز جديد
                            </Button>
                          </div>
                        </form>
                      </TabsContent>
                    </Tabs>
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
                      className="block py-2 px-3 rounded-md hover:bg-primary/10 transition-colors duration-200 font-semibold text-gray-750" 
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