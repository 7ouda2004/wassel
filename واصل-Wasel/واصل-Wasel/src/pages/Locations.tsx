import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { 
  MapPin, Phone, Clock, ChevronRight, Star, MessageSquare, 
  Plus, Check, Sparkles, PhoneCall, Calendar, X 
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter
} from "@/components/ui/dialog";
import { toast } from "sonner";
import { getLocalCenters, type Center, getLocalSpecialists, type Specialist } from '@/lib/db';

const Locations = () => {
  const [centersList, setCentersList] = useState<Center[]>([]);
  const [specialistsList, setSpecialistsList] = useState<Specialist[]>([]);
  const [expandedLocation, setExpandedLocation] = useState<string | null>(null);
  const [activeMapId, setActiveMapId] = useState<string | null>(null);
  
  // Center Details Modal State
  const [selectedCenter, setSelectedCenter] = useState<Center | null>(null);
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  // Review Form State
  const [newReviewAuthor, setNewReviewAuthor] = useState('');
  const [newReviewRating, setNewReviewRating] = useState(5);
  const [newReviewComment, setNewReviewComment] = useState('');

  useEffect(() => {
    document.documentElement.dir = 'rtl';
    document.body.classList.add('font-cairo');
    window.scrollTo(0, 0);
    setCentersList(getLocalCenters());
    setSpecialistsList(getLocalSpecialists().filter(s => s.status === 'active'));
    
    // Auto-fill patient name if logged in
    const storedPatientName = sessionStorage.getItem('patientName');
    if (storedPatientName) {
      setNewReviewAuthor(storedPatientName);
    }
  }, []);

  // Group centers by governorate (location)
  const groupedCenters = centersList.reduce((groups, center) => {
    const loc = center.location || 'أخرى';
    if (!groups[loc]) {
      groups[loc] = [];
    }
    groups[loc].push(center);
    return groups;
  }, {} as Record<string, Center[]>);

  // Handle adding a review
  const handleAddReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedCenter) return;
    
    if (!newReviewAuthor.trim() || !newReviewComment.trim()) {
      toast.error('يرجى تعبئة اسمك وكتابة التعليق أولاً');
      return;
    }

    const newReview = {
      id: Date.now().toString(),
      author: newReviewAuthor.trim(),
      rating: newReviewRating,
      comment: newReviewComment.trim(),
      date: new Date().toISOString().split('T')[0]
    };

    const updatedReviews = [newReview, ...(selectedCenter.reviews || [])];
    const updatedCenter = {
      ...selectedCenter,
      reviews: updatedReviews
    };

    // Update local state
    setSelectedCenter(updatedCenter);

    // Save back to centers list & localStorage
    const updatedCentersList = centersList.map(c => c.id === selectedCenter.id ? updatedCenter : c);
    setCentersList(updatedCentersList);
    localStorage.setItem('centers', JSON.stringify(updatedCentersList));

    // Clear form
    setNewReviewAuthor('');
    setNewReviewRating(5);
    setNewReviewComment('');
    toast.success('شكرًا لك! تم إرسال تقييمك بنجاح.');
  };

  // Helper to calculate reviews details
  const reviewsCount = selectedCenter?.reviews?.length || 0;
  const averageRating = reviewsCount > 0 
    ? (selectedCenter!.reviews!.reduce((sum, r) => sum + r.rating, 0) / reviewsCount).toFixed(1)
    : '0.0';

  // Helper to get image gallery for the selected center
  const getCenterGallery = (center: Center) => {
    return [
      center.image || '/images/ortho.png',
      'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&w=800&q=80', // Clinic setup
      'https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&w=800&q=80'  // Rehab setup
    ];
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      {/* Header Section */}
      <section className="py-20 bg-gradient-to-b from-medical-100 to-white overflow-hidden">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-block oval-header">
              <span>مراكزنا الفعالة</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              مراكز واصـل المتخصصة في مصر
            </h1>
            <p className="text-xl text-gray-600 mb-8">
              اختر محافظتك للعثور على المركز الأقرب لك. اضغط على أي مركز لعرض الصور الحية وتفاصيل الخدمات، وتصفح تقييمات المرضى أو إضافة تقييمك الخاص.
            </p>
          </div>
        </div>
      </section>

      {/* Locations Accordion Section */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="section-title">فروعنا ومواقعنا</h2>
          
          <div className="max-w-4xl mx-auto mt-12 space-y-4">
            {Object.entries(groupedCenters).map(([locationName, locationCenters]) => (
              <div 
                key={locationName} 
                className="bg-white rounded-xl shadow-sm border border-gray-200/60 overflow-hidden transition-all duration-300"
              >
                <button
                  onClick={() => {
                    setExpandedLocation(expandedLocation === locationName ? null : locationName);
                    setActiveMapId(null); // Close map when changing governorates
                  }}
                  className="w-full px-6 py-5 flex justify-between items-center bg-gradient-to-r from-medical-50/20 to-white hover:from-medical-50/50 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <MapPin className="h-6 w-6 text-medical-600" />
                    <span className="text-xl font-bold text-gray-900">{locationName}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-sm font-semibold text-medical-700 bg-medical-50 px-3 py-1 rounded-full">
                      {locationCenters.length} {locationCenters.length === 1 ? 'مركز' : 'مراكز'}
                    </span>
                    <ChevronRight className={`h-5 w-5 text-gray-400 transition-transform duration-300 ${expandedLocation === locationName ? 'rotate-90' : 'rtl:rotate-180'}`} />
                  </div>
                </button>

                {expandedLocation === locationName && (
                  <div className="p-6 bg-gray-50/30 border-t border-gray-100 space-y-6">
                    {locationCenters.map(center => {
                      const isMapOpen = activeMapId === center.id;
                      const mapUrl = center.id === '1' 
                        ? 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d13819.134309871092!2d31.20493971135394!3d30.053742635558787!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14584132d6eb5851%3A0xb19c7600694af9c5!2z2KfZhNmF2YfZhtiv2LPZitmG2Iwg2KfZhNis2YrYstip!5e0!3m2!1sar!2seg!4v1708440134399!5m2!1sar!2seg' 
                        : center.id === '2' 
                          ? 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d54803.31018606754!2d29.89121595767993!3d31.20495242201441!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14f5c3fa29b53c0f%3A0x86c62fc5d4d3865b!2z2LPYqNmI2LHYqtmG2KzYjCDYp9mE2KXYs9mD2YbYr9ix2YrYqQ!5e0!3m2!1sar!2seg!4v1708440199631!5m2!1sar!2seg' 
                          : center.id === '8' 
                            ? 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d13769.811808774256!2d31.371969111513693!3d31.040839135950583!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14f79c2b088dc6e9%3A0xb290248c326f786e!2z2KfZhNmF2YbYtdmI2LHYqdiMINin2YTZhdmG2LXZiNix2KkgKNin2YTZhdmG2LXZiNix2KkpLCDYp9mE2K_ZgtmH2YTZitip!5e0!3m2!1sar!2seg!4v1708440233144!5m2!1sar!2seg'
                            : `https://maps.google.com/maps?q=${encodeURIComponent(center.name + ' ' + center.address)}&t=&z=13&ie=UTF8&iwloc=&output=embed`;

                      // Calculate rating summary
                      const centerReviewsCount = center.reviews?.length || 0;
                      const centerAvgRating = centerReviewsCount > 0 
                        ? (center.reviews!.reduce((sum, r) => sum + r.rating, 0) / centerReviewsCount).toFixed(1)
                        : '0.0';

                      return (
                        <div key={center.id} className="bg-white p-5 rounded-xl border border-gray-200/80 shadow-sm space-y-4 hover:shadow-md transition-shadow duration-300">
                          <div className="flex flex-col md:flex-row justify-between md:items-center gap-4">
                            <div className="flex-1">
                              <div className="flex items-center gap-2 mb-2 flex-wrap">
                                <h3 className="text-xl font-bold text-gray-900">{center.name}</h3>
                                {centerReviewsCount > 0 && (
                                  <div className="flex items-center gap-1 bg-amber-50 text-amber-700 px-2 py-0.5 rounded text-xs font-semibold">
                                    <Star className="h-3 w-3 fill-amber-500 text-amber-500" />
                                    <span>{centerAvgRating}</span>
                                    <span className="text-gray-400">({centerReviewsCount})</span>
                                  </div>
                                )}
                              </div>
                              
                              <div className="space-y-2 text-sm text-gray-600">
                                <div className="flex items-start">
                                  <MapPin className="h-4 w-4 text-medical-500 ml-2 flex-shrink-0 mt-0.5" />
                                  <span>{center.address}</span>
                                </div>
                                <div className="flex items-center">
                                  <Phone className="h-4 w-4 text-medical-500 ml-2 flex-shrink-0" />
                                  <span>{center.phone}</span>
                                </div>
                                <div className="flex items-center">
                                  <Clock className="h-4 w-4 text-medical-500 ml-2 flex-shrink-0" />
                                  <span>{center.workingHours}</span>
                                </div>
                              </div>
                            </div>
                            
                            <div className="flex flex-row md:flex-col gap-2">
                              <Button 
                                variant="default"
                                onClick={() => {
                                  setSelectedCenter(center);
                                  setActiveImageIndex(0);
                                }}
                                className="text-xs bg-medical-600 hover:bg-medical-700 text-white whitespace-nowrap"
                              >
                                عرض كامل التفاصيل والتقييمات
                              </Button>
                              <div className="flex gap-2">
                                <Button 
                                  variant={isMapOpen ? "secondary" : "outline"}
                                  onClick={() => setActiveMapId(isMapOpen ? null : center.id)}
                                  className="text-xs flex-1 whitespace-nowrap"
                                >
                                  {isMapOpen ? 'إخفاء الخريطة' : 'الخريطة السريعة'}
                                </Button>
                                <a href={`tel:${center.phone}`} className="flex-1">
                                  <Button variant="secondary" className="text-xs w-full whitespace-nowrap">
                                    اتصال سريع
                                  </Button>
                                </a>
                              </div>
                            </div>
                          </div>

                          {isMapOpen && (
                            <motion.div 
                              initial={{ opacity: 0, height: 0 }}
                              animate={{ opacity: 1, height: 320 }}
                              className="w-full h-80 rounded-lg overflow-hidden border border-gray-200"
                            >
                              <iframe 
                                src={mapUrl} 
                                width="100%" 
                                height="100%" 
                                style={{ border: 0 }} 
                                allowFullScreen 
                                loading="lazy" 
                                referrerPolicy="no-referrer-when-downgrade"
                                title={center.name}
                              ></iframe>
                            </motion.div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Center Details Dialog */}
      <Dialog 
        open={!!selectedCenter} 
        onOpenChange={(open) => {
          if (!open) {
            setSelectedCenter(null);
          }
        }}
      >
        <DialogContent className="max-w-5xl max-h-[90vh] overflow-y-auto p-0 gap-0 rounded-2xl border-none shadow-2xl">
          {selectedCenter && (
            <div className="grid grid-cols-1 lg:grid-cols-12">
              
              {/* Right Side - Images & Info (7 Cols) */}
              <div className="lg:col-span-7 p-6 md:p-8 space-y-6 bg-white overflow-y-auto max-h-[90vh]">
                <DialogHeader className="text-right">
                  <div className="flex justify-between items-start">
                    <div>
                      <span className="text-xs font-bold text-medical-600 bg-medical-50 px-2 py-1 rounded-md mb-2 inline-block">
                        واصل - فرع {selectedCenter.location}
                      </span>
                      <DialogTitle className="text-2xl font-bold text-gray-900 leading-tight">
                        {selectedCenter.name}
                      </DialogTitle>
                    </div>
                  </div>
                  <DialogDescription className="text-gray-500 mt-2">
                    {selectedCenter.description}
                  </DialogDescription>
                </DialogHeader>

                {/* Photo Gallery */}
                <div className="space-y-2">
                  <div className="h-64 md:h-80 w-full rounded-xl overflow-hidden bg-gray-100 relative">
                    <img 
                      src={getCenterGallery(selectedCenter)[activeImageIndex]} 
                      alt={selectedCenter.name}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        e.currentTarget.src = "/images/ortho.png";
                      }}
                    />
                    <div className="absolute top-3 left-3 bg-black/60 text-white text-xs px-2.5 py-1 rounded-full backdrop-blur-sm">
                      {activeImageIndex + 1} / {getCenterGallery(selectedCenter).length}
                    </div>
                  </div>
                  <div className="flex gap-2 overflow-x-auto pb-1">
                    {getCenterGallery(selectedCenter).map((img, idx) => (
                      <button
                        key={idx}
                        onClick={() => setActiveImageIndex(idx)}
                        className={`h-16 w-24 rounded-lg overflow-hidden border-2 flex-shrink-0 transition-all ${
                          activeImageIndex === idx ? 'border-medical-500 scale-95 shadow-sm' : 'border-transparent hover:border-gray-300'
                        }`}
                      >
                        <img 
                          src={img} 
                          alt="معاينة" 
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            e.currentTarget.src = "/images/ortho.png";
                          }}
                        />
                      </button>
                    ))}
                  </div>
                </div>

                {/* Contact and timing Info */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-gray-50 p-4 rounded-xl border border-gray-100">
                  <div className="space-y-3">
                    <h4 className="font-bold text-gray-900 text-sm border-b pb-1.5 flex items-center gap-1.5">
                      <Sparkles className="h-4 w-4 text-medical-600" /> معلومات التواصل
                    </h4>
                    <div className="flex items-start text-xs text-gray-600 gap-2">
                      <MapPin className="h-4 w-4 text-medical-500 flex-shrink-0 mt-0.5" />
                      <span>{selectedCenter.address}</span>
                    </div>
                    <div className="flex items-center text-xs text-gray-600 gap-2">
                      <Phone className="h-4 w-4 text-medical-500 flex-shrink-0" />
                      <a href={`tel:${selectedCenter.phone}`} className="hover:underline font-mono font-bold text-medical-700">
                        {selectedCenter.phone}
                      </a>
                    </div>
                  </div>
                  <div className="space-y-3">
                    <h4 className="font-bold text-gray-900 text-sm border-b pb-1.5 flex items-center gap-1.5">
                      <Clock className="h-4 w-4 text-medical-600" /> أوقات العمل
                    </h4>
                    <div className="flex items-center text-xs text-gray-600 gap-2">
                      <Clock className="h-4 w-4 text-medical-500 flex-shrink-0" />
                      <span>{selectedCenter.workingHours}</span>
                    </div>
                    <div className="text-[10px] text-gray-400 bg-white px-2 py-1 rounded inline-block">
                      المنطقة الإدارية: {selectedCenter.region}
                    </div>
                  </div>
                </div>

                {/* Services */}
                <div className="space-y-3">
                  <h3 className="font-bold text-gray-900 text-lg">الخدمات المتوفرة بالفرع</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                    {selectedCenter.services?.map((service, index) => (
                      <div key={index} className="flex items-start gap-2 bg-medical-50/30 p-2.5 rounded-lg border border-medical-100/50">
                        <Check className="h-4 w-4 text-medical-600 mt-0.5 flex-shrink-0" />
                        <span className="text-xs text-gray-700 font-semibold">{service}</span>
                      </div>
                    ))}
                  </div>
                </div>
                {/* Medical Team at Branch */}
                <div className="space-y-3">
                  <h3 className="font-bold text-gray-900 text-lg">فريق الأخصائيين بالفرع</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {specialistsList.slice(0, 4).map((spec) => (
                      <div key={spec.id} className="flex gap-3 bg-white p-3 rounded-xl border border-gray-200/80 shadow-sm items-center hover:border-medical-300 transition-colors">
                        <img 
                          src={spec.image || '/images/new.jpg'} 
                          alt={spec.name} 
                          className="h-12 w-12 rounded-full object-cover border"
                          onError={(e) => {
                            e.currentTarget.src = "https://images.unsplash.com/photo-1622253692010-333f2da6031d?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80";
                          }}
                        />
                        <div className="flex-1 min-w-0">
                          <h4 className="font-bold text-xs text-gray-900 truncate">{spec.name}</h4>
                          <p className="text-[10px] text-gray-500 truncate">{spec.role}</p>
                        </div>
                        <Link to={`/booking?center=${selectedCenter.id}&specialist=${encodeURIComponent(spec.name)}`}>
                          <Button size="sm" className="text-[10px] h-7 bg-medical-600 hover:bg-medical-700 text-white">
                            حجز
                          </Button>
                        </Link>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Google Map Embedded Frame */}
                <div className="space-y-3">
                  <h3 className="font-bold text-gray-900 text-lg">موقع المركز بالتفصيل</h3>
                  <div className="h-64 rounded-xl overflow-hidden border bg-gray-50">
                    <iframe 
                      src={
                        selectedCenter.id === '1' 
                          ? 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d13819.134309871092!2d31.20493971135394!3d30.053742635558787!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14584132d6eb5851%3A0xb19c7600694af9c5!2z2KfZhNmF2YfZhtiv2LPZitmG2Iwg2KfZhNis2YrYstip!5e0!3m2!1sar!2seg!4v1708440134399!5m2!1sar!2seg' 
                          : selectedCenter.id === '2' 
                            ? 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d54803.31018606754!2d29.89121595767993!3d31.20495242201441!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14f5c3fa29b53c0f%3A0x86c62fc5d4d3865b!2z2LPYqNmI2LHYqtmG2KzYjCDYp9mE2KXYs9mD2YbYr9ix2YrYqQ!5e0!3m2!1sar!2seg!4v1708440199631!5m2!1sar!2seg' 
                            : selectedCenter.id === '8' 
                              ? 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d13769.811808774256!2d31.371969111513693!3d31.040839135950583!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14f79c2b088dc6e9%3A0xb290248c326f786e!2z2KfZhNmF2YbYtdmI2LHYqdiMINin2YTZhdmG2LXZiNix2KkgKNin2YTZhdmG2LXZiNix2KkpLCDYp9mE2K_ZgtmH2YTZitip!5e0!3m2!1sar!2seg!4v1708440233144!5m2!1sar!2seg'
                              : `https://maps.google.com/maps?q=${encodeURIComponent(selectedCenter.name + ' ' + selectedCenter.address)}&t=&z=13&ie=UTF8&iwloc=&output=embed`
                      } 
                      width="100%" 
                      height="100%" 
                      style={{ border: 0 }} 
                      allowFullScreen 
                      loading="lazy" 
                      title={selectedCenter.name}
                    ></iframe>
                  </div>
                </div>
              </div>

              {/* Left Side - Ratings & Reviews (5 Cols) */}
              <div className="lg:col-span-5 bg-gray-50 border-r border-gray-100 p-6 md:p-8 flex flex-col justify-between max-h-[90vh]">
                
                {/* Rating score summary */}
                <div>
                  <h3 className="font-bold text-gray-900 text-lg mb-4 flex items-center gap-2">
                    <MessageSquare className="h-5 w-5 text-medical-600" /> آراء وتقييمات المرضى
                  </h3>

                  <div className="flex items-center gap-4 bg-white p-4 rounded-xl border border-gray-200/50 mb-6 shadow-sm">
                    <div className="text-center">
                      <div className="text-4xl font-extrabold text-gray-900">{averageRating}</div>
                      <div className="text-xs text-gray-400 mt-1">من 5.0</div>
                    </div>
                    <div className="flex-1 border-r pr-4">
                      <div className="flex items-center gap-1.5">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <Star 
                            key={star} 
                            className={`h-5 w-5 ${
                              star <= Math.round(Number(averageRating))
                                ? 'text-amber-500 fill-amber-500' 
                                : 'text-gray-200'
                            }`} 
                          />
                        ))}
                      </div>
                      <div className="text-xs text-gray-500 mt-1.5">بناءً على {reviewsCount} من التقييمات الحقيقية</div>
                    </div>
                  </div>

                  {/* Reviews List */}
                  <div className="space-y-3 overflow-y-auto max-h-[220px] pr-1 mb-6">
                    {selectedCenter.reviews && selectedCenter.reviews.length > 0 ? (
                      selectedCenter.reviews.map((review) => (
                        <div key={review.id} className="bg-white p-3 rounded-lg border border-gray-100 shadow-xs">
                          <div className="flex justify-between items-start mb-1 flex-wrap gap-1">
                            <span className="text-xs font-bold text-gray-800">{review.author}</span>
                            <span className="text-[10px] text-gray-400 font-mono">{review.date}</span>
                          </div>
                          <div className="flex gap-0.5 mb-1.5">
                            {[1, 2, 3, 4, 5].map((star) => (
                              <Star 
                                key={star} 
                                className={`h-3 w-3 ${
                                  star <= review.rating 
                                    ? 'text-amber-500 fill-amber-500' 
                                    : 'text-gray-200'
                                }`} 
                              />
                            ))}
                          </div>
                          <p className="text-xs text-gray-600 leading-relaxed">{review.comment}</p>
                        </div>
                      ))
                    ) : (
                      <div className="text-center py-6 text-gray-400 text-xs">
                        لا توجد تقييمات بعد لهذا الفرع. كن أول من يكتب تقييماً!
                      </div>
                    )}
                  </div>
                </div>

                {/* Write a review form */}
                <div className="bg-white p-4 rounded-xl border border-gray-200/60 shadow-sm mt-auto">
                  <h4 className="font-bold text-gray-900 text-sm mb-3">أضف تقييمك وتجربتك</h4>
                  <form onSubmit={handleAddReview} className="space-y-3">
                    <div className="flex justify-between items-center bg-gray-50 p-2 rounded-lg border border-gray-100">
                      <span className="text-xs font-bold text-gray-600">اختر التقييم:</span>
                      <div className="flex gap-1">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <button
                            type="button"
                            key={star}
                            onClick={() => setNewReviewRating(star)}
                            className="focus:outline-none transition-transform active:scale-95"
                          >
                            <Star 
                              className={`h-5 w-5 ${
                                star <= newReviewRating 
                                  ? 'text-amber-500 fill-amber-500' 
                                  : 'text-gray-300'
                              }`} 
                            />
                          </button>
                        ))}
                      </div>
                    </div>
                    <div>
                      <Input
                        type="text"
                        placeholder="اسمك الكامل"
                        value={newReviewAuthor}
                        onChange={(e) => setNewReviewAuthor(e.target.value)}
                        className="text-xs h-8"
                        required
                      />
                    </div>
                    <div>
                      <Textarea
                        placeholder="اكتب تفاصيل تجربتك مع المركز هنا..."
                        value={newReviewComment}
                        onChange={(e) => setNewReviewComment(e.target.value)}
                        className="text-xs min-h-[60px]"
                        required
                      />
                    </div>
                    <Button 
                      type="submit" 
                      className="w-full text-xs h-8 bg-amber-500 hover:bg-amber-600 text-white"
                    >
                      إرسال التقييم
                    </Button>
                  </form>
                </div>

                {/* Call & Booking Actions */}
                <div className="grid grid-cols-2 gap-2 mt-4 pt-4 border-t border-gray-200/80">
                  <Link to="/booking" className="w-full">
                    <Button className="w-full text-xs bg-medical-600 hover:bg-medical-700 text-white flex items-center justify-center gap-1">
                      <Calendar className="h-4 w-4" /> حجز موعد سريع
                    </Button>
                  </Link>
                  <a href={`tel:${selectedCenter.phone}`} className="w-full">
                    <Button variant="outline" className="w-full text-xs flex items-center justify-center gap-1 border-medical-200 text-medical-800 hover:bg-medical-50">
                      <PhoneCall className="h-4 w-4" /> اتصال مباشر
                    </Button>
                  </a>
                </div>

              </div>

            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Find Nearest Branch Map */}
      <section className="py-20 bg-medical-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="section-title">ابحث عن أقرب مركز</h2>
            
            <div className="relative h-[500px] mt-12 rounded-lg overflow-hidden shadow-xl">
              <iframe 
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3456035.7335417513!2d28.26171635!3d29.2400254!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14368976c35c36e9%3A0x2c45a00925c4c444!2z2YXYtdix!5e0!3m2!1sar!2seg!4v1708440300058!5m2!1sar!2seg" 
                width="100%" 
                height="100%" 
                style={{ border: 0 }} 
                allowFullScreen 
                loading="lazy" 
                referrerPolicy="no-referrer-when-downgrade"
                title="خريطة مراكز واصل"
              ></iframe>
            </div>
            
            <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white p-6 rounded-lg shadow-md">
                <div className="h-12 w-12 rounded-full bg-medical-100 flex items-center justify-center mb-4">
                  <img 
                    src="https://img.icons8.com/color/48/000000/marker.png" 
                    alt="تحديد الموقع" 
                    className="h-6 w-6"
                  />
                </div>
                <h3 className="text-lg font-semibold mb-2">تحديد الموقع</h3>
                <p className="text-gray-600">
                  اسمح لنا بتحديد موقعك الحالي لمساعدتك في العثور على أقرب مركز إليك.
                </p>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-md">
                <div className="h-12 w-12 rounded-full bg-medical-100 flex items-center justify-center mb-4">
                  <img 
                    src="https://img.icons8.com/color/48/000000/search-location.png" 
                    alt="العثور على المركز" 
                    className="h-6 w-6"
                  />
                </div>
                <h3 className="text-lg font-semibold mb-2">العثور على المركز</h3>
                <p className="text-gray-600">
                  سنقوم بتحديد أقرب مركز إليك وتزويدك بالاتجاهات والمعلومات اللازمة.
                </p>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-md">
                <div className="h-12 w-12 rounded-full bg-medical-100 flex items-center justify-center mb-4">
                  <img 
                    src="https://img.icons8.com/color/48/000000/calendar--v1.png" 
                    alt="حجز موعد" 
                    className="h-6 w-6"
                  />
                </div>
                <h3 className="text-lg font-semibold mb-2">حجز موعد</h3>
                <p className="text-gray-600">
                  بعد تحديد المركز، يمكنك حجز موعد بسهولة عبر الهاتف أو عبر الإنترنت.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Home Visits */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="bg-medical-50 rounded-xl overflow-hidden shadow-md">
              <div className="md:flex">
                <div className="md:w-1/2">
                  <img 
                    src="https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" 
                    alt="زيارات منزلية" 
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-8 md:w-1/2">
                  <h2 className="text-3xl font-bold mb-4">خدمة الزيارات المنزلية</h2>
                  <p className="text-gray-600 mb-6">
                    لا تستطيع الوصول إلى أحد مراكزنا؟ نقدم خدمة الزيارات المنزلية للحالات الخاصة
                    في مناطق محددة. فريقنا المتخصص سيأتي إليك لتقديم الخدمة المطلوبة.
                  </p>
                  
                  <h3 className="font-semibold text-lg mb-3">مناطق تغطية الزيارات المنزلية:</h3>
                  <ul className="space-y-2 mb-6">
                    <li className="flex items-center">
                      <span className="h-2 w-2 bg-medical-500 rounded-full mr-2"></span>
                      <span>القاهرة الكبرى</span>
                    </li>
                    <li className="flex items-center">
                      <span className="h-2 w-2 bg-medical-500 rounded-full mr-2"></span>
                      <span>الإسكندرية</span>
                    </li>
                    <li className="flex items-center">
                      <span className="h-2 w-2 bg-medical-500 rounded-full mr-2"></span>
                      <span>المنصورة ومحيطها</span>
                    </li>
                  </ul>
                  
                  <div className="mt-6">
                    <a href="https://wa.me/201119056895" target="_blank" rel="noopener noreferrer">
                      <Button className="medical-btn">
                        طلب زيارة منزلية
                        <ChevronRight className="mr-2 h-4 w-4 rtl:rotate-180" />
                      </Button>
                    </a>
                  </div>
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
              زورنا اليوم للحصول على استشارة مجانية
            </h2>
            <p className="text-medical-100 text-lg mb-8">
              فريقنا المتخصص في انتظارك في جميع مراكزنا. تواصل معنا لحجز موعد أو الاستفسار عن خدماتنا.
            </p>
            <Link to="/contact">
              <Button size="lg" className="bg-white text-medical-700 hover:bg-medical-50 px-6 py-6">
                تواصل معنا
                <ChevronRight className="mr-2 h-5 w-5 rtl:rotate-180" />
              </Button>
            </Link>
          </div>
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default Locations;