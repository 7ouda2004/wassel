import { Router } from 'express';
import {
  getAllSpecialists, addSpecialist, updateSpecialist, deleteSpecialist,
  getAllCentersAdmin, addCenter, updateCenter, deleteCenter,
  getAllRequests, addRequest, approveRequest, rejectRequest,
  loginAdmin
} from '../controllers/admin.controller';

const router = Router();

// Login (no auth required)
router.post('/login', loginAdmin);

// Specialists CRUD
router.get('/specialists', getAllSpecialists);
router.post('/specialists', addSpecialist);
router.put('/specialists/:id', updateSpecialist);
router.delete('/specialists/:id', deleteSpecialist);

// Centers CRUD
router.get('/centers', getAllCentersAdmin);
router.post('/centers', addCenter);
router.put('/centers/:id', updateCenter);
router.delete('/centers/:id', deleteCenter);

// Approval Requests
router.get('/requests', getAllRequests);
router.post('/requests', addRequest);
router.put('/requests/:id/approve', approveRequest);
router.put('/requests/:id/reject', rejectRequest);

export default router;
