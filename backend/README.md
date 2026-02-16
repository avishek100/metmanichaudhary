# Metmani Backend API

Complete REST API backend for the Metmani website with admin panel functionality for managing news, photos, and videos.

## Features

- **Authentication & Authorization**
  - User registration and login with JWT tokens
  - Role-based access control (Admin, Editor, User)
  - Secure password hashing with bcryptjs

- **News Management**
  - Create, read, update, delete news articles
  - Bilingual support (English & Hindi)
  - Featured news marking
  - Draft and Published status
  - View tracking

- **Photo Gallery Management**
  - Upload and manage photos
  - Organize by albums
  - Bilingual metadata
  - Featured photos functionality
  - Tag support
  - View tracking

- **Video Management**
  - Add videos with YouTube/file URLs
  - Category organization
  - Duration tracking
  - Bilingual support
  - Featured videos
  - Tag support
  - View tracking

- **User Management (Admin Only)**
  - Manage users and their roles
  - Activate/Deactivate users
  - Track last login

- **Dashboard Stats**
  - Total content statistics
  - Published content counts
  - View analytics
  - Recent activity

## Requirements

- Node.js (v14 or higher)
- MongoDB (local or cloud)
- npm or yarn

## Installation

1. **Install dependencies:**
```bash
cd backend
npm install
```

2. **Create .env file:**
```bash
cp .env.example .env
```

3. **Configure environment variables in .env:**
```
MONGO_URI=mongodb://localhost:27017/metmani
JWT_SECRET=your_secure_jwt_secret_key
PORT=5000
NODE_ENV=development
UPLOAD_DIR=./uploads
MAX_FILE_SIZE=52428800
```

4. **Create uploads directory:**
```bash
mkdir uploads
```

5. **Start MongoDB** (if running locally)

6. **Run the server:**

Development mode (with auto-reload):
```bash
npm run dev
```

Production mode:
```bash
npm start
```

The server will start on `http://localhost:5000`

## API Endpoints

### Authentication

- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user (requires token)

### News

- `GET /api/news` - Get all news (paginated)
- `GET /api/news?status=published&category=announcement` - Filter news
- `GET /api/news/:id` - Get single news
- `POST /api/news` - Create news (multipart form-data with image)
- `PUT /api/news/:id` - Update news
- `DELETE /api/news/:id` - Delete news
- `PATCH /api/news/:id/featured` - Toggle featured status

### Photos

- `GET /api/photos` - Get all photos (paginated)
- `GET /api/photos?album=Events` - Filter by album
- `GET /api/photos/albums` - Get all album names
- `GET /api/photos/:id` - Get single photo
- `POST /api/photos` - Create photo (multipart form-data)
- `PUT /api/photos/:id` - Update photo
- `DELETE /api/photos/:id` - Delete photo
- `PATCH /api/photos/:id/featured` - Toggle featured status

### Videos

- `GET /api/videos` - Get all videos (paginated)
- `GET /api/videos?category=tutorial` - Filter videos
- `GET /api/videos/:id` - Get single video
- `POST /api/videos` - Create video (JSON)
- `PUT /api/videos/:id` - Update video
- `DELETE /api/videos/:id` - Delete video
- `PATCH /api/videos/:id/featured` - Toggle featured status

### Admin Dashboard

- `GET /api/admin/stats` - Dashboard statistics (admin only)
- `GET /api/admin/users` - List all users (admin only)
- `PUT /api/admin/users/:id/role` - Update user role (admin only)
- `PATCH /api/admin/users/:id/status` - Toggle user status (admin only)
- `DELETE /api/admin/users/:id` - Delete user (admin only)

## Authentication

All protected endpoints require a Bearer token in the Authorization header:

```
Authorization: Bearer <your_jwt_token>
```

## File Upload

Maximum file size: 50MB (configurable via MAX_FILE_SIZE)

Allowed file types:
- Images: JPEG, PNG, GIF, WebP
- Videos: MP4, MPEG, WebM

## Error Handling

The API returns standard HTTP status codes:

- `200` - Success
- `201` - Created
- `400` - Bad Request
- `401` - Unauthorized
- `403` - Forbidden
- `404` - Not Found
- `500` - Internal Server Error

## Database Schema

### User
```json
{
  "name": "string",
  "email": "string (unique)",
  "password": "string (hashed)",
  "role": "admin|editor|user",
  "isActive": "boolean",
  "lastLogin": "date"
}
```

### News
```json
{
  "title": "string",
  "description": "string",
  "content": "text",
  "image": "string (file path)",
  "author": "ObjectId (User)",
  "category": "announcement|event|update|other",
  "status": "draft|published",
  "featured": "boolean",
  "views": "number",
  "publishedAt": "date"
}
```

### Photo
```json
{
  "title": "string",
  "image": "string (file path)",
  "album": "string",
  "author": "ObjectId (User)",
  "status": "draft|published",
  "featured": "boolean",
  "views": "number",
  "tags": ["string"]
}
```

### Video
```json
{
  "title": "string",
  "videoUrl": "string",
  "category": "event|tutorial|news|other",
  "author": "ObjectId (User)",
  "status": "draft|published",
  "featured": "boolean",
  "views": "number",
  "duration": "number",
  "tags": ["string"]
}
```

## Security Features

- CORS protection
- Helmet.js security headers
- Input validation with Joi
- Password hashing with bcryptjs
- JWT token-based authentication
- Role-based access control
- Rate limiting support (configurable)

## Deployment

For production deployment:

1. Set `NODE_ENV=production`
2. Use a strong JWT_SECRET
3. Configure proper MongoDB connection (Atlas recommended)
4. Use environment variables for sensitive data
5. Enable HTTPS
6. Configure appropriate CORS origins
7. Set up proper file storage (cloud storage recommended)

## Support

For issues or questions, please create an issue in the repository.
