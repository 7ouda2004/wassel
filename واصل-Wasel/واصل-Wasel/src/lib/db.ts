export interface Center {
  id: string;
  name: string;
  location: string;
  address: string;
  phone: string;
  workingHours: string;
  image: string;
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
}

export const defaultCenters: Center[] = [
  {
    id: '1',
    name: 'مركز واصل الرئيسي - القاهرة',
    location: 'القاهرة',
    address: 'شارع التحرير، وسط البلد، القاهرة',
    phone: '02-123-4567',
    workingHours: 'السبت - الخميس: 9 صباحاً - 9 مساءً',
    image: '/images/ortho.png',
    region: 'القاهرة الكبرى'
  },
  {
    id: '2',
    name: 'مركز واصل - فرع الإسكندرية',
    location: 'الإسكندرية',
    address: 'شارع الكورنيش، سموحة، الإسكندرية',
    phone: '03-456-7890',
    workingHours: 'السبت - الخميس: 10 صباحاً - 8 مساءً',
    image: '/images/ortho.png',
    region: 'الإسكندرية'
  },
  {
    id: '3',
    name: 'مركز واصل - فرع الجيزة',
    location: 'الجيزة',
    address: 'شارع الهرم، الجيزة',
    phone: '02-987-6543',
    workingHours: 'السبت - الخميس: 9 صباحاً - 9 مساءً',
    image: '/images/ortho.png',
    region: 'القاهرة الكبرى'
  },
  {
    id: '4',
    name: 'مركز واصل - فرع القليوبية',
    location: 'القليوبية',
    address: 'شارع المحطة، بنها، القليوبية',
    phone: '013-123-4567',
    workingHours: 'السبت - الخميس: 9 صباحاً - 9 مساءً',
    image: '/images/ortho.png',
    region: 'القاهرة الكبرى'
  },
  {
    id: '5',
    name: 'مركز واصل - فرع بورسعيد',
    location: 'بورسعيد',
    address: 'شارع الثلاثيني، بورسعيد',
    phone: '066-123-4567',
    workingHours: 'السبت - الخميس: 9 صباحاً - 9 مساءً',
    image: '/images/new.jpg',
    region: 'القناة'
  },
  {
    id: '6',
    name: 'مركز واصل - فرع السويس',
    location: 'السويس',
    address: 'شارع الجيش، السويس',
    phone: '062-123-4567',
    workingHours: 'السبت - الخميس: 9 صباحاً - 9 مساءً',
    image: '/images/new.jpg',
    region: 'القناة'
  },
  {
    id: '7',
    name: 'مركز واصل - فرع دمياط',
    location: 'دمياط',
    address: 'شارع الحربي، دمياط',
    phone: '057-123-4567',
    workingHours: 'السبت - الخميس: 9 صباحاً - 9 مساءً',
    image: '/images/new.jpg',
    region: 'الدلتا'
  },
  {
    id: '8',
    name: 'مركز واصل - فرع الدقهلية',
    location: 'المنصورة',
    address: 'شارع الجمهورية، المنصورة، الدقهلية',
    phone: '050-123-4567',
    workingHours: 'السبت - الخميس: 9 صباحاً - 9 مساءً',
    image: '/images/new.jpg',
    region: 'الدلتا'
  },
  {
    id: '9',
    name: 'مركز واصل - فرع الشرقية',
    location: 'الزقازيق',
    address: 'شارع المحافظة، الزقازيق، الشرقية',
    phone: '055-123-4567',
    workingHours: 'السبت - الخميس: 9 صباحاً - 9 مساءً',
    image: '/images/ortho.png',
    region: 'الدلتا'
  },
  {
    id: '10',
    name: 'مركز واصل - فرع الغربية',
    location: 'طنطا',
    address: 'شارع البحر، طنطا، الغربية',
    phone: '040-123-4567',
    workingHours: 'السبت - الخميس: 9 صباحاً - 9 مساءً',
    image: '/images/ortho.png',
    region: 'الدلتا'
  },
  {
    id: '11',
    name: 'مركز واصل - فرع كفر الشيخ',
    location: 'كفر الشيخ',
    address: 'شارع الخليفة المأمون، كفر الشيخ',
    phone: '047-123-4567',
    workingHours: 'السبت - الخميس: 9 صباحاً - 9 مساءً',
    image: '/images/ortho.png',
    region: 'الدلتا'
  },
  {
    id: '12',
    name: 'مركز واصل - فرع المنوفية',
    location: 'شبين الكوم',
    address: 'شارع الجلاء، شبين الكوم، المنوفية',
    phone: '048-123-4567',
    workingHours: 'السبت - الخميس: 9 صباحاً - 9 مساءً',
    image: '/images/ortho.png',
    region: 'الدلتا'
  },
  {
    id: '13',
    name: 'مركز واصل - فرع البحيرة',
    location: 'دمنهور',
    address: 'شارع الروضة، دمنهور، البحيرة',
    phone: '045-123-4567',
    workingHours: 'السبت - الخميس: 9 صباحاً - 9 مساءً',
    image: '/images/ortho.png',
    region: 'الدلتا'
  },
  {
    id: '14',
    name: 'مركز واصل - فرع الإسماعيلية',
    location: 'الإسماعيلية',
    address: 'شارع السلطان حسين، الإسماعيلية',
    phone: '064-123-4567',
    workingHours: 'السبت - الخميس: 9 صباحاً - 9 مساءً',
    image: '/images/ortho.png',
    region: 'القناة'
  },
  {
    id: '15',
    name: 'مركز واصل - فرع بني سويف',
    location: 'بني سويف',
    address: 'شارع الرياض، بني سويف',
    phone: '082-123-4567',
    workingHours: 'السبت - الخميس: 9 صباحاً - 9 مساءً',
    image: '/images/team.png',
    region: 'الصعيد'
  },
  {
    id: '16',
    name: 'مركز واصل - فرع الفيوم',
    location: 'الفيوم',
    address: 'شارع الحرية، الفيوم',
    phone: '084-123-4567',
    workingHours: 'السبت - الخميس: 9 صباحاً - 9 مساءً',
    image: '/images/team.png',
    region: 'الصعيد'
  },
  {
    id: '17',
    name: 'مركز واصل - فرع المنيا',
    location: 'المنيا',
    address: 'شارع كورنيش النيل، المنيا',
    phone: '086-123-4567',
    workingHours: 'السبت - الخميس: 9 صباحاً - 9 مساءً',
    image: '/images/team.png',
    region: 'الصعيد'
  },
  {
    id: '18',
    name: 'مركز واصل - فرع أسيوط',
    location: 'أسيوط',
    address: 'شارع الجمهورية، برج النور، أسيوط',
    phone: '088-123-4567',
    workingHours: 'السبت - الخميس: 9 صباحاً - 8 مساءً',
    image: '/images/team.png',
    region: 'الصعيد'
  },
  {
    id: '19',
    name: 'مركز واصل - فرع سوهاج',
    location: 'سوهاج',
    address: 'شارع المحطة، سوهاج',
    phone: '093-123-4567',
    workingHours: 'السبت - الخميس: 9 صباحاً - 9 مساءً',
    image: '/images/team.png',
    region: 'الصعيد'
  },
  {
    id: '20',
    name: 'مركز واصل - فرع قنا',
    location: 'قنا',
    address: 'شارع كوبري دندرة، قنا',
    phone: '096-123-4567',
    workingHours: 'السبت - الخميس: 9 صباحاً - 9 مساءً',
    image: '/images/team.png',
    region: 'الصعيد'
  },
  {
    id: '21',
    name: 'مركز واصل - فرع الأقصر',
    location: 'الأقصر',
    address: 'شارع خالد بن الوليد، الأقصر',
    phone: '095-123-4567',
    workingHours: 'السبت - الخميس: 9 صباحاً - 9 مساءً',
    image: '/images/team.png',
    region: 'الصعيد'
  },
  {
    id: '22',
    name: 'مركز واصل - فرع أسوان',
    location: 'أسوان',
    address: 'شارع كورنيش النيل، أسوان',
    phone: '097-123-4567',
    workingHours: 'السبت - الخميس: 9 صباحاً - 9 مساءً',
    image: '/images/team.png',
    region: 'الصعيد'
  },
  {
    id: '23',
    name: 'مركز واصل - فرع البحر الأحمر',
    location: 'الغردقة',
    address: 'طريق الشيراتون، الغردقة، البحر الأحمر',
    phone: '065-123-4567',
    workingHours: 'السبت - الخميس: 9 صباحاً - 9 مساءً',
    image: '/images/new.jpg',
    region: 'الحدود'
  },
  {
    id: '24',
    name: 'مركز واصل - فرع الوادي الجديد',
    location: 'الخارجة',
    address: 'شارع جمال عبد الناصر، الخارجة، الوادي الجديد',
    phone: '092-123-4567',
    workingHours: 'السبت - الخميس: 9 صباحاً - 9 مساءً',
    image: '/images/new.jpg',
    region: 'الحدود'
  },
  {
    id: '25',
    name: 'مركز واصل - فرع مطروح',
    location: 'مرسى مطروح',
    address: 'شارع الإسكندرية، مرسى مطروح',
    phone: '046-123-4567',
    workingHours: 'السبت - الخميس: 9 صباحاً - 9 مساءً',
    image: '/images/new.jpg',
    region: 'الحدود'
  },
  {
    id: '26',
    name: 'مركز واصل - فرع شمال سيناء',
    location: 'العريش',
    address: 'شارع الفاتح، العريش، شمال سيناء',
    phone: '068-123-4567',
    workingHours: 'السبت - الخميس: 9 صباحاً - 9 مساءً',
    image: '/images/new.jpg',
    region: 'الحدود'
  },
  {
    id: '27',
    name: 'مركز واصل - فرع جنوب سيناء',
    location: 'طور سيناء',
    address: 'شارع البحر، طور سيناء، جنوب سيناء',
    phone: '069-123-4567',
    workingHours: 'السبت - الخميس: 9 صباحاً - 9 مساءً',
    image: '/images/new.jpg',
    region: 'الحدود'
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

  // Auto-enrich any centers missing description, services, or reviews
  let modified = false;
  const enriched = centers.map(center => {
    let updated = { ...center };
    let cMod = false;
    
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

export interface Specialist {
  id: string;
  name: string;
  username: string;
  password?: string;
  role: string;
  bio: string;
  image: string;
  expertise: string[];
  status: 'pending' | 'active';
  phone?: string;
  facebook?: string;
  instagram?: string;
  linkedin?: string;
}

export const defaultSpecialists: Specialist[] = [
  {
    id: '1',
    name: 'محمود إبراهيم',
    username: 'mahmoud',
    password: 'daizer',
    role: 'المؤسس وأخصائي أطراف صناعية وأجهزة تقويمية',
    image: '/public/images/mahmoud.jpg',
    bio: 'خريج جامعة القاهرة الجديدة التكنولوجية، ومتخصص في تصميم وتصنيع الأطراف الصناعية والأجهزة التقويمية. يمتلك خبرة واسعة في المجال ويسعى دائمًا لتقديم أحدث التقنيات والحلول المبتكرة للمرضى.',
    expertise: ['تصميم الأطراف الصناعية', 'الجبائر التقويمية', 'تقييم الحالات المتقدمة'],
    status: 'active',
    phone: '01012345678',
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
    image: '/public/images/nader.jpg',
    bio: 'متخصص في ضبط وتركيب الأطراف الصناعية بدقة عالية، مع خبرة أكثر من 7 سنوات في المجال. يتميز بمهاراته الفنية العالية ودقته في العمل، مما يضمن حصول المرضى على أفضل النتائج وأعلى مستويات الراحة.',
    expertise: ['ضبط الأطراف الصناعية', 'تقييم الحركة والمشي', 'الصيانة والإصلاح'],
    status: 'active',
    phone: '01098765432',
    facebook: 'https://www.facebook.com/nader.ibrahem.35',
    instagram: 'https://www.instagram.com/nader_op1/',
    linkedin: 'https://www.linkedin.com/in/nader-ibrahim-3a2554278/'
  },
  {
    id: '3',
    name: 'باسل هاني',
    username: 'bassel',
    password: 'specialist123',
    role: 'أخصائي الجبائر الطبية وتقنيات السيليكون الحديثه',
    image: '/public/images/bassel.jpg',
    bio: 'متخصص في تصميم وتصنيع الجبائر الطبية المخصصة. يمتلك معرفة عميقة بعلم التشريح وميكانيكا الجسم، مما يمكنه من تصميم جبائر تلبي الاحتياجات الدقيقة لكل مريض.',
    expertise: ['جبائر العمود الفقري', 'جبائر الركبة والكاحل', 'جبائر الأطفال المتخصصة'],
    status: 'active',
    phone: '01167834290',
    facebook: 'https://www.facebook.com/bassel.hany.mohammed',
    instagram: 'https://www.instagram.com/bassel_hanymohammad/',
    linkedin: 'https://www.linkedin.com/in/bassel-hany-mohammed-526276328/'
  },
  {
    id: '4',
    name: 'أخصائي واصل',
    username: 'specialist',
    password: 'specialist123',
    role: 'أخصائي أطراف صناعية وجبائر طبية',
    image: '/images/new.jpg',
    bio: 'أخصائي متمرس في الأطراف الصناعية والأجهزة التقويمية الحديثة.',
    expertise: ['الأطراف الصناعية', 'الجبائر الطبية'],
    status: 'active',
    phone: '01234567890'
  }
];

export function getLocalSpecialists(): Specialist[] {
  const saved = localStorage.getItem('specialists');
  if (saved) {
    try {
      return JSON.parse(saved);
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
