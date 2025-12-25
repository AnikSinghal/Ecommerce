/**
 * Cart API
 * All shopping cart related API calls
 */

import { apiRequest } from './config';

/**
 * Get current user's cart
 * GET /cart
 * 
 * Headers: { Authorization: Bearer <token> }
 * 
 * Response: {
 *   items: [
 *     {
 *       id: string,
 *       productId: string,
 *       name: string,
 *       price: number,
 *       quantity: number,
 *       image: string,
 *       variant?: string
 *     }
 *   ],
 *   subtotal: number,
 *   shipping: number,
 *   tax: number,
 *   total: number,
 *   itemCount: number
 * }
 */
export const getCart = async () => {
  return apiRequest('/cart');
};

/**
 * Add item to cart
 * POST /cart/add
 * 
 * Headers: { Authorization: Bearer <token> }
 * 
 * Payload: {
 *   productId: string,      // Required - Product ID to add
 *   quantity: number,       // Required - Quantity to add (default: 1)
 *   variant?: string        // Optional - Size/variant selection
 * }
 * 
 * Response: {
 *   success: boolean,
 *   message: string,
 *   cart: CartObject
 * }
 */
export const addToCart = async (productId, quantity = 1, variant = null) => {
  return apiRequest('/cart/add', {
    method: 'POST',
    body: JSON.stringify({
      productId,
      quantity,
      ...(variant && { variant }),
    }),
  });
};

/**
 * Update cart item quantity
 * PUT /cart/update/:itemId
 * 
 * Headers: { Authorization: Bearer <token> }
 * 
 * Payload: {
 *   quantity: number        // Required - New quantity (0 to remove)
 * }
 * 
 * Response: {
 *   success: boolean,
 *   message: string,
 *   cart: CartObject
 * }
 */
export const updateCartItem = async (itemId, quantity) => {
  return apiRequest(`/cart/update/${itemId}`, {
    method: 'PUT',
    body: JSON.stringify({ quantity }),
  });
};

/**
 * Remove item from cart
 * DELETE /cart/remove/:itemId
 * 
 * Headers: { Authorization: Bearer <token> }
 * 
 * Response: {
 *   success: boolean,
 *   message: string,
 *   cart: CartObject
 * }
 */
export const removeFromCart = async (itemId) => {
  return apiRequest(`/cart/remove/${itemId}`, {
    method: 'DELETE',
  });
};

/**
 * Clear entire cart
 * DELETE /cart/clear
 * 
 * Headers: { Authorization: Bearer <token> }
 * 
 * Response: {
 *   success: boolean,
 *   message: string
 * }
 */
export const clearCart = async () => {
  return apiRequest('/cart/clear', {
    method: 'DELETE',
  });
};

/**
 * Apply coupon code
 * POST /cart/coupon
 * 
 * Headers: { Authorization: Bearer <token> }
 * 
 * Payload: {
 *   code: string            // Required - Coupon code to apply
 * }
 * 
 * Response: {
 *   success: boolean,
 *   message: string,
 *   discount: number,
 *   cart: CartObject
 * }
 */
export const applyCoupon = async (code) => {
  return apiRequest('/cart/coupon', {
    method: 'POST',
    body: JSON.stringify({ code }),
  });
};
