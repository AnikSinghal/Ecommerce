/**
 * Contact API
 * Contact form and support related API calls
 */

import { apiRequest } from './config';

/**
 * Submit contact form
 * POST /contact
 * 
 * Payload: {
 *   name: string,           // Required - Sender's name
 *   email: string,          // Required - Sender's email
 *   phone?: string,         // Optional - Phone number
 *   subject: string,        // Required - Message subject
 *   message: string         // Required - Message content
 * }
 * 
 * Response: {
 *   success: boolean,
 *   message: string,
 *   ticketId?: string       // Support ticket ID if applicable
 * }
 */
export const submitContactForm = async (formData) => {
  return apiRequest('/contact', {
    method: 'POST',
    body: JSON.stringify(formData),
  });
};

/**
 * Get FAQ list
 * GET /contact/faq
 * 
 * Query: { category?: string }
 * 
 * Response: {
 *   faqs: [
 *     {
 *       id: string,
 *       question: string,
 *       answer: string,
 *       category: string
 *     }
 *   ]
 * }
 */
export const getFAQs = async (category = null) => {
  const queryString = category ? `?category=${category}` : '';
  return apiRequest(`/contact/faq${queryString}`);
};
