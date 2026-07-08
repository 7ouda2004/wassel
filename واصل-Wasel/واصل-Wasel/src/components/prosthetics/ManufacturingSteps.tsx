
import React from 'react';
import { 
  Card, 
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from "@/components/ui/card";
import { BarChart, Award } from 'lucide-react';

// مراحل تصنيع الطرف الصناعي
const manufacturingSteps = [
  {
    step: 'التقييم والتخطيط',
    description: 'يتم تقييم حالة المريض وتحديد النوع المناسب من الطرف الصناعي بناءً على احتياجاته وقدراته وأهدافه.',
    details: [
      'فحص شامل للطرف المتبقي وصحته',
      'تقييم مستوى النشاط ونمط الحياة',
      'مناقشة التوقعات والأهداف مع المريض',
      'تحديد المكونات المناسبة من الركبة والقدم وغيرها'
    ],
    image: 'https://members.physio-pedia.com/wp-content/uploads/2020/02/amputee-3.jpg'
  },
  {
    step: 'تصميم وتصنيع السوكيت',
    description: 'تصميم وتصنيع السوكيت حسب قياسات الطرف المتبقي للمريض.',
    details: [
      'أخذ قياسات دقيقة للطرف المتبقي',
      'إنشاء نموذج أولي للسوكيت',
      'تصنيع السوكيت من المواد المناسبة',
      'تجربة وتعديل السوكيت للوصول للملاءمة المثالية'
    ],
    image: 'https://www.orfit.com/app/uploads/Applying-acrylic-varnish.jpg'
  },
  {
    step: 'اختيار وتركيب المكونات',
    description: 'اختيار المكونات المناسبة مثل الركبة والقدم والمحاذاة والأجزاء الأخرى وتجميعها مع السوكيت.',
    details: [
      'اختيار نوع الركبة المناسب حسب مستوى النشاط',
      'اختيار القدم الصناعية المناسبة',
      'تحديد نظام التعليق المناسب',
      'تجميع المكونات وتثبيتها بالسوكيت'
    ],
    image: 'https://content.instructables.com/FQE/DLKV/HTX5JT42/FQEDLKVHTX5JT42.jpg?auto=webp&frame=1&width=900&height=1024&fit=bounds&md=MjAxNC0wNC0xMiAxMzoxMToxMi4w'
  },
  {
    step: 'المحاذاة والضبط الأولي',
    description: 'ضبط محاذاة الطرف الصناعي لتحقيق التوازن والاستقرار أثناء الوقوف والمشي.',
    details: [
      'ضبط المحاذاة الأمامية والخلفية',
      'ضبط المحاذاة الجانبية',
      'تعديل ارتفاع الطرف',
      'ضبط زوايا الانثناء والدوران'
    ],
    image: 'https://cdn.prod.website-files.com/620223123d75ce5495043bfa/667bd5fc802c815e134113ef_stages-of-prosthetic-fitting-steps-to-getting-a-prosthesis.webp'
  },
  {
    step: 'التجربة والتدريب',
    description: 'تدريب المريض على استخدام الطرف الصناعي الجديد وإجراء التعديلات النهائية لتحسين الأداء والراحة.',
    details: [
      'تدريب على المشي والتوازن',
      'تدريب على الجلوس والوقوف',
      'تدريب على صعود الدرج والمنحدرات',
      'تعليم العناية بالطرف والسوكيت'
    ],
    image: 'https://isbrave.com/wp-content/uploads/2024/03/orthopedic-technician-adjusting-a-patients-socket-and-above-the-knee-amputation-knee-and-leg.jpg'
  },
  {
    step: 'المتابعة والتعديلات',
    description: 'جلسات متابعة منتظمة لتقييم أداء الطرف الصناعي وإجراء أي تعديلات ضرورية مع مرور الوقت.',
    details: [
      'متابعة حالة الطرف المتبقي',
      'تعديل السوكيت عند الحاجة',
      'تقييم وصيانة المكونات',
      'استبدال الأجزاء المستهلكة',
      'تحديث الطرف مع تغير احتياجات المريض'
    ],
    image: 'https://isbrave.com/wp-content/uploads/2024/03/inspecting-a-below-knee-socket-prosthesis.jpg'
  }
];

const ManufacturingSteps: React.FC = () => {
  return (
    <section id="manufacturing-steps" className="py-16 bg-gradient-to-r from-gray-50 to-white">
      <div className="container mx-auto px-4">
        <div className="flex items-center gap-2 mb-8">
          <BarChart className="h-8 w-8 text-medical-600" />
          <h2 className="text-3xl font-bold text-gray-900">مراحل تصنيع الطرف الصناعي</h2>
        </div>
        
        <div className="relative">
          {/* Vertical timeline line */}
          <div className="hidden md:block absolute top-0 bottom-0 left-1/2 w-1 bg-medical-100 transform -translate-x-1/2"></div>
          
          <div className="space-y-20">
            {manufacturingSteps.map((step, index) => (
              <div key={index} className={`relative flex flex-col md:flex-row items-center ${index % 2 === 0 ? 'md:flex-row-reverse' : ''}`}>
                <div className="md:w-1/2 flex flex-col md:px-12 order-2 md:order-none">
                  <div className="bg-white p-6 rounded-lg shadow-md border border-gray-50">
                    <h3 className="text-2xl font-bold text-medical-700 mb-3">{step.step}</h3>
                    <p className="text-lg text-gray-700 mb-4">{step.description}</p>
                    <ul className="list-disc list-inside space-y-2 mr-4">
                      {step.details.map((detail, idx) => (
                        <li key={idx} className="text-gray-600">{detail}</li>
                      ))}
                    </ul>
                  </div>
                </div>
                
                <div className="md:w-1/2 mb-6 md:mb-0 order-1 md:order-none">
                  {/* Timeline dot */}
                  <div className="hidden md:flex absolute left-1/2 transform -translate-x-1/2 -translate-y-1/2 items-center justify-center">
                    <div className="w-10 h-10 rounded-full bg-medical-500 flex items-center justify-center shadow-lg">
                      <span className="text-white font-bold">{index + 1}</span>
                    </div>
                  </div>
                  
                  <div className={`rounded-lg overflow-hidden shadow-md ${index % 2 === 0 ? 'md:mr-12' : 'md:ml-12'}`}>
                    <img 
                      src={step.image} 
                      alt={step.step} 
                      className="w-full h-64 object-cover hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        <div className="mt-20 bg-medical-50 p-8 rounded-lg text-center">
          <div className="flex justify-center mb-4">
            <Award className="h-10 w-10 text-medical-600" />
          </div>
          <h3 className="text-2xl font-bold text-medical-700 mb-3">التأهيل المستمر</h3>
          <p className="text-lg text-gray-700 max-w-3xl mx-auto">
            يستمر تطوير وتحسين الأطراف الصناعية مع التقدم التكنولوجي والبحث العلمي، مما يوفر خيارات أفضل وأكثر طبيعية للمرضى. تلعب المتابعة المستمرة والتأهيل دوراً أساسياً في نجاح استخدام الطرف الصناعي على المدى الطويل.
          </p>
        </div>
      </div>
    </section>
  );
};

export default ManufacturingSteps;
