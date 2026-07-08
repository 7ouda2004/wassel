
import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Info, ChevronRight, ArrowRight, Award, BarChart, Bandage, Ruler, Activity, Hand, User, PersonStanding } from 'lucide-react';
import { 
  Accordion, 
  AccordionContent, 
  AccordionItem, 
  AccordionTrigger 
} from '@/components/ui/accordion';
import { Button } from '@/components/ui/button';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const orthosesData = [
  {
    id: 'afo',
    name: 'جبائر الكاحل والقدم (AFO)',
    image: 'https://images.pexels.com/photos/3913020/pexels-photo-3913020.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    description: 'تُستخدم لدعم وتثبيت الكاحل والقدم في حالات الشلل أو الضعف العضلي، وتساعد على تحسين المشية وتقليل التعب.',
    types: [
      {
        name: 'جبيرة صلبة (Solid AFO)',
        description: 'توفر أقصى درجات التثبيت للكاحل والقدم، وتستخدم في حالات الشلل الكامل أو عدم الاستقرار الشديد.',
        features: ['تحكم كامل في حركة القدم', 'مناسبة للأطفال المصابين بالشلل الدماغي', 'تصحيح تشوهات القدم'],
        price: 'تبدأ من 1,500 ج.م',
        image: 'https://www.crispinorthotics.com/wp-content/uploads/2023/04/JCZ00106.png'
      },
      {
        name: 'جبيرة مفصلية (Hinged AFO)',
        description: 'تسمح بحركة محدودة للكاحل مع توفير الدعم اللازم، مما يسمح بحركة أكثر طبيعية أثناء المشي.',
        features: ['تسمح بثني القدم للأعلى والأسفل ضمن نطاق محدد', 'تحسين نمط المشي', 'مناسبة لمرحلة إعادة التأهيل'],
        price: 'تبدأ من 2,200 ج.م',
        image: 'https://www.crispinorthotics.com/wp-content/uploads/2023/04/JCZ00111.png'
      },
      {
        name: 'جبيرة ديناميكية (Dynamic AFO)',
        description: 'مصممة خصيصًا لتعزيز حركة القدم الطبيعية أثناء المشي وتخزين الطاقة واستعادتها.',
        features: ['تصنع من مواد مرنة تخزن الطاقة', 'تساعد على دفع القدم أثناء المشي', 'مناسبة للمستخدمين النشطين'],
        price: 'تبدأ من 3,500 ج.م',
        image: 'https://www.crispinorthotics.com/wp-content/uploads/2023/04/JCZ00136.png'
      },
      {
        name: 'جبيرة ليلية (Night Splint)',
        description: 'تستخدم أثناء النوم للحفاظ على وضعية القدم الصحيحة ومنع التقلصات والتشوهات.',
        features: ['تحافظ على استطالة العضلات والأوتار', 'تمنع تكون التقلصات', 'مريحة للاستخدام الليلي'],
        price: 'تبدأ من 1,000 ج.م',
        image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQKC3_s7VI3ZbqwvQZmvikNK6gDPGgVZaAMQtdTayolkqTSEtwlF7ZxmiSXXYaeArSsGZ8&usqp=CAU'
      }
    ],
    indications: [
      'ضعف العضلات في القدم والكاحل',
      'الشلل الدماغي',
      'السكتة الدماغية',
      'إصابات الحبل الشوكي',
      'تخفيف الألم وتحسين الوظيفة',
      'التهاب اللفافة الأخمصية',
      'القدم المتدلية (Foot Drop)'
    ]
  },
  {
    id: 'kafo',
    name: 'جبائر الركبة والكاحل والقدم (KAFO)',
    image: 'https://bldtecomukprod.dfs.core.windows.net/media/c45pxvve/swing_and_stance_grey.jpg',
    description: 'تمتد من الفخذ إلى القدم، وتوفر دعمًا للركبة والكاحل والقدم، وتُستخدم في حالات عدم استقرار المفاصل أو الشلل.',
    types: [
      {
        name: 'جبيرة بقفل ركبة ثابت (Rigid KAFO)',
        description: 'تثبت الركبة في وضعية معينة لتوفير الدعم الكامل، مما يساعد المرضى الذين يعانون من ضعف شديد في العضلات.',
        features: ['استقرار كامل أثناء الوقوف والمشي', 'مناسبة لحالات الشلل الرباعي والسفلي', 'تمنع انهيار الركبة'],
        price: 'تبدأ من 6,000 ج.م',
        image: 'https://images.squarespace-cdn.com/content/v1/5eedea5ef591485ebfb17cf6/1593863726354-0SROHE647ZVLC6JFM5AR/KAFO.png?format=500w'
      },
      {
        name: 'جبيرة بقفل ركبة متحرك (Stance Control KAFO)',
        description: 'تسمح بثني الركبة عند الجلوس وتثبيتها عند الوقوف، مما يوفر تحكمًا أفضل وحركة أكثر طبيعية.',
        features: ['تسمح بثني الركبة أثناء مرحلة التأرجح من المشي', 'تمنع انثناء الركبة أثناء الوقوف', 'تقلل من استهلاك الطاقة أثناء المشي'],
        image: 'https://5.imimg.com/data5/ANDROID/Default/2022/6/DW/NO/UP/82142452/product-jpeg-1000x1000.jpg'
      },
      {
        name: 'جبيرة هيدروليكية (Hydraulic KAFO)',
        description: 'تستخدم تقنية هيدروليكية للتحكم في حركة الركبة بشكل أكثر طبيعية، مما يوفر استجابة ديناميكية للحركة.',
        features: ['تحكم دقيق في مقاومة الثني والمد', 'حركة سلسة أثناء المشي', 'تكيف مع سرعات المشي المختلفة'],
        image: 'http://web.tradekorea.com/product/920/1183920/Knee%20Ankle%20Foot%20Orthosis%20KAFO%20Lower_limb%20Oorthotic%20Products_2.jpg'
      },
      {
        name: 'جبيرة إلكترونية (Electronic KAFO)',
        description: 'مزودة بمستشعرات ومعالجات دقيقة تتحكم في حركة المفاصل بناءً على نمط المشي وحركة المستخدم.',
        features: ['تستشعر نمط المشي وتتكيف معه', 'تعديل آلي للمقاومة حسب النشاط', 'مناسبة للمستخدمين ذوي مستوى النشاط العالي'],
        image: 'https://www.ottobock.com/_next/image?url=https%3A%2F%2Fspa-prod-commerce.cep.ottobock.com%2Focc%2Fv2%2Fcep-medias%2F3416889_930Wx930H%2F930Wx930H%2FCEP_MEDIA_CATALOG%2FOnline&w=1600&q=75'
      }
    ],
    indications: [
      'ضعف عضلات الساق والفخذ',
      'عدم استقرار الركبة',
      'شلل الأطراف السفلية',
      'إصابات الحبل الشوكي المتوسطة والشديدة',
      'اعتلال الأعصاب المحيطية',
      'التصلب المتعدد',
      'متلازمة ما بعد شلل الأطفال'
    ]
  },
  {
    id: 'spinal',
    name: 'جبائر العمود الفقري (Spinal Orthoses)',
    image: '/public/images/1.jpg',
    description: 'تستخدم لتصحيح تشوهات العمود الفقري وعلاج مشاكله مثل الجنف والحداب، وتوفير الدعم والاستقرار للعمود الفقري.',
    types: [
      {
        name: 'جبيرة بوسطن (Boston Brace)',
        description: 'مصممة خصيصًا لعلاج الجنف (الانحناء الجانبي للعمود الفقري) لدى المراهقين، وترتدى عادة لمدة 18-23 ساعة يوميًا.',
        features: ['تغطي من أسفل الإبطين إلى أعلى الحوض', 'مصنوعة من البلاستيك الصلب مع بطانة داخلية', 'مخصصة حسب قياسات المريض'],
        image: 'https://5.imimg.com/data5/SELLER/Default/2024/10/456384166/VC/YO/AO/88573415/boston-brace-1000x1000.png'
      },
      {
        name: 'جبيرة TLSO (Thoraco-Lumbo-Sacral Orthosis)',
        description: 'تدعم المنطقة الصدرية والقطنية والعجزية من العمود الفقري، وتستخدم لعلاج الجنف، الكسور، وبعد الجراحات.',
        features: ['تقيد حركة الفقرات الصدرية والقطنية', 'تقلل الضغط على العمود الفقري', 'متوفرة بأنماط مختلفة حسب الحالة'],
        image: 'https://www.superiorbraces.com/cdn/shop/products/a14-02_1024x1024.jpeg?v=1527297450'
      },
      {
        name: 'حزام فيلادلفيا (Philadelphia Collar)',
        description: 'يستخدم لتثبيت الفقرات العنقية بعد الإصابات أو الجراحة، ويمنع حركة الانحناء والدوران والانثناء الجانبي.',
        features: ['يغطي الفك السفلي والترقوتين', 'مصنوع من الفوم مع دعامات بلاستيكية', 'سهل الاستخدام والتنظيف'],
        image: 'https://elheekma.com/wp-content/uploads/2020/08/HJ_128-600x508.jpg'
      },
      {
        name: 'مشد لومبار (Lumbar Support)',
        description: 'يستخدم لدعم أسفل الظهر وتخفيف آلام المنطقة القطنية، ويساعد على الحفاظ على وضعية صحيحة أثناء الجلوس والوقوف.',
        features: ['خفيف الوزن ومرن', 'يمكن ارتداؤه تحت الملابس', 'مناسب للاستخدام اليومي والعمل'],
        image: 'data:image/jpeg;base64,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'
      }
    ],
    indications: [
      'الجنف (الانحناء الجانبي للعمود الفقري)',
      'الحداب (زيادة التقوس في المنطقة الصدرية)',
      'كسور العمود الفقري',
      'بعد جراحات العمود الفقري',
      'آلام أسفل الظهر المزمنة',
      'هشاشة العظام',
      'انزلاق الفقرات'
    ]
  },
  {
    id: 'upper-limb',
    name: 'جبائر الطرف العلوي (Upper Limb Orthoses)',
    image: 'https://deccanorthopro.com/wp-content/uploads/2018/11/upper_extremity_orthotics_img4.jpg',
    description: 'تستخدم لدعم وتثبيت مفاصل الطرف العلوي، بما في ذلك الأصابع واليد والرسغ والكوع والكتف، في حالات الإصابات والاضطرابات العصبية والعضلية.',
    types: [
      {
        name: 'جبائر الأصابع (Finger Orthoses)',
        description: 'تستخدم لتثبيت أو تصحيح وضعية الأصابع بعد الإصابات أو الجراحة، وتساعد على استعادة الوظيفة.',
        features: ['متوفرة لإصبع واحد أو عدة أصابع', 'قابلة للتعديل حسب حجم الإصبع', 'مصنوعة من مواد خفيفة ومريحة'],
        image: 'https://m.media-amazon.com/images/I/71LINb+ej1L.jpg'
      },
      {
        name: 'جبائر الرسغ (Wrist Orthoses)',
        description: 'تثبت مفصل الرسغ في وضعية وظيفية، وتستخدم في حالات متلازمة النفق الرسغي، التهاب الأوتار، وبعد الكسور.',
        features: ['توفر راحة للرسغ وتقليل الألم', 'يمكن ارتداؤها أثناء النوم أو طوال اليوم', 'متوفرة بأحجام مختلفة للاستخدام اليمنى واليسرى'],
        image: 'https://melbournehand.com.au/wp-content/uploads/2022/12/MHR-Splint-board-animate_01.gif'
      },
      {
        name: 'جبائر الكوع (Elbow Orthoses)',
        description: 'تستخدم لتقييد حركة الكوع أو دعمه بعد الإصابات أو الجراحات، وتساعد في علاج التهاب الأوتار ومرفق التنس.',
        features: ['تحكم في درجة انثناء ومد الكوع', 'مزودة بمفصل قابل للتعديل', 'مريحة للاستخدام اليومي'],
        image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRqPvErzWeX7YSS-2xYKPqIBnphcstQ8vS-zQ&s'
      },
      {
        name: 'جبائر الكتف (Shoulder Orthoses)',
        description: 'تستخدم لتثبيت مفصل الكتف بعد الجراحات أو الإصابات، مثل خلع الكتف أو تمزق العضلات الدوارة.',
        features: ['تحد من حركة الكتف في الاتجاهات المختلفة', 'تساعد في تخفيف الألم', 'قابلة للتعديل حسب الحاجة'],
        image: 'data:image/jpeg;base64,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'
      }
    ],
    indications: [
      'إصابات الأعصاب الطرفية',
      'متلازمة النفق الرسغي',
      'التهاب المفاصل',
      'إصابات وتوترات العضلات والأوتار',
      'كسور العظام',
      'إعادة التأهيل بعد الجراحة',
      'الشلل الدماغي والسكتة الدماغية'
    ]
  },
  {
    id: 'hip',
    name: 'جبائر الورك والحوض (Hip Orthoses)',
    image: 'https://www.orliman.com/wp-content/uploads/HO4001-1.jpg',
    description: 'تستخدم لدعم وتثبيت مفصل الورك والحوض، وتساعد في علاج خلع الورك الولادي واضطرابات الورك الأخرى.',
    types: [
      {
        name: 'وسادة Pavlik (Pavlik Harness)',
        description: 'تستخدم لعلاج خلع الورك الولادي لدى الأطفال الرضع، وتبقي مفصل الورك في وضعية صحيحة لتشجيع التطور الطبيعي.',
        features: ['مصنوعة من مواد ناعمة ومريحة', 'قابلة للتعديل مع نمو الطفل', 'يمكن ارتداؤها 23 ساعة يوميًا'],
        image: 'https://www.alimed.com/_resources/cache/images/product/51968_850x480-pad.jpg'
      },
      
      {
        name: 'جبيرة الورك المفصلية (Hip Abduction Orthosis)',
        description: 'تستخدم لمنع تقارب الوركين والحفاظ على وضعية تباعد مناسبة، خاصة بعد جراحات استبدال مفصل الورك.',
        features: ['تسمح بالجلوس والمشي مع الحفاظ على تباعد الوركين', 'قابلة للتعديل حسب درجة التباعد المطلوبة', 'مريحة للاستخدام اليومي'],
        image: 'https://www.alimed.com/_resources/cache/images/product/62975_850x480-pad.jpg'
      }
    ],
    indications: [
      'خلع الورك الولادي',
      'بعد جراحات استبدال مفصل الورك',
      'كسور عظم الفخذ',
      'آلام المفاصل العجزية الحرقفية',
      'عدم استقرار الحوض',
      'ألم العصب الوركي',
      'إعادة التأهيل بعد إصابات الورك'
    ]
  }
];

const compareData = [
  {
    feature: 'نوع الدعم',
    afo: 'دعم للكاحل والقدم فقط',
    kafo: 'دعم للركبة والكاحل والقدم',
    spinal: 'دعم للعمود الفقري',
    upper: 'دعم للأصابع والرسغ والكوع والكتف',
    hip: 'دعم للورك والحوض'
  },
  {
    feature: 'حالات الاستخدام',
    afo: 'ضعف عضلات القدم، الشلل الدماغي، السكتة الدماغية',
    kafo: 'ضعف عضلات الساق والفخذ، عدم استقرار الركبة، شلل الأطراف السفلية',
    spinal: 'الجنف، الحداب، كسور العمود الفقري، آلام الظهر',
    upper: 'إصابات الأعصاب، متلازمة النفق الرسغي، التهاب المفاصل',
    hip: 'خلع الورك الولادي، كسور الفخذ، آلام الحوض'
  },
  {
    feature: 'مستوى التثبيت',
    afo: 'متوسط',
    kafo: 'عالي',
    spinal: 'عالي جدًا',
    upper: 'متغير حسب المنطقة',
    hip: 'عالي جدًا'
  },
  {
    feature: 'الراحة',
    afo: 'عالية',
    kafo: 'متوسطة',
    spinal: 'متوسطة إلى منخفضة',
    upper: 'عالية نسبيًا',
    hip: 'منخفضة إلى متوسطة'
  },
  {
    feature: 'سهولة الاستخدام',
    afo: 'سهل',
    kafo: 'متوسط',
    spinal: 'صعب نسبيًا',
    upper: 'سهل إلى متوسط',
    hip: 'صعب'
  },
  {
    feature: 'الوزن',
    afo: 'خفيف',
    kafo: 'متوسط إلى ثقيل',
    spinal: 'متوسط إلى ثقيل',
    upper: 'خفيف',
    hip: 'ثقيل'
  },
  {
    feature: 'قابلية التعديل',
    afo: 'محدودة',
    kafo: 'متوسطة',
    spinal: 'عالية',
    upper: 'عالية جدًا',
    hip: 'متوسطة'
  }
];

const Orthoses = () => {
  useEffect(() => {
    document.documentElement.dir = 'rtl';
    document.body.classList.add('font-cairo');
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-b from-medical-100 to-white overflow-hidden">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-block py-2 px-6 bg-medical-200 text-medical-800 rounded-full text-sm font-semibold mb-4">
              <span>الجبائر الطبية</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              حلول متكاملة من الجبائر الطبية لجميع أجزاء الجسم
            </h1>
            <p className="text-xl text-gray-600 mb-8">
              نقدم مجموعة شاملة من الجبائر الطبية عالية الجودة المصممة خصيصًا لتلبية احتياجاتك.
              سواء كنت بحاجة إلى دعم للأصابع، الكاحل، الركبة، الظهر أو الورك، لدينا الحلول المناسبة.
            </p>
          </div>
          
          <motion.div 
            className="mt-12 relative max-w-5xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <img 
              src="/public/images/ortho.png" 
              alt="الجبائر الطبية" 
              className="w-full rounded-2xl shadow-2xl"
            />
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-tr from-medical-600/30 to-transparent"></div>
          </motion.div>
          
          <div className="mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
            {orthosesData.map((orthosis, index) => (
              <motion.div
                key={orthosis.id}
                className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow"
                whileHover={{ y: -5 }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
              >
                <Link to={`#${orthosis.id}`} className="block">
                  <div className="h-32 bg-gradient-to-r from-medical-200 to-medical-300 flex items-center justify-center">
                    {orthosis.id === 'afo' && <Activity className="h-12 w-12 text-medical-700" />}
                    {orthosis.id === 'kafo' && <PersonStanding className="h-12 w-12 text-medical-700" />}
                    {orthosis.id === 'spinal' && <Ruler className="h-12 w-12 text-medical-700" />}
                    {orthosis.id === 'upper-limb' && <Hand className="h-12 w-12 text-medical-700" />}
                    {orthosis.id === 'hip' && <Bandage className="h-12 w-12 text-medical-700" />}
                  </div>
                  <div className="p-4">
                    <h3 className="font-bold text-lg text-center text-medical-800">{orthosis.name}</h3>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Types of Orthoses */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900 mb-16">أنواع الجبائر الطبية</h2>
          
          <div className="grid grid-cols-1 gap-24 mt-12">
            {orthosesData.map((orthosis, index) => (
              <motion.div 
                key={orthosis.id}
                id={orthosis.id}
                className="flex flex-col md:flex-row items-center gap-8 scroll-mt-24"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <div className="md:w-2/5">
                  <div className="relative rounded-xl overflow-hidden shadow-xl">
                    <img 
                      src={orthosis.image} 
                      alt={orthosis.name} 
                      className="w-full aspect-video object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-tr from-medical-600/40 to-transparent"></div>
                    <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm text-medical-800 px-3 py-1 rounded-full text-sm font-semibold">
                      {orthosis.name.split('(')[0]}
                    </div>
                  </div>
                </div>
                
                <div className="md:w-3/5">
                  <h3 className="text-2xl md:text-3xl font-bold mb-4">{orthosis.name}</h3>
                  <p className="text-gray-600 mb-6 text-lg">{orthosis.description}</p>
                  
                  <Accordion type="single" collapsible className="mb-6">
                    <AccordionItem value="indications">
                      <AccordionTrigger className="text-lg font-semibold">
                        <Info className="h-5 w-5 mr-2 text-medical-600" />
                        دواعي الاستخدام
                      </AccordionTrigger>
                      <AccordionContent>
                        <ul className="list-disc list-inside space-y-1 text-gray-600">
                          {orthosis.indications.map((indication, idx) => (
                            <li key={idx}>{indication}</li>
                          ))}
                        </ul>
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>
                  
                  <Tabs defaultValue={orthosis.types[0].name} className="w-full">
                    <TabsList className="w-full grid grid-cols-2 lg:grid-cols-4 mb-4">
                      {orthosis.types.map((type, idx) => (
                        <TabsTrigger key={idx} value={type.name} className="text-xs md:text-sm">
                          {type.name.split('(')[0]}
                        </TabsTrigger>
                      ))}
                    </TabsList>
                    
                    {orthosis.types.map((type, idx) => (
                      <TabsContent key={idx} value={type.name}>
                        <div className="bg-gray-50 rounded-lg p-6">
                          <div className="flex flex-col md:flex-row gap-6">
                            <div className="md:w-1/3">
                              <img 
                                src={type.image} 
                                alt={type.name} 
                                className="w-full aspect-square object-cover rounded-lg shadow-md"
                              />
                            </div>
                            <div className="md:w-2/3">
                              <div className="flex justify-between items-center mb-2">
                                <h4 className="text-xl font-bold text-medical-800">{type.name}</h4>
                                {type.price && (
                                  <span className="bg-medical-100 text-medical-700 px-3 py-1 rounded-full text-sm font-bold shadow-sm">
                                    {type.price}
                                  </span>
                                )}
                              </div>
                              <p className="text-gray-600 mb-4">{type.description}</p>
                              <h5 className="font-semibold text-medical-700 mb-2">المميزات الرئيسية:</h5>
                              <ul className="space-y-1">
                                {type.features.map((feature, fIdx) => (
                                  <li key={fIdx} className="flex items-center">
                                    <span className="text-medical-500 mr-2">●</span>
                                    <span>{feature}</span>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          </div>
                        </div>
                      </TabsContent>
                    ))}
                  </Tabs>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Comparison Table */}
      <section className="py-20 bg-medical-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900 mb-12">مقارنة بين أنواع الجبائر المختلفة</h2>
          
          <div className="mt-12 overflow-x-auto">
            <Table className="w-full">
              <TableCaption>مقارنة شاملة بين أنواع الجبائر الطبية المختلفة لعام 2025</TableCaption>
              <TableHeader>
                <TableRow>
                  <TableHead className="text-right">الميزة</TableHead>
                  <TableHead className="text-right bg-medical-100">جبائر الكاحل والقدم (AFO)</TableHead>
                  <TableHead className="text-right bg-medical-100">جبائر الركبة والكاحل والقدم (KAFO)</TableHead>
                  <TableHead className="text-right bg-medical-100">جبائر العمود الفقري</TableHead>
                  <TableHead className="text-right bg-medical-100">جبائر الطرف العلوي</TableHead>
                  <TableHead className="text-right bg-medical-100">جبائر الورك والحوض</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {compareData.map((row, index) => (
                  <TableRow key={index} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                    <TableCell className="font-medium">{row.feature}</TableCell>
                    <TableCell>{row.afo}</TableCell>
                    <TableCell>{row.kafo}</TableCell>
                    <TableCell>{row.spinal}</TableCell>
                    <TableCell>{row.upper}</TableCell>
                    <TableCell>{row.hip}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
          
          <div className="mt-12 bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold mb-4 flex items-center">
              <Info className="h-5 w-5 mr-2 text-medical-600" />
              نصائح لاختيار الجبيرة المناسبة:
            </h3>
            <ul className="space-y-3 text-gray-700">
              <li className="flex items-start">
                <span className="inline-block bg-medical-100 text-medical-700 rounded-full h-6 w-6 flex items-center justify-center mr-2 flex-shrink-0">1</span>
                <span>استشر الأخصائي المختص لتحديد نوع الجبيرة المناسب لحالتك.</span>
              </li>
              <li className="flex items-start">
                <span className="inline-block bg-medical-100 text-medical-700 rounded-full h-6 w-6 flex items-center justify-center mr-2 flex-shrink-0">2</span>
                <span>تأكد من أن الجبيرة مصنوعة من مواد عالية الجودة ومناسبة لاحتياجاتك.</span>
              </li>
              <li className="flex items-start">
                <span className="inline-block bg-medical-100 text-medical-700 rounded-full h-6 w-6 flex items-center justify-center mr-2 flex-shrink-0">3</span>
                <span>اختر الجبيرة التي توفر التوازن المناسب بين الدعم والراحة.</span>
              </li>
              <li className="flex items-start">
                <span className="inline-block bg-medical-100 text-medical-700 rounded-full h-6 w-6 flex items-center justify-center mr-2 flex-shrink-0">4</span>
                <span>ضع في اعتبارك مستوى نشاطك اليومي عند اختيار الجبيرة.</span>
              </li>
              <li className="flex items-start">
                <span className="inline-block bg-medical-100 text-medical-700 rounded-full h-6 w-6 flex items-center justify-center mr-2 flex-shrink-0">5</span>
                <span>تأكد من تلقي التدريب المناسب على كيفية ارتداء وخلع الجبيرة بشكل صحيح.</span>
              </li>
              <li className="flex items-start">
                <span className="inline-block bg-medical-100 text-medical-700 rounded-full h-6 w-6 flex items-center justify-center mr-2 flex-shrink-0">6</span>
                <span>راقب الجلد تحت الجبيرة بانتظام للتأكد من عدم وجود تهيج أو احمرار.</span>
              </li>
              <li className="flex items-start">
                <span className="inline-block bg-medical-100 text-medical-700 rounded-full h-6 w-6 flex items-center justify-center mr-2 flex-shrink-0">7</span>
                <span>التزم بجدول الارتداء الموصى به من قبل الأخصائي لتحقيق أفضل النتائج.</span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900 mb-12">الأسئلة الشائعة</h2>
          
          <div className="mt-12 max-w-3xl mx-auto">
            <Accordion type="single" collapsible>
              <AccordionItem value="item-1">
                <AccordionTrigger>كيف يتم تحديد نوع الجبيرة المناسب لي؟</AccordionTrigger>
                <AccordionContent>
                  يتم تحديد نوع الجبيرة المناسب بعد تقييم شامل من قبل أخصائي العلاج الطبيعي أو أخصائي الأطراف الصناعية والجبائر. يأخذ هذا التقييم في الاعتبار حالتك الطبية، ومستوى النشاط، والاحتياجات اليومية، ونوع الدعم المطلوب.
                </AccordionContent>
              </AccordionItem>
              
              <AccordionItem value="item-2">
                <AccordionTrigger>هل الجبائر الطبية مصنوعة حسب الطلب؟</AccordionTrigger>
                <AccordionContent>
                  نعم، معظم الجبائر الطبية في  واصل-wasselا حسب الطلب لتناسب القياسات الدقيقة للمريض. نأخذ قياسات دقيقة ونستخدم تقنيات متطورة مثل المسح ثلاثي الأبعاد لضمان الملاءمة المثالية والراحة القصوى.
                </AccordionContent>
              </AccordionItem>
              
              <AccordionItem value="item-3">
                <AccordionTrigger>ما هي مدة ارتداء الجبيرة يوميًا؟</AccordionTrigger>
                <AccordionContent>
                  تختلف مدة ارتداء الجبيرة حسب الحالة والتوصيات الطبية. بعض الحالات قد تتطلب ارتداء الجبيرة طوال اليوم، بينما حالات أخرى قد تتطلب ارتداءها لفترات محددة فقط. سيقدم الأخصائي توجيهات محددة حول جدول الارتداء المناسب لحالتك.
                </AccordionContent>
              </AccordionItem>
              
              <AccordionItem value="item-4">
                <AccordionTrigger>كم تستغرق فترة التأقلم مع الجبيرة الجديدة؟</AccordionTrigger>
                <AccordionContent>
                  تختلف فترة التأقلم من شخص لآخر، ولكنها عادة ما تتراوح بين أسبوع إلى أربعة أسابيع. خلال هذه الفترة، قد تشعر ببعض الانزعاج أو عدم الراحة، لكن هذا أمر طبيعي. نقدم دعمًا ومتابعة مستمرة خلال فترة التأقلم لضمان تحقيق أفضل النتائج.
                </AccordionContent>
              </AccordionItem>
              
              <AccordionItem value="item-5">
                <AccordionTrigger>هل يمكن ارتداء الجبيرة أثناء النوم؟</AccordionTrigger>
                <AccordionContent>
                  يعتمد ذلك على نوع الجبيرة والغرض منها. بعض الجبائر مصممة خصيصًا للاستخدام أثناء النوم، مثل جبائر الرسغ لمتلازمة النفق الرسغي أو جبائر القدم الليلية. سيوضح لك الأخصائي ما إذا كانت الجبيرة يجب ارتداؤها أثناء النوم أم لا.
                </AccordionContent>
              </AccordionItem>
              
              <AccordionItem value="item-6">
                <AccordionTrigger>كيف أعتني بالجبيرة الطبية للحفاظ عليها؟</AccordionTrigger>
                <AccordionContent>
                  للحفاظ على الجبيرة في حالة جيدة، من المهم تنظيفها بانتظام باستخدام قطعة قماش مبللة وصابون خفيف، وتجنب غمرها في الماء. تأكد من تجفيفها جيدًا قبل ارتدائها مرة أخرى. تجنب تعريضها للحرارة المباشرة. سنقدم لك تعليمات مفصلة عن كيفية العناية بنوع الجبيرة المحدد الذي تستخدمه.
                </AccordionContent>
              </AccordionItem>
              
              <AccordionItem value="item-7">
                <AccordionTrigger>ما هو متوسط عمر الجبيرة الطبية؟</AccordionTrigger>
                <AccordionContent>
                  يختلف عمر الجبيرة حسب نوعها، ومستوى النشاط، وطريقة الاستخدام والعناية بها. بشكل عام، يمكن أن تدوم الجبائر من 6 أشهر إلى عدة سنوات. مع النمو (خاصة لدى الأطفال) أو التغيرات في الحالة، قد تحتاج إلى تعديل أو استبدال الجبيرة لضمان استمرار فعاليتها.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-medical-600 to-medical-800">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              احصل على استشارة مجانية اليوم
            </h2>
            <p className="text-medical-100 text-lg mb-8">
              فريقنا المتخصص مستعد لمساعدتك في اختيار الجبيرة المناسبة لاحتياجاتك. تواصل معنا للحصول على تقييم شامل وخطة علاج مخصصة.
            </p>
            <a href="https://wa.me/201119056895" target="_blank" rel="noopener noreferrer">
              <Button size="lg" className="bg-white text-medical-700 hover:bg-medical-50 px-6 py-6">
                تواصل معنا الآن
                <ArrowRight className="mr-2 h-5 w-5 rtl:rotate-180" />
              </Button>
            </a>
          </div>
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default Orthoses;
