import { NextResponse } from 'next/server';
import { stripe } from '@/lib/stripe';
import { updateUserPlan } from '@/lib/mock-users';
import type { Plan } from '@/lib/auth-types';

export async function POST(req: Request) {
  const body = await req.text();
  const sig = req.headers.get('stripe-signature');

  if (!sig || !process.env.STRIPE_WEBHOOK_SECRET) {
    return NextResponse.json({ error: 'Missing signature' }, { status: 400 });
  }

  let event;
  try {
    event = stripe.webhooks.constructEvent(body, sig, process.env.STRIPE_WEBHOOK_SECRET);
  } catch (err) {
    console.error('Webhook signature verification failed:', err);
    return NextResponse.json({ error: 'Invalid signature' }, { status: 400 });
  }

  switch (event.type) {
    case 'checkout.session.completed': {
      const session = event.data.object;
      const email = session.customer_email;
      const planId = session.metadata?.planId as Plan | undefined;
      if (email && planId) {
        updateUserPlan(
          email,
          planId,
          session.customer as string,
          session.subscription as string
        );
      }
      break;
    }
    case 'customer.subscription.deleted': {
      const subscription = event.data.object;
      const customer = await stripe.customers.retrieve(subscription.customer as string);
      if ('email' in customer && customer.email) {
        updateUserPlan(customer.email, 'free');
      }
      break;
    }
  }

  return NextResponse.json({ received: true });
}
