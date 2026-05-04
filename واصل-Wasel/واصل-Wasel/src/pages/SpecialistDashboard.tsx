
import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Users, FileText, PlusCircle, X, Edit, Trash, Save, 
  Search, Download, Upload, ChevronDown, FileUp, UserCheck,
  Phone, MessageCircle
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
import { useTranslation } from 'react-i18next';
import { useAuth } from '@/providers/auth-provider';

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

const SpecialistDashboard = () => {
  const { t, i18n } = useTranslation();
  
  const measurementFields: Record<string, MeasurementField[]> = {
    'AFO': [
      { id: 'footLength', label: t('dashboard.measurements.afo.footLength'), unit: t('dashboard.measurements.units.cm') },
      { id: 'footWidth', label: t('dashboard.measurements.afo.footWidth'), unit: t('dashboard.measurements.units.cm') },
      { id: 'ankleCircumference', label: t('dashboard.measurements.afo.ankleCircumference'), unit: t('dashboard.measurements.units.cm') },
      { id: 'calfCircumference', label: t('dashboard.measurements.afo.calfCircumference'), unit: t('dashboard.measurements.units.cm') },
      { id: 'ankleToKnee', label: t('dashboard.measurements.afo.ankleToKnee'), unit: t('dashboard.measurements.units.cm') }
    ],
    'KAFO': [
      { id: 'footLength', label: t('dashboard.measurements.kafo.footLength'), unit: t('dashboard.measurements.units.cm') },
      { id: 'footWidth', label: t('dashboard.measurements.kafo.footWidth'), unit: t('dashboard.measurements.units.cm') },
      { id: 'ankleCircumference', label: t('dashboard.measurements.kafo.ankleCircumference'), unit: t('dashboard.measurements.units.cm') },
      { id: 'calfCircumference', label: t('dashboard.measurements.kafo.calfCircumference'), unit: t('dashboard.measurements.units.cm') },
      { id: 'kneeCircumference', label: t('dashboard.measurements.kafo.kneeCircumference'), unit: t('dashboard.measurements.units.cm') },
      { id: 'thighCircumference', label: t('dashboard.measurements.kafo.thighCircumference'), unit: t('dashboard.measurements.units.cm') },
      { id: 'ankleToKnee', label: t('dashboard.measurements.kafo.ankleToKnee'), unit: t('dashboard.measurements.units.cm') },
      { id: 'kneeToHip', label: t('dashboard.measurements.kafo.kneeToHip'), unit: t('dashboard.measurements.units.cm') }
    ],
    'Below Knee': [
      { id: 'residualLength', label: t('dashboard.measurements.below_knee.residualLength'), unit: t('dashboard.measurements.units.cm') },
      { id: 'residualCircumference', label: t('dashboard.measurements.below_knee.residualCircumference'), unit: t('dashboard.measurements.units.cm') },
      { id: 'kneeCircumference', label: t('dashboard.measurements.below_knee.kneeCircumference'), unit: t('dashboard.measurements.units.cm') },
      { id: 'calfShape', label: t('dashboard.measurements.below_knee.calfShape'), unit: '' },
      { id: 'footSize', label: t('dashboard.measurements.below_knee.footSize'), unit: '' }
    ],
    'Above Knee': [
      { id: 'residualLength', label: t('dashboard.measurements.above_knee.residualLength'), unit: t('dashboard.measurements.units.cm') },
      { id: 'residualCircumference', label: t('dashboard.measurements.above_knee.residualCircumference'), unit: t('dashboard.measurements.units.cm') },
      { id: 'hipCircumference', label: t('dashboard.measurements.above_knee.hipCircumference'), unit: t('dashboard.measurements.units.cm') },
      { id: 'residualShape', label: t('dashboard.measurements.above_knee.residualShape'), unit: '' },
      { id: 'kneeType', label: t('dashboard.measurements.above_knee.kneeType'), unit: '' },
      { id: 'footSize', label: t('dashboard.measurements.above_knee.footSize'), unit: '' }
    ]
  };

  // Status map for internal consistency
  const statusLabels: Record<string, string> = {
    'active': t('dashboard.table.status_active', { defaultValue: 'نشط' }),
    'monitoring': t('dashboard.table.status_monitoring', { defaultValue: 'تحت المراقبة' }),
    'new': t('dashboard.table.status_new', { defaultValue: 'جديد' }),
    'نشط': t('dashboard.table.status_active', { defaultValue: 'نشط' }),
    'تحت المراقبة': t('dashboard.table.status_monitoring', { defaultValue: 'تحت المراقبة' }),
    'جديد': t('dashboard.table.status_new', { defaultValue: 'جديد' })
  };

  // Sample data localized or kept as keys
  const samplePatients: Patient[] = [
    {
      id: 1,
      name: i18n.language === 'ar' ? 'أحمد محمد' : 'Ahmed Mohamed',
      age: 35,
      gender: i18n.language === 'ar' ? 'ذكر' : 'Male',
      phone: '01012345678',
      condition: i18n.language === 'ar' ? 'بتر تحت الركبة - الساق اليمنى' : 'Below Knee Amputation - Right Leg',
      deviceType: 'Below Knee',
      measurements: {
        residualLength: '15',
        residualCircumference: '32',
        kneeCircumference: '38',
        calfShape: i18n.language === 'ar' ? 'مخروطي' : 'Conical',
        footSize: '42'
      },
      status: 'active',
      lastVisit: '2025-02-10',
      nextVisit: '2025-04-10',
      notes: i18n.language === 'ar' ? 'المريض يتقدم بشكل جيد في التأقلم مع الطرف الصناعي. يحتاج إلى متابعة لتعديل السوكيت بعد انخفاض الوزن.' : 'Patient is progressing well in adapting to the prosthesis. Needs follow-up for socket adjustment after weight loss.',
      files: ['report_ahmed.pdf', 'xray_limb.jpg']
    },
    {
      id: 2,
      name: i18n.language === 'ar' ? 'فاطمة خالد' : 'Fatima Khaled',
      age: 28,
      gender: i18n.language === 'ar' ? 'أنثى' : 'Female',
      phone: '01098765432',
      condition: i18n.language === 'ar' ? 'ضعف عضلات القدم والكاحل' : 'Ankle and foot muscle weakness',
      deviceType: 'AFO',
      measurements: {
        footLength: '24',
        footWidth: '9',
        ankleCircumference: '22',
        calfCircumference: '34',
        ankleToKnee: '38'
      },
      status: 'active',
      lastVisit: '2025-01-15',
      nextVisit: '2025-03-15',
      notes: i18n.language === 'ar' ? 'تحسن ملحوظ في المشي بعد استخدام الجبيرة. تحتاج إلى تمارين لتقوية العضلات.' : 'Significant improvement in walking after using the brace. Needs exercises for muscle strengthening.',
      files: ['pt_report_fatima.pdf']
    }
  ];

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
    status: 'new',
    lastVisit: new Date().toISOString().split('T')[0],
    nextVisit: '',
    notes: '',
    files: []
  });
  
  const [searchTerm, setSearchTerm] = useState('');
  const [confirmDeleteId, setConfirmDeleteId] = useState<number | null>(null);
  const [uploadingFile, setUploadingFile] = useState(false);

  const { user, isAuthenticated, isLoading } = useAuth();

  useEffect(() => {
    document.documentElement.dir = i18n.dir();
    
    // Check if user is logged in
    const isSpecialistLegacy = sessionStorage.getItem('isSpecialist') === 'true';
    if (!isLoading && !isAuthenticated && !isSpecialistLegacy) {
      window.location.href = '/login';
      return;
    }

    if (!isLoading && isAuthenticated && user?.role === 'patient') {
      window.location.href = '/dashboard';
      return;
    }
  }, [i18n.language, isAuthenticated, isLoading, user]);

  // Save patients to localStorage when they change
  useEffect(() => {
    localStorage.setItem('patients', JSON.stringify(patients));
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
      status: 'new',
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
    setConfirmDeleteId(id);
  };

  const confirmDeletePatient = () => {
    if (confirmDeleteId) {
      setPatients(patients.filter(patient => patient.id !== confirmDeleteId));
      setConfirmDeleteId(null);
      toast.success(t('dashboard.toasts.delete_success', { defaultValue: 'تم حذف المريض بنجاح' }));
    }
  };

  const handleSavePatient = () => {
    if (!currentPatient.name || !currentPatient.deviceType || !currentPatient.phone) {
      toast.error(t('booking.toasts.fill_fields'));
      return;
    }

    try {
      if (isAddingPatient) {
        setPatients([...patients, currentPatient]);
        toast.success(t('dashboard.toasts.add_success', { defaultValue: 'تمت إضافة المريض بنجاح' }));
        setIsAddingPatient(false);
      } else if (isEditingPatient) {
        setPatients(patients.map(p => p.id === currentPatient.id ? currentPatient : p));
        toast.success(t('dashboard.toasts.update_success', { defaultValue: 'تم تحديث بيانات المريض بنجاح' }));
        setIsEditingPatient(false);
      }
    } catch (error) {
      console.error('Error saving patient:', error);
      toast.error(t('booking.toasts.error'));
    }
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setCurrentPatient({ ...currentPatient, [name]: value });
    
    // Reset measurements if device type changes
    if (name === 'deviceType') {
      setCurrentPatient(prev => ({ 
        ...prev, 
        deviceType: value,
        measurements: {} 
      }));
    }
  };

  const handleMeasurementChange = (id: string, value: string) => {
    setCurrentPatient(prev => ({
      ...prev,
      measurements: {
        ...prev.measurements,
        [id]: value
      }
    }));
  };

  const simulateFileUpload = () => {
    setUploadingFile(true);
    setTimeout(() => {
      const newFile = `File_${Math.floor(Math.random() * 1000)}.pdf`;
      
      if (viewingPatient) {
        const updatedPatient = {
          ...viewingPatient,
          files: [...viewingPatient.files, newFile]
        };
        setViewingPatient(updatedPatient);
        setPatients(patients.map(p => p.id === viewingPatient.id ? updatedPatient : p));
      } else {
        setCurrentPatient(prev => ({
          ...prev,
          files: [...prev.files, newFile]
        }));
      }
      
      setUploadingFile(false);
      toast.success(t('dashboard.dialog.upload_success', { defaultValue: 'تم رفع الملف بنجاح' }));
    }, 1500);
  };

  const handleDownloadFile = (fileName: string) => {
    toast.success(`${t('dashboard.dialog.downloading', { defaultValue: 'جاري تحميل الملف' })}: ${fileName}`);
  };

  const handleDeleteFile = (fileName: string) => {
    if (viewingPatient) {
      const updatedPatient = {
        ...viewingPatient,
        files: viewingPatient.files.filter(f => f !== fileName)
      };
      setViewingPatient(updatedPatient);
      setPatients(patients.map(p => p.id === viewingPatient.id ? updatedPatient : p));
    } else {
      setCurrentPatient(prev => ({
        ...prev,
        files: prev.files.filter(f => f !== fileName)
      }));
    }
    toast.success(t('dashboard.dialog.delete_file_success', { defaultValue: 'تم حذف الملف بنجاح' }));
  };

  const getStatusBadgeClass = (status: string) => {
    const s = status.toLowerCase();
    if (s === 'active' || s === 'نشط') return 'bg-green-100 text-green-800';
    if (s === 'monitoring' || s === 'تحت المراقبة') return 'bg-yellow-100 text-yellow-800';
    return 'bg-blue-100 text-blue-800';
  };

  const translateStatus = (status: string) => {
    if (status === 'active' || status === 'نشط') return t('dashboard.table.status_active', { defaultValue: 'نشط' });
    if (status === 'monitoring' || status === 'تحت المراقبة') return t('dashboard.table.status_monitoring', { defaultValue: 'تحت المراقبة' });
    if (status === 'new' || status === 'جديد') return t('dashboard.table.status_new', { defaultValue: 'جديد' });
    return status;
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <div className="flex-1 bg-gray-50">
        <div className="container mx-auto px-4 py-10">
          <div className="bg-white rounded-lg shadow-md p-6 mb-8">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
              <div>
                <h1 className="text-2xl font-bold text-gray-900">{t('dashboard.title')}</h1>
                <p className="text-gray-600">{t('dashboard.welcome', { name: user?.full_name || sessionStorage.getItem('username') || 'Specialist' })}</p>
              </div>
              <div className="mt-4 md:mt-0">
                <Button onClick={handleAddPatient} className="medical-btn">
                  <PlusCircle className="h-5 w-5 mr-2" />
                  {t('dashboard.add_patient')}
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
                    <div className="text-sm text-gray-500">{t('dashboard.stats.total_patients')}</div>
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
                    <div className="text-sm text-gray-500">{t('dashboard.stats.active_patients')}</div>
                    <div className="text-2xl font-bold">{patients.filter(p => p.status.includes('active') || p.status.includes('نشط')).length}</div>
                  </div>
                </div>
              </div>
              
              <div className="bg-medical-50 rounded-lg p-4 border border-medical-100">
                <div className="flex items-center">
                  <div className="h-12 w-12 rounded-full bg-medical-100 flex items-center justify-center mr-4">
                    <FileText className="h-6 w-6 text-medical-600" />
                  </div>
                  <div>
                    <div className="text-sm text-gray-500">{t('dashboard.stats.prosthetics')}</div>
                    <div className="text-2xl font-bold">{patients.filter(p => p.deviceType.toLowerCase().includes('knee') || p.deviceType.includes('طرف')).length}</div>
                  </div>
                </div>
              </div>
              
              <div className="bg-medical-50 rounded-lg p-4 border border-medical-100">
                <div className="flex items-center">
                  <div className="h-12 w-12 rounded-full bg-medical-100 flex items-center justify-center mr-4">
                    <FileText className="h-6 w-6 text-medical-600" />
                  </div>
                  <div>
                    <div className="text-sm text-gray-500">{t('dashboard.stats.orthoses')}</div>
                    <div className="text-2xl font-bold">{patients.filter(p => p.deviceType.includes('AFO') || p.deviceType.includes('KAFO') || p.deviceType.includes('جبيرة')).length}</div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="mb-6 relative">
              <div className={`absolute inset-y-0 ${i18n.language === 'ar' ? 'right-0 pr-3' : 'left-0 pl-3'} flex items-center pointer-events-none`}>
                <Search className="h-5 w-5 text-gray-400" />
              </div>
              <Input
                type="text"
                placeholder={t('dashboard.search_placeholder')}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className={i18n.language === 'ar' ? "pr-10" : "pl-10"}
              />
            </div>
            
            <Tabs defaultValue="all">
              <TabsList className="grid grid-cols-4 mb-4">
                <TabsTrigger value="all">{t('dashboard.tabs.all')}</TabsTrigger>
                <TabsTrigger value="prosthetics">{t('dashboard.tabs.prosthetics')}</TabsTrigger>
                <TabsTrigger value="orthoses">{t('dashboard.tabs.orthoses')}</TabsTrigger>
                <TabsTrigger value="active">{t('dashboard.tabs.active')}</TabsTrigger>
              </TabsList>
              
              <TabsContent value="all">
                <div className="overflow-x-auto">
                  <Table>
                    <TableCaption>{t('dashboard.table.caption')}</TableCaption>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="text-start">{t('dashboard.table.name')}</TableHead>
                        <TableHead className="text-start">{t('dashboard.table.age')}</TableHead>
                        <TableHead className="text-start">{t('dashboard.table.condition')}</TableHead>
                        <TableHead className="text-start">{t('dashboard.table.device_type')}</TableHead>
                        <TableHead className="text-start">{t('dashboard.table.status')}</TableHead>
                        <TableHead className="text-start">{t('dashboard.table.last_visit')}</TableHead>
                        <TableHead className="text-start">{t('dashboard.table.actions')}</TableHead>
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
                                className={`inline-block px-2 py-1 rounded-full text-xs font-semibold ${getStatusBadgeClass(patient.status)}`}
                              >
                                {translateStatus(patient.status)}
                              </span>
                            </TableCell>
                            <TableCell>{patient.lastVisit}</TableCell>
                            <TableCell>
                              <div className="flex space-x-1 rtl:space-x-reverse">
                                <Button variant="ghost" size="sm" onClick={() => handleViewPatient(patient)} title={t('dashboard.table.view')}>
                                  {t('dashboard.table.view')}
                                </Button>
                                <a href={`https://wa.me/2${patient.phone}`} target="_blank" rel="noopener noreferrer">
                                  <Button variant="ghost" size="sm" className="text-green-600 hover:text-green-700 hover:bg-green-50" title="WhatsApp">
                                    <MessageCircle className="h-4 w-4" />
                                  </Button>
                                </a>
                                <a href={`tel:${patient.phone}`}>
                                  <Button variant="ghost" size="sm" className="text-blue-600 hover:text-blue-700 hover:bg-blue-50" title={t('dashboard.dialog.phone')}>
                                    <Phone className="h-4 w-4" />
                                  </Button>
                                </a>
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
                              <span>{t('dashboard.table.no_patients')}</span>
                            </div>
                          </TableCell>
                        </TableRow>
                      )}
                    </TableBody>
                  </Table>
                </div>
              </TabsContent>
              
              {/* Other Tabs omitted for brevity but they follow the same pattern */}
              <TabsContent value="prosthetics">
                 <div className="overflow-x-auto">
                  <Table>
                    <TableBody>
                      {filteredPatients.filter(p => p.deviceType.toLowerCase().includes('knee') || p.deviceType.includes('طرف')).map(patient => (
                         <TableRow key={patient.id}>
                            <TableCell className="font-medium">{patient.name}</TableCell>
                            <TableCell>{patient.age}</TableCell>
                            <TableCell>{patient.condition}</TableCell>
                            <TableCell>{patient.deviceType}</TableCell>
                            <TableCell>
                              <span className={`inline-block px-2 py-1 rounded-full text-xs font-semibold ${getStatusBadgeClass(patient.status)}`}>
                                {translateStatus(patient.status)}
                              </span>
                            </TableCell>
                            <TableCell>{patient.lastVisit}</TableCell>
                            <TableCell>
                               <div className="flex space-x-2 rtl:space-x-reverse">
                                <Button variant="ghost" size="sm" onClick={() => handleViewPatient(patient)}>{t('dashboard.table.view')}</Button>
                                <Button variant="ghost" size="sm" onClick={() => handleEditPatient(patient)}><Edit className="h-4 w-4" /></Button>
                                <Button variant="ghost" size="sm" onClick={() => handleDeletePatient(patient.id)}><Trash className="h-4 w-4" /></Button>
                              </div>
                            </TableCell>
                         </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                 </div>
              </TabsContent>
              
              <TabsContent value="orthoses">
                <div className="overflow-x-auto">
                  <Table>
                    <TableBody>
                      {filteredPatients.filter(p => p.deviceType.includes('AFO') || p.deviceType.includes('KAFO') || p.deviceType.includes('جبيرة')).map(patient => (
                         <TableRow key={patient.id}>
                            <TableCell className="font-medium">{patient.name}</TableCell>
                            <TableCell>{patient.age}</TableCell>
                            <TableCell>{patient.condition}</TableCell>
                            <TableCell>{patient.deviceType}</TableCell>
                            <TableCell>
                              <span className={`inline-block px-2 py-1 rounded-full text-xs font-semibold ${getStatusBadgeClass(patient.status)}`}>
                                {translateStatus(patient.status)}
                              </span>
                            </TableCell>
                            <TableCell>{patient.lastVisit}</TableCell>
                            <TableCell>
                               <div className="flex space-x-2 rtl:space-x-reverse">
                                <Button variant="ghost" size="sm" onClick={() => handleViewPatient(patient)}>{t('dashboard.table.view')}</Button>
                                <Button variant="ghost" size="sm" onClick={() => handleEditPatient(patient)}><Edit className="h-4 w-4" /></Button>
                                <Button variant="ghost" size="sm" onClick={() => handleDeletePatient(patient.id)}><Trash className="h-4 w-4" /></Button>
                              </div>
                            </TableCell>
                         </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </TabsContent>

              <TabsContent value="active">
                <div className="overflow-x-auto">
                  <Table>
                    <TableBody>
                      {filteredPatients.filter(p => p.status.includes('active') || p.status.includes('نشط')).map(patient => (
                         <TableRow key={patient.id}>
                            <TableCell className="font-medium">{patient.name}</TableCell>
                            <TableCell>{patient.age}</TableCell>
                            <TableCell>{patient.condition}</TableCell>
                            <TableCell>{patient.deviceType}</TableCell>
                            <TableCell>
                              <span className={`inline-block px-2 py-1 rounded-full text-xs font-semibold ${getStatusBadgeClass(patient.status)}`}>
                                {translateStatus(patient.status)}
                              </span>
                            </TableCell>
                            <TableCell>{patient.lastVisit}</TableCell>
                            <TableCell>
                               <div className="flex space-x-2 rtl:space-x-reverse">
                                <Button variant="ghost" size="sm" onClick={() => handleViewPatient(patient)}>{t('dashboard.table.view')}</Button>
                                <Button variant="ghost" size="sm" onClick={() => handleEditPatient(patient)}><Edit className="h-4 w-4" /></Button>
                                <Button variant="ghost" size="sm" onClick={() => handleDeletePatient(patient.id)}><Trash className="h-4 w-4" /></Button>
                              </div>
                            </TableCell>
                         </TableRow>
                      ))}
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
              {isAddingPatient ? t('dashboard.dialog.add_title') : t('dashboard.dialog.edit_title')}
            </DialogTitle>
          </DialogHeader>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-h-[70vh] overflow-y-auto p-1">
            <div className="space-y-4">
              <div>
                <Label htmlFor="name">{t('dashboard.dialog.name')}</Label>
                <Input id="name" name="name" value={currentPatient.name} onChange={handleInputChange} placeholder={t('dashboard.dialog.name_placeholder')} />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="age">{t('dashboard.dialog.age')}</Label>
                  <Input id="age" name="age" type="number" value={currentPatient.age} onChange={handleInputChange} />
                </div>
                <div>
                  <Label htmlFor="gender">{t('dashboard.dialog.gender')}</Label>
                  <select name="gender" value={currentPatient.gender} onChange={handleInputChange} className="w-full rounded-md border p-2">
                    <option value="">{t('nav.select', { defaultValue: 'Select' })}</option>
                    <option value="male">{t('dashboard.dialog.gender_male')}</option>
                    <option value="female">{t('dashboard.dialog.gender_female')}</option>
                  </select>
                </div>
              </div>
              <div>
                <Label htmlFor="phone">{t('dashboard.dialog.phone')}</Label>
                <Input id="phone" name="phone" value={currentPatient.phone} onChange={handleInputChange} placeholder={t('dashboard.dialog.phone_placeholder')} />
              </div>
              <div>
                <Label htmlFor="condition">{t('dashboard.dialog.condition')}</Label>
                <Input id="condition" name="condition" value={currentPatient.condition} onChange={handleInputChange} />
              </div>
              <div>
                <Label htmlFor="deviceType">{t('dashboard.dialog.device_type')}</Label>
                <select name="deviceType" value={currentPatient.deviceType} onChange={handleInputChange} className="w-full rounded-md border p-2">
                  <option value="">{t('nav.select', { defaultValue: 'Select' })}</option>
                  <option value="AFO">AFO</option>
                  <option value="KAFO">KAFO</option>
                  <option value="Below Knee">Below Knee</option>
                  <option value="Above Knee">Above Knee</option>
                </select>
              </div>
            </div>
            
            <div className="space-y-4">
               {currentPatient.deviceType && measurementFields[currentPatient.deviceType] && (
                <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
                  <h3 className="font-semibold mb-3">{t('dashboard.dialog.measurements', { defaultValue: 'القياسات' })}</h3>
                  <div className="grid grid-cols-1 gap-3">
                    {measurementFields[currentPatient.deviceType].map(field => (
                      <div key={field.id}>
                        <Label htmlFor={field.id}>{field.label} {field.unit ? `(${field.unit})` : ''}</Label>
                        <Input 
                          id={field.id} 
                          value={currentPatient.measurements[field.id] || ''} 
                          onChange={(e) => handleMeasurementChange(field.id, e.target.value)}
                        />
                      </div>
                    ))}
                  </div>
                </div>
              )}
              <div>
                <Label htmlFor="status">{t('dashboard.dialog.status')}</Label>
                <select name="status" value={currentPatient.status} onChange={handleInputChange} className="w-full rounded-md border p-2">
                  <option value="new">{t('dashboard.table.status_new')}</option>
                  <option value="active">{t('dashboard.table.status_active')}</option>
                  <option value="monitoring">{t('dashboard.table.status_monitoring')}</option>
                </select>
              </div>
              <div>
                <Label htmlFor="nextVisit">{t('dashboard.dialog.next_visit')}</Label>
                <Input id="nextVisit" name="nextVisit" type="date" value={currentPatient.nextVisit} onChange={handleInputChange} />
              </div>
            </div>
          </div>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => { setIsAddingPatient(false); setIsEditingPatient(false); }}>{t('dashboard.dialog.cancel')}</Button>
            <Button onClick={handleSavePatient}>{t('dashboard.dialog.save')}</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Viewing Patient Details Dialog */}
      <Dialog open={!!viewingPatient} onOpenChange={(open) => !open && setViewingPatient(null)}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          {viewingPatient && (
            <>
              <DialogHeader>
                <DialogTitle className="text-2xl flex items-center">
                  <Users className="h-6 w-6 mr-2 text-medical-600" />
                  {viewingPatient.name}
                </DialogTitle>
                <DialogDescription>
                  {t('dashboard.table.id') || 'ID'}: {viewingPatient.id} | {viewingPatient.age} {t('dashboard.table.years') || 'سنة'} | {viewingPatient.gender}
                </DialogDescription>
              </DialogHeader>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-4">
                <div className="md:col-span-2 space-y-6">
                   <div className="bg-white p-4 rounded-lg border border-gray-200">
                    <h3 className="font-bold border-b pb-2 mb-3">{t('dashboard.dialog.condition')}</h3>
                    <p>{viewingPatient.condition}</p>
                  </div>

                  <div className="bg-white p-4 rounded-lg border border-gray-200">
                    <h3 className="font-bold border-b pb-2 mb-3">{t('dashboard.dialog.notes')}</h3>
                    <p className="whitespace-pre-wrap">{viewingPatient.notes || t('dashboard.dialog.no_notes', { defaultValue: 'لا توجد ملاحظات' })}</p>
                  </div>

                  {viewingPatient.deviceType && measurementFields[viewingPatient.deviceType] && (
                    <div className="bg-white p-4 rounded-lg border border-gray-200">
                      <h3 className="font-bold border-b pb-2 mb-3">{t('dashboard.dialog.measurements', { defaultValue: 'القياسات' })} - {viewingPatient.deviceType}</h3>
                      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                        {measurementFields[viewingPatient.deviceType].map(field => (
                          <div key={field.id} className="bg-gray-50 p-2 rounded">
                            <div className="text-xs text-gray-500">{field.label}</div>
                            <div className="font-semibold">{viewingPatient.measurements[field.id] || '-'} {field.unit}</div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                <div className="space-y-6">
                   <div className="bg-medical-50 p-4 rounded-lg border border-medical-100">
                    <h3 className="font-bold mb-3">{t('dashboard.dialog.files')}</h3>
                    <div className="space-y-2">
                      {viewingPatient.files.map((file, idx) => (
                        <div key={idx} className="flex items-center justify-between bg-white p-2 rounded border border-gray-100">
                          <span className="text-sm truncate mr-2" title={file}>{file}</span>
                          <div className="flex">
                            <button onClick={() => handleDownloadFile(file)} className="p-1 text-blue-600 hover:bg-blue-50 rounded"><Download className="h-4 w-4" /></button>
                            <button onClick={() => handleDeleteFile(file)} className="p-1 text-red-600 hover:bg-red-50 rounded"><Trash className="h-4 w-4" /></button>
                          </div>
                        </div>
                      ))}
                      <Button variant="outline" size="sm" className="w-full mt-2" onClick={simulateFileUpload} disabled={uploadingFile}>
                        {uploadingFile ? t('booking.nav.sending') : t('dashboard.dialog.upload')}
                        <FileUp className="h-4 w-4 ml-2" />
                      </Button>
                    </div>
                  </div>

                  <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                     <div className="space-y-3">
                        <div><span className="text-gray-500 text-sm">{t('dashboard.table.last_visit')}:</span><div className="font-medium">{viewingPatient.lastVisit}</div></div>
                        <div><span className="text-gray-500 text-sm">{t('dashboard.table.next_visit')}:</span><div className="font-medium">{viewingPatient.nextVisit || '-'}</div></div>
                        <div><span className="text-gray-500 text-sm">{t('dashboard.dialog.phone')}:</span><div className="font-medium">{viewingPatient.phone}</div></div>
                     </div>
                  </div>

                  {/* Quick Contact Buttons */}
                  <div className="space-y-2 mt-4">
                    <a href={`https://wa.me/2${viewingPatient.phone}`} target="_blank" rel="noopener noreferrer" className="block">
                      <Button className="w-full bg-green-600 hover:bg-green-700 text-white rounded-lg">
                        <MessageCircle className="h-4 w-4 me-2" />
                        {i18n.language === 'ar' ? 'تواصل واتساب' : 'WhatsApp'}
                      </Button>
                    </a>
                    <a href={`tel:${viewingPatient.phone}`} className="block">
                      <Button variant="outline" className="w-full border-blue-200 text-blue-700 hover:bg-blue-50 rounded-lg">
                        <Phone className="h-4 w-4 me-2" />
                        {i18n.language === 'ar' ? 'اتصال هاتفي' : 'Phone Call'}
                      </Button>
                    </a>
                  </div>
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <Dialog open={confirmDeleteId !== null} onOpenChange={(open) => !open && setConfirmDeleteId(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{t('dashboard.dialog.confirm_delete_title', { defaultValue: 'تأكيد الحذف' })}</DialogTitle>
            <DialogDescription>
              {t('dashboard.dialog.confirm_delete')}
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setConfirmDeleteId(null)}>{t('dashboard.dialog.cancel')}</Button>
            <Button variant="destructive" onClick={confirmDeletePatient}>{t('dashboard.table.delete')}</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Footer />
    </div>
  );
};

export default SpecialistDashboard;
