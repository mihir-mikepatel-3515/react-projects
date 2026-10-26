// src/data/stripeData.js

export const SUBMENU_LINKS = [
  {
    page: 'products',
    links: [
      { label: 'payment', icon: '💳', url: '/products' },
      { label: 'terminal', icon: '💻', url: '/products' },
      { label: 'connect', icon: '🔗', url: '/products' },
    ],
  },
  {
    page: 'developers',
    links: [
      { label: 'plugins', icon: '🔌', url: '/developers' },
      { label: 'libraries', icon: '📚', url: '/developers' },
      { label: 'help', icon: '❓', url: '/developers' },
      { label: 'billing', icon: '🧾', url: '/developers' },
    ],
  },
  {
    page: 'company',
    links: [
      { label: 'about', icon: '🏢', url: '/company' },
      { label: 'customers', icon: '👥', url: '/company' },
    ],
  },
];