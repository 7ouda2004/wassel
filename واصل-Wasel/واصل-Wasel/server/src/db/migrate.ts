import { query } from './connection';

const runMigrations = async () => {
  console.log('🔄 Starting SQLite database migrations...');
  
  try {
    // 1. Centers Table
    await query(`
      CREATE TABLE IF NOT EXISTS centers (
        id TEXT PRIMARY KEY,
        name_ar TEXT NOT NULL,
        name_en TEXT NOT NULL,
        governorate_ar TEXT NOT NULL,
        governorate_en TEXT NOT NULL,
        region_ar TEXT,
        region_en TEXT,
        address_ar TEXT NOT NULL,
        address_en TEXT NOT NULL,
        phone TEXT NOT NULL,
        whatsapp TEXT,
        rating REAL DEFAULT 0,
        image_url TEXT,
        is_active INTEGER DEFAULT 1,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
      );
    `);

    // 2. Specialists Table
    await query(`
      CREATE TABLE IF NOT EXISTS specialists (
        id TEXT PRIMARY KEY,
        center_id TEXT REFERENCES centers(id) ON DELETE CASCADE,
        name_ar TEXT NOT NULL,
        name_en TEXT NOT NULL,
        specialization_ar TEXT NOT NULL,
        specialization_en TEXT NOT NULL,
        experience_years INTEGER DEFAULT 0,
        rating REAL DEFAULT 0,
        review_count INTEGER DEFAULT 0,
        image_url TEXT,
        is_available INTEGER DEFAULT 1,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP
      );
    `);

    // 3. Users/Auth Table
    await query(`
      CREATE TABLE IF NOT EXISTS users (
        id TEXT PRIMARY KEY,
        center_id TEXT REFERENCES centers(id) ON DELETE CASCADE,
        email TEXT UNIQUE NOT NULL,
        password_hash TEXT NOT NULL,
        role TEXT NOT NULL CHECK (role IN ('super_admin', 'center_admin', 'specialist')),
        name TEXT NOT NULL,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP
      );
    `);

    // 4. Patients Table
    await query(`
      CREATE TABLE IF NOT EXISTS patients (
        id TEXT PRIMARY KEY,
        full_name TEXT NOT NULL,
        phone TEXT UNIQUE NOT NULL,
        email TEXT,
        age INTEGER,
        governorate TEXT,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP
      );
    `);

    // 5. Bookings Table
    await query(`
      CREATE TABLE IF NOT EXISTS bookings (
        id TEXT PRIMARY KEY,
        patient_id TEXT REFERENCES patients(id) ON DELETE CASCADE,
        center_id TEXT REFERENCES centers(id) ON DELETE CASCADE,
        specialist_id TEXT REFERENCES specialists(id) ON DELETE SET NULL,
        appointment_date TEXT NOT NULL,
        appointment_time TEXT NOT NULL,
        condition_type TEXT NOT NULL,
        notes TEXT,
        status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'confirmed', 'completed', 'cancelled')),
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
      );
    `);

    // 6. Uploads Table
    await query(`
      CREATE TABLE IF NOT EXISTS uploads (
        id TEXT PRIMARY KEY,
        booking_id TEXT REFERENCES bookings(id) ON DELETE CASCADE,
        file_url TEXT NOT NULL,
        file_type TEXT NOT NULL,
        file_name TEXT NOT NULL,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP
      );
    `);

    // 7. Reviews Table
    await query(`
      CREATE TABLE IF NOT EXISTS reviews (
        id TEXT PRIMARY KEY,
        patient_id TEXT REFERENCES patients(id) ON DELETE CASCADE,
        specialist_id TEXT REFERENCES specialists(id) ON DELETE CASCADE,
        rating INTEGER NOT NULL CHECK (rating >= 1 AND rating <= 5),
        comment TEXT,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP
      );
    `);

    console.log('✅ SQLite Migrations completed successfully!');
  } catch (error) {
    console.error('❌ Migration failed:', error);
  }
};

runMigrations();
