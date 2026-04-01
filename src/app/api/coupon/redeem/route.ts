import { NextResponse } from 'next/server';
import { auth } from '@/lib/auth';
import { validateCoupon, redeemCoupon } from '@/lib/coupons';
import { updateUserPlan } from '@/lib/mock-users';

export async function POST(req: Request) {
  const session = await auth();
  if (!session?.user?.email) {
    return NextResponse.json({ error: 'ログインが必要です' }, { status: 401 });
  }

  const { code } = await req.json();
  if (!code || typeof code !== 'string') {
    return NextResponse.json({ error: 'クーポンコードを入力してください' }, { status: 400 });
  }

  const result = validateCoupon(code);
  if (!result.valid || !result.coupon) {
    return NextResponse.json({ error: result.error || '無効なクーポンです' }, { status: 400 });
  }

  const coupon = result.coupon;

  // クーポン使用カウントを加算
  redeemCoupon(code);

  // forever_free / upgrade の場合はプランを即時変更
  if (
    (coupon.type === 'forever_free' || coupon.type === 'upgrade') &&
    coupon.grantPlan
  ) {
    updateUserPlan(session.user.email, coupon.grantPlan);
    return NextResponse.json({
      success: true,
      message: `${result.benefit}が適用されました`,
      newPlan: coupon.grantPlan,
    });
  }

  // discount の場合は Stripe Checkout にクーポンを渡す（本番実装時）
  return NextResponse.json({
    success: true,
    message: `${result.benefit}が適用されます。プラン選択時に割引が反映されます。`,
    discount: {
      type: coupon.type,
      percent: coupon.discountPercent,
      fixed: coupon.discountFixed,
      duration: coupon.durationMonths,
    },
  });
}
