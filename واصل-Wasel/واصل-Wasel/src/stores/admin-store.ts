import { create } from 'zustand';
import { supabase } from '@/lib/supabase';

// Types
export type AccountType = 'specialist' | 'center';
export type RequestStatus = 'pending' | 'approved' | 'rejected';

export interface SpecialistAccount {
  id: string;
  fullName: string;
  phone: string;
  username: string;
  password: string;
  type: AccountType;
  centerId?: string;
  centerName?: string;
  specialization?: string;
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
  name: string;
  phone: string;
  username: string;
  password: string;
  address?: string;
  governorate_ar?: string;
  governorate_en?: string;
  image?: string;
  rating?: number;
  insurance_supported?: boolean;
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
  centerName?: string;
  specialization?: string;
  status: RequestStatus;
  submittedAt: string;
  reviewedAt?: string;
}

interface AdminState {
  specialists: SpecialistAccount[];
  centers: CenterAccount[];
  approvalRequests: ApprovalRequest[];
  isLoading: boolean;
  error: string | null;

  fetchAll: () => Promise<void>;
  fetchSpecialists: () => Promise<void>;
  fetchCenters: () => Promise<void>;
  fetchRequests: () => Promise<void>;

  addSpecialist: (specialist: Omit<SpecialistAccount, 'id' | 'isActive' | 'createdAt'>) => Promise<void>;
  updateSpecialist: (id: string, data: Partial<SpecialistAccount>) => Promise<void>;
  removeSpecialist: (id: string) => Promise<void>;
  
  addCenter: (center: Omit<CenterAccount, 'id' | 'isActive' | 'createdAt' | 'specialistIds'>) => Promise<void>;
  updateCenter: (id: string, data: Partial<CenterAccount>) => Promise<void>;
  removeCenter: (id: string) => Promise<void>;

  addApprovalRequest: (request: Omit<ApprovalRequest, 'id' | 'status' | 'submittedAt'>) => Promise<void>;
  approveRequest: (id: string) => Promise<void>;
  rejectRequest: (id: string) => Promise<void>;

  validateSpecialistLogin: (username: string, password: string) => Promise<any>;
}

// Helpers to map DB to Frontend models
const mapCenter = (row: any): CenterAccount => ({
  id: row.id,
  name: row.name_ar,
  phone: row.phone,
  username: row.username,
  password: row.password,
  address: row.address_ar,
  governorate_ar: row.governorate_ar,
  governorate_en: row.governorate_en,
  image: row.image,
  rating: row.rating,
  insurance_supported: row.insurance_supported,
  specialistIds: [], // Will be populated dynamically if needed
  services_ar: row.services_ar || [],
  services_en: row.services_en || [],
  workingHours_ar: row.working_hours_ar,
  workingHours_en: row.working_hours_en,
  isActive: row.is_active,
  createdAt: row.created_at,
});

const mapSpecialist = (row: any): SpecialistAccount => ({
  id: row.id,
  fullName: row.full_name,
  phone: row.phone,
  username: row.username,
  password: row.password,
  type: 'specialist',
  centerId: row.center_id,
  centerName: row.centers?.name_ar,
  specialization: row.specialization,
  image: row.image,
  rating: row.rating,
  experience: row.experience,
  isActive: row.is_active,
  createdAt: row.created_at,
});

const mapRequest = (row: any): ApprovalRequest => ({
  id: row.id,
  fullName: row.full_name,
  phone: row.phone,
  username: row.username,
  password: row.password,
  type: row.type as AccountType,
  centerName: row.center_name,
  specialization: row.specialization,
  status: row.status as RequestStatus,
  submittedAt: row.submitted_at,
  reviewedAt: row.reviewed_at,
});

export const useAdminStore = create<AdminState>()((set, get) => ({
  specialists: [],
  centers: [],
  approvalRequests: [],
  isLoading: false,
  error: null,

  fetchAll: async () => {
    set({ isLoading: true });
    try {
      const [centersRes, specsRes, reqsRes] = await Promise.all([
        supabase.from('centers').select('*'),
        supabase.from('specialists').select('*, centers(name_ar)'),
        supabase.from('approval_requests').select('*')
      ]);

      set({
        centers: centersRes.data ? centersRes.data.map(mapCenter) : [],
        specialists: specsRes.data ? specsRes.data.map(mapSpecialist) : [],
        approvalRequests: reqsRes.data ? reqsRes.data.map(mapRequest) : [],
        isLoading: false
      });
    } catch (e) {
      console.error(e);
      set({ isLoading: false });
    }
  },

  fetchSpecialists: async () => {
    const { data } = await supabase.from('specialists').select('*, centers(name_ar)');
    if (data) set({ specialists: data.map(mapSpecialist) });
  },

  fetchCenters: async () => {
    const { data } = await supabase.from('centers').select('*');
    if (data) set({ centers: data.map(mapCenter) });
  },

  fetchRequests: async () => {
    const { data } = await supabase.from('approval_requests').select('*');
    if (data) set({ approvalRequests: data.map(mapRequest) });
  },

  addSpecialist: async (specialist) => {
    const { data, error } = await supabase.from('specialists').insert({
      full_name: specialist.fullName,
      phone: specialist.phone,
      username: specialist.username,
      password: specialist.password,
      specialization: specialist.specialization,
      center_id: specialist.centerId || null
    }).select('*, centers(name_ar)').single();
    
    if (data) set(state => ({ specialists: [...state.specialists, mapSpecialist(data)] }));
  },

  updateSpecialist: async (id, updates) => {
    const dbUpdates: any = {};
    if (updates.fullName) dbUpdates.full_name = updates.fullName;
    if (updates.phone) dbUpdates.phone = updates.phone;
    if (updates.username) dbUpdates.username = updates.username;
    if (updates.password) dbUpdates.password = updates.password;
    if (updates.specialization) dbUpdates.specialization = updates.specialization;
    if (updates.centerId !== undefined) dbUpdates.center_id = updates.centerId || null;
    if (updates.image !== undefined) dbUpdates.image = updates.image;
    if (updates.rating !== undefined) dbUpdates.rating = updates.rating;
    if (updates.experience !== undefined) dbUpdates.experience = updates.experience;
    if (updates.isActive !== undefined) dbUpdates.is_active = updates.isActive;

    // Don't send empty updates
    if (Object.keys(dbUpdates).length === 0) return;
    
    const { data, error } = await supabase.from('specialists').update(dbUpdates).eq('id', id).select('*, centers(name_ar)').single();
    if (error) {
      console.error('Error updating specialist:', error);
      throw error;
    }
    if (data) {
      set(state => ({
        specialists: state.specialists.map(s => s.id === id ? mapSpecialist(data) : s)
      }));
    }
  },

  removeSpecialist: async (id) => {
    await supabase.from('specialists').delete().eq('id', id);
    set(state => ({ specialists: state.specialists.filter(s => s.id !== id) }));
  },

  addCenter: async (center) => {
    const { data } = await supabase.from('centers').insert({
      name_ar: center.name,
      phone: center.phone,
      username: center.username,
      password: center.password,
      address_ar: center.address,
      governorate_ar: center.governorate_ar
    }).select('*').single();
    
    if (data) set(state => ({ centers: [...state.centers, mapCenter(data)] }));
  },

  updateCenter: async (id, updates) => {
    const dbUpdates: any = {};
    if (updates.name) dbUpdates.name_ar = updates.name;
    if (updates.phone) dbUpdates.phone = updates.phone;
    if (updates.username) dbUpdates.username = updates.username;
    if (updates.password) dbUpdates.password = updates.password;
    if (updates.address) dbUpdates.address_ar = updates.address;
    if (updates.governorate_ar) dbUpdates.governorate_ar = updates.governorate_ar;
    if (updates.image !== undefined) dbUpdates.image = updates.image;
    if (updates.rating !== undefined) dbUpdates.rating = updates.rating;
    if (updates.insurance_supported !== undefined) dbUpdates.insurance_supported = updates.insurance_supported;
    if (updates.services_ar !== undefined) dbUpdates.services_ar = updates.services_ar;
    if (updates.services_en !== undefined) dbUpdates.services_en = updates.services_en;
    if (updates.workingHours_ar !== undefined) dbUpdates.working_hours_ar = updates.workingHours_ar;
    if (updates.workingHours_en !== undefined) dbUpdates.working_hours_en = updates.workingHours_en;
    if (updates.isActive !== undefined) dbUpdates.is_active = updates.isActive;
    if (updates.products !== undefined) dbUpdates.products = updates.products;

    // Don't send empty updates
    if (Object.keys(dbUpdates).length === 0) return;

    const { data, error } = await supabase.from('centers').update(dbUpdates).eq('id', id).select('*').single();
    if (error) {
      console.error('Error updating center:', error);
      throw error;
    }
    if (data) {
      set(state => ({
        centers: state.centers.map(c => c.id === id ? mapCenter(data) : c)
      }));
    }
  },

  removeCenter: async (id) => {
    await supabase.from('centers').delete().eq('id', id);
    set(state => ({ centers: state.centers.filter(c => c.id !== id) }));
  },

  addApprovalRequest: async (request) => {
    const { data } = await supabase.from('approval_requests').insert({
      full_name: request.fullName,
      phone: request.phone,
      username: request.username,
      password: request.password,
      type: request.type,
      center_name: request.centerName,
      specialization: request.specialization,
      status: 'pending'
    }).select('*').single();
    
    if (data) set(state => ({ approvalRequests: [...state.approvalRequests, mapRequest(data)] }));
  },

  approveRequest: async (id) => {
    const { data: req } = await supabase.from('approval_requests').update({
      status: 'approved',
      reviewed_at: new Date().toISOString()
    }).eq('id', id).select('*').single();

    if (req) {
      if (req.type === 'specialist') {
        await supabase.from('specialists').insert({
          full_name: req.full_name,
          phone: req.phone,
          username: req.username,
          password: req.password,
          specialization: req.specialization
        });
      } else {
        await supabase.from('centers').insert({
          name_ar: req.center_name || req.full_name,
          phone: req.phone,
          username: req.username,
          password: req.password
        });
      }
      get().fetchAll();
    }
  },

  rejectRequest: async (id) => {
    const { data } = await supabase.from('approval_requests').update({
      status: 'rejected',
      reviewed_at: new Date().toISOString()
    }).eq('id', id).select('*').single();
    
    if (data) {
      set(state => ({
        approvalRequests: state.approvalRequests.map(r => r.id === id ? mapRequest(data) : r)
      }));
    }
  },

  validateSpecialistLogin: async (username, password) => {
    if ((username === 'admin' && password === 'admin') || (username === '616' && password === 'daizer616')) {
      return { id: 'admin', type: 'admin', fullName: 'Admin User', role: 'admin' };
    }
    
    const { data: spec } = await supabase.from('specialists').select('*').eq('username', username).eq('password', password).eq('is_active', true).single();
    if (spec) return { ...mapSpecialist(spec), type: 'specialist' };
    
    const { data: center } = await supabase.from('centers').select('*').eq('username', username).eq('password', password).eq('is_active', true).single();
    if (center) return { ...mapCenter(center), type: 'center' };
    
    return null;
  },
}));
