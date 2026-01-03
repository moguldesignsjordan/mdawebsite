'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { client } from '../lib/sanity'; // Use your sanity client

export default function ShopPage() {
  const [filter, setFilter] = useState('all');
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch all products from Sanity
    const query = `*[_type == "product"] {
      name,
      "id": slug.current,
      "image": image.asset->url,
      description,
      basePrice,
      type
    }`;
    
    client.fetch(query).then((data) => {
      setProducts(data);
      setLoading(false);
    });
  }, []);

  const filteredProducts = filter === 'all' 
    ? products 
    : products.filter(p => p.type === filter);

  if (loading) return <div className="pt-40 text-center text-light">Loading Shop...</div>;

  return (
    <div className="pt-32 pb-24 bg-dark min-h-screen text-light">
      <div className="container mx-auto px-4">
        <header className="text-center mb-16">
          <h1 className="text-5xl md:text-7xl font-bold font-heading mb-6">
            The <span className="text-gradient-gold">Mogul</span> Shop
          </h1>
          
          <div className="flex justify-center gap-4">
            {['all', 'digital', 'print'].map((type) => (
              <button
                key={type}
                onClick={() => setFilter(type)}
                className={`px-6 py-2 rounded-full border transition-all uppercase text-xs font-bold tracking-widest ${
                  filter === type 
                  ? 'bg-primary border-primary text-black' 
                  : 'border-light/10 text-light/50 hover:border-primary/50'
                }`}
              >
                {type}
              </button>
            ))}
          </div>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <AnimatePresence mode="popLayout">
            {filteredProducts.map((product) => (
              <Link href={`/shop/${product.id}`} key={product.id}>
                <motion.div 
                  layout
                  className="card-dark p-6 flex flex-col group h-full cursor-pointer"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  <div className="aspect-square bg-light/5 rounded-2xl mb-6 overflow-hidden relative border border-light/5">
                    {/* Added mix-blend-multiply to keep your transparent look */}
                    <img src={product.image} alt={product.name} className="w-full h-full object-contain mix-blend-multiply group-hover:scale-110 transition-transform duration-500" />
                  </div>
                  <h3 className="text-2xl font-bold font-heading mb-2 text-light">{product.name}</h3>
                  <p className="text-primary text-xl font-bold mb-4">
                    From ${product.basePrice}
                  </p>
                  <p className="text-light/50 text-sm mb-6 line-clamp-2">{product.description}</p>
                  <span className="w-full bg-light/5 text-center text-light font-bold py-3 rounded-xl border border-light/10 group-hover:bg-primary group-hover:text-black transition-all mt-auto">
                    View Options
                  </span>
                </motion.div>
              </Link>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}