import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Info, ArrowRight, Award, Bandage, Ruler, Activity, Hand, PersonStanding,
  ChevronDown, ChevronUp, Filter, Footprints, Heart, Baby, Star, Check
} from 'lucide-react';
import {
  Accordion, AccordionContent, AccordionItem, AccordionTrigger
} from '@/components/ui/accordion';
import { Button } from '@/components/ui/button';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { useTranslation } from 'react-i18next';

// ============ ALL ORTHOSES DATA ============

const Orthoses = () => {
  const { t, i18n } = useTranslation();

  const orthosesCategories = [
    { id: 'all', label: t('orthoses.cat_all'), icon: Filter },
    { id: 'lower', label: t('orthoses.cat_lower'), icon: Footprints },
    { id: 'spinal', label: t('orthoses.cat_spinal'), icon: Ruler },
    { id: 'upper', label: t('orthoses.cat_upper'), icon: Hand },
    { id: 'pediatric', label: t('orthoses.cat_pediatric'), icon: Baby },
  ];

  const translatedData = t('orthoses.data', { returnObjects: true }) as any;

  const orthosesDataMap = [
    { id: 'fo', category: 'lower', image: 'https://m.media-amazon.com/images/I/51yiLRrf50L._AC_UF1000,1000_QL80_.jpg', color: 'from-cyan-400 to-cyan-600', typesImages: ['https://bauerfeind.com.au/cdn/shop/files/bf-globotec-junior-kids-outdoor2_1400x@2x.jpg?v=1771990348','https://static.wixstatic.com/media/d973f5_b57a8fc8d60b415986c323db89026985~mv2.jpg/v1/fill/w_556,h_333,al_c,q_80,usm_0.66_1.00_0.01,enc_avif,quality_auto/d973f5_b57a8fc8d60b415986c323db89026985~mv2.jpg','https://encrypted-tbn0.gstatic.com/shopping?q=tbn:ANd9GcSSgoW7BzDY2MryfPXYwrBr_4NfpdlOjxoDbDKUQKQUBYQyQp7hfOvr4uiumlWiG6iNAxowfAF5PAV5sb29_IZar1UV9w6RvifsAV9Yz-XuBJII8AkkYOpSn3P6AYXYuysYszeZ8hy3AFo&usqp=CAc'], typesPrices: [] },
    { id: 'smo', category: 'lower', image: 'https://m.media-amazon.com/images/I/51yiLRrf50L._AC_UF1000,1000_QL80_.jpg', color: 'from-emerald-400 to-emerald-600', typesImages: ['https://www.certifiedop.com/assets/silver_websites/certified-rehab-services/twoorthosis.jpg','https://www.mobilis.ae/wp-content/uploads/2020/07/Mobilesole_Types-2.jpg'], typesPrices: [] },
    { id: 'afo', category: 'lower', image: 'https://www.crispinorthotics.com/wp-content/uploads/2023/04/JCZ00106.png', color: 'from-blue-400 to-blue-600', typesImages: ['https://www.crispinorthotics.com/wp-content/uploads/2023/04/JCZ00106.png','https://www.crispinorthotics.com/wp-content/uploads/2023/04/JCZ00111.png','https://www.crispinorthotics.com/wp-content/uploads/2023/04/JCZ00136.png','https://gencogrup.com/wp-content/uploads/2025/08/qualitysteps_orthesis_002.webp','https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQKC3_s7VI3ZbqwvQZmvikNK6gDPGgVZaAMQtdTayolkqTSEtwlF7ZxmiSXXYaeArSsGZ8&usqp=CAU'], typesPrices: ['من 1,500 ج.م', 'من 2,200 ج.م', 'من 3,500 ج.م', 'من 4,000 ج.م', 'من 1,000 ج.م'] },
    { id: 'kafo', category: 'lower', image: 'https://m.media-amazon.com/images/I/41Bsz5eptqL._SS400_.jpg', color: 'from-purple-400 to-purple-600', typesImages: ['https://images.squarespace-cdn.com/content/v1/5eedea5ef591485ebfb17cf6/1593863726354-0SROHE647ZVLC6JFM5AR/KAFO.png?format=500w','https://5.imimg.com/data5/ANDROID/Default/2022/6/DW/NO/UP/82142452/product-jpeg-1000x1000.jpg','https://www.ottobock.com/_next/image?url=https%3A%2F%2Fspa-prod-commerce.cep.ottobock.com%2Focc%2Fv2%2Fcep-medias%2F3416889_930Wx930H%2F930Wx930H%2FCEP_MEDIA_CATALOG%2FOnline&w=1600&q=75'], typesPrices: ['من 6,000 ج.م'] },
    { id: 'ko', category: 'lower', image: 'https://bauerfeind.com.au/cdn/shop/products/true_f112ba38-f47d-4aa9-af3c-9837856265d2_1400x@2x.jpg?v=1724385481', color: 'from-indigo-400 to-indigo-600', typesImages: ['https://m.media-amazon.com/images/I/61FjfYslLoL._AC_UL1200_.jpg','https://m.media-amazon.com/images/I/71bM9u1NmKL._AC_UL1200_.jpg'], typesPrices: [] },
    { id: 'hip', category: 'lower', image: 'https://www.orliman.com/wp-content/uploads/HO4001-1.jpg', color: 'from-rose-400 to-rose-600', typesImages: ['https://www.alimed.com/_resources/cache/images/product/51968_850x480-pad.jpg','https://www.alimed.com/_resources/cache/images/product/62975_850x480-pad.jpg'], typesPrices: [] },
    { id: 'cervical', category: 'spinal', image: 'https://elheekma.com/wp-content/uploads/2020/08/HJ_128-600x508.jpg', color: 'from-sky-400 to-sky-600', typesImages: ['https://elheekma.com/wp-content/uploads/2020/08/HJ_128-600x508.jpg','https://m.media-amazon.com/images/I/61HoVdFO6ZL._AC_UL1200_.jpg'], typesPrices: [] },
    { id: 'tlso', category: 'spinal', image: 'https://www.superiorbraces.com/cdn/shop/products/a14-02_1024x1024.jpeg?v=1527297450', color: 'from-violet-400 to-violet-600', typesImages: ['https://5.imimg.com/data5/SELLER/Default/2024/10/456384166/VC/YO/AO/88573415/boston-brace-1000x1000.png','https://www.bionicsorthotics.com/wp-content/uploads/2021/07/TLSO-e1658418764802.jpeg','https://m.media-amazon.com/images/I/71Gqhz8GNML._AC_UL1200_.jpg'], typesPrices: [] },
    { id: 'who', category: 'upper', image: 'https://melbournehand.com.au/wp-content/uploads/2022/12/MHR-Splint-board-animate_01.gif', color: 'from-orange-400 to-orange-600', typesImages: ['https://melbournehand.com.au/wp-content/uploads/2022/12/MHR-Splint-board-animate_01.gif','https://m.media-amazon.com/images/I/71LINb+ej1L.jpg','https://www.rehabmart.com/imagesfromrd/c-304-cock-up-wrist-splint.jpg'], typesPrices: [] },
    { id: 'eo', category: 'upper', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRqPvErzWeX7YSS-2xYKPqIBnphcstQ8vS-zQ&s', color: 'from-teal-400 to-teal-600', typesImages: ['https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRqPvErzWeX7YSS-2xYKPqIBnphcstQ8vS-zQ&s','https://m.media-amazon.com/images/I/61+CiWbhDGL._AC_UL1200_.jpg'], typesPrices: [] },
    { id: 'clubfoot', category: 'pediatric', image: 'https://thefootpractice.com/wp-content/uploads/clubfoot-child.jpg.webp', color: 'from-pink-400 to-pink-600', typesImages: ['https://images-na.ssl-images-amazon.com/images/I/61XGD7DRGHL._UL1500_.jpg','https://assets.cureus.com/uploads/figure/file/1186555/lightbox_51e94890285511ef90e94d3d7a9cf94b-Club-Foot-Ponsetti-Method.png','https://www.md-health.com/wp-content/uploads/2023/Dobbs-bar-clubfoot.jpg'], typesPrices: [] },
    { id: 'flatfoot', category: 'pediatric', image: 'https://www.drhc.ae/hubfs/Flexible-Flatfoot.webp', color: 'from-amber-400 to-amber-600', typesImages: ['https://www.spinaltech.com.au/img/thumbs/960_540_crop_70dae2_ucbl-orthosis-custom.jpg','https://5.imimg.com/data5/IOS/Default/2025/10/554630034/NX/TG/ED/72038474/product-jpeg-1000x1000.jpeg','https://image.made-in-china.com/155f0j00VBJWQiLcgDUP/Overpronation-Inner-Sole-Foot-Inserts-Arch-Support-Flat-Feet-Orthotic-Insole-for-Fallen-High-Arches.webp'], typesPrices: [] },
    { id: 'metatarsus', category: 'pediatric', image: 'https://medlineplus.gov/ency/images/ency/fullsize/9052.jpg', color: 'from-lime-400 to-lime-600', typesImages: ['https://www.vesalius.gr/wp-content/uploads/2022/07/bebax4-jpg.webp','https://m.media-amazon.com/images/I/61tXMPGblWL._AC_UL1200_.jpg'], typesPrices: [] },
    { id: 'pescavus', category: 'pediatric', image: 'https://physio2h.com/wp-content/uploads/2023/01/High-Arch-Feet-4.jpg', color: 'from-red-400 to-red-600', typesImages: ['https://i.ebayimg.com/images/g/j3QAAOSwlTheISFk/s-l1600.webp','https://www.crispinorthotics.com/wp-content/uploads/2023/04/JCZ00106.png'], typesPrices: [] }
  ];

  const orthosesData = orthosesDataMap.map(orth => {
    const data = translatedData[orth.id];
    return {
      ...orth,
      name: data?.name || '',
      englishName: '',
      description: data?.description || '',
      indications: data?.indications || [],
      types: (data?.types || []).map((tType: any, idx: number) => ({
        ...tType,
        image: orth.typesImages[idx] || '',
        price: orth.typesPrices[idx] || undefined
      }))
    };
  });

  useEffect(() => {
    document.documentElement.dir = i18n.dir();
    window.scrollTo(0, 0);
  }, [i18n.language]);

  const [activeCategory, setActiveCategory] = useState('all');
  const [expandedItem, setExpandedItem] = useState<string | null>(null);
  const [activeTypeIndex, setActiveTypeIndex] = useState<Record<string, number>>({});

  const filteredData = activeCategory === 'all' ? orthosesData : orthosesData.filter(o => o.category === activeCategory);

  const selectType = (orthId: string, idx: number) => {
    setActiveTypeIndex(prev => ({ ...prev, [orthId]: idx }));
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-bl from-medical-50 via-white to-teal-50">
          <motion.div animate={{ scale: [1, 1.2, 1] }} transition={{ duration: 8, repeat: Infinity }} className="absolute top-20 right-20 w-72 h-72 rounded-full bg-medical-200/30 blur-3xl" />
          <motion.div animate={{ scale: [1, 1.3, 1] }} transition={{ duration: 10, repeat: Infinity, delay: 1 }} className="absolute bottom-20 left-20 w-96 h-96 rounded-full bg-teal-200/20 blur-3xl" />
        </div>
        <div className="relative container mx-auto px-4 text-center">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
            <div className="inline-flex items-center gap-2 bg-teal-100 text-teal-700 px-4 py-2 rounded-full text-sm font-bold mb-4">
              <Bandage className="w-4 h-4" />
              {t('orthoses.badge')}
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
              <span className="bg-gradient-to-l from-medical-600 via-teal-600 to-emerald-600 bg-clip-text text-transparent">
                {t('orthoses.title')}
              </span>
            </h1>
            <p className="text-gray-500 text-lg max-w-2xl mx-auto mb-8">
              {t('orthoses.desc')}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Category Filter */}
      <section className="sticky top-16 z-30 bg-white/90 backdrop-blur-md shadow-sm border-b border-gray-100 py-4">
        <div className="container mx-auto px-4">
          <div className="flex justify-center gap-2 flex-wrap">
            {orthosesCategories.map(cat => (
              <motion.button
                key={cat.id}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setActiveCategory(cat.id)}
                className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-bold transition-all duration-300 ${activeCategory === cat.id
                  ? 'bg-gradient-to-l from-medical-600 to-teal-600 text-white shadow-lg shadow-medical-500/20'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
              >
                <cat.icon className="w-4 h-4" />
                {cat.label}
              </motion.button>
            ))}
          </div>
        </div>
      </section>

      {/* Orthoses Grid */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <motion.div layout className="space-y-16">
            <AnimatePresence mode="popLayout">
              {filteredData.map((orth, index) => {
                const currentTypeIdx = activeTypeIndex[orth.id] || 0;
                const currentType = orth.types[currentTypeIdx];

                return (
                  <motion.div
                    key={orth.id}
                    id={orth.id}
                    layout
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.5, delay: index * 0.05 }}
                    className="scroll-mt-36"
                  >
                    <div className="bg-white rounded-3xl shadow-lg overflow-hidden border border-gray-100 hover:shadow-xl transition-shadow duration-500">
                      <div className={`flex flex-col ${index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'} `}>
                        {/* Image Side */}
                        <div className="lg:w-2/5 relative overflow-hidden group">
                          <img src={orth.image} alt={orth.name} className="w-full h-72 lg:h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                          <div className={`absolute inset-0 bg-gradient-to-t ${orth.color} opacity-30`} />
                          <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/70 to-transparent p-6">
                            <p className="text-white/70 text-sm font-medium">{orth.englishName}</p>
                            <h3 className="text-white text-2xl font-bold">{orth.name}</h3>
                          </div>
                          <div className="absolute top-4 right-4">
                            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold bg-white/90 backdrop-blur-sm shadow-lg">
                              <Star className="w-3.5 h-3.5 text-amber-500" />
                              {orthosesCategories.find(c => c.id === orth.category)?.label}
                            </span>
                          </div>
                        </div>

                        {/* Content Side */}
                        <div className="lg:w-3/5 p-6 lg:p-8">
                          <p className="text-gray-600 leading-relaxed mb-5">{orth.description}</p>

                          {/* Indications */}
                          <div className="mb-5">
                            <h4 className="font-bold text-gray-800 text-sm mb-2 flex items-center gap-2">
                              <Info className="w-4 h-4 text-medical-500" />
                              {t('orthoses.indications')}
                            </h4>
                            <div className="flex flex-wrap gap-2">
                              {orth.indications.map((ind, idx) => (
                                <span key={idx} className="text-xs px-3 py-1.5 bg-gray-100 text-gray-700 rounded-lg font-medium">{ind}</span>
                              ))}
                            </div>
                          </div>

                          {/* Types Tabs */}
                          <div className="mb-4">
                            <h4 className="font-bold text-gray-800 text-sm mb-3">{t('orthoses.available_types')}</h4>
                            <div className="flex flex-wrap gap-2 mb-4">
                              {orth.types.map((type, idx) => (
                                <button
                                  key={idx}
                                  onClick={() => selectType(orth.id, idx)}
                                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all duration-200 ${currentTypeIdx === idx
                                    ? `bg-gradient-to-l ${orth.color} text-white shadow-md`
                                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                                    }`}
                                >
                                  {type.name.split('(')[0].trim()}
                                </button>
                              ))}
                            </div>

                            {/* Selected Type Detail */}
                            <AnimatePresence mode="wait">
                              <motion.div
                                key={`${orth.id}-${currentTypeIdx}`}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -10 }}
                                transition={{ duration: 0.2 }}
                                className="bg-gray-50 rounded-2xl p-5"
                              >
                                <div className="flex flex-col md:flex-row gap-5">
                                  <div className="md:w-1/3">
                                    <img src={currentType.image} alt={currentType.name} className="w-full h-36 object-cover rounded-xl shadow-md" />
                                  </div>
                                  <div className="md:w-2/3">
                                    <div className="flex items-center justify-between mb-2">
                                      <h5 className="font-bold text-gray-900">{currentType.name}</h5>
                                      {(currentType as any).price && (
                                        <span className="text-xs px-3 py-1 bg-green-100 text-green-700 rounded-full font-bold">{(currentType as any).price}</span>
                                      )}
                                    </div>
                                    <p className="text-gray-600 text-sm mb-3">{currentType.desc}</p>
                                    <ul className="space-y-1.5">
                                      {currentType.features.map((f, fi) => (
                                        <li key={fi} className="flex items-start gap-2 text-sm text-gray-600">
                                          <Check className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                                          {f}
                                        </li>
                                      ))}
                                    </ul>
                                  </div>
                                </div>
                              </motion.div>
                            </AnimatePresence>
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="bg-gradient-to-l from-medical-600 via-medical-700 to-teal-700 rounded-3xl p-10 md:p-14 text-center shadow-2xl shadow-medical-600/20 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 rounded-full bg-white/5 -translate-y-1/2 translate-x-1/2" />
            <div className="absolute bottom-0 left-0 w-48 h-48 rounded-full bg-white/5 translate-y-1/2 -translate-x-1/2" />
            <div className="relative z-10">
              <div className="w-16 h-16 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center mx-auto mb-5">
                <Award className="w-8 h-8 text-white" />
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">{t('orthoses.cta_title')}</h2>
              <p className="text-white/80 text-lg max-w-2xl mx-auto mb-8">
                {t('orthoses.cta_desc')}
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <a href="https://wa.me/201119056895" target="_blank" rel="noopener noreferrer">
                  <Button size="lg" className="bg-green-500 hover:bg-green-600 text-white px-8 py-3 rounded-xl text-lg shadow-xl">
                    {t('orthoses.whatsapp')}
                  </Button>
                </a>
                <Link to="/booking">
                  <Button size="lg" className="bg-white text-medical-700 hover:bg-medical-50 px-8 py-3 rounded-xl text-lg shadow-xl">
                    {t('orthoses.book_appt')}
                    <ArrowRight className="mr-2 h-5 w-5 rtl:rotate-180" />
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Orthoses;
