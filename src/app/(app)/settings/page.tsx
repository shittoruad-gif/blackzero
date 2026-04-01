'use client';

import { useSession, signOut } from 'next-auth/react';
import { PLANS } from '@/lib/auth-types';

export default function SettingsPage() {
  const { data: session } = useSession();
  const plan = (session?.user as { plan?: string } | undefined)?.plan ?? 'free';
  const planConfig = PLANS.find((p) => p.id === plan);

  const planLabels: Record<string, string> = {
    free: 'Free', starter: 'Starter', pro: 'Pro', business: 'Business', enterprise: 'Enterprise',
  };
  const planColors: Record<string, string> = {
    free: '#888', starter: '#f59e0b', pro: '#a3e635', business: '#3b82f6', enterprise: '#818cf8',
  };

  const cardStyle: React.CSSProperties = {
    background: 'var(--bg-card)',
    border: '1px solid var(--border)',
    borderRadius: 10,
    padding: 20,
    marginBottom: 16,
  };

  const labelStyle: React.CSSProperties = {
    fontSize: 11,
    color: 'var(--text-muted)',
    marginBottom: 4,
  };

  const valueStyle: React.CSSProperties = {
    fontSize: 14,
    fontWeight: 600,
  };

  return (
    <div style={{ padding: '28px 32px', maxWidth: 700 }}>
      <div style={{ marginBottom: 24 }}>
        <h2 style={{ fontSize: 20, fontWeight: 700 }}>アカウント設定</h2>
        <p style={{ fontSize: 12, color: 'var(--text-secondary)', marginTop: 2 }}>
          プロフィール・プラン・請求情報の管理
        </p>
      </div>

      {/* プロフィール */}
      <div style={cardStyle}>
        <div style={{ fontSize: 14, fontWeight: 700, marginBottom: 16 }}>プロフィール</div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
          <div>
            <div style={labelStyle}>名前</div>
            <div style={valueStyle}>{session?.user?.name ?? '—'}</div>
          </div>
          <div>
            <div style={labelStyle}>メールアドレス</div>
            <div style={valueStyle}>{session?.user?.email ?? '—'}</div>
          </div>
        </div>
      </div>

      {/* プラン情報 */}
      <div style={cardStyle}>
        <div style={{ fontSize: 14, fontWeight: 700, marginBottom: 16 }}>契約プラン</div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 16 }}>
          <span
            style={{
              fontSize: 12,
              fontWeight: 700,
              padding: '4px 12px',
              borderRadius: 6,
              background: `${planColors[plan] ?? '#888'}18`,
              color: planColors[plan] ?? '#888',
            }}
          >
            {planLabels[plan] ?? 'Free'}
          </span>
          <span style={{ fontSize: 14, fontWeight: 600 }}>
            {planConfig?.price ?? '¥0'}{planConfig && planConfig.priceMonthly > 0 ? ' / 月' : ''}
          </span>
        </div>

        {planConfig && (
          <div style={{ marginBottom: 16 }}>
            <div style={labelStyle}>含まれる機能</div>
            <ul style={{ listStyle: 'none', marginTop: 6 }}>
              {planConfig.features.map((f, i) => (
                <li key={i} style={{ fontSize: 12, color: 'var(--text-secondary)', padding: '3px 0', display: 'flex', gap: 6 }}>
                  <span style={{ color: 'var(--accent-green)' }}>&#10003;</span>
                  {f}
                </li>
              ))}
            </ul>
          </div>
        )}

        <a
          href="/pricing"
          style={{
            display: 'inline-block',
            padding: '8px 20px',
            fontSize: 12,
            fontWeight: 700,
            color: '#0a0a0a',
            background: 'var(--accent-green)',
            borderRadius: 6,
            textDecoration: 'none',
          }}
        >
          {plan === 'free' ? 'プランをアップグレード' : 'プランを変更'}
        </a>
      </div>

      {/* 請求情報 */}
      <div style={cardStyle}>
        <div style={{ fontSize: 14, fontWeight: 700, marginBottom: 16 }}>請求情報</div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
          <div>
            <div style={labelStyle}>支払方法</div>
            <div style={valueStyle}>
              {plan === 'free' ? '未設定' : 'Stripe経由（カード決済）'}
            </div>
          </div>
          <div>
            <div style={labelStyle}>次回請求日</div>
            <div style={valueStyle}>
              {plan === 'free' ? '—' : '2026年4月26日'}
            </div>
          </div>
        </div>
      </div>

      {/* セキュリティ */}
      <div style={cardStyle}>
        <div style={{ fontSize: 14, fontWeight: 700, marginBottom: 16 }}>セキュリティ</div>
        <div style={{ display: 'flex', gap: 10 }}>
          <button
            style={{
              padding: '8px 16px',
              fontSize: 12,
              fontWeight: 600,
              color: 'var(--text-primary)',
              background: 'var(--bg-hover)',
              border: '1px solid var(--border)',
              borderRadius: 6,
              cursor: 'pointer',
            }}
          >
            パスワードを変更
          </button>
          <button
            onClick={() => signOut({ callbackUrl: '/login' })}
            style={{
              padding: '8px 16px',
              fontSize: 12,
              fontWeight: 600,
              color: 'var(--accent-red)',
              background: 'rgba(239,68,68,0.08)',
              border: '1px solid rgba(239,68,68,0.15)',
              borderRadius: 6,
              cursor: 'pointer',
            }}
          >
            ログアウト
          </button>
        </div>
      </div>
    </div>
  );
}
