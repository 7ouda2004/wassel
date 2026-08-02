import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Users, MapPin, PlusCircle, Edit, Trash, Save, Search, 
  UserCheck, ShieldAlert, Clock, Phone, Building, Check, X,
  Upload, Sparkles, CheckCircle2, AlertCircle, RefreshCw
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
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
import { toast } from "sonner";
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { 
  getLocalCenters, saveLocalCenters, type Center, EGYPT_GOVERNORATES,
  getLocalSpecialists, saveLocalSpecialists, type Specialist,
  FALLBACK_CENTER_IMAGES, FALLBACK_SPECIALIST_IMAGES
} from '@/lib/db';
import { syncDatabase, getPendingRequests, type RegistrationRequest } from '@/lib/registrations';

const AdminDashboard = () => {
  const [centers, setCenters] = useState<Center[]>([]);
  const [specialists, setSpecialists] = useState<Specialist[]>([]);
  const [pendingCloudRequests, setPendingCloudRequests] = useState<RegistrationRequest[]>([]);

  // Dialog States
  const [isAddingCenter, setIsAddingCenter] = useState(false);
  const [isEditingCenter, setIsEditingCenter] = useState(false);
  const [currentCenter, setCurrentCenter] = useState<Center>({
    id: '', name: '', location: 'القاهرة', address: '', phone: '',
    workingHours: 'السبت - الخميس: 9 صباحاً - 9 مساءً',
    image: FALLBACK_CENTER_IMAGES[0], region: 'القاهرة الكبرى', status: 'active'
  });
  const [centerSearchTerm, setCenterSearchTerm] = useState('');
  const [confirmDeleteCenter, setConfirmDeleteCenter] = useState<string | null>(null);

  // Specialist States
  const [isAddingSpec, setIsAddingSpec] = useState(false);
  const [isEditingSpec, setIsEditingSpec] = useState(false);
  const [currentSpec, setCurrentSpec] = useState<Specialist>({
    id: '', name: '', username: '', password: '', role: 'أخصائي أطراف صناعية وجبائر طبية', bio: '',
    image: FALLBACK_SPECIALIST_IMAGES[0], expertise: [], status: 'active', phone: '',
    centerId: '', centerName: ''
  });
  const [specSearchTerm, setSpecSearchTerm] = useState('');
  const [confirmDeleteSpec, setConfirmDeleteSpec] = useState<string | null>(null);
  const [specExpertiseInput, setSpecExpertiseInput] = useState('');

  const loadData = () => {
    const loadedCenters = getLocalCenters();
    const loadedSpecs = getLocalSpecialists();
    setCenters(loadedCenters);
    setSpecialists(loadedSpecs);
    
    getPendingRequests().then(reqs => setPendingCloudRequests(reqs)).catch(() => {});
  };

  useEffect(() => {
    document.documentElement.dir = 'rtl';
    document.body.classList.add('font-cairo');
    
    // Auth Check
    const isAdmin = sessionStorage.getItem('isAdmin');
    if (isAdmin !== 'true') {
      toast.error('غير مصرح لك بدخول صفحة المسؤول');
      window.location.href = '/login';
      return;
    }

    loadData();
  }, []);

  // Format Egypt Phone for WhatsApp
  const formatPhoneForWhatsapp = (phone: string) => {
    let cleaned = phone.replace(/\D/g, '');
    if (cleaned.startsWith('01')) {
      cleaned = '20' + cleaned.substring(1);
    }
    return cleaned;
  };

  // --- Center Handlers ---
  const handleSaveCenter = () => {
    if (!currentCenter.name.trim() || !currentCenter.location.trim() || !currentCenter.address.trim() || !currentCenter.phone.trim()) {
      toast.error('يرجى ملء كافة الحقول الأساسية للمركز');
      return;
    }

    const centerToSave: Center = {
      ...currentCenter,
      id: currentCenter.id || 'center_' + Date.now().toString(),
      image: currentCenter.image || FALLBACK_CENTER_IMAGES[Math.floor(Math.random() * FALLBACK_CENTER_IMAGES.length)],
      status: 'active'
    };

    let updatedList: Center[];
    if (isAddingCenter) {
      updatedList = [centerToSave, ...centers];
      toast.success('تمت إضافة المركز وإتاحته فوراً للمرضى بنجاح!');
    } else {
      updatedList = centers.map(c => c.id === centerToSave.id ? centerToSave : c);
      toast.success('تم تحديث بيانات المركز بنجاح!');
    }

    setCenters(updatedList);
    saveLocalCenters(updatedList);
    setIsAddingCenter(false);
    setIsEditingCenter(false);
  };

  const handleDeleteCenter = (id: string) => {
    const updated = centers.filter(c => c.id !== id);
    setCenters(updated);
    saveLocalCenters(updated);
    setConfirmDeleteCenter(null);
    toast.success('تم حذف المركز بنجاح');
  };

  const handleApproveCenter = (id: string) => {
    const updated = centers.map(c => c.id === id ? { ...c, status: 'active' as const } : c);
    setCenters(updated);
    saveLocalCenters(updated);
    toast.success('تم قبول وتفعيل المركز بنجاح! يظهر الآن للمرضى في صفحة المراكز.');
  };

  const handleRejectCenter = (id: string) => {
    const updated = centers.filter(c => c.id !== id);
    setCenters(updated);
    saveLocalCenters(updated);
    toast.error('تم رفض طلب تسجيل المركز');
  };

  // --- Specialist Handlers ---
  const handleSaveSpec = () => {
    if (!currentSpec.name.trim() || !currentSpec.username.trim() || (isAddingSpec && !currentSpec.password)) {
      toast.error('يرجى كتابة الاسم واسم المستخدم وكلمة المرور');
      return;
    }

    const expArray = specExpertiseInput
      ? specExpertiseInput.split(/[،,]/).map(s => s.trim()).filter(Boolean)
      : ['الأطراف الصناعية', 'الجبائر الطبية'];

    const specToSave: Specialist = {
      ...currentSpec,
      id: currentSpec.id || 'spec_' + Date.now().toString(),
      image: currentSpec.image || FALLBACK_SPECIALIST_IMAGES[Math.floor(Math.random() * FALLBACK_SPECIALIST_IMAGES.length)],
      expertise: expArray,
      status: 'active'
    };

    let updatedList: Specialist[];
    if (isAddingSpec) {
      updatedList = [specToSave, ...specialists];
      toast.success('تمت إضافة الأخصائي وتفعيله بنجاح!');
    } else {
      updatedList = specialists.map(s => s.id === specToSave.id ? specToSave : s);
      toast.success('تم تعديل بيانات الأخصائي بنجاح!');
    }

    setSpecialists(updatedList);
    saveLocalSpecialists(updatedList);
    setIsAddingSpec(false);
    setIsEditingSpec(false);
  };

  const handleDeleteSpec = (id: string) => {
    const updated = specialists.filter(s => s.id !== id);
    setSpecialists(updated);
    saveLocalSpecialists(updated);
    setConfirmDeleteSpec(null);
    toast.success('تم حذف الأخصائي بنجاح');
  };

  const handleApproveSpec = (spec: Specialist) => {
    const updated = specialists.map(s => s.id === spec.id ? { ...s, status: 'active' as const } : s);
    setSpecialists(updated);
    saveLocalSpecialists(updated);
    toast.success(`تم قبول وتفعيل الأخصائي: ${spec.name}!`);

    if (spec.phone) {
      const waPhone = formatPhoneForWhatsapp(spec.phone);
      const textMessage = `مرحباً بك أخصائي ${spec.name}، تم قبول طلب انضمامك وتفعيل حسابك بنجاح في منصة واصل! يمكنك الآن تسجيل الدخول واستخدام لوحة التحكم الخاصة بك.`;
      window.open(`https://wa.me/${waPhone}?text=${encodeURIComponent(textMessage)}`, '_blank');
    }
  };

  const handleRejectSpec = (id: string) => {
    const updated = specialists.filter(s => s.id !== id);
    setSpecialists(updated);
    saveLocalSpecialists(updated);
    toast.error('تم رفض طلب انضمام الأخصائي');
  };

  // Filter lists
  const pendingCenters = centers.filter(c => c.status === 'pending');
  const pendingSpecs = specialists.filter(s => s.status === 'pending');
  const totalPendingCount = pendingCenters.length + pendingSpecs.length + pendingCloudRequests.length;

  const filteredCentersList = centers.filter(c => 
    c.name.toLowerCase().includes(centerSearchTerm.toLowerCase()) ||
    c.location.toLowerCase().includes(centerSearchTerm.toLowerCase()) ||
    c.address.toLowerCase().includes(centerSearchTerm.toLowerCase())
  );

  const filteredSpecsList = specialists.filter(s =>
    s.name.toLowerCase().includes(specSearchTerm.toLowerCase()) ||
    s.role.toLowerCase().includes(specSearchTerm.toLowerCase()) ||
    (s.centerName && s.centerName.toLowerCase().includes(specSearchTerm.toLowerCase()))
  );

  return (
    <div className="min-h-screen flex flex-col bg-gray-50/50">
      <Navbar />

      <main className="flex-grow py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Header Banner */}
          <div className="bg-gradient-to-r from-medical-900 via-medical-800 to-medical-950 text-white rounded-3xl p-6 sm:p-8 shadow-xl mb-8 flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md px-3.5 py-1 rounded-full text-xs font-bold mb-3 border border-white/20">
                <Sparkles className="w-3.5 h-3.5 text-medical-300" />
                لوحة تحكم إدارة منصة واصل
              </div>
              <h1 className="text-2xl sm:text-3xl font-extrabold font-cairo">إدارة المراكز والأخصائيين والموافقات</h1>
              <p className="text-gray-300 text-sm mt-1.5 font-medium">التحكم الفوري بكافة الفروع والمحافظات المعتمدة وطلبات انضمام الأخصائيين والمراكز الجدد.</p>
            </div>

            <div className="flex items-center gap-3">
              <Button onClick={loadData} variant="outline" className="bg-white/10 hover:bg-white/20 text-white border-white/20 rounded-xl gap-2 text-xs font-bold py-5">
                <RefreshCw className="w-4 h-4" />
                تحديث البيانات
              </Button>
            </div>
          </div>

          {/* Stats Bar */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 mb-8">
            <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-xs flex items-center justify-between">
              <div>
                <p className="text-xs font-bold text-gray-400">إجمالي المراكز المفعلة</p>
                <p className="text-2xl font-extrabold text-gray-900 mt-1">{centers.filter(c => c.status === 'active').length}</p>
              </div>
              <div className="w-12 h-12 rounded-xl bg-medical-50 text-medical-600 flex items-center justify-center font-bold">
                <Building className="w-6 h-6" />
              </div>
            </div>

            <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-xs flex items-center justify-between">
              <div>
                <p className="text-xs font-bold text-gray-400">إجمالي الأخصائيين المعتمدين</p>
                <p className="text-2xl font-extrabold text-gray-900 mt-1">{specialists.filter(s => s.status === 'active').length}</p>
              </div>
              <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold">
                <Users className="w-6 h-6" />
              </div>
            </div>

            <div className="bg-white rounded-2xl p-5 border border-amber-100 shadow-xs flex items-center justify-between">
              <div>
                <p className="text-xs font-bold text-amber-700">طلبات الموافقة المعلقة</p>
                <p className="text-2xl font-extrabold text-amber-600 mt-1">{totalPendingCount}</p>
              </div>
              <div className="w-12 h-12 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center font-bold">
                <Clock className="w-6 h-6" />
              </div>
            </div>
          </div>

          {/* Main Tabs */}
          <Tabs defaultValue={totalPendingCount > 0 ? "pending" : "centers"} className="w-full">
            <TabsList className="bg-white p-1.5 rounded-2xl border border-gray-200/80 mb-8 flex justify-start overflow-x-auto">
              <TabsTrigger value="pending" className="rounded-xl font-bold py-2.5 px-5 gap-2 relative">
                <Clock className="w-4 h-4 text-amber-600" />
                طلبات بانتظار الموافقة
                {totalPendingCount > 0 && (
                  <span className="bg-amber-500 text-white text-[11px] font-extrabold px-2 py-0.5 rounded-full ms-1.5 animate-pulse">
                    {totalPendingCount}
                  </span>
                )}
              </TabsTrigger>

              <TabsTrigger value="centers" className="rounded-xl font-bold py-2.5 px-5 gap-2">
                <Building className="w-4 h-4 text-medical-600" />
                إدارة المراكز بالفروع ({centers.length})
              </TabsTrigger>

              <TabsTrigger value="specialists" className="rounded-xl font-bold py-2.5 px-5 gap-2">
                <Users className="w-4 h-4 text-emerald-600" />
                إدارة أخصائيي المنصة ({specialists.length})
              </TabsTrigger>
            </TabsList>

            {/* TAB 1: PENDING APPROVALS */}
            <TabsContent value="pending" className="space-y-6">
              <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-gray-100">
                <div className="flex items-center gap-3 mb-6 pb-4 border-b border-gray-100">
                  <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center">
                    <Clock className="w-5 h-5" />
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-gray-900 font-cairo">طلبات التسجيل والانضمام قيد الانتظار</h2>
                    <p className="text-gray-500 text-xs mt-0.5">قم بمراجعة بيانات المركز أو الأخصائي واضغط قبول لتفعيل ظهوره فوراً على الصفحة الرسمية.</p>
                  </div>
                </div>

                {totalPendingCount === 0 ? (
                  <div className="text-center py-16 bg-gray-50/50 rounded-2xl border border-dashed border-gray-200">
                    <CheckCircle2 className="w-12 h-12 text-emerald-500 mx-auto mb-3" />
                    <h3 className="text-base font-bold text-gray-800">لا توجد طلبات جديدة قيد الانتظار حالياً</h3>
                    <p className="text-xs text-gray-400 mt-1">جميع المراكز والأخصائيين مفعلون وتعمل خدماتهم بنجاح.</p>
                  </div>
                ) : (
                  <div className="space-y-6">
                    {/* Pending Centers */}
                    {pendingCenters.length > 0 && (
                      <div>
                        <h3 className="text-sm font-bold text-gray-800 mb-3 flex items-center gap-2">
                          <Building className="w-4 h-4 text-medical-600" />
                          فروع ومراكز جديدة بانتظار الموافقة ({pendingCenters.length}):
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          {pendingCenters.map(center => (
                            <div key={center.id} className="bg-amber-50/40 border border-amber-200/80 rounded-2xl p-5 flex flex-col justify-between">
                              <div>
                                <div className="flex items-center justify-between mb-2">
                                  <h4 className="font-bold text-gray-900 text-base">{center.name}</h4>
                                  <span className="text-[10px] font-bold text-amber-700 bg-amber-100 px-2.5 py-1 rounded-full">فرع جديد</span>
                                </div>
                                <div className="space-y-1.5 text-xs text-gray-600 mb-4">
                                  <p><span className="font-bold text-gray-700">المحافظة:</span> {center.location} ({center.region})</p>
                                  <p><span className="font-bold text-gray-700">العنوان:</span> {center.address}</p>
                                  <p><span className="font-bold text-gray-700">رقم التواصل:</span> <span dir="ltr">{center.phone}</span></p>
                                  <p><span className="font-bold text-gray-700">ساعات العمل:</span> {center.workingHours}</p>
                                </div>
                              </div>

                              <div className="flex gap-2 pt-3 border-t border-amber-200/60">
                                <Button 
                                  onClick={() => handleApproveCenter(center.id)}
                                  className="flex-grow bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold py-2.5 gap-1.5"
                                >
                                  <Check className="w-4 h-4" />
                                  قبول وتفعيل الفرع فوراً
                                </Button>
                                <Button 
                                  onClick={() => handleRejectCenter(center.id)}
                                  variant="destructive"
                                  className="rounded-xl text-xs font-bold py-2.5 px-4"
                                >
                                  <X className="w-4 h-4" />
                                  رفض
                                </Button>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Pending Specialists */}
                    {pendingSpecs.length > 0 && (
                      <div>
                        <h3 className="text-sm font-bold text-gray-800 mb-3 flex items-center gap-2 pt-4 border-t border-gray-100">
                          <Users className="w-4 h-4 text-emerald-600" />
                          أخصائيون جدد بانتظار الموافقة ({pendingSpecs.length}):
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          {pendingSpecs.map(spec => (
                            <div key={spec.id} className="bg-emerald-50/40 border border-emerald-200/80 rounded-2xl p-5 flex flex-col justify-between">
                              <div className="flex items-start gap-4 mb-3">
                                <img 
                                  src={spec.image || FALLBACK_SPECIALIST_IMAGES[0]} 
                                  alt={spec.name} 
                                  className="w-14 h-14 rounded-full object-cover border-2 border-emerald-200"
                                  onError={(e) => { e.currentTarget.src = FALLBACK_SPECIALIST_IMAGES[0]; }}
                                />
                                <div>
                                  <h4 className="font-bold text-gray-900 text-base">{spec.name}</h4>
                                  <p className="text-xs text-medical-600 font-semibold">{spec.role}</p>
                                  <p className="text-xs text-gray-500 mt-1"><span className="font-bold text-gray-700">رقم الواتساب:</span> <span dir="ltr">{spec.phone}</span></p>
                                  <p className="text-xs text-gray-500 mt-0.5"><span className="font-bold text-gray-700">نبذة:</span> {spec.bio}</p>
                                </div>
                              </div>

                              <div className="flex gap-2 pt-3 border-t border-emerald-200/60">
                                <Button 
                                  onClick={() => handleApproveSpec(spec)}
                                  className="flex-grow bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold py-2.5 gap-1.5"
                                >
                                  <Check className="w-4 h-4" />
                                  قبول وتفعيل الحساب
                                </Button>
                                <Button 
                                  onClick={() => handleRejectSpec(spec.id)}
                                  variant="destructive"
                                  className="rounded-xl text-xs font-bold py-2.5 px-4"
                                >
                                  <X className="w-4 h-4" />
                                  رفض
                                </Button>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </TabsContent>

            {/* TAB 2: MANAGE CENTERS */}
            <TabsContent value="centers" className="space-y-6">
              <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-gray-100">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6 pb-4 border-b border-gray-100">
                  <div>
                    <h2 className="text-xl font-bold text-gray-900 font-cairo">فروع ومراكز واصل المعتمدة</h2>
                    <p className="text-gray-500 text-xs mt-0.5">يمكنك إضافة مراكز جديدة لكافة المحافظات الـ 27 وتعديل البيانات فوراً.</p>
                  </div>
                  <Button 
                    onClick={() => {
                      setCurrentCenter({
                        id: '', name: '', location: 'القاهرة', address: '', phone: '',
                        workingHours: 'السبت - الخميس: 9 صباحاً - 9 مساءً',
                        image: FALLBACK_CENTER_IMAGES[0], region: 'القاهرة الكبرى', status: 'active'
                      });
                      setIsAddingCenter(true);
                    }}
                    className="bg-medical-600 hover:bg-medical-700 text-white rounded-xl font-bold gap-2 text-xs py-5"
                  >
                    <PlusCircle className="w-4 h-4" />
                    إضافة مركز جديد
                  </Button>
                </div>

                <div className="mb-6 relative">
                  <Input 
                    type="text" 
                    placeholder="ابحث باسم المركز أو المحافظة..." 
                    value={centerSearchTerm}
                    onChange={(e) => setCenterSearchTerm(e.target.value)}
                    className="rounded-xl h-11 pr-10 border-gray-200"
                  />
                  <Search className="w-4 h-4 text-gray-400 absolute right-3 top-1/2 -translate-y-1/2" />
                </div>

                <div className="overflow-x-auto rounded-2xl border border-gray-100">
                  <Table>
                    <TableHeader className="bg-gray-50">
                      <TableRow>
                        <TableHead className="font-bold text-right text-gray-900">المركز</TableHead>
                        <TableHead className="font-bold text-right text-gray-900">المحافظة والإقليم</TableHead>
                        <TableHead className="font-bold text-right text-gray-900">العنوان ورقم التواصل</TableHead>
                        <TableHead className="font-bold text-center text-gray-900">الحالة</TableHead>
                        <TableHead className="font-bold text-center text-gray-900">الإجراءات</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredCentersList.map((center) => (
                        <TableRow key={center.id} className="hover:bg-gray-50/50">
                          <TableCell className="font-bold text-gray-900">
                            <div className="flex items-center gap-3">
                              <img 
                                src={center.image || FALLBACK_CENTER_IMAGES[0]} 
                                alt={center.name}
                                className="w-10 h-10 rounded-xl object-cover border"
                                onError={(e) => { e.currentTarget.src = FALLBACK_CENTER_IMAGES[0]; }}
                              />
                              <span>{center.name}</span>
                            </div>
                          </TableCell>
                          <TableCell className="text-xs text-gray-600">
                            <span className="font-bold text-gray-800 block">{center.location}</span>
                            <span className="text-[10px] text-gray-400 block">{center.region}</span>
                          </TableCell>
                          <TableCell className="text-xs text-gray-600">
                            <span className="block">{center.address}</span>
                            <span className="font-mono text-medical-600 font-bold block" dir="ltr">{center.phone}</span>
                          </TableCell>
                          <TableCell className="text-center">
                            <span className={`text-[10px] font-bold px-2.5 py-1 rounded-full ${
                              center.status === 'active' ? 'bg-emerald-50 text-emerald-700' : 'bg-amber-50 text-amber-700'
                            }`}>
                              {center.status === 'active' ? 'مفعل ويعمل' : 'قيد الانتظار'}
                            </span>
                          </TableCell>
                          <TableCell className="text-center">
                            <div className="flex items-center justify-center gap-1.5">
                              <Button 
                                size="sm" 
                                variant="outline"
                                onClick={() => { setCurrentCenter(center); setIsEditingCenter(true); }}
                                className="rounded-lg h-8 px-2.5 text-xs text-medical-700 border-medical-200 hover:bg-medical-50"
                              >
                                <Edit className="w-3.5 h-3.5 me-1" />
                                تعديل
                              </Button>
                              <Button 
                                size="sm" 
                                variant="destructive"
                                onClick={() => setConfirmDeleteCenter(center.id)}
                                className="rounded-lg h-8 px-2 text-xs"
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

            {/* TAB 3: MANAGE SPECIALISTS */}
            <TabsContent value="specialists" className="space-y-6">
              <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-gray-100">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6 pb-4 border-b border-gray-100">
                  <div>
                    <h2 className="text-xl font-bold text-gray-900 font-cairo">أخصائيو واصل المعتمدون</h2>
                    <p className="text-gray-500 text-xs mt-0.5">إضافة وتعديل بيانات وخبرات الأخصائيين وتسكينهم بالفروع المختلفة.</p>
                  </div>
                  <Button 
                    onClick={() => {
                      setCurrentSpec({
                        id: '', name: '', username: '', password: '', role: 'أخصائي أطراف صناعية وجبائر طبية', bio: '',
                        image: FALLBACK_SPECIALIST_IMAGES[0], expertise: [], status: 'active', phone: '',
                        centerId: '', centerName: ''
                      });
                      setSpecExpertiseInput('');
                      setIsAddingSpec(true);
                    }}
                    className="bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl font-bold gap-2 text-xs py-5"
                  >
                    <PlusCircle className="w-4 h-4" />
                    إضافة أخصائي جديد
                  </Button>
                </div>

                <div className="mb-6 relative">
                  <Input 
                    type="text" 
                    placeholder="ابحث باسم الأخصائي، الوظيفة أو الفرع..." 
                    value={specSearchTerm}
                    onChange={(e) => setSpecSearchTerm(e.target.value)}
                    className="rounded-xl h-11 pr-10 border-gray-200"
                  />
                  <Search className="w-4 h-4 text-gray-400 absolute right-3 top-1/2 -translate-y-1/2" />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {filteredSpecsList.map((spec) => (
                    <div key={spec.id} className="bg-gray-50/60 rounded-2xl p-5 border border-gray-200/60 flex flex-col justify-between">
                      <div>
                        <div className="flex items-center gap-3.5 mb-3">
                          <img 
                            src={spec.image || FALLBACK_SPECIALIST_IMAGES[0]} 
                            alt={spec.name}
                            className="w-14 h-14 rounded-full object-cover border-2 border-white shadow-xs"
                            onError={(e) => { e.currentTarget.src = FALLBACK_SPECIALIST_IMAGES[0]; }}
                          />
                          <div>
                            <h3 className="font-bold text-gray-900 text-base">{spec.name}</h3>
                            <p className="text-xs text-medical-600 font-semibold">{spec.role}</p>
                            <span className="text-[10px] text-gray-400 font-mono block mt-0.5">@{spec.username}</span>
                          </div>
                        </div>

                        <div className="space-y-1.5 text-xs text-gray-600 mb-4">
                          <p><span className="font-bold text-gray-700">يعمل لدى:</span> {spec.centerName || 'فرع عام'}</p>
                          {spec.phone && <p><span className="font-bold text-gray-700">رقم الهاتف:</span> <span dir="ltr" className="font-mono">{spec.phone}</span></p>}
                        </div>
                      </div>

                      <div className="flex gap-2 pt-3 border-t border-gray-200/60">
                        <Button 
                          size="sm"
                          variant="outline"
                          onClick={() => {
                            setCurrentSpec(spec);
                            setSpecExpertiseInput(spec.expertise ? spec.expertise.join('، ') : '');
                            setIsEditingSpec(true);
                          }}
                          className="flex-grow rounded-xl text-xs font-bold py-2 border-gray-300"
                        >
                          <Edit className="w-3.5 h-3.5 me-1" />
                          تعديل البيانات
                        </Button>
                        <Button 
                          size="sm"
                          variant="destructive"
                          onClick={() => setConfirmDeleteSpec(spec.id)}
                          className="rounded-xl px-3"
                        >
                          <Trash className="w-3.5 h-3.5" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </TabsContent>
          </Tabs>

        </div>
      </main>

      {/* --- ADD / EDIT CENTER DIALOG --- */}
      <Dialog open={isAddingCenter || isEditingCenter} onOpenChange={(o) => { if (!o) { setIsAddingCenter(false); setIsEditingCenter(false); } }}>
        <DialogContent className="max-w-lg font-cairo">
          <DialogHeader>
            <DialogTitle className="font-bold text-xl">{isAddingCenter ? 'إضافة فرع/مركز جديد' : 'تعديل بيانات المركز'}</DialogTitle>
            <DialogDescription className="text-xs">سيتم حفظ البيانات وإتاحة الفرع مباشرة للمرضى في تصفح مراكز مصر.</DialogDescription>
          </DialogHeader>

          <div className="space-y-4 py-2">
            <div>
              <Label className="text-xs font-bold text-gray-700 mb-1 block">اسم المركز / الفرع *</Label>
              <Input 
                value={currentCenter.name} 
                onChange={(e) => setCurrentCenter({ ...currentCenter, name: e.target.value })}
                placeholder="مثال: مركز واصل - فرع سوهاج"
                className="rounded-xl"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <Label className="text-xs font-bold text-gray-700 mb-1 block">المحافظة (27 محافظة) *</Label>
                <select 
                  value={currentCenter.location}
                  onChange={(e) => setCurrentCenter({ ...currentCenter, location: e.target.value })}
                  className="w-full h-10 rounded-xl border border-gray-200 px-3 text-xs font-bold bg-white"
                >
                  {EGYPT_GOVERNORATES.map(gov => (
                    <option key={gov} value={gov}>{gov}</option>
                  ))}
                </select>
              </div>

              <div>
                <Label className="text-xs font-bold text-gray-700 mb-1 block">الإقليم / المنطقة</Label>
                <select 
                  value={currentCenter.region}
                  onChange={(e) => setCurrentCenter({ ...currentCenter, region: e.target.value })}
                  className="w-full h-10 rounded-xl border border-gray-200 px-3 text-xs font-bold bg-white"
                >
                  {['القاهرة الكبرى', 'الإسكندرية', 'الدلتا', 'الصعيد', 'القناة', 'الحدود'].map(r => (
                    <option key={r} value={r}>{r}</option>
                  ))}
                </select>
              </div>
            </div>

            <div>
              <Label className="text-xs font-bold text-gray-700 mb-1 block">العنوان التفصيلي *</Label>
              <Input 
                value={currentCenter.address} 
                onChange={(e) => setCurrentCenter({ ...currentCenter, address: e.target.value })}
                placeholder="اسم الشارع، الحي، العلامة المميزة..."
                className="rounded-xl"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <Label className="text-xs font-bold text-gray-700 mb-1 block">رقم الهاتف للتواصل *</Label>
                <Input 
                  value={currentCenter.phone} 
                  onChange={(e) => setCurrentCenter({ ...currentCenter, phone: e.target.value })}
                  placeholder="01xxxxxxxxx"
                  className="rounded-xl font-mono"
                />
              </div>

              <div>
                <Label className="text-xs font-bold text-gray-700 mb-1 block">ساعات العمل</Label>
                <Input 
                  value={currentCenter.workingHours} 
                  onChange={(e) => setCurrentCenter({ ...currentCenter, workingHours: e.target.value })}
                  placeholder="السبت - الخميس: 9 ص - 9 م"
                  className="rounded-xl"
                />
              </div>
            </div>
          </div>

          <DialogFooter className="gap-2 pt-2">
            <Button variant="outline" onClick={() => { setIsAddingCenter(false); setIsEditingCenter(false); }} className="rounded-xl text-xs">إلغاء</Button>
            <Button onClick={handleSaveCenter} className="bg-medical-600 hover:bg-medical-700 text-white rounded-xl text-xs font-bold">
              {isAddingCenter ? 'إضافة وتفعيل الفرع' : 'حفظ التعديلات'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* --- ADD / EDIT SPECIALIST DIALOG --- */}
      <Dialog open={isAddingSpec || isEditingSpec} onOpenChange={(o) => { if (!o) { setIsAddingSpec(false); setIsEditingSpec(false); } }}>
        <DialogContent className="max-w-lg font-cairo">
          <DialogHeader>
            <DialogTitle className="font-bold text-xl">{isAddingSpec ? 'إضافة أخصائي جديد' : 'تعديل بيانات الأخصائي'}</DialogTitle>
          </DialogHeader>

          <div className="space-y-4 py-2">
            <div className="grid grid-cols-2 gap-3">
              <div>
                <Label className="text-xs font-bold text-gray-700 mb-1 block">اسم الأخصائي بالكامل *</Label>
                <Input 
                  value={currentSpec.name} 
                  onChange={(e) => setCurrentSpec({ ...currentSpec, name: e.target.value })}
                  placeholder="د. أحمد محمود"
                  className="rounded-xl"
                />
              </div>
              <div>
                <Label className="text-xs font-bold text-gray-700 mb-1 block">اسم المستخدم (للدخول) *</Label>
                <Input 
                  value={currentSpec.username} 
                  onChange={(e) => setCurrentSpec({ ...currentSpec, username: e.target.value })}
                  placeholder="ahmed_spec"
                  className="rounded-xl font-mono"
                />
              </div>
            </div>

            {isAddingSpec && (
              <div>
                <Label className="text-xs font-bold text-gray-700 mb-1 block">كلمة المرور *</Label>
                <Input 
                  type="password"
                  value={currentSpec.password} 
                  onChange={(e) => setCurrentSpec({ ...currentSpec, password: e.target.value })}
                  placeholder="••••••••"
                  className="rounded-xl font-mono"
                />
              </div>
            )}

            <div className="grid grid-cols-2 gap-3">
              <div>
                <Label className="text-xs font-bold text-gray-700 mb-1 block">الوظيفة / المسمى الوظيفي</Label>
                <Input 
                  value={currentSpec.role} 
                  onChange={(e) => setCurrentSpec({ ...currentSpec, role: e.target.value })}
                  placeholder="أخصائي أطراف صناعية"
                  className="rounded-xl"
                />
              </div>
              <div>
                <Label className="text-xs font-bold text-gray-700 mb-1 block">رقم الهاتف للواتساب</Label>
                <Input 
                  value={currentSpec.phone} 
                  onChange={(e) => setCurrentSpec({ ...currentSpec, phone: e.target.value })}
                  placeholder="01xxxxxxxxx"
                  className="rounded-xl font-mono"
                />
              </div>
            </div>

            <div>
              <Label className="text-xs font-bold text-gray-700 mb-1 block">الفرع / المركز المعتمد</Label>
              <select 
                value={currentSpec.centerId || ''} 
                onChange={(e) => {
                  const sel = centers.find(c => c.id === e.target.value);
                  setCurrentSpec({ ...currentSpec, centerId: e.target.value, centerName: sel ? sel.name : '' });
                }}
                className="w-full h-10 rounded-xl border border-gray-200 px-3 text-xs font-bold bg-white"
              >
                <option value="">-- اختاري الفرع المعتمد --</option>
                {centers.map(c => (
                  <option key={c.id} value={c.id}>{c.name} ({c.location})</option>
                ))}
              </select>
            </div>

            <div>
              <Label className="text-xs font-bold text-gray-700 mb-1 block">مجالات التخصص (مفصولة بفواصل)</Label>
              <Input 
                value={specExpertiseInput} 
                onChange={(e) => setSpecExpertiseInput(e.target.value)}
                placeholder="الأطراف الصناعية الذكية، الجبائر الطبية، تقويم المشي"
                className="rounded-xl"
              />
            </div>

            <div>
              <Label className="text-xs font-bold text-gray-700 mb-1 block">نبذة سريعة عن الأخصائي</Label>
              <Textarea 
                value={currentSpec.bio} 
                onChange={(e) => setCurrentSpec({ ...currentSpec, bio: e.target.value })}
                placeholder="أخصائي متمرس في مجال الأطراف والحركة..."
                rows={2}
                className="rounded-xl"
              />
            </div>
          </div>

          <DialogFooter className="gap-2 pt-2">
            <Button variant="outline" onClick={() => { setIsAddingSpec(false); setIsEditingSpec(false); }} className="rounded-xl text-xs">إلغاء</Button>
            <Button onClick={handleSaveSpec} className="bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold">
              {isAddingSpec ? 'إضافة وتفعيل الأخصائي' : 'حفظ التعديلات'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* --- CONFIRM DELETE CENTER --- */}
      <Dialog open={confirmDeleteCenter !== null} onOpenChange={(o) => { if (!o) setConfirmDeleteCenter(null); }}>
        <DialogContent className="max-w-sm font-cairo text-center">
          <DialogHeader>
            <DialogTitle className="text-center font-bold text-lg text-red-600">تأكيد حذف الفرع</DialogTitle>
            <DialogDescription className="text-center text-xs">هل أنت تأكد من إزالة هذا المركز نهائياً؟</DialogDescription>
          </DialogHeader>
          <DialogFooter className="justify-center gap-2 mt-4">
            <Button variant="outline" onClick={() => setConfirmDeleteCenter(null)} className="rounded-xl text-xs">إلغاء</Button>
            <Button variant="destructive" onClick={() => confirmDeleteCenter && handleDeleteCenter(confirmDeleteCenter)} className="rounded-xl text-xs font-bold">حذف نهائي</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* --- CONFIRM DELETE SPECIALIST --- */}
      <Dialog open={confirmDeleteSpec !== null} onOpenChange={(o) => { if (!o) setConfirmDeleteSpec(null); }}>
        <DialogContent className="max-w-sm font-cairo text-center">
          <DialogHeader>
            <DialogTitle className="text-center font-bold text-lg text-red-600">تأكيد حذف الأخصائي</DialogTitle>
            <DialogDescription className="text-center text-xs">هل أنت تأكد من حذف حساب الأخصائي نهائياً؟</DialogDescription>
          </DialogHeader>
          <DialogFooter className="justify-center gap-2 mt-4">
            <Button variant="outline" onClick={() => setConfirmDeleteSpec(null)} className="rounded-xl text-xs">إلغاء</Button>
            <Button variant="destructive" onClick={() => confirmDeleteSpec && handleDeleteSpec(confirmDeleteSpec)} className="rounded-xl text-xs font-bold">حذف نهائي</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Footer />
    </div>
  );
};

export default AdminDashboard;
