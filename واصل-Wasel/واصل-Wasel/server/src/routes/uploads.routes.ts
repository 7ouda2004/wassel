import { Router } from 'express';
import { upload, handleFileUpload } from '../controllers/uploads.controller';

const router = Router();

// Public route to upload files
// Expects form-data with a file field named 'file'
router.post('/', upload.single('file'), handleFileUpload);

export default router;
