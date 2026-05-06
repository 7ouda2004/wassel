import React, { useState } from 'react';
import { supabase } from '@/lib/supabase';
import { egyptCenters } from '@/data/centers-database';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import Navbar from '@/components/Navbar';

export default function SeedDatabase() {
  const [isSeeding, setIsSeeding] = useState(false);
  const [progress, setProgress] = useState<string>('');

  const handleSeed = async () => {
    setIsSeeding(true);
    setProgress('بدء نقل البيانات...');

    try {
      // 1. Clear existing data
      setProgress('تنظيف قاعدة البيانات الحالية...');
      await supabase.from('specialists').delete().neq('id', '00000000-0000-0000-0000-000000000000');
      await supabase.from('centers').delete().neq('id', '00000000-0000-0000-0000-000000000000');

      // 2. Insert centers
      setProgress(`جاري نقل ${egyptCenters.length} مركز...`);
      for (const center of egyptCenters) {
        const { data: insertedCenter, error: centerError } = await supabase.from('centers').insert({
          name_ar: center.name_ar,
          name_en: center.name_en,
          phone: center.phone || '01000000000',
          whatsapp: center.whatsapp,
          username: `center_${Math.random().toString(36).substring(2, 8)}`,
          password: 'password123',
          address_ar: center.address_ar,
          address_en: center.address_en,
          governorate_ar: center.governorate_ar,
          governorate_en: center.governorate_en,
          region_ar: center.region_ar,
          region_en: center.region_en,
          image: center.image,
          rating: center.rating,
          insurance_supported: center.insurance_supported,
          services_ar: center.services_ar || [],
          services_en: center.services_en || [],
          working_hours_ar: center.workingHours_ar,
          working_hours_en: center.workingHours_en,
          is_active: true
        }).select('*').single();

        if (centerError) {
          console.error('Error inserting center:', centerError);
          continue;
        }

        // 3. Insert specialists for this center
        if (center.specialists && center.specialists.length > 0) {
          for (const spec of center.specialists) {
            await supabase.from('specialists').insert({
              center_id: insertedCenter.id,
              full_name: spec.name_ar,
              name_en: spec.name_en,
              phone: '01000000000',
              username: `spec_${Math.random().toString(36).substring(2, 8)}`,
              password: 'password123',
              specialization: spec.specialization_ar,
              specialization_en: spec.specialization_en,
              experience: spec.experience,
              rating: spec.rating,
              review_count: spec.reviewCount,
              image: spec.image,
              available: spec.available,
              is_active: true
            });
          }
        }
      }

      setProgress('تم الانتهاء بنجاح! تم نقل جميع المراكز والأخصائيين.');
      toast.success('تمت عملية النقل بنجاح!');
    } catch (err: any) {
      console.error(err);
      setProgress(`حدث خطأ: ${err.message}`);
      toast.error('حدث خطأ أثناء نقل البيانات');
    } finally {
      setIsSeeding(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-6">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8 text-center space-y-6">
        <h1 className="text-2xl font-bold text-teal-800">أداة نقل البيانات إلى Supabase</h1>
        <p className="text-gray-600">
          هذه الأداة ستقوم بنسخ جميع المراكز (28 مركز) والأخصائيين من الملفات الثابتة إلى قاعدة بيانات Supabase.
        </p>
        
        <div className="bg-blue-50 text-blue-800 p-4 rounded-lg text-sm mb-4">
          {progress || 'جاهز للبدء...'}
        </div>

        <Button 
          onClick={handleSeed} 
          disabled={isSeeding}
          className="w-full bg-teal-600 hover:bg-teal-700 text-white h-12 text-lg"
        >
          {isSeeding ? 'جاري النقل...' : 'بدء نقل البيانات الآن'}
        </Button>
      </div>
    </div>
  );
}
