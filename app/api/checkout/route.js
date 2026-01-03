import Stripe from 'stripe';
import { NextResponse } from 'next/server';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export async function POST(req) {
  try {
    const { items } = await req.json();

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: items.map(item => ({
        price_data: {
          currency: 'usd',
          product_data: {
            name: `${item.name} | ${item.variantLabel}`,
            images: [process.env.NEXT_PUBLIC_URL + item.image],
          },
          unit_amount: item.price * 100,
        },
        quantity: 1,
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
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}