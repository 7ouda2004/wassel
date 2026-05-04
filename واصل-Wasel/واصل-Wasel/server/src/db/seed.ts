import { query } from './connection';
import { hashPassword } from '../utils/auth';
import { v4 as uuidv4 } from 'uuid';
// Import the existing mock data from the frontend to seed the database
import { egyptCenters } from '../../../src/data/centers-database';

const seedDatabase = async () => {
  console.log('🌱 Starting SQLite database seeding...');
  
  try {
    // 1. Clear existing data
    await query('DELETE FROM reviews');
    await query('DELETE FROM uploads');
    await query('DELETE FROM bookings');
    await query('DELETE FROM patients');
    await query('DELETE FROM users');
    await query('DELETE FROM specialists');
    await query('DELETE FROM centers');
    console.log('🧹 Cleared existing data');

    // 2. Insert Super Admin
    const superAdminPassword = await hashPassword('admin123');
    await query(
      `INSERT INTO users (id, email, password_hash, role, name) 
       VALUES ($1, $2, $3, $4, $5)`,
      [uuidv4(), 'admin@wasel.com', superAdminPassword, 'super_admin', 'Wasel Super Admin']
    );
    console.log('👤 Created Super Admin account');

    // 3. Insert Centers and Specialists
    const centerAdminPassword = await hashPassword('center123');
    let totalSpecialists = 0;

    for (const center of egyptCenters) {
      // Create Center
      const newCenterId = uuidv4();
      await query(
        `INSERT INTO centers 
          (id, name_ar, name_en, governorate_ar, governorate_en, region_ar, region_en, address_ar, address_en, phone, whatsapp, rating, image_url, is_active)
         VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14)`,
        [
          newCenterId,
          center.name_ar, center.name_en, 
          center.governorate_ar, center.governorate_en,
          center.region_ar, center.region_en,
          center.address_ar, center.address_en,
          center.phone, center.whatsapp,
          center.rating, center.image, 1
        ]
      );

      // Insert Center Admin for this specific center
      await query(
        `INSERT INTO users (id, center_id, email, password_hash, role, name) 
         VALUES ($1, $2, $3, $4, $5, $6)`,
        [
          uuidv4(),
          newCenterId, 
          `admin@${center.governorate_en.toLowerCase().replace(/\s+/g, '')}.wasel.com`, 
          centerAdminPassword, 
          'center_admin', 
          `Admin - ${center.name_en}`
        ]
      );

      // Insert Specialists for this center
      for (const spec of center.specialists) {
        await query(
          `INSERT INTO specialists 
            (id, center_id, name_ar, name_en, specialization_ar, specialization_en, experience_years, rating, review_count, image_url, is_available)
           VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)`,
          [
            uuidv4(),
            newCenterId,
            spec.name_ar, spec.name_en,
            spec.specialization_ar, spec.specialization_en,
            spec.experience, spec.rating, spec.reviewCount,
            spec.image, spec.available ? 1 : 0
          ]
        );
        totalSpecialists++;
      }
    }

    console.log(`🏥 Inserted ${egyptCenters.length} centers`);
    console.log(`👨‍⚕️ Inserted ${totalSpecialists} specialists`);
    console.log(`🔑 Center Admins created. Password: center123`);
    console.log('✅ Seeding completed successfully!');
    
  } catch (error) {
    console.error('❌ Seeding failed:', error);
  }
};

seedDatabase();
