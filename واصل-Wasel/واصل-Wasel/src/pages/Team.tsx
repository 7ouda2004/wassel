
import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Facebook, Instagram, Twitter, Linkedin, ChevronRight, Users } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { getLocalSpecialists, type Specialist } from '@/lib/db';

const Team = () => {
  const [specialists, setSpecialists] = useState<Specialist[]>([]);

  useEffect(() => {
    document.documentElement.dir = 'rtl';
    document.body.classList.add('font-cairo');
    window.scrollTo(0, 0);
    // Load only the first 3 active specialists (core founding team)
    const all = getLocalSpecialists();
    const active = all.filter(s => s.status === 'active');
    setSpecialists(active.slice(0, 3));
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-b from-medical-100 to-white overflow-hidden">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-block oval-header">
              <span>فريق العمل</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              تعرف على فريقنا المتخصص
            </h1>
            <p className="text-xl text-gray-600 mb-8">
              نفخر بفريقنا المتميز من الخبراء والمتخصصين الذين يعملون معًا لتقديم أفضل الحلول
              والخدمات في مجال الجبائر والأطراف الصناعية.
            </p>
          </div>
          
          <motion.div 
            className="mt-12 relative max-w-5xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <img 
              src="/public/images/team.png"
              alt="فريق عمل واصل" 
              className="w-full rounded-2xl shadow-2xl"
              onError={(e) => {
                e.currentTarget.src = "https://images.unsplash.com/photo-1576091160550-2173dba999ef?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80";
              }}
            />
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-tr from-medical-600/30 to-transparent"></div>
          </motion.div>
        </div>
      </section>

      {/* Team Members */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="section-title">أعضاء الفريق</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
            {specialists.map((member, index) => (
              <motion.div 
                key={member.id}
                className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-100 flex flex-col h-full justify-between"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <div>
                  <div className="relative h-72">
                    <img 
                      src={member.image || '/images/new.jpg'} 
                      alt={member.name} 
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        e.currentTarget.src = "https://images.unsplash.com/photo-1622253692010-333f2da6031d?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80";
                      }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex flex-col justify-end p-4">
                      <h3 className="text-2xl font-bold text-white">{member.name}</h3>
                      <p className="text-medical-100">{member.role}</p>
                    </div>
                  </div>
                  
                  <div className="p-6">
                    <p className="text-gray-600 mb-4">{member.bio}</p>
                    
                    {member.expertise && member.expertise.length > 0 && (
                      <>
                        <h4 className="font-semibold text-medical-700 mb-2">التخصصات:</h4>
                        <ul className="mb-6">
                          {member.expertise.map((item, idx) => (
                            <li key={idx} className="flex items-center mb-1">
                              <span className="h-2 w-2 bg-medical-500 rounded-full mr-2"></span>
                              <span className="text-gray-700">{item}</span>
                            </li>
                          ))}
                        </ul>
                      </>
                    )}
                  </div>
                </div>
                
                <div className="p-6 pt-0">
                  <div className="flex justify-center space-x-3 pt-4 border-t border-gray-100">
                    {member.facebook && (
                      <motion.a 
                        href={member.facebook} 
                        target="_blank"
                        className="text-gray-400 hover:text-medical-600 transition-colors"
                        whileHover={{ scale: 1.2, y: -2 }}
                        transition={{ type: "spring", stiffness: 400 }}
                      >
                        <Facebook className="h-5 w-5" />
                      </motion.a>
                    )}
                    {member.instagram && (
                      <motion.a 
                        href={member.instagram} 
                        target="_blank"
                        className="text-gray-400 hover:text-medical-600 transition-colors"
                        whileHover={{ scale: 1.2, y: -2 }}
                        transition={{ type: "spring", stiffness: 400 }}
                      >
                        <Instagram className="h-5 w-5" />
                      </motion.a>
                    )}
                    {member.linkedin && (
                      <motion.a 
                        href={member.linkedin} 
                        target="_blank"
                        className="text-gray-400 hover:text-medical-600 transition-colors"
                        whileHover={{ scale: 1.2, y: -2 }}
                        transition={{ type: "spring", stiffness: 400 }}
                      >
                        <Linkedin className="h-5 w-5" />
                      </motion.a>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 bg-medical-50">
        <div className="container mx-auto px-4">
          <h2 className="section-title">قيم فريقنا</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
            <motion.div 
              className="bg-white rounded-lg shadow-md p-6"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
            >
              <div className="h-16 w-16 rounded-full bg-medical-100 flex items-center justify-center mb-4 mx-auto">
                <img 
                  src="https://img.icons8.com/color/48/000000/conference-call.png" 
                  alt="العمل الجماعي" 
                  className="h-10 w-10"
                />
              </div>
              <h3 className="text-xl font-bold mb-3 text-center">العمل الجماعي</h3>
              <p className="text-gray-600 text-center">
                نعمل كفريق واحد متكامل، نتعاون معًا لتحقيق أفضل النتائج لعملائنا.
                كل عضو في الفريق يقدم خبرته ومهاراته لخدمة الهدف المشترك.
              </p>
            </motion.div>
            
            <motion.div 
              className="bg-white rounded-lg shadow-md p-6"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              viewport={{ once: true }}
            >
              <div className="h-16 w-16 rounded-full bg-medical-100 flex items-center justify-center mb-4 mx-auto">
                <img 
                  src="https://img.icons8.com/color/48/000000/light-on.png" 
                  alt="الابتكار" 
                  className="h-10 w-10"
                />
              </div>
              <h3 className="text-xl font-bold mb-3 text-center">الابتكار المستمر</h3>
              <p className="text-gray-600 text-center">
                نشجع التفكير الإبداعي والبحث المستمر عن حلول مبتكرة. نسعى دائمًا للتطوير
                وتبني أحدث التقنيات والأساليب في مجالنا.
              </p>
            </motion.div>
            
            <motion.div 
              className="bg-white rounded-lg shadow-md p-6"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <div className="h-16 w-16 rounded-full bg-medical-100 flex items-center justify-center mb-4 mx-auto">
                <img 
                  src="https://img.icons8.com/color/48/000000/heart-health.png" 
                  alt="الرعاية" 
                  className="h-10 w-10"
                />
              </div>
              <h3 className="text-xl font-bold mb-3 text-center">الرعاية والتعاطف</h3>
              <p className="text-gray-600 text-center">
                نتعامل مع عملائنا برعاية وتعاطف، متفهمين لاحتياجاتهم ومشاعرهم.
                نسعى لتقديم الدعم النفسي إلى جانب الحلول التقنية.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Join Us */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <motion.h2 
              className="text-3xl font-bold mb-6"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              انضم إلى فريقنا
            </motion.h2>
            <motion.p 
              className="text-xl text-gray-600 mb-8"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
            >
              نبحث دائمًا عن المواهب المتميزة والشغوفة للانضمام إلى فريقنا. إذا كنت ترغب في العمل
              في بيئة ديناميكية ومبتكرة، وتشاركنا شغفنا لمساعدة الآخرين، فنحن نرحب بك.
            </motion.p>
            
            <motion.div 
              className="bg-medical-50 rounded-lg p-8 border border-medical-100 shadow-sm"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              viewport={{ once: true }}
            >
              <h3 className="text-2xl font-semibold mb-4">الوظائف المتاحة</h3>
              <ul className="space-y-4 text-right max-w-lg mx-auto mb-8">
                <motion.li 
                  className="flex items-center justify-between p-3 bg-white rounded-md shadow-sm"
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.1 }}
                  viewport={{ once: true }}
                  whileHover={{ scale: 1.02, x: 5 }}
                >
                  <span className="font-medium">أخصائي أطراف صناعية</span>
                  <span className="bg-medical-100 text-medical-700 px-3 py-1 rounded-full text-sm">دوام كامل</span>
                </motion.li>
                <motion.li 
                  className="flex items-center justify-between p-3 bg-white rounded-md shadow-sm"
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  viewport={{ once: true }}
                  whileHover={{ scale: 1.02, x: 5 }}
                >
                  <span className="font-medium">فني تصنيع وتشكيل</span>
                  <span className="bg-medical-100 text-medical-700 px-3 py-1 rounded-full text-sm">دوام كامل</span>
                </motion.li>
                <motion.li 
                  className="flex items-center justify-between p-3 bg-white rounded-md shadow-sm"
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                  viewport={{ once: true }}
                  whileHover={{ scale: 1.02, x: 5 }}
                >
                  <span className="font-medium">أخصائي علاج طبيعي</span>
                  <span className="bg-medical-100 text-medical-700 px-3 py-1 rounded-full text-sm">دوام جزئي</span>
                </motion.li>
              </ul>
              
              <motion.p 
                className="text-gray-600 mb-6"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ delay: 0.6 }}
                viewport={{ once: true }}
              >
                للتقديم، يرجى إرسال سيرتك الذاتية ورسالة توضح سبب رغبتك في الانضمام إلينا إلى:
              </motion.p>
              <motion.div 
                className="text-xl font-semibold text-medical-700"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 }}
                viewport={{ once: true }}
              >
                <a href="mailto:mahmoudebrahim049@gmail.com" className="hover:underline">
                  mahmoudebrahim049@gmail.com
                </a>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-medical-600 to-medical-800 overflow-hidden relative">
        <div className="absolute inset-0 opacity-10">
          <motion.div 
            className="absolute w-32 h-32 rounded-full bg-white top-10 left-10"
            animate={{ 
              scale: [1, 1.2, 1], 
              opacity: [0.1, 0.3, 0.1] 
            }}
            transition={{ 
              duration: 4, 
              repeat: Infinity, 
              ease: "easeInOut" 
            }}
          />
          <motion.div 
            className="absolute w-48 h-48 rounded-full bg-white bottom-10 right-10"
            animate={{ 
              scale: [1, 1.3, 1], 
              opacity: [0.1, 0.2, 0.1] 
            }}
            transition={{ 
              duration: 6, 
              repeat: Infinity, 
              ease: "easeInOut",
              delay: 1
            }}
          />
        </div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <motion.h2 
              className="text-3xl md:text-4xl font-bold text-white mb-4"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              تواصل مع فريقنا اليوم
            </motion.h2>
            <motion.p 
              className="text-medical-100 text-lg mb-8"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
            >
              احصل على استشارة مجانية وتعرف على كيف يمكن لخبرائنا مساعدتك في الحصول على الحل المناسب.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              viewport={{ once: true }}
            >
              <Link to="/contact">
                <Button size="lg" className="bg-white text-medical-700 hover:bg-medical-50 px-6 py-6 hover:scale-105 transition-transform duration-200">
                  تواصل معنا
                  <ChevronRight className="mr-2 h-5 w-5 rtl:rotate-180" />
                </Button>
              </Link>
            </motion.div>
          </div>
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default Team;
