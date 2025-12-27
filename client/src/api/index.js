/**
 * API Index
 * Central export for all API modules
 */

// Configuration
export { API_BASE_URL, getHeaders, apiRequest } from './config';

// Authentication
export {
  register,
  login,
  logout,
//   getCurrentUser,
//   updateProfile,
//   forgotPassword,
//   resetPassword,
  isAuthenticated,
} from './auth';

// Products
export {
  getAllProducts,
  getProductById,
  getProductsByCategory,
  getBestSellers,
  searchProducts,
} from './products';

// Categories
export {
  getAllCategories,
  getCategoryBySlug,
  getFeaturedCategories,
} from './categories';

// Cart
export {
  getCart,
  addToCart,
  updateCartItem,
  removeFromCart,
  clearCart,
  applyCoupon,
} from './cart';

// Orders
export {
  createOrder,
  getOrders,
  getOrderById,
  cancelOrder,
  trackOrder,
} from './orders';

// Newsletter
export {
  subscribeNewsletter,
  unsubscribeNewsletter,
} from './newsletter';

// Testimonials
export {
  getTestimonials,
  submitTestimonial,
} from './testimonials';

// Contact
export {
  submitContactForm,
  getFAQs,
} from './contact';
