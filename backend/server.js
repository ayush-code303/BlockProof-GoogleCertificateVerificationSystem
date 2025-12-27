const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const certificateRoutes = require('./routes/certificate');
const blockchainService = require('./utils/blockchain');
const geminiService = require('./utils/gemini');

// Load environment variables
dotenv.config();

// Initialize Express app
const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:5173',
  credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({
    success: true,
    message: 'BlockProof API is running',
    timestamp: new Date().toISOString(),
    services: {
      blockchain: !!blockchainService.contract,
      ai: !!geminiService.model
    }
  });
});

// API Routes
app.use('/api', certificateRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Error:', err);
  res.status(500).json({
    success: false,
    message: 'Internal server error',
    error: process.env.NODE_ENV === 'development' ? err.message : undefined
  });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: 'Route not found'
  });
});

// Initialize services and start server
async function startServer() {
  try {
    console.log('🚀 Starting BlockProof Backend Server...\n');

    // Initialize blockchain service
    console.log('Initializing blockchain service...');
    await blockchainService.initialize();

    // Initialize Gemini AI service
    console.log('Initializing Gemini AI service...');
    await geminiService.initialize();

    // Start server
    app.listen(PORT, () => {
      console.log(`\n✨ Server is running on port ${PORT}`);
      console.log(`📍 API endpoint: http://localhost:${PORT}/api`);
      console.log(`🏥 Health check: http://localhost:${PORT}/api/health\n`);
    });
  } catch (error) {
    console.error('❌ Failed to start server:', error);
    process.exit(1);
  }
}

// Start the server
startServer();

module.exports = app;
