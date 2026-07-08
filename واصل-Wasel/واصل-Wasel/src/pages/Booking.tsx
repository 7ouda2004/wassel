import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card } from '@/components/ui/card';
import { toast } from 'sonner';
import { format } from 'date-fns';
import { getLocalCenters, getLocalSpecialists, type Center, type Specialist } from '@/lib/db';
import { Calendar, Clock, User, HeartHandshake, CheckCircle2, ChevronLeft } from 'lucide-react';

const timeSlots = [
  { value: '09:00', label: '09:00 ص' },
  { value: '10:30', label: '10:30 ص' },
  { value: '12:00', label: '12:00 م' },
  { value: '14:00', label: '02:00 م' },
  { value: '15:30', label: '03:30 م' },
  { value: '17:00', label: '05:00 م' },
  { value: '18:30', label: '06:30 م' },
  { value: '20:00', label: '08:00 م' }
];

const Booking = () => {
  const [centersList, setCentersList] = useState<Center[]>([]);
  const [specialistsList, setSpecialistsList] = useState<Specialist[]>([]);
  const [selectedCenter, setSelectedCenter] = useState<Center | null>(null);
  const [selectedSpecialist, setSelectedSpecialist] = useState<Specialist | null>(null);
  const [selectedTime, setSelectedTime] = useState<string>('09:00');
  
  const [formData, setFormData] = useState({
    name: sessionStorage.getItem('patientName') || '',
    phone: sessionStorage.getItem('patientPhone') || '',
    email: '',
    date: format(new Date(), 'yyyy-MM-dd'),
    type: 'معاينة',
    notes: ''
  });

  useEffect(() => {
    document.documentElement.dir = 'rtl';
    document.body.classList.add('font-cairo');
    
    const activeCenters = getLocalCenters().filter(c => c.status === 'active');
    const activeSpecs = getLocalSpecialists().filter(s => s.status === 'active');
    
    setCentersList(activeCenters);
    setSpecialistsList(activeSpecs);

    // Parse URL params
    const params = new URLSearchParams(window.location.search);
    const centerParam = params.get('center');
    const specialistParam = params.get('specialist');
    
    if (centerParam) {
      const center = activeCenters.find(c => c.id === centerParam);
      if (center) setSelectedCenter(center);
    }

    if (specialistParam) {
      const spec = activeSpecs.find(s => s.id === specialistParam);
      if (spec) setSelectedSpecialist(spec);
    }
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleCenterSelect = (centerId: string) => {
    const center = centersList.find(c => c.id === centerId) || null;
    setSelectedCenter(center);
    setSelectedSpecialist(null); // Reset specialist when center changes
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedCenter) {
      toast.error('يرجى اختيار المركز المعتمد');
      return;
    }

    const bookingPayload = {
      ...formData,
      centerId: selectedCenter.id,
      centerName: selectedCenter.name,
      specialistId: selectedSpecialist?.id || '',
      specialistName: selectedSpecialist?.name || 'أي أخصائي متاح',
      time: selectedTime
    };

    console.log('Booking submitted successfully:', bookingPayload);
    toast.success('تم حجز موعدك بنجاح! تم إرسال رسالة لتأكيد الحجز.');
    
    // Clear Form
    setFormData({
      name: '',
      phone: '',
      email: '',
      date: format(new Date(), 'yyyy-MM-dd'),
      type: 'معاينة',
      notes: ''
    });
    setSelectedCenter(null);
    setSelectedSpecialist(null);
    setSelectedTime('09:00');
  };

  // Filter specialists for the selected center
  const centerSpecialists = selectedCenter 
    ? specialistsList.filter(s => s.centerId === selectedCenter.id)
    : [];

  return (
    <div className="min-h-screen flex flex-col bg-gray-50/50">
      <Navbar />

      <main className="flex-grow container mx-auto px-4 py-12">
        <div className="max-w-3xl mx-auto text-center mb-8">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="inline-block py-1.5 px-4 bg-medical-50 text-medical-700 rounded-full text-xs font-bold mb-3 border border-medical-100"
          >
            حجز الكشف الحركي والقياسات
          </motion.div>
          <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 font-cairo">حجز موعد جديد</h1>
          <p className="text-gray-500 mt-2 text-sm font-semibold">اختر الفرع القريب منك والأخصائي المفضل وحدد موعداً وسنقوم بالتواصل معك فوراً.</p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="max-w-2xl mx-auto"
        >
          <Card className="p-6 md:p-8 shadow-md border-gray-100 bg-white rounded-2xl">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Patient Basic Info */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name" className="text-sm font-bold text-gray-800">الاسم الكامل *</Label>
                  <Input
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="أدخل اسمك بالكامل"
                    required
                    className="border-gray-200 focus-visible:ring-medical-500"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone" className="text-sm font-bold text-gray-800">رقم الهاتف للتواصل *</Label>
                  <Input
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    placeholder="رقم الهاتف المحمول"
                    required
                    className="border-gray-200 focus-visible:ring-medical-500"
                  />
                </div>
              </div>

              {/* Center Selection */}
              <div className="space-y-2">
                <Label htmlFor="center" className="text-sm font-bold text-gray-800">اختر الفرع / المركز المعتمد *</Label>
                <select
                  id="center"
                  name="center"
                  value={selectedCenter?.id || ''}
                  onChange={(e) => handleCenterSelect(e.target.value)}
                  className="w-full rounded-lg border border-gray-200 bg-white p-2.5 text-sm font-bold text-gray-700 focus:outline-none focus:ring-2 focus:ring-medical-500 focus:border-transparent"
                  required
                >
                  <option value="">-- اختر الفرع --</option>
                  {centersList.map(center => (
                    <option key={center.id} value={center.id}>
                      {center.name} ({center.location})
                    </option>
                  ))}
                </select>
              </div>

              {/* Specialist Selection (Interactive Carousel) */}
              <AnimatePresence mode="wait">
                {selectedCenter && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3 }}
                    className="space-y-3 pt-2 border-t border-gray-100"
                  >
                    <Label className="text-sm font-bold text-gray-800 block">اختر الأخصائي المفضل (اختياري)</Label>
                    
                    {centerSpecialists.length > 0 ? (
                      <div className="grid grid-cols-2 gap-3">
                        {/* Auto Match Card */}
                        <div
                          onClick={() => setSelectedSpecialist(null)}
                          className={`p-3 rounded-xl border-2 text-center cursor-pointer transition-all duration-200 flex flex-col items-center justify-center ${
                            selectedSpecialist === null 
                              ? 'border-medical-500 bg-medical-50/20' 
                              : 'border-gray-150 bg-gray-50/50 hover:bg-gray-50'
                          }`}
                        >
                          <div className="h-10 w-10 rounded-full bg-medical-100 flex items-center justify-center mb-2">
                            <HeartHandshake className="h-5 w-5 text-medical-600" />
                          </div>
                          <h4 className="text-xs font-bold text-gray-800">أي أخصائي متاح</h4>
                          <p className="text-[10px] text-gray-400 mt-0.5">سيتم اختيار الأخصائي الأسرع رداً</p>
                        </div>

                        {/* Specialists Cards */}
                        {centerSpecialists.map(spec => (
                          <div
                            key={spec.id}
                            onClick={() => setSelectedSpecialist(spec)}
                            className={`p-3 rounded-xl border-2 text-center cursor-pointer transition-all duration-200 flex flex-col items-center ${
                              selectedSpecialist?.id === spec.id
                                ? 'border-medical-500 bg-medical-50/20 shadow-xs'
                                : 'border-gray-150 bg-gray-50/50 hover:bg-gray-50'
                            }`}
                          >
                            <img
                              src={spec.image || '/images/new.jpg'}
                              alt={spec.name}
                              className="h-10 w-10 rounded-full object-cover border-2 border-white mb-2"
                              onError={(e) => { e.currentTarget.src = '/images/new.jpg'; }}
                            />
                            <h4 className="text-xs font-bold text-gray-800 line-clamp-1">{spec.name}</h4>
                            <p className="text-[10px] text-gray-400 mt-0.5 line-clamp-1">{spec.role}</p>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="p-3 bg-gray-50 rounded-xl text-center border">
                        <p className="text-xs text-gray-500">لا يوجد أخصائيون معينون في هذا الفرع حالياً، سيقوم أخصائي المركز الرئيسي بالتواصل معك.</p>
                      </div>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Date & Type */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 border-t pt-4 border-gray-100">
                <div className="space-y-2">
                  <Label htmlFor="date" className="text-sm font-bold text-gray-800 flex items-center gap-1.5">
                    <Calendar className="h-4 w-4 text-medical-600" />
                    تاريخ الزيارة
                  </Label>
                  <Input
                    id="date"
                    name="date"
                    type="date"
                    value={formData.date}
                    onChange={handleInputChange}
                    required
                    className="border-gray-200 focus-visible:ring-medical-500"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="type" className="text-sm font-bold text-gray-800">نوع الموعد المطلوب</Label>
                  <select
                    id="type"
                    name="type"
                    value={formData.type}
                    onChange={handleInputChange}
                    className="w-full rounded-lg border border-gray-200 bg-white p-2.5 text-sm font-bold text-gray-700 focus:outline-none focus:ring-2 focus:ring-medical-500 focus:border-transparent"
                    required
                  >
                    <option value="معاينة">معاينة - كشف وتقييم أولي</option>
                    <option value="قياس">قياس - أخذ المقاسات بالتفصيل</option>
                    <option value="تركيب">تركيب - تجربة وضبط المقاس</option>
                    <option value="متابعة">متابعة - صيانة وفحص دوري</option>
                  </select>
                </div>
              </div>

              {/* Time Slots Selection Grid */}
              <div className="space-y-2 border-t pt-4 border-gray-100">
                <Label className="text-sm font-bold text-gray-800 flex items-center gap-1.5 mb-2">
                  <Clock className="h-4 w-4 text-medical-600" />
                  اختر وقت الزيارة المفضل
                </Label>
                
                <div className="grid grid-cols-4 gap-2">
                  {timeSlots.map(slot => (
                    <div
                      key={slot.value}
                      onClick={() => setSelectedTime(slot.value)}
                      className={`py-2 px-1 rounded-lg text-center font-bold text-xs cursor-pointer border-2 transition-all duration-150 ${
                        selectedTime === slot.value
                          ? 'bg-medical-600 text-white border-medical-600 shadow-sm'
                          : 'bg-gray-50 border-gray-100 hover:bg-gray-100 text-gray-700'
                      }`}
                    >
                      {slot.label}
                    </div>
                  ))}
                </div>
              </div>

              {/* Notes */}
              <div className="space-y-2">
                <Label htmlFor="notes" className="text-sm font-bold text-gray-800">ملاحظات إضافية أو تفاصيل الحالة</Label>
                <Textarea
                  id="notes"
                  name="notes"
                  value={formData.notes}
                  onChange={handleInputChange}
                  placeholder="اكتب هنا أي تفاصيل أو متطلبات خاصة بالزيارة..."
                  rows={3}
                  className="border-gray-200 focus-visible:ring-medical-500"
                />
              </div>

              {/* Submit */}
              <Button type="submit" className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-3 text-sm rounded-xl transition-all duration-300">
                تأكيد حجز الموعد
              </Button>
            </form>
          </Card>
        </motion.div>
      </main>

      <Footer />
    </div>
  );
};

export default Booking;