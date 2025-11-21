import express from 'express';

import {
  createLinkController,
  deleteLinkController,
  getAllLinksController,
  getSingleLinkController,
} from '../../controllers/linkController.js';

const router = express.Router();

router.post('/links', createLinkController);

router.get('/links', getAllLinksController);

router.get('/links/:code', getSingleLinkController);

router.delete('/links/:code', deleteLinkController);
export default router;
