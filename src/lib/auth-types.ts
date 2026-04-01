export type Plan = 'free' | 'starter' | 'pro' | 'business' | 'enterprise';

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  plan: Plan;
  stripeCustomerId?: string;
  stripeSubscriptionId?: string;
  createdAt: string;
}

export interface PlanConfig {
  id: Plan;
  name: string;
  price: string;
  priceMonthly: number;
  priceYearly?: string;
  target: string;
  features: string[];
  recommended?: boolean;
  cta: string;
  stripePriceEnvKey?: string;
}

export const PLANS: PlanConfig[] = [
  {
    id: 'free',
    name: 'Free',
    price: '¥0',
    priceMonthly: 0,
    target: 'お試し',
    features: [
      'ダッシュボード閲覧',
      'KPI表示（3ヶ月分）',
      'データ件数 100件まで',
    ],
    cta: '無料で始める',
  },
  {
    id: 'starter',
    name: 'Starter',
    price: '¥1,980',
    priceMonthly: 1980,
    priceYearly: '¥1,580/月',
    target: '個人事業主（副業・フリーランス）',
    features: [
      'ダッシュボード全機能',
      'KPI表示（6ヶ月分）',
      'データ件数 1,000件まで',
      'AI改善提案',
      'CSVエクスポート',
    ],
    cta: 'Starterを始める',
    stripePriceEnvKey: 'STRIPE_PRICE_STARTER',
  },
  {
    id: 'pro',
    name: 'Pro',
    price: '¥4,980',
    priceMonthly: 4980,
    priceYearly: '¥3,980/月',
    target: '個人事業主（本業）',
    features: [
      'Starter全機能',
      'KPI表示（12ヶ月分）',
      'データ件数 無制限',
      'AI改善提案（優先分析）',
      'アラート通知',
      'レポート自動生成',
    ],
    recommended: true,
    cta: 'Proを始める',
    stripePriceEnvKey: 'STRIPE_PRICE_PRO',
  },
  {
    id: 'business',
    name: 'Business',
    price: '¥14,800',
    priceMonthly: 14800,
    priceYearly: '¥11,800/月',
    target: '法人（中小企業〜30名）',
    features: [
      'Pro全機能',
      'チームメンバー 5名まで',
      'API連携（Stripe / freee）',
      'AI改善提案（チーム共有）',
      'カスタムレポート',
      'メールサポート',
    ],
    cta: 'Businessを始める',
    stripePriceEnvKey: 'STRIPE_PRICE_BUSINESS',
  },
  {
    id: 'enterprise',
    name: 'Enterprise',
    price: '¥49,800',
    priceMonthly: 49800,
    priceYearly: '¥39,800/月',
    target: '法人（中堅〜大企業）',
    features: [
      'Business全機能',
      'チームメンバー 無制限',
      '全API連携（Google Ads含む）',
      'AI改善提案（専用モデル）',
      '専任サポート',
      'SLA保証（99.9%）',
    ],
    cta: 'Enterpriseを始める',
    stripePriceEnvKey: 'STRIPE_PRICE_ENTERPRISE',
  },
];
