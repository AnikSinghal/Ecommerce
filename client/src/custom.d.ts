// Auto-declarations to silence missing external module errors during development.
declare module '@radix-ui/*';
declare module 'lucide-react';
declare module 'class-variance-authority';
declare module 'react-day-picker';
declare module 'embla-carousel-react';
declare module 'recharts';
declare module 'cmdk';
declare module 'vaul';
declare module 'clsx';
declare module 'tailwind-merge';

// Allow absolute import alias if tsconfig isn't configured in the environment
declare module '@/lib/*';
declare module '@/components/*';

export {};
