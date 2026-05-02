import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShieldCheck, Upload, ArrowRight, ArrowLeft, CheckCircle2, FileText, Building, Send } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { toast } from 'sonner';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { useTranslation } from 'react-i18next';
import { insuranceService } from '@/services/insurance.service';
import { useAuth } from '@/providers/auth-provider';

const InsuranceRequest = () => {
  const { i18n } = useTranslation();
  const { user } = useAuth();
  const isAr = i18n.language === 'ar';
  const isRtl = i18n.dir() === 'rtl';
  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [files, setFiles] = useState<File[]>([]);
  const [formData, setFormData] = useState({ provider: '', policyNumber: '', centerId: '', notes: '' });

  const providers = insuranceService.getInsuranceProviders();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) setFiles(prev => [...prev, ...Array.from(e.target.files!)].slice(0, 5));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.provider) { toast.error(isAr ? 'يرجى اختيار شركة التأمين' : 'Select insurance provider'); return; }
    setIsSubmitting(true);
    try {
      await insuranceService.create({
        patient_id: user?.id || '',
        insurance_provider: formData.provider,
        policy_number: formData.policyNumber || undefined,
        center_id: formData.centerId || undefined,
        notes: formData.notes || undefined,
      });
      setSubmitted(true);
      toast.success(isAr ? 'تم إرسال الطلب بنجاح' : 'Request submitted successfully');
    } catch (err: any) {
      toast.error(err.message || (isAr ? 'حدث خطأ' : 'Error occurred'));
    } finally { setIsSubmitting(false); }
  };

  if (submitted) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <div className="flex-grow flex items-center justify-center bg-gradient-to-b from-green-50 to-white py-20">
          <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: 'spring' }} className="text-center max-w-lg mx-auto px-6">
            <div className="w-24 h-24 rounded-full bg-gradient-to-br from-green-400 to-emerald-600 flex items-center justify-center mx-auto mb-6 shadow-2xl shadow-green-500/30"><CheckCircle2 className="w-12 h-12 text-white" /></div>
            <h2 className="text-3xl font-bold text-gray-900 mb-4">{isAr ? 'تم إرسال الطلب بنجاح!' : 'Request Submitted!'}</h2>
            <p className="text-gray-600 text-lg mb-2">{isAr ? 'سيتم مراجعة طلبك وإخطارك بالنتيجة' : 'Your request will be reviewed and you will be notified'}</p>
            <p className="text-gray-500 text-sm mb-8">{isAr ? 'يمكنك متابعة حالة الطلب من لوحة التحكم' : 'Track status from your dashboard'}</p>
            <div className="flex gap-4 justify-center">
              <Button onClick={() => { setSubmitted(false); setStep(1); setFiles([]); }} className="bg-medical-600 text-white rounded-xl px-8">{isAr ? 'طلب جديد' : 'New Request'}</Button>
              <Button variant="outline" onClick={() => window.location.href = '/dashboard'} className="rounded-xl px-8">{isAr ? 'لوحة التحكم' : 'Dashboard'}</Button>
            </div>
          </motion.div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <section className="relative py-16 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-bl from-purple-50 via-white to-medical-50">
          <motion.div animate={{ scale: [1, 1.2, 1] }} transition={{ duration: 8, repeat: Infinity }} className="absolute top-10 right-20 w-72 h-72 rounded-full bg-purple-200/30 blur-3xl" />
        </div>
        <div className="relative container mx-auto px-4 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <div className="inline-flex items-center gap-2 bg-purple-100 text-purple-700 px-4 py-2 rounded-full text-sm font-bold mb-4"><ShieldCheck className="w-4 h-4" />{isAr ? 'طلب موافقة تأمين' : 'Insurance Approval Request'}</div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4"><span className="bg-gradient-to-l from-purple-600 to-medical-600 bg-clip-text text-transparent">{isAr ? 'طلب موافقة التأمين' : 'Insurance Approval'}</span></h1>
            <p className="text-gray-500 text-lg max-w-xl mx-auto">{isAr ? 'قدم طلب موافقة التأمين الخاص بك وتابع حالته' : 'Submit your insurance approval request and track its status'}</p>
          </motion.div>
        </div>
      </section>

      <section className="pb-20 -mt-4">
        <div className="container mx-auto px-4 max-w-2xl">
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex items-center justify-center gap-0 mb-10">
            {[1, 2, 3].map((s, i) => (
              <React.Fragment key={s}>
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-base font-bold transition-all ${step >= s ? 'bg-gradient-to-br from-purple-500 to-purple-700 text-white shadow-lg shadow-purple-500/30' : 'bg-gray-100 text-gray-400 border-2 border-gray-200'}`}>
                  {step > s ? <CheckCircle2 className="w-5 h-5" /> : s}
                </div>
                {i < 2 && <div className={`w-16 h-1 rounded-full mx-2 transition-all ${step > s ? 'bg-purple-500' : 'bg-gray-200'}`} />}
              </React.Fragment>
            ))}
          </motion.div>

          <form onSubmit={handleSubmit}>
            <div className="bg-white rounded-3xl shadow-xl border border-gray-100 p-8">
              <AnimatePresence mode="wait">
                {step === 1 && (
                  <motion.div key="s1" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
                    <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2"><ShieldCheck className="w-6 h-6 text-purple-600" />{isAr ? 'بيانات التأمين' : 'Insurance Details'}</h2>
                    <div className="space-y-5">
                      <div>
                        <Label className="text-sm font-semibold text-gray-700 mb-1 block">{isAr ? 'شركة التأمين' : 'Insurance Provider'} *</Label>
                        <select name="provider" value={formData.provider} onChange={handleChange} className="w-full rounded-xl border border-gray-200 p-3 h-12 focus:ring-2 focus:ring-purple-500 bg-white text-sm">
                          <option value="">{isAr ? 'اختر شركة التأمين' : 'Select Provider'}</option>
                          {providers.map(p => <option key={p.id} value={p.id}>{isAr ? p.name_ar : p.name_en}</option>)}
                        </select>
                      </div>
                      <div>
                        <Label className="text-sm font-semibold text-gray-700 mb-1 block">{isAr ? 'رقم البوليصة' : 'Policy Number'}</Label>
                        <Input name="policyNumber" value={formData.policyNumber} onChange={handleChange} className="rounded-xl h-12" placeholder={isAr ? 'أدخل رقم البوليصة (اختياري)' : 'Enter policy number (optional)'} />
                      </div>
                    </div>
                  </motion.div>
                )}
                {step === 2 && (
                  <motion.div key="s2" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
                    <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2"><Upload className="w-6 h-6 text-purple-600" />{isAr ? 'رفع المستندات' : 'Upload Documents'}</h2>
                    <div className="border-2 border-dashed border-gray-300 rounded-2xl p-8 text-center hover:border-purple-400 transition-colors">
                      <input type="file" accept="image/*,.pdf,.doc" multiple onChange={handleFileChange} className="hidden" id="insurance-files" />
                      <label htmlFor="insurance-files" className="cursor-pointer">
                        <div className="w-14 h-14 rounded-2xl bg-purple-100 flex items-center justify-center mx-auto mb-3"><Upload className="w-7 h-7 text-purple-600" /></div>
                        <p className="text-gray-700 font-semibold">{isAr ? 'اسحب الملفات أو اضغط للرفع' : 'Drag files or click to upload'}</p>
                        <p className="text-gray-400 text-sm mt-1">{isAr ? 'بطاقة تأمين، تقارير طبية' : 'Insurance card, medical reports'}</p>
                      </label>
                    </div>
                    {files.length > 0 && (
                      <div className="mt-4 space-y-2">
                        {files.map((f, i) => (
                          <div key={i} className="flex items-center gap-3 bg-gray-50 p-3 rounded-xl">
                            <FileText className="w-5 h-5 text-purple-500" />
                            <span className="text-sm truncate flex-1">{f.name}</span>
                            <button type="button" onClick={() => setFiles(files.filter((_, idx) => idx !== i))} className="text-red-500 text-sm">{isAr ? 'حذف' : 'Remove'}</button>
                          </div>
                        ))}
                      </div>
                    )}
                  </motion.div>
                )}
                {step === 3 && (
                  <motion.div key="s3" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
                    <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2"><Send className="w-6 h-6 text-purple-600" />{isAr ? 'ملاحظات إضافية' : 'Additional Notes'}</h2>
                    <Textarea name="notes" value={formData.notes} onChange={handleChange} rows={4} placeholder={isAr ? 'أي ملاحظات إضافية...' : 'Any additional notes...'} className="rounded-xl border-gray-200 resize-none" />
                    <div className="mt-6 bg-purple-50 rounded-2xl p-6 border border-purple-100">
                      <h4 className="font-bold text-gray-900 mb-3">{isAr ? 'ملخص الطلب' : 'Request Summary'}</h4>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between"><span className="text-gray-500">{isAr ? 'شركة التأمين' : 'Provider'}:</span><span className="font-semibold">{providers.find(p => p.id === formData.provider)?.[isAr ? 'name_ar' : 'name_en'] || '-'}</span></div>
                        <div className="flex justify-between"><span className="text-gray-500">{isAr ? 'رقم البوليصة' : 'Policy #'}:</span><span className="font-semibold">{formData.policyNumber || '-'}</span></div>
                        <div className="flex justify-between"><span className="text-gray-500">{isAr ? 'المستندات' : 'Documents'}:</span><span className="font-semibold">{files.length} {isAr ? 'ملف' : 'files'}</span></div>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              <div className="flex items-center justify-between mt-8 pt-6 border-t border-gray-100">
                {step > 1 ? <Button type="button" variant="outline" onClick={() => setStep(step - 1)} className="rounded-xl px-6"><ArrowRight className={`w-4 h-4 me-2 ${isRtl ? '' : 'rotate-180'}`} />{isAr ? 'السابق' : 'Back'}</Button> : <div />}
                {step < 3 ? (
                  <Button type="button" onClick={() => { if (step === 1 && !formData.provider) { toast.error(isAr ? 'اختر شركة التأمين' : 'Select provider'); return; } setStep(step + 1); }} className="bg-gradient-to-l from-purple-600 to-purple-700 text-white rounded-xl px-8 shadow-lg">{isAr ? 'التالي' : 'Next'}<ArrowLeft className={`w-4 h-4 ms-2 ${isRtl ? '' : 'rotate-180'}`} /></Button>
                ) : (
                  <Button type="submit" disabled={isSubmitting} className="bg-gradient-to-l from-purple-600 to-purple-700 text-white rounded-xl px-8 shadow-lg">
                    {isSubmitting ? <span className="flex items-center gap-2"><svg className="animate-spin w-5 h-5" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" /><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" /></svg>{isAr ? 'جاري الإرسال...' : 'Submitting...'}</span>
                      : <span className="flex items-center gap-2"><Send className="w-5 h-5" />{isAr ? 'إرسال الطلب' : 'Submit Request'}</span>}
                  </Button>
                )}
              </div>
            </div>
          </form>
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default InsuranceRequest;
