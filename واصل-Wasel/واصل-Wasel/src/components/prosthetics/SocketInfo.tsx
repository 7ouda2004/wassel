
import React from 'react';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Bandage } from 'lucide-react';

// معلومات السوكيت
const socketInfo = {
  description: 'السوكيت هو الجزء الأهم من الطرف الصناعي، فهو يربط الطرف المتبقي بالطرف الصناعي ويوزع وزن الجسم ويسمح بنقل الحركة.',
  types: [
    {
      name: 'السوكيت التقليدي (Conventional Socket)',
      description: 'تصميم يعتمد على الضغط على نقاط تحمل محددة في الطرف المتبقي، مع تخفيف الضغط عن المناطق الحساسة.',
      features: [
        'يناسب معظم حالات البتر البسيطة',
        'تكلفة معقولة مقارنة بالأنواع الأخرى',
        'يتطلب استخدام جوارب لضبط الحجم'
      ],
      image: 'https://martinbionics.com/wp-content/uploads/2021/01/jumprope.gif'
    },
    {
      name: 'سوكيت الضغط الكلي (Total Surface Bearing - TSB)',
      description: 'يوزع الضغط على كامل سطح الطرف المتبقي بالتساوي، مما يقلل من نقاط الضغط العالي ويحسن الراحة.',
      features: [
        'توزيع متساوٍ للضغط',
        'تحكم أفضل في الطرف الصناعي',
        'يتطلب بطانة سيليكون أو بولييورثين',
        'مناسب للمستخدمين النشطين'
      ],
      image: 'https://o.quizlet.com/.yPczd21qzuZBW4ID7hPvA.jpg'
    },
    {
      name: 'سوكيت التعليق بالفراغ (Vacuum Suspension Socket)',
      description: 'يستخدم ضغطاً سلبياً (فراغ) لتعليق الطرف الصناعي، مما يوفر اتصالاً أفضل ويقلل الحركة داخل السوكيت.',
      features: [
        'تقليل الحركة والاحتكاك داخل السوكيت',
        'تحسين الدورة الدموية في الطرف المتبقي',
        'تقليل التورم',
        'تحكم أفضل في الطرف الصناعي'
      ],
      image: 'https://andersonprosthetics.com/wp-content/uploads/2016/11/ossurunity.png'
    },
    {
      name: 'سوكيت الحقن المباشر (Osseointegration)',
      description: 'تقنية متقدمة تتضمن زرع عمود معدني في عظم الطرف المتبقي، والذي يتصل مباشرة بالطرف الصناعي بدون الحاجة لسوكيت تقليدي.',
      features: [
        'تحكم فائق في الطرف الصناعي',
        'إحساس أفضل بالأرض والحركة (proprioception)',
        'تخلص من مشاكل السوكيت التقليدي مثل الاحتكاك والتعرق',
        'مناسب للحالات التي تعاني من مشاكل في الجلد أو شكل الطرف المتبقي'
      ],
      image: 'https://media.springernature.com/lw685/springer-static/image/art%3A10.1007%2Fs00256-023-04524-z/MediaObjects/256_2023_4524_Fig4_HTML.png'
    }
  ],
  manufacturing: [
    {
      step: 'أخذ القياسات',
      description: 'يتم أخذ قياسات دقيقة للطرف المتبقي باستخدام أساليب مختلفة مثل القياس اليدوي، الجبس، أو المسح ثلاثي الأبعاد.',
      details: 'يقوم الأخصائي بأخذ قياسات محيط الطرف على مستويات مختلفة، وتحديد النقاط العظمية والمناطق الحساسة. تساعد هذه القياسات في إنشاء نموذج دقيق للطرف المتبقي.',
      image: 'https://cdn.prod.website-files.com/61fd1a8c835a084cd90fb602/6357f9abe2891f0e75be7cca_Our%20Process%20(1).avif'
    },
    {
      step: 'إنشاء النموذج الأولي',
      description: 'يتم إنشاء نموذج أولي للسوكيت باستخدام القياسات، إما بطريقة يدوية باستخدام الجبس أو بواسطة التصميم بالحاسوب والتصنيع (CAD/CAM).',
      details: 'في التقنيات الحديثة، يتم مسح الطرف المتبقي رقمياً وإنشاء نموذج ثلاثي الأبعاد يمكن تعديله رقمياً لتحسين الملاءمة والأداء.',
      image: 'https://www.orfit.com/app/uploads/Tubular-stockinette.jpg'
    },
    {
      step: 'تصنيع السوكيت',
      description: 'يتم تصنيع السوكيت النهائي من مواد مثل البلاستيك الحراري، الألياف الكربونية، أو مواد أخرى حسب احتياجات المستخدم.',
      details: 'يتم تشكيل المادة على النموذج باستخدام التفريغ الهوائي والحرارة، مما يضمن مطابقة دقيقة للطرف المتبقي. في بعض الحالات، يمكن استخدام الطباعة ثلاثية الأبعاد لإنتاج السوكيت.',
      image: 'https://www.orfit.com/app/uploads/Moulding-a-prosthetic-socket-3.jpg'
    },
    {
      step: 'التجربة والتعديل',
      description: 'يتم تجربة السوكيت على المريض وإجراء التعديلات اللازمة لضمان الراحة والملاءمة المثالية.',
      details: 'خلال هذه المرحلة، يقوم الأخصائي بتقييم توزيع الضغط، ملاءمة السوكيت، وقدرة المريض على التحكم بالطرف الصناعي. قد تكون هناك حاجة لعدة جلسات تعديل للوصول إلى السوكيت النهائي المثالي.',
      image: 'https://cdn.prod.website-files.com/620223123d75ce5495043bfa/66ab5a8fbd93b8bfa347fa05_667beb02fbd0af3cc8f60720_your-journey-to-a-new-normal-with-a-prosthesis.webp'
    }
  ]
};

const SocketInfo: React.FC = () => {
  return (
    <section id="socket-info" className="py-16 bg-gradient-to-l from-gray-50 to-white">
      <div className="container mx-auto px-4">
        <div className="flex items-center gap-2 mb-8">
          <Bandage className="h-8 w-8 text-medical-600" />
          <h2 className="text-3xl font-bold text-gray-900">السوكيت - نقطة الاتصال بين المريض والطرف الصناعي</h2>
        </div>
        
        <div className="bg-white rounded-lg shadow-md p-6 mb-10">
          <p className="text-lg text-gray-700 leading-relaxed">{socketInfo.description}</p>
        </div>
        
        <Tabs defaultValue="types" className="w-full">
          <TabsList className="w-full flex justify-center mb-8">
            <TabsTrigger value="types" className="text-lg px-6">أنواع السوكيت</TabsTrigger>
            <TabsTrigger value="manufacturing" className="text-lg px-6">مراحل تصنيع السوكيت</TabsTrigger>
          </TabsList>
          
          <TabsContent value="types" className="mt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {socketInfo.types.map((type, index) => (
                <Card key={index} className="overflow-hidden border-2 border-gray-100 hover:border-medical-200 transition-all duration-300">
                  <div className="h-56 overflow-hidden">
                    <img 
                      src={type.image} 
                      alt={type.name} 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <CardHeader>
                    <CardTitle className="text-xl text-medical-800">{type.name}</CardTitle>
                    <CardDescription className="text-base">{type.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <h4 className="font-semibold text-medical-700 mb-3">الخصائص:</h4>
                    <ul className="list-disc list-inside space-y-2 mr-4">
                      {type.features.map((feature, idx) => (
                        <li key={idx} className="text-gray-600">{feature}</li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="manufacturing" className="mt-6">
            <div className="space-y-12">
              {socketInfo.manufacturing.map((step, index) => (
                <div key={index} className="flex flex-col md:flex-row gap-8 items-center">
                  <div className="md:w-1/3 overflow-hidden rounded-lg">
                    <img 
                      src={step.image} 
                      alt={step.step} 
                      className="w-full h-64 object-cover hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  <div className="md:w-2/3">
                    <h3 className="text-2xl font-bold text-medical-800 mb-3">
                      <span className="inline-block bg-medical-100 text-medical-700 rounded-full w-8 h-8 text-center mr-2">
                        {index + 1}
                      </span>
                      {step.step}
                    </h3>
                    <p className="text-lg font-medium text-gray-700 mb-3">{step.description}</p>
                    <p className="text-gray-600 leading-relaxed">{step.details}</p>
                  </div>
                </div>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </section>
  );
};

export default SocketInfo;
