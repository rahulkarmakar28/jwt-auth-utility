import { JWT } from './jwt';

const SECRET = 'your-access-secret';
const REFRESH_SECRET = 'your-refresh-secret';

const jwtUtil = new JWT(SECRET, REFRESH_SECRET, {
    accessTokenLife: '1h',
    refreshTokenLife: '1d',
});

const userPayload = {
    userId: 'abc123',
    role: 'admin',
};

// Generate tokens
const { accessToken, refreshToken } = jwtUtil.generateTokens(userPayload);

console.log('Access Token:', accessToken);
console.log('Refresh Token:', refreshToken);

// Verify access token
const verifiedAccess = jwtUtil.verifyAccessToken(accessToken);
console.log('Verified Access Token:', verifiedAccess);

// Decode access token
const decodedAccess = jwtUtil.decodeToken(accessToken);
console.log('Decoded Access Token:', decodedAccess);

// Refresh access token
const newAccessToken = jwtUtil.refreshAccessToken(refreshToken);
console.log('New Access Token from Refresh:', newAccessToken);

// Invalid token test
const invalidVerify = jwtUtil.verifyAccessToken('invalid.token.here');
console.log('Invalid Token Test:', invalidVerify);
