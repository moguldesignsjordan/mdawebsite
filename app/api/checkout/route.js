import Stripe from 'stripe';
import { NextResponse } from 'next/server';

// Fallback to empty string prevents build-time crash
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || '', {
  apiVersion: '2023-10-16',
});

export async function POST(req) {
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
            images: [item.image.startsWith('http') ? item.image : `${process.env.NEXT_PUBLIC_URL}${item.image}`],
          },
          unit_amount: Math.round(item.price * 100), // Stripe expects cents
        },
        quantity: item.quantity || 1,
      })),
      mode: 'payment',
      shipping_address_collection: items.some(i => i.type === 'print') 
        ? { allowed_countries: ['US', 'CA'] } 
        : undefined,
      success_url: `${process.env.NEXT_PUBLIC_URL}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.NEXT_PUBLIC_URL}/checkout`,
    });

    return NextResponse.json({ id: session.id });
  } catch (err) {
    console.error('Stripe Error:', err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}