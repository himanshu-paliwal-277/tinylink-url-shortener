/**
 * Validates if a given string is a valid URL
 * @param {string} url - The URL to validate
 * @returns {boolean} - True if valid, false otherwise
 */
export default function validateUrl(url) {
  try {
    const urlObj = new URL(url);
    // Must be http or https
    return urlObj.protocol === 'http:' || urlObj.protocol === 'https:';
  } catch {
    return false;
  }
}
