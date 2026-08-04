import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  PersonStanding, 
  Activity, 
  Sparkles, 
  ShieldCheck, 
  Layers, 
  Search, 
  X, 
  Maximize2, 
  Info, 
  HeartPulse, 
  CheckCircle2, 
  Zap, 
  Award, 
  Footprints,
  Cpu,
  Shield,
  HelpCircle,
  Clock,
  Dumbbell
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
export interface AmputationLevelItem {
  id: string;
  name: string;
  nameEn: string;
  category: 'lower' | 'upper' | 'disarticulation' | 'partial';
  categoryLabel: string;
  shortDesc: string;
  fullMedicalDesc: string;
  anatomyPoints: string[];
  prostheticOptions: string[];
  functionalOutcomes: string[];
  rehabGuidelines: string[];
  energyExpenditure: string; // e.g. "زيادة طفيفة +10%"
  gaitPattern: string;
  controlType: string;
  comfortRating: number; // 1-5
  mobilityRating: number; // 1-5
  image: string;
  badge: string;
  kLevelRecommendation: string;
}

// ─── Master Data: All Amputation Levels (Upper & Lower Limb) ───
const masterAmputationLevels: AmputationLevelItem[] = [
  // ════════════════════════════════════════════════
  // 🟢 LOWER LIMB AMPUTATION LEVELS (الطرف السفلي)
  // ════════════════════════════════════════════════
  {
    id: 'partial-toe-ray',
    name: 'بتر أصابع القدم وأمشاطها (Partial Toe & Ray Amputation)',
    nameEn: 'Partial Toe & Ray Amputation',
    category: 'partial',
    categoryLabel: 'بتر جزئي - قدم',
    shortDesc: 'فقدان إصبع واحد أو أكثر أو جزء من عظام مشط القدم، مع الحفاظ على قوس القدم وعظام الكعب.',
    fullMedicalDesc: 'يشمل هذا المستوى بتر إبهام القدم أو الأصابع الأخرى مع أو بدون مشط القدم. إبهام القدم ويلعب دوراً حيوياً في دفع الجسم للأمام عند خطوة الانطلاق (Toe-off). الحفاظ على باقي القدم يمنح ثباتاً تشريحياً كبيراً مع الحاجة لحشوات تعويضية تمنع انحراف الأصابع المتبقية.',
    anatomyPoints: [
      'الحفاظ على مفصل الكاحل وقوس القدم وقدرة التحميل المباشر',
      'فقدان نقطة الارتكاز الأمامية في إبهام القدم عند المشي السريع',
      'ميل للأصابع المتبقية بالانحراف نحو الفراغ في حال عدم وجود حشوة'
    ],
    prostheticOptions: [
      'حشوات سيليكون مرنة مصممة خصيصاً (Custom Silicone Toe Prosthesis)',
      'ضبان كربوني داخل الحذاء (Carbon Fiber Insole / Shoe Stiffener)',
      'أحذية طبية مخصصة بتبطين هيدروستاتيكي وتوزيع للضغط'
    ],
    functionalOutcomes: [
      'قدرة ممتازة على المشي الطبيعي بنسبة 95%',
      'عدم وجود استهلاك طاقة إضافي يذكر',
      'العودة لكافة الأنشطة الرياضية والعمل دون قيود'
    ],
    rehabGuidelines: [
      'متابعة الجلد والوقاية من قرح السكري في بقية الأصابع',
      'تمارين تقوية عضلات الكاحل والبطن والاتزان'
    ],
    energyExpenditure: 'طبيعي جداً (+2% إلى +5%)',
    gaitPattern: 'مشية طبيعية شبه متكاملة',
    controlType: 'تحكم عضلي طبيعي 100%',
    comfortRating: 5,
    mobilityRating: 5,
    image: 'https://images.unsplash.com/photo-1579684385127-1ef15d508118?q=80&w=1000&auto=format&fit=crop',
    badge: 'استقلالية حركية كاملة',
    kLevelRecommendation: 'K1 - K4'
  },
  {
    id: 'chopart-lisfranc',
    name: 'بتر القدم الجزئي - تشوبارت وليسفرانك (Chopart & Lisfranc)',
    nameEn: 'Chopart & Lisfranc Midfoot Amputation',
    category: 'partial',
    categoryLabel: 'بتر جزئي - قدم',
    shortDesc: 'بتر عند مفصل مشط القدم (Lisfranc) أو مفصل منتصف القدم (Chopart) مع الحفاظ على كعب القدم.',
    fullMedicalDesc: 'بتر Lisfranc يقطع بين عظام المشط وعظام القدم الخلفية، بينما بتر Chopart يقطع عند مفصل الكاحل الأمامي محتفظاً بعظمتي العقب والعقب الجانبي. يتطلب هذا المستوى دعماً خلفياً لمنع ميلان الكعب للخلف (Equinus Deformity) واستعادة طول الذراع الحركي للقدم.',
    anatomyPoints: [
      'احتفاظ كامل بعظم العقب (Calcaneus) وإمكانية التحميل على الكعب',
      'ميل عضلات الساق الخلفية لسحب الكعب لأعلى في بتر Chopart',
      'قصور ذراع الدفع الأمامي يتطلب ضباناً كربونياً مقوى'
    ],
    prostheticOptions: [
      'طرف صناعي مدمج للساق مع ضبان كربوني (Chopart Silicone Socket)',
      'جبيرة AFO كربونية ديناميكية مدمجة داخل الحذاء',
      'سوكيت مرن يغطي الساق جزئياً لضمان تعليق ممتاز'
    ],
    functionalOutcomes: [
      'مشية مستقلة بدون عكازات مع حشوة كربونية مناسبة',
      'حماية ممتدة لكعب القدم والأنسجة الدهنية',
      'استهلاك طاقة منخفض مقارنة ببتر الساق'
    ],
    rehabGuidelines: [
      'تمارين إطالة وتر أخيل لمنع تشوه انثناء القدم الأسفل',
      'ارتداء الضبان الكربوني دائماً داخل الأحذية المغلقة'
    ],
    energyExpenditure: 'زيادة طفيفة (+10% إلى +15%)',
    gaitPattern: 'مشية مستقرة مع دعم كربوني أمامي',
    controlType: 'تحكم عضلي طبيعي مدمج',
    comfortRating: 4,
    mobilityRating: 4,
    image: 'https://images.unsplash.com/photo-1532938911079-1b06ac7ceec7?q=80&w=1000&auto=format&fit=crop',
    badge: 'حفظ كعب القدم الطبيعي',
    kLevelRecommendation: 'K1 - K4'
  },
  {
    id: 'syme-disarticulation',
    name: 'بتر مفصل الكاحل - صايم (Syme Ankle Disarticulation)',
    nameEn: 'Syme Ankle Disarticulation',
    category: 'disarticulation',
    categoryLabel: 'بتر مفاصل - سفلي',
    shortDesc: 'إزالة القدم بالكامل عند مفصل الكاحل مع الحفاظ على وسادة وسحق الكعب الطبيعي للتحميل المباشر.',
    fullMedicalDesc: 'بتر صايم (Syme) هو أحد أفضل مستويات البتر ميكانيكياً. يتم فيه قطع القدم عند مفصل الكاحل وتثبيت وسادة الكعب الجلدية السميكة أسفل نهاية عظم الظنبوب. يتيح هذا للمريض المشي لبرهة داخل المنزل حتى بدون طرف صناعي، ويتحمل وزن الجسم كاملاً على نهاية الجذمور (End-Bearing).',
    anatomyPoints: [
      'تحميل وزن الجسم بنسبة 100% على نهاية الجذمور (End-Bearing)',
      'نهاية عريضة للجذمور بسبب بروز لقم الكاحل (Malleoli)',
      'طول ساق ممتاز يمنح ذراع قوة هائل للتحكم بالطرف'
    ],
    prostheticOptions: [
      'سوكيت صايم مع نافذة جانبية مرنة (Medial Window Syme Socket)',
      'سوكيت مرن مزدوج الغلاف الشفاف (Canadian / Clamshell Socket)',
      'أقدام كربونية منخفضة الارتفاع (Low Profile Carbon Feet مثل Pro-Flex LP)'
    ],
    functionalOutcomes: [
      'مشية طبيعية ومتزنة للغاية بأقل استهلاك للطاقة',
      'إمكانية المشي بضعة خطوات بدون طرف صناعي في الطوارئ',
      'ثبات استثنائي في الرحلات والأنشطة الشاقة'
    ],
    rehabGuidelines: [
      'العناية بجلد وسادة الكعب وتدليكها يومياً',
      'اختيار أقدام كربونية منخفضة البروفايل تناسب طول الساق'
    ],
    energyExpenditure: 'زيادة طفيفة جداً (+15%)',
    gaitPattern: 'مشية متناسقة قريبة جداً من الطبيعية',
    controlType: 'تحكم عظمي وعضلي قوي جداً',
    comfortRating: 5,
    mobilityRating: 5,
    image: 'https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?q=80&w=1000&auto=format&fit=crop',
    badge: 'تحميل مباشر على الكعب',
    kLevelRecommendation: 'K1 - K4'
  },
  {
    id: 'transtibial-bka',
    name: 'بتر تحت الركبة (Transtibial - Below Knee / BKA)',
    nameEn: 'Transtibial (Below-Knee) Amputation',
    category: 'lower',
    categoryLabel: 'الطرف السفلي',
    shortDesc: 'بتر الساق بين الكاحل والركبة مع الحفاظ الفائق على مفصل الركبة الطبيعي وعضلاتها.',
    fullMedicalDesc: 'البتر الأكثر انتشاراً ونجاحاً في الأطراف السفلية. الحفاظ على مفصل الركبة الطبيعي يقلل استهلاك الطاقة بشكل كبير مقارنة ببتر الفخذ. تعتمد دقة الطرف على تصميم السوكيت المقوم (TSB أو Vacuum) ونوع القدم الكربونية المختارة بحسب مستوى نشاط المريض.',
    anatomyPoints: [
      'احتفاظ بمفصل الركبة وقوة عضلات الفخذ الباسطة والقابضة',
      'القطع عبر عظمتي الظنبوب (Tibia) والشظية (Fibula)',
      'توزيع الضغط يتم عبر السوكيت الهيدروستاتيكي أو بطانة السيليكون'
    ],
    prostheticOptions: [
      'سوكيت الضغط الكلي TSB أو سوكيت الفراغ الشافط (Elevated Vacuum)',
      'بطانات السيليكون / البولي يوريثان (Pin-Lock / Seal-In / Suction)',
      'أقدام كربونية ديناميكية أو محوسبة (Taleo, Triton, Meridium, Proprio)'
    ],
    functionalOutcomes: [
      'مشية طبيعية كلياً دون أي مظهر عرج ملحوظ',
      'قدرة على الجري والسباحة وركوب الدراجات وقيادة السيارات',
      'استهلاك طاقة منخفض للغاية مقارنة ببتر فوق الركبة'
    ],
    rehabGuidelines: [
      'منع انثناء الركبة (Flexion Contracture) باستخدام الجبائر التمديدية',
      'تقوية عضلات الرباعية الفخذية (Quadriceps) والتوازن'
    ],
    energyExpenditure: 'زيادة بسيطة (+20% إلى +25%)',
    gaitPattern: 'مشية طبيعية ممتازة',
    controlType: 'تحكم بالركبة الطبيعية 100%',
    comfortRating: 5,
    mobilityRating: 5,
    image: '/images/prosthetic_leg.png',
    badge: 'النموذج الأكثر انتشاراً ونجاحاً',
    kLevelRecommendation: 'K1 - K4'
  },
  {
    id: 'knee-disarticulation-kd',
    name: 'بتر مفصل الركبة (Knee Disarticulation / Through-Knee)',
    nameEn: 'Knee Disarticulation Amputation',
    category: 'disarticulation',
    categoryLabel: 'بتر مفاصل - سفلي',
    shortDesc: 'فصل الطرف عند مفصل الركبة دون قطع عظم الفخذ، مما يحافظ على لقم الفخذ والتحميل المباشر.',
    fullMedicalDesc: 'يتميز بتر مفصل الركبة بالاحتفاظ بطول عظم الفخذ كاملاً وبلُقمات الركبة العريضة (Femoral Condyles). هذا يسمح بتحميل الوزن كاملاً على نهاية عظم الفخذ، ويمنح ذراع قوة طويل جداً لرفع الطرف وتحريكه، مع استغناء عن الحواف الحوضية الضاربة.',
    anatomyPoints: [
      'تحميل كامل وزن الجسم على عظم الفخذ (End-Bearing Condyles)',
      'ذراع قوة رافعة طويل جداً يمنح تحكماً عضلياً مثالياً',
      'نهاية عريضة تضمن ثبات السوكيت وعدم دورانه'
    ],
    prostheticOptions: [
      'سوكيت مرن بنوافذ جانبية واستغناء عن قفل الحوض',
      'ركب ميكانيكية أو هيدروليكية أو محوسبة مخصصة (3R106, 3R80, C-Leg 4)',
      'أقدام كربونية عالية الطاقة'
    ],
    functionalOutcomes: [
      'ثبات هائل أثناء المشي والجلوس والمنحدرات',
      'راحة استثنائية دون ضغط على عظام الحوض أو الإسخية',
      'استهلاك طاقة أقل من بتر فوق الركبة التلقائي'
    ],
    rehabGuidelines: [
      'اختيار مفصل ركبة مدمج لمنع بروز الركبة عند الجلوس',
      'تمارين مرونة لمفصل الورك'
    ],
    energyExpenditure: 'زيادة معتدلة (+30% إلى +35%)',
    gaitPattern: 'مشية قوية ومستقرة',
    controlType: 'تحكم بالفخذ المكتمل 100%',
    comfortRating: 5,
    mobilityRating: 4,
    image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=1000&auto=format&fit=crop',
    badge: 'تحميل كامل على الفخذ',
    kLevelRecommendation: 'K2 - K4'
  },
  {
    id: 'transfemoral-aka',
    name: 'بتر فوق الركبة (Transfemoral - Above Knee / AKA)',
    nameEn: 'Transfemoral (Above-Knee) Amputation',
    category: 'lower',
    categoryLabel: 'الطرف السفلي',
    shortDesc: 'بتر عظم الفخذ مع فقدان مفصل الركبة، ويتطلب ركبة اصطناعية ذكية أو هيدروليكية لإعادة الاتزان.',
    fullMedicalDesc: 'بتر الفخذ يشمل قطع عظم الفخذ وفقدان مفصل الركبة الطبيعي. يتطلب هذا المستوى طرفاً صناعياً يجمع بين سوكيت تشريحي (مثل IC أو HiFi) وركبة اصطناعية (ميكانيكية، هيدروليكية، أو محوسبة كـ C-Leg / Genium) لضمان الأمان ضد السقوط ومحاكاة المشي الطبيعي.',
    anatomyPoints: [
      'فقدان مفصل الركبة وعضلات الساق بالكامل',
      'ميل عظم الفخذ المتبقي للانحراف للخارج (Abduction) في حال عدم التثبيت الجيد',
      'التحميل يتم على حدبة الإسخية (Ischial Tuberosity) أو عبر الشفط الهيدروستاتيكي'
    ],
    prostheticOptions: [
      'سوكيت احتواء حدبة الإسخية (Ischial Containment - IC) أو سوكيت HiFi',
      'ركب محوسبة فائقة الأمان (C-Leg 4, Genium X3, Kenevo, Rheo Knee XC)',
      'ركب هيدروليكية وميكانيكية (3R80, 3R106)',
      'أقدام كربونية متعددة المحاور'
    ],
    functionalOutcomes: [
      'استعادة القدرة على المشي المستقل ونزول الدرج والسلالم',
      'العودة للعمل والقيادة وممارسة الأنشطة اليومية',
      'حماية فائقة من التعثر مع الركب المحوسبة الحديثة'
    ],
    rehabGuidelines: [
      'تمارين تقوية عضلات الحوض والمقربة (Adductors)',
      'الوقاية من انقباض مفصل الورك (Hip Flexion Contracture)'
    ],
    energyExpenditure: 'زيادة ملحوظة (+50% إلى +65%)',
    gaitPattern: 'مشية محوسبة متكيفة أو ميكانيكية موجهة',
    controlType: 'تحكم بمفصل الورك والركبة الذكية',
    comfortRating: 4,
    mobilityRating: 4,
    image: 'https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?q=80&w=1000&auto=format&fit=crop',
    badge: 'يتطلب ركبة اصطناعية ذكية',
    kLevelRecommendation: 'K1 - K4'
  },
  {
    id: 'hip-disarticulation-hd',
    name: 'بتر مفصل الورك (Hip Disarticulation)',
    nameEn: 'Hip Disarticulation Amputation',
    category: 'disarticulation',
    categoryLabel: 'بتر مفاصل - سفلي',
    shortDesc: 'فصل عظم الفخذ بالكامل عند مفصل الورك، ويتطلب سوكيت كورسيه حوضي ثلاثي الأبعاد.',
    fullMedicalDesc: 'يشمل فصل عظم الفخذ كلياً عن الحوض. يتطلب هذا المستوى تصنيع كورسيه حوضي (Pelvic Basket) يعانق الحوض والعجز والبطن، مدمج بمفصل ورك اصطناعي وركبة هيدروليكية أو محوسبة وقدم كربونية، لتوفير الدعم الهيكلي ونقل وزن الجسم واستقرار العمود الفقري.',
    anatomyPoints: [
      'فقدان عظم الفخذ ومفصل الورك والركبة بالكامل',
      'توزيع الحمل المحوري على عظام البطن والقفص الصدري والعجز',
      'الاعتماد على ميلان الحوض وحركة الجذع للتحكم بالطرف'
    ],
    prostheticOptions: [
      'كورسيه وسوكيت حوضي كربوني ثلاثي الأبعاد (Pelvic Basket)',
      'مفصل ورك اصطناعي ميكانيكي أو محوسب (Helix 3D Hip Joint)',
      'ركبة محوسبة خفيفة الوزن (C-Leg / Genium)',
      'قدم كربونية ممتصة للصدمات'
    ],
    functionalOutcomes: [
      'مشية مستقلة باستخدام العكازات أو بدونها للحالات النشطة',
      'حماية واستقرار متكامل للعمود الفقري وميلان الحوض',
      'استعادة الجلوس والوقوف والتنقل بين الغرف'
    ],
    rehabGuidelines: [
      'تمارين مكثفة لعضلات الجذع والبطن والظهر',
      'التدريب التدريجي على نقل الثقل وتحريك مفصل الورك الاصطناعي'
    ],
    energyExpenditure: 'زيادة مرتفعة (+80% إلى +100%)',
    gaitPattern: 'مشية حوضية موجهة بحركة الجذع',
    controlType: 'تحكم بحركة الحوض والجذع',
    comfortRating: 3,
    mobilityRating: 3,
    image: 'https://images.unsplash.com/photo-1581594693702-fbdc51b2763b?q=80&w=1000&auto=format&fit=crop',
    badge: 'تثبيت كورسيه حوضي شامل',
    kLevelRecommendation: 'K1 - K3'
  },
  {
    id: 'hemipelvectomy-transpelvic',
    name: 'بتر نصف الحوض (Hemipelvectomy / Transpelvic Amputation)',
    nameEn: 'Hemipelvectomy (Transpelvic) Amputation',
    category: 'disarticulation',
    categoryLabel: 'بتر مفاصل - سفلي',
    shortDesc: 'استئصال الطرف السفلي بالكامل مع جزء من عظام الحوض، ويتطلب دعماً حوضياً خاصاً جداً.',
    fullMedicalDesc: 'أعقد مستويات البتر السفلي. يتم فيه استئصال نصف عظام الحوض مع الذراع السفلي. يتطلب هذا المستوى قفصاً حوضياً مخصصاً بتبطين هيدروستاتيكي وتخفيف على الأعضاء الداخلية، مع مفصل ورك وركبة وقدم متناسقة خفيفة الوزن.',
    anatomyPoints: [
      'استئصال جزء من عظم العجز والحرقفة والمشط الحوضي',
      'نقل الوزن يتم عبر الأنسجة الرخوة والقفص الصدري السفلي والعمود الفقري',
      'حاجة استثنائية لتبطين توزيع الضغط ومنع الاحتكاك'
    ],
    prostheticOptions: [
      'سوكيت حوضي كامل متقدم بألياف الكربون المرنة (Custom Hemipelvectomy Basket)',
      'أنظمة مفصل ورك ثلاثي الأبعاد (Helix 3D / Monocentric Hip)',
      'ركبة محوسبة فائقة الأمان خفيفة الوزن'
    ],
    functionalOutcomes: [
      'استعادة القدرة على المشي والوقوف والجلوس المريح',
      'دعم واستقرار قفص الحوض والعمود الفقري',
      'استقلالية حركية في الأنشطة اليومية'
    ],
    rehabGuidelines: [
      'تأهيل تنفسي وعضلي شامل للجذع',
      'جلسات تجربة سوكيت شفاف متعددة للتأكد من راحة الأنسجة'
    ],
    energyExpenditure: 'زيادة مرتفعة (+100% إلى +125%)',
    gaitPattern: 'مشية توجيهية مدعومة بحمالة حوضية',
    controlType: 'تحكم بأسفل القفص الصدري والجذع',
    comfortRating: 3,
    mobilityRating: 2,
    image: 'https://images.unsplash.com/photo-1579684385127-1ef15d508118?q=80&w=1000&auto=format&fit=crop',
    badge: 'تأهيل حوضي متخصص',
    kLevelRecommendation: 'K1 - K2'
  },

  // ════════════════════════════════════════════════
  // 🔵 UPPER LIMB AMPUTATION LEVELS (الطرف العلوي)
  // ════════════════════════════════════════════════
  {
    id: 'partial-hand-finger',
    name: 'بتر أصابع اليد واليد الجزئية (Partial Hand & Finger Amputation)',
    nameEn: 'Partial Hand & Finger Amputation',
    category: 'partial',
    categoryLabel: 'بتر جزئي - يد',
    shortDesc: 'فقدان إصبع أو أكثر من أصابع اليد أو جزء من الكف، مع الحفاظ على مفصل الرسغ وحركة الساعد.',
    fullMedicalDesc: 'اليد هي الأداة الأساسية للتفاعل مع العالم. إبهام اليد يمثل 50% من وظيفة اليد. تتيح الأطراف التعويضية الحديثة (سواء السيليكون التجميلي أو الأطراف البيونيكية الميكانيكية) استعادة القدرة على الإمساك بالأشياء، الكتابة، واستخدام المفاتيح والهواتف الذكية.',
    anatomyPoints: [
      'الاحتفاظ بمفصل الرسغ وحركات دوران الساعد (Pronation / Supination)',
      'الاحتفاظ بالأصابع السليمة المتبقية للتآزر الحركي',
      'حاجة ماسة لدقة الملامسة والمظهر التجميلي الطبيعي'
    ],
    prostheticOptions: [
      'أصابع سيليكون تجميلية فائقة الواقعية بمطابقة بصمة الجلد ولونه (Real-Skin Silicone)',
      'أصابع ميكانيكية تتأثر بحركة المفصل المتبقي (Body-Powered Finger Prosthesis مثل Naked Prosthetics)',
      'أصابع بيونيكية صغيرة بمستشعرات كهرومغناطيسية (i-Digits / VINCENT Finger)'
    ],
    functionalOutcomes: [
      'استعادة قدرة الإمساك بالأشياء الدقيقة والكتابة والتأشير',
      'مظهر تجميلي طبيعي يخفي آثار البتر تماماً',
      'استعادة الثقة بالنفس والتفاعل الاجتماعي'
    ],
    rehabGuidelines: [
      'تمارين مرونة وتقوية للأصابع المتبقية ومفصل الرسغ',
      'تدريب الحساسية اللمسية وإعادة التأهيل العصبي'
    ],
    energyExpenditure: 'طبيعي كلياً',
    gaitPattern: 'حركة يد طبيعية وتآزر دقيق',
    controlType: 'تحكم مفصلي أو كهرومغناطيسي ذكي',
    comfortRating: 5,
    mobilityRating: 5,
    image: '/images/prosthetic_arm.png',
    badge: 'دقة واستعادة مظهر طبيعي',
    kLevelRecommendation: 'نشاط علوي مكتمل'
  },
  {
    id: 'wrist-disarticulation-wd',
    name: 'بتر مفصل الرسغ (Wrist Disarticulation)',
    nameEn: 'Wrist Disarticulation Amputation',
    category: 'disarticulation',
    categoryLabel: 'بتر مفاصل - علوي',
    shortDesc: 'فصل اليد عند مفصل المعصم دون قطع عظمتي الكعبرة والزند، مما يحافظ على دوران الساعد.',
    fullMedicalDesc: 'بتر مفصل الرسغ يحتفظ بالطول الكامل للساعد وبقدرة عظمتي الكعبرة والزند على الدوران الإنسي والجانبي (Pronation & Supination بنسبة 120 درجة). هذا يمنح المريض قدرة استثنائية على تدوير اليد الاصطناعية دون الحاجة لمفصل تدوير كهربائي ثقيل.',
    anatomyPoints: [
      'الاحتفاظ بحركة دوران الساعد الطبيعية (Pronation / Supination)',
      'نهاية عريضة للساعد بسبب رؤوس عظام الرسغ تمنع دوران السوكيت',
      'طول ساعد ممتاز يمنح رفاطاً حركياً قوي'
    ],
    prostheticOptions: [
      'سوكيت ساعد منخفض الارتفاع بدون أربطة حوضية علوية',
      'يد بيونيكية كهرومغناطيسية مع مستشعرات عضلية (i-Limb, bebionic, Ottobock MyoHand)',
      'يد ميكانيكية بخطاف عمل شاق للمهام الخارجية'
    ],
    functionalOutcomes: [
      'تحكم عالي السلاسة والدقة في اليد البيونيكية',
      'استعادة دوران اليد الطبيعي بسهولة فائقة',
      'قدرة عالية على حمل الأغراض والعمل المكتبي والميداني'
    ],
    rehabGuidelines: [
      'الحفاظ على مجال حركة دوران الساعد بالتمارين اليومية',
      'التدريب على مستشعرات العضلات الكهربية (Myo-Testing)'
    ],
    energyExpenditure: 'طبيعي جداً',
    gaitPattern: 'تنسيق حركي ممتاز للذراع',
    controlType: 'تحكم كهرومغناطيسي + دوران طبيعي',
    comfortRating: 5,
    mobilityRating: 5,
    image: 'https://images.unsplash.com/photo-1581092335397-9583fe92d232?q=80&w=1000&auto=format&fit=crop',
    badge: 'حفظ حركة دوران الساعد',
    kLevelRecommendation: 'نشاط علوي مكتمل'
  },
  {
    id: 'transradial-bea',
    name: 'بتر تحت الكوع (Transradial - Below Elbow / BEA)',
    nameEn: 'Transradial (Below-Elbow) Amputation',
    category: 'upper',
    categoryLabel: 'الطرف العلوي',
    shortDesc: 'بتر عظام الساعد مع الحفاظ الفائق على مفصل الكوع الطبيعي وحركته.',
    fullMedicalDesc: 'أكثر أنواع بتر الطرف العلوي نجاحاً وانتشاراً. الحفاظ على مفصل الكوع الطبيعي يتيح رفع اليد الاصطناعية وتوجيهها في الفراغ بسهولة. تتيح تقنيات السوكيت الحديثة دمجم الألكترودات الكهرومغناطيسية مباشرة في بطانة السيليكون لنقل إشارات انقباض عضلات الساعد إلى اليد البيونيكية فوراً.',
    anatomyPoints: [
      'الاحتفاظ بمفصل الكوع وقوة عضلات البايسبس والترايسبس',
      'القطع عبر عظمتي الكعبرة والزند في الساعد',
      'وجود عضلات قابضة وباسطة لليد قابلة لوضع مستشعرات كهربائية فوقها'
    ],
    prostheticOptions: [
      'يد بيونيكية متعددة الأصابع كهرومغناطيسية (bebionic, i-Limb Quantum, Ottobock Michelangelo)',
      'طرف ميكانيكي بحبال وسحب الكتف (Body-Powered Harness System)',
      'يد تجميلية سيليكونية فائقة الواقعية (Passive Silicone Hand)'
    ],
    functionalOutcomes: [
      'استعادة ممتازة لاستخدام اليد في كافة الأعمال اليومية',
      'إمكانية استخدام الأجهزة الذكية والأقلام والأدوات الطبية',
      'استجابة فورية وحركة أصابع متعددة الأوضاع'
    ],
    rehabGuidelines: [
      'تدريب عضلات الساعد على إشارات الانقباض المستقلة (Myo feedback)',
      'العناية بنظافة وجفاف الجلد تحت المستشعرات'
    ],
    energyExpenditure: 'طبيعي كلياً (+5%)',
    gaitPattern: 'تنسيق ذراع طبيعي ومتناسق',
    controlType: 'تحكم عضلات الساعد الكهرومغناطيسي',
    comfortRating: 5,
    mobilityRating: 5,
    image: 'https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?q=80&w=1000&auto=format&fit=crop',
    badge: 'النموذج الذهبي للطرف العلوي',
    kLevelRecommendation: 'نشاط علوي متقدم'
  },
  {
    id: 'elbow-disarticulation-ed',
    name: 'بتر مفصل الكوع (Elbow Disarticulation)',
    nameEn: 'Elbow Disarticulation Amputation',
    category: 'disarticulation',
    categoryLabel: 'بتر مفاصل - علوي',
    shortDesc: 'فصل الذراع عند مفصل الكوع دون قطع عظم العضد، مما يحافظ على لقمتي العضد العريضتين.',
    fullMedicalDesc: 'يحتفظ هذا المستوى بطول عظم العضد كاملاً (Humerus) وبنهايته اللقمية العريضة. تمنح هذه اللقمات السوكيت ثباتاً ميكانيكياً رائعاً يمنع الدوران كلياً، ويسمح بنقل الأوزان بثبات، مع تركيب مفصل كوع اصطناعي خارجي مدمج.',
    anatomyPoints: [
      'احتفاظ كامل بطول عظم العضد وعضلات العضد',
      'نهاية عريضة تمنع التزحزح ودوران السوكيت كلياً',
      'فقدان مفصل الكوع الطبيعي يقتضي تركيب كوع اصطناعي'
    ],
    prostheticOptions: [
      'كوع ميكانيكي أو إلكتروني خارجي المحاور (Outside Locking Elbow Hinges)',
      'سوكيت كربوني مريح بدون أحزمة حوضية صلبة',
      'يد بيونيكية أو ميكانيكية مدمجة'
    ],
    functionalOutcomes: [
      'ثبات وقوة رفيعة في حمل الأشياء الثقيلة',
      'تحكم قوي بالحركة بفضل ذراع العضد المكتمل',
      'مرونة في الأنشطة الشاقة والعمل الميداني'
    ],
    rehabGuidelines: [
      'اختيار مفاصل كوع خارجية مدمجة تتناسب مع طول العضد',
      'تمارين تقوية الكتف والجذع'
    ],
    energyExpenditure: 'زيادة بسيطة (+15%)',
    gaitPattern: 'تنسيق حركي قوي',
    controlType: 'تحكم بعضد مكتمل + كوع اصطناعي',
    comfortRating: 4,
    mobilityRating: 4,
    image: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?q=80&w=1000&auto=format&fit=crop',
    badge: 'ثبات وقوة رفع عالية',
    kLevelRecommendation: 'نشاط علوي متقدم'
  },
  {
    id: 'transhumeral-aea',
    name: 'بتر فوق الكوع (Transhumeral - Above Elbow / AEA)',
    nameEn: 'Transhumeral (Above-Elbow) Amputation',
    category: 'upper',
    categoryLabel: 'الطرف العلوي',
    shortDesc: 'بتر عظم العضد مع فقدان مفصل الكوع والساعد، ويتطلب كوعاً ويداً اصطناعية مدمجة.',
    fullMedicalDesc: 'يشمل قطع عظم العضد بين الكوع والكتف. يتطلب طرفاً صناعياً يجمع بين كوع اصطناعي (ميكانيكي بالقفل أو كهربائي ذكي) ويد اصطناعية، يتم التحكم بهما عبر أربطة السحب الفولاذية أو مستشعرات عضلات العضد والصدر (Myoelectric) أو تقنيات إعادة التوجيه العصبي (TMR).',
    anatomyPoints: [
      'فقدان مفصل الكوع والساعد واليد بالكامل',
      'الاحتفاظ بمفصل الكتف وجزء من عظم العضد',
      'إمكانية الاستفادة من عضلات العضد والصدر لإشارات التوجيه'
    ],
    prostheticOptions: [
      'كوع كهربائي محوسب مع يد بيونيكية (Ottobock DynamicArm / ErgoArm)',
      'طرف ميكانيكي بنظام سحب الكابلات من الكتف (Body-Powered Harness System)',
      'تقنيات التحكم العصبي المتقدمة (TMR Target Muscle Reinnervation)'
    ],
    functionalOutcomes: [
      'استعادة ثني وفرك الكوع وفتح وإغلاق اليد في الفراغ',
      'استعادة الاستقلالية في تناول الطعام واللبس والأعمال الشخصية',
      'إمكانية الوصول لمستويات تحكم ممتازة مع التدريب المتخصص'
    ],
    rehabGuidelines: [
      'تدريب مكثف على فك وقفل مفصل الكوع قبل اليد',
      'تمارين مرونة لمفصل الكتف ومنع التيبس'
    ],
    energyExpenditure: 'زيادة معتدلة (+30%)',
    gaitPattern: 'حركة ذراع موجهة بالكتف والكوع الاصطناعي',
    controlType: 'تحكم كهرومغناطيسي مزدوج / سحب كابلات',
    comfortRating: 4,
    mobilityRating: 4,
    image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=1000&auto=format&fit=crop',
    badge: 'يتطلب كوع ويد بيونيكية',
    kLevelRecommendation: 'نشاط علوي متقدم'
  },
  {
    id: 'shoulder-disarticulation-sd',
    name: 'بتر مفصل الكتف (Shoulder Disarticulation)',
    nameEn: 'Shoulder Disarticulation Amputation',
    category: 'disarticulation',
    categoryLabel: 'بتر مفاصل - علوي',
    shortDesc: 'فصل الذراع بالكامل عند مفصل الكتف، ويتطلب سوكيت كورسيه حزام كتفي ثلاثي الأبعاد.',
    fullMedicalDesc: 'يشمل فصل عظم العضد بالكامل عن تجويف الكتف. يتطلب هذا المستوى حزاماً وحاضنة كربونية للكتف (Shoulder Cap/Basket) تلتف حول الكتف والصدر، مدمجة بمفصل كتف وكوع ويد اصطناعية، مع تحكم يعتمد على حركة لوح الكتف أو مستشعرات عضلات الصدر والظهر.',
    anatomyPoints: [
      'فقدان الذراع بالكامل ومفصل الكتف',
      'الاحتفاظ بعضلات القفص الصدري والظهر ولوح الكتف (Scapula)',
      'تغيير في توازن الكتفين ويتطلب حشوة متناسقة المظهر'
    ],
    prostheticOptions: [
      'كورسيه كتفي كربوني خفيف الوزن بخامات مريحة (Carbon Shoulder Basket)',
      'مفصل كتف اصطناعي متعدد الوضعيات (Passive or Friction Shoulder Joint)',
      'كوع ويد بيونيكية بمستشعرات الصدر أو تقنية TMR العصبية'
    ],
    functionalOutcomes: [
      'استعادة التوازن البصري والشكلي للكتفين تحت الملابس',
      'مساعدة اليد السليمة في تثبيت الأوراق وحمل الأغراض الخفيفة',
      'استعادة وظائف حركية أساسية مع التدريب المتقدم'
    ],
    rehabGuidelines: [
      'تمارين تقوية عضلات الجذع والظهر والحفاظ على تناسق العمود الفقري',
      'التدريب على استخدام مفصل الكتف الاصطناعي'
    ],
    energyExpenditure: 'زيادة متوسطة (+40%)',
    gaitPattern: 'حركة جذع وكتف موجهة',
    controlType: 'تحكم بعضلات الصدر والظهر والتوجيه العصبي TMR',
    comfortRating: 3,
    mobilityRating: 3,
    image: 'https://images.unsplash.com/photo-1516549655169-df83a0774514?q=80&w=1000&auto=format&fit=crop',
    badge: 'تثبيت كورسيه كتفي شامل',
    kLevelRecommendation: 'نشاط علوي متقدم'
  },
  {
    id: 'forequarter-interscapulothoracic',
    name: 'بتر الربع الأمامي العلوي (Forequarter / Interscapulothoracic)',
    nameEn: 'Forequarter (Interscapulothoracic) Amputation',
    category: 'disarticulation',
    categoryLabel: 'بتر مفاصل - علوي',
    shortDesc: 'استئصال الذراع بالكامل مع لوح الكتف وعظمة الترقوة، وهو أعقد مستويات البتر العلوي.',
    fullMedicalDesc: 'أعقد وأندر مستويات البتر العلوي، يتم فيه استئصال الذراع كاملاً مع لوح الكتف (Scapula) وعظمة الترقوة (Clavicle). يتطلب حمالة كرسيه كربونية تجميلية وتأهيلية خاصة تعيد رسم هيكل الكتف والصدر وتوفر حماية واستقراراً للقفص الصدري.',
    anatomyPoints: [
      'استئصال عظم العضد ولوح الكتف وعظمة الترقوة',
      'الدعم يتم عبر حمالة صدرية كربونية مخصصة ومبطنة',
      'حاجة ماسة لتوازن الظهر وحماية العمود الفقري من الميلان'
    ],
    prostheticOptions: [
      'طرف صناعي تجميلي خفيف الوزن فائق الواقعية بمطابقة الكتف واليد (Passive Real-Skin Prosthesis)',
      'كورسيه صدري كربوني مهوى ومبطن بهيدروجيل',
      'أنظمة بيونيكية خفيفة الوزن للمهام المساعدة في بعض الحالات'
    ],
    functionalOutcomes: [
      'استعادة كاملة للمظهر الطبيعي للكتفين وتناسق الملابس',
      'حماية واستقرار للعمود الفقري ومستوى الصدر',
      'استقلالية في الأنشطة اليومية الحياتية'
    ],
    rehabGuidelines: [
      'برنامج علاج طبيعي مكثف لمنع الجنف أو انحراف العمود الفقري',
      'متابعة تناسق الارتداء مع أخصائي الأطراف'
    ],
    energyExpenditure: 'زيادة متوسطة (+45%)',
    gaitPattern: 'مشية قفصية متوازنة',
    controlType: 'تثبيت صدري تجميلي / بيونيكي مساعد',
    comfortRating: 3,
    mobilityRating: 2,
    image: 'https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?q=80&w=1000&auto=format&fit=crop',
    badge: 'تأهيل وتجميل صدري متخصص',
    kLevelRecommendation: 'تأهيل تجميلي ووظيفي'
  }
];

// ─── Main Component ───
const AmputationLevels: React.FC = () => {
  // States
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [detailItem, setDetailItem] = useState<AmputationLevelItem | null>(null);

  // Filtered List
  const filteredLevels = useMemo(() => {
    return masterAmputationLevels.filter(item => {
      const matchCat = selectedCategory === 'all' || 
        (selectedCategory === 'lower' && (item.category === 'lower' || (item.category === 'disarticulation' && item.categoryLabel.includes('سفلي')) || (item.category === 'partial' && item.categoryLabel.includes('قدم')))) ||
        (selectedCategory === 'upper' && (item.category === 'upper' || (item.category === 'disarticulation' && item.categoryLabel.includes('علوي')) || (item.category === 'partial' && item.categoryLabel.includes('يد')))) ||
        (selectedCategory === 'disarticulation' && item.category === 'disarticulation') ||
        (selectedCategory === 'partial' && item.category === 'partial');

      const matchSearch = searchQuery.trim() === '' ||
        item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.nameEn.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.shortDesc.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.categoryLabel.toLowerCase().includes(searchQuery.toLowerCase());

      return matchCat && matchSearch;
    });
  }, [selectedCategory, searchQuery]);

  // Categories Navigation Pills
  const categories = [
    { id: 'all', label: 'كافة مستويات البتر', icon: Layers, count: masterAmputationLevels.length },
    { id: 'lower', label: 'الطرف السفلي (Lower Limb)', icon: Footprints, count: masterAmputationLevels.filter(i => i.categoryLabel.includes('سفلي') || i.categoryLabel.includes('قدم') || i.category === 'lower').length },
    { id: 'upper', label: 'الطرف العلوي (Upper Limb)', icon: Cpu, count: masterAmputationLevels.filter(i => i.categoryLabel.includes('علوي') || i.categoryLabel.includes('يد') || i.category === 'upper').length },
    { id: 'disarticulation', label: 'بتر المفاصل (Disarticulations)', icon: ShieldCheck, count: masterAmputationLevels.filter(i => i.category === 'disarticulation').length },
    { id: 'partial', label: 'البتر الجزئي (Partial Amputations)', icon: Zap, count: masterAmputationLevels.filter(i => i.category === 'partial').length },
  ];

  return (
    <section id="amputation-levels" className="py-20 bg-gradient-to-b from-slate-50/60 via-white to-slate-50/60 relative overflow-hidden font-cairo">
      {/* Background Decorative Glow */}
      <div className="absolute top-10 right-10 w-96 h-96 bg-medical-500/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 left-10 w-96 h-96 bg-sky-400/5 rounded-full blur-3xl pointer-events-none" />

      <div className="container mx-auto px-4 max-w-7xl relative z-10">
        
        {/* ─── SECTION HEADER ─── */}
        <div className="text-center max-w-3xl mx-auto mb-14 space-y-4">
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-5 py-1.5 bg-gradient-to-r from-medical-50 to-blue-50 rounded-full text-xs font-bold border border-medical-100 shadow-sm text-medical-800"
          >
            <PersonStanding className="w-4 h-4 text-medical-600" />
            <span>الموسوعة الطبية والتأهيلية الشاملة لجميع حالات البتر</span>
          </motion.div>

          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-gray-900 font-cairo leading-tight"
          >
            مستويات وأنواع البتر — <span className="text-medical-600">التشريح والخيارات والتأهيل</span>
          </motion.h2>

          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-gray-500 text-sm sm:text-base leading-relaxed font-medium max-w-2xl mx-auto"
          >
            دليل طبي هندسي يغطي جميع أنواع البتر بالطرفين العلوي والسفلي، محدداً الخصائص التشريحية، الأجهزة والحلول المناسبة، والنتائج الحركية والمتوقعة لكل حالة.
          </motion.p>
        </div>

        {/* ─── SEARCH BAR & CATEGORY FILTERS ─── */}
        <div className="bg-white/90 backdrop-blur-xl p-5 sm:p-6 rounded-3xl border border-gray-100 shadow-sm space-y-4 mb-10">
          
          {/* Search Input */}
          <div className="relative max-w-xl mx-auto">
            <Search className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <Input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="ابحث بنوع البتر (تحت الركبة، فوق الكوع، صايم...) أو التكنولوجيا..."
              className="pr-12 pl-4 py-3 bg-gray-50 border-gray-200 text-gray-900 placeholder-gray-400 rounded-2xl focus:border-medical-500 focus:ring-medical-500/30 text-sm font-medium"
            />
            {searchQuery && (
              <button 
                onClick={() => setSearchQuery('')}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-700"
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
                  className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all duration-200 ${
                    isSelected
                      ? 'bg-medical-600 text-white shadow-md shadow-medical-500/20 scale-105'
                      : 'bg-gray-50 text-gray-600 hover:bg-medical-50 border border-gray-200 hover:border-medical-200'
                  }`}
                >
                  <Icon className={`w-3.5 h-3.5 ${isSelected ? 'text-white' : 'text-medical-500'}`} />
                  <span>{cat.label}</span>
                  <span className={`px-2 py-0.5 rounded-full text-[10px] ${
                    isSelected ? 'bg-white/20 text-white' : 'bg-gray-100 text-gray-500'
                  }`}>
                    {cat.count}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* ─── AMPUTATION CARDS GRID ─── */}
        {filteredLevels.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <AnimatePresence>
              {filteredLevels.map((item, idx) => (
                <motion.div
                  key={item.id}
                  layout
                  initial={{ opacity: 0, y: 25 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.4, delay: idx * 0.05 }}
                  className="bg-white rounded-3xl overflow-hidden border border-gray-100 hover:border-medical-200 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between group relative"
                >
                  {/* Image Header Container */}
                  <div className="relative h-52 w-full overflow-hidden bg-slate-50">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      onError={(e) => {
                        e.currentTarget.src = 'https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?q=80&w=1000&auto=format&fit=crop';
                      }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />

                    {/* Status Badge Tag */}
                    <div className="absolute top-3 right-3 z-10">
                      <span className="bg-medical-600/90 backdrop-blur-md text-white font-extrabold text-[11px] px-3 py-1 rounded-full shadow-sm">
                        {item.badge}
                      </span>
                    </div>

                    {/* Category Tag */}
                    <div className="absolute top-3 left-3 z-10">
                      <span className="bg-white/95 backdrop-blur-md text-gray-700 font-bold text-[10px] px-2.5 py-1 rounded-full border border-gray-200 shadow-xs">
                        {item.categoryLabel}
                      </span>
                    </div>
                  </div>

                  {/* Card Body Content */}
                  <div className="p-6 flex-grow flex flex-col justify-between space-y-5">
                    
                    {/* Title & Subtitle */}
                    <div className="space-y-1.5">
                      <h3 className="text-lg font-extrabold text-gray-900 font-cairo leading-snug group-hover:text-medical-600 transition-colors">
                        {item.name}
                      </h3>
                      <span className="text-xs text-gray-400 font-mono block">
                        {item.nameEn}
                      </span>

                      {/* Short Description */}
                      <p className="text-gray-600 text-xs sm:text-sm leading-relaxed font-medium pt-1">
                        {item.shortDesc}
                      </p>
                    </div>

                    {/* Anatomy Highlights */}
                    <div className="space-y-2 pt-2 border-t border-gray-100">
                      <span className="text-[11px] font-bold text-gray-400 block">التشريح والخصائص الرئيسية:</span>
                      {item.anatomyPoints.slice(0, 2).map((point, pIdx) => (
                        <div key={pIdx} className="flex items-start gap-2 text-xs text-gray-700 font-medium">
                          <CheckCircle2 className="w-3.5 h-3.5 text-medical-500 shrink-0 mt-0.5" />
                          <span className="leading-snug">{point}</span>
                        </div>
                      ))}
                    </div>

                    {/* Specs Quick Bar */}
                    <div className="grid grid-cols-2 gap-2 text-xs pt-1">
                      <div className="bg-medical-50/60 p-2.5 rounded-xl border border-medical-100">
                        <span className="text-[10px] font-bold text-gray-400 block">استهلاك الطاقة:</span>
                        <span className="font-extrabold text-medical-700">{item.energyExpenditure}</span>
                      </div>
                      <div className="bg-gray-50 p-2.5 rounded-xl border border-gray-100">
                        <span className="text-[10px] font-bold text-gray-400 block">التوصية الحركية:</span>
                        <span className="font-bold text-gray-700 truncate block">{item.kLevelRecommendation}</span>
                      </div>
                    </div>

                  </div>

                  {/* Card Actions Footer */}
                  <div className="p-6 pt-0">
                    <Button
                      onClick={() => setDetailItem(item)}
                      className="w-full bg-gradient-to-r from-medical-500 to-medical-700 hover:from-medical-600 hover:to-medical-800 text-white font-bold text-xs py-2.5 rounded-xl transition-all duration-300 shadow-md shadow-medical-500/20"
                    >
                      <Maximize2 className="w-3.5 h-3.5 ml-1.5" />
                      الدليل الطبي والتأهيلي الكامل
                    </Button>
                  </div>

                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        ) : (
          <div className="text-center py-16 bg-white rounded-3xl border border-gray-100 shadow-sm text-gray-400 space-y-3">
            <HelpCircle className="w-12 h-12 text-gray-300 mx-auto" />
            <p className="text-base font-bold text-gray-600">لم يتم العثور على حالة بتر تطابق بحثك</p>
            <p className="text-xs text-gray-400">جرب البحث بكلمات أخرى أو اختر تصنيفاً مختلفاً</p>
            <Button 
              onClick={() => { setSelectedCategory('all'); setSearchQuery(''); }}
              variant="outline"
              className="text-xs border-gray-300 text-gray-500 mt-2"
            >
              عرض كافة مستويات البتر
            </Button>
          </div>
        )}

      </div>

      {/* ─── DETAILED MEDICAL & REHABILITATION DIALOG MODAL ─── */}
      <Dialog open={!!detailItem} onOpenChange={(open) => !open && setDetailItem(null)}>
        <DialogContent className="max-w-4xl bg-white border-gray-200 text-gray-900 font-cairo max-h-[90vh] overflow-y-auto p-6 sm:p-8 rounded-3xl">
          {detailItem && (
            <div className="space-y-6 text-right">
              
              {/* Modal Header */}
              <DialogHeader className="text-right border-b border-gray-100 pb-4">
                <div className="flex items-center gap-2 mb-1">
                  <Badge className="bg-medical-50 text-medical-700 border-medical-200 text-xs">
                    {detailItem.categoryLabel}
                  </Badge>
                  <Badge className="bg-gray-100 text-gray-600 text-xs">
                    {detailItem.badge}
                  </Badge>
                </div>
                <DialogTitle className="text-2xl sm:text-3xl font-extrabold text-gray-900">
                  {detailItem.name}
                </DialogTitle>
                <DialogDescription className="text-xs font-mono text-medical-600">
                  {detailItem.nameEn}
                </DialogDescription>
              </DialogHeader>

              {/* Image Preview Banner */}
              <div className="h-64 sm:h-72 rounded-2xl overflow-hidden bg-gray-100 border border-gray-200 relative">
                <img
                  src={detailItem.image}
                  alt={detailItem.name}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.currentTarget.src = 'https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?q=80&w=1000&auto=format&fit=crop';
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-white via-transparent to-transparent" />
              </div>

              {/* Full Medical Description */}
              <div className="space-y-3 bg-medical-50/50 p-5 rounded-2xl border border-medical-100">
                <h4 className="text-sm font-extrabold text-medical-800 flex items-center gap-2">
                  <Info className="w-4 h-4 text-medical-600" />
                  الوصف الطبي والتشريحي المفصل:
                </h4>
                <p className="text-xs sm:text-sm text-gray-700 leading-relaxed font-medium">
                  {detailItem.fullMedicalDesc}
                </p>
              </div>

              {/* Grid 1: Anatomy vs Prosthetic Options */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                
                {/* Anatomy Points */}
                <div className="bg-gray-50 p-5 rounded-2xl border border-gray-200 space-y-3">
                  <h4 className="text-sm font-bold text-gray-900 flex items-center gap-2 border-b border-gray-200 pb-2">
                    <HeartPulse className="w-4 h-4 text-rose-500" />
                    خصائص الأنسجة والعظام المتبقية:
                  </h4>
                  <ul className="space-y-2">
                    {detailItem.anatomyPoints.map((point, idx) => (
                      <li key={idx} className="text-xs text-gray-700 flex items-start gap-2 font-medium">
                        <span className="text-medical-600 font-bold">•</span>
                        <span>{point}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Prosthetic Options */}
                <div className="bg-gray-50 p-5 rounded-2xl border border-gray-200 space-y-3">
                  <h4 className="text-sm font-bold text-gray-900 flex items-center gap-2 border-b border-gray-200 pb-2">
                    <Zap className="w-4 h-4 text-amber-500" />
                    خيارات الأطراف والتكنولوجيا الموصى بها:
                  </h4>
                  <ul className="space-y-2">
                    {detailItem.prostheticOptions.map((opt, idx) => (
                      <li key={idx} className="text-xs text-gray-700 flex items-start gap-2 font-medium">
                        <CheckCircle2 className="w-3.5 h-3.5 text-medical-500 shrink-0 mt-0.5" />
                        <span>{opt}</span>
                      </li>
                    ))}
                  </ul>
                </div>

              </div>

              {/* Grid 2: Functional Outcomes vs Rehabilitation Guidelines */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                
                {/* Functional Outcomes */}
                <div className="bg-blue-50/50 p-5 rounded-2xl border border-blue-100 space-y-3">
                  <h4 className="text-sm font-bold text-blue-900 flex items-center gap-2 border-b border-blue-100 pb-2">
                    <Award className="w-4 h-4 text-blue-600" />
                    النتائج الوظيفية ونمط الحركة:
                  </h4>
                  <ul className="space-y-2">
                    {detailItem.functionalOutcomes.map((out, idx) => (
                      <li key={idx} className="text-xs text-gray-700 flex items-start gap-2 font-medium">
                        <span className="text-blue-600 font-bold">•</span>
                        <span>{out}</span>
                      </li>
                    ))}
                  </ul>
                  <div className="pt-2 border-t border-blue-100 text-xs space-y-1 text-gray-600">
                    <p><strong className="text-blue-900">نمط الحركة:</strong> {detailItem.gaitPattern}</p>
                    <p><strong className="text-blue-900">نوع التحكم:</strong> {detailItem.controlType}</p>
                  </div>
                </div>

                {/* Rehabilitation Guidelines */}
                <div className="bg-emerald-50/50 p-5 rounded-2xl border border-emerald-100 space-y-3">
                  <h4 className="text-sm font-bold text-emerald-900 flex items-center gap-2 border-b border-emerald-100 pb-2">
                    <Dumbbell className="w-4 h-4 text-emerald-600" />
                    إرشادات العلاج الطبيعي والتأهيل:
                  </h4>
                  <ul className="space-y-2">
                    {detailItem.rehabGuidelines.map((guide, idx) => (
                      <li key={idx} className="text-xs text-gray-700 flex items-start gap-2 font-medium">
                        <span className="text-emerald-600 font-bold">•</span>
                        <span>{guide}</span>
                      </li>
                    ))}
                  </ul>
                  <div className="pt-2 border-t border-emerald-100 text-xs text-gray-600">
                    <p><strong className="text-emerald-900">مستوى النشاط الموصى به:</strong> {detailItem.kLevelRecommendation}</p>
                  </div>
                </div>

              </div>

              {/* Close Action */}
              <div className="pt-4 text-left border-t border-gray-100">
                <Button 
                  onClick={() => setDetailItem(null)}
                  className="bg-gray-100 hover:bg-gray-200 text-gray-700 text-xs px-6 rounded-xl border border-gray-200"
                >
                  إغلاق النافذة
                </Button>
              </div>

            </div>
          )}
        </DialogContent>
      </Dialog>

    </section>
  );
};

export default AmputationLevels;
