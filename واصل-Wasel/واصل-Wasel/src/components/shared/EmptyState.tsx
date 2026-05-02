import React from 'react';
import { motion } from 'framer-motion';
import { Search, Calendar, FileText, ShieldCheck, Package } from 'lucide-react';
import { useTranslation } from 'react-i18next';

interface EmptyStateProps {
  type?: 'no-results' | 'no-bookings' | 'no-insurance' | 'no-devices' | 'no-data';
  title?: string;
  description?: string;
  action?: {
    label: string;
    onClick: () => void;
  };
  className?: string;
}

const icons = {
  'no-results': Search,
  'no-bookings': Calendar,
  'no-insurance': ShieldCheck,
  'no-devices': Package,
  'no-data': FileText,
};

const EmptyState: React.FC<EmptyStateProps> = ({
  type = 'no-data',
  title,
  description,
  action,
  className = '',
}) => {
  const { t } = useTranslation();
  const Icon = icons[type];

  const defaultTitles: Record<string, string> = {
    'no-results': 'لا توجد نتائج',
    'no-bookings': 'لا توجد حجوزات',
    'no-insurance': 'لا توجد طلبات تأمين',
    'no-devices': 'لا توجد أجهزة',
    'no-data': 'لا توجد بيانات',
  };

  const defaultDescriptions: Record<string, string> = {
    'no-results': 'جرب تغيير معايير البحث',
    'no-bookings': 'لم تقم بحجز أي مواعيد بعد',
    'no-insurance': 'لم تقدم أي طلبات تأمين بعد',
    'no-devices': 'لا تتوفر أجهزة حالياً',
    'no-data': 'لا تتوفر بيانات للعرض',
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={`flex flex-col items-center justify-center py-16 px-6 text-center ${className}`}
    >
      <div className="w-20 h-20 rounded-2xl bg-medical-50 flex items-center justify-center mb-6">
        <Icon className="w-10 h-10 text-medical-400" />
      </div>
      <h3 className="text-xl font-bold text-gray-700 mb-2">
        {title || defaultTitles[type]}
      </h3>
      <p className="text-gray-500 max-w-md mb-6">
        {description || defaultDescriptions[type]}
      </p>
      {action && (
        <button
          onClick={action.onClick}
          className="px-6 py-3 bg-medical-600 text-white rounded-xl font-semibold hover:bg-medical-700 transition-colors shadow-lg shadow-medical-600/20"
        >
          {action.label}
        </button>
      )}
    </motion.div>
  );
};

export default EmptyState;
