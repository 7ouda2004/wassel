import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { egyptCenters } from '@/data/centers-database';

// Types
export type AccountType = 'specialist' | 'center';
export type RequestStatus = 'pending' | 'approved' | 'rejected';

export interface SpecialistAccount {
  id: string;
  fullName: string;
  name_en?: string; // Additional for public display
  phone: string;
  username: string;
  password: string;
  type: AccountType;
  centerId?: string; // The center this specialist belongs to
  centerName?: string;
  specialization?: string; // Used as specialization_ar
  specialization_en?: string;
  image?: string;
  rating?: number;
  experience?: number;
  isActive: boolean;
  createdAt: string;
}

export interface Product {
  id: string;
  name_ar: string;
  name_en: string;
  description_ar: string;
  description_en: string;
  image: string;
  price?: number;
}

export interface CenterAccount {
  id: string;
  name: string; // Used as name_ar
  name_en?: string;
  phone: string;
  username: string;
  password: string;
  address?: string; // Used as address_ar
  address_en?: string;
  governorate_ar?: string;
  governorate_en?: string;
  image?: string;
  rating?: number;
  insurance_supported?: boolean;
  specializations?: string[];
  specialistIds: string[];
  products?: Product[];
  services_ar?: string[];
  services_en?: string[];
  workingHours_ar?: string;
  workingHours_en?: string;
  isActive: boolean;
  createdAt: string;
}

export interface ApprovalRequest {
  id: string;
  fullName: string;
  phone: string;
  username: string;
  password: string;
  type: AccountType;
  centerName?: string; // If registering as center
  specialization?: string;
  status: RequestStatus;
  submittedAt: string;
  reviewedAt?: string;
}

interface AdminState {
  specialists: SpecialistAccount[];
  centers: CenterAccount[];
  approvalRequests: ApprovalRequest[];

  // Actions
  addSpecialist: (specialist: Omit<SpecialistAccount, 'id' | 'createdAt' | 'isActive'>) => void;
  updateSpecialist: (id: string, data: Partial<SpecialistAccount>) => void;
  removeSpecialist: (id: string) => void;
  
  addCenter: (center: Omit<CenterAccount, 'id' | 'createdAt' | 'isActive' | 'specialistIds'>) => void;
  updateCenter: (id: string, data: Partial<CenterAccount>) => void;
  removeCenter: (id: string) => void;
  assignSpecialistToCenter: (specialistId: string, centerId: string) => void;
  removeSpecialistFromCenter: (specialistId: string, centerId: string) => void;

  addApprovalRequest: (request: Omit<ApprovalRequest, 'id' | 'status' | 'submittedAt'>) => void;
  approveRequest: (id: string) => void;
  rejectRequest: (id: string) => void;

  // Login validation
  validateSpecialistLogin: (username: string, password: string) => SpecialistAccount | CenterAccount | null;
}

const generateId = () => Math.random().toString(36).substr(2, 9) + Date.now().toString(36);

// Sample data
const sampleCenters: CenterAccount[] = egyptCenters.map((c, i) => ({
  id: c.id,
  name: c.name_ar,
  name_en: c.name_en,
  phone: c.phone || '01000000000',
  username: `center${i+1}`,
  password: 'center123',
  address: c.address_ar,
  address_en: c.address_en,
  governorate_ar: c.governorate_ar,
  governorate_en: c.governorate_en,
  image: c.image,
  rating: c.rating,
  insurance_supported: c.insurance_supported,
  specializations: c.services_ar || [],
  specialistIds: c.specialists ? c.specialists.map(s => s.id) : [],
  products: c.products || [],
  services_ar: c.services_ar || [],
  services_en: c.services_en || [],
  workingHours_ar: c.workingHours_ar,
  workingHours_en: c.workingHours_en,
  isActive: true,
  createdAt: new Date().toISOString()
}));

const sampleSpecialists: SpecialistAccount[] = egyptCenters.flatMap(c => 
  (c.specialists || []).map((s) => ({
    id: s.id,
    fullName: s.name_ar,
    name_en: s.name_en,
    phone: '01000000000',
    username: `spec_${s.id}`,
    password: 'spec123',
    type: 'specialist' as AccountType,
    centerId: c.id,
    centerName: c.name_ar,
    specialization: s.specialization_ar,
    specialization_en: s.specialization_en,
    image: s.image,
    rating: s.rating,
    experience: s.experience,
    isActive: true,
    createdAt: new Date().toISOString()
  }))
);

const sampleRequests: ApprovalRequest[] = [
  {
    id: 'req-1',
    fullName: 'د. كريم عبدالله',
    phone: '01011223344',
    username: 'karim_abdullah',
    password: 'karim2025',
    type: 'specialist',
    specialization: 'أطراف صناعية',
    status: 'pending',
    submittedAt: '2025-04-28T14:30:00Z'
  },
  {
    id: 'req-2',
    fullName: 'مركز الحياة الجديدة',
    phone: '01555667788',
    username: 'hayat_center',
    password: 'hayat2025',
    type: 'center',
    centerName: 'مركز الحياة الجديدة',
    status: 'pending',
    submittedAt: '2025-05-01T09:15:00Z'
  },
  {
    id: 'req-3',
    fullName: 'د. ياسمين خالد',
    phone: '01288990011',
    username: 'yasmin_khaled',
    password: 'yasmin2025',
    type: 'specialist',
    specialization: 'جبائر طبية',
    status: 'pending',
    submittedAt: '2025-05-03T11:00:00Z'
  }
];

export const useAdminStore = create<AdminState>()(
  persist(
    (set, get) => ({
      specialists: sampleSpecialists,
      centers: sampleCenters,
      approvalRequests: sampleRequests,

      addSpecialist: (specialist) => {
        const newSpec: SpecialistAccount = {
          ...specialist,
          id: generateId(),
          isActive: true,
          createdAt: new Date().toISOString(),
        };
        set((state) => ({
          specialists: [...state.specialists, newSpec],
        }));
        // If assigned to a center, update center's specialistIds
        if (specialist.centerId) {
          const { centers } = get();
          const center = centers.find(c => c.id === specialist.centerId);
          if (center) {
            set((state) => ({
              centers: state.centers.map(c =>
                c.id === specialist.centerId
                  ? { ...c, specialistIds: [...c.specialistIds, newSpec.id] }
                  : c
              ),
            }));
          }
        }
      },

      updateSpecialist: (id, data) =>
        set((state) => ({
          specialists: state.specialists.map((s) =>
            s.id === id ? { ...s, ...data } : s
          ),
        })),

      removeSpecialist: (id) =>
        set((state) => ({
          specialists: state.specialists.filter((s) => s.id !== id),
          centers: state.centers.map((c) => ({
            ...c,
            specialistIds: c.specialistIds.filter((sId) => sId !== id),
          })),
        })),

      addCenter: (center) => {
        const newCenter: CenterAccount = {
          ...center,
          id: generateId(),
          isActive: true,
          specialistIds: [],
          createdAt: new Date().toISOString(),
        };
        set((state) => ({
          centers: [...state.centers, newCenter],
        }));
      },

      updateCenter: (id, data) =>
        set((state) => ({
          centers: state.centers.map((c) =>
            c.id === id ? { ...c, ...data } : c
          ),
        })),

      removeCenter: (id) =>
        set((state) => ({
          centers: state.centers.filter((c) => c.id !== id),
          specialists: state.specialists.map((s) =>
            s.centerId === id ? { ...s, centerId: undefined, centerName: undefined } : s
          ),
        })),

      assignSpecialistToCenter: (specialistId, centerId) => {
        const { centers } = get();
        const center = centers.find(c => c.id === centerId);
        set((state) => ({
          specialists: state.specialists.map((s) =>
            s.id === specialistId ? { ...s, centerId, centerName: center?.name } : s
          ),
          centers: state.centers.map((c) =>
            c.id === centerId
              ? { ...c, specialistIds: [...new Set([...c.specialistIds, specialistId])] }
              : c
          ),
        }));
      },

      removeSpecialistFromCenter: (specialistId, centerId) =>
        set((state) => ({
          specialists: state.specialists.map((s) =>
            s.id === specialistId ? { ...s, centerId: undefined, centerName: undefined } : s
          ),
          centers: state.centers.map((c) =>
            c.id === centerId
              ? { ...c, specialistIds: c.specialistIds.filter((id) => id !== specialistId) }
              : c
          ),
        })),

      addApprovalRequest: (request) =>
        set((state) => ({
          approvalRequests: [
            ...state.approvalRequests,
            {
              ...request,
              id: generateId(),
              status: 'pending' as RequestStatus,
              submittedAt: new Date().toISOString(),
            },
          ],
        })),

      approveRequest: (id) => {
        const { approvalRequests } = get();
        const request = approvalRequests.find((r) => r.id === id);
        if (!request) return;

        // Update request status
        set((state) => ({
          approvalRequests: state.approvalRequests.map((r) =>
            r.id === id
              ? { ...r, status: 'approved' as RequestStatus, reviewedAt: new Date().toISOString() }
              : r
          ),
        }));

        // Create account based on type
        if (request.type === 'specialist') {
          get().addSpecialist({
            fullName: request.fullName,
            phone: request.phone,
            username: request.username,
            password: request.password,
            type: 'specialist',
            specialization: request.specialization,
          });
        } else {
          get().addCenter({
            name: request.centerName || request.fullName,
            phone: request.phone,
            username: request.username,
            password: request.password,
          });
        }

        // Open WhatsApp welcome message
        const welcomeMsg = request.type === 'specialist'
          ? `*مرحباً بك في واصل! 🎉*\n\nأهلاً ${request.fullName}،\nتم قبول طلب انضمامك كأخصائي في منصة واصل.\n\n*بيانات حسابك:*\nاسم المستخدم: ${request.username}\nكلمة المرور: ${request.password}\n\nيمكنك الآن تسجيل الدخول من بوابة الأخصائيين.\nنتمنى لك تجربة ممتازة! 💙`
          : `*مرحباً بكم في واصل! 🎉*\n\nأهلاً ${request.centerName || request.fullName}،\nتم قبول طلب انضمامكم كمركز في منصة واصل.\n\n*بيانات الحساب:*\nاسم المستخدم: ${request.username}\nكلمة المرور: ${request.password}\n\nيمكنكم الآن تسجيل الدخول من بوابة الأخصائيين.\nنتمنى لكم تجربة ممتازة! 💙`;
        
        const encodedMsg = encodeURIComponent(welcomeMsg);
        const phone = request.phone.startsWith('0') ? '2' + request.phone : request.phone;
        window.open(`https://wa.me/${phone}?text=${encodedMsg}`, '_blank');
      },

      rejectRequest: (id) =>
        set((state) => ({
          approvalRequests: state.approvalRequests.map((r) =>
            r.id === id
              ? { ...r, status: 'rejected' as RequestStatus, reviewedAt: new Date().toISOString() }
              : r
          ),
        })),

      validateSpecialistLogin: (username, password) => {
        const { specialists, centers } = get();
        const spec = specialists.find(
          (s) => s.username === username && s.password === password && s.isActive
        );
        if (spec) return spec;
        const center = centers.find(
          (c) => c.username === username && c.password === password && c.isActive
        );
        return center || null;
      },
    }),
    {
      name: 'wasel-admin-v2',
    }
  )
);
