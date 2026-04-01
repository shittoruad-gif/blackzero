import { UserProfile } from './auth-types';

// 開発用のインメモリユーザーストア
// 本番ではDBに置き換える
const users: Map<string, UserProfile & { password: string }> = new Map();

// デモ用の初期ユーザー
users.set('demo@blackzero.jp', {
  id: 'user_demo',
  name: 'デモユーザー',
  email: 'demo@blackzero.jp',
  password: 'demo1234',
  plan: 'pro',
  createdAt: '2026-01-15T00:00:00Z',
});

export function findUserByEmail(email: string) {
  return users.get(email) ?? null;
}

export function createUser(name: string, email: string, password: string): UserProfile {
  const id = `user_${Date.now()}`;
  const user: UserProfile & { password: string } = {
    id,
    name,
    email,
    password,
    plan: 'free',
    createdAt: new Date().toISOString(),
  };
  users.set(email, user);
  return { id, name, email, plan: 'free', createdAt: user.createdAt };
}

export function verifyPassword(stored: string, input: string): boolean {
  // 開発用: 平文比較。本番ではbcryptを使用
  return stored === input;
}

export function updateUserPlan(email: string, plan: UserProfile['plan'], stripeCustomerId?: string, stripeSubscriptionId?: string) {
  const user = users.get(email);
  if (user) {
    user.plan = plan;
    if (stripeCustomerId) user.stripeCustomerId = stripeCustomerId;
    if (stripeSubscriptionId) user.stripeSubscriptionId = stripeSubscriptionId;
  }
}
