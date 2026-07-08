import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  User, Lock, Phone, MapPin, Briefcase, FileText, Upload, 
  Sparkles, ShieldCheck, HeartPulse, Building2, Eye, EyeOff, UserCheck
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { toast } from 'sonner';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { 
  getLocalSpecialists, saveLocalSpecialists, type Specialist,
  getLocalCenters, saveLocalCenters, type Center 
} from '@/lib/db';

const Login = () => {
  // Tabs: 'patient' | 'specialist'
  const [activePortal, setActivePortal] = useState<'patient' | 'specialist'>('patient');
  
  // Modes for forms
  const [isPatientRegister, setIsPatientRegister] = useState(false);
  const [specialistMode, setSpecialistMode] = useState<'login' | 'register_spec' | 'register_center'>('login');

  const [showPassword, setShowPassword] = useState(false);

  // Common input states
  const [phonePrefixError, setPhonePrefixError] = useState('');

  // 1. Patient State
  const [patientName, setPatientName] = useState('');
  const [patientPhone, setPatientPhone] = useState('');
  const [patientLocation, setPatientLocation] = useState('سوهاج');
  const [patientAge, setPatientAge] = useState('');

  // 2. Specialist Login State
  const [specUsername, setSpecUsername] = useState('');
  const [specPassword, setSpecPassword] = useState('');

  // 3. Specialist Register State
  const [regSpecName, setRegSpecName] = useState('');
  const [regSpecUsername, setRegSpecUsername] = useState('');
  const [regSpecPassword, setRegSpecPassword] = useState('');
  const [regSpecPhone, setRegSpecPhone] = useState('');
  const [regSpecRole, setRegSpecRole] = useState('أخصائي أطراف صناعية وجبائر طبية');
  const [regSpecBio, setRegSpecBio] = useState('');
  const [regSpecImage, setRegSpecImage] = useState('');

  // 4. Center Register State
  const [regCenterName, setRegCenterName] = useState('');
  const [regCenterLocation, setRegCenterLocation] = useState('');
  const [regCenterAddress, setRegCenterAddress] = useState('');
  const [regCenterPhone, setRegCenterPhone] = useState('');
  const [regCenterWorkingHours, setRegCenterWorkingHours] = useState('السبت - الخميس: 9 صباحاً - 9 مساءً');
  const [regCenterRegion, setRegCenterRegion] = useState('القاهرة الكبرى');
  const [regCenterImage, setRegCenterImage] = useState('');

  useEffect(() => {
    document.documentElement.dir = 'rtl';
    document.body.classList.add('font-cairo');
    window.scrollTo(0, 0);
  }, []);

  // Base64 Image Reader
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>, target: 'spec' | 'center') => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 2 * 1024 * 1024) {
        toast.error('حجم الصورة كبير جداً، الحد الأقصى 2 ميجابايت');
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        if (target === 'spec') {
          setRegSpecImage(reader.result as string);
        } else {
          setRegCenterImage(reader.result as string);
        }
        toast.success('تم تحميل الصورة بنجاح وتحديث المعاينة');
      };
      reader.readAsDataURL(file);
    }
  };

  // Phone Validation Helper
  const validatePhone = (num: string) => {
    const phoneRegex = /^01[0125][0-9]{8}$/;
    return phoneRegex.test(num);
  };

  // Patient Login/Register Submit
  const handlePatientSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!patientName.trim() || !patientPhone.trim()) {
      toast.error('يرجى تعبئة الحقول المطلوبة');
      return;
    }

    if (!validatePhone(patientPhone)) {
      toast.error('رقم الهاتف غير صحيح. يرجى إدخال رقم مصري يبدأ بـ 01 (11 رقم)');
      return;
    }

    // Set Patient Session
    sessionStorage.setItem('isPatient', 'true');
    sessionStorage.setItem('patientName', patientName.trim());
    sessionStorage.setItem('patientPhone', patientPhone.trim());
    
    if (isPatientRegister) {
      // Save patient to patient registry in localStorage if needed (for reports)
      const existingPatients = JSON.parse(localStorage.getItem('patients') || '[]');
      const isNew = !existingPatients.some((p: any) => p.phone === patientPhone);
      if (isNew) {
        const newPatientRecord = {
          id: Date.now(),
          name: patientName.trim(),
          age: patientAge ? parseInt(patientAge) : 30,
          gender: 'ذكر',
          phone: patientPhone.trim(),
          condition: `حالة مسجلة من موقع واصل - محافظة ${patientLocation}`,
          deviceType: 'طرف صناعي',
          measurements: {},
          status: 'جديد',
          lastVisit: new Date().toISOString().split('T')[0],
          nextVisit: '',
          notes: 'سجل حساب مريض عن طريق صفحة الدخول.',
          files: []
        };
        localStorage.setItem('patients', JSON.stringify([...existingPatients, newPatientRecord]));
      }
      toast.success(`مرحباً بك يا ${patientName}! تم إنشاء حسابك وتسجيل دخولك بنجاح.`);
    } else {
      toast.success(`أهلاً بعودتك يا ${patientName}! تم تسجيل دخولك بنجاح.`);
    }

    // Redirect to centers/locations to review/book
    window.location.href = '/locations';
  };

  // Specialist Login Submit
  const handleSpecialistLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (!specUsername.trim() || !specPassword) {
      toast.error('يرجى كتابة اسم المستخدم وكلمة المرور');
      return;
    }

    // Admin login
    if (specUsername === 'admin' && specPassword === 'admin123') {
      sessionStorage.setItem('isAdmin', 'true');
      sessionStorage.setItem('username', 'admin');
      toast.success('تم تسجيل دخول المسؤول بنجاح');
      window.location.href = '/admin-dashboard';
      return;
    }

    const allSpecs = getLocalSpecialists();
    const foundSpec = allSpecs.find(s => s.username === specUsername && s.password === specPassword);

    if (foundSpec) {
      if (foundSpec.status === 'pending') {
        toast.error('حسابك قيد الانتظار لموافقة المسؤول (الادمن). يرجى المحاولة لاحقاً.');
        return;
      }
      if (foundSpec.status === 'rejected') {
        toast.error('عذراً، تم تعطيل أو رفض هذا الحساب من قبل المسؤول. يرجى التواصل معنا.');
        return;
      }
      sessionStorage.setItem('isSpecialist', 'true');
      sessionStorage.setItem('username', specUsername);
      toast.success(`مرحباً بك أخصائي ${foundSpec.name}! تم تسجيل الدخول بنجاح.`);
      window.location.href = '/specialist-dashboard';
    } else {
      toast.error('اسم المستخدم أو كلمة المرور غير صحيحة');
    }
  };

  // Specialist Register Request
  const handleRegisterSpec = (e: React.FormEvent) => {
    e.preventDefault();
    if (!regSpecName.trim() || !regSpecUsername.trim() || !regSpecPassword || !regSpecPhone.trim()) {
      toast.error('يرجى تعبئة الحقول الإلزامية للملف');
      return;
    }

    if (!validatePhone(regSpecPhone)) {
      toast.error('رقم هاتف الواتساب غير صحيح.');
      return;
    }

    const allSpecs = getLocalSpecialists();
    if (allSpecs.some(s => s.username === regSpecUsername) || regSpecUsername === 'admin') {
      toast.error('اسم المستخدم هذا محجوز أو مستخدم بالفعل');
      return;
    }

    const newSpec: Specialist = {
      id: Date.now().toString(),
      name: regSpecName.trim(),
      username: regSpecUsername.trim(),
      password: regSpecPassword,
      role: regSpecRole,
      bio: regSpecBio || 'أخصائي متمرس في الأطراف الصناعية والأجهزة التقويمية الحديثة.',
      image: regSpecImage,
      expertise: [],
      status: 'pending', // Pending Admin approval
      phone: regSpecPhone.trim()
    };

    const updated = [...allSpecs, newSpec];
    saveLocalSpecialists(updated);
    toast.success('تم إرسال طلب انضمامك للمسؤول بنجاح! يرجى انتظار الموافقة لتفعيل حسابك.');
    
    // Reset & switch mode
    setRegSpecName('');
    setRegSpecUsername('');
    setRegSpecPassword('');
    setRegSpecPhone('');
    setRegSpecBio('');
    setRegSpecImage('/images/new.jpg');
    setSpecialistMode('login');
  };

  // Center Register Request
  const handleRegisterCenter = (e: React.FormEvent) => {
    e.preventDefault();
    if (!regCenterName.trim() || !regCenterLocation.trim() || !regCenterAddress.trim() || !regCenterPhone.trim()) {
      toast.error('يرجى تعبئة الحقول الإلزامية للمركز (*)');
      return;
    }

    if (!validatePhone(regCenterPhone)) {
      toast.error('رقم هاتف الفرع غير صحيح.');
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
      image: regCenterImage,
      region: regCenterRegion,
      description: `مركز واصل المعتمد في محافظة ${regCenterLocation}. نوفر أحدث الأطراف والجبائر التقويمية تحت إشراف طبي معتمد وبأعلى كفاءة.`,
      services: [
        'تصميم وتركيب الأطراف الصناعية الذكية (علوية وسفلية)',
        'جبائر تقويم العظام المخصصة (AFO, KAFO)',
        'تصميم الفرش الطبي والأحذية الطبية المخصصة باستخدام تقنيات قياس الضغط',
        'صيانة دورية فورية وتعديل مقاسات الأجهزة والجبائر',
        'جلسات تدريب وتأهيل حركي مجانية للمرضى الجدد'
      ],
      reviews: [],
      status: 'pending' // Pending Admin approval
    };

    const updated = [...allCenters, newCenter];
    saveLocalCenters(updated);
    toast.success('تم تقديم طلب تسجيل مركزك الجديد بنجاح! سيقوم الأدمن بمراجعته وتفعيله.');
    
    // Reset & switch mode
    setRegCenterName('');
    setRegCenterLocation('');
    setRegCenterAddress('');
    setRegCenterPhone('');
    setRegCenterImage('/images/ortho.png');
    setSpecialistMode('login');
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />

      <main className="flex-grow flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl w-full bg-white rounded-3xl shadow-xl overflow-hidden grid grid-cols-1 lg:grid-cols-12 min-h-[600px] border border-gray-100">
          
          {/* Left Column - Marketing/Intro Banner (5 Cols) */}
          <div className="lg:col-span-5 bg-gradient-to-tr from-medical-600 to-medical-800 p-8 flex flex-col justify-between text-white relative">
            {/* Visual Abstract Circle Accents */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full blur-3xl -mr-16 -mt-16 pointer-events-none"></div>
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-medical-500/20 rounded-full blur-3xl -ml-16 -mb-16 pointer-events-none"></div>

            <div className="relative space-y-6">
              <div className="inline-flex items-center gap-2 bg-white/10 px-3 py-1.5 rounded-full backdrop-blur-md border border-white/10 text-xs font-semibold">
                <Sparkles className="h-3.5 w-3.5 text-amber-300 fill-amber-300" />
                <span>منصة واصل المتكاملة للأطراف الصناعية</span>
              </div>
              <h2 className="text-3xl font-extrabold leading-tight font-cairo">
                بوابتك لاستعادة الحركة والحياة الطبيعية
              </h2>
              <p className="text-sm text-medical-100 leading-relaxed font-medium">
                نربط بين الحالات المرضية وأفضل الأخصائيين المعتمدين والمراكز الطبية المتطورة في جميع محافظات جمهورية مصر العربية لضمان تجربة تأهيل ناجحة.
              </p>
            </div>

            <div className="relative pt-12 space-y-4 border-t border-white/10">
              <div className="flex items-center gap-3">
                <div className="h-8 w-8 rounded-lg bg-white/10 flex items-center justify-center">
                  <ShieldCheck className="h-5 w-5 text-medical-200" />
                </div>
                <div>
                  <h4 className="text-xs font-bold">أمان تام واعتمادية</h4>
                  <p className="text-[10px] text-medical-200">جميع المراكز والأخصائيين يتم فحصهم وقبولهم يدوياً</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="h-8 w-8 rounded-lg bg-white/10 flex items-center justify-center">
                  <HeartPulse className="h-5 w-5 text-medical-200" />
                </div>
                <div>
                  <h4 className="text-xs font-bold">متابعة وقياسات دورية</h4>
                  <p className="text-[10px] text-medical-200">لوحة تحكم ذكية لمتابعة حالة المريض وأخذ قياسات الأطراف</p>
                </div>
              </div>
            </div>

            <div className="relative text-[10px] text-medical-300 pt-6">
              حقوق الطبع محفوظة لمنصة واصل © {new Date().getFullYear()}
            </div>
          </div>

          {/* Right Column - Forms Section (7 Cols) */}
          <div className="lg:col-span-7 p-8 md:p-10 flex flex-col justify-between bg-white overflow-y-auto">
            
            {/* Top Selector Tabs */}
            <div className="space-y-6">
              <div className="flex bg-gray-100 p-1.5 rounded-2xl border">
                <button
                  onClick={() => {
                    setActivePortal('patient');
                    setIsPatientRegister(false);
                  }}
                  className={`flex-1 py-3 text-center rounded-xl font-bold text-sm transition-all flex items-center justify-center gap-2 ${
                    activePortal === 'patient' 
                      ? 'bg-white text-medical-700 shadow-sm' 
                      : 'text-gray-500 hover:text-gray-700'
                  }`}
                >
                  <User className="h-4 w-4" />
                  بوابة الحالات / المرضى
                </button>
                <button
                  onClick={() => {
                    setActivePortal('specialist');
                    setSpecialistMode('login');
                  }}
                  className={`flex-1 py-3 text-center rounded-xl font-bold text-sm transition-all flex items-center justify-center gap-2 ${
                    activePortal === 'specialist' 
                      ? 'bg-white text-medical-700 shadow-sm' 
                      : 'text-gray-500 hover:text-gray-700'
                  }`}
                >
                  <Building2 className="h-4 w-4" />
                  الأخصائيين والمراكز
                </button>
              </div>

              {/* Form Content Wrapper */}
              <AnimatePresence mode="wait">
                
                {/* ======================================= */}
                {/* 1. Patient Portal Forms */}
                {/* ======================================= */}
                {activePortal === 'patient' && (
                  <motion.div
                    key="patient-portal"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.2 }}
                    className="space-y-4"
                  >
                    <div>
                      <h3 className="text-xl font-bold text-gray-900">
                        {isPatientRegister ? 'إنشاء حساب جديد للمريض' : 'تسجيل دخول الحالات'}
                      </h3>
                      <p className="text-xs text-gray-500 mt-1">
                        {isPatientRegister 
                          ? 'أدخل بياناتك بالكامل لإنشاء حسابك وحجز موعدك فوراً' 
                          : 'سجل دخولك السريع بالاسم ورقم الهاتف لتصفح وحجز المواعيد'}
                      </p>
                    </div>

                    <form onSubmit={handlePatientSubmit} className="space-y-4">
                      <div className="space-y-1.5">
                        <Label htmlFor="patient-fullname">الاسم بالكامل *</Label>
                        <div className="relative">
                          <Input 
                            id="patient-fullname"
                            placeholder="الاسم بالكامل"
                            value={patientName}
                            onChange={(e) => setPatientName(e.target.value)}
                            required
                            className="pr-10"
                          />
                          <User className="absolute right-3 top-3 h-4 w-4 text-gray-400" />
                        </div>
                      </div>

                      <div className="space-y-1.5">
                        <Label htmlFor="patient-phone-num">رقم الهاتف (الواتساب) *</Label>
                        <div className="relative">
                          <Input 
                            id="patient-phone-num"
                            placeholder="رقم الهاتف"
                            value={patientPhone}
                            onChange={(e) => setPatientPhone(e.target.value)}
                            required
                            className="pr-10"
                          />
                          <Phone className="absolute right-3 top-3 h-4 w-4 text-gray-400" />
                        </div>
                      </div>

                      {isPatientRegister && (
                        <div className="grid grid-cols-2 gap-4">
                          <div className="space-y-1.5">
                            <Label htmlFor="patient-age-input">العمر</Label>
                            <Input 
                              id="patient-age-input"
                              type="number"
                              placeholder="العمر"
                              value={patientAge}
                              onChange={(e) => setPatientAge(e.target.value)}
                            />
                          </div>
                          <div className="space-y-1.5">
                            <Label htmlFor="patient-gov">المحافظة</Label>
                            <select 
                              id="patient-gov"
                              value={patientLocation}
                              onChange={(e) => setPatientLocation(e.target.value)}
                              className="w-full h-10 border rounded-md p-2 text-sm bg-white"
                            >
                              <option value="سوهاج">سوهاج</option>
                              <option value="القاهرة">القاهرة</option>
                              <option value="الإسكندرية">الإسكندرية</option>
                              <option value="المنوفية">المنوفية</option>
                              <option value="الدقهلية">الدقهلية</option>
                              <option value="أسيوط">أسيوط</option>
                              <option value="قنا">قنا</option>
                            </select>
                          </div>
                        </div>
                      )}

                      <Button type="submit" className="w-full bg-medical-600 hover:bg-medical-700 text-white font-semibold py-6 rounded-xl flex items-center justify-center gap-2">
                        <UserCheck className="h-5 w-5" />
                        {isPatientRegister ? 'تأكيد إنشاء الحساب والدخول' : 'تسجيل الدخول السريع'}
                      </Button>
                    </form>

                    <div className="text-center pt-4">
                      <button
                        onClick={() => setIsPatientRegister(!isPatientRegister)}
                        className="text-xs font-bold text-medical-600 hover:underline"
                      >
                        {isPatientRegister 
                          ? 'لديك حساب بالفعل؟ سجل دخول سريع' 
                          : 'ليس لديك حساب مريض؟ أنشئ حساباً جديداً'}
                      </button>
                    </div>
                  </motion.div>
                )}

                {/* ======================================= */}
                {/* 2. Specialist / Center Forms */}
                {/* ======================================= */}
                {activePortal === 'specialist' && (
                  <motion.div
                    key="specialist-portal"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    transition={{ duration: 0.2 }}
                    className="space-y-4"
                  >
                    
                    {/* --- Specialist Login Form --- */}
                    {specialistMode === 'login' && (
                      <div className="space-y-4">
                        <div>
                          <h3 className="text-xl font-bold text-gray-900">تسجيل دخول الأخصائي / المسؤول</h3>
                          <p className="text-xs text-gray-500 mt-1">سجل دخولك كأخصائي أو أدمن لمتابعة الحالات وإدارة الفروع</p>
                        </div>

                        <form onSubmit={handleSpecialistLogin} className="space-y-4">
                          <div className="space-y-1.5">
                            <Label htmlFor="spec-login-username">اسم المستخدم</Label>
                            <div className="relative">
                              <Input 
                                id="spec-login-username"
                                placeholder="أدخل اسم المستخدم"
                                value={specUsername}
                                onChange={(e) => setSpecUsername(e.target.value)}
                                required
                                className="pr-10"
                              />
                              <User className="absolute right-3 top-3 h-4 w-4 text-gray-400" />
                            </div>
                          </div>

                          <div className="space-y-1.5">
                            <Label htmlFor="spec-login-password">كلمة المرور</Label>
                            <div className="relative">
                              <Input 
                                id="spec-login-password"
                                type={showPassword ? "text" : "password"}
                                placeholder="••••••••"
                                value={specPassword}
                                onChange={(e) => setSpecPassword(e.target.value)}
                                required
                                className="pr-10"
                              />
                              <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute left-3 top-3 text-gray-400 hover:text-gray-650"
                              >
                                {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                              </button>
                              <Lock className="absolute right-3 top-3 h-4 w-4 text-gray-400" />
                            </div>
                          </div>

                          <Button type="submit" className="w-full bg-medical-600 hover:bg-medical-700 text-white font-semibold py-6 rounded-xl">
                            تسجيل دخول الأخصائيين
                          </Button>
                        </form>

                        <div className="flex flex-col gap-2.5 text-center pt-4 border-t">
                          <button
                            onClick={() => setSpecialistMode('register_spec')}
                            className="text-xs font-bold text-medical-600 hover:underline"
                          >
                            طلب انضمام أخصائي جديد قيد الانتظار
                          </button>
                          <button
                            onClick={() => setSpecialistMode('register_center')}
                            className="text-xs font-bold text-medical-600 hover:underline"
                          >
                            تسجيل مركز طبي جديد قيد الانتظار
                          </button>
                        </div>
                      </div>
                    )}

                    {/* --- Specialist Register Request Form --- */}
                    {specialistMode === 'register_spec' && (
                      <div className="space-y-4">
                        <div>
                          <h3 className="text-xl font-bold text-gray-900">طلب انضمام كأخصائي جديد</h3>
                          <p className="text-xs text-gray-500 mt-1">املأ بياناتك وسيتم إرسالها للأدمن لمراجعتها وتفعيلها</p>
                        </div>

                        <form onSubmit={handleRegisterSpec} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="space-y-3">
                            <div>
                              <Label htmlFor="reg-spec-name">الاسم بالكامل *</Label>
                              <Input 
                                id="reg-spec-name"
                                value={regSpecName}
                                onChange={(e) => setRegSpecName(e.target.value)}
                                placeholder="الاسم بالكامل"
                                required
                              />
                            </div>
                            <div>
                              <Label htmlFor="reg-spec-username">اسم المستخدم *</Label>
                              <Input 
                                id="reg-spec-username"
                                value={regSpecUsername}
                                onChange={(e) => setRegSpecUsername(e.target.value)}
                                placeholder="اسم المستخدم"
                                required
                              />
                            </div>
                            <div>
                              <Label htmlFor="reg-spec-password">كلمة المرور *</Label>
                              <Input 
                                id="reg-spec-password"
                                type="password"
                                value={regSpecPassword}
                                onChange={(e) => setRegSpecPassword(e.target.value)}
                                placeholder="كلمة المرور"
                                required
                              />
                            </div>
                            <div>
                              <Label htmlFor="reg-spec-phone">رقم الهاتف (الواتساب للموافقة) *</Label>
                              <Input 
                                id="reg-spec-phone"
                                value={regSpecPhone}
                                onChange={(e) => setRegSpecPhone(e.target.value)}
                                placeholder="رقم الهاتف"
                                required
                              />
                            </div>
                          </div>

                          <div className="space-y-3">
                            <div>
                              <Label htmlFor="reg-spec-role">الوظيفة / التخصص العلمي</Label>
                              <Input 
                                id="reg-spec-role"
                                value={regSpecRole}
                                onChange={(e) => setRegSpecRole(e.target.value)}
                              />
                            </div>
                            <div>
                              <Label htmlFor="reg-spec-image-upload" className="flex items-center gap-1 cursor-pointer text-medical-700 hover:text-medical-800">
                                <Upload className="h-4 w-4" /> تحميل صورتك الشخصية
                              </Label>
                              <Input 
                                id="reg-spec-image-upload" 
                                type="file" 
                                accept="image/*"
                                onChange={(e) => handleImageUpload(e, 'spec')}
                                className="mt-1 text-xs"
                              />
                              {regSpecImage && (
                                <div className="mt-2 h-14 w-14 rounded-full overflow-hidden border bg-gray-50 flex items-center justify-center">
                                  <img src={regSpecImage} alt="المعاينة" className="w-full h-full object-cover" />
                                </div>
                              )}
                            </div>
                            <div>
                              <Label htmlFor="reg-spec-bio">نبذة تعريفية سريعة</Label>
                              <Textarea 
                                id="reg-spec-bio"
                                value={regSpecBio}
                                onChange={(e) => setRegSpecBio(e.target.value)}
                                placeholder="مؤهلاتك الطبية والعلمية..."
                                rows={2}
                              />
                            </div>
                          </div>

                          <div className="md:col-span-2 space-y-2 pt-2">
                            <Button type="submit" className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-5">
                              إرسال البيانات وانتظار الموافقة
                            </Button>
                            <Button 
                              type="button" 
                              variant="outline" 
                              onClick={() => setSpecialistMode('login')} 
                              className="w-full"
                            >
                              العودة لتسجيل الدخول
                            </Button>
                          </div>
                        </form>
                      </div>
                    )}

                    {/* --- Center Register Request Form --- */}
                    {specialistMode === 'register_center' && (
                      <div className="space-y-4">
                        <div>
                          <h3 className="text-xl font-bold text-gray-900">تسجيل مركز طبي جديد</h3>
                          <p className="text-xs text-gray-500 mt-1">سجل بيانات فرعك أو مركزك للانضمام لشبكة واصل بعد موافقة الأدمن</p>
                        </div>

                        <form onSubmit={handleRegisterCenter} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="space-y-3">
                            <div>
                              <Label htmlFor="reg-ctr-name">اسم المركز / الفرع *</Label>
                              <Input 
                                id="reg-ctr-name"
                                value={regCenterName}
                                onChange={(e) => setRegCenterName(e.target.value)}
                                placeholder="اسم المركز / الفرع"
                                required
                              />
                            </div>
                            <div>
                              <Label htmlFor="reg-ctr-location">المحافظة *</Label>
                              <Input 
                                id="reg-ctr-location"
                                value={regCenterLocation}
                                onChange={(e) => setRegCenterLocation(e.target.value)}
                                placeholder="المحافظة"
                                required
                              />
                            </div>
                            <div>
                              <Label htmlFor="reg-ctr-address">العنوان التفصيلي بالكامل *</Label>
                              <Input 
                                id="reg-ctr-address"
                                value={regCenterAddress}
                                onChange={(e) => setRegCenterAddress(e.target.value)}
                                placeholder="العنوان بالتفصيل"
                                required
                              />
                            </div>
                            <div>
                              <Label htmlFor="reg-ctr-phone">رقم هاتف الفرع (الواتساب للمتابعة) *</Label>
                              <Input 
                                id="reg-ctr-phone"
                                value={regCenterPhone}
                                onChange={(e) => setRegCenterPhone(e.target.value)}
                                placeholder="رقم الهاتف"
                                required
                              />
                            </div>
                          </div>

                          <div className="space-y-3">
                            <div>
                              <Label htmlFor="reg-ctr-hours">ساعات العمل الرسمية</Label>
                              <Input 
                                id="reg-ctr-hours"
                                value={regCenterWorkingHours}
                                onChange={(e) => setRegCenterWorkingHours(e.target.value)}
                              />
                            </div>
                            <div>
                              <Label htmlFor="reg-ctr-region">المنطقة الجغرافية</Label>
                              <select 
                                id="reg-ctr-region"
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
                              <Label htmlFor="reg-ctr-image" className="flex items-center gap-1 cursor-pointer text-medical-700 hover:text-medical-800">
                                <Upload className="h-4 w-4" /> تحميل واجهة / صورة المركز
                              </Label>
                              <Input 
                                id="reg-ctr-image" 
                                type="file" 
                                accept="image/*"
                                onChange={(e) => handleImageUpload(e, 'center')}
                                className="mt-1 text-xs"
                              />
                              {regCenterImage && (
                                <div className="mt-2 h-14 w-20 rounded-md overflow-hidden border bg-gray-50 flex items-center justify-center">
                                  <img src={regCenterImage} alt="المعاينة" className="w-full h-full object-cover" />
                                </div>
                              )}
                            </div>
                          </div>

                          <div className="md:col-span-2 space-y-2 pt-2">
                            <Button type="submit" className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-5">
                              تقديم طلب تسجيل المركز
                            </Button>
                            <Button 
                              type="button" 
                              variant="outline" 
                              onClick={() => setSpecialistMode('login')} 
                              className="w-full"
                            >
                              العودة لتسجيل الدخول
                            </Button>
                          </div>
                        </form>
                      </div>
                    )}

                  </motion.div>
                )}

              </AnimatePresence>
            </div>

            {/* Bottom Support Text */}
            <div className="text-center text-xs text-gray-400 mt-6 pt-4 border-t border-gray-150 font-medium">
              هل تواجه مشكلة؟ تواصل معنا مباشرة عبر الواتساب على رقم 
              <a href="https://wa.me/201119056895" target="_blank" rel="noopener noreferrer" className="text-medical-600 font-bold hover:underline mx-1">01119056895</a>
            </div>

          </div>

        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Login;