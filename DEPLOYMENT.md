# BlockProof Deployment Guide

This guide provides step-by-step instructions for deploying the BlockProof Certificate Verification System.

## Table of Contents

1. [Smart Contract Deployment](#smart-contract-deployment)
2. [Backend Deployment](#backend-deployment)
3. [Frontend Deployment](#frontend-deployment)
4. [Post-Deployment Configuration](#post-deployment-configuration)

---

## Smart Contract Deployment

### Prerequisites

- MetaMask wallet with testnet MATIC
- Hardhat installed
- RPC URL for Polygon Mumbai testnet

### Setup Hardhat

```bash
cd backend
npm install --save-dev hardhat @nomicfoundation/hardhat-toolbox
npx hardhat init
```

### Configure Hardhat

Create `hardhat.config.js`:

```javascript
require("@nomicfoundation/hardhat-toolbox");
require("dotenv").config();

module.exports = {
  solidity: "0.8.19",
  networks: {
    mumbai: {
      url: process.env.BLOCKCHAIN_RPC_URL || "https://rpc-mumbai.maticvigil.com/",
      accounts: [process.env.PRIVATE_KEY]
    }
  }
};
```

### Create Deploy Script

Create `scripts/deploy.js`:

```javascript
const hre = require("hardhat");

async function main() {
  console.log("Deploying CertificateRegistry contract...");

  const CertificateRegistry = await hre.ethers.getContractFactory("CertificateRegistry");
  const certificate = await CertificateRegistry.deploy();

  await certificate.waitForDeployment();

  console.log("CertificateRegistry deployed to:", await certificate.getAddress());
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
```

### Deploy Contract

```bash
# Copy the contract to Hardhat contracts directory
cp contracts/CertificateRegistry.sol contracts/

# Deploy to Mumbai testnet
npx hardhat run scripts/deploy.js --network mumbai
```

**Save the contract address** and add it to your `.env` file:

```env
CONTRACT_ADDRESS=0x... # Your deployed contract address
```

---

## Backend Deployment

### Option 1: Railway

1. **Create Railway Account**: Visit [railway.app](https://railway.app)

2. **Create New Project**:
   ```bash
   # Install Railway CLI
   npm install -g @railway/cli
   
   # Login
   railway login
   
   # Initialize project
   cd backend
   railway init
   ```

3. **Set Environment Variables**:
   - Go to Railway dashboard
   - Add all variables from `.env.example`
   - Include your contract address

4. **Deploy**:
   ```bash
   railway up
   ```

### Option 2: Render

1. **Create Render Account**: Visit [render.com](https://render.com)

2. **Create Web Service**:
   - Connect GitHub repository
   - Select `backend` directory
   - Build command: `npm install`
   - Start command: `npm start`

3. **Environment Variables**:
   - Add all variables from `.env.example`

### Option 3: Heroku

1. **Install Heroku CLI**:
   ```bash
   npm install -g heroku
   heroku login
   ```

2. **Create App**:
   ```bash
   cd backend
   heroku create blockproof-backend
   ```

3. **Set Environment Variables**:
   ```bash
   heroku config:set PORT=5000
   heroku config:set BLOCKCHAIN_RPC_URL=your_rpc_url
   heroku config:set PRIVATE_KEY=your_private_key
   heroku config:set CONTRACT_ADDRESS=your_contract_address
   heroku config:set GEMINI_API_KEY=your_gemini_key
   heroku config:set FRONTEND_URL=your_frontend_url
   ```

4. **Deploy**:
   ```bash
   git add .
   git commit -m "Deploy backend"
   git push heroku main
   ```

---

## Frontend Deployment

### Option 1: Vercel (Recommended)

1. **Install Vercel CLI**:
   ```bash
   npm install -g vercel
   ```

2. **Deploy**:
   ```bash
   cd frontend
   vercel
   ```

3. **Configure**:
   - Follow prompts
   - Set build command: `npm run build`
   - Set output directory: `dist`

4. **Environment Variables**:
   ```bash
   vercel env add VITE_API_URL production
   # Enter your backend URL
   ```

### Option 2: Netlify

1. **Install Netlify CLI**:
   ```bash
   npm install -g netlify-cli
   ```

2. **Build**:
   ```bash
   cd frontend
   npm run build
   ```

3. **Deploy**:
   ```bash
   netlify deploy --prod --dir=dist
   ```

4. **Environment Variables**:
   - Go to Netlify dashboard
   - Site settings → Environment variables
   - Add `VITE_API_URL` with your backend URL

### Option 3: GitHub Pages

1. **Install gh-pages**:
   ```bash
   cd frontend
   npm install --save-dev gh-pages
   ```

2. **Add to package.json**:
   ```json
   {
     "scripts": {
       "predeploy": "npm run build",
       "deploy": "gh-pages -d dist"
     },
     "homepage": "https://username.github.io/repository-name"
   }
   ```

3. **Deploy**:
   ```bash
   npm run deploy
   ```

---

## Post-Deployment Configuration

### Update CORS Settings

In backend `server.js`, update CORS to include your production frontend URL:

```javascript
app.use(cors({
  origin: [
    'http://localhost:5173',
    'https://your-frontend-domain.com'
  ],
  credentials: true
}));
```

### Update Frontend API URL

Create `.env.production` in frontend:

```env
VITE_API_URL=https://your-backend-domain.com/api
```

### Test Deployment

1. **Test Backend**:
   ```bash
   curl https://your-backend-domain.com/api/health
   ```

2. **Test Frontend**:
   - Visit your frontend URL
   - Try issuing a certificate
   - Try verifying a certificate

### Monitor Services

- **Backend**: Check logs in Railway/Render/Heroku dashboard
- **Frontend**: Check build logs in Vercel/Netlify
- **Smart Contract**: Monitor transactions on [PolygonScan Mumbai](https://mumbai.polygonscan.com/)

---

## Production Checklist

- [ ] Smart contract deployed and verified
- [ ] Backend environment variables configured
- [ ] Frontend environment variables configured
- [ ] CORS settings updated
- [ ] API endpoints tested
- [ ] Certificate issuance tested
- [ ] Certificate verification tested
- [ ] Error handling verified
- [ ] Logging configured
- [ ] Monitoring setup
- [ ] Backup strategy in place

---

## Troubleshooting

### Contract Deployment Fails

- Check wallet has sufficient testnet MATIC
- Verify RPC URL is correct
- Ensure private key is valid (remove 0x prefix if present)

### Backend Won't Start

- Check all environment variables are set
- Verify contract address is correct
- Check database/storage permissions

### Frontend Build Fails

- Clear node_modules: `rm -rf node_modules && npm install`
- Check for TypeScript errors
- Verify all dependencies are installed

### API Connection Issues

- Check CORS configuration
- Verify API URL in frontend
- Check network/firewall settings

---

## Security Considerations

- Never commit `.env` files
- Use strong, unique private keys
- Enable rate limiting on API
- Implement API key authentication
- Use HTTPS for all connections
- Regular security audits
- Monitor for unusual activity

---

## Scaling

### Backend Scaling

- Use load balancers
- Implement caching (Redis)
- Database optimization
- Horizontal scaling

### Smart Contract

- Consider L2 solutions for lower fees
- Implement batch operations
- Optimize gas usage

---

## Support

For deployment issues:
- Check service documentation
- Review error logs
- Contact support teams
- Community forums

---

**Last Updated**: 2025-12-27
