import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Users, MapPin, PlusCircle, Edit, Trash, Save, Search, 
  UserCheck, ShieldAlert, Clock, Phone, Building, Check, X
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
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { toast } from "sonner";
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { 
  getLocalCenters, saveLocalCenters, type Center,
  getLocalSpecialists, saveLocalSpecialists, type Specialist 
} from '@/lib/db';

const AdminDashboard = () => {
  // Centers state
  const [centers, setCenters] = useState<Center[]>([]);
  const [isAddingCenter, setIsAddingCenter] = useState(false);
  const [isEditingCenter, setIsEditingCenter] = useState(false);
  const [currentCenter, setCurrentCenter] = useState<Center>({
    id: '', name: '', location: '', address: '', phone: '',
    workingHours: 'السبت - الخميس: 9 صباحاً - 9 مساءً',
    image: '/images/ortho.png', region: 'القاهرة الكبرى'
  });
  const [centerSearchTerm, setCenterSearchTerm] = useState('');
  const [confirmDeleteCenter, setConfirmDeleteCenter] = useState<string | null>(null);

  // Specialists state
  const [specialists, setSpecialists] = useState<Specialist[]>([]);
  const [isAddingSpec, setIsAddingSpec] = useState(false);
  const [isEditingSpec, setIsEditingSpec] = useState(false);
  const [currentSpec, setCurrentSpec] = useState<Specialist>({
    id: '', name: '', username: '', password: '', role: '', bio: '',
    image: '/images/new.jpg', expertise: [], status: 'active', phone: ''
  });
  const [specSearchTerm, setSpecSearchTerm] = useState('');
  const [confirmDeleteSpec, setConfirmDeleteSpec] = useState<string | null>(null);
  const [specExpertiseInput, setSpecExpertiseInput] = useState('');

  useEffect(() => {
    document.documentElement.dir = 'rtl';
    document.body.classList.add('font-cairo');
    
    // Auth Check
    const isAdmin = sessionStorage.getItem('isAdmin');
    if (isAdmin !== 'true') {
      toast.error('غير مصرح لك بدخول هذه الصفحة');
      window.location.href = '/';
      return;
    }

    setCenters(getLocalCenters());
    setSpecialists(getLocalSpecialists());
  }, []);

  // --- Center Handlers ---
  const handleAddCenter = () => {
    setCurrentCenter({
      id: Date.now().toString(),
      name: '',
      location: '',
      address: '',
      phone: '',
      workingHours: 'السبت - الخميس: 9 صباحاً - 9 مساءً',
      image: '/images/ortho.png',
      region: 'القاهرة الكبرى'
    });
    setIsAddingCenter(true);
  };

  const handleEditCenter = (center: Center) => {
    setCurrentCenter({ ...center });
    setIsEditingCenter(true);
  };

  const handleDeleteCenter = (id: string) => {
    setConfirmDeleteCenter(id);
  };

  const confirmDeleteCenterFn = () => {
    if (confirmDeleteCenter) {
      const updated = centers.filter(c => c.id !== confirmDeleteCenter);
      setCenters(updated);
      saveLocalCenters(updated);
      setConfirmDeleteCenter(null);
      toast.success('تم حذف المركز بنجاح');
    }
  };

  const handleCenterInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setCurrentCenter(prev => ({ ...prev, [name]: value }));
  };

  const handleSaveCenter = () => {
    if (!currentCenter.name || !currentCenter.location || !currentCenter.address || !currentCenter.phone) {
      toast.error('يرجى ملء جميع الحقول المطلوبة (*)');
      return;
    }

    let updated: Center[];
    if (isAddingCenter) {
      updated = [...centers, currentCenter];
      toast.success('تم إضافة المركز بنجاح');
    } else {
      updated = centers.map(c => c.id === currentCenter.id ? currentCenter : c);
      toast.success('تم تعديل بيانات المركز بنجاح');
    }

    setCenters(updated);
    saveLocalCenters(updated);
    setIsAddingCenter(false);
    setIsEditingCenter(false);
  };

  // --- Specialist Handlers ---
  const handleAddSpec = () => {
    setCurrentSpec({
      id: Date.now().toString(),
      name: '',
      username: '',
      password: '',
      role: '',
      bio: '',
      image: '/images/new.jpg',
      expertise: [],
      status: 'active',
      phone: '',
      facebook: '',
      instagram: '',
      linkedin: ''
    });
    setSpecExpertiseInput('');
    setIsAddingSpec(true);
  };

  const handleEditSpec = (spec: Specialist) => {
    setCurrentSpec({ ...spec });
    setSpecExpertiseInput(spec.expertise ? spec.expertise.join('، ') : '');
    setIsEditingSpec(true);
  };

  const handleDeleteSpec = (id: string) => {
    setConfirmDeleteSpec(id);
  };

  const confirmDeleteSpecFn = () => {
    if (confirmDeleteSpec) {
      const updated = specialists.filter(s => s.id !== confirmDeleteSpec);
      setSpecialists(updated);
      saveLocalSpecialists(updated);
      setConfirmDeleteSpec(null);
      toast.success('تم حذف حساب الأخصائي بنجاح');
    }
  };

  const handleSpecInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setCurrentSpec(prev => ({ ...prev, [name]: value }));
  };

  const handleSaveSpec = () => {
    if (!currentSpec.name || !currentSpec.username || (isAddingSpec && !currentSpec.password)) {
      toast.error('يرجى كتابة الاسم واسم المستخدم وكلمة المرور');
      return;
    }

    // Convert comma-separated expertise to array
    const expArray = specExpertiseInput
      ? specExpertiseInput.split(/[،,]/).map(s => s.trim()).filter(Boolean)
      : [];

    const updatedSpec = {
      ...currentSpec,
      expertise: expArray
    };

    let updatedList: Specialist[];
    if (isAddingSpec) {
      // Check if username already exists
      if (specialists.some(s => s.username === currentSpec.username)) {
        toast.error('اسم المستخدم هذا مستخدم بالفعل');
        return;
      }
      updatedList = [...specialists, updatedSpec];
      toast.success('تم إضافة حساب الأخصائي بنجاح');
    } else {
      updatedList = specialists.map(s => s.id === currentSpec.id ? updatedSpec : s);
      toast.success('تم تعديل حساب الأخصائي بنجاح');
    }

    setSpecialists(updatedList);
    saveLocalSpecialists(updatedList);
    setIsAddingSpec(false);
    setIsEditingSpec(false);
  };

  const handleApproveSpec = (spec: Specialist) => {
    const updated = specialists.map(s => s.id === spec.id ? { ...s, status: 'active' as const } : s);
    setSpecialists(updated);
    saveLocalSpecialists(updated);
    toast.success(`تم قبول حساب الأخصائي: ${spec.name}`);
  };

  const handleRejectSpec = (spec: Specialist) => {
    const updated = specialists.filter(s => s.id !== spec.id);
    setSpecialists(updated);
    saveLocalSpecialists(updated);
    toast.error(`تم رفض وحذف حساب: ${spec.name}`);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="mb-8 flex justify-between items-center bg-red-50 border-r-4 border-red-500 p-4 rounded">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">لوحة تحكم المسؤول (الادمن)</h1>
            <p className="text-gray-600 mt-1">إدارة المراكز الطبية وحسابات الأخصائيين المعتمدين</p>
          </div>
          <Building className="h-10 w-10 text-red-500" />
        </div>

        <Tabs defaultValue="specs">
          <TabsList className="grid grid-cols-2 mb-6">
            <TabsTrigger value="specs">إدارة الأخصائيين</TabsTrigger>
            <TabsTrigger value="centers">إدارة المراكز</TabsTrigger>
          </TabsList>

          {/* --- Specialists Tab Content --- */}
          <TabsContent value="specs">
            <div className="mb-6 flex flex-col md:flex-row justify-between gap-4">
              <div className="flex-1 relative">
                <Search className="absolute right-3 top-2.5 h-5 w-5 text-gray-400" />
                <Input
                  placeholder="البحث عن أخصائي..."
                  value={specSearchTerm}
                  onChange={(e) => setSpecSearchTerm(e.target.value)}
                  className="pl-3 pr-10"
                />
              </div>
              <Button onClick={handleAddSpec} className="bg-red-600 hover:bg-red-700 text-white">
                <PlusCircle className="ml-2 h-5 w-5" />
                إضافة أخصائي جديد
              </Button>
            </div>

            {/* Pending Requests Section */}
            {specialists.some(s => s.status === 'pending') && (
              <div className="mb-8 bg-amber-50/50 p-6 rounded-xl border border-amber-200">
                <h2 className="text-lg font-bold text-amber-900 mb-4 flex items-center gap-2">
                  <ShieldAlert className="h-5 w-5 text-amber-600" />
                  حسابات جديدة قيد الانتظار لموافقتك ({specialists.filter(s => s.status === 'pending').length})
                </h2>
                
                <div className="overflow-x-auto bg-white rounded-lg border">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="text-right">الاسم</TableHead>
                        <TableHead className="text-right">اسم المستخدم</TableHead>
                        <TableHead className="text-right">الوظيفة</TableHead>
                        <TableHead className="text-right">الهاتف</TableHead>
                        <TableHead className="text-right">الإجراءات</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {specialists
                        .filter(s => s.status === 'pending')
                        .map(spec => (
                          <TableRow key={spec.id}>
                            <TableCell className="font-bold">{spec.name}</TableCell>
                            <TableCell className="text-gray-600">{spec.username}</TableCell>
                            <TableCell>{spec.role}</TableCell>
                            <TableCell>{spec.phone || '-'}</TableCell>
                            <TableCell>
                              <div className="flex gap-2">
                                <Button 
                                  size="sm" 
                                  onClick={() => handleApproveSpec(spec)}
                                  className="bg-green-600 hover:bg-green-700 text-white"
                                >
                                  <Check className="h-4 w-4 ml-1" /> قبول الحساب
                                </Button>
                                <Button 
                                  size="sm" 
                                  variant="destructive"
                                  onClick={() => handleRejectSpec(spec)}
                                >
                                  <X className="h-4 w-4 ml-1" /> رفض الحساب
                                </Button>
                              </div>
                            </TableCell>
                          </TableRow>
                        ))}
                    </TableBody>
                  </Table>
                </div>
              </div>
            )}

            {/* Active Specialists List */}
            <div className="bg-white rounded-xl border p-6">
              <h2 className="text-lg font-bold text-gray-900 mb-4">الأخصائيين المعتمدين</h2>
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="text-right">الصورة</TableHead>
                      <TableHead className="text-right">الاسم</TableHead>
                      <TableHead className="text-right">اسم المستخدم</TableHead>
                      <TableHead className="text-right">الدور / التخصص</TableHead>
                      <TableHead className="text-right">الهاتف</TableHead>
                      <TableHead className="text-right">الإجراءات</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {specialists
                      .filter(s => s.status === 'active' && s.name.toLowerCase().includes(specSearchTerm.toLowerCase()))
                      .map(spec => (
                        <TableRow key={spec.id}>
                          <TableCell>
                            <img 
                              src={spec.image || '/images/new.jpg'} 
                              alt={spec.name} 
                              className="h-10 w-10 rounded-full object-cover border"
                              onError={(e) => {
                                e.currentTarget.src = "https://images.unsplash.com/photo-1622253692010-333f2da6031d?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80";
                              }}
                            />
                          </TableCell>
                          <TableCell className="font-semibold">{spec.name}</TableCell>
                          <TableCell className="text-gray-500 font-mono">{spec.username}</TableCell>
                          <TableCell>{spec.role}</TableCell>
                          <TableCell>{spec.phone || '-'}</TableCell>
                          <TableCell>
                            <div className="flex gap-2">
                              <Button variant="ghost" size="sm" onClick={() => handleEditSpec(spec)}>
                                <Edit className="h-4 w-4 text-blue-600" />
                              </Button>
                              <Button variant="ghost" size="sm" onClick={() => handleDeleteSpec(spec.id)}>
                                <Trash className="h-4 w-4 text-red-600" />
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

          {/* --- Centers Tab Content --- */}
          <TabsContent value="centers">
            <div className="mb-6 flex flex-col md:flex-row justify-between gap-4">
              <div className="flex-1 relative">
                <Search className="absolute right-3 top-2.5 h-5 w-5 text-gray-400" />
                <Input
                  placeholder="البحث عن مركز..."
                  value={centerSearchTerm}
                  onChange={(e) => setCenterSearchTerm(e.target.value)}
                  className="pl-3 pr-10"
                />
              </div>
              <Button onClick={handleAddCenter} className="bg-red-600 hover:bg-red-700 text-white">
                <PlusCircle className="ml-2 h-5 w-5" />
                إضافة مركز جديد
              </Button>
            </div>

            <div className="bg-white rounded-xl border p-6">
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="text-right">اسم المركز</TableHead>
                      <TableHead className="text-right">المحافظة</TableHead>
                      <TableHead className="text-right">العنوان</TableHead>
                      <TableHead className="text-right">الهاتف</TableHead>
                      <TableHead className="text-right">ساعات العمل</TableHead>
                      <TableHead className="text-right">الإجراءات</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {centers
                      .filter(c => c.name.toLowerCase().includes(centerSearchTerm.toLowerCase()) || c.location.toLowerCase().includes(centerSearchTerm.toLowerCase()))
                      .map(center => (
                        <TableRow key={center.id}>
                          <TableCell className="font-semibold">{center.name}</TableCell>
                          <TableCell>{center.location}</TableCell>
                          <TableCell className="max-w-[200px] truncate">{center.address}</TableCell>
                          <TableCell>{center.phone}</TableCell>
                          <TableCell className="text-xs">{center.workingHours}</TableCell>
                          <TableCell>
                            <div className="flex gap-2">
                              <Button variant="ghost" size="sm" onClick={() => handleEditCenter(center)}>
                                <Edit className="h-4 w-4 text-blue-600" />
                              </Button>
                              <Button variant="ghost" size="sm" onClick={() => handleDeleteCenter(center.id)}>
                                <Trash className="h-4 w-4 text-red-600" />
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
        </Tabs>
      </main>

      {/* Add/Edit Specialist Dialog */}
      <Dialog open={isAddingSpec || isEditingSpec} onOpenChange={(o) => { if(!o) { setIsAddingSpec(false); setIsEditingSpec(false); } }}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>{isAddingSpec ? 'إضافة أخصائي جديد' : 'تعديل بيانات الأخصائي'}</DialogTitle>
          </DialogHeader>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 py-4">
            <div className="space-y-4">
              <div>
                <Label htmlFor="spec-name">الاسم بالكامل *</Label>
                <Input id="spec-name" name="name" value={currentSpec.name} onChange={handleSpecInputChange} required />
              </div>
              <div>
                <Label htmlFor="spec-username">اسم المستخدم *</Label>
                <Input id="spec-username" name="username" value={currentSpec.username} onChange={handleSpecInputChange} required />
              </div>
              <div>
                <Label htmlFor="spec-password">كلمة المرور {isEditingSpec && '(اتركه فارغاً لعدم التعديل)'}</Label>
                <Input id="spec-password" name="password" type="password" value={currentSpec.password || ''} onChange={handleSpecInputChange} />
              </div>
              <div>
                <Label htmlFor="spec-phone">رقم الهاتف</Label>
                <Input id="spec-phone" name="phone" value={currentSpec.phone || ''} onChange={handleSpecInputChange} />
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <Label htmlFor="spec-role">الوظيفة / التخصص العلمي *</Label>
                <Input id="spec-role" name="role" value={currentSpec.role} onChange={handleSpecInputChange} placeholder="أخصائي أطراف صناعية" required />
              </div>
              <div>
                <Label htmlFor="spec-image">رابط الصورة الشخصية</Label>
                <Input id="spec-image" name="image" value={currentSpec.image} onChange={handleSpecInputChange} />
              </div>
              <div>
                <Label htmlFor="spec-expertise">التخصصات الفرعية (مفصولة بفاصلة)</Label>
                <Input 
                  id="spec-expertise" 
                  value={specExpertiseInput} 
                  onChange={(e) => setSpecExpertiseInput(e.target.value)} 
                  placeholder="جبائر الركبة، أطراف علوية"
                />
              </div>
              <div>
                <Label htmlFor="spec-bio">نبذة تعريفية للموقع *</Label>
                <Textarea id="spec-bio" name="bio" value={currentSpec.bio} onChange={handleSpecInputChange} rows={2} required />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-2 border-t pt-4">
            <div>
              <Label htmlFor="spec-facebook">رابط فيسبوك</Label>
              <Input id="spec-facebook" name="facebook" value={currentSpec.facebook || ''} onChange={handleSpecInputChange} />
            </div>
            <div>
              <Label htmlFor="spec-instagram">رابط انستجرام</Label>
              <Input id="spec-instagram" name="instagram" value={currentSpec.instagram || ''} onChange={handleSpecInputChange} />
            </div>
            <div>
              <Label htmlFor="spec-linkedin">رابط لينكد إن</Label>
              <Input id="spec-linkedin" name="linkedin" value={currentSpec.linkedin || ''} onChange={handleSpecInputChange} />
            </div>
          </div>

          <DialogFooter className="mt-4">
            <Button variant="outline" onClick={() => { setIsAddingSpec(false); setIsEditingSpec(false); }}>إلغاء</Button>
            <Button onClick={handleSaveSpec} className="bg-red-600 hover:bg-red-700 text-white">
              <Save className="h-4 w-4 ml-2" /> حفظ البيانات
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Specialist Confirmation */}
      <Dialog open={confirmDeleteSpec !== null} onOpenChange={(o) => { if(!o) setConfirmDeleteSpec(null); }}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>تأكيد حذف الأخصائي</DialogTitle>
          </DialogHeader>
          <div className="py-4">
            <p>هل أنت متأكد من رغبتك في حذف هذا الأخصائي نهائياً؟ لن يتمكن من تسجيل الدخول وسيمحى من الموقع.</p>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setConfirmDeleteSpec(null)}>إلغاء</Button>
            <Button variant="destructive" onClick={confirmDeleteSpecFn}>نعم، حذف الأخصائي</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Add/Edit Center Dialog */}
      <Dialog open={isAddingCenter || isEditingCenter} onOpenChange={(o) => { if(!o) { setIsAddingCenter(false); setIsEditingCenter(false); } }}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>{isAddingCenter ? 'إضافة مركز جديد' : 'تعديل بيانات المركز'}</DialogTitle>
          </DialogHeader>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 py-4">
            <div className="space-y-4">
              <div>
                <Label htmlFor="center-name">اسم المركز *</Label>
                <Input id="center-name" name="name" value={currentCenter.name} onChange={handleCenterInputChange} placeholder="مركز واصل - القاهرة" required />
              </div>
              <div>
                <Label htmlFor="center-location">المحافظة / المدينة *</Label>
                <Input id="center-location" name="location" value={currentCenter.location} onChange={handleCenterInputChange} placeholder="القاهرة" required />
              </div>
              <div>
                <Label htmlFor="center-address">العنوان التفصيلي *</Label>
                <Input id="center-address" name="address" value={currentCenter.address} onChange={handleCenterInputChange} placeholder="شارع التحرير" required />
              </div>
            </div>
            <div className="space-y-4">
              <div>
                <Label htmlFor="center-phone">رقم الهاتف *</Label>
                <Input id="center-phone" name="phone" value={currentCenter.phone} onChange={handleCenterInputChange} placeholder="02-123-4567" required />
              </div>
              <div>
                <Label htmlFor="center-workingHours">ساعات العمل</Label>
                <Input id="center-workingHours" name="workingHours" value={currentCenter.workingHours} onChange={handleCenterInputChange} />
              </div>
              <div>
                <Label htmlFor="center-region">المنطقة</Label>
                <select id="center-region" name="region" value={currentCenter.region} onChange={handleCenterInputChange} className="w-full rounded-md border p-2 bg-white">
                  <option value="القاهرة الكبرى">القاهرة الكبرى</option>
                  <option value="الإسكندرية">الإسكندرية</option>
                  <option value="الدلتا">الدلتا</option>
                  <option value="الصعيد">الصعيد</option>
                  <option value="القناة">القناة</option>
                  <option value="الحدود">الحدود</option>
                </select>
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => { setIsAddingCenter(false); setIsEditingCenter(false); }}>إلغاء</Button>
            <Button onClick={handleSaveCenter} className="bg-red-600 hover:bg-red-700 text-white">
              <Save className="h-4 w-4 ml-2" /> حفظ المركز
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Center Confirmation */}
      <Dialog open={confirmDeleteCenter !== null} onOpenChange={(o) => { if(!o) setConfirmDeleteCenter(null); }}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>تأكيد حذف المركز</DialogTitle>
          </DialogHeader>
          <div className="py-4">
            <p>هل أنت متأكد من رغبتك في حذف هذا المركز نهائياً من النظام؟</p>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setConfirmDeleteCenter(null)}>إلغاء</Button>
            <Button variant="destructive" onClick={confirmDeleteCenterFn}>نعم، حذف</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Footer />
    </div>
  );
};

export default AdminDashboard;
