// Patient Types
export interface Patient {
  id: number;
  name: string;
  age: number;
  gender: string;
  phone: string;
  email?: string;
  condition: string;
  deviceType: string;
  measurements: Record<string, any>;
  status: PatientStatus;
  lastVisit: string;
  nextVisit: string;
  notes: string;
  files: PatientFile[];
  medicalHistory: MedicalRecord[];
  appointments: Appointment[];
  maintenanceRecords: MaintenanceRecord[];
  evaluations: Evaluation[];
}

export type PatientStatus = 'جديد' | 'قيد المتابعة' | 'مكتمل' | 'متوقف';

export interface PatientFile {
  id: number;
  name: string;
  type: string;
  url: string;
  uploadDate: string;
}

export interface MedicalRecord {
  id: number;
  date: string;
  diagnosis: string;
  treatment: string;
  notes: string;
  attachments: PatientFile[];
}

// Device Types
export interface Device {
  id: number;
  name: string;
  category: 'orthoses' | 'prosthetics';
  description: string;
  specifications: Record<string, any>;
  images: string[];
  instructions: string;
  maintenanceGuide: string;
  price: number;
  available: boolean;
}

// Appointment Types
export interface Appointment {
  id: number;
  patientId: number;
  date: string;
  time: string;
  type: AppointmentType;
  status: AppointmentStatus;
  notes: string;
}

export type AppointmentType = 'معاينة' | 'قياس' | 'تركيب' | 'متابعة' | 'صيانة';
export type AppointmentStatus = 'مؤكد' | 'ملغي' | 'مكتمل' | 'قيد الانتظار';

// Maintenance Types
export interface MaintenanceRecord {
  id: number;
  patientId: number;
  deviceId: number;
  date: string;
  type: MaintenanceType;
  description: string;
  parts: MaintenancePart[];
  cost: number;
  nextMaintenanceDate: string;
  technician: string;
}

export interface MaintenancePart {
  id: number;
  name: string;
  quantity: number;
  cost: number;
}

export type MaintenanceType = 'دورية' | 'طارئة' | 'تعديل' | 'استبدال';

// Evaluation Types
export interface Evaluation {
  id: number;
  patientId: number;
  date: string;
  category: EvaluationCategory;
  rating: number;
  feedback: string;
  recommendations: string;
}

export type EvaluationCategory = 'خدمة' | 'جهاز' | 'راحة' | 'أداء' | 'رضا عام';

// Educational Content Types
export interface EducationalContent {
  id: number;
  title: string;
  category: 'video' | 'article' | 'exercise' | 'faq';
  content: string;
  mediaUrl?: string;
  tags: string[];
  publishDate: string;
  author: string;
}

// Communication Types
export interface Message {
  id: number;
  patientId: number;
  specialistId: number;
  content: string;
  timestamp: string;
  type: 'text' | 'image' | 'file';
  status: 'sent' | 'delivered' | 'read';
}

export interface Consultation {
  id: number;
  patientId: number;
  specialistId: number;
  date: string;
  type: 'online' | 'inPerson';
  status: ConsultationStatus;
  notes: string;
  attachments: PatientFile[];
}

export type ConsultationStatus = 'مجدول' | 'جاري' | 'مكتمل' | 'ملغي';