import { query } from './connection';

const resetDatabase = async () => {
  console.log('🔄 Resetting database...');
  
  try {
    await query('DELETE FROM products');
    await query('DELETE FROM approval_requests');
    await query('DELETE FROM uploads');
    await query('DELETE FROM bookings');
    await query('DELETE FROM patients');
    await query('DELETE FROM specialists');
    await query('DELETE FROM centers');
    
    console.log('✅ All tables cleared successfully!');
    console.log('Run npm run db:seed to re-populate the database.');
  } catch (error) {
    console.error('❌ Reset failed:', error);
  }
};

resetDatabase();
