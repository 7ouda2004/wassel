import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
import { query } from './db/connection';
import { runMigrations } from './db/migrate';

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:8080',
  credentials: true
}));
app.use(express.json({ limit: '50mb' })); // Large limit for base64 images
app.use(express.urlencoded({ extended: true, limit: '50mb' }));

// Serve uploaded files
app.use('/uploads', express.static(path.join(__dirname, '../../uploads')));

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
import adminRoutes from './routes/admin.routes';

app.use('/api/auth', authRoutes);
app.use('/api/centers', centersRoutes);
app.use('/api/bookings', bookingsRoutes);
app.use('/api/uploads', uploadsRoutes);
app.use('/api/dashboard', dashboardRoutes);
app.use('/api/admin', adminRoutes);

// Error handling middleware
app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.error(err.stack);
  res.status(500).json({
    error: 'Internal Server Error',
    message: process.env.NODE_ENV === 'development' ? err.message : undefined
  });
});

// Start server with auto-migration
const startServer = async () => {
  try {
    // Run migrations on startup
    await runMigrations();
    console.log('✅ Database ready');

    app.listen(PORT, () => {
      console.log(`🚀 Server is running on http://localhost:${PORT}`);
      console.log(`📊 API available at http://localhost:${PORT}/api`);
    });
  } catch (error) {
    console.error('❌ Failed to start server:', error);
    process.exit(1);
  }
};

startServer();
