import express from 'express';

import linkRoutes from './linkRoutes.js';

const router = express.Router();

// Mount link routes directly under /api/v1
router.use('/', linkRoutes);

export default router;
