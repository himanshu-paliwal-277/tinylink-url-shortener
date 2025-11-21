import express from 'express';

import {
  createLinkController,
  deleteLinkController,
  getAllLinksController,
  getSingleLinkController,
} from '../../controllers/linkController.js';
import { validateBody, validateParams } from '../../middleware/validateRequest.js';
import { createLinkSchema, linkCodeParamSchema } from '../../validation/linkValidation.js';

const router = express.Router();

// POST /api/links - Create new link
router.post('/links', validateBody(createLinkSchema), createLinkController);

// GET /api/links - Get all links
router.get('/links', getAllLinksController);

// GET /api/links/:code - Get single link stats
router.get('/links/:code', validateParams(linkCodeParamSchema), getSingleLinkController);

// DELETE /api/links/:code - Delete link
router.delete('/links/:code', validateParams(linkCodeParamSchema), deleteLinkController);

export default router;
