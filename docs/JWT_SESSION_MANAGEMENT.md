# JWT Session Management Documentation

## Overview

This document describes the secure session management system implemented using JWT (JSON Web Tokens) with refresh token rotation, token revocation, and CSRF protection.

## Key Features

### 1. Access Token (JWT)
- **Expiration**: 15 minutes
- **Type**: ******
- **Usage**: Sent in request headers for API authentication
- **Format**: `Authorization: ******

### 2. Refresh Token (JWT)
- **Expiration**: 30 days
- **Storage**: HTTP-only cookie (secure by default in production)
- **Usage**: Used to obtain new access tokens without re-authentication
- **Rotation**: Automatically rotated on each refresh request

### 3. Token Rotation Strategy
The system implements a token family-based rotation strategy to detect and prevent token reuse attacks:

- Each refresh token belongs to a family identified by `family_id`
- Each token has a unique `token_id`
- When a refresh token is used, the token family is checked for validity
- If a token from an old family is used (detected reuse), the entire family is revoked
- Users must re-authenticate to get new tokens

### 4. Token Revocation
- Tokens can be revoked using the logout endpoint
- Revoked tokens are stored in a blacklist in Redis
- Token blacklist is checked during verification
- Tokens are automatically removed from blacklist after expiration

### 5. CSRF Protection
- CSRF tokens are generated for protected operations
- CSRF tokens are validated on all state-changing requests (POST, PUT, DELETE, PATCH)
- Tokens are stored in Redis with 1-hour expiration
- Support for CSRF tokens in headers (`X-CSRF-Token`) or request body

## API Endpoints

### Get CSRF Token
```http
POST /api/v1/auth/csrf-token
```

**Response:**
```json
{
  "csrf_token": "ey..."
}
```

### GitHub Login
```http
POST /api/v1/auth/github/login
Content-Type: application/json

{
  "code": "github_authorization_code"
}
```

**Response:**
```json
{
  "access_token": "eyJ...",
  "refresh_token": "eyJ...",
  "token_type": "bearer",
  "expires_in": 900
}
```

**Cookies Set:**
- `refresh_token`: HTTP-only cookie with 30-day expiration

### Refresh Access Token
```http
POST /api/v1/auth/refresh
Content-Type: application/json

{
  "refresh_token": "eyJ..."
}
```

**Response:**
```json
{
  "access_token": "eyJ...",
  "refresh_token": "eyJ...",
  "expires_in": 900
}
```

**Cookies Set:**
- `refresh_token`: New HTTP-only cookie with 30-day expiration

### Logout
```http
POST /api/v1/auth/logout
X-CSRF-Token: csrf_token_value
Content-Type: application/json

{
  "refresh_token": "eyJ..."
}
```

**Response:**
```json
{
  "detail": "Logged out successfully"
}
```

**Cookies Cleared:**
- `refresh_token`: Deleted

### Get Current User
```http
GET /api/v1/auth/me
Authorization: ******
```

**Response:**
```json
{
  "id": 1,
  "username": "user",
  "email": "user@example.com"
}
```

## Authentication Flow

### Initial Login
1. Frontend makes GitHub OAuth request
2. User authorizes app in GitHub
3. Frontend receives authorization code
4. Frontend sends code to `/auth/github/login`
5. Backend exchanges code for GitHub access token
6. Backend retrieves user information from GitHub
7. Backend creates/updates user in database
8. Backend generates access and refresh tokens
9. Backend sets refresh token as HTTP-only cookie
10. Frontend stores access token in memory
11. Frontend is redirected to dashboard

### Making Authenticated Requests
1. Frontend includes access token in `Authorization` header
2. Backend verifies access token signature and expiration
3. Backend checks if token is blacklisted
4. Request is processed
5. If token is expired, frontend should request new token

### Refreshing Access Token
1. Frontend detects access token expiration (401 response)
2. Frontend sends refresh token to `/auth/refresh`
3. Backend validates refresh token
4. Backend checks for token reuse (security feature)
5. Backend issues new access token
6. Backend issues new refresh token (rotation)
7. Backend sets new refresh token cookie
8. Frontend uses new access token for future requests

### Logout
1. Frontend gets CSRF token from `/auth/csrf-token`
2. Frontend sends logout request to `/auth/logout` with CSRF token
3. Backend revokes refresh token (adds to blacklist)
4. Backend clears refresh token cookie
5. Frontend clears access token from memory
6. User is logged out

## Configuration

### Environment Variables
```bash
# Token expiration times (in config.py)
ACCESS_TOKEN_EXPIRE_MINUTES=15          # Access token lifetime
REFRESH_TOKEN_EXPIRE_DAYS=30            # Refresh token lifetime

# CSRF protection
CSRF_ENABLED=true                       # Enable/disable CSRF protection
CSRF_TOKEN_EXPIRE_HOURS=1              # CSRF token lifetime

# JWT
SECRET_KEY="your-secret-key"            # Secret key for signing tokens
ALGORITHM="HS256"                       # Algorithm for signing tokens

# Redis
REDIS_URL="redis://localhost:6379/0"   # Redis connection URL
```

## Security Considerations

### Best Practices

1. **Use HTTPS**: Always use HTTPS in production to prevent token interception
2. **HTTP-Only Cookies**: Refresh tokens are stored in HTTP-only cookies to prevent XSS attacks
3. **SameSite Cookies**: Cookies use SameSite=Lax for CSRF protection
4. **Short Access Token**: 15-minute access token limits damage from token theft
5. **Token Rotation**: Refresh tokens are rotated on each use
6. **Reuse Detection**: Token reuse (refresh token family mismatch) triggers complete logout
7. **CSRF Protection**: All state-changing requests require CSRF token validation
8. **Token Blacklist**: Revoked tokens are stored in Redis and checked on verification

### Token Reuse Detection

The system detects when a refresh token is used more than once:

```
Scenario: Attacker steals refresh token RT1
├─ User uses RT1 → issues new RT2 (stored in family)
├─ Attacker uses RT1 → checks family, finds RT2 (mismatch detected!)
└─ Attacker's request rejected, entire family revoked

User now needs to re-authenticate
```

## Redis Operations

The Redis service handles:

1. **Token Blacklist**: `blacklist:token:{token}`
2. **Token Families**: `refresh_token_family:user:{user_id}:{family_id}`
3. **CSRF Tokens**: `csrf_token:{csrf_token}`

All Redis keys have automatic expiration based on token lifetime.

## Testing

Run tests with:
```bash
pytest backend/tests/test_auth.py -v
pytest backend/tests/test_endpoints.py -v
```

Tests cover:
- Token creation and verification
- Token rotation and reuse detection
- Token revocation
- CSRF token generation and validation
- Password hashing
- Configuration values
- Auth endpoint functionality

## Troubleshooting

### Token Validation Fails
- Check if token is expired
- Verify SECRET_KEY is the same
- Check if token is blacklisted in Redis
- Verify Redis connection is working

### CSRF Token Invalid
- Ensure CSRF_ENABLED is true
- Check if CSRF token has expired (1 hour default)
- Verify X-CSRF-Token header is being sent
- Check if Redis connection is working

### Token Reuse Detected
- This is a security feature indicating token theft
- User needs to re-authenticate
- Check application logs for suspicious activity

### Redis Connection Failed
- Verify Redis is running
- Check REDIS_URL configuration
- If Redis unavailable, token blacklist/CSRF features will be skipped (with logging)

## Future Enhancements

Potential improvements:
- Add database-backed token revocation for durability
- Implement token rate limiting
- Add multi-factor authentication
- Implement session management dashboard
- Add token usage analytics
- Implement sliding window token expiration
