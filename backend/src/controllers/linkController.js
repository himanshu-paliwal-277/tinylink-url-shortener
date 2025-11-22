import {
  createLinkService,
  deleteLinkService,
  getAllLinksService,
  getSingleLinkService,
} from '../services/linkService.js';

// CREATE LINK
// POST /api/links
export const createLinkController = async (req, res) => {
  try {
    const linkData = await createLinkService(req.body);
    return res.status(201).json({
      message: 'Link created successfully',
      data: linkData,
    });
  } catch (error) {
    return res.status(error.status || 500).json({
      error: error.message || 'Something went wrong',
    });
  }
};

// DELETE LINK
// DELETE /api/links/:code
export const deleteLinkController = async (req, res) => {
  try {
    const result = await deleteLinkService(req.params.code);

    return res.status(200).json({
      message: 'Link deleted successfully',
      data: result,
    });
  } catch (error) {
    return res.status(error.status || 500).json({
      error: error.message || 'Something went wrong',
    });
  }
};

// GET ALL LINKS
// GET /api/links
export const getAllLinksController = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const search = req.query.search || '';

    const result = await getAllLinksService({ page, limit, search });
    return res.status(200).json(result);
  } catch (error) {
    return res.status(error.status || 500).json({
      error: error.message || 'Something went wrong',
    });
  }
};

// GET SINGLE LINK
// GET /api/links/:code
export const getSingleLinkController = async (req, res) => {
  try {
    const link = await getSingleLinkService(req.params.code);

    return res.status(200).json({
      data: link,
    });
  } catch (error) {
    return res.status(error.status || 500).json({
      error: error.message || 'Something went wrong',
    });
  }
};
