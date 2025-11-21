import { z } from 'zod';

// Custom URL validator
const urlValidator = z
  .string()
  .trim()
  .min(1, 'Target URL is required')
  .refine(
    (url) => {
      try {
        const urlObj = new URL(url);
        return urlObj.protocol === 'http:' || urlObj.protocol === 'https:';
      } catch {
        return false;
      }
    },
    { message: 'Invalid URL format. Must be a valid http or https URL' }
  );

// Custom code validator (6-8 alphanumeric characters)
const codeValidator = z
  .string()
  .trim()
  .regex(/^[A-Za-z0-9]{6,8}$/, 'Code must be 6-8 alphanumeric characters');

// Schema for creating a new link
export const createLinkSchema = z.object({
  targetUrl: urlValidator,
  code: codeValidator.optional(),
});

// Schema for getting/deleting a link by code
export const linkCodeParamSchema = z.object({
  code: codeValidator,
});
