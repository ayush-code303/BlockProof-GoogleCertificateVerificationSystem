const { GoogleGenerativeAI } = require('@google/generative-ai');
const fs = require('fs');
const path = require('path');
require('dotenv').config();

/**
 * GeminiService - AI-powered certificate verification using Google's Gemini API
 * Detects tampering, altered text, fake logos, formatting mismatches
 * Returns confidence scores for certificate authenticity
 */
class GeminiService {
  constructor() {
    this.genAI = null;
    this.model = null;
    this.isInitialized = false;
  }

  /**
   * Initialize Gemini API connection
   * Requires GEMINI_API_KEY in .env
   */
  async initialize() {
    try {
      if (!process.env.GEMINI_API_KEY) {
        console.warn('⚠ GEMINI_API_KEY not set. AI verification will be simulated.');
        console.warn('   Get free API key at: https://ai.google.dev/');
        this.isInitialized = false;
        return false;
      }

      this.genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
      // Using gemini-1.5-flash for faster, cheaper processing (perfect for hackathons)
      this.model = this.genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
      
      console.log('✓ Gemini AI service initialized (gemini-1.5-flash)');
      this.isInitialized = true;
      return true;
    } catch (error) {
      console.error('✗ Gemini initialization error:', error.message);
      this.isInitialized = false;
      return false;
    }
  }

  /**
   * Verify certificate authenticity using AI analysis
   * Analyzes certificate data for inconsistencies, tampering, and authenticity indicators
   * @param {Object} certificateData - Certificate information to verify
   * @returns {Object} - AI verification result with confidence score
   */
  async verifyCertificate(certificateData) {
    try {
      if (!this.isInitialized) {
        // Simulate AI verification if API not configured
        return this.simulateVerification(certificateData);
      }

      const prompt = `You are an expert certificate verification AI. Analyze the following certificate data for authenticity and return a structured assessment.

Certificate Details:
- Certificate ID: ${certificateData.certificateId || 'N/A'}
- Recipient Name: ${certificateData.recipientName || 'N/A'}
- Issuing Organization: ${certificateData.issuer || 'N/A'}
- Course/Program: ${certificateData.course || 'N/A'}
- Issue Date: ${certificateData.issueDate || 'N/A'}
- Hash Verification: ${certificateData.hashMatch ? 'PASSED' : 'FAILED'}

Check for:
1. Data consistency and validity
2. Suspicious patterns or anomalies
3. Format and structure compliance
4. Potential tampering indicators

Provide ONLY a JSON response with this structure (no markdown):
{
  "isAuthentic": boolean,
  "confidence": number (0-100),
  "tampering": "none" | "potential" | "likely",
  "issues": ["issue1", "issue2"],
  "assessment": "Brief assessment in 1-2 sentences",
  "recommendations": ["recommendation1"]
}`;

      const result = await this.model.generateContent(prompt);
      const response = await result.response;
      const text = response.text();

      // Parse AI response - try to extract JSON
      try {
        // Try to extract JSON from response
        const jsonMatch = text.match(/\{[\s\S]*\}/);
        const jsonStr = jsonMatch ? jsonMatch[0] : text;
        const aiResult = JSON.parse(jsonStr);

        return {
          success: true,
          onAI: true,
          isAuthentic: aiResult.isAuthentic,
          confidence: aiResult.confidence || 75,
          tampering: aiResult.tampering || 'none',
          issues: aiResult.issues || [],
          assessment: aiResult.assessment || 'Certificate analysis completed',
          recommendations: aiResult.recommendations || [],
          message: 'AI verification completed successfully'
        };
      } catch (parseError) {
        // Fall back to text parsing if JSON parsing fails
        return this.parseAIResponse(text);
      }
    } catch (error) {
      console.error('Error in AI verification:', error.message);
      return this.simulateVerification(certificateData);
    }
  }

  /**
   * Analyze certificate image/PDF for visual tampering
   * Detects: altered text, fake logos, formatting mismatches, image quality issues
   * @param {string} imagePath - Path to certificate image file
   * @returns {Object} - Image analysis results
   */
  async analyzeImage(imagePath) {
    try {
      if (!this.isInitialized || !fs.existsSync(imagePath)) {
        return this.simulateImageAnalysis(imagePath);
      }

      // Read image file and convert to base64
      const imageBuffer = fs.readFileSync(imagePath);
      const base64Image = imageBuffer.toString('base64');
      const mimeType = this.getMimeType(imagePath);

      const prompt = `Analyze this certificate image for authenticity and tampering indicators.

Check for:
1. Logo authenticity and placement
2. Text quality and font consistency
3. Color gradients and background patterns
4. Signature/seal quality
5. Layout and formatting consistency
6. Image quality and resolution
7. Any visible editing or modification signs

Provide assessment in JSON format:
{
  "visualTampering": boolean,
  "confidence": number (0-100),
  "findings": {
    "logoQuality": "authentic" | "suspicious" | "likely_fake",
    "textQuality": "consistent" | "altered" | "clear_forgery",
    "formatting": "standard" | "unusual" | "manipulated",
    "overallQuality": number (0-100)
  },
  "concerns": ["concern1"],
  "verdict": "AUTHENTIC" | "SUSPICIOUS" | "LIKELY_FAKE"
}`;

      const result = await this.model.generateContent([
        {
          inlineData: {
            mimeType: mimeType,
            data: base64Image
          }
        },
        prompt
      ]);

      const response = await result.response;
      const text = response.text();

      try {
        const jsonMatch = text.match(/\{[\s\S]*\}/);
        const jsonStr = jsonMatch ? jsonMatch[0] : text;
        const analysisResult = JSON.parse(jsonStr);

        return {
          success: true,
          onAI: true,
          visualTampering: analysisResult.visualTampering,
          confidence: analysisResult.confidence || 70,
          findings: analysisResult.findings || {},
          concerns: analysisResult.concerns || [],
          verdict: analysisResult.verdict || 'SUSPICIOUS',
          message: 'Image analysis completed'
        };
      } catch (parseError) {
        return {
          success: true,
          onAI: true,
          visualTampering: false,
          confidence: 60,
          analysisText: text,
          message: 'Image analysis completed (text format)'
        };
      }
    } catch (error) {
      console.error('Error analyzing image:', error.message);
      return this.simulateImageAnalysis(imagePath);
    }
  }

  /**
   * Extract text content from certificate using OCR-like AI analysis
   * @param {string} imagePath - Path to certificate image
   * @returns {Object} - Extracted text and metadata
   */
  async extractCertificateData(imagePath) {
    try {
      if (!this.isInitialized || !fs.existsSync(imagePath)) {
        return {
          success: false,
          message: 'File not found or AI not configured'
        };
      }

      const imageBuffer = fs.readFileSync(imagePath);
      const base64Image = imageBuffer.toString('base64');
      const mimeType = this.getMimeType(imagePath);

      const prompt = `Extract all text and data from this certificate image.

Return as JSON:
{
  "recipientName": "name",
  "issuer": "organization",
  "course": "course/program name",
  "issueDate": "date",
  "expiryDate": "date or null",
  "certificateId": "ID or reference number",
  "additionalInfo": "any other important text",
  "textBlocks": ["block1", "block2"],
  "confidence": number (0-100)
}`;

      const result = await this.model.generateContent([
        {
          inlineData: {
            mimeType: mimeType,
            data: base64Image
          }
        },
        prompt
      ]);

      const response = await result.response;
      const text = response.text();

      try {
        const jsonMatch = text.match(/\{[\s\S]*\}/);
        const jsonStr = jsonMatch ? jsonMatch[0] : text;
        const extractedData = JSON.parse(jsonStr);

        return {
          success: true,
          onAI: true,
          ...extractedData,
          message: 'Data extracted successfully'
        };
      } catch (parseError) {
        return {
          success: false,
          error: 'Failed to parse extracted data',
          rawResponse: text
        };
      }
    } catch (error) {
      console.error('Error extracting data:', error.message);
      return {
        success: false,
        error: error.message
      };
    }
  }

  /**
   * Simulate AI verification when API is not available
   * Provides realistic demo results for hackathon presentations
   * @private
   */
  simulateVerification(certificateData) {
    // Simulate AI analysis based on data completeness
    const hasRequiredFields = certificateData.certificateId && 
                              certificateData.issuer && 
                              certificateData.recipientName;
    
    const hashMatched = certificateData.hashMatch !== false;
    
    // Calculate confidence based on factors
    let confidence = 70;
    let tampering = 'none';
    let isAuthentic = true;
    let issues = [];

    if (!hasRequiredFields) {
      confidence -= 20;
      issues.push('Missing required certificate fields');
    }

    if (!hashMatched) {
      confidence -= 30;
      tampering = 'likely';
      isAuthentic = false;
      issues.push('Hash mismatch - possible tampering detected');
    }

    // Random factor for demo variety
    const randomFactor = Math.floor(Math.random() * 20) - 10;
    confidence = Math.max(30, Math.min(100, confidence + randomFactor));

    return {
      success: true,
      onAI: false,
      simulated: true,
      isAuthentic,
      confidence,
      tampering,
      issues,
      assessment: isAuthentic 
        ? 'Certificate data appears consistent and authentic.'
        : 'Certificate shows signs of tampering or modification.',
      recommendations: isAuthentic
        ? ['Store certificate on blockchain for permanent verification']
        : ['Contact issuing organization to verify authenticity'],
      message: 'AI verification completed (simulated mode)'
    };
  }

  /**
   * Simulate image analysis for demo purposes
   * @private
   */
  simulateImageAnalysis(imagePath) {
    const random = Math.random();
    const verdict = random > 0.3 ? 'AUTHENTIC' : (random > 0.15 ? 'SUSPICIOUS' : 'LIKELY_FAKE');
    
    return {
      success: true,
      onAI: false,
      simulated: true,
      visualTampering: verdict !== 'AUTHENTIC',
      confidence: Math.floor(70 + Math.random() * 30),
      findings: {
        logoQuality: verdict === 'AUTHENTIC' ? 'authentic' : 'suspicious',
        textQuality: verdict === 'AUTHENTIC' ? 'consistent' : 'altered',
        formatting: verdict === 'AUTHENTIC' ? 'standard' : 'unusual',
        overallQuality: Math.floor(70 + Math.random() * 30)
      },
      concerns: verdict !== 'AUTHENTIC' ? ['Possible image manipulation detected'] : [],
      verdict,
      message: 'Image analysis completed (simulated mode)'
    };
  }

  /**
   * Parse AI response when JSON extraction fails
   * @private
   */
  parseAIResponse(text) {
    const confidence = this.extractNumber(text, /confidence[:\s]*(\d+)/i) || 75;
    const isAuthentic = !text.toLowerCase().includes('suspicious') && 
                       !text.toLowerCase().includes('likely fake');

    return {
      success: true,
      onAI: true,
      isAuthentic,
      confidence,
      assessment: text.substring(0, 200),
      message: 'AI verification completed (text parsing)'
    };
  }

  /**
   * Extract MIME type from file extension
   * @private
   */
  getMimeType(filePath) {
    const ext = path.extname(filePath).toLowerCase();
    const mimeTypes = {
      '.jpg': 'image/jpeg',
      '.jpeg': 'image/jpeg',
      '.png': 'image/png',
      '.gif': 'image/gif',
      '.webp': 'image/webp'
    };
    return mimeTypes[ext] || 'image/jpeg';
  }

  /**
   * Extract number from text using regex
   * @private
   */
  extractNumber(text, regex) {
    const match = text.match(regex);
    return match ? parseInt(match[1]) : null;
  }
}

// Create and export singleton instance
const geminiService = new GeminiService();

module.exports = geminiService;
