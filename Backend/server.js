const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
const fs = require('fs');
require('dotenv').config();

// Ensure uploads directory exists
const uploadsDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadsDir)) fs.mkdirSync(uploadsDir, { recursive: true });

const authRoutes = require('./routes/auth');
const projectRoutes = require('./routes/projects');

const app = express();

const corsOptions = {
  origin: process.env.NODE_ENV === 'production' ? false : 'http://localhost:5173',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true,
};

// ──── Middleware ────
app.use(cors(corsOptions));
app.options('/{*path}', cors(corsOptions)); // Handle preflight for all routes
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve uploaded images statically
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// ──── Routes ────
app.use('/api/auth', authRoutes);
app.use('/api/projects', projectRoutes);

// Health check
app.get('/api/health', (req, res) => res.json({ status: 'ok' }));

// ──── Serve Frontend (production) ────
const clientBuildPath = path.join(__dirname, '..', 'Frontend', 'dist');
if (fs.existsSync(clientBuildPath)) {
  app.use(express.static(clientBuildPath));
  // SPA fallback — serve index.html for any non-API route
  app.get('/{*path}', (req, res) => {
    res.sendFile(path.join(clientBuildPath, 'index.html'));
  });
}

// ──── Error handler ────
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: err.message || 'Something went wrong' });
});

// ──── Connect to MongoDB & start server ────
const PORT = process.env.PORT || 5001;

app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log('✅ Connected to MongoDB');
  })
  .catch((err) => {
    console.error('❌ MongoDB connection error:', err.message);
  });
