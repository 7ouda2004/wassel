import React, { useState } from 'react';
import { useNavigate, Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Lock, Mail, Eye, EyeOff, LogIn, User, Phone, UserPlus, ArrowRight, ArrowLeft, CheckCircle2, Building, Shield, MessageCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { useTranslation } from 'react-i18next';
import { useAuth } from '@/providers/auth-provider';

const Login = () => {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const location = useLocation();
  const { signIn, signUp } = useAuth();
  const isAr = i18n.language === 'ar';
  const isRtl = i18n.dir() === 'rtl';

  // Mode: 'login' or 'register'
  const [mode, setMode] = useState<'login' | 'register'>('login');
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Login form
  const [loginData, setLoginData] = useState({ email: '', password: '' });

  // Register form (multi-step)
  const [regStep, setRegStep] = useState(1);
  const [regData, setRegData] = useState({
    fullName: '', email: '', phone: '', password: '', confirmPassword: ''
  });

  const from = (location.state as any)?.from?.pathname || '/dashboard';

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!loginData.email || !loginData.password) {
      toast.error(isAr ? 'يرجى ملء جميع الحقول' : 'Please fill all fields');
      return;
    }
    setIsSubmitting(true);
    try {
      await signIn(loginData.email, loginData.password);
      toast.success(isAr ? 'تم تسجيل الدخول بنجاح' : 'Login successful');
      const role = sessionStorage.getItem('mockRole') || 'patient';
      if (from !== '/dashboard' && from !== '/') {
        navigate(from, { replace: true });
      } else if (role === 'center' || role === 'insurance') {
        navigate('/specialist-dashboard', { replace: true });
      } else {
        navigate('/dashboard', { replace: true });
      }
    } catch (error: any) {
      toast.error(error.message || (isAr ? 'بيانات غير صحيحة' : 'Invalid credentials'));
    } finally {
      setIsSubmitting(false);
    }
  };

  const validateRegStep = (s: number) => {
    if (s === 1 && (!regData.fullName || !regData.email || !regData.phone)) {
      toast.error(isAr ? 'يرجى ملء جميع الحقول' : 'Please fill all fields');
      return false;
    }
    if (s === 1 && !/\S+@\S+\.\S+/.test(regData.email)) {
      toast.error(isAr ? 'بريد إلكتروني غير صحيح' : 'Invalid email');
      return false;
    }
    if (s === 2 && regData.password.length < 6) {
      toast.error(isAr ? 'كلمة المرور 6 أحرف على الأقل' : 'Min 6 characters');
      return false;
    }
    if (s === 2 && regData.password !== regData.confirmPassword) {
      toast.error(isAr ? 'كلمتا المرور غير متطابقتين' : 'Passwords do not match');
      return false;
    }
    return true;
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    if (regStep === 1) {
      if (validateRegStep(1)) setRegStep(2);
      return;
    }
    if (!validateRegStep(2)) return;
    setIsSubmitting(true);
    try {
      await signUp(regData.email, regData.password, regData.fullName, 'patient');
      toast.success(isAr ? 'تم إنشاء الحساب بنجاح! جاري تسجيل الدخول...' : 'Account created! Logging in...');
      // Auto-login after register
      await signIn(regData.email, regData.password);
      navigate('/dashboard', { replace: true });
    } catch (err: any) {
      toast.error(err.message || (isAr ? 'حدث خطأ' : 'An error occurred'));
    } finally {
      setIsSubmitting(false);
    }
  };

  const switchMode = (newMode: 'login' | 'register') => {
    setMode(newMode);
    setRegStep(1);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-grow flex items-center justify-center py-12 px-4 bg-gradient-to-br from-medical-50 via-blue-50/30 to-white relative overflow-hidden">
        {/* Background decoration */}
        <div className="absolute top-0 left-0 w-72 h-72 bg-medical-200/20 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-blue-200/20 rounded-full blur-3xl translate-x-1/3 translate-y-1/3" />

        <div className="w-full max-w-5xl relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-0 bg-white rounded-3xl shadow-2xl overflow-hidden border border-gray-100">

            {/* Left Side - Branding Panel */}
            <div className="hidden lg:flex flex-col justify-center items-center p-10 bg-gradient-to-br from-medical-600 via-medical-700 to-blue-800 text-white relative overflow-hidden">
              <div className="absolute inset-0 opacity-10">
                <div className="absolute top-10 left-10 w-32 h-32 border-2 border-white rounded-full" />
                <div className="absolute bottom-20 right-10 w-48 h-48 border-2 border-white rounded-full" />
                <div className="absolute top-1/2 left-1/3 w-20 h-20 border-2 border-white rounded-full" />
              </div>
              <div className="relative z-10 text-center">
                <div className="w-20 h-20 rounded-3xl bg-white/20 backdrop-blur-sm flex items-center justify-center mx-auto mb-6 shadow-xl">
                  <span className="text-4xl font-bold">W</span>
                </div>
                <h2 className="text-3xl font-bold mb-3">واصــــل</h2>
                <p className="text-white/80 text-lg mb-8 leading-relaxed">
                  {isAr ? 'منصتك الطبية الأولى للأطراف الصناعية والجبائر الطبية' : 'Your premier platform for prosthetics and orthotic devices'}
                </p>
                <div className="space-y-4 text-start">
                  {[
                    isAr ? '🏥 أكثر من 28 مركز طبي متخصص' : '🏥 28+ Specialized Medical Centers',
                    isAr ? '👨‍⚕️ أخصائيين معتمدين' : '👨‍⚕️ Certified Specialists',
                    isAr ? '📋 متابعة حجوزاتك ومواعيدك' : '📋 Track Your Bookings & Appointments',
                    isAr ? '📄 رفع تقاريرك الطبية بسهولة' : '📄 Upload Your Medical Reports Easily',
                  ].map((item, i) => (
                    <motion.div key={i} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.3 + i * 0.15 }} className="flex items-center gap-3 text-sm text-white/90">
                      <span>{item}</span>
                    </motion.div>
                  ))}
                </div>

                {/* Partner CTA */}
                <div className="mt-10 p-4 bg-white/10 backdrop-blur-sm rounded-2xl border border-white/20">
                  <p className="text-sm text-white/80 mb-3">
                    {isAr ? 'هل أنت مركز طبي أو شركة تأمين؟' : 'Are you a medical center or insurance company?'}
                  </p>
                  <a href="https://wa.me/201119056895?text=%D9%85%D8%B1%D8%AD%D8%A8%D8%A7%D8%8C%20%D8%A3%D8%B1%D8%BA%D8%A8%20%D8%A8%D8%A7%D9%84%D8%A7%D9%86%D8%B6%D9%85%D8%A7%D9%85%20%D9%83%D9%85%D8%B1%D9%83%D8%B2%20%D8%B7%D8%A8%D9%8A%20%D8%A3%D9%88%20%D8%A3%D8%AE%D8%B5%D8%A7%D8%A6%D9%8A" target="_blank" rel="noopener noreferrer">
                    <Button className="w-full bg-white/20 hover:bg-white/30 text-white border border-white/30 rounded-xl">
                      <MessageCircle className="w-4 h-4 me-2" />
                      {isAr ? 'تواصل معنا للانضمام' : 'Contact us to join'}
                    </Button>
                  </a>
                  <p className="text-xs text-white/60 mt-2">
                    {isAr ? 'أو أرسل إلى: wasel@medical.com' : 'Or email: wasel@medical.com'}
                  </p>
                </div>
              </div>
            </div>

            {/* Right Side - Forms */}
            <div className="p-8 md:p-10">
              {/* Mode Toggle */}
              <div className="flex gap-1 mb-8 bg-gray-100 rounded-2xl p-1.5">
                <button
                  type="button"
                  onClick={() => switchMode('login')}
                  className={`flex-1 py-3 px-4 rounded-xl text-sm font-bold transition-all duration-300 ${
                    mode === 'login'
                      ? 'bg-white shadow-lg text-medical-700 scale-[1.02]'
                      : 'text-gray-500 hover:text-gray-700'
                  }`}
                >
                  <LogIn className="w-4 h-4 inline me-2" />
                  {isAr ? 'تسجيل الدخول' : 'Sign In'}
                </button>
                <button
                  type="button"
                  onClick={() => switchMode('register')}
                  className={`flex-1 py-3 px-4 rounded-xl text-sm font-bold transition-all duration-300 ${
                    mode === 'register'
                      ? 'bg-white shadow-lg text-medical-700 scale-[1.02]'
                      : 'text-gray-500 hover:text-gray-700'
                  }`}
                >
                  <UserPlus className="w-4 h-4 inline me-2" />
                  {isAr ? 'حساب جديد' : 'Register'}
                </button>
              </div>

              <AnimatePresence mode="wait">
                {mode === 'login' ? (
                  /* ========== LOGIN FORM ========== */
                  <motion.div key="login" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.3 }}>
                    <div className="text-center mb-6">
                      <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-medical-500 to-medical-700 flex items-center justify-center mx-auto mb-4 shadow-lg shadow-medical-500/20">
                        <LogIn className="w-7 h-7 text-white" />
                      </div>
                      <h1 className="text-2xl font-bold text-gray-900">
                        {isAr ? 'أهلاً بعودتك!' : 'Welcome Back!'}
                      </h1>
                      <p className="text-gray-500 mt-1 text-sm">
                        {isAr ? 'ادخل إلى حسابك في منصة واصل' : 'Sign in to your Wasel account'}
                      </p>
                    </div>

                    <form onSubmit={handleLogin} className="space-y-5">
                      <div>
                        <Label htmlFor="login-email" className="text-sm font-semibold text-gray-700 mb-1.5 block">
                          {isAr ? 'البريد الإلكتروني' : 'Email'}
                        </Label>
                        <div className="relative">
                          <Input
                            id="login-email"
                            type="email"
                            value={loginData.email}
                            onChange={(e) => setLoginData({ ...loginData, email: e.target.value })}
                            className="rounded-xl border-gray-200 h-12 focus:border-medical-500 focus:ring-medical-500/20"
                            placeholder="example@mail.com"
                            required
                          />
                          <Mail className={`absolute ${isRtl ? 'left-3' : 'right-3'} top-3.5 h-5 w-5 text-gray-400`} />
                        </div>
                      </div>

                      <div>
                        <Label htmlFor="login-password" className="text-sm font-semibold text-gray-700 mb-1.5 block">
                          {isAr ? 'كلمة المرور' : 'Password'}
                        </Label>
                        <div className="relative">
                          <Input
                            id="login-password"
                            type={showPassword ? 'text' : 'password'}
                            value={loginData.password}
                            onChange={(e) => setLoginData({ ...loginData, password: e.target.value })}
                            className="rounded-xl border-gray-200 h-12"
                            placeholder="••••••••"
                            required
                          />
                          <button type="button" onClick={() => setShowPassword(!showPassword)} className={`absolute ${isRtl ? 'left-3' : 'right-3'} top-3.5 text-gray-400 hover:text-gray-600`}>
                            {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                          </button>
                        </div>
                      </div>

                      <Button type="submit" disabled={isSubmitting} className="w-full h-12 bg-gradient-to-l from-medical-600 to-medical-700 text-white rounded-xl shadow-lg shadow-medical-600/20 text-base font-bold hover:shadow-xl transition-shadow">
                        {isSubmitting ? (
                          <span className="flex items-center gap-2">
                            <svg className="animate-spin w-5 h-5" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" /><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" /></svg>
                            {isAr ? 'جاري تسجيل الدخول...' : 'Signing in...'}
                          </span>
                        ) : (
                          <span className="flex items-center gap-2"><LogIn className="w-5 h-5" />{isAr ? 'تسجيل الدخول' : 'Sign In'}</span>
                        )}
                      </Button>
                    </form>

                    <div className="text-center mt-6 pt-4 border-t border-gray-100">
                      <p className="text-sm text-gray-500">
                        {isAr ? 'ليس لديك حساب؟' : "Don't have an account?"}{' '}
                        <button onClick={() => switchMode('register')} className="text-medical-600 font-semibold hover:underline">
                          {isAr ? 'إنشاء حساب مجاناً' : 'Create Free Account'}
                        </button>
                      </p>
                    </div>
                  </motion.div>
                ) : (
                  /* ========== REGISTER FORM ========== */
                  <motion.div key="register" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.3 }}>
                    {/* Step indicator */}
                    <div className="flex items-center justify-center gap-0 mb-6">
                      {[1, 2].map((s, i) => (
                        <React.Fragment key={s}>
                          <div className={`w-10 h-10 rounded-xl flex items-center justify-center text-sm font-bold transition-all ${regStep >= s ? 'bg-gradient-to-br from-medical-500 to-medical-700 text-white shadow-lg shadow-medical-500/30' : 'bg-gray-100 text-gray-400 border-2 border-gray-200'}`}>
                            {regStep > s ? <CheckCircle2 className="w-4 h-4" /> : s}
                          </div>
                          {i < 1 && <div className={`w-16 h-1 rounded-full mx-2 transition-all ${regStep > s ? 'bg-medical-500' : 'bg-gray-200'}`} />}
                        </React.Fragment>
                      ))}
                    </div>

                    <div className="text-center mb-6">
                      <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-medical-500 to-medical-700 flex items-center justify-center mx-auto mb-4 shadow-lg shadow-medical-500/20">
                        <UserPlus className="w-7 h-7 text-white" />
                      </div>
                      <h1 className="text-2xl font-bold text-gray-900">{isAr ? 'إنشاء حساب جديد' : 'Create Account'}</h1>
                      <p className="text-gray-500 mt-1 text-sm">{isAr ? 'انضم إلى منصة واصل الطبية مجاناً' : 'Join Wasel Medical Platform for free'}</p>
                    </div>

                    <form onSubmit={handleRegister}>
                      <AnimatePresence mode="wait">
                        {regStep === 1 && (
                          <motion.div key="rs1" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-4">
                            <div>
                              <Label className="text-sm font-semibold text-gray-700 mb-1.5 block">{isAr ? 'الاسم الكامل' : 'Full Name'} *</Label>
                              <div className="relative">
                                <Input value={regData.fullName} onChange={(e) => setRegData({ ...regData, fullName: e.target.value })} className="rounded-xl h-12" placeholder={isAr ? 'محمد أحمد' : 'John Doe'} required />
                                <User className={`absolute ${isRtl ? 'left-3' : 'right-3'} top-3.5 h-5 w-5 text-gray-400`} />
                              </div>
                            </div>
                            <div>
                              <Label className="text-sm font-semibold text-gray-700 mb-1.5 block">{isAr ? 'البريد الإلكتروني' : 'Email'} *</Label>
                              <div className="relative">
                                <Input type="email" value={regData.email} onChange={(e) => setRegData({ ...regData, email: e.target.value })} className="rounded-xl h-12" placeholder="example@mail.com" required />
                                <Mail className={`absolute ${isRtl ? 'left-3' : 'right-3'} top-3.5 h-5 w-5 text-gray-400`} />
                              </div>
                            </div>
                            <div>
                              <Label className="text-sm font-semibold text-gray-700 mb-1.5 block">{isAr ? 'رقم الهاتف' : 'Phone'} *</Label>
                              <div className="relative">
                                <Input value={regData.phone} onChange={(e) => setRegData({ ...regData, phone: e.target.value })} className="rounded-xl h-12" placeholder="01xxxxxxxxx" required />
                                <Phone className={`absolute ${isRtl ? 'left-3' : 'right-3'} top-3.5 h-5 w-5 text-gray-400`} />
                              </div>
                            </div>
                          </motion.div>
                        )}
                        {regStep === 2 && (
                          <motion.div key="rs2" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-4">
                            <div>
                              <Label className="text-sm font-semibold text-gray-700 mb-1.5 block">{isAr ? 'كلمة المرور' : 'Password'} *</Label>
                              <div className="relative">
                                <Input type={showPassword ? 'text' : 'password'} value={regData.password} onChange={(e) => setRegData({ ...regData, password: e.target.value })} className="rounded-xl h-12" required />
                                <button type="button" onClick={() => setShowPassword(!showPassword)} className={`absolute ${isRtl ? 'left-3' : 'right-3'} top-3.5 text-gray-400`}>
                                  {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                                </button>
                              </div>
                              <p className="text-xs text-gray-400 mt-1">{isAr ? '6 أحرف على الأقل' : 'At least 6 characters'}</p>
                            </div>
                            <div>
                              <Label className="text-sm font-semibold text-gray-700 mb-1.5 block">{isAr ? 'تأكيد كلمة المرور' : 'Confirm Password'} *</Label>
                              <Input type="password" value={regData.confirmPassword} onChange={(e) => setRegData({ ...regData, confirmPassword: e.target.value })} className="rounded-xl h-12" required />
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>

                      <div className="flex items-center justify-between mt-8 pt-6 border-t border-gray-100">
                        {regStep > 1 ? (
                          <Button type="button" variant="outline" onClick={() => setRegStep(regStep - 1)} className="rounded-xl px-6">
                            <ArrowRight className={`w-4 h-4 me-2 ${isRtl ? '' : 'rotate-180'}`} />{isAr ? 'السابق' : 'Back'}
                          </Button>
                        ) : <div />}
                        {regStep < 2 ? (
                          <Button type="button" onClick={() => { if (validateRegStep(1)) setRegStep(2); }} className="bg-gradient-to-l from-medical-600 to-medical-700 text-white rounded-xl px-8 shadow-lg">
                            {isAr ? 'التالي' : 'Next'}<ArrowLeft className={`w-4 h-4 ms-2 ${isRtl ? '' : 'rotate-180'}`} />
                          </Button>
                        ) : (
                          <Button type="submit" disabled={isSubmitting} className="bg-gradient-to-l from-medical-600 to-medical-700 text-white rounded-xl px-8 shadow-lg">
                            {isSubmitting ? (
                              <span className="flex items-center gap-2">
                                <svg className="animate-spin w-5 h-5" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" /><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" /></svg>
                                {isAr ? 'جاري التسجيل...' : 'Creating...'}
                              </span>
                            ) : (
                              <span className="flex items-center gap-2"><UserPlus className="w-5 h-5" />{isAr ? 'إنشاء الحساب' : 'Create Account'}</span>
                            )}
                          </Button>
                        )}
                      </div>
                    </form>

                    <div className="text-center mt-6 pt-4 border-t border-gray-100">
                      <p className="text-sm text-gray-500">
                        {isAr ? 'لديك حساب بالفعل؟' : 'Already have an account?'}{' '}
                        <button onClick={() => switchMode('login')} className="text-medical-600 font-semibold hover:underline">
                          {isAr ? 'تسجيل الدخول' : 'Sign In'}
                        </button>
                      </p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Mobile Partner CTA */}
              <div className="lg:hidden mt-8 p-4 bg-medical-50 rounded-2xl border border-medical-100">
                <p className="text-sm text-gray-600 mb-2 text-center">
                  {isAr ? 'هل أنت مركز طبي أو أخصائي؟' : 'Are you a medical center or specialist?'}
                </p>
                <a href="https://wa.me/201119056895?text=%D9%85%D8%B1%D8%AD%D8%A8%D8%A7%D8%8C%20%D8%A3%D8%B1%D8%BA%D8%A8%20%D8%A8%D8%A7%D9%84%D8%A7%D9%86%D8%B6%D9%85%D8%A7%D9%85" target="_blank" rel="noopener noreferrer">
                  <Button variant="outline" className="w-full border-medical-300 text-medical-700 rounded-xl">
                    <MessageCircle className="w-4 h-4 me-2" />
                    {isAr ? 'تواصل معنا عبر واتساب' : 'Contact us via WhatsApp'}
                  </Button>
                </a>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Login;