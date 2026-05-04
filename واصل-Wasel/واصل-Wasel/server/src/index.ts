import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { query } from './db/connection';

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:8080',
  credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Basic health check route
app.get('/api/health', async (req, res) => {
  try {
    const dbStatus = await query('SELECT 1');
    res.json({ 
      status: 'ok', 
      message: 'Wasel API is running',
      db_connected: dbStatus.rowCount === 1
    });
  } catch (error) {
    res.status(500).json({ 
      status: 'error', 
      message: 'Database connection failed' 
    });
  }
});

// Import and mount routes
import authRoutes from './routes/auth.routes';
import centersRoutes from './routes/centers.routes';
import bookingsRoutes from './routes/bookings.routes';
import uploadsRoutes from './routes/uploads.routes';
import dashboardRoutes from './routes/dashboard.routes';

app.use('/api/auth', authRoutes);
app.use('/api/centers', centersRoutes);
app.use('/api/bookings', bookingsRoutes);
app.use('/api/uploads', uploadsRoutes);
app.use('/api/dashboard', dashboardRoutes);

// Error handling middleware
app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.error(err.stack);
  res.status(500).json({
    error: 'Internal Server Error',
    message: process.env.NODE_ENV === 'development' ? err.message : undefined
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server is running on port ${PORT}`);
});
