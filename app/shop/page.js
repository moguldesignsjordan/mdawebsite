'use client';

import { useShop } from '../../context/ShopContext';
import { motion } from 'framer-motion';

const products = [
  { id: 1, name: 'Design Audit', price: 499, description: 'A comprehensive review of your brand and website design.' },
  { id: 2, name: 'Automation Strategy', price: 299, description: 'Planning session to identify automation opportunities.' },
  { id: 3, name: 'Agency Webflow Template', price: 79, description: 'A premium, responsive Webflow template for agencies.' },
  { id: 4, name: 'Social Media Kit', price: 149, description: '50+ Templates for Instagram, LinkedIn, and Twitter.' },
];

export default function ShopPage() {
  const { addToCart } = useShop();

  return (
    <div className="pt-32 pb-24 bg-dark min-h-screen text-white">
      <div className="container mx-auto px-4">
        <h1 className="text-5xl font-bold font-heading mb-12 text-center">Digital Products</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {products.map((product, index) => (
            <motion.div 
              key={product.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-[#111] p-6 rounded-3xl border border-white/10 hover:border-primary/50 transition-colors flex flex-col"
            >
              <div className="h-40 bg-gray-800 rounded-xl mb-6 flex items-center justify-center text-gray-500">
                {/* Placeholder for Product Image */}
                Product Image
              </div>
              <h3 className="text-2xl font-bold font-heading mb-2">{product.name}</h3>
              <p className="text-primary text-xl font-bold mb-4">${product.price}</p>
              <p className="text-gray-400 text-sm mb-6 flex-grow">{product.description}</p>
              
              <button
                onClick={() => addToCart(product)}
                className="w-full bg-white text-black hover:bg-primary font-bold py-3 px-6 rounded-full transition-colors"
              >
                Add to Cart
              </button>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}