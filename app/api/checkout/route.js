import Stripe from 'stripe';
import { NextResponse } from 'next/server';

// Initialize Stripe with your secret key
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || '', {
  apiVersion: '2023-10-16',
});

export async function POST(req) {
  // Guard clause for missing environment variables
  if (!process.env.STRIPE_SECRET_KEY) {
    return NextResponse.json({ error: 'Stripe key not configured' }, { status: 500 });
  }

  try {
    const { items } = await req.json();

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: items.map(item => ({
        price_data: {
          currency: 'usd',
          product_data: {
            name: `${item.name}${item.variantLabel ? ` | ${item.variantLabel}` : ''}`,
            // Ensure images use absolute URLs for Stripe to display them
            images: [item.image.startsWith('http') ? item.image : `${process.env.NEXT_PUBLIC_URL}${item.image}`],
          },
          // Stripe expects integer cents ($20.00 -> 2000)
          unit_amount: Math.round(item.price * 100), 
        },
        quantity: item.quantity || 1,
      })),
      mode: 'payment',
      shipping_address_collection: items.some(i => i.type === 'print') 
        ? { allowed_countries: ['US', 'CA'] } 
        : undefined,
      // Stripe will redirect users here after payment is finalized
      success_url: `${process.env.NEXT_PUBLIC_URL}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.NEXT_PUBLIC_URL}/checkout`,
    });

    // CRITICAL: Return the full session URL for the 2026 redirect standard
    return NextResponse.json({ url: session.url });
  } catch (err) {
    console.error('Stripe Error:', err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}