# BlockProof Quick Start Guide

Get BlockProof up and running in minutes!

## Prerequisites

- Node.js v16+ installed
- npm or yarn
- (Optional) MetaMask wallet for blockchain features
- (Optional) Google Gemini API key for AI features

## Quick Setup (Development Mode)

### 1. Install Dependencies

```bash
# Install backend dependencies
cd backend
npm install

# Install frontend dependencies
cd ../frontend
npm install
```

### 2. Configure Backend

Create `backend/.env` file:

```env
PORT=5000
NODE_ENV=development
FRONTEND_URL=http://localhost:5173

# Optional: For blockchain functionality
# BLOCKCHAIN_RPC_URL=https://rpc-mumbai.maticvigil.com/
# PRIVATE_KEY=your_private_key
# CONTRACT_ADDRESS=your_contract_address

# Optional: For AI functionality
# GEMINI_API_KEY=your_api_key
```

**Note**: The system works without blockchain and AI configuration in simulation mode.

### 3. Start the Application

Open two terminals:

**Terminal 1 - Backend:**
```bash
cd backend
npm start
```

Backend runs on: http://localhost:5000

**Terminal 2 - Frontend:**
```bash
cd frontend
npm run dev
```

Frontend runs on: http://localhost:5173

### 4. Open Your Browser

Navigate to: http://localhost:5173

## What You Can Do

### Without Configuration (Simulation Mode)

- ✅ Issue certificates (generates IDs and hashes)
- ✅ Verify certificates (simulated verification)
- ✅ View all pages and UI functionality
- ⚠️ Changes won't persist (no blockchain storage)

### With Full Configuration

- ✅ Store certificates on blockchain (immutable)
- ✅ AI-powered verification with Google Gemini
- ✅ Real-time blockchain verification
- ✅ Production-ready functionality

## Testing the System

### 1. Issue a Test Certificate

1. Go to **Admin** page
2. Fill in the form:
   - Recipient: "John Doe"
   - Issuer: "Tech University"
   - Course: "Web Development"
   - Date: Today's date
3. Click "Issue Certificate"
4. Copy the Certificate ID from the result page

### 2. Verify the Certificate

1. Go to **Verify** page
2. Paste the Certificate ID
3. Click "Verify Certificate"
4. View the verification results

## Troubleshooting

### Backend won't start

```bash
# Check if port 5000 is in use
lsof -i :5000

# Use a different port
PORT=5001 npm start
```

### Frontend won't start

```bash
# Clear node_modules and reinstall
rm -rf node_modules
npm install
npm run dev
```

### Build errors

```bash
# Clear cache
rm -rf node_modules dist .vite
npm install
npm run build
```

## Next Steps

### Enable Blockchain Features

1. Get testnet MATIC from [Polygon Faucet](https://faucet.polygon.technology/)
2. Deploy the smart contract (see DEPLOYMENT.md)
3. Add blockchain configuration to `.env`
4. Restart backend

### Enable AI Features

1. Get API key from [Google AI Studio](https://makersuite.google.com/app/apikey)
2. Add `GEMINI_API_KEY` to `.env`
3. Restart backend

## Development Tips

### Backend Hot Reload

Use nodemon for automatic restarts:

```bash
npm install -g nodemon
cd backend
nodemon server.js
```

### Frontend Hot Reload

Vite provides hot module replacement automatically!

### Testing API Endpoints

```bash
# Health check
curl http://localhost:5000/api/health

# Issue certificate (requires running backend)
curl -X POST http://localhost:5000/api/issue-certificate \
  -H "Content-Type: application/json" \
  -d '{
    "recipientName": "Jane Doe",
    "issuerName": "University",
    "course": "Blockchain"
  }'
```

## Project Structure

```
├── backend/           # Node.js + Express API
│   ├── controllers/   # Request handlers
│   ├── routes/        # API routes
│   ├── utils/         # Helper functions
│   └── contracts/     # Smart contracts
└── frontend/          # React application
    ├── src/
    │   ├── components/  # Reusable components
    │   ├── pages/       # Page components
    │   └── utils/       # Helper functions
    └── dist/            # Build output
```

## Need Help?

- Check README.md for detailed documentation
- See DEPLOYMENT.md for production deployment
- Review code comments for implementation details

---

**Happy Coding! 🚀**
