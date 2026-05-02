import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { BookOpen, Clock, Tag, ArrowLeft, Search } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { useTranslation } from 'react-i18next';
import { LoadingSkeleton } from '@/components/shared/LoadingSkeleton';
import EmptyState from '@/components/shared/EmptyState';

// Static blog posts (will be replaced with Supabase data)
const staticPosts = [
  {
    id: '1', slug: 'prosthetic-limbs-cost-egypt',
    title_ar: 'تكلفة الأطراف الصناعية في مصر 2025', title_en: 'Cost of Prosthetic Limbs in Egypt 2025',
    excerpt_ar: 'دليل شامل لتكاليف الأطراف الصناعية بأنواعها المختلفة في مصر مع مقارنة الأسعار بين المراكز', excerpt_en: 'Comprehensive guide to prosthetic costs in Egypt with center comparisons',
    cover_image: 'https://images.unsplash.com/photo-1559757175-5700dde675bc?w=600', tags: ['أطراف صناعية', 'أسعار', 'مصر'],
    published_at: '2025-03-15', created_at: '2025-03-15'
  },
  {
    id: '2', slug: 'best-prosthetic-centers-egypt',
    title_ar: 'أفضل مراكز الأطراف الصناعية في مصر', title_en: 'Best Prosthetic Centers in Egypt',
    excerpt_ar: 'تعرف على أفضل المراكز المتخصصة في الأطراف الصناعية والتقويمية في جميع محافظات مصر', excerpt_en: 'Discover the best prosthetic and orthotic centers across Egypt',
    cover_image: 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=600', tags: ['مراكز', 'أطراف صناعية'],
    published_at: '2025-02-20', created_at: '2025-02-20'
  },
  {
    id: '3', slug: 'insurance-coverage-prosthetics',
    title_ar: 'التأمين الصحي وتغطية الأجهزة التعويضية', title_en: 'Health Insurance Coverage for Prosthetics',
    excerpt_ar: 'كيف يمكنك الحصول على تغطية تأمينية للأطراف الصناعية والجبائر الطبية في مصر', excerpt_en: 'How to get insurance coverage for prosthetics and braces in Egypt',
    cover_image: 'https://images.unsplash.com/photo-1584982751601-97dcc096659c?w=600', tags: ['تأمين', 'تغطية'],
    published_at: '2025-01-10', created_at: '2025-01-10'
  },
  {
    id: '4', slug: 'rehabilitation-after-amputation',
    title_ar: 'التأهيل بعد البتر: دليل شامل', title_en: 'Rehabilitation After Amputation: Complete Guide',
    excerpt_ar: 'خطوات التأهيل والتعافي بعد عملية البتر وكيفية التأقلم مع الطرف الصناعي', excerpt_en: 'Steps for recovery after amputation and adapting to prosthetics',
    cover_image: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=600', tags: ['تأهيل', 'بتر'],
    published_at: '2024-12-05', created_at: '2024-12-05'
  },
];

const Blog = () => {
  const { i18n } = useTranslation();
  const isAr = i18n.language === 'ar';
  const isRtl = i18n.dir() === 'rtl';
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    window.scrollTo(0, 0);
    const timer = setTimeout(() => setIsLoading(false), 500);
    return () => clearTimeout(timer);
  }, []);

  const filteredPosts = staticPosts.filter(p => {
    const term = searchTerm.toLowerCase();
    return p.title_ar.toLowerCase().includes(term) || p.title_en.toLowerCase().includes(term) || p.tags.some(t => t.includes(term));
  });

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      {/* Hero */}
      <section className="relative py-20 bg-gradient-to-b from-medical-100 to-white overflow-hidden">
        <div className="container mx-auto px-4 relative z-10 text-center">
          <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="inline-block py-2 px-6 bg-medical-200 text-medical-800 rounded-full text-sm font-semibold mb-4"><BookOpen className="w-4 h-4 inline me-2" />{isAr ? 'مدونة واصل الطبية' : 'Wasel Medical Blog'}</motion.div>
          <motion.h1 initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.1 }} className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-6">{isAr ? 'مقالات ومعلومات طبية' : 'Medical Articles & Information'}</motion.h1>
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }} className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">{isAr ? 'اكتشف أحدث المقالات حول الأطراف الصناعية والجبائر الطبية والتأهيل' : 'Discover latest articles about prosthetics, orthoses, and rehabilitation'}</motion.p>
          <div className="max-w-md mx-auto relative">
            <Input type="text" value={searchTerm} onChange={e => setSearchTerm(e.target.value)} placeholder={isAr ? 'ابحث في المقالات...' : 'Search articles...'} className="rounded-xl h-12 pe-10" />
            <Search className={`absolute ${isRtl ? 'left-3' : 'right-3'} top-3.5 h-5 w-5 text-gray-400`} />
          </div>
        </div>
      </section>

      {/* Blog Grid */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          {isLoading ? <LoadingSkeleton variant="card" count={4} /> :
            filteredPosts.length === 0 ? <EmptyState type="no-results" /> : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
                {filteredPosts.map((post, i) => (
                  <motion.article key={post.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}
                    className="bg-white rounded-2xl shadow-md overflow-hidden border border-gray-100 hover:shadow-xl transition-shadow group">
                    <div className="h-48 overflow-hidden">
                      <img src={post.cover_image} alt={isAr ? post.title_ar : post.title_en} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                    </div>
                    <div className="p-6">
                      <div className="flex items-center gap-2 text-xs text-gray-500 mb-3">
                        <Clock className="w-3 h-3" />
                        <span>{new Date(post.published_at).toLocaleDateString(isAr ? 'ar-EG' : 'en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
                      </div>
                      <h2 className="text-xl font-bold text-gray-900 mb-2 line-clamp-2 group-hover:text-medical-600 transition-colors">{isAr ? post.title_ar : post.title_en}</h2>
                      <p className="text-gray-500 text-sm mb-4 line-clamp-2">{isAr ? post.excerpt_ar : post.excerpt_en}</p>
                      <div className="flex flex-wrap gap-2 mb-4">
                        {post.tags.map(tag => (
                          <span key={tag} className="inline-flex items-center gap-1 px-2 py-1 bg-medical-50 text-medical-700 rounded-full text-xs font-medium"><Tag className="w-3 h-3" />{tag}</span>
                        ))}
                      </div>
                      <Link to={`/blog/${post.slug}`}>
                        <Button variant="ghost" className="w-full text-medical-600 font-semibold hover:bg-medical-50 rounded-xl">{isAr ? 'اقرأ المزيد' : 'Read More'}<ArrowLeft className={`w-4 h-4 ms-2 ${isRtl ? '' : 'rotate-180'}`} /></Button>
                      </Link>
                    </div>
                  </motion.article>
                ))}
              </div>
            )}
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Blog;
