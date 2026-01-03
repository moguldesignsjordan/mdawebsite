'use client';

import { useShop } from '../../context/ShopContext';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { FiTrash2, FiLock, FiChevronLeft } from 'react-icons/fi';

export default function CheckoutPage() {
  const { cart, removeFromCart } = useShop();

  const subtotal = cart.reduce((sum, item) => sum + (item.price * (item.quantity || 1)), 0);

  const handleCheckout = async () => {
    try {
      const response = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ items: cart }),
      });

      const data = await response.json();
      
      if (data.error) throw new Error(data.error);

      // REDIRECT LOGIC: Browsers now redirect directly to the URL provided by Stripe
      if (data.url) {
        window.location.href = data.url;
      } else {
        throw new Error("Failed to generate checkout URL.");
      }
    } catch (err) {
      console.error("Checkout Error:", err.message);
      alert("Checkout failed: " + err.message);
    }
  };

  return (
    <div className="pt-24 pb-12 bg-dark min-h-screen text-light font-sans">
      <div className="container mx-auto px-4 max-w-5xl">
        
        <Link href="/shop" className="flex items-center gap-2 text-light/40 hover:text-primary transition-colors mb-8 text-xs font-bold uppercase tracking-widest">
          <FiChevronLeft /> Back to Shop
        </Link>

        <h1 className="text-4xl md:text-6xl font-bold font-heading mb-10 uppercase tracking-tighter">
          Your <span className="text-gradient-gold">Cart</span>
        </h1>
        
        {cart.length === 0 ? (
          <div className="text-center py-20 bg-white/[0.02] rounded-3xl border border-light/5">
            <p className="text-light/30 mb-8 font-medium">Your cart is currently empty.</p>
            <Link href="/shop" className="bg-primary text-black px-10 py-4 rounded-full font-bold uppercase text-[10px] tracking-[0.2em] inline-block hover:scale-105 transition-transform">
              Browse Products
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
            
            {/* ITEM LIST SECTION */}
            <div className="lg:col-span-2 space-y-3">
              <AnimatePresence>
                {cart.map((item, idx) => (
                  <motion.div 
                    layout
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    key={`${item.id}-${idx}`} 
                    className="flex flex-row gap-4 p-4 bg-white/[0.03] border border-light/5 rounded-2xl items-center"
                  >
                    {/* Clean image container - no dark blend */}
                    <div className="w-20 h-20 bg-white rounded-xl overflow-hidden shrink-0 p-2 flex items-center justify-center border border-light/10">
                      <img src={item.image} alt={item.name} className="w-full h-full object-contain" />
                    </div>
                    
                    <div className="flex-grow min-w-0">
                      <h3 className="font-bold text-sm md:text-base truncate">{item.name}</h3>
                      <p className="text-[10px] text-primary font-bold uppercase tracking-wider">{item.variantLabel}</p>
                    </div>

                    <div className="flex flex-col items-end gap-1">
                      <p className="font-bold text-lg text-white">${item.price}</p>
                      <button 
                        onClick={() => removeFromCart(item.id)} 
                        className="p-2 text-light/20 hover:text-red-500 transition-colors"
                      >
                        <FiTrash2 size={16} />
                      </button>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>

            {/* STICKY ORDER SUMMARY */}
            <div className="bg-white/[0.04] border border-light/10 p-6 md:p-8 rounded-3xl sticky bottom-4 lg:top-32 shadow-2xl backdrop-blur-xl">
              <h2 className="text-[10px] uppercase tracking-[0.3em] text-light/40 mb-8 font-bold">Order Summary</h2>
              
              <div className="space-y-4 mb-8">
                <div className="flex justify-between text-sm text-light/60">
                  <span>Subtotal</span>
                  <span className="text-light">${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm text-light/60">
                  <span>Shipping</span>
                  <span className="text-[10px] uppercase font-bold text-primary">Free</span>
                </div>
                <div className="h-px bg-light/5 my-4" />
                <div className="flex justify-between text-2xl font-bold">
                  <span>Total</span>
                  <span className="text-primary">${subtotal.toFixed(2)}</span>
                </div>
              </div>

              <button 
                onClick={handleCheckout} 
                className="w-full bg-primary text-black font-bold py-5 rounded-2xl uppercase tracking-[0.2em] text-[10px] flex items-center justify-center gap-3 hover:brightness-110 active:scale-[0.98] transition-all shadow-lg shadow-primary/20"
              >
                <FiLock /> Checkout with Stripe
              </button>
              
              <p className="text-[9px] text-center text-light/20 uppercase tracking-[0.2em] mt-6">
                SSL Secured Checkout
              </p>
            </div>

          </div>
        )}
      </div>
    </div>
  );
}