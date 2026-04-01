import type { Plan } from './auth-types';

export interface Coupon {
  code: string;
  type: 'forever_free' | 'discount_percent' | 'discount_fixed' | 'upgrade';
  /** forever_free: 永久無料で指定プランを付与 */
  /** discount_percent: 月額から割引（%） */
  /** discount_fixed: 月額から固定額割引（円） */
  /** upgrade: 指定プランへ即アップグレード（期間限定） */
  grantPlan?: Plan;
  discountPercent?: number;
  discountFixed?: number;
  durationMonths?: number; // null = 永久
  description: string;
  maxUses?: number;
  usedCount: number;
  active: boolean;
}

// 開発用クーポンマスタ — 本番ではDBに格納
const coupons: Map<string, Coupon> = new Map([
  [
    'BLACKZERO-VIP',
    {
      code: 'BLACKZERO-VIP',
      type: 'forever_free',
      grantPlan: 'enterprise',
      description: 'Enterprise永久無料',
      usedCount: 0,
      active: true,
    },
  ],
  [
    'LAUNCH50',
    {
      code: 'LAUNCH50',
      type: 'discount_percent',
      discountPercent: 50,
      description: '全プラン50%OFF（初年度）',
      durationMonths: 12,
      usedCount: 0,
      maxUses: 100,
      active: true,
    },
  ],
  [
    'FRIEND30',
    {
      code: 'FRIEND30',
      type: 'discount_percent',
      discountPercent: 30,
      description: '紹介割引30%OFF（永久）',
      usedCount: 0,
      active: true,
    },
  ],
  [
    'PRO-FREE',
    {
      code: 'PRO-FREE',
      type: 'forever_free',
      grantPlan: 'pro',
      description: 'Pro永久無料',
      maxUses: 50,
      usedCount: 0,
      active: true,
    },
  ],
  [
    'BIZ2000OFF',
    {
      code: 'BIZ2000OFF',
      type: 'discount_fixed',
      discountFixed: 2000,
      description: '毎月¥2,000 OFF（永久）',
      usedCount: 0,
      active: true,
    },
  ],
  [
    'TRIAL-BIZ',
    {
      code: 'TRIAL-BIZ',
      type: 'upgrade',
      grantPlan: 'business',
      durationMonths: 3,
      description: 'Business 3ヶ月無料体験',
      maxUses: 200,
      usedCount: 0,
      active: true,
    },
  ],
]);

export interface CouponResult {
  valid: boolean;
  coupon?: Coupon;
  error?: string;
  appliedPrice?: string;
  appliedPlan?: Plan;
  benefit?: string;
}

export function validateCoupon(code: string, targetPlanId?: Plan): CouponResult {
  const normalized = code.trim().toUpperCase();
  const coupon = coupons.get(normalized);

  if (!coupon) {
    return { valid: false, error: '無効なクーポンコードです' };
  }

  if (!coupon.active) {
    return { valid: false, error: 'このクーポンは現在無効です' };
  }

  if (coupon.maxUses && coupon.usedCount >= coupon.maxUses) {
    return { valid: false, error: 'このクーポンは利用上限に達しました' };
  }

  switch (coupon.type) {
    case 'forever_free':
      return {
        valid: true,
        coupon,
        appliedPlan: coupon.grantPlan,
        benefit: `${coupon.grantPlan === 'enterprise' ? 'Enterprise' : coupon.grantPlan === 'pro' ? 'Pro' : coupon.grantPlan === 'business' ? 'Business' : 'Starter'}プランが永久無料`,
      };

    case 'discount_percent':
      return {
        valid: true,
        coupon,
        benefit: `${coupon.discountPercent}%OFF${coupon.durationMonths ? `（${coupon.durationMonths}ヶ月間）` : '（永久）'}`,
      };

    case 'discount_fixed':
      return {
        valid: true,
        coupon,
        benefit: `毎月¥${coupon.discountFixed?.toLocaleString()} OFF${coupon.durationMonths ? `（${coupon.durationMonths}ヶ月間）` : '（永久）'}`,
      };

    case 'upgrade':
      return {
        valid: true,
        coupon,
        appliedPlan: coupon.grantPlan,
        benefit: `${coupon.grantPlan === 'business' ? 'Business' : coupon.grantPlan === 'enterprise' ? 'Enterprise' : 'Pro'}プラン ${coupon.durationMonths}ヶ月無料体験`,
      };

    default:
      return { valid: false, error: '不明なクーポンタイプです' };
  }
}

export function redeemCoupon(code: string): boolean {
  const normalized = code.trim().toUpperCase();
  const coupon = coupons.get(normalized);
  if (!coupon) return false;
  coupon.usedCount++;
  return true;
}
