import { updateClicksService } from '../services/linkService.js';

// REDIRECT
// GET /:code
export const redirectController = async (req, res) => {
  try {
    const { code } = req.params;

    // Update click count and get the link
    const link = await updateClicksService(code);

    // Perform 302 redirect
    return res.redirect(302, link.targetUrl);
  } catch (error) {
    if (error.status === 404) {
      return res.status(404).json({
        error: 'Link not found',
      });
    }

    return res.status(error.status || 500).json({
      error: error.message || 'Something went wrong',
    });
  }
};
