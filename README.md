# BlockProof – Google Certificate Verification System Using Blockchain & AI

![BlockProof Banner](https://img.shields.io/badge/BlockProof-Certificate%20Verification-blue)
![License](https://img.shields.io/badge/license-MIT-green)
![Blockchain](https://img.shields.io/badge/Blockchain-Polygon%20Mumbai-purple)
![AI](https://img.shields.io/badge/AI-Google%20Gemini-orange)

## 🎯 Project Overview

**BlockProof** is a revolutionary, **hackathon-ready** certificate verification system that combines **blockchain technology** with **artificial intelligence** to ensure certificate authenticity and detect tampering in real-time.

### The Problem 🔴
- **Fake certificates** are flooding the market - employers can't verify authenticity
- **Manual verification** is time-consuming and unreliable
- **No permanent audit trail** - once a certificate is issued, there's no immutable record
- **Tampering is easy** - PDFs and images can be edited without detection
- **Trust issues** - no way to verify issuer legitimacy

### The Solution 🟢
BlockProof uses a **two-layer verification system**:

1. **Blockchain Layer** 🔗
   - SHA-256 hash of certificate data stored on Polygon Mumbai testnet
   - Immutable proof of issuance
   - Permanent audit trail
   - Smart contract manages issuance, verification, and revocation

2. **AI Layer** 🤖
   - Google Gemini API analyzes certificate for tampering
   - Detects: altered text, fake logos, formatting mismatches, image quality issues
   - Confidence scoring (0-100)
   - Instant analysis without manual review

**Result:** A certificate is **VERIFIED** only when:
- ✅ Hash matches blockchain record (no tampering)
- ✅ AI confidence is high (authentic appearance)
- ✅ Certificate is not revoked
- ✅ Issuer is authorized

---

## 🚀 Quick Start (2 Minutes)

### For **DEMO MODE** (No blockchain or API keys needed!)

```bash
# 1. Clone and setup
git clone <your-repo>
cd BlockProof-GoogleCertificateVerificationSystem

# 2. Install dependencies
cd backend && npm install
cd ../frontend && npm install && cd ..

# 3. Start both servers (from root or in separate terminals)
# Terminal 1 - Backend
cd backend && npm run dev

# Terminal 2 - Frontend
cd frontend && npm run dev

# 4. Open browser
# Frontend: http://localhost:5173
# API: http://localhost:5000/api/health
```

**That's it!** Everything works in simulation mode - perfect for demos and presentations.

### For **PRODUCTION** (With real blockchain & AI)
See [DEPLOYMENT.md](./DEPLOYMENT.md) for complete setup guide.

---

## 📋 Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                      BlockProof System                       │
└─────────────────────────────────────────────────────────────┘

┌─────────────────────┐                 ┌─────────────────────┐
│   FRONTEND (React)  │                 │  BACKEND (Node.js)  │
│                     │                 │                     │
│  • Home             │────────────────▶│  • Express Server   │
│  • Issue Cert       │  HTTP Request   │  • Certificate API  │
│  • Verify Cert      │◀────────────────│  • File Upload      │
│  • View Results     │   JSON Response │  • Hash Generation  │
│  • About            │                 │                     │
└─────────────────────┘                 └────────┬────────────┘
                                                 │
                              ┌──────────────────┼──────────────────┐
                              │                  │                  │
                              ▼                  ▼                  ▼
                    ┌──────────────────┐ ┌──────────────────┐ ┌────────────────┐
                    │  BLOCKCHAIN      │ │   AI/GEMINI      │ │    STORAGE     │
                    │  (Polygon/Eth)   │ │   (Google)       │ │  (Blockchain)  │
                    │                  │ │                  │ │                │
                    │  • Hash Store    │ │  • Image Analysis│ │ • Immutable    │
                    │  • Verification  │ │  • Tampering     │ │ • Audit Trail  │
                    │  • Revocation    │ │  • Confidence    │ │ • Permanent    │
                    │  • Smart Contract│ │  • Scoring       │ │                │
                    └──────────────────┘ └──────────────────┘ └────────────────┘
```

### Technology Stack

| Layer | Technology | Purpose |
|-------|-----------|---------|
| **Frontend** | React 18 + Vite | User interface |
| **Styling** | Tailwind CSS | Google-like UI design |
| **Backend** | Node.js + Express | REST API server |
| **Blockchain** | Solidity + Hardhat | Smart contracts |
| **Blockchain RPC** | Polygon Mumbai | Testnet (free, fast) |
| **Blockchain Lib** | Ethers.js v6 | Contract interaction |
| **AI** | Google Gemini API | Certificate analysis |
| **Hashing** | SHA-256 (Node crypto) | Certificate fingerprinting |
| **File Upload** | Multer | Image/PDF handling |

---

## 🎮 User Workflows

### 1. **Issue a Certificate** (Admin)

```
Admin Portal
    ↓
Enter: Recipient Name, Issuer, Course, Date
    ↓
System generates unique Certificate ID
    ↓
Create SHA-256 hash of certificate data
    ↓
Store hash on Polygon blockchain
    ↓
Return: Certificate ID (for verification)
    ↓
Success! Certificate is now on blockchain
```

**Endpoint:** `POST /api/certificates/issue`

### 2. **Verify a Certificate** (User/Employer)

```
User enters Certificate ID
    ↓
Check if exists on blockchain
    ↓
If yes → Query blockchain for hash
    ↓
Check if certificate is revoked
    ↓
(Optional) Verify data matches blockchain hash
    ↓
(Optional) Upload certificate image for AI analysis
    ↓
Gemini API analyzes for tampering
    ↓
Returns confidence score & findings
    ↓
System determines: VERIFIED / SUSPICIOUS / FAKE
    ↓
Display results with evidence
```

**Endpoint:** `POST /api/certificates/verify`

### 3. **Analyze Certificate Image** (Optional)

```
User uploads certificate PDF/image
    ↓
System sends to Gemini AI
    ↓
AI analyzes:
  • Logo authenticity
  • Text quality & consistency
  • Formatting & layout
  • Image manipulation signs
    ↓
Returns: Tampering probability & detailed findings
    ↓
User sees visual report
```

**Endpoint:** `POST /api/certificates/analyze-image`

---

## 📁 Project Structure

```
BlockProof/
├── backend/                          # Node.js + Express server
│   ├── contracts/
│   │   └── CertificateRegistry.sol  # Smart contract (Solidity)
│   ├── controllers/
│   │   └── certificateController.js # Business logic
│   ├── routes/
│   │   └── certificate.js           # API endpoints
│   ├── utils/
│   │   ├── blockchain.js            # Blockchain interactions
│   │   ├── gemini.js                # AI verification
│   │   └── hash.js                  # SHA-256 hashing
│   ├── uploads/                     # Uploaded files
│   ├── server.js                    # Express app
│   ├── package.json
│   └── .env.example                 # Environment template
│
├── frontend/                         # React + Vite
│   ├── src/
│   │   ├── components/
│   │   │   ├── Header.jsx
│   │   │   └── Footer.jsx
│   │   ├── pages/
│   │   │   ├── Home.jsx             # Landing page
│   │   │   ├── Admin.jsx            # Issue certificates
│   │   │   ├── Verify.jsx           # Verify certificates
│   │   │   ├── Result.jsx           # Verification results
│   │   │   └── About.jsx            # About page
│   │   ├── utils/
│   │   │   └── api.js               # API client
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── index.css
│   ├── package.json
│   └── vite.config.js
│
├── README.md                         # This file
├── QUICKSTART.md                     # Quick setup guide
├── DEPLOYMENT.md                     # Production deployment
└── LICENSE
```

---

## 🔑 API Endpoints

### Certificate Management

#### Issue Certificate
```http
POST /api/certificates/issue
Content-Type: application/json

{
  "recipientName": "John Doe",
  "issuerName": "Google",
  "course": "Cloud Architecture Essentials",
  "issueDate": "2024-01-15",
  "additionalInfo": "With distinction"
}

Response (201 Created):
{
  "success": true,
  "message": "Certificate issued successfully",
  "certificate": {
    "certificateId": "CERT-1704067200000-ABC123D4",
    "recipientName": "John Doe",
    "issuerName": "Google",
    "hash": "3a7f8c2d9e1b4a6f..."
  },
  "blockchain": {
    "success": true,
    "transactionHash": "0x..."
  }
}
```

#### Verify Certificate
```http
POST /api/certificates/verify
Content-Type: application/json

{
  "certificateId": "CERT-1704067200000-ABC123D4",
  "certificateData": {
    "recipientName": "John Doe",
    "issuerName": "Google",
    "course": "Cloud Architecture Essentials"
  }
}

Response (200 OK):
{
  "success": true,
  "verified": true,
  "verdict": "VERIFIED",
  "confidence": 95
}
```

#### Get Certificate
```http
GET /api/certificates/{certificateId}

Response (200 OK):
{
  "success": true,
  "certificateId": "CERT-1704067200000-ABC123D4",
  "hash": "3a7f8c2d9e1b4a6f...",
  "issuer": "Google",
  "recipient": "John Doe",
  "revoked": false
}
```

---

## 💡 Hackathon Pitch Points

### Why BlockProof Wins Hackathons:

1. **Solves Real Problem**
   - Certificate fraud is a $100M+ market problem
   - Employers need instant verification
   - No existing solution combines blockchain + AI

2. **Complete Solution**
   - Not just theory - fully functional end-to-end
   - Works in demo mode (no keys needed!)
   - Professional UI ready for investor demo

3. **Impressive Tech Stack**
   - Blockchain: Polygon, Solidity, Smart Contracts
   - AI: Google Gemini API for real analysis
   - Full-stack: React, Node.js, Express
   - Shows versatility across 4+ domains

4. **Scalable Architecture**
   - Can handle millions of certificates
   - Decentralized storage (blockchain)
   - AI analysis runs instantly
   - Low cost (free testnet, cheap gas)

5. **Beginner-Friendly**
   - Works with just `npm install && npm run dev`
   - Simulation mode for demos (no setup needed)
   - Clear comments in every file
   - Comprehensive documentation

6. **Production Ready**
   - Can go live immediately
   - All security best practices
   - Error handling throughout
   - Professional code quality

---

## 🔒 Security Features

- ✅ SHA-256 hashing (cryptographically secure)
- ✅ Blockchain immutability
- ✅ Smart contract access controls
- ✅ API input validation
- ✅ CORS protection
- ✅ Rate limiting ready
- ✅ Secure key management (.env)

---

## 📚 Additional Documentation

- **[SECURITY.md](./SECURITY.md)** - Comprehensive security practices and guidelines
- **[CONTRIBUTING.md](./CONTRIBUTING.md)** - How to contribute to this project
- **[backend/.env.example](./backend/.env.example)** - Environment configuration template

---

## 🚀 Deployment Guide

### Option 1: Railway (Recommended for Backend)

1. Create account at [railway.app](https://railway.app)
2. Install Railway CLI: `npm install -g @railway/cli`
3. Deploy:
   ```bash
   cd backend
   railway login
   railway init
   railway up
   ```
4. Set environment variables in Railway dashboard

### Option 2: Vercel (Recommended for Frontend)

1. Install Vercel CLI: `npm install -g vercel`
2. Deploy:
   ```bash
   cd frontend
   vercel
   ```
3. Set `VITE_API_URL` to your backend URL

### Option 3: Manual Deployment

See detailed instructions in your hosting provider's documentation.

---

## 🐛 Troubleshooting

### Common Issues

**Q: "Contract not initialized" error?**  
A: Normal for demo mode. Set `CONTRACT_ADDRESS` in `.env` to deploy on blockchain.

**Q: "GEMINI_API_KEY not set" warning?**  
A: Normal - AI runs in simulation mode. Get free API key at https://ai.google.dev/

**Q: Frontend can't connect to backend?**  
A: 
1. Check backend is running on port 5000: `curl http://localhost:5000/api/health`
2. Verify CORS settings in `backend/server.js`
3. Check `VITE_API_URL` in frontend `.env`

**Q: Port already in use?**  
A: Change `PORT` in `backend/.env` or kill the process using the port

**Q: Dependencies not installing?**  
A: 
1. Delete `node_modules` and `package-lock.json`
2. Run `npm install` again
3. Make sure you're using Node.js 16+

**Q: Blockchain transaction failing?**  
A:
1. Check you have testnet MATIC in your wallet
2. Verify RPC URL is correct
3. Ensure private key is valid (no 0x prefix)

**Q: File upload not working?**  
A:
1. Check file size is under 5MB
2. Verify file type is JPG, PNG, GIF, or PDF
3. Check `uploads/` directory exists and is writable

---

## 🎤 Demo Script for Hackathons

### 5-Minute Pitch Structure

**1. Introduction (30 seconds)**
```
"BlockProof solves certificate fraud using blockchain and AI.
The problem: Fake certificates are everywhere.
Our solution: Two-layer verification - blockchain immutability 
plus AI tampering detection."
```

**2. Issue Certificate (1 minute)**
- Navigate to Admin page
- Fill form with demo data
- Show blockchain confirmation
- Copy the Certificate ID

**3. Verify Valid Certificate (1 minute)**
- Navigate to Verify page
- Paste Certificate ID
- Show VERIFIED result with confidence score

**4. Detect Tampering (1.5 minutes)**
- Change one field in the data
- Verify again
- Show SUSPICIOUS result
- Explain hash mismatch detection

**5. AI Analysis (1 minute)**
- Upload certificate image
- Show AI tampering analysis
- Display confidence scoring

**6. Closing (30 seconds)**
```
"This is production-ready, works on free testnets,
and can verify millions of certificates instantly.
Thank you!"
```

### Key Talking Points

- ✅ **Real Problem**: $100M+ certificate fraud market
- ✅ **Complete Solution**: Not just a prototype
- ✅ **Advanced Tech**: Blockchain + AI combination
- ✅ **Production Ready**: Can deploy today
- ✅ **Scalable**: Handles millions of certificates
- ✅ **Cost Effective**: Free testnets, low gas fees

---

## 🗺️ Roadmap

### Phase 1: Current (v1.0.0) ✅
- [x] Smart contract for certificate management
- [x] Two-layer verification (blockchain + AI)
- [x] React frontend with Tailwind
- [x] Express backend API
- [x] Demo mode for presentations
- [x] Complete documentation

### Phase 2: Enhancements (v1.1.0)
- [ ] QR code generation for certificates
- [ ] Email verification and notifications
- [ ] Analytics dashboard
- [ ] Batch certificate issuance

### Phase 3: Mobile & Multi-Chain (v1.2.0)
- [ ] React Native mobile app
- [ ] Multi-chain support (Ethereum, Arbitrum, Optimism)
- [ ] IPFS integration for decentralized storage
- [ ] Advanced dashboard

### Phase 4: Enterprise (v2.0.0)
- [ ] OAuth/SSO integration
- [ ] Webhooks for events
- [ ] API key management
- [ ] White-label solution

---

## 📊 Project Statistics

- **Smart Contract**: 314 lines (Solidity)
- **Backend**: 1,400+ lines (Node.js)
- **Frontend**: 600+ lines (React)
- **API Endpoints**: 6
- **Functions**: 53
- **Documentation**: 540+ comments

---

## 📄 License

MIT License - See [LICENSE](./LICENSE) for details.

---

## 👥 Contributing

We welcome contributions! Please see [CONTRIBUTING.md](./CONTRIBUTING.md) for details on:
- Code style guidelines
- Development setup
- Pull request process
- Areas for contribution

---

## 🙏 Acknowledgments

- **Polygon** for free testnet
- **Google** for Gemini API
- **Ethereum** for smart contract standards
- **Open source community** for amazing tools

---

**Made with ❤️ for hackathons and certificate verification** 🚀

⭐ Star this repo if you found it helpful!

📧 Questions? Open an issue or reach out to the team.