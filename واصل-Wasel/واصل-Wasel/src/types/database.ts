// ========================================
// Wasel Platform - Database Types
// Auto-generated TypeScript definitions
// matching the Supabase PostgreSQL schema
// ========================================

// ---- Enums ----
export type UserRole = 'patient' | 'center' | 'admin' | 'insurance';
export type BookingStatus = 'pending' | 'approved' | 'rejected' | 'completed' | 'cancelled';
export type InsuranceRequestStatus = 'pending' | 'under_review' | 'approved' | 'rejected';
export type DeviceType = 'prosthetic' | 'orthotic' | 'accessory';

// ---- Table Row Types ----

export interface Profile {
  id: string; // UUID from auth.users
  full_name: string;
  email: string | null;
  phone: string | null;
  role: UserRole;
  avatar_url: string | null;
  created_at: string;
}

export interface PatientProfile {
  id: string;
  user_id: string;
  age: number | null;
  gender: string | null;
  medical_condition: string | null;
  amputation_type: string | null;
  activity_level: string | null;
  notes: string | null;
}

export interface Center {
  id: string;
  name_ar: string;
  name_en: string;
  description_ar: string | null;
  description_en: string | null;
  city_ar: string;
  city_en: string;
  region_ar: string | null;
  region_en: string | null;
  address_ar: string | null;
  address_en: string | null;
  phone: string | null;
  working_hours_ar: string | null;
  working_hours_en: string | null;
  services: CenterService[];
  insurance_supported: boolean;
  supported_insurers: string[];
  rating: number;
  images: string[];
  location_lat: number | null;
  location_lng: number | null;
  is_active: boolean;
  created_at: string;
}

export interface CenterService {
  name_ar: string;
  name_en: string;
  icon?: string;
}

export interface Device {
  id: string;
  name_ar: string;
  name_en: string;
  type: DeviceType;
  category: string | null;
  description_ar: string | null;
  description_en: string | null;
  price_range_min: number | null;
  price_range_max: number | null;
  manufacturer: string | null;
  image: string | null;
  specifications: Record<string, any>;
  is_active: boolean;
  created_at: string;
}

export interface CenterDevice {
  center_id: string;
  device_id: string;
  available: boolean;
}

export interface Booking {
  id: string;
  user_id: string;
  center_id: string;
  booking_date: string;
  booking_time: string | null;
  appointment_type: string | null;
  service_type: string | null;
  status: BookingStatus;
  notes: string | null;
  patient_name: string | null;
  patient_phone: string | null;
  patient_email: string | null;
  created_at: string;
  updated_at: string;
  // Joined fields
  center?: Center;
  profile?: Profile;
}

export interface InsuranceRequest {
  id: string;
  patient_id: string;
  center_id: string | null;
  insurance_provider: string;
  policy_number: string | null;
  status: InsuranceRequestStatus;
  documents: string[];
  notes: string | null;
  admin_notes: string | null;
  created_at: string;
  updated_at: string;
  // Joined fields
  center?: Center;
  patient?: Profile;
}

export interface BlogPost {
  id: string;
  title_ar: string;
  title_en: string | null;
  slug: string;
  content_ar: string | null;
  content_en: string | null;
  excerpt_ar: string | null;
  excerpt_en: string | null;
  cover_image: string | null;
  author_id: string | null;
  tags: string[];
  is_published: boolean;
  published_at: string | null;
  created_at: string;
}

// ---- Supabase Database Interface ----

export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: Profile;
        Insert: Omit<Profile, 'created_at'>;
        Update: Partial<Omit<Profile, 'id'>>;
      };
      patient_profiles: {
        Row: PatientProfile;
        Insert: Omit<PatientProfile, 'id'>;
        Update: Partial<Omit<PatientProfile, 'id' | 'user_id'>>;
      };
      centers: {
        Row: Center;
        Insert: Omit<Center, 'id' | 'created_at' | 'rating'>;
        Update: Partial<Omit<Center, 'id'>>;
      };
      devices: {
        Row: Device;
        Insert: Omit<Device, 'id' | 'created_at'>;
        Update: Partial<Omit<Device, 'id'>>;
      };
      center_devices: {
        Row: CenterDevice;
        Insert: CenterDevice;
        Update: Partial<CenterDevice>;
      };
      bookings: {
        Row: Booking;
        Insert: Omit<Booking, 'id' | 'created_at' | 'updated_at' | 'center' | 'profile'>;
        Update: Partial<Omit<Booking, 'id' | 'center' | 'profile'>>;
      };
      insurance_requests: {
        Row: InsuranceRequest;
        Insert: Omit<InsuranceRequest, 'id' | 'created_at' | 'updated_at' | 'center' | 'patient'>;
        Update: Partial<Omit<InsuranceRequest, 'id' | 'center' | 'patient'>>;
      };
      blog_posts: {
        Row: BlogPost;
        Insert: Omit<BlogPost, 'id' | 'created_at'>;
        Update: Partial<Omit<BlogPost, 'id'>>;
      };
    };
    Views: {};
    Functions: {};
    Enums: {
      user_role: UserRole;
      booking_status: BookingStatus;
      insurance_request_status: InsuranceRequestStatus;
      device_type: DeviceType;
    };
  };
}
