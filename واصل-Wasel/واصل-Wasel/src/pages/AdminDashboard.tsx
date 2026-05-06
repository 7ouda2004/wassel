import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'framer-motion';
import { useAdminStore, SpecialistAccount, CenterAccount } from '@/stores/admin-store';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogDescription } from "@/components/ui/dialog";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { toast } from 'sonner';
import { Textarea } from '@/components/ui/textarea';
import { Building2, Stethoscope, Users, CheckCircle, XCircle, Edit, Trash2, UserPlus, Save, PlusCircle, X, CheckCircle2, Database, Loader2, ArrowUp, ArrowDown } from 'lucide-react';
import { compressProfilePhoto, compressProductImage } from '@/lib/image-utils';

const AdminDashboard = () => {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const isAr = i18n.language === 'ar';

  const {
    specialists,
    centers,
    approvalRequests,
    isLoading,
    fetchAll,
    updateSpecialist,
    updateCenter,
    approveRequest,
    rejectRequest,
    removeSpecialist,
    removeCenter,
    addSpecialist,
    addCenter,
    reorderCenters
  } = useAdminStore();

  const [editUser, setEditUser] = useState<any>(null);
  const [editType, setEditType] = useState<'specialist' | 'center' | null>(null);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [approvalSuccess, setApprovalSuccess] = useState<string | null>(null);
  
  const [isAddingSpecialist, setIsAddingSpecialist] = useState(false);
  const [newSpecialist, setNewSpecialist] = useState({
    fullName: '', phone: '', username: '', password: '', specialization: '', centerId: '', experience: 0, image: ''
  });

  const [isAddingCenter, setIsAddingCenter] = useState(false);
  const [newCenter, setNewCenter] = useState({
    name: '', governorate: '', address: '', phone: '', username: '', password: '', image: ''
  });

  const moveCenter = (index: number, direction: 'up' | 'down') => {
    if ((direction === 'up' && index === 0) || (direction === 'down' && index === centers.length - 1)) return;

    const newCenters = [...centers];
    const newIndex = direction === 'up' ? index - 1 : index + 1;
    
    // Swap items
    const temp = newCenters[index];
    newCenters[index] = newCenters[newIndex];
    newCenters[newIndex] = temp;

    // Call store to persist
    reorderCenters(newCenters);
  };

  const handleImageUpload = async (
    e: React.ChangeEvent<HTMLInputElement>, 
    callback: (base64: string) => void,
    type: 'profile' | 'product' = 'profile'
  ) => {
    const file = e.target.files?.[0];
    if (file) {
      try {
        const compressed = type === 'product' 
          ? await compressProductImage(file) 
          : await compressProfilePhoto(file);
        callback(compressed);
      } catch (err) {
        console.error('Failed to compress image:', err);
      }
    }
  };

  useEffect(() => {
    const role = sessionStorage.getItem('mockRole');
    if (role !== 'admin') {
      navigate('/login');
    } else {
      // Fetch all data from backend
      fetchAll();
    }
  }, [navigate, fetchAll]);

  const handleSaveEdit = async () => {
    if (!editUser) return;
    setIsSaving(true);
    
    try {
      if (editType === 'specialist') {
        await updateSpecialist(editUser.id, {
          username: editUser.username,
          password: editUser.password,
          fullName: editUser.fullName,
          image: editUser.image,
          specialization: editUser.specialization,
          experience: editUser.experience,
          centerId: editUser.centerId,
          centerName: centers.find(c => c.id === editUser.centerId)?.name
        });
      } else if (editType === 'center') {
        await updateCenter(editUser.id, {
          username: editUser.username,
          password: editUser.password,
          name: editUser.name,
          address: editUser.address,
          governorate_ar: editUser.governorate_ar,
          image: editUser.image,
          services_ar: editUser.services_ar,
          products: editUser.products
        });
      }
      
      setIsSaving(false);
      setSaveSuccess(true);
      
      toast.success(
        isAr 
          ? `✅ تم حفظ البيانات في قاعدة البيانات بنجاح!` 
          : `✅ Data saved to database successfully!`,
        {
          description: isAr 
            ? `تم تحديث بيانات ${editType === 'center' ? 'المركز' : 'الأخصائي'} وحفظها تلقائياً`
            : `${editType === 'center' ? 'Center' : 'Specialist'} data has been updated and auto-saved`,
          duration: 4000,
        }
      );
      
      // Show success animation for 1.5 seconds then close
      setTimeout(() => {
        setSaveSuccess(false);
        setEditUser(null);
        setEditType(null);
      }, 1500);
    } catch (error) {
      setIsSaving(false);
      toast.error(isAr ? '❌ فشل في حفظ البيانات' : '❌ Failed to save data');
    }
  };

  const handleApproveRequest = async (id: string) => {
    const request = approvalRequests.find(r => r.id === id);
    if (!request) return;
    
    try {
      await approveRequest(id);
      setApprovalSuccess(request.fullName);
      
      toast.success(
        isAr 
          ? `🎉 تم قبول طلب "${request.fullName}" وحفظه في قاعدة البيانات!`
          : `🎉 "${request.fullName}" approved and saved to database!`,
        {
          description: isAr
            ? `تم إنشاء حساب ${request.type === 'specialist' ? 'أخصائي' : 'مركز'} جديد تلقائياً وحفظه في النظام`
            : `A new ${request.type} account has been automatically created and saved`,
          duration: 5000,
        }
      );
      
      setTimeout(() => setApprovalSuccess(null), 3000);
    } catch (error) {
      toast.error(isAr ? '❌ فشل في قبول الطلب' : '❌ Failed to approve request');
    }
  };

  const handleAddSpecialist = async () => {
    if (!newSpecialist.fullName || !newSpecialist.username || !newSpecialist.password) {
      toast.error(isAr ? 'يرجى ملء الحقول الأساسية' : 'Please fill required fields');
      return;
    }
    
    try {
      await addSpecialist({
        ...newSpecialist,
        type: 'specialist',
        centerName: centers.find(c => c.id === newSpecialist.centerId)?.name,
        image: newSpecialist.image || 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?q=80&w=2070&auto=format&fit=crop'
      });
      
      toast.success(isAr ? 'تمت إضافة الأخصائي بنجاح' : 'Specialist added successfully');
      setIsAddingSpecialist(false);
      setNewSpecialist({ fullName: '', phone: '', username: '', password: '', specialization: '', centerId: '', experience: 0, image: '' });
    } catch (error) {
      toast.error(isAr ? '❌ فشل في إضافة الأخصائي' : '❌ Failed to add specialist');
    }
  };

  const handleAddCenter = async () => {
    if (!newCenter.name || !newCenter.username || !newCenter.password) {
      toast.error(isAr ? 'يرجى ملء الحقول الأساسية' : 'Please fill required fields');
      return;
    }
    
    try {
      await addCenter({
        name: newCenter.name,
        username: newCenter.username,
        password: newCenter.password,
        phone: newCenter.phone,
        address: newCenter.address,
        governorate_ar: newCenter.governorate,
        image: newCenter.image || 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?q=80&w=2053&auto=format&fit=crop',
        specializations: [],
        rating: 5,
        insurance_supported: true,
        products: [],
        services_ar: []
      });
      
      toast.success(isAr ? 'تمت إضافة المركز بنجاح' : 'Center added successfully');
      setIsAddingCenter(false);
      setNewCenter({ name: '', governorate: '', address: '', phone: '', username: '', password: '', image: '' });
    } catch (error) {
      toast.error(isAr ? '❌ فشل في إضافة المركز' : '❌ Failed to add center');
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />
      
      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">{isAr ? 'لوحة تحكم الإدارة' : 'Admin Dashboard'}</h1>
          <p className="text-gray-600">{isAr ? 'إدارة الأخصائيين، المراكز، وطلبات الانضمام' : 'Manage specialists, centers, and join requests'}</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 flex items-center">
            <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center mr-4 ml-4">
              <Stethoscope className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <p className="text-sm text-gray-500 font-medium">{isAr ? 'إجمالي الأخصائيين' : 'Total Specialists'}</p>
              <h3 className="text-2xl font-bold text-gray-900">{specialists.length}</h3>
            </div>
          </div>
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 flex items-center">
            <div className="w-12 h-12 rounded-full bg-teal-100 flex items-center justify-center mr-4 ml-4">
              <Building2 className="w-6 h-6 text-teal-600" />
            </div>
            <div>
              <p className="text-sm text-gray-500 font-medium">{isAr ? 'المراكز المتعاقدة' : 'Contracted Centers'}</p>
              <h3 className="text-2xl font-bold text-gray-900">{centers.length}</h3>
            </div>
          </div>
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 flex items-center">
            <div className="w-12 h-12 rounded-full bg-orange-100 flex items-center justify-center mr-4 ml-4">
              <Users className="w-6 h-6 text-orange-600" />
            </div>
            <div>
              <p className="text-sm text-gray-500 font-medium">{isAr ? 'طلبات قيد المراجعة' : 'Pending Requests'}</p>
              <h3 className="text-2xl font-bold text-gray-900">{approvalRequests.filter(r => r.status === 'pending').length}</h3>
            </div>
          </div>
        </div>

        <Tabs defaultValue="specialists" className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <TabsList className="mb-6">
            <TabsTrigger value="specialists">{isAr ? 'الأخصائيين' : 'Specialists'}</TabsTrigger>
            <TabsTrigger value="centers">{isAr ? 'المراكز' : 'Centers'}</TabsTrigger>
            <TabsTrigger value="requests">
              {isAr ? 'طلبات الانضمام' : 'Join Requests'}
              {approvalRequests.filter(r => r.status === 'pending').length > 0 && (
                <span className="ml-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {approvalRequests.filter(r => r.status === 'pending').length}
                </span>
              )}
            </TabsTrigger>
          </TabsList>

          {/* Specialists Tab */}
          <TabsContent value="specialists">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">{isAr ? 'إدارة الأخصائيين' : 'Manage Specialists'}</h2>
              <Button onClick={() => setIsAddingSpecialist(true)} className="bg-teal-600 hover:bg-teal-700">
                <UserPlus className="w-4 h-4 mr-2" />
                {isAr ? 'أضف أخصائي جديد' : 'Add New Specialist'}
              </Button>
            </div>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>{isAr ? 'الاسم' : 'Name'}</TableHead>
                    <TableHead>{isAr ? 'المركز التابع له' : 'Center'}</TableHead>
                    <TableHead>{isAr ? 'اسم المستخدم' : 'Username'}</TableHead>
                    <TableHead>{isAr ? 'كلمة المرور' : 'Password'}</TableHead>
                    <TableHead>{isAr ? 'إجراءات' : 'Actions'}</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {specialists.map(spec => (
                    <TableRow key={spec.id}>
                      <TableCell className="font-medium">{spec.fullName}</TableCell>
                      <TableCell>{spec.centerName || (isAr ? 'مستقل' : 'Independent')}</TableCell>
                      <TableCell>{spec.username}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <span className="font-mono bg-gray-100 px-2 py-1 rounded text-sm">{spec.password}</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex gap-2">
                          <Button variant="outline" size="sm" onClick={() => { setEditUser({ ...spec }); setEditType('specialist'); }}>
                            <Edit className="w-4 h-4" />
                          </Button>
                          <Button variant="destructive" size="sm" onClick={() => removeSpecialist(spec.id)}>
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </TabsContent>

          {/* Centers Tab */}
          <TabsContent value="centers">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">{isAr ? 'إدارة المراكز' : 'Manage Centers'}</h2>
              <Button onClick={() => setIsAddingCenter(true)} className="bg-teal-600 hover:bg-teal-700">
                <Building2 className="w-4 h-4 mr-2" />
                {isAr ? 'أضف مركز جديد' : 'Add New Center'}
              </Button>
            </div>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>{isAr ? 'الترتيب' : 'Order'}</TableHead>
                    <TableHead>{isAr ? 'اسم المركز' : 'Center Name'}</TableHead>
                    <TableHead>{isAr ? 'عدد الأخصائيين' : 'Specialists Count'}</TableHead>
                    <TableHead>{isAr ? 'اسم المستخدم' : 'Username'}</TableHead>
                    <TableHead>{isAr ? 'كلمة المرور' : 'Password'}</TableHead>
                    <TableHead>{isAr ? 'إجراءات' : 'Actions'}</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {centers.map((center, index) => (
                    <TableRow key={center.id}>
                      <TableCell>
                        <div className="flex flex-col gap-1">
                          <Button 
                            variant="ghost" 
                            size="sm" 
                            className="h-6 w-6 p-0" 
                            onClick={() => moveCenter(index, 'up')}
                            disabled={index === 0}
                          >
                            <ArrowUp className="w-4 h-4 text-gray-500" />
                          </Button>
                          <Button 
                            variant="ghost" 
                            size="sm" 
                            className="h-6 w-6 p-0" 
                            onClick={() => moveCenter(index, 'down')}
                            disabled={index === centers.length - 1}
                          >
                            <ArrowDown className="w-4 h-4 text-gray-500" />
                          </Button>
                        </div>
                      </TableCell>
                      <TableCell className="font-medium">{center.name}</TableCell>
                      <TableCell>{center.specialistIds?.length || 0}</TableCell>
                      <TableCell>{center.username}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <span className="font-mono bg-gray-100 px-2 py-1 rounded text-sm">{center.password}</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex gap-2">
                          <Button variant="outline" size="sm" onClick={() => { setEditUser({ ...center }); setEditType('center'); }}>
                            <Edit className="w-4 h-4" />
                          </Button>
                          <Button variant="destructive" size="sm" onClick={() => removeCenter(center.id)}>
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </TabsContent>

          {/* Requests Tab */}
          <TabsContent value="requests">
            <h2 className="text-xl font-semibold mb-4">{isAr ? 'طلبات الانضمام' : 'Join Requests'}</h2>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>{isAr ? 'الاسم/المركز' : 'Name/Center'}</TableHead>
                    <TableHead>{isAr ? 'النوع' : 'Type'}</TableHead>
                    <TableHead>{isAr ? 'الهاتف' : 'Phone'}</TableHead>
                    <TableHead>{isAr ? 'تاريخ الطلب' : 'Date'}</TableHead>
                    <TableHead>{isAr ? 'الحالة' : 'Status'}</TableHead>
                    <TableHead>{isAr ? 'إجراءات' : 'Actions'}</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {approvalRequests.map(req => (
                    <TableRow key={req.id}>
                      <TableCell className="font-medium">{req.type === 'center' ? req.centerName : req.fullName}</TableCell>
                      <TableCell>
                        <span className={`px-2 py-1 rounded-full text-xs font-semibold ${req.type === 'specialist' ? 'bg-blue-100 text-blue-700' : 'bg-teal-100 text-teal-700'}`}>
                          {req.type === 'specialist' ? (isAr ? 'أخصائي' : 'Specialist') : (isAr ? 'مركز' : 'Center')}
                        </span>
                      </TableCell>
                      <TableCell>{req.phone}</TableCell>
                      <TableCell>{new Date(req.submittedAt).toLocaleDateString()}</TableCell>
                      <TableCell>
                        <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                          req.status === 'pending' ? 'bg-orange-100 text-orange-700' : 
                          req.status === 'approved' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                        }`}>
                          {req.status === 'pending' ? (isAr ? 'قيد المراجعة' : 'Pending') :
                           req.status === 'approved' ? (isAr ? 'مقبول' : 'Approved') : (isAr ? 'مرفوض' : 'Rejected')}
                        </span>
                      </TableCell>
                      <TableCell>
                        {req.status === 'pending' && (
                          <div className="flex gap-2">
                            <Button size="sm" className="bg-green-600 hover:bg-green-700" onClick={() => handleApproveRequest(req.id)}>
                              <CheckCircle className="w-4 h-4 mr-1" /> {isAr ? 'قبول وحفظ' : 'Approve & Save'}
                            </Button>
                            <Button size="sm" variant="destructive" onClick={() => rejectRequest(req.id)}>
                              <XCircle className="w-4 h-4 mr-1" /> {isAr ? 'رفض' : 'Reject'}
                            </Button>
                          </div>
                        )}
                        {req.status === 'approved' && (
                          <div className="flex items-center gap-1 text-green-600 text-sm font-medium">
                            <Database className="w-4 h-4" />
                            {isAr ? 'محفوظ في قاعدة البيانات' : 'Saved to DB'}
                          </div>
                        )}
                      </TableCell>
                    </TableRow>
                  ))}
                  {approvalRequests.length === 0 && (
                    <TableRow>
                      <TableCell colSpan={6} className="text-center py-8 text-gray-500">
                        {isAr ? 'لا توجد طلبات حالياً' : 'No requests at the moment'}
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </div>
          </TabsContent>
        </Tabs>
      </main>

      <Footer />

      {/* Edit Dialog */}
      <Dialog open={!!editUser} onOpenChange={(open) => !open && setEditUser(null)}>
        <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>
              {isAr ? `تعديل بيانات ${editType === 'center' ? 'المركز' : 'الأخصائي'}` : `Edit ${editType === 'center' ? 'Center' : 'Specialist'}`}
            </DialogTitle>
          </DialogHeader>
          {/* Save Success Overlay */}
          <AnimatePresence>
            {saveSuccess && (
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                className="absolute inset-0 z-50 flex items-center justify-center bg-white/90 backdrop-blur-sm rounded-xl"
              >
                <div className="text-center">
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: 'spring', stiffness: 200, damping: 15 }}
                    className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4"
                  >
                    <CheckCircle2 className="w-10 h-10 text-green-600" />
                  </motion.div>
                  <motion.p
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="text-lg font-bold text-green-700"
                  >
                    {isAr ? 'تم الحفظ بنجاح!' : 'Saved Successfully!'}
                  </motion.p>
                  <motion.p
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                    className="text-sm text-gray-500 mt-1 flex items-center justify-center gap-1"
                  >
                    <Database className="w-4 h-4" />
                    {isAr ? 'تم حفظ البيانات في قاعدة البيانات تلقائياً' : 'Data auto-saved to database'}
                  </motion.p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {editUser && (
            <div className="space-y-4 py-4">
              <div>
                <Label>{isAr ? 'الاسم' : 'Name'}</Label>
                <Input 
                  value={editType === 'center' ? editUser.name : editUser.fullName} 
                  disabled 
                  className="bg-gray-50"
                />
              </div>
              
              {editType === 'specialist' && (
                <div>
                  <Label>{isAr ? 'المركز التابع له' : 'Assigned Center'}</Label>
                  <select 
                    className="w-full border rounded-md h-10 px-3 mt-1"
                    value={editUser.centerId || ''}
                    onChange={(e) => setEditUser({...editUser, centerId: e.target.value})}
                  >
                    <option value="">{isAr ? 'بدون مركز (مستقل)' : 'No Center (Independent)'}</option>
                    {centers.map(c => (
                      <option key={c.id} value={c.id}>{c.name}</option>
                    ))}
                  </select>
                </div>
              )}

              {/* Extended fields for Center */}
              {editType === 'center' && (
                <>
                  <div>
                    <Label>{isAr ? 'الاسم' : 'Name'}</Label>
                    <Input value={editUser.name} onChange={(e) => setEditUser({...editUser, name: e.target.value})} />
                  </div>
                  <div>
                    <Label>{isAr ? 'العنوان' : 'Address'}</Label>
                    <Input value={editUser.address || ''} onChange={(e) => setEditUser({...editUser, address: e.target.value})} />
                  </div>
                  <div>
                    <Label>{isAr ? 'المحافظة' : 'Governorate'}</Label>
                    <Input value={editUser.governorate_ar || ''} onChange={(e) => setEditUser({...editUser, governorate_ar: e.target.value})} />
                  </div>
                  <div>
                    <Label>{isAr ? 'الخدمات (مفصولة بفاصلة)' : 'Services (Comma separated)'}</Label>
                    <Textarea 
                      value={editUser.services_ar?.join(', ') || ''} 
                      onChange={(e) => setEditUser({...editUser, services_ar: e.target.value.split(',').map(s => s.trim())})} 
                      placeholder={isAr ? 'مثال: أطراف صناعية, جبائر طبية' : 'Example: Prosthetics, Orthotics'}
                    />
                  </div>
                  <div className="pt-4 border-t mt-6">
                    <div className="flex justify-between items-center mb-4">
                      <Label className="text-lg font-bold text-teal-700">{isAr ? 'المنتجات والأسعار' : 'Products & Prices'}</Label>
                      <Button variant="outline" size="sm" onClick={() => setEditUser({...editUser, products: [...(editUser.products || []), {id: Math.random().toString(), name_ar: '', name_en: '', description_ar: '', description_en: '', image: '', price: 0}]})}>
                        <PlusCircle className="w-4 h-4 me-1" /> {isAr ? 'إضافة منتج' : 'Add Product'}
                      </Button>
                    </div>
                    <div className="space-y-4">
                      {(editUser.products || []).map((prod: any, i: number) => (
                        <div key={i} className="p-4 border border-gray-200 rounded-xl bg-white shadow-sm flex flex-col gap-3 relative transition-all hover:border-teal-300">
                          <Button variant="ghost" size="sm" className="absolute top-2 left-2 text-red-500 hover:bg-red-50 h-8 w-8 p-0 rounded-full" onClick={() => setEditUser({...editUser, products: editUser.products.filter((_: any, idx: number) => idx !== i)})}>
                            <X className="w-4 h-4" />
                          </Button>
                          
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pr-8">
                            <div>
                              <Label className="text-xs text-gray-500">{isAr ? 'اسم المنتج' : 'Product Name'}</Label>
                              <Input placeholder={isAr ? 'اسم المنتج' : 'Product Name'} value={prod.name_ar} onChange={(e) => {
                                const newProds = [...editUser.products];
                                newProds[i].name_ar = e.target.value;
                                setEditUser({...editUser, products: newProds});
                              }} />
                            </div>
                            <div>
                              <Label className="text-xs text-gray-500">{isAr ? 'السعر' : 'Price'}</Label>
                              <Input placeholder={isAr ? 'السعر' : 'Price'} type="number" value={prod.price || ''} onChange={(e) => {
                                const newProds = [...editUser.products];
                                newProds[i].price = parseInt(e.target.value) || 0;
                                setEditUser({...editUser, products: newProds});
                              }} />
                            </div>
                          </div>
                          
                          <div>
                            <Label className="text-xs text-gray-500">{isAr ? 'الوصف' : 'Description'}</Label>
                            <Input placeholder={isAr ? 'الوصف' : 'Description'} value={prod.description_ar || ''} onChange={(e) => {
                              const newProds = [...editUser.products];
                              newProds[i].description_ar = e.target.value;
                              setEditUser({...editUser, products: newProds});
                            }} />
                          </div>

                          <div>
                            <Label className="text-xs text-gray-500">{isAr ? 'صورة المنتج' : 'Product Image'}</Label>
                            <div className="mt-1 flex items-center gap-3">
                              {prod.image && (
                                <img src={prod.image} alt="Preview" className="w-12 h-12 rounded object-cover border" />
                              )}
                              <Input 
                                type="file" 
                                accept="image/*"
                                className="text-sm cursor-pointer"
                                onChange={(e) => handleImageUpload(e, (base64) => {
                                  const newProds = [...editUser.products];
                                  newProds[i].image = base64;
                                  setEditUser({...editUser, products: newProds});
                                }, 'product')} 
                              />
                            </div>
                          </div>
                        </div>
                      ))}
                      {(!editUser.products || editUser.products.length === 0) && (
                        <div className="text-center py-6 text-gray-400 bg-gray-50 rounded-xl border border-dashed">
                          {isAr ? 'لا يوجد منتجات، اضغط على إضافة لإنشاء منتج جديد' : 'No products. Click Add to create one.'}
                        </div>
                      )}
                    </div>
                  </div>
                </>
              )}

              {/* Extended fields for Specialist */}
              {editType === 'specialist' && (
                <>
                  <div>
                    <Label>{isAr ? 'الاسم بالكامل' : 'Full Name'}</Label>
                    <Input value={editUser.fullName} onChange={(e) => setEditUser({...editUser, fullName: e.target.value})} />
                  </div>
                  <div>
                    <Label>{isAr ? 'التخصص' : 'Specialization'}</Label>
                    <Input value={editUser.specialization || ''} onChange={(e) => setEditUser({...editUser, specialization: e.target.value})} />
                  </div>
                  <div>
                    <Label>{isAr ? 'سنوات الخبرة' : 'Years of Experience'}</Label>
                    <Input type="number" min="0" value={editUser.experience || 0} onChange={(e) => setEditUser({...editUser, experience: parseInt(e.target.value) || 0})} />
                  </div>
                </>
              )}

              <div>
                <Label>{isAr ? 'الصورة' : 'Image'}</Label>
                <div className="mt-1 flex items-center gap-4">
                  {editUser.image && (
                    <img src={editUser.image} alt="Preview" className="w-12 h-12 rounded-full object-cover border" />
                  )}
                  <Input 
                    type="file" 
                    accept="image/*"
                    onChange={(e) => handleImageUpload(e, (base64) => setEditUser({...editUser, image: base64}))} 
                  />
                </div>
              </div>

              <div>
                <Label>{isAr ? 'اسم المستخدم' : 'Username'}</Label>
                <Input 
                  value={editUser.username} 
                  onChange={(e) => setEditUser({...editUser, username: e.target.value})}
                />
              </div>
              <div>
                <Label>{isAr ? 'كلمة المرور' : 'Password'}</Label>
                <Input 
                  value={editUser.password} 
                  onChange={(e) => setEditUser({...editUser, password: e.target.value})}
                />
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setEditUser(null)} disabled={isSaving}>{isAr ? 'إلغاء' : 'Cancel'}</Button>
            <Button onClick={handleSaveEdit} className="bg-teal-600 hover:bg-teal-700" disabled={isSaving}>
              {isSaving ? (
                <><Loader2 className="w-4 h-4 mr-2 animate-spin" /> {isAr ? 'جاري الحفظ...' : 'Saving...'}</>
              ) : (
                <><Save className="w-4 h-4 mr-2" /> {isAr ? 'حفظ في قاعدة البيانات' : 'Save to Database'}</>
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Add Specialist Dialog */}
      <Dialog open={isAddingSpecialist} onOpenChange={setIsAddingSpecialist}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{isAr ? 'إضافة أخصائي جديد' : 'Add New Specialist'}</DialogTitle>
            <DialogDescription>
              {isAr ? 'يمكنك إضافة الأخصائي وتعيينه لمركز معين' : 'You can add a specialist and assign them to a specific center'}
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div>
              <Label>{isAr ? 'الاسم بالكامل' : 'Full Name'}</Label>
              <Input value={newSpecialist.fullName} onChange={e => setNewSpecialist({...newSpecialist, fullName: e.target.value})} />
            </div>
            <div>
              <Label>{isAr ? 'التخصص' : 'Specialization'}</Label>
              <Input value={newSpecialist.specialization} onChange={e => setNewSpecialist({...newSpecialist, specialization: e.target.value})} />
            </div>
            <div>
              <Label>{isAr ? 'سنوات الخبرة' : 'Years of Experience'}</Label>
              <Input type="number" min="0" value={newSpecialist.experience} onChange={e => setNewSpecialist({...newSpecialist, experience: parseInt(e.target.value) || 0})} />
            </div>
            <div>
              <Label>{isAr ? 'الصورة الشخصية' : 'Profile Image'}</Label>
              <div className="mt-1 flex items-center gap-4">
                {newSpecialist.image && (
                  <img src={newSpecialist.image} alt="Preview" className="w-12 h-12 rounded-full object-cover border" />
                )}
                <Input 
                  type="file" 
                  accept="image/*"
                  onChange={(e) => handleImageUpload(e, (base64) => setNewSpecialist({...newSpecialist, image: base64}))} 
                />
              </div>
            </div>
            <div>
              <Label>{isAr ? 'رقم الهاتف' : 'Phone'}</Label>
              <Input value={newSpecialist.phone} onChange={e => setNewSpecialist({...newSpecialist, phone: e.target.value})} />
            </div>
            <div>
              <Label>{isAr ? 'اسم المستخدم' : 'Username'}</Label>
              <Input value={newSpecialist.username} onChange={e => setNewSpecialist({...newSpecialist, username: e.target.value})} />
            </div>
            <div>
              <Label>{isAr ? 'كلمة المرور' : 'Password'}</Label>
              <Input value={newSpecialist.password} onChange={e => setNewSpecialist({...newSpecialist, password: e.target.value})} />
            </div>
            <div>
              <Label>{isAr ? 'المركز (اختياري)' : 'Center (Optional)'}</Label>
              <select 
                className="w-full border rounded-md h-10 px-3 mt-1"
                value={newSpecialist.centerId}
                onChange={e => setNewSpecialist({...newSpecialist, centerId: e.target.value})}
              >
                <option value="">{isAr ? 'اختر المركز' : 'Select Center'}</option>
                {centers.map(c => (
                  <option key={c.id} value={c.id}>{c.name}</option>
                ))}
              </select>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsAddingSpecialist(false)}>{isAr ? 'إلغاء' : 'Cancel'}</Button>
            <Button onClick={handleAddSpecialist} className="bg-teal-600 hover:bg-teal-700">
              <UserPlus className="w-4 h-4 mr-2" /> {isAr ? 'إضافة' : 'Add'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Add Center Dialog */}
      <Dialog open={isAddingCenter} onOpenChange={setIsAddingCenter}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{isAr ? 'إضافة مركز جديد' : 'Add New Center'}</DialogTitle>
            <DialogDescription>
              {isAr ? 'إضافة مركز متكامل جديد للمنصة' : 'Add a new integrated center to the platform'}
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4 max-h-[60vh] overflow-y-auto">
            <div>
              <Label>{isAr ? 'اسم المركز' : 'Center Name'}</Label>
              <Input value={newCenter.name} onChange={e => setNewCenter({...newCenter, name: e.target.value})} />
            </div>
            <div>
              <Label>{isAr ? 'المحافظة' : 'Governorate'}</Label>
              <Input value={newCenter.governorate} onChange={e => setNewCenter({...newCenter, governorate: e.target.value})} />
            </div>
            <div>
              <Label>{isAr ? 'العنوان بالتفصيل' : 'Detailed Address'}</Label>
              <Input value={newCenter.address} onChange={e => setNewCenter({...newCenter, address: e.target.value})} />
            </div>
            <div>
              <Label>{isAr ? 'صورة المركز' : 'Center Image'}</Label>
              <div className="mt-1 flex items-center gap-4">
                {newCenter.image && (
                  <img src={newCenter.image} alt="Preview" className="w-16 h-16 rounded object-cover border" />
                )}
                <Input 
                  type="file" 
                  accept="image/*"
                  onChange={(e) => handleImageUpload(e, (base64) => setNewCenter({...newCenter, image: base64}))} 
                />
              </div>
            </div>
            <div>
              <Label>{isAr ? 'رقم الهاتف' : 'Phone'}</Label>
              <Input value={newCenter.phone} onChange={e => setNewCenter({...newCenter, phone: e.target.value})} />
            </div>
            <hr className="my-4" />
            <div>
              <Label>{isAr ? 'اسم المستخدم' : 'Username'}</Label>
              <Input value={newCenter.username} onChange={e => setNewCenter({...newCenter, username: e.target.value})} />
            </div>
            <div>
              <Label>{isAr ? 'كلمة المرور' : 'Password'}</Label>
              <Input value={newCenter.password} onChange={e => setNewCenter({...newCenter, password: e.target.value})} />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsAddingCenter(false)}>{isAr ? 'إلغاء' : 'Cancel'}</Button>
            <Button onClick={handleAddCenter} className="bg-teal-600 hover:bg-teal-700">
              <Building2 className="w-4 h-4 mr-2" /> {isAr ? 'إضافة' : 'Add'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AdminDashboard;
