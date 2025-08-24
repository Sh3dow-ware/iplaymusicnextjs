// Simple Node.js script to test token generation
const crypto = require('crypto');

function generateRandomToken(length = 32) {
  return crypto.randomBytes(length).toString('hex');
}

function generateAccessToken() {
  return generateRandomToken(32); // 64 character hex string
}

function generateRefreshToken() {
  return generateRandomToken(48); // 96 character hex string
}

function generateTokenPair() {
  return {
    accessToken: generateAccessToken(),
    refreshToken: generateRefreshToken()
  };
}

console.log('=== Random Token Generation Test ===\n');

// Generate individual tokens
console.log('Individual Tokens:');
const accessToken = generateAccessToken();
const refreshToken = generateRefreshToken();

console.log('Access Token:', accessToken);
console.log('Access Token Length:', accessToken.length);
console.log('Refresh Token:', refreshToken);
console.log('Refresh Token Length:', refreshToken.length);

console.log('\n=== Token Pair ===');
const tokenPair = generateTokenPair();
console.log('Access Token:', tokenPair.accessToken);
console.log('Refresh Token:', tokenPair.refreshToken);

console.log('\n=== Multiple Token Pairs (to verify randomness) ===');
for (let i = 1; i <= 3; i++) {
  const pair = generateTokenPair();
  console.log(`Pair ${i}:`);
  console.log(`  Access:  ${pair.accessToken}`);
  console.log(`  Refresh: ${pair.refreshToken}`);
}

console.log('\n=== Token Security Info ===');
console.log('Access Token: 32 bytes = 256 bits of entropy');
console.log('Refresh Token: 48 bytes = 384 bits of entropy');
console.log('Both tokens are cryptographically secure random values');