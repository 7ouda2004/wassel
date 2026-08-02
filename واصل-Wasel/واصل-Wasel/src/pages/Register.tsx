import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { User, Mail, Lock, Phone, ArrowRight, ArrowLeft, CheckCircle2, UserPlus, Building, Shield, Eye, EyeOff, Sparkles, KeyRound } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { useTranslation } from 'react-i18next';
import { useAuth } from '@/providers/auth-provider';
import type { UserRole } from '@/types/database';

const roles = [
  { value: 'patient' as UserRole, icon: User, labelAr: 'مريض / حالة', labelEn: 'Patient', descAr: 'ابحث عن مراكز وأجهزة تعويضية واحجز موعد كشف', descEn: 'Find centers, prosthetics & book appointments', color: 'from-blue-500 to-medical-600' },
  { value: 'center' as UserRole, icon: Building, labelAr: 'مركز طبي / فرع', labelEn: 'Medical Center', descAr: 'إدارة المركز والأخصائيين واستقبال الحجوزات', descEn: 'Manage center, specialists & bookings', color: 'from-emerald-500 to-teal-600' },
  { value: 'insurance' as UserRole, icon: Shield, labelAr: 'شركة تأمين', labelEn: 'Insurance Company', descAr: 'إدارة ومتابعة طلبات التغطية التأمينية', descEn: 'Manage insurance coverage requests', color: 'from-purple-500 to-indigo-600' },
];

const stepLabels = [
  { num: 1, titleAr: 'نوع الحساب', titleEn: 'Role' },
  { num: 2, titleAr: 'البيانات الشخصية', titleEn: 'Details' },
  { num: 3, titleAr: 'الأمان والتأكيد', titleEn: 'Security' },
];

const Register = () => {
  const { i18n } = useTranslation();
  const navigate = useNavigate();
  const { signUp } = useAuth();
  const isRtl = i18n.dir() === 'rtl';
  const isAr = i18n.language === 'ar';
  const [step, setStep] = useState(1);
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({ 
    fullName: '', 
    email: '', 
    phone: '', 
    password: '', 
    confirmPassword: '', 
    role: 'patient' as UserRole, 
    insuranceNumber: '', 
    authCode: '' 
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const validate = (s: number) => {
    if (s === 1 && (formData.role === 'center' || formData.role === 'insurance') && formData.authCode !== 'daizer2004') {
      toast.error(isAr ? 'رمز التحقق غير صحيح (استخدم: daizer2004)' : 'Invalid auth code (use: daizer2004)');
      return false;
    }
    if (s === 2) {
      if (!formData.fullName.trim()) { toast.error(isAr ? 'يرجى إدخال الاسم الكامل' : 'Enter full name'); return false; }
      if (!formData.email.trim() || !/\S+@\S+\.\S+/.test(formData.email)) { toast.error(isAr ? 'بريد إلكتروني غير صحيح' : 'Invalid email'); return false; }
      if (!formData.phone.trim() || formData.phone.length < 8) { toast.error(isAr ? 'يرجى إدخال رقم هاتف صحيح' : 'Enter a valid phone number'); return false; }
    }
    if (s === 3) {
      if (formData.password.length < 6) { toast.error(isAr ? 'كلمة المرور 6 أحرف على الأقل' : 'Min 6 characters required'); return false; }
      if (formData.password !== formData.confirmPassword) { toast.error(isAr ? 'كلمتا المرور غير متطابقتين' : 'Passwords do not match'); return false; }
    }
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (step < 3) {
      if (validate(step)) setStep(step + 1);
      return;
    }
    if (!validate(3)) return;

    setIsSubmitting(true);
    try {
      await signUp(formData.email, formData.password, formData.fullName, formData.role);
      toast.success(isAr ? 'تم إنشاء الحساب بنجاح! يمكنك الآن تسجيل الدخول' : 'Account created successfully!');
      navigate('/login');
    } catch (err: any) { 
      toast.error(err.message || (isAr ? 'حدث خطأ أثناء التسجيل' : 'Registration failed')); 
    } finally { 
      setIsSubmitting(false); 
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-medical-50/60 via-white to-gray-50/40">
      <Navbar />
      <main className="flex-grow flex items-center justify-center py-12 md:py-16 px-4">
        <div className="w-full max-w-xl">
          
          {/* Header Progress Stepper */}
          <div className="mb-8">
            <div className="flex items-center justify-between max-w-sm mx-auto relative px-2">
              {/* Line background */}
              <div className="absolute top-5 left-8 right-8 h-0.5 bg-gray-200 -z-0" />
              <div 
                className="absolute top-5 right-8 h-0.5 bg-gradient-to-l from-medical-500 to-medical-600 transition-all duration-500 -z-0" 
                style={{ width: step === 1 ? '0%' : step === 2 ? '50%' : '100%' }}
              />

              {stepLabels.map((s) => (
                <div key={s.num} className="flex flex-col items-center relative z-10">
                  <button
                    type="button"
                    onClick={() => { if (s.num < step) setStep(s.num); }}
                    disabled={s.num > step}
                    className={`w-10 h-10 rounded-2xl flex items-center justify-center text-sm font-bold transition-all duration-300 ${
                      step === s.num
                        ? 'bg-gradient-to-tr from-medical-600 to-medical-500 text-white shadow-lg shadow-medical-500/30 scale-110'
                        : step > s.num
                        ? 'bg-medical-500 text-white shadow-md'
                        : 'bg-white text-gray-400 border border-gray-200'
                    }`}
                  >
                    {step > s.num ? <CheckCircle2 className="w-5 h-5" /> : s.num}
                  </button>
                  <span className={`text-xs font-semibold mt-2 transition-colors ${step >= s.num ? 'text-medical-800' : 'text-gray-400'}`}>
                    {isAr ? s.titleAr : s.titleEn}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Main Card */}
          <motion.div 
            initial={{ opacity: 0, y: 15 }} 
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="bg-white p-6 sm:p-10 rounded-3xl shadow-xl shadow-gray-200/50 border border-gray-100/80 backdrop-blur-lg"
          >
            {/* Card Header */}
            <div className="text-center mb-8">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-medical-600 to-medical-400 flex items-center justify-center mx-auto mb-4 shadow-lg shadow-medical-500/25">
                <UserPlus className="w-7 h-7 text-white" />
              </div>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900 font-cairo">
                {isAr ? 'إنشاء حساب جديد' : 'Create Account'}
              </h1>
              <p className="text-gray-500 mt-1.5 text-sm font-medium">
                {isAr ? 'انضم إلى شبكة واصل الطبية بخطوات بسيطة' : 'Join Wasel Medical Platform seamlessly'}
              </p>
            </div>

            <form onSubmit={handleSubmit}>
              <AnimatePresence mode="wait">
                
                {/* STEP 1: Role Selection */}
                {step === 1 && (
                  <motion.div 
                    key="s1" 
                    initial={{ opacity: 0, x: isRtl ? -15 : 15 }} 
                    animate={{ opacity: 1, x: 0 }} 
                    exit={{ opacity: 0, x: isRtl ? 15 : -15 }}
                    transition={{ duration: 0.25 }}
                    className="space-y-4"
                  >
                    <Label className="text-sm font-bold text-gray-800 block mb-2">
                      {isAr ? 'اختر صفة الحساب في المنصة:' : 'Select Your Role:'}
                    </Label>
                    
                    <div className="space-y-3">
                      {roles.map(r => {
                        const isSelected = formData.role === r.value;
                        const IconComp = r.icon;
                        return (
                          <button 
                            key={r.value} 
                            type="button" 
                            onClick={() => setFormData({ ...formData, role: r.value })}
                            className={`w-full p-4 rounded-2xl border-2 transition-all duration-300 flex items-center gap-4 text-right group ${
                              isSelected 
                                ? 'border-medical-500 bg-gradient-to-r from-medical-50/80 to-white shadow-md shadow-medical-500/10' 
                                : 'border-gray-100 bg-gray-50/50 hover:bg-white hover:border-gray-200'
                            }`}
                          >
                            <div className={`w-12 h-12 rounded-xl bg-gradient-to-tr ${r.color} flex items-center justify-center shadow-md flex-shrink-0 text-white transition-transform duration-300 group-hover:scale-105`}>
                              <IconComp className="w-6 h-6" />
                            </div>
                            <div className="flex-grow">
                              <p className="font-bold text-gray-900 text-base">{isAr ? r.labelAr : r.labelEn}</p>
                              <p className="text-xs text-gray-500 mt-0.5">{isAr ? r.descAr : r.descEn}</p>
                            </div>
                            <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all ${
                              isSelected ? 'border-medical-600 bg-medical-600 text-white' : 'border-gray-300'
                            }`}>
                              {isSelected && <CheckCircle2 className="w-4 h-4" />}
                            </div>
                          </button>
                        );
                      })}
                    </div>

                    {(formData.role === 'center' || formData.role === 'insurance') && (
                      <motion.div 
                        initial={{ opacity: 0, height: 0 }} 
                        animate={{ opacity: 1, height: 'auto' }} 
                        className="mt-4 p-4 bg-amber-50/80 border border-amber-200/80 rounded-2xl"
                      >
                        <Label className="text-xs font-bold text-amber-800 mb-1.5 flex items-center gap-1.5">
                          <KeyRound className="w-4 h-4 text-amber-600" />
                          {isAr ? 'رمز التحقق للمؤسسات والجهات (daizer2004)' : 'Auth Code (daizer2004) *'}
                        </Label>
                        <Input 
                          name="authCode" 
                          type="password" 
                          value={formData.authCode} 
                          onChange={handleChange} 
                          className="rounded-xl h-11 border-amber-200 focus-visible:ring-amber-500 bg-white font-mono text-sm" 
                          placeholder={isAr ? "أدخل رمز التفعيل الخاص بالمنصة" : "Enter auth code"} 
                          required 
                        />
                      </motion.div>
                    )}
                  </motion.div>
                )}

                {/* STEP 2: Basic Info */}
                {step === 2 && (
                  <motion.div 
                    key="s2" 
                    initial={{ opacity: 0, x: isRtl ? -15 : 15 }} 
                    animate={{ opacity: 1, x: 0 }} 
                    exit={{ opacity: 0, x: isRtl ? 15 : -15 }}
                    transition={{ duration: 0.25 }}
                    className="space-y-4"
                  >
                    <div>
                      <Label className="text-sm font-bold text-gray-700 mb-1.5 block">
                        {isAr ? 'الاسم بالكامل' : 'Full Name'} *
                      </Label>
                      <div className="relative">
                        <Input 
                          name="fullName" 
                          value={formData.fullName} 
                          onChange={handleChange} 
                          placeholder={isAr ? "مثال: د. أحمد محمود" : "John Doe"}
                          className="rounded-xl h-12 pr-10 border-gray-200 focus-visible:ring-medical-500" 
                          required 
                        />
                        <User className="w-5 h-5 text-gray-400 absolute right-3 top-1/2 -translate-y-1/2" />
                      </div>
                    </div>

                    <div>
                      <Label className="text-sm font-bold text-gray-700 mb-1.5 block">
                        {isAr ? 'البريد الإلكتروني' : 'Email Address'} *
                      </Label>
                      <div className="relative">
                        <Input 
                          name="email" 
                          type="email" 
                          value={formData.email} 
                          onChange={handleChange} 
                          placeholder="example@wasel.com"
                          className="rounded-xl h-12 pr-10 border-gray-200 focus-visible:ring-medical-500" 
                          required 
                        />
                        <Mail className="w-5 h-5 text-gray-400 absolute right-3 top-1/2 -translate-y-1/2" />
                      </div>
                    </div>

                    <div>
                      <Label className="text-sm font-bold text-gray-700 mb-1.5 block">
                        {isAr ? 'رقم الهاتف للتواصل' : 'Phone Number'} *
                      </Label>
                      <div className="relative">
                        <Input 
                          name="phone" 
                          value={formData.phone} 
                          onChange={handleChange} 
                          placeholder="01xxxxxxxxx" 
                          className="rounded-xl h-12 pr-10 border-gray-200 focus-visible:ring-medical-500 font-mono" 
                          required 
                        />
                        <Phone className="w-5 h-5 text-gray-400 absolute right-3 top-1/2 -translate-y-1/2" />
                      </div>
                    </div>

                    {formData.role === 'patient' && (
                      <div>
                        <Label className="text-sm font-bold text-gray-700 mb-1.5 block">
                          {isAr ? 'رقم التأمين الصحي (اختياري)' : 'Insurance Number (Optional)'}
                        </Label>
                        <div className="relative">
                          <Input 
                            name="insuranceNumber" 
                            value={formData.insuranceNumber} 
                            onChange={handleChange} 
                            placeholder={isAr ? "للاستفادة من التغطية التأمينية" : "For insurance coverage"} 
                            className="rounded-xl h-12 pr-10 border-gray-200 focus-visible:ring-medical-500" 
                          />
                          <Shield className="w-5 h-5 text-gray-400 absolute right-3 top-1/2 -translate-y-1/2" />
                        </div>
                      </div>
                    )}
                  </motion.div>
                )}

                {/* STEP 3: Security & Passwords */}
                {step === 3 && (
                  <motion.div 
                    key="s3" 
                    initial={{ opacity: 0, x: isRtl ? -15 : 15 }} 
                    animate={{ opacity: 1, x: 0 }} 
                    exit={{ opacity: 0, x: isRtl ? 15 : -15 }}
                    transition={{ duration: 0.25 }}
                    className="space-y-4"
                  >
                    <div>
                      <Label className="text-sm font-bold text-gray-700 mb-1.5 block">
                        {isAr ? 'كلمة المرور' : 'Password'} *
                      </Label>
                      <div className="relative">
                        <Input 
                          name="password" 
                          type={showPassword ? 'text' : 'password'} 
                          value={formData.password} 
                          onChange={handleChange} 
                          placeholder="••••••••"
                          className="rounded-xl h-12 pr-10 border-gray-200 focus-visible:ring-medical-500" 
                          required 
                        />
                        <Lock className="w-5 h-5 text-gray-400 absolute right-3 top-1/2 -translate-y-1/2" />
                        <button 
                          type="button" 
                          onClick={() => setShowPassword(!showPassword)} 
                          className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                        >
                          {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                        </button>
                      </div>
                    </div>

                    <div>
                      <Label className="text-sm font-bold text-gray-700 mb-1.5 block">
                        {isAr ? 'تأكيد كلمة المرور' : 'Confirm Password'} *
                      </Label>
                      <div className="relative">
                        <Input 
                          name="confirmPassword" 
                          type="password" 
                          value={formData.confirmPassword} 
                          onChange={handleChange} 
                          placeholder="••••••••"
                          className="rounded-xl h-12 pr-10 border-gray-200 focus-visible:ring-medical-500" 
                          required 
                        />
                        <Lock className="w-5 h-5 text-gray-400 absolute right-3 top-1/2 -translate-y-1/2" />
                      </div>
                    </div>

                    <div className="bg-medical-50/70 border border-medical-100 rounded-2xl p-4 mt-4">
                      <div className="flex items-start gap-2.5">
                        <Sparkles className="w-5 h-5 text-medical-600 flex-shrink-0 mt-0.5" />
                        <p className="text-xs text-medical-900 leading-relaxed font-medium">
                          {isAr 
                            ? 'بإنشائك للحساب أنت توافق على شروط وأحكام منصة واصل الطبية وسياسة الخصوصية.' 
                            : 'By creating an account, you agree to Wasel Medical terms and privacy policy.'}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                )}

              </AnimatePresence>

              {/* Navigation Buttons */}
              <div className="flex items-center justify-between mt-8 pt-6 border-t border-gray-100">
                {step > 1 ? (
                  <Button 
                    type="button" 
                    variant="outline" 
                    onClick={() => setStep(step - 1)} 
                    className="rounded-xl px-5 h-11 border-gray-200 hover:bg-gray-50 text-gray-700 font-semibold text-sm"
                  >
                    <ArrowRight className={`w-4 h-4 ms-1 ${isRtl ? '' : 'rotate-180'}`} />
                    {isAr ? 'السابق' : 'Back'}
                  </Button>
                ) : <div />}

                {step < 3 ? (
                  <Button 
                    type="button" 
                    onClick={() => { if (validate(step)) setStep(step + 1); }} 
                    className="bg-gradient-to-l from-medical-600 to-medical-500 hover:from-medical-700 hover:to-medical-600 text-white rounded-xl px-7 h-11 shadow-md shadow-medical-500/20 font-bold text-sm shimmer-btn me-0 ms-auto"
                  >
                    {isAr ? 'التالي' : 'Next'}
                    <ArrowLeft className={`w-4 h-4 me-1 ${isRtl ? '' : 'rotate-180'}`} />
                  </Button>
                ) : (
                  <Button 
                    type="submit" 
                    disabled={isSubmitting} 
                    className="bg-gradient-to-l from-medical-600 to-medical-500 hover:from-medical-700 hover:to-medical-600 text-white rounded-xl px-8 h-11 shadow-md shadow-medical-500/20 font-bold text-sm shimmer-btn me-0 ms-auto"
                  >
                    {isSubmitting ? (
                      <span className="flex items-center gap-2">
                        <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                        </svg>
                        {isAr ? 'جاري التسجيل...' : 'Creating...'}
                      </span>
                    ) : (
                      <span className="flex items-center gap-2">
                        <UserPlus className="w-4 h-4" />
                        {isAr ? 'تأكيد وإنشاء الحساب' : 'Complete Registration'}
                      </span>
                    )}
                  </Button>
                )}
              </div>
            </form>

            <div className="text-center mt-6 pt-5 border-t border-gray-100">
              <p className="text-sm text-gray-500">
                {isAr ? 'لديك حساب بالفعل؟' : 'Already have an account?'}{' '}
                <Link to="/login" className="text-medical-600 font-bold hover:underline transition-all me-1">
                  {isAr ? 'تسجيل الدخول' : 'Sign In'}
                </Link>
              </p>
            </div>
          </motion.div>

        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Register;
