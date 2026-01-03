// app/checkout/page.js
'use client';

import { useShop } from '../../context/ShopContext';
import { motion } from 'framer-motion';
import { loadStripe } from '@stripe/stripe-js';

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY);

export default function CheckoutPage() {
  const { cart, removeFromCart, clearCart } = useShop();

  const subtotal = cart.reduce((sum, item) => sum + item.price, 0);

  const handleCheckout = async () => {
    const stripe = await stripePromise;
    const response = await fetch('/api/checkout', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ items: cart }),
    });

    const session = await response.json();
    await stripe.redirectToCheckout({ sessionId: session.id });
  };

  return (
    <div className="pt-32 pb-24 bg-dark min-h-screen text-light">
      <div className="container mx-auto px-4 max-w-4xl">
        <h1 className="text-4xl font-bold font-heading mb-12">Your Cart</h1>
        
        {cart.length === 0 ? (
          <div className="text-center py-20 bg-light/5 rounded-3xl border border-light/10">
            <p className="text-light/50 mb-8">Your cart is empty.</p>
            <a href="/shop" className="btn-primary inline-block">Back to Shop</a>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            <div className="lg:col-span-2 space-y-6">
              {cart.map((item) => (
                <div key={item.id} className="flex gap-6 p-6 card-dark items-center">
                  <div className="w-20 h-20 bg-light/5 rounded-xl overflow-hidden shrink-0">
                    <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                  </div>
                  <div className="flex-grow">
                    <h3 className="font-bold">{item.name}</h3>
                    <p className="text-xs text-light/50">{item.variantLabel}</p>
                  </div>
                  <p className="font-bold text-primary">${item.price}</p>
                  <button onClick={() => removeFromCart(item.id)} className="text-light/30 hover:text-red-500 transition-colors">×</button>
                </div>
              ))}
            </div>

            <div className="card-dark p-8 h-fit space-y-6">
              <div className="flex justify-between text-xl font-bold">
                <span>Total</span>
                <span className="text-primary">${subtotal}</span>
              </div>
              <button onClick={handleCheckout} className="btn-primary w-full">Pay Securely with Stripe</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}