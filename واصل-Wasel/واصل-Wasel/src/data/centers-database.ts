import { allEgyptCenters } from './all-centers-data';

export interface Product {
  id: string;
  name_ar: string;
  name_en: string;
  description_ar: string;
  description_en: string;
  image: string;
}

export interface Specialist {
  id: string;
  name_ar: string;
  name_en: string;
  specialization_ar: string;
  specialization_en: string;
  experience: number;
  rating: number;
  reviewCount: number;
  image: string;
  available: boolean;
  portfolio_images?: string[];
}

export interface GovernorateCenter {
  id: string;
  governorate_ar: string;
  governorate_en: string;
  region_ar: string;
  region_en: string;
  name_ar: string;
  name_en: string;
  address_ar: string;
  address_en: string;
  phone: string;
  whatsapp: string;
  rating: number;
  image: string;
  insurance_supported: boolean;
  specialists: Specialist[];
  google_maps_url?: string;
  workingHours_ar?: string;
  workingHours_en?: string;
  services_ar?: string[];
  services_en?: string[];
  supported_insurers?: string[];
  title_ar?: string;
  title_en?: string;
  products?: Product[];
}

export const regions = [
  { ar: 'الكل', en: 'All' },
  { ar: 'القاهرة الكبرى', en: 'Greater Cairo' },
  { ar: 'الإسكندرية ومطروح', en: 'Alexandria & Matrouh' },
  { ar: 'الدلتا', en: 'Delta' },
  { ar: 'القناة', en: 'Canal' },
  { ar: 'شمال الصعيد', en: 'North Upper Egypt' },
  { ar: 'جنوب الصعيد', en: 'South Upper Egypt' }
];

export interface InsuranceProvider {
  id: string;
  name_ar: string;
  name_en: string;
  type: 'government' | 'private' | 'syndicate';
  logo_color: string;
  phone: string;
  address_ar: string;
  address_en: string;
  google_maps_url: string;
  coverage_ar: string[];
  coverage_en: string[];
}

export const insuranceProviders: InsuranceProvider[] = [
  {
    id: 'hio',
    name_ar: 'الهيئة العامة للتأمين الصحي',
    name_en: 'Health Insurance Organization (HIO)',
    type: 'government',
    logo_color: '#1a5276',
    phone: '0227921700',
    address_ar: 'شارع الشيخ ريحان، باب اللوق، القاهرة',
    address_en: 'Sheikh Rihan St., Bab El Louq, Cairo',
    google_maps_url: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3453.8!2d31.24!3d30.04!5e0!3m2!1sar!2seg!4v1',
    coverage_ar: ['أطراف صناعية', 'أجهزة تقويمية', 'جبائر طبية', 'تأهيل حركي'],
    coverage_en: ['Prosthetics', 'Orthotics', 'Medical Splints', 'Rehabilitation']
  },
  {
    id: 'uhis',
    name_ar: 'التأمين الصحي الشامل',
    name_en: 'Universal Health Insurance System (UHIS)',
    type: 'government',
    logo_color: '#148f77',
    phone: '15344',
    address_ar: 'بورسعيد - الأقصر - أسوان - الإسماعيلية - جنوب سيناء',
    address_en: 'Port Said - Luxor - Aswan - Ismailia - South Sinai',
    google_maps_url: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3453.8!2d31.24!3d30.04!5e0!3m2!1sar!2seg!4v1',
    coverage_ar: ['تغطية شاملة لكل الأجهزة التعويضية', 'تأهيل كامل', 'متابعة دورية'],
    coverage_en: ['Full prosthetic device coverage', 'Complete rehabilitation', 'Regular follow-up']
  },
  {
    id: 'nfq',
    name_ar: 'العلاج على نفقة الدولة',
    name_en: 'State-Funded Treatment',
    type: 'government',
    logo_color: '#2c3e50',
    phone: '0227921800',
    address_ar: 'المجالس الطبية المتخصصة، القصر العيني، القاهرة',
    address_en: 'Specialized Medical Councils, Qasr Al Ainy, Cairo',
    google_maps_url: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3454.5!2d31.23!3d30.03!5e0!3m2!1sar!2seg!4v1',
    coverage_ar: ['أطراف صناعية بالكامل', 'أجهزة تعويضية', 'عمليات جراحية'],
    coverage_en: ['Full prosthetics coverage', 'Assistive devices', 'Surgical operations']
  },
  {
    id: 'bupa',
    name_ar: 'بوبا مصر',
    name_en: 'Bupa Egypt',
    type: 'private',
    logo_color: '#005bbb',
    phone: '19931',
    address_ar: 'سيتي ستارز، الدور ٣٤، مدينة نصر، القاهرة',
    address_en: 'City Stars, 34th Floor, Nasr City, Cairo',
    google_maps_url: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3452.8!2d31.35!3d30.07!5e0!3m2!1sar!2seg!4v1',
    coverage_ar: ['أطراف صناعية حتى ٥٠٠,٠٠٠ جنيه', 'أجهزة تقويمية', 'جلسات تأهيل'],
    coverage_en: ['Prosthetics up to 500,000 EGP', 'Orthotic devices', 'Rehabilitation sessions']
  },
  {
    id: 'allianz',
    name_ar: 'أليانز مصر',
    name_en: 'Allianz Egypt',
    type: 'private',
    logo_color: '#003781',
    phone: '19909',
    address_ar: '٥٣ شارع الحجاز، مصر الجديدة، القاهرة',
    address_en: '53 Al Hegaz St., Heliopolis, Cairo',
    google_maps_url: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3452.3!2d31.33!3d30.08!5e0!3m2!1sar!2seg!4v1',
    coverage_ar: ['أطراف صناعية', 'أجهزة طبية تعويضية', 'علاج طبيعي'],
    coverage_en: ['Prosthetics', 'Medical assistive devices', 'Physiotherapy']
  },
  {
    id: 'metlife',
    name_ar: 'ميتلايف مصر',
    name_en: 'MetLife Egypt',
    type: 'private',
    logo_color: '#00a8e1',
    phone: '19844',
    address_ar: 'نايل سيتي تاورز، كورنيش النيل، القاهرة',
    address_en: 'Nile City Towers, Corniche El Nil, Cairo',
    google_maps_url: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3453.2!2d31.22!3d30.06!5e0!3m2!1sar!2seg!4v1',
    coverage_ar: ['أطراف صناعية', 'تأمين ضد الحوادث', 'تأهيل طبي'],
    coverage_en: ['Prosthetics', 'Accident insurance', 'Medical rehabilitation']
  },
  {
    id: 'misr_insurance',
    name_ar: 'شركة مصر للتأمين',
    name_en: 'Misr Insurance Company',
    type: 'private',
    logo_color: '#c0392b',
    phone: '0227921500',
    address_ar: '٥ ميدان طلعت حرب، وسط البلد، القاهرة',
    address_en: '5 Talaat Harb Square, Downtown, Cairo',
    google_maps_url: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3453.8!2d31.24!3d30.05!5e0!3m2!1sar!2seg!4v1',
    coverage_ar: ['أطراف صناعية', 'أجهزة تعويضية', 'علاج طبيعي وتأهيل'],
    coverage_en: ['Prosthetics', 'Assistive devices', 'Physiotherapy & rehabilitation']
  },
  {
    id: 'eng_syndicate',
    name_ar: 'نقابة المهندسين المصرية',
    name_en: 'Egyptian Engineers Syndicate',
    type: 'syndicate',
    logo_color: '#27ae60',
    phone: '0227921600',
    address_ar: '٢٨ شارع رمسيس، وسط البلد، القاهرة',
    address_en: '28 Ramses St., Downtown, Cairo',
    google_maps_url: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3453.5!2d31.24!3d30.06!5e0!3m2!1sar!2seg!4v1',
    coverage_ar: ['أطراف صناعية لأعضاء النقابة', 'خصومات على الأجهزة التقويمية'],
    coverage_en: ['Prosthetics for syndicate members', 'Discounts on orthotic devices']
  },
  {
    id: 'doctors_syndicate',
    name_ar: 'نقابة الأطباء',
    name_en: 'Doctors Syndicate',
    type: 'syndicate',
    logo_color: '#8e44ad',
    phone: '0227921650',
    address_ar: 'دار الحكمة، شارع القصر العيني، القاهرة',
    address_en: 'Dar El Hekma, Qasr El Ainy St., Cairo',
    google_maps_url: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3454.2!2d31.23!3d30.04!5e0!3m2!1sar!2seg!4v1',
    coverage_ar: ['تغطية كاملة للأطراف الصناعية', 'تأهيل حركي'],
    coverage_en: ['Full prosthetics coverage', 'Motor rehabilitation']
  }
];

export const egyptCenters: GovernorateCenter[] = allEgyptCenters;
