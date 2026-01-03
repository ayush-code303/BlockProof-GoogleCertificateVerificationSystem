const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const certificateRoutes = require("./routes/certificate");
const blockchainService = require("./utils/blockchain");
const geminiService = require("./utils/gemini");

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// ==================== 1. CORS FIX (YE SABSE ZARURI HAI) ====================
// Ye aapke frontend (Port 5176) ko backend se baat karne ki permission dega
app.use(
  cors({
    origin: "*", // Sabhi ports ko allow karega
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

// Body parsing
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true, limit: "10mb" }));

// Request Logger
app.use((req, res, next) => {
  console.log(`🚀 ${req.method} request received at ${req.path}`);
  next();
});

// ==================== 2. API ROUTES ====================

// Health check (Check karne ke liye ki backend zinda hai ya nahi)
app.get("/api/health", (req, res) => {
  res.json({
    success: true,
    message: "BlockProof Backend is LIVE",
    blockchain: blockchainService.isInitialized ? "Connected" : "Simulated",
    ai: geminiService.isInitialized ? "Connected" : "Simulated",
  });
});

// Main Certificate Routes
app.use("/api", certificateRoutes);

// ==================== 3. ERROR HANDLING ====================
app.use((err, req, res, next) => {
  console.error("❌ Server Error:", err.stack);
  res.status(500).json({
    success: false,
    message: "Internal Server Error",
    error: err.message,
  });
});

// ==================== 4. START SERVER ====================
async function startServer() {
  try {
    console.log("\n--- Initializing Services ---");
    await blockchainService.initialize();
    await geminiService.initialize();

    app.listen(PORT, () => {
      console.log(`\n✅ SERVER STARTED SUCCESSFULLY`);
      console.log(`🌐 URL: http://localhost:${PORT}`);
      console.log(`-----------------------------\n`);
    });
  } catch (error) {
    console.error("❌ Startup Failed:", error);
  }
}

startServer();
