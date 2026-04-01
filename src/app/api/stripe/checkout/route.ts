import { NextResponse } from 'next/server';
import { auth } from '@/lib/auth';
import { stripe } from '@/lib/stripe';
import { PLANS } from '@/lib/auth-types';

export async function POST(req: Request) {
  const session = await auth();
  if (!session?.user?.email) {
    return NextResponse.json({ error: 'ログインが必要です' }, { status: 401 });
  }

  const { planId } = await req.json();
  const plan = PLANS.find((p) => p.id === planId);

  const stripePriceId = plan?.stripePriceEnvKey
    ? process.env[plan.stripePriceEnvKey]
    : undefined;

  if (!plan || !stripePriceId) {
    return NextResponse.json({ error: '無効なプランです' }, { status: 400 });
  }

  try {
    const checkoutSession = await stripe.checkout.sessions.create({
      mode: 'subscription',
      payment_method_types: ['card'],
      customer_email: session.user.email,
      line_items: [
        {
          price: stripePriceId,
          quantity: 1,
        },
      ],
      subscription_data: {
        trial_period_days: 7,
      },
      success_url: `${process.env.NEXT_PUBLIC_APP_URL}/?upgraded=true`,
      cancel_url: `${process.env.NEXT_PUBLIC_APP_URL}/pricing`,
      metadata: {
        userId: (session.user as { id?: string }).id ?? '',
        planId: plan.id,
      },
    });

    return NextResponse.json({ url: checkoutSession.url });
  } catch (error) {
    console.error('Stripe checkout error:', error);
    return NextResponse.json({ error: '決済セッションの作成に失敗しました' }, { status: 500 });
  }
}
