import { Request, Response } from 'express';
import multer from 'multer';
import path from 'path';
import fs from 'fs';
import { query } from '../db/connection';
import { v4 as uuidv4 } from 'uuid';

// Ensure uploads directory exists
const uploadDir = path.join(__dirname, '../../../uploads');
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

// Multer storage configuration
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, uniqueSuffix + path.extname(file.originalname));
  }
});

// File filter (accept images and pdfs)
const fileFilter = (req: Request, file: Express.Multer.File, cb: multer.FileFilterCallback) => {
  if (file.mimetype.startsWith('image/') || file.mimetype === 'application/pdf') {
    cb(null, true);
  } else {
    cb(new Error('Only images and PDF files are allowed!'));
  }
};

export const upload = multer({ 
  storage,
  limits: { fileSize: 10 * 1024 * 1024 }, // 10MB limit
  fileFilter 
});

// Handle file upload and save to database
export const handleFileUpload = async (req: Request, res: Response) => {
  try {
    const { booking_id } = req.body;
    
    if (!req.file) {
      return res.status(400).json({ error: 'No file uploaded' });
    }

    if (!booking_id) {
      // If booking_id is not provided, just return the file path (useful if booking isn't created yet)
      const fileUrl = `/uploads/${req.file.filename}`;
      return res.status(201).json({ 
        message: 'File uploaded successfully',
        file_url: fileUrl,
        file_name: req.file.originalname,
        file_type: req.file.mimetype.startsWith('image/') ? 'image' : 'pdf'
      });
    }

    // Save to database if booking_id is provided
    const fileType = req.file.mimetype.startsWith('image/') ? 'image' : 'pdf';
    const fileUrl = `/uploads/${req.file.filename}`;
    const uploadId = uuidv4();

    await query(
      'INSERT INTO uploads (id, booking_id, file_url, file_type, file_name) VALUES ($1, $2, $3, $4, $5)',
      [uploadId, booking_id, fileUrl, fileType, req.file.originalname]
    );

    res.status(201).json({
      message: 'File uploaded and linked to booking successfully',
      upload: { id: uploadId, booking_id, file_url: fileUrl, file_type: fileType, file_name: req.file.originalname }
    });

  } catch (error) {
    console.error('File upload error:', error);
    res.status(500).json({ error: 'Internal server error during file upload' });
  }
};
