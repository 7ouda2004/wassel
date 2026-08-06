import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Users, MapPin, PlusCircle, Edit, Trash, Save, Search, 
  UserCheck, ShieldAlert, Clock, Phone, Building, Check, X,
  Upload, Sparkles, CheckCircle2, AlertCircle, RefreshCw, FileText, Image as ImageIcon, Briefcase, Camera,
  Undo2, Trash2, Stethoscope, Building2, Ban
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
  getLocalCenters, saveLocalCenters, type Center, EGYPT_GOVERNORATES, type CaseStudy,
  getLocalSpecialists, saveLocalSpecialists, type Specialist,
  DEFAULT_CENTER_IMAGE, FALLBACK_CENTER_IMAGES, FALLBACK_SPECIALIST_IMAGES, DEFAULT_CASES
} from '@/lib/db';
import { syncDatabase, getPendingRequests, uploadLocalData, approveSpecialistInDb, approveCenterInDb, rejectRequest, type RegistrationRequest } from '@/lib/registrations';
import { useAdminStore, type ApprovalRequest } from '@/stores/admin-store';
import { supabase } from '@/lib/supabase';

const AdminDashboard = () => {
  const [centers, setCenters] = useState<Center[]>([]);
  const [specialists, setSpecialists] = useState<Specialist[]>([]);
  const [pendingCloudRequests, setPendingCloudRequests] = useState<RegistrationRequest[]>([]);
  const { approvalRequests, fetchRequests, approveRequest, rejectRequest: rejectCloudRequest, deleteRequest, reApproveRequest, removeSpecialist, removeCenter } = useAdminStore();

  // Dialog States for Center
  const [isAddingCenter, setIsAddingCenter] = useState(false);
  const [isEditingCenter, setIsEditingCenter] = useState(false);
  const [currentCenter, setCurrentCenter] = useState<Center>({
    id: '', name: '', location: 'القاهرة', address: '', phone: '',
    workingHours: 'السبت - الخميس: 9 صباحاً - 9 مساءً',
    image: FALLBACK_CENTER_IMAGES[0], region: 'القاهرة الكبرى', status: 'active',
    description: '', services: [], casesWorkedOn: DEFAULT_CASES
  });
  const [centerSearchTerm, setCenterSearchTerm] = useState('');
  const [confirmDeleteCenter, setConfirmDeleteCenter] = useState<string | null>(null);

  // Specialist States
  const [isAddingSpec, setIsAddingSpec] = useState(false);
  const [isEditingSpec, setIsEditingSpec] = useState(false);
  const [currentSpec, setCurrentSpec] = useState<Specialist>({
    id: '', name: '', username: '', password: '', role: 'أخصائي أطراف صناعية وجبائر طبية', bio: '',
    image: FALLBACK_SPECIALIST_IMAGES[0], expertise: [], status: 'active', phone: '',
    centerId: '', centerName: '', casesWorkedOn: DEFAULT_CASES
  });
  const [specSearchTerm, setSpecSearchTerm] = useState('');
  const [confirmDeleteSpec, setConfirmDeleteSpec] = useState<string | null>(null);
  const [specExpertiseInput, setSpecExpertiseInput] = useState('');
  const [newCaseTitle, setNewCaseTitle] = useState('');
  const [newCaseDesc, setNewCaseDesc] = useState('');

  const loadData = () => {
    const loadedCenters = getLocalCenters();
    const loadedSpecs = getLocalSpecialists();
    setCenters(loadedCenters);
    setSpecialists(loadedSpecs);
    getPendingRequests().then(reqs => setPendingCloudRequests(reqs)).catch(() => {});
    fetchRequests().catch(() => {});
  };

  useEffect(() => {
    document.documentElement.dir = 'rtl';
    document.body.classList.add('font-cairo');
    
    const isAdmin = sessionStorage.getItem('isAdmin');
    if (isAdmin !== 'true') {
      toast.error('غير مصرح لك بدخول صفحة المسؤول');
      window.location.href = '/login';
      return;
    }

    loadData();

    const handleSync = () => loadData();
    window.addEventListener('wasel-db-updated', handleSync);
    return () => window.removeEventListener('wasel-db-updated', handleSync);
  }, []);

  const formatPhoneForWhatsapp = (phone: string) => {
    let cleaned = phone.replace(/\D/g, '');
    if (cleaned.startsWith('01')) {
      cleaned = '20' + cleaned.substring(1);
    }
    return cleaned;
  };

  const [galleryUrlInput, setGalleryUrlInput] = useState('');

  // Image Upload helper
  const handleImageFileChange = (e: React.ChangeEvent<HTMLInputElement>, target: 'center' | 'spec') => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64 = reader.result as string;
        if (target === 'center') {
          setCurrentCenter(prev => ({ ...prev, image: base64 }));
        } else {
          setCurrentSpec(prev => ({ ...prev, image: base64 }));
        }
        toast.success('تم تحميل ومعاينة الصورة بنجاح!');
      };
      reader.readAsDataURL(file);
    }
  };

  const handleGalleryFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64 = reader.result as string;
        setCurrentCenter(prev => ({
          ...prev,
          images: [...(prev.images || []), base64]
        }));
        toast.success('تمت إضافة صورة لمعرض الفرع بنجاح!');
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAddGalleryUrl = () => {
    if (!galleryUrlInput.trim()) return;
    setCurrentCenter(prev => ({
      ...prev,
      images: [...(prev.images || []), galleryUrlInput.trim()]
    }));
    setGalleryUrlInput('');
    toast.success('تمت إضافة رابط الصورة لمعرض الفرع!');
  };

  const handleRemoveGalleryImage = (index: number) => {
    setCurrentCenter(prev => ({
      ...prev,
      images: (prev.images || []).filter((_, i) => i !== index)
    }));
    toast.success('تم حذف الصورة من معرض الفرع');
  };

  // --- Center Handlers ---
  const handleSaveCenter = async () => {
    if (!currentCenter.name.trim() || !currentCenter.location.trim() || !currentCenter.address.trim() || !currentCenter.phone.trim()) {
      toast.error('يرجى ملء كافة الحقول الأساسية للمركز');
      return;
    }

    const centerToSave: Center = {
      ...currentCenter,
      id: currentCenter.id || 'center_' + Date.now().toString(),
      image: currentCenter.image || FALLBACK_CENTER_IMAGES[Math.floor(Math.random() * FALLBACK_CENTER_IMAGES.length)],
      status: 'active',
      username: currentCenter.username || `center_${currentCenter.id || Date.now()}`,
      password: currentCenter.password || 'center123'
    };

    let updatedList: Center[];
    if (isAddingCenter) {
      updatedList = [centerToSave, ...centers];
      toast.success('تمت إضافة المركز وإتاحته فوراً للمرضى بنجاح!');
    } else {
      updatedList = centers.map(c => c.id === centerToSave.id ? centerToSave : c);
      toast.success('تم تحديث بيانات وصورة المركز بنجاح!');
    }

    setCenters(updatedList);
    saveLocalCenters(updatedList);
    await uploadLocalData(specialists, updatedList);

    // Sync to Supabase centers table
    try {
      await supabase.from('centers').upsert({
        name_ar: centerToSave.name,
        phone: centerToSave.phone,
        username: centerToSave.username,
        password: centerToSave.password,
        address_ar: centerToSave.address,
        governorate_ar: centerToSave.location,
        image: centerToSave.image,
        working_hours_ar: centerToSave.workingHours,
        is_active: true
      }, { onConflict: 'username' });
    } catch (e) {
      console.log('Supabase center save fallback:', e);
    }

    setIsAddingCenter(false);
    setIsEditingCenter(false);
  };

  const handleDeleteCenter = async (id: string) => {
    const centerToDelete = centers.find(c => c.id === id);
    const updated = centers.filter(c => c.id !== id);
    setCenters(updated);
    saveLocalCenters(updated);
    await uploadLocalData(specialists, updated);
    if (centerToDelete) {
      await removeCenter(id).catch(() => {});
      if (centerToDelete.username) {
        await deleteRequest(centerToDelete.username).catch(() => {});
      }
    }
    setConfirmDeleteCenter(null);
    toast.success('تم حذف المركز بنجاح');
  };

  const handleApproveCenter = async (id: string) => {
    const updated = centers.map(c => c.id === id ? { ...c, status: 'active' as const } : c);
    setCenters(updated);
    saveLocalCenters(updated);
    await uploadLocalData(specialists, updated);
    const approvedCenter = updated.find(c => c.id === id);
    if (approvedCenter) {
      try {
        await supabase.from('centers').upsert({
          name_ar: approvedCenter.name,
          phone: approvedCenter.phone,
          username: approvedCenter.username,
          password: approvedCenter.password || 'center123',
          address_ar: approvedCenter.address,
          governorate_ar: approvedCenter.location,
          is_active: true
        }, { onConflict: 'username' });
      } catch (e) {}
    }
    toast.success('تم قبول وتفعيل المركز بنجاح! يظهر الآن للمرضى في صفحة المراكز.');
  };

  const handleRejectCenter = (id: string) => {
    const updated = centers.map(c => c.id === id ? { ...c, status: 'rejected' as const } : c);
    setCenters(updated);
    saveLocalCenters(updated);
    uploadLocalData(specialists, updated);
    toast.error('تم رفض طلب تسجيل المركز');
  };

  // --- Specialist Handlers ---
  const handleSaveSpec = async () => {
    if (!currentSpec.name.trim() || !currentSpec.username.trim()) {
      toast.error('يرجى كتابة الاسم واسم المستخدم');
      return;
    }

    const expArray = specExpertiseInput
      ? specExpertiseInput.split(/[،,]/).map(s => s.trim()).filter(Boolean)
      : ['الأطراف الصناعية', 'الجبائر الطبية'];

    const specToSave: Specialist = {
      ...currentSpec,
      id: currentSpec.id || 'spec_' + Date.now().toString(),
      password: currentSpec.password || 'specialist123',
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
      toast.success('تم تحديث بيانات وصورة الأخصائي بنجاح!');
    }

    setSpecialists(updatedList);
    saveLocalSpecialists(updatedList);
    await uploadLocalData(updatedList, centers);

    // Sync to Supabase specialists table
    try {
      await supabase.from('specialists').upsert({
        full_name: specToSave.name,
        phone: specToSave.phone,
        username: specToSave.username,
        password: specToSave.password,
        specialization: specToSave.role,
        image: specToSave.image,
        is_active: true
      }, { onConflict: 'username' });
    } catch (e) {
      console.log('Supabase spec save fallback:', e);
    }

    setIsAddingSpec(false);
    setIsEditingSpec(false);
  };

  const handleDeleteSpec = async (id: string) => {
    const specToDelete = specialists.find(s => s.id === id);
    const updated = specialists.filter(s => s.id !== id);
    setSpecialists(updated);
    saveLocalSpecialists(updated);
    await uploadLocalData(updated, centers);
    if (specToDelete) {
      await removeSpecialist(id).catch(() => {});
      if (specToDelete.username) {
        await deleteRequest(specToDelete.username).catch(() => {});
      }
    }
    setConfirmDeleteSpec(null);
    toast.success('تم حذف الأخصائي بنجاح');
  };

  const handleApproveSpec = async (spec: Specialist) => {
    const updated = specialists.map(s => s.id === spec.id ? { ...s, status: 'active' as const } : s);
    setSpecialists(updated);
    saveLocalSpecialists(updated);
    await uploadLocalData(updated, centers);
    try {
      await supabase.from('specialists').upsert({
        full_name: spec.name,
        phone: spec.phone,
        username: spec.username,
        password: spec.password || 'specialist123',
        specialization: spec.role,
        image: spec.image,
        is_active: true
      }, { onConflict: 'username' });
    } catch (e) {}
    toast.success(`تم قبول وتفعيل الأخصائي: ${spec.name}!`);

    if (spec.phone) {
      const waPhone = formatPhoneForWhatsapp(spec.phone);
      const textMessage = `مرحباً بك أخصائي ${spec.name}، تم قبول طلب انضمامك وتفعيل حسابك بنجاح في منصة واصل! يمكنك الآن تسجيل الدخول واستخدام لوحة التحكم الخاصة بك.`;
      window.open(`https://wa.me/${waPhone}?text=${encodeURIComponent(textMessage)}`, '_blank');
    }
  };

  const handleRejectSpec = (id: string) => {
    const updated = specialists.map(s => s.id === id ? { ...s, status: 'rejected' as const } : s);
    setSpecialists(updated);
    saveLocalSpecialists(updated);
    uploadLocalData(updated, centers);
    toast.error('تم رفض طلب انضمام الأخصائي');
  };

  // Re-approve local rejected items
  const handleReApproveCenter = (id: string) => {
    const updated = centers.map(c => c.id === id ? { ...c, status: 'active' as const } : c);
    setCenters(updated);
    saveLocalCenters(updated);
    uploadLocalData(specialists, updated);
    toast.success('تم إعادة قبول وتفعيل المركز بنجاح!');
  };

  const handleReApproveSpec = (id: string) => {
    const updated = specialists.map(s => s.id === id ? { ...s, status: 'active' as const } : s);
    setSpecialists(updated);
    saveLocalSpecialists(updated);
    uploadLocalData(updated, centers);
    toast.success('تم إعادة قبول وتفعيل الأخصائي بنجاح!');
  };

  // Permanently delete local rejected items
  const handlePermDeleteCenter = async (id: string) => {
    const centerToDelete = centers.find(c => c.id === id);
    const updated = centers.filter(c => c.id !== id);
    setCenters(updated);
    saveLocalCenters(updated);
    await uploadLocalData(specialists, updated);
    if (centerToDelete) {
      await removeCenter(id).catch(() => {});
      if (centerToDelete.username) {
        await deleteRequest(centerToDelete.username).catch(() => {});
      }
    }
    toast.success('تم حذف المركز نهائياً');
  };

  const handlePermDeleteSpec = async (id: string) => {
    const specToDelete = specialists.find(s => s.id === id);
    const updated = specialists.filter(s => s.id !== id);
    setSpecialists(updated);
    saveLocalSpecialists(updated);
    await uploadLocalData(updated, centers);
    if (specToDelete) {
      await removeSpecialist(id).catch(() => {});
      if (specToDelete.username) {
        await deleteRequest(specToDelete.username).catch(() => {});
      }
    }
    toast.success('تم حذف الأخصائي نهائياً');
  };

  // Cloud approval request handlers
  const handleApproveCloudRequest = async (id: string) => {
    try {
      await approveRequest(id);
      loadData();
      toast.success('تم قبول وتفعيل الطلب بنجاح!');
    } catch {
      toast.error('حدث خطأ أثناء قبول الطلب');
    }
  };

  const handleRejectCloudRequest = async (id: string) => {
    try {
      await rejectCloudRequest(id);
      toast.error('تم رفض الطلب');
    } catch {
      toast.error('حدث خطأ أثناء رفض الطلب');
    }
  };

  const handleReApproveCloudRequest = async (id: string) => {
    try {
      await reApproveRequest(id);
      loadData();
      toast.success('تم إعادة قبول الطلب وتفعيله!');
    } catch {
      toast.error('حدث خطأ أثناء إعادة القبول');
    }
  };

  const handleDeleteCloudRequest = async (id: string) => {
    try {
      await deleteRequest(id);
      toast.success('تم حذف الطلب نهائياً');
    } catch {
      toast.error('حدث خطأ أثناء الحذف');
    }
  };

  // JSONBIN / Local Cloud request handlers
  const handleApproveJsonbinRequest = async (req: RegistrationRequest) => {
    try {
      if (req.type === 'specialist') {
        await approveSpecialistInDb(req);
      } else {
        await approveCenterInDb(req);
      }
      const match = approvalRequests.find(r => r.username === req.username);
      if (match) {
        await approveRequest(match.id);
      }
      setPendingCloudRequests(prev => prev.filter(r => r.id !== req.id));
      loadData();
      toast.success('تم قبول وتفعيل الحساب بنجاح!');
    } catch {
      toast.error('حدث خطأ أثناء قبول الطلب');
    }
  };

  const handleRejectJsonbinRequest = async (req: RegistrationRequest) => {
    try {
      await rejectRequest(req.id);
      const match = approvalRequests.find(r => r.username === req.username);
      if (match) {
        await rejectCloudRequest(match.id);
      }
      setPendingCloudRequests(prev => prev.map(r => r.id === req.id ? { ...r, status: 'rejected' } : r));
      loadData();
      toast.error('تم رفض الطلب');
    } catch {
      toast.error('حدث خطأ أثناء رفض الطلب');
    }
  };

  const handleReApproveJsonbinRequest = async (req: RegistrationRequest) => {
    try {
      if (req.type === 'specialist') {
        await approveSpecialistInDb(req);
      } else {
        await approveCenterInDb(req);
      }
      const match = approvalRequests.find(r => r.username === req.username);
      if (match) {
        await reApproveRequest(match.id);
      }
      setPendingCloudRequests(prev => prev.map(r => r.id === req.id ? { ...r, status: 'approved' } : r));
      loadData();
      toast.success('تم إعادة قبول الطلب وتفعيله!');
    } catch {
      toast.error('حدث خطأ أثناء إعادة القبول');
    }
  };

  const handleDeleteJsonbinRequest = async (req: RegistrationRequest) => {
    try {
      setPendingCloudRequests(prev => prev.filter(r => r.id !== req.id));
      const match = approvalRequests.find(r => r.username === req.username);
      if (match) {
        await deleteRequest(match.id);
      }
      toast.success('تم حذف الطلب نهائياً');
    } catch {
      toast.error('حدث خطأ أثناء الحذف');
    }
  };

  // Add Case Study Helper
  const handleAddCaseToSpec = () => {
    if (!newCaseTitle.trim()) {
      toast.error('أدخل عنوان الحالة السابقة');
      return;
    }
    const newCase: CaseStudy = {
      id: 'case_' + Date.now().toString(),
      title: newCaseTitle,
      deviceType: 'جهاز / طرف صناعي مخصص',
      description: newCaseDesc || 'تم تنفيذ وتأهيل الحالة بنجاح.',
      outcome: 'استعاد المريض قدرته الحركية بنجاح واستقلاليته التامة.'
    };
    setCurrentSpec(prev => ({
      ...prev,
      casesWorkedOn: [...(prev.casesWorkedOn || []), newCase]
    }));
    setNewCaseTitle('');
    setNewCaseDesc('');
    toast.success('تم إضافة الحالة لإنجازات الأخصائي بنجاح!');
  };

  // Filter lists
  const pendingCenters = centers.filter(c => c.status === 'pending');
  const pendingSpecs = specialists.filter(s => s.status === 'pending');
  const rejectedCenters = centers.filter(c => c.status === 'rejected');
  const rejectedSpecs = specialists.filter(s => s.status === 'rejected');
  const cloudPendingRequests = approvalRequests.filter(r => r.status === 'pending');
  const cloudRejectedRequests = approvalRequests.filter(r => r.status === 'rejected');

  const pendingJsonbinRequests = pendingCloudRequests.filter(r => 
    r.status === 'pending' && 
    !cloudPendingRequests.some(c => c.username === r.username) &&
    !pendingCenters.some(c => c.username === r.username || c.name === r.full_name) &&
    !pendingSpecs.some(s => s.username === r.username || s.name === r.full_name)
  );

  const rejectedJsonbinRequests = pendingCloudRequests.filter(r => 
    r.status === 'rejected' && 
    !cloudRejectedRequests.some(c => c.username === r.username) &&
    !rejectedCenters.some(c => c.username === r.username) &&
    !rejectedSpecs.some(s => s.username === r.username)
  );

  const totalPendingCount = pendingCenters.length + pendingSpecs.length + cloudPendingRequests.length + pendingJsonbinRequests.length;
  const totalRejectedCount = rejectedCenters.length + rejectedSpecs.length + cloudRejectedRequests.length + rejectedJsonbinRequests.length;

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
          <div className="bg-gradient-to-r from-medical-950 via-medical-900 to-medical-800 text-white rounded-3xl p-6 sm:p-8 shadow-xl mb-8 flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md px-3.5 py-1 rounded-full text-xs font-bold mb-3 border border-white/20">
                <Sparkles className="w-3.5 h-3.5 text-medical-300" />
                لوحة تحكم أدمن منصة واصل
              </div>
              <h1 className="text-2xl sm:text-3xl font-extrabold font-cairo">إدارة الفروع، الصور، والأخصائيين والموافقات</h1>
              <p className="text-gray-300 text-sm mt-1.5 font-medium">تغيير صور وتفاصيل المركز والأخصائيين وتخصيص إنجازات وحالات كل فرع.</p>
            </div>

            <div className="flex items-center gap-3">
              <Button onClick={loadData} variant="outline" className="bg-white/10 hover:bg-white/20 text-white border-white/20 rounded-xl gap-2 text-xs font-bold py-5">
                <RefreshCw className="w-4 h-4" />
                تحديث البيانات
              </Button>
            </div>
          </div>

          {/* Stats Bar */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
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

            <div className="bg-white rounded-2xl p-5 border border-red-100 shadow-xs flex items-center justify-between">
              <div>
                <p className="text-xs font-bold text-red-600">طلبات مرفوضة</p>
                <p className="text-2xl font-extrabold text-red-500 mt-1">{totalRejectedCount}</p>
              </div>
              <div className="w-12 h-12 rounded-xl bg-red-50 text-red-500 flex items-center justify-center font-bold">
                <Ban className="w-6 h-6" />
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
                إدارة المراكز والصور ({centers.length})
              </TabsTrigger>

              <TabsTrigger value="specialists" className="rounded-xl font-bold py-2.5 px-5 gap-2">
                <Users className="w-4 h-4 text-emerald-600" />
                إدارة أخصائيي المنصة والحالات ({specialists.length})
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
                    <p className="text-gray-500 text-xs mt-0.5">قم بمراجعة بيانات وتأكيد قبول الفرع أو الأخصائي ليظهروا مباشرة للمرضى.</p>
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
                    {/* Pending Centers (local) */}
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

                    {/* Pending Specialists (local) */}
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

                    {/* Cloud Pending Requests (from Supabase approval_requests) */}
                    {cloudPendingRequests.length > 0 && (
                      <div>
                        <h3 className="text-sm font-bold text-gray-800 mb-3 flex items-center gap-2 pt-4 border-t border-gray-100">
                          <Sparkles className="w-4 h-4 text-amber-600" />
                          طلبات انضمام جديدة من بوابة الأخصائيين ({cloudPendingRequests.length}):
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          {cloudPendingRequests.map(req => (
                            <div key={req.id} className="bg-violet-50/40 border border-violet-200/80 rounded-2xl p-5 flex flex-col justify-between">
                              <div>
                                <div className="flex items-center justify-between mb-2">
                                  <h4 className="font-bold text-gray-900 text-base">{req.fullName}</h4>
                                  <span className={`text-[10px] font-bold px-2.5 py-1 rounded-full ${
                                    req.type === 'specialist' 
                                      ? 'text-teal-700 bg-teal-100' 
                                      : 'text-blue-700 bg-blue-100'
                                  }`}>
                                    {req.type === 'specialist' ? (
                                      <span className="flex items-center gap-1"><Stethoscope className="w-3 h-3" /> أخصائي</span>
                                    ) : (
                                      <span className="flex items-center gap-1"><Building2 className="w-3 h-3" /> مركز</span>
                                    )}
                                  </span>
                                </div>
                                <div className="space-y-1.5 text-xs text-gray-600 mb-4">
                                  <p><span className="font-bold text-gray-700">رقم الواتساب:</span> <span dir="ltr">{req.phone}</span></p>
                                  <p><span className="font-bold text-gray-700">اسم المستخدم:</span> <span className="font-mono text-medical-700">@{req.username}</span></p>
                                  {req.specialization && <p><span className="font-bold text-gray-700">التخصص:</span> {req.specialization}</p>}
                                  {req.centerName && <p><span className="font-bold text-gray-700">اسم المركز:</span> {req.centerName}</p>}
                                  <p><span className="font-bold text-gray-700">تاريخ التقديم:</span> {new Date(req.submittedAt).toLocaleDateString('ar-EG', { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' })}</p>
                                </div>
                              </div>

                              <div className="flex gap-2 pt-3 border-t border-violet-200/60">
                                <Button 
                                  onClick={() => handleApproveCloudRequest(req.id)}
                                  className="flex-grow bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold py-2.5 gap-1.5"
                                >
                                  <Check className="w-4 h-4" />
                                  قبول وتفعيل
                                </Button>
                                <Button 
                                  onClick={() => handleRejectCloudRequest(req.id)}
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

                    {/* Cloud Pending Requests (from JSONBIN / submitRegistration) */}
                    {pendingJsonbinRequests.length > 0 && (
                      <div>
                        <h3 className="text-sm font-bold text-gray-800 mb-3 flex items-center gap-2 pt-4 border-t border-gray-100">
                          <Sparkles className="w-4 h-4 text-medical-600" />
                          طلبات تسجيل جديدة من الموقع ({pendingJsonbinRequests.length}):
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          {pendingJsonbinRequests.map(req => (
                            <div key={req.id} className="bg-sky-50/40 border border-sky-200/80 rounded-2xl p-5 flex flex-col justify-between">
                              <div>
                                <div className="flex items-center justify-between mb-2">
                                  <h4 className="font-bold text-gray-900 text-base">{req.full_name || req.center_name}</h4>
                                  <span className={`text-[10px] font-bold px-2.5 py-1 rounded-full ${
                                    req.type === 'specialist' 
                                      ? 'text-teal-700 bg-teal-100' 
                                      : 'text-blue-700 bg-blue-100'
                                  }`}>
                                    {req.type === 'specialist' ? (
                                      <span className="flex items-center gap-1"><Stethoscope className="w-3 h-3" /> أخصائي</span>
                                    ) : (
                                      <span className="flex items-center gap-1"><Building2 className="w-3 h-3" /> مركز</span>
                                    )}
                                  </span>
                                </div>
                                <div className="space-y-1.5 text-xs text-gray-600 mb-4">
                                  <p><span className="font-bold text-gray-700">رقم التواصل:</span> <span dir="ltr">{req.phone}</span></p>
                                  <p><span className="font-bold text-gray-700">اسم المستخدم:</span> <span className="font-mono text-medical-700">@{req.username}</span></p>
                                  {req.role && <p><span className="font-bold text-gray-700">الوظيفة/التخصص:</span> {req.role}</p>}
                                  {req.center_name && <p><span className="font-bold text-gray-700">الفرع:</span> {req.center_name}</p>}
                                  {req.submitted_at && <p><span className="font-bold text-gray-700">تاريخ التقديم:</span> {new Date(req.submitted_at).toLocaleDateString('ar-EG', { year: 'numeric', month: 'long', day: 'numeric' })}</p>}
                                </div>
                              </div>

                              <div className="flex gap-2 pt-3 border-t border-sky-200/60">
                                <Button 
                                  onClick={() => handleApproveJsonbinRequest(req)}
                                  className="flex-grow bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold py-2.5 gap-1.5"
                                >
                                  <Check className="w-4 h-4" />
                                  قبول وتفعيل
                                </Button>
                                <Button 
                                  onClick={() => handleRejectJsonbinRequest(req)}
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

              {/* REJECTED REQUESTS SECTION */}
              {totalRejectedCount > 0 && (
                <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-red-100">
                  <div className="flex items-center gap-3 mb-6 pb-4 border-b border-red-100">
                    <div className="w-10 h-10 rounded-xl bg-red-50 text-red-500 flex items-center justify-center">
                      <Ban className="w-5 h-5" />
                    </div>
                    <div>
                      <h2 className="text-xl font-bold text-gray-900 font-cairo">الطلبات المرفوضة ({totalRejectedCount})</h2>
                      <p className="text-gray-500 text-xs mt-0.5">يمكنك إعادة قبول أي طلب مرفوض أو حذفه نهائياً من النظام.</p>
                    </div>
                  </div>

                  <div className="space-y-6">
                    {/* Rejected Centers (local) */}
                    {rejectedCenters.length > 0 && (
                      <div>
                        <h3 className="text-sm font-bold text-gray-700 mb-3 flex items-center gap-2">
                          <Building className="w-4 h-4 text-red-400" />
                          مراكز مرفوضة ({rejectedCenters.length}):
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          {rejectedCenters.map(center => (
                            <div key={center.id} className="bg-red-50/30 border border-red-200/60 rounded-2xl p-5 flex flex-col justify-between opacity-80 hover:opacity-100 transition-opacity">
                              <div>
                                <div className="flex items-center justify-between mb-2">
                                  <h4 className="font-bold text-gray-700 text-base">{center.name}</h4>
                                  <span className="text-[10px] font-bold text-red-600 bg-red-100 px-2.5 py-1 rounded-full">مرفوض</span>
                                </div>
                                <div className="space-y-1 text-xs text-gray-500 mb-3">
                                  <p><span className="font-bold text-gray-600">المحافظة:</span> {center.location}</p>
                                  <p><span className="font-bold text-gray-600">الهاتف:</span> <span dir="ltr">{center.phone}</span></p>
                                </div>
                              </div>
                              <div className="flex gap-2 pt-3 border-t border-red-200/40">
                                <Button 
                                  onClick={() => handleReApproveCenter(center.id)}
                                  variant="outline"
                                  className="flex-grow rounded-xl text-xs font-bold py-2.5 gap-1.5 border-emerald-300 text-emerald-700 hover:bg-emerald-50"
                                >
                                  <Undo2 className="w-4 h-4" />
                                  إعادة قبول
                                </Button>
                                <Button 
                                  onClick={() => handlePermDeleteCenter(center.id)}
                                  variant="destructive"
                                  className="rounded-xl text-xs font-bold py-2.5 px-4 gap-1"
                                >
                                  <Trash2 className="w-3.5 h-3.5" />
                                  حذف نهائي
                                </Button>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Rejected Specialists (local) */}
                    {rejectedSpecs.length > 0 && (
                      <div>
                        <h3 className="text-sm font-bold text-gray-700 mb-3 flex items-center gap-2 pt-4 border-t border-red-100">
                          <Users className="w-4 h-4 text-red-400" />
                          أخصائيون مرفوضون ({rejectedSpecs.length}):
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          {rejectedSpecs.map(spec => (
                            <div key={spec.id} className="bg-red-50/30 border border-red-200/60 rounded-2xl p-5 flex flex-col justify-between opacity-80 hover:opacity-100 transition-opacity">
                              <div className="flex items-start gap-3 mb-3">
                                <img 
                                  src={spec.image || FALLBACK_SPECIALIST_IMAGES[0]} 
                                  alt={spec.name} 
                                  className="w-12 h-12 rounded-full object-cover border-2 border-red-200 grayscale"
                                  onError={(e) => { e.currentTarget.src = FALLBACK_SPECIALIST_IMAGES[0]; }}
                                />
                                <div>
                                  <h4 className="font-bold text-gray-700 text-base">{spec.name}</h4>
                                  <p className="text-xs text-gray-500">{spec.role}</p>
                                  {spec.phone && <p className="text-xs text-gray-400 mt-0.5" dir="ltr">{spec.phone}</p>}
                                </div>
                              </div>
                              <div className="flex gap-2 pt-3 border-t border-red-200/40">
                                <Button 
                                  onClick={() => handleReApproveSpec(spec.id)}
                                  variant="outline"
                                  className="flex-grow rounded-xl text-xs font-bold py-2.5 gap-1.5 border-emerald-300 text-emerald-700 hover:bg-emerald-50"
                                >
                                  <Undo2 className="w-4 h-4" />
                                  إعادة قبول
                                </Button>
                                <Button 
                                  onClick={() => handlePermDeleteSpec(spec.id)}
                                  variant="destructive"
                                  className="rounded-xl text-xs font-bold py-2.5 px-4 gap-1"
                                >
                                  <Trash2 className="w-3.5 h-3.5" />
                                  حذف نهائي
                                </Button>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Cloud Rejected Requests */}
                    {cloudRejectedRequests.length > 0 && (
                      <div>
                        <h3 className="text-sm font-bold text-gray-700 mb-3 flex items-center gap-2 pt-4 border-t border-red-100">
                          <Sparkles className="w-4 h-4 text-red-400" />
                          طلبات مرفوضة من بوابة الأخصائيين ({cloudRejectedRequests.length}):
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          {cloudRejectedRequests.map(req => (
                            <div key={req.id} className="bg-red-50/30 border border-red-200/60 rounded-2xl p-5 flex flex-col justify-between opacity-80 hover:opacity-100 transition-opacity">
                              <div>
                                <div className="flex items-center justify-between mb-2">
                                  <h4 className="font-bold text-gray-700 text-base">{req.fullName}</h4>
                                  <div className="flex items-center gap-1.5">
                                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                                      req.type === 'specialist' ? 'text-teal-600 bg-teal-50' : 'text-blue-600 bg-blue-50'
                                    }`}>
                                      {req.type === 'specialist' ? 'أخصائي' : 'مركز'}
                                    </span>
                                    <span className="text-[10px] font-bold text-red-600 bg-red-100 px-2 py-0.5 rounded-full">مرفوض</span>
                                  </div>
                                </div>
                                <div className="space-y-1 text-xs text-gray-500 mb-3">
                                  <p><span className="font-bold text-gray-600">الواتساب:</span> <span dir="ltr">{req.phone}</span></p>
                                  <p><span className="font-bold text-gray-600">المستخدم:</span> <span className="font-mono">@{req.username}</span></p>
                                  {req.specialization && <p><span className="font-bold text-gray-600">التخصص:</span> {req.specialization}</p>}
                                  {req.centerName && <p><span className="font-bold text-gray-600">المركز:</span> {req.centerName}</p>}
                                  {req.reviewedAt && <p><span className="font-bold text-gray-600">تاريخ الرفض:</span> {new Date(req.reviewedAt).toLocaleDateString('ar-EG', { year: 'numeric', month: 'long', day: 'numeric' })}</p>}
                                </div>
                              </div>
                              <div className="flex gap-2 pt-3 border-t border-red-200/40">
                                <Button 
                                  onClick={() => handleReApproveCloudRequest(req.id)}
                                  variant="outline"
                                  className="flex-grow rounded-xl text-xs font-bold py-2.5 gap-1.5 border-emerald-300 text-emerald-700 hover:bg-emerald-50"
                                >
                                  <Undo2 className="w-4 h-4" />
                                  إعادة قبول
                                </Button>
                                <Button 
                                  onClick={() => handleDeleteCloudRequest(req.id)}
                                  variant="destructive"
                                  className="rounded-xl text-xs font-bold py-2.5 px-4 gap-1"
                                >
                                  <Trash2 className="w-3.5 h-3.5" />
                                  حذف نهائي
                                </Button>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Cloud Rejected Requests (from JSONBIN / submitRegistration) */}
                    {rejectedJsonbinRequests.length > 0 && (
                      <div>
                        <h3 className="text-sm font-bold text-gray-700 mb-3 flex items-center gap-2 pt-4 border-t border-red-100">
                          <Sparkles className="w-4 h-4 text-red-400" />
                          طلبات مرفوضة من الموقع ({rejectedJsonbinRequests.length}):
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          {rejectedJsonbinRequests.map(req => (
                            <div key={req.id} className="bg-red-50/30 border border-red-200/60 rounded-2xl p-5 flex flex-col justify-between opacity-80 hover:opacity-100 transition-opacity">
                              <div>
                                <div className="flex items-center justify-between mb-2">
                                  <h4 className="font-bold text-gray-700 text-base">{req.full_name || req.center_name}</h4>
                                  <div className="flex items-center gap-1.5">
                                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                                      req.type === 'specialist' ? 'text-teal-600 bg-teal-50' : 'text-blue-600 bg-blue-50'
                                    }`}>
                                      {req.type === 'specialist' ? 'أخصائي' : 'مركز'}
                                    </span>
                                    <span className="text-[10px] font-bold text-red-600 bg-red-100 px-2 py-0.5 rounded-full">مرفوض</span>
                                  </div>
                                </div>
                                <div className="space-y-1 text-xs text-gray-500 mb-3">
                                  <p><span className="font-bold text-gray-600">الواتساب:</span> <span dir="ltr">{req.phone}</span></p>
                                  <p><span className="font-bold text-gray-600">المستخدم:</span> <span className="font-mono">@{req.username}</span></p>
                                  {req.role && <p><span className="font-bold text-gray-600">التخصص:</span> {req.role}</p>}
                                  {req.center_name && <p><span className="font-bold text-gray-600">المركز:</span> {req.center_name}</p>}
                                </div>
                              </div>
                              <div className="flex gap-2 pt-3 border-t border-red-200/40">
                                <Button 
                                  onClick={() => handleReApproveJsonbinRequest(req)}
                                  variant="outline"
                                  className="flex-grow rounded-xl text-xs font-bold py-2.5 gap-1.5 border-emerald-300 text-emerald-700 hover:bg-emerald-50"
                                >
                                  <Undo2 className="w-4 h-4" />
                                  إعادة قبول
                                </Button>
                                <Button 
                                  onClick={() => handleDeleteJsonbinRequest(req)}
                                  variant="destructive"
                                  className="rounded-xl text-xs font-bold py-2.5 px-4 gap-1"
                                >
                                  <Trash2 className="w-3.5 h-3.5" />
                                  حذف نهائي
                                </Button>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </TabsContent>

            {/* TAB 2: MANAGE CENTERS & IMAGES */}
            <TabsContent value="centers" className="space-y-6">
              <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-gray-100">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6 pb-4 border-b border-gray-100">
                  <div>
                    <h2 className="text-xl font-bold text-gray-900 font-cairo">إدارة بيانات وصور مراكز واصل</h2>
                    <p className="text-gray-500 text-xs mt-0.5">يمكنك رفع صورة جديدة لكل فرع، تعديل العنوان، الساعات، والخدمات.</p>
                  </div>
                  <Button 
                    onClick={() => {
                      setCurrentCenter({
                        id: '', name: '', location: 'القاهرة', address: '', phone: '',
                        workingHours: 'السبت - الخميس: 9 صباحاً - 9 مساءً',
                        image: FALLBACK_CENTER_IMAGES[0], region: 'القاهرة الكبرى', status: 'active',
                        description: '', services: [], casesWorkedOn: DEFAULT_CASES
                      });
                      setIsAddingCenter(true);
                    }}
                    className="bg-medical-600 hover:bg-medical-700 text-white rounded-xl font-bold gap-2 text-xs py-5"
                  >
                    <PlusCircle className="w-4 h-4" />
                    إضافة مركز وصورة جديدة
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
                        <TableHead className="font-bold text-right text-gray-900">صورة والاسم</TableHead>
                        <TableHead className="font-bold text-right text-gray-900">المحافظة والإقليم</TableHead>
                        <TableHead className="font-bold text-right text-gray-900">العنوان والواتساب</TableHead>
                        <TableHead className="font-bold text-center text-gray-900">الحالة</TableHead>
                        <TableHead className="font-bold text-center text-gray-900">الإجراءات والتعديل</TableHead>
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
                                className="w-12 h-12 rounded-xl object-cover border shadow-xs"
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
                            <div className="mt-1 text-[10px] font-mono text-gray-600 bg-slate-100 px-2 py-0.5 rounded-md inline-block border border-slate-200">
                              يوزر: <span className="font-bold text-medical-800">{center.username || `center_${center.id}`}</span> | باسورد: <span className="font-bold text-gray-900">{center.password || 'center123'}</span>
                            </div>
                          </TableCell>
                          <TableCell className="text-center">
                            <span className={`text-[10px] font-bold px-2.5 py-1 rounded-full ${
                              center.status === 'active' ? 'bg-emerald-50 text-emerald-700' : 
                              center.status === 'rejected' ? 'bg-red-50 text-red-600' : 
                              'bg-amber-50 text-amber-700'
                            }`}>
                              {center.status === 'active' ? 'مفعل ويعمل' : center.status === 'rejected' ? 'مرفوض' : 'قيد الانتظار'}
                            </span>
                          </TableCell>
                          <TableCell className="text-center">
                            <div className="flex items-center justify-center gap-1.5">
                              <Button 
                                size="sm" 
                                variant="outline"
                                onClick={() => { setCurrentCenter(center); setIsEditingCenter(true); }}
                                className="rounded-lg h-8 px-3 text-xs text-medical-700 border-medical-200 hover:bg-medical-50 font-bold"
                              >
                                <Edit className="w-3.5 h-3.5 me-1" />
                                تعديل وصورة
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

            {/* TAB 3: MANAGE SPECIALISTS & CASES */}
            <TabsContent value="specialists" className="space-y-6">
              <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-gray-100">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6 pb-4 border-b border-gray-100">
                  <div>
                    <h2 className="text-xl font-bold text-gray-900 font-cairo">إدارة بيانات وصور وحالات الأخصائيين</h2>
                    <p className="text-gray-500 text-xs mt-0.5">رفع وتحديث الصور الشخصية والخبرات والحالات التي تم إنجازها.</p>
                  </div>
                  <Button 
                    onClick={() => {
                      setCurrentSpec({
                        id: '', name: '', username: '', password: '', role: 'أخصائي أطراف صناعية وجبائر طبية', bio: '',
                        image: FALLBACK_SPECIALIST_IMAGES[0], expertise: [], status: 'active', phone: '',
                        centerId: '', centerName: '', casesWorkedOn: DEFAULT_CASES
                      });
                      setSpecExpertiseInput('');
                      setIsAddingSpec(true);
                    }}
                    className="bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl font-bold gap-2 text-xs py-5"
                  >
                    <PlusCircle className="w-4 h-4" />
                    إضافة أخصائي وصورة جديدة
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
                          {spec.phone && <p><span className="font-bold text-gray-700">الهاتف:</span> <span dir="ltr" className="font-mono">{spec.phone}</span></p>}
                          <p><span className="font-bold text-gray-700">الحالات المنجزة:</span> {spec.casesWorkedOn ? spec.casesWorkedOn.length : 2} حالات</p>
                          
                          <div className="mt-2 p-2 bg-slate-100 rounded-xl border border-slate-200 text-[11px] font-mono space-y-0.5 text-gray-700">
                            <div className="flex justify-between"><span>اسم المستخدم:</span> <span className="font-bold text-medical-700">@{spec.username}</span></div>
                            <div className="flex justify-between"><span>كلمة المرور:</span> <span className="font-bold text-gray-900">{spec.password || 'specialist123'}</span></div>
                          </div>
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
                          تعديل الصورة والملف
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

      {/* --- ADD / EDIT CENTER DIALOG (WITH IMAGE FILE & URL EDITING) --- */}
      <Dialog open={isAddingCenter || isEditingCenter} onOpenChange={(o) => { if (!o) { setIsAddingCenter(false); setIsEditingCenter(false); } }}>
        <DialogContent className="max-w-lg font-cairo">
          <DialogHeader>
            <DialogTitle className="font-bold text-xl">{isAddingCenter ? 'إضافة فرع/مركز جديد' : 'تعديل بيانات وصورة المركز'}</DialogTitle>
            <DialogDescription className="text-xs">تعديل الصورة الرسمية وتفاصيل الفرع لتظهر فوراً على المنصة.</DialogDescription>
          </DialogHeader>

          <div className="space-y-4 py-2">
            
            {/* Image Preview & Upload */}
            <div className="p-4 bg-gray-50 rounded-2xl border border-gray-200 text-center">
              <Label className="text-xs font-bold text-gray-800 mb-2 block flex items-center justify-center gap-1.5">
                <ImageIcon className="w-4 h-4 text-medical-600" />
                صورة المركز الرئيسية
              </Label>
              
              <div className="w-full h-36 rounded-xl overflow-hidden bg-gray-200 mb-3 relative border">
                <img 
                  src={currentCenter.image || FALLBACK_CENTER_IMAGES[0]} 
                  alt="معاينة صورة المركز"
                  className="w-full h-full object-cover"
                  onError={(e) => { e.currentTarget.src = FALLBACK_CENTER_IMAGES[0]; }}
                />
              </div>

              <div className="flex flex-col sm:flex-row gap-2">
                <Input 
                  type="file" 
                  accept="image/*"
                  onChange={(e) => handleImageFileChange(e, 'center')}
                  className="text-xs bg-white rounded-xl"
                />
                <Input 
                  type="text" 
                  value={currentCenter.image}
                  onChange={(e) => setCurrentCenter({ ...currentCenter, image: e.target.value })}
                  placeholder="أو ضع رابط الصورة المباشر..."
                  className="text-xs rounded-xl"
                />
              </div>

              {/* MULTI-IMAGE GALLERY UPLOADER */}
              <div className="mt-4 pt-3 border-t border-gray-200 text-right">
                <Label className="text-xs font-bold text-medical-800 mb-1.5 block flex items-center gap-1.5">
                  <Camera className="w-4 h-4 text-emerald-600" />
                  معرض صور الفرع (إضافة عدة صور للمركز)
                </Label>
                
                <div className="flex gap-2 mb-2">
                  <Input 
                    type="file" 
                    accept="image/*"
                    onChange={handleGalleryFileChange}
                    className="text-xs bg-white rounded-xl"
                  />
                  <div className="flex gap-1 flex-grow">
                    <Input 
                      type="text" 
                      value={galleryUrlInput}
                      onChange={(e) => setGalleryUrlInput(e.target.value)}
                      placeholder="أو إضافة رابط صورة..."
                      className="text-xs rounded-xl flex-grow"
                    />
                    <Button type="button" size="sm" onClick={handleAddGalleryUrl} className="bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs px-3">
                      إضافة
                    </Button>
                  </div>
                </div>

                {/* THUMBNAILS OF GALLERY IMAGES */}
                {currentCenter.images && currentCenter.images.length > 0 && (
                  <div className="grid grid-cols-4 gap-2 pt-2">
                    {currentCenter.images.map((imgUrl, idx) => (
                      <div key={idx} className="relative h-16 rounded-xl overflow-hidden border border-gray-200 group">
                        <img src={imgUrl} alt={`Gallery ${idx}`} className="w-full h-full object-cover" />
                        <button
                          type="button"
                          onClick={() => handleRemoveGalleryImage(idx)}
                          className="absolute top-1 right-1 bg-rose-600 text-white rounded-full p-1 shadow-sm opacity-90 hover:opacity-100"
                          title="حذف هذه الصورة"
                        >
                          <X className="w-3 h-3" />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <Label className="text-xs font-bold text-gray-700 mb-1 block">اسم المركز / الفرع *</Label>
                <Input 
                  value={currentCenter.name} 
                  onChange={(e) => setCurrentCenter({ ...currentCenter, name: e.target.value })}
                  placeholder="مثال: مركز واصل - فرع سوهاج"
                  className="rounded-xl"
                />
              </div>
              <div>
                <Label className="text-xs font-bold text-gray-700 mb-1 block">اسم المستخدم (للدخول) *</Label>
                <Input 
                  value={currentCenter.username || ''} 
                  onChange={(e) => setCurrentCenter({ ...currentCenter, username: e.target.value })}
                  placeholder="center_sohag"
                  className="rounded-xl font-mono"
                />
              </div>
            </div>

            <div>
              <Label className="text-xs font-bold text-gray-700 mb-1 block">كلمة المرور للدخول *</Label>
              <Input 
                value={currentCenter.password || ''} 
                onChange={(e) => setCurrentCenter({ ...currentCenter, password: e.target.value })}
                placeholder="center123"
                className="rounded-xl font-mono"
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

      {/* --- ADD / EDIT SPECIALIST DIALOG (WITH IMAGE & CASE STUDIES EDITING) --- */}
      <Dialog open={isAddingSpec || isEditingSpec} onOpenChange={(o) => { if (!o) { setIsAddingSpec(false); setIsEditingSpec(false); } }}>
        <DialogContent className="max-w-lg font-cairo max-h-[85vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="font-bold text-xl">{isAddingSpec ? 'إضافة أخصائي جديد' : 'تعديل بيانات وصورة الأخصائي'}</DialogTitle>
          </DialogHeader>

          <div className="space-y-4 py-2">
            
            {/* Image Preview & Upload */}
            <div className="p-4 bg-gray-50 rounded-2xl border border-gray-200 text-center">
              <Label className="text-xs font-bold text-gray-800 mb-2 block flex items-center justify-center gap-1.5">
                <ImageIcon className="w-4 h-4 text-emerald-600" />
                الصورة الشخصية للأخصائي
              </Label>
              
              <div className="w-24 h-24 rounded-full overflow-hidden bg-gray-200 mb-3 mx-auto border-2 border-white shadow-sm">
                <img 
                  src={currentSpec.image || FALLBACK_SPECIALIST_IMAGES[0]} 
                  alt="معاينة صورة الأخصائي"
                  className="w-full h-full object-cover"
                  onError={(e) => { e.currentTarget.src = FALLBACK_SPECIALIST_IMAGES[0]; }}
                />
              </div>

              <div className="flex flex-col sm:flex-row gap-2">
                <Input 
                  type="file" 
                  accept="image/*"
                  onChange={(e) => handleImageFileChange(e, 'spec')}
                  className="text-xs bg-white rounded-xl"
                />
                <Input 
                  type="text" 
                  value={currentSpec.image}
                  onChange={(e) => setCurrentSpec({ ...currentSpec, image: e.target.value })}
                  placeholder="أو رابط الصورة..."
                  className="text-xs rounded-xl"
                />
              </div>
            </div>

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

            <div>
              <Label className="text-xs font-bold text-gray-700 mb-1 block">كلمة المرور للدخول *</Label>
              <Input 
                type="text"
                value={currentSpec.password || ''} 
                onChange={(e) => setCurrentSpec({ ...currentSpec, password: e.target.value })}
                placeholder="specialist123"
                className="rounded-xl font-mono text-xs"
              />
            </div>

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
                <option value="">-- اختر الفرع المعتمد --</option>
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
              <Label className="text-xs font-bold text-gray-700 mb-1 block">نبذة سريعة عن الأخصائي وخبراته</Label>
              <Textarea 
                value={currentSpec.bio} 
                onChange={(e) => setCurrentSpec({ ...currentSpec, bio: e.target.value })}
                placeholder="أخصائي متمرس في مجال الأطراف والحركة..."
                rows={2}
                className="rounded-xl"
              />
            </div>

            {/* Case Studies Section */}
            <div className="p-4 bg-emerald-50/50 rounded-2xl border border-emerald-100 space-y-3">
              <Label className="text-xs font-bold text-emerald-900 block flex items-center gap-1.5">
                <Briefcase className="w-4 h-4 text-emerald-600" />
                إضافة سابقة عمل أو حالة تم إنجازها
              </Label>
              <Input 
                value={newCaseTitle}
                onChange={(e) => setNewCaseTitle(e.target.value)}
                placeholder="عنوان الحالة (مثال: تركيب طرف صناعي سفلي لمريض)"
                className="text-xs rounded-xl bg-white"
              />
              <Textarea 
                value={newCaseDesc}
                onChange={(e) => setNewCaseDesc(e.target.value)}
                placeholder="تفاصيل الحالة وتطور الحركة..."
                rows={2}
                className="text-xs rounded-xl bg-white"
              />
              <Button type="button" onClick={handleAddCaseToSpec} className="w-full bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold py-2">
                إضافة الحالة للبروفايل
              </Button>

              {currentSpec.casesWorkedOn && currentSpec.casesWorkedOn.length > 0 && (
                <div className="space-y-1.5 pt-2">
                  <p className="text-[11px] font-bold text-gray-700">الحالات المضافة بالملف ({currentSpec.casesWorkedOn.length}):</p>
                  {currentSpec.casesWorkedOn.map((cs, idx) => (
                    <div key={idx} className="bg-white p-2 rounded-lg border text-xs flex justify-between items-center">
                      <span className="font-semibold text-gray-800 line-clamp-1">{cs.title}</span>
                      <span className="text-[10px] text-emerald-600 font-bold">مكتملة</span>
                    </div>
                  ))}
                </div>
              )}
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
