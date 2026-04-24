import FileUpload from '@/components/ui/file-upload';

// داخل المكون الخاص بك
const handleFileSelect = (file: File) => {
  // يمكنك هنا التعامل مع الملف المرفوع
  console.log('Selected file:', file);
  
  // مثال على قراءة الملف كـ URL
  const fileUrl = URL.createObjectURL(file);
  
  // يمكنك تخزين الملف في state
  // أو إرساله إلى الخادم
  // أو عرضه في الصفحة
};

// في JSX
<FileUpload 
  onFileSelect={handleFileSelect}
  accept="image/*,application/pdf"
  label="رفع مستندات طبية"
/>