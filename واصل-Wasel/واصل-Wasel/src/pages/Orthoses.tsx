import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Info, ArrowRight, Award, Bandage, Ruler, Activity, Hand, PersonStanding,
  ChevronDown, ChevronUp, Filter, Footprints, Heart, Baby, Star, Check
} from 'lucide-react';
import {
  Accordion, AccordionContent, AccordionItem, AccordionTrigger
} from '@/components/ui/accordion';
import { Button } from '@/components/ui/button';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

// ============ ALL ORTHOSES DATA ============

const orthosesCategories = [
  { id: 'all', label: 'الكل', icon: Filter },
  { id: 'lower', label: 'الطرف السفلي', icon: Footprints },
  { id: 'spinal', label: 'العمود الفقري', icon: Ruler },
  { id: 'upper', label: 'الطرف العلوي', icon: Hand },
  { id: 'pediatric', label: 'أطفال وتشوهات', icon: Baby },
];

const orthosesData = [
  // ===== LOWER LIMB =====
  {
    id: 'fo',
    name: 'جبائر القدم (FO)',
    englishName: 'Foot Orthosis',
    category: 'lower',
    description: 'تُوضع داخل الحذاء لتصحيح وضعية القدم، وتوزيع الضغط بالتساوي، وعلاج آلام القدم والكعب.',
    image: 'https://m.media-amazon.com/images/I/51yiLRrf50L._AC_UF1000,1000_QL80_.jpg',
    color: 'from-cyan-400 to-cyan-600',
    types: [
      { name: 'نعل طبي مسطح (Flat Insole)', desc: 'نعل طبي مصمم خصيصًا لتوزيع الضغط وتخفيف آلام القدم', features: ['تخفيف آلام الكعب', 'توزيع متساوٍ للضغط', 'مناسب للاستخدام اليومي'], image: 'https://bauerfeind.com.au/cdn/shop/files/bf-globotec-junior-kids-outdoor2_1400x@2x.jpg?v=1771990348' },
      { name: 'نعل UCBL', desc: 'مصمم بجامعة كاليفورنيا لتصحيح القدم المسطحة ودعم القوس', features: ['تصحيح القدم المسطحة', 'دعم القوس الطولي', 'منع الانقلاب الداخلي'], image: 'https://static.wixstatic.com/media/d973f5_b57a8fc8d60b415986c323db89026985~mv2.jpg/v1/fill/w_556,h_333,al_c,q_80,usm_0.66_1.00_0.01,enc_avif,quality_auto/d973f5_b57a8fc8d60b415986c323db89026985~mv2.jpg' },
      { name: 'نعل بدعامة قوسية (Arch Support)', desc: 'يوفر دعمًا للقوس الطولي والعرضي مع تخفيف الضغط', features: ['دعم القوس الطولي', 'تخفيف آلام اللفافة الأخمصية', 'مرن ومريح'], image: 'https://encrypted-tbn0.gstatic.com/shopping?q=tbn:ANd9GcSSgoW7BzDY2MryfPXYwrBr_4NfpdlOjxoDbDKUQKQUBYQyQp7hfOvr4uiumlWiG6iNAxowfAF5PAV5sb29_IZar1UV9w6RvifsAV9Yz-XuBJII8AkkYOpSn3P6AYXYuysYszeZ8hy3AFo&usqp=CAc' },
    ],
    indications: ['Flat Foot - القدم المسطحة', 'التهاب اللفافة الأخمصية', 'آلام الكعب', 'metatarsalgia', 'مسمار القدم']
  },
  {
    id: 'smo',
    name: 'جبيرة فوق الكاحل (SMO)',
    englishName: 'Supra Malleolar Orthosis',
    category: 'lower',
    description: 'جبيرة تمتد فوق عظمة الكاحل مباشرة، توفر دعمًا معتدلًا للكاحل والقدم دون تقييد حركة الكاحل.',
    image: 'https://mtherapy.com.au/wp-content/uploads/2024/05/product_ankle_Supramalleolar-Orthosis-SMO.jpg',
    color: 'from-emerald-400 to-emerald-600',
    types: [
      { name: 'SMO مرن', desc: 'مصنوع من البلاستيك المرن لتوفير دعم خفيف وحركة أكبر', features: ['دعم خفيف للكاحل', 'مرونة في الحركة', 'مناسب للأطفال'], image: 'https://www.certifiedop.com/assets/silver_websites/certified-rehab-services/twoorthosis.jpg' },
      { name: 'SMO صلب', desc: 'يوفر دعمًا أكبر وتحكمًا في استقرار الكاحل', features: ['تحكم أفضل في الكاحل', 'استقرار أعلى', 'مناسب لحالات الشلل الخفيف'], image: 'https://www.mobilis.ae/wp-content/uploads/2020/07/Mobilesole_Types-2.jpg' },
    ],
    indications: ['ضعف خفيف في عضلات الكاحل', 'عدم استقرار الكاحل', 'Flat Foot الخفيف', 'pronation مفرط', 'تشوهات خفيفة في القدم عند الأطفال']
  },
  {
    id: 'afo',
    name: 'جبائر الكاحل والقدم (AFO)',
    englishName: 'Ankle Foot Orthosis',
    category: 'lower',
    description: 'تمتد من أسفل الركبة حتى القدم، تُستخدم لدعم وتثبيت الكاحل والقدم في حالات الشلل أو الضعف العضلي.',
    image: 'https://www.crispinorthotics.com/wp-content/uploads/2023/04/JCZ00106.png',
    color: 'from-blue-400 to-blue-600',
    types: [
      { name: 'جبيرة صلبة (Solid AFO)', desc: 'أقصى تثبيت للكاحل والقدم، للشلل الكامل', features: ['تحكم كامل', 'مناسبة للشلل الدماغي', 'تصحيح التشوهات'], price: 'من 1,500 ج.م', image: 'https://www.crispinorthotics.com/wp-content/uploads/2023/04/JCZ00106.png' },
      { name: 'جبيرة مفصلية (Hinged AFO)', desc: 'تسمح بحركة محدودة مع توفير الدعم', features: ['ثني وبسط محدود', 'تحسين المشي', 'مرحلة إعادة التأهيل'], price: 'من 2,200 ج.م', image: 'https://www.crispinorthotics.com/wp-content/uploads/2023/04/JCZ00111.png' },
      { name: 'جبيرة ديناميكية (Dynamic AFO)', desc: 'مواد مرنة تخزن الطاقة وتساعد على الدفع', features: ['تخزين واستعادة الطاقة', 'دفع القدم أثناء المشي', 'للمستخدمين النشطين'], price: 'من 3,500 ج.م', image: 'https://www.crispinorthotics.com/wp-content/uploads/2023/04/JCZ00136.png' },
      { name: 'GRAFO (جبيرة رد فعل الأرض)', desc: 'تمتد حتى أسفل الركبة مع دعم أمامي لمنع انثناء الركبة', features: ['منع انثناء الركبة', 'دعم أثناء الوقوف', 'مناسبة لضعف عضلات الفخذ'], price: 'من 4,000 ج.م', image: 'https://gencogrup.com/wp-content/uploads/2025/08/qualitysteps_orthesis_002.webp' },
      { name: 'جبيرة ليلية (Night Splint)', desc: 'تستخدم أثناء النوم لمنع التقلصات', features: ['منع تقلص وتر أكيليس', 'الحفاظ على استطالة العضلات', 'مريحة للنوم'], price: 'من 1,000 ج.م', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQKC3_s7VI3ZbqwvQZmvikNK6gDPGgVZaAMQtdTayolkqTSEtwlF7ZxmiSXXYaeArSsGZ8&usqp=CAU' },
    ],
    indications: ['ضعف عضلات القدم والكاحل', 'الشلل الدماغي', 'السكتة الدماغية', 'القدم المتدلية (Foot Drop)', 'التهاب اللفافة الأخمصية', 'إصابات الحبل الشوكي']
  },
  {
    id: 'kafo',
    name: 'جبائر الركبة والكاحل والقدم (KAFO)',
    englishName: 'Knee Ankle Foot Orthosis',
    category: 'lower',
    description: 'تمتد من الفخذ إلى القدم، توفر دعمًا شاملًا للركبة والكاحل والقدم في حالات الشلل.',
    image: 'https://m.media-amazon.com/images/I/41Bsz5eptqL._SS400_.jpg',
    color: 'from-purple-400 to-purple-600',
    types: [
      { name: 'KAFO بقفل ركبة ثابت', desc: 'تثبيت كامل للركبة في وضعية معينة', features: ['استقرار كامل', 'للشلل الشديد', 'منع انهيار الركبة'], price: 'من 6,000 ج.م', image: 'https://images.squarespace-cdn.com/content/v1/5eedea5ef591485ebfb17cf6/1593863726354-0SROHE647ZVLC6JFM5AR/KAFO.png?format=500w' },
      { name: 'KAFO بقفل متحرك (Stance Control)', desc: 'تسمح بثني الركبة عند الجلوس وتثبيتها عند الوقوف', features: ['ثني عند الجلوس', 'تثبيت عند الوقوف', 'حركة أكثر طبيعية'], image: 'https://5.imimg.com/data5/ANDROID/Default/2022/6/DW/NO/UP/82142452/product-jpeg-1000x1000.jpg' },
      { name: 'KAFO إلكترونية', desc: 'مزودة بمستشعرات للتحكم الذكي في حركة المفاصل', features: ['تستشعر نمط المشي', 'تعديل آلي للمقاومة', 'أقل استهلاك للطاقة'], image: 'https://www.ottobock.com/_next/image?url=https%3A%2F%2Fspa-prod-commerce.cep.ottobock.com%2Focc%2Fv2%2Fcep-medias%2F3416889_930Wx930H%2F930Wx930H%2FCEP_MEDIA_CATALOG%2FOnline&w=1600&q=75' },
    ],
    indications: ['شلل الأطراف السفلية', 'ضعف عضلات الساق والفخذ', 'عدم استقرار الركبة', 'إصابات الحبل الشوكي', 'التصلب المتعدد', 'شلل الأطفال']
  },
  {
    id: 'ko',
    name: 'جبائر الركبة (KO)',
    englishName: 'Knee Orthosis',
    category: 'lower',
    description: 'تُستخدم لدعم وتثبيت مفصل الركبة بعد الإصابات والجراحات.',
    image: 'https://bauerfeind.com.au/cdn/shop/products/true_f112ba38-f47d-4aa9-af3c-9837856265d2_1400x@2x.jpg?v=1724385481',
    color: 'from-indigo-400 to-indigo-600',
    types: [
      { name: 'دعامة الرباط الصليبي (ACL Brace)', desc: 'تحمي الرباط الصليبي بعد الإصابة أو الجراحة', features: ['حماية الرباط الصليبي', 'تحكم في مدى الحركة', 'دعم جانبي'], image: 'https://m.media-amazon.com/images/I/61FjfYslLoL._AC_UL1200_.jpg' },
      { name: 'دعامة ركبة مفصلية (Hinged Knee Brace)', desc: 'تسمح بالثني والمد مع حماية المفصل', features: ['مفصل قابل للتعديل', 'تحكم في زاوية الثني', 'خفيفة الوزن'], image: 'https://m.media-amazon.com/images/I/71bM9u1NmKL._AC_UL1200_.jpg' },
    ],
    indications: ['إصابات الرباط الصليبي ACL/PCL', 'تمزق الغضروف الهلالي', 'خشونة الركبة', 'بعد جراحات الركبة', 'عدم استقرار الركبة']
  },
  {
    id: 'hip',
    name: 'جبائر الورك والحوض (HO)',
    englishName: 'Hip Orthosis',
    category: 'lower',
    description: 'تُستخدم لدعم مفصل الورك، خاصة في حالات خلع الورك الولادي عند الأطفال.',
    image: 'https://www.orliman.com/wp-content/uploads/HO4001-1.jpg',
    color: 'from-rose-400 to-rose-600',
    types: [
      { name: 'وسادة Pavlik', desc: 'لعلاج خلع الورك عند الرضع', features: ['مواد ناعمة ومريحة', 'قابلة للتعديل', '23 ساعة يوميًا'], image: 'https://www.alimed.com/_resources/cache/images/product/51968_850x480-pad.jpg' },
      { name: 'جبيرة تباعد الوركين', desc: 'منع تقارب الوركين بعد جراحات الورك', features: ['تحكم في التباعد', 'قابلة للتعديل', 'مريحة'], image: 'https://www.alimed.com/_resources/cache/images/product/62975_850x480-pad.jpg' },
    ],
    indications: ['خلع الورك الولادي', 'جراحات استبدال الورك', 'كسور الفخذ', 'آلام الحوض']
  },

  // ===== SPINAL =====
  {
    id: 'cervical',
    name: 'جبائر العنق (CO)',
    englishName: 'Cervical Orthosis',
    category: 'spinal',
    description: 'تُستخدم لتثبيت الفقرات العنقية ومنع حركتها بعد الإصابات والجراحات.',
    image: 'https://elheekma.com/wp-content/uploads/2020/08/HJ_128-600x508.jpg',
    color: 'from-sky-400 to-sky-600',
    types: [
      { name: 'طوق فيلادلفيا (Philadelphia Collar)', desc: 'تثبيت الفقرات العنقية بعد الإصابات', features: ['يغطي الفك والترقوتين', 'فوم مع دعامات بلاستيكية', 'سهل التنظيف'], image: 'https://elheekma.com/wp-content/uploads/2020/08/HJ_128-600x508.jpg' },
      { name: 'طوق عنق لين (Soft Collar)', desc: 'دعم خفيف للعنق وتخفيف الألم', features: ['مرن ومريح', 'دعم خفيف', 'للآلام البسيطة'], image: 'https://m.media-amazon.com/images/I/61HoVdFO6ZL._AC_UL1200_.jpg' },
    ],
    indications: ['إصابات العنق', 'بعد جراحات العنق', 'آلام الفقرات العنقية', 'الانزلاق الغضروفي العنقي']
  },
  {
    id: 'tlso',
    name: 'جبائر الجذع (TLSO)',
    englishName: 'Thoraco-Lumbo-Sacral Orthosis',
    category: 'spinal',
    description: 'تمتد من المنطقة الصدرية إلى العجزية، تدعم العمود الفقري وتصحح التشوهات.',
    image: 'https://www.superiorbraces.com/cdn/shop/products/a14-02_1024x1024.jpeg?v=1527297450',
    color: 'from-violet-400 to-violet-600',
    types: [
      { name: 'جبيرة بوسطن (Boston Brace)', desc: 'لعلاج الجنف عند المراهقين', features: ['علاج الجنف', '18-23 ساعة يوميًا', 'مخصصة حسب القياسات'], image: 'https://5.imimg.com/data5/SELLER/Default/2024/10/456384166/VC/YO/AO/88573415/boston-brace-1000x1000.png' },
      { name: 'TLSO Rigid', desc: 'تثبيت الفقرات الصدرية والقطنية', features: ['تقيد الحركة', 'بعد الكسور', 'بعد الجراحات'], image: 'https://www.bionicsorthotics.com/wp-content/uploads/2021/07/TLSO-e1658418764802.jpeg' },
      { name: 'مشد لومبار (LSO)', desc: 'دعم أسفل الظهر وتخفيف الآلام', features: ['خفيف ومرن', 'تحت الملابس', 'للاستخدام اليومي'], image: 'https://m.media-amazon.com/images/I/71Gqhz8GNML._AC_UL1200_.jpg' },
    ],
    indications: ['الجنف', 'كسور العمود الفقري', 'ما بعد جراحات الظهر', 'آلام أسفل الظهر', 'هشاشة العظام', 'انزلاق الفقرات']
  },

  // ===== UPPER LIMB =====
  {
    id: 'who',
    name: 'جبائر الرسغ واليد (WHO)',
    englishName: 'Wrist-Hand Orthosis',
    category: 'upper',
    description: 'تثبيت وتصحيح مفصل الرسغ واليد للعلاج وإعادة التأهيل.',
    image: 'https://melbournehand.com.au/wp-content/uploads/2022/12/MHR-Splint-board-animate_01.gif',
    color: 'from-orange-400 to-orange-600',
    types: [
      { name: 'جبيرة رسغ (Wrist Splint)', desc: 'تثبيت الرسغ في وضعية وظيفية', features: ['تخفيف متلازمة النفق الرسغي', 'للنوم أو طوال اليوم'], image: 'https://melbournehand.com.au/wp-content/uploads/2022/12/MHR-Splint-board-animate_01.gif' },
      { name: 'جبيرة أصابع (Finger Splint)', desc: 'تثبيت الأصابع بعد الإصابات', features: ['لإصبع واحد أو عدة أصابع', 'قابلة للتعديل', 'خفيفة'], image: 'https://m.media-amazon.com/images/I/71LINb+ej1L.jpg' },
      { name: 'جبيرة Cock-up', desc: 'تثبت الرسغ مع السماح بحركة الأصابع', features: ['ثبات الرسغ', 'حرية الأصابع', 'لشلل الأعصاب'], image: 'https://www.rehabmart.com/imagesfromrd/c-304-cock-up-wrist-splint.jpg' },
    ],
    indications: ['متلازمة النفق الرسغي', 'التهاب الأوتار', 'كسور الرسغ والأصابع', 'شلل الأعصاب الطرفية', 'التهاب المفاصل الروماتويدي']
  },
  {
    id: 'eo',
    name: 'جبائر الكوع (EO)',
    englishName: 'Elbow Orthosis',
    category: 'upper',
    description: 'تُستخدم لدعم مفصل الكوع وتقييد حركته بعد الإصابات والجراحات.',
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRqPvErzWeX7YSS-2xYKPqIBnphcstQ8vS-zQ&s',
    color: 'from-teal-400 to-teal-600',
    types: [
      { name: 'جبيرة كوع مفصلية', desc: 'تسمح بالثني والمد المحدود', features: ['تحكم في الزاوية', 'مفصل قابل للتعديل'], image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRqPvErzWeX7YSS-2xYKPqIBnphcstQ8vS-zQ&s' },
      { name: 'حزام Tennis Elbow', desc: 'لعلاج التهاب مرفق التنس', features: ['ضغط على نقطة محددة', 'خفيف ومريح'], image: 'https://m.media-amazon.com/images/I/61+CiWbhDGL._AC_UL1200_.jpg' },
    ],
    indications: ['مرفق التنس', 'كسور الكوع', 'بعد جراحات الكوع', 'التهاب الأوتار']
  },

  // ===== PEDIATRIC & DEFORMITIES =====
  {
    id: 'clubfoot',
    name: 'علاج القدم الحنفاء (Club Foot)',
    englishName: 'Club Foot Treatment',
    category: 'pediatric',
    description: 'القدم الحنفاء (Clubfoot/Talipes Equinovarus) تشوه خلقي يؤثر على القدم والكاحل. يبدأ العلاج بطريقة بونسيتي ثم يستكمل بجبيرة Dennis Brown.',
    image: 'https://thefootpractice.com/wp-content/uploads/clubfoot-child.jpg.webp',
    color: 'from-pink-400 to-pink-600',
    types: [
      { name: 'Dennis Brown Splint (Bar & Shoes)', desc: 'حذائين متصلين ببار معدني لتثبيت القدمين في وضع التصحيح بعد إزالة الجبس', features: ['يُستخدم 23 ساعة يوميًا لأول 3 أشهر', 'ثم أثناء النوم فقط لمدة 4-5 سنوات', 'يمنع ارتجاع التشوه', 'قابل للتعديل مع النمو'], image: 'https://images-na.ssl-images-amazon.com/images/I/61XGD7DRGHL._UL1500_.jpg' },
      { name: 'Ponseti Casting', desc: 'سلسلة من الجبائر الجبسية تُغير كل أسبوع لتصحيح التشوه تدريجيًا', features: ['5-8 جلسات جبس', 'تصحيح تدريجي بدون جراحة', 'نسبة نجاح 95%+', 'يبدأ من الأسبوع الأول'], image: 'https://assets.cureus.com/uploads/figure/file/1186555/lightbox_51e94890285511ef90e94d3d7a9cf94b-Club-Foot-Ponsetti-Method.png' },
      { name: 'Dobbs Bar', desc: 'نسخة مطورة مرنة من Dennis Brown مع محور مركزي يسمح بالحركة', features: ['حركة أكثر للطفل', 'محور مرن مركزي', 'نتائج تأهيلية أفضل'], image: 'https://www.md-health.com/wp-content/uploads/2023/Dobbs-bar-clubfoot.jpg' },
    ],
    indications: ['القدم الحنفاء الخلقية (CTEV)', 'القدم الحنفاء المكتسبة', 'ارتجاع التشوه بعد التصحيح', 'القدم الحنفاء أحادية أو ثنائية الجانب']
  },
  {
    id: 'flatfoot',
    name: 'علاج القدم المسطحة (Flat Foot)',
    englishName: 'Flat Foot / Pes Planus',
    category: 'pediatric',
    description: 'القدم المسطحة حالة يكون فيها القوس الطولي للقدم غائبًا أو منخفضًا. تتراوح من مرنة (طبيعية عند الأطفال) إلى صلبة تحتاج تدخلًا.',
    image: 'https://www.drhc.ae/hubfs/Flexible-Flatfoot.webp',
    color: 'from-amber-400 to-amber-600',
    types: [
      { name: 'UCBL Orthosis', desc: 'نعل عميق يحتضن الكعب ويدعم القوس - الأفضل للقدم المسطحة', features: ['دعم قوي للقوس', 'تصحيح انقلاب الكعب', 'مصمم خصيصًا على قياس القدم', 'فعال جدًا للأطفال والبالغين'], image: 'https://www.spinaltech.com.au/img/thumbs/960_540_crop_70dae2_ucbl-orthosis-custom.jpg' },
      { name: 'SMO للقدم المسطحة', desc: 'جبيرة فوق الكاحل تدعم القوس وتمنع الانقلاب', features: ['دعم الكاحل والقوس', 'مناسبة للأطفال', 'تُلبس داخل الحذاء'], image: 'https://5.imimg.com/data5/IOS/Default/2025/10/554630034/NX/TG/ED/72038474/product-jpeg-1000x1000.jpeg' },
      { name: 'نعل طبي بدعامة قوسية', desc: 'حل بسيط للحالات الخفيفة مع دعم القوس', features: ['سهل الاستخدام', 'تكلفة معقولة', 'مناسب للحالات الخفيفة'], image: 'https://image.made-in-china.com/155f0j00VBJWQiLcgDUP/Overpronation-Inner-Sole-Foot-Inserts-Arch-Support-Flat-Feet-Orthotic-Insole-for-Fallen-High-Arches.webp' },
    ],
    indications: ['القدم المسطحة المرنة', 'القدم المسطحة الصلبة', 'آلام القدم والكاحل والركبة بسبب التسطح', 'Pronation مفرط', 'آلام أسفل الظهر المرتبطة بالقدم المسطحة']
  },
  {
    id: 'metatarsus',
    name: 'تشوه مقدمة القدم',
    englishName: 'Metatarsus Adductus',
    category: 'pediatric',
    description: 'تشوه خلقي تنحرف فيه مقدمة القدم للداخل. معظم الحالات تتحسن ذاتيًا، والحالات المتوسطة تحتاج علاجًا بالجبائر.',
    image: 'https://medlineplus.gov/ency/images/ency/fullsize/9052.jpg',
    color: 'from-lime-400 to-lime-600',
    types: [
      { name: 'Bebax Shoe', desc: 'حذاء خاص مع أشرطة لتصحيح انحراف مقدمة القدم', features: ['تصحيح لطيف ومستمر', 'مريح للطفل', 'سهل الاستخدام'], image: 'https://www.vesalius.gr/wp-content/uploads/2022/07/bebax4-jpg.webp' },
      { name: 'جبائر تصحيحية مرنة', desc: 'تُلبس أثناء النوم لتصحيح الانحراف تدريجيًا', features: ['استخدام ليلي', 'تصحيح تدريجي', 'مناسبة للرضع'], image: 'https://m.media-amazon.com/images/I/61tXMPGblWL._AC_UL1200_.jpg' },
    ],
    indications: ['Metatarsus Adductus', 'Metatarsus Varus', 'انحراف مقدمة القدم الخلقي']
  },
  {
    id: 'pescavus',
    name: 'القدم المقوسة (Pes Cavus)',
    englishName: 'Pes Cavus / High Arch',
    category: 'pediatric',
    description: 'ارتفاع مبالغ فيه في قوس القدم يسبب ضغطًا زائدًا على الكعب ومقدمة القدم وقد يسبب عدم استقرار الكاحل.',
    image: 'https://physio2h.com/wp-content/uploads/2023/01/High-Arch-Feet-4.jpg',
    color: 'from-red-400 to-red-600',
    types: [
      { name: 'نعل طبي للقدم المقوسة', desc: 'نعل مصمم لتوزيع الضغط وتوفير دعم مناسب', features: ['توزيع الضغط المتساوي', 'امتصاص الصدمات', 'تقليل آلام مقدمة القدم'], image: 'https://i.ebayimg.com/images/g/j3QAAOSwlTheISFk/s-l1600.webp' },
      { name: 'AFO مخصص', desc: 'لحالات عدم الاستقرار الشديد المصاحب', features: ['دعم الكاحل', 'استقرار أفضل', 'مخصص حسب الحالة'], image: 'https://www.crispinorthotics.com/wp-content/uploads/2023/04/JCZ00106.png' },
    ],
    indications: ['Pes Cavus - القدم المقوسة', 'Charcot-Marie-Tooth disease', 'عدم استقرار الكاحل المتكرر', 'آلام مقدمة القدم', 'Metatarsalgia']
  },
];

// ============ COMPONENT ============

const Orthoses = () => {
  useEffect(() => {
    document.documentElement.dir = 'rtl';
    document.body.classList.add('font-cairo');
    window.scrollTo(0, 0);
  }, []);

  const [activeCategory, setActiveCategory] = useState('all');
  const [expandedItem, setExpandedItem] = useState<string | null>(null);
  const [activeTypeIndex, setActiveTypeIndex] = useState<Record<string, number>>({});

  const filteredData = activeCategory === 'all' ? orthosesData : orthosesData.filter(o => o.category === activeCategory);

  const selectType = (orthId: string, idx: number) => {
    setActiveTypeIndex(prev => ({ ...prev, [orthId]: idx }));
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-bl from-medical-50 via-white to-teal-50">
          <motion.div animate={{ scale: [1, 1.2, 1] }} transition={{ duration: 8, repeat: Infinity }} className="absolute top-20 right-20 w-72 h-72 rounded-full bg-medical-200/30 blur-3xl" />
          <motion.div animate={{ scale: [1, 1.3, 1] }} transition={{ duration: 10, repeat: Infinity, delay: 1 }} className="absolute bottom-20 left-20 w-96 h-96 rounded-full bg-teal-200/20 blur-3xl" />
        </div>
        <div className="relative container mx-auto px-4 text-center">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
            <div className="inline-flex items-center gap-2 bg-teal-100 text-teal-700 px-4 py-2 rounded-full text-sm font-bold mb-4">
              <Bandage className="w-4 h-4" />
              حلول متكاملة
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
              <span className="bg-gradient-to-l from-medical-600 via-teal-600 to-emerald-600 bg-clip-text text-transparent">
                الجبائر الطبية
              </span>
            </h1>
            <p className="text-gray-500 text-lg max-w-2xl mx-auto mb-8">
              مجموعة شاملة من الجبائر الطبية لجميع أجزاء الجسم، تشمل حالات تشوهات القدم عند الأطفال والبالغين
            </p>
          </motion.div>
        </div>
      </section>

      {/* Category Filter */}
      <section className="sticky top-16 z-30 bg-white/90 backdrop-blur-md shadow-sm border-b border-gray-100 py-4">
        <div className="container mx-auto px-4">
          <div className="flex justify-center gap-2 flex-wrap">
            {orthosesCategories.map(cat => (
              <motion.button
                key={cat.id}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setActiveCategory(cat.id)}
                className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-bold transition-all duration-300 ${activeCategory === cat.id
                  ? 'bg-gradient-to-l from-medical-600 to-teal-600 text-white shadow-lg shadow-medical-500/20'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
              >
                <cat.icon className="w-4 h-4" />
                {cat.label}
              </motion.button>
            ))}
          </div>
        </div>
      </section>

      {/* Orthoses Grid */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <motion.div layout className="space-y-16">
            <AnimatePresence mode="popLayout">
              {filteredData.map((orth, index) => {
                const currentTypeIdx = activeTypeIndex[orth.id] || 0;
                const currentType = orth.types[currentTypeIdx];

                return (
                  <motion.div
                    key={orth.id}
                    id={orth.id}
                    layout
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.5, delay: index * 0.05 }}
                    className="scroll-mt-36"
                  >
                    <div className="bg-white rounded-3xl shadow-lg overflow-hidden border border-gray-100 hover:shadow-xl transition-shadow duration-500">
                      <div className={`flex flex-col ${index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'} `}>
                        {/* Image Side */}
                        <div className="lg:w-2/5 relative overflow-hidden group">
                          <img src={orth.image} alt={orth.name} className="w-full h-72 lg:h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                          <div className={`absolute inset-0 bg-gradient-to-t ${orth.color} opacity-30`} />
                          {/* Name on image */}
                          <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/70 to-transparent p-6">
                            <p className="text-white/70 text-sm font-medium">{orth.englishName}</p>
                            <h3 className="text-white text-2xl font-bold">{orth.name}</h3>
                          </div>
                          {/* Category Badge */}
                          <div className="absolute top-4 right-4">
                            <span className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold bg-white/90 backdrop-blur-sm shadow-lg`}>
                              <Star className="w-3.5 h-3.5 text-amber-500" />
                              {orthosesCategories.find(c => c.id === orth.category)?.label}
                            </span>
                          </div>
                        </div>

                        {/* Content Side */}
                        <div className="lg:w-3/5 p-6 lg:p-8">
                          <p className="text-gray-600 leading-relaxed mb-5">{orth.description}</p>

                          {/* Indications */}
                          <div className="mb-5">
                            <h4 className="font-bold text-gray-800 text-sm mb-2 flex items-center gap-2">
                              <Info className="w-4 h-4 text-medical-500" />
                              دواعي الاستخدام
                            </h4>
                            <div className="flex flex-wrap gap-2">
                              {orth.indications.map((ind, idx) => (
                                <span key={idx} className="text-xs px-3 py-1.5 bg-gray-100 text-gray-700 rounded-lg font-medium">{ind}</span>
                              ))}
                            </div>
                          </div>

                          {/* Types Tabs */}
                          <div className="mb-4">
                            <h4 className="font-bold text-gray-800 text-sm mb-3">الأنواع المتاحة:</h4>
                            <div className="flex flex-wrap gap-2 mb-4">
                              {orth.types.map((type, idx) => (
                                <button
                                  key={idx}
                                  onClick={() => selectType(orth.id, idx)}
                                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all duration-200 ${currentTypeIdx === idx
                                    ? `bg-gradient-to-l ${orth.color} text-white shadow-md`
                                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                                    }`}
                                >
                                  {type.name.split('(')[0].trim()}
                                </button>
                              ))}
                            </div>

                            {/* Selected Type Detail */}
                            <AnimatePresence mode="wait">
                              <motion.div
                                key={`${orth.id}-${currentTypeIdx}`}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -10 }}
                                transition={{ duration: 0.2 }}
                                className="bg-gray-50 rounded-2xl p-5"
                              >
                                <div className="flex flex-col md:flex-row gap-5">
                                  <div className="md:w-1/3">
                                    <img src={currentType.image} alt={currentType.name} className="w-full h-36 object-cover rounded-xl shadow-md" />
                                  </div>
                                  <div className="md:w-2/3">
                                    <div className="flex items-center justify-between mb-2">
                                      <h5 className="font-bold text-gray-900">{currentType.name}</h5>
                                      {(currentType as any).price && (
                                        <span className="text-xs px-3 py-1 bg-green-100 text-green-700 rounded-full font-bold">{(currentType as any).price}</span>
                                      )}
                                    </div>
                                    <p className="text-gray-600 text-sm mb-3">{currentType.desc}</p>
                                    <ul className="space-y-1.5">
                                      {currentType.features.map((f, fi) => (
                                        <li key={fi} className="flex items-start gap-2 text-sm text-gray-600">
                                          <Check className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                                          {f}
                                        </li>
                                      ))}
                                    </ul>
                                  </div>
                                </div>
                              </motion.div>
                            </AnimatePresence>
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="bg-gradient-to-l from-medical-600 via-medical-700 to-teal-700 rounded-3xl p-10 md:p-14 text-center shadow-2xl shadow-medical-600/20 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 rounded-full bg-white/5 -translate-y-1/2 translate-x-1/2" />
            <div className="absolute bottom-0 left-0 w-48 h-48 rounded-full bg-white/5 translate-y-1/2 -translate-x-1/2" />
            <div className="relative z-10">
              <div className="w-16 h-16 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center mx-auto mb-5">
                <Award className="w-8 h-8 text-white" />
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">احصل على استشارة مجانية</h2>
              <p className="text-white/80 text-lg max-w-2xl mx-auto mb-8">
                فريقنا المتخصص مستعد لمساعدتك في اختيار الجبيرة المناسبة لاحتياجاتك. تواصل معنا للحصول على تقييم شامل.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <a href="https://wa.me/201119056895" target="_blank" rel="noopener noreferrer">
                  <Button size="lg" className="bg-green-500 hover:bg-green-600 text-white px-8 py-3 rounded-xl text-lg shadow-xl">
                    واتساب
                  </Button>
                </a>
                <Link to="/booking">
                  <Button size="lg" className="bg-white text-medical-700 hover:bg-medical-50 px-8 py-3 rounded-xl text-lg shadow-xl">
                    حجز موعد
                    <ArrowRight className="mr-2 h-5 w-5 rtl:rotate-180" />
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Orthoses;
