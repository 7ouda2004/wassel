import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Play, Shield, Hand, Dumbbell, Sparkles, ChevronDown, ChevronUp, Heart, CheckCircle2 } from 'lucide-react';
import { useTranslation } from 'react-i18next';

interface CareVideo {
  id: string;
  title_ar: string;
  title_en: string;
  desc_ar: string;
  desc_en: string;
  youtubeId: string;
  category: 'maintenance' | 'cleaning' | 'wearing' | 'exercises';
}

const careVideos: CareVideo[] = [
  {
    id: '1',
    title_ar: 'كيفية لبس الطرف الصناعي تحت الركبة',
    title_en: 'How to Wear Below-Knee Prosthesis',
    desc_ar: 'شرح خطوة بخطوة لطريقة ارتداء الطرف الصناعي تحت الركبة بشكل صحيح',
    desc_en: 'Step-by-step guide on properly wearing a below-knee prosthesis',
    youtubeId: 'dQw4w9WgXcQ',
    category: 'wearing',
  },
  {
    id: '2',
    title_ar: 'كيفية لبس الطرف الصناعي فوق الركبة',
    title_en: 'How to Wear Above-Knee Prosthesis',
    desc_ar: 'الطريقة الصحيحة لارتداء الطرف الصناعي فوق الركبة والتأكد من الثبات',
    desc_en: 'The correct way to wear an above-knee prosthesis and ensure stability',
    youtubeId: 'dQw4w9WgXcQ',
    category: 'wearing',
  },
  {
    id: '3',
    title_ar: 'تنظيف السوكيت والعناية اليومية',
    title_en: 'Socket Cleaning & Daily Care',
    desc_ar: 'كيفية تنظيف السوكيت والأجزاء المختلفة من الطرف الصناعي يومياً',
    desc_en: 'How to clean the socket and various prosthetic parts daily',
    youtubeId: 'dQw4w9WgXcQ',
    category: 'cleaning',
  },
  {
    id: '4',
    title_ar: 'تنظيف الجلد والعناية بالجدعة',
    title_en: 'Skin Care & Residual Limb Hygiene',
    desc_ar: 'نصائح للعناية بجلد الجدعة ومنع الالتهابات والتقرحات',
    desc_en: 'Tips for residual limb skin care to prevent infections and sores',
    youtubeId: 'dQw4w9WgXcQ',
    category: 'cleaning',
  },
  {
    id: '5',
    title_ar: 'الحفاظ على الطرف الصناعي - نصائح هامة',
    title_en: 'Prosthesis Maintenance Tips',
    desc_ar: 'نصائح هامة للحفاظ على الطرف الصناعي وإطالة عمره الافتراضي',
    desc_en: 'Essential tips for maintaining your prosthesis and extending its lifespan',
    youtubeId: 'dQw4w9WgXcQ',
    category: 'maintenance',
  },
  {
    id: '6',
    title_ar: 'متى تحتاج لصيانة الطرف الصناعي؟',
    title_en: 'When Does Your Prosthesis Need Maintenance?',
    desc_ar: 'العلامات التي تدل على حاجة الطرف الصناعي للصيانة أو التعديل',
    desc_en: 'Signs that indicate your prosthesis needs maintenance or adjustment',
    youtubeId: 'dQw4w9WgXcQ',
    category: 'maintenance',
  },
  {
    id: '7',
    title_ar: 'تمارين تقوية عضلات الجدعة',
    title_en: 'Residual Limb Strengthening Exercises',
    desc_ar: 'تمارين لتقوية العضلات المحيطة بالجدعة لتحسين التحكم في الطرف الصناعي',
    desc_en: 'Exercises to strengthen muscles around the residual limb for better prosthesis control',
    youtubeId: 'dQw4w9WgXcQ',
    category: 'exercises',
  },
  {
    id: '8',
    title_ar: 'تمارين المشي والتوازن',
    title_en: 'Walking & Balance Exercises',
    desc_ar: 'تمارين لتحسين التوازن والمشي بالطرف الصناعي بشكل طبيعي',
    desc_en: 'Exercises to improve balance and natural walking with the prosthesis',
    youtubeId: 'dQw4w9WgXcQ',
    category: 'exercises',
  },
];

const categories = [
  { key: 'all' as const, icon: Heart, label_ar: 'الكل', label_en: 'All', color: 'from-medical-500 to-medical-600' },
  { key: 'maintenance' as const, icon: Shield, label_ar: 'الحفاظ على الطرف', label_en: 'Maintenance', color: 'from-blue-500 to-blue-600' },
  { key: 'cleaning' as const, icon: Sparkles, label_ar: 'التنظيف', label_en: 'Cleaning', color: 'from-teal-500 to-teal-600' },
  { key: 'wearing' as const, icon: Hand, label_ar: 'طريقة اللبس', label_en: 'Wearing', color: 'from-purple-500 to-purple-600' },
  { key: 'exercises' as const, icon: Dumbbell, label_ar: 'التمارين', label_en: 'Exercises', color: 'from-amber-500 to-amber-600' },
];

const LimbCareSection = () => {
  const { i18n } = useTranslation();
  const isAr = i18n.language === 'ar';
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [playingVideo, setPlayingVideo] = useState<string | null>(null);
  const [showAll, setShowAll] = useState(false);

  const filteredVideos = activeCategory === 'all'
    ? careVideos
    : careVideos.filter(v => v.category === activeCategory);

  const displayedVideos = showAll ? filteredVideos : filteredVideos.slice(0, 4);

  return (
    <section className="py-20 bg-gradient-to-b from-white to-medical-50">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center mb-12">
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 bg-medical-100 text-medical-700 px-4 py-2 rounded-full text-sm font-bold mb-4"
          >
            <Heart className="w-4 h-4" />
            {isAr ? 'دليل العناية بالطرف الصناعي' : 'Prosthesis Care Guide'}
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-4"
          >
            {isAr ? 'كيف تحافظ على طرفك الصناعي؟' : 'How to Care for Your Prosthesis?'}
          </motion.h2>
          <p className="text-gray-600 text-lg leading-relaxed">
            {isAr
              ? 'فيديوهات تعليمية شاملة عن طريقة اللبس، التنظيف، الحفاظ على الطرف الصناعي، والتمارين اليومية'
              : 'Comprehensive tutorial videos on wearing, cleaning, maintaining your prosthesis, and daily exercises'}
          </p>
        </div>

        {/* Category Tabs */}
        <div className="flex flex-wrap justify-center gap-3 mb-10">
          {categories.map(cat => (
            <button
              key={cat.key}
              onClick={() => { setActiveCategory(cat.key); setShowAll(false); }}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-bold transition-all duration-300 ${
                activeCategory === cat.key
                  ? `bg-gradient-to-r ${cat.color} text-white shadow-lg`
                  : 'bg-white text-gray-600 border border-gray-200 hover:border-gray-300 shadow-sm'
              }`}
            >
              <cat.icon className="w-4 h-4" />
              {isAr ? cat.label_ar : cat.label_en}
            </button>
          ))}
        </div>

        {/* Videos Grid */}
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">
          {displayedVideos.map((video, idx) => {
            const catInfo = categories.find(c => c.key === video.category);
            return (
              <motion.div
                key={video.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="bg-white rounded-2xl overflow-hidden shadow-md border border-gray-100 hover:shadow-xl transition-shadow duration-300"
              >
                {/* Video Thumbnail / Player */}
                <div className="relative aspect-video bg-gray-900">
                  {playingVideo === video.id ? (
                    <iframe
                      src={`https://www.youtube.com/embed/${video.youtubeId}?autoplay=1&rel=0`}
                      title={isAr ? video.title_ar : video.title_en}
                      className="w-full h-full"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    />
                  ) : (
                    <>
                      <img
                        src={`https://img.youtube.com/vi/${video.youtubeId}/maxresdefault.jpg`}
                        alt={isAr ? video.title_ar : video.title_en}
                        className="w-full h-full object-cover opacity-80"
                        onError={(e) => {
                          (e.target as HTMLImageElement).src = `https://img.youtube.com/vi/${video.youtubeId}/hqdefault.jpg`;
                        }}
                      />
                      <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                        <button
                          onClick={() => setPlayingVideo(video.id)}
                          className="w-16 h-16 bg-white/90 rounded-full flex items-center justify-center shadow-2xl hover:scale-110 transition-transform duration-300 group"
                        >
                          <Play className="w-7 h-7 text-medical-600 ms-1 group-hover:text-medical-700" fill="currentColor" />
                        </button>
                      </div>
                      {/* Category Badge */}
                      <div className={`absolute top-3 ${isAr ? 'right-3' : 'left-3'} bg-gradient-to-r ${catInfo?.color || 'from-gray-500 to-gray-600'} text-white text-xs font-bold px-3 py-1 rounded-full`}>
                        {isAr ? catInfo?.label_ar : catInfo?.label_en}
                      </div>
                    </>
                  )}
                </div>

                {/* Video Info */}
                <div className="p-5">
                  <h3 className="font-bold text-gray-900 text-lg mb-2 line-clamp-2">
                    {isAr ? video.title_ar : video.title_en}
                  </h3>
                  <p className="text-gray-500 text-sm line-clamp-2">
                    {isAr ? video.desc_ar : video.desc_en}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Show More/Less */}
        {filteredVideos.length > 4 && (
          <div className="text-center mt-8">
            <button
              onClick={() => setShowAll(!showAll)}
              className="inline-flex items-center gap-2 text-medical-600 font-bold hover:text-medical-700 transition-colors"
            >
              {showAll ? (
                <>{isAr ? 'عرض أقل' : 'Show Less'} <ChevronUp className="w-4 h-4" /></>
              ) : (
                <>{isAr ? 'عرض الكل' : 'Show All'} <ChevronDown className="w-4 h-4" /></>
              )}
            </button>
          </div>
        )}

        {/* Care Tips */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto mt-16 bg-gradient-to-r from-medical-600 to-medical-700 rounded-3xl p-8 md:p-10 text-white shadow-xl"
        >
          <h3 className="text-2xl font-bold mb-6 text-center">
            {isAr ? 'نصائح سريعة للعناية اليومية' : 'Quick Daily Care Tips'}
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              { ar: 'نظف السوكيت يومياً بالماء والصابون الخفيف', en: 'Clean the socket daily with mild soap and water' },
              { ar: 'جفف الجدعة جيداً قبل ارتداء الطرف الصناعي', en: 'Dry the residual limb thoroughly before wearing the prosthesis' },
              { ar: 'افحص الجلد يومياً بحثاً عن أي احمرار أو تقرحات', en: 'Check skin daily for redness or sores' },
              { ar: 'لا تعرض الطرف الصناعي للماء أو الحرارة الشديدة', en: 'Don\'t expose the prosthesis to water or extreme heat' },
              { ar: 'مارس تمارين التقوية والتوازن يومياً', en: 'Practice strengthening and balance exercises daily' },
              { ar: 'راجع الأخصائي كل 6 أشهر لفحص الجهاز', en: 'Visit your specialist every 6 months for device check-up' },
            ].map((tip, idx) => (
              <div key={idx} className="flex items-start gap-3 bg-white/10 rounded-xl p-3 backdrop-blur-sm">
                <CheckCircle2 className="w-5 h-5 text-green-300 mt-0.5 flex-shrink-0" />
                <p className="text-white/90 text-sm">{isAr ? tip.ar : tip.en}</p>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};


export default LimbCareSection;
