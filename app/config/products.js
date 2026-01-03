
// app/config/products.js
export const products = [
  { 
    id: 'business-cards', 
    name: 'Standard Business Cards', 
    type: 'print',
    basePrice: 20, 
    description: 'Printed on superior uncoated stock, standard business cards are available in a wide variety of specs, sizes, and quantities with optional UV coating.',
    image: '/business-cards.jpg',
    variations: {
      quantities: [
        { label: '100', price: 20 },
        { label: '250', price: 25 },
        { label: '500', price: 30 },
        { label: '1000', price: 50 },
        { label: '2500', price: 60 }
      ],
      finishes: [
        { label: 'Uncoated', priceModifier: 0 },
        { label: 'UV Coating', priceModifier: 10 },
        { label: 'Spot UV', priceModifier: 40 }
      ],
      turnaround: [
        { label: 'Standard (2-4 Days)', priceModifier: 0 },
        { label: 'Rush (Next Day)', priceModifier: 35 }
      ],
      designService: [
        { label: 'I have my own design', priceModifier: 0 },
        { label: 'Yes, I need a design', priceModifier: 15 }
      ]
    }
  }, 
  { 
    id: 'flyers', 
    name: 'Marketing Flyers', 
    type: 'print',
    basePrice: 50, 
    description: 'Vibrant full-color flyers on premium paper.',
    image: '/flyers.jpg',
    variations: {
      quantities: [
        { label: '50', price: 50 },
        { label: '100', price: 80 }
      ],
      sizes: [
        { label: '8.5" x 11"', priceModifier: 0 },
        { label: '5.5" x 8.5"', priceModifier: -10 }
      ],
      finishes: [
        { label: 'Standard', priceModifier: 0 },
        { label: 'UV Coating', priceModifier: 15 }
      ]
    }
  }
];