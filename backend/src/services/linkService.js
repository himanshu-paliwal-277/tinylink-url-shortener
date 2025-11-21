import linkRepository from '../repository/linkRepository.js';
import Link from '../schema/link.js';
import generateCode from '../utils/generateCode.js';
import validateUrl from '../utils/validateUrl.js';

// ------------------- CREATE LINK -------------------
export const createLinkService = async (data) => {
  const { targetUrl, code } = data;

  // Validate URL
  if (!validateUrl(targetUrl)) {
    const error = new Error('Invalid target URL');
    error.status = 400;
    throw error;
  }

  let shortCode = code;

  // If custom code provided → validate regex
  if (shortCode) {
    const regex = /^[A-Za-z0-9]{6,8}$/;
    if (!regex.test(shortCode)) {
      const error = new Error('Invalid short code format');
      error.status = 400;
      throw error;
    }

    // Check if custom code already exists
    const existing = await Link.findOne({ code: shortCode });
    if (existing) {
      const error = new Error('Short code already exists');
      error.status = 409;
      throw error;
    }
  } else {
    // Auto-generate 6 char alphanumeric code and ensure uniqueness
    let attempts = 0;
    const maxAttempts = 10;

    while (attempts < maxAttempts) {
      shortCode = generateCode(6);
      const existing = await Link.findOne({ code: shortCode });
      if (!existing) break;
      attempts++;
    }

    if (attempts === maxAttempts) {
      const error = new Error('Could not generate unique code');
      error.status = 500;
      throw error;
    }
  }

  // Create new link
  const newLink = await linkRepository.create({
    code: shortCode,
    targetUrl,
    totalClicks: 0,
    lastClicked: null,
  });

  return newLink;
};

// ------------------- GET ALL LINKS -------------------
export const getAllLinksService = async () => {
  const links = await linkRepository.getAll();
  return links;
};

// ------------------- GET SINGLE LINK -------------------
export const getSingleLinkService = async (code) => {
  const link = await Link.findOne({ code });

  if (!link) {
    const error = new Error('Link not found');
    error.status = 404;
    throw error;
  }

  return link;
};

// ------------------- DELETE LINK -------------------
export const deleteLinkService = async (code) => {
  const link = await Link.findOne({ code });

  if (!link) {
    const error = new Error('Link not found');
    error.status = 404;
    throw error;
  }

  // Hard delete from database
  await Link.findByIdAndDelete(link._id);

  return { message: 'Link deleted successfully', code };
};

// ------------------- UPDATE CLICKS (Redirect) -------------------
export const updateClicksService = async (code) => {
  const link = await Link.findOne({ code });

  if (!link) {
    const error = new Error('Link not found');
    error.status = 404;
    throw error;
  }

  // Increment clicks atomically using findOneAndUpdate
  const updated = await Link.findOneAndUpdate(
    { code },
    {
      $inc: { totalClicks: 1 },
      $set: { lastClicked: new Date() },
    },
    { new: true }
  );

  return updated;
};
