
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Footprints, ChevronDown, ChevronUp, Info, Scissors, Target, Activity } from 'lucide-react';
import { useTranslation } from 'react-i18next';

const footAmputationTypes = [
  {
    id: 'toe',
    name: 'بتر إصبع أو أكثر (Toe Amputation)',
    englishName: 'Toe Amputation',
    description: 'إزالة إصبع واحد أو أكثر من أصابع القدم مع الحفاظ على البنية الأساسية للقدم.',
    anatomy: [
      'إزالة إصبع أو عدة أصابع من القدم',
      'الحفاظ على رؤوس عظام المشط (Metatarsal Heads)',
      'الحفاظ على القوس الطولي والعرضي للقدم'
    ],
    prostheticOptions: [
      'حشوة سيليكون تجميلية',
      'حشوة داخلية للحذاء',
      'قد لا يحتاج طرف صناعي في بعض الحالات'
    ],
    functionalOutcomes: [
      'مشي طبيعي تقريبًا',
      'تأثير بسيط على التوازن',
      'عودة سريعة جدًا للحياة الطبيعية'
    ],
    level: 1,
    color: '#10b981',
    bgGradient: 'from-emerald-400 to-emerald-600'
  },
  {
    id: 'transmetatarsal',
    name: 'بتر عبر المشط (Transmetatarsal)',
    englishName: 'Transmetatarsal Amputation',
    description: 'قطع القدم عبر عظام المشط، مع الحفاظ على الكعب ومنتصف القدم.',
    anatomy: [
      'قطع عبر عظام المشط الخمسة',
      'الحفاظ على الكعب ومنتصف القدم',
      'فقدان دفع مقدمة القدم عند المشي'
    ],
    prostheticOptions: [
      'حذاء طبي معدل مع حشوة أمامية',
      'دعامة كربونية لتعويض الدفع',
      'نعل داخلي صلب مع لسان ممتد'
    ],
    functionalOutcomes: [
      'مشي جيد مع تعديل بسيط في الحذاء',
      'الحفاظ على طول الساق',
      'استهلاك طاقة منخفض نسبيًا'
    ],
    level: 2,
    color: '#06b6d4',
    bgGradient: 'from-cyan-400 to-cyan-600'
  },
  {
    id: 'lisfranc',
    name: 'بتر لسفرانك (Lisfranc)',
    englishName: 'Lisfranc Amputation',
    description: 'فصل القدم عند مفصل لسفرانك (بين عظام المشط وعظام الرسغ الأوسط).',
    anatomy: [
      'الفصل عند المفصل بين المشط والرسغ الأوسط',
      'الحفاظ على عظام الكعب والرسغ',
      'فقدان مساحة أكبر من مقدمة القدم'
    ],
    prostheticOptions: [
      'قدم صناعية جزئية سيليكون',
      'حذاء طبي مخصص',
      'دعامة AFO قصيرة مع حشوة أمامية'
    ],
    functionalOutcomes: [
      'مشي مستقر مع دعامة',
      'قد يحدث تقوس في القدم (Equinus)',
      'يحتاج متابعة لتجنب نقاط الضغط'
    ],
    level: 3,
    color: '#8b5cf6',
    bgGradient: 'from-violet-400 to-violet-600'
  },
  {
    id: 'chopart',
    name: 'بتر شوبار (Chopart)',
    englishName: 'Chopart Amputation',
    description: 'فصل القدم عند مفصل شوبار، مع الاحتفاظ بالكعب فقط (عظم القعب والعقب).',
    anatomy: [
      'الفصل عند المفصل بين عظام الرسغ',
      'الاحتفاظ بعظم العقب (Calcaneus) والقعب (Talus)',
      'فقدان معظم القدم مع بقاء الكعب'
    ],
    prostheticOptions: [
      'قدم صناعية مع سوكيت خاص',
      'دعامة AFO مع حشوة',
      'حذاء طبي مخصص عميق'
    ],
    functionalOutcomes: [
      'مشي ممكن مع دعامة مناسبة',
      'خطر ميل القدم للأسفل (Equinus)',
      'يحتاج تثبيت وتر العرقوب في بعض الحالات'
    ],
    level: 4,
    color: '#f59e0b',
    bgGradient: 'from-amber-400 to-amber-600'
  },
  {
    id: 'symes',
    name: 'بتر سايم (Syme\'s)',
    englishName: 'Syme\'s Amputation',
    description: 'فصل القدم بالكامل عند مفصل الكاحل مع الاحتفاظ بوسادة الكعب لتحمل الوزن.',
    anatomy: [
      'إزالة القدم بالكامل عند مفصل الكاحل',
      'الاحتفاظ بوسادة الكعب الدهنية',
      'نهاية قوية قادرة على تحمل الوزن'
    ],
    prostheticOptions: [
      'طرف صناعي بتصميم خاص (Syme\'s Prosthesis)',
      'سوكيت على شكل نافذة جانبية',
      'قدم صناعية منخفضة المستوى'
    ],
    functionalOutcomes: [
      'يمكن الوقوف والمشي قصير بدون طرف',
      'مشي مستقر مع الطرف الصناعي',
      'استهلاك طاقة منخفض مقارنة ببتر تحت الركبة'
    ],
    level: 5,
    color: '#ef4444',
    bgGradient: 'from-red-400 to-red-600'
  }
];

const FootAmputationTypes: React.FC = () => {
  const { t } = useTranslation();
  const [activeType, setActiveType] = useState<string | null>(null);
  const [hoveredLevel, setHoveredLevel] = useState<number | null>(null);

  const amputationData = t('prosthetics.foot_amputation_types.data', { returnObjects: true }) as Record<string, any>;
  
  const typesWithData = footAmputationTypes.map(type => ({
    ...type,
    ...(amputationData[type.id] || {})
  }));

  return (
    <section id="foot-amputation-types" className="py-20 overflow-hidden">
      {/* Background */}
      <div className="relative">
        <div className="absolute inset-0 bg-gradient-to-b from-white via-slate-50 to-white" />

        <div className="relative container mx-auto px-4">
          {/* Section Header */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="text-center mb-16"
          >
            <div className="inline-flex items-center gap-2 bg-amber-100 text-amber-700 px-4 py-2 rounded-full text-sm font-bold mb-4">
              <Scissors className="w-4 h-4" />
              {t('prosthetics.foot_amputation_types.badge')}
            </div>
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              <span className="bg-gradient-to-l from-amber-600 via-orange-600 to-red-600 bg-clip-text text-transparent">
                {t('prosthetics.foot_amputation_types.title')}
              </span>
            </h2>
            <p className="text-gray-500 text-lg max-w-2xl mx-auto leading-relaxed">
              {t('prosthetics.foot_amputation_types.desc')}
            </p>
          </motion.div>

          {/* Main Image Banner */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="relative rounded-3xl overflow-hidden mb-16 shadow-lg group"
          >
            <img
              src="https://www.karepoindia.com/blog/wp-content/uploads/2025/08/chopart-foot-amputation-scaled.webp"
              alt="أنواع بتر القدم - Chopart Foot Amputation"
              className="w-full h-[350px] md:h-[450px] object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
            <div className="absolute bottom-0 inset-x-0 p-8 md:p-12">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4, duration: 0.6 }}
              >
                <h3 className="text-white text-3xl md:text-4xl font-bold mb-3">{t('prosthetics.foot_amputation_types.banner_title')}</h3>
                <p className="text-white/80 text-lg max-w-xl">
                  {t('prosthetics.foot_amputation_types.banner_desc')}
                </p>
                <div className="flex flex-wrap gap-3 mt-4">
                  {typesWithData.map((type) => (
                    <span
                      key={type.id}
                      className="px-3 py-1 rounded-full text-sm font-medium bg-white/20 text-white backdrop-blur-sm border border-white/20 hover:bg-white/30 transition-all cursor-pointer"
                      onClick={() => setActiveType(activeType === type.id ? null : type.id)}
                    >
                      {type.englishName}
                    </span>
                  ))}
                </div>
              </motion.div>
            </div>
          </motion.div>

          {/* Visual Level Indicator (Horizontal) */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="hidden md:flex items-center justify-center gap-0 mb-14"
          >
            {typesWithData.map((type, index) => (
              <React.Fragment key={type.id}>
                <motion.button
                  whileHover={{ scale: 1.15, y: -5 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setActiveType(activeType === type.id ? null : type.id)}
                  onMouseEnter={() => setHoveredLevel(index)}
                  onMouseLeave={() => setHoveredLevel(null)}
                  className={`
                    relative w-16 h-16 rounded-2xl flex items-center justify-center text-lg font-bold
                    transition-all duration-300 shadow-lg cursor-pointer
                    ${activeType === type.id
                      ? `bg-gradient-to-br ${type.bgGradient} text-white shadow-xl scale-110`
                      : 'bg-white text-gray-700 border-2 border-gray-200 hover:border-gray-300'
                    }
                  `}
                >
                  {type.level}
                  <AnimatePresence>
                    {hoveredLevel === index && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        className="absolute -bottom-12 whitespace-nowrap bg-gray-900 text-white text-xs px-3 py-1.5 rounded-lg shadow-lg z-10"
                      >
                        {type.englishName}
                        <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-gray-900 rotate-45" />
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.button>
                {index < typesWithData.length - 1 && (
                  <div className="w-12 h-1 bg-gradient-to-l from-gray-300 to-gray-200 rounded-full mx-1" />
                )}
              </React.Fragment>
            ))}
          </motion.div>

          {/* Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {typesWithData.map((type, index) => (
              <motion.div
                key={type.id}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <motion.div
                  whileHover={{ y: -8 }}
                  transition={{ duration: 0.3 }}
                  className={`
                    bg-white rounded-2xl shadow-lg overflow-hidden border-2 transition-all duration-300 cursor-pointer
                    ${activeType === type.id
                      ? 'border-opacity-100 shadow-2xl ring-4 ring-opacity-20'
                      : 'border-transparent hover:shadow-xl'
                    }
                  `}
                  style={{
                    borderColor: activeType === type.id ? type.color : 'transparent',
                    ...(activeType === type.id ? { '--tw-ring-color': type.color + '33' } as any : {})
                  }}
                  onClick={() => setActiveType(activeType === type.id ? null : type.id)}
                >
                  {/* Card Header with Gradient */}
                  <div className={`relative bg-gradient-to-br ${type.bgGradient} p-6 text-white`}>
                    {/* Level Badge */}
                    <div className="absolute top-4 left-4 w-10 h-10 rounded-xl bg-white/20 backdrop-blur-sm flex items-center justify-center">
                      <span className="text-lg font-black">{type.level}</span>
                    </div>
                    <div className="pr-2">
                      <p className="text-white/70 text-sm font-medium mb-1">{type.englishName}</p>
                      <h3 className="text-xl font-bold leading-tight">{type.name}</h3>
                    </div>
                  </div>

                  {/* Card Body */}
                  <div className="p-6">
                    <p className="text-gray-600 leading-relaxed mb-5">{type.description}</p>

                    {/* Anatomy Points */}
                    <div className="mb-4">
                      <div className="flex items-center gap-2 mb-3">
                        <div className="w-6 h-6 rounded-lg flex items-center justify-center" style={{ backgroundColor: type.color + '20' }}>
                          <Target className="w-3.5 h-3.5" style={{ color: type.color }} />
                        </div>
                        <h4 className="font-bold text-gray-800 text-sm">{t('prosthetics.foot_amputation_types.anatomy')}</h4>
                      </div>
                      <ul className="space-y-2 mr-2 ml-2">
                        {type.anatomy?.map((point: string, idx: number) => (
                          <li key={idx} className="flex items-start gap-2 text-sm text-gray-600">
                            <span className="w-1.5 h-1.5 rounded-full mt-2 flex-shrink-0" style={{ backgroundColor: type.color }} />
                            {point}
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Expandable Content */}
                    <AnimatePresence>
                      {activeType === type.id && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.3 }}
                          className="overflow-hidden"
                        >
                          {/* Prosthetic Options */}
                          <div className="mb-4 pt-4 border-t border-gray-100">
                            <div className="flex items-center gap-2 mb-3">
                              <div className="w-6 h-6 rounded-lg bg-blue-50 flex items-center justify-center">
                                <Footprints className="w-3.5 h-3.5 text-blue-500" />
                              </div>
                              <h4 className="font-bold text-gray-800 text-sm">{t('prosthetics.foot_amputation_types.options')}</h4>
                            </div>
                            <ul className="space-y-2 mr-2 ml-2">
                              {type.prostheticOptions?.map((option: string, idx: number) => (
                                <li key={idx} className="flex items-start gap-2 text-sm text-gray-600">
                                  <span className="w-1.5 h-1.5 rounded-full bg-blue-400 mt-2 flex-shrink-0" />
                                  {option}
                                </li>
                              ))}
                            </ul>
                          </div>

                          {/* Functional Outcomes */}
                          <div className="pt-4 border-t border-gray-100">
                            <div className="flex items-center gap-2 mb-3">
                              <div className="w-6 h-6 rounded-lg bg-green-50 flex items-center justify-center">
                                <Activity className="w-3.5 h-3.5 text-green-500" />
                              </div>
                              <h4 className="font-bold text-gray-800 text-sm">{t('prosthetics.foot_amputation_types.outcomes')}</h4>
                            </div>
                            <ul className="space-y-2 mr-2 ml-2">
                              {type.functionalOutcomes?.map((outcome: string, idx: number) => (
                                <li key={idx} className="flex items-start gap-2 text-sm text-gray-600">
                                  <span className="w-1.5 h-1.5 rounded-full bg-green-400 mt-2 flex-shrink-0" />
                                  {outcome}
                                </li>
                              ))}
                            </ul>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>

                    {/* Toggle Button */}
                    <button className="w-full mt-4 flex items-center justify-center gap-2 py-2 rounded-xl text-sm font-semibold transition-all duration-200 hover:bg-gray-50"
                      style={{ color: type.color }}
                    >
                      {activeType === type.id ? (
                        <>{t('prosthetics.foot_amputation_types.show_less')} <ChevronUp className="w-4 h-4" /></>
                      ) : (
                        <>{t('prosthetics.foot_amputation_types.show_more')} <ChevronDown className="w-4 h-4" /></>
                      )}
                    </button>
                  </div>
                </motion.div>
              </motion.div>
            ))}
          </div>

          {/* Info Box */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mt-14 bg-gradient-to-r from-amber-50 via-orange-50 to-red-50 border border-amber-200 rounded-2xl p-8 shadow-sm"
          >
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center flex-shrink-0 shadow-lg">
                <Info className="w-6 h-6 text-white" />
              </div>
              <div>
                <h4 className="text-xl font-bold text-gray-900 mb-2">{t('prosthetics.foot_amputation_types.note_title')}</h4>
                <p className="text-gray-600 leading-relaxed">
                  {t('prosthetics.foot_amputation_types.note_desc')}
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default FootAmputationTypes;
