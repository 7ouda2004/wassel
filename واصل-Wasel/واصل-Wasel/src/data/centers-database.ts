// ========================================
// Wasel Platform - 28 Prosthetic Centers Database
// Connected to Egypt's Unified Procurement System (الشراء الموحد)
// One integrated center per governorate
// ========================================

export interface Specialist {
  id: string;
  name_ar: string;
  name_en: string;
  title_ar: string;
  title_en: string;
  specialization_ar: string;
  specialization_en: string;
  rating: number;
  reviewCount: number;
  experience: number;
  image: string;
  available: boolean;
}

export interface GovernorateCenter {
  id: string;
  name_ar: string;
  name_en: string;
  governorate_ar: string;
  governorate_en: string;
  region_ar: string;
  region_en: string;
  address_ar: string;
  address_en: string;
  phone: string;
  whatsapp: string;
  workingHours_ar: string;
  workingHours_en: string;
  image: string;
  insurance_supported: boolean;
  supported_insurers: string[];
  rating: number;
  specialists: Specialist[];
  services_ar: string[];
  services_en: string[];
}

const specialistImages = [
  '../images/mahmoud.jpg',
  '../images/mahmoud.jpg',
  '../images/nader.jpeg',
  '../images/bassel.jpg',
  '../images/mahmoud.jpg',
  '../images/youssef.jpg',
];

const centerImages = [
  'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=800&q=80',
  'https://images.unsplash.com/photo-1586773860418-d37222d8fce3?w=800&q=80',
  'https://images.unsplash.com/photo-1629909613654-28e377c37b09?w=800&q=80',
  'https://images.unsplash.com/photo-1551190822-a9333d879b1f?w=800&q=80',
  'https://images.unsplash.com/photo-1538108149393-fbbd81895907?w=800&q=80',
  'https://images.unsplash.com/photo-1631217868264-e5b90bb7e133?w=800&q=80',
  'https://images.unsplash.com/photo-1516549655169-df83a0774514?w=800&q=80',
];

const insurers = [
  'التأمين الصحي الشامل',
  'الشراء الموحد',
  'هيئة التأمين الصحي',
  'مصر للتأمين',
  'أليانز مصر',
  'بوبا',
  'متلايف',
];

const servicesAr = [
  'أطراف صناعية تحت الركبة',
  'أطراف صناعية فوق الركبة',
  'أطراف صناعية للطرف العلوي',
  'جبائر طبية AFO',
  'جبائر طبية KAFO',
  'جبائر عمود فقري',
  'أحذية طبية ونعال',
  'إعادة تأهيل',
  'صيانة وإصلاح الأجهزة',
];

const servicesEn = [
  'Below-Knee Prosthetics',
  'Above-Knee Prosthetics',
  'Upper Limb Prosthetics',
  'AFO Orthoses',
  'KAFO Orthoses',
  'Spinal Orthoses',
  'Medical Shoes & Insoles',
  'Rehabilitation',
  'Device Maintenance & Repair',
];

interface GovData {
  gov_ar: string;
  gov_en: string;
  region_ar: string;
  region_en: string;
  address_ar: string;
  address_en: string;
  phone: string;
}

const governorates: GovData[] = [
  { gov_ar: 'القاهرة', gov_en: 'Cairo', region_ar: 'القاهرة الكبرى', region_en: 'Greater Cairo', address_ar: 'شارع القصر العيني، وسط البلد', address_en: 'Qasr El Ainy St, Downtown', phone: '02-2345-6789' },
  { gov_ar: 'الجيزة', gov_en: 'Giza', region_ar: 'القاهرة الكبرى', region_en: 'Greater Cairo', address_ar: 'شارع الهرم، الجيزة', address_en: 'Haram St, Giza', phone: '02-3456-7890' },
  { gov_ar: 'الإسكندرية', gov_en: 'Alexandria', region_ar: 'الإسكندرية', region_en: 'Alexandria', address_ar: 'شارع الكورنيش، سموحة', address_en: 'Corniche Rd, Smouha', phone: '03-4567-8901' },
  { gov_ar: 'القليوبية', gov_en: 'Qalyubia', region_ar: 'القاهرة الكبرى', region_en: 'Greater Cairo', address_ar: 'شارع أحمد عرابي، بنها', address_en: 'Ahmed Orabi St, Banha', phone: '013-234-5678' },
  { gov_ar: 'الدقهلية', gov_en: 'Dakahlia', region_ar: 'الدلتا', region_en: 'Delta', address_ar: 'شارع الجمهورية، المنصورة', address_en: 'El Gomhoria St, Mansoura', phone: '050-234-5678' },
  { gov_ar: 'الشرقية', gov_en: 'Sharqia', region_ar: 'الدلتا', region_en: 'Delta', address_ar: 'شارع الجيش، الزقازيق', address_en: 'El Geish St, Zagazig', phone: '055-234-5678' },
  { gov_ar: 'الغربية', gov_en: 'Gharbia', region_ar: 'الدلتا', region_en: 'Delta', address_ar: 'شارع البحر، طنطا', address_en: 'El Bahr St, Tanta', phone: '040-234-5678' },
  { gov_ar: 'كفر الشيخ', gov_en: 'Kafr El Sheikh', region_ar: 'الدلتا', region_en: 'Delta', address_ar: 'شارع الجمهورية، كفر الشيخ', address_en: 'El Gomhoria St, Kafr El Sheikh', phone: '047-234-5678' },
  { gov_ar: 'المنوفية', gov_en: 'Menoufia', region_ar: 'الدلتا', region_en: 'Delta', address_ar: 'شارع جمال عبد الناصر، شبين الكوم', address_en: 'Gamal Abdel Nasser St, Shebin El Kom', phone: '048-234-5678' },
  { gov_ar: 'البحيرة', gov_en: 'Beheira', region_ar: 'الدلتا', region_en: 'Delta', address_ar: 'شارع التحرير، دمنهور', address_en: 'Tahrir St, Damanhour', phone: '045-234-5678' },
  { gov_ar: 'دمياط', gov_en: 'Damietta', region_ar: 'الدلتا', region_en: 'Delta', address_ar: 'شارع كورنيش النيل، دمياط', address_en: 'Nile Corniche, Damietta', phone: '057-234-5678' },
  { gov_ar: 'بورسعيد', gov_en: 'Port Said', region_ar: 'القناة', region_en: 'Canal', address_ar: 'شارع 23 يوليو، بورسعيد', address_en: '23 July St, Port Said', phone: '066-234-5678' },
  { gov_ar: 'الإسماعيلية', gov_en: 'Ismailia', region_ar: 'القناة', region_en: 'Canal', address_ar: 'شارع محمد علي، الإسماعيلية', address_en: 'Mohamed Ali St, Ismailia', phone: '064-234-5678' },
  { gov_ar: 'السويس', gov_en: 'Suez', region_ar: 'القناة', region_en: 'Canal', address_ar: 'شارع الجيش، السويس', address_en: 'El Geish St, Suez', phone: '062-234-5678' },
  { gov_ar: 'الفيوم', gov_en: 'Fayoum', region_ar: 'الصعيد', region_en: 'Upper Egypt', address_ar: 'شارع الحرية، الفيوم', address_en: 'El Horriya St, Fayoum', phone: '084-234-5678' },
  { gov_ar: 'بني سويف', gov_en: 'Beni Suef', region_ar: 'الصعيد', region_en: 'Upper Egypt', address_ar: 'شارع النيل، بني سويف', address_en: 'Nile St, Beni Suef', phone: '082-234-5678' },
  { gov_ar: 'المنيا', gov_en: 'Minya', region_ar: 'الصعيد', region_en: 'Upper Egypt', address_ar: 'شارع كورنيش النيل، المنيا', address_en: 'Nile Corniche, Minya', phone: '086-234-5678' },
  { gov_ar: 'أسيوط', gov_en: 'Asyut', region_ar: 'الصعيد', region_en: 'Upper Egypt', address_ar: 'شارع الجمهورية، أسيوط', address_en: 'El Gomhoria St, Asyut', phone: '088-234-5678' },
  { gov_ar: 'سوهاج', gov_en: 'Sohag', region_ar: 'الصعيد', region_en: 'Upper Egypt', address_ar: 'شارع النيل، سوهاج', address_en: 'Nile St, Sohag', phone: '093-234-5678' },
  { gov_ar: 'قنا', gov_en: 'Qena', region_ar: 'الصعيد', region_en: 'Upper Egypt', address_ar: 'شارع بورسعيد، قنا', address_en: 'Port Said St, Qena', phone: '096-234-5678' },
  { gov_ar: 'الأقصر', gov_en: 'Luxor', region_ar: 'الصعيد', region_en: 'Upper Egypt', address_ar: 'شارع خالد بن الوليد، الأقصر', address_en: 'Khalid Ibn El Walid St, Luxor', phone: '095-234-5678' },
  { gov_ar: 'أسوان', gov_en: 'Aswan', region_ar: 'الصعيد', region_en: 'Upper Egypt', address_ar: 'شارع كورنيش النيل، أسوان', address_en: 'Nile Corniche, Aswan', phone: '097-234-5678' },
  { gov_ar: 'البحر الأحمر', gov_en: 'Red Sea', region_ar: 'البحر الأحمر', region_en: 'Red Sea', address_ar: 'شارع النصر، الغردقة', address_en: 'El Nasr St, Hurghada', phone: '065-234-5678' },
  { gov_ar: 'الوادي الجديد', gov_en: 'New Valley', region_ar: 'الصعيد', region_en: 'Upper Egypt', address_ar: 'شارع الوادي، الخارجة', address_en: 'El Wadi St, Kharga', phone: '092-234-5678' },
  { gov_ar: 'مطروح', gov_en: 'Matrouh', region_ar: 'الساحل الشمالي', region_en: 'North Coast', address_ar: 'شارع الإسكندرية، مرسى مطروح', address_en: 'Alexandria St, Marsa Matrouh', phone: '046-234-5678' },
  { gov_ar: 'شمال سيناء', gov_en: 'North Sinai', region_ar: 'سيناء', region_en: 'Sinai', address_ar: 'شارع الجيش، العريش', address_en: 'El Geish St, Arish', phone: '068-234-5678' },
  { gov_ar: 'جنوب سيناء', gov_en: 'South Sinai', region_ar: 'سيناء', region_en: 'Sinai', address_ar: 'شارع السلام، الطور', address_en: 'El Salam St, El Tur', phone: '069-234-5678' },
  { gov_ar: 'الأقصر', gov_en: 'Luxor 2', region_ar: 'الصعيد', region_en: 'Upper Egypt', address_ar: 'شارع التلفزيون، الأقصر', address_en: 'Television St, Luxor', phone: '095-345-6789' },
];

// Remove duplicate Luxor, use 28 unique entries
const uniqueGovernorates = governorates.slice(0, 28);
// Replace last duplicate with proper entry
uniqueGovernorates[27] = {
  gov_ar: 'أسوان الجديدة',
  gov_en: 'New Aswan',
  region_ar: 'الصعيد',
  region_en: 'Upper Egypt',
  address_ar: 'المدينة الجديدة، أسوان',
  address_en: 'New City, Aswan',
  phone: '097-345-6789',
};

const specialistNames = [
  { ar: 'د. محمود إبراهيم', en: 'Dr. Mahmoud Ebrahim', spec_ar: 'أطراف صناعية تحت الركبة', spec_en: 'Below-Knee Prosthetics' },
  { ar: 'د. محمد سلطان', en: 'Dr. Mohammed Sultan ', spec_ar: 'أطراف صناعية فوق الركبة', spec_en: 'Above-Knee Prosthetics' },
  { ar: 'د. نادر ابراهيم', en: 'Dr. Nader Ibrahim ', spec_ar: 'جبائر طبية وأجهزة تقويمية', spec_en: 'Orthotics & Braces' },
  { ar: 'د. باسل هاني', en: 'Dr. Bassel Hany', spec_ar: 'أطراف صناعية للطرف العلوي', spec_en: 'Upper Limb Prosthetics' },
  { ar: 'د. محمد احمد', en: 'Dr. Mohammed Ahmed ', spec_ar: 'أحذية طبية وتقويم القدم', spec_en: 'Medical Footwear & Orthotics' },
  { ar: 'د. يوسف احمد', en: 'Dr. Youssef Ahmed', spec_ar: 'إعادة تأهيل وعلاج طبيعي', spec_en: 'Rehabilitation & Physiotherapy' },
];

export const egyptCenters: GovernorateCenter[] = uniqueGovernorates.map((gov, idx) => {
  const numSpecialists = 3 + (idx % 3); // 3-5 specialists per center
  const specialists: Specialist[] = [];

  for (let i = 0; i < numSpecialists; i++) {
    const sIdx = (idx + i) % specialistNames.length;
    const s = specialistNames[sIdx];
    specialists.push({
      id: `spec-${idx}-${i}`,
      name_ar: s.ar,
      name_en: s.en,
      title_ar: 'أخصائي أطراف صناعية وأجهزة تقويمية',
      title_en: 'Prosthetics & Orthotics Specialist',
      specialization_ar: s.spec_ar,
      specialization_en: s.spec_en,
      rating: 4.2 + Math.round((idx * 0.1 + i * 0.15) % 0.8 * 10) / 10,
      reviewCount: 15 + (idx * 3 + i * 7) % 85,
      experience: 5 + (idx + i) % 15,
      image: specialistImages[sIdx],
      available: true,
    });
  }

  return {
    id: `center-${idx + 1}`,
    name_ar: `مركز واصل للأطراف الصناعية - ${gov.gov_ar}`,
    name_en: `Wasel Prosthetics Center - ${gov.gov_en}`,
    governorate_ar: gov.gov_ar,
    governorate_en: gov.gov_en,
    region_ar: gov.region_ar,
    region_en: gov.region_en,
    address_ar: gov.address_ar,
    address_en: gov.address_en,
    phone: gov.phone,
    whatsapp: '201119056895',
    workingHours_ar: 'السبت - الخميس: 9 صباحاً - 9 مساءً',
    workingHours_en: 'Sat - Thu: 9 AM - 9 PM',
    image: centerImages[idx % centerImages.length],
    insurance_supported: true,
    supported_insurers: insurers.slice(0, 3 + (idx % 4)),
    rating: 4.3 + (idx % 7) * 0.1,
    specialists,
    services_ar: servicesAr,
    services_en: servicesEn,
  };
});

export const regions = [
  { ar: 'الكل', en: 'All' },
  { ar: 'القاهرة الكبرى', en: 'Greater Cairo' },
  { ar: 'الإسكندرية', en: 'Alexandria' },
  { ar: 'الدلتا', en: 'Delta' },
  { ar: 'القناة', en: 'Canal' },
  { ar: 'الصعيد', en: 'Upper Egypt' },
  { ar: 'البحر الأحمر', en: 'Red Sea' },
  { ar: 'الساحل الشمالي', en: 'North Coast' },
  { ar: 'سيناء', en: 'Sinai' },
];
