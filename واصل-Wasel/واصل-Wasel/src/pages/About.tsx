
import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Medal, Book, Award, Heart, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const About = () => {
  useEffect(() => {
    document.documentElement.dir = 'rtl';
    document.body.classList.add('font-cairo');
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-b from-medical-100 to-white overflow-hidden">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-block oval-header">
              <span>عن التطبيق</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              قصتنا ورسالتنا
            </h1>
            <p className="text-xl text-gray-600 mb-8">
               واصل-wassel، نسعى لتقديم أفضل الحلول الطبية في مجال الجبائر والأطراف الصناعية،
              مع التركيز على جودة الحياة والاستقلالية لعملائنا.
            </p>
          </div>
          
          <motion.div 
            className="mt-12 relative max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <img 
              src="/images/new.png" 
              alt="فريق عمل أورثو إيد برو" 
              className="w-full rounded-2xl shadow-2xl"
            />
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-tr from-medical-600/30 to-transparent"></div>
          </motion.div>
        </div>
      </section>

      {/* About Content */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="mb-16">
              <h2 className="text-3xl font-bold mb-6">من نحن</h2>
              <p className="text-lg text-gray-600 mb-4">
                 واصل-wassel هي مؤسسة متخصصة في مجال الجبائر الطبية والأطراف الصناعية، تأسست على يد 
                <strong> محمود إبراهيم</strong>، أخصائي الأطراف الصناعية والأجهزة التقويمية المتخصص.
              </p>
              <p className="text-lg text-gray-600 mb-4">
                تخرج محمود من جامعة القاهرة الجديدة التكنولوجية، وامتلك خبرة واسعة في مجال الأطراف الصناعية 
                والجبائر الطبية. بدأ مسيرته المهنية بشغف لمساعدة الأشخاص على استعادة حريتهم وحركتهم 
                من خلال تقديم أفضل الحلول المخصصة لكل حالة.
              </p>
              <p className="text-lg text-gray-600">
                نحن فريق متكامل من الأخصائيين والفنيين المدربين على أعلى مستوى، نعمل معًا لتوفير 
                خدمة استثنائية ومنتجات ذات جودة عالية تلبي احتياجات عملائنا وتتجاوز توقعاتهم.
              </p>
            </div>
            
            <div className="mb-16">
              <h2 className="text-3xl font-bold mb-6">رؤيتنا</h2>
              <div className="flex items-start space-x-4 rtl:space-x-reverse mb-6">
                <div className="h-12 w-12 rounded-full bg-medical-100 flex items-center justify-center flex-shrink-0">
                  <Medal className="h-6 w-6 text-medical-600" />
                </div>
                <div>
                  <p className="text-lg text-gray-600">
                    نسعى لأن نكون الرواد في مجال الجبائر الطبية والأطراف الصناعية في مصر والشرق الأوسط، 
                    من خلال تقديم حلول مبتكرة وعالية الجودة تمكّن الأشخاص من عيش حياة نشطة ومستقلة دون قيود.
                  </p>
                </div>
              </div>
            </div>
            
            <div className="mb-16">
              <h2 className="text-3xl font-bold mb-6">رسالتنا</h2>
              <div className="flex items-start space-x-4 rtl:space-x-reverse mb-6">
                <div className="h-12 w-12 rounded-full bg-medical-100 flex items-center justify-center flex-shrink-0">
                  <Book className="h-6 w-6 text-medical-600" />
                </div>
                <div>
                  <p className="text-lg text-gray-600">
                    مهمتنا هي تحسين نوعية حياة الأشخاص من خلال توفير حلول مخصصة عالية الجودة في مجال 
                    الجبائر الطبية والأطراف الصناعية، مع تقديم خدمة متميزة ودعم مستمر لعملائنا.
                  </p>
                </div>
              </div>
            </div>
            
            <div className="mb-16">
              <h2 className="text-3xl font-bold mb-6">قيمنا</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="bg-medical-50 rounded-lg p-6">
                  <div className="flex items-center mb-4">
                    <div className="h-10 w-10 rounded-full bg-medical-100 flex items-center justify-center mr-3">
                      <Award className="h-5 w-5 text-medical-600" />
                    </div>
                    <h3 className="text-xl font-semibold">الجودة والتميز</h3>
                  </div>
                  <p className="text-gray-600">
                    نلتزم بتقديم أفضل المنتجات والخدمات التي تلبي أعلى معايير الجودة العالمية.
                  </p>
                </div>
                
                <div className="bg-medical-50 rounded-lg p-6">
                  <div className="flex items-center mb-4">
                    <div className="h-10 w-10 rounded-full bg-medical-100 flex items-center justify-center mr-3">
                      <Heart className="h-5 w-5 text-medical-600" />
                    </div>
                    <h3 className="text-xl font-semibold">الاهتمام بالعميل</h3>
                  </div>
                  <p className="text-gray-600">
                    نضع احتياجات عملائنا في مقدمة أولوياتنا، ونسعى دائمًا لتوفير حلول مخصصة تناسب كل حالة.
                  </p>
                </div>
                
                <div className="bg-medical-50 rounded-lg p-6">
                  <div className="flex items-center mb-4">
                    <div className="h-10 w-10 rounded-full bg-medical-100 flex items-center justify-center mr-3">
                      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-medical-600">
                        <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"></path>
                        <polyline points="14 2 14 8 20 8"></polyline>
                        <path d="M16 13v2"></path>
                        <path d="M8 13v2"></path>
                        <path d="M12 10v8"></path>
                      </svg>
                    </div>
                    <h3 className="text-xl font-semibold">الابتكار</h3>
                  </div>
                  <p className="text-gray-600">
                    نستمر في البحث عن أحدث التقنيات والحلول المبتكرة لتحسين منتجاتنا وخدماتنا.
                  </p>
                </div>
                
                <div className="bg-medical-50 rounded-lg p-6">
                  <div className="flex items-center mb-4">
                    <div className="h-10 w-10 rounded-full bg-medical-100 flex items-center justify-center mr-3">
                      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-medical-600">
                        <path d="M17 6.1H3"></path>
                        <path d="M21 12.1H3"></path>
                        <path d="M15.1 18H3"></path>
                      </svg>
                    </div>
                    <h3 className="text-xl font-semibold">الاحترافية</h3>
                  </div>
                  <p className="text-gray-600">
                    نعمل بمهنية عالية وأخلاقيات راسخة، ونلتزم بأعلى معايير الممارسة المهنية.
                  </p>
                </div>
              </div>
            </div>
            
            <div className="mb-16">
              <h2 className="text-3xl font-bold mb-6">لماذا تختارنا؟</h2>
              <div className="space-y-4">
                <div className="flex items-start">
                  <div className="h-8 w-8 rounded-full bg-medical-100 flex items-center justify-center mr-3 mt-1">
                    <span className="text-medical-600 font-bold">1</span>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2">خبرة متميزة</h3>
                    <p className="text-gray-600">
                      فريقنا يتمتع بخبرة واسعة في مجال الجبائر والأطراف الصناعية، مع تدريب مستمر 
                      على أحدث التقنيات والممارسات.
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="h-8 w-8 rounded-full bg-medical-100 flex items-center justify-center mr-3 mt-1">
                    <span className="text-medical-600 font-bold">2</span>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2">حلول مخصصة</h3>
                    <p className="text-gray-600">
                      نقدم حلولًا مخصصة تمامًا لكل حالة، مع مراعاة الاحتياجات الفردية والظروف الخاصة لكل عميل.
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="h-8 w-8 rounded-full bg-medical-100 flex items-center justify-center mr-3 mt-1">
                    <span className="text-medical-600 font-bold">3</span>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2">تقنيات متطورة</h3>
                    <p className="text-gray-600">
                      نستخدم أحدث التقنيات والمواد في تصميم وتصنيع منتجاتنا، مما يضمن جودة عالية وأداء متميز.
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="h-8 w-8 rounded-full bg-medical-100 flex items-center justify-center mr-3 mt-1">
                    <span className="text-medical-600 font-bold">4</span>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2">متابعة مستمرة</h3>
                    <p className="text-gray-600">
                      نقدم خدمة متابعة شاملة لعملائنا، للتأكد من رضاهم وتقديم الدعم المستمر لهم.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            
            <div>
              <h2 className="text-3xl font-bold mb-6">شهاداتنا واعتماداتنا</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mb-8">
                <div className="bg-white border border-gray-200 rounded-lg p-4 text-center shadow-sm">
                  <div className="h-16 w-16 mx-auto mb-3">
                    <img 
                      src="https://img.icons8.com/color/96/000000/diploma.png" 
                      alt="شهادة" 
                      className="h-full w-full object-contain"
                    />
                  </div>
                  <h3 className="font-semibold mb-1">شهادة الهيئة المصرية للرعاية الصحية</h3>
                  <p className="text-sm text-gray-500">2023</p>
                </div>
                
                <div className="bg-white border border-gray-200 rounded-lg p-4 text-center shadow-sm">
                  <div className="h-16 w-16 mx-auto mb-3">
                    <img 
                      src="https://img.icons8.com/color/96/000000/certificate.png" 
                      alt="شهادة" 
                      className="h-full w-full object-contain"
                    />
                  </div>
                  <h3 className="font-semibold mb-1">اعتماد الجمعية الدولية للأطراف الصناعية</h3>
                  <p className="text-sm text-gray-500">2024</p>
                </div>
                
                <div className="bg-white border border-gray-200 rounded-lg p-4 text-center shadow-sm">
                  <div className="h-16 w-16 mx-auto mb-3">
                    <img 
                      src="https://img.icons8.com/color/96/000000/warranty.png" 
                      alt="شهادة" 
                      className="h-full w-full object-contain"
                    />
                  </div>
                  <h3 className="font-semibold mb-1">شهادة ISO 9001 للجودة</h3>
                  <p className="text-sm text-gray-500">2025</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-medical-600 to-medical-800">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              انضم إلى عائلتنا من العملاء السعداء
            </h2>
            <p className="text-medical-100 text-lg mb-8">
              نحن هنا لمساعدتك في رحلتك نحو حياة أفضل. تواصل معنا اليوم للحصول على استشارة مجانية
              ومعرفة كيف يمكننا مساعدتك.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link to="/contact">
                <Button size="lg" className="bg-white text-medical-700 hover:bg-medical-50 px-6 py-6 w-full sm:w-auto">
                  تواصل معنا
                  <ChevronRight className="mr-2 h-5 w-5 rtl:rotate-180" />
                </Button>
              </Link>
              <Link to="/team">
                <Button variant="outline" size="lg" className="border-white text-white hover:bg-white/10 px-6 py-6 w-full sm:w-auto">
                  تعرف على فريقنا
                  <ChevronRight className="mr-2 h-5 w-5 rtl:rotate-180" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default About;

