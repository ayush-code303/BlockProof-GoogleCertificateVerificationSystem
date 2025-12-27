const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const certificateRoutes = require('./routes/certificate');
const blockchainService = require('./utils/blockchain');
const geminiService = require('./utils/gemini');

// Load environment variables from .env file
dotenv.config();

// Initialize Express app
const app = express();
const PORT = process.env.PORT || 5000;

// ==================== MIDDLEWARE ====================

// CORS - Allow requests from frontend
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:5173',
  credentials: true
}));

// Body parsing middleware
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Request logging middleware (optional - helpful for debugging)
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.path}`);
  next();
});

// ==================== API ENDPOINTS ====================

/**
 * Health check endpoint
 * Used to verify that API is running and services are initialized
 * GET /api/health
 */
app.get('/api/health', (req, res) => {
  res.json({
    success: true,
    message: 'BlockProof API is running',
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV || 'development',
    services: {
      blockchain: {
        initialized: blockchainService.isInitialized,
        hasContract: !!blockchainService.contract,
        onBlockchain: blockchainService.isInitialized
      },
      ai: {
        initialized: geminiService.isInitialized,
        hasModel: !!geminiService.model,
        onAI: geminiService.isInitialized
      }
    }
  });
});

/**
 * Status endpoint - detailed service information
 * GET /api/status
 */
app.get('/api/status', (req, res) => {
  res.json({
    success: true,
    status: 'running',
    api: {
      version: '1.0.0',
      name: 'BlockProof Certificate Verification System',
      description: 'Blockchain + AI powered certificate verification'
    },
    features: {
      certificateIssuing: true,
      blockchainVerification: blockchainService.isInitialized,
      aiAnalysis: geminiService.isInitialized,
      imageAnalysis: true,
      certificateRevocation: true
    },
    endpoints: {
      issue: 'POST /api/certificates/issue',
      verify: 'POST /api/certificates/verify',
      get: 'GET /api/certificates/:certificateId',
      revoke: 'POST /api/certificates/:certificateId/revoke',
      analyzeImage: 'POST /api/certificates/analyze-image',
      extractData: 'POST /api/certificates/extract-data'
    }
  });
});

// Certificate API routes
app.use('/api', certificateRoutes);

// ==================== ERROR HANDLING ====================

/**
 * Global error handling middleware
 * Catches all errors and returns consistent error response
 */
app.use((err, req, res, next) => {
  console.error('❌ Error:', err);
  
  // Handle multer file upload errors
  if (err.name === 'MulterError') {
    return res.status(400).json({
      success: false,
      message: `File upload error: ${err.message}`
    });
  }

  res.status(err.status || 500).json({
    success: false,
    message: err.message || 'Internal server error',
    error: process.env.NODE_ENV === 'development' ? err : undefined
  });
});

/**
 * 404 handler - for undefined routes
 */
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: 'Route not found',
    path: req.path,
    availableEndpoints: {
      health: 'GET /api/health',
      status: 'GET /api/status',
      issue: 'POST /api/certificates/issue',
      verify: 'POST /api/certificates/verify',
      get: 'GET /api/certificates/:certificateId'
    }
  });
});

// ==================== SERVER STARTUP ====================

/**
 * Initialize services and start the server
 */
async function startServer() {
  try {
    console.log('\n🚀 ==================== BlockProof Backend ====================');
    console.log('   Google Certificate Verification Using Blockchain & AI');
    console.log('   ========================================================\n');

    // Initialize blockchain service
    console.log('📦 Initializing Blockchain Service...');
    const blockchainReady = await blockchainService.initialize();
    if (!blockchainReady) {
      console.warn('   ⚠ Blockchain will run in simulation mode (demo)');
    }

    // Initialize Gemini AI service
    console.log('\n🤖 Initializing Gemini AI Service...');
    const aiReady = await geminiService.initialize();
    if (!aiReady) {
      console.warn('   ⚠ AI will run in simulation mode (demo)');
    }

    // Start Express server
    app.listen(PORT, () => {
      console.log('\n✅ ==================== SERVER STARTED ====================');
      console.log(`   🌐 API URL: http://localhost:${PORT}/api`);
      console.log(`   🏥 Health Check: http://localhost:${PORT}/api/health`);
      console.log(`   📊 Status: http://localhost:${PORT}/api/status`);
      console.log(`   🔌 Port: ${PORT}`);
      console.log('   ========================================================\n');

      if (process.env.NODE_ENV === 'development') {
        console.log('💡 Development Mode - Full error details will be logged\n');
      }
    });
  } catch (error) {
    console.error('❌ Failed to start server:', error);
    process.exit(1);
  }
}

// Handle graceful shutdown
process.on('SIGINT', () => {
  console.log('\n\n🛑 Server shutting down gracefully...');
  process.exit(0);
});

// Start the server
startServer();

module.exports = app;
