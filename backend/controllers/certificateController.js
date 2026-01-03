// Step 5 mein Trust Score calculate karein
const calculateTrustScore = (blockchain, hashMatch, ai) => {
  let score = 0;
  if (blockchain.exists && blockchain.isValid) score += 40;
  if (hashMatch) score += 30;
  if (ai && ai.isAuthentic) score += ai.confidence * 0.3; // AI weightage 30%
  return score;
};

// Response mein bhejien
res.json({
  success: true,
  trustScore: calculateTrustScore(blockchainResult, hashMatch, aiResult),
  verdict: verdict,
  // ...
});
