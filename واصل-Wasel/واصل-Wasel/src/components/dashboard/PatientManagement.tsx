import React, { useState } from 'react';
import { Patient, PatientStatus, Appointment, MedicalRecord } from '@/types';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select } from '@/components/ui/select';
import { Card } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Calendar } from '@/components/ui/calendar';
import { toast } from '@/hooks/use-toast';
import { format } from 'date-fns';
import { ar } from 'date-fns/locale';

interface PatientManagementProps {
  patients: Patient[];
  onAddPatient: (patient: Patient) => void;
  onUpdatePatient: (patient: Patient) => void;
  onDeletePatient: (patientId: number) => void;
}

const PatientManagement: React.FC<PatientManagementProps> = ({
  patients,
  onAddPatient,
  onUpdatePatient,
  onDeletePatient,
}) => {
  const [selectedPatient, setSelectedPatient] = useState<Patient | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [activeTab, setActiveTab] = useState('info');

  const initialPatientState: Patient = {
    id: Date.now(),
    name: '',
    age: 0,
    gender: '',
    phone: '',
    email: '',
    condition: '',
    deviceType: '',
    measurements: {},
    status: 'جديد',
    lastVisit: format(new Date(), 'yyyy-MM-dd'),
    nextVisit: '',
    notes: '',
    files: [],
    medicalHistory: [],
    appointments: [],
    maintenanceRecords: [],
    evaluations: [],
  };

  const [formData, setFormData] = useState<Patient>(initialPatientState);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isEditing && selectedPatient) {
      onUpdatePatient({ ...formData, id: selectedPatient.id });
      toast.success('تم تحديث بيانات المريض بنجاح');
    } else {
      onAddPatient(formData);
      toast.success('تمت إضافة المريض بنجاح');
    }
    resetForm();
  };

  const resetForm = () => {
    setFormData(initialPatientState);
    setSelectedPatient(null);
    setIsEditing(false);
    setActiveTab('info');
  };

  const handleEdit = (patient: Patient) => {
    setSelectedPatient(patient);
    setFormData(patient);
    setIsEditing(true);
  };

  const handleDelete = (patientId: number) => {
    if (window.confirm('هل أنت متأكد من حذف هذا المريض؟')) {
      onDeletePatient(patientId);
      toast.success('تم حذف المريض بنجاح');
      resetForm();
    }
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">إدارة المرضى</h2>
        <Button
          onClick={() => setIsEditing(false)}
          className="medical-btn"
          disabled={isEditing}
        >
          إضافة مريض جديد
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Patient Form */}
        <Card className="p-6">
          <form onSubmit={handleSubmit} className="space-y-4">
            <Tabs value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="info">معلومات أساسية</TabsTrigger>
                <TabsTrigger value="medical">معلومات طبية</TabsTrigger>
                <TabsTrigger value="device">الجهاز</TabsTrigger>
                <TabsTrigger value="appointments">المواعيد</TabsTrigger>
              </TabsList>

              <TabsContent value="info" className="space-y-4">
                <div>
                  <Label htmlFor="name">اسم المريض</Label>
                  <Input
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
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
                      value={formData.age}
                      onChange={handleInputChange}
                      required
                    />
                  </div>

                  <div>
                    <Label htmlFor="gender">الجنس</Label>
                    <Select
                      name="gender"
                      value={formData.gender}
                      onValueChange={(value) => handleInputChange({ target: { name: 'gender', value } } as any)}
                    >
                      <option value="">اختر الجنس</option>
                      <option value="ذكر">ذكر</option>
                      <option value="أنثى">أنثى</option>
                    </Select>
                  </div>
                </div>

                <div>
                  <Label htmlFor="phone">رقم الهاتف</Label>
                  <Input
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="email">البريد الإلكتروني</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleInputChange}
                  />
                </div>
              </TabsContent>

              <TabsContent value="medical" className="space-y-4">
                <div>
                  <Label htmlFor="condition">الحالة المرضية</Label>
                  <Textarea
                    id="condition"
                    name="condition"
                    value={formData.condition}
                    onChange={handleInputChange}
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="status">حالة المريض</Label>
                  <Select
                    name="status"
                    value={formData.status}
                    onValueChange={(value) => handleInputChange({ target: { name: 'status', value } } as any)}
                  >
                    <option value="جديد">جديد</option>
                    <option value="قيد المتابعة">قيد المتابعة</option>
                    <option value="مكتمل">مكتمل</option>
                    <option value="متوقف">متوقف</option>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="notes">ملاحظات</Label>
                  <Textarea
                    id="notes"
                    name="notes"
                    value={formData.notes}
                    onChange={handleInputChange}
                  />
                </div>
              </TabsContent>

              <TabsContent value="device" className="space-y-4">
                <div>
                  <Label htmlFor="deviceType">نوع الجهاز</Label>
                  <Select
                    name="deviceType"
                    value={formData.deviceType}
                    onValueChange={(value) => handleInputChange({ target: { name: 'deviceType', value } } as any)}
                  >
                    <option value="">اختر نوع الجهاز</option>
                    <option value="جبيرة">جبيرة</option>
                    <option value="طرف صناعي">طرف صناعي</option>
                  </Select>
                </div>

                {/* Add more device-related fields as needed */}
              </TabsContent>

              <TabsContent value="appointments" className="space-y-4">
                <div>
                  <Label>آخر زيارة</Label>
                  <Input
                    type="date"
                    name="lastVisit"
                    value={formData.lastVisit}
                    onChange={handleInputChange}
                  />
                </div>

                <div>
                  <Label>الزيارة القادمة</Label>
                  <Input
                    type="date"
                    name="nextVisit"
                    value={formData.nextVisit}
                    onChange={handleInputChange}
                  />
                </div>
              </TabsContent>
            </Tabs>

            <div className="flex justify-end space-x-2 rtl:space-x-reverse">
              <Button type="button" variant="outline" onClick={resetForm}>
                إلغاء
              </Button>
              <Button type="submit" className="medical-btn">
                {isEditing ? 'تحديث' : 'إضافة'}
              </Button>
            </div>
          </form>
        </Card>

        {/* Patients List */}
        <Card className="p-6">
          <h3 className="text-xl font-semibold mb-4">قائمة المرضى</h3>
          <div className="space-y-4">
            {patients.map((patient) => (
              <div
                key={patient.id}
                className="border rounded-lg p-4 hover:bg-gray-50 transition-colors"
              >
                <div className="flex justify-between items-start">
                  <div>
                    <h4 className="font-semibold">{patient.name}</h4>
                    <p className="text-sm text-gray-600">{patient.phone}</p>
                    <p className="text-sm text-gray-600">الجهاز: {patient.deviceType}</p>
                    <div className="mt-2">
                      <span className={`inline-block px-2 py-1 rounded-full text-xs ${
                        patient.status === 'جديد' ? 'bg-blue-100 text-blue-800' :
                        patient.status === 'قيد المتابعة' ? 'bg-yellow-100 text-yellow-800' :
                        patient.status === 'مكتمل' ? 'bg-green-100 text-green-800' :
                        'bg-gray-100 text-gray-800'
                      }`}>
                        {patient.status}
                      </span>
                    </div>
                  </div>
                  <div className="flex space-x-2 rtl:space-x-reverse">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleEdit(patient)}
                    >
                      تعديل
                    </Button>
                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={() => handleDelete(patient.id)}
                    >
                      حذف
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
};

export default PatientManagement;