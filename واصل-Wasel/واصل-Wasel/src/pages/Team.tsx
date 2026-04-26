
import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Facebook, Instagram, Twitter, Linkedin, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { useTranslation } from 'react-i18next';

const teamMembers = [
  {
    id: 1,
    name: 'محمود إبراهيم',
    role: 'المؤسس وأخصائي أطراف صناعية وأجهزة تقويمية',
    image: '/public/images/mahmoud.jpg',
    bio: 'خريج جامعة القاهرة الجديدة التكنولوجية، ومتخصص في تصميم وتصنيع الأطراف الصناعية والأجهزة التقويمية. يمتلك خبرة واسعة في المجال ويسعى دائمًا لتقديم أحدث التقنيات والحلول المبتكرة للمرضى.',
    expertise: ['تصميم الأطراف الصناعية', 'الجبائر التقويمية', 'تقييم الحالات المتقدمة'],
    social: {
      facebook: 'https://www.facebook.com/profile.php?id=100009899685976',
      instagram: 'https://www.instagram.com/mahmoud.ibrahim.7/',

      linkedin: 'https://www.linkedin.com/in/mahmoud-arafa-b490b4265/'
    }
  },
  {
    id: 2,
    name: 'نادر إبراهيم',
    role: 'أخصائي تركيب وضبط الأطراف الصناعية',
    image: '/public/images/nader.jpeg',
    bio: 'متخصص في ضبط وتركيب الأطراف الصناعية بدقة عالية، مع خبرة أكثر من3 سنوات في المجال. يتميز بمهاراته الفنية العالية ودقته في العمل، مما يضمن حصول المرضى على أفضل النتائج وأعلى مستويات الراحة.',
    expertise: ['ضبط الأطراف الصناعية', 'تقييم الحركة والمشي', 'الصيانة والإصلاح'],
    social: {
      facebook: 'https://www.facebook.com/nader.ibrahem.35',
      instagram: 'https://www.instagram.com/nader_op1/',
      twitter: '#',
      linkedin: 'https://www.linkedin.com/in/nader-ibrahim-3a2554278/'
    }
  },
  {
    id: 3,
    name: 'باسل هاني',
    role: 'أخصائي الجبائر الطبية وتقنيات السيليكون الحديثه',
    image: '/public/images/bassel.jpg',
    bio: 'متخصص في تصميم وتصنيع الجبائر الطبية المخصصة. يمتلك معرفة عميقة بعلم التشريح وميكانيكا الجسم، مما يمكنه من تصميم جبائر تلبي الاحتياجات الدقيقة لكل مريض. يسعى دائمًا لتطوير مهاراته واكتساب أحدث التقنيات في المجال.',
    expertise: ['جبائر العمود الفقري', 'جبائر الركبة والكاحل', 'جبائر الأطفال المتخصصة'],
    social: {
      facebook: 'https://www.facebook.com/bassel.hany.mohammed',
      instagram: 'https://www.instagram.com/bassel_hanymohammad/',
      twitter: '#',
      linkedin: 'https://www.linkedin.com/in/bassel-hany-mohammed-526276328/'
    }
  },

];

const Team = () => {
  const { t, i18n } = useTranslation();
  const isRtl = i18n.dir() === 'rtl';
  const teamMembers = t('team.members', { returnObjects: true }) as any[];

  useEffect(() => {
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
              <span>{t('team.badge')}</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              {t('team.title')}
            </h1>
            <p className="text-xl text-gray-600 mb-8">
              {t('team.desc')}
            </p>
          </div>

          <motion.div
            className="mt-5 relative max-w-lg mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 2, y: 0 }}
            transition={{ duration: 0.01, delay: 1 }}
          >
            <img
              src="/public/images/team.png"
              alt="فريق عمل واصل"
              className="w-full rounded-lg shadow-lg"
            />
            <div className="absolute inset-0 rounded-lg bg-gradient-to-tr from-medical-600/30 to-transparent"></div>
          </motion.div>
        </div>
      </section>

      {/* Team Members */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="section-title">{t('team.members_title')}</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
            {teamMembers.map((member, index) => (
              <motion.div
                key={member.id}
                className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-100"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <div className="relative h-72">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex flex-col justify-end p-4">
                    <h3 className="text-2xl font-bold text-white">{member.name}</h3>
                    <p className="text-medical-100">{member.role}</p>
                  </div>
                </div>

                <div className="p-6">
                  <p className="text-gray-600 mb-4">{member.bio}</p>

                  <h4 className="font-semibold text-medical-700 mb-2">{t('team.expertise_label')}:</h4>
                  <ul className="mb-6">
                    {member.expertise.map((item: string, idx: number) => (
                      <li key={idx} className="flex items-center mb-1">
                        <span className="h-2 w-2 bg-medical-500 rounded-full mx-2"></span>
                        <span className="text-gray-700">{item}</span>
                      </li>
                    ))}
                  </ul>

                  <div className="flex justify-center space-x-3 pt-4 border-t border-gray-100">
                    <a href={member.social.facebook} className="text-gray-400 hover:text-medical-600 transition-colors">
                      <Facebook className="h-5 w-5" />
                    </a>
                    <a href={member.social.instagram} className="text-gray-400 hover:text-medical-600 transition-colors">
                      <Instagram className="h-5 w-5" />
                    </a>
                    <a href={member.social.twitter} className="text-gray-400 hover:text-medical-600 transition-colors">
                      <Twitter className="h-5 w-5" />
                    </a>
                    <a href={member.social.linkedin} className="text-gray-400 hover:text-medical-600 transition-colors">
                      <Linkedin className="h-5 w-5" />
                    </a>
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
          <h2 className="section-title">{t('team.values_title')}</h2>

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
              <h3 className="text-xl font-bold mb-3 text-center">{t('team.values.teamwork.title')}</h3>
              <p className="text-gray-600 text-center">
                {t('team.values.teamwork.desc')}
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
              <h3 className="text-xl font-bold mb-3 text-center">{t('team.values.innovation.title')}</h3>
              <p className="text-gray-600 text-center">
                {t('team.values.innovation.desc')}
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
              <h3 className="text-xl font-bold mb-3 text-center">{t('team.values.care.title')}</h3>
              <p className="text-gray-600 text-center">
                {t('team.values.care.desc')}
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Join Us */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-6">{t('team.join.title')}</h2>
            <p className="text-xl text-gray-600 mb-8">
              {t('team.join.desc')}
            </p>

            <div className="bg-medical-50 rounded-lg p-8 border border-medical-100 shadow-sm">
              <h3 className="text-2xl font-semibold mb-4">{t('team.join.jobs_title')}</h3>
              <ul className="space-y-4 text-start max-w-lg mx-auto mb-8">
                {t('team.join.jobs', { returnObjects: true }).map((job: any, idx: number) => (
                  <li key={idx} className="flex items-center justify-between p-3 bg-white rounded-md shadow-sm">
                    <span className="font-medium">{job.title}</span>
                    <span className="bg-medical-100 text-medical-700 px-3 py-1 rounded-full text-sm">{job.type}</span>
                  </li>
                ))}
              </ul>

              <p className="text-gray-600 mb-6">
                {t('team.join.contact_desc')}
              </p>
              <div className="text-xl font-semibold text-medical-700">
                <a href="mailto:mahmoudebrahim049@gmail.com" className="hover:underline">
                  mahmoudebrahim049@gmail.com
                </a>
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
              {t('team.cta.title')}
            </h2>
            <p className="text-medical-100 text-lg mb-8">
              {t('team.cta.desc')}
            </p>
            <Link to="/contact">
              <Button size="lg" className="bg-white text-medical-700 hover:bg-medical-50 px-6 py-6">
                {t('team.cta.button')}
                <ChevronRight className={`mr-2 h-5 w-5 ${isRtl ? 'rotate-0' : 'rotate-180'}`} />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Team;
