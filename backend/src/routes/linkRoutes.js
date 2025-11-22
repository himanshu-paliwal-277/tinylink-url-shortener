import express from 'express';

import {
  createLinkController,
  deleteLinkController,
  getAllLinksController,
  getSingleLinkController,
} from '../controllers/linkController.js';
import { validateBody, validateParams } from '../middleware/validateRequest.js';
import { createLinkSchema, linkCodeParamSchema } from '../validation/linkValidation.js';

const router = express.Router();

// POST /api - Create new link
router.post('', validateBody(createLinkSchema), createLinkController);

// GET /api - Get all links
router.get('', getAllLinksController);

// GET /api/:code - Get single link stats
router.get('/:code', validateParams(linkCodeParamSchema), getSingleLinkController);

// DELETE /api/:code - Delete link
router.delete('/:code', validateParams(linkCodeParamSchema), deleteLinkController);

export default router;
