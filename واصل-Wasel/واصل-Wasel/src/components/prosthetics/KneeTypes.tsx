
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Activity, ChevronDown, ChevronUp, Zap, CircleDollarSign, Gauge } from 'lucide-react';

// أنواع الركب الصناعية
const kneeTypes = [
  {
    id: 'single-axis',
    name: 'الركبة أحادية المحور',
    englishName: 'Single-Axis Knee',
    description: 'تصميم بسيط يسمح بحركة الثني والمد حول محور واحد فقط، مثل المفصل المفصلي البسيط.',
    features: [
      'تصميم بسيط ومتين',
      'سهولة الصيانة وانخفاض التكلفة',
      'مناسبة للمستخدمين ذوي المستوى النشاط المنخفض',
      'وزن خفيف نسبياً'
    ],
    limitations: [
      'عدم الاستقرار على الأسطح غير المستوية',
      'لا تتكيف مع تغير سرعة المشي',
      'تتطلب جهداً أكبر للتحكم بها',
      'خطر التعثر عند وضع الوزن على الركبة بشكل خاطئ'
    ],
    activityLevel: 'منخفض إلى متوسط (K1-K2)',
    price: 'تبدأ من 8,000 ج.م',
    image: 'https://4.imimg.com/data4/PJ/HE/MY-23855591/single-axis-knee-1000x1000.jpg',
    tier: 'basic',
    tierColor: 'from-slate-400 to-slate-600',
    tierBg: 'bg-slate-50'
  },
  {
    id: 'polycentric',
    name: 'الركبة متعددة المحاور',
    englishName: 'Polycentric Knee',
    description: 'تستخدم نظام رابط متعدد المحاور (4-6 محاور) لتحسين الاستقرار والتحكم.',
    features: [
      'استقرار أفضل عند وضع الوزن على الطرف',
      'خفض ارتفاع الركبة أثناء الجلوس والمشي',
      'تناسب حالات البتر القصير للفخذ',
      'تقليل خطر التعثر والسقوط'
    ],
    limitations: [
      'أثقل وزناً من الركبة أحادية المحور',
      'تصميم أكثر تعقيداً يتطلب صيانة دورية',
      'قد لا تكون مناسبة للأنشطة عالية التأثير',
      'حجم أكبر مقارنة بالأنواع الأخرى'
    ],
    activityLevel: 'متوسط (K2-K3)',
    price: 'تبدأ من 15,000 ج.م',
    image: 'https://e-lifebracing.com/files/product/300.jpg',
    tier: 'standard',
    tierColor: 'from-blue-400 to-blue-600',
    tierBg: 'bg-blue-50'
  },
  {
    id: 'pneumatic',
    name: 'الركبة الهوائية',
    englishName: 'Pneumatic Knee',
    description: 'تستخدم نظاماً هوائياً للتحكم في حركة الركبة، مما يسمح بحركة سلسة وأكثر طبيعية.',
    features: [
      'تحكم أفضل في سرعة المشي',
      'حركة أكثر سلاسة وطبيعية',
      'مقاومة قابلة للتعديل حسب احتياجات المستخدم',
      'أداء جيد للمشي بسرعات مختلفة'
    ],
    limitations: [
      'تتطلب صيانة دورية للنظام الهوائي',
      'قد تتأثر بالتغيرات في درجات الحرارة والارتفاع',
      'أثقل وزناً من الركبة الميكانيكية البسيطة',
      'تكلفة أعلى'
    ],
    activityLevel: 'متوسط إلى عالٍ (K3)',
    price: 'تبدأ من 25,000 ج.م',
    image: 'https://i.pinimg.com/736x/87/7a/c0/877ac0421b73f936a3faa624cd0acb49.jpg',
    tier: 'advanced',
    tierColor: 'from-purple-400 to-purple-600',
    tierBg: 'bg-purple-50'
  },
  {
    id: 'hydraulic',
    name: 'الركبة الهيدروليكية',
    englishName: 'Hydraulic Knee',
    description: 'تستخدم سوائل هيدروليكية للتحكم في المقاومة أثناء الحركة، مما يوفر تحكماً دقيقاً.',
    features: [
      'تحكم دقيق في حركة المشي بسرعات مختلفة',
      'تكيف تلقائي مع إيقاع المشي',
      'استجابة أفضل على الأسطح المنحدرة',
      'استقرار وأمان أكبر أثناء المشي'
    ],
    limitations: [
      'وزن أثقل من الأنظمة الميكانيكية والهوائية',
      'تكلفة أعلى وصيانة دورية مطلوبة',
      'قد تتسرب السوائل الهيدروليكية في بعض الحالات',
      'قد تتأثر بالتغيرات الشديدة في درجات الحرارة'
    ],
    activityLevel: 'متوسط إلى عالٍ (K3-K4)',
    price: 'تبدأ من 40,000 ج.م',
    image: 'https://bldtecomukprod.dfs.core.windows.net/media/wrpnj2zs/kx07-patient-walking.jpg?width=430&height=364&mode=max',
    tier: 'premium',
    tierColor: 'from-amber-400 to-amber-600',
    tierBg: 'bg-amber-50'
  },
  {
    id: 'microprocessor',
    name: 'الركبة المحوسبة',
    englishName: 'Microprocessor Knee',
    description: 'مزودة بمعالجات دقيقة ومستشعرات تستشعر وتتكيف مع سرعة المشي والتضاريس المختلفة.',
    features: [
      'تكيف ذكي مع مختلف أنماط المشي والتضاريس',
      'استقرار متفوق على الأسطح غير المستوية',
      'تقليل خطر السقوط بشكل كبير',
      'أنماط مشي متعددة (درج، منحدرات، عكس المشي)',
      'وضعيات مخصصة للأنشطة المختلفة'
    ],
    limitations: [
      'تكلفة عالية جداً',
      'تحتاج لشحن البطارية بشكل دوري',
      'وزن أثقل من بعض الأنواع الأخرى',
      'حساسة للماء والغبار',
      'تتطلب صيانة دورية متخصصة'
    ],
    activityLevel: 'عالٍ جداً (K3-K4)',
    price: 'تبدأ من 140,000 ج.م',
    image: 'https://bldtecomukprod.dfs.core.windows.net/media/vmgp1qgh/orion3-with-wheelbarrow.png?width=693&height=634&mode=max',
    tier: 'elite',
    tierColor: 'from-emerald-400 to-emerald-600',
    tierBg: 'bg-emerald-50'
  }
];

const tierLabels: Record<string, string> = {
  basic: 'أساسي',
  standard: 'قياسي',
  advanced: 'متقدم',
  premium: 'متميز',
  elite: 'النخبة'
};

const KneeTypes: React.FC = () => {
  const [expandedKnee, setExpandedKnee] = useState<string | null>(null);

  return (
    <section id="knee-types" className="py-20 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-white via-gray-50/80 to-white" />
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-l from-medical-500 via-purple-500 to-blue-500" />

      <div className="relative container mx-auto px-4">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center mb-14"
        >
          <div className="inline-flex items-center gap-2 bg-purple-100 text-purple-700 px-4 py-2 rounded-full text-sm font-bold mb-4">
            <Activity className="w-4 h-4" />
            من الميكانيكي إلى المحوسب
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="bg-gradient-to-l from-purple-600 to-blue-600 bg-clip-text text-transparent">
              أنواع الركب الصناعية
            </span>
          </h2>
          <p className="text-gray-500 text-lg max-w-2xl mx-auto">
            اختر الركبة الصناعية المناسبة لمستوى نشاطك وأهدافك الوظيفية
          </p>
        </motion.div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {kneeTypes.map((knee, index) => (
            <motion.div
              key={knee.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <motion.div
                whileHover={{ y: -6 }}
                transition={{ duration: 0.3 }}
                className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-100 hover:shadow-2xl transition-all duration-500 h-full flex flex-col"
              >
                {/* Image */}
                <div className="h-52 overflow-hidden relative group">
                  <img
                    src={knee.image}
                    alt={knee.name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className={`absolute inset-0 bg-gradient-to-t ${knee.tierColor} opacity-40 group-hover:opacity-50 transition-opacity`} />
                  
                  {/* Tier Badge */}
                  <div className="absolute top-4 right-4">
                    <span className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-black bg-white/95 backdrop-blur-sm shadow-lg`}>
                      <Zap className="w-3.5 h-3.5 text-amber-500" />
                      {tierLabels[knee.tier]}
                    </span>
                  </div>

                  {/* Price */}
                  <div className="absolute bottom-4 left-4">
                    <span className="inline-flex items-center gap-1 px-3 py-1.5 rounded-xl text-xs font-bold bg-white/95 backdrop-blur-sm shadow-lg text-gray-800">
                      <CircleDollarSign className="w-3.5 h-3.5 text-green-500" />
                      {knee.price}
                    </span>
                  </div>

                  {/* Name Overlay */}
                  <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/70 to-transparent p-4 pt-12">
                    <h3 className="text-white font-bold text-lg">{knee.name}</h3>
                    <p className="text-white/70 text-sm">{knee.englishName}</p>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6 flex-1 flex flex-col">
                  <p className="text-gray-600 mb-4 leading-relaxed text-sm">{knee.description}</p>

                  {/* Activity Level */}
                  <div className={`${knee.tierBg} rounded-xl p-3 mb-4 flex items-center gap-2`}>
                    <Gauge className="w-4 h-4 text-gray-600" />
                    <div>
                      <span className="text-xs text-gray-500 font-medium">مستوى النشاط:</span>
                      <span className="text-sm font-bold text-gray-800 mr-2">{knee.activityLevel}</span>
                    </div>
                  </div>

                  {/* Features (Always visible) */}
                  <div className="mb-3">
                    <h4 className="font-bold text-gray-800 text-sm mb-2 flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-green-500" />
                      المميزات
                    </h4>
                    <ul className="space-y-1.5 mr-3">
                      {knee.features.slice(0, 2).map((feature, idx) => (
                        <li key={idx} className="text-gray-600 text-sm flex items-start gap-2">
                          <span className="w-1.5 h-1.5 rounded-full bg-green-400 mt-1.5 flex-shrink-0" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Expandable */}
                  <AnimatePresence>
                    {expandedKnee === knee.id && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="overflow-hidden"
                      >
                        <ul className="space-y-1.5 mr-3 mb-4">
                          {knee.features.slice(2).map((feature, idx) => (
                            <li key={idx} className="text-gray-600 text-sm flex items-start gap-2">
                              <span className="w-1.5 h-1.5 rounded-full bg-green-400 mt-1.5 flex-shrink-0" />
                              {feature}
                            </li>
                          ))}
                        </ul>

                        <div className="pt-3 border-t border-gray-100">
                          <h4 className="font-bold text-gray-800 text-sm mb-2 flex items-center gap-1.5">
                            <span className="w-2 h-2 rounded-full bg-red-400" />
                            التحديات والقيود
                          </h4>
                          <ul className="space-y-1.5 mr-3">
                            {knee.limitations.map((limitation, idx) => (
                              <li key={idx} className="text-gray-600 text-sm flex items-start gap-2">
                                <span className="w-1.5 h-1.5 rounded-full bg-red-300 mt-1.5 flex-shrink-0" />
                                {limitation}
                              </li>
                            ))}
                          </ul>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {/* Toggle */}
                  <button
                    onClick={() => setExpandedKnee(expandedKnee === knee.id ? null : knee.id)}
                    className="w-full mt-auto pt-4 flex items-center justify-center gap-1.5 text-medical-600 text-sm font-semibold hover:text-medical-800 transition-colors"
                  >
                    {expandedKnee === knee.id ? (
                      <>عرض أقل <ChevronUp className="w-4 h-4" /></>
                    ) : (
                      <>عرض المزيد <ChevronDown className="w-4 h-4" /></>
                    )}
                  </button>
                </div>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default KneeTypes;
