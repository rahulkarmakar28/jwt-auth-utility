const jwt = require('jsonwebtoken');
class JWT {
    constructor(secret, refreshSecret, options = {}) {
        this.secret = secret;
        this.refreshSecret = refreshSecret;
        this.accessTokenLife = options.accessTokenLife || '1d';
        this.refreshTokenLife = options.refreshTokenLife || '7d';
    }

    signAccessToken(payload) {
        return jwt.sign(payload, this.secret, { expiresIn: this.accessTokenLife });
    }

    signRefreshToken(payload) {
        return jwt.sign(payload, this.refreshSecret, { expiresIn: this.refreshTokenLife });
    }

    verifyAccessToken(token) {
        try {
            return jwt.verify(token, this.secret);
        } catch (error) {
            console.error('Invalid access token:', error);
            return null;
        }
    }

    verifyRefreshToken(token) {
        try {
            return jwt.verify(token, this.refreshSecret);
        } catch (error) {
            console.error('Invalid refresh token:', error);
            return null;
        }
    }

    decodeToken(token) {
        return jwt.decode(token);
    }

    generateTokens(payload) {
        const accessToken = this.signAccessToken(payload);
        const refreshToken = this.signRefreshToken(payload);
        return { accessToken, refreshToken };
    }

    refreshAccessToken(refreshToken) {
        const verifiedPayload = this.verifyRefreshToken(refreshToken);
        if (verifiedPayload) {
            const { iat, exp, ...newPayload } = verifiedPayload;
            return this.signAccessToken(newPayload);
        }
        return null;
    }
}

module.exports = JWT;