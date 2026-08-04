import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Activity, CheckCircle2, AlertTriangle, Zap, ShieldCheck,
  Battery, Droplets, ChevronRight, Calendar, Star, Award,
  Cpu, Wind, Waves, Cog, X, BarChart, ExternalLink
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

interface KneeProduct {
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
  flexionAngle?: string;
  waterproof?: string;
  battery?: string;
  warranty?: string;
  material?: string;
  buildHeight?: string;
  techHighlight?: string;
  indications?: string[];
}

const kneeProducts: KneeProduct[] = [
  // === الركب الميكانيكية ===
  {
    id: 'single-axis',
    name: 'الركبة أحادية المحور (Single-Axis Knee)',
    brand: 'Blatchford / Össur',
    type: 'ميكانيكية',
    description: 'تصميم ميكانيكي متين يعتمد على مفصل أحادي المحور مع آلية قفل ميكانيكي أو قفل بحمل الوزن. توفر ثباتاً وأماناً أثناء الوقوف وتعد خياراً اقتصادياً وموثوقاً في المراحل الأولى من التأهيل.',
    features: [
      'تصميم بسيط ومتين للغاية وقليل الأعطال',
      'وزن خفيف يقلل الإجهاد العضلي أثناء الحركة',
      'سهولة العناية والصيانة الدورية منخفضة التكلفة',
      'قفل يدوي اختياري لمنع انثناء الركبة المفاجئ'
    ],
    limitations: [
      'عدم المرونة على الأسطح غير المستوية',
      'لا تتكيف ذاتياً مع سرعة المشي المتغيرة',
      'تتطلب جهداً عضلياً أكبر من الفخذ للتحكم',
      'احتمال التعثر عند وضع ثقل الجسم بشكل غير دقيق'
    ],
    activityLevel: 'منخفض إلى متوسط',
    kLevel: 'K1 - K2',
    price: 'تبدأ من 8,000 ج.م',
    image: 'https://stngco.com/wp-content/uploads/2022/03/1318_Angle_Web.jpg',
    weight: '350 - 500 جرام',
    maxUserWeight: '125 كجم',
    flexionAngle: '120°',
    waterproof: 'مقاومة للرطوبة السطحية',
    warranty: 'سنة واحدة',
    material: 'سبائك ألومنيوم طيران عالية الصلابة',
    techHighlight: 'Manual Lock / Weight-Activated Stance Lock',
    indications: ['بتر فوق الركبة للمراحل الأولى من العلاج الطبيعي', 'المسنون ذوو الحركة المحدودة داخل المنزل', 'التأهيل الأولي للمشي']
  },
  {
    id: 'polycentric',
    name: 'الركبة متعددة المحاور 3R106 (Polycentric 4-Bar Knee)',
    brand: 'Ottobock / Össur',
    type: 'ميكانيكية متعددة المحاور',
    description: 'تستخدم نظام وصلات رباعية المحاور (4-Bar Linkage) يوفر استقراراً هندسياً فائقاً أثناء مرحلة الدوس، وقصراً تلقائياً لطول الطرف أثناء مرحلة التأرجح لمنع اصطدام القدم بالأرض.',
    features: [
      'استقرار هندسي ممتاز عند نقل وزن الجسم (Loading Response)',
      'قصر طول الطرف أثناء التأرجح يمنع تعثر الأصابع بالأرض',
      'تقليل ارتفاع المفصل عند الجلوس لراحة وسلاسة أكبر',
      'مناسبة جداً لبتر مفصل الركبة (Knee Disarticulation) والبتر القصير'
    ],
    limitations: [
      'أثقل وزناً بحكم وجود وصلات ومحاور إضافية',
      'تصميم ميكانيكي يتطلب مراجعة صيانة دورية',
      'لا تتيح التكيف الآلي مع الأنشطة الرياضية السريعة'
    ],
    activityLevel: 'متوسط',
    kLevel: 'K2 - K3',
    price: 'تبدأ من 15,000 ج.م',
    image: 'https://www.ottobock.com/_next/image?url=https%3A%2F%2Fres.cloudinary.com%2Fottobock-se%2Fimage%2Fupload%2Far_1%3A1%2Cb_white%2Cc_fill%2Cg_auto%2Cw_930%2Ff_avif%2Fv1%2FProduct-Management%2FLower%2520limb%2520prosthetics%2FKnee%2520joints%2FMechanical%2520knee%2520joints%2F3R106%2F3R106%2520-%2520Polycentric%2520Modular%2520Knee%2520Joint%2FImages-product%2F1To1-1437968%3F_a%3DBAMCkGiu0&w=1600&q=75',
    weight: '550 - 750 جرام',
    maxUserWeight: '136 كجم',
    flexionAngle: '150° - 165°',
    waterproof: 'مقاومة للرطوبة',
    warranty: 'سنتين',
    material: 'ألومنيوم مقوى + محاور تيتانيوم',
    techHighlight: '4-Bar Kinematic Center of Rotation',
    indications: ['بتر مفصل الركبة (Knee Disarticulation)', 'بتر الفخذ القصير', 'الحاجة لأقصى ثبات ميكانيكي أثناء الوقوف']
  },
  // === الركب الهيدروليكية الميكانيكية ===
  {
    id: '3r80-hydraulic',
    name: 'الركبة الهيدروليكية 3R80 المقاومة للماء',
    brand: 'Ottobock',
    type: 'هيدروليكية ميكانيكية',
    description: 'واحدة من أشهر ركب Ottobock الهيدروليكية الميكانيكية. تتميز بمقاومة كاملة للماء حتى عمق 3 أوقات (IP68) وقفل يدوي للوقوف في الماء، مع هيدروليك مزدوج للتحكم المستقل في مرحلتي الوقوف والتأرجح.',
    features: [
      'مقاومة كاملة للماء والسباحة والشاطئ (IP68 Waterproof)',
      'قفل يدوي للثبات التام أثناء الوقوف في المياه أو العمل',
      'تحكم هيدروليكي مستقل بمرحلتي الوقوف والتأرجح',
      'تحمل عالي لأوزان تصل إلى 150 كجم في الأنشطة الخارجية'
    ],
    limitations: [
      'وزن أثقل نسبياً مقارنة بالأحادية',
      'غير محوسبة (لا تحتوي على مستشعرات إلكترونية)'
    ],
    activityLevel: 'متوسط إلى عالي',
    kLevel: 'K3 - K4',
    price: 'تبدأ من 55,000 ج.م',
    image: 'https://www.ottobock.com/_next/image?url=https%3A%2F%2Fres.cloudinary.com%2Fottobock-se%2Fimage%2Fupload%2Far_1%3A1%2Cb_white%2Cc_fill%2Cg_auto%2Cw_930%2Ff_avif%2Fv1%2FProduct-Management%2FLower%2520limb%2520prosthetics%2FKnee%2520joints%2FMechanical%2520knee%2520joints%2F3R80%2F3R80%2520-%2520Modular%2520Knee%2520Joint%2520with%2520Rotary%2520Hydraulic%2FImages-product%2F1To1-5125811%3F_a%3DBAMCkGiu0&w=1600&q=75',
    weight: '1.25 كجم (1250 جرام)',
    maxUserWeight: '150 كجم',
    flexionAngle: '150°',
    waterproof: 'IP68 (مقاومة غمر كامل بالماء حتى 3 أمتار)',
    warranty: '3 سنوات',
    material: 'سبائك ألومنيوم طيران + مكابس هيدروليكية دقيقة',
    techHighlight: 'Rotational Hydraulics + Manual Water Lock',
    indications: ['المشي في الماء والسباحة والشاطئ (IP68)', 'العمل في البيئات الرطبة والخارجية', 'الأنشطة الميدانية']
  },
  // === الركب المحوسبة (Mechatronic Knees) ===
  {
    id: 'kenevo-3c60',
    name: 'Kenevo 3C60 (Ottobock)',
    brand: 'Ottobock',
    type: 'محوسبة (Microprocessor)',
    description: 'ركبة محوسبة ذكية مخصصة لكبار السن والمرضى في مستويات النشاط المحدودة (K1-K2). توفر حماية فائقة ضد السقوط مع أوضاع مساعدة خاصة للقيام من الكرسي، الجلوس الآمن، واستخدام الكرسي المتحرك وركوب الدراجة الثابتة.',
    features: [
      'مصممة خصيصاً لمستوى النشاط K1-K2 وتأهيل كبار السن',
      'أوضاع متعددة (A, B, B+, C) للنمو مع مستوى تعافي المريض',
      'مساعدة آلية عند القيام والجلوس على الكرسي (Chair Stand Assist)',
      'وضع الكرسي المتحرك (Wheelchair Mode) لمنع انثناء الركبة الضار',
      'استعادة التوازن المتقدمة Stumble Recovery Plus'
    ],
    limitations: [
      'غير مخصصة للأنشطة السريعة أو الجري',
      'تصنيف ماء IP54 (مقاومة للرش فقط وليست للغمر)'
    ],
    activityLevel: 'منخفض إلى متوسط',
    kLevel: 'K1 - K2',
    price: 'تبدأ من 140,000 ج.م',
    image: 'https://www.ottobock.com/_next/image?url=https%3A%2F%2Fres.cloudinary.com%2Fottobock-se%2Fimage%2Fupload%2Far_1%3A1%2Cb_white%2Cc_fill%2Cg_auto%2Cw_930%2Ff_avif%2Fv1%2FProduct-Management%2FLower%2520limb%2520prosthetics%2FKnee%2520joints%2FMechatronic%2520knee%2520joints%2FKenevo%2F3C60%2520-%2520Kenevo%2FImages-product%2F187118%2F5169413%3F_a%3DBAMCkGiu0&w=1600&q=75',
    weight: '920 جرام (خفيفة جداً للركب المحوسبة)',
    maxUserWeight: '150 كجم',
    flexionAngle: '124°',
    waterproof: 'IP54 (مقاومة للرش والأتربة)',
    battery: 'بطارية تدوم حتى يومين من الاستخدام',
    warranty: '3 سنوات',
    material: 'هيكل كربوني فائق الخفة + معالج Kenevo الذكي',
    techHighlight: 'Kenevo Activity Modes (A-C) + Sitting Assist',
    indications: ['كبار السن وحالات البتر المتقدمة حديثاً (K1-K2)', 'الحاجة لأقصى دعم عند الجلوس والقيام من الكرسي', 'منع السقوط']
  },
  {
    id: 'rheo-knee-xc',
    name: 'Rheo Knee XC (Össur)',
    brand: 'Össur',
    type: 'محوسبة (Microprocessor)',
    description: 'الركبة المحوسبة الرائدة من شركة Össur العالمية. تستخدم تقنية السائل المغناطيسي (Magnetorheologic Fluid) المزودة بمستشعرات ذكية تقرأ الحركة 1000 مرة في الثانية لتغيير المقاومة فورياً.',
    features: [
      'تقنية Magnetorheologic تغير المقاومة في أجزاء من الألف من الثانية',
      'تستشعر الجلوس والوقوف والمشي والمنحدرات والسلالم تلقائياً',
      'وضعيات ذكية مخصصة لركوب الدراجات (Cycling Mode)',
      'نظام استعادة التوازن الآلي (Stumble Recovery) لمنع السقوط',
      'تطبيق Össur Logic للبلوتوث للمتابعة والتحكم والتمارين'
    ],
    limitations: [
      'تكلفة متقدمة',
      'تحتاج شحن البطارية كل 3 أيام',
      'تصنيف مقاومة ماء IP34 (مقاومة للرش والماء العذب فقط)'
    ],
    activityLevel: 'متوسط إلى عالي جداً',
    kLevel: 'K2 - K4',
    price: 'تبدأ من 180,000 ج.م',
    image: 'https://media.ossur.com/ossur-dam/image/upload/w_1920/f_auto,q_auto,w_1400,h_1400,c_pad/spim/134_fe7abe7a-a38d-43ae-9aee-3db5303a0581',
    weight: '1.6 كجم (1600 جرام)',
    maxUserWeight: '136 كجم (تأثير متوسط) / 110 كجم (تأثير عالي)',
    flexionAngle: '120°',
    waterproof: 'IP34 (مقاوم للرش والماء العذب)',
    battery: 'بطارية ليثيوم أيون تدوم 3 أيام متواصلة',
    warranty: '3 سنوات كاملة',
    material: 'إطار كربوني + ألومنيوم طيران + سائل مغناطيسي',
    buildHeight: '236 مم',
    techHighlight: 'Magnetorheologic Real-Time Adaptive Control',
    indications: ['بتر فوق الركبة للمستخدمين الراغبين بأحدث التقنيات', 'الحاجة لأقصى درجات الحماية ضد السقوط والتعثر', 'ركوب الدراجات والرياضة']
  },
  {
    id: 'c-leg-4',
    name: 'C-Leg 4 (Ottobock)',
    brand: 'Ottobock',
    type: 'محوسبة (Microprocessor)',
    description: 'الجيل الرابع من ركبة C-Leg الشهيرة عالمياً من Ottobock. المعيار الذهبي للركب المحوسبة التي تضمن استقراراً كاملاً ومقاومة غمر كلي في الماء (IP68 Waterproof).',
    features: [
      'معالج إلكتروني مزدوج يقرأ الحركة ويتكيف تلقائياً مع خطوتك',
      'مقاومة كاملة للماء IP68 (يمكن غمرها بالكامل في الماء والشاطئ)',
      'أغلاق حماية ومقاومة التعثر المتقدمة Stumble Recovery Plus',
      'حتى 5 أوضاع تشغيل مخصصة (MyModes) للرياضة والعمل والقيادة',
      'نزول الدرج بطريقة سلسة وآمنة تماماً'
    ],
    limitations: [
      'تكلفة متقدمة',
      'تتطلب صيانة دورية كل 18 شهراً من مراكز Ottobock المعتمدة'
    ],
    activityLevel: 'متوسط إلى عالي',
    kLevel: 'K2 - K4',
    price: 'تبدأ من 220,000 ج.م',
    image: 'https://luxmedprotez.com/wp-content/uploads/ottobock-c-leg-4.jpg',
    weight: '1.16 كجم (1160 جرام)',
    maxUserWeight: '136 كجم',
    flexionAngle: '130°',
    waterproof: 'IP68 (مقاومة كلياً للغمر بالماء حتى عمق 3 أمتار)',
    battery: 'بطارية ليثيوم أيون تدوم حتى 5 أيام',
    warranty: '3 سنوات',
    material: 'هيكل كربوني فائق الخفة + هيدروليك محوسب',
    buildHeight: '218 مم',
    techHighlight: 'Microprocessor Hydraulic Control + IP68 Waterproof',
    indications: ['الاستحمام والسباحة والأنشطة المائية (IP68)', 'الحياة اليومية المزدحمة بسلامة وأمان تام', 'نزول الدرج والمنحدرات بثقة']
  },
  {
    id: 'genium-3b1',
    name: 'Genium 3B1-3 (Ottobock)',
    brand: 'Ottobock',
    type: 'محوسبة (Microprocessor)',
    description: 'الركبة المحوسبة التي وضعت معايير الحركة الفسيولوجية (OPG 2.0). تتيح للمستخدم المشي للخلف، نزول العوائق والسلالم بسلاسة طبيعية، والوقوف التلقائي المتوازن بدقة عالية.',
    features: [
      'نمط الحركة الفسيولوجي الطبيعي OPG 2.0 (Optimized Physiological Gait)',
      'إمكانية المشي إلى الخلف بثبات تكتيكي كامل (Backward Walking)',
      'الوقوف التلقائي المتوازن (Intuitive Stance)',
      'نزول الدرج والمنحدرات بحركة تحاكي الحركة الطبيعية 100%',
      'تطبيق Cockpit للتحكم عبر الهاتف المحمول'
    ],
    limitations: [
      'فئة سعرية متقدمة',
      'مقاومة ماء IP67 (مقاومة للغمر المؤقت فقط)'
    ],
    activityLevel: 'عالي',
    kLevel: 'K3 - K4',
    price: 'تبدأ من 280,000 ج.م',
    image: 'https://www.ottobock.com/_next/image?url=https%3A%2F%2Fres.cloudinary.com%2Fottobock-se%2Fimage%2Fupload%2Far_1%3A1%2Cb_white%2Cc_fill%2Cg_auto%2Cw_930%2Ff_avif%2Fv1%2FProduct-Management%2FLower%2520limb%2520prosthetics%2FKnee%2520joints%2FMechatronic%2520knee%2520joints%2FGenium%2F3B1-3%2520-%2520Genium%2FImages-product%2F1To1-2254128%3F_a%3DBAMCkGiu0&w=1600&q=75',
    weight: '1.4 كجم (1400 جرام)',
    maxUserWeight: '150 كجم',
    flexionAngle: '135°',
    waterproof: 'IP67 (مقاومة للماء والغمر المؤقت)',
    battery: 'بطارية ليثيوم أيون تدوم 5 أيام',
    warranty: '3 سنوات',
    material: 'ألومنيوم معالج بالأكسدة + ألياف الكربون',
    buildHeight: '232 مم',
    techHighlight: 'OPG 2.0 Gait Dynamics + Intuitive Stance',
    indications: ['المستخدمون النشطون الراغبون بمشية طبيعية تماماً', 'المشي للخلف ونزول السلالم والعوائق']
  },
  {
    id: 'genium-x3',
    name: 'Genium X3 (Ottobock)',
    brand: 'Ottobock',
    type: 'محوسبة (Microprocessor)',
    description: 'أقوى ركبة محوسبة في العالم من Ottobock. مصممة للرياضيين والمستخدمين فائقي النشاط لممارسة الجري والتسلق والصيد والسباحة وصعود الدرج خطوة بخطوة بحرية مطلقة.',
    features: [
      'وضع Walk-to-Run للجري والتنقل التلقائي بين السرعات',
      'صعود السلالم خطوة بخطوة بالتناوب (Step-over-Step Stair Ascent)',
      'مقاومة فائقة للماء العذب والمالح والكلور والأتربة والرمال (IP68)',
      'نظام الحركة الفسيولوجي المطور OPG 2.0 لمشية طبيعية 100%',
      'متانة هائلة تتحمل حتى وزن 150 كجم في الأنشطة العنيفة'
    ],
    limitations: [
      'أعلى فئة سعرية في العالم',
      'تحتاج صيانة دورية متخصصة من Ottobock'
    ],
    activityLevel: 'عالي جداً',
    kLevel: 'K3 - K4',
    price: 'تبدأ من 350,000 ج.م',
    image: 'https://www.ottobock.com/_next/image?url=https%3A%2F%2Fres.cloudinary.com%2Fottobock-se%2Fimage%2Fupload%2Far_1%3A1%2Cb_white%2Cc_fill%2Cg_auto%2Cw_930%2Ff_avif%2Fv1%2FProduct-Management%2FLower%2520limb%2520prosthetics%2FKnee%2520joints%2FMechatronic%2520knee%2520joints%2FGenium%2520X3%2F3B5-3%2520-%2520Genium%2520X3%2FImages-product%2F1To1-2066639%3F_a%3DBAMCkGiu0&w=1600&q=75',
    weight: '1.9 كجم (1900 جرام)',
    maxUserWeight: '150 كجم',
    flexionAngle: '130°',
    waterproof: 'IP68 (مقاومة تامة في كافة الظروف البيئية والبحرية)',
    battery: 'بطارية ليثيوم أيون تدوم 5 أيام',
    warranty: '3 سنوات + خيارات ضمان ممتد',
    material: 'تيتانيوم طبقي + ألومنيوم معالج بالأكسدة + كربون',
    buildHeight: '246 مم',
    techHighlight: 'OPG 2.0 + Walk-to-Run + Military Waterproofing',
    indications: ['الرياضة والجري وصعود الدرج بالتناوب', 'البيئات الصعبة (الصحراء، المطر، البحر، الجبال)', 'أقصى درجات الحرية الحركية']
  }
];

const typeColors: Record<string, { bg: string; text: string; border: string; icon: React.ReactNode }> = {
  'ميكانيكية': { bg: 'bg-slate-100', text: 'text-slate-800', border: 'border-slate-200', icon: <Cog className="w-3.5 h-3.5" /> },
  'ميكانيكية متعددة المحاور': { bg: 'bg-amber-50', text: 'text-amber-800', border: 'border-amber-200', icon: <Cog className="w-3.5 h-3.5" /> },
  'هوائية': { bg: 'bg-sky-50', text: 'text-sky-800', border: 'border-sky-200', icon: <Wind className="w-3.5 h-3.5" /> },
  'هيدروليكية': { bg: 'bg-blue-50', text: 'text-blue-800', border: 'border-blue-200', icon: <Waves className="w-3.5 h-3.5" /> },
  'هيدروليكية ميكانيكية': { bg: 'bg-teal-50', text: 'text-teal-800', border: 'border-teal-200', icon: <Droplets className="w-3.5 h-3.5" /> },
  'محوسبة (Microprocessor)': { bg: 'bg-violet-50', text: 'text-violet-800', border: 'border-violet-200', icon: <Cpu className="w-3.5 h-3.5" /> },
};

const KneeTypes: React.FC = () => {
  const [selectedKnee, setSelectedKnee] = useState<KneeProduct | null>(null);
  const [activeFilter, setActiveFilter] = useState<string>('all');

  const filteredProducts = activeFilter === 'all'
    ? kneeProducts
    : kneeProducts.filter(p => p.type === activeFilter);

  return (
    <section id="knee-types" className="py-20 bg-gradient-to-b from-white via-slate-50/50 to-white">
      <div className="container mx-auto px-4 max-w-7xl">
        {/* Section Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 py-1.5 px-4 bg-medical-50 text-medical-800 rounded-full text-xs font-bold mb-4 border border-medical-100">
            <Activity className="h-4 w-4 text-medical-600" />
            <span>كتالوج الركب الصناعية المعتمدة من Ottobock & Össur</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 font-cairo mb-3">
            موسوعة الركب الصناعية والأنظمة المحوسبة الذكية
          </h2>
          <p className="text-sm sm:text-base text-gray-500 max-w-2xl mx-auto font-medium">
            مقارنة شاملة ودليل توضيحي لكافة أنواع الركب (Ottobock Kenevo, C-Leg 4, Genium, Genium X3, 3R80 & Össur Rheo Knee XC) بالصور الرسمية والمواصفات المعتمدة.
          </p>
        </div>

        {/* Filter Tabs */}
        <div className="flex items-center justify-center gap-2 flex-wrap mb-10">
          {[
            { id: 'all', label: 'جميع الأنواع (8)' },
            { id: 'ميكانيكية', label: 'أحادية المحور' },
            { id: 'ميكانيكية متعددة المحاور', label: 'متعددة المحاور (4-Bar)' },
            { id: 'هوائية', label: 'هوائية' },
            { id: 'هيدروليكية ميكانيكية', label: 'هيدروليكية مقاومة للماء (3R80)' },
            { id: 'محوسبة (Microprocessor)', label: 'محوسبة ذكية (MPK)' }
          ].map((f) => (
            <button
              key={f.id}
              onClick={() => setActiveFilter(f.id)}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all duration-300 ${activeFilter === f.id
                ? 'bg-medical-700 text-white shadow-md scale-105'
                : 'bg-white text-gray-700 border border-gray-200 hover:bg-gray-50'
                }`}
            >
              {f.label}
            </button>
          ))}
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-7">
          {filteredProducts.map((knee, idx) => {
            const typeStyle = typeColors[knee.type] || typeColors['ميكانيكية'];
            return (
              <motion.div
                key={knee.id}
                className="bg-white rounded-3xl overflow-hidden border border-gray-200/80 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between group"
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: idx * 0.07 }}
                viewport={{ once: true }}
              >
                {/* Image & Badges */}
                <div className="relative h-64 bg-gradient-to-b from-slate-50 to-white flex items-center justify-center p-4 overflow-hidden">
                  <img
                    src={knee.image}
                    alt={knee.name}
                    className="max-h-56 object-contain group-hover:scale-105 transition-transform duration-500"
                    onError={(e) => {
                      e.currentTarget.src = 'https://4.imimg.com/data4/PJ/HE/MY-23855591/single-axis-knee-1000x1000.jpg';
                    }}
                  />
                  {/* Type Badge */}
                  <div className={`absolute top-3 right-3 ${typeStyle.bg} ${typeStyle.text} ${typeStyle.border} border font-bold text-[10px] px-3 py-1 rounded-full flex items-center gap-1 shadow-2xs`}>
                    {typeStyle.icon}
                    <span>{knee.type}</span>
                  </div>
                  {/* Brand Badge */}
                  <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-xs text-gray-700 font-bold text-[10px] px-3 py-1 rounded-full border border-gray-200 shadow-2xs">
                    {knee.brand}
                  </div>
                  {/* Price Badge */}
                  <div className="absolute bottom-3 right-3 bg-medical-700 text-white font-bold text-xs px-3 py-1 rounded-full shadow-md">
                    {knee.price}
                  </div>
                </div>

                {/* Card Content */}
                <div className="p-5 flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="font-extrabold text-lg text-gray-900 mb-1 font-cairo group-hover:text-medical-700 transition-colors">
                      {knee.name}
                    </h3>
                    <p className="text-xs text-gray-600 line-clamp-3 leading-relaxed mb-4 font-medium">
                      {knee.description}
                    </p>

                    {/* Quick Specs Row */}
                    <div className="grid grid-cols-3 gap-2 mb-4">
                      <div className="bg-slate-50 rounded-xl p-2 text-center border border-slate-100">
                        <span className="text-[10px] text-gray-500 block">مستوى النشاط</span>
                        <span className="text-xs font-bold text-gray-800">{knee.kLevel}</span>
                      </div>
                      <div className="bg-slate-50 rounded-xl p-2 text-center border border-slate-100">
                        <span className="text-[10px] text-gray-500 block">الوزن</span>
                        <span className="text-xs font-bold text-gray-800">{knee.weight?.split(' ')[0]}</span>
                      </div>
                      <div className="bg-slate-50 rounded-xl p-2 text-center border border-slate-100">
                        <span className="text-[10px] text-gray-500 block">زاوية الثني</span>
                        <span className="text-xs font-bold text-gray-800">{knee.flexionAngle}</span>
                      </div>
                    </div>

                    {/* Top Features */}
                    <div className="space-y-1.5 pt-2 border-t border-gray-100">
                      {knee.features.slice(0, 3).map((feat, fIdx) => (
                        <div key={fIdx} className="flex items-start gap-1.5 text-xs text-gray-700">
                          <CheckCircle2 className="w-3.5 h-3.5 text-medical-600 flex-shrink-0 mt-0.5" />
                          <span className="line-clamp-1 font-medium">{feat}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Card Footer */}
                  <div className="mt-5">
                    <Button
                      onClick={() => setSelectedKnee(knee)}
                      className="w-full bg-medical-50 hover:bg-medical-700 text-medical-700 hover:text-white font-bold rounded-xl text-xs py-2.5 transition-all duration-300 border border-medical-200"
                    >
                      عرض المواصفات الكاملة
                      <ChevronRight className="w-4 h-4 mr-1 rtl:rotate-180" />
                    </Button>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* K-Level Activity Scale */}
        <div className="mt-16 bg-white p-6 sm:p-8 rounded-3xl border border-gray-200 shadow-xs">
          <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2 font-cairo">
            <Zap className="h-5 w-5 text-medical-700" />
            دليل مستوى النشاط (K-Level) لاختيار الركبة المناسبة
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { level: 'K1', title: 'داخلي', desc: 'حركة داخل المنزل، سرعة ثابتة فقط (مناسب لـ Kenevo & Single-Axis).', color: 'bg-gray-100 text-gray-800 border-gray-200' },
              { level: 'K2', title: 'خارجي محدود', desc: 'حركة خارجية على أسطح مستوية وعوائق بسيطة (مناسب لـ Kenevo & Polycentric).', color: 'bg-sky-50 text-sky-800 border-sky-200' },
              { level: 'K3', title: 'نشط', desc: 'حركة خارجية واسعة بسرعات متغيرة ومنحدرات (مناسب لـ C-Leg 4 & Rheo XC & 3R80).', color: 'bg-medical-50 text-medical-800 border-medical-200' },
              { level: 'K4', title: 'نشط للغاية', desc: 'رياضة، جري، صعود درج، أنشطة عنيفة (مناسب لـ Genium X3 & Genium).', color: 'bg-violet-50 text-violet-800 border-violet-200' }
            ].map((k) => (
              <div key={k.level} className={`p-4 rounded-2xl border ${k.color}`}>
                <div className="font-black text-xl mb-1">{k.level}</div>
                <div className="text-sm font-bold mb-1">{k.title}</div>
                <p className="text-xs font-medium opacity-80">{k.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Detail Modal */}
      <AnimatePresence>
        {selectedKnee && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm" onClick={() => setSelectedKnee(null)}>
            <motion.div
              className="bg-white rounded-3xl max-w-3xl w-full max-h-[90vh] overflow-y-auto shadow-2xl p-6 sm:p-8 font-cairo"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Modal Header */}
              <div className="flex items-start justify-between mb-4">
                <div>
                  <div className="flex items-center gap-2 mb-2 flex-wrap">
                    {(() => {
                      const ts = typeColors[selectedKnee.type] || typeColors['ميكانيكية'];
                      return (
                        <span className={`${ts.bg} ${ts.text} ${ts.border} border font-bold text-[10px] px-3 py-1 rounded-full flex items-center gap-1`}>
                          {ts.icon} {selectedKnee.type}
                        </span>
                      );
                    })()}
                    <span className="bg-gray-100 text-gray-700 font-bold text-[10px] px-3 py-1 rounded-full border border-gray-200">
                      {selectedKnee.brand}
                    </span>
                  </div>
                  <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900 font-cairo">
                    {selectedKnee.name}
                  </h2>
                </div>
                <button onClick={() => setSelectedKnee(null)} className="p-2 hover:bg-gray-100 rounded-xl transition-colors">
                  <X className="w-5 h-5 text-gray-500" />
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                {/* Product Image */}
                <div className="bg-slate-50 rounded-2xl p-4 flex items-center justify-center border border-gray-200 min-h-[280px]">
                  <img src={selectedKnee.image} alt={selectedKnee.name} className="max-h-64 object-contain" />
                </div>

                {/* Key Info */}
                <div className="space-y-3">
                  <p className="text-xs sm:text-sm text-gray-700 leading-relaxed font-medium">{selectedKnee.description}</p>

                  <div className="bg-medical-50 p-3 rounded-xl border border-medical-100 flex items-center justify-between">
                    <span className="text-xs font-bold text-gray-600">السعر التقديري:</span>
                    <span className="text-sm font-black text-medical-800">{selectedKnee.price}</span>
                  </div>

                  {selectedKnee.techHighlight && (
                    <div className="bg-violet-50 p-3 rounded-xl border border-violet-100 flex items-center gap-2">
                      <Cpu className="w-4 h-4 text-violet-600 flex-shrink-0" />
                      <div>
                        <span className="text-[10px] text-violet-600 block font-bold">التقنية الأساسية:</span>
                        <span className="text-xs text-violet-900 font-bold">{selectedKnee.techHighlight}</span>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Technical Specs Grid */}
              <div className="bg-slate-50 rounded-2xl p-4 sm:p-5 border border-slate-200 mb-6">
                <h4 className="text-sm font-bold text-gray-900 mb-3 font-cairo flex items-center gap-2">
                  <BarChart className="w-4 h-4 text-medical-600" />
                  المواصفات التقنية الكاملة
                </h4>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {[
                    { label: 'الوزن', val: selectedKnee.weight, icon: <Activity className="w-3 h-3" /> },
                    { label: 'أقصى وزن مستخدم', val: selectedKnee.maxUserWeight, icon: <ShieldCheck className="w-3 h-3" /> },
                    { label: 'زاوية الثني', val: selectedKnee.flexionAngle, icon: <Zap className="w-3 h-3" /> },
                    { label: 'مقاومة الماء', val: selectedKnee.waterproof, icon: <Droplets className="w-3 h-3" /> },
                    { label: 'الضمان', val: selectedKnee.warranty, icon: <Award className="w-3 h-3" /> },
                    { label: 'خامة التصنيع', val: selectedKnee.material, icon: <Star className="w-3 h-3" /> },
                    ...(selectedKnee.battery ? [{ label: 'البطارية', val: selectedKnee.battery, icon: <Battery className="w-3 h-3" /> }] : []),
                    ...(selectedKnee.buildHeight ? [{ label: 'ارتفاع البناء', val: selectedKnee.buildHeight, icon: <Zap className="w-3 h-3" /> }] : []),
                  ].filter(s => s.val).map((spec, i) => (
                    <div key={i} className="bg-white rounded-xl p-3 border border-gray-100 shadow-2xs">
                      <div className="flex items-center gap-1 text-[10px] text-gray-500 font-bold mb-1">
                        {spec.icon} {spec.label}
                      </div>
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
                    {selectedKnee.features.map((f, i) => (
                      <div key={i} className="flex items-start gap-2 bg-emerald-50 p-2 rounded-lg border border-emerald-100 text-xs text-gray-800 font-medium">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0 mt-0.5" />
                        <span>{f}</span>
                      </div>
                    ))}
                  </div>
                </div>
                <div>
                  <h4 className="text-sm font-bold text-gray-900 mb-2 flex items-center gap-1.5 font-cairo">
                    <AlertTriangle className="w-4 h-4 text-amber-500" /> التحديات والقيود
                  </h4>
                  <div className="space-y-1.5">
                    {selectedKnee.limitations.map((l, i) => (
                      <div key={i} className="flex items-start gap-2 bg-amber-50 p-2 rounded-lg border border-amber-100 text-xs text-gray-800 font-medium">
                        <AlertTriangle className="w-3.5 h-3.5 text-amber-500 flex-shrink-0 mt-0.5" />
                        <span>{l}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Indications */}
              {selectedKnee.indications && selectedKnee.indications.length > 0 && (
                <div className="mb-6">
                  <h4 className="text-sm font-bold text-gray-900 mb-2 font-cairo">أبرز الدواعي الطبية لهذا المنتج:</h4>
                  <div className="flex flex-wrap gap-1.5">
                    {selectedKnee.indications.map((ind, i) => (
                      <span key={i} className="bg-medical-50 text-medical-800 text-xs font-bold px-3 py-1 rounded-lg border border-medical-100">
                        {ind}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* CTA */}
              <div className="pt-4 border-t border-gray-200 flex flex-col sm:flex-row gap-3 justify-end">
                <Button variant="outline" onClick={() => setSelectedKnee(null)} className="rounded-xl font-bold text-xs">
                  إغلاق النافذة
                </Button>
                <Link to="/booking" onClick={() => setSelectedKnee(null)}>
                  <Button className="w-full sm:w-auto bg-medical-700 hover:bg-medical-800 text-white font-bold rounded-xl text-xs px-6 py-2.5">
                    حجز موعد استشارة وقياس
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

export default KneeTypes;
