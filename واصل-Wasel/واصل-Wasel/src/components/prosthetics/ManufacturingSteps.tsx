
import React from 'react';
import { motion } from 'framer-motion';
import { BarChart, Award, Check, ArrowLeft } from 'lucide-react';
import { useTranslation } from 'react-i18next';

// مراحل تصنيع الطرف الصناعي
const manufacturingSteps = [
  {
    step: 'التقييم والتخطيط',
    description: 'يتم تقييم حالة المريض وتحديد النوع المناسب من الطرف الصناعي.',
    details: [
      'فحص شامل للطرف المتبقي وصحته',
      'تقييم مستوى النشاط ونمط الحياة',
      'مناقشة التوقعات والأهداف مع المريض',
      'تحديد المكونات المناسبة'
    ],
    image: 'https://members.physio-pedia.com/wp-content/uploads/2020/02/amputee-3.jpg',
    color: 'from-blue-500 to-blue-700',
    iconBg: 'bg-blue-500'
  },
  {
    step: 'تصميم وتصنيع السوكيت',
    description: 'تصميم وتصنيع السوكيت حسب قياسات الطرف المتبقي للمريض.',
    details: [
      'أخذ قياسات دقيقة للطرف المتبقي',
      'إنشاء نموذج أولي للسوكيت',
      'تصنيع السوكيت من المواد المناسبة',
      'تجربة وتعديل السوكيت'
    ],
    image: 'https://www.orfit.com/app/uploads/Applying-acrylic-varnish.jpg',
    color: 'from-indigo-500 to-indigo-700',
    iconBg: 'bg-indigo-500'
  },
  {
    step: 'اختيار وتركيب المكونات',
    description: 'اختيار المكونات المناسبة وتجميعها مع السوكيت.',
    details: [
      'اختيار نوع الركبة المناسب حسب مستوى النشاط',
      'اختيار القدم الصناعية المناسبة',
      'تحديد نظام التعليق المناسب',
      'تجميع المكونات وتثبيتها'
    ],
    image: 'https://content.instructables.com/FQE/DLKV/HTX5JT42/FQEDLKVHTX5JT42.jpg?auto=webp&frame=1&width=900&height=1024&fit=bounds&md=MjAxNC0wNC0xMiAxMzoxMToxMi4w',
    color: 'from-purple-500 to-purple-700',
    iconBg: 'bg-purple-500'
  },
  {
    step: 'المحاذاة والضبط الأولي',
    description: 'ضبط محاذاة الطرف الصناعي لتحقيق التوازن والاستقرار.',
    details: [
      'ضبط المحاذاة الأمامية والخلفية',
      'ضبط المحاذاة الجانبية',
      'تعديل ارتفاع الطرف',
      'ضبط زوايا الانثناء والدوران'
    ],
    image: 'https://cdn.prod.website-files.com/620223123d75ce5495043bfa/667bd5fc802c815e134113ef_stages-of-prosthetic-fitting-steps-to-getting-a-prosthesis.webp',
    color: 'from-violet-500 to-violet-700',
    iconBg: 'bg-violet-500'
  },
  {
    step: 'التجربة والتدريب',
    description: 'تدريب المريض على استخدام الطرف الصناعي الجديد.',
    details: [
      'تدريب على المشي والتوازن',
      'تدريب على الجلوس والوقوف',
      'تدريب على صعود الدرج والمنحدرات',
      'تعليم العناية بالطرف والسوكيت'
    ],
    image: 'https://isbrave.com/wp-content/uploads/2024/03/orthopedic-technician-adjusting-a-patients-socket-and-above-the-knee-amputation-knee-and-leg.jpg',
    color: 'from-teal-500 to-teal-700',
    iconBg: 'bg-teal-500'
  },
  {
    step: 'المتابعة والتعديلات',
    description: 'جلسات متابعة منتظمة لتقييم أداء الطرف الصناعي.',
    details: [
      'متابعة حالة الطرف المتبقي',
      'تعديل السوكيت عند الحاجة',
      'تقييم وصيانة المكونات',
      'استبدال الأجزاء المستهلكة',
      'تحديث الطرف مع تغير احتياجات المريض'
    ],
    image: 'https://isbrave.com/wp-content/uploads/2024/03/inspecting-a-below-knee-socket-prosthesis.jpg',
    color: 'from-emerald-500 to-emerald-700',
    iconBg: 'bg-emerald-500'
  }
];

const ManufacturingSteps: React.FC = () => {
  const { t } = useTranslation();

  const stepsData = t('prosthetics.manufacturing_steps.data', { returnObjects: true }) as Array<any>;
  
  const stepsWithData = manufacturingSteps.map((step, index) => ({
    ...step,
    ...(stepsData[index] || {})
  }));

  return (
    <section id="manufacturing-steps" className="py-20 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-gray-50 via-white to-gray-50" />
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-l from-blue-500 via-purple-500 to-teal-500" />

      <div className="relative container mx-auto px-4">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 bg-blue-100 text-blue-700 px-4 py-2 rounded-full text-sm font-bold mb-4">
            <BarChart className="w-4 h-4" />
            {t('prosthetics.manufacturing_steps.badge')}
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="bg-gradient-to-l from-blue-600 via-purple-600 to-teal-600 bg-clip-text text-transparent">
              {t('prosthetics.manufacturing_steps.title')}
            </span>
          </h2>
          <p className="text-gray-500 text-lg max-w-2xl mx-auto">
            {t('prosthetics.manufacturing_steps.desc')}
          </p>
        </motion.div>

        {/* Timeline Steps */}
        <div className="max-w-5xl mx-auto">
          {stepsWithData.map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: index % 2 === 0 ? 40 : -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="mb-12 last:mb-0"
            >
              <div className={`flex flex-col ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'} gap-8 items-center`}>
                {/* Image Side */}
                <div className="w-full md:w-1/2">
                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    className="rounded-2xl overflow-hidden shadow-xl relative group"
                  >
                    <img
                      src={step.image}
                      alt={step.step}
                      className="w-full h-64 object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className={`absolute inset-0 bg-gradient-to-t ${step.color} opacity-30 group-hover:opacity-40 transition-opacity`} />
                    
                    {/* Step Number */}
                    <div className="absolute top-4 right-4">
                      <div className={`w-14 h-14 rounded-2xl ${step.iconBg} flex items-center justify-center shadow-xl`}>
                        <span className="text-white text-xl font-black">{index + 1}</span>
                      </div>
                    </div>
                  </motion.div>
                </div>

                {/* Content Side */}
                <div className="w-full md:w-1/2">
                  <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100 hover:shadow-xl transition-shadow duration-300">
                    <h3 className="text-2xl font-bold text-gray-900 mb-3">{step.step}</h3>
                    <p className="text-gray-600 mb-5 leading-relaxed">{step.description}</p>
                    
                    <ul className="space-y-3">
                      {step.details?.map((detail: string, idx: number) => (
                        <motion.li
                          key={idx}
                          initial={{ opacity: 0, x: 10 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          viewport={{ once: true }}
                          transition={{ delay: 0.3 + idx * 0.1 }}
                          className="flex items-start gap-3 text-gray-600"
                        >
                          <div className={`w-5 h-5 rounded-md ${step.iconBg} flex items-center justify-center flex-shrink-0 mt-0.5`}>
                            <Check className="w-3 h-3 text-white" />
                          </div>
                          <span className="text-sm">{detail}</span>
                        </motion.li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>

              {/* Connector */}
              {index < stepsWithData.length - 1 && (
                <div className="hidden md:flex justify-center my-6">
                  <motion.div
                    initial={{ scaleY: 0 }}
                    whileInView={{ scaleY: 1 }}
                    viewport={{ once: true }}
                    className="w-0.5 h-12 bg-gradient-to-b from-gray-300 to-gray-200 rounded-full"
                  />
                </div>
              )}
            </motion.div>
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-16"
        >
          <div className="bg-gradient-to-l from-medical-600 via-medical-700 to-teal-700 rounded-3xl p-10 text-center shadow-2xl shadow-medical-600/20 relative overflow-hidden">
            {/* Decorative */}
            <div className="absolute top-0 right-0 w-64 h-64 rounded-full bg-white/5 -translate-y-1/2 translate-x-1/2" />
            <div className="absolute bottom-0 left-0 w-48 h-48 rounded-full bg-white/5 translate-y-1/2 -translate-x-1/2" />
            
            <div className="relative z-10">
              <div className="flex justify-center mb-4">
                <div className="w-16 h-16 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center">
                  <Award className="h-8 w-8 text-white" />
                </div>
              </div>
              <h3 className="text-3xl font-bold text-white mb-4">{t('prosthetics.manufacturing_steps.cta_title')}</h3>
              <p className="text-white/80 text-lg max-w-3xl mx-auto leading-relaxed">
                {t('prosthetics.manufacturing_steps.cta_desc')}
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ManufacturingSteps;
