# TinyLink Backend API

Backend server for TinyLink URL Shortener built with Node.js, Express, and MongoDB.

## Features

- ✅ Create short links with custom or auto-generated codes
- ✅ Redirect with click tracking
- ✅ View statistics for individual links
- ✅ List all links
- ✅ Delete links
- ✅ Health check endpoint
- ✅ Zod validation
- ✅ CORS support

## Tech Stack

- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MongoDB with Mongoose
- **Validation**: Zod
- **Dev Tools**: ESLint, Prettier, Nodemon

## Setup

1. **Install dependencies**:

   ```bash
   npm install
   ```

2. **Configure environment variables**:
   Create a `.env` file based on `.env.example`:

   ```bash
   cp .env.example .env
   ```

   Update the values:

   ```env
   PORT=4000
   NODE_ENV=development
   MONGODB_URI=mongodb://localhost:27017/tinylink
   ```

3. **Start the server**:

   ```bash
   npm start
   ```

   The server will start at `http://localhost:4000`

## API Endpoints

### Health Check

#### GET /healthz

Check if the server is running.

**Response** (200):

```json
{
  "ok": true,
  "version": "1.0",
  "uptime": 123.456,
  "timestamp": "2025-11-21T10:00:00.000Z",
  "environment": "development"
}
```

### Links Management

#### POST /api/v1/links

Create a new short link.

**Request Body**:

```json
{
  "targetUrl": "https://example.com/very/long/url",
  "code": "abc123" // Optional: 6-8 alphanumeric characters
}
```

**Response** (201):

```json
{
  "message": "Link created successfully",
  "data": {
    "_id": "...",
    "code": "abc123",
    "targetUrl": "https://example.com/very/long/url",
    "totalClicks": 0,
    "lastClicked": null,
    "createdAt": "2025-11-21T10:00:00.000Z",
    "updatedAt": "2025-11-21T10:00:00.000Z"
  }
}
```

**Error Response** (409) - Code already exists:

```json
{
  "error": "Short code already exists"
}
```

**Error Response** (400) - Invalid URL or code:

```json
{
  "error": "Validation failed",
  "details": [
    {
      "path": "targetUrl",
      "message": "Invalid URL format. Must be a valid http or https URL"
    }
  ]
}
```

#### GET /api/v1/links

Get all links.

**Response** (200):

```json
{
  "data": [
    {
      "_id": "...",
      "code": "abc123",
      "targetUrl": "https://example.com",
      "totalClicks": 5,
      "lastClicked": "2025-11-21T10:00:00.000Z",
      "createdAt": "2025-11-21T09:00:00.000Z",
      "updatedAt": "2025-11-21T10:00:00.000Z"
    }
  ]
}
```

#### GET /api/v1/links/:code

Get statistics for a specific link.

**Response** (200):

```json
{
  "data": {
    "_id": "...",
    "code": "abc123",
    "targetUrl": "https://example.com",
    "totalClicks": 5,
    "lastClicked": "2025-11-21T10:00:00.000Z",
    "createdAt": "2025-11-21T09:00:00.000Z",
    "updatedAt": "2025-11-21T10:00:00.000Z"
  }
}
```

**Error Response** (404):

```json
{
  "error": "Link not found"
}
```

#### DELETE /api/v1/links/:code

Delete a link.

**Response** (200):

```json
{
  "message": "Link deleted successfully",
  "data": {
    "message": "Link deleted successfully",
    "code": "abc123"
  }
}
```

**Error Response** (404):

```json
{
  "error": "Link not found"
}
```

### Redirect

#### GET /:code

Redirect to the original URL and track click.

**Response** (302):
Redirects to the target URL.

**Error Response** (404):

```json
{
  "error": "Link not found"
}
```

## Validation Rules

### Short Code

- Must be 6-8 alphanumeric characters (A-Z, a-z, 0-9)
- Globally unique across all users
- Auto-generated if not provided

### Target URL

- Must be a valid HTTP or HTTPS URL
- Cannot be empty

## Project Structure

```
backend/
├── src/
│   ├── config/           # Configuration files
│   │   ├── dbConfig.js   # Database connection
│   │   └── serverConfig.js # Server config & env variables
│   ├── controllers/       # Request handlers
│   │   ├── healthController.js
│   │   ├── linkController.js
│   │   └── redirectController.js
│   ├── middleware/        # Express middleware
│   │   └── validateRequest.js # Zod validation middleware
│   ├── repository/        # Database operations
│   │   ├── crudRepository.js
│   │   └── linkRepository.js
│   ├── routes/           # API routes
│   │   ├── apiRouter.js
│   │   └── v1/
│   │       ├── linkRoutes.js
│   │       └── v1Router.js
│   ├── schema/           # Mongoose schemas
│   │   └── link.js
│   ├── services/         # Business logic
│   │   └── linkService.js
│   ├── utils/            # Utility functions
│   │   ├── generateCode.js
│   │   └── validateUrl.js
│   ├── validation/       # Zod schemas
│   │   └── linkValidation.js
│   └── server.js         # Entry point
├── .env.example          # Environment variables template
├── package.json
└── README.md
```

## Scripts

- `npm start` - Start development server with nodemon
- `npm run lint` - Run ESLint
- `npm run lint:fix` - Fix ESLint errors automatically
- `npm run format` - Format code with Prettier

## Error Handling

All endpoints return consistent error responses:

```json
{
  "error": "Error message here"
}
```

Common HTTP status codes:

- `200` - Success
- `201` - Created
- `302` - Redirect
- `400` - Bad Request (validation errors)
- `404` - Not Found
- `409` - Conflict (duplicate code)
- `500` - Internal Server Error

## CORS Configuration

By default, the API accepts requests from:

- `http://localhost:3000` (frontend dev server)

Update `allowedOrigins` in [server.js](src/server.js#L15) to add more origins.

## Database Schema

### Link Model

```javascript
{
  code: String,        // 6-8 alphanumeric, unique
  targetUrl: String,   // Valid HTTP/HTTPS URL
  totalClicks: Number, // Default: 0
  lastClicked: Date,   // Default: null
  createdAt: Date,     // Auto-generated
  updatedAt: Date      // Auto-generated
}
```

## License

ISC
