-- Drop existing tables if any
DROP TABLE IF EXISTS products;
DROP TABLE IF EXISTS specialists;
DROP TABLE IF EXISTS approval_requests;
DROP TABLE IF EXISTS centers;

-- Create centers table
CREATE TABLE centers (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name_ar TEXT NOT NULL,
  name_en TEXT,
  phone TEXT NOT NULL,
  whatsapp TEXT,
  username TEXT UNIQUE NOT NULL,
  password TEXT NOT NULL,
  address_ar TEXT,
  address_en TEXT,
  governorate_ar TEXT,
  governorate_en TEXT,
  region_ar TEXT,
  region_en TEXT,
  image TEXT,
  rating NUMERIC DEFAULT 5.0,
  insurance_supported BOOLEAN DEFAULT true,
  services_ar JSONB DEFAULT '[]'::jsonb,
  services_en JSONB DEFAULT '[]'::jsonb,
  working_hours_ar TEXT,
  working_hours_en TEXT,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create specialists table
CREATE TABLE specialists (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  center_id UUID REFERENCES centers(id) ON DELETE SET NULL,
  full_name TEXT NOT NULL,
  name_en TEXT,
  phone TEXT NOT NULL,
  username TEXT UNIQUE NOT NULL,
  password TEXT NOT NULL,
  specialization TEXT,
  specialization_en TEXT,
  experience INTEGER DEFAULT 0,
  rating NUMERIC DEFAULT 5.0,
  review_count INTEGER DEFAULT 0,
  image TEXT,
  available BOOLEAN DEFAULT true,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create products table
CREATE TABLE products (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  center_id UUID REFERENCES centers(id) ON DELETE CASCADE,
  name_ar TEXT NOT NULL,
  name_en TEXT,
  description_ar TEXT,
  description_en TEXT,
  image TEXT,
  price NUMERIC DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create approval requests table
CREATE TABLE approval_requests (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  full_name TEXT NOT NULL,
  phone TEXT NOT NULL,
  username TEXT NOT NULL,
  password TEXT NOT NULL,
  type TEXT NOT NULL, -- 'specialist' or 'center'
  center_name TEXT,
  specialization TEXT,
  status TEXT DEFAULT 'pending', -- 'pending', 'approved', 'rejected'
  submitted_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  reviewed_at TIMESTAMP WITH TIME ZONE
);

-- Turn off RLS for now so the app can freely read/write (since it's a prototype)
ALTER TABLE centers DISABLE ROW LEVEL SECURITY;
ALTER TABLE specialists DISABLE ROW LEVEL SECURITY;
ALTER TABLE products DISABLE ROW LEVEL SECURITY;
ALTER TABLE approval_requests DISABLE ROW LEVEL SECURITY;

-- Create profiles table for auth
CREATE TABLE IF NOT EXISTS profiles (
  id UUID PRIMARY KEY,
  email TEXT,
  full_name TEXT,
  role TEXT DEFAULT 'patient',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS patient_profiles (
  id UUID PRIMARY KEY REFERENCES profiles(id) ON DELETE CASCADE,
  blood_type TEXT,
  allergies TEXT,
  chronic_conditions TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

ALTER TABLE profiles DISABLE ROW LEVEL SECURITY;
ALTER TABLE patient_profiles DISABLE ROW LEVEL SECURITY;

