import React, { useState } from 'react';
import { useNavigate, Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Lock, Mail, Eye, EyeOff, LogIn } from 'lucide-react';
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
  const { signIn } = useAuth();
  const isAr = i18n.language === 'ar';
  const isRtl = i18n.dir() === 'rtl';

  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({ email: '', password: '' });

  // Legacy login fallback
  const [useLegacy, setUseLegacy] = useState(false);

  const from = (location.state as any)?.from?.pathname || '/dashboard';

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      if (useLegacy) {
        // Legacy specialist login (backward compatible)
        if (formData.email === 'specialist' && formData.password === 'specialist123') {
          sessionStorage.setItem('isSpecialist', 'true');
          sessionStorage.setItem('username', formData.email);
          toast.success(t('login.success'));
          window.location.href = '/specialist-dashboard';
          return;
        }
        // Legacy password login
        if (formData.password === 'daizer') {
          sessionStorage.setItem('isSpecialist', 'true');
          sessionStorage.setItem('username', 'mahmoud');
          toast.success(isAr ? 'تم تسجيل الدخول بنجاح' : 'Login successful');
          window.location.href = '/specialist-dashboard';
          return;
        }
        toast.error(isAr ? 'بيانات غير صحيحة' : 'Invalid credentials');
        return;
      }

      // Supabase auth login
      await signIn(formData.email, formData.password);
      toast.success(isAr ? 'تم تسجيل الدخول بنجاح' : 'Login successful');
      
      // Retrieve the role from the mock since we are running locally without Supabase configured
      const role = sessionStorage.getItem('mockRole') || 'patient';
      
      if (from !== '/dashboard' && from !== '/') {
        navigate(from, { replace: true });
      } else if (role === 'center' || role === 'insurance') {
        navigate('/specialist-dashboard', { replace: true });
      } else {
        navigate('/dashboard', { replace: true });
      }
    } catch (error: any) {
      toast.error(error.message || (isAr ? 'حدث خطأ أثناء تسجيل الدخول' : 'Login error'));
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-grow flex items-center justify-center py-20 bg-gradient-to-b from-medical-50 to-white">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-md px-4"
        >
          <div className="bg-white p-8 rounded-3xl shadow-xl border border-gray-100">
            <div className="text-center mb-6">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-medical-500 to-medical-700 flex items-center justify-center mx-auto mb-4 shadow-lg shadow-medical-500/20">
                <LogIn className="w-7 h-7 text-white" />
              </div>
              <h1 className="text-2xl font-bold text-gray-900">
                {isAr ? 'تسجيل الدخول' : 'Sign In'}
              </h1>
              <p className="text-gray-500 mt-1 text-sm">
                {isAr ? 'ادخل إلى حسابك في منصة واصل' : 'Access your Wasel account'}
              </p>
            </div>

            {/* Toggle between Supabase and Legacy */}
            <div className="flex gap-2 mb-6 bg-gray-100 rounded-xl p-1">
              <button
                type="button"
                onClick={() => setUseLegacy(false)}
                className={`flex-1 py-2 px-4 rounded-lg text-sm font-semibold transition-all ${
                  !useLegacy ? 'bg-white shadow text-medical-700' : 'text-gray-500'
                }`}
              >
                {isAr ? 'حساب جديد' : 'New Account'}
              </button>
              <button
                type="button"
                onClick={() => setUseLegacy(true)}
                className={`flex-1 py-2 px-4 rounded-lg text-sm font-semibold transition-all ${
                  useLegacy ? 'bg-white shadow text-medical-700' : 'text-gray-500'
                }`}
              >
                {isAr ? 'أخصائي' : 'Specialist'}
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <Label htmlFor="email" className="text-sm font-semibold text-gray-700 mb-1 block">
                  {useLegacy ? (isAr ? 'اسم المستخدم' : 'Username') : (isAr ? 'البريد الإلكتروني' : 'Email')}
                </Label>
                <div className="relative">
                  <Input
                    id="email"
                    type={useLegacy ? 'text' : 'email'}
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="rounded-xl border-gray-200 h-12"
                    placeholder={useLegacy ? (isAr ? 'اسم المستخدم' : 'Username') : 'example@mail.com'}
                    required
                  />
                  <Mail className={`absolute ${isRtl ? 'left-3' : 'right-3'} top-3.5 h-5 w-5 text-gray-400`} />
                </div>
              </div>

              <div>
                <Label htmlFor="password" className="text-sm font-semibold text-gray-700 mb-1 block">
                  {isAr ? 'كلمة المرور' : 'Password'}
                </Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                    className="rounded-xl border-gray-200 h-12"
                    placeholder="••••••••"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className={`absolute ${isRtl ? 'left-3' : 'right-3'} top-3.5 text-gray-400 hover:text-gray-600`}
                  >
                    {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                  </button>
                </div>
              </div>

              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full h-12 bg-gradient-to-l from-medical-600 to-medical-700 text-white rounded-xl shadow-lg shadow-medical-600/20 text-base font-bold"
              >
                {isSubmitting ? (
                  <span className="flex items-center gap-2">
                    <svg className="animate-spin w-5 h-5" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                    </svg>
                    {isAr ? 'جاري تسجيل الدخول...' : 'Signing in...'}
                  </span>
                ) : (
                  <span className="flex items-center gap-2">
                    <LogIn className="w-5 h-5" />
                    {isAr ? 'تسجيل الدخول' : 'Sign In'}
                  </span>
                )}
              </Button>
            </form>

            {!useLegacy && (
              <div className="text-center mt-6 pt-4 border-t border-gray-100">
                <p className="text-sm text-gray-500">
                  {isAr ? 'ليس لديك حساب؟' : "Don't have an account?"}{' '}
                  <Link to="/register" className="text-medical-600 font-semibold hover:underline">
                    {isAr ? 'إنشاء حساب' : 'Create Account'}
                  </Link>
                </p>
              </div>
            )}
          </div>
        </motion.div>
      </main>

      <Footer />
    </div>
  );
};

export default Login;