# 🔐 jwt-auth-utility

`jwt-auth-utility` is a lightweight, TypeScript-ready library for working with **access and refresh tokens** in Node.js. It wraps the popular `jsonwebtoken` package into a simple class that handles **token generation**, **verification**, **decoding**, and **refreshing**, making it ideal for building secure authentication flows.

---

## ✨ Features

- ✅ **Access & Refresh Tokens**: Generate and manage both token types easily.
- ⏳ **Custom Expiration**: Configure lifetimes for both tokens (e.g. `"15m"`, `"7d"`).
- 🔍 **Token Verification**: Safely verify JWTs using separate secrets.
- 📖 **Token Decoding**: Decode payloads without verifying.
- 🔄 **Token Refreshing**: Issue new access tokens from valid refresh tokens.
- 🧠 **TypeScript Support**: Fully typed and ready for use in TS or JS projects.

---

## 📦 Installation

```sh
npm install jwt-auth-utility
```
## 🚀 Usage
### 1. Basic Setup
To start using jwtauthutil, first import and initialize the JWT utility by providing your secrets:

```bash
import { JWT } from 'jwt-auth-utility';

const jwtUtil = new JWT(
  'your_access_secret',
  'your_refresh_secret',
  {
    accessTokenLife: '1h',     // optional, defaults to '1h'
    refreshTokenLife: '1d'     // optional, defaults to '1d'
  }
);
```

### 2. Generating Tokens
You can generate both access and refresh tokens by passing a payload:

```bash
const payload= 
  {
    userId: 123,
    email: "exapmle@mail.com",
    role: "admin"
  } 
const { accessToken, refreshToken } = jwtUtil.generateTokens(payload);
```

### 3. Verifying Tokens
✅ Verify Access Token:
```bash
const decoded = jwtUtil.verifyAccessToken(accessToken);
console.log(decoded); // payload or null
```

🔁 Verify Refresh Token:
```bash
const decodedRefresh = jwtUtil.verifyRefreshToken(refreshToken);
console.log(decodedRefresh); // payload or null
```
### 4. Refreshing Access Tokens
To generate a new access token using a refresh token:
```bash
const newAccessToken = jwtUtil.refreshAccessToken(refreshToken);
console.log(newAccessToken); // string or null
```
### 5. Decoding Tokens (without verifying)
You can decode tokens without verifying their validity:
```bash
const decodedPayload = jwtUtil.decodeToken(accessToken);
console.log(decodedPayload); // { userId, email, role, iat, exp, ... }
``` 

## 🧪 Testing

You can create a `test.ts` file to manually test all features of `jwt-auth-utility`:

```bash
import { JWT } from 'jwt-auth-utility';

const jwtUtil = new JWT('access-secret', 'refresh-secret', {
  accessTokenLife: '15m',
  refreshTokenLife: '1d',
});

const payload = { userId: 'abc123', role: 'admin' };

// Generate tokens
const { accessToken, refreshToken } = jwtUtil.generateTokens(payload);
console.log('Access Token:', accessToken);
console.log('Refresh Token:', refreshToken);

// Verify tokens
console.log('Verified Access Token:', jwtUtil.verifyAccessToken(accessToken));
console.log('Verified Refresh Token:', jwtUtil.verifyRefreshToken(refreshToken));

// Refresh access token
const newAccessToken = jwtUtil.refreshAccessToken(refreshToken);
console.log('New Access Token:', newAccessToken);

// Decode without verification
console.log('Decoded Token:', jwtUtil.decodeToken(accessToken));
```


## 🛡️ Security Tips
- Keep your secrets (especially refreshSecret) out of version control.
- Use environment variables (process.env.JWT_SECRET) in real apps.
- Use HTTPS in production to prevent token theft via MITM.


### License
[![MIT License](https://img.shields.io/badge/License-MIT-000?style=for-the-badge&logo=opensourceinitiative&logoColor=white)](https://opensource.org/licenses/MIT)


## Authors
- [@Rahul Karmakar](https://www.npmjs.com/~rahul28112002)


### Acknowledgments
[![jsonwebtoken](https://img.shields.io/badge/jsonwebtoken-000?style=for-the-badge&logo=npm&logoColor=white)](https://www.npmjs.com/package/jsonwebtoken)