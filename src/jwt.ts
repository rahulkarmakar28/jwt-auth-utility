import jwt, { JwtPayload, SignOptions } from 'jsonwebtoken';

interface JWTOptions {
    accessTokenLife?: string;
    refreshTokenLife?: string;
}

export class JWT {
    private secret: string;
    private refreshSecret: string;
    private accessTokenLife: string;
    private refreshTokenLife: string;

    constructor(secret: string, refreshSecret: string, options: JWTOptions = {}) {
        this.secret = secret;
        this.refreshSecret = refreshSecret;
        this.accessTokenLife = options.accessTokenLife || '1d';
        this.refreshTokenLife = options.refreshTokenLife || '7d';
    }


    signAccessToken(payload: object): string {
        const options: SignOptions = {
            expiresIn: this.accessTokenLife as unknown as SignOptions['expiresIn'],
        };
        return jwt.sign(payload, this.secret, options);
    }

    signRefreshToken(payload: object): string {
        const options: SignOptions = {
            expiresIn: this.refreshTokenLife as unknown as SignOptions['expiresIn'],
        };
        return jwt.sign(payload, this.refreshSecret, options);
    }

    verifyAccessToken(token: string): JwtPayload | null {
        try {
            return jwt.verify(token, this.secret) as JwtPayload;
        } catch (error) {
            console.error('Invalid access token:', error);
            return null;
        }
    }

    verifyRefreshToken(token: string): JwtPayload | null {
        try {
            return jwt.verify(token, this.refreshSecret) as JwtPayload;
        } catch (error) {
            console.error('Invalid refresh token:', error);
            return null;
        }
    }

    decodeToken(token: string): null | string | JwtPayload {
        return jwt.decode(token);
    }

    generateTokens(payload: object): { accessToken: string; refreshToken: string } {
        const accessToken = this.signAccessToken(payload);
        const refreshToken = this.signRefreshToken(payload);
        return { accessToken, refreshToken };
    }

    refreshAccessToken(refreshToken: string): string | null {
        const verifiedPayload = this.verifyRefreshToken(refreshToken);
        if (verifiedPayload) {
            const { iat, exp, ...newPayload } = verifiedPayload as any;
            return this.signAccessToken(newPayload);
        }
        return null;
    }
}
