import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { User, Mail, Lock, Phone, ArrowRight, ArrowLeft, CheckCircle2, UserPlus, Building, Shield, Eye, EyeOff } from 'lucide-react';
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
  { value: 'patient' as UserRole, icon: User, labelAr: 'مريض', labelEn: 'Patient', descAr: 'ابحث عن مراكز وأجهزة تعويضية', descEn: 'Find centers and prosthetic devices', color: 'from-blue-500 to-blue-600' },
  { value: 'center' as UserRole, icon: Building, labelAr: 'مركز طبي', labelEn: 'Medical Center', descAr: 'إدارة مركزك والحجوزات', descEn: 'Manage your center and bookings', color: 'from-teal-500 to-teal-600' },
  { value: 'insurance' as UserRole, icon: Shield, labelAr: 'شركة تأمين', labelEn: 'Insurance Company', descAr: 'إدارة طلبات التأمين', descEn: 'Manage insurance requests', color: 'from-purple-500 to-purple-600' },
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
  const [formData, setFormData] = useState({ fullName: '', email: '', phone: '', password: '', confirmPassword: '', role: 'patient' as UserRole });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const validate = (s: number) => {
    if (s === 1 && (!formData.fullName || !formData.email || !formData.phone)) { toast.error(isAr ? 'يرجى ملء جميع الحقول' : 'Fill all fields'); return false; }
    if (s === 1 && !/\S+@\S+\.\S+/.test(formData.email)) { toast.error(isAr ? 'بريد إلكتروني غير صحيح' : 'Invalid email'); return false; }
    if (s === 2 && formData.password.length < 6) { toast.error(isAr ? 'كلمة المرور 6 أحرف على الأقل' : 'Min 6 characters'); return false; }
    if (s === 2 && formData.password !== formData.confirmPassword) { toast.error(isAr ? 'كلمتا المرور غير متطابقتين' : 'Passwords mismatch'); return false; }
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate(2)) return;
    setIsSubmitting(true);
    try {
      await signUp(formData.email, formData.password, formData.fullName, formData.role);
      toast.success(isAr ? 'تم إنشاء الحساب بنجاح!' : 'Account created!');
      navigate('/login');
    } catch (err: any) { toast.error(err.message); }
    finally { setIsSubmitting(false); }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow flex items-center justify-center py-16 bg-gradient-to-b from-medical-50 to-white">
        <div className="w-full max-w-lg px-4">
          <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="flex items-center justify-center gap-0 mb-8">
            {[1, 2, 3].map((s, i) => (
              <React.Fragment key={s}>
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center text-sm font-bold transition-all ${step >= s ? 'bg-gradient-to-br from-medical-500 to-medical-700 text-white shadow-lg shadow-medical-500/30' : 'bg-gray-100 text-gray-400 border-2 border-gray-200'}`}>
                  {step > s ? <CheckCircle2 className="w-4 h-4" /> : s}
                </div>
                {i < 2 && <div className={`w-12 h-1 rounded-full mx-1.5 transition-all ${step > s ? 'bg-medical-500' : 'bg-gray-200'}`} />}
              </React.Fragment>
            ))}
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <div className="bg-white p-8 rounded-3xl shadow-xl border border-gray-100">
              <div className="text-center mb-6">
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-medical-500 to-medical-700 flex items-center justify-center mx-auto mb-4 shadow-lg shadow-medical-500/20"><UserPlus className="w-7 h-7 text-white" /></div>
                <h1 className="text-2xl font-bold text-gray-900">{isAr ? 'إنشاء حساب جديد' : 'Create Account'}</h1>
                <p className="text-gray-500 mt-1 text-sm">{isAr ? 'انضم إلى منصة واصل الطبية' : 'Join Wasel Medical Platform'}</p>
              </div>

              <form onSubmit={handleSubmit}>
                <AnimatePresence mode="wait">
                  {step === 1 && (
                    <motion.div key="s1" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-4">
                      <div><Label className="text-sm font-semibold text-gray-700 mb-1 block">{isAr ? 'الاسم الكامل' : 'Full Name'} *</Label><Input name="fullName" value={formData.fullName} onChange={handleChange} className="rounded-xl h-12" required /></div>
                      <div><Label className="text-sm font-semibold text-gray-700 mb-1 block">{isAr ? 'البريد الإلكتروني' : 'Email'} *</Label><Input name="email" type="email" value={formData.email} onChange={handleChange} className="rounded-xl h-12" required /></div>
                      <div><Label className="text-sm font-semibold text-gray-700 mb-1 block">{isAr ? 'رقم الهاتف' : 'Phone'} *</Label><Input name="phone" value={formData.phone} onChange={handleChange} placeholder="01xxxxxxxxx" className="rounded-xl h-12" required /></div>
                    </motion.div>
                  )}
                  {step === 2 && (
                    <motion.div key="s2" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-4">
                      <div><Label className="text-sm font-semibold text-gray-700 mb-1 block">{isAr ? 'كلمة المرور' : 'Password'} *</Label>
                        <div className="relative"><Input name="password" type={showPassword ? 'text' : 'password'} value={formData.password} onChange={handleChange} className="rounded-xl h-12" required />
                          <button type="button" onClick={() => setShowPassword(!showPassword)} className={`absolute ${isRtl ? 'left-3' : 'right-3'} top-3.5 text-gray-400`}>{showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}</button></div></div>
                      <div><Label className="text-sm font-semibold text-gray-700 mb-1 block">{isAr ? 'تأكيد كلمة المرور' : 'Confirm Password'} *</Label><Input name="confirmPassword" type="password" value={formData.confirmPassword} onChange={handleChange} className="rounded-xl h-12" required /></div>
                    </motion.div>
                  )}
                  {step === 3 && (
                    <motion.div key="s3" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
                      <p className="text-sm font-semibold text-gray-700 mb-4">{isAr ? 'نوع الحساب' : 'Account Type'} *</p>
                      <div className="space-y-3">
                        {roles.map(r => (
                          <button key={r.value} type="button" onClick={() => setFormData({ ...formData, role: r.value })}
                            className={`w-full p-4 rounded-2xl border-2 transition-all flex items-center gap-4 text-start ${formData.role === r.value ? 'border-medical-500 bg-medical-50 shadow-lg' : 'border-gray-200 hover:border-gray-300'}`}>
                            <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${r.color} flex items-center justify-center shadow-lg`}><r.icon className="w-6 h-6 text-white" /></div>
                            <div><p className="font-bold text-gray-900">{isAr ? r.labelAr : r.labelEn}</p><p className="text-xs text-gray-500">{isAr ? r.descAr : r.descEn}</p></div>
                            {formData.role === r.value && <CheckCircle2 className="w-5 h-5 text-medical-600 ms-auto" />}
                          </button>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                <div className="flex items-center justify-between mt-8 pt-6 border-t border-gray-100">
                  {step > 1 ? <Button type="button" variant="outline" onClick={() => setStep(step - 1)} className="rounded-xl px-6"><ArrowRight className={`w-4 h-4 me-2 ${isRtl ? '' : 'rotate-180'}`} />{isAr ? 'السابق' : 'Back'}</Button> : <div />}
                  {step < 3 ? (
                    <Button type="button" onClick={() => { if (validate(step)) setStep(step + 1); }} className="bg-gradient-to-l from-medical-600 to-medical-700 text-white rounded-xl px-8 shadow-lg">{isAr ? 'التالي' : 'Next'}<ArrowLeft className={`w-4 h-4 ms-2 ${isRtl ? '' : 'rotate-180'}`} /></Button>
                  ) : (
                    <Button type="submit" disabled={isSubmitting} className="bg-gradient-to-l from-medical-600 to-medical-700 text-white rounded-xl px-8 shadow-lg">
                      {isSubmitting ? <span className="flex items-center gap-2"><svg className="animate-spin w-5 h-5" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" /><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" /></svg>{isAr ? 'جاري التسجيل...' : 'Registering...'}</span>
                        : <span className="flex items-center gap-2"><UserPlus className="w-5 h-5" />{isAr ? 'إنشاء الحساب' : 'Create Account'}</span>}
                    </Button>
                  )}
                </div>
              </form>

              <div className="text-center mt-6 pt-4 border-t border-gray-100">
                <p className="text-sm text-gray-500">{isAr ? 'لديك حساب بالفعل؟' : 'Have an account?'}{' '}<Link to="/login" className="text-medical-600 font-semibold hover:underline">{isAr ? 'تسجيل الدخول' : 'Sign In'}</Link></p>
              </div>
            </div>
          </motion.div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Register;
