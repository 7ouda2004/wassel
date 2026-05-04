import { Router } from 'express';
import { createBooking, getCenterBookings, updateBookingStatus } from '../controllers/bookings.controller';
import { authenticate, requireCenterAccess } from '../middlewares/auth.middleware';

const router = Router();

// Public route to create a booking
router.post('/', createBooking);

// Protected routes for Center Admins / Super Admin
router.get('/center/:centerId', authenticate, requireCenterAccess, getCenterBookings);

// Assuming booking update also needs some check, but for now just authenticate
// Ideally, check if the booking belongs to the center of the center_admin
router.patch('/:id/status', authenticate, updateBookingStatus);

export default router;
