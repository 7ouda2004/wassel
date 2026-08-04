import React, { useState, useRef } from 'react';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import {
  Ruler, CheckCircle2, AlertTriangle, Zap, ShieldCheck,
  ChevronRight, Calendar, Star, Award, Cpu, Waves, X, BarChart,
  Activity, Battery, Droplets, Heart, ArrowUpRight, Footprints,
  Gauge, Timer, Mountain, TrendingUp
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

/* ─────────────── Types ─────────────── */
interface FootProduct {
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
  heelHeight?: string;
  waterproof?: string;
  battery?: string;
  warranty?: string;
  material?: string;
  sizes?: string;
  techHighlight?: string;
  indications?: string[];
  highlight?: boolean;
}

/* ─────────────── Data ─────────────── */
const footProducts: FootProduct[] = [
  /* ══════ SACH Foot ══════ */
  {
    id: 'sach',
    name: 'قدم SACH الكلاسيكية',
    brand: 'Ottobock / Össur',
    type: 'ميكانيكية أساسية',
    typeShort: 'SACH',
    description: 'تصميم كلاسيكي بدون مفاصل متحركة يتألف من قلب صلب محاط بفوم يوريثان مرن مع كعب ممتص للصدمات. القدم الأكثر استخداماً عالمياً في مرحلة التأهيل الأولى بفضل بساطتها ومتانتها وتكلفتها المعقولة.',
    features: [
      'هيكل متين بالكامل بدون أي أجزاء متحركة أو قابلة للكسر',
      'كعب إسفنجي (Cushion Heel) يمتص صدمة ملامسة الأرض',
      'تكلفة اقتصادية ومناسبة لجميع المراحل الأولى',
      'خفيفة الوزن ولا تحتاج أي صيانة دورية'
    ],
    limitations: [
      'لا يوجد كاحل متحرك ولا تخزين طاقة',
      'أداء محدود على الأسطح الوعرة والمنحدرات',
      'غير مناسبة للمشي السريع أو الأنشطة الرياضية'
    ],
    kLevel: 'K1',
    kLevelNums: [1],
    price: 'تبدأ من 5,000 ج.م',
    image: 'https://www.roadrunnerfoot.com/wp-content/uploads/2021/02/SACH-Foot-For-Adult.jpg',
    weight: '350 - 450 جرام',
    maxUserWeight: '125 كجم',
    heelHeight: '10 مم ثابت',
    waterproof: 'مقاومة للرطوبة',
    warranty: 'سنة واحدة',
    material: 'قلب خشب/بولي بروبلين + غلاف يوريثان مرن',
    sizes: '22 - 30 سم',
    techHighlight: 'Solid Ankle Cushion Heel (SACH)',
    indications: ['المراحل الأولى من التأهيل الحركي', 'كبار السن ذوو الحركة المحدودة داخل المنزل', 'الطرف الصناعي المؤقت']
  },
  /* ══════ Taleo 1C50 ══════ */
  {
    id: 'taleo-1c50',
    name: 'Taleo 1C50 (Ottobock)',
    brand: 'Ottobock',
    type: 'كربونية متعددة الاستخدام',
    typeShort: 'كربونية',
    description: 'قدم كربونية مركّبة من Ottobock مصممة للتنوع اليومي، تجمع بين مرونة فائقة للدحرجة السلسة واستعادة طاقة ممتازة. مقاومة تماماً للماء العذب والمالح والكلور، مع 3 وسائد كعب قابلة للتبديل لتناسب مختلف الأحذية.',
    features: [
      'مقاومة كلية للماء المالح والكلور (Pool & Beach Proof)',
      '3 وسائد كعب قابلة للتبديل لضبط ارتفاع الحذاء (Low/Mid/High)',
      'دحرجة سلسة وطبيعية تقلل الإجهاد على مفصل الورك',
      'تصميم انسيابي يتناسب مع معظم الأحذية النسائية والرجالية',
      'تحمل أوزان تصل إلى 150 كجم (من أعلى المعايير)'
    ],
    limitations: [
      'لا يوجد تكيف إلكتروني ذكي',
      'أداء محدود مقارنة بالأقدام المحوسبة على المنحدرات'
    ],
    kLevel: 'K2 - K4',
    kLevelNums: [2, 3, 4],
    price: 'تبدأ من 28,000 ج.م',
    image: 'https://www.ottobock.com/_next/image?url=https%3A%2F%2Fres.cloudinary.com%2Fottobock-se%2Fimage%2Fupload%2Far_1%3A1%2Cb_white%2Cc_fill%2Cg_auto%2Cw_930%2Ff_avif%2Fv1%2FProduct-Management%2FLower%2520limb%2520prosthetics%2FFeet%2FMechanical%2520feet%2FTaleo%2520family%2F1C50%2520-%2520Taleo%2FImages-product%2F1To1-3503292%3F_a%3DBAMCkGiu0&w=1600&q=75',
    weight: '540 جرام (مقاس 26 سم)',
    maxUserWeight: '150 كجم',
    heelHeight: 'قابل للتعديل بـ 3 مستويات',
    waterproof: 'مقاومة كاملة (ماء عذب + مالح + كلور)',
    warranty: '3 سنوات',
    material: 'ألياف كربون مركبة + بوليمر مرن',
    sizes: '22 - 30 سم',
    techHighlight: '3 Heel Wedges + Full Waterproof',
    indications: ['المشي اليومي على أسطح مختلفة', 'السباحة والشاطئ والاستحمام (مقاومة الماء)', 'تناسب مختلف أحذية الكعب']
  },
  /* ══════ Triton 1C60 ══════ */
  {
    id: 'triton-1c60',
    name: 'Triton 1C60 (Ottobock)',
    brand: 'Ottobock',
    type: 'كربونية عالية الأداء',
    typeShort: 'كربونية رياضية',
    description: 'قدم كربونية عالية الأداء من Ottobock بنظام 3 نوابض مترابطة (3-Spring System) تقدم أقوى استعادة طاقة ودفع إيجابي عند مشط القدم. مقسمة الأصابع (Split Forefoot) للتكيف مع الأرضيات الوعرة والمنحدرات.',
    features: [
      'نظام 3 نوابض كربونية مترابطة لأقصى استعادة طاقة ودفع قوي',
      'مقدمة مقسمة (Split Forefoot) للتكيف مع الأرضيات الوعرة',
      'أداء رياضي استثنائي للجري والتنس والدراجات',
      'تحمل أوزان مستخدم تصل إلى 150 كجم',
      'أخف وزناً مع أقوى استعادة طاقة في فئتها'
    ],
    limitations: [
      'سعر مرتفع ضمن الأقدام الميكانيكية',
      'يتطلب اختيار درجة صلابة الشريحة حسب وزن المريض'
    ],
    kLevel: 'K3 - K4',
    kLevelNums: [3, 4],
    price: 'تبدأ من 42,000 ج.م',
    image: 'https://shop.ottobock.us/store/medias/8804201824286.jpg?context=bWFzdGVyfHJvb3R8MTMxMDUxfGltYWdlL2pwZWd8aDkxL2g3Yi84Nzk2NjgzNTk5OTAyLmpwZ3w3NWViNThhYmU2ZGE0NzZhODJhY2Y3OTRhYzZlNTgxODQ4NmFhYzI2YzIyZDVmY2Y5YTAzMjIxMmJmYTNkMzg2',
    weight: '640 جرام (مقاس 26 سم)',
    maxUserWeight: '150 كجم',
    heelHeight: '15 مم',
    waterproof: 'مقاومة للماء العذب',
    warranty: '3 سنوات',
    material: 'ألياف كربون عالية الكثافة (Prepreg Carbon)',
    sizes: '22 - 30 سم',
    techHighlight: '3-Spring Interconnected System + Split Forefoot',
    indications: ['الرياضيون والمستخدمون فائقو النشاط', 'المشي السريع والجري والتضاريس الوعرة', 'الأنشطة الخارجية المكثفة'],
    highlight: true
  },
  /* ══════ Pro-Flex XC (Össur) ══════ */
  {
    id: 'pro-flex-xc',
    name: 'Pro-Flex XC (Össur)',
    brand: 'Össur',
    type: 'كربونية ديناميكية متقدمة',
    typeShort: 'كربونية ديناميكية',
    description: 'قدم كربونية متطورة من Össur بنظام 3 شرائح كربونية متداخلة (3-Blade) توفر 27% زيادة في مدى حركة الكاحل مقارنة بالأقدام الكربونية التقليدية، مع نعل مانع للانزلاق وغلاف تشريحي طبيعي.',
    features: [
      'تقنية 3-Blade لمقدار استعادة طاقة هائل ودفع إيجابي',
      'زيادة مدى حركة الكاحل بنسبة 27% لتقليل الضغط على السوكيت',
      'غلاف قدم تشريحي ذو نعل مانع للانزلاق',
      'تحكم رائع على المنحدرات والتضاريس الوعرة'
    ],
    limitations: [
      'تكلفة أعلى من أقدام الكربون العادية',
      'يحتاج لأخصائي محترف لاختيار صلابة الشريحة المناسبة'
    ],
    kLevel: 'K3 - K4',
    kLevelNums: [3, 4],
    price: 'تبدأ من 38,000 ج.م',
    image: 'https://media.ossur.com/ossur-dam/image/upload/f_auto,q_auto,w_1400,h_1400,c_pad/spim/134_5c2c8545-41a2-422a-857f-dd26c96a3675',
    weight: '670 جرام (شامل الغلاف)',
    maxUserWeight: '166 كجم',
    heelHeight: '10 مم',
    waterproof: 'مقاومة للماء والرطوبة',
    warranty: '3 سنوات',
    material: 'ألياف كربون 100% (Prepreg Carbon)',
    sizes: '22 - 30 سم',
    techHighlight: 'Full Length Dynamic Lever + 3-Blade System',
    indications: ['بتر فوق وتحت الركبة للمستخدمين النشطين', 'المشي لمسافات طويلة والرياضة الخفيفة']
  },
  /* ══════ Meridium 1B1 ══════ */
  {
    id: 'meridium-1b1',
    name: 'Meridium 1B1 (Ottobock)',
    brand: 'Ottobock',
    type: 'محوسبة بيونيك (Microprocessor Foot)',
    typeShort: 'محوسبة',
    description: 'قدم محوسبة بيونيك من Ottobock بنظام هيدروليكي رباعي المحاور (4-Axis Hydraulic) يتحكم فيه معالج دقيق يقرأ الحركة لحظياً. يرفع مشط القدم تلقائياً أثناء التأرجح ويتكيف مع المنحدرات والسلالم والأرضيات غير المستوية.',
    features: [
      'نظام هيدروليكي رباعي المحاور (4-Axis) بتحكم محوسب لحظي',
      'رفع تلقائي لمشط القدم أثناء التأرجح يمنع التعثر 100%',
      'تكيف ذكي فوري مع المنحدرات والسلالم والأسطح غير المستوية',
      'تعديل ارتفاع الكعب تلقائياً حسب الحذاء (حتى 5 سم)',
      'وضعية الاسترخاء الطبيعي عند الجلوس (Relax Mode)'
    ],
    limitations: [
      'تكلفة عالية جداً',
      'تحتاج شحن بطارية دوري',
      'تتطلب أخصائياً مدرباً على البرمجة والمعايرة'
    ],
    kLevel: 'K2 - K3',
    kLevelNums: [2, 3],
    price: 'تبدأ من 160,000 ج.م',
    image: 'https://www.ottobock.com/_next/image?url=https%3A%2F%2Fres.cloudinary.com%2Fottobock-se%2Fimage%2Fupload%2Far_1%3A1%2Cb_white%2Cc_fill%2Cg_auto%2Cw_930%2Ff_avif%2Fv1%2FProduct-Management%2FLower%2520limb%2520prosthetics%2FFeet%2FMechatronic%2520feet%2FMeridium%2F1B1-2%2520-%2520Meridium%2FImages-product%2F1To1-2496371%3F_a%3DBAMCkGiu0&w=1600&q=75',
    weight: '1.38 كجم (مقاس 26 سم)',
    maxUserWeight: '125 كجم',
    heelHeight: 'تعديل آلي تلقائي حتى 50 مم',
    waterproof: 'IP67 (مقاومة للغمر المؤقت)',
    battery: 'بطارية ليثيوم أيون تدوم يومين من الاستخدام',
    warranty: '3 سنوات',
    material: 'هيكل معدني + 4 محاور هيدروليكية + معالج دقيق',
    sizes: '24 - 29 سم',
    techHighlight: '4-Axis Hydraulic Microprocessor Real-Time Control',
    indications: ['الحاجة لتكيف ذكي على المنحدرات والسلالم', 'ارتداء أحذية مختلفة الكعب بدون إعادة ضبط', 'الراحة الفائقة أثناء الجلوس'],
    highlight: true
  },
  /* ══════ Empower 1A1-2 ══════ */
  {
    id: 'empower-1a1',
    name: 'Empower 1A1-2 (Ottobock)',
    brand: 'Ottobock',
    type: 'محوسبة بمحرك دفع نشط (Powered Foot)',
    typeShort: 'محوسبة بمحرك',
    description: 'أقوى وأحدث قدم محوسبة في العالم من Ottobock. تتجاوز مجرد التكيف السلبي لتمتلك محركاً كهربائياً يولّد دفعاً نشطاً (Active Push-Off) يحاكي وظيفة العضلات المفقودة، ما يقلل استهلاك الطاقة بنسبة 20% مقارنة بالأقدام الكربونية.',
    features: [
      'محرك كهربائي يولّد دفعاً نشطاً (Active Plantar Flexion) يعوض فقدان العضلات',
      'تقليل استهلاك طاقة المشي بنسبة 20% عن الأقدام الكربونية التقليدية',
      'تكيف محوسب لحظي مع المنحدرات والسلالم والأسطح المختلفة',
      'وضعية جلوس واسترخاء مريحة (Relief Function)',
      'تحمل أوزان مستخدم تصل إلى 130 كجم'
    ],
    limitations: [
      'أعلى فئة سعرية في أقدام الأطراف الصناعية عالمياً',
      'أثقل بسبب المحرك الكهربائي الداخلي',
      'تتطلب شحن بطارية يومياً تقريباً'
    ],
    kLevel: 'K3',
    kLevelNums: [3],
    price: 'تبدأ من 250,000 ج.م',
    image: 'https://www.ottobock.com/_next/image?url=https%3A%2F%2Fres.cloudinary.com%2Fottobock-se%2Fimage%2Fupload%2Far_1%3A1%2Cb_white%2Cc_fill%2Cg_auto%2Cw_930%2Ff_avif%2Fv1%2FProduct-Management%2FLower%2520limb%2520prosthetics%2FFeet%2FMechatronic%2520feet%2FEmpower%2F1A1-2%2520-%2520Empower%2FImages-product%2F1To1-4136169%3F_a%3DBAMCkGiu0&w=1600&q=75',
    weight: '1.9 كجم (مقاس 26 سم)',
    maxUserWeight: '130 كجم',
    heelHeight: 'تكيف آلي محوسب',
    waterproof: 'IP44 (مقاومة للرش)',
    battery: 'بطارية ليثيوم أيون تدوم يوم واحد (8-12 ساعة)',
    warranty: '3 سنوات',
    material: 'محرك كهربائي + معالج دقيق + كربون + ألومنيوم',
    sizes: '25 - 30 سم',
    techHighlight: 'Active Powered Push-Off Motor + Microprocessor',
    indications: ['الحاجة لتعويض وظيفة العضلات المفقودة بدفع نشط', 'تقليل إجهاد المشي لمسافات طويلة', 'أحدث تقنية في عالم الأطراف الصناعية'],
    highlight: true
  },
  /* ══════ Proprio Foot (Össur) ══════ */
  {
    id: 'proprio-foot',
    name: 'Proprio Foot (Össur)',
    brand: 'Össur',
    type: 'محوسبة بيونيك (Bionic Ankle)',
    typeShort: 'محوسبة بيونيك',
    description: 'قدم بيونيك ذكية من Össur بمحرك إلكتروني يرفع مشط القدم تلقائياً عند التأرجح ويضبط زاوية الكاحل فورياً عند صعود ونزول الدرج والمنحدرات. متصلة بتطبيق Össur Logic عبر البلوتوث.',
    features: [
      'رفع تلقائي لمشط القدم (Ankle Dorsiflexion) يمنع التعثر تماماً',
      'تكيف ذكي تلقائي مع زوايا المنحدرات والسلالم',
      'وضعية استرخاء القدم الذاتية عند الجلوس (Relax Mode)',
      'تطبيق Össur Logic لمتابعة حالة القدم والبطارية عبر البلوتوث'
    ],
    limitations: [
      'تكلفة عالية',
      'تحتاج شحن بطارية كل 2-3 أيام',
      'أثقل من الأقدام الكربونية بسبب المحرك'
    ],
    kLevel: 'K2 - K3',
    kLevelNums: [2, 3],
    price: 'تبدأ من 150,000 ج.م',
    image: 'https://media.ossur.com/ossur-dam/image/upload/v1674480202/Shared/Proprio-Foot_No-Unity_Product-Image_2023_07.png',
    weight: '1.4 كجم',
    maxUserWeight: '125 كجم',
    heelHeight: 'تعديل آلي حتى 50 مم',
    waterproof: 'IP34 (مقاومة للرش)',
    battery: 'بطارية ليثيوم أيون تدوم 3 أيام',
    warranty: '3 سنوات',
    material: 'محرك إلكتروني + شرائح كربون + ألومنيوم',
    sizes: '24 - 30 سم',
    techHighlight: 'Motorized Ankle Motion + Bionic Intelligence',
    indications: ['الأمان ضد السقوط والتعثر', 'المشي الكثيف على السلالم والمنحدرات']
  }
];

/* ─────────────── K-Level Definitions ─────────────── */
const kLevelData = [
  {
    level: 1, label: 'K1', title: 'حركة داخلية', color: 'from-slate-500 to-slate-700',
    bgCard: 'bg-slate-50', border: 'border-slate-200', text: 'text-slate-800',
    icon: <Heart className="w-5 h-5" />,
    desc: 'حركة محدودة داخل المنزل على أسطح مستوية وبسرعة ثابتة فقط. الأنسب للمسنين وحالات البتر الحديثة.',
    recommendation: 'ننصح بقدم SACH الكلاسيكية لبساطتها وتكلفتها المعقولة وعدم حاجتها لصيانة.'
  },
  {
    level: 2, label: 'K2', title: 'حركة خارجية محدودة', color: 'from-sky-500 to-sky-700',
    bgCard: 'bg-sky-50', border: 'border-sky-200', text: 'text-sky-800',
    icon: <Footprints className="w-5 h-5" />,
    desc: 'حركة خارجية على أسطح مستوية مع تجاوز عوائق بسيطة (أرصفة منخفضة).',
    recommendation: 'ننصح بقدم Taleo 1C50 (مقاومة للماء) أو Meridium 1B1 (محوسبة ذكية) أو Proprio Foot (بيونيك).'
  },
  {
    level: 3, label: 'K3', title: 'نشط مجتمعي', color: 'from-medical-600 to-medical-800',
    bgCard: 'bg-medical-50', border: 'border-medical-200', text: 'text-medical-800',
    icon: <TrendingUp className="w-5 h-5" />,
    desc: 'حركة خارجية واسعة بسرعات متغيرة مع التنقل على أسطح غير مستوية ومنحدرات وسلالم.',
    recommendation: 'ننصح بـ Triton 1C60 أو Pro-Flex XC أو Meridium 1B1 أو Empower 1A1-2 (أقوى دفع في العالم).'
  },
  {
    level: 4, label: 'K4', title: 'نشاط رياضي عالي', color: 'from-violet-600 to-violet-800',
    bgCard: 'bg-violet-50', border: 'border-violet-200', text: 'text-violet-800',
    icon: <Mountain className="w-5 h-5" />,
    desc: 'رياضة، جري، تسلق، سباحة، وأنشطة عنيفة تتجاوز الاستخدام اليومي العادي.',
    recommendation: 'ننصح بـ Triton 1C60 (الخيار المثالي) أو Pro-Flex XC للأداء الرياضي الفائق.'
  }
];

const typeColors: Record<string, { bg: string; text: string; border: string }> = {
  'ميكانيكية أساسية': { bg: 'bg-slate-100', text: 'text-slate-700', border: 'border-slate-200' },
  'كربونية متعددة الاستخدام': { bg: 'bg-emerald-50', text: 'text-emerald-700', border: 'border-emerald-200' },
  'كربونية عالية الأداء': { bg: 'bg-sky-50', text: 'text-sky-700', border: 'border-sky-200' },
  'كربونية ديناميكية متقدمة': { bg: 'bg-blue-50', text: 'text-blue-700', border: 'border-blue-200' },
  'محوسبة بيونيك (Microprocessor Foot)': { bg: 'bg-violet-50', text: 'text-violet-700', border: 'border-violet-200' },
  'محوسبة بمحرك دفع نشط (Powered Foot)': { bg: 'bg-fuchsia-50', text: 'text-fuchsia-700', border: 'border-fuchsia-200' },
  'محوسبة بيونيك (Bionic Ankle)': { bg: 'bg-purple-50', text: 'text-purple-700', border: 'border-purple-200' },
};

/* ─────────────── Component ─────────────── */
const FootTypes: React.FC = () => {
  const [selectedFoot, setSelectedFoot] = useState<FootProduct | null>(null);
  const [activeKLevel, setActiveKLevel] = useState<number | null>(null);
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' });

  const kLevelFilteredProducts = activeKLevel
    ? footProducts.filter(p => p.kLevelNums.includes(activeKLevel))
    : [];

  return (
    <section id="foot-types" ref={sectionRef} className="py-20 bg-white relative overflow-hidden">
      {/* Decorative background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-0 w-96 h-96 bg-medical-50/30 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
        <div className="absolute bottom-0 right-0 w-80 h-80 bg-violet-50/30 rounded-full blur-3xl translate-x-1/3 translate-y-1/3" />
      </div>

      <div className="container mx-auto px-4 max-w-7xl relative z-10">
        {/* Section Header */}
        <motion.div
          className="text-center mb-14"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <div className="inline-flex items-center gap-2 py-1.5 px-5 bg-gradient-to-r from-medical-50 to-violet-50 text-medical-800 rounded-full text-xs font-bold mb-4 border border-medical-100 shadow-sm">
            <Footprints className="h-4 w-4 text-medical-600" />
            <span>كتالوج الأقدام الصناعية الرسمي من Ottobock & Össur</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 font-cairo mb-3">
            أنظمة الأقدام والكاحل الصناعية
          </h2>
          <p className="text-sm sm:text-base text-gray-500 max-w-2xl mx-auto font-medium leading-relaxed">
            من القدم الكلاسيكية SACH إلى أحدث قدم بمحرك دفع كهربائي Empower — استكشف جميع الخيارات مع الصور الرسمية والمواصفات المعتمدة.
          </p>
        </motion.div>

        {/* ═══ K-Level Interactive Selector ═══ */}
        <motion.div
          className="mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <h3 className="text-lg font-bold text-gray-900 mb-5 flex items-center gap-2 font-cairo justify-center">
            <Gauge className="h-5 w-5 text-medical-700" />
            اختر مستوى نشاطك لعرض الأقدام المناسبة لك
          </h3>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-6">
            {kLevelData.map((k) => (
              <motion.button
                key={k.level}
                onClick={() => setActiveKLevel(activeKLevel === k.level ? null : k.level)}
                className={`relative p-4 sm:p-5 rounded-2xl border-2 text-right transition-all duration-300 overflow-hidden group ${activeKLevel === k.level
                  ? `${k.border} ${k.bgCard} shadow-lg scale-[1.02]`
                  : 'border-gray-200 bg-white hover:border-gray-300 hover:shadow-md'
                  }`}
                whileHover={{ scale: activeKLevel === k.level ? 1.02 : 1.03 }}
                whileTap={{ scale: 0.98 }}
              >
                {/* Active indicator */}
                {activeKLevel === k.level && (
                  <motion.div
                    className={`absolute top-0 right-0 left-0 h-1 bg-gradient-to-l ${k.color}`}
                    layoutId="kLevelIndicator"
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

          {/* K-Level Recommendation Panel */}
          <AnimatePresence mode="wait">
            {activeKLevel && (
              <motion.div
                key={activeKLevel}
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.4, ease: 'easeInOut' }}
              >
                <div className={`${kLevelData[activeKLevel - 1].bgCard} rounded-2xl border ${kLevelData[activeKLevel - 1].border} p-5 sm:p-6 mb-4`}>
                  <div className="flex items-start gap-3 mb-5">
                    <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${kLevelData[activeKLevel - 1].color} text-white flex items-center justify-center font-black shadow-md flex-shrink-0`}>
                      {kLevelData[activeKLevel - 1].label}
                    </div>
                    <div>
                      <h4 className={`font-bold text-base ${kLevelData[activeKLevel - 1].text} font-cairo`}>
                        الأقدام الموصى بها لمستوى النشاط {kLevelData[activeKLevel - 1].label} — {kLevelData[activeKLevel - 1].title}
                      </h4>
                      <p className="text-xs text-gray-600 font-medium mt-1">{kLevelData[activeKLevel - 1].recommendation}</p>
                    </div>
                  </div>

                  {/* Recommended Products Cards */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {kLevelFilteredProducts.map((product, idx) => (
                      <motion.div
                        key={product.id}
                        className="bg-white rounded-2xl border border-gray-200 p-4 flex gap-4 items-center cursor-pointer hover:shadow-lg hover:border-medical-200 transition-all duration-300 group"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: idx * 0.1 }}
                        onClick={() => setSelectedFoot(product)}
                      >
                        <div className="w-20 h-20 bg-slate-50 rounded-xl flex-shrink-0 flex items-center justify-center overflow-hidden border border-gray-100">
                          <img src={product.image} alt={product.name} className="max-h-18 object-contain group-hover:scale-110 transition-transform duration-300" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h5 className="font-bold text-sm text-gray-900 font-cairo truncate group-hover:text-medical-700 transition-colors">{product.name}</h5>
                          <p className="text-[11px] text-gray-500 font-medium mt-0.5">{product.typeShort} — {product.brand}</p>
                          <div className="flex items-center gap-2 mt-2">
                            <span className="text-[10px] font-bold text-medical-700 bg-medical-50 px-2 py-0.5 rounded-md border border-medical-100">{product.price}</span>
                            <ArrowUpRight className="w-3.5 h-3.5 text-gray-400 group-hover:text-medical-600 transition-colors" />
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        {/* ═══ All Products Grid ═══ */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">
          {footProducts.map((foot, idx) => {
            const ts = typeColors[foot.type] || { bg: 'bg-gray-50', text: 'text-gray-700', border: 'border-gray-200' };
            const isHovered = hoveredCard === foot.id;

            return (
              <motion.div
                key={foot.id}
                className={`bg-white rounded-3xl overflow-hidden border shadow-sm hover:shadow-2xl transition-all duration-500 flex flex-col justify-between group relative ${foot.highlight ? 'border-medical-200 ring-1 ring-medical-100' : 'border-gray-200/80'
                  }`}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: idx * 0.08 }}
                viewport={{ once: true }}
                onMouseEnter={() => setHoveredCard(foot.id)}
                onMouseLeave={() => setHoveredCard(null)}
              >
                {/* Highlight Badge */}
                {foot.highlight && (
                  <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-medical-500 via-violet-500 to-fuchsia-500 z-10" />
                )}

                {/* Image Area */}
                <div className="relative h-64 bg-gradient-to-b from-slate-50 to-white flex items-center justify-center p-4 overflow-hidden">
                  <motion.img
                    src={foot.image}
                    alt={foot.name}
                    className="max-h-56 object-contain"
                    animate={{ scale: isHovered ? 1.08 : 1, y: isHovered ? -4 : 0 }}
                    transition={{ duration: 0.4 }}
                    onError={(e) => {
                      e.currentTarget.src = 'https://stngco.com/wp-content/uploads/2022/03/1318_Angle_Web.jpg';
                    }}
                  />
                  {/* Badges */}
                  <div className={`absolute top-3 right-3 ${ts.bg} ${ts.text} ${ts.border} border font-bold text-[10px] px-3 py-1 rounded-full shadow-xs`}>
                    {foot.typeShort}
                  </div>
                  <div className="absolute top-3 left-3 bg-white/90 text-gray-700 font-bold text-[10px] px-3 py-1 rounded-full border border-gray-200 shadow-xs">
                    {foot.brand}
                  </div>
                  <div className="absolute bottom-3 right-3 bg-gradient-to-r from-medical-700 to-medical-800 text-white font-bold text-xs px-3 py-1.5 rounded-full shadow-lg">
                    {foot.price}
                  </div>
                  {foot.highlight && (
                    <div className="absolute bottom-3 left-3 bg-gradient-to-r from-amber-400 to-amber-500 text-white font-bold text-[10px] px-2.5 py-1 rounded-full shadow-md flex items-center gap-1">
                      <Star className="w-3 h-3 fill-white" /> الأكثر تميزاً
                    </div>
                  )}
                </div>

                {/* Content */}
                <div className="p-5 flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="font-extrabold text-lg text-gray-900 mb-1.5 font-cairo group-hover:text-medical-700 transition-colors">
                      {foot.name}
                    </h3>
                    <p className="text-xs text-gray-600 line-clamp-3 leading-relaxed mb-4 font-medium">
                      {foot.description}
                    </p>

                    {/* Quick Specs */}
                    <div className="grid grid-cols-3 gap-2 mb-4">
                      <div className="bg-slate-50 rounded-xl p-2 text-center border border-slate-100">
                        <span className="text-[10px] text-gray-500 block">K-Level</span>
                        <span className="text-xs font-bold text-gray-800">{foot.kLevel}</span>
                      </div>
                      <div className="bg-slate-50 rounded-xl p-2 text-center border border-slate-100">
                        <span className="text-[10px] text-gray-500 block">الوزن</span>
                        <span className="text-xs font-bold text-gray-800">{foot.weight?.split(' ')[0]}</span>
                      </div>
                      <div className="bg-slate-50 rounded-xl p-2 text-center border border-slate-100">
                        <span className="text-[10px] text-gray-500 block">أقصى وزن</span>
                        <span className="text-xs font-bold text-gray-800">{foot.maxUserWeight?.split(' ')[0]}</span>
                      </div>
                    </div>

                    {/* Features */}
                    <div className="space-y-1.5 pt-3 border-t border-gray-100">
                      {foot.features.slice(0, 3).map((feat, fIdx) => (
                        <div key={fIdx} className="flex items-start gap-1.5 text-xs text-gray-700">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 flex-shrink-0 mt-0.5" />
                          <span className="line-clamp-1 font-medium">{feat}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* CTA */}
                  <div className="mt-5">
                    <Button
                      onClick={() => setSelectedFoot(foot)}
                      className={`w-full font-bold rounded-xl text-xs py-2.5 transition-all duration-300 border ${foot.highlight
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

      {/* ═══ Detail Modal ═══ */}
      <AnimatePresence>
        {selectedFoot && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedFoot(null)}
          >
            <motion.div
              className="bg-white rounded-3xl max-w-3xl w-full max-h-[90vh] overflow-y-auto shadow-2xl font-cairo"
              initial={{ opacity: 0, scale: 0.92, y: 30 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.92, y: 30 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Modal Top Bar */}
              {selectedFoot.highlight && (
                <div className="h-1.5 bg-gradient-to-r from-medical-500 via-violet-500 to-fuchsia-500 rounded-t-3xl" />
              )}

              <div className="p-6 sm:p-8">
                {/* Header */}
                <div className="flex items-start justify-between mb-5">
                  <div>
                    <div className="flex items-center gap-2 mb-2 flex-wrap">
                      {(() => {
                        const ts = typeColors[selectedFoot.type] || { bg: 'bg-gray-50', text: 'text-gray-700', border: 'border-gray-200' };
                        return (
                          <span className={`${ts.bg} ${ts.text} ${ts.border} border font-bold text-[10px] px-3 py-1 rounded-full`}>
                            {selectedFoot.typeShort}
                          </span>
                        );
                      })()}
                      <span className="bg-gray-100 text-gray-700 font-bold text-[10px] px-3 py-1 rounded-full border border-gray-200">
                        {selectedFoot.brand}
                      </span>
                      <span className="bg-medical-50 text-medical-700 font-bold text-[10px] px-3 py-1 rounded-full border border-medical-100">
                        {selectedFoot.kLevel}
                      </span>
                    </div>
                    <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900 font-cairo">
                      {selectedFoot.name}
                    </h2>
                  </div>
                  <button onClick={() => setSelectedFoot(null)} className="p-2 hover:bg-gray-100 rounded-xl transition-colors">
                    <X className="w-5 h-5 text-gray-500" />
                  </button>
                </div>

                {/* Image + Info */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <div className="bg-gradient-to-b from-slate-50 to-white rounded-2xl p-6 flex items-center justify-center border border-gray-200 min-h-[280px]">
                    <motion.img
                      src={selectedFoot.image}
                      alt={selectedFoot.name}
                      className="max-h-64 object-contain"
                      initial={{ scale: 0.9 }}
                      animate={{ scale: 1 }}
                      transition={{ duration: 0.5 }}
                    />
                  </div>
                  <div className="space-y-3">
                    <p className="text-xs sm:text-sm text-gray-700 leading-relaxed font-medium">{selectedFoot.description}</p>
                    <div className="bg-gradient-to-r from-medical-50 to-medical-100/50 p-3 rounded-xl border border-medical-100 flex items-center justify-between">
                      <span className="text-xs font-bold text-gray-600">التكلفة التقديرية:</span>
                      <span className="text-sm font-black text-medical-800">{selectedFoot.price}</span>
                    </div>
                    {selectedFoot.techHighlight && (
                      <div className="bg-violet-50 p-3 rounded-xl border border-violet-100 flex items-center gap-2">
                        <Cpu className="w-4 h-4 text-violet-600 flex-shrink-0" />
                        <div>
                          <span className="text-[10px] text-violet-600 block font-bold">التقنية البارزة:</span>
                          <span className="text-xs text-violet-900 font-bold">{selectedFoot.techHighlight}</span>
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {/* Specs Grid */}
                <div className="bg-slate-50 rounded-2xl p-4 sm:p-5 border border-slate-200 mb-6">
                  <h4 className="text-sm font-bold text-gray-900 mb-3 font-cairo flex items-center gap-2">
                    <BarChart className="w-4 h-4 text-medical-600" /> المواصفات التقنية
                  </h4>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                    {[
                      { label: 'الوزن', val: selectedFoot.weight },
                      { label: 'أقصى وزن مستخدم', val: selectedFoot.maxUserWeight },
                      { label: 'ارتفاع الكعب', val: selectedFoot.heelHeight },
                      { label: 'مقاومة الماء', val: selectedFoot.waterproof },
                      { label: 'الضمان', val: selectedFoot.warranty },
                      { label: 'الخامة', val: selectedFoot.material },
                      ...(selectedFoot.battery ? [{ label: 'البطارية', val: selectedFoot.battery }] : []),
                      ...(selectedFoot.sizes ? [{ label: 'المقاسات', val: selectedFoot.sizes }] : []),
                    ].filter(s => s.val).map((spec, i) => (
                      <div key={i} className="bg-white rounded-xl p-3 border border-gray-100 shadow-2xs">
                        <div className="text-[10px] text-gray-500 font-bold mb-1">{spec.label}</div>
                        <div className="text-xs font-bold text-gray-900">{spec.val}</div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Features / Limitations */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                  <div>
                    <h4 className="text-sm font-bold text-gray-900 mb-2 flex items-center gap-1.5 font-cairo">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600" /> المميزات
                    </h4>
                    <div className="space-y-1.5">
                      {selectedFoot.features.map((f, i) => (
                        <motion.div
                          key={i}
                          className="flex items-start gap-2 bg-emerald-50 p-2 rounded-lg border border-emerald-100 text-xs text-gray-800 font-medium"
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: i * 0.05 }}
                        >
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0 mt-0.5" />
                          <span>{f}</span>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-gray-900 mb-2 flex items-center gap-1.5 font-cairo">
                      <AlertTriangle className="w-4 h-4 text-amber-500" /> القيود
                    </h4>
                    <div className="space-y-1.5">
                      {selectedFoot.limitations.map((l, i) => (
                        <motion.div
                          key={i}
                          className="flex items-start gap-2 bg-amber-50 p-2 rounded-lg border border-amber-100 text-xs text-gray-800 font-medium"
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: i * 0.05 }}
                        >
                          <AlertTriangle className="w-3.5 h-3.5 text-amber-500 flex-shrink-0 mt-0.5" />
                          <span>{l}</span>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Indications */}
                {selectedFoot.indications && (
                  <div className="mb-6">
                    <h4 className="text-sm font-bold text-gray-900 mb-2 font-cairo">أبرز الدواعي الطبية:</h4>
                    <div className="flex flex-wrap gap-1.5">
                      {selectedFoot.indications.map((ind, i) => (
                        <span key={i} className="bg-medical-50 text-medical-800 text-xs font-bold px-3 py-1 rounded-lg border border-medical-100">
                          {ind}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* CTA */}
                <div className="pt-4 border-t border-gray-200 flex flex-col sm:flex-row gap-3 justify-end">
                  <Button variant="outline" onClick={() => setSelectedFoot(null)} className="rounded-xl font-bold text-xs">
                    إغلاق
                  </Button>
                  <Link to="/booking" onClick={() => setSelectedFoot(null)}>
                    <Button className="w-full sm:w-auto bg-gradient-to-r from-medical-700 to-medical-800 hover:from-medical-800 hover:to-medical-900 text-white font-bold rounded-xl text-xs px-6 py-2.5 shadow-md">
                      حجز موعد قياس وتفصيل
                      <Calendar className="mr-2 h-4 w-4" />
                    </Button>
                  </Link>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default FootTypes;
