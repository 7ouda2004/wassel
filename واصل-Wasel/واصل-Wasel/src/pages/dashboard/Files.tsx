import FileManager from '@/components/dashboard/FileManager';

const FilesPage = () => {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">إدارة الملفات</h1>
      <FileManager />
    </div>
  );
};

export default FilesPage;