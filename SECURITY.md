# BlockProof Security Guide

**Comprehensive security practices for production deployment**

---

## Table of Contents

1. [Environment Variables Security](#environment-variables-security)
2. [Blockchain Security](#blockchain-security)
3. [API Security](#api-security)
4. [File Upload Security](#file-upload-security)
5. [Frontend Security](#frontend-security)
6. [Database Security](#database-security)
7. [Infrastructure Security](#infrastructure-security)
8. [Monitoring & Incident Response](#monitoring--incident-response)
9. [Compliance & Privacy](#compliance--privacy)
10. [Security Checklist](#security-checklist)

---

## Environment Variables Security

### ✅ DO

```bash
# Store in secure secret manager
# Options:
# - Railway secrets (https://railway.app)
# - Vercel environment variables
# - Netlify secrets
# - AWS Secrets Manager
# - HashiCorp Vault

# Use strong values
PRIVATE_KEY=abc123...xyz789... # 64 hex characters minimum

# Rotate periodically
# Every 30-90 days for production
```

### ❌ DON'T

```bash
# NEVER commit .env to Git
# NEVER share private keys in messages
# NEVER use same key across environments
# NEVER log sensitive values
# NEVER hardcode secrets in code
```

### Implementation

**1. Remove Secrets from Git History**

If you accidentally committed secrets:

```bash
# Use git-filter-branch to remove
git filter-branch --tree-filter 'rm -f .env' HEAD

# Or use BFG Repo-Cleaner
bfg --delete-files .env

# Force push to remove from history
git push --force-with-lease origin main
```

**2. .gitignore Configuration**

```
# Environment
.env
.env.local
.env.*.local

# Private keys
*.key
*.pem
private/*

# Secrets
secrets/
config/secrets

# Dependencies
node_modules/

# Build outputs
dist/
build/
.next/

# Logs
logs/
*.log

# OS files
.DS_Store
Thumbs.db
```

**3. Use .env.example for Documentation**

```bash
# backend/.env.example
PRIVATE_KEY=your_private_key_here_64_hex_chars
BLOCKCHAIN_RPC_URL=https://...
CONTRACT_ADDRESS=0x...
GEMINI_API_KEY=your_api_key_here

# DO commit .env.example
# It shows structure without exposing secrets
```

---

## Blockchain Security

### ✅ Smart Contract Best Practices

**1. Access Control**

```solidity
// Use modifiers for access control
modifier onlyOwner() {
    require(msg.sender == owner, "Not owner");
    _;
}

modifier onlyAuthorized() {
    require(authorizedIssuers[msg.sender], "Not authorized");
    _;
}

// Every function has explicit authorization
function storeCertificate(...) onlyAuthorized {
    // Only authorized issuers can issue
}
```

**2. Immutability**

```solidity
// Once stored, cannot be changed
struct Certificate {
    bytes32 certificateHash;  // Never modified
    address issuer;           // Never modified
    uint256 timestamp;        // Never modified
    bool revoked;            // Only changed to true
    string revocationReason;  // Only set once
}
```

**3. Revocation Pattern**

```solidity
// Can revoke but never restore
function revokeCertificate(...) {
    // Set revoked flag
    certificates[certificateId].revoked = true;
    
    // Cannot unrevoke - immutable
    // Once revoked, always invalid
}
```

**4. Event Logging**

```solidity
// All state changes emit events
// Allows external verification of all actions
event CertificateStored(
    bytes32 indexed certificateId,
    address indexed issuer,
    uint256 timestamp
);

event CertificateRevoked(
    bytes32 indexed certificateId,
    string reason,
    uint256 timestamp
);
```

### ✅ Wallet Security

**Private Key Management**

```bash
# Option 1: Hardware Wallet (Safest)
# Use MetaMask with hardware wallet (Ledger, Trezor)
# Private key never leaves hardware

# Option 2: Environment Variable (Production)
# Store in secure secret manager
# Never in code or git

# Option 3: Encrypted Keystore (Development)
# Use ethers.js encrypted wallets
const wallet = ethers.Wallet.fromEncryptedJson(json, password);
```

**Key Rotation**

```bash
# For production:
# 1. Create new issuer account
# 2. Transfer authorization to new account
# 3. Revoke old account
# 4. Update environment variables
# 5. Deploy new backend version
```

### ✅ Transaction Security

```javascript
// Always verify transaction receipt
const receipt = await tx.wait();

// Verify transaction succeeded
if (receipt.status === 1) {
    console.log('Transaction successful');
} else {
    console.error('Transaction failed');
}

// Log transaction hash for audit trail
logger.info(`Tx: ${receipt.transactionHash}`);
```

### ❌ Common Vulnerabilities to Avoid

```solidity
// ❌ Don't trust user input blindly
function badFunction(bytes32 id) external {
    // If attacker passes invalid id, could break
}

// ✅ Always validate
function goodFunction(bytes32 id) external {
    require(id != bytes32(0), "Invalid ID");
    require(certificates[id].exists, "Not found");
}

// ❌ Don't allow arbitrary data
function badIssuer(address issuer) external {
    // Any attacker could call this
}

// ✅ Use onlyOwner
function goodIssuer(address issuer) external onlyOwner {
    // Only owner can authorize issuers
}
```

---

## API Security

### ✅ Input Validation

```javascript
// Validate all inputs
router.post('/certificates/issue', (req, res) => {
    const { recipientName, issuerName, course, date } = req.body;
    
    // Trim inputs
    const name = recipientName?.trim();
    
    // Validate format
    if (!name || name.length < 2) {
        return res.status(400).json({ error: 'Invalid name' });
    }
    
    if (!isValidDate(date)) {
        return res.status(400).json({ error: 'Invalid date' });
    }
    
    // Sanitize inputs
    const sanitized = sanitizeHtml(name);
    
    // Proceed only after validation
});
```

### ✅ Rate Limiting

```javascript
const rateLimit = require('express-rate-limit');

// Limit API calls
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100 // 100 requests per window
});

app.use('/api/certificates/', limiter);
```

### ✅ CORS Configuration

```javascript
const cors = require('cors');

app.use(cors({
    // Only allow your frontend domain
    origin: [
        'https://blockproof.com',
        'https://app.blockproof.com',
        'http://localhost:5173' // Development only
    ],
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));
```

### ✅ Request Size Limits

```javascript
// Prevent large payload attacks
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ limit: '10mb' }));

// Limit file uploads
const upload = multer({
    limits: { fileSize: 5 * 1024 * 1024 } // 5MB
});
```

### ✅ Authentication (Future Improvement)

```javascript
// JWT authentication example
const jwt = require('jsonwebtoken');

// Middleware to verify token
function verifyToken(req, res, next) {
    const token = req.headers['authorization']?.split(' ')[1];
    
    if (!token) {
        return res.status(401).json({ error: 'No token' });
    }
    
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) return res.status(403).json({ error: 'Invalid token' });
        req.userId = decoded.id;
        next();
    });
}

// Use in routes
router.post('/certificates/issue', verifyToken, (req, res) => {
    // Only authenticated users can issue
});
```

### ❌ API Vulnerabilities to Avoid

```javascript
// ❌ No input validation
app.get('/verify/:id', (req, res) => {
    // Could allow injection attacks
    const query = `SELECT * FROM certs WHERE id = ${req.params.id}`;
});

// ✅ Validate and sanitize
app.get('/verify/:id', (req, res) => {
    const id = String(req.params.id).trim();
    if (!/^[a-f0-9]{64}$/.test(id)) {
        return res.status(400).json({ error: 'Invalid ID' });
    }
    // Safe to use
});

// ❌ No error handling
app.post('/issue', (req, res) => {
    // Exposes stack trace to users
    const result = riskyOperation();
});

// ✅ Handle errors gracefully
app.post('/issue', (req, res) => {
    try {
        const result = riskyOperation();
        res.json(result);
    } catch (err) {
        logger.error(err); // Log internally
        res.status(500).json({ 
            error: 'Operation failed', 
            // Don't expose details
        });
    }
});
```

---

## File Upload Security

### ✅ Safe File Handling

```javascript
const multer = require('multer');
const path = require('path');

// Configure multer safely
const upload = multer({
    dest: path.join(__dirname, '../uploads'),
    
    // Validate file type
    fileFilter: (req, file, cb) => {
        const allowed = ['image/jpeg', 'image/png', 'application/pdf'];
        
        if (allowed.includes(file.mimetype)) {
            cb(null, true);
        } else {
            cb(new Error('Invalid file type'));
        }
    },
    
    // Size limit
    limits: {
        fileSize: 5 * 1024 * 1024 // 5MB
    }
});

// Use in route
router.post('/upload', upload.single('certificate'), (req, res) => {
    const file = req.file;
    
    // Verify file was uploaded
    if (!file) {
        return res.status(400).json({ error: 'No file' });
    }
    
    // Use random filename (not user-provided)
    const newName = `${Date.now()}_${Math.random().toString(36).substring(7)}`;
    
    res.json({ 
        filename: newName,
        path: `/uploads/${newName}`
    });
});
```

### ✅ File Cleanup

```javascript
const fs = require('fs').promises;
const path = require('path');

// Delete temporary files after processing
async function processAndDelete(filePath) {
    try {
        // Process file
        const result = await analyzeFile(filePath);
        
        // Delete file
        await fs.unlink(filePath);
        
        return result;
    } catch (err) {
        // Clean up on error too
        await fs.unlink(filePath).catch(() => {});
        throw err;
    }
}
```

### ❌ File Upload Vulnerabilities to Avoid

```javascript
// ❌ Don't trust filename
const filename = req.file.originalname;
const filePath = `./uploads/${filename}`; // Could be: ../../../etc/passwd

// ✅ Generate safe filename
const filename = `${Date.now()}_${Math.random().toString(36).substring(7)}`;

// ❌ Don't allow all MIME types
app.post('/upload', upload.single('file'), (req, res) => {
    // Could upload executable
});

// ✅ Whitelist MIME types
const allowed = ['image/jpeg', 'image/png', 'application/pdf'];
if (!allowed.includes(req.file.mimetype)) {
    return res.status(400).json({ error: 'Invalid type' });
}

// ❌ No size limit
app.post('/upload', upload.single('file'), (req, res) => {
    // Could run out of disk space
});

// ✅ Set reasonable limit
limits: { fileSize: 5 * 1024 * 1024 }
```

---

## Frontend Security

### ✅ XSS Prevention

```javascript
// ✅ React automatically escapes
function CertificateDisplay({ data }) {
    return <div>{data.certificateId}</div>; // Safe
}

// ✅ Use textContent for user data
document.getElementById('name').textContent = userData.name;

// ❌ Don't use innerHTML with user data
element.innerHTML = userData.name; // Vulnerable to XSS
```

### ✅ CSRF Protection

```javascript
// Include CSRF token in requests
const token = document.querySelector('meta[name="csrf-token"]').content;

axios.post('/api/certificates/issue', data, {
    headers: {
        'X-CSRF-Token': token
    }
});
```

### ✅ Secure Storage

```javascript
// ❌ Don't store sensitive data in localStorage
localStorage.setItem('privateKey', privateKey); // Vulnerable

// ✅ Store only session tokens (short-lived)
sessionStorage.setItem('sessionToken', token); // Cleared on close

// ✅ Or use httpOnly cookies
// Only accessible to server-side code
```

### ✅ Content Security Policy

```javascript
// In backend (server.js)
app.use((req, res, next) => {
    res.setHeader(
        'Content-Security-Policy',
        "default-src 'self'; script-src 'self' 'unsafe-inline'"
    );
    next();
});
```

---

## Database Security

### ✅ If Using Traditional Database

```javascript
// ✅ Use parameterized queries
const query = 'SELECT * FROM certificates WHERE id = ?';
db.query(query, [certificateId]);

// ❌ Never concatenate user input
const query = `SELECT * FROM certificates WHERE id = ${certificateId}`;
// Vulnerable to SQL injection
```

### ✅ Connection Security

```javascript
// Use SSL/TLS for database connections
const connection = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    ssl: 'Amazon RDS' // Enable SSL
});
```

### ✅ Access Control

```javascript
// Limit database user permissions
// User: blockproof_app
// Permissions: SELECT, INSERT, UPDATE on certificates table only

// Never use root for application
// Each service has own limited user
```

---

## Infrastructure Security

### ✅ HTTPS Enforcement

```javascript
// Force HTTPS in production
app.use((req, res, next) => {
    if (process.env.NODE_ENV === 'production' && 
        req.header('x-forwarded-proto') !== 'https') {
        return res.redirect(`https://${req.header('host')}${req.url}`);
    }
    next();
});
```

### ✅ Security Headers

```javascript
const helmet = require('helmet');

// Add security headers automatically
app.use(helmet());

// Or manually
app.use((req, res, next) => {
    // Prevent clickjacking
    res.setHeader('X-Frame-Options', 'DENY');
    
    // Prevent MIME sniffing
    res.setHeader('X-Content-Type-Options', 'nosniff');
    
    // Enable XSS protection
    res.setHeader('X-XSS-Protection', '1; mode=block');
    
    next();
});
```

### ✅ Network Security

```bash
# Firewall rules
# Only allow traffic on needed ports:
# 80 (HTTP) - to redirect to HTTPS
# 443 (HTTPS) - for API
# Don't expose database/admin ports

# SSH
# Use key-based authentication only
# Disable password login
# Use non-standard port (2222 instead of 22)

# API
# Behind load balancer with DDoS protection
# Rate limiting enabled
# Geographic restrictions if needed
```

---

## Monitoring & Incident Response

### ✅ Logging

```javascript
// Log all important events
logger.info('Certificate issued', {
    certificateId,
    issuer,
    recipient,
    timestamp: new Date().toISOString()
});

logger.error('Certificate verification failed', {
    certificateId,
    error: err.message,
    timestamp: new Date().toISOString()
});

// Never log sensitive data
// ❌ logger.info('Issued with key:', privateKey);
// ✅ logger.info('Certificate issued');
```

### ✅ Monitoring

```javascript
// Monitor critical metrics
// - API response time
// - Error rates
// - Blockchain transaction costs
// - Storage usage
// - API call patterns (anomalies)

// Tools: DataDog, New Relic, Grafana
```

### ✅ Alerts

```javascript
// Alert on suspicious activity
// - Unusual number of failed verifications
// - API rate limit exceeded
// - Certificate revocation spike
// - Failed blockchain transactions
// - Unauthorized issuer activity
```

### ✅ Incident Response

```
1. Detect: Monitor alerts 24/7
2. Response: 
   - Isolate affected systems
   - Disable compromised keys
   - Review audit logs
3. Investigation:
   - Determine scope of breach
   - Identify root cause
   - Document findings
4. Recovery:
   - Deploy patches
   - Rotate credentials
   - Verify system integrity
5. Post-Incident:
   - Communicate with users
   - Update security practices
   - Conduct postmortem
```

---

## Compliance & Privacy

### ✅ Data Minimization

Store only necessary data:
- Certificate hash (required for verification)
- Issuer address (required for permissions)
- Timestamp (required for ordering)
- Revocation status (required for validity)

### ❌ Don't Store

- Recipient personal information (name, email)
- Course content
- Grade/scores
- Sensitive metadata

### ✅ Privacy by Design

```javascript
// Only hash data is on blockchain (immutable, public)
const certificateHash = sha256(certificateData);

// Original data stored only with issuer/recipient
// Never transmitted to blockchain
// Never stored in our servers
```

### ✅ GDPR Compliance (if EU users)

```javascript
// Right to be forgotten implementation
// Note: Blockchain is immutable, but:
// - Can revoke certificate
// - Can delete personal data elsewhere
// - Can delete file uploads

router.post('/certificates/:id/delete-data', async (req, res) => {
    // Delete associated files
    // Note: Hash remains on blockchain (immutable)
    // But personal data deleted
});
```

### ✅ Audit Trail

```javascript
// Every operation recorded
// Who: User/issuer identity
// What: Action performed
// When: Timestamp
// Where: System component
// Result: Success/failure

// Audit logs stored separately from main data
// Protected with same security measures
```

---

## Security Checklist

### Pre-Deployment

- [ ] All environment variables configured in secure secret manager
- [ ] Private keys stored safely (never in code)
- [ ] CORS configured for production domain
- [ ] HTTPS enabled
- [ ] Database credentials in secrets manager
- [ ] API rate limiting configured
- [ ] Input validation on all endpoints
- [ ] CSRF protection enabled
- [ ] Security headers configured
- [ ] Firewall rules configured
- [ ] Smart contract reviewed for vulnerabilities
- [ ] Dependencies up to date
- [ ] No hardcoded secrets in code
- [ ] Error handling doesn't expose sensitive info
- [ ] Logging doesn't contain sensitive data

### After Deployment

- [ ] Verify HTTPS working
- [ ] Test API endpoints with invalid input
- [ ] Verify rate limiting working
- [ ] Check security headers present
- [ ] Test file upload restrictions
- [ ] Verify blockchain transactions working
- [ ] Monitor logs for errors
- [ ] Set up alerting
- [ ] Document security procedures
- [ ] Train team on security practices

### Regular Maintenance

- [ ] Review logs weekly
- [ ] Check alerts daily
- [ ] Rotate credentials quarterly
- [ ] Update dependencies monthly
- [ ] Security audit quarterly
- [ ] Penetration testing annually
- [ ] Backup verification weekly
- [ ] Disaster recovery test annually

---

## Security Resources

### Learning
- [OWASP Top 10](https://owasp.org/www-project-top-ten/)
- [Node.js Security Best Practices](https://nodejs.org/en/docs/guides/security/)
- [Solidity Security](https://docs.soliditylang.org/en/latest/security-considerations.html)

### Tools
- [npm audit](https://docs.npmjs.com/cli/v8/commands/npm-audit) - Check dependencies
- [SNYK](https://snyk.io/) - Vulnerability scanning
- [Hardhat Slither](https://github.com/crytic/slither) - Smart contract analysis
- [Burp Suite](https://portswigger.net/burp) - API testing

### Monitoring
- [DataDog](https://www.datadog.com/)
- [New Relic](https://newrelic.com/)
- [Grafana](https://grafana.com/)

---

## Report Security Issues

If you discover a security vulnerability:

1. **Don't** post it publicly
2. **Do** email security@blockproof.dev
3. **Do** provide details of vulnerability
4. **Do** give us 30 days to patch before public disclosure

We appreciate responsible disclosure!

---

**Last Updated**: 2025-01-17

**Made with security-first principles** 🔒
