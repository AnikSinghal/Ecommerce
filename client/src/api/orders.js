/**
 * Orders API
 * All order related API calls
 */

import { apiRequest } from './config';

/**
 * Create new order
 * POST /orders
 * 
 * Headers: { Authorization: Bearer <token> }
 * 
 * Payload: {
 *   shippingAddress: {
 *     firstName: string,
 *     lastName: string,
 *     address1: string,
 *     address2?: string,
 *     city: string,
 *     state: string,
 *     zipCode: string,
 *     country: string,
 *     phone: string
 *   },
 *   billingAddress?: {      // Optional - defaults to shipping address
 *     firstName: string,
 *     lastName: string,
 *     address1: string,
 *     address2?: string,
 *     city: string,
 *     state: string,
 *     zipCode: string,
 *     country: string
 *   },
 *   paymentMethod: string,  // 'card' | 'upi' | 'cod' | 'netbanking'
 *   paymentDetails?: {      // Required for card/upi payments
 *     cardToken?: string,
 *     upiId?: string
 *   },
 *   notes?: string          // Optional order notes
 * }
 * 
 * Response: {
 *   success: boolean,
 *   message: string,
 *   order: {
 *     id: string,
 *     orderNumber: string,
 *     status: string,
 *     items: OrderItem[],
 *     subtotal: number,
 *     shipping: number,
 *     tax: number,
 *     total: number,
 *     createdAt: string
 *   }
 * }
 */
export const createOrder = async (orderData) => {
  return apiRequest('/orders', {
    method: 'POST',
    body: JSON.stringify(orderData),
  });
};

/**
 * Get all orders for current user
 * GET /orders
 * 
 * Headers: { Authorization: Bearer <token> }
 * 
 * Query: {
 *   page?: number,
 *   limit?: number,
 *   status?: string         // 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled'
 * }
 * 
 * Response: {
 *   orders: Order[],
 *   total: number,
 *   page: number,
 *   totalPages: number
 * }
 */
export const getOrders = async (params = {}) => {
  const queryString = new URLSearchParams(params).toString();
  return apiRequest(`/orders${queryString ? `?${queryString}` : ''}`);
};

/**
 * Get order by ID
 * GET /orders/:id
 * 
 * Headers: { Authorization: Bearer <token> }
 * 
 * Response: {
 *   id: string,
 *   orderNumber: string,
 *   status: string,
 *   items: [
 *     {
 *       productId: string,
 *       name: string,
 *       price: number,
 *       quantity: number,
 *       image: string
 *     }
 *   ],
 *   shippingAddress: Address,
 *   billingAddress: Address,
 *   subtotal: number,
 *   shipping: number,
 *   tax: number,
 *   discount: number,
 *   total: number,
 *   paymentMethod: string,
 *   paymentStatus: string,
 *   trackingNumber?: string,
 *   estimatedDelivery?: string,
 *   createdAt: string,
 *   updatedAt: string
 * }
 */
export const getOrderById = async (orderId) => {
  return apiRequest(`/orders/${orderId}`);
};

/**
 * Cancel order
 * POST /orders/:id/cancel
 * 
 * Headers: { Authorization: Bearer <token> }
 * 
 * Payload: {
 *   reason?: string         // Optional cancellation reason
 * }
 * 
 * Response: {
 *   success: boolean,
 *   message: string,
 *   order: Order
 * }
 */
export const cancelOrder = async (orderId, reason = '') => {
  return apiRequest(`/orders/${orderId}/cancel`, {
    method: 'POST',
    body: JSON.stringify({ reason }),
  });
};

/**
 * Track order
 * GET /orders/:id/track
 * 
 * Response: {
 *   orderNumber: string,
 *   status: string,
 *   trackingNumber?: string,
 *   carrier?: string,
 *   trackingUrl?: string,
 *   timeline: [
 *     {
 *       status: string,
 *       description: string,
 *       timestamp: string,
 *       location?: string
 *     }
 *   ]
 * }
 */
export const trackOrder = async (orderId) => {
  return apiRequest(`/orders/${orderId}/track`);
};
