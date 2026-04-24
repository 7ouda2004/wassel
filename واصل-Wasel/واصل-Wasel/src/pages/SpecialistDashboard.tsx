
import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Users, FileText, PlusCircle, X, Edit, Trash, Save, 
  Search, Download, Upload, ChevronDown, FileUp, UserCheck
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
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
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { toast } from "sonner";
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

// Types
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

type MeasurementField = {
  id: string;
  label: string;
  unit: string;
};

const measurementFields: Record<string, MeasurementField[]> = {
  'جبيرة AFO': [
    { id: 'footLength', label: 'طول القدم', unit: 'سم' },
    { id: 'footWidth', label: 'عرض القدم', unit: 'سم' },
    { id: 'ankleCircumference', label: 'محيط الكاحل', unit: 'سم' },
    { id: 'calfCircumference', label: 'محيط بطة الساق', unit: 'سم' },
    { id: 'ankleToKnee', label: 'المسافة من الكاحل إلى الركبة', unit: 'سم' }
  ],
  'جبيرة KAFO': [
    { id: 'footLength', label: 'طول القدم', unit: 'سم' },
    { id: 'footWidth', label: 'عرض القدم', unit: 'سم' },
    { id: 'ankleCircumference', label: 'محيط الكاحل', unit: 'سم' },
    { id: 'calfCircumference', label: 'محيط بطة الساق', unit: 'سم' },
    { id: 'kneeCircumference', label: 'محيط الركبة', unit: 'سم' },
    { id: 'thighCircumference', label: 'محيط الفخذ', unit: 'سم' },
    { id: 'ankleToKnee', label: 'المسافة من الكاحل إلى الركبة', unit: 'سم' },
    { id: 'kneeToHip', label: 'المسافة من الركبة إلى الورك', unit: 'سم' }
  ],
  'طرف صناعي تحت الركبة': [
    { id: 'residualLength', label: 'طول الطرف المتبقي', unit: 'سم' },
    { id: 'residualCircumference', label: 'محيط الطرف المتبقي', unit: 'سم' },
    { id: 'kneeCircumference', label: 'محيط الركبة', unit: 'سم' },
    { id: 'calfShape', label: 'شكل بطة الساق', unit: '' },
    { id: 'footSize', label: 'مقاس القدم', unit: '' }
  ],
  'طرف صناعي فوق الركبة': [
    { id: 'residualLength', label: 'طول الطرف المتبقي', unit: 'سم' },
    { id: 'residualCircumference', label: 'محيط الطرف المتبقي', unit: 'سم' },
    { id: 'hipCircumference', label: 'محيط الورك', unit: 'سم' },
    { id: 'residualShape', label: 'شكل الطرف المتبقي', unit: '' },
    { id: 'kneeType', label: 'نوع الركبة', unit: '' },
    { id: 'footSize', label: 'مقاس القدم', unit: '' }
  ]
};

// Sample data
const samplePatients: Patient[] = [
  {
    id: 1,
    name: 'أحمد محمد',
    age: 35,
    gender: 'ذكر',
    phone: '01012345678',
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
    lastVisit: '2025-02-10',
    nextVisit: '2025-04-10',
    notes: 'المريض يتقدم بشكل جيد في التأقلم مع الطرف الصناعي. يحتاج إلى متابعة لتعديل السوكيت بعد انخفاض الوزن.',
    files: ['تقرير_طبي_أحمد_محمد.pdf', 'صور_أشعة_الطرف.jpg']
  },
  {
    id: 2,
    name: 'فاطمة خالد',
    age: 28,
    gender: 'أنثى',
    phone: '01098765432',
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
    lastVisit: '2025-01-15',
    nextVisit: '2025-03-15',
    notes: 'تحسن ملحوظ في المشي بعد استخدام الجبيرة. تحتاج إلى تمارين لتقوية العضلات.',
    files: ['تقرير_العلاج_الطبيعي_فاطمة.pdf']
  },
  {
    id: 3,
    name: 'محمود عبد الله',
    age: 45,
    gender: 'ذكر',
    phone: '01167834290',
    condition: 'بتر فوق الركبة - الساق اليسرى',
    deviceType: 'طرف صناعي فوق الركبة',
    measurements: {
      residualLength: '28',
      residualCircumference: '48',
      hipCircumference: '98',
      residualShape: 'أسطواني',
      kneeType: 'هيدروليكية',
      footSize: '44'
    },
    status: 'تحت المراقبة',
    lastVisit: '2025-02-20',
    nextVisit: '2025-03-05',
    notes: 'يواجه صعوبة في التحكم بالركبة الصناعية. يحتاج إلى جلسات تدريب إضافية.',
    files: ['صور_الطرف_الصناعي.jpg', 'برنامج_التأهيل.pdf']
  }
];

const SpecialistDashboard = () => {
  const [patients, setPatients] = useState<Patient[]>(() => {
    const savedPatients = localStorage.getItem('patients');
    return savedPatients ? JSON.parse(savedPatients) : samplePatients;
  });
  
  const [isAddingPatient, setIsAddingPatient] = useState(false);
  const [isEditingPatient, setIsEditingPatient] = useState(false);
  const [viewingPatient, setViewingPatient] = useState<Patient | null>(null);
  const [currentPatient, setCurrentPatient] = useState<Patient>({
    id: 0,
    name: '',
    age: 0,
    gender: '',
    phone: '',
    condition: '',
    deviceType: '',
    measurements: {},
    status: 'جديد',
    lastVisit: new Date().toISOString().split('T')[0],
    nextVisit: '',
    notes: '',
    files: []
  });
  
  const [searchTerm, setSearchTerm] = useState('');
  const [confirmDelete, setConfirmDelete] = useState<number | null>(null);
  const [uploadingFile, setUploadingFile] = useState(false);

  useEffect(() => {
    document.documentElement.dir = 'rtl';
    document.body.classList.add('font-cairo');
    
    // Check if user is logged in
    const isSpecialist = sessionStorage.getItem('isSpecialist');
    if (isSpecialist !== 'true') {
      window.location.href = '/login';
      return;
    }

    // Load patients from localStorage
    const savedPatients = localStorage.getItem('patients');
    if (savedPatients) {
      try {
        const parsedPatients = JSON.parse(savedPatients);
        setPatients(parsedPatients);
      } catch (error) {
        console.error('Error loading patients:', error);
        toast.error('حدث خطأ في تحميل بيانات المرضى');
      }
    }
  }, []);

  // Save patients to localStorage when they change
  useEffect(() => {
    try {
      localStorage.setItem('patients', JSON.stringify(patients));
    } catch (error) {
      console.error('Error saving patients:', error);
      toast.error('حدث خطأ في حفظ بيانات المرضى');
    }
  }, [patients]);

  const filteredPatients = patients.filter(patient => 
    patient.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    patient.condition.toLowerCase().includes(searchTerm.toLowerCase()) ||
    patient.deviceType.toLowerCase().includes(searchTerm.toLowerCase()) ||
    patient.phone.includes(searchTerm)
  );

  const handleAddPatient = () => {
    setCurrentPatient({
      id: Math.max(0, ...patients.map(p => p.id)) + 1,
      name: '',
      age: 0,
      gender: '',
      phone: '',
      condition: '',
      deviceType: '',
      measurements: {},
      status: 'جديد',
      lastVisit: new Date().toISOString().split('T')[0],
      nextVisit: '',
      notes: '',
      files: []
    });
    setIsAddingPatient(true);
  };

  const handleEditPatient = (patient: Patient) => {
    setCurrentPatient({ ...patient });
    setIsEditingPatient(true);
  };

  const handleViewPatient = (patient: Patient) => {
    setViewingPatient(patient);
  };

  const handleDeletePatient = (id: number) => {
    setConfirmDelete(id);
  };

  const confirmDeletePatient = () => {
    if (confirmDelete) {
      setPatients(patients.filter(patient => patient.id !== confirmDelete));
      setConfirmDelete(null);
      toast.success('تم حذف المريض بنجاح');
    }
  };

  const handleSavePatient = () => {
    if (!currentPatient.name || !currentPatient.deviceType || !currentPatient.phone) {
      toast.error('يرجى ملء جميع الحقول المطلوبة');
      return;
    }

    // Validate phone number format
    const phoneRegex = /^01[0125][0-9]{8}$/;
    if (!phoneRegex.test(currentPatient.phone)) {
      toast.error('رقم الهاتف غير صحيح');
      return;
    }
    
    try {
      if (isAddingPatient) {
        setPatients([...patients, currentPatient]);
        toast.success('تمت إضافة المريض بنجاح');
        setIsAddingPatient(false);
      } else if (isEditingPatient) {
        setPatients(patients.map(p => p.id === currentPatient.id ? currentPatient : p));
        toast.success('تم تحديث بيانات المريض بنجاح');
        setIsEditingPatient(false);
      }
      setCurrentPatient({
        id: 0,
        name: '',
        age: 0,
        gender: '',
        phone: '',
        condition: '',
        deviceType: '',
        measurements: {},
        status: 'جديد',
        lastVisit: new Date().toISOString().split('T')[0],
        nextVisit: '',
        notes: '',
        files: []
      });
    } catch (error) {
      console.error('Error saving patient:', error);
      toast.error('حدث خطأ في حفظ بيانات المريض');
    }
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setCurrentPatient({ ...currentPatient, [name]: value });
    
    // Reset measurements if device type changes
    if (name === 'deviceType') {
      setCurrentPatient({ 
        ...currentPatient, 
        deviceType: value,
        measurements: {} 
      });
    }
  };

  const handleMeasurementChange = (id: string, value: string) => {
    setCurrentPatient({
      ...currentPatient,
      measurements: {
        ...currentPatient.measurements,
        [id]: value
      }
    });
  };

  const simulateFileUpload = () => {
    setUploadingFile(true);
    setTimeout(() => {
      const newFile = `ملف_${Math.floor(Math.random() * 1000)}.pdf`;
      
      if (viewingPatient) {
        const updatedPatient = {
          ...viewingPatient,
          files: [...viewingPatient.files, newFile]
        };
        setViewingPatient(updatedPatient);
        setPatients(patients.map(p => p.id === viewingPatient.id ? updatedPatient : p));
      } else if (currentPatient) {
        setCurrentPatient({
          ...currentPatient,
          files: [...currentPatient.files, newFile]
        });
      }
      
      setUploadingFile(false);
      toast.success('تم رفع الملف بنجاح');
    }, 1500);
  };

  const handleDownloadFile = (fileName: string) => {
    toast.success(`جاري تحميل الملف: ${fileName}`);
  };

  const handleDeleteFile = (fileName: string) => {
    if (viewingPatient) {
      const updatedPatient = {
        ...viewingPatient,
        files: viewingPatient.files.filter(f => f !== fileName)
      };
      setViewingPatient(updatedPatient);
      setPatients(patients.map(p => p.id === viewingPatient.id ? updatedPatient : p));
    } else if (currentPatient) {
      setCurrentPatient({
        ...currentPatient,
        files: currentPatient.files.filter(f => f !== fileName)
      });
    }
    toast.success('تم حذف الملف بنجاح');
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <div className="flex-1 bg-gray-50">
        <div className="container mx-auto px-4 py-10">
          <div className="bg-white rounded-lg shadow-md p-6 mb-8">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
              <div>
                <h1 className="text-2xl font-bold text-gray-900">لوحة تحكم الأخصائي</h1>
                <p className="text-gray-600">مرحبًا {localStorage.getItem('username') || 'أخصائي'}، إليك نظرة عامة على المرضى والتقارير</p>
              </div>
              <div className="mt-4 md:mt-0">
                <Button onClick={handleAddPatient} className="medical-btn">
                  <PlusCircle className="h-5 w-5 mr-2" />
                  إضافة مريض جديد
                </Button>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
              <div className="bg-medical-50 rounded-lg p-4 border border-medical-100">
                <div className="flex items-center">
                  <div className="h-12 w-12 rounded-full bg-medical-100 flex items-center justify-center mr-4">
                    <Users className="h-6 w-6 text-medical-600" />
                  </div>
                  <div>
                    <div className="text-sm text-gray-500">إجمالي المرضى</div>
                    <div className="text-2xl font-bold">{patients.length}</div>
                  </div>
                </div>
              </div>
              
              <div className="bg-medical-50 rounded-lg p-4 border border-medical-100">
                <div className="flex items-center">
                  <div className="h-12 w-12 rounded-full bg-medical-100 flex items-center justify-center mr-4">
                    <UserCheck className="h-6 w-6 text-medical-600" />
                  </div>
                  <div>
                    <div className="text-sm text-gray-500">مرضى نشطون</div>
                    <div className="text-2xl font-bold">{patients.filter(p => p.status === 'نشط').length}</div>
                  </div>
                </div>
              </div>
              
              <div className="bg-medical-50 rounded-lg p-4 border border-medical-100">
                <div className="flex items-center">
                  <div className="h-12 w-12 rounded-full bg-medical-100 flex items-center justify-center mr-4">
                    <FileText className="h-6 w-6 text-medical-600" />
                  </div>
                  <div>
                    <div className="text-sm text-gray-500">الأطراف الصناعية</div>
                    <div className="text-2xl font-bold">{patients.filter(p => p.deviceType.includes('طرف')).length}</div>
                  </div>
                </div>
              </div>
              
              <div className="bg-medical-50 rounded-lg p-4 border border-medical-100">
                <div className="flex items-center">
                  <div className="h-12 w-12 rounded-full bg-medical-100 flex items-center justify-center mr-4">
                    <FileText className="h-6 w-6 text-medical-600" />
                  </div>
                  <div>
                    <div className="text-sm text-gray-500">الجبائر الطبية</div>
                    <div className="text-2xl font-bold">{patients.filter(p => p.deviceType.includes('جبيرة')).length}</div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="mb-6 relative">
              <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                <Search className="h-5 w-5 text-gray-400" />
              </div>
              <Input
                type="text"
                placeholder="البحث عن مريض..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-3 pr-10"
              />
            </div>
            
            <Tabs defaultValue="all">
              <TabsList className="grid grid-cols-4 mb-4">
                <TabsTrigger value="all">جميع المرضى</TabsTrigger>
                <TabsTrigger value="prosthetics">الأطراف الصناعية</TabsTrigger>
                <TabsTrigger value="orthoses">الجبائر الطبية</TabsTrigger>
                <TabsTrigger value="active">المرضى النشطون</TabsTrigger>
              </TabsList>
              
              <TabsContent value="all">
                <div className="overflow-x-auto">
                  <Table>
                    <TableCaption>قائمة بجميع المرضى المسجلين</TableCaption>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="text-right">اسم المريض</TableHead>
                        <TableHead className="text-right">العمر</TableHead>
                        <TableHead className="text-right">الحالة</TableHead>
                        <TableHead className="text-right">نوع الجهاز</TableHead>
                        <TableHead className="text-right">الحالة</TableHead>
                        <TableHead className="text-right">آخر زيارة</TableHead>
                        <TableHead className="text-right">الإجراءات</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredPatients.length > 0 ? (
                        filteredPatients.map((patient) => (
                          <TableRow key={patient.id}>
                            <TableCell className="font-medium">{patient.name}</TableCell>
                            <TableCell>{patient.age}</TableCell>
                            <TableCell>{patient.condition}</TableCell>
                            <TableCell>{patient.deviceType}</TableCell>
                            <TableCell>
                              <span 
                                className={`inline-block px-2 py-1 rounded-full text-xs font-semibold ${
                                  patient.status === 'نشط' ? 'bg-green-100 text-green-800' :
                                  patient.status === 'تحت المراقبة' ? 'bg-yellow-100 text-yellow-800' :
                                  'bg-blue-100 text-blue-800'
                                }`}
                              >
                                {patient.status}
                              </span>
                            </TableCell>
                            <TableCell>{patient.lastVisit}</TableCell>
                            <TableCell>
                              <div className="flex space-x-2 rtl:space-x-reverse">
                                <Button variant="ghost" size="sm" onClick={() => handleViewPatient(patient)}>
                                  عرض
                                </Button>
                                <Button variant="ghost" size="sm" onClick={() => handleEditPatient(patient)}>
                                  <Edit className="h-4 w-4" />
                                </Button>
                                <Button variant="ghost" size="sm" onClick={() => handleDeletePatient(patient.id)}>
                                  <Trash className="h-4 w-4" />
                                </Button>
                              </div>
                            </TableCell>
                          </TableRow>
                        ))
                      ) : (
                        <TableRow>
                          <TableCell colSpan={7} className="text-center h-32">
                            <div className="flex flex-col items-center justify-center text-gray-500">
                              <Users className="h-8 w-8 mb-2" />
                              <span>لا يوجد مرضى مطابقين لبحثك</span>
                            </div>
                          </TableCell>
                        </TableRow>
                      )}
                    </TableBody>
                  </Table>
                </div>
              </TabsContent>
              
              <TabsContent value="prosthetics">
                <div className="overflow-x-auto">
                  <Table>
                    <TableCaption>قائمة بمرضى الأطراف الصناعية</TableCaption>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="text-right">اسم المريض</TableHead>
                        <TableHead className="text-right">العمر</TableHead>
                        <TableHead className="text-right">الحالة</TableHead>
                        <TableHead className="text-right">نوع الطرف</TableHead>
                        <TableHead className="text-right">الحالة</TableHead>
                        <TableHead className="text-right">آخر زيارة</TableHead>
                        <TableHead className="text-right">الإجراءات</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredPatients.filter(p => p.deviceType.includes('طرف')).length > 0 ? (
                        filteredPatients
                          .filter(p => p.deviceType.includes('طرف'))
                          .map((patient) => (
                            <TableRow key={patient.id}>
                              <TableCell className="font-medium">{patient.name}</TableCell>
                              <TableCell>{patient.age}</TableCell>
                              <TableCell>{patient.condition}</TableCell>
                              <TableCell>{patient.deviceType}</TableCell>
                              <TableCell>
                                <span 
                                  className={`inline-block px-2 py-1 rounded-full text-xs font-semibold ${
                                    patient.status === 'نشط' ? 'bg-green-100 text-green-800' :
                                    patient.status === 'تحت المراقبة' ? 'bg-yellow-100 text-yellow-800' :
                                    'bg-blue-100 text-blue-800'
                                  }`}
                                >
                                  {patient.status}
                                </span>
                              </TableCell>
                              <TableCell>{patient.lastVisit}</TableCell>
                              <TableCell>
                                <div className="flex space-x-2 rtl:space-x-reverse">
                                  <Button variant="ghost" size="sm" onClick={() => handleViewPatient(patient)}>
                                    عرض
                                  </Button>
                                  <Button variant="ghost" size="sm" onClick={() => handleEditPatient(patient)}>
                                    <Edit className="h-4 w-4" />
                                  </Button>
                                  <Button variant="ghost" size="sm" onClick={() => handleDeletePatient(patient.id)}>
                                    <Trash className="h-4 w-4" />
                                  </Button>
                                </div>
                              </TableCell>
                            </TableRow>
                          ))
                      ) : (
                        <TableRow>
                          <TableCell colSpan={7} className="text-center h-32">
                            <div className="flex flex-col items-center justify-center text-gray-500">
                              <Users className="h-8 w-8 mb-2" />
                              <span>لا يوجد مرضى أطراف صناعية مطابقين لبحثك</span>
                            </div>
                          </TableCell>
                        </TableRow>
                      )}
                    </TableBody>
                  </Table>
                </div>
              </TabsContent>
              
              <TabsContent value="orthoses">
                <div className="overflow-x-auto">
                  <Table>
                    <TableCaption>قائمة بمرضى الجبائر الطبية</TableCaption>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="text-right">اسم المريض</TableHead>
                        <TableHead className="text-right">العمر</TableHead>
                        <TableHead className="text-right">الحالة</TableHead>
                        <TableHead className="text-right">نوع الجبيرة</TableHead>
                        <TableHead className="text-right">الحالة</TableHead>
                        <TableHead className="text-right">آخر زيارة</TableHead>
                        <TableHead className="text-right">الإجراءات</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredPatients.filter(p => p.deviceType.includes('جبيرة')).length > 0 ? (
                        filteredPatients
                          .filter(p => p.deviceType.includes('جبيرة'))
                          .map((patient) => (
                            <TableRow key={patient.id}>
                              <TableCell className="font-medium">{patient.name}</TableCell>
                              <TableCell>{patient.age}</TableCell>
                              <TableCell>{patient.condition}</TableCell>
                              <TableCell>{patient.deviceType}</TableCell>
                              <TableCell>
                                <span 
                                  className={`inline-block px-2 py-1 rounded-full text-xs font-semibold ${
                                    patient.status === 'نشط' ? 'bg-green-100 text-green-800' :
                                    patient.status === 'تحت المراقبة' ? 'bg-yellow-100 text-yellow-800' :
                                    'bg-blue-100 text-blue-800'
                                  }`}
                                >
                                  {patient.status}
                                </span>
                              </TableCell>
                              <TableCell>{patient.lastVisit}</TableCell>
                              <TableCell>
                                <div className="flex space-x-2 rtl:space-x-reverse">
                                  <Button variant="ghost" size="sm" onClick={() => handleViewPatient(patient)}>
                                    عرض
                                  </Button>
                                  <Button variant="ghost" size="sm" onClick={() => handleEditPatient(patient)}>
                                    <Edit className="h-4 w-4" />
                                  </Button>
                                  <Button variant="ghost" size="sm" onClick={() => handleDeletePatient(patient.id)}>
                                    <Trash className="h-4 w-4" />
                                  </Button>
                                </div>
                              </TableCell>
                            </TableRow>
                          ))
                      ) : (
                        <TableRow>
                          <TableCell colSpan={7} className="text-center h-32">
                            <div className="flex flex-col items-center justify-center text-gray-500">
                              <Users className="h-8 w-8 mb-2" />
                              <span>لا يوجد مرضى جبائر طبية مطابقين لبحثك</span>
                            </div>
                          </TableCell>
                        </TableRow>
                      )}
                    </TableBody>
                  </Table>
                </div>
              </TabsContent>
              
              <TabsContent value="active">
                <div className="overflow-x-auto">
                  <Table>
                    <TableCaption>قائمة بالمرضى النشطين</TableCaption>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="text-right">اسم المريض</TableHead>
                        <TableHead className="text-right">العمر</TableHead>
                        <TableHead className="text-right">الحالة</TableHead>
                        <TableHead className="text-right">نوع الجهاز</TableHead>
                        <TableHead className="text-right">آخر زيارة</TableHead>
                        <TableHead className="text-right">الزيارة القادمة</TableHead>
                        <TableHead className="text-right">الإجراءات</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredPatients.filter(p => p.status === 'نشط').length > 0 ? (
                        filteredPatients
                          .filter(p => p.status === 'نشط')
                          .map((patient) => (
                            <TableRow key={patient.id}>
                              <TableCell className="font-medium">{patient.name}</TableCell>
                              <TableCell>{patient.age}</TableCell>
                              <TableCell>{patient.condition}</TableCell>
                              <TableCell>{patient.deviceType}</TableCell>
                              <TableCell>{patient.lastVisit}</TableCell>
                              <TableCell>{patient.nextVisit}</TableCell>
                              <TableCell>
                                <div className="flex space-x-2 rtl:space-x-reverse">
                                  <Button variant="ghost" size="sm" onClick={() => handleViewPatient(patient)}>
                                    عرض
                                  </Button>
                                  <Button variant="ghost" size="sm" onClick={() => handleEditPatient(patient)}>
                                    <Edit className="h-4 w-4" />
                                  </Button>
                                  <Button variant="ghost" size="sm" onClick={() => handleDeletePatient(patient.id)}>
                                    <Trash className="h-4 w-4" />
                                  </Button>
                                </div>
                              </TableCell>
                            </TableRow>
                          ))
                      ) : (
                        <TableRow>
                          <TableCell colSpan={7} className="text-center h-32">
                            <div className="flex flex-col items-center justify-center text-gray-500">
                              <Users className="h-8 w-8 mb-2" />
                              <span>لا يوجد مرضى نشطين مطابقين لبحثك</span>
                            </div>
                          </TableCell>
                        </TableRow>
                      )}
                    </TableBody>
                  </Table>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>

      {/* Add/Edit Patient Dialog */}
      <Dialog 
        open={isAddingPatient || isEditingPatient} 
        onOpenChange={(open) => {
          if (!open) {
            setIsAddingPatient(false);
            setIsEditingPatient(false);
          }
        }}
      >
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle>
              {isAddingPatient ? 'إضافة مريض جديد' : 'تعديل بيانات المريض'}
            </DialogTitle>
          </DialogHeader>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-4">
              <div>
                <Label htmlFor="name">اسم المريض</Label>
                <Input 
                  id="name"
                  name="name"
                  value={currentPatient.name}
                  onChange={handleInputChange}
                  placeholder="الاسم الكامل"
                  required
                />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="age">العمر</Label>
                  <Input 
                    id="age"
                    name="age"
                    type="number"
                    value={currentPatient.age}
                    onChange={handleInputChange}
                    placeholder="العمر"
                    required
                  />
                </div>
                
                <div>
                  <Label htmlFor="gender">الجنس</Label>
                  <select
                    id="gender"
                    name="gender"
                    value={currentPatient.gender}
                    onChange={handleInputChange}
                    className="w-full rounded-md border border-gray-300 p-2 focus:ring-2 focus:ring-medical-500 focus:border-transparent"
                    required
                  >
                    <option value="" disabled>اختر</option>
                    <option value="ذكر">ذكر</option>
                    <option value="أنثى">أنثى</option>
                  </select>
                </div>
              </div>
              
              <div>
                <Label htmlFor="phone">رقم الهاتف</Label>
                <Input 
                  id="phone"
                  name="phone"
                  value={currentPatient.phone}
                  onChange={handleInputChange}
                  placeholder="رقم الهاتف"
                  required
                />
              </div>
              
              <div>
                <Label htmlFor="condition">الحالة</Label>
                <Input 
                  id="condition"
                  name="condition"
                  value={currentPatient.condition}
                  onChange={handleInputChange}
                  placeholder="وصف الحالة"
                  required
                />
              </div>
              
              <div>
                <Label htmlFor="deviceType">نوع الجهاز</Label>
                <select
                  id="deviceType"
                  name="deviceType"
                  value={currentPatient.deviceType}
                  onChange={handleInputChange}
                  className="w-full rounded-md border border-gray-300 p-2 focus:ring-2 focus:ring-medical-500 focus:border-transparent"
                  required
                >
                  <option value="" disabled>اختر نوع الجهاز</option>
                  <option value="جبيرة AFO">جبيرة الكاحل والقدم (AFO)</option>
                  <option value="جبيرة KAFO">جبيرة الركبة والكاحل والقدم (KAFO)</option>
                  <option value="طرف صناعي تحت الركبة">طرف صناعي تحت الركبة</option>
                  <option value="طرف صناعي فوق الركبة">طرف صناعي فوق الركبة</option>
                </select>
              </div>
              
              <div>
                <Label htmlFor="status">الحالة</Label>
                <select
                  id="status"
                  name="status"
                  value={currentPatient.status}
                  onChange={handleInputChange}
                  className="w-full rounded-md border border-gray-300 p-2 focus:ring-2 focus:ring-medical-500 focus:border-transparent"
                  required
                >
                  <option value="جديد">جديد</option>
                  <option value="نشط">نشط</option>
                  <option value="تحت المراقبة">تحت المراقبة</option>
                </select>
              </div>
            </div>
            
            <div className="space-y-4">
              {currentPatient.deviceType && (
                <div>
                  <Label className="mb-2 block">القياسات</Label>
                  <div className="space-y-2 max-h-40 overflow-y-auto p-2 bg-gray-50 rounded-md">
                    {measurementFields[currentPatient.deviceType]?.map((field) => (
                      <div key={field.id} className="flex items-center">
                        <Label htmlFor={field.id} className="w-1/2 text-sm">
                          {field.label}:
                        </Label>
                        <div className="flex-1 flex items-center">
                          <Input 
                            id={field.id}
                            value={currentPatient.measurements[field.id] || ''}
                            onChange={(e) => handleMeasurementChange(field.id, e.target.value)}
                            placeholder="القيمة"
                            className="text-sm py-1"
                          />
                          {field.unit && (
                            <span className="mr-2 text-sm text-gray-500">{field.unit}</span>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="lastVisit">تاريخ آخر زيارة</Label>
                  <Input 
                    id="lastVisit"
                    name="lastVisit"
                    type="date"
                    value={currentPatient.lastVisit}
                    onChange={handleInputChange}
                  />
                </div>
                
                <div>
                  <Label htmlFor="nextVisit">تاريخ الزيارة القادمة</Label>
                  <Input 
                    id="nextVisit"
                    name="nextVisit"
                    type="date"
                    value={currentPatient.nextVisit}
                    onChange={handleInputChange}
                  />
                </div>
              </div>
              
              <div>
                <Label htmlFor="notes">ملاحظات</Label>
                <Textarea 
                  id="notes"
                  name="notes"
                  value={currentPatient.notes}
                  onChange={handleInputChange}
                  placeholder="ملاحظات إضافية"
                  rows={3}
                />
              </div>
              
              <div>
                <Label className="mb-2 block">الملفات المرفقة</Label>
                <div className="space-y-2">
                  {currentPatient.files.length > 0 ? (
                    <div className="space-y-2 max-h-32 overflow-y-auto p-2 bg-gray-50 rounded-md">
                      {currentPatient.files.map((file, index) => (
                        <div key={index} className="flex items-center justify-between text-sm">
                          <span className="flex items-center">
                            <FileText className="h-4 w-4 mr-2 text-gray-500" />
                            {file}
                          </span>
                          <div className="flex space-x-2 rtl:space-x-reverse">
                            <Button 
                              variant="ghost" 
                              size="sm"
                              onClick={() => handleDownloadFile(file)}
                            >
                              <Download className="h-4 w-4" />
                            </Button>
                            <Button 
                              variant="ghost" 
                              size="sm"
                              onClick={() => handleDeleteFile(file)}
                            >
                              <X className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-gray-500 text-sm">لا يوجد ملفات مرفقة</div>
                  )}
                  
                  <Button 
                    variant="outline" 
                    className="mt-2 w-full"
                    onClick={simulateFileUpload}
                    disabled={uploadingFile}
                  >
                    {uploadingFile ? (
                      <span className="flex items-center">
                        <svg className="animate-spin -ml-1 mr-3 h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        جاري الرفع...
                      </span>
                    ) : (
                      <span className="flex items-center">
                        <FileUp className="h-4 w-4 mr-2" />
                        رفع ملف
                      </span>
                    )}
                  </Button>
                </div>
              </div>
            </div>
          </div>
          
          <DialogFooter>
            <Button 
              variant="outline"
              onClick={() => {
                setIsAddingPatient(false);
                setIsEditingPatient(false);
              }}
              className="ml-2"
            >
              إلغاء
            </Button>
            <Button onClick={handleSavePatient} className="medical-btn">
              <Save className="h-4 w-4 mr-2" />
              حفظ
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* View Patient Dialog */}
      {/* Add/Edit Patient Dialog */}
      <Dialog
        open={isAddingPatient || isEditingPatient}
        onOpenChange={(open) => {
          if (!open) {
            setIsAddingPatient(false);
            setIsEditingPatient(false);
            setCurrentPatient({
              id: 0,
              name: '',
              age: 0,
              gender: '',
              phone: '',
              condition: '',
              deviceType: '',
              measurements: {},
              status: 'جديد',
              lastVisit: new Date().toISOString().split('T')[0],
              nextVisit: '',
              notes: '',
              files: []
            });
          }
        }}
      >
        <DialogContent className="max-w-4xl">
          <DialogHeader>
            <DialogTitle>
              {isAddingPatient ? 'إضافة مريض جديد' : 'تعديل بيانات المريض'}
            </DialogTitle>
          </DialogHeader>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <Label htmlFor="name">اسم المريض</Label>
                <Input
                  id="name"
                  name="name"
                  value={currentPatient.name}
                  onChange={handleInputChange}
                  placeholder="الاسم الكامل"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="age">العمر</Label>
                  <Input
                    id="age"
                    name="age"
                    type="number"
                    value={currentPatient.age}
                    onChange={handleInputChange}
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="gender">الجنس</Label>
                  <select
                    id="gender"
                    name="gender"
                    value={currentPatient.gender}
                    onChange={handleInputChange}
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
                    required
                  >
                    <option value="">اختر الجنس</option>
                    <option value="ذكر">ذكر</option>
                    <option value="أنثى">أنثى</option>
                  </select>
                </div>
              </div>

              <div>
                <Label htmlFor="phone">رقم الهاتف</Label>
                <Input
                  id="phone"
                  name="phone"
                  value={currentPatient.phone}
                  onChange={handleInputChange}
                  placeholder="01xxxxxxxxx"
                  required
                />
              </div>

              <div>
                <Label htmlFor="condition">الحالة المرضية</Label>
                <Textarea
                  id="condition"
                  name="condition"
                  value={currentPatient.condition}
                  onChange={handleInputChange}
                  placeholder="وصف الحالة المرضية"
                  required
                />
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <Label htmlFor="deviceType">نوع الجهاز</Label>
                <select
                  id="deviceType"
                  name="deviceType"
                  value={currentPatient.deviceType}
                  onChange={handleInputChange}
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
                  required
                >
                  <option value="">اختر نوع الجهاز</option>
                  <option value="جبيرة AFO">جبيرة AFO</option>
                  <option value="جبيرة KAFO">جبيرة KAFO</option>
                  <option value="طرف صناعي تحت الركبة">طرف صناعي تحت الركبة</option>
                  <option value="طرف صناعي فوق الركبة">طرف صناعي فوق الركبة</option>
                </select>
              </div>

              {currentPatient.deviceType && (
                <div>
                  <Label>القياسات</Label>
                  <div className="space-y-2 mt-2">
                    {measurementFields[currentPatient.deviceType]?.map((field) => (
                      <div key={field.id} className="grid grid-cols-2 gap-2 items-center">
                        <Label htmlFor={field.id}>{field.label}</Label>
                        <div className="flex">
                          <Input
                            id={field.id}
                            value={currentPatient.measurements[field.id] || ''}
                            onChange={(e) => handleMeasurementChange(field.id, e.target.value)}
                            placeholder={field.unit}
                          />
                          {field.unit && (
                            <span className="ml-2 flex items-center text-gray-500">{field.unit}</span>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <div>
                <Label htmlFor="status">حالة المريض</Label>
                <select
                  id="status"
                  name="status"
                  value={currentPatient.status}
                  onChange={handleInputChange}
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
                  required
                >
                  <option value="جديد">جديد</option>
                  <option value="نشط">نشط</option>
                  <option value="تحت المراقبة">تحت المراقبة</option>
                </select>
              </div>

              <div>
                <Label htmlFor="nextVisit">موعد الزيارة القادمة</Label>
                <Input
                  id="nextVisit"
                  name="nextVisit"
                  type="date"
                  value={currentPatient.nextVisit}
                  onChange={handleInputChange}
                />
              </div>

              <div>
                <Label htmlFor="notes">ملاحظات</Label>
                <Textarea
                  id="notes"
                  name="notes"
                  value={currentPatient.notes}
                  onChange={handleInputChange}
                  placeholder="أي ملاحظات إضافية"
                />
              </div>
            </div>
          </div>

          <DialogFooter className="mt-6">
            <Button
              variant="outline"
              onClick={() => {
                setIsAddingPatient(false);
                setIsEditingPatient(false);
              }}
            >
              إلغاء
            </Button>
            <Button onClick={handleSavePatient}>
              {isAddingPatient ? 'إضافة المريض' : 'حفظ التغييرات'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* View Patient Dialog */}
      <Dialog 
        open={!!viewingPatient} 
        onOpenChange={(open) => {
          if (!open) setViewingPatient(null);
        }}
      >
        <DialogContent className="max-w-4xl">
          <DialogHeader>
            <DialogTitle>تفاصيل المريض</DialogTitle>
          </DialogHeader>
          
          {viewingPatient && (
            <div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <div className="bg-medical-50 rounded-lg p-4">
                  <h3 className="text-sm font-medium text-gray-500 mb-1">اسم المريض</h3>
                  <p className="text-lg font-semibold">{viewingPatient.name}</p>
                </div>
                
                <div className="bg-medical-50 rounded-lg p-4">
                  <h3 className="text-sm font-medium text-gray-500 mb-1">العمر / الجنس</h3>
                  <p className="text-lg font-semibold">{viewingPatient.age} سنة / {viewingPatient.gender}</p>
                </div>
                
                <div className="bg-medical-50 rounded-lg p-4">
                  <h3 className="text-sm font-medium text-gray-500 mb-1">رقم الهاتف</h3>
                  <p className="text-lg font-semibold">{viewingPatient.phone}</p>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <div className="bg-white rounded-lg border border-gray-200 p-4 mb-4">
                    <h3 className="text-lg font-semibold mb-2">معلومات الحالة</h3>
                    <div className="space-y-3">
                      <div>
                        <span className="text-gray-500">الحالة:</span>
                        <p>{viewingPatient.condition}</p>
                      </div>
                      <div>
                        <span className="text-gray-500">نوع الجهاز:</span>
                        <p>{viewingPatient.deviceType}</p>
                      </div>
                      <div>
                        <span className="text-gray-500">حالة المريض:</span>
                        <p>
                          <span 
                            className={`inline-block px-2 py-1 rounded-full text-xs font-semibold ${
                              viewingPatient.status === 'نشط' ? 'bg-green-100 text-green-800' :
                              viewingPatient.status === 'تحت المراقبة' ? 'bg-yellow-100 text-yellow-800' :
                              'bg-blue-100 text-blue-800'
                            }`}
                          >
                            {viewingPatient.status}
                          </span>
                        </p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-white rounded-lg border border-gray-200 p-4 mb-4">
                    <h3 className="text-lg font-semibold mb-2">الزيارات</h3>
                    <div className="space-y-3">
                      <div>
                        <span className="text-gray-500">آخر زيارة:</span>
                        <p>{viewingPatient.lastVisit}</p>
                      </div>
                      <div>
                        <span className="text-gray-500">الزيارة القادمة:</span>
                        <p>{viewingPatient.nextVisit || 'غير محدد'}</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-white rounded-lg border border-gray-200 p-4">
                    <h3 className="text-lg font-semibold mb-2">ملاحظات</h3>
                    <p className="text-gray-700">{viewingPatient.notes || 'لا توجد ملاحظات'}</p>
                  </div>
                </div>
                
                <div>
                  <div className="bg-white rounded-lg border border-gray-200 p-4 mb-4">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="text-lg font-semibold">القياسات</h3>
                      <Button 
                        variant="ghost" 
                        size="sm"
                        onClick={() => handleEditPatient(viewingPatient)}
                        className="text-xs"
                      >
                        <Edit className="h-3 w-3 mr-1" />
                        تعديل
                      </Button>
                    </div>
                    {Object.keys(viewingPatient.measurements).length > 0 ? (
                      <div className="space-y-2">
                        {measurementFields[viewingPatient.deviceType]?.map((field) => (
                          viewingPatient.measurements[field.id] && (
                            <div key={field.id} className="flex justify-between border-b border-gray-100 py-1">
                              <span className="text-gray-500">{field.label}:</span>
                              <span>
                                {viewingPatient.measurements[field.id]} {field.unit}
                              </span>
                            </div>
                          )
                        ))}
                      </div>
                    ) : (
                      <p className="text-gray-500">لا توجد قياسات مسجلة</p>
                    )}
                  </div>
                  
                  <div className="bg-white rounded-lg border border-gray-200 p-4">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="text-lg font-semibold">الملفات المرفقة</h3>
                      <Button variant="outline" size="sm" onClick={simulateFileUpload} disabled={uploadingFile}>
                        {uploadingFile ? (
                          <span className="flex items-center text-xs">
                            <svg className="animate-spin -ml-1 mr-2 h-3 w-3" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                            جاري الرفع...
                          </span>
                        ) : (
                          <span className="flex items-center text-xs">
                            <FileUp className="h-3 w-3 mr-1" />
                            رفع ملف
                          </span>
                        )}
                      </Button>
                    </div>
                    
                    {viewingPatient.files.length > 0 ? (
                      <div className="space-y-2">
                        {viewingPatient.files.map((file, index) => (
                          <div key={index} className="flex items-center justify-between border-b border-gray-100 py-2">
                            <span className="flex items-center">
                              <FileText className="h-4 w-4 mr-2 text-gray-500" />
                              {file}
                            </span>
                            <div className="flex space-x-2 rtl:space-x-reverse">
                              <Button 
                                variant="ghost" 
                                size="sm"
                                onClick={() => handleDownloadFile(file)}
                              >
                                <Download className="h-4 w-4" />
                              </Button>
                              <Button 
                                variant="ghost" 
                                size="sm"
                                onClick={() => handleDeleteFile(file)}
                              >
                                <X className="h-4 w-4" />
                              </Button>
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <p className="text-gray-500">لا توجد ملفات مرفقة</p>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Confirm Delete Dialog */}
      <Dialog 
        open={confirmDelete !== null} 
        onOpenChange={(open) => {
          if (!open) setConfirmDelete(null);
        }}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>تأكيد الحذف</DialogTitle>
          </DialogHeader>
          
          <div className="py-4">
            <p>هل أنت متأكد من رغبتك في حذف هذا المريض؟ لا يمكن التراجع عن هذا الإجراء.</p>
          </div>
          
          <DialogFooter>
            <Button 
              variant="outline"
              onClick={() => setConfirmDelete(null)}
              className="ml-2"
            >
              إلغاء
            </Button>
            <Button 
              variant="destructive"
              onClick={confirmDeletePatient}
            >
              نعم، حذف
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      <Footer />
    </div>
  );
};

export default SpecialistDashboard;
