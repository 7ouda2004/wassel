export interface CaseStudy {
  id: string;
  title: string;
  deviceType: string;
  patientAge?: string;
  description: string;
  outcome: string;
  image?: string;
  date?: string;
}

export interface Center {
  id: string;
  name: string;
  location: string;
  address: string;
  phone: string;
  workingHours: string;
  image: string;
  images?: string[];
  region: string;
  description?: string;
  services?: string[];
  reviews?: {
    id: string;
    author: string;
    rating: number;
    comment: string;
    date: string;
  }[];
  casesWorkedOn?: CaseStudy[];
  status?: 'pending' | 'active' | 'rejected';
}

export interface Specialist {
  id: string;
  name: string;
  username: string;
  password?: string;
  role: string;
  bio: string;
  image: string;
  expertise: string[];
  status: 'pending' | 'active' | 'rejected';
  phone?: string;
  facebook?: string;
  instagram?: string;
  linkedin?: string;
  centerId?: string;
  centerName?: string;
  casesWorkedOn?: CaseStudy[];
}

export const EGYPT_GOVERNORATES = [
  'القاهرة',
  'الجيزة',
  'الإسكندرية',
  'القليوبية',
  'الدقهلية',
  'البحيرة',
  'الشرقية',
  'الغربية',
  'المنوفية',
  'دمياط',
  'كفر الشيخ',
  'الفيوم',
  'بني سويف',
  'المنيا',
  'أسيوط',
  'سوهاج',
  'قنا',
  'الأقصر',
  'أسوان',
  'البحر الأحمر',
  'الوادي الجديد',
  'مطروح',
  'شمال سيناء',
  'جنوب سيناء',
  'بورسعيد',
  'السويس',
  'الإسماعيلية'
] as const;

// High quality reliable mobility & medical image URLs from Unsplash
export const FALLBACK_CENTER_IMAGES = [
  'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&w=1000&q=80',
  'https://images.unsplash.com/photo-1586773860418-d37222d8fce3?auto=format&fit=crop&w=1000&q=80',
  'https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&w=1000&q=80',
  'https://images.unsplash.com/photo-1538108149393-fbbd81895907?auto=format&fit=crop&w=1000&q=80',
  'https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&w=1000&q=80'
];

export const DEFAULT_AVATAR = '/images/default_avatar.jpg';

export const FALLBACK_SPECIALIST_IMAGES = [
  '/images/default_avatar.jpg',
  'https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&w=600&q=80',
  'https://images.unsplash.com/photo-1537368910025-700350fe46c7?auto=format&fit=crop&w=600&q=80',
  'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&w=600&q=80'
];

export const DEFAULT_CASES: CaseStudy[] = [
  {
    id: 'case_1',
    title: 'تركيب طرف صناعي تحت الركبة ذكي لمريض تعرض لحادث',
    deviceType: 'طرف صناعي سفي ذكي (Below Knee)',
    patientAge: '34 سنة',
    description: 'تم أخذ المقاسات الدقيقة بتقنية المسح الضوئي وتصنيع سوكيت مخصص وساق كربونية مرنة لتقليل الصدمات أثناء المشي والجري.',
    outcome: 'استعاد المريض القدرة على المشي الطبيعي وركوب الدراجة خلال 3 أسابيع من التدريب الحركي المكثف.',
    image: 'https://images.unsplash.com/photo-1586773860418-d37222d8fce3?auto=format&fit=crop&w=600&q=80',
    date: '2026-05-15'
  },
  {
    id: 'case_2',
    title: 'تصنيع جبيرة تقويم كاحل وقدم (AFO) لطفل يعاني من شلل دماغي',
    deviceType: 'جبيرة ديناميكية كربونية (Dynamic AFO)',
    patientAge: '7 سنوات',
    description: 'تم تصميم جبيرة خفيفة الوزن تمنع سقوط القدم وتساعد على تثبيت الركبة أثناء مراحل المشي المختلفة مع حشوة سيليكون مريحة.',
    outcome: 'تحسن اتزان الطفل بنسبة 80% وأصبح قادرًا على الذهاب للمدرسة والمشاركة في الأنشطة دون تعثر.',
    image: 'https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&w=600&q=80',
    date: '2026-06-10'
  }
];

export const defaultCenters: Center[] = [
  {
    id: '1',
    name: 'مركز واصل الرئيسي - القاهرة',
    location: 'القاهرة',
    address: 'شارع التحرير، وسط البلد، القاهرة',
    phone: '01119056895',
    workingHours: 'السبت - الخميس: 9 صباحاً - 9 مساءً',
    image: FALLBACK_CENTER_IMAGES[0],
    images: [FALLBACK_CENTER_IMAGES[0], FALLBACK_CENTER_IMAGES[1], FALLBACK_CENTER_IMAGES[2]],
    region: 'القاهرة الكبرى',
    casesWorkedOn: DEFAULT_CASES,
    status: 'active'
  },
  {
    id: '2',
    name: 'مركز واصل - فرع الإسكندرية',
    location: 'الإسكندرية',
    address: 'شارع الكورنيش، سموحة، الإسكندرية',
    phone: '01119056895',
    workingHours: 'السبت - الخميس: 10 صباحاً - 8 مساءً',
    image: FALLBACK_CENTER_IMAGES[1],
    images: [FALLBACK_CENTER_IMAGES[1], FALLBACK_CENTER_IMAGES[3]],
    region: 'الإسكندرية',
    casesWorkedOn: DEFAULT_CASES,
    status: 'active'
  },
  {
    id: '3',
    name: 'مركز واصل - فرع الجيزة',
    location: 'الجيزة',
    address: 'شارع الهرم، الجيزة',
    phone: '01119056895',
    workingHours: 'السبت - الخميس: 9 صباحاً - 9 مساءً',
    image: FALLBACK_CENTER_IMAGES[2],
    region: 'القاهرة الكبرى',
    casesWorkedOn: DEFAULT_CASES,
    status: 'active'
  },
  {
    id: '4',
    name: 'مركز واصل - فرع القليوبية',
    location: 'القليوبية',
    address: 'شارع المحطة، بنها، القليوبية',
    phone: '01119056895',
    workingHours: 'السبت - الخميس: 9 صباحاً - 9 مساءً',
    image: FALLBACK_CENTER_IMAGES[3],
    region: 'القاهرة الكبرى',
    status: 'active'
  },
  {
    id: '5',
    name: 'مركز واصل - فرع بورسعيد',
    location: 'بورسعيد',
    address: 'شارع الثلاثيني، بورسعيد',
    phone: '01119056895',
    workingHours: 'السبت - الخميس: 9 صباحاً - 9 مساءً',
    image: FALLBACK_CENTER_IMAGES[4],
    region: 'القناة',
    status: 'active'
  },
  {
    id: '6',
    name: 'مركز واصل - فرع السويس',
    location: 'السويس',
    address: 'شارع الجيش، السويس',
    phone: '01119056895',
    workingHours: 'السبت - الخميس: 9 صباحاً - 9 مساءً',
    image: FALLBACK_CENTER_IMAGES[0],
    region: 'القناة',
    status: 'active'
  },
  {
    id: '7',
    name: 'مركز واصل - فرع دمياط',
    location: 'دمياط',
    address: 'شارع الحربي، دمياط',
    phone: '01119056895',
    workingHours: 'السبت - الخميس: 9 صباحاً - 9 مساءً',
    image: FALLBACK_CENTER_IMAGES[1],
    region: 'الدلتا',
    status: 'active'
  },
  {
    id: '8',
    name: 'مركز واصل - فرع الدقهلية (المنصورة)',
    location: 'الدقهلية',
    address: 'شارع الجمهورية، المنصورة، الدقهلية',
    phone: '01119056895',
    workingHours: 'السبت - الخميس: 9 صباحاً - 9 مساءً',
    image: FALLBACK_CENTER_IMAGES[2],
    region: 'الدلتا',
    casesWorkedOn: DEFAULT_CASES,
    status: 'active'
  },
  {
    id: '9',
    name: 'مركز واصل - فرع الشرقية (الزقازيق)',
    location: 'الشرقية',
    address: 'شارع المحافظة، الزقازيق، الشرقية',
    phone: '01119056895',
    workingHours: 'السبت - الخميس: 9 صباحاً - 9 مساءً',
    image: FALLBACK_CENTER_IMAGES[3],
    region: 'الدلتا',
    status: 'active'
  },
  {
    id: '10',
    name: 'مركز واصل - فرع الغربية (طنطا)',
    location: 'الغربية',
    address: 'شارع البحر، طنطا، الغربية',
    phone: '01119056895',
    workingHours: 'السبت - الخميس: 9 صباحاً - 9 مساءً',
    image: FALLBACK_CENTER_IMAGES[4],
    region: 'الدلتا',
    status: 'active'
  },
  {
    id: '11',
    name: 'مركز واصل - فرع كفر الشيخ',
    location: 'كفر الشيخ',
    address: 'شارع الخليفة المأمون، كفر الشيخ',
    phone: '01119056895',
    workingHours: 'السبت - الخميس: 9 صباحاً - 9 مساءً',
    image: FALLBACK_CENTER_IMAGES[0],
    region: 'الدلتا',
    status: 'active'
  },
  {
    id: '12',
    name: 'مركز واصل - فرع المنوفية (شبين الكوم)',
    location: 'المنوفية',
    address: 'شارع الجلاء، شبين الكوم، المنوفية',
    phone: '01119056895',
    workingHours: 'السبت - الخميس: 9 صباحاً - 9 مساءً',
    image: FALLBACK_CENTER_IMAGES[1],
    region: 'الدلتا',
    status: 'active'
  },
  {
    id: '13',
    name: 'مركز واصل - فرع البحيرة (دمنهور)',
    location: 'البحيرة',
    address: 'شارع الروضة، دمنهور، البحيرة',
    phone: '01119056895',
    workingHours: 'السبت - الخميس: 9 صباحاً - 9 مساءً',
    image: FALLBACK_CENTER_IMAGES[2],
    region: 'الدلتا',
    status: 'active'
  },
  {
    id: '14',
    name: 'مركز واصل - فرع الإسماعيلية',
    location: 'الإسماعيلية',
    address: 'شارع السلطان حسين، الإسماعيلية',
    phone: '01119056895',
    workingHours: 'السبت - الخميس: 9 صباحاً - 9 مساءً',
    image: FALLBACK_CENTER_IMAGES[3],
    region: 'القناة',
    status: 'active'
  },
  {
    id: '15',
    name: 'مركز واصل - فرع بني سويف',
    location: 'بني سويف',
    address: 'شارع الرياض، بني سويف',
    phone: '01119056895',
    workingHours: 'السبت - الخميس: 9 صباحاً - 9 مساءً',
    image: FALLBACK_CENTER_IMAGES[4],
    region: 'الصعيد',
    status: 'active'
  },
  {
    id: '16',
    name: 'مركز واصل - فرع الفيوم',
    location: 'الفيوم',
    address: 'شارع الحرية، الفيوم',
    phone: '01119056895',
    workingHours: 'السبت - الخميس: 9 صباحاً - 9 مساءً',
    image: FALLBACK_CENTER_IMAGES[0],
    region: 'الصعيد',
    status: 'active'
  },
  {
    id: '17',
    name: 'مركز واصل - فرع المنيا',
    location: 'المنيا',
    address: 'شارع كورنيش النيل، المنيا',
    phone: '01119056895',
    workingHours: 'السبت - الخميس: 9 صباحاً - 9 مساءً',
    image: FALLBACK_CENTER_IMAGES[1],
    region: 'الصعيد',
    status: 'active'
  },
  {
    id: '18',
    name: 'مركز واصل - فرع أسيوط',
    location: 'أسيوط',
    address: 'شارع الجمهورية، برج النور، أسيوط',
    phone: '01119056895',
    workingHours: 'السبت - الخميس: 9 صباحاً - 8 مساءً',
    image: FALLBACK_CENTER_IMAGES[2],
    region: 'الصعيد',
    status: 'active'
  },
  {
    id: '19',
    name: 'مركز واصل - فرع سوهاج',
    location: 'سوهاج',
    address: 'شارع المحطة، سوهاج',
    phone: '01119056895',
    workingHours: 'السبت - الخميس: 9 صباحاً - 9 مساءً',
    image: FALLBACK_CENTER_IMAGES[3],
    region: 'الصعيد',
    status: 'active'
  },
  {
    id: '20',
    name: 'مركز واصل - فرع قنا',
    location: 'قنا',
    address: 'شارع كوبري دندرة، قنا',
    phone: '01119056895',
    workingHours: 'السبت - الخميس: 9 صباحاً - 9 مساءً',
    image: FALLBACK_CENTER_IMAGES[4],
    region: 'الصعيد',
    status: 'active'
  },
  {
    id: '21',
    name: 'مركز واصل - فرع الأقصر',
    location: 'الأقصر',
    address: 'شارع خالد بن الوليد، الأقصر',
    phone: '01119056895',
    workingHours: 'السبت - الخميس: 9 صباحاً - 9 مساءً',
    image: FALLBACK_CENTER_IMAGES[0],
    region: 'الصعيد',
    status: 'active'
  },
  {
    id: '22',
    name: 'مركز واصل - فرع أسوان',
    location: 'أسوان',
    address: 'شارع كورنيش النيل، أسوان',
    phone: '01119056895',
    workingHours: 'السبت - الخميس: 9 صباحاً - 9 مساءً',
    image: FALLBACK_CENTER_IMAGES[1],
    region: 'الصعيد',
    status: 'active'
  },
  {
    id: '23',
    name: 'مركز واصل - فرع البحر الأحمر (الغردقة)',
    location: 'البحر الأحمر',
    address: 'طريق الشيراتون، الغردقة، البحر الأحمر',
    phone: '01119056895',
    workingHours: 'السبت - الخميس: 9 صباحاً - 9 مساءً',
    image: FALLBACK_CENTER_IMAGES[2],
    region: 'الحدود',
    status: 'active'
  },
  {
    id: '24',
    name: 'مركز واصل - فرع الوادي الجديد (الخارجة)',
    location: 'الوادي الجديد',
    address: 'شارع جمال عبد الناصر، الخارجة، الوادي الجديد',
    phone: '01119056895',
    workingHours: 'السبت - الخميس: 9 صباحاً - 9 مساءً',
    image: FALLBACK_CENTER_IMAGES[3],
    region: 'الحدود',
    status: 'active'
  },
  {
    id: '25',
    name: 'مركز واصل - فرع مطروح (مرسى مطروح)',
    location: 'مطروح',
    address: 'شارع الإسكندرية، مرسى مطروح',
    phone: '01119056895',
    workingHours: 'السبت - الخميس: 9 صباحاً - 9 مساءً',
    image: FALLBACK_CENTER_IMAGES[4],
    region: 'الحدود',
    status: 'active'
  },
  {
    id: '26',
    name: 'مركز واصل - فرع شمال سيناء (العريش)',
    location: 'شمال سيناء',
    address: 'شارع الفاتح، العريش، شمال سيناء',
    phone: '01119056895',
    workingHours: 'السبت - الخميس: 9 صباحاً - 9 مساءً',
    image: FALLBACK_CENTER_IMAGES[0],
    region: 'الحدود',
    status: 'active'
  },
  {
    id: '27',
    name: 'مركز واصل - فرع جنوب سيناء (طور سيناء)',
    location: 'جنوب سيناء',
    address: 'شارع البحر، طور سيناء، جنوب سيناء',
    phone: '01119056895',
    workingHours: 'السبت - الخميس: 9 صباحاً - 9 مساءً',
    image: FALLBACK_CENTER_IMAGES[1],
    region: 'الحدود',
    status: 'active'
  }
];

export function getLocalCenters(): Center[] {
  const saved = localStorage.getItem('centers');
  let centers: Center[] = [];
  if (saved) {
    try {
      centers = JSON.parse(saved);
    } catch (e) {
      console.error('Error parsing centers:', e);
      centers = defaultCenters;
    }
  } else {
    centers = defaultCenters;
  }

  // Auto-enrich any centers missing description, services, reviews or casesWorkedOn & force phone update
  let modified = false;
  const enriched = centers.map(center => {
    let updated = { ...center };
    let cMod = false;

    if (updated.phone !== '01119056895') {
      updated.phone = '01119056895';
      cMod = true;
    }
    
    if (!updated.description) {
      updated.description = `مركز واصل المعتمد في محافظة ${center.location}، يقدّم حلولاً متكاملة وخبرات متطورة في تصميم وتركيب الأطراف الصناعية والجبائر الطبية المبتكرة لمساعدة عملائنا على استعادة الحركة الكاملة والاستقلالية التامة.`;
      cMod = true;
    }
    
    if (!updated.services || updated.services.length === 0) {
      updated.services = [
        'تصميم وتركيب الأطراف الصناعية الذكية (علوية وسفلية)',
        'جبائر تقويم العظام المخصصة (AFO, KAFO)',
        'تصميم الفرش الطبي والأحذية الطبية المخصصة باستخدام تقنيات قياس الضغط',
        'صيانة دورية فورية وتعديل مقاسات الأجهزة والجبائر',
        'جلسات تدريب وتأهيل حركي مجانية للمرضى الجدد'
      ];
      cMod = true;
    }
    
    if (!updated.reviews || updated.reviews.length === 0) {
      updated.reviews = [
        {
          id: `r1_${center.id}`,
          author: 'محمد مصطفى',
          rating: 5,
          comment: 'تعامل راقي جداً واحترافية متناهية في أخذ المقاسات وضبط الجبيرة. طفلي يتحسن بفضل الله ثم فروع واصل.',
          date: '2026-06-20'
        },
        {
          id: `r2_${center.id}`,
          author: 'أميرة عبد الرحمن',
          rating: 5,
          comment: 'الطرف الصناعي جودته ممتازة وخفيف والتدريب والمتابعة كانوا مفيدين جداً لي. شكراً جزيلاً لكم.',
          date: '2026-07-01'
        }
      ];
      cMod = true;
    }

    if (!updated.casesWorkedOn || updated.casesWorkedOn.length === 0) {
      updated.casesWorkedOn = DEFAULT_CASES;
      cMod = true;
    }
    
    if (!updated.status) {
      updated.status = 'active';
      cMod = true;
    }
    
    if (cMod) {
      modified = true;
    }
    return updated;
  });

  if (modified || !saved) {
    localStorage.setItem('centers', JSON.stringify(enriched));
  }
  return enriched;
}

export function saveLocalCenters(centers: Center[]): void {
  localStorage.setItem('centers', JSON.stringify(centers));
}

export const defaultSpecialists: Specialist[] = [
  {
    id: '1',
    name: 'محمود إبراهيم',
    username: 'mahmoud',
    password: 'daizer',
    role: 'المؤسس وأخصائي أطراف صناعية وأجهزة تقويمية',
    image: FALLBACK_SPECIALIST_IMAGES[0],
    bio: 'متخصص في تصميم وتصنيع الأطراف الصناعية والأجهزة التقويمية المبتكرة، يمتلك خبرة واسعة في التقنيات الطبية الذكية المعتمدة عالمياً.',
    expertise: ['تصميم الأطراف الصناعية', 'الجبائر التقويمية', 'تقييم الحالات المتقدمة'],
    status: 'active',
    phone: '01119056895',
    centerId: '1',
    centerName: 'مركز واصل الرئيسي - القاهرة',
    casesWorkedOn: DEFAULT_CASES,
    facebook: 'https://www.facebook.com/profile.php?id=100009899685976',
    instagram: 'https://www.instagram.com/mahmoud.ibrahim.7/',
    linkedin: 'https://www.linkedin.com/in/mahmoud-arafa-b490b4265/'
  },
  {
    id: '2',
    name: 'نادر إبراهيم',
    username: 'nader',
    password: 'specialist123',
    role: 'أخصائي تركيب وضبط الأطراف الصناعية',
    image: FALLBACK_SPECIALIST_IMAGES[1],
    bio: 'متخصص في ضبط وتركيب الأطراف الصناعية بدقة عالية، مع خبرة أكثر من 7 سنوات في تحسين المشي والحركة واستعادة التوازن الحركي.',
    expertise: ['ضبط الأطراف الصناعية', 'تقييم الحركة والمشي', 'الصيانة والإصلاح'],
    status: 'active',
    phone: '01119056895',
    centerId: '2',
    centerName: 'مركز واصل - فرع الإسكندرية',
    casesWorkedOn: DEFAULT_CASES,
    facebook: 'https://www.facebook.com/nader.ibrahem.35',
    instagram: 'https://www.instagram.com/nader_op1/',
    linkedin: 'https://www.linkedin.com/in/nader-ibrahim-3a2554278/'
  },
  {
    id: '3',
    name: 'باسل هاني',
    username: 'bassel',
    password: 'specialist123',
    role: 'أخصائي الجبائر الطبية وتقنيات السيليكون الحديثة',
    image: FALLBACK_SPECIALIST_IMAGES[2],
    bio: 'متخصص في تصميم وتصنيع الجبائر الطبية المخصصة بتقنيات عالية لتلبية الاحتياجات الدقيقة للتعافي والتأهيل الحركي.',
    expertise: ['جبائر العمود الفقري', 'جبائر الركبة والكاحل', 'جبائر الأطفال المتخصصة'],
    status: 'active',
    phone: '01119056895',
    centerId: '8',
    centerName: 'مركز واصل - فرع الدقهلية (المنصورة)',
    casesWorkedOn: DEFAULT_CASES,
    facebook: 'https://www.facebook.com/bassel.hany.mohammed',
    instagram: 'https://www.instagram.com/bassel_hanymohammad/',
    linkedin: 'https://www.linkedin.com/in/bassel-hany-mohammed-526276328/'
  },
  {
    id: '4',
    name: 'د. أحمد سامي',
    username: 'ahmed',
    password: 'specialist123',
    role: 'أخصائي تقويم العظام وتأهيل الأطراف',
    image: FALLBACK_SPECIALIST_IMAGES[3],
    bio: 'أخصائي متمرس في الأطراف الصناعية والأجهزة التقويمية الحديثة مع متابعة دورية مستمرة.',
    expertise: ['الأطراف الصناعية الذكية', 'الجبائر الطبية'],
    status: 'active',
    phone: '01119056895',
    centerId: '3',
    centerName: 'مركز واصل - فرع الجيزة',
    casesWorkedOn: DEFAULT_CASES
  }
];

export function getLocalSpecialists(): Specialist[] {
  const saved = localStorage.getItem('specialists');
  if (saved) {
    try {
      const parsed: Specialist[] = JSON.parse(saved);
      // Enrich missing casesWorkedOn & force phone update to 01119056895
      const enriched = parsed.map(s => ({
        ...s,
        phone: '01119056895',
        casesWorkedOn: s.casesWorkedOn || DEFAULT_CASES
      }));
      localStorage.setItem('specialists', JSON.stringify(enriched));
      return enriched;
    } catch (e) {
      console.error('Error parsing specialists:', e);
    }
  }
  localStorage.setItem('specialists', JSON.stringify(defaultSpecialists));
  return defaultSpecialists;
}

export function saveLocalSpecialists(specialists: Specialist[]): void {
  localStorage.setItem('specialists', JSON.stringify(specialists));
}
