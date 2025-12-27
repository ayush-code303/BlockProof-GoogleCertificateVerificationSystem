# BlockProof - Certificate Verification System

A secure certificate verification system using **Blockchain Technology** and **Artificial Intelligence**.

## 🌟 Features

- **Two-Layer Verification System**
  - **Blockchain Layer**: SHA-256 hashing with Ethereum/Polygon testnet storage
  - **AI Layer**: Google Gemini API for intelligent certificate validation

- **Modern Tech Stack**
  - React + Tailwind CSS frontend with Google-inspired UI
  - Node.js + Express backend
  - Solidity smart contracts
  - Ethers.js for blockchain interaction

- **Key Pages**
  - Home: Landing page with quick verification
  - Admin: Issue new certificates
  - Verify: Verify certificate authenticity
  - Result: Display verification results
  - About: System information

## 📋 Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- MetaMask wallet (for blockchain operations)
- Google Gemini API key (optional, falls back to simulation mode)
- Access to Ethereum or Polygon testnet

## 🚀 Installation

### 1. Clone the Repository

```bash
git clone https://github.com/ayush-code303/BlockProof-GoogleCertificateVerificationSystem.git
cd BlockProof-GoogleCertificateVerificationSystem
```

### 2. Backend Setup

```bash
cd backend
npm install
```

Create a `.env` file in the `backend` directory:

```env
PORT=5000
NODE_ENV=development

# Blockchain Configuration (Polygon Mumbai Testnet)
BLOCKCHAIN_RPC_URL=https://rpc-mumbai.maticvigil.com/
PRIVATE_KEY=your_private_key_here
CONTRACT_ADDRESS=your_contract_address_here

# Google Gemini API
GEMINI_API_KEY=your_gemini_api_key_here

# CORS
FRONTEND_URL=http://localhost:5173
```

### 3. Deploy Smart Contract

1. Install Hardhat or Truffle for contract deployment
2. Deploy the `CertificateRegistry.sol` contract to Polygon Mumbai testnet
3. Copy the contract address to your `.env` file

**Quick Deployment with Hardhat:**

```bash
npm install --save-dev hardhat @nomicfoundation/hardhat-toolbox
npx hardhat init
# Copy CertificateRegistry.sol to contracts/
# Configure hardhat.config.js with Mumbai testnet
npx hardhat run scripts/deploy.js --network mumbai
```

### 4. Frontend Setup

```bash
cd ../frontend
npm install
```

### 5. Get Polygon Mumbai Testnet MATIC

1. Get testnet MATIC from [Polygon Faucet](https://faucet.polygon.technology/)
2. Use the wallet address associated with your PRIVATE_KEY

### 6. Get Google Gemini API Key

1. Visit [Google AI Studio](https://makersuite.google.com/app/apikey)
2. Create a new API key
3. Add it to your backend `.env` file

**Note**: The system works in simulation mode without Gemini API, but with reduced AI capabilities.

## 🏃‍♂️ Running the Application

### Start Backend Server

```bash
cd backend
npm start
# or for development with auto-reload
npm run dev
```

Backend will run on `http://localhost:5000`

### Start Frontend Development Server

```bash
cd frontend
npm run dev
```

Frontend will run on `http://localhost:5173`

## 📖 Usage

### Issue a Certificate

1. Navigate to **Admin** page
2. Fill in certificate details:
   - Recipient Name
   - Issuer Name/Organization
   - Course/Certificate Title
   - Issue Date
   - Additional Information (optional)
3. Click "Issue Certificate"
4. Save the generated Certificate ID for future verification

### Verify a Certificate

1. Navigate to **Verify** page
2. Enter the Certificate ID
3. Click "Verify Certificate"
4. View verification results showing:
   - Blockchain verification status
   - AI verification assessment
   - Certificate details

## 🏗️ Project Structure

```
BlockProof-GoogleCertificateVerificationSystem/
├── backend/
│   ├── contracts/
│   │   └── CertificateRegistry.sol    # Smart contract
│   ├── controllers/
│   │   └── certificateController.js   # API controllers
│   ├── routes/
│   │   └── certificate.js             # API routes
│   ├── utils/
│   │   ├── blockchain.js              # Blockchain service
│   │   ├── gemini.js                  # AI service
│   │   └── hash.js                    # Hashing utilities
│   ├── uploads/                        # File uploads directory
│   ├── .env.example                    # Environment variables template
│   ├── package.json
│   └── server.js                       # Express server
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Header.jsx
│   │   │   └── Footer.jsx
│   │   ├── pages/
│   │   │   ├── Home.jsx
│   │   │   ├── Admin.jsx
│   │   │   ├── Verify.jsx
│   │   │   ├── Result.jsx
│   │   │   └── About.jsx
│   │   ├── utils/
│   │   │   └── api.js                 # API client
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── index.css
│   ├── index.html
│   ├── package.json
│   ├── vite.config.js
│   ├── tailwind.config.js
│   └── postcss.config.js
└── README.md
```

## 🔧 API Endpoints

### POST /api/issue-certificate
Issue a new certificate and store it on blockchain.

**Request Body:**
```json
{
  "recipientName": "John Doe",
  "issuerName": "Tech University",
  "course": "Web Development",
  "issueDate": "2024-01-01",
  "additionalInfo": "Completed with distinction"
}
```

### POST /api/verify-certificate
Verify a certificate using certificate ID.

**Request Body:**
```json
{
  "certificateId": "CERT-1234567890-ABCD1234",
  "certificateData": null
}
```

### GET /api/certificate/:certificateId
Get certificate details from blockchain.

### GET /api/health
Health check endpoint to verify API status.

## 🎨 UI Design

The frontend features a Google-inspired design with:
- Clean, minimalist interface
- Google color scheme (Blue, Red, Yellow, Green)
- Responsive layout with Tailwind CSS
- Smooth animations and transitions
- Intuitive navigation

## 🔐 Security Features

- **SHA-256 Hashing**: Cryptographic hashing of certificate data
- **Blockchain Immutability**: Tamper-proof storage on Ethereum/Polygon
- **AI Validation**: Google Gemini AI analyzes certificate authenticity
- **Secure API**: CORS protection and input validation
- **Private Key Security**: Environment variables for sensitive data

## 🌐 Blockchain Networks

The system supports:
- **Ethereum Testnets**: Goerli, Sepolia
- **Polygon Mumbai Testnet**: Recommended for lower gas fees
- **Mainnet**: Can be configured for production use

## 🤖 AI Verification

Google Gemini AI provides:
- Data consistency validation
- Format verification
- Anomaly detection
- Confidence scoring (0-100)
- Detailed assessment reports

## 📝 Smart Contract

The `CertificateRegistry` contract includes:
- `storeCertificate()`: Store certificate hash with metadata
- `verifyCertificate()`: Verify and retrieve certificate details
- `getCertificate()`: Get certificate information
- Event emission for transaction tracking

## 🐛 Troubleshooting

### Backend won't start
- Ensure all environment variables are set correctly
- Check if port 5000 is available
- Verify Node.js version (v16+)

### Blockchain connection fails
- Verify RPC URL is correct and accessible
- Check if wallet has testnet MATIC
- Ensure PRIVATE_KEY is valid

### AI verification not working
- Verify GEMINI_API_KEY is set correctly
- System falls back to simulation mode if API key is missing
- Check API quota limits

### Frontend can't connect to backend
- Ensure backend is running on port 5000
- Check CORS configuration in server.js
- Verify proxy settings in vite.config.js

## 🚢 Deployment

### Backend Deployment (Railway/Render/Heroku)

1. Push code to GitHub
2. Connect repository to hosting platform
3. Set environment variables
4. Deploy

### Frontend Deployment (Vercel/Netlify)

1. Build the frontend: `npm run build`
2. Deploy the `dist` folder
3. Configure environment variables if needed

### Smart Contract Deployment

Use Hardhat/Truffle to deploy to mainnet:

```bash
npx hardhat run scripts/deploy.js --network polygon
```

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is licensed under the MIT License.

## 👨‍💻 Developer

Developed with ❤️ using Blockchain and AI technologies.

## 🔗 Links

- [Polygon Documentation](https://docs.polygon.technology/)
- [Ethers.js Documentation](https://docs.ethers.org/)
- [Google Gemini API](https://ai.google.dev/)
- [React Documentation](https://react.dev/)
- [Tailwind CSS](https://tailwindcss.com/)

---

**Note**: This system is designed for educational and demonstration purposes. For production use, implement additional security measures, error handling, and testing.