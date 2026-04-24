
import React, { useState } from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from "@/components/ui/card";
import { PersonStanding, Hand, Footprints, ChevronDown, ChevronUp, ArrowDown } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

// Data for amputation levels
const amputationLevels = [
  // ====== UPPER LIMB ======
  {
    id: 'partial-hand',
    name: 'بتر جزئي لليد (Partial Hand Amputation)',
    category: 'upper',
    description: 'يشمل فقدان جزء من اليد مع الاحتفاظ بالرسغ، ويقدم نتائج وظيفية ممتازة مقارنة بمستويات البتر الأعلى.',
    anatomyPoints: [
      'فقدان أصابع أو جزء من راحة اليد',
      'الاحتفاظ بمفصل الرسغ',
      'قدرة عالية على التحكم العضلي'
    ],
    prostheticOptions: [
      'أصابع صناعية تجميلية',
      'أصابع وظيفية ميكانيكية',
      'أطراف مطبوعة بتقنية 3D',
      'أطراف كهربائية جزئية'
    ],
    functionalOutcomes: [
      'استعادة جيدة للإمساك بالأشياء',
      'نتائج ممتازة مقارنة بمستويات البتر الأعلى',
      'تكيف سريع نسبيًا'
    ],
    image: 'https://ai2-s2-public.s3.amazonaws.com/figures/2017-08-08/a70aa7dd5565e74a1cc652984204288939defa85/5-Figure7-1.png',
    color: 'from-purple-500 to-purple-700'
  },
  {
    id: 'wrist-disarticulation',
    name: 'بتر الرسغ (Wrist Disarticulation)',
    category: 'upper',
    description: 'فصل اليد بالكامل عند مفصل الرسغ مع الاحتفاظ بطول الساعد كامل.',
    anatomyPoints: [
      'الاحتفاظ بطول الساعد كامل',
      'الحفاظ على قوة العضلات',
      'عدم فقدان عظام الساعد'
    ],
    prostheticOptions: [
      'أطراف ميكانيكية أو كهربائية',
      'تحكم قوي بسبب طول الذراع المتبقي',
      'يد صناعية مع رسغ ثابت أو متحرك'
    ],
    functionalOutcomes: [
      'تحكم ممتاز في الطرف الصناعي',
      'قوة أفضل مقارنة بالبتر تحت الكوع',
      'نتائج وظيفية جيدة جدًا'
    ],
    image: 'https://plus.unsplash.com/premium_photo-1719525710378-9e1414a26b99?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8V3Jpc3QlMjBEaXNhcnRpY3VsYXRpb24lMjBhbXB1dGF0aW9ufGVufDB8fDB8fHww',
    color: 'from-purple-500 to-purple-700'
  },
  {
    id: 'transradial',
    name: 'بتر ما تحت الكوع (Transradial)',
    category: 'upper',
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
    image: 'https://www.armdynamics.com/hs-fs/hubfs/Bilateral%20Transradial%20(Below%20the%20Elbow)%20Amputee.jpg?width=600&height=338&name=Bilateral%20Transradial%20(Below%20the%20Elbow)%20Amputee.jpg',
    color: 'from-blue-500 to-blue-700'
  },
  {
    id: 'transhumeral',
    name: 'بتر ما فوق الكوع (Transhumeral)',
    category: 'upper',
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
    image: 'https://www.armdynamics.com/hs-fs/hubfs/Transhumeral%20(Below%20the%20elbow)%20Amputee.jpg?width=600&height=338&name=Transhumeral%20(Below%20the%20elbow)%20Amputee.jpg',
    color: 'from-blue-500 to-blue-700'
  },
  {
    id: 'shoulder',
    name: 'بتر مفصل الكتف (Shoulder Disarticulation)',
    category: 'upper',
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
    image: 'https://www.armdynamics.com/hs-fs/hubfs/Shoulder%20Level%20(interscapular-thoracic)%20Amputee-2.jpg?width=600&height=338&name=Shoulder%20Level%20(interscapular-thoracic)%20Amputee-2.jpg',
    color: 'from-blue-500 to-blue-700'
  },

  // ====== LOWER LIMB ======
  {
    id: 'partial-foot',
    name: 'بتر جزئي للقدم (Partial Foot Amputation)',
    category: 'lower',
    description: 'يشمل عدة أنواع من بتر القدم مع الحفاظ على الكعب غالبًا، ويقدم نتائج مشي قريبة جدًا من الطبيعي.',
    anatomyPoints: [
      'فقدان جزء من القدم',
      'الحفاظ على الكعب غالبًا',
      'أنواعه: Toe - Transmetatarsal - Lisfranc - Chopart'
    ],
    prostheticOptions: [
      'تعديل حذاء أو دعامة بسيطة',
      'نعل داخلي طبي خاص',
      'قدم صناعية جزئية من السيليكون',
      'دعامة كربونية لتعويض الدفع'
    ],
    functionalOutcomes: [
      'مشي قريب جدًا من الطبيعي',
      'قد يحتاج تعديل حذاء أو دعامة فقط',
      'عودة سريعة للحياة الطبيعية'
    ],
    image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=600&h=338&fit=crop',
    color: 'from-emerald-500 to-emerald-700'
  },
  {
    id: 'symes',
    name: 'بتر فوق الرسغ / سايم (Syme\'s Amputation)',
    category: 'lower',
    description: 'نوع خاص من بتر القدم عند مفصل الكاحل، يتميز بالقدرة على تحمل الوزن جزئيًا بدون طرف صناعي.',
    anatomyPoints: [
      'إزالة القدم مع الاحتفاظ بالكعب',
      'القدرة على تحمل الوزن جزئيًا بدون طرف',
      'الحفاظ على طول الساق'
    ],
    prostheticOptions: [
      'طرف صناعي بسيط نسبيًا',
      'تصميم خاص للسوكيت',
      'قدم صناعية منخفضة المستوى'
    ],
    functionalOutcomes: [
      'مشي مستقر',
      'استهلاك طاقة منخفض',
      'نتائج وظيفية جيدة جدًا'
    ],
    image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=600&h=338&fit=crop',
    color: 'from-emerald-500 to-emerald-700'
  },
  {
    id: 'transtibial',
    name: 'بتر ما تحت الركبة (Transtibial)',
    category: 'lower',
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
    image: 'https://www.choosept.com/globalassets/choosept/assets/guide-illustrations-images/below-knee-amputation-illustration_880x550.png',
    color: 'from-teal-500 to-teal-700'
  },
  {
    id: 'knee-disarticulation',
    name: 'بتر مفصل الركبة (Knee Disarticulation)',
    category: 'lower',
    description: 'فصل الساق عند مفصل الركبة بدون قطع عظم الفخذ، ويوفر نهاية قوية تتحمل الوزن.',
    anatomyPoints: [
      'الحفاظ على طول الفخذ بالكامل',
      'نهاية قوية تتحمل الوزن',
      'عدم الحاجة لقطع عظم الفخذ'
    ],
    prostheticOptions: [
      'ركبة صناعية خاصة',
      'سوكيت مميز يناسب شكل النهاية',
      'أنظمة ركبة متعددة المحاور'
    ],
    functionalOutcomes: [
      'استقرار عالي أثناء المشي',
      'تحكم أفضل من بتر فوق الركبة',
      'قدرة أفضل على تحمل الوزن'
    ],
    image: 'https://images.unsplash.com/photo-1559757175-5700dde675bc?w=600&h=338&fit=crop',
    color: 'from-teal-500 to-teal-700'
  },
  {
    id: 'transfemoral',
    name: 'بتر ما فوق الركبة (Transfemoral)',
    category: 'lower',
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
    image: 'https://www.choosept.com/globalassets/choosept/assets/guide-illustrations-images/above-knee-amputation-illustration_880x550.jpg',
    color: 'from-teal-500 to-teal-700'
  },
  {
    id: 'hip',
    name: 'بتر مفصل الورك (Hip Disarticulation)',
    category: 'lower',
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
    image: 'https://www.physio-pedia.com/images/thumb/b/b6/Engstrom-chp12-fig5.png/400px-Engstrom-chp12-fig5.png',
    color: 'from-teal-500 to-teal-700'
  },
  {
    id: 'hemipelvectomy',
    name: 'بتر ربع الحوض (Hemipelvectomy)',
    category: 'lower',
    description: 'من أعلى مستويات البتر السفلي، يشمل إزالة جزء من الحوض مع الطرف السفلي بالكامل.',
    anatomyPoints: [
      'إزالة جزء من الحوض مع الطرف السفلي',
      'تغيير كبير جدًا في التوازن',
      'فقدان مساحة كبيرة من الجسم ومركز الثقل'
    ],
    prostheticOptions: [
      'طرف كامل مع حوض اصطناعي',
      'أنظمة معقدة جدًا ومتخصصة',
      'أنظمة ورك وركبة وقدم متكاملة'
    ],
    functionalOutcomes: [
      'صعب جدًا وظيفيًا',
      'كثير من المرضى يعتمدون على الكرسي المتحرك',
      'يتطلب تأهيل مكثف وطويل الأمد'
    ],
    image: 'https://images.unsplash.com/photo-1559757175-5700dde675bc?w=600&h=338&fit=crop',
    color: 'from-red-500 to-red-700'
  },

  // ====== SPECIAL ======
  {
    id: 'bilateral',
    name: 'بتر ثنائي (Bilateral Amputation)',
    category: 'special',
    description: 'بتر في الطرفين (يدين أو رجلين أو مختلط)، يمثل تحديًا مضاعفًا يتطلب تأهيلًا مكثفًا.',
    anatomyPoints: [
      'أنواعه: ثنائي تحت الركبة، ثنائي فوق الركبة، مختلط',
      'توازن وحركة أصعب بشكل ملحوظ',
      'تغيير شامل في ميكانيكا الجسم'
    ],
    prostheticOptions: [
      'طرفين صناعيين متكاملين',
      'أنظمة توازن خاصة',
      'أجهزة مساعدة إضافية (عكازات / مشاية)'
    ],
    functionalOutcomes: [
      'احتياج لتأهيل مكثف ومطول',
      'ممكن الوصول لمستوى استقلال عالي مع التدريب',
      'نتائج تعتمد بشكل كبير على مستوى البتر والدافع الشخصي'
    ],
    image: 'https://images.unsplash.com/photo-1559757175-5700dde675bc?w=600&h=338&fit=crop',
    color: 'from-amber-500 to-amber-700'
  }
];

// Classification data
const upperLimbLevels = [
  'Partial Hand',
  'Wrist Disarticulation',
  'Transradial',
  'Transhumeral',
  'Shoulder Disarticulation'
];

const lowerLimbLevels = [
  'Partial Foot',
  "Syme's",
  'Transtibial',
  'Knee Disarticulation',
  'Transfemoral',
  'Hip Disarticulation',
  'Hemipelvectomy'
];

const categoryNames: Record<string, string> = {
  upper: 'الطرف العلوي',
  lower: 'الطرف السفلي',
  special: 'حالات خاصة'
};

const categoryIcons: Record<string, React.ReactNode> = {
  upper: <Hand className="h-6 w-6" />,
  lower: <Footprints className="h-6 w-6" />,
  special: <PersonStanding className="h-6 w-6" />
};

const AmputationLevels: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [expandedCard, setExpandedCard] = useState<string | null>(null);

  const filteredLevels = activeCategory === 'all'
    ? amputationLevels
    : amputationLevels.filter(l => l.category === activeCategory);

  return (
    <section id="amputation-levels" className="py-20 bg-gradient-to-b from-gray-50 via-white to-gray-50">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <div className="flex items-center justify-center gap-3 mb-4">
            <PersonStanding className="h-10 w-10 text-medical-600" />
            <h2 className="text-4xl font-bold bg-gradient-to-l from-medical-600 to-medical-800 bg-clip-text text-transparent">
              مستويات البتر
            </h2>
          </div>
          <p className="text-gray-500 text-lg max-w-2xl mx-auto">
            دليل شامل لجميع مستويات البتر مع خيارات الأطراف الصناعية والنتائج الوظيفية المتوقعة
          </p>
        </motion.div>

        {/* Category Filter Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.2 }}
          className="flex flex-wrap justify-center gap-3 mb-10"
        >
          {[
            { key: 'all', label: 'جميع المستويات', icon: <PersonStanding className="h-5 w-5" /> },
            { key: 'upper', label: 'الطرف العلوي', icon: <Hand className="h-5 w-5" /> },
            { key: 'lower', label: 'الطرف السفلي', icon: <Footprints className="h-5 w-5" /> },
            { key: 'special', label: 'حالات خاصة', icon: <PersonStanding className="h-5 w-5" /> }
          ].map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveCategory(tab.key)}
              className={`
                flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-semibold 
                transition-all duration-300 border-2
                ${activeCategory === tab.key
                  ? 'bg-medical-600 text-white border-medical-600 shadow-lg shadow-medical-600/30 scale-105'
                  : 'bg-white text-gray-600 border-gray-200 hover:border-medical-300 hover:text-medical-600 hover:bg-medical-50'
                }
              `}
            >
              {tab.icon}
              {tab.label}
            </button>
          ))}
        </motion.div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
          <AnimatePresence mode="popLayout">
            {filteredLevels.map((level, index) => (
              <motion.div
                key={level.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
              >
                <Card
                  className="overflow-hidden hover:shadow-xl transition-all duration-500 group cursor-pointer border-0 shadow-md"
                  onClick={() => setExpandedCard(expandedCard === level.id ? null : level.id)}
                >
                  {/* Image with Gradient Overlay */}
                  <div className="h-48 overflow-hidden relative">
                    <img
                      src={level.image}
                      alt={level.name}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className={`absolute inset-0 bg-gradient-to-t ${level.color} opacity-60`} />
                    {/* Category Badge */}
                    <div className="absolute top-3 right-3">
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-white/90 text-gray-700 backdrop-blur-sm shadow-sm">
                        {categoryIcons[level.category]}
                        {categoryNames[level.category]}
                      </span>
                    </div>
                    {/* Level Name on Image */}
                    <div className="absolute bottom-0 inset-x-0 p-4">
                      <h3 className="text-white font-bold text-lg drop-shadow-lg leading-tight">{level.name}</h3>
                    </div>
                  </div>

                  <CardHeader className="pb-2">
                    <CardDescription className="text-base text-gray-600 leading-relaxed">
                      {level.description}
                    </CardDescription>
                  </CardHeader>

                  <CardContent>
                    {/* Always visible: Anatomy */}
                    <div className="mb-4">
                      <h4 className="font-semibold text-medical-700 mb-2 flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-medical-500" />
                        التشريح والخصائص:
                      </h4>
                      <ul className="space-y-1.5 mr-4">
                        {level.anatomyPoints.map((point, idx) => (
                          <li key={idx} className="text-gray-600 text-sm flex items-start gap-2">
                            <span className="text-medical-400 mt-1.5 text-xs">●</span>
                            {point}
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Expandable sections */}
                    <AnimatePresence>
                      {expandedCard === level.id && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.3 }}
                          className="overflow-hidden"
                        >
                          <div className="mb-4">
                            <h4 className="font-semibold text-medical-700 mb-2 flex items-center gap-2">
                              <span className="w-2 h-2 rounded-full bg-emerald-500" />
                              خيارات الأطراف الصناعية:
                            </h4>
                            <ul className="space-y-1.5 mr-4">
                              {level.prostheticOptions.map((option, idx) => (
                                <li key={idx} className="text-gray-600 text-sm flex items-start gap-2">
                                  <span className="text-emerald-400 mt-1.5 text-xs">●</span>
                                  {option}
                                </li>
                              ))}
                            </ul>
                          </div>

                          <div>
                            <h4 className="font-semibold text-medical-700 mb-2 flex items-center gap-2">
                              <span className="w-2 h-2 rounded-full bg-amber-500" />
                              النتائج الوظيفية:
                            </h4>
                            <ul className="space-y-1.5 mr-4">
                              {level.functionalOutcomes.map((outcome, idx) => (
                                <li key={idx} className="text-gray-600 text-sm flex items-start gap-2">
                                  <span className="text-amber-400 mt-1.5 text-xs">●</span>
                                  {outcome}
                                </li>
                              ))}
                            </ul>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>

                    {/* Expand/Collapse Button */}
                    <button className="w-full mt-4 flex items-center justify-center gap-1 text-medical-600 text-sm font-medium hover:text-medical-800 transition-colors">
                      {expandedCard === level.id ? (
                        <>عرض أقل <ChevronUp className="h-4 w-4" /></>
                      ) : (
                        <>عرض المزيد <ChevronDown className="h-4 w-4" /></>
                      )}
                    </button>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* ============================================ */}
        {/* Classification Summary Section */}
        {/* ============================================ */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-20"
        >
          <div className="text-center mb-10">
            <h3 className="text-3xl font-bold text-gray-900 mb-3">تصنيف مستويات البتر</h3>
            <p className="text-gray-500">ترتيب مستويات البتر من الأقل إلى الأعلى لكل طرف</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {/* Upper Limb Classification */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="relative"
            >
              <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl p-6 border border-blue-200 shadow-lg">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-blue-700 flex items-center justify-center shadow-lg">
                    <Hand className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h4 className="text-xl font-bold text-blue-900">Upper Limb Amputation</h4>
                    <p className="text-blue-600 text-sm font-medium">بتر الطرف العلوي</p>
                  </div>
                </div>

                <div className="space-y-0">
                  {upperLimbLevels.map((level, index) => (
                    <div key={level} className="flex items-center gap-3">
                      <div className="flex flex-col items-center">
                        <div className={`
                          w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold
                          ${index === 0 ? 'bg-blue-200 text-blue-700' :
                            index === upperLimbLevels.length - 1 ? 'bg-blue-700 text-white' :
                              'bg-blue-400 text-white'}
                          shadow-md transition-transform hover:scale-110
                        `}>
                          {index + 1}
                        </div>
                        {index < upperLimbLevels.length - 1 && (
                          <div className="w-0.5 h-6 bg-gradient-to-b from-blue-300 to-blue-500" />
                        )}
                      </div>
                      <div className={`
                        flex-1 py-2 px-4 rounded-lg text-sm font-semibold transition-all duration-200
                        hover:bg-blue-200/50 cursor-default
                        ${index === 0 ? 'text-blue-600' :
                          index === upperLimbLevels.length - 1 ? 'text-blue-900 font-bold' :
                            'text-blue-700'}
                      `}>
                        {level}
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-4 flex items-center justify-center gap-2 text-blue-500 text-xs font-medium">
                  <ArrowDown className="h-4 w-4 animate-bounce" />
                  <span>من الأقل إلى الأعلى</span>
                  <ArrowDown className="h-4 w-4 animate-bounce" />
                </div>
              </div>
            </motion.div>

            {/* Lower Limb Classification */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="relative"
            >
              <div className="bg-gradient-to-br from-teal-50 to-teal-100 rounded-2xl p-6 border border-teal-200 shadow-lg">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-teal-500 to-teal-700 flex items-center justify-center shadow-lg">
                    <Footprints className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h4 className="text-xl font-bold text-teal-900">Lower Limb Amputation</h4>
                    <p className="text-teal-600 text-sm font-medium">بتر الطرف السفلي</p>
                  </div>
                </div>

                <div className="space-y-0">
                  {lowerLimbLevels.map((level, index) => (
                    <div key={level} className="flex items-center gap-3">
                      <div className="flex flex-col items-center">
                        <div className={`
                          w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold
                          ${index === 0 ? 'bg-teal-200 text-teal-700' :
                            index === lowerLimbLevels.length - 1 ? 'bg-teal-700 text-white' :
                              `bg-teal-${300 + Math.min(index, 3) * 100} text-white`}
                          shadow-md transition-transform hover:scale-110
                        `}>
                          {index + 1}
                        </div>
                        {index < lowerLimbLevels.length - 1 && (
                          <div className="w-0.5 h-6 bg-gradient-to-b from-teal-300 to-teal-500" />
                        )}
                      </div>
                      <div className={`
                        flex-1 py-2 px-4 rounded-lg text-sm font-semibold transition-all duration-200
                        hover:bg-teal-200/50 cursor-default
                        ${index === 0 ? 'text-teal-600' :
                          index === lowerLimbLevels.length - 1 ? 'text-teal-900 font-bold' :
                            'text-teal-700'}
                      `}>
                        {level}
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-4 flex items-center justify-center gap-2 text-teal-500 text-xs font-medium">
                  <ArrowDown className="h-4 w-4 animate-bounce" />
                  <span>من الأقل إلى الأعلى</span>
                  <ArrowDown className="h-4 w-4 animate-bounce" />
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default AmputationLevels;
