const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const certificateRoutes = require("./routes/certificate");
const blockchainService = require("./utils/blockchain");
const geminiService = require("./utils/gemini");

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true, limit: "10mb" }));

app.use((req, res, next) => {
  console.log(`🚀 ${req.method} request received at ${req.path}`);
  next();
});

// Health check
app.get("/api/health", (req, res) => {
  res.json({
    success: true,
    message: "BlockProof Backend is LIVE",
    blockchain: blockchainService.isInitialized ? "Connected" : "Simulated",
    ai: geminiService.isInitialized ? "Connected" : "Simulated",
  });
});

app.use("/api", certificateRoutes);

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
