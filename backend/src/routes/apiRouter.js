import express from 'express';

import linkRoutes from './linkRoutes.js';

const router = express.Router();

// Mount link routes directly under /api
router.use('/links', linkRoutes);

export default router;
