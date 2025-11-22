# TinyLink - URL Shortener

A modern, full-stack URL shortener application with click tracking and analytics.

## 🚀 Live Demo

- **Frontend**: [Your Vercel URL]
- **Backend**: [Your Render/Railway URL]

## 📸 Screenshots

[Add screenshots of your application here]

## ✨ Features

- Create short links with custom or auto-generated codes (6-8 alphanumeric characters)
- 302 HTTP redirect to target URLs
- Click tracking (total clicks, last clicked time)
- Detailed analytics for each link
- Search and filter links
- Delete links
- Responsive design (mobile, tablet, desktop)
- Real-time updates with React Query
- Toast notifications for user feedback

## 🛠️ Tech Stack

### Frontend
- Next.js 16 (App Router) + TypeScript
- Tailwind CSS v4 + shadcn/ui
- TanStack React Query
- Axios + Context API

### Backend
- Node.js + Express.js
- MongoDB + Mongoose
- Zod validation

## 📡 API Endpoints

- `POST /api/links` - Create link (409 if code exists)
- `GET /api/links` - List all links
- `GET /api/links/:code` - Stats for one code
- `DELETE /api/links/:code` - Delete link
- `GET /:code` - Redirect (302)
- `GET /healthz` - Health check

## 🚦 Quick Start

### Prerequisites
- Node.js 18+
- MongoDB (local or MongoDB Atlas)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/himanshu-paliwal-277/tinylink-url-shortener
   cd tinylink-url-shortener
   ```

2. **Setup Backend**
   ```bash
   cd backend
   npm install
   cp .env.example .env
   # Edit .env with your MongoDB URI
   npm start
   ```

3. **Setup Frontend**
   ```bash
   cd frontend
   npm install
   cp .env.example .env.local
   npm run dev
   ```

4. **Open** `http://localhost:3000`

## 📁 Project Structure

```
tinylink-url-shortener/
├── frontend/          # Next.js app
└── backend/           # Express API
```

## 🌐 Deployment

### Frontend (Vercel)
1. Push to GitHub
2. Connect to Vercel
3. Set env: `NEXT_PUBLIC_API_BASE_URL`
4. Deploy

### Backend (Render/Railway)
1. Push to GitHub
2. Connect to platform
3. Set env: `PORT`, `NODE_ENV`, `MONGODB_URI`
4. Deploy
