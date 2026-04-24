import React, { useState } from 'react';
import { EducationalContent } from '@/types';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select } from '@/components/ui/select';
import { Card } from '@/components/ui/card';
import { toast } from '@/hooks/use-toast';

interface EducationalContentManagementProps {
  content: EducationalContent[];
  onAddContent: (content: EducationalContent) => void;
  onUpdateContent: (content: EducationalContent) => void;
  onDeleteContent: (contentId: number) => void;
}

const EducationalContentManagement: React.FC<EducationalContentManagementProps> = ({
  content,
  onAddContent,
  onUpdateContent,
  onDeleteContent,
}) => {
  const [selectedContent, setSelectedContent] = useState<EducationalContent | null>(null);
  const [isEditing, setIsEditing] = useState(false);

  const initialContentState: EducationalContent = {
    id: Date.now(),
    title: '',
    category: 'article',
    content: '',
    mediaUrl: '',
    tags: [],
    publishDate: new Date().toISOString().split('T')[0],
    author: localStorage.getItem('username') || '',
  };

  const [formData, setFormData] = useState<EducationalContent>(initialContentState);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'tags' ? value.split(',').map(tag => tag.trim()) : value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isEditing && selectedContent) {
      onUpdateContent({ ...formData, id: selectedContent.id });
      toast.success('تم تحديث المحتوى التعليمي بنجاح');
    } else {
      onAddContent(formData);
      toast.success('تمت إضافة المحتوى التعليمي بنجاح');
    }
    resetForm();
  };

  const resetForm = () => {
    setFormData(initialContentState);
    setSelectedContent(null);
    setIsEditing(false);
  };

  const handleEdit = (content: EducationalContent) => {
    setSelectedContent(content);
    setFormData(content);
    setIsEditing(true);
  };

  const handleDelete = (contentId: number) => {
    if (window.confirm('هل أنت متأكد من حذف هذا المحتوى؟')) {
      onDeleteContent(contentId);
      toast.success('تم حذف المحتوى بنجاح');
      resetForm();
    }
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">إدارة المحتوى التعليمي</h2>
        <Button
          onClick={() => setIsEditing(false)}
          className="medical-btn"
          disabled={isEditing}
        >
          إضافة محتوى جديد
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Content Form */}
        <Card className="p-6">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label htmlFor="title">عنوان المحتوى</Label>
              <Input
                id="title"
                name="title"
                value={formData.title}
                onChange={handleInputChange}
                required
              />
            </div>

            <div>
              <Label htmlFor="category">نوع المحتوى</Label>
              <Select
                name="category"
                value={formData.category}
                onValueChange={(value) => handleInputChange({ target: { name: 'category', value } } as any)}
                required
              >
                <option value="video">فيديو تعليمي</option>
                <option value="article">مقال</option>
                <option value="exercise">تمارين</option>
                <option value="faq">أسئلة شائعة</option>
              </Select>
            </div>

            <div>
              <Label htmlFor="content">المحتوى</Label>
              <Textarea
                id="content"
                name="content"
                value={formData.content}
                onChange={handleInputChange}
                rows={6}
                required
              />
            </div>

            <div>
              <Label htmlFor="mediaUrl">رابط الوسائط (إن وجد)</Label>
              <Input
                id="mediaUrl"
                name="mediaUrl"
                value={formData.mediaUrl}
                onChange={handleInputChange}
                placeholder="رابط الفيديو أو الصورة"
              />
            </div>

            <div>
              <Label htmlFor="tags">الوسوم (مفصولة بفواصل)</Label>
              <Input
                id="tags"
                name="tags"
                value={formData.tags.join(', ')}
                onChange={handleInputChange}
                placeholder="جبائر, أطراف صناعية, تمارين"
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

        {/* Content List */}
        <Card className="p-6">
          <h3 className="text-xl font-semibold mb-4">قائمة المحتوى التعليمي</h3>
          <div className="space-y-4">
            {content.map((item) => (
              <div
                key={item.id}
                className="border rounded-lg p-4 hover:bg-gray-50 transition-colors"
              >
                <div className="flex justify-between items-start">
                  <div>
                    <h4 className="font-semibold">{item.title}</h4>
                    <p className="text-sm text-gray-600">
                      {item.category === 'video' ? 'فيديو تعليمي' :
                       item.category === 'article' ? 'مقال' :
                       item.category === 'exercise' ? 'تمارين' : 'أسئلة شائعة'}
                    </p>
                    <div className="mt-2 flex flex-wrap gap-1">
                      {item.tags.map((tag, index) => (
                        <span
                          key={index}
                          className="inline-block px-2 py-1 rounded-full text-xs bg-gray-100 text-gray-800"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                    <p className="text-xs text-gray-500 mt-2">
                      نشر في {new Date(item.publishDate).toLocaleDateString('ar-EG')}
                      {' '}بواسطة {item.author}
                    </p>
                  </div>
                  <div className="flex space-x-2 rtl:space-x-reverse">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleEdit(item)}
                    >
                      تعديل
                    </Button>
                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={() => handleDelete(item.id)}
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

export default EducationalContentManagement;