import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Lock, Mail, Eye, EyeOff, LogIn, UserPlus, Phone, User, CheckCircle2, ArrowRight, ArrowLeft, Stethoscope, Building2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { useTranslation } from 'react-i18next';
import { useAuthStore } from '@/stores/auth-store';
import { useAdminStore } from '@/stores/admin-store';

const SpecialistLogin = () => {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const { setUser, setSession } = useAuthStore();
  const { validateSpecialistLogin, addApprovalRequest } = useAdminStore();
  const isAr = i18n.language === 'ar';
  const isRtl = i18n.dir() === 'rtl';

  const [mode, setMode] = useState<'login' | 'register'>('login');
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [regType, setRegType] = useState<'specialist' | 'center'>('specialist');

  // Login Form
  const [loginUsername, setLoginUsername] = useState('');
  const [loginPassword, setLoginPassword] = useState('');

  // Register Form
  const [regData, setRegData] = useState({
    fullName: '', phone: '', username: '', password: '', specialization: '', centerName: ''
  });

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!loginUsername || !loginPassword) {
      toast.error(isAr ? 'يرجى ملء جميع الحقول' : 'Please fill all fields');
      return;
    }

    setIsSubmitting(true);

    setTimeout(() => {
      // Check admin credentials first
      if (loginUsername === '616' && loginPassword === 'daizer616') {
        sessionStorage.setItem('mockRole', 'admin');
        sessionStorage.setItem('mockName', 'Admin');
        sessionStorage.setItem('isSpecialist', 'true');
        sessionStorage.setItem('username', '616');

        setUser({
          id: 'admin',
          email: 'admin@wasel.com',
          full_name: 'Admin',
          role: 'admin',
          created_at: new Date().toISOString()
        });
        setSession({ user: { id: 'admin' }, access_token: 'mock-token' });

        toast.success(isAr ? 'أهلاً بك يا مدير النظام!' : 'Welcome back, Admin!');
        navigate('/admin-dashboard');
        setIsSubmitting(false);
        return;
      }

      // Check specialist/center credentials via admin store
      const account = validateSpecialistLogin(loginUsername, loginPassword);
      if (account) {
        const isCenter = 'specialistIds' in account;
        sessionStorage.setItem('mockRole', isCenter ? 'center' : 'specialist');
        sessionStorage.setItem('mockName', isCenter ? (account as any).name : (account as any).fullName);
        sessionStorage.setItem('isSpecialist', 'true');
        sessionStorage.setItem('username', account.username);

        setUser({
          id: account.id,
          email: `${account.username}@wasel.com`,
          full_name: isCenter ? (account as any).name : (account as any).fullName,
          role: 'center',
          created_at: new Date().toISOString()
        });
        setSession({ user: { id: account.id }, access_token: 'mock-token' });

        toast.success(isAr ? `أهلاً بك!` : `Welcome back!`);
        navigate('/specialist-dashboard');
      } else {
        toast.error(isAr ? 'بيانات الدخول غير صحيحة أو الحساب بانتظار التفعيل' : 'Invalid credentials or account pending approval');
      }
      setIsSubmitting(false);
    }, 1000);
  };

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    if (!regData.fullName || !regData.phone || !regData.username || !regData.password) {
      toast.error(isAr ? 'يرجى إكمال جميع الحقول' : 'Please complete all fields');
      return;
    }

    setIsSubmitting(true);

    setTimeout(() => {
      // Send approval request to admin store
      addApprovalRequest({
        fullName: regData.fullName,
        phone: regData.phone,
        username: regData.username,
        password: regData.password,
        type: regType,
        centerName: regType === 'center' ? regData.centerName : undefined,
        specialization: regType === 'specialist' ? regData.specialization : undefined,
      });

      toast.success(isAr ? 'تم إرسال طلبك للإدارة للموافقة. سيتم إعلامك عند القبول.' : 'Request sent to admin for approval. You will be notified when accepted.');
      setMode('login');
      setRegData({ fullName: '', phone: '', username: '', password: '', specialization: '', centerName: '' });
      setIsSubmitting(false);
    }, 1000);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-grow flex items-center justify-center py-12 px-4 bg-gradient-to-br from-teal-50 via-teal-100/30 to-white relative overflow-hidden">
        {/* Background */}
        <div className="absolute top-0 right-0 w-72 h-72 bg-teal-200/20 rounded-full blur-3xl translate-x-1/3 -translate-y-1/3" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-200/20 rounded-full blur-3xl -translate-x-1/3 translate-y-1/3" />

        <div className="w-full max-w-4xl relative z-10">
          <div className="bg-white rounded-3xl shadow-2xl overflow-hidden border border-gray-100">
            <div className="grid grid-cols-1 md:grid-cols-5 h-full">

              {/* Left Side Branding */}
              <div className="md:col-span-2 hidden md:flex flex-col justify-center items-center p-8 bg-gradient-to-b from-teal-600 to-teal-800 text-white relative">
                <div className="absolute inset-0 opacity-10">
                  <div className="absolute top-10 right-10 w-32 h-32 border-2 border-white rounded-full" />
                  <div className="absolute bottom-10 left-10 w-48 h-48 border-2 border-white rounded-full" />
                </div>
                <div className="relative z-10 text-center">
                  <div className="w-20 h-20 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center mx-auto mb-6 shadow-xl">
                    <Stethoscope className="w-10 h-10 text-white" />
                  </div>
                  <h2 className="text-2xl font-bold mb-2">
                    {isAr ? 'بوابة الأخصائيين' : 'Specialists Portal'}
                  </h2>
                  <p className="text-teal-100 text-sm mb-6 leading-relaxed">
                    {isAr ? 'قم بإدارة حجوزاتك، مرضاك، ومواعيدك بكل سهولة واحترافية.' : 'Manage your bookings, patients, and appointments easily.'}
                  </p>
                </div>
              </div>

              {/* Right Side Form */}
              <div className="md:col-span-3 p-8 md:p-12">
                <div className="flex gap-2 mb-8 bg-gray-100 rounded-xl p-1">
                  <button
                    onClick={() => setMode('login')}
                    className={`flex-1 py-2.5 px-4 rounded-lg text-sm font-bold transition-all ${mode === 'login' ? 'bg-white shadow text-teal-700' : 'text-gray-500 hover:text-gray-700'
                      }`}
                  >
                    {isAr ? 'تسجيل الدخول' : 'Sign In'}
                  </button>
                  <button
                    onClick={() => setMode('register')}
                    className={`flex-1 py-2.5 px-4 rounded-lg text-sm font-bold transition-all ${mode === 'register' ? 'bg-white shadow text-teal-700' : 'text-gray-500 hover:text-gray-700'
                      }`}
                  >
                    {isAr ? 'حساب جديد' : 'Register'}
                  </button>
                </div>

                <AnimatePresence mode="wait">
                  {mode === 'login' ? (
                    <motion.div key="login" initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -10 }}>
                      <div className="text-center mb-8">
                        <h1 className="text-2xl font-bold text-gray-900 mb-1">{isAr ? 'مرحباً بك مجدداً' : 'Welcome Back'}</h1>
                        <p className="text-gray-500 text-sm">{isAr ? 'سجل دخولك للوصول للوحة التحكم' : 'Login to access your dashboard'}</p>
                      </div>

                      <form onSubmit={handleLogin} className="space-y-5">
                        <div>
                          <Label className="text-sm font-semibold text-gray-700 mb-1.5 block">
                            {isAr ? 'اسم المستخدم' : 'Username'}
                          </Label>
                          <div className="relative">
                            <Input
                              value={loginUsername}
                              onChange={(e) => setLoginUsername(e.target.value)}
                              className="rounded-xl h-12"
                              placeholder={isAr ? 'username' : 'username'}
                            />
                            <User className={`absolute ${isRtl ? 'left-3' : 'right-3'} top-3.5 h-5 w-5 text-gray-400`} />
                          </div>
                        </div>

                        <div>
                          <Label className="text-sm font-semibold text-gray-700 mb-1.5 block">
                            {isAr ? 'كلمة المرور' : 'Password'}
                          </Label>
                          <div className="relative">
                            <Input
                              type={showPassword ? 'text' : 'password'}
                              value={loginPassword}
                              onChange={(e) => setLoginPassword(e.target.value)}
                              className="rounded-xl h-12"
                            />
                            <button type="button" onClick={() => setShowPassword(!showPassword)} className={`absolute ${isRtl ? 'left-3' : 'right-3'} top-3.5 text-gray-400`}>
                              {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                            </button>
                          </div>
                        </div>

                        <Button type="submit" disabled={isSubmitting} className="w-full h-12 bg-teal-600 hover:bg-teal-700 text-white rounded-xl shadow-lg shadow-teal-600/20 text-base font-bold transition-all mt-4">
                          {isSubmitting ? (
                            <span className="flex items-center gap-2"><svg className="animate-spin w-5 h-5" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" /><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" /></svg></span>
                          ) : (
                            <span className="flex items-center gap-2"><LogIn className="w-5 h-5" />{isAr ? 'تسجيل الدخول' : 'Sign In'}</span>
                          )}
                        </Button>
                      </form>
                    </motion.div>
                  ) : (
                    <motion.div key="register" initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -10 }}>
                      <div className="text-center mb-6">
                        <h1 className="text-2xl font-bold text-gray-900 mb-1">{isAr ? 'طلب انضمام' : 'Join Request'}</h1>
                        <p className="text-gray-500 text-sm">{isAr ? 'أدخل بياناتك وسيتم إرسالها للإدارة للموافقة' : 'Enter details to send to admin for approval'}</p>
                      </div>

                      {/* Account Type Toggle */}
                      <div className="flex gap-2 mb-5 bg-gray-100 rounded-xl p-1">
                        <button type="button" onClick={() => setRegType('specialist')}
                          className={`flex-1 py-2 px-3 rounded-lg text-sm font-bold transition-all flex items-center justify-center gap-1.5 ${regType === 'specialist' ? 'bg-white shadow text-teal-700' : 'text-gray-500 hover:text-gray-700'}`}>
                          <Stethoscope className="w-4 h-4" />
                          {isAr ? 'أخصائي' : 'Specialist'}
                        </button>
                        <button type="button" onClick={() => setRegType('center')}
                          className={`flex-1 py-2 px-3 rounded-lg text-sm font-bold transition-all flex items-center justify-center gap-1.5 ${regType === 'center' ? 'bg-white shadow text-teal-700' : 'text-gray-500 hover:text-gray-700'}`}>
                          <Building2 className="w-4 h-4" />
                          {isAr ? 'مركز' : 'Center'}
                        </button>
                      </div>

                      <form onSubmit={handleRegister} className="space-y-3">
                        <div>
                          <Label className="text-sm font-semibold text-gray-700 mb-1.5 block">{isAr ? (regType === 'center' ? 'اسم المركز' : 'الاسم بالكامل') : (regType === 'center' ? 'Center Name' : 'Full Name')}</Label>
                          <Input value={regData.fullName} onChange={(e) => setRegData({ ...regData, fullName: e.target.value })} className="rounded-xl h-11" required />
                        </div>
                        <div>
                          <Label className="text-sm font-semibold text-gray-700 mb-1.5 block">{isAr ? 'رقم الواتساب' : 'WhatsApp Number'}</Label>
                          <Input value={regData.phone} onChange={(e) => setRegData({ ...regData, phone: e.target.value })} className="rounded-xl h-11" placeholder="01XXXXXXXXX" required />
                        </div>
                        {regType === 'specialist' && (
                          <div>
                            <Label className="text-sm font-semibold text-gray-700 mb-1.5 block">{isAr ? 'التخصص' : 'Specialization'}</Label>
                            <Input value={regData.specialization} onChange={(e) => setRegData({ ...regData, specialization: e.target.value })} className="rounded-xl h-11" placeholder={isAr ? 'مثال: أطراف صناعية' : 'e.g. Prosthetics'} />
                          </div>
                        )}
                        {regType === 'center' && (
                          <div>
                            <Label className="text-sm font-semibold text-gray-700 mb-1.5 block">{isAr ? 'اسم المركز' : 'Center Name'}</Label>
                            <Input value={regData.centerName} onChange={(e) => setRegData({ ...regData, centerName: e.target.value })} className="rounded-xl h-11" />
                          </div>
                        )}
                        <div className="grid grid-cols-2 gap-3">
                          <div>
                            <Label className="text-sm font-semibold text-gray-700 mb-1.5 block">{isAr ? 'اسم المستخدم' : 'Username'}</Label>
                            <Input value={regData.username} onChange={(e) => setRegData({ ...regData, username: e.target.value })} className="rounded-xl h-11" required />
                          </div>
                          <div>
                            <Label className="text-sm font-semibold text-gray-700 mb-1.5 block">{isAr ? 'كلمة المرور' : 'Password'}</Label>
                            <Input type={showPassword ? 'text' : 'password'} value={regData.password} onChange={(e) => setRegData({ ...regData, password: e.target.value })} className="rounded-xl h-11" required />
                          </div>
                        </div>

                        <div className="pt-3">
                          <Button type="submit" disabled={isSubmitting} className="w-full h-12 bg-teal-600 hover:bg-teal-700 text-white rounded-xl shadow-lg shadow-teal-600/20 text-base font-bold transition-all">
                            {isSubmitting ? (
                              <span className="flex items-center gap-2"><svg className="animate-spin w-5 h-5" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" /><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" /></svg></span>
                            ) : (
                              <span className="flex items-center gap-2"><UserPlus className="w-5 h-5" />{isAr ? 'إرسال طلب الانضمام' : 'Send Join Request'}</span>
                            )}
                          </Button>
                          <p className="text-xs text-center text-gray-500 mt-3">
                            {isAr ? 'سيتم مراجعة طلبك من قبل الإدارة وإعلامك بالنتيجة' : 'Your request will be reviewed by admin and you will be notified'}
                          </p>
                        </div>
                      </form>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default SpecialistLogin;
