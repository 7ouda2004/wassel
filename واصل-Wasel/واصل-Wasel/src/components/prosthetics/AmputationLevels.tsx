
import React from 'react';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { PersonStanding, User } from 'lucide-react';
import { motion } from 'framer-motion';

// Data for amputation levels
const amputationLevels = [
  {
    id: 'transradial',
    name: 'بتر ما تحت الكوع (Transradial)',
    description: 'يشمل فقدان جزء من الساعد، ويتيح الاحتفاظ بمفصل الكوع الطبيعي، مما يساعد في التحكم بالطرف الصناعي.',
    anatomyPoints: [
      'يحتفظ بمفصل الكوع الطبيعي',
      'يفقد جزء أو كل عظمتي الساعد (الكعبرة والزند)',
      'يحتفظ بمعظم عضلات الساعد للتحكم في الطرف الصناعي'
    ],
    prostheticOptions: [
      'طرف صناعي ميكانيكي مع خطاف أو يد',
      'طرف صناعي كهربائي يعمل بمستشعرات العضلات (Myoelectric)',
      'طرف صناعي هجين (ميكانيكي-كهربائي)',
      'أطراف صناعية متقدمة مع أصابع متحركة'
    ],
    functionalOutcomes: [
      'القدرة على استخدام اليد الصناعية للأنشطة اليومية الأساسية',
      'إمكانية العودة للعمل والنشاطات الرياضية',
      'قد يتطلب تدريباً وإعادة تأهيل لفترة متوسطة'
    ],
    image: 'https://www.armdynamics.com/hs-fs/hubfs/Bilateral%20Transradial%20(Below%20the%20Elbow)%20Amputee.jpg?width=600&height=338&name=Bilateral%20Transradial%20(Below%20the%20Elbow)%20Amputee.jpg'
  },
  {
    id: 'transhumeral',
    name: 'بتر ما فوق الكوع (Transhumeral)',
    description: 'يشمل فقدان الساعد ومفصل الكوع، ويتطلب طرفاً صناعياً مع كوع اصطناعي للتحكم بحركة الذراع.',
    anatomyPoints: [
      'فقدان مفصل الكوع الطبيعي',
      'فقدان عظم العضد بشكل جزئي',
      'الاحتفاظ بمفصل الكتف الطبيعي للتحكم في الطرف'
    ],
    prostheticOptions: [
      'كوع اصطناعي ميكانيكي يتم قفله وفتحه يدوياً',
      'كوع اصطناعي كهربائي يعمل بمستشعرات العضلات',
      'طرف صناعي متكامل مع يد ورسغ وكوع قابلة للتحكم'
    ],
    functionalOutcomes: [
      'يتطلب جهداً وتدريباً أكبر للتحكم بالطرف',
      'يمكن استعادة القدرة على الأنشطة اليومية الأساسية',
      'قد يواجه صعوبة في الأنشطة التي تتطلب دقة عالية'
    ],
    image: 'https://www.armdynamics.com/hs-fs/hubfs/Transhumeral%20(Below%20the%20elbow)%20Amputee.jpg?width=600&height=338&name=Transhumeral%20(Below%20the%20elbow)%20Amputee.jpg'
  },
  {
    id: 'shoulder',
    name: 'بتر مفصل الكتف (Shoulder Disarticulation)',
    description: 'يشمل فقدان الذراع بالكامل مع مفصل الكتف، ويعتبر من أكثر أنواع البتر العلوي تحدياً من حيث التأهيل.',
    anatomyPoints: [
      'فقدان الذراع بالكامل مع جزء أو كل مفصل الكتف',
      'الاحتفاظ بعضلات الصدر والظهر للتحكم في الطرف الصناعي',
      'تغيير في توازن الجسم وميكانيكية الحركة'
    ],
    prostheticOptions: [
      'طرف صناعي كامل مع كتف وكوع ورسغ ويد اصطناعية',
      'أنظمة تحكم متقدمة تستخدم حركات الجذع والكتف المتبقي',
      'في بعض الحالات يمكن استخدام أنظمة تحكم عصبية متقدمة'
    ],
    functionalOutcomes: [
      'يتطلب تدريباً مكثفاً وفترة تأهيل طويلة',
      'يمكن استعادة القدرة على بعض الأنشطة الأساسية',
      'قد يفضل بعض المرضى الأطراف الصناعية التجميلية فقط'
    ],
    image: 'https://www.armdynamics.com/hs-fs/hubfs/Shoulder%20Level%20(interscapular-thoracic)%20Amputee-2.jpg?width=600&height=338&name=Shoulder%20Level%20(interscapular-thoracic)%20Amputee-2.jpg'
  },
  {
    id: 'transtibial',
    name: 'بتر ما تحت الركبة (Transtibial)',
    description: 'يشمل فقدان جزء من الساق مع الاحتفاظ بمفصل الركبة الطبيعي، مما يتيح نمط مشي أكثر طبيعية وكفاءة في استهلاك الطاقة.',
    anatomyPoints: [
      'الاحتفاظ بمفصل الركبة الطبيعي',
      'فقدان جزء من عظمتي الساق (الظنبوب والشظية)',
      'الاحتفاظ بمعظم عضلات الفخذ للتحكم في الطرف'
    ],
    prostheticOptions: [
      'قدم SACH (Solid Ankle Cushioned Heel)',
      'القدم المرنة (Flexible Keel)',
      'القدم الديناميكية (Dynamic Response)',
      'القدم المتعددة المحاور (Multi-axial)'
    ],
    functionalOutcomes: [
      'القدرة على المشي بنمط طبيعي تقريباً',
      'إمكانية ممارسة معظم الأنشطة الرياضية',
      'استهلاك طاقة أقل بنسبة 25% مقارنة ببتر الفخذ'
    ],
    image: 'https://www.choosept.com/globalassets/choosept/assets/guide-illustrations-images/below-knee-amputation-illustration_880x550.png'
  },
  {
    id: 'transfemoral',
    name: 'بتر ما فوق الركبة (Transfemoral)',
    description: 'يشمل فقدان الساق ومفصل الركبة، ويتطلب طرفاً صناعياً مع ركبة اصطناعية، مما يزيد من تحديات التحكم والتوازن أثناء المشي.',
    anatomyPoints: [
      'فقدان مفصل الركبة الطبيعي',
      'فقدان جزء من عظم الفخذ',
      'الاحتفاظ بمفصل الورك الطبيعي للتحكم في الطرف'
    ],
    prostheticOptions: [
      'ركبة ميكانيكية (أحادية المحور أو متعددة المحاور)',
      'ركبة هيدروليكية',
      'ركبة محوسبة (Microprocessor knee)',
      'مجموعة متنوعة من أنواع القدم الصناعية'
    ],
    functionalOutcomes: [
      'يتطلب جهداً وطاقة أكبر أثناء المشي',
      'يحتاج تدريباً مكثفاً للتحكم بالركبة الصناعية',
      'يمكن تحقيق مستوى جيد من النشاط والاستقلالية'
    ],
    image: 'https://www.choosept.com/globalassets/choosept/assets/guide-illustrations-images/above-knee-amputation-illustration_880x550.jpg'
  },
  {
    id: 'hip',
    name: 'بتر مفصل الورك (Hip Disarticulation)',
    description: 'يشمل فقدان الساق بالكامل مع مفصل الورك، ويعتبر من أكثر مستويات البتر السفلي تعقيداً من حيث التأهيل والتكيف.',
    anatomyPoints: [
      'فقدان الساق بالكامل مع مفصل الورك',
      'الاحتفاظ بعضلات الحوض والبطن للتحكم',
      'تغيير كبير في مركز ثقل الجسم وميكانيكا الحركة'
    ],
    prostheticOptions: [
      'طرف صناعي كامل مع ورك وركبة وقدم اصطناعية',
      'نظام ورك محوسب في الحالات المتقدمة',
      'ركبة هيدروليكية أو محوسبة للتحكم الأفضل'
    ],
    functionalOutcomes: [
      'يتطلب تدريباً مكثفاً جداً وفترة تأهيل طويلة',
      'استهلاك طاقة أعلى بكثير أثناء المشي',
      'قد يستخدم بعض المرضى الكرسي المتحرك بشكل متكرر'
    ],
    image: 'https://www.physio-pedia.com/images/thumb/b/b6/Engstrom-chp12-fig5.png/400px-Engstrom-chp12-fig5.png'
  }
];

const AmputationLevels: React.FC = () => {
  return (
    <section id="amputation-levels" className="py-16 bg-gradient-to-r from-gray-50 to-white">
      <div className="container mx-auto px-4">
        <motion.div 
          className="flex items-center gap-2 mb-8"
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <PersonStanding className="h-8 w-8 text-medical-600" />
          <h2 className="text-3xl font-bold text-gray-900">مستويات البتر</h2>
        </motion.div>
        
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
        >
          {amputationLevels.map((level, index) => (
            <motion.div
              key={level.id}
              initial={{ opacity: 0, y: 50, scale: 0.9 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ y: -10, scale: 1.02 }}
            >
              <Card className="overflow-hidden hover:shadow-xl transition-all duration-500 h-full">
                <div className="h-48 overflow-hidden">
                  <motion.img 
                    src={level.image} 
                    alt={level.name} 
                    className="w-full h-full object-cover"
                    whileHover={{ scale: 1.1 }}
                    transition={{ duration: 0.3 }}
                  />
                </div>
                <CardHeader>
                  <CardTitle className="text-xl">{level.name}</CardTitle>
                  <CardDescription className="text-base">{level.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <motion.div 
                    className="mb-4"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ delay: 0.3 + index * 0.1 }}
                    viewport={{ once: true }}
                  >
                    <h4 className="font-semibold text-medical-700 mb-2">التشريح والخصائص:</h4>
                    <ul className="list-disc list-inside space-y-1 mr-4">
                      {level.anatomyPoints.map((point, idx) => (
                        <motion.li 
                          key={idx} 
                          className="text-gray-600"
                          initial={{ opacity: 0, x: -20 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.4 + idx * 0.05 }}
                          viewport={{ once: true }}
                        >
                          {point}
                        </motion.li>
                      ))}
                    </ul>
                  </motion.div>
                  
                  <motion.div 
                    className="mb-4"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ delay: 0.5 + index * 0.1 }}
                    viewport={{ once: true }}
                  >
                    <h4 className="font-semibold text-medical-700 mb-2">خيارات الأطراف الصناعية:</h4>
                    <ul className="list-disc list-inside space-y-1 mr-4">
                      {level.prostheticOptions.map((option, idx) => (
                        <motion.li 
                          key={idx} 
                          className="text-gray-600"
                          initial={{ opacity: 0, x: -20 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.6 + idx * 0.05 }}
                          viewport={{ once: true }}
                        >
                          {option}
                        </motion.li>
                      ))}
                    </ul>
                  </motion.div>
                  
                  <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ delay: 0.7 + index * 0.1 }}
                    viewport={{ once: true }}
                  >
                    <h4 className="font-semibold text-medical-700 mb-2">النتائج الوظيفية:</h4>
                    <ul className="list-disc list-inside space-y-1 mr-4">
                      {level.functionalOutcomes.map((outcome, idx) => (
                        <motion.li 
                          key={idx} 
                          className="text-gray-600"
                          initial={{ opacity: 0, x: -20 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.8 + idx * 0.05 }}
                          viewport={{ once: true }}
                        >
                          {outcome}
                        </motion.li>
                      ))}
                    </ul>
                  </motion.div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default AmputationLevels;
