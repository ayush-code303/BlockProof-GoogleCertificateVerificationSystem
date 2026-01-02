// geminiService.js update
async function analyzeImage(imagePath) {
  const prompt = `Perform a Forensic Analysis on this certificate. 
    1. Scan for "Font Inconsistency" in the Name and Date fields.
    2. Check if the Logo has "Artifacts" (blurriness) around edges indicating a copy-paste.
    3. Verify if the digital seal alignment is pixel-perfect.
    
    Return JSON with a 'riskScore' (0-100) and 'tamperEvidence' list.`;

  // ... existing implementation ...
}
