import cors from 'cors';
import express from 'express';

import connectDB from './config/dbConfig.js';
import { PORT } from './config/serverConfig.js';
import { healthCheckController } from './controllers/healthController.js';
import { redirectController } from './controllers/redirectController.js';
import apiRouter from './routes/apiRouter.js';

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const allowedOrigins = ['http://localhost:3000', 'https://tinylink-url-shortener.netlify.app'];

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error('Not allowed by CORS'));
      }
    },
    credentials: true,
  })
);

// Health check endpoint - /healthz
app.get('/healthz', healthCheckController);

app.get('/', (req, res) => {
  return res.status(200).json({ message: 'Welcome to TinyLink URL Shortener Backend!' });
});

// API routes - /api/*
app.use('/api', apiRouter);

// Redirect route - /:code (must be last to not override other routes)
app.get('/:code', redirectController);

app.listen(PORT, async () => {
  console.log(`🚀 Server is up and running at: http://localhost:${PORT}`);
  connectDB();
});
