# Contributing to BlockProof

Thank you for your interest in contributing to BlockProof! This guide will help you get started.

---

## Table of Contents

1. [Code of Conduct](#code-of-conduct)
2. [Getting Started](#getting-started)
3. [Development Setup](#development-setup)
4. [Code Style](#code-style)
5. [Committing Changes](#committing-changes)
6. [Pull Requests](#pull-requests)
7. [Areas for Contribution](#areas-for-contribution)
8. [Debugging Tips](#debugging-tips)
9. [Documentation](#documentation)

---

## Code of Conduct

We are committed to providing a welcoming and inspiring community. Please read our Code of Conduct:

- Be respectful and inclusive
- Give credit where it's due
- Report issues constructively
- Help others learn and grow
- Focus on what is best for the community

---

## Getting Started

### Prerequisites

- Node.js 16+ and npm 8+
- Git
- A text editor (VS Code recommended)
- MetaMask browser extension (for blockchain testing)

### Fork and Clone

```bash
# 1. Fork the repository on GitHub
# 2. Clone your fork
git clone https://github.com/YOUR_USERNAME/blockproof.git
cd blockproof

# 3. Add upstream remote
git remote add upstream https://github.com/ORIGINAL_OWNER/blockproof.git

# 4. Create a feature branch
git checkout -b feature/your-feature-name
```

### Install Dependencies

```bash
# Backend
cd backend
npm install

# Frontend (in separate terminal)
cd frontend
npm install
```

---

## Development Setup

### Environment Configuration

```bash
# Backend
cd backend
cp .env.example .env

# Edit .env with your values:
# - For development: Use demo mode (leave values as-is)
# - For blockchain testing: Add BLOCKCHAIN_RPC_URL and PRIVATE_KEY
# - For AI testing: Add GEMINI_API_KEY

# Frontend
cd frontend
cp .env.example .env
# Edit VITE_API_URL if backend runs on different port
```

### Start Development Servers

```bash
# Terminal 1: Backend
cd backend
npm run dev
# Should print: "Server is running on port 5000"

# Terminal 2: Frontend
cd frontend
npm run dev
# Should print: "VITE v5.0.8 ready in XXX ms"
```

### Verify Setup

```bash
# Test backend
curl http://localhost:5000/api/health

# Test frontend
# Visit http://localhost:5173 in browser
```

---

## Code Style

### JavaScript/JSX Style

```javascript
// ✅ Use const by default, let if necessary, avoid var
const certificateId = generateId();
let retryCount = 0;

// ✅ Use descriptive names
const handleCertificateVerification = async (id) => {
    // Clear names indicate purpose
};

// ❌ Avoid single-letter variables (except in loops)
const x = getId(); // Bad
const certificateId = getId(); // Good

// ✅ Use arrow functions in React
const MyComponent = () => {
    return <div>Component</div>;
};

// ✅ Use destructuring
const { certificateId, issuer } = data;

// ❌ Avoid deeply nested callbacks
fetch(url)
    .then(r => r.json())
    .then(d => {
        // Handle data
    })
    .catch(e => console.error(e));

// ✅ Use async/await
const data = await fetch(url).then(r => r.json());

// ✅ Add JSDoc comments for functions
/**
 * Verifies a certificate using blockchain and AI
 * @param {string} certificateId - The certificate ID to verify
 * @param {object} data - Certificate data
 * @returns {Promise<object>} Verification result with verdict and confidence
 * @throws {Error} If verification fails
 */
const verifyCertificate = async (certificateId, data) => {
    // Implementation
};
```

### Solidity Style

```solidity
// ✅ Use descriptive variable names
bool public isCertificateValid;

// ✅ Add natspec comments
/// @notice Stores a certificate on the blockchain
/// @param certificateData The hashed certificate data
/// @param recipientAddress Address of the certificate recipient
function storeCertificate(
    bytes32 certificateData,
    address recipientAddress
) external onlyAuthorized {
    // Implementation
}

// ✅ Use modifiers for access control
modifier onlyAuthorized() {
    require(authorizedIssuers[msg.sender], "Not authorized");
    _;
}

// ✅ Emit events for all state changes
event CertificateStored(
    bytes32 indexed certificateId,
    address indexed issuer,
    uint256 timestamp
);
```

### CSS/Tailwind

```jsx
// ✅ Use Tailwind classes for styling
<div className="bg-white rounded-lg shadow-md p-6">
    <h1 className="text-2xl font-bold text-blue-600">Title</h1>
</div>

// ✅ Group related classes
const buttonClasses = "bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded";

// ❌ Don't use inline styles unless necessary
<div style={{ color: 'blue' }}>Bad</div> // Avoid

// ✅ Use @apply for reusable styles
/* In CSS file */
.primary-button {
    @apply bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded;
}
```

### Comments

```javascript
// ✅ Explain WHY, not WHAT
// We revoke the certificate immediately to prevent future use
certificate.revoked = true;

// ❌ Obvious comments clutter code
// Set revoked to true
certificate.revoked = true;

// ✅ Complex logic needs explanation
// Hash doesn't match: either tampering or wrong data
if (hash !== storedHash) {
    return { valid: false, reason: 'TAMPERING_DETECTED' };
}

// ✅ TODO for future work
// TODO: Add support for IPFS storage (Issue #42)
```

---

## Committing Changes

### Commit Message Format

Follow conventional commits:

```bash
# Format
git commit -m "type(scope): description"

# Types: feat, fix, docs, style, refactor, perf, test, chore
# Scope: frontend, backend, contract, utils

# Examples
git commit -m "feat(frontend): add image upload to verify page"
git commit -m "fix(blockchain): handle network timeout gracefully"
git commit -m "docs(api): add authentication examples"
git commit -m "refactor(controller): extract verification logic"
```

### Good Commit Message

```
feat(backend): add certificate revocation endpoint

- Adds POST /certificates/:id/revoke endpoint
- Implements revocation reason tracking
- Updates certificate status on blockchain
- Adds event logging for revocation

Closes #42
```

### Before Committing

```bash
# Check what changed
git status

# Review changes
git diff

# Run tests (if available)
npm test

# Lint code
npm run lint

# Only add relevant changes
git add -p  # Interactive add
```

---

## Pull Requests

### Creating a PR

1. **Push your branch**:
   ```bash
   git push origin feature/your-feature-name
   ```

2. **Create PR on GitHub**:
   - Go to repository
   - Click "New Pull Request"
   - Select your branch
   - Fill PR template (see below)

3. **PR Template**:
   ```markdown
   ## Description
   Brief description of changes
   
   ## Type of Change
   - [ ] Bug fix
   - [ ] New feature
   - [ ] Breaking change
   - [ ] Documentation
   
   ## Changes Made
   - Change 1
   - Change 2
   
   ## Testing
   How to test this change
   
   ## Checklist
   - [ ] Code follows style guidelines
   - [ ] Comments added for complex logic
   - [ ] Documentation updated
   - [ ] No breaking changes
   - [ ] Tested locally
   
   Closes #ISSUE_NUMBER
   ```

### Review Process

1. **Automated Checks**:
   - Tests must pass
   - Code lint must pass
   - No merge conflicts

2. **Code Review**:
   - Maintainers will review
   - May request changes
   - Be responsive to feedback

3. **Merge**:
   - Once approved
   - Maintainers will merge
   - Your branch can be deleted

### Tips for PR Success

```markdown
✅ Good PR:
- Focused on one feature/fix
- Small and reviewable (< 400 lines)
- Includes tests
- Includes documentation
- Clear description
- References related issues

❌ Avoid:
- Multiple unrelated changes
- Large refactors without discussion
- No description
- Broken tests
- Formatting changes mixed with logic
```

---

## Areas for Contribution

### Frontend Improvements

```javascript
// 1. Add loading states
const [isLoading, setIsLoading] = useState(false);

// 2. Improve error handling
try {
    // Operation
} catch (error) {
    showError(error.message);
}

// 3. Add form validation
if (!validateEmail(email)) {
    return showError('Invalid email');
}

// 4. Improve accessibility
<button aria-label="Verify certificate">
    Verify
</button>

// Issues to tackle:
// - Better error messages
// - Loading animations
// - Mobile responsiveness
// - Dark mode
// - Accessibility (a11y)
```

### Backend Improvements

```javascript
// 1. Add comprehensive logging
logger.info('Certificate verified', {
    certificateId,
    verdict,
    timestamp: new Date().toISOString()
});

// 2. Add error handling
try {
    const result = await blockchainService.verify(id);
} catch (error) {
    logger.error('Verification failed', { error });
    res.status(500).json({ error: 'Verification failed' });
}

// 3. Add rate limiting
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 100
});

// 4. Add caching
const cachedResult = cache.get(cacheKey);
if (cachedResult) return cachedResult;

// Issues to tackle:
// - Better error messages
// - Performance optimization
// - Caching strategies
// - Database integration
// - API versioning
```

### Smart Contract Improvements

```solidity
// 1. Add more events
event CertificateStatusChanged(
    bytes32 indexed certificateId,
    string status,
    uint256 timestamp
);

// 2. Improve gas efficiency
// Current: ~50k gas per storage
// Target: < 40k gas per storage

// 3. Add emergency functions
function emergencyStop() external onlyOwner {
    paused = true;
}

// Issues to tackle:
// - Gas optimization
// - Additional events
// - Emergency controls
// - Batch operations
```

### Documentation Improvements

```markdown
# Add to docs:
1. More code examples
2. Video tutorials
3. Architecture diagrams
4. API documentation
5. Deployment guides
6. Troubleshooting guides
7. Security best practices
8. Performance tips

# Issues to tackle:
- Add examples in multiple languages
- Create video tutorials
- Improve API documentation
- Add more deployment guides
```

---

## Debugging Tips

### Backend Debugging

```javascript
// 1. Add detailed logging
console.log('Certificate data:', JSON.stringify(data, null, 2));

// 2. Use Node debugger
node --inspect server.js
// Visit chrome://inspect in Chrome DevTools

// 3. Check environment variables
console.log('RPC URL:', process.env.BLOCKCHAIN_RPC_URL);

// 4. Test API endpoints
curl -X POST http://localhost:5000/api/certificates/issue \
  -H "Content-Type: application/json" \
  -d '{"recipientName":"John Doe","issuerName":"Google"}'

// 5. Check blockchain connection
const provider = new ethers.JsonRpcProvider(rpcUrl);
const network = await provider.getNetwork();
console.log('Connected to:', network.name);
```

### Frontend Debugging

```javascript
// 1. Browser DevTools
// F12 or Right-click → Inspect

// 2. React DevTools
// Available as Chrome/Firefox extension

// 3. Network tab
// Check API requests/responses

// 4. Console logging
console.log('State:', state);
console.log('Props:', props);

// 5. Breakpoints
// Set breakpoints in DevTools and step through code

// 6. Check API responses
fetch('http://localhost:5000/api/health')
    .then(r => r.json())
    .then(d => console.log('API health:', d));
```

### Smart Contract Debugging

```solidity
// 1. Add event logging
event Debug(string message, bytes32 value);

function storeCertificate(...) {
    emit Debug("Storing certificate", certificateHash);
}

// 2. Test with Hardhat
npx hardhat test

// 3. Use console.log
console.log("Certificate hash:", certificateHash);

// 4. Check contract state
const cert = await contract.getCertificate(id);
console.log(cert);

// 5. Test transactions locally
npx hardhat run scripts/test.js
```

### Common Issues

```
Issue: "Cannot find module 'dotenv'"
Solution: npm install
          Check node_modules exists

Issue: "Port 5000 already in use"
Solution: Kill process on port 5000
          Or change PORT in .env

Issue: "Cannot read property 'json' of undefined"
Solution: res.json() needs to be after res.setHeader()
          Check response headers aren't sent twice

Issue: "Contract not deployed"
Solution: Check CONTRACT_ADDRESS in .env
          Verify contract exists on blockchain
          Check RPC_URL is correct

Issue: "Gemini API key invalid"
Solution: Verify API key in .env
          Check key has right permissions
          Ensure key isn't expired
```

---

## Documentation

### Code Documentation Standards

Every function needs JSDoc:

```javascript
/**
 * Issues a new certificate
 * 
 * @param {object} data - Certificate data
 * @param {string} data.recipientName - Name of recipient
 * @param {string} data.issuerName - Name of issuer
 * @param {string} data.course - Course or achievement
 * @param {string} data.date - Issue date (YYYY-MM-DD)
 * 
 * @returns {Promise<object>} Result with certificateId and transactionHash
 * @returns {string} result.certificateId - Unique certificate ID
 * @returns {string} result.transactionHash - Blockchain transaction hash
 * 
 * @throws {Error} If validation fails or blockchain transaction fails
 * 
 * @example
 * const result = await issueCertificate({
 *   recipientName: 'John Doe',
 *   issuerName: 'Google',
 *   course: 'Cloud Architecture',
 *   date: '2024-01-20'
 * });
 * console.log(result.certificateId);
 */
const issueCertificate = async (data) => {
    // Implementation
};
```

### README Updates

When adding features, update README:

```markdown
# New Section: Feature Name

Brief description of feature.

## Usage

```javascript
// Code example
```

## Configuration

- ENV_VAR: Description

## More Info

See [API.md](API.md) for details.
```

### API Documentation

Document all endpoints:

```markdown
## POST /certificates/issue

Issues a new certificate.

**Request:**
```json
{
    "recipientName": "John Doe",
    "issuerName": "Google",
    "course": "Cloud Architecture",
    "date": "2024-01-20"
}
```

**Response:**
```json
{
    "certificateId": "abc123...",
    "transactionHash": "0x123..."
}
```

**Errors:**
- 400: Invalid input
- 500: Server error
```

---

## Testing (Future)

When testing is added:

```javascript
// Unit tests
describe('verifyHash', () => {
    it('should return true for matching hash', () => {
        const hash1 = generateHash(data);
        const hash2 = generateHash(data);
        expect(verifyHash(hash1, hash2)).toBe(true);
    });
});

// Integration tests
describe('Certificate Lifecycle', () => {
    it('should issue, verify, and revoke certificate', async () => {
        // Full workflow test
    });
});
```

---

## Publishing Changes

### Update Changelog

```markdown
## [1.1.0] - 2024-01-20

### Added
- Certificate revocation feature
- Image analysis for tampering detection
- Rate limiting on API

### Fixed
- Hash verification edge cases
- CORS configuration for production

### Changed
- Updated Gemini model to 1.5-flash
```

### Update Version

```json
{
    "version": "1.1.0"
}
```

---

## Questions?

### Getting Help

1. **Check documentation first**: [DOCUMENTATION_INDEX.md](DOCUMENTATION_INDEX.md)
2. **Search existing issues**: GitHub Issues
3. **Create new issue**: If not found
4. **Ask in discussions**: For general questions

### Issue Template

```markdown
## Description
What's the issue?

## Steps to Reproduce
1. Do this
2. Do that
3. See the problem

## Expected Behavior
What should happen?

## Actual Behavior
What actually happens?

## Environment
- OS: Windows/Mac/Linux
- Node version: v16.0.0
- npm version: 8.0.0

## Screenshots
If applicable
```

---

## Code Review Checklist

Before submitting a PR, check:

- [ ] Code follows style guide
- [ ] Comments added for complex logic
- [ ] No console.log() statements left
- [ ] No commented-out code
- [ ] No hardcoded values
- [ ] Environment variables used for config
- [ ] Error handling present
- [ ] No security issues
- [ ] Documentation updated
- [ ] README updated if needed
- [ ] Tested locally
- [ ] Tested in development mode
- [ ] No breaking changes

---

## Helpful Commands

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Run tests
npm test

# Lint code
npm run lint

# Format code
npm run format

# Check for vulnerabilities
npm audit

# Update dependencies
npm update
```

---

## Licensing

By contributing, you agree that your contributions will be licensed under the MIT License. See [LICENSE](LICENSE) for details.

---

## Recognition

Contributors are recognized in:
- [README.md](README.md) - Contributors section
- [CONTRIBUTORS.md](CONTRIBUTORS.md) - Full list
- GitHub Contributors page

---

## Final Notes

- **Start small**: Pick easy issues first
- **Ask questions**: Don't hesitate to ask
- **Be respectful**: We're all learning
- **Have fun**: Contributing should be enjoyable!

---

**Thank you for contributing to BlockProof!** 🚀

Together, we're building the future of certificate verification.

---

**Last Updated**: 2025-01-17

Questions? Create an issue or start a discussion! 💬
