import { query } from './connection';

const runMigrations = async () => {
  console.log('🔄 Starting SQLite database migrations...');
  
  try {
    // 1. Centers Table
    await query(`
      CREATE TABLE IF NOT EXISTS centers (
        id TEXT PRIMARY KEY,
        name_ar TEXT NOT NULL,
        name_en TEXT,
        governorate_ar TEXT,
        governorate_en TEXT,
        region_ar TEXT,
        region_en TEXT,
        address_ar TEXT,
        address_en TEXT,
        phone TEXT NOT NULL,
        whatsapp TEXT,
        username TEXT UNIQUE,
        password TEXT,
        rating REAL DEFAULT 0,
        image TEXT,
        insurance_supported INTEGER DEFAULT 1,
        services_ar TEXT DEFAULT '[]',
        services_en TEXT DEFAULT '[]',
        working_hours_ar TEXT,
        working_hours_en TEXT,
        is_active INTEGER DEFAULT 1,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
      );
    `);

    // 2. Specialists Table
    await query(`
      CREATE TABLE IF NOT EXISTS specialists (
        id TEXT PRIMARY KEY,
        center_id TEXT REFERENCES centers(id) ON DELETE SET NULL,
        full_name TEXT NOT NULL,
        name_en TEXT,
        phone TEXT,
        username TEXT UNIQUE,
        password TEXT,
        specialization TEXT,
        specialization_en TEXT,
        experience INTEGER DEFAULT 0,
        rating REAL DEFAULT 0,
        review_count INTEGER DEFAULT 0,
        image TEXT,
        is_active INTEGER DEFAULT 1,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP
      );
    `);

    // 3. Products Table
    await query(`
      CREATE TABLE IF NOT EXISTS products (
        id TEXT PRIMARY KEY,
        center_id TEXT REFERENCES centers(id) ON DELETE CASCADE,
        name_ar TEXT NOT NULL,
        name_en TEXT,
        description_ar TEXT,
        description_en TEXT,
        image TEXT,
        price REAL DEFAULT 0,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP
      );
    `);

    // 4. Approval Requests Table
    await query(`
      CREATE TABLE IF NOT EXISTS approval_requests (
        id TEXT PRIMARY KEY,
        full_name TEXT NOT NULL,
        phone TEXT NOT NULL,
        username TEXT NOT NULL,
        password TEXT NOT NULL,
        type TEXT NOT NULL CHECK (type IN ('specialist', 'center')),
        center_name TEXT,
        specialization TEXT,
        status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'rejected')),
        submitted_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        reviewed_at DATETIME
      );
    `);

    // 5. Patients Table
    await query(`
      CREATE TABLE IF NOT EXISTS patients (
        id TEXT PRIMARY KEY,
        full_name TEXT NOT NULL,
        phone TEXT,
        email TEXT,
        age INTEGER,
        governorate TEXT,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP
      );
    `);

    // 6. Bookings Table
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

    // 7. Uploads Table
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

    console.log('✅ SQLite Migrations completed successfully!');
  } catch (error) {
    console.error('❌ Migration failed:', error);
  }
};

// Export for programmatic use
export { runMigrations };

// Run directly if called as script
if (require.main === module) {
  runMigrations();
}
