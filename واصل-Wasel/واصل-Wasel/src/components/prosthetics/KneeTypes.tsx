
import React from 'react';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Activity } from 'lucide-react';

// أنواع الركب الصناعية
const kneeTypes = [
  {
    id: 'single-axis',
    name: 'الركبة أحادية المحور (Single-Axis Knee)',
    description: 'تصميم بسيط يسمح بحركة الثني والمد حول محور واحد فقط، مثل المفصل المفصلي البسيط.',
    features: [
      'تصميم بسيط ومتين',
      'سهولة الصيانة وانخفاض التكلفة',
      'مناسبة للمستخدمين ذوي المستوى النشاط المنخفض',
      'وزن خفيف نسبياً'
    ],
    limitations: [
      'عدم الاستقرار على الأسطح غير المستوية',
      'لا تتكيف مع تغير سرعة المشي',
      'تتطلب جهداً أكبر للتحكم بها',
      'خطر التعثر عند وضع الوزن على الركبة بشكل خاطئ'
    ],
    activityLevel: 'منخفض إلى متوسط (K1-K2)',
    price: 'تبدأ من 8,000 ج.م',
    image: 'https://4.imimg.com/data4/PJ/HE/MY-23855591/single-axis-knee-1000x1000.jpg'
  },
  {
    id: 'polycentric',
    name: 'الركبة متعددة المحاور (Polycentric Knee)',
    description: 'تستخدم نظام رابط متعدد المحاور (4-6 محاور) لتحسين الاستقرار والتحكم. تتحرك في نمط أكثر تعقيداً وتوفر استقراراً أفضل.',
    features: [
      'استقرار أفضل عند وضع الوزن على الطرف',
      'خفض ارتفاع الركبة أثناء الجلوس والمشي',
      'تناسب حالات البتر القصير للفخذ',
      'تقليل خطر التعثر والسقوط'
    ],
    limitations: [
      'أثقل وزناً من الركبة أحادية المحور',
      'تصميم أكثر تعقيداً يتطلب صيانة دورية',
      'قد لا تكون مناسبة للأنشطة عالية التأثير',
      'حجم أكبر مقارنة بالأنواع الأخرى'
    ],
    activityLevel: 'متوسط (K2-K3)',
    price: 'تبدأ من 15,000 ج.م',
    image: 'https://e-lifebracing.com/files/product/300.jpg'
  },
  {
    id: 'pneumatic',
    name: 'الركبة الهوائية (Pneumatic Knee)',
    description: 'تستخدم نظاماً هوائياً للتحكم في حركة الركبة، مما يسمح بحركة سلسة وأكثر طبيعية خاصة أثناء مرحلة التأرجح من المشي.',
    features: [
      'تحكم أفضل في سرعة المشي',
      'حركة أكثر سلاسة وطبيعية',
      'مقاومة قابلة للتعديل حسب احتياجات المستخدم',
      'أداء جيد للمشي بسرعات مختلفة'
    ],
    limitations: [
      'تتطلب صيانة دورية للنظام الهوائي',
      'قد تتأثر بالتغيرات في درجات الحرارة والارتفاع',
      'أثقل وزناً من الركبة الميكانيكية البسيطة',
      'تكلفة أعلى'
    ],
    activityLevel: 'متوسط إلى عالٍ (K3)',
    price: 'تبدأ من 25,000 ج.م',
    image: 'https://i.pinimg.com/736x/87/7a/c0/877ac0421b73f936a3faa624cd0acb49.jpg'
  },
  {
    id: 'hydraulic',
    name: 'الركبة الهيدروليكية (Hydraulic Knee)',
    description: 'تستخدم سوائل هيدروليكية للتحكم في المقاومة أثناء الحركة، مما يوفر تحكماً دقيقاً في سرعة وثبات الحركة.',
    features: [
      'تحكم دقيق في حركة المشي بسرعات مختلفة',
      'تكيف تلقائي مع إيقاع المشي',
      'استجابة أفضل على الأسطح المنحدرة',
      'استقرار وأمان أكبر أثناء المشي'
    ],
    limitations: [
      'وزن أثقل من الأنظمة الميكانيكية والهوائية',
      'تكلفة أعلى وصيانة دورية مطلوبة',
      'قد تتسرب السوائل الهيدروليكية في بعض الحالات',
      'قد تتأثر بالتغيرات الشديدة في درجات الحرارة'
    ],
    activityLevel: 'متوسط إلى عالٍ (K3-K4)',
    price: 'تبدأ من 40,000 ج.م',
    image: 'https://bldtecomukprod.dfs.core.windows.net/media/wrpnj2zs/kx07-patient-walking.jpg?width=430&height=364&mode=max'
  },
  {
    id: 'microprocessor',
    name: 'الركبة المحوسبة (Microprocessor Knee)',
    description: 'مزودة بمعالجات دقيقة ومستشعرات تستشعر وتتكيف مع سرعة المشي والتضاريس المختلفة، مما يوفر استجابة ديناميكية وحركة أكثر طبيعية.',
    features: [
      'تكيف ذكي مع مختلف أنماط المشي والتضاريس',
      'استقرار متفوق على الأسطح غير المستوية',
      'تقليل خطر السقوط بشكل كبير',
      'أنماط مشي متعددة (درج، منحدرات، عكس المشي)',
      'وضعيات مخصصة للأنشطة المختلفة مثل الجري أو ركوب الدراجات'
    ],
    limitations: [
      'تكلفة عالية جداً',
      'تحتاج لشحن البطارية بشكل دوري',
      'وزن أثقل من بعض الأنواع الأخرى',
      'حساسة للماء والغبار في بعض الموديلات',
      'تتطلب صيانة دورية متخصصة'
    ],
    activityLevel: 'عالٍ جداً (K3-K4)',
    price: 'تبدأ من 140,000 ج.م',
    image: 'https://bldtecomukprod.dfs.core.windows.net/media/vmgp1qgh/orion3-with-wheelbarrow.png?width=693&height=634&mode=max'
  }
];

const KneeTypes: React.FC = () => {
  return (
    <section id="knee-types" className="py-16 bg-gradient-to-l from-gray-50 to-white">
      <div className="container mx-auto px-4">
        <div className="flex items-center gap-2 mb-8">
          <Activity className="h-8 w-8 text-medical-600" />
          <h2 className="text-3xl font-bold text-gray-900">أنواع الركب الصناعية</h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
          {kneeTypes.map((knee) => (
            <Card key={knee.id} className="overflow-hidden hover:shadow-lg transition-shadow duration-300">
              <div className="h-48 overflow-hidden">
                <img 
                  src={knee.image} 
                  alt={knee.name} 
                  className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                />
              </div>
              <CardHeader>
                <div className="flex justify-between items-start mb-2">
                  <CardTitle className="text-xl">{knee.name}</CardTitle>
                  <span className="bg-medical-100 text-medical-800 text-sm font-bold px-3 py-1 rounded-full whitespace-nowrap">
                    {knee.price}
                  </span>
                </div>
                <CardDescription className="text-base">{knee.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="mb-4">
                  <h4 className="font-semibold text-medical-700 mb-2">المميزات:</h4>
                  <ul className="list-disc list-inside space-y-1 mr-4">
                    {knee.features.map((feature, index) => (
                      <li key={index} className="text-gray-600">{feature}</li>
                    ))}
                  </ul>
                </div>
                
                <div className="mb-4">
                  <h4 className="font-semibold text-medical-700 mb-2">التحديات والقيود:</h4>
                  <ul className="list-disc list-inside space-y-1 mr-4">
                    {knee.limitations.map((limitation, index) => (
                      <li key={index} className="text-gray-600">{limitation}</li>
                    ))}
                  </ul>
                </div>
                
                <div className="mt-4 bg-gray-50 p-3 rounded-md">
                  <h4 className="font-semibold text-medical-700">مستوى النشاط المناسب:</h4>
                  <p className="text-gray-700">{knee.activityLevel}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default KneeTypes;
