/**
 * Products API
 * All product-related API calls
 */

import { apiRequest } from './config';

/**
 * Get all products
 * GET /products
 * 
 * Response: {
 *   products: [
 *     {
 *       id: string,
 *       name: string,
 *       description: string,
 *       price: number,
 *       originalPrice?: number,
 *       rating: number,
 *       reviewCount: number,
 *       image: string,
 *       category: string,
 *       badge?: string ('Best Seller' | 'New' | 'On Sale'),
 *       inStock: boolean,
 *       variants?: [{ size: string, price: number }]
 *     }
 *   ],
 *   total: number
 * }
 */
export const getAllProducts = async (params = {}) => {
  const queryString = new URLSearchParams(params).toString();
  return apiRequest(`/products${queryString ? `?${queryString}` : ''}`);
};

/**
 * Get product by ID
 * GET /products/:id
 * 
 * Params: { id: string }
 * 
 * Response: {
 *   id: string,
 *   name: string,
 *   description: string,
 *   longDescription: string,
 *   price: number,
 *   originalPrice?: number,
 *   rating: number,
 *   reviewCount: number,
 *   images: string[],
 *   category: string,
 *   badge?: string,
 *   inStock: boolean,
 *   variants: [{ size: string, price: number }],
 *   nutritionInfo: object,
 *   ingredients: string[]
 * }
 */
export const getProductById = async (id) => {
  return apiRequest(`/products/${id}`);
};

/**
 * Get products by category
 * GET /products/category/:categorySlug
 * 
 * Params: { categorySlug: string }
 * Query: { page?: number, limit?: number, sort?: string }
 * 
 * Response: {
 *   products: Product[],
 *   total: number,
 *   page: number,
 *   totalPages: number
 * }
 */
export const getProductsByCategory = async (categorySlug, params = {}) => {
  const queryString = new URLSearchParams(params).toString();
  return apiRequest(`/products/category/${categorySlug}${queryString ? `?${queryString}` : ''}`);
};

/**
 * Get best seller products
 * GET /products/best-sellers
 * 
 * Query: { limit?: number }
 * 
 * Response: { products: Product[] }
 */
export const getBestSellers = async (limit = 6) => {
  return apiRequest(`/products/best-sellers?limit=${limit}`);
};

/**
 * Search products
 * GET /products/search
 * 
 * Query: { q: string, page?: number, limit?: number }
 * 
 * Response: {
 *   products: Product[],
 *   total: number,
 *   query: string
 * }
 */
export const searchProducts = async (query, params = {}) => {
  const queryString = new URLSearchParams({ q: query, ...params }).toString();
  return apiRequest(`/products/search?${queryString}`);
};
