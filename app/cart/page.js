'use client';

import { useShop } from '../../context/ShopContext';
import { motion, AnimatePresence } from 'framer-motion';
import { FiTrash2, FiShoppingBag, FiArrowRight } from 'react-icons/fi';
import Link from 'next/link';

export default function CartPage() {
  const { cart, removeFromCart } = useShop();
  const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  return (
    <div className="pt-32 pb-24 bg-dark min-h-screen text-light">
      <div className="container mx-auto px-4 max-w-5xl">
        <h1 className="text-4xl md:text-6xl font-bold font-heading mb-16">Shopping Bag</h1>

        {cart.length === 0 ? (
          <div className="text-center py-24 card-dark">
            <FiShoppingBag className="mx-auto text-light/10 mb-6" size={80} />
            <p className="text-light/40 mb-8 text-xl">Your bag is currently empty.</p>
            <Link href="/shop" className="btn-primary inline-block">Start Shopping</Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-start">
            <div className="lg:col-span-2 space-y-4">
              <AnimatePresence>
                {cart.map((item) => (
                  <motion.div key={item.id} layout initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex gap-6 p-6 card-dark items-center">
                    <div className="w-24 h-24 bg-light/5 rounded-2xl overflow-hidden shrink-0 border border-light/10">
                      <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                    </div>
                    <div className="flex-grow">
                      <h3 className="font-bold text-xl mb-1">{item.name}</h3>
                      <p className="text-[10px] text-primary uppercase font-bold tracking-widest mb-3">{item.variantLabel}</p>
                      <div className="text-light/60 font-bold">${item.price} x {item.quantity}</div>
                    </div>
                    <button onClick={() => removeFromCart(item.id)} className="p-4 text-light/20 hover:text-red-500 transition-colors">
                      <FiTrash2 size={22} />
                    </button>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>

            <div className="card-dark p-8 sticky top-32">
              <h2 className="text-2xl font-bold mb-8">Summary</h2>
              <div className="space-y-4 mb-8">
                <div className="flex justify-between text-light/50"><span>Subtotal</span><span>${subtotal.toFixed(2)}</span></div>
                <div className="flex justify-between text-light/50 italic text-sm"><span>Shipping</span><span>Calculated next</span></div>
                <div className="pt-6 border-t border-light/10 flex justify-between text-3xl font-bold"><span>Total</span><span className="text-primary">${subtotal.toFixed(2)}</span></div>
              </div>
              <Link href="/checkout" className="btn-primary w-full flex items-center justify-center gap-3">
                Checkout <FiArrowRight />
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}