import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import { orthosesAr, orthosesEn } from './locales/orthosesTranslations';
import { prostheticsAr, prostheticsEn } from './locales/prostheticsTranslations';

// Translations
const resources = {
  ar: {
    translation: {
      "nav": {
        "home": "الرئيسية",
        "orthoses": "الجبائر الطبية",
        "prosthetics": "الأطراف الصناعية",
        "about": "عن التطبيق",
        "team": "فريق العمل",
        "locations": "مراكزنا",
        "contact": "تواصل معنا",
        "booking": "حجز موعد",
        "specialist_dashboard": "لوحة التحكم",
        "login_specialist": "الدخول كـأخصائي",
        "contact_us": "تواصل معنا"
      },
      "index": {
        "hero_title_1": "واصل",
        "hero_title_2": "لحلول الجبائر والأطراف الصناعية المتطورة",
        "hero_desc": "أفضل الحلول التقويمية والأطراف الصناعية المصممة خصيصًا لتلبية احتياجاتك بأحدث التقنيات والمعايير العالمية، بأسعار واقعية وجودة لا تُضاهى.",
        "explore_orthoses": "استكشف الجبائر الطبية",
        "explore_prosthetics": "استكشف الأطراف الصناعية",
        "german_quality": "جودة ألمانية",
        "tech_2026": "تقنيات 2026",
        "services_title": "خدماتنا المميزة",
        "service_1_title": "الأطراف الصناعية المتطورة",
        "service_1_desc": "نوفر أحدث تقنيات الأطراف الصناعية المصممة خصيصًا لتلبية احتياجاتك اليومية بأعلى معايير الجودة والراحة.",
        "more": "المزيد",
        "service_2_title": "الجبائر الطبية المتخصصة",
        "service_2_desc": "مجموعة متنوعة من الجبائر الطبية عالية الجودة لمختلف الحالات، مصممة لتوفير الدعم الأمثل والراحة.",
        "service_3_title": "حلول مخصصة",
        "service_3_desc": "نقدم حلولًا مخصصة تمامًا وفقًا لاحتياجاتك الفردية، مع مراعاة نمط حياتك ومستوى نشاطك.",
        "why_us": "لماذا تختارنا؟",
        "years_exp": "سنوات من الخبرة",
        "team_title": "فريق متخصص",
        "team_desc": "يضم فريقنا خبراء متخصصين في مجال الأطراف الصناعية والجبائر الطبية ذوي خبرة واسعة.",
        "standards_title": "معايير عالمية",
        "standards_desc": "نعتمد على أعلى المعايير العالمية في تصميم وتصنيع منتجاتنا لضمان الجودة والأمان.",
        "followup_title": "متابعة مستمرة",
        "followup_desc": "نقدم خدمة متابعة مستمرة بعد التركيب لضمان أفضل النتائج والتأقلم مع الجهاز.",
        "centers_title": "مراكز متعددة",
        "centers_desc": "لدينا مراكز متعددة في مختلف المناطق لتسهيل الوصول إلى خدماتنا.",
        "know_more": "معرفة المزيد عنا",
        "products_title": "منتجاتنا المميزة",
        "best_seller": "الأكثر مبيعًا",
        "product_1_title": "جبيرة الكاحل والقدم (AFO)",
        "product_1_desc": "جبيرة طبية حديثة لدعم الكاحل والقدم، تناسب حالات سقوط القدم.",
        "price_starts": "تبدأ من",
        "currency": "ج.م",
        "details": "التفاصيل",
        "product_2_title": "جبيرة الركبة المفصلية",
        "product_2_desc": "دعم متقدم للركبة والأربطة أثناء التعافي وبجودة عالية.",
        "german_tech": "تقنية ألمانية",
        "product_3_title": "طرف صناعي ديناميكي",
        "product_3_desc": "قدم صناعية من ألياف الكربون للاستجابة الديناميكية العالية.",
        "product_4_title": "ذراع إلكتروني حديث",
        "product_4_desc": "ذراع روبوتي ذكي يستجيب للإشارات العصبية بدقة متناهية.",
        "show_prosthetics": "عرض الأطراف الصناعية",
        "show_orthoses": "عرض الجبائر الطبية",
        "testimonials_title": "ماذا يقول عملاؤنا",
        "test_1_role": "مستخدم طرف صناعي",
        "test_1_text": "حياتي تغيرت بشكل كبير بعد الحصول على الطرف الصناعي من واصــل. الجودة ممتازة والحركة طبيعية جدًا. الفريق الطبي كان متعاونًا جدًا وقدموا لي كل الدعم اللازم.",
        "test_2_role": "مستخدمة جبيرة AFO",
        "test_2_text": "الجبيرة التي حصلت عليها من فريق واصــل مريحة جدًا وساعدتني كثيرًا في المشي بشكل أفضل. أشكر الفريق على احترافيتهم والتصميم المناسب لحالتي.",
        "test_3_role": "مستخدم ركبة صناعية",
        "test_3_text": "الركبة الصناعية المحوسبة التي حصلت عليها غيرت حياتي. أستطيع الآن ممارسة حياتي بشكل طبيعي والمشي لمسافات طويلة بدون تعب. شكرًا بشمهندس محمود على هذه التقنية المتطورة.",
        "consult_badge": "استشارة مجانية",
        "consult_title": "استشارة مجانية مع خبرائنا",
        "consult_desc": "تواصل معنا اليوم للحصول على استشارة مجانية وتقييم شامل لاحتياجاتك. فريقنا المتخصص في انتظارك.",
        "whatsapp": "تواصل على واتساب",
        "email": "راسلنا عبر البريد الإلكتروني"
      },
      "about": {
        "about_app": "عن التطبيق",
        "our_story_mission": "قصتنا ورسالتنا",
        "hero_desc": "واصل-wassel، نسعى لتقديم أفضل الحلول الطبية في مجال الجبائر والأطراف الصناعية، مع التركيز على جودة الحياة والاستقلالية لعملائنا.",
        "who_we_are": "من نحن",
        "about_desc_1": "واصل-wassel هي مؤسسة متخصصة في مجال الجبائر الطبية والأطراف الصناعية، تأسست على يد محمود إبراهيم، أخصائي الأطراف الصناعية والأجهزة التقويمية المتخصص.",
        "about_desc_2": "تخرج محمود من جامعة القاهرة الجديدة التكنولوجية، وامتلك خبرة واسعة في مجال الأطراف الصناعية والجبائر الطبية. بدأ مسيرته المهنية بشغف لمساعدة الأشخاص على استعادة حريتهم وحركتهم من خلال تقديم أفضل الحلول المخصصة لكل حالة.",
        "about_desc_3": "نحن فريق متكامل من الأخصائيين والفنيين المدربين على أعلى مستوى، نعمل معًا لتوفير خدمة استثنائية ومنتجات ذات جودة عالية تلبي احتياجات عملائنا وتتجاوز توقعاتهم.",
        "our_vision": "رؤيتنا",
        "vision_desc": "نسعى لأن نكون الرواد في مجال الجبائر الطبية والأطراف الصناعية في مصر والشرق الأوسط، من خلال تقديم حلول مبتكرة وعالية الجودة تمكّن الأشخاص من عيش حياة نشطة ومستقلة دون قيود.",
        "our_mission": "رسالتنا",
        "mission_desc": "مهمتنا هي تحسين نوعية حياة الأشخاص من خلال توفير حلول مخصصة عالية الجودة في مجال الجبائر الطبية والأطراف الصناعية، مع تقديم خدمة متميزة ودعم مستمر لعملائنا.",
        "our_values": "قيمنا",
        "value_1_title": "الجودة والتميز",
        "value_1_desc": "نلتزم بتقديم أفضل المنتجات والخدمات التي تلبي أعلى معايير الجودة العالمية.",
        "value_2_title": "الاهتمام بالعميل",
        "value_2_desc": "نضع احتياجات عملائنا في مقدمة أولوياتنا، ونسعى دائمًا لتوفير حلول مخصصة تناسب كل حالة.",
        "value_3_title": "الابتكار",
        "value_3_desc": "نستمر في البحث عن أحدث التقنيات والحلول المبتكرة لتحسين منتجاتنا وخدماتنا.",
        "value_4_title": "الاحترافية",
        "value_4_desc": "نعمل بمهنية عالية وأخلاقيات راسخة، ونلتزم بأعلى معايير الممارسة المهنية.",
        "why_us": "لماذا تختارنا؟",
        "why_1_title": "خبرة متميزة",
        "why_1_desc": "فريقنا يتمتع بخبرة واسعة في مجال الجبائر والأطراف الصناعية، مع تدريب مستمر على أحدث التقنيات والممارسات.",
        "why_2_title": "حلول مخصصة",
        "why_2_desc": "نقدم حلولًا مخصصة تمامًا لكل حالة، مع مراعاة الاحتياجات الفردية والظروف الخاصة لكل عميل.",
        "why_3_title": "تقنيات متطورة",
        "why_3_desc": "نستخدم أحدث التقنيات والمواد في تصميم وتصنيع منتجاتنا، مما يضمن جودة عالية وأداء متميز.",
        "why_4_title": "متابعة مستمرة",
        "why_4_desc": "نقدم خدمة متابعة شاملة لعملائنا، للتأكد من رضاهم وتقديم الدعم المستمر لهم.",
        "our_certs": "شهاداتنا واعتماداتنا",
        "cert_1": "شهادة الهيئة المصرية للرعاية الصحية",
        "cert_2": "اعتماد الجمعية الدولية للأطراف الصناعية",
        "cert_3": "شهادة ISO 9001 للجودة",
        "cta_title": "انضم إلى عائلتنا من العملاء السعداء",
        "cta_desc": "نحن هنا لمساعدتك في رحلتك نحو حياة أفضل. تواصل معنا اليوم للحصول على استشارة مجانية ومعرفة كيف يمكننا مساعدتك.",
        "meet_team": "تعرف على فريقنا"
      },
      "contact": {
        "contact_us_badge": "نحن هنا لمساعدتك",
        "contact_us_title": "تواصل معنا",
        "contact_us_desc": "فريقنا مستعد للرد على جميع أسئلتك وتقديم المساعدة. تواصل معنا عبر الطريقة المناسبة لك.",
        "phone_title": "الهاتف",
        "phone_subtitle": "اتصل بنا على:",
        "email_title": "البريد الإلكتروني",
        "email_subtitle": "راسلنا على:",
        "address_title": "العنوان",
        "address_subtitle": "المركز الرئيسي:",
        "address_value": "المنصورة، مصر",
        "working_hours_title": "ساعات العمل",
        "working_hours_subtitle": "مواعيد العمل:",
        "working_hours_value": "السبت - الخميس: 9ص - 6م",
        "send_message_title": "أرسل لنا رسالة",
        "send_message_subtitle": "اختر طريقة الإرسال المفضلة لك",
        "sent_success": "تم الإرسال بنجاح!",
        "sent_success_desc": "شكرًا للتواصل معنا. سنرد عليك في أقرب وقت.",
        "send_via_email": "إيميل",
        "send_via_whatsapp": "واتساب",
        "form_name": "الاسم *",
        "form_name_placeholder": "الاسم الكامل",
        "form_phone": "الهاتف *",
        "form_phone_placeholder": "رقم الهاتف",
        "form_email": "البريد الإلكتروني",
        "form_subject": "الموضوع *",
        "form_subject_placeholder": "اختر الموضوع",
        "subject_1": "استفسار عام",
        "subject_2": "حجز موعد",
        "subject_3": "استشارة فنية",
        "subject_4": "خدمة ما بعد البيع",
        "subject_5": "شكوى أو اقتراح",
        "subject_6": "أخرى",
        "form_message": "الرسالة *",
        "form_message_placeholder": "اكتب رسالتك هنا...",
        "sending": "جاري الإرسال...",
        "send_whatsapp": "إرسال عبر واتساب",
        "send_email": "إرسال عبر الإيميل",
        "map_title": "موقع المركز الرئيسي",
        "whatsapp_cta_title": "تواصل معنا عبر واتساب",
        "whatsapp_cta_desc": "للحصول على استجابة فورية، تواصل معنا مباشرة عبر واتساب. متاحون للرد على استفساراتك.",
        "open_whatsapp": "فتح محادثة واتساب"
      },
      "login": {
        "title": "تسجيل دخول الأخصائيين",
        "username": "اسم المستخدم",
        "username_placeholder": "أدخل اسم المستخدم",
        "password": "كلمة المرور",
        "password_placeholder": "أدخل كلمة المرور",
        "submit": "تسجيل الدخول",
        "success": "تم تسجيل الدخول بنجاح",
        "error": "اسم المستخدم أو كلمة المرور غير صحيحة"
      },
      "locations_page": {
        "badge": "مراكزنا",
        "title": "مراكزنا في جميع أنحاء مصر",
        "desc": "لدينا مراكز متخصصة في مختلف المحافظات لتقديم خدماتنا بشكل أفضل وأقرب لكم. اختر المركز الأقرب إليك وتواصل معنا لحجز موعد.",
        "section_title": "مراكزنا المتخصصة",
        "view_on_map": "عرض على الخريطة",
        "find_nearest": "ابحث عن أقرب مركز",
        "map_title": "خريطة مراكز واصل",
        "steps": {
          "locate": {
            "title": "تحديد الموقع",
            "desc": "اسمح لنا بتحديد موقعك الحالي لمساعدتك في العثور على أقرب مركز إليك."
          },
          "find": {
            "title": "العثور على المركز",
            "desc": "سنقوم بتحديد أقرب مركز إليك وتزويدك بالاتجاهات والمعلومات اللازمة."
          },
          "book": {
            "title": "حجز موعد",
            "desc": "بعد تحديد المركز، يمكنك حجز موعد بسهولة عبر الهاتف أو عبر الإنترنت."
          }
        },
        "home_visits": {
          "title": "خدمة الزيارات المنزلية",
          "desc": "لا تستطيع الوصول إلى أحد مراكزنا؟ نقدم خدمة الزيارات المنزلية للحالات الخاصة في مناطق محددة. فريقنا المتخصص سيأتي إليك لتقديم الخدمة المطلوبة.",
          "coverage": "مناطق تغطية الزيارات المنزلية:",
          "areas": ["القاهرة الكبرى", "الإسكندرية", "المنصورة ومحيطها"],
          "cta": "طلب زيارة منزلية"
        },
        "cta_title": "زورنا اليوم للحصول على استشارة مجانية",
        "cta_desc": "فريقنا المتخصص في انتظارك في جميع مراكزنا. تواصل معنا لحجز موعد أو الاستفسار عن خدماتنا.",
        "cta_button": "تواصل معنا"
      },
      "dashboard": {
        "title": "لوحة تحكم الأخصائي",
        "welcome": "مرحبًا {{name}}، إليك نظرة عامة على المرضى والتقارير",
        "add_patient": "إضافة مريض جديد",
        "stats": {
          "total_patients": "إجمالي المرضى",
          "active_patients": "مرضى نشطون",
          "prosthetics": "الأطراف الصناعية",
          "orthoses": "الجبائر الطبية"
        },
        "search_placeholder": "البحث عن مريض...",
        "tabs": {
          "all": "جميع المرضى",
          "prosthetics": "الأطراف الصناعية",
          "orthoses": "الجبائر الطبية",
          "active": "المرضى النشطون"
        },
        "table": {
          "caption": "قائمة بجميع المرضى المسجلين",
          "name": "اسم المريض",
          "age": "العمر",
          "condition": "الحالة",
          "device_type": "نوع الجهاز",
          "status": "الحالة",
          "last_visit": "آخر زيارة",
          "next_visit": "الزيارة القادمة",
          "actions": "الإجراءات",
          "view": "عرض",
          "edit": "تعديل",
          "delete": "حذف",
          "no_patients": "لا يوجد مرضى مطابقين لبحثك"
        },
        "dialog": {
          "add_title": "إضافة مريض جديد",
          "edit_title": "تعديل بيانات المريض",
          "name": "اسم المريض",
          "name_placeholder": "الاسم الكامل",
          "age": "العمر",
          "gender": "الجنس",
          "gender_male": "ذكر",
          "gender_female": "أنثى",
          "phone": "رقم الهاتف",
          "phone_placeholder": "رقم الهاتف",
          "condition": "وصف الحالة",
          "device_type": "نوع الجهاز",
          "status": "حالة الملف",
          "next_visit": "تاريخ الزيارة القادمة",
          "notes": "ملاحظات طبية",
          "files": "الملفات والمرفقات",
          "upload": "رفع ملف جديد",
          "save": "حفظ البيانات",
          "cancel": "إلغاء",
          "confirm_delete": "هل أنت متأكد من حذف هذا المريض؟ لا يمكن التراجع عن هذا الإجراء."
        },
        "measurements": {
          "afo": {
            "title": "جبيرة AFO",
            "footLength": "طول القدم",
            "footWidth": "عرض القدم",
            "ankleCircumference": "محيط الكاحل",
            "calfCircumference": "محيط بطة الساق",
            "ankleToKnee": "المسافة من الكاحل إلى الركبة"
          },
          "kafo": {
            "title": "جبيرة KAFO",
            "footLength": "طول القدم",
            "footWidth": "عرض القدم",
            "ankleCircumference": "محيط الكاحل",
            "calfCircumference": "محيط بطة الساق",
            "kneeCircumference": "محيط الركبة",
            "thighCircumference": "محيط الفخذ",
            "ankleToKnee": "المسافة من الكاحل إلى الركبة",
            "kneeToHip": "المسافة من الركبة إلى الورك"
          },
          "below_knee": {
            "title": "طرف صناعي تحت الركبة",
            "residualLength": "طول الطرف المتبقي",
            "residualCircumference": "محيط الطرف المتبقي",
            "kneeCircumference": "محيط الركبة",
            "calfShape": "شكل بطة الساق",
            "footSize": "مقاس القدم"
          },
          "above_knee": {
            "title": "طرف صناعي فوق الركبة",
            "residualLength": "طول الطرف المتبقي",
            "residualCircumference": "محيط الطرف المتبقي",
            "hipCircumference": "محيط الورك",
            "residualShape": "شكل الطرف المتبقي",
            "kneeType": "نوع الركبة",
            "footSize": "مقاس القدم"
          },
          "units": {
            "cm": "سم"
          }
        }
      },
      "centers": {
        "badge": "شبكة مراكزنا",
        "title": "مراكز الأطراف الصناعية والأجهزة التقويمية",
        "desc": "اكتشف شبكة مراكزنا المتصلة في جميع أنحاء مصر. نحن نربط خبرائنا ومراكزنا ببعضها البعض لضمان حصولك على أعلى جودة من الخدمة، أينما كنت.",
        "cities": {
          "cairo": "القاهرة",
          "alex": "الإسكندرية"
        },
        "main_center": "المركز الرئيسي",
        "search_placeholder": "ابحث عن مركز...",
        "regions": ["الكل", "القاهرة الكبرى", "الإسكندرية", "الدلتا", "الصعيد"],
        "view_details": "عرض التفاصيل",
        "data": [
          {
            "id": "1",
            "name": " واصل-wassel - المركز الرئيسي",
            "location": "القاهرة",
            "address": "شارع التحرير، وسط البلد، القاهرة",
            "phone": "02-123-4567",
            "workingHours": "السبت - الخميس: 9 صباحاً - 9 مساءً",
            "image": "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
            "region": "القاهرة الكبرى"
          },
          {
            "id": "2",
            "name": "أورثوميدكس - فرع الإسكندرية",
            "location": "الإسكندرية",
            "address": "شارع الكورنيش، سموحة، الإسكندرية",
            "phone": "03-456-7890",
            "workingHours": "السبت - الخميس: 10 صباحاً - 8 مساءً",
            "image": "https://images.unsplash.com/photo-1586773860418-d37222d8fce3?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
            "region": "الإسكندرية"
          },
          {
            "id": "3",
            "name": "مركز  واصل-wassel - المنصورة",
            "location": "المنصورة",
            "address": "شارع الجمهورية، برج الأطباء، الدور الثالث، المنصورة",
            "phone": "050-123-4567",
            "workingHours": "السبت - الخميس: 9 صباحاً - 9 مساءً",
            "image": "https://images.unsplash.com/photo-1629909613654-28e377c37b09?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
            "region": "الدلتا"
          },
          {
            "id": "4",
            "name": "مركز  واصل-wassel - أسيوط",
            "location": "أسيوط",
            "address": "شارع الجمهورية، برج النور، أسيوط",
            "phone": "088-123-4567",
            "workingHours": "السبت - الخميس: 9 صباحاً - 8 مساءً",
            "image": "https://images.unsplash.com/photo-1551190822-a9333d879b1f?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
            "region": "الصعيد"
          },
          {
            "id": "5",
            "name": "مركز  واصل-wassel - طنطا",
            "location": "طنطا",
            "address": "شارع البحر، برج الأطباء، طنطا",
            "phone": "040-123-4567",
            "workingHours": "السبت - الخميس: 9 صباحاً - 9 مساءً",
            "image": "https://images.unsplash.com/photo-1538108149393-fbbd81895907?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
            "region": "الدلتا"
          }
        ]
      },
      "booking": {
        "badge": "حجز سريع ومضمون",
        "title": "حجز موعد",
        "desc": "احجز موعدك بسهولة عبر الواتساب أو الإيميل وسنقوم بالتأكيد معك فوراً",
        "steps": {
          "personal": {
            "title": "البيانات الشخصية",
            "name_label": "الاسم الكامل",
            "name_placeholder": "أدخل اسمك الكامل",
            "phone_label": "رقم الهاتف",
            "email_label": "البريد الإلكتروني",
            "age_label": "العمر",
            "governorate_label": "المحافظة",
            "governorate_placeholder": "اختر المحافظة"
          },
          "details": {
            "title": "تفاصيل الموعد",
            "date_label": "التاريخ",
            "time_label": "الوقت",
            "type_label": "نوع الموعد",
            "service_label": "الخدمة المطلوبة",
            "service_placeholder": "اختر الخدمة"
          },
          "files": {
            "title": "المرفقات وطريقة الإرسال",
            "upload_label": "إرفاق صور أو تقارير (حتى 5 ملفات)",
            "upload_placeholder": "اضغط لرفع صور أو تقارير",
            "max_size": "حتى 10MB",
            "notes_label": "ملاحظات إضافية",
            "notes_placeholder": "اكتب أي ملاحظات أو تفاصيل إضافية عن حالتك..."
          }
        },
        "methods": {
          "method_label": "طريقة الإرسال",
          "whatsapp": {
            "title": "واتساب",
            "desc": "رد سريع ومباشر"
          },
          "email": {
            "title": "إيميل",
            "desc": "مع تفاصيل كاملة"
          }
        },
        "nav": {
          "prev": "السابق",
          "next": "التالي",
          "sending": "جاري الإرسال...",
          "send_whatsapp": "إرسال عبر واتساب",
          "send_email": "إرسال عبر الإيميل"
        },
        "success": {
          "title": "تم إرسال طلب الحجز بنجاح! 🎉",
          "whatsapp_desc": "تم فتح واتساب برسالة الحجز الجاهزة. أرسلها لتأكيد موعدك.",
          "email_desc": "تم إرسال بيانات الحجز على الإيميل. سنتواصل معك قريبًا لتأكيد الموعد.",
          "footer": "سيتم التواصل معك خلال 24 ساعة لتأكيد الموعد",
          "book_another": "حجز موعد آخر"
        },
        "note": {
          "title": "ملاحظة مهمة",
          "desc": "بعد إرسال طلب الحجز، سيتم التواصل معك خلال 24 ساعة لتأكيد الموعد. يمكنك إرفاق صور أو تقارير طبية لتسريع عملية التقييم. مواعيد العمل: السبت - الخميس، 9 صباحاً - 6 مساءً."
        },
        "toasts": {
          "whatsapp_success": "تم فتح واتساب بنجاح! أرسل الرسالة لتأكيد الحجز",
          "email_success": "تم إرسال طلب الحجز بنجاح عبر الإيميل!",
          "error": "حدث خطأ أثناء الإرسال. يرجى المحاولة مرة أخرى.",
          "fill_fields": "يرجى ملء جميع الحقول المطلوبة"
        },
        "appointment_types": [
          { "value": "معاينة", "label": "معاينة", "desc": "الكشف الأولي وتقييم الحالة", "color": "from-blue-500 to-blue-600" },
          { "value": "قياس", "label": "قياس", "desc": "أخذ المقاسات وتحديد المواصفات", "color": "from-purple-500 to-purple-600" },
          { "value": "تركيب", "label": "تركيب", "desc": "تجربة وتركيب الجهاز", "color": "from-teal-500 to-teal-600" },
          { "value": "متابعة", "label": "متابعة", "desc": "فحص دوري للتأكد من الكفاءة", "color": "from-amber-500 to-amber-600" },
          { "value": "صيانة", "label": "صيانة", "desc": "إصلاح أو تعديل الجهاز", "color": "from-red-500 to-red-600" }
        ],
        "service_types": [
          "طرف صناعي تحت الركبة", "طرف صناعي فوق الركبة", "طرف صناعي يد",
          "جبيرة AFO", "جبيرة KAFO", "جبيرة عمود فقري", "جبيرة يد/رسغ",
          "حذاء طبي", "نعل طبي", "أخرى"
        ],
        "governorates": [
          "القاهرة", "الجيزة", "الإسكندرية", "الدقهلية", "المنصورة", "الشرقية",
          "الغربية", "كفر الشيخ", "البحيرة", "المنوفية", "القليوبية", "الفيوم",
          "بني سويف", "المنيا", "أسيوط", "سوهاج", "قنا", "الأقصر", "أسوان",
          "دمياط", "بورسعيد", "الإسماعيلية", "السويس", "شمال سيناء", "جنوب سيناء",
          "البحر الأحمر", "الوادي الجديد", "مطروح"
        ],
        "whatsapp_msg": {
          "header": "حجز موعد جديد - واصل",
          "name": "الاسم",
          "phone": "الهاتف",
          "email": "الإيميل",
          "age": "العمر",
          "governorate": "المحافظة",
          "date": "التاريخ",
          "time": "الوقت",
          "type": "نوع الموعد",
          "service": "الخدمة المطلوبة",
          "notes": "ملاحظات",
          "attachments": "مرفقات",
          "files_note": "ملف (سيتم إرسالها في الرسالة التالية)"
        },
        "email_subject": "حجز موعد جديد"
      },
      "team": {
        "badge": "فريق العمل",
        "title": "تعرف على فريقنا المتخصص",
        "desc": "نفخر بفريقنا المتميز من الخبراء والمتخصصين الذين يعملون معًا لتقديم أفضل الحلول والخدمات في مجال الجبائر والأطراف الصناعية.",
        "members_title": "أعضاء الفريق",
        "expertise_label": "التخصصات",
        "values_title": "قيم فريقنا",
        "values": {
          "teamwork": {
            "title": "العمل الجماعي",
            "desc": "نعمل كفريق واحد متكامل، نتعاون معًا لتحقيق أفضل النتائج لعملائنا. كل عضو في الفريق يقدم خبرته ومهاراته لخدمة الهدف المشترك."
          },
          "innovation": {
            "title": "الابتكار المستمر",
            "desc": "نشجع التفكير الإبداعي والبحث المستمر عن حلول مبتكرة. نسعى دائمًا للتطوير وتبني أحدث التقنيات والأساليب في مجالنا."
          },
          "care": {
            "title": "الرعاية والتعاطف",
            "desc": "نتعامل مع عملائنا برعاية وتعاطف، متفهمين لاحتياجاتهم ومشاعرهم. نسعى لتقديم الدعم النفسي إلى جانب الحلول التقنية."
          }
        },
        "join": {
          "title": "انضم إلى فريقنا",
          "desc": "نبحث دائمًا عن المواهب المتميزة والشغوفة للانضمام إلى فريقنا. إذا كنت ترغب في العمل في بيئة ديناميكية ومبتكرة، وتشاركنا شغفنا لمساعدة الآخرين، فنحن نرحب بك.",
          "jobs_title": "الوظائف المتاحة",
          "jobs": [
            { "title": "أخصائي أطراف صناعية", "type": "دوام كامل" },
            { "title": "فني تصنيع وتشكيل", "type": "دوام كامل" },
            { "title": "أخصائي علاج طبيعي", "type": "دوام جزئي" }
          ],
          "contact_desc": "للتقديم، يرجى إرسال سيرتك الذاتية ورسالة توضح سبب رغبتك في الانضمام إلينا إلى:"
        },
        "cta": {
          "title": "تواصل مع فريقنا اليوم",
          "desc": "احصل على استشارة مجانية وتعرف على كيف يمكن لخبرائنا مساعدتك في الحصول على الحل المناسب.",
          "button": "تواصل معنا"
        },
        "members": [
          {
            "id": 1,
            "name": "محمود إبراهيم",
            "role": "المؤسس وأخصائي أطراف صناعية وأجهزة تقويمية",
            "image": "/images/mahmoud.jpg",
            "bio": "خريج جامعة القاهرة الجديدة التكنولوجية، ومتخصص في تصميم وتصنيع الأطراف الصناعية والأجهزة التقويمية. يمتلك خبرة واسعة في المجال ويسعى دائمًا لتقديم أحدث التقنيات والحلول المبتكرة للمرضى.",
            "expertise": ["تصميم الأطراف الصناعية", "الجبائر التقويمية", "تقييم الحالات المتقدمة"]
          },
          {
            "id": 2,
            "name": "نادر إبراهيم",
            "role": "أخصائي تركيب وضبط الأطراف الصناعية",
            "image": "/images/nader.jpeg",
            "bio": "متخصص في ضبط وتركيب الأطراف الصناعية بدقة عالية، مع خبرة أكثر من 3 سنوات في المجال. يتميز بمهاراته الفنية العالية ودقته في العمل، مما يضمن حصول المرضى على أفضل النتائج وأعلى مستويات الراحة.",
            "expertise": ["ضبط الأطراف الصناعية", "تقييم الحركة والمشي", "الصيانة والإصلاح"]
          },
          {
            "id": 3,
            "name": "باسل هاني",
            "role": "أخصائي الجبائر الطبية وتقنيات السيليكون الحديثة",
            "image": "/images/bassel.jpg",
            "bio": "متخصص في تصميم وتصنيع الجبائر الطبية المخصصة. يمتلك معرفة عميقة بعلم التشريح وميكانيكا الجسم، مما يمكنه من تصميم جبائر تلبي الاحتياجات الدقيقة لكل مريض. يسعى دائمًا لتطوير مهاراته واكتساب أحدث التقنيات في المجال.",
            "expertise": ["جبائر العمود الفقري", "جبائر الركبة والكاحل", "جبائر الأطفال المتخصصة"]
          }
        ]
      },


      "not_found": {
        "title": "404 - الصفحة غير موجودة",
        "message": "عذرًا، الصفحة التي تبحث عنها غير موجودة.",
        "back_home": "العودة للرئيسية"
      },
      "center_details": {
        "contact_info": "معلومات الاتصال",
        "address": "العنوان",
        "phone": "رقم الهاتف",
        "working_hours": "ساعات العمل",
        "services": "خدماتنا",
        "branches": "فروعنا",
        "team": "فريقنا المتخصص",
        "book_appointment": "حجز موعد",
        "data": {
          "name": "واصل-Wasel - المركز الرئيسي",
          "desc": "مركز متخصص في تقديم أحدث خدمات الأطراف الصناعية والأجهزة التقويمية بأعلى معايير الجودة العالمية. نحن نجمع بين الخبرة الطويلة والتقنيات المتطورة لتقديم حلول مخصصة تناسب احتياجات كل مريض.",
          "location": "القاهرة",
          "addr": "شارع التحرير، وسط البلد، القاهرة",
          "hours": "السبت - الخميس: 9 صباحاً - 9 مساءً",
          "services_list": [
            "الأطراف الصناعية العلوية",
            "الأطراف الصناعية السفلية",
            "الأجهزة التقويمية للعمود الفقري",
            "الأجهزة التقويمية للأطراف",
            "جبائر القدم والكاحل",
            "الأحذية الطبية المخصصة"
          ],
          "branches": {
            "nasr": "فرع مدينة نصر",
            "maadi": "فرع المعادي"
          },
          "titles": {
            "prosthetist": "أخصائي الأطراف الصناعية",
            "orthotist": "أخصائي الأجهزة التقويمية"
          }
        }
      },
      "footer": {
        "desc": "أفضل حلول الجبائر الطبية والأطراف الصناعية في مصر بأحدث التقنيات والمعايير العالمية لعام 2025.",
        "quick_links": "روابط سريعة",
        "contact_us": "تواصل معنا",
        "location": "المنصورة , مصر",
        "copyright": "حقوق النشر {{year}} جميع الحقوق محفوظة لدى محمود إبراهيم مسعد"
      },
      "orthoses": orthosesAr,
      "prosthetics": prostheticsAr
    }
  },
  en: {
    translation: {
      "nav": {
        "home": "Home",
        "orthoses": "Orthoses",
        "prosthetics": "Prosthetics",
        "about": "About App",
        "team": "Our Team",
        "locations": "Locations",
        "contact": "Contact",
        "booking": "Book Appointment",
        "specialist_dashboard": "Dashboard",
        "login_specialist": "Specialist Login",
        "contact_us": "Contact Us"
      },
      "index": {
        "hero_title_1": "Wasel",
        "hero_title_2": "For Advanced Orthoses & Prosthetics Solutions",
        "hero_desc": "The best orthotic solutions and prosthetics tailored to your needs using the latest technologies and international standards, at realistic prices and unmatched quality.",
        "explore_orthoses": "Explore Medical Orthoses",
        "explore_prosthetics": "Explore Prosthetics",
        "german_quality": "German Quality",
        "tech_2026": "2026 Technologies",
        "services_title": "Our Featured Services",
        "service_1_title": "Advanced Prosthetics",
        "service_1_desc": "We provide the latest prosthetic technologies tailored to meet your daily needs with the highest standards of quality and comfort.",
        "more": "More",
        "service_2_title": "Specialized Orthoses",
        "service_2_desc": "A variety of high-quality medical braces for different conditions, designed to provide optimal support and comfort.",
        "service_3_title": "Custom Solutions",
        "service_3_desc": "We offer completely customized solutions based on your individual needs, considering your lifestyle and activity level.",
        "why_us": "Why Choose Us?",
        "years_exp": "Years of Experience",
        "team_title": "Specialized Team",
        "team_desc": "Our team includes specialized experts in the field of prosthetics and orthotics with extensive experience.",
        "standards_title": "Global Standards",
        "standards_desc": "We rely on the highest international standards in designing and manufacturing our products to ensure quality and safety.",
        "followup_title": "Continuous Follow-up",
        "followup_desc": "We provide continuous follow-up service after fitting to ensure the best results and adaptation to the device.",
        "centers_title": "Multiple Centers",
        "centers_desc": "We have multiple centers in various regions to facilitate access to our services.",
        "know_more": "Know more about us",
        "products_title": "Our Featured Products",
        "best_seller": "Best Seller",
        "product_1_title": "Ankle Foot Orthosis (AFO)",
        "product_1_desc": "Modern medical brace for ankle and foot support, suitable for drop foot conditions.",
        "price_starts": "Starts from",
        "currency": "EGP",
        "details": "Details",
        "product_2_title": "Hinged Knee Brace",
        "product_2_desc": "Advanced support for the knee and ligaments during recovery, with high quality.",
        "german_tech": "German Technology",
        "product_3_title": "Dynamic Prosthetic Limb",
        "product_3_desc": "Carbon fiber prosthetic foot for high dynamic response.",
        "product_4_title": "Modern Bionic Arm",
        "product_4_desc": "Smart robotic arm that responds accurately to nerve signals.",
        "show_prosthetics": "View Prosthetics",
        "show_orthoses": "View Orthoses",
        "testimonials_title": "What Our Clients Say",
        "test_1_role": "Prosthetic Limb User",
        "test_1_text": "My life changed significantly after getting a prosthetic limb from Wasel. The quality is excellent and the movement is very natural. The medical team was very helpful and provided all the support I needed.",
        "test_2_role": "AFO User",
        "test_2_text": "The brace I got from the Wasel team is very comfortable and helped me walk much better. I thank the team for their professionalism and the design tailored to my condition.",
        "test_3_role": "Prosthetic Knee User",
        "test_3_text": "The computerized prosthetic knee I received changed my life. I can now live a normal life and walk long distances without fatigue. Thank you Eng. Mahmoud for this advanced technology.",
        "consult_badge": "Free Consultation",
        "consult_title": "Free Consultation with our Experts",
        "consult_desc": "Contact us today to get a free consultation and a comprehensive assessment of your needs. Our specialized team is waiting for you.",
        "whatsapp": "Contact on WhatsApp",
        "email": "Email Us"
      },
      "about": {
        "about_app": "About App",
        "our_story_mission": "Our Story and Mission",
        "hero_desc": "Wasel-Wassel, we strive to provide the best medical solutions in the field of orthotics and prosthetics, focusing on quality of life and independence for our clients.",
        "who_we_are": "Who We Are",
        "about_desc_1": "Wasel-Wassel is an institution specialized in the field of medical orthoses and prosthetics, founded by Mahmoud Ibrahim, specialized prosthetist and orthotist.",
        "about_desc_2": "Mahmoud graduated from New Cairo Technological University and gained extensive experience in the field of prosthetics and orthotics. He started his career with a passion to help people regain their freedom and mobility by providing the best customized solutions for each case.",
        "about_desc_3": "We are an integrated team of highly trained specialists and technicians, working together to provide exceptional service and high-quality products that meet our customers' needs and exceed their expectations.",
        "our_vision": "Our Vision",
        "vision_desc": "We strive to be pioneers in the field of medical orthotics and prosthetics in Egypt and the Middle East, by providing innovative and high-quality solutions that enable people to live active and independent lives without limitations.",
        "our_mission": "Our Mission",
        "mission_desc": "Our mission is to improve the quality of life for people by providing high-quality custom solutions in the field of medical orthotics and prosthetics, while delivering outstanding service and continuous support to our clients.",
        "our_values": "Our Values",
        "value_1_title": "Quality and Excellence",
        "value_1_desc": "We are committed to providing the best products and services that meet the highest international quality standards.",
        "value_2_title": "Customer Focus",
        "value_2_desc": "We put our customers' needs at the forefront of our priorities and always strive to provide customized solutions that suit every case.",
        "value_3_title": "Innovation",
        "value_3_desc": "We continuously search for the latest technologies and innovative solutions to improve our products and services.",
        "value_4_title": "Professionalism",
        "value_4_desc": "We operate with high professionalism and strong ethics, adhering to the highest standards of professional practice.",
        "why_us": "Why Choose Us?",
        "why_1_title": "Outstanding Experience",
        "why_1_desc": "Our team has extensive experience in the field of orthotics and prosthetics, with continuous training on the latest technologies and practices.",
        "why_2_title": "Customized Solutions",
        "why_2_desc": "We offer fully customized solutions for each case, taking into account individual needs and the specific circumstances of each client.",
        "why_3_title": "Advanced Technologies",
        "why_3_desc": "We use the latest technologies and materials in designing and manufacturing our products, ensuring high quality and outstanding performance.",
        "why_4_title": "Continuous Follow-up",
        "why_4_desc": "We provide a comprehensive follow-up service for our clients to ensure their satisfaction and provide continuous support.",
        "our_certs": "Our Certificates and Accreditations",
        "cert_1": "Egyptian Healthcare Authority Certificate",
        "cert_2": "International Society for Prosthetics and Orthotics Accreditation",
        "cert_3": "ISO 9001 Quality Certificate",
        "cta_title": "Join Our Family of Happy Clients",
        "cta_desc": "We are here to help you on your journey towards a better life. Contact us today for a free consultation and find out how we can help you.",
        "meet_team": "Meet Our Team"
      },
      "contact": {
        "contact_us_badge": "We are here to help",
        "contact_us_title": "Contact Us",
        "contact_us_desc": "Our team is ready to answer all your questions and provide assistance. Contact us via the method that suits you.",
        "phone_title": "Phone",
        "phone_subtitle": "Call us at:",
        "email_title": "Email",
        "email_subtitle": "Email us at:",
        "address_title": "Address",
        "address_subtitle": "Main Center:",
        "address_value": "Mansoura, Egypt",
        "working_hours_title": "Working Hours",
        "working_hours_subtitle": "Working Hours:",
        "working_hours_value": "Saturday - Thursday: 9am - 6pm",
        "send_message_title": "Send Us a Message",
        "send_message_subtitle": "Choose your preferred sending method",
        "sent_success": "Sent Successfully!",
        "sent_success_desc": "Thank you for contacting us. We will get back to you as soon as possible.",
        "send_via_email": "Email",
        "send_via_whatsapp": "WhatsApp",
        "form_name": "Name *",
        "form_name_placeholder": "Full Name",
        "form_phone": "Phone *",
        "form_phone_placeholder": "Phone Number",
        "form_email": "Email",
        "form_subject": "Subject *",
        "form_subject_placeholder": "Choose Subject",
        "subject_1": "General Inquiry",
        "subject_2": "Book Appointment",
        "subject_3": "Technical Consultation",
        "subject_4": "After-Sales Service",
        "subject_5": "Complaint or Suggestion",
        "subject_6": "Other",
        "form_message": "Message *",
        "form_message_placeholder": "Write your message here...",
        "sending": "Sending...",
        "send_whatsapp": "Send via WhatsApp",
        "send_email": "Send via Email",
        "map_title": "Main Center Location",
        "whatsapp_cta_title": "Contact us via WhatsApp",
        "whatsapp_cta_desc": "For an immediate response, contact us directly via WhatsApp. We are available to answer your inquiries.",
        "open_whatsapp": "Open WhatsApp Chat"
      },
      "login": {
        "title": "Specialist Login",
        "username": "Username",
        "username_placeholder": "Enter username",
        "password": "Password",
        "password_placeholder": "Enter password",
        "submit": "Login",
        "success": "Logged in successfully",
        "error": "Incorrect username or password"
      },
      "locations_page": {
        "badge": "Our Locations",
        "title": "Our Centers Across Egypt",
        "desc": "We have specialized centers in various governorates to provide our services better and closer to you. Choose the nearest center and contact us to book an appointment.",
        "section_title": "Our Specialized Centers",
        "view_on_map": "View on Map",
        "find_nearest": "Find Nearest Center",
        "map_title": "Wasel Centers Map",
        "steps": {
          "locate": {
            "title": "Locate",
            "desc": "Allow us to determine your current location to help you find the nearest center."
          },
          "find": {
            "title": "Find",
            "desc": "We will identify the nearest center and provide directions and information."
          },
          "book": {
            "title": "Book",
            "desc": "Once the center is identified, you can easily book an appointment via phone or online."
          }
        },
        "home_visits": {
          "title": "Home Visit Service",
          "desc": "Can't reach one of our centers? We offer home visit services for special cases in selected areas. Our specialized team will come to you.",
          "coverage": "Home Visit Coverage Areas:",
          "areas": ["Greater Cairo", "Alexandria", "Mansoura & surroundings"],
          "cta": "Request Home Visit"
        },
        "cta_title": "Visit Us Today for a Free Consultation",
        "cta_desc": "Our specialized team is waiting for you in all our centers. Contact us to book an appointment or inquire about our services.",
        "cta_button": "Contact Us"
      },
      "dashboard": {
        "title": "Specialist Dashboard",
        "welcome": "Welcome {{name}}, here is an overview of patients and reports",
        "add_patient": "Add New Patient",
        "stats": {
          "total_patients": "Total Patients",
          "active_patients": "Active Patients",
          "prosthetics": "Prosthetics",
          "orthoses": "Orthoses"
        },
        "search_placeholder": "Search for a patient...",
        "tabs": {
          "all": "All Patients",
          "prosthetics": "Prosthetics",
          "orthoses": "Orthoses",
          "active": "Active Patients"
        },
        "table": {
          "caption": "List of all registered patients",
          "name": "Patient Name",
          "age": "Age",
          "condition": "Condition",
          "device_type": "Device Type",
          "status": "Status",
          "last_visit": "Last Visit",
          "next_visit": "Next Visit",
          "actions": "Actions",
          "view": "View",
          "edit": "Edit",
          "delete": "Delete",
          "no_patients": "No patients match your search"
        },
        "dialog": {
          "add_title": "Add New Patient",
          "edit_title": "Edit Patient Data",
          "name": "Patient Name",
          "name_placeholder": "Full Name",
          "age": "Age",
          "gender": "Gender",
          "gender_male": "Male",
          "gender_female": "Female",
          "phone": "Phone Number",
          "phone_placeholder": "Phone Number",
          "condition": "Condition Description",
          "device_type": "Device Type",
          "status": "File Status",
          "next_visit": "Next Visit Date",
          "notes": "Medical Notes",
          "files": "Files & Attachments",
          "upload": "Upload New File",
          "save": "Save Data",
          "cancel": "Cancel",
          "confirm_delete": "Are you sure you want to delete this patient? This action cannot be undone."
        },
        "measurements": {
          "afo": {
            "title": "AFO Brace",
            "footLength": "Foot Length",
            "footWidth": "Foot Width",
            "ankleCircumference": "Ankle Circumference",
            "calfCircumference": "Calf Circumference",
            "ankleToKnee": "Ankle to Knee Distance"
          },
          "kafo": {
            "title": "KAFO Brace",
            "footLength": "Foot Length",
            "footWidth": "Foot Width",
            "ankleCircumference": "Ankle Circumference",
            "calfCircumference": "Calf Circumference",
            "kneeCircumference": "Knee Circumference",
            "thighCircumference": "Thigh Circumference",
            "ankleToKnee": "Ankle to Knee Distance",
            "kneeToHip": "Knee to Hip Distance"
          },
          "below_knee": {
            "title": "Below Knee Prosthetic",
            "residualLength": "Residual Limb Length",
            "residualCircumference": "Residual Limb Circumference",
            "kneeCircumference": "Knee Circumference",
            "calfShape": "Calf Shape",
            "footSize": "Foot Size"
          },
          "above_knee": {
            "title": "Above Knee Prosthetic",
            "residualLength": "Residual Limb Length",
            "residualCircumference": "Residual Limb Circumference",
            "hipCircumference": "Hip Circumference",
            "residualShape": "Residual Limb Shape",
            "kneeType": "Knee Type",
            "footSize": "Foot Size"
          },
          "units": {
            "cm": "cm"
          }
        }
      },
      "centers": {
        "badge": "Our Network",
        "title": "Prosthetics & Orthotics Centers",
        "desc": "Explore our connected network of centers across Egypt. We link our experts and centers to ensure you receive the highest quality service, wherever you are.",
        "cities": {
          "cairo": "Cairo",
          "alex": "Alexandria"
        },
        "main_center": "Main Center",
        "search_placeholder": "Search for a center...",
        "regions": ["All", "Greater Cairo", "Alexandria", "Delta", "Upper Egypt"],
        "view_details": "View Details",
        "data": [
          {
            "id": "1",
            "name": "Wasel - Main Center",
            "location": "Cairo",
            "address": "Tahrir St, Downtown, Cairo",
            "phone": "02-123-4567",
            "workingHours": "Sat - Thu: 9 AM - 9 PM",
            "image": "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
            "region": "Greater Cairo"
          },
          {
            "id": "2",
            "name": "Orthomedics - Alex Branch",
            "location": "Alexandria",
            "address": "Corniche St, Smouha, Alexandria",
            "phone": "03-456-7890",
            "workingHours": "Sat - Thu: 10 AM - 8 PM",
            "image": "https://images.unsplash.com/photo-1586773860418-d37222d8fce3?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
            "region": "Alexandria"
          },
          {
            "id": "3",
            "name": "Wasel Center - Mansoura",
            "location": "Mansoura",
            "address": "Gomhouria St, Doctors Tower, 3rd Floor, Mansoura",
            "phone": "050-123-4567",
            "workingHours": "Sat - Thu: 9 AM - 9 PM",
            "image": "https://images.unsplash.com/photo-1629909613654-28e377c37b09?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
            "region": "Delta"
          },
          {
            "id": "4",
            "name": "Wasel Center - Assiut",
            "location": "Assiut",
            "address": "Gomhouria St, Noor Tower, Assiut",
            "phone": "088-123-4567",
            "workingHours": "Sat - Thu: 9 AM - 8 PM",
            "image": "https://images.unsplash.com/photo-1551190822-a9333d879b1f?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
            "region": "Upper Egypt"
          },
          {
            "id": "5",
            "name": "Wasel Center - Tanta",
            "location": "Tanta",
            "address": "Al Bahr St, Doctors Tower, Tanta",
            "phone": "040-123-4567",
            "workingHours": "Sat - Thu: 9 AM - 9 PM",
            "image": "https://images.unsplash.com/photo-1538108149393-fbbd81895907?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
            "region": "Delta"
          }
        ]
      },
      "booking": {
        "badge": "Fast & Secure Booking",
        "title": "Book an Appointment",
        "desc": "Book your appointment easily via WhatsApp or Email and we will confirm with you immediately",
        "steps": {
          "personal": {
            "title": "Personal Information",
            "name_label": "Full Name",
            "name_placeholder": "Enter your full name",
            "phone_label": "Phone Number",
            "email_label": "Email Address",
            "age_label": "Age",
            "governorate_label": "Governorate",
            "governorate_placeholder": "Select Governorate"
          },
          "details": {
            "title": "Appointment Details",
            "date_label": "Date",
            "time_label": "Time",
            "type_label": "Appointment Type",
            "service_label": "Requested Service",
            "service_placeholder": "Select Service"
          },
          "files": {
            "title": "Attachments & Method",
            "upload_label": "Attach photos or reports (up to 5 files)",
            "upload_placeholder": "Click to upload photos or reports",
            "max_size": "up to 10MB",
            "notes_label": "Additional Notes",
            "notes_placeholder": "Write any notes or additional details about your case..."
          }
        },
        "methods": {
          "method_label": "Sending Method",
          "whatsapp": {
            "title": "WhatsApp",
            "desc": "Fast & direct response"
          },
          "email": {
            "title": "Email",
            "desc": "With full details"
          }
        },
        "nav": {
          "prev": "Previous",
          "next": "Next",
          "sending": "Sending...",
          "send_whatsapp": "Send via WhatsApp",
          "send_email": "Send via Email"
        },
        "success": {
          "title": "Booking request sent successfully! 🎉",
          "whatsapp_desc": "WhatsApp opened with the ready booking message. Send it to confirm your appointment.",
          "email_desc": "Booking details sent via email. We will contact you soon to confirm the appointment.",
          "footer": "We will contact you within 24 hours to confirm the appointment",
          "book_another": "Book Another Appointment"
        },
        "note": {
          "title": "Important Note",
          "desc": "After sending the booking request, we will contact you within 24 hours to confirm the appointment. You can attach photos or medical reports to speed up the evaluation process. Working hours: Sat - Thu, 9 AM - 6 PM."
        },
        "toasts": {
          "whatsapp_success": "WhatsApp opened successfully! Send the message to confirm booking",
          "email_success": "Booking request sent successfully via email!",
          "error": "An error occurred while sending. Please try again.",
          "fill_fields": "Please fill all required fields"
        },
        "appointment_types": [
          { "value": "معاينة", "label": "Consultation", "desc": "Initial examination and case evaluation", "color": "from-blue-500 to-blue-600" },
          { "value": "قياس", "label": "Measurement", "desc": "Taking measurements and specifying details", "color": "from-purple-500 to-purple-600" },
          { "value": "تركيب", "label": "Fitting", "desc": "Trial and fitting of the device", "color": "from-teal-500 to-teal-600" },
          { "value": "متابعة", "label": "Follow-up", "desc": "Periodic check to ensure efficiency", "color": "from-amber-500 to-amber-600" },
          { "value": "صيانة", "label": "Maintenance", "desc": "Repair or adjustment of the device", "color": "from-red-500 to-red-600" }
        ],
        "service_types": [
          "Below Knee Prosthetic", "Above Knee Prosthetic", "Hand Prosthetic",
          "AFO Brace", "KAFO Brace", "Spinal Brace", "Hand/Wrist Brace",
          "Orthopedic Shoe", "Orthopedic Insole", "Other"
        ],
        "governorates": [
          "Cairo", "Giza", "Alexandria", "Dakahlia", "Mansoura", "Sharqia",
          "Gharbia", "Kafr El Sheikh", "Beheira", "Menofia", "Qalyubia", "Fayoum",
          "Beni Suef", "Minya", "Assiut", "Sohag", "Qena", "Luxor", "Aswan",
          "Damietta", "Port Said", "Ismailia", "Suez", "North Sinai", "South Sinai",
          "Red Sea", "New Valley", "Matrouh"
        ],
        "whatsapp_msg": {
          "header": "New Appointment Booking - Wasel",
          "name": "Name",
          "phone": "Phone",
          "email": "Email",
          "age": "Age",
          "governorate": "Governorate",
          "date": "Date",
          "time": "Time",
          "type": "Appointment Type",
          "service": "Requested Service",
          "notes": "Notes",
          "attachments": "Attachments",
          "files_note": "file(s) (will be sent in the next message)"
        },
        "email_subject": "New Appointment Booking"
      },
      "team": {
        "badge": "Our Team",
        "title": "Meet Our Specialized Team",
        "desc": "We are proud of our distinguished team of experts and specialists who work together to provide the best solutions and services in the field of orthoses and prosthetics.",
        "members_title": "Team Members",
        "expertise_label": "Expertise",
        "values_title": "Our Team Values",
        "values": {
          "teamwork": {
            "title": "Teamwork",
            "desc": "We work as one integrated team, cooperating together to achieve the best results for our clients. Each team member contributes their experience and skills to serve the common goal."
          },
          "innovation": {
            "title": "Continuous Innovation",
            "desc": "We encourage creative thinking and continuous research for innovative solutions. We always strive to develop and adopt the latest technologies and methods in our field."
          },
          "care": {
            "title": "Care & Compassion",
            "desc": "We treat our clients with care and compassion, understanding their needs and feelings. We strive to provide psychological support alongside technical solutions."
          }
        },
        "join": {
          "title": "Join Our Team",
          "desc": "We are always looking for distinguished and passionate talent to join our team. If you want to work in a dynamic and innovative environment and share our passion for helping others, we welcome you.",
          "jobs_title": "Available Jobs",
          "jobs": [
            { "title": "Prosthetics Specialist", "type": "Full Time" },
            { "title": "Manufacturing Technician", "type": "Full Time" },
            { "title": "Physical Therapist", "type": "Part Time" }
          ],
          "contact_desc": "To apply, please send your CV and a cover letter explaining why you want to join us to:"
        },
        "cta": {
          "title": "Connect with Our Team Today",
          "desc": "Get a free consultation and find out how our experts can help you get the right solution.",
          "button": "Contact Us"
        },
        "members": [
          {
            "id": 1,
            "name": "Mahmoud Ebrahim",
            "role": "Founder & Prosthetist/Orthotist",
            "image": "/images/mahmoud.jpg",
            "bio": "Graduate of New Cairo Technological University, specializing in the design and manufacture of prosthetics and orthotics. He has extensive experience in the field and always seeks to provide the latest technologies and innovative solutions for patients.",
            "expertise": ["Prosthetic Design", "Orthotic Braces", "Advanced Case Assessment"]
          },
          {
            "id": 2,
            "name": "Nader Ebrahim",
            "role": "Prosthetic Fitting Specialist",
            "image": "/images/nader.jpeg",
            "bio": "Specialized in fitting and adjusting prosthetics with high precision, with more than 3 years of experience in the field. He is characterized by his high technical skills and accuracy in work, ensuring patients get the best results and highest levels of comfort.",
            "expertise": ["Prosthetic Adjustment", "Gait and Mobility Assessment", "Maintenance and Repair"]
          },
          {
            "id": 3,
            "name": "Bassel Hany",
            "role": "Orthotics & Modern Silicone Specialist",
            "image": "/images/bassel.jpg",
            "bio": "Specialized in designing and manufacturing custom medical orthoses. He has deep knowledge of anatomy and body mechanics, enabling him to design braces that meet the precise needs of each patient. He always strives to develop his skills and acquire the latest technologies in the field.",
            "expertise": ["Spinal Braces", "Knee and Ankle Braces", "Specialized Pediatric Orthoses"]
          }
        ]
      },


      "not_found": {
        "title": "404 - Page Not Found",
        "message": "Sorry, the page you are looking for does not exist.",
        "back_home": "Back to Home"
      },
      "center_details": {
        "contact_info": "Contact Information",
        "address": "Address",
        "phone": "Phone Number",
        "working_hours": "Working Hours",
        "services": "Our Services",
        "branches": "Our Branches",
        "team": "Our Specialized Team",
        "book_appointment": "Book Appointment",
        "data": {
          "name": "Wasel - Main Center",
          "desc": "A specialized center providing the latest prosthetic and orthotic services with the highest international quality standards. We combine long experience with advanced technologies to provide customized solutions that suit each patient's needs.",
          "location": "Cairo",
          "addr": "Tahrir St, Downtown, Cairo",
          "hours": "Sat - Thu: 9 AM - 9 PM",
          "services_list": [
            "Upper Limb Prosthetics",
            "Lower Limb Prosthetics",
            "Spinal Orthotics",
            "Limb Orthotics",
            "Ankle Foot Orthoses",
            "Custom Medical Shoes"
          ],
          "branches": {
            "nasr": "Nasr City Branch",
            "maadi": "Maadi Branch"
          },
          "titles": {
            "prosthetist": "Prosthetics Specialist",
            "orthotist": "Orthotics Specialist"
          }
        }
      },
      "footer": {
        "desc": "The best solutions for medical orthoses and prosthetics in Egypt with the latest technologies and international standards for 2025.",
        "quick_links": "Quick Links",
        "contact_us": "Contact Us",
        "location": "Mansoura, Egypt",
        "copyright": "Copyright {{year}} All rights reserved by Mahmoud Ebrahim Mosaad"
      },
      "orthoses": orthosesEn,
      "prosthetics": prostheticsEn
    }
  }
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: 'ar',
    interpolation: {
      escapeValue: false, // not needed for react as it escapes by default
    }
  });

export default i18n;
