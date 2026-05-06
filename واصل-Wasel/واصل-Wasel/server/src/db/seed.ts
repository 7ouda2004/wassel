import { query } from './connection';
import { runMigrations } from './migrate';
import { v4 as uuidv4 } from 'uuid';

// Import the existing mock data from the frontend
import { egyptCenters } from '../../../src/data/centers-database';

const seedDatabase = async () => {
  console.log('🌱 Starting database seeding...');
  
  try {
    // Ensure tables exist
    await runMigrations();

    // Check if data already exists
    const existingCenters = await query('SELECT COUNT(*) as count FROM centers');
    if (existingCenters.rows[0].count > 0) {
      console.log('⚠️ Database already has data. Skipping seed. Use db:reset to clear first.');
      return;
    }

    let totalSpecialists = 0;
    let totalProducts = 0;

    for (let i = 0; i < egyptCenters.length; i++) {
      const center = egyptCenters[i];
      const centerId = center.id || uuidv4();

      // Insert Center
      await query(`
        INSERT INTO centers (id, name_ar, name_en, governorate_ar, governorate_en, region_ar, region_en, address_ar, address_en, phone, whatsapp, username, password, rating, image, insurance_supported, services_ar, services_en, working_hours_ar, working_hours_en, is_active)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 1)
      `, [
        centerId,
        center.name_ar, center.name_en || '',
        center.governorate_ar, center.governorate_en || '',
        center.region_ar || '', center.region_en || '',
        center.address_ar, center.address_en || '',
        center.phone, center.whatsapp || '',
        `center${i + 1}`, 'center123',
        center.rating || 5, center.image || '',
        center.insurance_supported ? 1 : 0,
        JSON.stringify(center.services_ar || []),
        JSON.stringify(center.services_en || []),
        center.workingHours_ar || '', center.workingHours_en || ''
      ]);

      // Insert Specialists
      for (const spec of (center.specialists || [])) {
        const specId = spec.id || uuidv4();
        await query(`
          INSERT INTO specialists (id, center_id, full_name, name_en, username, password, specialization, specialization_en, experience, rating, review_count, image, is_active)
          VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 1)
        `, [
          specId, centerId,
          spec.name_ar, spec.name_en || '',
          `spec_${specId}`, 'spec123',
          spec.specialization_ar || '', spec.specialization_en || '',
          spec.experience || 0, spec.rating || 0, spec.reviewCount || 0,
          spec.image || ''
        ]);
        totalSpecialists++;
      }

      // Insert Products
      for (const prod of (center.products || [])) {
        const prodId = prod.id || uuidv4();
        await query(`
          INSERT INTO products (id, center_id, name_ar, name_en, description_ar, description_en, image, price)
          VALUES (?, ?, ?, ?, ?, ?, ?, ?)
        `, [
          prodId, centerId,
          prod.name_ar || '', prod.name_en || '',
          prod.description_ar || '', prod.description_en || '',
          prod.image || '', 0
        ]);
        totalProducts++;
      }
    }

    // Insert sample approval requests
    await query(`
      INSERT INTO approval_requests (id, full_name, phone, username, password, type, specialization, status, submitted_at)
      VALUES (?, ?, ?, ?, ?, 'specialist', ?, 'pending', ?)
    `, [uuidv4(), 'د. كريم عبدالله', '01011223344', 'karim_abdullah', 'karim2025', 'أطراف صناعية', '2025-04-28T14:30:00Z']);

    await query(`
      INSERT INTO approval_requests (id, full_name, phone, username, password, type, center_name, status, submitted_at)
      VALUES (?, ?, ?, ?, ?, 'center', ?, 'pending', ?)
    `, [uuidv4(), 'مركز الحياة الجديدة', '01555667788', 'hayat_center', 'hayat2025', 'مركز الحياة الجديدة', '2025-05-01T09:15:00Z']);

    await query(`
      INSERT INTO approval_requests (id, full_name, phone, username, password, type, specialization, status, submitted_at)
      VALUES (?, ?, ?, ?, ?, 'specialist', ?, 'pending', ?)
    `, [uuidv4(), 'د. ياسمين خالد', '01288990011', 'yasmin_khaled', 'yasmin2025', 'جبائر طبية', '2025-05-03T11:00:00Z']);

    console.log(`🏥 Inserted ${egyptCenters.length} centers`);
    console.log(`👨‍⚕️ Inserted ${totalSpecialists} specialists`);
    console.log(`📦 Inserted ${totalProducts} products`);
    console.log(`📋 Inserted 3 sample approval requests`);
    console.log('✅ Seeding completed successfully!');
    
  } catch (error) {
    console.error('❌ Seeding failed:', error);
  }
};

seedDatabase();
