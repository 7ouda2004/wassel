import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select } from '@/components/ui/select';
import { Card } from '@/components/ui/card';
import { toast } from '@/hooks/use-toast';
import { format } from 'date-fns';
import { ar } from 'date-fns/locale';
import { getLocalCenters, type Center } from '@/lib/db';

const Booking = () => {
  const [centersList, setCentersList] = useState<Center[]>([]);

  useEffect(() => {
    document.documentElement.dir = 'rtl';
    document.body.classList.add('font-cairo');
    setCentersList(getLocalCenters());
  }, []);

  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    center: '',
    date: format(new Date(), 'yyyy-MM-dd'),
    time: '09:00',
    type: 'معاينة',
    notes: ''
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.center) {
      toast.error('يرجى اختيار المركز');
      return;
    }
    // Here you would typically send the data to your backend
    console.log('Booking data:', formData);
    toast.success('تم حجز موعدك بنجاح');
    setFormData({
      name: '',
      phone: '',
      email: '',
      center: '',
      date: format(new Date(), 'yyyy-MM-dd'),
      time: '09:00',
      type: 'معاينة',
      notes: ''
    });
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 20 }}
        className="flex-grow container mx-auto px-4 py-8"
      >
        <h1 className="text-3xl font-bold text-center mb-8">حجز موعد</h1>

        <Card className="max-w-2xl mx-auto p-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <Label htmlFor="name">الاسم الكامل</Label>
              <Input
                id="name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                required
              />
            </div>

            <div>
              <Label htmlFor="phone">رقم الهاتف</Label>
              <Input
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                required
              />
            </div>

            <div>
              <Label htmlFor="email">البريد الإلكتروني</Label>
              <Input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleInputChange}
              />
            </div>

            <div>
              <Label htmlFor="center">اختر المركز *</Label>
              <select
                id="center"
                name="center"
                value={formData.center}
                onChange={handleInputChange}
                className="w-full rounded-md border border-gray-300 p-2 focus:ring-2 focus:ring-medical-500 focus:border-transparent"
                required
              >
                <option value="" disabled>-- اختر المركز --</option>
                {centersList.map(center => (
                  <option key={center.id} value={center.id}>
                    {center.name} - {center.location}
                  </option>
                ))}
              </select>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="date">التاريخ</Label>
                <Input
                  id="date"
                  name="date"
                  type="date"
                  value={formData.date}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div>
                <Label htmlFor="time">الوقت</Label>
                <Input
                  id="time"
                  name="time"
                  type="time"
                  value={formData.time}
                  onChange={handleInputChange}
                  required
                />
              </div>
            </div>

            <div>
              <Label htmlFor="type">نوع الموعد</Label>
              <select
                id="type"
                name="type"
                value={formData.type}
                onChange={handleInputChange}
                className="w-full rounded-md border border-gray-300 p-2 focus:ring-2 focus:ring-medical-500 focus:border-transparent"
                required
              >
                <option value="معاينة" className="p-2">
                  معاينة - الكشف الأولي وتقييم الحالة
                </option>
                <option value="قياس" className="p-2">
                  قياس - أخذ المقاسات وتحديد المواصفات المطلوبة
                </option>
                <option value="تركيب" className="p-2">
                  تركيب - تجربة وتركيب الجهاز التعويضي أو التقويمي
                </option>
                <option value="متابعة" className="p-2">
                  متابعة - فحص دوري للتأكد من كفاءة الجهاز
                </option>
                <option value="صيانة" className="p-2">
                  صيانة - إصلاح أو تعديل الجهاز الحالي
                </option>
              </select>
            </div>

            <div>
              <Label htmlFor="notes">ملاحظات إضافية</Label>
              <Textarea
                id="notes"
                name="notes"
                value={formData.notes}
                onChange={handleInputChange}
                rows={3}
              />
            </div>

            <Button type="submit" className="w-full medical-btn">
              تأكيد الحجز
            </Button>
          </form>
        </Card>
      </motion.div>

      <Footer />
    </div>
  );
};

export default Booking;