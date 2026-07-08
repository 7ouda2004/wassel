
import React from 'react';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Ruler } from 'lucide-react';

// أنواع الأقدام الصناعية
const footTypes = [
  {
    id: 'sach',
    name: 'قدم SACH (Solid Ankle Cushion Heel)',
    description: 'تصميم بسيط بدون مفاصل متحركة، يوفر استقراراً جيداً مع وسادة في الكعب لامتصاص الصدمات.',
    features: [
      'تصميم بسيط ومتين',
      'خفيفة الوزن وقليلة الصيانة',
      'كعب مرن يمتص الصدمات عند ملامسة الأرض',
      'تكلفة معقولة ومناسبة للاستخدام اليومي البسيط'
    ],
    limitations: [
      'حركة محدودة وأقل مرونة',
      'أداء ضعيف على الأسطح غير المستوية',
      'غير مناسبة للأنشطة عالية التأثير',
      'لا تسمح بحركة الكاحل'
    ],
    activityLevel: 'منخفض (K1-K2)',
    price: 'تبدأ من 5,000 ج.م',
    image: 'https://www.limbs4life.org.au/uploads/prosthetics-directory/_a_prosListingImage/OPC-Seattle-Natural-SACH-K1.jpeg'
  },
  {
    id: 'elastic-keel',
    name: 'القدم المرنة (Elastic Keel)',
    description: 'توفر مرونة أكبر من قدم SACH، مع تصميم يسمح بالانثناء الخفيف أثناء المشي، مما يعطي حركة أكثر طبيعية.',
    features: [
      'مرونة أفضل أثناء دورة المشي',
      'تحمل الوزن بشكل أكثر تدريجياً',
      'متانة جيدة مع صيانة قليلة',
      'مناسبة للمشي اليومي على أسطح مختلفة'
    ],
    limitations: [
      'لا تزال محدودة في التكيف مع التضاريس الوعرة',
      'أقل فعالية للأنشطة عالية التأثير',
      'مدى حركة محدود مقارنة بالأقدام المتطورة'
    ],
    activityLevel: 'منخفض إلى متوسط (K2)',
    price: 'تبدأ من 8,000 ج.م',
    image: 'https://www.researchgate.net/profile/T-M-Balaramakrishnan/publication/351123700/figure/fig2/AS:11431281102383771@1669450405285/Representation-of-a-passive-prosthetic-foot-with-an-elastic-keel-and-a-cosmetic-foam.jpg'
  },
  {
    id: 'multi-axial',
    name: 'القدم متعددة المحاور (Multi-axial Foot)',
    description: 'تسمح بالحركة في عدة اتجاهات (تدوير، انثناء جانبي)، مما يساعد على التكيف مع الأسطح غير المستوية والتضاريس المختلفة.',
    features: [
      'تكيف ممتاز مع الأسطح غير المستوية',
      'تقليل الإجهاد على السوكيت والمفاصل',
      'حركة جانبية تحاكي القدم الطبيعية',
      'مناسبة للمشي والوقوف لفترات طويلة'
    ],
    limitations: [
      'أثقل وزناً من الأنواع البسيطة',
      'تصميم أكثر تعقيداً يتطلب صيانة أكثر',
      'قد لا توفر نفس مستوى استعادة الطاقة كالأقدام الديناميكية'
    ],
    activityLevel: 'متوسط (K2-K3)',
    price: 'تبدأ من 15,000 ج.م',
    image: 'https://static.wixstatic.com/media/64980d_16d0fa3f4a4140f0a262b8c7e476ed89~mv2.png/v1/fill/w_560,h_318,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/F90%202022.png'
  },
  {
    id: 'dynamic-response',
    name: 'القدم الديناميكية (Dynamic-Response Feet)',
    description: 'مصممة لتخزين الطاقة وإعادتها أثناء المشي، مما يساعد في الأنشطة عالية المستوى. تصنع عادة من مواد مرنة كالألياف الكربونية.',
    features: [
      'تخزين وإطلاق الطاقة أثناء دورة المشي',
      'خفيفة الوزن وعالية المتانة',
      'دفع إيجابي يساعد في المشي والجري',
      'مناسبة للأنشطة الرياضية والنشطة'
    ],
    limitations: [
      'تكلفة أعلى من الأنواع الأساسية',
      'قد تكون أقل استقراراً للمستخدمين الأقل نشاطاً',
      'قد تتطلب تقنية مشي محددة للاستفادة القصوى منها'
    ],
    activityLevel: 'عالٍ (K3-K4)',
    price: 'تبدأ من 30,000 ج.م',
    image: 'https://media.easyliner.eu/easyliner/uploads/2022/09/BioStep_EVO_left-1024x683.png'
  },
  {
    id: 'microprocessor',
    name: 'القدم المحوسبة (Microprocessor Feet)',
    description: 'أحدث تقنية في الأقدام الصناعية، تستخدم معالجات دقيقة ومستشعرات لتعديل استجابة القدم حسب التضاريس والنشاط.',
    features: [
      'تكيف ذكي مع مختلف التضاريس والأنشطة',
      'تعديل ديناميكي للصلابة والمقاومة',
      'استقرار متفوق على المنحدرات والدرج',
      'حركة طبيعية جداً تقلل الإجهاد على باقي الجسم',
      'دعم متقدم للأنشطة المتنوعة'
    ],
    limitations: [
      'تكلفة عالية جداً',
      'تحتاج لشحن دوري للبطارية',
      'وزن أثقل من بعض الأنواع الأخرى',
      'حساسة للماء والغبار في بعض الموديلات',
      'تتطلب صيانة متخصصة'
    ],
    activityLevel: 'عالٍ جداً (K3-K4)',
    price: 'تبدأ من 75,000 ج.م',
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTci-aDC19Gj4pLxplyNTBXpq9XWbEoyBfTnJCBoNFOD8bbJqKH4eq1M8tSSUrqFpVRy9w&usqp=CAU'
  }
];

const FootTypes: React.FC = () => {
  return (
    <section id="foot-types" className="py-16 bg-gradient-to-r from-gray-50 to-white">
      <div className="container mx-auto px-4">
        <div className="flex items-center gap-2 mb-8">
          <Ruler className="h-8 w-8 text-medical-600" />
          <h2 className="text-3xl font-bold text-gray-900">أنواع الأقدام الصناعية</h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
          {footTypes.map((foot) => (
            <Card key={foot.id} className="overflow-hidden hover:shadow-lg transition-shadow duration-300">
              <div className="h-48 overflow-hidden">
                <img 
                  src={foot.image} 
                  alt={foot.name} 
                  className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                />
              </div>
              <CardHeader>
                <div className="flex justify-between items-start mb-2">
                  <CardTitle className="text-xl">{foot.name}</CardTitle>
                  <span className="bg-medical-100 text-medical-800 text-sm font-bold px-3 py-1 rounded-full whitespace-nowrap">
                    {foot.price}
                  </span>
                </div>
                <CardDescription className="text-base">{foot.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="mb-4">
                  <h4 className="font-semibold text-medical-700 mb-2">المميزات:</h4>
                  <ul className="list-disc list-inside space-y-1 mr-4">
                    {foot.features.map((feature, index) => (
                      <li key={index} className="text-gray-600">{feature}</li>
                    ))}
                  </ul>
                </div>
                
                <div className="mb-4">
                  <h4 className="font-semibold text-medical-700 mb-2">التحديات والقيود:</h4>
                  <ul className="list-disc list-inside space-y-1 mr-4">
                    {foot.limitations.map((limitation, index) => (
                      <li key={index} className="text-gray-600">{limitation}</li>
                    ))}
                  </ul>
                </div>
                
                <div className="mt-4 bg-gray-50 p-3 rounded-md">
                  <h4 className="font-semibold text-medical-700">مستوى النشاط المناسب:</h4>
                  <p className="text-gray-700">{foot.activityLevel}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FootTypes;
