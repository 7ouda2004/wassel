import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Users, FileText, PlusCircle, X, Edit, Trash, Save, 
  Search, Download, Upload, ChevronDown, FileUp, UserCheck, Briefcase, Camera, Building, Sparkles, Image as ImageIcon, Eye, Calendar, Award, MapPin, Phone
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogDescription,
} from "@/components/ui/dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { toast } from "sonner";
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { 
  getLocalSpecialists, saveLocalSpecialists, type Specialist,
  getLocalCenters, saveLocalCenters, type Center, type CaseStudy,
  FALLBACK_SPECIALIST_IMAGES, DEFAULT_CASES, EGYPT_GOVERNORATES
} from '@/lib/db';
import { uploadLocalData } from '@/lib/registrations';

type Patient = {
  id: number | string;
  name: string;
  age: number | string;
  gender: string;
  phone: string;
  governorate?: string;
  category?: string;
  condition: string;
  deviceType: string;
  measurements: Record<string, string>;
  status: string;
  lastVisit: string;
  nextVisit: string;
  notes: string;
  files?: string[];
};

const PROSTHETIC_ORTHOTIC_CATEGORIES = [
  'بتر تحت الركبة (Transtibial)',
  'بتر فوق الركبة (Transfemoral)',
  'بتر الطرف العلوي واليد (Upper Limb / Arm)',
  'بتر مفصل الكاحل / الحوض (Disarticulation)',
  'جبائر الكاحل والقدم (AFO - Ankle Foot Orthosis)',
  'جبائر الركبة والكاحل (KAFO - Knee Ankle Foot Orthosis)',
  'جبائر العمود الفقري والدعامة (TLSO / Spine Braces)',
  'أحذية وفرش طبي تقويمي (Custom Orthotics & Shoes)'
] as const;

const initialPatients: Patient[] = [
  {
    id: 1,
    name: 'أحمد محمد علي',
    age: 35,
    gender: 'ذكر',
    phone: '01119056895',
    governorate: 'القاهرة',
    category: 'بتر تحت الركبة (Transtibial)',
    condition: 'بتر تحت الركبة - الساق اليمنى ناتج عن حادث مروري',
    deviceType: 'طرف صناعي سفي ذكي بزاوية كربون مرنة',
    measurements: {
      residualLength: '16 سم',
      residualCircumference: '32 سم',
      kneeCircumference: '38 سم',
      footSize: '42',
      weightHeight: '75 كجم / 178 سم',
      socketType: 'سوكيت سيليكون كربوني مرن (Inner Liner + Carbon Shell)',
      componentType: 'قدم كربونية ممتصة للصدمات Dynamic Carbon Foot'
    },
    status: 'تم التسليم والضبط',
    lastVisit: '2026-02-10',
    nextVisit: '2026-04-10',
    notes: 'المريض يتقدم بشكل ممتاز في التأقلم مع الطرف الصناعي. تم تعديل المقاس وضبط المحاذاة الحركية.'
  },
  {
    id: 2,
    name: 'فاطمة خالد محمود',
    age: 28,
    gender: 'أنثى',
    phone: '01119056895',
    governorate: 'الإسكندرية',
    category: 'جبائر الكاحل والقدم (AFO - Ankle Foot Orthosis)',
    condition: 'ضعف عضلات القدم والكاحل وسقوط القدم اليسرى',
    deviceType: 'جبيرة AFO كربونية ديناميكية خفيفة الوزن',
    measurements: {
      footLength: '24 سم',
      footWidth: '9 سم',
      ankleCircumference: '22 سم',
      calfCircumference: '34 سم',
      ankleToKnee: '38 سم',
      socketType: 'جبيرة AFO مخصصة بحشوة سيليكون تمنع الاحتكاك',
      componentType: 'مفصل كاحل ديناميكي مع تحديد الزاوية الحركية'
    },
    status: 'متابعة دورية',
    lastVisit: '2026-01-15',
    nextVisit: '2026-03-15',
    notes: 'تحسن ملحوظ في المشي بعد استخدام الجبيرة وتثبيت الكاحل أثناء أخذ الخطوات.'
  }
];

const SpecialistDashboard = () => {
  const [patients, setPatients] = useState<Patient[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentSpecialist, setCurrentSpecialist] = useState<Specialist | null>(null);
  const [centerSpecialists, setCenterSpecialists] = useState<Specialist[]>([]);
  const [isCenterAccount, setIsCenterAccount] = useState(false);

  // Profile Edit Form State
  const [profileName, setProfileName] = useState('');
  const [profileUsername, setProfileUsername] = useState('');
  const [profilePassword, setProfilePassword] = useState('');
  const [profileRole, setProfileRole] = useState('');
  const [profileBio, setProfileBio] = useState('');
  const [profilePhone, setProfilePhone] = useState('');
  const [profileImage, setProfileImage] = useState('');
  const [profileExpertise, setProfileExpertise] = useState('');
  const [profileCases, setProfileCases] = useState<CaseStudy[]>([]);
  const [profileFacebook, setProfileFacebook] = useState('');
  const [profileInstagram, setProfileInstagram] = useState('');
  const [profileLinkedin, setProfileLinkedin] = useState('');

  // Case Study Add Input with Before & After Images
  const [caseTitle, setCaseTitle] = useState('');
  const [caseDeviceType, setCaseDeviceType] = useState('طرف صناعي / جهاز تقويمي مخصص');
  const [caseDesc, setCaseDesc] = useState('');
  const [caseOutcome, setCaseOutcome] = useState('استعادة الحركة الطبيعية والتوازن والاستقلالية بالكامل.');
  const [caseBeforeImage, setCaseBeforeImage] = useState('');
  const [caseAfterImage, setCaseAfterImage] = useState('');

  // Add Center Specialist Modal State
  const [isAddingCenterSpec, setIsAddingCenterSpec] = useState(false);
  const [newSpecName, setNewSpecName] = useState('');
  const [newSpecUsername, setNewSpecUsername] = useState('');
  const [newSpecRole, setNewSpecRole] = useState('أخصائي أطراف صناعية وجبائر طبية');
  const [newSpecPhone, setNewSpecPhone] = useState('');

  // Patient Modal States
  const [isAddingPatient, setIsAddingPatient] = useState(false);
  const [selectedPatient, setSelectedPatient] = useState<Patient | null>(null);

  // New Patient Form State
  const [pName, setPName] = useState('');
  const [pAge, setPAge] = useState('');
  const [pGender, setPGender] = useState('ذكر');
  const [pPhone, setPPhone] = useState('01119056895');
  const [pGov, setPGov] = useState('القاهرة');
  const [pCategory, setPCategory] = useState<string>(PROSTHETIC_ORTHOTIC_CATEGORIES[0]);
  const [pCondition, setPCondition] = useState('');
  const [pDeviceType, setPDeviceType] = useState('');
  const [pStatus, setPStatus] = useState('تحت المقاس والتقييم');
  const [pLastVisit, setPLastVisit] = useState(new Date().toISOString().split('T')[0]);
  const [pNextVisit, setPNextVisit] = useState('');
  const [pNotes, setPNotes] = useState('');
  
  // Measurements Form Inputs
  const [mResidualLength, setMResidualLength] = useState('');
  const [mResidualCircumference, setMResidualCircumference] = useState('');
  const [mJointCircumference, setMJointCircumference] = useState('');
  const [mFootSize, setMFootSize] = useState('');
  const [mWeightHeight, setMWeightHeight] = useState('');
  const [mSocketType, setMSocketType] = useState('');
  const [mComponentType, setMComponentType] = useState('');

  useEffect(() => {
    document.documentElement.dir = 'rtl';
    document.body.classList.add('font-cairo');
    
    // Auth Check
    const username = sessionStorage.getItem('username');
    const isSpec = sessionStorage.getItem('isSpecialist') === 'true';
    const isCenter = sessionStorage.getItem('isCenter') === 'true';
    setIsCenterAccount(isCenter);

    if (!isSpec || !username) {
      toast.error('يرجى تسجيل الدخول أولاً للوصول للوحة التحكم');
      window.location.href = '/login';
      return;
    }

    const allSpecs = getLocalSpecialists();
    const found = allSpecs.find(s => s.username.toLowerCase() === username.toLowerCase()) || allSpecs[0];

    if (found) {
      setCurrentSpecialist(found);
      setProfileName(found.name);
      setProfileUsername(found.username || '');
      setProfilePassword(found.password || 'specialist123');
      setProfileRole(found.role);
      setProfileBio(found.bio || '');
      setProfilePhone(found.phone || '');
      setProfileImage(found.image || FALLBACK_SPECIALIST_IMAGES[0]);
      setProfileExpertise(found.expertise ? found.expertise.join('، ') : '');
      setProfileCases(found.casesWorkedOn || DEFAULT_CASES);
      setProfileFacebook(found.facebook || '');
      setProfileInstagram(found.instagram || '');
      setProfileLinkedin(found.linkedin || '');

      if (found.centerId || found.centerName) {
        const sameCenterSpecs = allSpecs.filter(s => s.centerId === found.centerId || s.centerName === found.centerName);
        setCenterSpecialists(sameCenterSpecs);
      }
    }

    // Load patients from LocalStorage
    const savedPatients = localStorage.getItem('patients');
    if (savedPatients) {
      try {
        setPatients(JSON.parse(savedPatients));
      } catch (e) {
        setPatients(initialPatients);
      }
    } else {
      setPatients(initialPatients);
      localStorage.setItem('patients', JSON.stringify(initialPatients));
    }
  }, []);

  // Save Specialist Profile Changes
  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentSpecialist) return;

    const expArray = profileExpertise
      ? profileExpertise.split(/[،,]/).map(s => s.trim()).filter(Boolean)
      : ['الأطراف الصناعية', 'الجبائر الطبية'];

    const updatedSpec: Specialist = {
      ...currentSpecialist,
      name: profileName,
      username: profileUsername || currentSpecialist.username,
      password: profilePassword || currentSpecialist.password || 'specialist123',
      role: profileRole,
      bio: profileBio,
      phone: profilePhone,
      image: profileImage || FALLBACK_SPECIALIST_IMAGES[0],
      expertise: expArray,
      casesWorkedOn: profileCases,
      facebook: profileFacebook,
      instagram: profileInstagram,
      linkedin: profileLinkedin
    };

    const allSpecs = getLocalSpecialists();
    const updatedAll = allSpecs.map(s => s.id === updatedSpec.id ? updatedSpec : s);
    saveLocalSpecialists(updatedAll);
    uploadLocalData(updatedAll, getLocalCenters());
    setCurrentSpecialist(updatedSpec);
    sessionStorage.setItem('username', updatedSpec.username);

    toast.success('تم تحديث البروفايل والمعلومات الشخصية وسابقة الأعمال بنجاح!');
  };

  // Image Helper for Before & After Images
  const handleBeforeFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setCaseBeforeImage(reader.result as string);
        toast.success('تم رفع ومعاينة صورة قبل التركيب!');
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAfterFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setCaseAfterImage(reader.result as string);
        toast.success('تم رفع ومعاينة صورة بعد التعافي!');
      };
      reader.readAsDataURL(file);
    }
  };

  // Add Case Study to Profile
  const handleAddCase = () => {
    if (!caseTitle.trim()) {
      toast.error('يرجى إدخال عنوان الحالة');
      return;
    }
    const newCase: CaseStudy = {
      id: 'case_' + Date.now().toString(),
      title: caseTitle,
      deviceType: caseDeviceType || 'جهاز / طرف صناعي مخصص',
      description: caseDesc || 'تم تركيب وضبط وتأهيل الحالة بنجاح وفق أعلى معايير الجودة الطبية.',
      outcome: caseOutcome || 'استعادة التوازن والقدرة الحركية الكاملة.',
      beforeImage: caseBeforeImage,
      afterImage: caseAfterImage
    };
    
    const updatedCases = [...profileCases, newCase];
    setProfileCases(updatedCases);

    if (currentSpecialist) {
      const updatedSpec = { ...currentSpecialist, casesWorkedOn: updatedCases };
      setCurrentSpecialist(updatedSpec);
      const allSpecs = getLocalSpecialists();
      const updatedAll = allSpecs.map(s => s.id === updatedSpec.id ? updatedSpec : s);
      saveLocalSpecialists(updatedAll);
      uploadLocalData(updatedAll, getLocalCenters());
    }

    setCaseTitle('');
    setCaseDesc('');
    setCaseBeforeImage('');
    setCaseAfterImage('');
    toast.success('تمت إضافة الحالة وصور قبل وبعد لسجل إنجازاتك بنجاح!');
  };

  // Remove Case Study from Profile
  const handleRemoveCase = (caseId: string) => {
    const updatedCases = profileCases.filter(c => c.id !== caseId);
    setProfileCases(updatedCases);

    if (currentSpecialist) {
      const updatedSpec = { ...currentSpecialist, casesWorkedOn: updatedCases };
      setCurrentSpecialist(updatedSpec);
      const allSpecs = getLocalSpecialists();
      const updatedAll = allSpecs.map(s => s.id === updatedSpec.id ? updatedSpec : s);
      saveLocalSpecialists(updatedAll);
      uploadLocalData(updatedAll, getLocalCenters());
    }

    toast.success('تم حذف الحالة من سجل أعمالك');
  };

  // Profile Image Helper
  const handleImageFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileImage(reader.result as string);
        toast.success('تم تحميل ومعاينة صورتك الجديدة بنجاح!');
      };
      reader.readAsDataURL(file);
    }
  };

  // Add Specialist to Center (Allowed ONLY for Center Managers / Admins)
  const handleAddCenterSpecialist = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newSpecName.trim() || !newSpecUsername.trim()) {
      toast.error('أدخل اسم واسم مستخدم الأخصائي');
      return;
    }

    const newSpec: Specialist = {
      id: 'spec_' + Date.now().toString(),
      name: newSpecName,
      username: newSpecUsername,
      password: 'specialist123',
      role: newSpecRole,
      bio: 'أخصائي معتمد بالفرع.',
      image: FALLBACK_SPECIALIST_IMAGES[Math.floor(Math.random() * FALLBACK_SPECIALIST_IMAGES.length)],
      expertise: ['الأطراف الصناعية', 'الجبائر الطبية'],
      status: 'active',
      phone: newSpecPhone,
      centerId: currentSpecialist?.centerId,
      centerName: currentSpecialist?.centerName
    };

    const allSpecs = getLocalSpecialists();
    const updated = [newSpec, ...allSpecs];
    saveLocalSpecialists(updated);
    uploadLocalData(updated, getLocalCenters());
    setCenterSpecialists(prev => [newSpec, ...prev]);

    setIsAddingCenterSpec(false);
    setNewSpecName('');
    setNewSpecUsername('');
    setNewSpecPhone('');
    toast.success(`تمت إضافة الأخصائي ${newSpecName} بنجاح للفرع!`);
  };

  // Add New Patient Record
  const handleSavePatient = (e: React.FormEvent) => {
    e.preventDefault();
    if (!pName.trim() || !pCondition.trim()) {
      toast.error('يرجى كتابة اسم المريض والتشخيص الفني');
      return;
    }

    const newPatient: Patient = {
      id: 'patient_' + Date.now().toString(),
      name: pName,
      age: pAge || 30,
      gender: pGender,
      phone: pPhone,
      governorate: pGov,
      category: pCategory,
      condition: pCondition,
      deviceType: pDeviceType || 'طرف / جهاز تقويمي مخصص',
      measurements: {
        residualLength: mResidualLength ? `${mResidualLength} سم` : 'غير محدد',
        residualCircumference: mResidualCircumference ? `${mResidualCircumference} سم` : 'غير محدد',
        kneeCircumference: mJointCircumference ? `${mJointCircumference} سم` : 'غير محدد',
        footSize: mFootSize || 'غير محدد',
        weightHeight: mWeightHeight || 'غير محدد',
        socketType: mSocketType || 'سوكيت كربوني مخصص',
        componentType: mComponentType || 'مكونات طبية معتمدة'
      },
      status: pStatus,
      lastVisit: pLastVisit || new Date().toISOString().split('T')[0],
      nextVisit: pNextVisit || 'غير محدد',
      notes: pNotes || 'تم تسجيل الحساب وأخذ المقاسات الأولية بالمركز.'
    };

    const updatedPatients = [newPatient, ...patients];
    setPatients(updatedPatients);
    localStorage.setItem('patients', JSON.stringify(updatedPatients));

    setIsAddingPatient(false);
    setPName('');
    setPCondition('');
    setPDeviceType('');
    setMResidualLength('');
    setMResidualCircumference('');
    setMJointCircumference('');
    setMFootSize('');
    setMWeightHeight('');
    setMSocketType('');
    setMComponentType('');
    setPNotes('');

    toast.success(`تم تسجيل وتوثيق حالة المريض ${pName} ومقاساته بنجاح!`);
  };

  // Delete Patient Record
  const handleDeletePatient = (patientId: number | string) => {
    const updated = patients.filter(p => p.id !== patientId);
    setPatients(updated);
    localStorage.setItem('patients', JSON.stringify(updated));
    if (selectedPatient?.id === patientId) setSelectedPatient(null);
    toast.success('تم حذف حالة المريض من السجل بنجاح');
  };

  const filteredPatients = patients.filter(p => 
    p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    p.condition.toLowerCase().includes(searchTerm.toLowerCase()) ||
    p.deviceType.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (p.category && p.category.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <div className="min-h-screen flex flex-col bg-slate-50/50">
      <Navbar />

      <main className="flex-grow py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Header Profile Badge */}
          {currentSpecialist && (
            <div className="bg-gradient-to-r from-medical-950 via-medical-900 to-medical-800 text-white rounded-3xl p-6 sm:p-8 shadow-xl mb-8 flex flex-col md:flex-row items-center justify-between gap-6">
              <div className="flex items-center gap-5">
                <img 
                  src={profileImage || FALLBACK_SPECIALIST_IMAGES[0]} 
                  alt={profileName}
                  className="w-20 h-20 rounded-full object-cover border-4 border-white/20 shadow-lg"
                  onError={(e) => { e.currentTarget.src = FALLBACK_SPECIALIST_IMAGES[0]; }}
                />
                <div>
                  <div className="inline-flex items-center gap-1.5 bg-white/10 px-3 py-0.5 rounded-full text-xs font-bold mb-1 border border-white/15">
                    <UserCheck className="w-3.5 h-3.5 text-emerald-400" />
                    لوحة تحكم الأخصائي المعتمد
                  </div>
                  <h1 className="text-2xl sm:text-3xl font-extrabold font-cairo">{profileName}</h1>
                  <p className="text-medical-200 text-xs mt-1 font-semibold">{profileRole} - {currentSpecialist.centerName || 'مركز واصل المعتمد'}</p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <span className="bg-emerald-500/20 border border-emerald-400/40 text-emerald-300 text-xs font-bold px-4 py-2 rounded-xl">
                  حساب معتمد ونشط
                </span>
              </div>
            </div>
          )}

          {/* Main Dashboard Tabs */}
          <Tabs defaultValue="profile" className="w-full">
            <TabsList className="bg-white p-1.5 rounded-2xl border border-gray-200/80 mb-8 flex justify-start overflow-x-auto">
              <TabsTrigger value="profile" className="rounded-xl font-bold py-2.5 px-5 gap-2">
                <Edit className="w-4 h-4 text-medical-600" />
                تعديل البروفايل وسابقة الأعمال
              </TabsTrigger>

              <TabsTrigger value="patients" className="rounded-xl font-bold py-2.5 px-5 gap-2">
                <Users className="w-4 h-4 text-amber-600" />
                متابعة مقاسات وحالات المرضى ({patients.length})
              </TabsTrigger>

              {isCenterAccount && (
                <TabsTrigger value="center_specs" className="rounded-xl font-bold py-2.5 px-5 gap-2">
                  <Building className="w-4 h-4 text-emerald-600" />
                  إدارة أخصائيي المركز ({centerSpecialists.length})
                </TabsTrigger>
              )}
            </TabsList>

            {/* TAB 1: EDIT PROFILE & CASES */}
            <TabsContent value="profile" className="space-y-6">
              <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-gray-100">
                <div className="flex items-center justify-between pb-4 mb-6 border-b border-gray-100">
                  <div>
                    <h2 className="text-xl font-bold text-gray-900 font-cairo">تحديث البروفايل والصورة وبيانات الدخول</h2>
                    <p className="text-xs text-gray-500 mt-0.5">تظهر هذه المعلومات في ملفك الشخصي الرسمي الذي يتصفحه المرضى.</p>
                  </div>
                </div>

                <form onSubmit={handleSaveProfile} className="space-y-6">
                  
                  {/* Photo Edit */}
                  <div className="p-5 bg-slate-50/70 rounded-2xl border border-gray-200/80 flex flex-col sm:flex-row items-center gap-6">
                    <div className="relative">
                      <img 
                        src={profileImage || FALLBACK_SPECIALIST_IMAGES[0]} 
                        alt="معاينة الصورة"
                        className="w-24 h-24 rounded-full object-cover border-4 border-white shadow-md"
                        onError={(e) => { e.currentTarget.src = FALLBACK_SPECIALIST_IMAGES[0]; }}
                      />
                    </div>
                    <div className="space-y-2 flex-grow">
                      <Label className="text-xs font-bold text-gray-800 block flex items-center gap-1.5">
                        <Camera className="w-4 h-4 text-medical-600" />
                        تغيير صورتك الشخصية الرسمية
                      </Label>
                      <div className="flex flex-col sm:flex-row gap-2">
                        <Input 
                          type="file" 
                          accept="image/*"
                          onChange={handleImageFileChange}
                          className="text-xs bg-white rounded-xl"
                        />
                        <Input 
                          type="text" 
                          value={profileImage}
                          onChange={(e) => setProfileImage(e.target.value)}
                          placeholder="أو ضع رابط الصورة هنا..."
                          className="text-xs rounded-xl"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label className="text-xs font-bold text-gray-700 mb-1.5 block">الاسم بالكامل *</Label>
                      <Input 
                        value={profileName} 
                        onChange={(e) => setProfileName(e.target.value)}
                        className="rounded-xl h-11"
                        required
                      />
                    </div>
                    <div>
                      <Label className="text-xs font-bold text-gray-700 mb-1.5 block">الوظيفة / التخصص *</Label>
                      <Input 
                        value={profileRole} 
                        onChange={(e) => setProfileRole(e.target.value)}
                        className="rounded-xl h-11"
                        required
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label className="text-xs font-bold text-gray-700 mb-1.5 block">اسم المستخدم (للدخول) *</Label>
                      <Input 
                        value={profileUsername} 
                        onChange={(e) => setProfileUsername(e.target.value)}
                        className="rounded-xl h-11 font-mono"
                        required
                      />
                    </div>
                    <div>
                      <Label className="text-xs font-bold text-gray-700 mb-1.5 block">كلمة المرور *</Label>
                      <Input 
                        type="text"
                        value={profilePassword} 
                        onChange={(e) => setProfilePassword(e.target.value)}
                        className="rounded-xl h-11 font-mono"
                        required
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label className="text-xs font-bold text-gray-700 mb-1.5 block">رقم الواتساب للتواصل</Label>
                      <Input 
                        value={profilePhone} 
                        onChange={(e) => setProfilePhone(e.target.value)}
                        className="rounded-xl h-11 font-mono"
                      />
                    </div>
                    <div>
                      <Label className="text-xs font-bold text-gray-700 mb-1.5 block">مجالات الخبرة (مفصولة بفواصل)</Label>
                      <Input 
                        value={profileExpertise} 
                        onChange={(e) => setProfileExpertise(e.target.value)}
                        placeholder="الأطراف الصناعية الذكية، الجبائر التقويمية، تقويم المشي"
                        className="rounded-xl h-11"
                      />
                    </div>
                  </div>

                  <div>
                    <Label className="text-xs font-bold text-gray-700 mb-1.5 block">نبذة عن خبراتك ومؤهلاتك الطبية</Label>
                    <Textarea 
                      value={profileBio} 
                      onChange={(e) => setProfileBio(e.target.value)}
                      rows={3}
                      className="rounded-xl"
                    />
                  </div>

                  {/* Social Media Links */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <Label className="text-xs font-bold text-gray-700 mb-1.5 block">رابط فيسبوك</Label>
                      <Input 
                        value={profileFacebook} 
                        onChange={(e) => setProfileFacebook(e.target.value)}
                        placeholder="https://facebook.com/..."
                        className="rounded-xl h-11 text-xs"
                        dir="ltr"
                      />
                    </div>
                    <div>
                      <Label className="text-xs font-bold text-gray-700 mb-1.5 block">رابط انستجرام</Label>
                      <Input 
                        value={profileInstagram} 
                        onChange={(e) => setProfileInstagram(e.target.value)}
                        placeholder="https://instagram.com/..."
                        className="rounded-xl h-11 text-xs"
                        dir="ltr"
                      />
                    </div>
                    <div>
                      <Label className="text-xs font-bold text-gray-700 mb-1.5 block">رابط لينكد إن</Label>
                      <Input 
                        value={profileLinkedin} 
                        onChange={(e) => setProfileLinkedin(e.target.value)}
                        placeholder="https://linkedin.com/in/..."
                        className="rounded-xl h-11 text-xs"
                        dir="ltr"
                      />
                    </div>
                  </div>

                  {/* Add Case Studies worked on + BEFORE & AFTER PHOTOS */}
                  <div className="p-5 bg-emerald-50/40 rounded-2xl border border-emerald-200/80 space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Briefcase className="w-5 h-5 text-emerald-600" />
                        <h3 className="font-bold text-sm text-gray-900">سجل الإنجازات والحالات المنجزة (مع صور قبل وبعد)</h3>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      <div>
                        <Label className="text-xs font-bold text-gray-700 mb-1 block">عنوان الحالة *</Label>
                        <Input 
                          value={caseTitle}
                          onChange={(e) => setCaseTitle(e.target.value)}
                          placeholder="مثال: تركيب طرف صناعي سفلي ذكي لمريض حادث"
                          className="text-xs bg-white rounded-xl h-10"
                        />
                      </div>
                      <div>
                        <Label className="text-xs font-bold text-gray-700 mb-1 block">نوع الطرف / الجهاز</Label>
                        <Input 
                          value={caseDeviceType}
                          onChange={(e) => setCaseDeviceType(e.target.value)}
                          placeholder="طرف سفلي تحت الركبة كربوني"
                          className="text-xs bg-white rounded-xl h-10"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      <div>
                        <Label className="text-xs font-bold text-gray-700 mb-1 block">تفاصيل الحالة والعملية</Label>
                        <Input 
                          value={caseDesc}
                          onChange={(e) => setCaseDesc(e.target.value)}
                          placeholder="تم المسح الضوئي وتصنيع سوكيت مخصص..."
                          className="text-xs bg-white rounded-xl h-10"
                        />
                      </div>
                      <div>
                        <Label className="text-xs font-bold text-gray-700 mb-1 block">نتيجة التأهيل</Label>
                        <Input 
                          value={caseOutcome}
                          onChange={(e) => setCaseOutcome(e.target.value)}
                          placeholder="استعاد القدرة على المشي وركوب الدراجة"
                          className="text-xs bg-white rounded-xl h-10"
                        />
                      </div>
                    </div>

                    {/* BEFORE & AFTER PHOTO UPLOADS */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-3 bg-white rounded-xl border border-emerald-100">
                      <div>
                        <Label className="text-xs font-bold text-rose-700 mb-1.5 block flex items-center gap-1">
                          <ImageIcon className="w-3.5 h-3.5 text-rose-600" />
                          صورة قبل التركيب / العلاج
                        </Label>
                        <div className="flex gap-2">
                          <Input 
                            type="file"
                            accept="image/*"
                            onChange={handleBeforeFileChange}
                            className="text-xs bg-gray-50 rounded-xl"
                          />
                          <Input 
                            type="text"
                            value={caseBeforeImage}
                            onChange={(e) => setCaseBeforeImage(e.target.value)}
                            placeholder="أو رابط الصورة..."
                            className="text-xs rounded-xl"
                          />
                        </div>
                        {caseBeforeImage && (
                          <div className="mt-2 h-20 w-32 rounded-lg overflow-hidden border border-rose-200">
                            <img src={caseBeforeImage} alt="قبل" className="w-full h-full object-cover" />
                          </div>
                        )}
                      </div>

                      <div>
                        <Label className="text-xs font-bold text-emerald-700 mb-1.5 block flex items-center gap-1">
                          <ImageIcon className="w-3.5 h-3.5 text-emerald-600" />
                          صورة بعد التعافي والتركيب
                        </Label>
                        <div className="flex gap-2">
                          <Input 
                            type="file"
                            accept="image/*"
                            onChange={handleAfterFileChange}
                            className="text-xs bg-gray-50 rounded-xl"
                          />
                          <Input 
                            type="text"
                            value={caseAfterImage}
                            onChange={(e) => setCaseAfterImage(e.target.value)}
                            placeholder="أو رابط الصورة..."
                            className="text-xs rounded-xl"
                          />
                        </div>
                        {caseAfterImage && (
                          <div className="mt-2 h-20 w-32 rounded-lg overflow-hidden border border-emerald-200">
                            <img src={caseAfterImage} alt="بعد" className="w-full h-full object-cover" />
                          </div>
                        )}
                      </div>
                    </div>

                    <Button type="button" onClick={handleAddCase} className="bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold px-6 py-2.5 shadow-sm">
                      <PlusCircle className="w-4 h-4 ml-1.5" />
                      إضافة الحالة وصور قبل وبعد لبروفايلك
                    </Button>

                    {/* LIST OF EXISTING CASES WITH BEFORE/AFTER & DELETE BUTTON */}
                    {profileCases.length > 0 && (
                      <div className="space-y-3 pt-3 border-t border-emerald-200/60">
                        <p className="text-xs font-bold text-gray-800">الحالات السابقة المعروضة في بروفايلك ({profileCases.length}):</p>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                          {profileCases.map((c) => (
                            <div key={c.id} className="bg-white p-4 rounded-2xl border border-gray-200 shadow-2xs space-y-2 relative">
                              <div className="flex justify-between items-start">
                                <div>
                                  <h4 className="font-bold text-xs text-gray-900">{c.title}</h4>
                                  <span className="text-[10px] font-semibold text-medical-700 block mt-0.5">{c.deviceType}</span>
                                </div>
                                <Button 
                                  type="button"
                                  size="sm"
                                  variant="ghost"
                                  onClick={() => handleRemoveCase(c.id)}
                                  className="h-7 w-7 p-0 text-rose-500 hover:text-rose-700 hover:bg-rose-50 rounded-lg"
                                  title="حذف هذه الحالة"
                                >
                                  <Trash className="w-4 h-4" />
                                </Button>
                              </div>

                              <p className="text-[11px] text-gray-600 leading-relaxed">{c.description}</p>
                              
                              {/* BEFORE & AFTER THUMBNAILS */}
                              {(c.beforeImage || c.afterImage) && (
                                <div className="grid grid-cols-2 gap-2 pt-1">
                                  {c.beforeImage && (
                                    <div className="space-y-0.5">
                                      <span className="text-[9px] font-bold text-rose-600 block">قبل التركيب:</span>
                                      <img src={c.beforeImage} alt="قبل" className="w-full h-20 object-cover rounded-lg border border-rose-100" />
                                    </div>
                                  )}
                                  {c.afterImage && (
                                    <div className="space-y-0.5">
                                      <span className="text-[9px] font-bold text-emerald-600 block">بعد التعافي:</span>
                                      <img src={c.afterImage} alt="بعد" className="w-full h-20 object-cover rounded-lg border border-emerald-100" />
                                    </div>
                                  )}
                                </div>
                              )}

                              <div className="pt-1">
                                <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full inline-block">
                                  النتيجة: {c.outcome}
                                </span>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>

                  <div className="pt-2">
                    <Button type="submit" className="bg-medical-700 hover:bg-medical-800 text-white font-bold rounded-xl px-8 py-5 text-sm shadow-md">
                      حفظ وتحديث البروفايل فوراً
                    </Button>
                  </div>
                </form>
              </div>
            </TabsContent>

            {/* TAB 2: PATIENTS LIST & DETAILED MEASUREMENTS */}
            <TabsContent value="patients" className="space-y-6">
              <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-gray-100">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6 pb-4 border-b border-gray-100">
                  <div>
                    <h2 className="text-xl font-bold text-gray-900 font-cairo">سجل قياسات ومتابعة حالات الأطراف والجبائر</h2>
                    <p className="text-xs text-gray-500 mt-0.5">تسجيل ومتابعة مقاسات الجذمور والمفاصل وأحجام السوكيت للمرضى.</p>
                  </div>

                  <Button 
                    onClick={() => setIsAddingPatient(true)}
                    className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl gap-2 text-xs py-5 shadow-md whitespace-nowrap"
                  >
                    <PlusCircle className="w-4 h-4" />
                    إضافة حالة / مريض جديد بمقاساته
                  </Button>
                </div>

                <div className="mb-6 relative">
                  <Input 
                    type="text" 
                    placeholder="ابحث باسم المريض، التشخيص، نوع الجبيرة أو التصنيف..." 
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="rounded-xl h-11 pr-10 border-gray-200"
                  />
                  <Search className="w-4 h-4 text-gray-400 absolute right-3 top-1/2 -translate-y-1/2" />
                </div>

                <div className="overflow-x-auto rounded-2xl border border-gray-100">
                  <Table>
                    <TableHeader className="bg-gray-50">
                      <TableRow>
                        <TableHead className="font-bold text-right text-gray-900">المريض والجهة</TableHead>
                        <TableHead className="font-bold text-right text-gray-900">التصنيف الفني</TableHead>
                        <TableHead className="font-bold text-right text-gray-900">الجهاز / الجبيرة المخصصة</TableHead>
                        <TableHead className="font-bold text-center text-gray-900">الحالة والمتابعة</TableHead>
                        <TableHead className="font-bold text-center text-gray-900">الإجراءات والقياسات</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredPatients.map((p) => (
                        <TableRow key={p.id} className="hover:bg-slate-50/60">
                          <TableCell className="font-bold text-gray-900">
                            <div>
                              <span className="font-bold text-sm block">{p.name}</span>
                              <span className="text-[11px] text-gray-400 font-mono block" dir="ltr">{p.phone}</span>
                              {p.governorate && <span className="text-[10px] text-medical-600 block">{p.governorate}</span>}
                            </div>
                          </TableCell>
                          <TableCell className="text-xs text-gray-700">
                            <span className="font-bold text-gray-800 block">{p.category || 'أطراف صناعية / جبائر'}</span>
                            <span className="text-[11px] text-gray-500 line-clamp-1">{p.condition}</span>
                          </TableCell>
                          <TableCell className="text-xs text-medical-700 font-bold">
                            {p.deviceType}
                          </TableCell>
                          <TableCell className="text-center">
                            <span className="text-[10px] font-bold bg-emerald-50 text-emerald-700 px-2.5 py-1 rounded-full border border-emerald-100 block mb-1">
                              {p.status}
                            </span>
                            <span className="text-[10px] text-gray-400 font-mono block">آخر زيارة: {p.lastVisit}</span>
                          </TableCell>
                          <TableCell className="text-center">
                            <div className="flex items-center justify-center gap-1.5">
                              <Button 
                                size="sm" 
                                variant="outline"
                                onClick={() => setSelectedPatient(p)}
                                className="rounded-lg h-8 px-3 text-xs text-medical-700 border-medical-200 hover:bg-medical-50 font-bold"
                              >
                                <Eye className="w-3.5 h-3.5 me-1" />
                                عرض المقاسات
                              </Button>
                              <Button 
                                size="sm" 
                                variant="destructive"
                                onClick={() => handleDeletePatient(p.id)}
                                className="rounded-lg h-8 px-2 text-xs"
                                title="حذف الحالة"
                              >
                                <Trash className="w-3.5 h-3.5" />
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </div>
            </TabsContent>

            {/* TAB 3: MANAGE CENTER SPECIALISTS (VISIBLE ONLY FOR CENTER MANAGERS) */}
            {isCenterAccount && (
              <TabsContent value="center_specs" className="space-y-6">
                <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-gray-100">
                  <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6 pb-4 border-b border-gray-100">
                    <div>
                      <h2 className="text-xl font-bold text-gray-900 font-cairo">أخصائيو فرع المركز</h2>
                      <p className="text-xs text-gray-500 mt-0.5">إضافة وتسكين أخصائيين جدد داخل هذا الفرع المعتمد.</p>
                    </div>
                    <Button 
                      onClick={() => setIsAddingCenterSpec(true)}
                      className="bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl font-bold gap-2 text-xs py-5"
                    >
                      <PlusCircle className="w-4 h-4" />
                      إضافة أخصائي جديد بالمركز
                    </Button>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {centerSpecialists.map((spec) => (
                      <div key={spec.id} className="bg-slate-50/70 rounded-2xl p-5 border border-gray-200/80 flex items-center gap-4">
                        <img 
                          src={spec.image || FALLBACK_SPECIALIST_IMAGES[0]} 
                          alt={spec.name}
                          className="w-14 h-14 rounded-full object-cover border-2 border-white shadow-xs"
                          onError={(e) => { e.currentTarget.src = FALLBACK_SPECIALIST_IMAGES[0]; }}
                        />
                        <div>
                          <h3 className="font-bold text-gray-900 text-sm">{spec.name}</h3>
                          <p className="text-xs text-medical-600 font-semibold">{spec.role}</p>
                          <span className="text-[10px] text-gray-400 font-mono block mt-0.5">{spec.phone}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </TabsContent>
            )}
          </Tabs>

        </div>
      </main>

      {/* --- ADD NEW PATIENT & MEASUREMENTS MODAL --- */}
      <Dialog open={isAddingPatient} onOpenChange={setIsAddingPatient}>
        <DialogContent className="max-w-2xl font-cairo max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="font-bold text-xl flex items-center gap-2 text-gray-900">
              <PlusCircle className="w-5 h-5 text-emerald-600" />
              تسجيل مريض جديد ومقاسات الطرف / الجبيرة
            </DialogTitle>
            <DialogDescription className="text-xs">
              أدخل كافة البيانات والمقاسات الطبية الفنية للتصنيع والمتابعة.
            </DialogDescription>
          </DialogHeader>

          <form onSubmit={handleSavePatient} className="space-y-4 py-2">
            
            {/* Patient Personal Data */}
            <div className="bg-slate-50 p-4 rounded-2xl border border-gray-200 space-y-3">
              <h4 className="font-bold text-xs text-gray-800 border-b pb-2">1. البيانات الأساسية للمريض</h4>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div>
                  <Label className="text-xs font-bold text-gray-700 mb-1 block">اسم المريض بالكامل *</Label>
                  <Input 
                    value={pName} 
                    onChange={(e) => setPName(e.target.value)}
                    placeholder="محمد السيد محمود"
                    className="rounded-xl text-xs bg-white"
                    required
                  />
                </div>
                <div>
                  <Label className="text-xs font-bold text-gray-700 mb-1 block">رقم الهاتف للتواصل *</Label>
                  <Input 
                    value={pPhone} 
                    onChange={(e) => setPPhone(e.target.value)}
                    placeholder="01xxxxxxxxx"
                    className="rounded-xl text-xs font-mono bg-white"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div>
                  <Label className="text-xs font-bold text-gray-700 mb-1 block">السن</Label>
                  <Input 
                    value={pAge} 
                    onChange={(e) => setPAge(e.target.value)}
                    placeholder="34"
                    className="rounded-xl text-xs bg-white"
                  />
                </div>
                <div>
                  <Label className="text-xs font-bold text-gray-700 mb-1 block">الجنس</Label>
                  <select 
                    value={pGender}
                    onChange={(e) => setPGender(e.target.value)}
                    className="w-full h-10 rounded-xl border border-gray-200 px-3 text-xs bg-white font-bold"
                  >
                    <option value="ذكر">ذكر</option>
                    <option value="أنثى">أنثى</option>
                  </select>
                </div>
                <div>
                  <Label className="text-xs font-bold text-gray-700 mb-1 block">المحافظة</Label>
                  <select 
                    value={pGov}
                    onChange={(e) => setPGov(e.target.value)}
                    className="w-full h-10 rounded-xl border border-gray-200 px-3 text-xs bg-white font-bold"
                  >
                    {EGYPT_GOVERNORATES.map(gov => (
                      <option key={gov} value={gov}>{gov}</option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            {/* Classification & Diagnosis */}
            <div className="bg-slate-50 p-4 rounded-2xl border border-gray-200 space-y-3">
              <h4 className="font-bold text-xs text-gray-800 border-b pb-2">2. تصنيف الحالة والطرف المطلوب</h4>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div>
                  <Label className="text-xs font-bold text-gray-700 mb-1 block">تصنيف التخصص والمجال *</Label>
                  <select 
                    value={pCategory}
                    onChange={(e) => setPCategory(e.target.value)}
                    className="w-full h-10 rounded-xl border border-gray-200 px-3 text-xs bg-white font-bold"
                  >
                    {PROSTHETIC_ORTHOTIC_CATEGORIES.map(cat => (
                      <option key={cat} value={cat}>{cat}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <Label className="text-xs font-bold text-gray-700 mb-1 block">نوع الجهاز / الطرف المحدد *</Label>
                  <Input 
                    value={pDeviceType} 
                    onChange={(e) => setPDeviceType(e.target.value)}
                    placeholder="مثال: طرف صناعي تحت الركبة كربوني ذكي"
                    className="rounded-xl text-xs bg-white"
                    required
                  />
                </div>
              </div>

              <div>
                <Label className="text-xs font-bold text-gray-700 mb-1 block">التشخيص الطبي وتفاصيل الحالة *</Label>
                <Input 
                  value={pCondition} 
                  onChange={(e) => setPCondition(e.target.value)}
                  placeholder="مثال: بتر تحت الركبة اليمنى ناتج عن السكري مع حماية الجذمور"
                  className="rounded-xl text-xs bg-white"
                  required
                />
              </div>
            </div>

            {/* Comprehensive Technical Measurements */}
            <div className="bg-slate-50 p-4 rounded-2xl border border-gray-200 space-y-3">
              <h4 className="font-bold text-xs text-gray-800 border-b pb-2">3. المقاسات والمواصفات الفنية للتصنيع</h4>
              
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                <div>
                  <Label className="text-xs font-bold text-gray-700 mb-1 block">طول الجذمور (سم)</Label>
                  <Input 
                    value={mResidualLength} 
                    onChange={(e) => setMResidualLength(e.target.value)}
                    placeholder="15"
                    className="rounded-xl text-xs bg-white font-mono"
                  />
                </div>
                <div>
                  <Label className="text-xs font-bold text-gray-700 mb-1 block">محيط الجذمور (سم)</Label>
                  <Input 
                    value={mResidualCircumference} 
                    onChange={(e) => setMResidualCircumference(e.target.value)}
                    placeholder="32"
                    className="rounded-xl text-xs bg-white font-mono"
                  />
                </div>
                <div>
                  <Label className="text-xs font-bold text-gray-700 mb-1 block">محيط المفصل (سم)</Label>
                  <Input 
                    value={mJointCircumference} 
                    onChange={(e) => setMJointCircumference(e.target.value)}
                    placeholder="38"
                    className="rounded-xl text-xs bg-white font-mono"
                  />
                </div>
                <div>
                  <Label className="text-xs font-bold text-gray-700 mb-1 block">مقاس القدم / الحذاء</Label>
                  <Input 
                    value={mFootSize} 
                    onChange={(e) => setMFootSize(e.target.value)}
                    placeholder="42"
                    className="rounded-xl text-xs bg-white font-mono"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                <div>
                  <Label className="text-xs font-bold text-gray-700 mb-1 block">الوزن والارتفاع</Label>
                  <Input 
                    value={mWeightHeight} 
                    onChange={(e) => setMWeightHeight(e.target.value)}
                    placeholder="75 كجم / 175 سم"
                    className="rounded-xl text-xs bg-white"
                  />
                </div>
                <div>
                  <Label className="text-xs font-bold text-gray-700 mb-1 block">خامة ونوع السوكيت</Label>
                  <Input 
                    value={mSocketType} 
                    onChange={(e) => setMSocketType(e.target.value)}
                    placeholder="سوكيت سيليكون كربوني مرن"
                    className="rounded-xl text-xs bg-white"
                  />
                </div>
                <div>
                  <Label className="text-xs font-bold text-gray-700 mb-1 block">نوع القدم / المفصل</Label>
                  <Input 
                    value={mComponentType} 
                    onChange={(e) => setMComponentType(e.target.value)}
                    placeholder="قدم كربونية ممتصة للصدمات"
                    className="rounded-xl text-xs bg-white"
                  />
                </div>
              </div>
            </div>

            {/* Follow-up Status & Dates */}
            <div className="bg-slate-50 p-4 rounded-2xl border border-gray-200 space-y-3">
              <h4 className="font-bold text-xs text-gray-800 border-b pb-2">4. حالة المتابعة وملاحظات الفني</h4>
              
              <div className="grid grid-cols-3 gap-3">
                <div>
                  <Label className="text-xs font-bold text-gray-700 mb-1 block">حالة الملف</Label>
                  <select 
                    value={pStatus}
                    onChange={(e) => setPStatus(e.target.value)}
                    className="w-full h-10 rounded-xl border border-gray-200 px-3 text-xs bg-white font-bold"
                  >
                    <option value="تحت المقاس والتقييم">تحت المقاس والتقييم</option>
                    <option value="قيد التصنيع والبرمجة">قيد التصنيع والبرمجة</option>
                    <option value="بروفا وتجربة حركية">بروفا وتجربة حركية</option>
                    <option value="تم التسليم والضبط">تم التسليم والضبط</option>
                    <option value="متابعة دورية">متابعة دورية</option>
                  </select>
                </div>
                <div>
                  <Label className="text-xs font-bold text-gray-700 mb-1 block">تاريخ الزيارة</Label>
                  <Input 
                    type="date"
                    value={pLastVisit} 
                    onChange={(e) => setPLastVisit(e.target.value)}
                    className="rounded-xl text-xs bg-white"
                  />
                </div>
                <div>
                  <Label className="text-xs font-bold text-gray-700 mb-1 block">الموعد القادم</Label>
                  <Input 
                    type="date"
                    value={pNextVisit} 
                    onChange={(e) => setPNextVisit(e.target.value)}
                    className="rounded-xl text-xs bg-white"
                  />
                </div>
              </div>

              <div>
                <Label className="text-xs font-bold text-gray-700 mb-1 block">ملاحظات الفني وتوصيات التأهيل</Label>
                <Textarea 
                  value={pNotes}
                  onChange={(e) => setPNotes(e.target.value)}
                  placeholder="ملاحظات الضبط، الملاحظات الفنية للمشية، ومواصفات التعديل المستقبلي..."
                  rows={2}
                  className="rounded-xl text-xs bg-white"
                />
              </div>
            </div>

            <DialogFooter className="gap-2 pt-2">
              <Button type="button" variant="outline" onClick={() => setIsAddingPatient(false)} className="rounded-xl text-xs">إلغاء</Button>
              <Button type="submit" className="bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold px-6">
                تسجيل المريض والمقاسات
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      {/* --- VIEW DETAILED PATIENT MEASUREMENTS MODAL --- */}
      <Dialog open={selectedPatient !== null} onOpenChange={(o) => { if (!o) setSelectedPatient(null); }}>
        <DialogContent className="max-w-xl font-cairo max-h-[85vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="font-bold text-xl text-gray-900">الملف الفني ومقاسات المريض</DialogTitle>
            <DialogDescription className="text-xs">المواصفات الفنية والمقاسات الدقيقة المصنّعة للمريض.</DialogDescription>
          </DialogHeader>

          {selectedPatient && (
            <div className="space-y-4 py-2">
              <div className="bg-slate-50 p-4 rounded-2xl border border-gray-200 flex justify-between items-center">
                <div>
                  <h3 className="font-extrabold text-lg text-gray-900">{selectedPatient.name}</h3>
                  <p className="text-xs text-medical-700 font-semibold mt-0.5">{selectedPatient.category || 'أطراف وجبائر'}</p>
                  <p className="text-xs text-gray-500 mt-1">{selectedPatient.condition}</p>
                </div>
                <div className="text-left">
                  <span className="text-xs font-mono font-bold bg-white px-3 py-1 rounded-xl border text-gray-800 block" dir="ltr">
                    {selectedPatient.phone}
                  </span>
                  <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full mt-2 inline-block">
                    {selectedPatient.status}
                  </span>
                </div>
              </div>

              {/* Technical Measurements Table */}
              <div className="bg-white p-4 rounded-2xl border border-gray-200 space-y-3">
                <h4 className="font-bold text-xs text-gray-900 border-b pb-2 flex items-center gap-1.5">
                  <FileText className="w-4 h-4 text-medical-600" />
                  المقاسات الطبية الفنية المصنّعة:
                </h4>

                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 text-xs">
                  <div className="bg-slate-50 p-2.5 rounded-xl border">
                    <span className="text-[10px] text-gray-400 font-bold block">طول الجذمور:</span>
                    <span className="font-bold font-mono text-gray-900">{selectedPatient.measurements?.residualLength || 'غير مدون'}</span>
                  </div>
                  <div className="bg-slate-50 p-2.5 rounded-xl border">
                    <span className="text-[10px] text-gray-400 font-bold block">محيط الجذمور:</span>
                    <span className="font-bold font-mono text-gray-900">{selectedPatient.measurements?.residualCircumference || 'غير مدون'}</span>
                  </div>
                  <div className="bg-slate-50 p-2.5 rounded-xl border">
                    <span className="text-[10px] text-gray-400 font-bold block">محيط المفصل:</span>
                    <span className="font-bold font-mono text-gray-900">{selectedPatient.measurements?.kneeCircumference || 'غير مدون'}</span>
                  </div>
                  <div className="bg-slate-50 p-2.5 rounded-xl border">
                    <span className="text-[10px] text-gray-400 font-bold block">مقاس القدم:</span>
                    <span className="font-bold font-mono text-gray-900">{selectedPatient.measurements?.footSize || 'غير مدون'}</span>
                  </div>
                  <div className="bg-slate-50 p-2.5 rounded-xl border col-span-2">
                    <span className="text-[10px] text-gray-400 font-bold block">الوزن والارتفاع:</span>
                    <span className="font-bold text-gray-900">{selectedPatient.measurements?.weightHeight || 'غير مدون'}</span>
                  </div>
                </div>

                <div className="space-y-2 pt-1 text-xs">
                  <div className="bg-slate-50 p-2.5 rounded-xl border">
                    <span className="text-[10px] text-gray-400 font-bold block">خامة وسوكيت الطرف:</span>
                    <span className="font-bold text-gray-800">{selectedPatient.measurements?.socketType || selectedPatient.deviceType}</span>
                  </div>
                  <div className="bg-slate-50 p-2.5 rounded-xl border">
                    <span className="text-[10px] text-gray-400 font-bold block">نوع المفصل / القدم:</span>
                    <span className="font-bold text-gray-800">{selectedPatient.measurements?.componentType || 'قدم ومكونات متطورة معتمدة'}</span>
                  </div>
                </div>
              </div>

              {/* Notes */}
              <div className="bg-slate-50 p-4 rounded-2xl border border-gray-200 space-y-1">
                <h4 className="font-bold text-xs text-gray-900 mb-1">ملاحظات الأخصائي الفنية:</h4>
                <p className="text-xs text-gray-600 leading-relaxed font-medium">{selectedPatient.notes || 'لا توجد ملاحظات إضافية.'}</p>
              </div>

              <div className="flex justify-between items-center pt-2">
                <Button 
                  type="button" 
                  variant="destructive" 
                  onClick={() => handleDeletePatient(selectedPatient.id)}
                  className="rounded-xl text-xs gap-1.5"
                >
                  <Trash className="w-3.5 h-3.5" />
                  حذف ملف المريض
                </Button>
                <Button type="button" variant="outline" onClick={() => setSelectedPatient(null)} className="rounded-xl text-xs">إغلاق</Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* --- ADD SPECIALIST TO CENTER MODAL (CENTER MANAGERS ONLY) --- */}
      {isCenterAccount && (
        <Dialog open={isAddingCenterSpec} onOpenChange={setIsAddingCenterSpec}>
          <DialogContent className="max-w-md font-cairo">
            <DialogHeader>
              <DialogTitle className="font-bold text-lg">إضافة أخصائي جديد لفرع المركز</DialogTitle>
              <DialogDescription className="text-xs">سيتم تسجيل الأخصائي وتسكينه بالفرع الحالي.</DialogDescription>
            </DialogHeader>

            <form onSubmit={handleAddCenterSpecialist} className="space-y-4 py-2">
              <div>
                <Label className="text-xs font-bold text-gray-700 mb-1 block">اسم الأخصائي بالكامل *</Label>
                <Input 
                  value={newSpecName}
                  onChange={(e) => setNewSpecName(e.target.value)}
                  placeholder="د. محمد مصطفى"
                  className="rounded-xl text-xs"
                  required
                />
              </div>
              <div>
                <Label className="text-xs font-bold text-gray-700 mb-1 block">اسم المستخدم للدخول *</Label>
                <Input 
                  value={newSpecUsername}
                  onChange={(e) => setNewSpecUsername(e.target.value)}
                  placeholder="m_mustafa"
                  className="rounded-xl text-xs font-mono"
                  required
                />
              </div>
              <div>
                <Label className="text-xs font-bold text-gray-700 mb-1 block">الوظيفة / التخصص العلمي</Label>
                <Input 
                  value={newSpecRole}
                  onChange={(e) => setNewSpecRole(e.target.value)}
                  className="rounded-xl text-xs"
                />
              </div>
              <div>
                <Label className="text-xs font-bold text-gray-700 mb-1 block">رقم الهاتف للواتساب</Label>
                <Input 
                  value={newSpecPhone}
                  onChange={(e) => setNewSpecPhone(e.target.value)}
                  placeholder="01xxxxxxxxx"
                  className="rounded-xl text-xs font-mono"
                />
              </div>

              <DialogFooter className="gap-2 pt-2">
                <Button type="button" variant="outline" onClick={() => setIsAddingCenterSpec(false)} className="rounded-xl text-xs">إلغاء</Button>
                <Button type="submit" className="bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold">
                  إضافة الأخصائي للفرع
                </Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      )}

      <Footer />
    </div>
  );
};

export default SpecialistDashboard;
