import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import path from 'path';

// Routes
import authRoutes from './routes/auth.js';
import leadsRoutes from './routes/leads.js';
import contactsRoutes from './routes/contacts.js';
import accountsRoutes from './routes/accounts.js';
import opportunitiesRoutes from './routes/opportunities.js';
import tasksRoutes from './routes/tasks.js';
import aiRouter from './routes/ai.js';

// Load environment variables
dotenv.config();

const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Middleware
app.use(cors({
  origin: ['http://localhost:5173', 'http://localhost:5174'],
  credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// MongoDB Connection with better error handling
mongoose.set('strictQuery', false);
mongoose.set('debug', process.env.NODE_ENV === 'development');

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/crm-ai', {
      serverSelectionTimeoutMS: 5000,
      socketTimeoutMS: 45000,
    });

    const db = mongoose.connection;

    db.on('error', (err) => {
      console.error('MongoDB connection error:', err);
    });

    db.on('disconnected', () => {
      console.log('MongoDB disconnected');
    });

    db.once('open', () => {
      console.log(`MongoDB Connected: ${db.host}`);
      
      // Create necessary indexes
      Promise.all([
        db.collection('customers').createIndex({ email: 1 }, { unique: true }),
        db.collection('customers').createIndex({
          firstName: 'text',
          lastName: 'text',
          email: 'text',
          company: 'text',
          'cases.title': 'text',
          'cases.description': 'text'
        }),
        db.collection('users').createIndex({ email: 1 }, { unique: true })
      ]).then(() => {
        console.log('Database indexes created successfully');
      }).catch(err => {
        console.warn('Index creation warning:', err.message);
      });
    });

    // Handle process termination
    process.on('SIGINT', async () => {
      await mongoose.connection.close();
      process.exit(0);
    });

  } catch (error) {
    console.error('MongoDB connection error:', error);
    process.exit(1);
  }
};

// Debug middleware to log requests
if (process.env.NODE_ENV === 'development') {
  app.use((req, res, next) => {
    console.log(`${req.method} ${req.url}`, req.body);
    next();
  });
}

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/contacts', contactsRoutes);
app.use('/api/leads', leadsRoutes);
app.use('/api/accounts', accountsRoutes);
app.use('/api/opportunities', opportunitiesRoutes);
app.use('/api/tasks', tasksRoutes);
app.use('/api/ai', aiRouter);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    message: 'Something went wrong!',
    error: process.env.NODE_ENV === 'development' ? err.message : undefined
  });
});

// Serve static files in production
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../frontend/dist')));
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../frontend/dist/index.html'));
  });
}

const PORT = process.env.PORT || 5001;

// Start the server
const startServer = async () => {
  try {
    await connectDB();
    const server = app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    }).on('error', (err) => {
      if (err.code === 'EADDRINUSE') {
        console.error(`Port ${PORT} is already in use. Please choose a different port or kill the process using that port.`);
        process.exit(1);
      } else {
        console.error('Server error:', err);
        process.exit(1);
      }
    });
  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1);
  }
};

startServer(); 