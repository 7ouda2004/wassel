import { Request, Response } from 'express';
import { query } from '../db/connection';
import { v4 as uuidv4 } from 'uuid';

// Get patients for a specific center
export const getCenterPatients = async (req: Request, res: Response) => {
  try {
    const { centerId } = req.params;
    
    // Get unique patients who have booked at this center
    const result = await query(`
      SELECT DISTINCT p.id, p.full_name, p.phone, p.email, p.age, p.governorate,
             (SELECT MAX(appointment_date) FROM bookings WHERE patient_id = p.id AND center_id = $1) as last_visit
      FROM patients p
      JOIN bookings b ON p.id = b.patient_id
      WHERE b.center_id = $1
      ORDER BY p.full_name ASC
    `, [centerId]);
    
    res.json(result.rows);
  } catch (error) {
    console.error('Get center patients error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Get specialists for a specific center (Admin view - includes all, not just available)
export const getDashboardSpecialists = async (req: Request, res: Response) => {
  try {
    const { centerId } = req.params;
    
    const result = await query(
      'SELECT * FROM specialists WHERE center_id = $1 ORDER BY name_ar ASC',
      [centerId]
    );
    
    res.json(result.rows);
  } catch (error) {
    console.error('Get dashboard specialists error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Add or update specialist (Center Admin)
export const upsertSpecialist = async (req: Request, res: Response) => {
  try {
    const { centerId } = req.params;
    const { 
      id, name_ar, name_en, specialization_ar, specialization_en, 
      experience_years, image_url, is_available 
    } = req.body;

    if (id) {
      // Update
      await query(`
        UPDATE specialists 
        SET name_ar = $1, name_en = $2, specialization_ar = $3, specialization_en = $4,
            experience_years = $5, image_url = COALESCE($6, image_url), is_available = $7
        WHERE id = $8 AND center_id = $9
      `, [name_ar, name_en, specialization_ar, specialization_en, experience_years, image_url, is_available ? 1 : 0, id, centerId]);
      
      const updated = await query('SELECT * FROM specialists WHERE id = $1', [id]);
      res.json({ message: 'Specialist updated successfully', specialist: updated.rows[0] });
    } else {
      // Insert
      const newId = uuidv4();
      await query(`
        INSERT INTO specialists 
        (id, center_id, name_ar, name_en, specialization_ar, specialization_en, experience_years, image_url, is_available)
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
      `, [newId, centerId, name_ar, name_en, specialization_ar, specialization_en, experience_years, image_url, is_available ? 1 : 0]);
      
      const inserted = await query('SELECT * FROM specialists WHERE id = $1', [newId]);
      res.json({ message: 'Specialist added successfully', specialist: inserted.rows[0] });
    }
  } catch (error) {
    console.error('Upsert specialist error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};
