# BlockProof Deployment Guide

This guide covers how to ship BlockProof from local dev to production, including the backend (Node/Express), frontend (React/Vite), optional blockchain setup, and Gemini AI configuration.

## 1) Prerequisites
- Node.js 18+ recommended (backend requires >=16; Vercel/Netlify default to 18).
- npm 8+.
- GitHub repo access for CI/CD connects.
- Accounts: Railway (backend), Vercel (frontend). Optional: MetaMask with testnet MATIC for blockchain, Google AI key for Gemini.

## 2) Environment Variables
Configure these **before** deployment. Values without secrets are safe defaults; secrets must be stored in your host's secret manager.

| Variable | Required? | Description |
| --- | --- | --- |
| PORT | Optional | Backend port (default 5000). Usually set by platform. |
| NODE_ENV | Yes | `production` in hosted envs. |
| FRONTEND_URL | Yes | Full https URL of deployed frontend for CORS (e.g., https://app.example.com). |
| BLOCKCHAIN_RPC_URL | Optional | RPC endpoint (e.g., https://rpc-mumbai.maticvigil.com/). Leave empty for simulation mode. |
| CONTRACT_ADDRESS | Optional | Deployed CertificateRegistry address. Empty = simulation mode. |
| PRIVATE_KEY | Optional | Issuer wallet private key (use a throwaway or env secret). Needed only when CONTRACT_ADDRESS is set. |
| GEMINI_API_KEY | Optional | Google Gemini API key for AI analysis. Empty = AI simulation mode. |
| ALCHEMY_API_KEY / INFURA_PROJECT_ID | Optional | Premium RPC keys if you prefer. |
| VITE_API_URL | Frontend | Base API URL exposed to the browser, e.g., https://api.example.com/api. Set in frontend hosting env vars. |

## 3) Backend Deployment (Railway recommended)
1. Install Railway CLI: `npm install -g @railway/cli`.
2. From repo root: `cd backend`.
3. Log in and init: `railway login` then `railway init` (or `railway link` if project exists).
4. Push code: `railway up` (builds and deploys from current directory).
5. In Railway dashboard, add env vars from section 2. Set `FRONTEND_URL` to your final frontend domain.
6. Note the public backend URL (e.g., https://blockproof-production.up.railway.app). Use it for `VITE_API_URL` on the frontend.
7. Verify: open `https://<backend>/api/health` and `https://<backend>/api/status`.

### Alternative: Any Node host (Render, AWS, etc.)
- Build steps: `npm install` inside backend.
- Start command: `node server.js` (or `npm start`).
- Expose port from `PORT` env (platform usually injects it).
- Apply the same env vars; ensure CORS `FRONTEND_URL` matches the deployed frontend origin.

## 4) Frontend Deployment (Vercel recommended)
1. From repo root: `cd frontend`.
2. Connect the repo in Vercel dashboard or run `vercel` CLI.
3. Build command: `npm run build`. Output directory: `dist`.
4. Env vars: set `VITE_API_URL` to your deployed backend base (include `/api`, e.g., https://api.example.com/api).
5. Redeploy. After deploy, open the site and ensure API calls succeed.

### Alternative: Netlify / Static hosting
- Build: `npm install && npm run build` in `frontend`.
- Publish folder: `dist`.
- Add `VITE_API_URL` as a build-time env var.

## 5) Optional: Blockchain Setup (Polygon Mumbai)
1. Get testnet MATIC from https://faucet.polygon.technology/ to a throwaway MetaMask wallet.
2. Deploy `backend/contracts/CertificateRegistry.sol` using Hardhat or your preferred tool (target Polygon Mumbai). Keep the deployed address.
3. Set env vars: `BLOCKCHAIN_RPC_URL`, `CONTRACT_ADDRESS`, `PRIVATE_KEY` (for the issuer wallet). Do this in the backend host.
4. Redeploy backend so it initializes the contract (check `/api/health` to confirm `blockchain.initialized` and `hasContract`).

## 6) Optional: Gemini AI Setup
1. Create a Gemini API key at https://ai.google.dev/.
2. Set `GEMINI_API_KEY` in backend env vars.
3. Redeploy backend. `/api/status` should show AI features enabled.

## 7) Post-Deploy Verification
- Backend health: curl `https://<backend>/api/health`.
- Issue a cert: POST `https://<backend>/api/certificates/issue` with sample payload; note returned `certificateId`.
- Verify a cert: POST `https://<backend>/api/certificates/verify` with the ID and confirm verdict.
- Frontend sanity: load the deployed site, run Issue/Verify flows, and ensure images upload/verify.
- CORS: if calls fail, confirm `FRONTEND_URL` matches the deployed frontend origin exactly (protocol + domain + port if any).

## 8) Troubleshooting
- **API 404s from frontend:** check `VITE_API_URL` includes `/api` and points to the live backend.
- **CORS blocked:** update backend `FRONTEND_URL` to the exact frontend origin and redeploy backend.
- **Blockchain errors:** confirm RPC URL is reachable and `CONTRACT_ADDRESS` matches the deployed network; ensure the wallet has gas.
- **Gemini unavailable:** verify `GEMINI_API_KEY` is set and not rate-limited; otherwise the service falls back to simulation mode.

You are ready to ship. For local dev, use `QUICKSTART.md`; for security practices, see `SECURITY.md` and `backend/.env.example`.
