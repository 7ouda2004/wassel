import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Info, ChevronRight, ArrowRight, Award, BarChart, Bandage, Ruler,
  Activity, Hand, User, PersonStanding, Search, Sparkles, CheckCircle2,
  ShieldCheck, Calendar, PhoneCall, Layers, Footprints, Flame, ExternalLink
} from 'lucide-react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger
} from '@/components/ui/accordion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export interface OrthosisTypeItem {
  name: string;
  description: string;
  features: string[];
  price?: string;
  image: string;
  material?: string;
  warranty?: string;
  targetGroup?: string;
  indications?: string[];
}

export interface OrthosisCategory {
  id: string;
  name: string;
  image: string;
  description: string;
  types: OrthosisTypeItem[];
  indications: string[];
}

const orthosesData: OrthosisCategory[] = [
  {
    id: 'afo',
    name: 'جبائر الكاحل والقدم (AFO)',
    image: 'https://images.pexels.com/photos/3913020/pexels-photo-3913020.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    description: 'تُستخدم لدعم وتثبيت الكاحل والقدم في حالات الشلل أو الضعف العضلي، وتساعد على تحسين المشية وتقليل التعب والإجهاد.',
    types: [
      {
        name: 'جبيرة صلبة (Solid AFO)',
        description: 'توفر أقصى درجات التثبيت للكاحل والقدم، وتستخدم في حالات الشلل الكامل أو عدم الاستقرار الشديد للقدم.',
        features: ['تحكم كامل في حركة القدم والكاحل', 'مناسبة للأطفال المصابين بالشلل الدماغي', 'تصحيح تشوهات القدم والالتواء الحاد'],
        price: 'تبدأ من 1,500 ج.م',
        image: 'https://www.crispinorthotics.com/wp-content/uploads/2023/04/JCZ00106.png',
        material: 'بولي بروبيلين عالي الكثافة (Polypropylene)',
        warranty: 'ضمان 12 شهر شامل المتابعة والتعديل',
        targetGroup: 'الأطفال والبالغين ذوي الشلل أو انعدام توازن القدم',
        indications: ['الشلل الدماغي شديد الدرجة (CP)', 'الشلل الكامل للقدم والكاحل', 'تصحيح الالتواء وانحراف القدم الحاد', 'منع التيبس العضلي المفصلي']
      },
      {
        name: 'جبيرة مفصلية (Hinged AFO)',
        description: 'تسمح بحركة محدودة ومضبوطة للكاحل مع توفير الدعم اللازم، مما يسمح بنمط مشي أكثر طبيعية وتوازناً.',
        features: ['تسمح بثني القدم للأعلى والأسفل ضمن نطاق محدد', 'تحسين نمط المشي واستعادة دفع المشط', 'مناسبة لمرحلة إعادة التأهيل الحركي'],
        price: 'تبدأ من 2,200 ج.م',
        image: 'https://www.crispinorthotics.com/wp-content/uploads/2023/04/JCZ00111.png',
        material: 'بلاستيك مقوى بمفاصل تيتانيوم/ستيل',
        warranty: 'ضمان 18 شهر على المفاصل والبنية الصلبة',
        targetGroup: 'المرضى في مراحل التعافي الحركي المتوسطة',
        indications: ['السكتة الدماغية (Stroke)', 'ضعف عضلات القدم المتوسط', 'إعادة التأهيل الحركي والمشي المتوازن', 'تحسين دفع المشط أثناء المشي']
      },
      {
        name: 'جبيرة ديناميكية كربونية (Dynamic Carbon AFO)',
        description: 'مصممة خصيصًا لتعزيز حركة القدم الطبيعية وتخزين الطاقة وإعادتها أثناء خطوة المشي لتوفير دفع رياضي.',
        features: ['مصنوعة من كربون فايبر مرن وفائق الخفة', 'تساعد على دفع القدم أثناء المشي والجري', 'مناسبة للمستخدمين النشطين والرياضيين'],
        price: 'تبدأ من 3,500 ج.م',
        image: 'https://www.crispinorthotics.com/wp-content/uploads/2023/04/JCZ00136.png',
        material: 'ألياف الكربون (Carbon Fiber Prepreg)',
        warranty: 'ضمان سنتين ضد الكسر والتآكل',
        targetGroup: 'البالغون والشباب ذوو النشاط الحركي العالي',
        indications: ['القدم المتدلية (Foot Drop)', 'النشاط الحركي العالي والجري', 'تعويض دفع القدم للمستويات النشطة']
      },
      {
        name: 'جبيرة ليلية استطالية (Night Splint)',
        description: 'تستخدم أثناء النوم للحفاظ على وضعية القدم الصحيحة ومنع انكماش الأوتار والتقلصات العضلية.',
        features: ['تحافظ على استطالة العضلات والأوتار الخلفية', 'تمنع تكون التقلصات والتهاب اللفافة الأخمصية', 'مريحة ومبطنة للاستخدام الليلي الهادئ'],
        price: 'تبدأ من 1,000 ج.م',
        image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQKC3_s7VI3ZbqwvQZmvikNK6gDPGgVZaAMQtdTayolkqTSEtwlF7ZxmiSXXYaeArSsGZ8&usqp=CAU',
        material: 'فوم طبي مبطن مع هيكل بلاستيكي خفيف',
        warranty: 'ضمان 6 أشهر',
        targetGroup: 'مرضى شوكة العقب والتهاب القدم والتقلصات الليلية',
        indications: ['التهاب اللفافة الأخمصية (Plantar Fasciitis)', 'انكماش وتقلص وتر أكيليس الليلي', 'شوكة العقب وتيبس الصباح']
      }
    ],
    indications: [
      'ضعف العضلات في القدم والكاحل',
      'الشلل الدماغي للأطفال (CP)',
      'السكتة الدماغية والجلطات (Stroke)',
      'إصابات الحبل الشوكي',
      'القدم المتدلية (Foot Drop)'
    ]
  },
  {
    id: 'air-walker',
    name: 'أحذية الجبيرة الهوائية (Air Walker Boots)',
    image: 'https://media.ossur.com/ossur-dam/image/upload/f_auto,q_auto,w_1400,h_1400,c_pad/spim/134_359b9120-77e9-4789-bb71-73974e7bd97f',
    description: 'بديل حديث ومتطور للجبس التقليدي، توفر تثبيتاً شاملاً للكاحل والساق مع مضخة هواء مدمجة لتوزيع الضغط المخصص وحماية العظام والأوتار.',
    types: [
      {
        name: 'الجبيرة الهوائية الطويلة (High-Top Pneumatic Walker)',
        description: 'تمتد أسفل الركبة مباشرة، مزودة بخلايا هوائية قابلة للنفخ لملاءمة دقيقة وحماية كاملة لكسور الساق والكاحل.',
        features: ['مضخة هواء مدمجة لتعديل ضغط الوسائد الهوائية', 'نعل مقوس امتصاصي يساعد على انسيابية المشي', 'بطانة داخلية مسامية قابلة للغسل والتهوية'],
        price: 'تبدأ من 1,900 ج.م',
        image: 'https://themoveshop.com/wp-content/uploads/2026/01/cm8puum4t1coc01nl1b959j6f_Move_Product_Photoshoot0436_copy__1_-2-1536x1024.jpg',
        material: 'هيكل بولي بروبيلين مقوى، وسائد هواء نيوبين',
        warranty: 'ضمان 12 شهر',
        targetGroup: 'كسور الكاحل والساق، ما بعد جراحات تثبيت العظام',
        indications: ['كسور عظام الساق والكاحل المركبة', 'ما بعد جراحات تثبيت العظام بالشرائح والمسامير', 'بديل الجبس الشديد للتعافي']
      },
      {
        name: 'الجبيرة الهوائية القصيرة (Short-Top Air Walker)',
        description: 'تغطي القدم ومفصل الكاحل فقط، مصممة لحرية حركة الساق العلوي مع تثبيت كامل للقدم والمشط.',
        features: ['خفيفة الوزن ومريحة للحركة اليومية', 'خلايا هوائية جانبية لمنع التورم والاحتكاك', 'نعل سفلي مانع للانزلاق'],
        price: 'تبدأ من 1,500 ج.م',
        image: 'https://themoveshop.com/wp-content/uploads/2026/01/cm977qpzg1jdq01nl2ah76ij6_Move_Product_Photoshoot0456_copy__1_-2-1536x1024.jpg',
        material: 'بلاستيك هندسي فائق الخفة، وسائد هوائية مدمجة',
        warranty: 'ضمان 12 شهر',
        targetGroup: 'التواء الكاحل الشديد، كسور المشط والأصابع',
        indications: ['التواء الكاحل الحاد من الدرجة الثانية والثالثة', 'كسور عظام المشط والأصابع', 'التهاب أوتار القدم والتورم']
      },
      {
        name: 'حذاء المشي ذو المفصل المدرّج (ROM Walker Boot)',
        description: 'مزود بمفصل مدرج (ROM Hinge) يسمح للأخصائي بتحديد زوايا الثني والمد من 0 إلى 45 درجة للتعافي التدريجي.',
        features: ['تحكم بالزوايا بدقة 7.5 درجات لثني ومد الكاحل', 'حماية تامة لوتر أكيليس بعد عمليات الترميم', 'خلايا هواء مدمجة لدعم الأنسجة الناعمة'],
        price: 'تبدأ من 2,700 ج.م',
        image: 'https://i.pinimg.com/1200x/2c/78/59/2c7859c591642a791cf6086221559764.jpg',
        material: 'مفاصل ستيل معالجة وهيكل كربوني هيدروليكي',
        warranty: 'ضمان 18 شهراً',
        targetGroup: 'بعد عمليات إصلاح وتر أكيليس (Achilles Repair)',
        indications: ['ترميم وإعادة توصيل وتر أكيليس (Achilles Repair)', 'تثبيت ومتابعة زوايا حركة الكاحل بعد الجراحة']
      },
      {
        name: 'حذاء الجبيرة الهوائية للأطفال (Pediatric Air Walker)',
        description: 'مصمم خصيصاً لأجسام وأوزان الأطفال، يوفر الثبات التام للكسور والالتواءات بطريقة مريحة وجذابة.',
        features: ['حجم خفيف وتصميم مريح للطفل', 'أحزمة فيلكرو ملوّنة وسهلة الضبط', 'نعل ممتص للصدمات لحماية المفاصل'],
        price: 'تبدأ من 1,400 ج.م',
        image: 'https://partners.united-ortho.com/images/pediatric%20air%20walker.jpg?crc=3921535288',
        material: 'خامات خفيفة جداً ومضادة للحساسية',
        warranty: 'ضمان 12 شهر',
        targetGroup: 'كسور والتواءات الكاحل لدى الأطفال',
        indications: ['كسور الساق والكاحل لدى الأطفال', 'التواءات المفصل بعد الإصابات الرياضية للأطفال']
      }
    ],
    indications: [
      'كسور عظام الساق والكاحل (Ankle & Tibia Fractures)',
      'تمزق وتر أكيليس (Achilles Tendon Rupture)',
      'التواء الكاحل الشديد من الدرجة الثانية والثالثة',
      'ما بعد عمليات تثبيت الشرائح والمسامير بالكاحل'
    ]
  },
  {
    id: 'medical-insoles',
    name: 'الفرش الطبي والأحذية المخصصة (Medical Insoles)',
    image: 'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?auto=format&fit=crop&w=1200&q=80',
    description: 'فرش وأحذية طبية مخصصة تصمم خصيصاً بناءً على قياسات المسح الضوئي 3D لتوزيع ضغط الجسم بالتساوي وتصحيح انحراف القدم.',
    types: [
      {
        name: 'فرش الفلات فوت المخصص (Custom Flatfoot Arch Support)',
        description: 'فرش طبي مخصص يدعم القوس الطولي للقدم (Arch) ويصلح انحراف الكاحل للداخل لمنع آلام الركبة والظهر.',
        features: ['تصميم 3D حسب خريطة الضغط الشخصية للقدم', 'دعامة قوس كربونية/بولي يوريثان عالية الصلابة', 'يقلل إجهاد عضلات القدم والظهر بنسبة 60%'],
        price: 'تبدأ من 750 ج.م',
        image: 'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?auto=format&fit=crop&w=600&q=80',
        material: 'طبقات EVA متعددة الكثافة + دعم كربوني',
        warranty: 'ضمان 12 شهر ضد التسطح والاهتراء',
        targetGroup: 'أصحاب القدم المسطحة (Flatfoot) والانحراف',
        indications: ['القدم المسطحة (Flatfoot)', 'انحراف الكاحل والقدم للداخل (Over-pronation)', 'إجهاد قوس القدم وآلام الركبة الناتجة عن التسطح']
      },
      {
        name: 'فرش القدم السكرية الوقائي (Diabetic Pressure Relief Insole)',
        description: 'مصمم خصيصاً لمرضى السكري من خامات امتصاصية مفرغة لمنع الاحتكاك وتخفيف مناطق الضغط العالي والوقاية من التقرحات.',
        features: ['طبقة علوية من فوم Plastazote المضاد للبكتيريا', 'خالي تماماً من الخياطة أو البروزات الحادة', 'امتصاص فائق للصدمات أثناء المشي اليومي'],
        price: 'تبدأ من 950 ج.م',
        image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=600&q=80',
        material: 'فوم بلاستازوت الطبي + طبقة سيليكون ممتصة',
        warranty: 'ضمان 12 شهر شامل المتابعة والقياس',
        targetGroup: 'مرضى السكري للوقاية من القدم السكرية والتقرحات',
        indications: ['القدم السكرية (Diabetic Foot)', 'الوقاية من التقرحات والتكلسات الجلدية', 'تفريغ نقاط الضغط العالي لباطن القدم']
      },
      {
        name: 'فرش الشوكة العظمية والتهاب القدم (Plantar Fasciitis Insole)',
        description: 'مجهز بتجويف سيليكوني مفرغ عند منطقة الكعب لتقليل الضغط المباشر على الشوكة العظمية وتخفيف آلام الخطوات الأولى.',
        features: ['وسادة سيليكونية فائقة المرونة عند منطقة العقب', 'دعامة ممتازة للفرش الأخمصي للقدم', 'تخفيف فوري لآلام الكعب صباحاً'],
        price: 'تبدأ من 650 ج.م',
        image: 'https://images.unsplash.com/photo-1560769629-975ec94e6a86?auto=format&fit=crop&w=600&q=80',
        material: 'سيليكون طبي 100% عالي المرونة',
        warranty: 'ضمان 6 أشهر',
        targetGroup: 'مرضى الشوكة العظمية والتهاب اللفافة الأخمصية',
        indications: ['الشوكة العظمية بكعب القدم (Heel Spur)', 'التهاب اللفافة الأخمصية (Plantar Fasciitis)', 'آلام العقب عند الخطوات الأولى']
      },
      {
        name: 'كؤوس السيليكون للكعب (Silicone Heel Cups)',
        description: 'وسائد سيليكونية تشريحية توضع داخل أي حذاء لامتصاص صدمات الكعب وتوزيع ضغط كعب القدم.',
        features: ['خفيفة للغاية ويمكن نقلها بين الأحذية المختلفة', 'تمتص 80% من صدمات خطوة المشي على الأرضيات الصلبة', 'سهلة التنظيف والغسيل بالماء والصابون'],
        price: 'تبدأ من 350 ج.م',
        image: 'https://images.unsplash.com/photo-1560769629-975ec94e6a86?auto=format&fit=crop&w=600&q=80',
        material: 'سيليكون طبي شفاف عالي الجودة',
        warranty: 'ضمان 6 أشهر',
        targetGroup: 'آلام كعب القدم اليومية والإجهاد الرياضي',
        indications: ['امتصاص صدمات الكعب أثناء المشي والجري', 'آلام حافة كعب القدم والإجهاد الرياضي']
      }
    ],
    indications: [
      'القدم المسطحة (Flatfoot) وانحراف الكاحل',
      'القدم السكرية والوقاية من التقرحات (Diabetic Foot)',
      'الشوكة العظمية بكعب القدم (Heel Spur)',
      'التهاب اللفافة الأخمصية (Plantar Fasciitis)'
    ]
  },
  {
    id: 'kafo',
    name: 'جبائر الركبة والكاحل والقدم (KAFO)',
    image: 'https://bldtecomukprod.dfs.core.windows.net/media/c45pxvve/swing_and_stance_grey.jpg',
    description: 'تمتد من الفخذ إلى القدم، وتوفر دعمًا كاملاً للركبة والكاحل والقدم، وتُستخدم في حالات عدم استقرار المفاصل أو الشلل السفلي.',
    types: [
      {
        name: 'جبيرة بقفل ركبة ثابت (Rigid KAFO)',
        description: 'تثبت الركبة في وضعية ممتدة لتوفير أقصى استقرار للوقوف والمشي للأشخاص المصابين بضعف فخذي شديد.',
        features: ['استقرار كامل أثناء الوقوف والمشي', 'مناسبة لحالات الشلل السفلي والرباعي', 'تمنع انهيار الركبة أثناء ثقل الجسم'],
        price: 'تبدأ من 6,000 ج.م',
        image: 'https://images.squarespace-cdn.com/content/v1/5eedea5ef591485ebfb17cf6/1593863726354-0SROHE647ZVLC6JFM5AR/KAFO.png?format=500w',
        material: 'ألومنيوم طيران مدمج مع بولي كربونات صلبة',
        warranty: 'ضمان عامين كاملين',
        targetGroup: 'حالات الشلل السفلي وعدم ثبات الركبة الشديد',
        indications: ['الشلل السفلي والرباعي الكامل', 'ضعف عضلات الفخذ الشديد وانعدام ثبات الركبة', 'منع انهيار الركبة أثناء الوقوف']
      },
      {
        name: 'جبيرة بقفل ركبة متحرك (Stance Control KAFO)',
        description: 'تسمح بثني الركبة تلقائياً عند مرحلة التأرجح وتثبيتها عند الوقوف، مما يوفر حركة مشي طبيعية للغاية.',
        features: ['تسمح بثني الركبة أثناء المشي الحر', 'تمنع انثناء الركبة المفاجئ أثناء الدوس', 'تقلل من استهلاك طاقة الجسم بنسبة 40%'],
        price: 'تبدأ من 9,500 ج.م',
        image: 'https://5.imimg.com/data5/ANDROID/Default/2022/6/DW/NO/UP/82142452/product-jpeg-1000x1000.jpg',
        material: 'هيكل كربوني مع مفاصل ذكية ميكانيكية',
        warranty: 'ضمان سنتين شامل الصيانة',
        targetGroup: 'مرضى ما بعد شلل الأطفال والضعف الرباعي الجزئي',
        indications: ['متلازمة ما بعد شلل الأطفال (Post-Polio)', 'ضعف عضلات الفخذ مع حفظ التحكم الجزئي بالمشية']
      },
      {
        name: 'جبيرة هيدروليكية (Hydraulic KAFO)',
        description: 'تستخدم تقنية السائل الهيدروليكي لامتصاص الصدمات والتحكم بتدفق ثني ومد الركبة بمرونة عالية.',
        features: ['تحكم دقيق في مقاومة الثني والمد', 'حركة سلسة للغاية بدون طقطقة', 'تكيف ذاتي مع سرعة خطى المشي'],
        price: 'تبدأ من 14,000 ج.م',
        image: 'http://web.tradekorea.com/product/920/1183920/Knee%20Ankle%20Foot%20Orthosis%20KAFO%20Lower_limb%20Oorthotic%20Products_2.jpg',
        material: 'مكونات هيدروليكية ألمانية وهيكل كربوني',
        warranty: 'ضمان 3 سنوات',
        targetGroup: 'المستخدمون الراغبون في السير لمسافات طويلة',
        indications: ['الراغبون في المشي السلس لمسافات طويلة دون طقطقة المفاصل', 'امتصاص الصدمات الثقيلة']
      },
      {
        name: 'جبيرة إلكترونية ذكية (Electronic KAFO)',
        description: 'مزودة بمستشعرات ومعالجات دقيقة تتحكم لحظياً في حركة المفاصل بناءً على توازن الجاذبية ونمط الخطوة.',
        features: ['تستشعر نمط المشي وتتكيف مع المنحدرات', 'تعديل آلي سريع للمقاومة حسب التضاريس', 'أمان فائق ضد التعثر والسقوط المفاجئ'],
        price: 'تبدأ من 25,000 ج.م',
        image: 'https://www.ottobock.com/_next/image?url=https%3A%2F%2Fspa-prod-commerce.cep.ottobock.com%2Focc%2Fv2%2Fcep-medias%2F3416889_930Wx930H%2F930Wx930H%2FCEP_MEDIA_CATALOG%2FOnline&w=1600&q=75',
        material: 'معالج الكتروني ذكي، بطارية تدوم 48 ساعة، كربون',
        warranty: 'ضمان 3 سنوات شامل المعايرة البرمجية',
        targetGroup: 'المرضى الراغبون بأحدث التكنولوجيا العالمية',
        indications: ['التكيف الآلي مع المنحدرات والسلم والأمان الفائق ضد السقوط', 'التحكم الذكي بمستشعرات المشي']
      }
    ],
    indications: [
      'ضعف عضلات الساق والفخذ شديد الدرجة',
      'عدم استقرار وانحناء الركبة الخلفي أو الجانبي',
      'شلل الأطراف السفلية الجزئي أو الكلي'
    ]
  },
  {
    id: 'spinal',
    name: 'جبائر العمود الفقري (Spinal Orthoses)',
    image: '/images/1.jpg',
    description: 'تستخدم لتصحيح تشوهات العمود الفقري (كالجنف والحداب)، وتخفيف الضغط على الفقرات والتثبيت بعد الجراحات.',
    types: [
      {
        name: 'جبيرة بوسطن الجنفية (Boston Brace)',
        description: 'مصممة خصيصًا لعلاج الجنف (الانحناء الجانبي للعمود الفقري) لدى الأطفال والمراهقين لمنع زيادة الاعوجاج.',
        features: ['تغطي من أسفل الإبطين حتى أعلى الحوض', 'تصمم خصيصاً لكل مريض بعد المسح 3D', 'تقوم بالضغط المضاد لتعديل استقامة الفقرات'],
        price: 'تبدأ من 4,500 ج.م',
        image: 'https://5.imimg.com/data5/SELLER/Default/2024/10/456384166/VC/YO/AO/88573415/boston-brace-1000x1000.png',
        material: 'بولي إيثيلين طبي صلب مع بطانة ناعمة مضادة للبكتيريا',
        warranty: 'ضمان سنة كاملة مع تعديلات مجانية أثناء النمو',
        targetGroup: 'المراهقون والأطفال المصابون بالجنف (Scoliosis)',
        indications: ['الجنف الجانبي لدى الأطفال والمراهقين (Scoliosis)', 'منع زيادة اعوجاج العمود الفقري أثناء النمو']
      },
      {
        name: 'جبيرة TLSO الظهرية القطنية (TLSO Brace)',
        description: 'تدعم المنطقة الصدرية والقطنية والعجزية بالكامل لتثبيت الكسور والتثبيت بعد جراحات تثبيت الفقرات.',
        features: ['تقيد حركة الانثناء والدوران للفقرات الصدرية والقطنية', 'تقلل الضغط عن الأقراص بين الفقرات', 'خفيفة الوزن ومصممة لراحة التنفس'],
        price: 'تبدأ من 3,800 ج.م',
        image: 'https://www.superiorbraces.com/cdn/shop/products/a14-02_1024x1024.jpeg?v=1527297450',
        material: 'بلاستيك هندسي خفيف ودعامات ألومنيوم',
        warranty: 'ضمان سنة',
        targetGroup: 'حالات كسور الفقرات وبعد عمليات الانزلاق الغضروفي',
        indications: ['كسور الفقرات الصدرية والقطنية', 'التثبيت بعد جراحات الشرائح والمسامير بالظهر', 'تقليل الحمل عن الأقراص الغضروفية']
      },
      {
        name: 'حزام فيلادلفيا العنقي (Philadelphia Collar)',
        description: 'يستخدم لتثبيت الفقرات العنقية بدقة بعد الإصابات والحوادث أو جراحات الرقبة لمنع الحركة الضارة.',
        features: ['يغطي الذقن والرقبة وأعلى الصدر', 'مزود بفتحة حنجرية للتهوية والتنفس', 'مقاوم للماء وسهل التنظيف'],
        price: 'تبدأ من 900 ج.م',
        image: 'https://elheekma.com/wp-content/uploads/2020/08/HJ_128-600x508.jpg',
        material: 'فوم بلازا فوم خفيف ودعامات بلاستيكية',
        warranty: 'ضمان 6 أشهر',
        targetGroup: 'إصابات الرقبة والفقرات العنقية',
        indications: ['كسور وإصابات الفقرات العنقية بالرقبة', 'التثبيت بعد جراحات الرقبة الحادة', 'منع حركات الانثناء القسري']
      },
      {
        name: 'مشد القطنية لومبار (Lumbar Support Belt)',
        description: 'يدعم أسفل الظهر ويخفف آلام المنطقة القطنية والإجهاد العضلي أثناء العمل أو رفع الأثقال.',
        features: ['خفيف الوزن ومطاطي يمكن ارتداؤه تحت الملابس', 'يحتوي على 4 دعامات مرنة في الظهر', 'يزيد الضغط البطني الداخلي لتخفيف حمل الظهر'],
        price: 'تبدأ من 650 ج.م',
        image: 'https://images.pexels.com/photos/4506109/pexels-photo-4506109.jpeg?auto=compress&cs=tinysrgb&w=600',
        material: 'قماش نيوبين مسامي مع أحزمة شد مزدوجة',
        warranty: 'ضمان 6 أشهر',
        targetGroup: 'العمال، السائقون، والذين يعانون من آلام الظهر اليومية',
        indications: ['الانزلاق الغضروفي القطني (Lumbar Disc)', 'آلام أسفل الظهر وإجهاد العمال والسائقين', 'دعم الظهر أثناء الحمل الأثقال']
      }
    ],
    indications: [
      'الجنف (الانحناء الجانبي للعمود الفقري Scoliosis)',
      'الحداب (زيادة التقوس الصدري Kyphosis)',
      'كسور الفقرات الناتجة عن الحوادث أو الهشاشة'
    ]
  },
  {
    id: 'upper-limb',
    name: 'جبائر الطرف العلوي (Upper Limb Orthoses)',
    image: 'https://deccanorthopro.com/wp-content/uploads/2018/11/upper_extremity_orthotics_img4.jpg',
    description: 'تستخدم لدعم وتثبيت مفاصل اليد والرسغ والكوع والكتف لعلاج الإصابات، التهابات الأوتار، أو الشلل بعد الجلطات.',
    types: [
      {
        name: 'جبائر الأصابع الدقيقة (Finger Orthoses)',
        description: 'تستخدم لتثبيت أو تصحيح وضعية الأصابع بعد إصابات الأوتار أو الكسور أو حالات التيبس.',
        features: ['متوفرة لإصبع واحد أو عدة أصابع', 'قابلة للتعديل بسهولة لتناسب مقاس الأصبع', 'مصنوعة من ألومنيوم مبطن بفوم ناعم'],
        price: 'تبدأ من 300 ج.م',
        image: 'https://m.media-amazon.com/images/I/71LINb+ej1L.jpg',
        material: 'ألومنيوم مرن وفوم ناعم',
        warranty: 'ضمان 3 أشهر',
        targetGroup: 'إصابات الأصابع وأوتار اليد',
        indications: ['إصابات وأوتار الأصابع (Trigger Finger)', 'كسور وتيبس مفاصل الأصابع', 'تثبيت السلاميات']
      },
      {
        name: 'جبيرة الرسغ والنفق الرسغي (Wrist Cock-up Brace)',
        description: 'تثبت مفصل الرسغ في وضعية راحة وظيفية وتخفف الضغط عن العصب الأوسط في حالات النفق الرسغي.',
        features: ['توفر راحة فورية للرسغ وتقليل النملان', 'مزودة بدعامة ألومنيوم سفلية قابلة للتشكيل', 'يمكن ارتدائها أثناء النوم والعمل'],
        price: 'تبدأ من 550 ج.م',
        image: 'https://melbournehand.com.au/wp-content/uploads/2022/12/MHR-Splint-board-animate_01.gif',
        material: 'قماش مسامي مريح مع دعامة تشريحية',
        warranty: 'ضمان 6 أشهر',
        targetGroup: 'مرضى النفق الرسغي والتهاب أوتار اليد',
        indications: ['متلازمة النفق الرسغي (Carpal Tunnel Syndrome)', 'التهاب أوتار الرسغ والإجهاد المكتبي', 'راحة مفصل اليد']
      },
      {
        name: 'جبيرة الكوع المفصلية (Elbow ROM Brace)',
        description: 'تحدد نطاق حركة الكوع بدقة بعد جراحات الأوتار والكسور لضمان التعافي الآمن التدريجي.',
        features: ['تحكم دقيق بالدرجات في ثني ومد الكوع', 'مزودة بمفصل مدرج من 0 إلى 120 درجة', 'أحزمة تثبيت سهلة التعديل'],
        price: 'تبدأ من 2,400 ج.م',
        image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRqPvErzWeX7YSS-2xYKPqIBnphcstQ8vS-zQ&s',
        material: 'مفاصل ستيل مبطنة مع أذرع تلسكوبية',
        warranty: 'ضمان سنة',
        targetGroup: 'كسور الكوع وإصابات أوتار المرفق',
        indications: ['بعد جراحات وتر ومفصل الكوع', 'تحديد درجات ثني الكوع بعد الكسور', 'الوقاية من الشد العضلي القسري']
      },
      {
        name: 'جبيرة ابعاد الكتف (Shoulder Abduction Splint)',
        description: 'تثبت الكتف في وضعية إبعاد محددة بعد جراحات الأوتار الكفة الدوارة (Rotator Cuff) لمنع الشد.',
        features: ['تثبت الذراع على وسادة إبعاد بمقدار 30-45 درجة', 'تخفف الوزن بالكامل عن مفصل الكتف', 'حزام صدر عريض لتوزيع الوزن'],
        price: 'تبدأ من 1,800 ج.م',
        image: 'https://deccanorthopro.com/wp-content/uploads/2018/11/upper_extremity_orthotics_img4.jpg',
        material: 'وسادة إسفنجية عالية الكثافة مع حمالات تثبيت',
        warranty: 'ضمان 6 أشهر',
        targetGroup: 'جراحات وتر الكتف وخلع المفصل',
        indications: ['جراحات وتر الكتف الكفة الدوارة (Rotator Cuff)', 'تثبيت خلع الكتف الحاد', 'تخفيف الوزن عن مفصل الكتف']
      }
    ],
    indications: [
      'متلازمة النفق الرسغي (Carpal Tunnel Syndrome)',
      'إصابات وتر اليد والأصابع (Trigger Finger)',
      'التهاب المفاصل الروماتويدي باليد'
    ]
  },
  {
    id: 'hip',
    name: 'جبائر الورك والحوض (Hip Orthoses)',
    image: 'https://www.orliman.com/wp-content/uploads/HO4001-1.jpg',
    description: 'تستخدم لدعم وتثبيت مفصل الورك والحوض، وتساعد في علاج خلع الورك الولادي للأطفال وما بعد عمليات المفصل.',
    types: [
      {
        name: 'حزام بافليك للأطفال (Pavlik Harness)',
        description: 'يستخدم لعلاج خلع الورك الولادي لدى الأطفال الرضع، حيث يبقي مفصل الورك في وضعية أمان لتنمو المحفظة صحيحة.',
        features: ['مصنوع من أشرطة ناعمة لا تسبب تهيج جلد الرضيع', 'قابل للتعديل بسهولة مع نمو الطفل الشهري', 'يسمح بحركة طبيعية آمنة للقدمين'],
        price: 'تبدأ من 1,200 ج.م',
        image: 'https://www.alimed.com/_resources/cache/images/product/51968_850x480-pad.jpg',
        material: 'قطن ناعم وأشرطة فيلكرو طبية',
        warranty: 'ضمان 6 أشهر مع تعديلات قياس مجانية',
        targetGroup: 'الأطفال الرضع المصابون بخلع الورك الولادي (DDH)',
        indications: ['خلع الورك الولادي لدى الأطفال الرضع (DDH)', 'تحفيز التطور الطبيعي لمحفظة الفخذ']
      },
      {
        name: 'جبيرة إبعاد الورك للكبار (Hip Abduction Brace)',
        description: 'تمنع التقارب المفرط للورك وتحافظ على تباعد مفصلي آمن خاصة بعد عمليات تغيير مفصل الفخذ.',
        features: ['تمنع خلع المفصل الصناعي الجديد أثناء النوم أو المشي', 'مزودة بمفصل يحدد درجة الثني والإبعاد', 'بطانات حوض وفخذ قابلة للغسيل'],
        price: 'تبدأ من 5,500 ج.م',
        image: 'https://www.alimed.com/_resources/cache/images/product/62975_850x480-pad.jpg',
        material: 'هيكل بولي كربونات ومفاصل فولاذية صلبة',
        warranty: 'ضمان 18 شهراً',
        targetGroup: 'المرضى الخاضعون لعمليات استبدال مفصل الورك',
        indications: ['ما بعد عمليات استبدال وتغيير مفصل الورك للكبار', 'الوقاية من خلع المفصل الصناعي الجديد']
      }
    ],
    indications: [
      'خلع الورك الولادي لدى الأطفال (DDH)',
      'ما بعد عمليات استبدال وتغيير مفصل الورك',
      'كسور عنق عظم الفخذ والحوض'
    ]
  }
];

const compareData = [
  {
    feature: 'نوع الدعم',
    afo: 'دعم الكاحل والقدم',
    kafo: 'دعم كامل للركبة والكاحل والقدم',
    spinal: 'دعم وتثبيت العمود الفقري',
    upper: 'دعم اليد، الرسغ، الكوع، الكتف',
    hip: 'دعم مفصل الورك والحوض'
  },
  {
    feature: 'أبرز حالات الاستخدام',
    afo: 'سقوط القدم، الشلل الدماغي، الجلطات',
    kafo: 'ضعف عضلات الفخذ، شلل الأطفال، إصابات الحبل الشوكي',
    spinal: 'الجنف، الحداب، كسور الفقرات، الظهر',
    upper: 'النفق الرسغي، الجلطات، كسور الذراع',
    hip: 'خلع الورك الولادي، جراحات مفصل الفخذ'
  },
  {
    feature: 'مستوى التثبيت',
    afo: 'متوسط إلى عالي',
    kafo: 'عالي جداً',
    spinal: 'عالي جداً وتصلب دقيق',
    upper: 'متغير حسب المفصل المستهدف',
    hip: 'عالي وقفل كامل للإبعاد'
  },
  {
    feature: 'الوزن والراحة',
    afo: 'خفيفة ومريحة للحذاء',
    kafo: 'متوسطة إلى ثقيلة (الكربون يخففها)',
    spinal: 'مبطنة خفيفة للارتداء اليومي',
    upper: 'خفيفة جداً ومصممة للراحة',
    hip: 'ثقيلة ومخصصة للتثبيت'
  },
  {
    feature: 'سهولة الاستخدام',
    afo: 'سهل الارتداء بالحذاء',
    kafo: 'يتطلب تدريباً بسيطاً',
    spinal: 'سهل بمساعدة مرافق',
    upper: 'سهل للغاية بكتف واحد',
    hip: 'يتطلب ضبط الأخصائي'
  }
];

const Orthoses = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [selectedProduct, setSelectedProduct] = useState<{
    item: OrthosisTypeItem;
    categoryName: string;
    indications: string[];
  } | null>(null);

  useEffect(() => {
    document.documentElement.dir = 'rtl';
    document.body.classList.add('font-cairo');
    window.scrollTo(0, 0);
  }, []);

  // Filter Categories & Items based on Active Tab and Search Query
  const filteredCategories = orthosesData.map(cat => {
    if (activeCategory !== 'all' && cat.id !== activeCategory) {
      return null;
    }

    const matchingTypes = cat.types.filter(type => {
      const q = searchQuery.toLowerCase().trim();
      if (!q) return true;
      const matchItemInd = type.indications ? type.indications.some(ind => ind.toLowerCase().includes(q)) : false;
      return (
        type.name.toLowerCase().includes(q) ||
        type.description.toLowerCase().includes(q) ||
        cat.name.toLowerCase().includes(q) ||
        matchItemInd ||
        cat.indications.some(ind => ind.toLowerCase().includes(q))
      );
    });

    if (matchingTypes.length === 0 && searchQuery) return null;

    return {
      ...cat,
      types: matchingTypes
    };
  }).filter(Boolean) as OrthosisCategory[];

  return (
    <div className="min-h-screen flex flex-col bg-slate-50/40 font-cairo">
      <Navbar />

      {/* Hero Section */}
      <section className="relative py-20 lg:py-28 bg-gradient-to-b from-medical-950 via-medical-900 to-medical-850 text-white overflow-hidden">
        <div className="absolute inset-0 opacity-20 pointer-events-none">
          <div className="absolute -top-30 right-10 w-[500px] h-[500px] bg-medical-500 rounded-full blur-[140px]" />
          <div className="absolute bottom-0 left-10 w-[450px] h-[450px] bg-sky-400 rounded-full blur-[120px]" />
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 py-1.5 px-4 bg-white/10 text-medical-200 rounded-full text-xs sm:text-sm font-bold mb-6 border border-white/15 backdrop-blur-md">
              <Sparkles className="h-4 w-4 text-sky-300" />
              <span>موسوعة الجبائر الطبية المخصصة والأجهزة التقويمية</span>
            </div>

            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black leading-tight mb-6 font-cairo">
              حلول تقويمية متطورة
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-300 via-medical-200 to-white">
                لكافة أجزاء الجسم ودواعي التعافي
              </span>
            </h1>

            <p className="text-base sm:text-lg text-gray-300 max-w-2xl mx-auto leading-relaxed font-medium mb-8">
              استكشف أحدث الجبائر الطبية المخصصة، أحذية الجبيرة الهوائية (Air Walker)، والفرش الطبي المخصص بالفحص الضوئي 3D لدعم كافة الحالات.
            </p>

            {/* Quick Search & Filter Controls */}
            <div className="bg-white/10 backdrop-blur-lg p-3 sm:p-4 rounded-2xl border border-white/20 shadow-2xl max-w-2xl mx-auto">
              <div className="relative flex items-center">
                <Search className="absolute right-4 h-5 w-5 text-gray-400" />
                <Input
                  type="text"
                  placeholder="ابحث عن نوع الجبيرة (مثال: air walker، فلات فوت، سكري، جنف، أكيليس)..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pr-12 pl-4 py-3 bg-white text-gray-900 placeholder:text-gray-400 rounded-xl font-medium border-0 focus-visible:ring-2 focus-visible:ring-medical-400"
                />
              </div>
            </div>
          </div>

          {/* Quick Stats */}
          <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto text-center">
            {[
              { label: 'تصميم مخصص 100%', val: 'مسح 3D' },
              { label: 'ضمان الجودة والسلامة', val: 'معايير ألمانية' },
              { label: 'تغطية لكافة المحافظات', val: 'شبكة فروعنا' },
              { label: 'استشارات مجانية', val: 'أخصائيون معتمدون' }
            ].map((st, i) => (
              <div key={i} className="bg-white/5 border border-white/10 rounded-2xl p-4 backdrop-blur-xs">
                <div className="text-sky-300 font-bold text-lg sm:text-xl font-cairo">{st.val}</div>
                <div className="text-xs text-gray-300 mt-1 font-medium">{st.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Category Selection Tabs */}
      <section className="py-8 bg-white border-b border-gray-200 sticky top-16 z-30 shadow-xs">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-start md:justify-center gap-2 overflow-x-auto pb-2 scrollbar-none">
            {[
              { id: 'all', label: 'كافة الجبائر', icon: Layers },
              { id: 'afo', label: 'الكاحل والقدم (AFO)', icon: Activity },
              { id: 'air-walker', label: 'الجبيرة الهوائية (Air Walker)', icon: Flame },
              { id: 'medical-insoles', label: 'الفرش الطبي (Insoles)', icon: Footprints },
              { id: 'kafo', label: 'الركبة والكاحل (KAFO)', icon: PersonStanding },
              { id: 'spinal', label: 'العمود الفقري', icon: Ruler },
              { id: 'upper-limb', label: 'الطرف العلوي', icon: Hand },
              { id: 'hip', label: 'الورك والحوض', icon: Bandage },
            ].map((tab) => {
              const Icon = tab.icon;
              const isActive = activeCategory === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveCategory(tab.id)}
                  className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold whitespace-nowrap transition-all duration-300 ${isActive
                    ? 'bg-medical-700 text-white shadow-md scale-105'
                    : 'bg-slate-100 text-gray-700 hover:bg-slate-200'
                    }`}
                >
                  <Icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-medical-700'}`} />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* Products & Detailed Cards Showcase */}
      <section className="py-16 bg-slate-50/50">
        <div className="container mx-auto px-4 max-w-7xl">
          {filteredCategories.length === 0 ? (
            <div className="text-center py-20 bg-white rounded-3xl border border-gray-200 shadow-xs my-8">
              <Search className="w-12 h-12 text-gray-300 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-gray-800 font-cairo">لم نجد جبائر تطابق بحثك</h3>
              <p className="text-sm text-gray-500 mt-2">جرب البحث بكلمات أخرى مثل (Air Walker, فلات فوت, سكري) أو اختر فئة أخرى.</p>
              <Button
                onClick={() => { setSearchQuery(''); setActiveCategory('all'); }}
                className="mt-6 bg-medical-700 text-white font-bold rounded-xl"
              >
                إعادة عرض جميع الجبائر
              </Button>
            </div>
          ) : (
            filteredCategories.map((category) => (
              <div key={category.id} id={category.id} className="mb-20 scroll-mt-36">
                {/* Category Header Banner */}
                <div className="bg-white rounded-3xl p-6 sm:p-8 border border-gray-200/80 shadow-sm mb-8 flex flex-col lg:flex-row gap-6 items-center justify-between">
                  <div className="lg:w-2/3">
                    <div className="inline-flex items-center gap-2 px-3.5 py-1 bg-medical-50 text-medical-800 rounded-full text-xs font-bold mb-3 border border-medical-100">
                      <ShieldCheck className="w-4 h-4 text-medical-600" />
                      <span>قسم الأجهزة التقويمية المعتمدة</span>
                    </div>
                    <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900 font-cairo mb-3">
                      {category.name}
                    </h2>
                    <p className="text-gray-600 text-sm sm:text-base leading-relaxed font-medium">
                      {category.description}
                    </p>

                    {/* Indications Chips */}
                    <div className="mt-4 flex flex-wrap gap-2">
                      <span className="text-xs font-bold text-gray-700 ml-1 py-1">دواعي الاستخدام العامة:</span>
                      {category.indications.map((ind, idx) => (
                        <span key={idx} className="bg-slate-100 text-slate-700 text-xs font-semibold px-3 py-1 rounded-lg border border-slate-200">
                          {ind}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="lg:w-1/3 w-full">
                    <div className="rounded-2xl overflow-hidden shadow-md h-48 sm:h-52 bg-gray-100 relative group">
                      <img
                        src={category.image}
                        alt={category.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent flex items-end p-4">
                        <span className="text-white text-xs font-bold bg-medical-600/90 px-3 py-1 rounded-full backdrop-blur-xs">
                          {category.types.length} موديلات متوفرة
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Sub-types Product Cards Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  {category.types.map((type, tIdx) => (
                    <motion.div
                      key={tIdx}
                      className="bg-white rounded-3xl overflow-hidden border border-gray-200/90 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between group"
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4, delay: tIdx * 0.08 }}
                      viewport={{ once: true }}
                    >
                      <div>
                        {/* Image Box */}
                        <div className="h-56 bg-slate-50 relative overflow-hidden flex items-center justify-center p-3">
                          <img
                            src={type.image}
                            alt={type.name}
                            className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-500"
                            onError={(e) => {
                              e.currentTarget.src = 'https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?auto=format&fit=crop&w=600&q=80';
                            }}
                          />
                          {type.price && (
                            <div className="absolute top-3 right-3 bg-medical-700 text-white font-bold text-xs px-3 py-1 rounded-full shadow-md">
                              {type.price}
                            </div>
                          )}
                        </div>

                        {/* Card Content */}
                        <div className="p-5">
                          <h3 className="font-bold text-base text-gray-900 mb-2 font-cairo group-hover:text-medical-700 transition-colors">
                            {type.name}
                          </h3>
                          <p className="text-xs text-gray-600 line-clamp-3 leading-relaxed mb-4 font-medium">
                            {type.description}
                          </p>

                          {/* Features Bullet List */}
                          <div className="space-y-1.5 pt-2 border-t border-gray-100">
                            {type.features.slice(0, 2).map((feat, fIdx) => (
                              <div key={fIdx} className="flex items-start gap-1.5 text-xs text-gray-700">
                                <CheckCircle2 className="w-3.5 h-3.5 text-medical-600 flex-shrink-0 mt-0.5" />
                                <span className="line-clamp-1 font-medium">{feat}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>

                      {/* Card Footer Button */}
                      <div className="p-5 pt-0">
                        <Button
                          onClick={() => setSelectedProduct({
                            item: type,
                            categoryName: category.name,
                            indications: category.indications
                          })}
                          className="w-full bg-medical-50 hover:bg-medical-700 text-medical-700 hover:text-white font-bold rounded-xl text-xs py-2.5 transition-all duration-300 border border-medical-200"
                        >
                          عرض التفاصيل والقياسات
                          <ChevronRight className="w-4 h-4 mr-1 rtl:rotate-180" />
                        </Button>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            ))
          )}
        </div>
      </section>

      {/* Comparison Table Section */}
      <section className="py-20 bg-white border-t border-gray-200">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="text-center mb-12">
            <span className="text-xs font-bold text-medical-700 bg-medical-50 px-4 py-1.5 rounded-full border border-medical-100 inline-block mb-3">
              جدول المقارنة الطبية
            </span>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-gray-900 font-cairo">
              مقارنة بين أنواع الجبائر الطبية المختلفة
            </h2>
            <p className="text-sm text-gray-500 mt-2">دليل توضيحي لمساعدتك على فهم الاختلافات الرئيسية بين الأجهزة التقويمية.</p>
          </div>

          <div className="overflow-x-auto rounded-2xl border border-gray-200 shadow-xs bg-white">
            <Table className="w-full text-xs sm:text-sm">
              <TableHeader>
                <TableRow className="bg-medical-900 text-white hover:bg-medical-900">
                  <TableHead className="text-right text-white font-bold">الميزة / المقارنة</TableHead>
                  <TableHead className="text-right text-sky-200 font-bold">جبائر الكاحل (AFO)</TableHead>
                  <TableHead className="text-right text-sky-200 font-bold">جبائر الركبة (KAFO)</TableHead>
                  <TableHead className="text-right text-sky-200 font-bold">العمود الفقري</TableHead>
                  <TableHead className="text-right text-sky-200 font-bold">الطرف العلوي</TableHead>
                  <TableHead className="text-right text-sky-200 font-bold">الورك والحوض</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {compareData.map((row, index) => (
                  <TableRow key={index} className={index % 2 === 0 ? 'bg-white' : 'bg-slate-50/60'}>
                    <TableCell className="font-bold text-gray-900">{row.feature}</TableCell>
                    <TableCell className="text-gray-700">{row.afo}</TableCell>
                    <TableCell className="text-gray-700">{row.kafo}</TableCell>
                    <TableCell className="text-gray-700">{row.spinal}</TableCell>
                    <TableCell className="text-gray-700">{row.upper}</TableCell>
                    <TableCell className="text-gray-700">{row.hip}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          {/* Expert Tips */}
          <div className="mt-12 bg-gradient-to-r from-medical-50 via-white to-sky-50 p-6 sm:p-8 rounded-3xl border border-medical-200/80 shadow-xs">
            <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2 font-cairo">
              <Info className="h-5 w-5 text-medical-700" />
              نصائح هامة من أخصائيينا قبل اختيار الجبيرة:
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                "استشر الأخصائي المختص دائماً لأخذ المقاسات بدقة متناهية عبر المسح ثلاثي الأبعاد 3D.",
                "اختر الجبيرة التي تحقق التوازن الأمثل بين مستوى التثبيت المطلوب وراحة الحركة اليومية.",
                "تأكد من ملاءمة نوع الجبيرة لمستوى نشاطك اليومي (عمل، رياضة، حركة خفيفة).",
                "راقب صحة الجلد بانتظام تحت الجبيرة واحرص على ارتداء الجوارب القطنية المخصصة.",
                "التزم ببرنامج التدرج في ساعات الارتداء اليومية الموصى به من قبل الطبيب المعالج.",
                "احرص على إجراء الصيانة وتعديل الضغط عند تغيير الوزن أو مع نمو الأطفال."
              ].map((tip, idx) => (
                <div key={idx} className="flex items-start gap-3 bg-white p-3.5 rounded-xl border border-gray-100 shadow-2xs">
                  <div className="w-6 h-6 rounded-full bg-medical-700 text-white font-bold text-xs flex items-center justify-center flex-shrink-0 mt-0.5">
                    {idx + 1}
                  </div>
                  <span className="text-xs sm:text-sm text-gray-700 font-medium leading-relaxed">{tip}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Manufacturing Workflow Section */}
      <section className="py-20 bg-slate-50/70 border-t border-gray-200">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="text-center mb-16">
            <span className="text-xs font-bold text-medical-700 bg-medical-50 px-4 py-1.5 rounded-full border border-medical-100 inline-block mb-3">
              خطوات تصنيع وتفصيل الجبيرة
            </span>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-gray-900 font-cairo">
              كيف نصنع لك الجبيرة الطبية المخصصة؟
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
            {[
              { step: '01', title: 'التقييم السريري', desc: 'فحص الحركية وقياس الضغط وتقييم المفاصل بدقة.' },
              { step: '02', title: 'المسح الضوئي 3D', desc: 'أخذ نموذج رقمي دقيق للغاية لأبعاد العضو.' },
              { step: '03', title: 'التصميم الرقمي CAD', desc: 'تعديل النموذج وتوزيع نقاط الضغط والراحة.' },
              { step: '04', title: 'التشكيـل والتبطين', desc: 'صب الخامات الطبية عالية الجودة والتبطين الناعم.' },
              { step: '05', title: 'التجربة والمتابعة', desc: 'ضبط الجبيرة على المريض والمتابعة الدورية.' }
            ].map((st, i) => (
              <div key={i} className="bg-white p-6 rounded-2xl border border-gray-200 shadow-xs relative text-center flex flex-col justify-between">
                <div>
                  <div className="w-12 h-12 bg-medical-50 text-medical-700 font-black text-lg rounded-xl flex items-center justify-center mx-auto mb-4 border border-medical-100">
                    {st.step}
                  </div>
                  <h4 className="font-bold text-sm text-gray-900 mb-2 font-cairo">{st.title}</h4>
                  <p className="text-xs text-gray-600 leading-relaxed font-medium">{st.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="text-center mb-12">
            <h2 className="text-2xl sm:text-4xl font-extrabold text-gray-900 font-cairo mb-3">الأسئلة الشائعة حول الجبائر الطبية</h2>
            <p className="text-sm text-gray-500">إجابات شاملة عن استفسارات العملاء حول اختيار وتفصيل الجبائر.</p>
          </div>

          <Accordion type="single" collapsible className="space-y-4">
            {[
              { q: "كيف يتم تحديد نوع الجبيرة المناسب لحالتي؟", a: "يتم التحديد بعد تقييم سريري شامل في أحد مراكز واصل المعتمدة، حيث يفحص الأخصائي نطاق حركة المفاصل وقوة العضلات ونمط المشية لاختيار التصميم الأمثل." },
              { q: "ما هي ميزة أحذية الجبيرة الهوائية Air Walker عن الجبس العادي؟", a: "تتيح لك تعديل ضغط الهواء حول الساق والكاحل لحماية العظام، إضافة إلى إمكانية فكها لتنظيف الجلد والعناية بالكسر دون الحاجة لفك وتركيب الجبس التقليدي." },
              { q: "ما أهمية الفرش الطبي المخصص لمرضى السكري والفلات فوت؟", a: "الفرش الطبي المخصص 3D يقوم بتوزيع وزن الجسم بالتساوي وتفريغ نقاط الضغط العالي، مما يمنع تكون تقرحات القدم السكرية ويعالج آلام الفلات فوت والشوكة العظمية." },
              { q: "هل الجبائر تصنع بمقاسات جاهزة أم تفصيل خاص؟", a: "معظم جبائر منصة واصل تصنع خصيصاً لكل مريض باستخدام تقنيات المسح ثلاثي الأبعاد (3D Scanning) والتصنيع الرقمي لضمان أقصى درجات المطابقة والراحة." },
              { q: "كم تستغرق مدة ارتداء الجبيرة يومياً؟", a: "تختلف المدة حسب الخطة العلاجية؛ بعض الجبائر ترتدى طوال اليوم وأخرى أثناء الأنشطة أو النوم فقط. يحدد الأخصائي جدول الارتداء المناسب لك." }
            ].map((faq, index) => (
              <AccordionItem key={index} value={`item-${index}`} className="bg-slate-50 border border-gray-200 rounded-2xl px-6">
                <AccordionTrigger className="text-base font-bold text-gray-900 py-4 hover:no-underline font-cairo">
                  {faq.q}
                </AccordionTrigger>
                <AccordionContent className="text-sm text-gray-600 leading-relaxed pb-4 font-medium">
                  {faq.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-medical-800 to-medical-950 text-white">
        <div className="container mx-auto px-4 text-center max-w-4xl">
          <h2 className="text-2xl sm:text-4xl font-extrabold font-cairo mb-4">
            هل تحتاج لمساعدة في اختيار الجبيرة المناسبة؟
          </h2>
          <p className="text-medical-200 text-sm sm:text-base mb-8 max-w-xl mx-auto font-medium">
            تواصل مباشرة مع فريقنا الطبي المعتمد لحجز موعد استشارة وتحديد القياسات في أقرب فرع لك.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link to="/booking">
              <Button size="lg" className="w-full sm:w-auto bg-medical-500 hover:bg-medical-400 text-white font-bold rounded-xl px-8 py-6 text-base shadow-lg">
                حجز موعد استشارة وتفصيل
                <Calendar className="mr-2 h-5 w-5" />
              </Button>
            </Link>
            <a href="https://wa.me/201119056895" target="_blank" rel="noopener noreferrer">
              <Button size="lg" variant="outline" className="w-full sm:w-auto border-white/30 text-white hover:bg-white/10 font-bold rounded-xl px-8 py-6 text-base">
                استشارة عبر واتساب
                <PhoneCall className="mr-2 h-5 w-5" />
              </Button>
            </a>
          </div>
        </div>
      </section>

      {/* Product Detail Modal */}
      <AnimatePresence>
        {selectedProduct && (
          <Dialog open={!!selectedProduct} onOpenChange={() => setSelectedProduct(null)}>
            <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto rounded-3xl p-6 sm:p-8 font-cairo">
              <DialogHeader>
                <div className="inline-flex items-center gap-2 bg-medical-50 text-medical-800 px-3 py-1 rounded-full text-xs font-bold w-fit mb-2">
                  <ShieldCheck className="w-4 h-4 text-medical-600" />
                  <span>{selectedProduct.categoryName}</span>
                </div>
                <DialogTitle className="text-2xl sm:text-3xl font-extrabold text-gray-900 font-cairo">
                  {selectedProduct.item.name}
                </DialogTitle>
                <DialogDescription className="text-sm text-gray-500">
                  تفاصيل وحجم ومواصفات الجهاز التقويمي المخصص
                </DialogDescription>
              </DialogHeader>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-4">
                {/* Image Showcase */}
                <div className="bg-slate-50 rounded-2xl p-4 flex items-center justify-center border border-gray-200 min-h-[250px]">
                  <img
                    src={selectedProduct.item.image}
                    alt={selectedProduct.item.name}
                    className="max-h-64 object-contain rounded-lg"
                    onError={(e) => {
                      e.currentTarget.src = 'https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?auto=format&fit=crop&w=600&q=80';
                    }}
                  />
                </div>

                {/* Info List */}
                <div className="space-y-4">
                  <div>
                    <h4 className="text-xs font-bold text-gray-500 mb-1">الوصف الطبي:</h4>
                    <p className="text-xs sm:text-sm text-gray-700 leading-relaxed font-medium">
                      {selectedProduct.item.description}
                    </p>
                  </div>

                  {selectedProduct.item.targetGroup && (
                    <div>
                      <h4 className="text-xs font-bold text-gray-500 mb-1">الفئة المستهدفة:</h4>
                      <p className="text-xs text-medical-900 font-bold bg-sky-50 p-2.5 rounded-lg border border-sky-100">
                        {selectedProduct.item.targetGroup}
                      </p>
                    </div>
                  )}

                  {selectedProduct.item.price && (
                    <div className="bg-medical-50 p-3 rounded-xl border border-medical-100 flex items-center justify-between">
                      <span className="text-xs font-bold text-gray-600">التكلفة التقديرية:</span>
                      <span className="text-sm font-black text-medical-800">{selectedProduct.item.price}</span>
                    </div>
                  )}

                  {selectedProduct.item.material && (
                    <div>
                      <h4 className="text-xs font-bold text-gray-500 mb-1">خامات التصنيع:</h4>
                      <p className="text-xs text-gray-800 font-semibold bg-gray-100 p-2.5 rounded-lg border border-gray-200">
                        {selectedProduct.item.material}
                      </p>
                    </div>
                  )}

                  {selectedProduct.item.warranty && (
                    <div>
                      <h4 className="text-xs font-bold text-gray-500 mb-1">الضمان والصيانة:</h4>
                      <p className="text-xs text-emerald-800 font-semibold bg-emerald-50 p-2.5 rounded-lg border border-emerald-100 flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                        {selectedProduct.item.warranty}
                      </p>
                    </div>
                  )}
                </div>
              </div>

              {/* Key Features & Indications */}
              <div className="space-y-4 pt-4 border-t border-gray-200">
                <div>
                  <h4 className="text-sm font-bold text-gray-900 mb-2 font-cairo">المميزات والوظائف الحركية:</h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {selectedProduct.item.features.map((feat, idx) => (
                      <div key={idx} className="flex items-start gap-2 bg-slate-50 p-2.5 rounded-xl border border-slate-100 text-xs text-gray-800 font-medium">
                        <CheckCircle2 className="w-4 h-4 text-medical-600 flex-shrink-0 mt-0.5" />
                        <span>{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {((selectedProduct.item.indications && selectedProduct.item.indications.length > 0) || (selectedProduct.indications && selectedProduct.indications.length > 0)) && (
                  <div>
                    <h4 className="text-sm font-bold text-gray-900 mb-2 font-cairo">أبرز الدواعي الطبية لهذا المنتج:</h4>
                    <div className="flex flex-wrap gap-1.5">
                      {(selectedProduct.item.indications || selectedProduct.indications).map((ind, idx) => (
                        <span key={idx} className="bg-medical-50 text-medical-800 text-xs font-bold px-3 py-1 rounded-lg border border-medical-100">
                          {ind}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Modal Action Buttons */}
              <div className="mt-6 pt-4 border-t border-gray-200 flex flex-col sm:flex-row gap-3 justify-end">
                <Button
                  variant="outline"
                  onClick={() => setSelectedProduct(null)}
                  className="rounded-xl font-bold text-xs"
                >
                  إغلاق النافذة
                </Button>
                <Link to="/booking" onClick={() => setSelectedProduct(null)}>
                  <Button className="w-full sm:w-auto bg-medical-700 hover:bg-medical-800 text-white font-bold rounded-xl text-xs px-6 py-2.5">
                    حجز موعد استشارة وتفصيل
                    <Calendar className="mr-2 h-4 w-4" />
                  </Button>
                </Link>
              </div>
            </DialogContent>
          </Dialog>
        )}
      </AnimatePresence>

      <Footer />
    </div>
  );
};

export default Orthoses;
