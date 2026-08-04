import React, { useState, useRef } from 'react';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import {
  Activity, CheckCircle2, AlertTriangle, Zap, ShieldCheck,
  Battery, Droplets, ChevronRight, Calendar, Star, Award,
  Cpu, Wind, Waves, Cog, X, BarChart, Gauge, Heart, Footprints,
  TrendingUp, Mountain, ArrowUpRight, Layers, Sparkles
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

/* ─────────────── Interfaces ─────────────── */
interface KneeProduct {
  id: string;
  name: string;
  brand: string;
  type: string;
  typeShort: string;
  description: string;
  features: string[];
  limitations: string[];
  kLevel: string;
  kLevelNums: number[];
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
  highlight?: boolean;
}

interface RecommendedPair {
  kneeName: string;
  kneeImage: string;
  footName: string;
  footImage: string;
  pairTitle: string;
  pairReason: string;
  idealFor: string;
}

/* ─────────────── Knee Data ─────────────── */
const kneeProducts: KneeProduct[] = [
  {
    id: 'single-axis',
    name: 'الركبة أحادية المحور (Single-Axis Knee)',
    brand: 'Blatchford / Össur',
    type: 'ميكانيكية',
    typeShort: 'أحادية المحور',
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
      'تتطلب جهداً عضلياً أكبر من الفخذ للتحكم'
    ],
    kLevel: 'K1 - K2',
    kLevelNums: [1, 2],
    price: 'تبدأ من 8,000 ج.م',
    image: 'https://stngco.com/wp-content/uploads/2022/03/1318_Angle_Web.jpg',
    weight: '350 - 500 جرام',
    maxUserWeight: '125 كجم',
    flexionAngle: '120°',
    waterproof: 'مقاومة للرطوبة السطحية',
    warranty: 'سنة واحدة',
    material: 'سبائك ألومنيوم طيران عالية الصلابة',
    techHighlight: 'Manual Lock / Weight-Activated Stance Lock',
    indications: ['بتر فوق الركبة للمراحل الأولى من العلاج الطبيعي', 'المسنون ذوو الحركة المحدودة داخل المنزل']
  },
  {
    id: 'polycentric',
    name: 'الركبة متعددة المحاور 3R106 (Polycentric 4-Bar)',
    brand: 'Ottobock / Össur',
    type: 'ميكانيكية متعددة المحاور',
    typeShort: '4-Bar Kinematic',
    description: 'تستخدم نظام وصلات رباعية المحاور (4-Bar Linkage) يوفر استقراراً هندسياً فائقاً أثناء مرحلة الدوس، وقصراً تلقائياً لطول الطرف أثناء مرحلة التأرجح لمنع اصطدام القدم بالأرض.',
    features: [
      'استقرار هندسي ممتاز عند نقل وزن الجسم (Loading Response)',
      'قصر طول الطرف أثناء التأرجح يمنع تعثر الأصابع بالأرض',
      'تقليل ارتفاع المفصل عند الجلوس لراحة وسلاسة أكبر',
      'مناسبة جداً لبتر مفصل الركبة (Knee Disarticulation) والبتر القصير'
    ],
    limitations: [
      'أثقل وزناً بحكم وجود وصلات ومحاور إضافية',
      'لا تتيح التكيف الآلي مع الأنشطة الرياضية السريعة'
    ],
    kLevel: 'K2 - K3',
    kLevelNums: [2, 3],
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
  {
    id: '3r80-hydraulic',
    name: 'الركبة الهيدروليكية 3R80 (Ottobock)',
    brand: 'Ottobock',
    type: 'هيدروليكية ميكانيكية',
    typeShort: 'هيدروليكية مقاومة للماء',
    description: 'واحدة من أشهر ركب Ottobock الهيدروليكية الميكانيكية. تتميز بمقاومة كاملة للماء حتى عمق 3 أمتار (IP68) وقفل يدوي للوقوف في الماء، مع هيدروليك مزدوج للتحكم المستقل في مرحلتي الوقوف والتأرجح.',
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
    kLevel: 'K3 - K4',
    kLevelNums: [3, 4],
    price: 'تبدأ من 55,000 ج.م',
    image: 'https://www.ottobock.com/_next/image?url=https%3A%2F%2Fres.cloudinary.com%2Fottobock-se%2Fimage%2Fupload%2Far_1%3A1%2Cb_white%2Cc_fill%2Cg_auto%2Cw_930%2Ff_avif%2Fv1%2FProduct-Management%2FLower%2520limb%2520prosthetics%2FKnee%2520joints%2FMechanical%2520knee%2520joints%2F3R80%2F3R80%2520-%2520Modular%2520Knee%2520Joint%2520with%2520Rotary%2520Hydraulic%2FImages-product%2F1To1-5125811%3F_a%3DBAMCkGiu0&w=1600&q=75',
    weight: '1.25 كجم (1250 جرام)',
    maxUserWeight: '150 كجم',
    flexionAngle: '150°',
    waterproof: 'IP68 (مقاومة غمر كامل بالماء حتى 3 أمتار)',
    warranty: '3 سنوات',
    material: 'سبائك ألومنيوم طيران + مكابس هيدروليكية دقيقة',
    techHighlight: 'Rotational Hydraulics + Manual Water Lock',
    indications: ['المشي في الماء والسباحة والشاطئ (IP68)', 'العمل في البيئات الرطبة والخارجية']
  },
  {
    id: 'kenevo-3c60',
    name: 'Kenevo 3C60 (Ottobock)',
    brand: 'Ottobock',
    type: 'محوسبة (Microprocessor)',
    typeShort: 'محوسبة لكبار السن',
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
    kLevel: 'K1 - K2',
    kLevelNums: [1, 2],
    price: 'تبدأ من 140,000 ج.م',
    image: 'https://www.ottobock.com/_next/image?url=https%3A%2F%2Fres.cloudinary.com%2Fottobock-se%2Fimage%2Fupload%2Far_1%3A1%2Cb_white%2Cc_fill%2Cg_auto%2Cw_930%2Ff_avif%2Fv1%2FProduct-Management%2FLower%2520limb%2520prosthetics%2FKnee%2520joints%2FMechatronic%2520knee%2520joints%2FKenevo%2F3C60%2520-%2520Kenevo%2FImages-product%2F187118%2F5169413%3F_a%3DBAMCkGiu0&w=1600&q=75',
    weight: '920 جرام',
    maxUserWeight: '150 كجم',
    flexionAngle: '124°',
    waterproof: 'IP54 (مقاومة للرش والأتربة)',
    battery: 'بطارية تدوم حتى يومين',
    warranty: '3 سنوات',
    material: 'هيكل كربوني فائق الخفة + معالج Kenevo الذكي',
    techHighlight: 'Kenevo Activity Modes (A-C) + Sitting Assist',
    indications: ['كبار السن وحالات البتر المتقدمة حديثاً (K1-K2)', 'الحاجة لأقصى دعم عند الجلوس والقيام من الكرسي'],
    highlight: true
  },
  {
    id: 'rheo-knee-xc',
    name: 'Rheo Knee XC (Össur)',
    brand: 'Össur',
    type: 'محوسبة (Microprocessor)',
    typeShort: 'محوسبة بيونيك',
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
      'تحتاج شحن البطارية كل 3 أيام'
    ],
    kLevel: 'K2 - K4',
    kLevelNums: [2, 3, 4],
    price: 'تبدأ من 180,000 ج.م',
    image: 'https://media.ossur.com/ossur-dam/image/upload/w_1920/f_auto,q_auto,w_1400,h_1400,c_pad/spim/134_fe7abe7a-a38d-43ae-9aee-3db5303a0581',
    weight: '1.6 كجم',
    maxUserWeight: '136 كجم',
    flexionAngle: '120°',
    waterproof: 'IP34 (مقاوم للرش والماء العذب)',
    battery: 'بطارية ليثيوم أيون تدوم 3 أيام متواصلة',
    warranty: '3 سنوات كاملة',
    material: 'إطار كربوني + ألومنيوم طيران + سائل مغناطيسي',
    techHighlight: 'Magnetorheologic Real-Time Adaptive Control',
    indications: ['بتر فوق الركبة للمستخدمين الراغبين بأحدث التقنيات', 'الحاجة لأقصى درجات الحماية ضد السقوط والتعثر']
  },
  {
    id: 'c-leg-4',
    name: 'C-Leg 4 (Ottobock)',
    brand: 'Ottobock',
    type: 'محوسبة (Microprocessor)',
    typeShort: 'المعيار الذهبي المحوسب',
    description: 'الجيل الرابع من ركبة C-Leg الشهيرة عالمياً من Ottobock. المعيار الذهبي للركب المحوسبة التي تضمن استقراراً كاملاً ومقاومة غمر كلي في الماء (IP68 Waterproof).',
    features: [
      'معالج إلكتروني مزدوج يقرأ الحركة ويتكيف تلقائياً مع خطوتك',
      'مقاومة كاملة للماء IP68 (يمكن غمرها بالكامل في الماء والشاطئ)',
      'أنظمة حماية ومقاومة التعثر المتقدمة Stumble Recovery Plus',
      'حتى 5 أوضاع تشغيل مخصصة (MyModes) للرياضة والعمل والقيادة',
      'نزول الدرج بطريقة سلسة وآمنة تماماً'
    ],
    limitations: [
      'تكلفة متقدمة',
      'تتطلب صيانة دورية كل 18 شهراً من مراكز Ottobock'
    ],
    kLevel: 'K2 - K4',
    kLevelNums: [2, 3, 4],
    price: 'تبدأ من 220,000 ج.م',
    image: 'https://luxmedprotez.com/wp-content/uploads/ottobock-c-leg-4.jpg',
    weight: '1.16 كجم',
    maxUserWeight: '136 كجم',
    flexionAngle: '130°',
    waterproof: 'IP68 (مقاومة كلياً للغمر بالماء حتى 3 أمتار)',
    battery: 'بطارية ليثيوم أيون تدوم حتى 5 أيام',
    warranty: '3 سنوات',
    material: 'هيكل كربوني فائق الخفة + هيدروليك محوسب',
    techHighlight: 'Microprocessor Hydraulic Control + IP68 Waterproof',
    indications: ['الاستحمام والسباحة والأنشطة المائية (IP68)', 'الحياة اليومية المزدحمة بسلامة وأمان تام'],
    highlight: true
  },
  {
    id: 'genium-3b1',
    name: 'Genium 3B1-3 (Ottobock)',
    brand: 'Ottobock',
    type: 'محوسبة (Microprocessor)',
    typeShort: 'الحركة الفسيولوجية OPG',
    description: 'الركبة المحوسبة التي وضعت معايير الحركة الفسيولوجية (OPG 2.0). تتيح للمستخدم المشي للخلف، نزول العوائق والسلالم بسلاسة طبيعية، والوقوف التلقائي المتوازن بدقة عالية.',
    features: [
      'نمط الحركة الفسيولوجي الطبيعي OPG 2.0 (Optimized Physiological Gait)',
      'إمكانية المشي إلى الخلف بثبات تكتيكي كامل (Backward Walking)',
      'الوقوف التلقائي المتوازن (Intuitive Stance)',
      'نزول الدرج والمنحدرات بحركة تحاكي الحركة الطبيعية 100%'
    ],
    limitations: [
      'فئة سعرية متقدمة',
      'مقاومة ماء IP67'
    ],
    kLevel: 'K3 - K4',
    kLevelNums: [3, 4],
    price: 'تبدأ من 280,000 ج.م',
    image: 'https://www.ottobock.com/_next/image?url=https%3A%2F%2Fres.cloudinary.com%2Fottobock-se%2Fimage%2Fupload%2Far_1%3A1%2Cb_white%2Cc_fill%2Cg_auto%2Cw_930%2Ff_avif%2Fv1%2FProduct-Management%2FLower%2520limb%2520prosthetics%2FKnee%2520joints%2FMechatronic%2520knee%2520joints%2FGenium%2F3B1-3%2520-%2520Genium%2FImages-product%2F1To1-2254128%3F_a%3DBAMCkGiu0&w=1600&q=75',
    weight: '1.4 كجم',
    maxUserWeight: '150 كجم',
    flexionAngle: '135°',
    waterproof: 'IP67 (مقاومة للماء والغمر المؤقت)',
    battery: 'بطارية ليثيوم أيون تدوم 5 أيام',
    warranty: '3 سنوات',
    material: 'ألومنيوم معالج بالأكسدة + ألياف الكربون',
    techHighlight: 'OPG 2.0 Gait Dynamics + Intuitive Stance',
    indications: ['المستخدمون النشطون الراغبون بمشية طبيعية تماماً', 'المشي للخلف ونزول السلالم']
  },
  {
    id: 'genium-x3',
    name: 'Genium X3 3B5-3 (Ottobock)',
    brand: 'Ottobock',
    type: 'محوسبة (Microprocessor)',
    typeShort: 'الفئة القصوى والرياضية',
    description: 'أقوى ركبة محوسبة في العالم من Ottobock. مصممة للرياضيين والمستخدمين فائقي النشاط لممارسة الجري والتسلق والصيد والسباحة وصعود الدرج خطوة بخطوة بحرية مطلقة.',
    features: [
      'وضع Walk-to-Run للجري والتنقل التلقائي بين السرعات',
      'صعود السلالم خطوة بخطوة بالتناوب (Step-over-Step Stair Ascent)',
      'مقاومة فائقة للماء العذب والمالح والكلور والأتربة والرمال (IP68)',
      'نظام الحركة الفسيولوجي المطور OPG 2.0 لمشية طبيعية 100%'
    ],
    limitations: [
      'أعلى فئة سعرية في العالم',
      'تحتاج صيانة دورية متخصصة من Ottobock'
    ],
    kLevel: 'K3 - K4',
    kLevelNums: [3, 4],
    price: 'تبدأ من 350,000 ج.م',
    image: 'https://www.ottobock.com/_next/image?url=https%3A%2F%2Fres.cloudinary.com%2Fottobock-se%2Fimage%2Fupload%2Far_1%3A1%2Cb_white%2Cc_fill%2Cg_auto%2Cw_930%2Ff_avif%2Fv1%2FProduct-Management%2FLower%2520limb%2520prosthetics%2FKnee%2520joints%2FMechatronic%2520knee%2520joints%2FGenium%2520X3%2F3B5-3%2520-%2520Genium%2520X3%2FImages-product%2F1To1-2066639%3F_a%3DBAMCkGiu0&w=1600&q=75',
    weight: '1.9 كجم',
    maxUserWeight: '150 كجم',
    flexionAngle: '130°',
    waterproof: 'IP68 (مقاومة تامة في كافة الظروف البيئية والبحرية)',
    battery: 'بطارية ليثيوم أيون تدوم 5 أيام',
    warranty: '3 سنوات',
    material: 'تيتانيوم طبقي + ألومنيوم معالج بالأكسدة + كربون',
    techHighlight: 'OPG 2.0 + Walk-to-Run + Military Waterproofing',
    indications: ['الرياضة والجري وصعود الدرج بالتناوب', 'البيئات الصعبة والأنشطة القصوى'],
    highlight: true
  }
];

/* ─────────────── K-Level Definitions with Recommended Knees + Feet Pairs ─────────────── */
const kLevelData = [
  {
    level: 1,
    label: 'K1',
    title: 'حركة داخلية وبسرعة ثابتة',
    color: 'from-slate-500 to-slate-700',
    bgCard: 'bg-slate-50',
    border: 'border-slate-200',
    text: 'text-slate-800',
    icon: <Heart className="w-5 h-5" />,
    desc: 'المستخدم يستطيع المشي ببطء أو سرعة ثابتة فقط على أسطح مستوية داخل المنزل أو الحديقة.',
    reason: 'في هذا المستوى، الأولوية الكبرى هي أقصى درجات الثبات الميكانيكي لمنع انثناء الركبة المفاجئ ومنع السقوط، مع تقليل وزن الطرف وتكلفته.',
    pairs: [
      {
        kneeName: 'الركبة أحادية المحور (Single-Axis)',
        kneeImage: 'https://stngco.com/wp-content/uploads/2022/03/1318_Angle_Web.jpg',
        footName: 'قدم SACH الكلاسيكية',
        footImage: 'https://stngco.com/wp-content/uploads/2022/03/1318_Angle_Web.jpg',
        pairTitle: 'الثنائي الاقتصادي الآمن (Single-Axis + SACH)',
        pairReason: 'يوفر قفلاً ميكانيكياً آمناً عند نقل الثقل، مع كعب إسفنجي ممتص للصدمات ووزن خفيف جداً يسهل حركة كبار السن.',
        idealFor: 'التأهيل الأولي للمشي وحالات البتر الحديثة داخل المنزل'
      },
      {
        kneeName: 'ركبة Kenevo 3C60 المحوسبة',
        kneeImage: 'https://www.ottobock.com/_next/image?url=https%3A%2F%2Fres.cloudinary.com%2Fottobock-se%2Fimage%2Fupload%2Far_1%3A1%2Cb_white%2Cc_fill%2Cg_auto%2Cw_930%2Ff_avif%2Fv1%2FProduct-Management%2FLower%2520limb%2520prosthetics%2FKnee%2520joints%2FMechatronic%2520knee%2520joints%2FKenevo%2F3C60%2520-%2520Kenevo%2FImages-product%2F187118%2F5169413%3F_a%3DBAMCkGiu0&w=1600&q=75',
        footName: 'قدم Taleo 1C50 أو SACH',
        footImage: 'https://www.ottobock.com/_next/image?url=https%3A%2F%2Fres.cloudinary.com%2Fottobock-se%2Fimage%2Fupload%2Far_1%3A1%2Cb_white%2Cc_fill%2Cg_auto%2Cw_930%2Ff_avif%2Fv1%2FProduct-Management%2FLower%2520limb%2520prosthetics%2FFeet%2FMechanical%2520feet%2FTaleo%2F1C50%2520-%2520Taleo%2FImages-product%2F187064%2F5111068%3F_a%3DBAMCkGiu0&w=1600&q=75',
        pairTitle: 'الثنائي الذكي الآمن (Kenevo MPK + Taleo)',
        pairReason: 'أرقى حل محوسب لـ K1، يساعد المريض ذكياً على القيام والجلوس من الكرسي ويمنع السقوط بـ Stumble Recovery.',
        idealFor: 'كبار السن الراغبين بحماية محوسبة ذكية ضد السقوط'
      }
    ]
  },
  {
    level: 2,
    label: 'K2',
    title: 'حركة خارجية محدودة وعوائق بسيطة',
    color: 'from-sky-500 to-sky-700',
    bgCard: 'bg-sky-50',
    border: 'border-sky-200',
    text: 'text-sky-800',
    icon: <Footprints className="w-5 h-5" />,
    desc: 'المستخدم يستطيع اجتياز عوائق بيئية منخفضة مثل الأرصفة والدرجات المنفردة والأسطح المائلة الخفيفة.',
    reason: 'يحتاج الطرف هنا لمزج بين قصر الطرف أثناء التأرجح لمنع اصطدام الأصابع بالأرض، وتخزين طاقة مناسب للمشي الخارجي.',
    pairs: [
      {
        kneeName: 'ركبة 3R106 (Polycentric 4-Bar)',
        kneeImage: 'https://www.ottobock.com/_next/image?url=https%3A%2F%2Fres.cloudinary.com%2Fottobock-se%2Fimage%2Fupload%2Far_1%3A1%2Cb_white%2Cc_fill%2Cg_auto%2Cw_930%2Ff_avif%2Fv1%2FProduct-Management%2FLower%2520limb%2520prosthetics%2FKnee%2520joints%2FMechanical%2520knee%2520joints%2F3R106%2F3R106%2520-%2520Polycentric%2520Modular%2520Knee%2520Joint%2FImages-product%2F1To1-1437968%3F_a%3DBAMCkGiu0&w=1600&q=75',
        footName: 'قدم Taleo 1C50 الكربونية',
        footImage: 'https://www.ottobock.com/_next/image?url=https%3A%2F%2Fres.cloudinary.com%2Fottobock-se%2Fimage%2Fupload%2Far_1%3A1%2Cb_white%2Cc_fill%2Cg_auto%2Cw_930%2Ff_avif%2Fv1%2FProduct-Management%2FLower%2520limb%2520prosthetics%2FFeet%2FMechanical%2520feet%2FTaleo%2F1C50%2520-%2520Taleo%2FImages-product%2F187064%2F5111068%3F_a%3DBAMCkGiu0&w=1600&q=75',
        pairTitle: 'الثنائي الميكانيكي المتطور (4-Bar + Taleo Carbon)',
        pairReason: 'نظام الوصلات الرباعي يقصّر الطرف لمنع اصطدام القدم بالأرض، بينما توفر قدم Taleo دحرجة سلسة واستعادة طاقة متزنة.',
        idealFor: 'المشي الخارجي المحدود وتجاوز الأرصفة وسهولة الجلوس'
      },
      {
        kneeName: 'ركبة Rheo Knee XC أو Kenevo 3C60',
        kneeImage: 'https://media.ossur.com/ossur-dam/image/upload/w_1920/f_auto,q_auto,w_1400,h_1400,c_pad/spim/134_fe7abe7a-a38d-43ae-9aee-3db5303a0581',
        footName: 'قدم Meridium 1B1 أو Proprio Foot',
        footImage: 'https://www.ottobock.com/_next/image?url=https%3A%2F%2Fres.cloudinary.com%2Fottobock-se%2Fimage%2Fupload%2Far_1%3A1%2Cb_white%2Cc_fill%2Cg_auto%2Cw_930%2Ff_avif%2Fv1%2FProduct-Management%2FLower%2520limb%2520prosthetics%2FFeet%2FMechatronic%2520feet%2FMeridium%2F1B1%2520-%2520Meridium%2FImages-product%2F187070%2F5124770%3F_a%3DBAMCkGiu0&w=1600&q=75',
        pairTitle: 'الثنائي المحوسب الذكي بالكامل (Microprocessor Pair)',
        pairReason: 'تعديل فوري إلكتروني لمقاومة الركبة مع رفع إلكتروني لمشط القدم لمنع التعثر كلياً وتعديل الكعب تلقائياً.',
        idealFor: 'المشي المريح جداً مع تغيير الاحذية والتنقل بثقة'
      }
    ]
  },
  {
    level: 3,
    label: 'K3',
    title: 'نشط مجتمعي وبسرعات متغيرة',
    color: 'from-medical-600 to-medical-800',
    bgCard: 'bg-medical-50',
    border: 'border-medical-200',
    text: 'text-medical-800',
    icon: <TrendingUp className="w-5 h-5" />,
    desc: 'المستخدم يستطيع المشي بسرعات مختلفة والتنقل عبر معظم العوائق البيئية، المنحدرات الحادة، والسلالم.',
    reason: 'يتطلب هذا المستوى استجابة هيدروليكية أو محوسبة عالية السرعة مع قدم كربونية ذات قوة دفع وإطلاق طاقة ديناميكي ممتاز.',
    pairs: [
      {
        kneeName: 'ركبة C-Leg 4 المقاومة للماء (IP68)',
        kneeImage: 'https://luxmedprotez.com/wp-content/uploads/ottobock-c-leg-4.jpg',
        footName: 'قدم Triton 1C60 أو Empower 1A1-2',
        footImage: 'https://www.ottobock.com/_next/image?url=https%3A%2F%2Fres.cloudinary.com%2Fottobock-se%2Fimage%2Fupload%2Far_1%3A1%2Cb_white%2Cc_fill%2Cg_auto%2Cw_930%2Ff_avif%2Fv1%2FProduct-Management%2FLower%2520limb%2520prosthetics%2FFeet%2FMechanical%2520feet%2FTriton%2F1C60%2520-%2520Triton%2FImages-product%2F1To1-1438118%3F_a%3DBAMCkGiu0&w=1600&q=75',
        pairTitle: 'ثنائي الأداء اليومي الفائق (C-Leg 4 + Triton / Empower)',
        pairReason: 'تحكم هيدروليكي محوسب في الركبة لمنع السقوط مع مقاومة كاملة للماء، ودفع كربوني قوي من القدم للسرعات المتغيرة.',
        idealFor: 'المشي الطويل والعمل المزدحم والسباحة والمنحدرات'
      },
      {
        kneeName: 'ركبة 3R80 الهيدروليكية الميكانيكية',
        kneeImage: 'https://www.ottobock.com/_next/image?url=https%3A%2F%2Fres.cloudinary.com%2Fottobock-se%2Fimage%2Fupload%2Far_1%3A1%2Cb_white%2Cc_fill%2Cg_auto%2Cw_930%2Ff_avif%2Fv1%2FProduct-Management%2FLower%2520limb%2520prosthetics%2FKnee%2520joints%2FMechanical%2520knee%2520joints%2F3R80%2F3R80%2520-%2520Modular%2520Knee%2520Joint%2520with%2520Rotary%2520Hydraulic%2FImages-product%2F1To1-5125811%3F_a%3DBAMCkGiu0&w=1600&q=75',
        footName: 'قدم Pro-Flex XC أو Taleo 1C50',
        footImage: 'https://media.ossur.com/ossur-dam/image/upload/w_1920/f_auto,q_auto,w_1400,h_1400,c_pad/spim/150_8e64c125-9fa8-4b72-9ea5-f481a57e3f84',
        pairTitle: 'الثنائي الهيدروليكي المائي (3R80 + Pro-Flex XC)',
        pairReason: 'هيدروليك متين ومقاوم للماء بنسبة 100% بدون بطارية، مع قدم كربونية ديناميكية توفر 27% زيادة في مدى حركة الكاحل.',
        idealFor: 'الأنشطة الميدانية والسباحة والاستخدام الخارجي الشاق'
      }
    ]
  },
  {
    level: 4,
    label: 'K4',
    title: 'نشاط رياضي وجري وأنشطة عنيفة',
    color: 'from-violet-600 to-violet-800',
    bgCard: 'bg-violet-50',
    border: 'border-violet-200',
    text: 'text-violet-800',
    icon: <Mountain className="w-5 h-5" />,
    desc: 'يتجاوز مهارات المشي الأساسية، ويمتلك القدرة على الأنشطة عالية التأثير كالعدو والجري والرياضة والأنشطة القاسية.',
    reason: 'يحتاج لأقوى أجهزة في العالم تتحمل أوزاناً وقوى صدمة هائلة مع وضعيات الجري التلقائي والتكيف البيئي العسكري.',
    pairs: [
      {
        kneeName: 'ركبة Genium X3 3B5-3 (Ottobock)',
        kneeImage: 'https://www.ottobock.com/_next/image?url=https%3A%2F%2Fres.cloudinary.com%2Fottobock-se%2Fimage%2Fupload%2Far_1%3A1%2Cb_white%2Cc_fill%2Cg_auto%2Cw_930%2Ff_avif%2Fv1%2FProduct-Management%2FLower%2520limb%2520prosthetics%2FKnee%2520joints%2FMechatronic%2520knee%2520joints%2FGenium%2520X3%2F3B5-3%2520-%2520Genium%2520X3%2FImages-product%2F1To1-2066639%3F_a%3DBAMCkGiu0&w=1600&q=75',
        footName: 'قدم Triton 1C60 أو Pro-Flex XC',
        footImage: 'https://www.ottobock.com/_next/image?url=https%3A%2F%2Fres.cloudinary.com%2Fottobock-se%2Fimage%2Fupload%2Far_1%3A1%2Cb_white%2Cc_fill%2Cg_auto%2Cw_930%2Ff_avif%2Fv1%2FProduct-Management%2FLower%2520limb%2520prosthetics%2FFeet%2FMechanical%2520feet%2FTriton%2F1C60%2520-%2520Triton%2FImages-product%2F1To1-1438118%3F_a%3DBAMCkGiu0&w=1600&q=75',
        pairTitle: 'الثنائي العسكري والرياضي الأقوى في العالم (Genium X3 + Triton)',
        pairReason: 'وضعية Walk-to-Run للجري، صعود الدرج بالتناوب، حماية عسكرية من الماء والرمال، مع قدم كربونية ذات 3 نوابض لامتصاص أقوى الصدمات.',
        idealFor: 'الرياضيون، الجري، التسلق، ممارسة الرياضات البحرية والأنشطة القاسية'
      }
    ]
  }
];

const typeColors: Record<string, { bg: string; text: string; border: string; icon: React.ReactNode }> = {
  'ميكانيكية': { bg: 'bg-slate-100', text: 'text-slate-800', border: 'border-slate-200', icon: <Cog className="w-3.5 h-3.5" /> },
  'ميكانيكية متعددة المحاور': { bg: 'bg-amber-50', text: 'text-amber-800', border: 'border-amber-200', icon: <Cog className="w-3.5 h-3.5" /> },
  'هوائية': { bg: 'bg-sky-50', text: 'text-sky-800', border: 'border-sky-200', icon: <Wind className="w-3.5 h-3.5" /> },
  'هيدروليكية ميكانيكية': { bg: 'bg-teal-50', text: 'text-teal-800', border: 'border-teal-200', icon: <Droplets className="w-3.5 h-3.5" /> },
  'محوسبة (Microprocessor)': { bg: 'bg-violet-50', text: 'text-violet-800', border: 'border-violet-200', icon: <Cpu className="w-3.5 h-3.5" /> },
};

/* ─────────────── Component ─────────────── */
const KneeTypes: React.FC = () => {
  const [selectedKnee, setSelectedKnee] = useState<KneeProduct | null>(null);
  const [activeFilter, setActiveFilter] = useState<string>('all');
  const [activeKLevel, setActiveKLevel] = useState<number | null>(null);
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' });

  const filteredProducts = activeFilter === 'all'
    ? kneeProducts
    : kneeProducts.filter(p => p.type === activeFilter);

  return (
    <section id="knee-types" ref={sectionRef} className="py-20 bg-gradient-to-b from-white via-slate-50/50 to-white relative overflow-hidden">
      <div className="container mx-auto px-4 max-w-7xl relative z-10">
        {/* Section Header */}
        <motion.div
          className="text-center mb-14"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <div className="inline-flex items-center gap-2 py-1.5 px-5 bg-gradient-to-r from-medical-50 to-violet-50 text-medical-800 rounded-full text-xs font-bold mb-4 border border-medical-100 shadow-sm">
            <Activity className="h-4 w-4 text-medical-600" />
            <span>كتالوج الركب والأنظمة المحوسبة من Ottobock & Össur</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 font-cairo mb-3">
            موسوعة الركب الصناعية وتقنيات التكيف الحركي
          </h2>
          <p className="text-sm sm:text-base text-gray-500 max-w-2xl mx-auto font-medium leading-relaxed">
            مقارنة شاملة لكافة أنواع الركب مع دليل توافق K-Level لتحديد الثنائي المثالي (الركبة + القدم) المناسب لأسلوب حياتك.
          </p>
        </motion.div>

        {/* ═══ K-Level Interactive Pairing System ═══ */}
        <motion.div
          className="mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <div className="text-center mb-6">
            <h3 className="text-lg font-bold text-gray-900 mb-2 flex items-center gap-2 font-cairo justify-center">
              <Gauge className="h-5 w-5 text-medical-700" />
              دليل توافق K-Level: اختر مستوى نشاطك لعرض (ثنائي الركبة + القدم) المثالي
            </h3>
            <p className="text-xs text-gray-500 font-medium">اضغط على أي مستوى لعرض الركب والأقدام الموصى بها مع سبب الاختيار الطبي</p>
          </div>

          {/* K-Level Selector Buttons */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-6">
            {kLevelData.map((k) => (
              <motion.button
                key={k.level}
                onClick={() => setActiveKLevel(activeKLevel === k.level ? null : k.level)}
                className={`relative p-4 sm:p-5 rounded-2xl border-2 text-right transition-all duration-300 overflow-hidden group ${
                  activeKLevel === k.level
                    ? `${k.border} ${k.bgCard} shadow-lg scale-[1.02]`
                    : 'border-gray-200 bg-white hover:border-gray-300 hover:shadow-md'
                }`}
                whileHover={{ scale: activeKLevel === k.level ? 1.02 : 1.03 }}
                whileTap={{ scale: 0.98 }}
              >
                {activeKLevel === k.level && (
                  <motion.div
                    className={`absolute top-0 right-0 left-0 h-1 bg-gradient-to-l ${k.color}`}
                    layoutId="kneeKLevelIndicator"
                  />
                )}

                <div className="flex items-center gap-2 mb-2">
                  <div className={`w-8 h-8 rounded-xl bg-gradient-to-br ${k.color} text-white flex items-center justify-center text-sm font-black shadow-sm`}>
                    {k.label}
                  </div>
                  <span className={`font-bold text-sm ${activeKLevel === k.level ? k.text : 'text-gray-800'}`}>
                    {k.title}
                  </span>
                </div>
                <p className="text-[11px] text-gray-500 font-medium leading-relaxed line-clamp-2">{k.desc}</p>
              </motion.button>
            ))}
          </div>

          {/* Recommended Pairs Panel */}
          <AnimatePresence mode="wait">
            {activeKLevel && (
              <motion.div
                key={activeKLevel}
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.4, ease: 'easeInOut' }}
              >
                <div className={`${kLevelData[activeKLevel - 1].bgCard} rounded-3xl border ${kLevelData[activeKLevel - 1].border} p-6 mb-6 shadow-sm`}>
                  {/* Overview */}
                  <div className="flex items-start gap-3 mb-6 pb-4 border-b border-gray-200/60">
                    <div className={`w-11 h-11 rounded-2xl bg-gradient-to-br ${kLevelData[activeKLevel - 1].color} text-white flex items-center justify-center font-black text-lg shadow-md flex-shrink-0`}>
                      {kLevelData[activeKLevel - 1].label}
                    </div>
                    <div>
                      <h4 className={`font-extrabold text-base sm:text-lg ${kLevelData[activeKLevel - 1].text} font-cairo`}>
                        التوافق الطبي الموصى به لمستوى النشاط {kLevelData[activeKLevel - 1].label} ({kLevelData[activeKLevel - 1].title})
                      </h4>
                      <p className="text-xs sm:text-sm text-gray-600 font-medium mt-1 leading-relaxed">
                        <span className="font-bold text-gray-800">سبب الاختيار الطبي: </span>
                        {kLevelData[activeKLevel - 1].reason}
                      </p>
                    </div>
                  </div>

                  {/* Pairs Cards Grid */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    {kLevelData[activeKLevel - 1].pairs.map((pair, pIdx) => (
                      <motion.div
                        key={pIdx}
                        className="bg-white rounded-2xl border border-gray-200/90 p-5 shadow-xs hover:shadow-md transition-all duration-300"
                        initial={{ opacity: 0, y: 15 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: pIdx * 0.1 }}
                      >
                        <div className="flex items-center gap-2 mb-3">
                          <Sparkles className="w-4 h-4 text-amber-500 flex-shrink-0" />
                          <h5 className="font-bold text-sm text-gray-900 font-cairo">{pair.pairTitle}</h5>
                        </div>

                        {/* Images Pair Display */}
                        <div className="grid grid-cols-2 gap-3 mb-4 bg-slate-50/80 p-3 rounded-xl border border-slate-100">
                          {/* Recommended Knee */}
                          <div className="text-center">
                            <div className="h-24 bg-white rounded-lg p-2 flex items-center justify-center border border-gray-100 mb-1.5 shadow-2xs">
                              <img src={pair.kneeImage} alt={pair.kneeName} className="max-h-20 object-contain" />
                            </div>
                            <span className="text-[10px] font-bold text-medical-800 bg-medical-50 px-2 py-0.5 rounded-md block truncate">
                              الركبة: {pair.kneeName.split(' ')[0]} {pair.kneeName.split(' ')[1]}
                            </span>
                          </div>

                          {/* Recommended Foot */}
                          <div className="text-center">
                            <div className="h-24 bg-white rounded-lg p-2 flex items-center justify-center border border-gray-100 mb-1.5 shadow-2xs">
                              <img src={pair.footImage} alt={pair.footName} className="max-h-20 object-contain" />
                            </div>
                            <span className="text-[10px] font-bold text-violet-800 bg-violet-50 px-2 py-0.5 rounded-md block truncate">
                              القدم: {pair.footName.split(' ')[0]} {pair.footName.split(' ')[1]}
                            </span>
                          </div>
                        </div>

                        <p className="text-xs text-gray-600 leading-relaxed font-medium mb-3">{pair.pairReason}</p>

                        <div className="bg-emerald-50 p-2.5 rounded-xl border border-emerald-100 flex items-center gap-2 text-[11px] text-emerald-900 font-bold">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0" />
                          <span>مثالي لـ: {pair.idealFor}</span>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

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
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all duration-300 ${
                activeFilter === f.id
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
            const isHovered = hoveredCard === knee.id;

            return (
              <motion.div
                key={knee.id}
                className={`bg-white rounded-3xl overflow-hidden border shadow-sm hover:shadow-2xl transition-all duration-500 flex flex-col justify-between group relative ${
                  knee.highlight ? 'border-medical-200 ring-1 ring-medical-100' : 'border-gray-200/80'
                }`}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: idx * 0.07 }}
                viewport={{ once: true }}
                onMouseEnter={() => setHoveredCard(knee.id)}
                onMouseLeave={() => setHoveredCard(null)}
              >
                {knee.highlight && (
                  <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-medical-500 via-violet-500 to-fuchsia-500 z-10" />
                )}

                {/* Image & Badges */}
                <div className="relative h-64 bg-gradient-to-b from-slate-50 to-white flex items-center justify-center p-4 overflow-hidden">
                  <motion.img
                    src={knee.image}
                    alt={knee.name}
                    className="max-h-56 object-contain"
                    animate={{ scale: isHovered ? 1.08 : 1, y: isHovered ? -4 : 0 }}
                    transition={{ duration: 0.4 }}
                    onError={(e) => {
                      e.currentTarget.src = 'https://stngco.com/wp-content/uploads/2022/03/1318_Angle_Web.jpg';
                    }}
                  />
                  <div className={`absolute top-3 right-3 ${typeStyle.bg} ${typeStyle.text} ${typeStyle.border} border font-bold text-[10px] px-3 py-1 rounded-full flex items-center gap-1 shadow-2xs`}>
                    {typeStyle.icon}
                    <span>{knee.typeShort}</span>
                  </div>
                  <div className="absolute top-3 left-3 bg-white/90 text-gray-700 font-bold text-[10px] px-3 py-1 rounded-full border border-gray-200 shadow-2xs">
                    {knee.brand}
                  </div>
                  <div className="absolute bottom-3 right-3 bg-gradient-to-r from-medical-700 to-medical-800 text-white font-bold text-xs px-3 py-1.5 rounded-full shadow-lg">
                    {knee.price}
                  </div>
                  {knee.highlight && (
                    <div className="absolute bottom-3 left-3 bg-gradient-to-r from-amber-400 to-amber-500 text-white font-bold text-[10px] px-2.5 py-1 rounded-full shadow-md flex items-center gap-1">
                      <Star className="w-3 h-3 fill-white" /> الأكثر تميزاً
                    </div>
                  )}
                </div>

                {/* Card Content */}
                <div className="p-5 flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="font-extrabold text-lg text-gray-900 mb-1.5 font-cairo group-hover:text-medical-700 transition-colors">
                      {knee.name}
                    </h3>
                    <p className="text-xs text-gray-600 line-clamp-3 leading-relaxed mb-4 font-medium">
                      {knee.description}
                    </p>

                    {/* Quick Specs Row */}
                    <div className="grid grid-cols-3 gap-2 mb-4">
                      <div className="bg-slate-50 rounded-xl p-2 text-center border border-slate-100">
                        <span className="text-[10px] text-gray-500 block">K-Level</span>
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

                    {/* Features */}
                    <div className="space-y-1.5 pt-3 border-t border-gray-100">
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
                      className={`w-full font-bold rounded-xl text-xs py-2.5 transition-all duration-300 border ${
                        knee.highlight
                          ? 'bg-gradient-to-r from-medical-600 to-medical-700 text-white border-medical-600 hover:from-medical-700 hover:to-medical-800 shadow-md'
                          : 'bg-medical-50 hover:bg-medical-700 text-medical-700 hover:text-white border-medical-200'
                      }`}
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
                          {ts.icon} {selectedKnee.typeShort}
                        </span>
                      );
                    })()}
                    <span className="bg-gray-100 text-gray-700 font-bold text-[10px] px-3 py-1 rounded-full border border-gray-200">
                      {selectedKnee.brand}
                    </span>
                    <span className="bg-medical-50 text-medical-700 font-bold text-[10px] px-3 py-1 rounded-full border border-medical-100">
                      {selectedKnee.kLevel}
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
                    <AlertTriangle className="w-4 h-4 text-amber-500" /> القيود
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
