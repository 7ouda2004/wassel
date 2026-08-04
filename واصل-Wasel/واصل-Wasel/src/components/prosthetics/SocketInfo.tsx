import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Bandage, 
  Layers, 
  Shield, 
  Zap, 
  CheckCircle2, 
  Sparkles, 
  ChevronRight, 
  Info, 
  Cpu, 
  Activity, 
  Maximize2, 
  FileText, 
  Settings, 
  Wrench, 
  Check, 
  Search, 
  SlidersHorizontal, 
  ArrowLeftRight, 
  X, 
  Award, 
  ShieldCheck, 
  Scale, 
  Microscope, 
  Feather, 
  Compass, 
  HeartPulse,
  CircleDot,
  CheckCircle,
  HelpCircle
} from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogDescription 
} from "@/components/ui/dialog";

// ─── Interfaces ───
export interface SocketTypeItem {
  id: string;
  name: string;
  nameEn: string;
  category: 'transtibial' | 'transfemoral' | 'specialized' | 'upperlimb' | 'suspension' | 'materials';
  categoryLabel: string;
  shortDesc: string;
  fullDesc: string;
  indication: string;
  features: string[];
  limitations: string[];
  comfortRating: number; // 1 to 5
  stabilityRating: number; // 1 to 5
  kLevel: string;
  weightCategory: string;
  linerType: string;
  image: string;
  badge: string;
  bgGradient: string;
  borderColor: string;
}

export interface ManufacturingStep {
  stepNumber: number;
  title: string;
  titleEn: string;
  techType: string;
  shortDesc: string;
  detailedProcess: string[];
  keyTools: string[];
  image: string;
}

// ─── Data: All Socket Types Across All Amputation Levels ───
const ALL_SOCKET_TYPES: SocketTypeItem[] = [
  // 1. Transtibial Sockets (تحت الركبة)
  {
    id: 'tsb-socket',
    name: 'سوكيت الضغط الكلي السطحي (TSB)',
    nameEn: 'Total Surface Bearing (TSB) Socket',
    category: 'transtibial',
    categoryLabel: 'تحت الركبة (Transtibial)',
    shortDesc: 'يوزع ضغط وزن الجسم بنسبة 100% بالتساوي على كافة أجزاء الطرف المتبقي دون تركيز الضغط على النتوءات العظمية.',
    fullDesc: 'تكنولوجيا TSB تعتمد على توزيع الحمل الميكانيكي بالتساوي الكامل على كامل مساحة سطح الجذمور. يتم ذلك من خلال استخدام بطانات السيليكون أو البولي يوريثان المتطورة مع التشكيل الهيدروستاتيكي المحوسب، مما يمنع تمركز الضغط على الركبة أو عظمة القصبة ويضمن تروية دمك ممتازة.',
    indication: 'مناسب لجميع حالات بتر تحت الركبة، وخاصة المرضى النشطين وأصحاب الجلد الحساس أو مرضى السكري.',
    features: [
      'توزيع متساوٍ ومثالي للضغط على كامل سطح الجذمور',
      'يقلل من ظاهرة التورم والاحتكاك السطحي بنسبة 95%',
      'يزيد من التروية الدموية والشعور الطبيعي بالأرض (Proprioception)',
      'يضمن راحة فائقة أثناء المشي والوقوف لفترات طويلة'
    ],
    limitations: [
      'يتطلب استخدام بطانة سيليكون أو جيل عالية الجودة',
      'تكلفة تصنيع أعلى قليلاً من السوكيت التقليدي'
    ],
    comfortRating: 5,
    stabilityRating: 5,
    kLevel: 'K1 - K4',
    weightCategory: 'خفيف جداً (ألياف كربون مدمجة)',
    linerType: 'بطانة سيليكون / بولي يوريثان Gel Liner',
    image: 'https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?q=80&w=1000&auto=format&fit=crop',
    badge: 'الأكثر راحة وانتشاراً',
    bgGradient: 'from-emerald-500/10 via-teal-500/5 to-transparent',
    borderColor: 'border-emerald-200'
  },
  {
    id: 'ptb-socket',
    name: 'سوكيت تحميل وتر الصابونة التقليدي (PTB)',
    nameEn: 'Patellar Tendon Bearing (PTB) Socket',
    category: 'transtibial',
    categoryLabel: 'تحت الركبة (Transtibial)',
    shortDesc: 'التصميم الكلاسيكي المعتمد على نقاط تحميل محددة أبرزها وتر الصابونة واللقمة الإنسية لعظم الساق.',
    fullDesc: 'سوكيت PTB هو التصميم التقليدي الأكثر استخداماً تاريخياً. يركز التحميل على المناطق المقاومة للضغط تشريحياً مثل وتر الصابونة (Patellar Tendon)، بينما يفرغ الضغط تماماً عن المناطق الحساسة مثل رأس عظمة الشظية وبروز القصبة الأحدث.',
    indication: 'حالات البتر تحت الركبة التقليدية، والميزانيات الاقتصادية، والجذمور غير المتورم.',
    features: [
      'تصميم ميكانيكي مجرب وموثوق عقوداً من الزمن',
      'تكلفة اقتصادية وسهولة في التعديل والتصنيع',
      'يناسب الجذمور المستقر ذو الأنسجة اللحمية الجيدة'
    ],
    limitations: [
      'قد يسبب نقاط ضغط عالية على وتر الصابونة عند الاستخدام المكثف',
      'يتطلب ارتداء جوارب قماشية متعددة الطبقات للضبط'
    ],
    comfortRating: 3,
    stabilityRating: 4,
    kLevel: 'K1 - K3',
    weightCategory: 'متوسط الوزن (راتنج وبلاستيك مقوى)',
    linerType: 'جوارب قماشية Soft Foam / Pelite Liner',
    image: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?q=80&w=1000&auto=format&fit=crop',
    badge: 'كلاسيكي اقتصادي',
    bgGradient: 'from-blue-500/10 via-slate-500/5 to-transparent',
    borderColor: 'border-blue-200'
  },
  {
    id: 'vacuum-transtibial',
    name: 'سوكيت الفراغ الفعال المرتفع (Elevated Vacuum)',
    nameEn: 'Active Elevated Vacuum Socket (Harmony/Unity)',
    category: 'transtibial',
    categoryLabel: 'تحت الركبة (Transtibial)',
    shortDesc: 'يستخدم مضخة شفط هوائي سلبية لإنشاء فراغ محكم يمنع أي حركة أو انزلاق للجذمور داخل السوكيت بالمليمتر.',
    fullDesc: 'نظام الفراغ الفعال (Elevated Vacuum) ينشئ ضغطاً سلبياً مستمراً بين بطانة السيليكون وجدار السوكيت بواسطة مضخة ميكانيكية أو إلكترونية متطورة. هذا الشفط يزيل الفراغات الهوائية كلياً، ويحافظ على حجم الجذمور ثابتاً طوال اليوم.',
    indication: 'الرياضيين، كبار السن النشطين، الحالات التي تعاني من تغير حجم الجذمور أو الاحتكاك الجلدي.',
    features: [
      'تثبيت مطلق بدون أي انزلاق حر كلياً (Zero Piston Movement)',
      'يحافظ على ثبات حجم الجذمور ومنع التورم المسائي بنسبة 99%',
      'يزيد من التروية الدموية ويحسن الأداء الرياضي الحركي',
      'شعور فائق بالطرف الصناعي وكأنه جزء لا يتجزأ من الجسم'
    ],
    limitations: [
      'يحتاج لمنظومة غلاف شافط (Sleeve) محكمة كلياً',
      'يتطلب صيانة دورية لمضخة الفراغ والصمامات'
    ],
    comfortRating: 5,
    stabilityRating: 5,
    kLevel: 'K2 - K4',
    weightCategory: 'خفيف مع مضخة دقيقة',
    linerType: 'بطانة سيليكون مخصصة للشفط مع Sleeve',
    image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=1000&auto=format&fit=crop',
    badge: 'تكنولوجيا بيونيكية متقدمة',
    bgGradient: 'from-indigo-500/10 via-purple-500/5 to-transparent',
    borderColor: 'border-indigo-200'
  },
  {
    id: 'flexible-frame-socket',
    name: 'السوكيت الداخلي المرن مع الإطار الكربوني (Flexible Inner / Carbon Frame)',
    nameEn: 'Flexible Inner Socket with Rigid Carbon Frame',
    category: 'transtibial',
    categoryLabel: 'تحت الركبة (Transtibial)',
    shortDesc: 'بطانة داخلية مرنة جداً محاطة بنوافذ كربونية صلبة، تتيح تمدد العضلات وانقباضها بحرية تامة.',
    fullDesc: 'يتكون هذا النظام الفريد من سوكيت داخلي مصنوع من البوليمر المرن الفائق التكيف، مدعوم بكورسيه أو إطار كربوني خارجي مقصوص بنوافذ تشريحية (Windows/Cutouts). يسمح هذا التصميم بمرونة الحركة وانقباض العضلات الطبيعي عند المشي والجلوس.',
    indication: 'الرياضيين، مستخدمي الأطراف ذوي البنية العضلية النشطة، وحالات البحث عن أقصى درجات المرونة.',
    features: [
      'مرونة عالية تتكيف مع حركة وانقباض عضلات الجذمور',
      'تفتحات تهوية وتخفيف الضغط عند الحركة والجلوس',
      'وزن فائق الخفة بفضل تفريغ الإطار الكربوني الخارجي',
      'مظهر أنيق وحديث يوحي بالتطور التقني'
    ],
    limitations: [
      'يتطلب مهارة عالية جداً من الفني أثناء تصميم النوافذ الكربونية',
      'تكلفة أعلى في مرحلة التصنيع بدقة'
    ],
    comfortRating: 5,
    stabilityRating: 4,
    kLevel: 'K3 - K4',
    weightCategory: 'خفيف جداً (Super Light Carbon)',
    linerType: 'بطانة مرنة مدمجة Flexible Copolymer',
    image: 'https://images.unsplash.com/photo-1579684385127-1ef15d508118?q=80&w=1000&auto=format&fit=crop',
    badge: 'راحة ومرونة عضلية',
    bgGradient: 'from-cyan-500/10 via-teal-500/5 to-transparent',
    borderColor: 'border-cyan-200'
  },

  // 2. Transfemoral Sockets (فوق الركبة)
  {
    id: 'ischial-containment',
    name: 'سوكيت احتواء حدبة الإسخية (Ischial Containment - IC / MAS)',
    nameEn: 'Ischial Containment (IC) & MAS Socket',
    category: 'transfemoral',
    categoryLabel: 'فوق الركبة (Transfemoral)',
    shortDesc: 'يعانق عظم الإسخية وعظم الفخذ من الداخل، يمنع انحراف الطرف للخارج ويوفر اتزاناً هائلاً أثناء المشي.',
    fullDesc: 'سوكيت IC التشريحي يغلف حدبة الإسخية (Ischial Tuberosity) وفرع العظم الإسخي داخل حافته الخلفية الإنسية. يوفر هذا الحصر الميكانيكي قفلاً يمنع عظم الفخذ من الميلان للخارج (Abduction) أثناء مرحلة الوقوف، مما يمنح المريض مشية طبيعية كلياً وثباتاً ممتازاً.',
    indication: 'جميع حالات البتر فوق الركبة، خاصة الراغبين في مشية طبيعية بدون عرج جانبى.',
    features: [
      'تثبيت تشريحي يمنع ميلان وانحراف عظم الفخذ للخارج',
      'تحسين كفاءة المشي وتقليل استهلاك الطاقة بنسبة 30%',
      'توزيع محاذاتي ممتاز يعزز الثبات في المنحدرات والسلالم',
      'مظهر خارجي طبيعي متناسق تحت الملابس'
    ],
    limitations: [
      'يتطلب أخذ مقاسات تشريحية دقيقة جداً لعظم الحوض والإسخية',
      'قد يحتاج عدة جلسات تجربة ضبط سوكيت شفاف'
    ],
    comfortRating: 4,
    stabilityRating: 5,
    kLevel: 'K2 - K4',
    weightCategory: 'متوسط إلى خفيف (كربون مصفح)',
    linerType: 'بطانة سيليكون فوق الركبة مع قفل مسمار/شفط',
    image: 'https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?q=80&w=1000&auto=format&fit=crop',
    badge: 'الاستقرار التشريحي القياسي',
    bgGradient: 'from-purple-500/10 via-pink-500/5 to-transparent',
    borderColor: 'border-purple-200'
  },
  {
    id: 'hifi-socket',
    name: 'سوكيت هاي فاي الانضغاطي المباشر (HiFi Compression Socket)',
    nameEn: 'High-Fidelity (HiFi) Segmented Socket System',
    category: 'transfemoral',
    categoryLabel: 'فوق الركبة (Transfemoral)',
    shortDesc: 'شفرات وأشرطة انضغاطية تمسك عظم الفخذ مباشرة، لمنع دوران الطرف ونقل الطاقة الفوري.',
    fullDesc: 'تكنولوجيا HiFi الثورية تعتمد على تقسيم السوكيت الدائري إلى شفرات وأشرطة انضغاطية طولية (Alternating Compression Zones). تعمل هذه الشفرات على الضغط بين العضلات والوصول إلى عظم الفخذ مباشرة لتثبيته عظمياً (Osseous Stabilization)، مما يلغي كلياً تأخير الحركة والدوران داخل السوكيت.',
    indication: 'المرضى الرياضيين فوق الركبة، البتر العالي، والباحثين عن نقل طاقة فوري وتفاعل بيونيكي.',
    features: [
      'تثبيت مباشر لعظم الفخذ يلغي الدوران والحركة الداخلية',
      'استجابة فورية ونقل طاقة ممتازة للركبة الذكية البيونيكية',
      'تحكم وثبات استثنائي أثناء الجري والرياضة والقفز',
      'إحساس دقيق بملامسة الأرض وثبات العضلات'
    ],
    limitations: [
      'يتطلب تدريباً وتدقيقاً استثنائياً من أخصائي التراف الصناعية',
      'تكنولوجيا مسجلة بتكلفة أعلى'
    ],
    comfortRating: 5,
    stabilityRating: 5,
    kLevel: 'K3 - K4',
    weightCategory: 'خفيف متقدم',
    linerType: 'بطانة مخصصة عالية الانقياء HiFi Liner',
    image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?q=80&w=1000&auto=format&fit=crop',
    badge: 'قمة التكنولوجيا فوق الركبة',
    bgGradient: 'from-amber-500/10 via-orange-500/5 to-transparent',
    borderColor: 'border-amber-200'
  },
  {
    id: 'sub-ischial-socket',
    name: 'سوكيت أسفل الإسخية بالفراغ (Sub-Ischial Vacuum Socket)',
    nameEn: 'Sub-Ischial Suction & Vacuum Socket',
    category: 'transfemoral',
    categoryLabel: 'فوق الركبة (Transfemoral)',
    shortDesc: 'حافة منخفضة تحت عظم الإسخية بدون أي ضغط على الحوض، مع الاعتماد على الشفط لتوفير حرية جلوس مطلقة.',
    fullDesc: 'يعد السوكيت أسفل الإسخية انقلابات في راحة الأطراف فوق الركبة. بفضل التخلي عن الحافة العالية التي تضغط على منطقة الحوض والإسخية، والاعتماد الكامل على الشفط أو الفراغ المرتفع، يحصل المريض على حرية حركة كاملة لمفصل الورك وراحة فائقة أثناء قيادة السيارة والجلوس.',
    indication: 'مستخدمي الأطراف فوق الركبة الباحثين عن راحة الجلوس، سائقي السيارات، والجذمور ذو العضلات الجيدة.',
    features: [
      'إلغاء حافة الحوض المزعجة والضغط على منطقة الإسخية تماماً',
      'مرونة وحرية حركة كاملة 100% لمفصل الورك والجلوس',
      'راحة استثنائية عند الجلوس وقيادة السيارة والأعمال المكتبية',
      'اعتماد على الشفط لضمان التعليق القوي والمحكم'
    ],
    limitations: [
      'يتطلب جذمور فخذ ذو عضلات وقوة مناسبة وشكل متناسق',
      'يتطلب استخدام نظام شفط هوائي كفؤ'
    ],
    comfortRating: 5,
    stabilityRating: 4,
    kLevel: 'K2 - K4',
    weightCategory: 'خفيف خالي من الزوائد الحوضية',
    linerType: 'بطانة سيليكون Seal-In الشافطة',
    image: 'https://images.unsplash.com/photo-1516549655169-df83a0774514?q=80&w=1000&auto=format&fit=crop',
    badge: 'أقصى راحة عند الجلوس',
    bgGradient: 'from-blue-500/10 via-indigo-500/5 to-transparent',
    borderColor: 'border-blue-200'
  },
  {
    id: 'quadrilateral-socket',
    name: 'السوكيت الرباعي التقليدي (Quadrilateral Socket)',
    nameEn: 'Quadrilateral Transfemoral Socket',
    category: 'transfemoral',
    categoryLabel: 'فوق الركبة (Transfemoral)',
    shortDesc: 'تصميم مربع الشكل يحمل الوزن على رف مسطح خلفي مخصص لحدبة الإسخية.',
    fullDesc: 'السوكيت الرباعي هو النمط القديم المعتمد فوق الركبة. يتميز بمقاطعه الأربعة المحددة ورف مسطح خلفي (Ischial Seat) لتلقي وزن الجسم عند الوقوف والمشي.',
    indication: 'المستخدمون القدامى الذين اعتادوا على هذا التصميم لعقود، أو الحالات ذات المتطلبات البسيطة.',
    features: [
      'تكلفة اقتصادية وسهولة صيانة',
      'دعم جيد للوزن على الرف الإسخي الخلفي'
    ],
    limitations: [
      'قد يسبب بروزاً جانبياً وتوسعاً في المشية (Wide base gait)',
      'ضغط مركز على المقعد الإسخي الخلفي'
    ],
    comfortRating: 3,
    stabilityRating: 3,
    kLevel: 'K1 - K2',
    weightCategory: 'متوسط الوزن',
    linerType: 'جوارب قماشية / بطانة بولي يوريثان',
    image: 'https://images.unsplash.com/photo-1584515933487-779824d29309?q=80&w=1000&auto=format&fit=crop',
    badge: 'تقليدي كلاسيكي',
    bgGradient: 'from-slate-500/10 via-gray-500/5 to-transparent',
    borderColor: 'border-slate-200'
  },

  // 3. Specialized & Disarticulation Sockets (بتر المفاصل والحالات الخاصة)
  {
    id: 'syme-chopart-socket',
    name: 'سوكيت بتر مفصل الكاحل والقدم (Syme / Chopart Socket)',
    nameEn: 'Syme & Partial Foot Disarticulation Socket',
    category: 'specialized',
    categoryLabel: 'بتر المفاصل والحالات الخاصة',
    shortDesc: 'تصميم مخصص بنوافذ جانبية أو بطانة مرنة لاستيعاب انتفاخ عظم الكاحل ونقل الوزن كاملاً على الكعب.',
    fullDesc: 'بتر صايم (Syme) ومفصل الكاحل يتميز بقدرة نهاية الجذمور على تحمل وزن الجسم كاملاً (End-Bearing). ونظراً لكون نهاية عظام الكاحل عريضة (Malleoli)، يتم تصميم السوكيت بنوافذ مرنة (Medial Window / Clamshell) أو بطانة مطاطية تتيح مرور الجزء العريض ثم القفل المحكم عليه.',
    indication: 'حالات بتر صايم (Syme)، بتر تشوبارت (Chopart)، وبتر مفصل الكاحل.',
    features: [
      'استغلال خاصية التحميل المباشر على نهاية الجذمور (End Bearing)',
      'نظام نافذة مرنة أو غلاف مزدوج يسهل الارتداء والخلع',
      'توزيع ممتاز للضغط وراحة فائقة أثناء الوقوف',
      'حجم مدمج يتيح استخدام أقدام خاصة منخفضة الارتفاع'
    ],
    limitations: [
      'يتطلب استخدام أقدام خاصة منخفضة الارتفاع (Low profile feet)',
      'التصنيع يتطلب دقة لمنع اتساع الجزء السفلي'
    ],
    comfortRating: 5,
    stabilityRating: 5,
    kLevel: 'K1 - K4',
    weightCategory: 'خفيف مدمج',
    linerType: 'بطانة مرنة مدمجة صايم',
    image: 'https://images.unsplash.com/photo-1532938911079-1b06ac7ceec7?q=80&w=1000&auto=format&fit=crop',
    badge: 'تحميل مباشر على الكعب',
    bgGradient: 'from-rose-500/10 via-red-500/5 to-transparent',
    borderColor: 'border-rose-200'
  },
  {
    id: 'knee-disarticulation-socket',
    name: 'سوكيت بتر مفصل الركبة (Knee Disarticulation Socket)',
    nameEn: 'Knee Disarticulation Socket',
    category: 'specialized',
    categoryLabel: 'بتر المفاصل والحالات الخاصة',
    shortDesc: 'يستغل الطول الكامل لعظم الفخذ وقدرة لقمات الركبة العريضة على تحميل الوزن بالكامل دون الضغط على الحوض.',
    fullDesc: 'بتر مفصل الركبة يحتفظ بعظم الفخذ كاملاً بلُقمات الركبة العريضة. يتميز السوكيت بنهايته اللمفية العريضة التي تحمل الوزن كاملاً (End Bearing)، مع الاستغناء عن القفل الحوضي العلوي، مما يعطي ذراع قوة طويل جداً للتحكم بالطرف.',
    indication: 'حالات بتر مفصل الركبة (Knee Disarticulation).',
    features: [
      'تحميل كامل الوزن على نهاية عظم الفخذ بدون ضغط على الإسخية',
      'ثبات وتحكم هائل بفضل طول عظم الفخذ المتبقي',
      'تعليق ميكانيكي طبيعي على لقمات الفخذ دون حاجة لأحزمة صلبة'
    ],
    limitations: [
      'مفصل الركبة الاصطناعي قد يظهر أنزاحاً أسفل من الركبة الطبيعية قليلاً عند الجلوس'
    ],
    comfortRating: 5,
    stabilityRating: 5,
    kLevel: 'K2 - K4',
    weightCategory: 'متوسط إلى خفيف',
    linerType: 'بطانة بولي يوريثان أو جيل مرنة',
    image: 'https://images.unsplash.com/photo-1579684385127-1ef15d508118?q=80&w=1000&auto=format&fit=crop',
    badge: 'ثبات وقوة رفيعة',
    bgGradient: 'from-orange-500/10 via-amber-500/5 to-transparent',
    borderColor: 'border-orange-200'
  },
  {
    id: 'hip-pelvic-socket',
    name: 'سوكيت الحوض الشامل لبتر الورك (Hip Disarticulation Pelvic Basket)',
    nameEn: 'Hip Disarticulation / Hemipelvectomy Pelvic Socket',
    category: 'specialized',
    categoryLabel: 'بتر المفاصل والحالات الخاصة',
    shortDesc: 'كورسيه وسوكيت حوضي ثلاثي الأبعاد يعانق منطقة الحوض والبطن لنقل وزن الجسم واستقرار العمود الفقري.',
    fullDesc: 'في حالات بتر مفصل الورك أو استئصال نصف الحوض (Hemipelvectomy)، يتم تصميم سوكيت حوضي ثلاثي الأبعاد كورسيه (Pelvic Basket) يعانق عظام الحوض والعجز والبطن. يضمن هذا السوكيت نقل الوزن بأمان واستقرار كامل للعمود الفقري أثناء استخدام مفصل الورك البيونيكي أو الميكانيكي.',
    indication: 'حالات بتر مفصل الورك واستئصال نصف الحوض.',
    features: [
      'توزيع محوري للوزن على عظام البطن والقفص الصدري والعجز',
      'حماية كاملة واستقرار للعمود الفقري وميلان الحوض',
      'تصميم مخصص بأنسجة كربونية خفيفة وفتحات تهوية مرنة'
    ],
    limitations: [
      'حجم أكبر يتطلب ملاءمة دقيقة للجلوس والارتداء'
    ],
    comfortRating: 4,
    stabilityRating: 5,
    kLevel: 'K1 - K3',
    weightCategory: 'كورسيه كربوني متين خفيف',
    linerType: 'بطانة إسفنجية تشريحية مرنة مع حزام دعم',
    image: 'https://images.unsplash.com/photo-1581594693702-fbdc51b2763b?q=80&w=1000&auto=format&fit=crop',
    badge: 'تثبيت حوضي شامل',
    bgGradient: 'from-red-500/10 via-pink-500/5 to-transparent',
    borderColor: 'border-red-200'
  },

  // 4. Upper Limb Sockets (الطرف العلوي)
  {
    id: 'myoelectric-arm-socket',
    name: 'سوكيت الذراع الكهرومغناطيسي الذكي (Myoelectric Arm Socket)',
    nameEn: 'Myoelectric Upper Limb Sensor Socket',
    category: 'upperlimb',
    categoryLabel: 'الطرف العلوي (Upper Limb)',
    shortDesc: 'مزود بفتحات ومستشعرات كهرومغناطيسية تتصل بعضلات الذراع لنقل الإشارات لليد البيونيكية والمرفق.',
    fullDesc: 'سوكيت الأطراف العلوية الذكية يحتوي على مستشعرات كهرومغناطيسية (Myoelectric Electrodes) مدمجة بدقة في جداره الداخلي وتلامس جلد الذراع مباشرة. عند انقباض عضلات الساعد أو العضد، تلتقط المستشعرات الإشارات الكهربية الدقيقة وتحولها لأوامر حركة في اليد والمرفق البيونيكي.',
    indication: 'بتر الطرف العلوي تحت أو فوق المرفق الراغبين في تركيب أطراف بيونيكية ذكية.',
    features: [
      'مستشعرات مدمجة بالمليمتر على النقاط العضلية النشطة',
      'بطانة داخلية مرنة تضمن استقرار المستشعرات ومنع التزحزح',
      'تصميم كربوني خفيف يمنح مظهراً طبيعياً واستجابة فورية',
      'متوافق مع تقنيات إعادة التوجيه العصبي (TMR)'
    ],
    limitations: [
      'يتطلب الحفاظ على جفاف الجلد ونظافة الألكترودات',
      'يتطلب تحديد نقاط الإشارة العضلية بدقة عالية مع الأخصائي'
    ],
    comfortRating: 5,
    stabilityRating: 5,
    kLevel: 'نشاط علوي متقدم',
    weightCategory: 'فائق الخفة (Carbon Fiber Shell)',
    linerType: 'بطانة سيليكون شفافة مع فتحات ألكترودات',
    image: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?q=80&w=1000&auto=format&fit=crop',
    badge: 'تحكم بيونيكي عضلي',
    bgGradient: 'from-violet-500/10 via-purple-500/5 to-transparent',
    borderColor: 'border-violet-200'
  },
  {
    id: 'body-powered-arm-socket',
    name: 'سوكيت الذراع الميكانيكي بالأسلاك (Body-Powered Harness Socket)',
    nameEn: 'Body-Powered Arm & Shoulder Harness Socket',
    category: 'upperlimb',
    categoryLabel: 'الطرف العلوي (Upper Limb)',
    shortDesc: 'سوكيت ميكانيكي يعتمد على أربطة الكتف والأسلاك الفولاذية لفتح وإغلاق اليد والخطاف بالحركة.',
    fullDesc: 'التصميم الميكانيكي الكلاسيكي للأطراف العلوية. يتكون من سوكيت مريح مع نظام حمالات وأربطة كتف (Harness System) وكابل فولاذي. عند تحريك الكتف المعاكس أو مد الذراع، يمتد الكابل ليفتح أو يغلق الخطاف واليد الميكانيكية.',
    indication: 'العمل الشاق، الأنشطة الخارجية، الميزانيات الاقتصادية، والأماكن المائية والترابية.',
    features: [
      'متانة استثنائية ومقاومة كاملة للماء والتراب والظروف الشاقة',
      'إحساس باللمس والرد الميكانيكي (Proprioceptive Feedback) عبر الكابل',
      'تكلفة اقتصادية وسهولة في الصيانة ولا يحتاج شحن بطاريات'
    ],
    limitations: [
      'يحتاج لاستخدام حركة الكتف المعاكس للتحكم',
      'مظهر أقل شبهاً باليد الطبيعية مقارنة بالبيونيك'
    ],
    comfortRating: 4,
    stabilityRating: 4,
    kLevel: 'نشاط عملي شاق',
    weightCategory: 'خفيف متين',
    linerType: 'بطانة قماشية مريحة مع حزام كتف',
    image: 'https://images.unsplash.com/photo-1530497610245-94d3c16cda28?q=80&w=1000&auto=format&fit=crop',
    badge: 'عملي شاق مقاوم للظروف',
    bgGradient: 'from-blue-500/10 via-indigo-500/5 to-transparent',
    borderColor: 'border-blue-200'
  },

  // 5. Suspension & Liners Systems (أنظمة التثبيت والبطانات)
  {
    id: 'pin-lock-suspension',
    name: 'نظام التثبيت بالمسمار والقفل الأوتوماتيكي (Pin-Lock / Shuttle Lock)',
    nameEn: 'Pin-Lock & Shuttle Lock Suspension System',
    category: 'suspension',
    categoryLabel: 'أنظمة التثبيت والبطانات',
    shortDesc: 'مسمار قفلي مثبت بنهاية بطانة السيليكون يدخل في قفل ميكانيكي بقاع السوكيت يصدر صوتاً مؤكداً للقفل.',
    fullDesc: 'نظام Pin-Lock يعتبر من أشهر وأسهل أنظمة تعليق الأطراف. يرتدي المريض بطانة السيليكون المزودة بمسمار مقعدي (Pin) في أسفلها، وعند إدخال الجذمور في السوكيت يمر المسمار داخل جهاز قفل (Shuttle Lock) بقاع السوكيت، مع سماع أصوات كلكات تثبيت متدرجة. وللخلع، يتم الضغط على زر تحرير جانبى بسيط.',
    indication: 'مرضى بتر تحت وفوق الركبة الراغبين في نظام ارتداء وخلع سهل ومباشر جداً.',
    features: [
      'سهولة فائقة في الارتداء والخلع بزر تحرير جانبى بسيط',
      'تأكيد ثبات القفل لسماع أصوات الكلكات الميكانيكية',
      'تعليق قوي يمنع انفصال الطرف تماماً'
    ],
    limitations: [
      'قد يسبب حركات سحب خفيفة جداً (Pistoning) في الجذمور ذو اللحم المرخو'
    ],
    comfortRating: 4,
    stabilityRating: 5,
    kLevel: 'K1 - K4',
    weightCategory: 'نظام قفل مدمج خفيف',
    linerType: 'بطانة سيليكون مزودة برزوز قفل سفلي',
    image: 'https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?q=80&w=1000&auto=format&fit=crop',
    badge: 'السهل الممتنع وسريع الخلع',
    bgGradient: 'from-teal-500/10 via-emerald-500/5 to-transparent',
    borderColor: 'border-teal-200'
  },
  {
    id: 'seal-in-liner-system',
    name: 'بطانة السيليكون ذات حلقة التفريغ الشافطة (Seal-In Ring Liner)',
    nameEn: 'Seal-In Ring Suction Liner System',
    category: 'suspension',
    categoryLabel: 'أنظمة التثبيت والبطانات',
    shortDesc: 'حلقة جوان سيليكونية مرنة تحبس الهواء في الجزء السفلي بوجود صمام تفريغ احادي الاتجاه.',
    fullDesc: 'تعتمد تقنية Seal-In على بطانة سيليكون مدمجة بحلقة مانعة للتسرب (Hypobaric Sealing Ring) مرنة حول محيطها. عند دخول الجذمور، ينضغط الهواء ويخرج من صمام اتجاه واحد (Push Valve)، مما ينشئ قفلاً ميكانيكياً وفراغياً شافطاً محكماً دون الحاجة لارتداء غلاف خارجي طويل (Sleeve).',
    indication: 'بتر تحت وفوق الركبة، الراغبين في تثبيت شافط بدون غلاف كاحل حر، والمرضى النشطين.',
    features: [
      'تثبيت شافط قوي يلغي الحاجه لارتداء غلاف ركبة خارجي ممتد',
      'حرية حركة ممتازة لمفصل الركبة ومنع ثني الغلاف',
      'سهولة العناية والتنظيف اليومي'
    ],
    limitations: [
      'يتطلب استخدام رذاذ كحول مبخر بسيط لتسهيل الدخول السلس'
    ],
    comfortRating: 5,
    stabilityRating: 5,
    kLevel: 'K2 - K4',
    weightCategory: 'خفيف بدون أغلفة إضافية',
    linerType: 'بطانة Seal-In متطورة بحلقات سيليكونية',
    image: 'https://images.unsplash.com/photo-1579684385127-1ef15d508118?q=80&w=1000&auto=format&fit=crop',
    badge: 'شفط محكم بدون غلاف خارجي',
    bgGradient: 'from-blue-500/10 via-cyan-500/5 to-transparent',
    borderColor: 'border-blue-200'
  },

  // 6. Materials & Fabrication (خامات وتكنولوجيا التصنيع)
  {
    id: 'carbon-composite-material',
    name: 'خامة ألياف الكربون المدمجة (Carbon Fiber Composite)',
    nameEn: 'Carbon Fiber Prosthetic Lamination',
    category: 'materials',
    categoryLabel: 'خامات وتكنولوجيا التصنيع',
    shortDesc: 'ألياف كربونية فائقة المتانة والخفة تصب بالراتنج الاكريليكي تحت التفريغ الهوائي لتوفير أقصى تحمل.',
    fullDesc: 'ألياف الكربون (Carbon Fiber) هي المادة الذهب المستعملة في تصنيع هيكل السوكيت النهائي. يتم تصفيح طبقات الألياف الكربونية واتجاهاتها هندسياً وفق نقاط الإجهاد للجذمور، ثم صبها براتنج أكريليكي طبي تحت التفريغ الهوائي، مما ينتج سوكيت خفيف للغاية وقوي كالفولاذ.',
    indication: 'جميع السوكيتات النهائية للأطراف السفلية والعلوية.',
    features: [
      'نسبة متانة إلى وزن هي الأعلى عالمياً (High Strength-to-Weight)',
      'صلابة استثنائية تمنع أي تشوه في شكل السوكيت تحت الأحمال العالية',
      'مظهر جمالي راقي بلون الكربون الأسود اللامع أو الشفاف'
    ],
    limitations: [
      'لا يمكن تعديل شكله بالحرارة بعد الصب النهائي (يتطلب سوكيت شفاف قبله)'
    ],
    comfortRating: 5,
    stabilityRating: 5,
    kLevel: 'جميع المستويات K1 - K4',
    weightCategory: 'أخف خامة هيكلية',
    linerType: 'متوافق مع كافة أنواع البطانات',
    image: 'https://images.unsplash.com/photo-1581092335397-9583fe92d232?q=80&w=1000&auto=format&fit=crop',
    badge: 'قوة الفولاذ بوزن الريشة',
    bgGradient: 'from-zinc-500/10 via-slate-500/5 to-transparent',
    borderColor: 'border-zinc-300'
  },
  {
    id: 'check-socket-diagnostic',
    name: 'سوكيت التجربة والتشخيص الشفاف (Check Socket / Diagnostic Socket)',
    nameEn: 'Transparent Diagnostic Check Socket',
    category: 'materials',
    categoryLabel: 'خامات وتكنولوجيا التصنيع',
    shortDesc: 'سوكيت شفاف مؤقت من البلاستيك الحراري يرتديه المريض لتحديد نقاط الضغط ورؤية الجلد بالعين المجردة.',
    fullDesc: 'خطوة جوهرية لا غنى عنها في مركز واصل! يتم تصنيع سوكيت شفاف مؤقت (Check Socket) من مادة البلاستيك الحراري الشفاف (PETG/Thermoform). يرتديه المريض ويقوم بالمشي عليه، مما يسمح للأخصائي برؤية انضغاط الجلد وتغير لونه بالعين المجردة وتعديل المناطق الضيقة بالحرارة قبل الصب النهائي.',
    indication: 'مرحلة التجربة الضرورية لكل مريض قبل تصنيع السوكيت النهائي.',
    features: [
      'شفافية كاملة 100% تمكن من فحص الجلد بالعين المجردة أثناء المشي',
      'إمكانية التعديل والتوسيع والتضييق بالحرارة فوراً في العيادة',
      'ضمان الوصول لملاءمة 100% خالية من الألم قبل الصب النهائي للكربون'
    ],
    limitations: [
      'مؤقت مخصص لمرحلة التشخيص فقط وليس للاستخدام الدائم'
    ],
    comfortRating: 4,
    stabilityRating: 4,
    kLevel: 'مرحلة التشخيص',
    weightCategory: 'بلاستيك حراري شفاف',
    linerType: 'تجارب البطانات المختلفة',
    image: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?q=80&w=1000&auto=format&fit=crop',
    badge: 'ضمان دقة المقاس بنسبة 100%',
    bgGradient: 'from-amber-500/10 via-yellow-500/5 to-transparent',
    borderColor: 'border-amber-200'
  }
];

// ─── Data: Socket Manufacturing Steps (مراحل التصنيع 3D / CAD / CAM) ───
const MANUFACTURING_STEPS: ManufacturingStep[] = [
  {
    stepNumber: 1,
    title: 'المسح الضوئي ثلاثي الأبعاد والقياسات الرقمية',
    titleEn: '3D Laser Scanning & Anatomic Evaluation',
    techType: '3D Laser Scanner',
    shortDesc: 'أخذ قياسات تشريحية بالمليمتر للجذمور باستخدام الماسح الضوئي الليزري دون ألم أو عجين جبسي تقليدي.',
    detailedProcess: [
      'يقوم الأخصائي بمسح الجذمور ضوئياً بماسح ليزري ثلاثي الأبعاد ثلاثي الأبعاد ثلاثي الأبعاد في ثوانٍ معدودة.',
      'إنشاء مجسم رقمي ثلاثي الأبعاد (Digital Cloud Points) بدقة تصل إلى 0.1 مليمتر.',
      'تحديد البروزات العظمية، وتر الصابونة، والمناطق الرخوة والحساسة تشريحياً على الشاشة.'
    ],
    keyTools: ['3D Scanner', 'digital Calipers', 'Goniometer'],
    image: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?q=80&w=1000&auto=format&fit=crop'
  },
  {
    stepNumber: 2,
    title: 'التصميم والتعديل الرقمي بالحاسوب (CAD)',
    titleEn: 'Computer-Aided Design (CAD Modeling)',
    techType: 'CAD Software for O&P',
    shortDesc: 'تعديل موديل السوكيت رقمياً على برامج هندسية مخصصة لتخفيف وتوزيع الضغط بدقة تشريحية فائقة.',
    detailedProcess: [
      'تعديل الموديل الرقمي على برامج O&P CAD المخصصة للطرف الصناعي.',
      'إضافة التخفيف اللازم فوق العظام وزيادة الانضغاط الهيدروستاتيكي في المناطق الأنسجية.',
      'محاكاة توزيع الأحجام وتحديد زوايا السوكيت التشريحية المثالية.'
    ],
    keyTools: ['O&P CAD Design Software', 'Biomechanics Simulator'],
    image: 'https://images.unsplash.com/photo-1581092335397-9583fe92d232?q=80&w=1000&auto=format&fit=crop'
  },
  {
    stepNumber: 3,
    title: 'النحت الآلي ثلاثي الأبعاد (CNC Carving) / الطباعة 3D',
    titleEn: 'Robotic CNC Milling / 3D Printing',
    techType: '5-Axis CNC & Industrial 3D Printer',
    shortDesc: 'نحت القالب الجبسي أو طباعة السوكيت هيدروليكياً بروبوتات خماسية المحاور بسرعة ودقة فائقة.',
    detailedProcess: [
      'إرسال ملف CAD المعتمد إلى ماكينة النحت الآلي خماسية المحاور (5-Axis CNC Milling Router).',
      'نحت القالب في دقائق معدودة بالدقة الرقمية الصارمة بدون أخطاء يدوية.',
      'أو طباعة هيكل السوكيت الأولي بطابعات مخصصة 3D Printers بخامات البوليمر المعزز.'
    ],
    keyTools: ['5-Axis CNC Router', 'Industrial 3D Printers'],
    image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=1000&auto=format&fit=crop'
  },
  {
    stepNumber: 4,
    title: 'تجربة السوكيت الشفاف وتعديل نقاط الضغط (Check Socket)',
    titleEn: 'Diagnostic Check Socket Fitting & Alignment',
    techType: 'Transparent PETG Fitting',
    shortDesc: 'ارتداء المريض لسوكيت شفاف للمشي والتأكد بالعين المجردة من راحة الجلد وعدم وجود ألم.',
    fullDesc: '',
    detailedProcess: [
      'تشكيل سوكيت شفاف مؤقت من مادة البلاستيك الحراري الشفاف الملموس.',
      'تجربة السوكيت على المريض ومراقبة تغير لون الجلد وانضغاطه بالعين المجردة أثناء المشي.',
      'إجراء التعديلات الحرارية التلقائية فوراً بالمسدس الحراري في عيادة واصل لضمان راحة 100%.'
    ],
    keyTools: ['Heat Gun', 'Aligner Laser Level', 'Dynamic Gait Platform'],
    image: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?q=80&w=1000&auto=format&fit=crop'
  },
  {
    stepNumber: 5,
    title: 'الصب النهائي بألياف الكربون والتسليم (Carbon Lamination)',
    titleEn: 'Carbon Fiber Vacuum Lamination & Final Alignment',
    techType: 'Vacuum Acrylic Carbon Lamination',
    shortDesc: 'صب السوكيت النهائي من ألياف الكربون الصلبة الخفيفة ومحاذاته ديناميكياً مع مفصل الركبة والقدم.',
    detailedProcess: [
      'تصفيع طبقات ألياف الكربون والأنسجة المدمجة فوق القالب المعاير.',
      'سحب الهواء وسكب الراتنج الأكريليكي الطبي تحت شفط التفريغ الهوائي (Vacuum Lamination).',
      'تركيب صمام التعليق أو القفل والتركيب النهائى على جهاز المحاذاة الليزري (Laser Alignment Setup).'
    ],
    keyTools: ['Vacuum Lamination Pump', 'Acrylic Resin', 'Carbon Sleeves'],
    image: 'https://images.unsplash.com/photo-1579684385127-1ef15d508118?q=80&w=1000&auto=format&fit=crop'
  }
];

// ─── Main Component ───
const SocketInfo: React.FC = () => {
  // States
  const [activeTab, setActiveTab] = useState<'catalog' | 'manufacturing' | 'comparison'>('catalog');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [detailModalItem, setDetailModalItem] = useState<SocketTypeItem | null>(null);
  
  // Comparison States
  const [compareItem1, setCompareItem1] = useState<SocketTypeItem | null>(null);
  const [compareItem2, setCompareItem2] = useState<SocketTypeItem | null>(null);
  const [isCompareModalOpen, setIsCompareModalOpen] = useState<boolean>(false);

  // Filtered List
  const filteredSockets = useMemo(() => {
    return ALL_SOCKET_TYPES.filter(item => {
      const matchCat = selectedCategory === 'all' || item.category === selectedCategory;
      const matchSearch = searchQuery.trim() === '' || 
        item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.nameEn.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.shortDesc.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.indication.toLowerCase().includes(searchQuery.toLowerCase());
      return matchCat && matchSearch;
    });
  }, [selectedCategory, searchQuery]);

  // Categories Navigation List
  const categories = [
    { id: 'all', label: 'كافة أنواع السوكيت', icon: Layers, count: ALL_SOCKET_TYPES.length },
    { id: 'transtibial', label: 'تحت الركبة (Transtibial)', icon: Activity, count: ALL_SOCKET_TYPES.filter(i => i.category === 'transtibial').length },
    { id: 'transfemoral', label: 'فوق الركبة (Transfemoral)', icon: ShieldCheck, count: ALL_SOCKET_TYPES.filter(i => i.category === 'transfemoral').length },
    { id: 'specialized', label: 'بتر المفاصل والحالات الخاصة', icon: Award, count: ALL_SOCKET_TYPES.filter(i => i.category === 'specialized').length },
    { id: 'upperlimb', label: 'الطرف العلوي (Upper Limb)', icon: Cpu, count: ALL_SOCKET_TYPES.filter(i => i.category === 'upperlimb').length },
    { id: 'suspension', label: 'أنظمة التثبيت والبطانات', icon: Zap, count: ALL_SOCKET_TYPES.filter(i => i.category === 'suspension').length },
    { id: 'materials', label: 'خامات وتكنولوجيا التصنيع', icon: Microscope, count: ALL_SOCKET_TYPES.filter(i => i.category === 'materials').length },
  ];

  // Helper function to toggle comparison
  const handleAddToCompare = (item: SocketTypeItem) => {
    if (!compareItem1) {
      setCompareItem1(item);
    } else if (!compareItem2 && compareItem1.id !== item.id) {
      setCompareItem2(item);
      setIsCompareModalOpen(true);
    } else if (compareItem1.id === item.id) {
      setCompareItem1(null);
    } else if (compareItem2?.id === item.id) {
      setCompareItem2(null);
    } else {
      setCompareItem2(item);
      setIsCompareModalOpen(true);
    }
  };

  return (
    <section id="socket-info" className="py-20 bg-gradient-to-b from-slate-900 via-slate-850 to-slate-900 text-white relative overflow-hidden font-cairo">
      {/* Background Animated Glow FX */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-medical-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[500px] bg-blue-600/5 rounded-full blur-3xl pointer-events-none" />

      <div className="container mx-auto px-4 max-w-7xl relative z-10">
        
        {/* ─── SECTION HEADER ─── */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-bold shadow-inner"
          >
            <Bandage className="w-4 h-4 text-emerald-400 animate-pulse" />
            <span>الدليل الشامل الهندسي والتشريحي لجميع أنواع السوكيتات</span>
          </motion.div>

          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl sm:text-5xl font-black text-white leading-tight tracking-tight"
          >
            السوكيت المقوم <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-teal-300 to-cyan-400">قلب الطرف الصناعي والواجهة التشريحية</span>
          </motion.h2>

          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-slate-300 text-sm sm:text-base leading-relaxed font-medium"
          >
            السوكيت هو العنصر الحاسم الذي ينقل وزن الجسم والطاقة الحركية بين الجذمور والطرف الصناعي. اختيار وتصميم السوكيت المتوافق تشريحياً يحدد 90% من راحة المريض وقدرته على المشي الطبيعي بدون ألم.
          </motion.p>
        </div>

        {/* ─── MAIN TABS NAVIGATION (معرض السوكيتات / مراحل التصنيع 3D / مقارنة الأنواع) ─── */}
        <div className="flex flex-wrap justify-center gap-3 mb-10">
          <button
            onClick={() => setActiveTab('catalog')}
            className={`flex items-center gap-2 px-6 py-3 rounded-2xl font-bold text-sm transition-all duration-300 border ${
              activeTab === 'catalog'
                ? 'bg-gradient-to-r from-emerald-500 to-teal-600 text-white border-emerald-400/50 shadow-lg shadow-emerald-500/25 scale-105'
                : 'bg-slate-800/80 hover:bg-slate-800 text-slate-300 border-slate-700/80 hover:border-slate-600'
            }`}
          >
            <Layers className="w-4 h-4" />
            <span>أنواع السوكيتات والبطانات الشاملة ({ALL_SOCKET_TYPES.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('manufacturing')}
            className={`flex items-center gap-2 px-6 py-3 rounded-2xl font-bold text-sm transition-all duration-300 border ${
              activeTab === 'manufacturing'
                ? 'bg-gradient-to-r from-emerald-500 to-teal-600 text-white border-emerald-400/50 shadow-lg shadow-emerald-500/25 scale-105'
                : 'bg-slate-800/80 hover:bg-slate-800 text-slate-300 border-slate-700/80 hover:border-slate-600'
            }`}
          >
            <Cpu className="w-4 h-4" />
            <span>مراحل التصنيع الرقمي 3D Scanner & CAD/CAM</span>
          </button>

          {(compareItem1 || compareItem2) && (
            <button
              onClick={() => setIsCompareModalOpen(true)}
              className="flex items-center gap-2 px-5 py-3 rounded-2xl font-bold text-sm bg-gradient-to-r from-amber-500 to-orange-600 text-white border border-amber-400/50 shadow-lg shadow-amber-500/20 animate-bounce"
            >
              <ArrowLeftRight className="w-4 h-4" />
              <span>مقارنة الأنواع المختارة ({[compareItem1, compareItem2].filter(Boolean).length})</span>
            </button>
          )}
        </div>

        {/* ─── TAB 1: SOCKET TYPES CATALOG ─── */}
        {activeTab === 'catalog' && (
          <div className="space-y-8">
            
            {/* SEARCH BAR & CATEGORY FILTERS */}
            <div className="bg-slate-800/60 backdrop-blur-xl p-4 sm:p-6 rounded-3xl border border-slate-700/70 shadow-2xl space-y-4">
              
              {/* Search input */}
              <div className="relative max-w-xl mx-auto">
                <Search className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                <Input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="ابحث باسم السوكيت، نوع البتر (تحت الركبة، فوق الركبة)، أو التكنولوجيا..."
                  className="pr-12 pl-4 py-3 bg-slate-900/90 border-slate-700 text-white placeholder-slate-400 rounded-2xl focus:border-emerald-500 focus:ring-emerald-500/30 text-sm font-medium"
                />
                {searchQuery && (
                  <button 
                    onClick={() => setSearchQuery('')}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white"
                  >
                    <X className="w-4 h-4" />
                  </button>
                )}
              </div>

              {/* Filter Pills */}
              <div className="flex flex-wrap items-center justify-center gap-2 pt-2">
                {categories.map((cat) => {
                  const Icon = cat.icon;
                  const isSelected = selectedCategory === cat.id;
                  return (
                    <button
                      key={cat.id}
                      onClick={() => setSelectedCategory(cat.id)}
                      className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold transition-all duration-200 ${
                        isSelected
                          ? 'bg-emerald-500 text-slate-950 font-black shadow-md shadow-emerald-500/20 scale-105'
                          : 'bg-slate-900/80 text-slate-300 hover:bg-slate-700/80 border border-slate-700/60'
                      }`}
                    >
                      <Icon className={`w-3.5 h-3.5 ${isSelected ? 'text-slate-950' : 'text-emerald-400'}`} />
                      <span>{cat.label}</span>
                      <span className={`px-1.5 py-0.5 rounded-full text-[10px] ${
                        isSelected ? 'bg-slate-950 text-emerald-400' : 'bg-slate-800 text-slate-400'
                      }`}>
                        {cat.count}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* SOCKET CARDS GRID */}
            {filteredSockets.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <AnimatePresence>
                  {filteredSockets.map((item, idx) => {
                    const isSelectedForCompare = compareItem1?.id === item.id || compareItem2?.id === item.id;
                    return (
                      <motion.div
                        key={item.id}
                        layout
                        initial={{ opacity: 0, y: 25 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.9 }}
                        transition={{ duration: 0.4, delay: idx * 0.05 }}
                        className={`bg-slate-800/80 backdrop-blur-xl rounded-3xl overflow-hidden border ${item.borderColor} hover:border-emerald-400/60 shadow-xl hover:shadow-2xl hover:shadow-emerald-500/10 transition-all duration-500 flex flex-col justify-between group relative`}
                      >
                        {/* Top Banner Image with Gradient Overlay */}
                        <div className="relative h-56 w-full overflow-hidden bg-slate-950">
                          <img
                            src={item.image}
                            alt={item.name}
                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                            onError={(e) => {
                              e.currentTarget.src = 'https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?q=80&w=1000&auto=format&fit=crop';
                            }}
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/40 to-transparent" />

                          {/* Badge Tag */}
                          <div className="absolute top-3 right-3 z-10">
                            <span className="bg-emerald-500/90 backdrop-blur-md text-slate-950 font-extrabold text-[11px] px-3 py-1 rounded-full shadow-md">
                              {item.badge}
                            </span>
                          </div>

                          {/* Category Badge */}
                          <div className="absolute top-3 left-3 z-10">
                            <span className="bg-slate-900/80 backdrop-blur-md text-slate-300 font-bold text-[10px] px-2.5 py-1 rounded-full border border-slate-700">
                              {item.categoryLabel}
                            </span>
                          </div>

                          {/* Title over image bottom */}
                          <div className="absolute bottom-3 right-4 left-4 z-10">
                            <h3 className="text-lg font-black text-white font-cairo leading-snug group-hover:text-emerald-300 transition-colors">
                              {item.name}
                            </h3>
                            <span className="text-[11px] text-emerald-400 font-mono font-medium block">
                              {item.nameEn}
                            </span>
                          </div>
                        </div>

                        {/* Card Content Body */}
                        <div className="p-5 flex-grow space-y-4">
                          
                          {/* Short Description */}
                          <p className="text-slate-300 text-xs sm:text-sm leading-relaxed line-clamp-3">
                            {item.shortDesc}
                          </p>

                          {/* Feature Highlights */}
                          <div className="space-y-1.5 pt-1">
                            <span className="text-[11px] font-bold text-slate-400 block">أبرز المميزات والخصائص:</span>
                            {item.features.slice(0, 3).map((feat, fIdx) => (
                              <div key={fIdx} className="flex items-start gap-2 text-xs text-slate-200 font-medium">
                                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                                <span className="line-clamp-1">{feat}</span>
                              </div>
                            ))}
                          </div>

                          {/* Specifications Quick Bar */}
                          <div className="grid grid-cols-2 gap-2 pt-3 border-t border-slate-700/60 text-xs">
                            <div className="bg-slate-900/60 p-2 rounded-xl border border-slate-700/50">
                              <span className="text-[10px] font-bold text-slate-400 block">درجة النشاط (K-Level):</span>
                              <span className="font-extrabold text-emerald-400">{item.kLevel}</span>
                            </div>
                            <div className="bg-slate-900/60 p-2 rounded-xl border border-slate-700/50">
                              <span className="text-[10px] font-bold text-slate-400 block">نوع البطانة:</span>
                              <span className="font-bold text-slate-200 truncate block">{item.linerType.split(' ')[0]}...</span>
                            </div>
                          </div>
                        </div>

                        {/* Card Footer Actions */}
                        <div className="p-5 pt-0 flex items-center gap-2">
                          <Button
                            onClick={() => setDetailModalItem(item)}
                            className="flex-1 bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-slate-950 font-black text-xs py-2.5 rounded-xl transition-all duration-300 shadow-md shadow-emerald-500/20"
                          >
                            <Maximize2 className="w-3.5 h-3.5 ml-1.5" />
                            التفاصيل الكاملة والتشريح
                          </Button>

                          <button
                            onClick={() => handleAddToCompare(item)}
                            title={isSelectedForCompare ? 'إلغاء التحديد للمقارنة' : 'إضافة للمقارنة'}
                            className={`p-2.5 rounded-xl border transition-all duration-200 ${
                              isSelectedForCompare
                                ? 'bg-amber-500 text-slate-950 border-amber-400 font-bold'
                                : 'bg-slate-900/80 text-slate-400 hover:text-white border-slate-700/70 hover:border-slate-600'
                            }`}
                          >
                            <ArrowLeftRight className="w-4 h-4" />
                          </button>
                        </div>

                      </motion.div>
                    );
                  })}
                </AnimatePresence>
              </div>
            ) : (
              <div className="text-center py-16 bg-slate-800/40 rounded-3xl border border-slate-700 text-slate-400 space-y-3">
                <HelpCircle className="w-12 h-12 text-slate-500 mx-auto" />
                <p className="text-base font-bold text-slate-300">لم يتم العثور على نتائج تطابق بحثك</p>
                <p className="text-xs text-slate-400">جرب البحث بكلمات أخرى أو اختر تصنيفاً مختلفاً</p>
                <Button 
                  onClick={() => { setSelectedCategory('all'); setSearchQuery(''); }}
                  variant="outline"
                  className="text-xs border-slate-600 text-slate-300 mt-2"
                >
                  عرض كافة السوكيتات
                </Button>
              </div>
            )}

          </div>
        )}

        {/* ─── TAB 2: MANUFACTURING STEPS (CAD/CAM & 3D PRINTING) ─── */}
        {activeTab === 'manufacturing' && (
          <div className="space-y-12 max-w-5xl mx-auto">
            
            {/* Header intro card */}
            <div className="bg-gradient-to-r from-emerald-950/80 via-slate-900 to-teal-950/80 p-6 sm:p-8 rounded-3xl border border-emerald-500/30 text-right space-y-3 shadow-2xl relative overflow-hidden">
              <div className="flex items-center gap-3">
                <Cpu className="w-8 h-8 text-emerald-400" />
                <div>
                  <h3 className="text-xl sm:text-2xl font-black text-white">منظومة التصنيع الرقمي 3D Scanner & CAD/CAM بمركز واصل</h3>
                  <span className="text-xs text-emerald-400 font-mono">Precision Prosthetic Fabrication Protocol</span>
                </div>
              </div>
              <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
                نستخدم أحدث ما توصلت إليه التكنولوجيا الالمانية والامريكية في مسح وتصميم وتصنيع السوكيت رقمياً بدون عجين الجبس التقليدي، لضمان مطابقة متناهية بالمليمتر وتوزيع محاذاة ليزري خالي من أخطاء العنصر البشري.
              </p>
            </div>

            {/* Timeline Steps */}
            <div className="relative border-r-2 border-emerald-500/30 mr-4 sm:mr-8 pr-6 sm:pr-10 space-y-12">
              {MANUFACTURING_STEPS.map((step, idx) => (
                <motion.div
                  key={step.stepNumber}
                  initial={{ opacity: 0, x: 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: idx * 0.1 }}
                  className="relative group"
                >
                  {/* Step Number Dot Icon */}
                  <div className="absolute -right-[31px] sm:-right-[47px] top-0 w-10 h-10 rounded-2xl bg-gradient-to-br from-emerald-400 to-teal-600 text-slate-950 font-black text-lg flex items-center justify-center shadow-lg shadow-emerald-500/30 border-2 border-slate-900">
                    {step.stepNumber}
                  </div>

                  {/* Step Box Card */}
                  <div className="bg-slate-800/80 backdrop-blur-xl p-6 sm:p-8 rounded-3xl border border-slate-700/80 hover:border-emerald-500/50 shadow-xl transition-all duration-300 space-y-5">
                    
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-700/60 pb-4">
                      <div>
                        <span className="text-xs font-mono font-bold text-emerald-400 block mb-1">
                          المرحلة {step.stepNumber} • {step.techType}
                        </span>
                        <h4 className="text-xl font-black text-white font-cairo">
                          {step.title}
                        </h4>
                        <span className="text-xs text-slate-400 font-mono block">
                          {step.titleEn}
                        </span>
                      </div>

                      <div className="flex flex-wrap gap-2">
                        {step.keyTools.map((tool, tIdx) => (
                          <span key={tIdx} className="bg-slate-900 text-emerald-300 text-[11px] font-bold px-2.5 py-1 rounded-lg border border-slate-700">
                            {tool}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
                      
                      {/* Image Preview */}
                      <div className="lg:col-span-4 h-48 rounded-2xl overflow-hidden bg-slate-950 border border-slate-700">
                        <img
                          src={step.image}
                          alt={step.title}
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                          onError={(e) => {
                            e.currentTarget.src = 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=1000&auto=format&fit=crop';
                          }}
                        />
                      </div>

                      {/* Process Steps Details */}
                      <div className="lg:col-span-8 space-y-3">
                        <p className="text-sm font-bold text-slate-200 leading-relaxed">
                          {step.shortDesc}
                        </p>
                        <div className="space-y-2 pt-1">
                          {step.detailedProcess.map((proc, pIdx) => (
                            <div key={pIdx} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-300 leading-relaxed font-medium">
                              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                              <span>{proc}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                    </div>

                  </div>
                </motion.div>
              ))}
            </div>

          </div>
        )}

      </div>

      {/* ─── MODAL 1: DETAILED SPECIFICATIONS MODAL ─── */}
      <Dialog open={!!detailModalItem} onOpenChange={(open) => !open && setDetailModalItem(null)}>
        <DialogContent className="max-w-3xl bg-slate-900 border-slate-700 text-white font-cairo max-h-[90vh] overflow-y-auto p-6 sm:p-8 rounded-3xl">
          {detailModalItem && (
            <div className="space-y-6 text-right">
              
              <DialogHeader className="text-right border-b border-slate-800 pb-4">
                <div className="flex items-center gap-2 mb-1">
                  <Badge className="bg-emerald-500/20 text-emerald-300 border-emerald-500/40 text-xs">
                    {detailModalItem.categoryLabel}
                  </Badge>
                  <Badge className="bg-slate-800 text-slate-300 text-xs">
                    {detailModalItem.badge}
                  </Badge>
                </div>
                <DialogTitle className="text-2xl sm:text-3xl font-black text-white">
                  {detailModalItem.name}
                </DialogTitle>
                <DialogDescription className="text-xs font-mono text-emerald-400">
                  {detailModalItem.nameEn}
                </DialogDescription>
              </DialogHeader>

              {/* Modal Image Header */}
              <div className="h-64 rounded-2xl overflow-hidden bg-slate-950 border border-slate-700 relative">
                <img
                  src={detailModalItem.image}
                  alt={detailModalItem.name}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.currentTarget.src = 'https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?q=80&w=1000&auto=format&fit=crop';
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent" />
              </div>

              {/* Full Description & Indication */}
              <div className="space-y-3 bg-slate-800/60 p-4 sm:p-5 rounded-2xl border border-slate-700">
                <h4 className="text-sm font-bold text-emerald-400 flex items-center gap-2">
                  <Info className="w-4 h-4" />
                  الشرح التشريحي وآلية العمل:
                </h4>
                <p className="text-xs sm:text-sm text-slate-200 leading-relaxed font-medium">
                  {detailModalItem.fullDesc}
                </p>
                <div className="pt-2 border-t border-slate-700/60">
                  <span className="text-xs font-bold text-slate-400 block mb-1">دواعي الاستخدام والتوصية الطبية:</span>
                  <p className="text-xs text-emerald-300 font-bold bg-emerald-950/50 p-2.5 rounded-xl border border-emerald-800/60">
                    {detailModalItem.indication}
                  </p>
                </div>
              </div>

              {/* Ratings & Specs Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-center">
                <div className="bg-slate-800/80 p-3 rounded-2xl border border-slate-700">
                  <span className="text-[10px] text-slate-400 font-bold block">مستوى الراحة:</span>
                  <div className="flex justify-center gap-1 mt-1 text-emerald-400">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Sparkles key={i} className={`w-3.5 h-3.5 ${i < detailModalItem.comfortRating ? 'fill-emerald-400 text-emerald-400' : 'text-slate-600'}`} />
                    ))}
                  </div>
                </div>

                <div className="bg-slate-800/80 p-3 rounded-2xl border border-slate-700">
                  <span className="text-[10px] text-slate-400 font-bold block">درجة الاستقرار:</span>
                  <div className="flex justify-center gap-1 mt-1 text-teal-400">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <ShieldCheck key={i} className={`w-3.5 h-3.5 ${i < detailModalItem.stabilityRating ? 'fill-teal-400 text-teal-400' : 'text-slate-600'}`} />
                    ))}
                  </div>
                </div>

                <div className="bg-slate-800/80 p-3 rounded-2xl border border-slate-700">
                  <span className="text-[10px] text-slate-400 font-bold block">مستوى النشاط (K-Level):</span>
                  <span className="text-xs font-black text-emerald-400 block mt-1">{detailModalItem.kLevel}</span>
                </div>

                <div className="bg-slate-800/80 p-3 rounded-2xl border border-slate-700">
                  <span className="text-[10px] text-slate-400 font-bold block">فئة الوزن والخامة:</span>
                  <span className="text-[11px] font-bold text-slate-200 block mt-1 truncate">{detailModalItem.weightCategory}</span>
                </div>
              </div>

              {/* Pros and Limitations */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                
                {/* Features (Pros) */}
                <div className="bg-emerald-950/30 p-4 rounded-2xl border border-emerald-800/50 space-y-2">
                  <h5 className="text-xs font-bold text-emerald-400 flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4" />
                    المميزات والفوائد التشريحية:
                  </h5>
                  <ul className="space-y-1.5">
                    {detailModalItem.features.map((f, i) => (
                      <li key={i} className="text-xs text-slate-300 flex items-start gap-1.5">
                        <span className="text-emerald-400 font-bold">•</span>
                        <span>{f}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Limitations (Cons) */}
                <div className="bg-slate-800/50 p-4 rounded-2xl border border-slate-700 space-y-2">
                  <h5 className="text-xs font-bold text-amber-400 flex items-center gap-1.5">
                    <Info className="w-4 h-4" />
                    ملاحظات واشتراطات الهامة:
                  </h5>
                  <ul className="space-y-1.5">
                    {detailModalItem.limitations.map((l, i) => (
                      <li key={i} className="text-xs text-slate-300 flex items-start gap-1.5">
                        <span className="text-amber-400 font-bold">•</span>
                        <span>{l}</span>
                      </li>
                    ))}
                  </ul>
                </div>

              </div>

              <div className="pt-2 text-left">
                <Button 
                  onClick={() => setDetailModalItem(null)}
                  className="bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs px-6 rounded-xl border border-slate-700"
                >
                  إغلاق النافذة
                </Button>
              </div>

            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* ─── MODAL 2: COMPARISON MODAL ─── */}
      <Dialog open={isCompareModalOpen} onOpenChange={setIsCompareModalOpen}>
        <DialogContent className="max-w-4xl bg-slate-900 border-slate-700 text-white font-cairo max-h-[90vh] overflow-y-auto p-6 rounded-3xl">
          <DialogHeader className="text-right border-b border-slate-800 pb-4">
            <DialogTitle className="text-2xl font-black text-white flex items-center gap-2">
              <ArrowLeftRight className="w-6 h-6 text-amber-400" />
              مقارنة ميكانيكية بين أنواع السوكيت المختارة
            </DialogTitle>
            <DialogDescription className="text-xs text-slate-400">
              مقارنة المزايا التشريحية ومستويات النشاط لكل نوع لمساعدتك في اتخاذ القرار الأمثل.
            </DialogDescription>
          </DialogHeader>

          {compareItem1 && compareItem2 ? (
            <div className="grid grid-cols-2 gap-4 text-right pt-4">
              
              {/* Item 1 */}
              <div className="bg-slate-800/80 p-5 rounded-2xl border border-slate-700 space-y-4">
                <div className="h-40 rounded-xl overflow-hidden bg-slate-950">
                  <img src={compareItem1.image} alt={compareItem1.name} className="w-full h-full object-cover" />
                </div>
                <h4 className="font-black text-base text-emerald-400">{compareItem1.name}</h4>
                <p className="text-xs text-slate-300 leading-relaxed">{compareItem1.shortDesc}</p>
                <div className="space-y-1 text-xs text-slate-400 border-t border-slate-700 pt-2">
                  <p><strong className="text-slate-200">النشاط (K-Level):</strong> {compareItem1.kLevel}</p>
                  <p><strong className="text-slate-200">البطانة:</strong> {compareItem1.linerType}</p>
                  <p><strong className="text-slate-200">دواعي الاستخدام:</strong> {compareItem1.indication}</p>
                </div>
                <Button 
                  size="sm"
                  onClick={() => setCompareItem1(null)}
                  variant="outline"
                  className="w-full text-xs border-slate-600 text-slate-400 hover:text-white"
                >
                  إزالة من المقارنة
                </Button>
              </div>

              {/* Item 2 */}
              <div className="bg-slate-800/80 p-5 rounded-2xl border border-slate-700 space-y-4">
                <div className="h-40 rounded-xl overflow-hidden bg-slate-950">
                  <img src={compareItem2.image} alt={compareItem2.name} className="w-full h-full object-cover" />
                </div>
                <h4 className="font-black text-base text-teal-400">{compareItem2.name}</h4>
                <p className="text-xs text-slate-300 leading-relaxed">{compareItem2.shortDesc}</p>
                <div className="space-y-1 text-xs text-slate-400 border-t border-slate-700 pt-2">
                  <p><strong className="text-slate-200">النشاط (K-Level):</strong> {compareItem2.kLevel}</p>
                  <p><strong className="text-slate-200">البطانة:</strong> {compareItem2.linerType}</p>
                  <p><strong className="text-slate-200">دواعي الاستخدام:</strong> {compareItem2.indication}</p>
                </div>
                <Button 
                  size="sm"
                  onClick={() => setCompareItem2(null)}
                  variant="outline"
                  className="w-full text-xs border-slate-600 text-slate-400 hover:text-white"
                >
                  إزالة من المقارنة
                </Button>
              </div>

            </div>
          ) : (
            <div className="text-center py-12 text-slate-400 space-y-3">
              <p className="text-sm font-bold">يرجى اختيار نوعين من السوكيتات للمقارنة بينهما</p>
              <Button onClick={() => setIsCompareModalOpen(false)} className="text-xs bg-slate-800">
                العودة للكتالوج
              </Button>
            </div>
          )}

        </DialogContent>
      </Dialog>

    </section>
  );
};

export default SocketInfo;
