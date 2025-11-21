/**
 * Generates a random alphanumeric code of specified length
 * @param {number} length - Length of code to generate (default 6)
 * @returns {string} - Random alphanumeric code
 */
export default function generateCode(length = 6) {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let code = '';

  for (let i = 0; i < length; i++) {
    code += chars.charAt(Math.floor(Math.random() * chars.length));
  }

  return code;
}
