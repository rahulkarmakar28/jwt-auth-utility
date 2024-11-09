# jwt-auth-utility

**jwt-auth-utility** is a lightweight and easy-to-use utility package for handling JSON Web Tokens (JWT) in Node.js applications. It simplifies the process of generating, signing, verifying, and refreshing access and refresh tokens, making it ideal for implementing JWT-based authentication in your project.

## Features

- **Access & Refresh Tokens**: Easily generate and manage access and refresh tokens.
- **Custom Token Lifespan**: Configure expiration times for access and refresh tokens.
- **Token Verification**: Verify the authenticity of access and refresh tokens.
- **Token Decoding**: Decode JWTs without verification for quick access to payload data.
- **Refresh Tokens**: Generate new access tokens using refresh tokens.

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
  - [Basic Setup](#basic-setup)
  - [Generating Tokens](#generating-tokens)
  - [Verifying Tokens](#verifying-tokens)
  - [Refreshing Access Tokens](#refreshing-access-tokens)
  - [Decoding Tokens](#decoding-tokens)
- [License](#license)
- [Authors](#Authors)
- [Acknowledgments](#acknowledgments)

## Installation

Install the package via npm:

```bash
npm i jwt-auth-utility
```
## Usage
### Basic Setup
To start using jwtauthutil, first import and initialize the JWT utility by providing your secrets:

```bash
import JWT from 'jwt-auth-utility';

const jwtUtil = new JWT('your_access_secret', 'your_refresh_secret', 
  {
    accessTokenLife: '1d',  // Optional, defaults to '1d'
    refreshTokenLife: '7d'  // Optional, defaults to '7d'
  });
```

### Generating Tokens
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

### Verifying Tokens
To verify an access token:
```bash
const decodedAccessToken = jwtUtil.verifyAccessToken(accessToken);
```

To verify a refresh token:
```bash
const decodedRefreshToken = jwtUtil.verifyRefreshToken(refreshToken);
```
### Refreshing Access Tokens
To generate a new access token using a refresh token:
```bash
const newAccessToken = jwtUtil.refreshAccessToken(refreshToken);
```
### Decoding Tokens
You can decode tokens without verifying their validity:
```bash
const payload = jwtUtil.decodeToken(accessToken);
``` 

### License
[![MIT License](https://img.shields.io/badge/License-MIT-000?style=for-the-badge&logo=opensourceinitiative&logoColor=white)](https://opensource.org/licenses/MIT)


## Authors
- [@Rahul Karmakar](https://www.npmjs.com/~rahul28112002)


### Acknowledgments
[![jsonwebtoken](https://img.shields.io/badge/jsonwebtoken-000?style=for-the-badge&logo=npm&logoColor=white)](https://www.npmjs.com/package/jsonwebtoken)