import React, { useState } from 'react';
import { Device } from '@/types';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select } from '@/components/ui/select';
import { Card } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { toast } from '@/hooks/use-toast';

interface DeviceManagementProps {
  devices: Device[];
  onAddDevice: (device: Device) => void;
  onUpdateDevice: (device: Device) => void;
  onDeleteDevice: (deviceId: number) => void;
}

const DeviceManagement: React.FC<DeviceManagementProps> = ({
  devices,
  onAddDevice,
  onUpdateDevice,
  onDeleteDevice,
}) => {
  const [selectedDevice, setSelectedDevice] = useState<Device | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [activeTab, setActiveTab] = useState('info');

  const initialDeviceState: Device = {
    id: Date.now(),
    name: '',
    category: 'orthoses',
    description: '',
    specifications: {},
    images: [],
    instructions: '',
    maintenanceGuide: '',
    price: 0,
    available: true,
  };

  const [formData, setFormData] = useState<Device>(initialDeviceState);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'price' ? parseFloat(value) : value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isEditing && selectedDevice) {
      onUpdateDevice({ ...formData, id: selectedDevice.id });
      toast.success('تم تحديث بيانات الجهاز بنجاح');
    } else {
      onAddDevice(formData);
      toast.success('تمت إضافة الجهاز بنجاح');
    }
    resetForm();
  };

  const resetForm = () => {
    setFormData(initialDeviceState);
    setSelectedDevice(null);
    setIsEditing(false);
    setActiveTab('info');
  };

  const handleEdit = (device: Device) => {
    setSelectedDevice(device);
    setFormData(device);
    setIsEditing(true);
  };

  const handleDelete = (deviceId: number) => {
    if (window.confirm('هل أنت متأكد من حذف هذا الجهاز؟')) {
      onDeleteDevice(deviceId);
      toast.success('تم حذف الجهاز بنجاح');
      resetForm();
    }
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">إدارة الأجهزة الطبية</h2>
        <Button
          onClick={() => setIsEditing(false)}
          className="medical-btn"
          disabled={isEditing}
        >
          إضافة جهاز جديد
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Device Form */}
        <Card className="p-6">
          <form onSubmit={handleSubmit} className="space-y-4">
            <Tabs value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="info">معلومات أساسية</TabsTrigger>
                <TabsTrigger value="specs">المواصفات</TabsTrigger>
                <TabsTrigger value="maintenance">الصيانة</TabsTrigger>
              </TabsList>

              <TabsContent value="info" className="space-y-4">
                <div>
                  <Label htmlFor="name">اسم الجهاز</Label>
                  <Input
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="category">الفئة</Label>
                  <Select
                    name="category"
                    value={formData.category}
                    onValueChange={(value) => handleInputChange({ target: { name: 'category', value } } as any)}
                  >
                    <option value="orthoses">جبائر طبية</option>
                    <option value="prosthetics">أطراف صناعية</option>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="description">الوصف</Label>
                  <Textarea
                    id="description"
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="price">السعر</Label>
                  <Input
                    id="price"
                    name="price"
                    type="number"
                    value={formData.price}
                    onChange={handleInputChange}
                    required
                  />
                </div>

                <div className="flex items-center space-x-2 rtl:space-x-reverse">
                  <input
                    type="checkbox"
                    id="available"
                    name="available"
                    checked={formData.available}
                    onChange={(e) => handleInputChange({ target: { name: 'available', value: e.target.checked } } as any)}
                    className="h-4 w-4"
                  />
                  <Label htmlFor="available">متوفر</Label>
                </div>
              </TabsContent>

              <TabsContent value="specs" className="space-y-4">
                <div>
                  <Label htmlFor="specifications">المواصفات التقنية</Label>
                  <Textarea
                    id="specifications"
                    name="specifications"
                    value={JSON.stringify(formData.specifications, null, 2)}
                    onChange={(e) => {
                      try {
                        const specs = JSON.parse(e.target.value);
                        handleInputChange({ target: { name: 'specifications', value: specs } } as any);
                      } catch (error) {
                        // Handle invalid JSON
                      }
                    }}
                    placeholder="{
  \"المقاس\": \"متوسط\",
  \"المواد\": \"ألياف كربون\",
  \"الوزن\": \"500 جرام\"
}"
                    className="font-mono"
                    rows={10}
                  />
                </div>
              </TabsContent>

              <TabsContent value="maintenance" className="space-y-4">
                <div>
                  <Label htmlFor="instructions">تعليمات الاستخدام</Label>
                  <Textarea
                    id="instructions"
                    name="instructions"
                    value={formData.instructions}
                    onChange={handleInputChange}
                    rows={5}
                  />
                </div>

                <div>
                  <Label htmlFor="maintenanceGuide">دليل الصيانة</Label>
                  <Textarea
                    id="maintenanceGuide"
                    name="maintenanceGuide"
                    value={formData.maintenanceGuide}
                    onChange={handleInputChange}
                    rows={5}
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

        {/* Devices List */}
        <Card className="p-6">
          <h3 className="text-xl font-semibold mb-4">قائمة الأجهزة</h3>
          <div className="space-y-4">
            {devices.map((device) => (
              <div
                key={device.id}
                className="border rounded-lg p-4 hover:bg-gray-50 transition-colors"
              >
                <div className="flex justify-between items-start">
                  <div>
                    <h4 className="font-semibold">{device.name}</h4>
                    <p className="text-sm text-gray-600">
                      {device.category === 'orthoses' ? 'جبائر طبية' : 'أطراف صناعية'}
                    </p>
                    <p className="text-sm text-gray-600">السعر: {device.price} جنيه</p>
                    <div className="mt-2">
                      <span
                        className={`inline-block px-2 py-1 rounded-full text-xs ${
                          device.available
                            ? 'bg-green-100 text-green-800'
                            : 'bg-red-100 text-red-800'
                        }`}
                      >
                        {device.available ? 'متوفر' : 'غير متوفر'}
                      </span>
                    </div>
                  </div>
                  <div className="flex space-x-2 rtl:space-x-reverse">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleEdit(device)}
                    >
                      تعديل
                    </Button>
                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={() => handleDelete(device.id)}
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

export default DeviceManagement;