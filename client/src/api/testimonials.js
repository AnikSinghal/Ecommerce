/**
 * Testimonials API
 * Customer testimonials/reviews API calls
 */

import { apiRequest } from './config';

/**
 * Get all testimonials
 * GET /testimonials
 * 
 * Query: {
 *   limit?: number,
 *   featured?: boolean      // Get only featured testimonials
 * }
 * 
 * Response: {
 *   testimonials: [
 *     {
 *       id: string,
 *       name: string,
 *       location: string,
 *       avatar: string,
 *       rating: number,
 *       text: string,
 *       featured: boolean,
 *       createdAt: string
 *     }
 *   ]
 * }
 */
export const getTestimonials = async (params = {}) => {
  const queryString = new URLSearchParams(params).toString();
  return apiRequest(`/testimonials${queryString ? `?${queryString}` : ''}`);
};

/**
 * Submit a testimonial/review
 * POST /testimonials
 * 
 * Headers: { Authorization: Bearer <token> }
 * 
 * Payload: {
 *   rating: number,         // Required - Rating 1-5
 *   text: string,           // Required - Review text
 *   productId?: string      // Optional - Associated product
 * }
 * 
 * Response: {
 *   success: boolean,
 *   message: string,
 *   testimonial: Testimonial
 * }
 */
export const submitTestimonial = async (testimonialData) => {
  return apiRequest('/testimonials', {
    method: 'POST',
    body: JSON.stringify(testimonialData),
  });
};
