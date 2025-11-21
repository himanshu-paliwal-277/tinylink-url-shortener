import linkRepository from '../repository/linkRepository.js';
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
  } else {
    // Auto-generate 6–8 char alphanumeric code
    shortCode = generateCode();
  }

  // Check if code already exists
  const existing = await linkRepository.getAll();
  if (existing.find((x) => x.code === shortCode)) {
    const error = new Error('Short code already exists');
    error.status = 409;
    throw error;
  }

  // Create new link
  const newLink = await linkRepository.create({
    code: shortCode,
    targetUrl,
    totalClicks: 0,
    lastClicked: null,
    deleted: false,
  });

  return newLink;
};

// ------------------- GET ALL LINKS -------------------
export const getAllLinksService = async () => {
  const links = await linkRepository.getAll();

  // Filter out deleted links
  return links.filter((l) => !l.deleted);
};

// ------------------- GET SINGLE LINK -------------------
export const getSingleLinkService = async (code) => {
  const allLinks = await linkRepository.getAll();
  const link = allLinks.find((x) => x.code === code);

  if (!link || link.deleted) {
    const error = new Error('Link not found');
    error.status = 404;
    throw error;
  }

  return link;
};

// ------------------- DELETE LINK -------------------
export const deleteLinkService = async (code) => {
  const allLinks = await linkRepository.getAll();
  const link = allLinks.find((x) => x.code === code);

  if (!link) {
    const error = new Error('Link not found');
    error.status = 404;
    throw error;
  }

  // Soft delete: mark deleted = true
  const updated = await linkRepository.update(link._id, { deleted: true });

  return updated;
};

// ------------------- UPDATE CLICKS (Redirect) -------------------
export const updateClicksService = async (code) => {
  const allLinks = await linkRepository.getAll();
  const link = allLinks.find((x) => x.code === code);

  if (!link || link.deleted) {
    const error = new Error('Link not found');
    error.status = 404;
    throw error;
  }

  // Increment clicks atomically
  const updated = await linkRepository.update(link._id, {
    totalClicks: link.totalClicks + 1,
    lastClicked: new Date(),
  });

  return updated;
};
