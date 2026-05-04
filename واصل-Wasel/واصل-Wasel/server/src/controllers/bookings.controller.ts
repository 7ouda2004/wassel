import { Request, Response } from 'express';
import pool from '../db/connection';

import { v4 as uuidv4 } from 'uuid';

// Create a new booking (Public)
export const createBooking = async (req: Request, res: Response) => {
  try {
    const { 
      name, phone, email, age, governorate, 
      center_id, specialist_id, 
      appointment_date, appointment_time, 
      condition_type, notes 
    } = req.body;

    // 1. Find or create patient by phone number
    let patientId;
    const existingPatient = await pool.query('SELECT id FROM patients WHERE phone = $1', [phone]);
    
    if (existingPatient.rows && existingPatient.rows.length > 0) {
      patientId = existingPatient.rows[0].id;
      // Update patient info if needed
      await pool.query(
        'UPDATE patients SET full_name = $1, email = COALESCE($2, email), age = COALESCE($3, age), governorate = COALESCE($4, governorate) WHERE id = $5',
        [name, email, age, governorate, patientId]
      );
    } else {
      patientId = uuidv4();
      await pool.query(
        'INSERT INTO patients (id, full_name, phone, email, age, governorate) VALUES ($1, $2, $3, $4, $5, $6)',
        [patientId, name, phone, email, age, governorate]
      );
    }

    // 2. Create booking
    const bookingId = uuidv4();
    await pool.query(
      `INSERT INTO bookings 
       (id, patient_id, center_id, specialist_id, appointment_date, appointment_time, condition_type, notes) 
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8)`,
      [bookingId, patientId, center_id, specialist_id, appointment_date, appointment_time, condition_type, notes]
    );

    res.status(201).json({ 
      message: 'Booking created successfully', 
      booking_id: bookingId 
    });
      
  } catch (error) {
    console.error('Create booking error:', error);
    res.status(500).json({ error: 'Internal server error while creating booking' });
  }
};

// Get bookings for a center (Protected: Center Admin / Super Admin)
export const getCenterBookings = async (req: Request, res: Response) => {
  try {
    const { centerId } = req.params;
    const { status, date } = req.query;
    
    let query = `
      SELECT b.id, b.appointment_date, b.appointment_time, b.condition_type, b.status, b.notes,
             p.full_name as patient_name, p.phone as patient_phone,
             s.name_ar as specialist_name_ar, s.name_en as specialist_name_en
      FROM bookings b
      JOIN patients p ON b.patient_id = p.id
      LEFT JOIN specialists s ON b.specialist_id = s.id
      WHERE b.center_id = $1
    `;
    
    const params: any[] = [centerId];
    
    if (status) {
      params.push(status);
      query += ` AND b.status = $${params.length}`;
    }
    
    if (date) {
      params.push(date);
      query += ` AND b.appointment_date = $${params.length}`;
    }
    
    query += ' ORDER BY b.appointment_date DESC, b.appointment_time ASC';

    const result = await pool.query(query, params);
    res.json(result.rows);
  } catch (error) {
    console.error('Get center bookings error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Update booking status (Protected)
export const updateBookingStatus = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    
    if (!['pending', 'confirmed', 'completed', 'cancelled'].includes(status)) {
      return res.status(400).json({ error: 'Invalid status' });
    }

    const result = await pool.query(
      'UPDATE bookings SET status = $1, updated_at = CURRENT_TIMESTAMP WHERE id = $2 RETURNING *',
      [status, id]
    );
    
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Booking not found' });
    }
    
    res.json({ message: 'Booking status updated successfully', booking: result.rows[0] });
  } catch (error) {
    console.error('Update booking status error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};
