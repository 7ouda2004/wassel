import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Users, FileText, PlusCircle, X, Edit, Trash, Save, 
  Search, Download, Upload, ChevronDown, FileUp, UserCheck, Briefcase, Camera, Building, Sparkles
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
  FALLBACK_SPECIALIST_IMAGES, DEFAULT_CASES
} from '@/lib/db';

type Patient = {
  id: number;
  name: string;
  age: number;
  gender: string;
  phone: string;
  condition: string;
  deviceType: string;
  measurements: Record<string, string>;
  status: string;
  lastVisit: string;
  nextVisit: string;
  notes: string;
  files: string[];
};

const samplePatients: Patient[] = [
  {
    id: 1,
    name: 'أحمد محمد',
    age: 35,
    gender: 'ذكر',
    phone: '01119056895',
    condition: 'بتر تحت الركبة - الساق اليمنى',
    deviceType: 'طرف صناعي تحت الركبة',
    measurements: {
      residualLength: '15',
      residualCircumference: '32',
      kneeCircumference: '38',
      calfShape: 'مخروطي',
      footSize: '42'
    },
    status: 'نشط',
    lastVisit: '2026-02-10',
    nextVisit: '2026-04-10',
    notes: 'المريض يتقدم بشكل ممتاز في التأقلم مع الطرف الصناعي. تم الضبط بدقة عالية.',
    files: ['تقرير_طبي_أحمد_محمد.pdf']
  },
  {
    id: 2,
    name: 'فاطمة خالد',
    age: 28,
    gender: 'أنثى',
    phone: '01119056895',
    condition: 'ضعف عضلات القدم والكاحل',
    deviceType: 'جبيرة AFO',
    measurements: {
      footLength: '24',
      footWidth: '9',
      ankleCircumference: '22',
      calfCircumference: '34',
      ankleToKnee: '38'
    },
    status: 'نشط',
    lastVisit: '2026-01-15',
    nextVisit: '2026-03-15',
    notes: 'تحسن ملحوظ في المشي بعد استخدام الجبيرة وتثبيت الكاحل.',
    files: ['تقرير_الجبيرة_فاطمة.pdf']
  }
];

const SpecialistDashboard = () => {
  const [patients, setPatients] = useState<Patient[]>(samplePatients);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentSpecialist, setCurrentSpecialist] = useState<Specialist | null>(null);
  const [centerSpecialists, setCenterSpecialists] = useState<Specialist[]>([]);

  // Profile Edit Form State
  const [profileName, setProfileName] = useState('');
  const [profileRole, setProfileRole] = useState('');
  const [profileBio, setProfileBio] = useState('');
  const [profilePhone, setProfilePhone] = useState('');
  const [profileImage, setProfileImage] = useState('');
  const [profileExpertise, setProfileExpertise] = useState('');
  const [profileCases, setProfileCases] = useState<CaseStudy[]>([]);

  // New Case Input
  const [caseTitle, setCaseTitle] = useState('');
  const [caseDesc, setCaseDesc] = useState('');

  // Add Center Specialist Modal State
  const [isAddingCenterSpec, setIsAddingCenterSpec] = useState(false);
  const [newSpecName, setNewSpecName] = useState('');
  const [newSpecUsername, setNewSpecUsername] = useState('');
  const [newSpecRole, setNewSpecRole] = useState('أخصائي أطراف صناعية وجبائر طبية');
  const [newSpecPhone, setNewSpecPhone] = useState('');

  useEffect(() => {
    document.documentElement.dir = 'rtl';
    document.body.classList.add('font-cairo');
    
    // Auth Check
    const username = sessionStorage.getItem('username');
    const isSpec = sessionStorage.getItem('isSpecialist') === 'true';

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
      setProfileRole(found.role);
      setProfileBio(found.bio || '');
      setProfilePhone(found.phone || '');
      setProfileImage(found.image || FALLBACK_SPECIALIST_IMAGES[0]);
      setProfileExpertise(found.expertise ? found.expertise.join('، ') : '');
      setProfileCases(found.casesWorkedOn || DEFAULT_CASES);

      // Filter specialists in same center
      if (found.centerId || found.centerName) {
        const sameCenterSpecs = allSpecs.filter(s => s.centerId === found.centerId || s.centerName === found.centerName);
        setCenterSpecialists(sameCenterSpecs);
      }
    }
  }, []);

  // Save Specialist/Center Profile Changes
  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentSpecialist) return;

    const expArray = profileExpertise
      ? profileExpertise.split(/[،,]/).map(s => s.trim()).filter(Boolean)
      : ['الأطراف الصناعية', 'الجبائر الطبية'];

    const updatedSpec: Specialist = {
      ...currentSpecialist,
      name: profileName,
      role: profileRole,
      bio: profileBio,
      phone: profilePhone,
      image: profileImage || FALLBACK_SPECIALIST_IMAGES[0],
      expertise: expArray,
      casesWorkedOn: profileCases
    };

    const allSpecs = getLocalSpecialists();
    const updatedAll = allSpecs.map(s => s.id === updatedSpec.id ? updatedSpec : s);
    saveLocalSpecialists(updatedAll);
    setCurrentSpecialist(updatedSpec);

    toast.success('تم تحديث البروفايل والمعلومات الشخصية وسابقة الأعمال بنجاح!');
  };

  // Add Case Study to Profile
  const handleAddCase = () => {
    if (!caseTitle.trim()) {
      toast.error('أدخل عنوان الحالة');
      return;
    }
    const newCase: CaseStudy = {
      id: 'case_' + Date.now().toString(),
      title: caseTitle,
      deviceType: 'جهاز حركي مخصص',
      description: caseDesc || 'تم تركيب وضبط وتأهيل الحالة بنجاح.',
      outcome: 'تحسن الحركي واستعادة الاستقلالية بنسبة عالية.'
    };
    setProfileCases(prev => [...prev, newCase]);
    setCaseTitle('');
    setCaseDesc('');
    toast.success('تم إضافة الحالة لسجل أعمالك!');
  };

  // Add Specialist to Center
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
    setCenterSpecialists(prev => [newSpec, ...prev]);

    setIsAddingCenterSpec(false);
    setNewSpecName('');
    setNewSpecUsername('');
    setNewSpecPhone('');
    toast.success(`تمت إضافة الأخصائي ${newSpecName} بنجاح للفرع!`);
  };

  // Image Upload helper
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

  const filteredPatients = patients.filter(p => 
    p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    p.condition.toLowerCase().includes(searchTerm.toLowerCase()) ||
    p.deviceType.toLowerCase().includes(searchTerm.toLowerCase())
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
                    لوحة تحكم الأخصائي والفرع
                  </div>
                  <h1 className="text-2xl sm:text-3xl font-extrabold font-cairo">{profileName}</h1>
                  <p className="text-medical-200 text-xs mt-1 font-semibold">{profileRole} - {currentSpecialist.centerName || 'مركز واصل'}</p>
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

              <TabsTrigger value="center_specs" className="rounded-xl font-bold py-2.5 px-5 gap-2">
                <Building className="w-4 h-4 text-emerald-600" />
                إضافة وإدارة أخصائيي المركز ({centerSpecialists.length})
              </TabsTrigger>

              <TabsTrigger value="patients" className="rounded-xl font-bold py-2.5 px-5 gap-2">
                <Users className="w-4 h-4 text-amber-600" />
                متابعة مقاسات وحالات المرضى ({patients.length})
              </TabsTrigger>
            </TabsList>

            {/* TAB 1: EDIT PROFILE & CASES */}
            <TabsContent value="profile" className="space-y-6">
              <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-gray-100">
                <div className="flex items-center justify-between pb-4 mb-6 border-b border-gray-100">
                  <div>
                    <h2 className="text-xl font-bold text-gray-900 font-cairo">تحديث البروفايل، الصورة، والتخصصات</h2>
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

                  {/* Add Case Studies worked on */}
                  <div className="p-5 bg-emerald-50/40 rounded-2xl border border-emerald-200/80 space-y-4">
                    <div className="flex items-center gap-2">
                      <Briefcase className="w-5 h-5 text-emerald-600" />
                      <h3 className="font-bold text-sm text-gray-900">سجل الحالات التي قمت بتأهيلها (الحالات المنجزة)</h3>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      <Input 
                        value={caseTitle}
                        onChange={(e) => setCaseTitle(e.target.value)}
                        placeholder="عنوان الحالة (مثال: تركيب طرف صناعي سفلي ذكي)"
                        className="text-xs bg-white rounded-xl h-10"
                      />
                      <Input 
                        value={caseDesc}
                        onChange={(e) => setCaseDesc(e.target.value)}
                        placeholder="وصف النتيجة والتأهيل..."
                        className="text-xs bg-white rounded-xl h-10"
                      />
                    </div>

                    <Button type="button" onClick={handleAddCase} className="bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold px-5 py-2">
                      إضافة الحالة لملفك
                    </Button>

                    {profileCases.length > 0 && (
                      <div className="space-y-2 pt-2">
                        <p className="text-xs font-bold text-gray-700">الحالات المعروضة في بروفايلك ({profileCases.length}):</p>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                          {profileCases.map((c, i) => (
                            <div key={i} className="bg-white p-3 rounded-xl border text-xs flex justify-between items-center shadow-2xs">
                              <div>
                                <span className="font-bold text-gray-900 block">{c.title}</span>
                                <span className="text-[10px] text-gray-500">{c.description}</span>
                              </div>
                              <span className="text-[10px] bg-emerald-50 text-emerald-700 font-bold px-2 py-0.5 rounded-full">ناجحة</span>
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

            {/* TAB 2: MANAGE CENTER SPECIALISTS */}
            <TabsContent value="center_specs" className="space-y-6">
              <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-gray-100">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6 pb-4 border-b border-gray-100">
                  <div>
                    <h2 className="text-xl font-bold text-gray-900 font-cairo">أخصائيو فرع المركز</h2>
                    <p className="text-xs text-gray-500 mt-0.5">إضافة وتسكين أخصائيين جدد داخل هذا الفرع.</p>
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

            {/* TAB 3: PATIENTS LIST */}
            <TabsContent value="patients" className="space-y-6">
              <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-gray-100">
                <div className="flex justify-between items-center mb-6 pb-4 border-b border-gray-100">
                  <div>
                    <h2 className="text-xl font-bold text-gray-900 font-cairo">سجل قياسات ومتابعة الحالات</h2>
                    <p className="text-xs text-gray-500 mt-0.5">عرض مقاسات الجبائر والأطراف ومواعيد المتابعات الفنية.</p>
                  </div>
                </div>

                <div className="mb-6 relative">
                  <Input 
                    type="text" 
                    placeholder="ابحث باسم المريض أو نوع الجهاز..." 
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
                        <TableHead className="font-bold text-right text-gray-900">المريض</TableHead>
                        <TableHead className="font-bold text-right text-gray-900">الجهاز / الجبيرة</TableHead>
                        <TableHead className="font-bold text-right text-gray-900">التشخيص</TableHead>
                        <TableHead className="font-bold text-center text-gray-900">أحدث زيارة</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredPatients.map((p) => (
                        <TableRow key={p.id}>
                          <TableCell className="font-bold text-gray-900">
                            <span>{p.name}</span>
                            <span className="text-[11px] text-gray-400 font-mono block" dir="ltr">{p.phone}</span>
                          </TableCell>
                          <TableCell className="text-xs text-medical-700 font-bold">{p.deviceType}</TableCell>
                          <TableCell className="text-xs text-gray-600">{p.condition}</TableCell>
                          <TableCell className="text-center text-xs font-mono text-gray-600">{p.lastVisit}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </div>
            </TabsContent>
          </Tabs>

        </div>
      </main>

      {/* --- ADD SPECIALIST TO CENTER MODAL --- */}
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

      <Footer />
    </div>
  );
};

export default SpecialistDashboard;
