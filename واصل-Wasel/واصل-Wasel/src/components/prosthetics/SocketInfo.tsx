
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Bandage, Check, ArrowLeft, Lock, Droplets, Cpu, Wrench } from 'lucide-react';
import { useTranslation } from 'react-i18next';

// معلومات السوكيت
const socketTypes = [
  {
    id: 'conventional',
    name: 'السوكيت التقليدي',
    englishName: 'Conventional Socket',
    description: 'تصميم يعتمد على الضغط على نقاط تحمل محددة في الطرف المتبقي، مع تخفيف الضغط عن المناطق الحساسة.',
    icon: Wrench,
    features: [
      'يناسب معظم حالات البتر البسيطة',
      'تكلفة معقولة مقارنة بالأنواع الأخرى',
      'يتطلب استخدام جوارب لضبط الحجم'
    ],
    image: 'https://martinbionics.com/wp-content/uploads/2021/01/jumprope.gif',
    color: '#6366f1',
    bgGradient: 'from-indigo-500 to-indigo-700'
  },
  {
    id: 'tsb',
    name: 'سوكيت الضغط الكلي',
    englishName: 'Total Surface Bearing (TSB)',
    description: 'يوزع الضغط على كامل سطح الطرف المتبقي بالتساوي، مما يقلل من نقاط الضغط العالي ويحسن الراحة.',
    icon: Lock,
    features: [
      'توزيع متساوٍ للضغط',
      'تحكم أفضل في الطرف الصناعي',
      'يتطلب بطانة سيليكون أو بولييورثين',
      'مناسب للمستخدمين النشطين'
    ],
    image: 'https://o.quizlet.com/.yPczd21qzuZBW4ID7hPvA.jpg',
    color: '#06b6d4',
    bgGradient: 'from-cyan-500 to-cyan-700'
  },
  {
    id: 'vacuum',
    name: 'سوكيت التعليق بالفراغ',
    englishName: 'Vacuum Suspension Socket',
    description: 'يستخدم ضغطاً سلبياً (فراغ) لتعليق الطرف الصناعي، مما يوفر اتصالاً أفضل ويقلل الحركة.',
    icon: Droplets,
    features: [
      'تقليل الحركة والاحتكاك داخل السوكيت',
      'تحسين الدورة الدموية في الطرف المتبقي',
      'تقليل التورم',
      'تحكم أفضل في الطرف الصناعي'
    ],
    image: 'https://andersonprosthetics.com/wp-content/uploads/2016/11/ossurunity.png',
    color: '#8b5cf6',
    bgGradient: 'from-violet-500 to-violet-700'
  },
  {
    id: 'osseointegration',
    name: 'الحقن المباشر في العظم',
    englishName: 'Osseointegration',
    description: 'تقنية متقدمة تتضمن زرع عمود معدني في عظم الطرف المتبقي، يتصل مباشرة بالطرف الصناعي.',
    icon: Cpu,
    features: [
      'تحكم فائق في الطرف الصناعي',
      'إحساس أفضل بالأرض والحركة (proprioception)',
      'تخلص من مشاكل السوكيت التقليدي',
      'مناسب للحالات التي تعاني من مشاكل في الجلد'
    ],
    image: 'https://media.springernature.com/lw685/springer-static/image/art%3A10.1007%2Fs00256-023-04524-z/MediaObjects/256_2023_4524_Fig4_HTML.png',
    color: '#f59e0b',
    bgGradient: 'from-amber-500 to-amber-700'
  }
];

const manufacturingSteps = [
  {
    step: 'أخذ القياسات',
    description: 'يتم أخذ قياسات دقيقة للطرف المتبقي باستخدام أساليب مختلفة.',
    details: 'يقوم الأخصائي بأخذ قياسات محيط الطرف على مستويات مختلفة، وتحديد النقاط العظمية والمناطق الحساسة.',
    image: 'https://cdn.prod.website-files.com/61fd1a8c835a084cd90fb602/6357f9abe2891f0e75be7cca_Our%20Process%20(1).avif'
  },
  {
    step: 'إنشاء النموذج الأولي',
    description: 'إنشاء نموذج أولي للسوكيت باستخدام القياسات.',
    details: 'مسح رقمي وإنشاء نموذج ثلاثي الأبعاد يمكن تعديله لتحسين الملاءمة والأداء.',
    image: 'https://static-01.extrica.com/articles/22012/22012-gabs-2997x2099.webp'
  },
  {
    step: 'تصنيع السوكيت',
    description: 'تصنيع السوكيت النهائي من مواد مثل البلاستيك الحراري أو الألياف الكربونية.',
    details: 'تشكيل المادة على النموذج باستخدام التفريغ الهوائي والحرارة.',
    image: 'https://pro-orthoindia.com/images/3.jpg'
  },
  {
    step: 'التجربة والتعديل',
    description: 'تجربة السوكيت على المريض وإجراء التعديلات اللازمة.',
    details: 'تقييم توزيع الضغط وملاءمة السوكيت مع عدة جلسات تعديل.',
    image: 'https://cdn.prod.website-files.com/620223123d75ce5495043bfa/66ab5a8fbd93b8bfa347fa05_667beb02fbd0af3cc8f60720_your-journey-to-a-new-normal-with-a-prosthesis.webp'
  }
];

const SocketInfo: React.FC = () => {
  const { t, i18n } = useTranslation();
  const [activeTab, setActiveTab] = useState<'types' | 'manufacturing'>('types');
  const [activeSocket, setActiveSocket] = useState<string | null>(null);
  
  const isRtl = i18n.dir() === 'rtl';

  const socketData = t('prosthetics.socket_info.data', { returnObjects: true }) as Record<string, any>;
  
  const typesWithData = socketTypes.map(type => ({
    ...type,
    ...(socketData[type.id] || {})
  }));

  const manufacturingStepsData = t('prosthetics.socket_info.manufacturing_steps_data', { returnObjects: true }) as Array<any>;
  
  const stepsWithData = manufacturingSteps.map((step, index) => ({
    ...step,
    ...(manufacturingStepsData[index] || {})
  }));

  return (
    <section id="socket-info" className="py-20 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-white via-indigo-50/30 to-white" />
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-l from-indigo-500 via-violet-500 to-purple-500" />

      <div className="relative container mx-auto px-4">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center mb-6"
        >
          <div className="inline-flex items-center gap-2 bg-indigo-100 text-indigo-700 px-4 py-2 rounded-full text-sm font-bold mb-4">
            <Bandage className="w-4 h-4" />
            {t('prosthetics.socket_info.badge')}
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="bg-gradient-to-l from-indigo-600 to-violet-600 bg-clip-text text-transparent">
              {t('prosthetics.socket_info.title')}
            </span>
          </h2>
          <p className="text-gray-500 text-lg max-w-2xl mx-auto mb-4">
            {t('prosthetics.socket_info.desc')}
          </p>
        </motion.div>

        {/* Tab Switcher */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex justify-center gap-3 mb-12"
        >
          {[
            { key: 'types' as const, label: t('prosthetics.socket_info.tabs.types'), icon: Bandage },
            { key: 'manufacturing' as const, label: t('prosthetics.socket_info.tabs.manufacturing'), icon: Wrench }
          ].map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={`
                flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-bold transition-all duration-300
                ${activeTab === tab.key
                  ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/30'
                  : 'bg-white text-gray-600 border-2 border-gray-200 hover:border-indigo-300 hover:text-indigo-600'
                }
              `}
            >
              <tab.icon className="w-4 h-4" />
              {tab.label}
            </button>
          ))}
        </motion.div>

        {/* Types Content */}
        <AnimatePresence mode="wait">
          {activeTab === 'types' && (
            <motion.div
              key="types"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {typesWithData.map((type, index) => (
                  <motion.div
                    key={type.id}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                  >
                    <motion.div
                      whileHover={{ y: -4 }}
                      className={`
                        bg-white rounded-2xl shadow-lg overflow-hidden border-2 transition-all duration-300 cursor-pointer
                        ${activeSocket === type.id ? 'border-opacity-100 shadow-2xl' : 'border-transparent hover:shadow-xl'}
                      `}
                      style={{ borderColor: activeSocket === type.id ? type.color : 'transparent' }}
                      onClick={() => setActiveSocket(activeSocket === type.id ? null : type.id)}
                    >
                      <div className="flex flex-col md:flex-row">
                        {/* Image */}
                        <div className="md:w-2/5 h-56 md:h-auto overflow-hidden relative group">
                          <img
                            src={type.image}
                            alt={type.name}
                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                          />
                          <div className={`absolute inset-0 bg-gradient-to-t ${type.bgGradient} opacity-30`} />
                          {/* Icon Badge */}
                          <div className="absolute top-4 right-4">
                            <div className="w-10 h-10 rounded-xl bg-white/90 backdrop-blur-sm flex items-center justify-center shadow-lg">
                              <type.icon className="w-5 h-5" style={{ color: type.color }} />
                            </div>
                          </div>
                        </div>

                        {/* Content */}
                        <div className="md:w-3/5 p-6">
                          <p className="text-xs font-medium mb-1" style={{ color: type.color }}>{type.englishName}</p>
                          <h3 className="text-xl font-bold text-gray-900 mb-2">{type.name}</h3>
                          <p className="text-gray-600 text-sm leading-relaxed mb-4">{type.description}</p>

                          <div>
                            <h4 className="font-bold text-gray-800 text-sm mb-2">{t('prosthetics.socket_info.features')}</h4>
                            <ul className="space-y-2">
                              {type.features?.map((feature: string, idx: number) => (
                                <li key={idx} className="flex items-start gap-2 text-sm text-gray-600">
                                  <Check className="w-4 h-4 mt-0.5 flex-shrink-0" style={{ color: type.color }} />
                                  {feature}
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}

          {/* Manufacturing Content */}
          {activeTab === 'manufacturing' && (
            <motion.div
              key="manufacturing"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
            >
              <div className="max-w-4xl mx-auto space-y-0">
                {stepsWithData.map((step, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="relative"
                  >
                    {/* Vertical connector line */}
                    {index < stepsWithData.length - 1 && (
                      <div className={`absolute ${isRtl ? 'right-[39px]' : 'left-[39px]'} top-20 bottom-0 w-0.5 bg-gradient-to-b from-indigo-400 to-violet-400 z-0`} />
                    )}

                    <div className="flex gap-6 relative z-10 pb-12">
                      {/* Step Number Circle */}
                      <div className="flex-shrink-0">
                        <motion.div
                          whileHover={{ scale: 1.1 }}
                          className="w-20 h-20 rounded-2xl bg-gradient-to-br from-indigo-500 to-violet-600 flex items-center justify-center shadow-xl shadow-indigo-500/30"
                        >
                          <span className="text-white text-2xl font-black">{index + 1}</span>
                        </motion.div>
                      </div>

                      {/* Step Content */}
                      <div className="flex-1">
                        <div className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-100 hover:shadow-xl transition-all duration-300">
                          <div className="flex flex-col md:flex-row">
                            <div className="md:w-2/5 h-48 md:h-auto overflow-hidden">
                              <img
                                src={step.image}
                                alt={step.step}
                                className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                              />
                            </div>
                            <div className="md:w-3/5 p-6">
                              <h3 className="text-xl font-bold text-gray-900 mb-2">{step.step}</h3>
                              <p className="text-gray-700 font-medium mb-2">{step.description}</p>
                              <p className="text-gray-500 text-sm leading-relaxed">{step.details}</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};

export default SocketInfo;
