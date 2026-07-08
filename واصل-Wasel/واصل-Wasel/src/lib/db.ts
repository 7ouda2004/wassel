export interface Center {
  id: string;
  name: string;
  location: string;
  address: string;
  phone: string;
  workingHours: string;
  image: string;
  region: string;
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
  if (saved) {
    try {
      return JSON.parse(saved);
    } catch (e) {
      console.error('Error parsing centers:', e);
    }
  }
  localStorage.setItem('centers', JSON.stringify(defaultCenters));
  return defaultCenters;
}

export function saveLocalCenters(centers: Center[]): void {
  localStorage.setItem('centers', JSON.stringify(centers));
}
