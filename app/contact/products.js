// config/products.js
export const products = [
  // DIGITAL PRODUCT
  { 
    id: 'dig-audit', 
    name: 'Design Audit', 
    price: 499, 
    type: 'digital',
    description: 'A comprehensive review of your brand and website design.',
    image: '/images/shop/audit.jpg'
  },
  // PRINT PRODUCT WITH VARIATIONS
  { 
    id: 'prnt-poster', 
    name: 'Agency Poster', 
    basePrice: 45, 
    type: 'print',
    description: 'Premium heavy-stock poster for your workspace.',
    image: '/images/shop/poster.jpg',
    variations: {
      sizes: [
        { label: '18x24', priceModifier: 0 },
        { label: '24x36', priceModifier: 20 },
      ],
      finishes: [
        { label: 'Matte', priceModifier: 0 },
        { label: 'Gloss', priceModifier: 5 },
      ]
    }
  }
];