import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Ruler, CheckCircle2, AlertTriangle, Zap, ShieldCheck, 
  ChevronRight, Calendar, Star, Award, Cpu, Waves, X, BarChart, Activity
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

interface FootProduct {
  id: string;
  name: string;
  brand: string;
  type: string;
  description: string;
  features: string[];
  limitations: string[];
  activityLevel: string;
  kLevel: string;
  price: string;
  image: string;
  weight?: string;
  maxUserWeight?: string;
  heelHeight?: string;
  waterproof?: string;
  warranty?: string;
  material?: string;
  techHighlight?: string;
  indications?: string[];
}

const footProducts: FootProduct[] = [
  {
    id: 'sach-foot',
    name: 'قدم SACH التقليدية',
    brand: 'Össur / Ottobock',
    type: 'ميكانيكية بسيطة',
    description: 'تصميم كلاسيكي متين يتألف من قلب خشبي أو كربوني محاط بفوم يوريثان مرن مع كعب ممتص للصدمات. خيار اقتصادي وموثوق للاستخدام اليومي الخفيف.',
    features: [
      'هيكل متين خالي من الأجزاء المتحركة',
      'كعب إسفنجي ممتص للصدمات عند ملامسة الأرض',
      'تكلفة اقتصادية وسهولة في العناية والارتداء',
      'حجم خفيف جداً ومقاوم للاحتكاك'
    ],
    limitations: [
      'عدم وجود كاحل متحرك أو تخزين طاقة',
      'أداء محدود على الأسطح غير المستوية',
      'غير مناسبة للأنشطة عالية التأثير أو الجري'
    ],
    activityLevel: 'منخفض',
    kLevel: 'K1 - K2',
    price: 'تبدأ من 5,000 ج.م',
    image: 'https://media.ossur.com/ossur-dam/image/upload/f_auto,q_auto,w_800,h_800,c_pad/spim/134_359b9120-77e9-4789-bb71-73974e7bd97f',
    weight: '350 - 450 جرام',
    maxUserWeight: '125 كجم',
    heelHeight: '10 مم ثابت',
    waterproof: 'مقاومة للرطوبة السطحية',
    warranty: 'سنة واحدة',
    material: 'قلب خشب/ألومنيوم + غلاف يوريثان',
    techHighlight: 'Solid Ankle Cushion Heel (SACH)',
    indications: ['المراحل الأولى من التأهيل الحركي', 'كبار السن ذوو الحركة المحدودة داخل المنزل']
  },
  {
    id: 'pro-flex-xc',
    name: 'Pro-Flex XC',
    brand: 'Össur',
    type: 'كربونية ديناميكية (Dynamic Carbon)',
    description: 'قدم كربونية متطورة للغاية من Össur مصممة بنظام 3 شرائح كربونية متداخلة لتوليد انثناء رافع وتحقيق 27% زيادة في مدى حركة الكاحل مقارنة بالأقدام الكربونية التقليدية.',
    features: [
      'تقنية 3-Blade لمقدار استعادة طاقة هائل ودفع إيجابي',
      'زيادة مدى حركة الكاحل بنسبة 27% لتقليل الضغط على السوكيت',
      'غلاف قدم تشريحي ذو نعل مانع للانزلاق',
      'تحكم رائع على المنحدرات والتضاريس الوعرة'
    ],
    limitations: [
      'تكلفة أعلى من الأقدام الميكانيكية التقليدية',
      'تحتاج لأخصائي محترف لاختيار صلابة الشريحة المناسبة للوزن'
    ],
    activityLevel: 'متوسط إلى عالي جداً',
    kLevel: 'K3 - K4',
    price: 'تبدأ من 35,000 ج.م',
    image: 'https://media.ossur.com/ossur-dam/image/upload/f_auto,q_auto,w_800,h_800,c_pad/spim/150_8e64c125-9fa8-4b72-9ea5-f481a57e3f84',
    weight: '670 جرام (شامل الغلاف)',
    maxUserWeight: '166 كجم',
    heelHeight: '10 مم',
    waterproof: 'مقاومة للماء والرطوبة',
    warranty: '3 سنوات',
    material: 'ألياف الكربون 100% (Prepreg Carbon)',
    techHighlight: 'Full Length Dynamic Lever + 3-Blade System',
    indications: ['بتر فوق الركبة وتحت الركبة للمستخدمين النشطين', 'المشي لمسافات طويلة والرياضة']
  },
  {
    id: 'pro-flex-lp-align',
    name: 'Pro-Flex LP Align',
    brand: 'Össur',
    type: 'كربونية ذات كعب قابل للتعديل',
    description: 'تدمج بين الأداء الديناميكي المرتفع لألياف الكربون وميزة تعديل ارتفاع الكعب بضغطة زر واحدة (حتى 5 سم)، ما يتيح ارتداء أحذية مختلفة دون التضحية بمحاذاة المشي.',
    features: [
      'آلية تعديل ارتفاع الكعب بسهولة حتى 50 مم (من الحذاء الرياضي للكعب العالي)',
      'شريحة كربونية ديناميكية لتخزين وإطلاق الطاقة',
      'غلاف قدم مرن يشابه شكل القدم الطبيعية',
      'سهولة الارتداء مع مختلف أنواع الأحذية'
    ],
    limitations: [
      'وزن إضافي بسيط ناتج عن مفصل الكعب',
      'سعر أعلى من الأقدام الكربونية الثابتة'
    ],
    activityLevel: 'متوسط إلى عالي',
    kLevel: 'K2 - K3',
    price: 'تبدأ من 45,000 ج.م',
    image: 'https://media.ossur.com/ossur-dam/image/upload/f_auto,q_auto,w_800,h_800,c_pad/spim/220_d61a2936-bd34-4b53-b09b-a0ebaa24e164',
    weight: '790 جرام',
    maxUserWeight: '116 كجم',
    heelHeight: 'قابل للتعديل حتى 50 مم (5 سم)',
    waterproof: 'مقاومة للماء',
    warranty: '3 سنوات',
    material: 'ألياف كربون عالية المرونة + مفاصل تعديل',
    techHighlight: 'User-Adjustable Heel Height',
    indications: ['الأشخاص الذين يرتدون أحذية متنوعة في اليوم', 'السيدات والشباب الراغبين بتغيير نوع الحذاء بسهولة']
  },
  {
    id: 'triton-carbon',
    name: 'Triton Carbon Foot',
    brand: 'Ottobock',
    type: 'كربونية متعددة المحاور',
    description: 'قدم كربونية ثلاثية الشرائح من Ottobock توفر حركة جانبية مرنة وثباتاً استثنائياً على الأرضيات غير المستوية مع امتصاص دقيق للصدمات.',
    features: [
      'مرونة جانبية ممتازة تتكيف مع الأرض الحصوية والمنحدرات',
      'دفع استثنائي عند مشط القدم في خطوة الخروج',
      'ملائمة للأنشطة الرياضية كالتنس والمشي السريع',
      'غلاف أنيق مع فاصل للأصابع'
    ],
    limitations: [
      'سعر مرتقع',
      'تتطلب اختيار فئة الصلابة الدقيقة حسب الوزن والنشاط'
    ],
    activityLevel: 'عالي',
    kLevel: 'K3 - K4',
    price: 'تبدأ من 40,000 ج.م',
    image: 'https://media.ottobock.com/_next/image?url=https%3A%2F%2Fspa-prod-commerce.cep.ottobock.com%2Focc%2Fv2%2Fcep-medias%2F17568_930Wx930H%2F930Wx930H%2FCEP_MEDIA_CATALOG%2FOnline&w=1600&q=75',
    weight: '640 جرام',
    maxUserWeight: '150 كجم',
    heelHeight: '15 مم',
    waterproof: 'مقاومة للماء العذب والمالح',
    warranty: '3 سنوات',
    material: 'كربون عالي الكثافة + تيتانيوم',
    techHighlight: 'Tri-Blade Multiaxial Motion',
    indications: ['المرضى النشطون والرياضيون', 'المشي على التضاريس غير المستوية']
  },
  {
    id: 'proprio-foot',
    name: 'Proprio Foot (القدم الذكية)',
    brand: 'Össur',
    type: 'محوسبة إلكترونية (Microprocessor Foot)',
    description: 'قدم محوسبة ذكية للغاية مزودة بمحرك إلكتروني ومستشعرات ترفع مشط القدم تلقائياً أثناء التأرجح لمنع التعثر، وتضبط زاوية الكاحل فورياً عند صعود ونزول الدرج والمنحدرات.',
    features: [
      'رفع تلقائي للمشط (Ankle Dorsiflexion) يمنع التعثر بالأرض تماماً',
      'تكيف ذكي تلقائي مع زوايا المنحدرات والسلالم',
      'وضعية استرخاء القدم الذاتية عند الجلوس (Relax Mode)',
      'تطبيق Össur Logic لمتابعة حالة القدم والبطارية عبر البلوتوث'
    ],
    limitations: [
      'تكلفة عالية جداً',
      'تحتاج شحن بطارية كل 2-3 أيام',
      'أثقل من الأقدام الكربونية العادية بسبب المحرك'
    ],
    activityLevel: 'متوسط إلى عالي',
    kLevel: 'K2 - K3',
    price: 'تبدأ من 150,000 ج.م',
    image: 'https://media.ossur.com/ossur-dam/image/upload/f_auto,q_auto,w_800,h_800,c_pad/spim/220_76d338be-3770-4e3f-b8d9-3ec70f4b50c1',
    weight: '1.4 كجم',
    maxUserWeight: '125 كجم',
    heelHeight: 'تعديل آلي حتى 50 مم',
    waterproof: 'مقاومة للرش (IP34)',
    battery: 'بطارية ليثيوم أيون تدوم حتى 3 أيام',
    warranty: '3 سنوات',
    material: 'هيكل محرك إلكتروني + شرائح كربونية',
    techHighlight: 'Motorized Ankle Motion + Bionic Intelligence',
    indications: ['الحاجة لأقصى درجات الأمان ضد السقوط', 'المشي الكثيف على السلالم والمنحدرات']
  }
];

const typeColors: Record<string, { bg: string; text: string; border: string; icon: React.ReactNode }> = {
  'ميكانيكية بسيطة': { bg: 'bg-slate-100', text: 'text-slate-800', border: 'border-slate-200', icon: <Ruler className="w-3.5 h-3.5" /> },
  'كربونية ديناميكية (Dynamic Carbon)': { bg: 'bg-emerald-50', text: 'text-emerald-800', border: 'border-emerald-200', icon: <Zap className="w-3.5 h-3.5" /> },
  'كربونية ذات كعب قابل للتعديل': { bg: 'bg-sky-50', text: 'text-sky-800', border: 'border-sky-200', icon: <Activity className="w-3.5 h-3.5" /> },
  'كربونية متعددة المحاور': { bg: 'bg-blue-50', text: 'text-blue-800', border: 'border-blue-200', icon: <Waves className="w-3.5 h-3.5" /> },
  'محوسبة إلكترونية (Microprocessor Foot)': { bg: 'bg-violet-50', text: 'text-violet-800', border: 'border-violet-200', icon: <Cpu className="w-3.5 h-3.5" /> }
};

const FootTypes: React.FC = () => {
  const [selectedFoot, setSelectedFoot] = useState<FootProduct | null>(null);

  return (
    <section id="foot-types" className="py-20 bg-white">
      <div className="container mx-auto px-4 max-w-7xl">
        {/* Section Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 py-1.5 px-4 bg-medical-50 text-medical-800 rounded-full text-xs font-bold mb-4 border border-medical-100">
            <Ruler className="h-4 w-4 text-medical-600" />
            <span>موسوعة الأقدام الصناعية وتقنيات امتصاص الصدمات</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 font-cairo mb-3">
            أنواع الأقدام الصناعية
          </h2>
          <p className="text-sm sm:text-base text-gray-500 max-w-2xl mx-auto font-medium">
            استكشف أحدث حلول الأقدام الصناعية الميكانيكية والكربونية والمحوسبة مع المواصفات التقنية الدقيقة.
          </p>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">
          {footProducts.map((foot, idx) => {
            const ts = typeColors[foot.type] || typeColors['ميكانيكية بسيطة'];
            return (
              <motion.div
                key={foot.id}
                className="bg-white rounded-3xl overflow-hidden border border-gray-200/80 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between group"
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: idx * 0.08 }}
                viewport={{ once: true }}
              >
                {/* Image Box */}
                <div className="relative h-60 bg-gradient-to-b from-slate-50 to-white flex items-center justify-center p-4 overflow-hidden">
                  <img
                    src={foot.image}
                    alt={foot.name}
                    className="max-h-52 object-contain group-hover:scale-105 transition-transform duration-500"
                    onError={(e) => {
                      e.currentTarget.src = 'https://media.ossur.com/ossur-dam/image/upload/f_auto,q_auto,w_800,h_800,c_pad/spim/150_8e64c125-9fa8-4b72-9ea5-f481a57e3f84';
                    }}
                  />
                  <div className={`absolute top-3 right-3 ${ts.bg} ${ts.text} ${ts.border} border font-bold text-[10px] px-3 py-1 rounded-full flex items-center gap-1`}>
                    {ts.icon}
                    <span>{foot.type}</span>
                  </div>
                  <div className="absolute top-3 left-3 bg-white/90 text-gray-700 font-bold text-[10px] px-3 py-1 rounded-full border border-gray-200 shadow-xs">
                    {foot.brand}
                  </div>
                  <div className="absolute bottom-3 right-3 bg-medical-700 text-white font-bold text-xs px-3 py-1 rounded-full shadow-md">
                    {foot.price}
                  </div>
                </div>

                {/* Content */}
                <div className="p-5 flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="font-extrabold text-lg text-gray-900 mb-1 font-cairo group-hover:text-medical-700 transition-colors">
                      {foot.name}
                    </h3>
                    <p className="text-xs text-gray-600 line-clamp-3 leading-relaxed mb-4 font-medium">
                      {foot.description}
                    </p>

                    {/* Specs Row */}
                    <div className="grid grid-cols-3 gap-2 mb-4">
                      <div className="bg-slate-50 rounded-xl p-2 text-center border border-slate-100">
                        <span className="text-[10px] text-gray-500 block">مستوى النشاط</span>
                        <span className="text-xs font-bold text-gray-800">{foot.kLevel}</span>
                      </div>
                      <div className="bg-slate-50 rounded-xl p-2 text-center border border-slate-100">
                        <span className="text-[10px] text-gray-500 block">الوزن</span>
                        <span className="text-xs font-bold text-gray-800">{foot.weight?.split(' ')[0]}</span>
                      </div>
                      <div className="bg-slate-50 rounded-xl p-2 text-center border border-slate-100">
                        <span className="text-[10px] text-gray-500 block">ارتفاع الكعب</span>
                        <span className="text-xs font-bold text-gray-800">{foot.heelHeight?.split(' ')[0]}</span>
                      </div>
                    </div>

                    <div className="space-y-1.5 pt-2 border-t border-gray-100">
                      {foot.features.slice(0, 3).map((feat, fIdx) => (
                        <div key={fIdx} className="flex items-start gap-1.5 text-xs text-gray-700">
                          <CheckCircle2 className="w-3.5 h-3.5 text-medical-600 flex-shrink-0 mt-0.5" />
                          <span className="line-clamp-1 font-medium">{feat}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="mt-5">
                    <Button
                      onClick={() => setSelectedFoot(foot)}
                      className="w-full bg-medical-50 hover:bg-medical-700 text-medical-700 hover:text-white font-bold rounded-xl text-xs py-2.5 transition-all duration-300 border border-medical-200"
                    >
                      عرض المواصفات والقياسات
                      <ChevronRight className="w-4 h-4 mr-1 rtl:rotate-180" />
                    </Button>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Detail Modal */}
      <AnimatePresence>
        {selectedFoot && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm" onClick={() => setSelectedFoot(null)}>
            <motion.div
              className="bg-white rounded-3xl max-w-3xl w-full max-h-[90vh] overflow-y-auto shadow-2xl p-6 sm:p-8 font-cairo"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-start justify-between mb-4">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <span className="bg-medical-50 text-medical-800 text-[10px] font-bold px-3 py-1 rounded-full border border-medical-100">
                      {selectedFoot.type}
                    </span>
                    <span className="bg-gray-100 text-gray-700 font-bold text-[10px] px-3 py-1 rounded-full border border-gray-200">
                      {selectedFoot.brand}
                    </span>
                  </div>
                  <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900 font-cairo">
                    {selectedFoot.name}
                  </h2>
                </div>
                <button onClick={() => setSelectedFoot(null)} className="p-2 hover:bg-gray-100 rounded-xl transition-colors">
                  <X className="w-5 h-5 text-gray-500" />
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div className="bg-slate-50 rounded-2xl p-4 flex items-center justify-center border border-gray-200 min-h-[260px]">
                  <img src={selectedFoot.image} alt={selectedFoot.name} className="max-h-60 object-contain" />
                </div>
                <div className="space-y-3">
                  <p className="text-xs sm:text-sm text-gray-700 leading-relaxed font-medium">{selectedFoot.description}</p>
                  <div className="bg-medical-50 p-3 rounded-xl border border-medical-100 flex items-center justify-between">
                    <span className="text-xs font-bold text-gray-600">التكلفة التقديرية:</span>
                    <span className="text-sm font-black text-medical-800">{selectedFoot.price}</span>
                  </div>
                  {selectedFoot.techHighlight && (
                    <div className="bg-emerald-50 p-3 rounded-xl border border-emerald-100 flex items-center gap-2">
                      <Zap className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                      <div>
                        <span className="text-[10px] text-emerald-600 block font-bold">التقنية البارزة:</span>
                        <span className="text-xs text-emerald-900 font-bold">{selectedFoot.techHighlight}</span>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Technical Specs */}
              <div className="bg-slate-50 rounded-2xl p-4 sm:p-5 border border-slate-200 mb-6">
                <h4 className="text-sm font-bold text-gray-900 mb-3 font-cairo flex items-center gap-2">
                  <BarChart className="w-4 h-4 text-medical-600" /> المواصفات التقنية
                </h4>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {[
                    { label: 'الوزن', val: selectedFoot.weight },
                    { label: 'أقصى وزن مستخدم', val: selectedFoot.maxUserWeight },
                    { label: 'ارتفاع الكعب', val: selectedFoot.heelHeight },
                    { label: 'مقاومة الماء', val: selectedFoot.waterproof },
                    { label: 'الضمان', val: selectedFoot.warranty },
                    { label: 'الخامة', val: selectedFoot.material }
                  ].filter(s => s.val).map((spec, i) => (
                    <div key={i} className="bg-white rounded-xl p-3 border border-gray-100 shadow-2xs">
                      <div className="text-[10px] text-gray-500 font-bold mb-1">{spec.label}</div>
                      <div className="text-xs font-bold text-gray-900">{spec.val}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Features & Limitations */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <div>
                  <h4 className="text-sm font-bold text-gray-900 mb-2 flex items-center gap-1.5 font-cairo">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" /> المميزات
                  </h4>
                  <div className="space-y-1.5">
                    {selectedFoot.features.map((f, i) => (
                      <div key={i} className="flex items-start gap-2 bg-emerald-50 p-2 rounded-lg border border-emerald-100 text-xs text-gray-800 font-medium">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0 mt-0.5" />
                        <span>{f}</span>
                      </div>
                    ))}
                  </div>
                </div>
                <div>
                  <h4 className="text-sm font-bold text-gray-900 mb-2 flex items-center gap-1.5 font-cairo">
                    <AlertTriangle className="w-4 h-4 text-amber-500" /> القيود والتحديات
                  </h4>
                  <div className="space-y-1.5">
                    {selectedFoot.limitations.map((l, i) => (
                      <div key={i} className="flex items-start gap-2 bg-amber-50 p-2 rounded-lg border border-amber-100 text-xs text-gray-800 font-medium">
                        <AlertTriangle className="w-3.5 h-3.5 text-amber-500 flex-shrink-0 mt-0.5" />
                        <span>{l}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Action */}
              <div className="pt-4 border-t border-gray-200 flex flex-col sm:flex-row gap-3 justify-end">
                <Button variant="outline" onClick={() => setSelectedFoot(null)} className="rounded-xl font-bold text-xs">
                  إغلاق
                </Button>
                <Link to="/booking" onClick={() => setSelectedFoot(null)}>
                  <Button className="w-full sm:w-auto bg-medical-700 hover:bg-medical-800 text-white font-bold rounded-xl text-xs px-6 py-2.5">
                    حجز موعد قياس وتفصيل
                    <Calendar className="mr-2 h-4 w-4" />
                  </Button>
                </Link>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default FootTypes;
