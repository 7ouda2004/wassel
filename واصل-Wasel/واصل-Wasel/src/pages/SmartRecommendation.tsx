import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Brain, Activity, DollarSign, ArrowRight, ArrowLeft, Sparkles, MapPin, Package, CheckCircle2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { useTranslation } from 'react-i18next';

interface QuizAnswer { condition: string; activityLevel: string; budget: string; }

const conditions = [
  { id: 'below_knee', labelAr: 'بتر تحت الركبة', labelEn: 'Below Knee Amputation', icon: '🦿' },
  { id: 'above_knee', labelAr: 'بتر فوق الركبة', labelEn: 'Above Knee Amputation', icon: '🦿' },
  { id: 'upper_limb', labelAr: 'بتر طرف علوي', labelEn: 'Upper Limb Amputation', icon: '💪' },
  { id: 'foot_ankle', labelAr: 'ضعف القدم والكاحل', labelEn: 'Foot & Ankle Weakness', icon: '🦶' },
  { id: 'knee_instability', labelAr: 'عدم استقرار الركبة', labelEn: 'Knee Instability', icon: '🦵' },
  { id: 'spine', labelAr: 'مشاكل العمود الفقري', labelEn: 'Spine Issues', icon: '🔙' },
];

const activityLevels = [
  { id: 'low', labelAr: 'منخفض - حركة داخل المنزل', labelEn: 'Low - Indoor mobility', color: 'from-green-400 to-green-500' },
  { id: 'moderate', labelAr: 'متوسط - حركة يومية عادية', labelEn: 'Moderate - Daily activities', color: 'from-blue-400 to-blue-500' },
  { id: 'high', labelAr: 'مرتفع - نشاط رياضي', labelEn: 'High - Sports & athletics', color: 'from-orange-400 to-orange-500' },
  { id: 'very_high', labelAr: 'عالي جداً - رياضة احترافية', labelEn: 'Very High - Professional sports', color: 'from-red-400 to-red-500' },
];

const budgets = [
  { id: 'economy', labelAr: 'اقتصادي (5,000 - 15,000 ج.م)', labelEn: 'Economy (5K - 15K EGP)', range: '5000-15000' },
  { id: 'standard', labelAr: 'قياسي (15,000 - 40,000 ج.م)', labelEn: 'Standard (15K - 40K EGP)', range: '15000-40000' },
  { id: 'premium', labelAr: 'متميز (40,000 - 100,000 ج.م)', labelEn: 'Premium (40K - 100K EGP)', range: '40000-100000' },
  { id: 'elite', labelAr: 'فاخر (100,000+ ج.م)', labelEn: 'Elite (100K+ EGP)', range: '100000+' },
];

const SmartRecommendation = () => {
  const { i18n } = useTranslation();
  const isAr = i18n.language === 'ar';
  const isRtl = i18n.dir() === 'rtl';
  const [step, setStep] = useState(1);
  const [showResults, setShowResults] = useState(false);
  const [answers, setAnswers] = useState<QuizAnswer>({ condition: '', activityLevel: '', budget: '' });

  const getRecommendations = () => {
    const recs: { devices: { name: string; desc: string; price: string }[]; centers: { name: string; city: string }[] } = { devices: [], centers: [] };
    if (answers.condition.includes('knee')) {
      recs.devices.push(
        { name: isAr ? 'طرف صناعي ميكانيكي' : 'Mechanical Prosthesis', desc: isAr ? 'مناسب للنشاط المنخفض والمتوسط' : 'Suitable for low-moderate activity', price: '10,000 - 25,000 EGP' },
        { name: isAr ? 'طرف صناعي هيدروليكي' : 'Hydraulic Prosthesis', desc: isAr ? 'تحكم أفضل في الحركة' : 'Better motion control', price: '30,000 - 60,000 EGP' }
      );
    } else if (answers.condition.includes('foot') || answers.condition.includes('ankle')) {
      recs.devices.push(
        { name: isAr ? 'جبيرة AFO ديناميكية' : 'Dynamic AFO', desc: isAr ? 'دعم القدم أثناء المشي' : 'Foot support while walking', price: '3,000 - 8,000 EGP' },
        { name: isAr ? 'جبيرة AFO مفصلية' : 'Articulated AFO', desc: isAr ? 'مرونة أعلى في الحركة' : 'Higher flexibility', price: '5,000 - 12,000 EGP' }
      );
    } else {
      recs.devices.push(
        { name: isAr ? 'جهاز تقويمي متخصص' : 'Specialized Orthotic', desc: isAr ? 'مصمم خصيصاً لحالتك' : 'Custom designed for your condition', price: '8,000 - 30,000 EGP' }
      );
    }
    recs.centers = [
      { name: isAr ? 'واصل - المركز الرئيسي' : 'Wasel - Main Center', city: isAr ? 'القاهرة' : 'Cairo' },
      { name: isAr ? 'واصل - فرع الإسكندرية' : 'Wasel - Alexandria Branch', city: isAr ? 'الإسكندرية' : 'Alexandria' },
      { name: isAr ? 'واصل - فرع المنصورة' : 'Wasel - Mansoura Branch', city: isAr ? 'المنصورة' : 'Mansoura' },
    ];
    return recs;
  };

  if (showResults) {
    const recs = getRecommendations();
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <section className="flex-grow py-16 bg-gradient-to-b from-medical-50 to-white">
          <div className="container mx-auto px-4 max-w-4xl">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-12">
              <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center mx-auto mb-6 shadow-2xl shadow-amber-500/30"><Sparkles className="w-10 h-10 text-white" /></div>
              <h2 className="text-3xl font-bold text-gray-900 mb-2">{isAr ? 'التوصيات المناسبة لك' : 'Your Recommendations'}</h2>
              <p className="text-gray-500">{isAr ? 'بناءً على إجاباتك، نوصي بالتالي' : 'Based on your answers, we recommend'}</p>
            </motion.div>

            <div className="grid gap-8 md:grid-cols-2 mb-12">
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2"><Package className="w-5 h-5 text-medical-600" />{isAr ? 'الأجهزة المناسبة' : 'Suitable Devices'}</h3>
                <div className="space-y-4">
                  {recs.devices.map((d, i) => (
                    <motion.div key={i} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.1 }} className="bg-white rounded-2xl p-6 border border-gray-100 shadow-md hover:shadow-lg transition-shadow">
                      <h4 className="font-bold text-gray-900 mb-1">{d.name}</h4>
                      <p className="text-gray-500 text-sm mb-2">{d.desc}</p>
                      <p className="text-medical-600 font-semibold text-sm">{d.price}</p>
                    </motion.div>
                  ))}
                </div>
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2"><MapPin className="w-5 h-5 text-medical-600" />{isAr ? 'المراكز المناسبة' : 'Suitable Centers'}</h3>
                <div className="space-y-4">
                  {recs.centers.map((c, i) => (
                    <motion.div key={i} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.1 }} className="bg-white rounded-2xl p-6 border border-gray-100 shadow-md hover:shadow-lg transition-shadow">
                      <h4 className="font-bold text-gray-900 mb-1">{c.name}</h4>
                      <p className="text-gray-500 text-sm flex items-center gap-1"><MapPin className="w-3 h-3" />{c.city}</p>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>

            <div className="flex flex-wrap gap-4 justify-center">
              <Link to="/booking"><Button className="bg-gradient-to-l from-medical-600 to-medical-700 text-white rounded-xl px-8 py-3 shadow-lg">{isAr ? 'احجز استشارة الآن' : 'Book Consultation Now'}</Button></Link>
              <Link to="/centers"><Button variant="outline" className="rounded-xl px-8 py-3">{isAr ? 'استعرض المراكز' : 'Browse Centers'}</Button></Link>
              <Button variant="ghost" onClick={() => { setShowResults(false); setStep(1); setAnswers({ condition: '', activityLevel: '', budget: '' }); }} className="rounded-xl px-8">{isAr ? 'إعادة الاختبار' : 'Retake Quiz'}</Button>
            </div>
          </div>
        </section>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <section className="relative py-16 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-bl from-amber-50 via-white to-medical-50">
          <motion.div animate={{ scale: [1, 1.2, 1] }} transition={{ duration: 8, repeat: Infinity }} className="absolute top-10 right-20 w-72 h-72 rounded-full bg-amber-200/30 blur-3xl" />
        </div>
        <div className="relative container mx-auto px-4 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <div className="inline-flex items-center gap-2 bg-amber-100 text-amber-700 px-4 py-2 rounded-full text-sm font-bold mb-4"><Brain className="w-4 h-4" />{isAr ? 'نظام التوصية الذكي' : 'Smart Recommendation'}</div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4"><span className="bg-gradient-to-l from-amber-600 to-medical-600 bg-clip-text text-transparent">{isAr ? 'اكتشف الجهاز المناسب لك' : 'Find Your Perfect Device'}</span></h1>
            <p className="text-gray-500 text-lg max-w-xl mx-auto">{isAr ? 'أجب على بعض الأسئلة وسنساعدك في اختيار الجهاز والمركز الأنسب' : 'Answer a few questions and we\'ll help find the best device and center'}</p>
          </motion.div>
        </div>
      </section>

      <section className="pb-20 -mt-4">
        <div className="container mx-auto px-4 max-w-2xl">
          <div className="flex items-center justify-center gap-0 mb-10">
            {[1, 2, 3].map((s, i) => (
              <React.Fragment key={s}>
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-base font-bold transition-all ${step >= s ? 'bg-gradient-to-br from-amber-500 to-orange-600 text-white shadow-lg' : 'bg-gray-100 text-gray-400 border-2 border-gray-200'}`}>
                  {step > s ? <CheckCircle2 className="w-5 h-5" /> : s}
                </div>
                {i < 2 && <div className={`w-16 h-1 rounded-full mx-2 transition-all ${step > s ? 'bg-amber-500' : 'bg-gray-200'}`} />}
              </React.Fragment>
            ))}
          </div>

          <div className="bg-white rounded-3xl shadow-xl border border-gray-100 p-8">
            <AnimatePresence mode="wait">
              {step === 1 && (
                <motion.div key="q1" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
                  <h2 className="text-2xl font-bold text-gray-900 mb-2 flex items-center gap-2"><Activity className="w-6 h-6 text-amber-600" />{isAr ? 'ما هي حالتك الطبية؟' : 'What is your condition?'}</h2>
                  <p className="text-gray-500 mb-6 text-sm">{isAr ? 'اختر الحالة الأقرب لوضعك' : 'Select the closest to your situation'}</p>
                  <div className="grid grid-cols-2 gap-3">
                    {conditions.map(c => (
                      <button key={c.id} type="button" onClick={() => setAnswers({ ...answers, condition: c.id })}
                        className={`p-4 rounded-2xl border-2 transition-all text-start ${answers.condition === c.id ? 'border-amber-500 bg-amber-50 shadow-lg' : 'border-gray-200 hover:border-gray-300'}`}>
                        <span className="text-2xl mb-2 block">{c.icon}</span>
                        <p className="font-bold text-sm text-gray-900">{isAr ? c.labelAr : c.labelEn}</p>
                      </button>
                    ))}
                  </div>
                </motion.div>
              )}
              {step === 2 && (
                <motion.div key="q2" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
                  <h2 className="text-2xl font-bold text-gray-900 mb-2 flex items-center gap-2"><Activity className="w-6 h-6 text-amber-600" />{isAr ? 'ما مستوى نشاطك؟' : 'Activity Level?'}</h2>
                  <p className="text-gray-500 mb-6 text-sm">{isAr ? 'هذا يساعدنا في اختيار الجهاز الأنسب' : 'This helps us find the right device'}</p>
                  <div className="space-y-3">
                    {activityLevels.map(a => (
                      <button key={a.id} type="button" onClick={() => setAnswers({ ...answers, activityLevel: a.id })}
                        className={`w-full p-5 rounded-2xl border-2 transition-all flex items-center gap-4 text-start ${answers.activityLevel === a.id ? 'border-amber-500 bg-amber-50 shadow-lg' : 'border-gray-200 hover:border-gray-300'}`}>
                        <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${a.color} flex items-center justify-center`}><Activity className="w-5 h-5 text-white" /></div>
                        <p className="font-bold text-gray-900">{isAr ? a.labelAr : a.labelEn}</p>
                        {answers.activityLevel === a.id && <CheckCircle2 className="w-5 h-5 text-amber-600 ms-auto" />}
                      </button>
                    ))}
                  </div>
                </motion.div>
              )}
              {step === 3 && (
                <motion.div key="q3" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
                  <h2 className="text-2xl font-bold text-gray-900 mb-2 flex items-center gap-2"><DollarSign className="w-6 h-6 text-amber-600" />{isAr ? 'ما ميزانيتك التقريبية؟' : 'Approximate Budget?'}</h2>
                  <p className="text-gray-500 mb-6 text-sm">{isAr ? 'هذا يساعدنا في تحديد الخيارات المتاحة' : 'Helps us narrow down options'}</p>
                  <div className="space-y-3">
                    {budgets.map(b => (
                      <button key={b.id} type="button" onClick={() => setAnswers({ ...answers, budget: b.id })}
                        className={`w-full p-5 rounded-2xl border-2 transition-all flex items-center gap-4 text-start ${answers.budget === b.id ? 'border-amber-500 bg-amber-50 shadow-lg' : 'border-gray-200 hover:border-gray-300'}`}>
                        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-400 to-amber-500 flex items-center justify-center"><DollarSign className="w-5 h-5 text-white" /></div>
                        <p className="font-bold text-gray-900">{isAr ? b.labelAr : b.labelEn}</p>
                        {answers.budget === b.id && <CheckCircle2 className="w-5 h-5 text-amber-600 ms-auto" />}
                      </button>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            <div className="flex items-center justify-between mt-8 pt-6 border-t border-gray-100">
              {step > 1 ? <Button type="button" variant="outline" onClick={() => setStep(step - 1)} className="rounded-xl px-6"><ArrowRight className={`w-4 h-4 me-2 ${isRtl ? '' : 'rotate-180'}`} />{isAr ? 'السابق' : 'Back'}</Button> : <div />}
              {step < 3 ? (
                <Button type="button" onClick={() => { if ((step === 1 && !answers.condition) || (step === 2 && !answers.activityLevel)) { return; } setStep(step + 1); }} className="bg-gradient-to-l from-amber-500 to-orange-600 text-white rounded-xl px-8 shadow-lg">{isAr ? 'التالي' : 'Next'}<ArrowLeft className={`w-4 h-4 ms-2 ${isRtl ? '' : 'rotate-180'}`} /></Button>
              ) : (
                <Button type="button" onClick={() => { if (!answers.budget) return; setShowResults(true); }} className="bg-gradient-to-l from-amber-500 to-orange-600 text-white rounded-xl px-8 shadow-lg"><Sparkles className="w-5 h-5 me-2" />{isAr ? 'عرض التوصيات' : 'Show Recommendations'}</Button>
              )}
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default SmartRecommendation;
