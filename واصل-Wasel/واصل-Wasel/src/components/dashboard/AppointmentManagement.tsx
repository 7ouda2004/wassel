import React, { useState } from 'react';
import { Appointment, AppointmentType, AppointmentStatus, Patient } from '@/types';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select } from '@/components/ui/select';
import { Card } from '@/components/ui/card';
import { Calendar } from '@/components/ui/calendar';
import { toast } from '@/hooks/use-toast';
import { format } from 'date-fns';
import { ar } from 'date-fns/locale';

interface AppointmentManagementProps {
  appointments: Appointment[];
  patients: Patient[];
  onAddAppointment: (appointment: Appointment) => void;
  onUpdateAppointment: (appointment: Appointment) => void;
  onDeleteAppointment: (appointmentId: number) => void;
}

const AppointmentManagement: React.FC<AppointmentManagementProps> = ({
  appointments,
  patients,
  onAddAppointment,
  onUpdateAppointment,
  onDeleteAppointment,
}) => {
  const [selectedAppointment, setSelectedAppointment] = useState<Appointment | null>(null);
  const [isEditing, setIsEditing] = useState(false);

  const initialAppointmentState: Appointment = {
    id: Date.now(),
    patientId: 0,
    date: format(new Date(), 'yyyy-MM-dd'),
    time: '09:00',
    type: 'معاينة',
    status: 'قيد الانتظار',
    notes: '',
  };

  const [formData, setFormData] = useState<Appointment>(initialAppointmentState);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isEditing && selectedAppointment) {
      onUpdateAppointment({ ...formData, id: selectedAppointment.id });
      toast.success('تم تحديث الموعد بنجاح');
    } else {
      onAddAppointment(formData);
      toast.success('تمت إضافة الموعد بنجاح');
    }
    resetForm();
  };

  const resetForm = () => {
    setFormData(initialAppointmentState);
    setSelectedAppointment(null);
    setIsEditing(false);
  };

  const handleEdit = (appointment: Appointment) => {
    setSelectedAppointment(appointment);
    setFormData(appointment);
    setIsEditing(true);
  };

  const handleDelete = (appointmentId: number) => {
    if (window.confirm('هل أنت متأكد من حذف هذا الموعد؟')) {
      onDeleteAppointment(appointmentId);
      toast.success('تم حذف الموعد بنجاح');
      resetForm();
    }
  };

  const getPatientName = (patientId: number) => {
    const patient = patients.find(p => p.id === patientId);
    return patient ? patient.name : 'غير معروف';
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">إدارة المواعيد</h2>
        <Button
          onClick={() => setIsEditing(false)}
          className="medical-btn"
          disabled={isEditing}
        >
          إضافة موعد جديد
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Appointment Form */}
        <Card className="p-6">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label htmlFor="patientId">المريض</Label>
              <Select
                name="patientId"
                value={formData.patientId.toString()}
                onValueChange={(value) => handleInputChange({ target: { name: 'patientId', value } } as any)}
                required
              >
                <option value="">اختر المريض</option>
                {patients.map((patient) => (
                  <option key={patient.id} value={patient.id}>
                    {patient.name}
                  </option>
                ))}
              </Select>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="date">التاريخ</Label>
                <Input
                  id="date"
                  name="date"
                  type="date"
                  value={formData.date}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div>
                <Label htmlFor="time">الوقت</Label>
                <Input
                  id="time"
                  name="time"
                  type="time"
                  value={formData.time}
                  onChange={handleInputChange}
                  required
                />
              </div>
            </div>

            <div>
              <Label htmlFor="type">نوع الموعد</Label>
              <Select
                name="type"
                value={formData.type}
                onValueChange={(value) => handleInputChange({ target: { name: 'type', value } } as any)}
                required
              >
                <option value="معاينة">معاينة</option>
                <option value="قياس">قياس</option>
                <option value="تركيب">تركيب</option>
                <option value="متابعة">متابعة</option>
                <option value="صيانة">صيانة</option>
              </Select>
            </div>

            <div>
              <Label htmlFor="status">حالة الموعد</Label>
              <Select
                name="status"
                value={formData.status}
                onValueChange={(value) => handleInputChange({ target: { name: 'status', value } } as any)}
                required
              >
                <option value="قيد الانتظار">قيد الانتظار</option>
                <option value="مؤكد">مؤكد</option>
                <option value="مكتمل">مكتمل</option>
                <option value="ملغي">ملغي</option>
              </Select>
            </div>

            <div>
              <Label htmlFor="notes">ملاحظات</Label>
              <Textarea
                id="notes"
                name="notes"
                value={formData.notes}
                onChange={handleInputChange}
                rows={3}
              />
            </div>

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

        {/* Appointments List */}
        <Card className="p-6">
          <h3 className="text-xl font-semibold mb-4">قائمة المواعيد</h3>
          <div className="space-y-4">
            {appointments.map((appointment) => (
              <div
                key={appointment.id}
                className="border rounded-lg p-4 hover:bg-gray-50 transition-colors"
              >
                <div className="flex justify-between items-start">
                  <div>
                    <h4 className="font-semibold">{getPatientName(appointment.patientId)}</h4>
                    <p className="text-sm text-gray-600">
                      {format(new Date(appointment.date), 'dd/MM/yyyy', { locale: ar })} - {appointment.time}
                    </p>
                    <p className="text-sm text-gray-600">نوع الموعد: {appointment.type}</p>
                    <div className="mt-2">
                      <span className={`inline-block px-2 py-1 rounded-full text-xs ${
                        appointment.status === 'مؤكد' ? 'bg-green-100 text-green-800' :
                        appointment.status === 'قيد الانتظار' ? 'bg-yellow-100 text-yellow-800' :
                        appointment.status === 'مكتمل' ? 'bg-blue-100 text-blue-800' :
                        'bg-red-100 text-red-800'
                      }`}>
                        {appointment.status}
                      </span>
                    </div>
                  </div>
                  <div className="flex space-x-2 rtl:space-x-reverse">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleEdit(appointment)}
                    >
                      تعديل
                    </Button>
                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={() => handleDelete(appointment.id)}
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

export default AppointmentManagement;