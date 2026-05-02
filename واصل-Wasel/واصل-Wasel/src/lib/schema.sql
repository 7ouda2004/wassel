-- ==========================================
-- Wasel Medical Platform - Database Schema
-- Run this in Supabase SQL Editor
-- ==========================================

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ==========================================
-- 1. Profiles (extends auth.users)
-- ==========================================
CREATE TABLE IF NOT EXISTS profiles (
  id UUID REFERENCES auth.users ON DELETE CASCADE PRIMARY KEY,
  full_name TEXT NOT NULL,
  email TEXT,
  phone TEXT,
  role TEXT CHECK (role IN ('patient', 'center', 'admin', 'insurance')) DEFAULT 'patient',
  avatar_url TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Auto-create profile on user signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, full_name, email, role)
  VALUES (
    NEW.id,
    COALESCE(NEW.raw_user_meta_data->>'full_name', ''),
    NEW.email,
    COALESCE(NEW.raw_user_meta_data->>'role', 'patient')
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE PROCEDURE public.handle_new_user();

-- ==========================================
-- 2. Patient Profiles
-- ==========================================
CREATE TABLE IF NOT EXISTS patient_profiles (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE UNIQUE,
  age INTEGER,
  gender TEXT,
  medical_condition TEXT,
  amputation_type TEXT,
  activity_level TEXT,
  notes TEXT
);

-- ==========================================
-- 3. Centers
-- ==========================================
CREATE TABLE IF NOT EXISTS centers (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name_ar TEXT NOT NULL,
  name_en TEXT NOT NULL,
  description_ar TEXT,
  description_en TEXT,
  city_ar TEXT NOT NULL,
  city_en TEXT NOT NULL,
  region_ar TEXT,
  region_en TEXT,
  address_ar TEXT,
  address_en TEXT,
  phone TEXT,
  working_hours_ar TEXT,
  working_hours_en TEXT,
  services JSONB DEFAULT '[]',
  insurance_supported BOOLEAN DEFAULT FALSE,
  supported_insurers TEXT[] DEFAULT '{}',
  rating NUMERIC(2,1) DEFAULT 0,
  images TEXT[] DEFAULT '{}',
  location_lat NUMERIC,
  location_lng NUMERIC,
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ==========================================
-- 4. Devices
-- ==========================================
CREATE TABLE IF NOT EXISTS devices (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name_ar TEXT NOT NULL,
  name_en TEXT NOT NULL,
  type TEXT CHECK (type IN ('prosthetic', 'orthotic', 'accessory')),
  category TEXT,
  description_ar TEXT,
  description_en TEXT,
  price_range_min NUMERIC,
  price_range_max NUMERIC,
  manufacturer TEXT,
  image TEXT,
  specifications JSONB DEFAULT '{}',
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ==========================================
-- 5. Center-Device Relationship
-- ==========================================
CREATE TABLE IF NOT EXISTS center_devices (
  center_id UUID REFERENCES centers(id) ON DELETE CASCADE,
  device_id UUID REFERENCES devices(id) ON DELETE CASCADE,
  available BOOLEAN DEFAULT TRUE,
  PRIMARY KEY (center_id, device_id)
);

-- ==========================================
-- 6. Bookings
-- ==========================================
CREATE TABLE IF NOT EXISTS bookings (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  center_id UUID REFERENCES centers(id) ON DELETE CASCADE,
  booking_date DATE NOT NULL,
  booking_time TIME,
  appointment_type TEXT,
  service_type TEXT,
  status TEXT CHECK (status IN ('pending', 'approved', 'rejected', 'completed', 'cancelled')) DEFAULT 'pending',
  notes TEXT,
  patient_name TEXT,
  patient_phone TEXT,
  patient_email TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ==========================================
-- 7. Insurance Requests
-- ==========================================
CREATE TABLE IF NOT EXISTS insurance_requests (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  patient_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  center_id UUID REFERENCES centers(id),
  insurance_provider TEXT NOT NULL,
  policy_number TEXT,
  status TEXT CHECK (status IN ('pending', 'under_review', 'approved', 'rejected')) DEFAULT 'pending',
  documents TEXT[] DEFAULT '{}',
  notes TEXT,
  admin_notes TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ==========================================
-- 8. Blog Posts
-- ==========================================
CREATE TABLE IF NOT EXISTS blog_posts (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title_ar TEXT NOT NULL,
  title_en TEXT,
  slug TEXT UNIQUE NOT NULL,
  content_ar TEXT,
  content_en TEXT,
  excerpt_ar TEXT,
  excerpt_en TEXT,
  cover_image TEXT,
  author_id UUID REFERENCES profiles(id),
  tags TEXT[] DEFAULT '{}',
  is_published BOOLEAN DEFAULT FALSE,
  published_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ==========================================
-- 9. Row Level Security (RLS)
-- ==========================================

-- Enable RLS on all tables
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE patient_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE centers ENABLE ROW LEVEL SECURITY;
ALTER TABLE devices ENABLE ROW LEVEL SECURITY;
ALTER TABLE center_devices ENABLE ROW LEVEL SECURITY;
ALTER TABLE bookings ENABLE ROW LEVEL SECURITY;
ALTER TABLE insurance_requests ENABLE ROW LEVEL SECURITY;
ALTER TABLE blog_posts ENABLE ROW LEVEL SECURITY;

-- Profiles: users can read all, update own
CREATE POLICY "Public profiles are viewable" ON profiles FOR SELECT USING (true);
CREATE POLICY "Users can update own profile" ON profiles FOR UPDATE USING (auth.uid() = id);

-- Patient Profiles: users manage own
CREATE POLICY "Users can view own patient profile" ON patient_profiles FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own patient profile" ON patient_profiles FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update own patient profile" ON patient_profiles FOR UPDATE USING (auth.uid() = user_id);

-- Centers: public read, admin write
CREATE POLICY "Centers are publicly viewable" ON centers FOR SELECT USING (true);
CREATE POLICY "Admins can manage centers" ON centers FOR ALL USING (
  EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin')
);

-- Devices: public read, admin write
CREATE POLICY "Devices are publicly viewable" ON devices FOR SELECT USING (true);
CREATE POLICY "Admins can manage devices" ON devices FOR ALL USING (
  EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin')
);

-- Center Devices: public read
CREATE POLICY "Center devices are publicly viewable" ON center_devices FOR SELECT USING (true);

-- Bookings: user sees own, center sees theirs
CREATE POLICY "Users see own bookings" ON bookings FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can create bookings" ON bookings FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update own bookings" ON bookings FOR UPDATE USING (auth.uid() = user_id);

-- Insurance: user sees own
CREATE POLICY "Users see own insurance requests" ON insurance_requests FOR SELECT USING (auth.uid() = patient_id);
CREATE POLICY "Users can create insurance requests" ON insurance_requests FOR INSERT WITH CHECK (auth.uid() = patient_id);

-- Blog: public read published
CREATE POLICY "Published blog posts are viewable" ON blog_posts FOR SELECT USING (is_published = true);
CREATE POLICY "Admins can manage blog" ON blog_posts FOR ALL USING (
  EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin')
);

-- ==========================================
-- 10. Indexes for Performance
-- ==========================================
CREATE INDEX IF NOT EXISTS idx_centers_city ON centers(city_ar, city_en);
CREATE INDEX IF NOT EXISTS idx_centers_region ON centers(region_ar);
CREATE INDEX IF NOT EXISTS idx_centers_active ON centers(is_active);
CREATE INDEX IF NOT EXISTS idx_bookings_user ON bookings(user_id);
CREATE INDEX IF NOT EXISTS idx_bookings_center ON bookings(center_id);
CREATE INDEX IF NOT EXISTS idx_bookings_status ON bookings(status);
CREATE INDEX IF NOT EXISTS idx_insurance_patient ON insurance_requests(patient_id);
CREATE INDEX IF NOT EXISTS idx_insurance_status ON insurance_requests(status);
CREATE INDEX IF NOT EXISTS idx_blog_published ON blog_posts(is_published, published_at);
CREATE INDEX IF NOT EXISTS idx_blog_slug ON blog_posts(slug);
