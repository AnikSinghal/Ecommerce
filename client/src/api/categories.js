/**
 * Categories API
 * All category related API calls
 */

import { apiRequest } from './config';

/**
 * Get all categories
 * GET /categories
 * 
 * Response: {
 *   categories: [
 *     {
 *       id: string,
 *       name: string,
 *       slug: string,
 *       image: string,
 *       color: string,
 *       productCount: number,
 *       description?: string
 *     }
 *   ]
 * }
 */
export const getAllCategories = async () => {
  return apiRequest('/categories');
};

/**
 * Get category by slug
 * GET /categories/:slug
 * 
 * Params: { slug: string }
 * 
 * Response: {
 *   id: string,
 *   name: string,
 *   slug: string,
 *   image: string,
 *   color: string,
 *   description: string,
 *   productCount: number,
 *   featured: boolean
 * }
 */
export const getCategoryBySlug = async (slug) => {
  return apiRequest(`/categories/${slug}`);
};

/**
 * Get featured categories
 * GET /categories/featured
 * 
 * Query: { limit?: number }
 * 
 * Response: {
 *   categories: Category[]
 * }
 */
export const getFeaturedCategories = async (limit = 6) => {
  return apiRequest(`/categories/featured?limit=${limit}`);
};
