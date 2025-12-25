/**
 * Newsletter API
 * Newsletter subscription related API calls
 */

import { apiRequest } from './config';

/**
 * Subscribe to newsletter
 * POST /newsletter/subscribe
 * 
 * Payload: {
 *   email: string           // Required - Email address to subscribe
 * }
 * 
 * Response: {
 *   success: boolean,
 *   message: string
 * }
 */
export const subscribeNewsletter = async (email) => {
  return apiRequest('/newsletter/subscribe', {
    method: 'POST',
    body: JSON.stringify({ email }),
  });
};

/**
 * Unsubscribe from newsletter
 * POST /newsletter/unsubscribe
 * 
 * Payload: {
 *   email: string,          // Required - Email address
 *   token?: string          // Optional - Unsubscribe token from email
 * }
 * 
 * Response: {
 *   success: boolean,
 *   message: string
 * }
 */
export const unsubscribeNewsletter = async (email, token = null) => {
  return apiRequest('/newsletter/unsubscribe', {
    method: 'POST',
    body: JSON.stringify({ email, ...(token && { token }) }),
  });
};
