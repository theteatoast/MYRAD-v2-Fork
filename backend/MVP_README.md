# MYRAD MVP Backend - Integration Guide

## What's Been Built

The MVP backend is ready with the following components:

### 1. JSON Storage (`jsonStorage.js`)
- Users with Privy IDs
- Points ledger
- Data contributions
- API keys for enterprise access

### 2. MVP API Routes (`mvpRoutes.js`)
All routes are prefixed with `/api`

#### User Endpoints:
- `POST /api/auth/verify` - Verify Privy token and get/create user
- `GET /api/user/profile` - Get user profile
- `GET /api/user/points` - Get points balance and history
- `GET /api/user/contributions` - Get contribution history
- `POST /api/contribute` - Submit anonymized data contribution
- `GET /api/leaderboard` - Get top contributors

#### Enterprise Endpoints:
- `GET /api/enterprise/data` - Access anonymized data (requires API key)
- `GET /api/enterprise/insights` - Get aggregated insights (requires API key)
- `POST /api/enterprise/keys` - Generate API key (requires admin secret)

## Integration Steps

To integrate the MVP API into your existing server, add this line to `backend/server.js`:

```javascript
// After line 11 (import statements):
import mvpRoutes from './mvpRoutes.js';

// After line 158 (after app.get("/")):
app.use('/api', mvpRoutes);
```

## Testing the API

### 1. Generate an API Key (for enterprise endpoints)

```bash
curl -X POST http://localhost:3001/api/enterprise/keys \
  -H "Content-Type: application/json" \
  -d '{"name": "Test Key", "adminSecret": "your-admin-secret"}'
```

Set `ADMIN_SECRET` in your `.env` file first.

### 2. Test User Flow (Privy Auth Stub)

For MVP testing, use this token format: `privy_userId_email@example.com`

**Create/Verify User:**
```bash
curl -X POST http://localhost:3001/api/auth/verify \
  -H "Authorization: Bearer privy_user123_john@example.com"
```

**Get Profile:**
```bash
curl http://localhost:3001/api/user/profile \
  -H "Authorization: Bearer privy_user123_john@example.com"
```

**Submit Contribution:**
```bash
curl -X POST http://localhost:3001/api/contribute \
  -H "Authorization: Bearer privy_user123_john@example.com" \
  -H "Content-Type: application/json" \
  -d '{
    "anonymizedData": {"preference": "tech", "ageGroup": "25-34"},
    "dataType": "preferences",
    "reclaimProofId": "proof_123"
  }'
```

**Get Points:**
```bash
curl http://localhost:3001/api/user/points \
  -H "Authorization: Bearer privy_user123_john@example.com"
```

**Get Leaderboard:**
```bash
curl http://localhost:3001/api/leaderboard
```

### 3. Test Enterprise API

**Get Anonymized Data:**
```bash
curl http://localhost:3001/api/enterprise/data \
  -H "X-API-Key: your-api-key-here"
```

**Get Insights:**
```bash
curl http://localhost:3001/api/enterprise/insights \
  -H "X-API-Key: your-api-key-here"
```

## Points System

- **Signup Bonus**: 100 points (automatic)
- **Data Contribution**: 500 points per contribution

## Data Storage

All data is stored in JSON files under `backend/data/`:
- `users.json` - User profiles
- `points.json` - Points transactions
- `contributions.json` - Data contributions  
- `api_keys.json` - Enterprise API keys

## Next Steps

1. **Privy Integration**: Replace the auth stub with actual Privy SDK
2. **Reclaim Integration**: Add real Reclaim Protocol verification using app ID/secret
3. **PostgreSQL Migration**: Move from JSON to database when ready
4. **Rate Limiting**: Add proper rate limiting for production
5. **API Documentation**: Create Swagger/OpenAPI docs

## Environment Variables

Add to `.env`:
```
ADMIN_SECRET=your-secure-admin-secret-here
```

## File Structure

```
backend/
├── jsonStorage.js      # JSON file storage layer
├── mvpRoutes.js        # MVP API endpoints
├── server.js           # Main server (needs integration)
└── data/               # JSON data files (auto-created)
    ├── users.json
    ├── points.json
    ├── contributions.json
    └── api_keys.json
```
