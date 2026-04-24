
import React from 'react';
import { motion } from 'framer-motion';
import { Info, MessageCircleQuestion, HelpCircle } from 'lucide-react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger
} from '@/components/ui/accordion';

const faqItems = [
  {
    question: "كيف يتم تحديد نوع الطرف الصناعي المناسب لي؟",
    answer: "يتم تحديد نوع الطرف الصناعي المناسب بناءً على عدة عوامل، منها مستوى البتر، ونمط الحياة، ومستوى النشاط، والحالة الصحية العامة، والأهداف الشخصية. يقوم فريق متخصص يضم أخصائي الأطراف الصناعية والمعالج الطبيعي والطبيب المعالج بتقييم شامل لحالتك واحتياجاتك لتحديد الخيار الأمثل.",
    icon: "="
  },
  {
    question: "كم من الوقت يستغرق التأهيل مع الطرف الصناعي الجديد؟",
    answer: "تختلف فترة التأهيل من شخص لآخر وحسب نوع البتر ومستواه. بشكل عام، قد تستغرق من عدة أسابيع إلى عدة أشهر. تبدأ بفترة تعود على السوكيت وتحمل الوزن تدريجياً، ثم التدريب على المشي والتوازن، وصولاً للأنشطة اليومية المتقدمة.",
    icon: "="
  },
  {
    question: "ما هي مدة صلاحية الطرف الصناعي وهل يحتاج لصيانة؟",
    answer: "يعتمد عمر الطرف الصناعي على عدة عوامل منها نوع المكونات، ومستوى النشاط، وظروف الاستخدام. بشكل عام، قد يدوم السوكيت من 3-5 سنوات، بينما يمكن أن تدوم المكونات الميكانيكية والهيدروليكية من 3-7 سنوات. تحتاج الأطراف الصناعية للصيانة الدورية كل 6-12 شهر.",
    icon: "="
  },
  {
    question: "هل يمكنني ممارسة الرياضة مع الطرف الصناعي؟",
    answer: "نعم، يمكن ممارسة العديد من الأنشطة الرياضية مع الطرف الصناعي المناسب. هناك أطراف صناعية مصممة خصيصاً للأنشطة الرياضية مثل الجري والسباحة والتزلج وغيرها. من المهم استشارة أخصائي الأطراف الصناعية لتحديد الطرف المناسب.",
    icon: "="
  },
  {
    question: "هل يغطي التأمين الصحي تكاليف الأطراف الصناعية؟",
    answer: "يختلف مدى تغطية التأمين للأطراف الصناعية بين شركات التأمين وأنواع البوالص. معظم التأمينات الصحية تغطي جزءًا من تكاليف الأطراف الصناعية الأساسية. توجد أيضاً برامج مساعدة حكومية وجمعيات خيرية تقدم الدعم المالي.",
    icon: "💳"
  },
  {
    question: "كيف أتعامل مع التغيرات في حجم الطرف المتبقي؟",
    answer: "من الطبيعي أن يتغير حجم الطرف المتبقي خلال الأشهر الأولى بعد البتر. يمكن استخدام جوارب خاصة (Stump Socks) بسماكات مختلفة للتعويض. إذا استمر التغير أو كان كبيراً، قد تحتاج لتعديل السوكيت أو عمل سوكيت جديد.",
    icon: "📏"
  }
];

const FAQSection: React.FC = () => {
  return (
    <section id="faq" className="py-20 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-white via-blue-50/30 to-white" />

      <div className="relative container mx-auto px-4">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center mb-14"
        >
          <div className="inline-flex items-center gap-2 bg-orange-100 text-orange-700 px-4 py-2 rounded-full text-sm font-bold mb-4">
            <MessageCircleQuestion className="w-4 h-4" />
            إجابات شاملة
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="bg-gradient-to-l from-orange-600 to-amber-600 bg-clip-text text-transparent">
              الأسئلة الشائعة
            </span>
          </h2>
          <p className="text-gray-500 text-lg max-w-2xl mx-auto">
            إجابات على أكثر الأسئلة شيوعاً حول الأطراف الصناعية والتأهيل
          </p>
        </motion.div>

        {/* FAQ Cards */}
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="bg-white rounded-3xl shadow-xl p-8 border border-gray-100"
          >
            <Accordion type="single" collapsible className="w-full space-y-3">
              {faqItems.map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: 15 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.08 }}
                >
                  <AccordionItem
                    value={`item-${index}`}
                    className="border border-gray-100 rounded-xl px-4 hover:border-medical-200 hover:bg-medical-50/30 transition-all duration-200 data-[state=open]:border-medical-300 data-[state=open]:bg-medical-50/50"
                  >
                    <AccordionTrigger className="text-base md:text-lg font-semibold text-gray-800 hover:text-medical-700 py-5 gap-3">
                      <div className="flex items-center gap-3 text-right">
                        <span className="text-2xl">{item.icon}</span>
                        {item.question}
                      </div>
                    </AccordionTrigger>
                    <AccordionContent className="text-base text-gray-600 leading-relaxed pb-5 pr-12">
                      {item.answer}
                    </AccordionContent>
                  </AccordionItem>
                </motion.div>
              ))}
            </Accordion>
          </motion.div>

          {/* Help CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mt-10 text-center"
          >
            <div className="inline-flex items-center gap-3 bg-gradient-to-l from-medical-50 to-blue-50 text-medical-700 px-8 py-4 rounded-2xl border border-medical-200 shadow-sm">
              <HelpCircle className="w-5 h-5" />
              <p className="font-medium">
                لم تجد إجابة لسؤالك؟{' '}
                <a href="/contact" className="text-medical-600 font-bold underline underline-offset-2 hover:text-medical-800 transition-colors">
                  تواصل معنا مباشرة
                </a>
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default FAQSection;
