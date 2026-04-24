
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Ruler, ChevronDown, ChevronUp, CircleDollarSign, Gauge, Star, TrendingUp } from 'lucide-react';

// أنواع الأقدام الصناعية
const footTypes = [
  {
    id: 'sach',
    name: 'قدم SACH',
    englishName: 'Solid Ankle Cushion Heel',
    description: 'تصميم بسيط بدون مفاصل متحركة، يوفر استقراراً جيداً مع وسادة في الكعب لامتصاص الصدمات.',
    features: [
      'تصميم بسيط ومتين',
      'خفيفة الوزن وقليلة الصيانة',
      'كعب مرن يمتص الصدمات عند ملامسة الأرض',
      'تكلفة معقولة ومناسبة للاستخدام اليومي البسيط'
    ],
    limitations: [
      'حركة محدودة وأقل مرونة',
      'أداء ضعيف على الأسطح غير المستوية',
      'غير مناسبة للأنشطة عالية التأثير',
      'لا تسمح بحركة الكاحل'
    ],
    activityLevel: 'منخفض (K1-K2)',
    price: 'تبدأ من 5,000 ج.م',
    image: 'https://www.limbs4life.org.au/uploads/prosthetics-directory/_a_prosListingImage/OPC-Seattle-Natural-SACH-K1.jpeg',
    rating: 2,
    color: 'from-gray-400 to-gray-600',
    accentColor: '#6b7280'
  },
  {
    id: 'elastic-keel',
    name: 'القدم المرنة',
    englishName: 'Elastic Keel',
    description: 'توفر مرونة أكبر من قدم SACH، مع تصميم يسمح بالانثناء الخفيف أثناء المشي.',
    features: [
      'مرونة أفضل أثناء دورة المشي',
      'تحمل الوزن بشكل أكثر تدريجياً',
      'متانة جيدة مع صيانة قليلة',
      'مناسبة للمشي اليومي على أسطح مختلفة'
    ],
    limitations: [
      'لا تزال محدودة في التكيف مع التضاريس الوعرة',
      'أقل فعالية للأنشطة عالية التأثير',
      'مدى حركة محدود مقارنة بالأقدام المتطورة'
    ],
    activityLevel: 'منخفض إلى متوسط (K2)',
    price: 'تبدأ من 8,000 ج.م',
    image: 'https://www.researchgate.net/profile/T-M-Balaramakrishnan/publication/351123700/figure/fig2/AS:11431281102383771@1669450405285/Representation-of-a-passive-prosthetic-foot-with-an-elastic-keel-and-a-cosmetic-foam.jpg',
    rating: 3,
    color: 'from-blue-400 to-blue-600',
    accentColor: '#3b82f6'
  },
  {
    id: 'multi-axial',
    name: 'القدم متعددة المحاور',
    englishName: 'Multi-axial Foot',
    description: 'تسمح بالحركة في عدة اتجاهات (تدوير، انثناء جانبي)، مما يساعد على التكيف مع الأسطح غير المستوية.',
    features: [
      'تكيف ممتاز مع الأسطح غير المستوية',
      'تقليل الإجهاد على السوكيت والمفاصل',
      'حركة جانبية تحاكي القدم الطبيعية',
      'مناسبة للمشي والوقوف لفترات طويلة'
    ],
    limitations: [
      'أثقل وزناً من الأنواع البسيطة',
      'تصميم أكثر تعقيداً يتطلب صيانة أكثر',
      'قد لا توفر نفس مستوى استعادة الطاقة كالأقدام الديناميكية'
    ],
    activityLevel: 'متوسط (K2-K3)',
    price: 'تبدأ من 15,000 ج.م',
    image: 'https://static.wixstatic.com/media/64980d_16d0fa3f4a4140f0a262b8c7e476ed89~mv2.png/v1/fill/w_560,h_318,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/F90%202022.png',
    rating: 3.5,
    color: 'from-teal-400 to-teal-600',
    accentColor: '#14b8a6'
  },
  {
    id: 'dynamic-response',
    name: 'القدم الديناميكية',
    englishName: 'Dynamic-Response Feet',
    description: 'مصممة لتخزين الطاقة وإعادتها أثناء المشي، تصنع عادة من الألياف الكربونية.',
    features: [
      'تخزين وإطلاق الطاقة أثناء دورة المشي',
      'خفيفة الوزن وعالية المتانة',
      'دفع إيجابي يساعد في المشي والجري',
      'مناسبة للأنشطة الرياضية والنشطة'
    ],
    limitations: [
      'تكلفة أعلى من الأنواع الأساسية',
      'قد تكون أقل استقراراً للمستخدمين الأقل نشاطاً',
      'قد تتطلب تقنية مشي محددة للاستفادة القصوى منها'
    ],
    activityLevel: 'عالٍ (K3-K4)',
    price: 'تبدأ من 30,000 ج.م',
    image: 'https://media.easyliner.eu/easyliner/uploads/2022/09/BioStep_EVO_left-1024x683.png',
    rating: 4,
    color: 'from-purple-400 to-purple-600',
    accentColor: '#a855f7'
  },
  {
    id: 'microprocessor',
    name: 'القدم المحوسبة',
    englishName: 'Microprocessor Feet',
    description: 'أحدث تقنية في الأقدام الصناعية، تستخدم معالجات دقيقة ومستشعرات لتعديل استجابة القدم.',
    features: [
      'تكيف ذكي مع مختلف التضاريس والأنشطة',
      'تعديل ديناميكي للصلابة والمقاومة',
      'استقرار متفوق على المنحدرات والدرج',
      'حركة طبيعية جداً تقلل الإجهاد على باقي الجسم',
      'دعم متقدم للأنشطة المتنوعة'
    ],
    limitations: [
      'تكلفة عالية جداً',
      'تحتاج لشحن دوري للبطارية',
      'وزن أثقل من بعض الأنواع الأخرى',
      'حساسة للماء والغبار في بعض الموديلات',
      'تتطلب صيانة متخصصة'
    ],
    activityLevel: 'عالٍ جداً (K3-K4)',
    price: 'تبدأ من 75,000 ج.م',
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTci-aDC19Gj4pLxplyNTBXpq9XWbEoyBfTnJCBoNFOD8bbJqKH4eq1M8tSSUrqFpVRy9w&usqp=CAU',
    rating: 5,
    color: 'from-emerald-400 to-emerald-600',
    accentColor: '#10b981'
  }
];

const FootTypes: React.FC = () => {
  const [expandedFoot, setExpandedFoot] = useState<string | null>(null);

  return (
    <section id="foot-types" className="py-20 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-slate-50 via-white to-slate-50" />
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-l from-teal-500 via-emerald-500 to-green-500" />

      <div className="relative container mx-auto px-4">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center mb-14"
        >
          <div className="inline-flex items-center gap-2 bg-teal-100 text-teal-700 px-4 py-2 rounded-full text-sm font-bold mb-4">
            <Ruler className="w-4 h-4" />
            تقنيات متقدمة
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="bg-gradient-to-l from-teal-600 to-emerald-600 bg-clip-text text-transparent">
              أنواع الأقدام الصناعية
            </span>
          </h2>
          <p className="text-gray-500 text-lg max-w-2xl mx-auto">
            من الأقدام البسيطة إلى المحوسبة – اختر ما يناسب نمط حياتك ومستوى نشاطك
          </p>
        </motion.div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {footTypes.map((foot, index) => (
            <motion.div
              key={foot.id}
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
                    src={foot.image}
                    alt={foot.name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className={`absolute inset-0 bg-gradient-to-t ${foot.color} opacity-30 group-hover:opacity-40 transition-opacity`} />

                  {/* Rating Stars */}
                  <div className="absolute top-4 right-4 flex items-center gap-1 bg-white/95 backdrop-blur-sm px-3 py-1.5 rounded-xl shadow-lg">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star
                        key={i}
                        className={`w-3.5 h-3.5 ${i < Math.floor(foot.rating) ? 'text-amber-400 fill-amber-400' : 'text-gray-300'}`}
                      />
                    ))}
                  </div>

                  {/* Price Badge */}
                  <div className="absolute bottom-4 left-4">
                    <span className="inline-flex items-center gap-1 px-3 py-1.5 rounded-xl text-xs font-bold bg-white/95 backdrop-blur-sm shadow-lg text-gray-800">
                      <CircleDollarSign className="w-3.5 h-3.5 text-green-500" />
                      {foot.price}
                    </span>
                  </div>

                  {/* Name on Image */}
                  <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/70 to-transparent p-4 pt-12">
                    <h3 className="text-white font-bold text-lg">{foot.name}</h3>
                    <p className="text-white/70 text-sm">{foot.englishName}</p>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6 flex-1 flex flex-col">
                  <p className="text-gray-600 mb-4 text-sm leading-relaxed">{foot.description}</p>

                  {/* Activity Level Bar */}
                  <div className="bg-gray-50 rounded-xl p-3 mb-4">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-1.5">
                        <Gauge className="w-4 h-4 text-gray-500" />
                        <span className="text-xs text-gray-500 font-medium">مستوى النشاط</span>
                      </div>
                      <span className="text-sm font-bold" style={{ color: foot.accentColor }}>{foot.activityLevel}</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: `${(foot.rating / 5) * 100}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 1, delay: 0.3 }}
                        className="h-2 rounded-full"
                        style={{ backgroundColor: foot.accentColor }}
                      />
                    </div>
                  </div>

                  {/* Features */}
                  <div className="mb-3">
                    <h4 className="font-bold text-gray-800 text-sm mb-2 flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-green-500" />
                      المميزات
                    </h4>
                    <ul className="space-y-1.5 mr-3">
                      {foot.features.slice(0, 2).map((feature, idx) => (
                        <li key={idx} className="text-gray-600 text-sm flex items-start gap-2">
                          <span className="w-1.5 h-1.5 rounded-full bg-green-400 mt-1.5 flex-shrink-0" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Expandable */}
                  <AnimatePresence>
                    {expandedFoot === foot.id && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="overflow-hidden"
                      >
                        <ul className="space-y-1.5 mr-3 mb-4">
                          {foot.features.slice(2).map((feature, idx) => (
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
                            {foot.limitations.map((limitation, idx) => (
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
                    onClick={() => setExpandedFoot(expandedFoot === foot.id ? null : foot.id)}
                    className="w-full mt-auto pt-4 flex items-center justify-center gap-1.5 text-sm font-semibold transition-colors hover:opacity-80"
                    style={{ color: foot.accentColor }}
                  >
                    {expandedFoot === foot.id ? (
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

        {/* Comparison Tip */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-12 text-center"
        >
          <div className="inline-flex items-center gap-2 bg-emerald-50 text-emerald-700 px-6 py-3 rounded-2xl border border-emerald-200 shadow-sm">
            <TrendingUp className="w-5 h-5" />
            <p className="font-medium text-sm">
              كلما زاد مستوى النشاط المطلوب، احتجت لقدم صناعية أكثر تطوراً
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default FootTypes;
