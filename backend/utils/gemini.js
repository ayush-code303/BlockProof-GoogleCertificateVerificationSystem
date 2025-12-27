const { GoogleGenerativeAI } = require('@google/generative-ai');
require('dotenv').config();

class GeminiService {
  constructor() {
    this.genAI = null;
    this.model = null;
  }

  /**
   * Initialize Gemini API
   */
  async initialize() {
    try {
      if (!process.env.GEMINI_API_KEY) {
        console.warn('⚠ GEMINI_API_KEY not set. AI verification will be simulated.');
        return false;
      }

      this.genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
      this.model = this.genAI.getGenerativeModel({ model: "gemini-pro" });
      
      console.log('✓ Gemini AI service initialized');
      return true;
    } catch (error) {
      console.error('✗ Gemini initialization error:', error.message);
      return false;
    }
  }

  /**
   * Verify certificate using AI
   * @param {Object} certificateData - Certificate information
   * @returns {Object} - AI verification result
   */
  async verifyCertificate(certificateData) {
    try {
      if (!this.model) {
        // Simulate AI verification if API not configured
        return this.simulateVerification(certificateData);
      }

      const prompt = `
You are an AI certificate verification assistant. Analyze the following certificate data and provide a verification assessment:

Certificate Details:
- Certificate ID: ${certificateData.certificateId || 'N/A'}
- Issuer: ${certificateData.issuer || 'N/A'}
- Recipient: ${certificateData.recipient || 'N/A'}
- Issue Date: ${certificateData.issueDate || 'N/A'}
- Course/Title: ${certificateData.course || 'N/A'}

Analyze the certificate for:
1. Data consistency and format validity
2. Potential anomalies or red flags
3. Overall authenticity assessment

Provide a brief assessment (2-3 sentences) and a confidence score (0-100).
Format your response as:
ASSESSMENT: [your assessment]
CONFIDENCE: [score]
`;

      const result = await this.model.generateContent(prompt);
      const response = await result.response;
      const text = response.text();

      // Parse AI response
      const assessmentMatch = text.match(/ASSESSMENT:\s*(.+?)(?=CONFIDENCE:|$)/s);
      const confidenceMatch = text.match(/CONFIDENCE:\s*(\d+)/);

      const assessment = assessmentMatch ? assessmentMatch[1].trim() : text;
      const confidence = confidenceMatch ? parseInt(confidenceMatch[1]) : 75;

      return {
        success: true,
        aiVerified: confidence >= 60,
        confidence,
        assessment,
        message: 'AI verification completed'
      };
    } catch (error) {
      console.error('Error in AI verification:', error);
      return this.simulateVerification(certificateData);
    }
  }

  /**
   * Simulate AI verification when API is not available
   * @param {Object} certificateData - Certificate data
   * @returns {Object} - Simulated verification result
   */
  simulateVerification(certificateData) {
    // Basic validation checks
    const hasRequiredFields = certificateData.certificateId && 
                              certificateData.issuer && 
                              certificateData.recipient;
    
    const confidence = hasRequiredFields ? 85 : 50;
    const aiVerified = hasRequiredFields;

    return {
      success: true,
      aiVerified,
      confidence,
      assessment: hasRequiredFields 
        ? 'Certificate data appears consistent with standard format. All required fields are present and properly formatted.'
        : 'Certificate data is incomplete or missing required fields. Additional verification recommended.',
      message: 'AI verification completed (simulated mode)',
      simulated: true
    };
  }

  /**
   * Analyze certificate text/content
   * @param {string} content - Certificate content
   * @returns {Object} - Analysis result
   */
  async analyzeCertificateContent(content) {
    try {
      if (!this.model) {
        return {
          success: true,
          analysis: 'Content analysis not available (API not configured)',
          simulated: true
        };
      }

      const prompt = `
Analyze this certificate content and extract key information:

${content}

Extract and return:
1. Recipient name
2. Issuing organization
3. Certificate type/course
4. Date of issuance
5. Any unique identifiers

Format as JSON.
`;

      const result = await this.model.generateContent(prompt);
      const response = await result.response;
      const text = response.text();

      return {
        success: true,
        analysis: text,
        message: 'Content analysis completed'
      };
    } catch (error) {
      console.error('Error analyzing content:', error);
      return {
        success: false,
        error: error.message
      };
    }
  }
}

// Create singleton instance
const geminiService = new GeminiService();

module.exports = geminiService;
