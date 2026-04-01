'use client';

import { useState } from 'react';
import { useSession, signOut } from 'next-auth/react';
import Link from 'next/link';

export default function UserMenu() {
  const { data: session } = useSession();
  const [showNotif, setShowNotif] = useState(false);

  if (!session?.user) {
    return (
      <div style={{ display: 'flex', gap: 8 }}>
        <Link
          href="/login"
          style={{
            padding: '6px 14px',
            fontSize: 12,
            color: 'var(--text-secondary)',
            textDecoration: 'none',
            borderRadius: 6,
            border: '1px solid var(--border-light)',
            transition: 'all 0.15s',
          }}
        >
          ログイン
        </Link>
        <Link
          href="/signup"
          style={{
            padding: '6px 14px',
            fontSize: 12,
            color: '#0a0a0a',
            background: 'var(--accent-green)',
            textDecoration: 'none',
            borderRadius: 6,
            fontWeight: 600,
          }}
        >
          新規登録
        </Link>
      </div>
    );
  }

  const plan = (session.user as { plan?: string }).plan ?? 'free';
  const planLabels: Record<string, string> = {
    free: 'Free', starter: 'Starter', pro: 'Pro', business: 'Business', enterprise: 'Enterprise',
  };
  const planColors: Record<string, string> = {
    free: '#888', starter: '#f59e0b', pro: '#a3e635', business: '#3b82f6', enterprise: '#818cf8',
  };
  const planLabel = planLabels[plan] ?? 'Free';
  const planColor = planColors[plan] ?? '#888';

  const notifications = [
    { id: 1, text: 'キャッシュフロー警告: 来月末の支払い予定額が残高80%超過', time: '1時間前', read: false },
    { id: 2, text: 'EC事業の目標達成率が68%に低下しました', time: '3時間前', read: false },
    { id: 3, text: 'AI提案: SaaSアップセル施策の効果測定が完了', time: '昨日', read: true },
  ];
  const unreadCount = notifications.filter((n) => !n.read).length;

  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
      {/* 通知ベル */}
      <div style={{ position: 'relative' }}>
        <button
          onClick={() => setShowNotif(!showNotif)}
          style={{
            padding: '4px 8px',
            fontSize: 16,
            background: 'transparent',
            border: 'none',
            cursor: 'pointer',
            position: 'relative',
          }}
          aria-label="通知"
        >
          🔔
          {unreadCount > 0 && (
            <span
              style={{
                position: 'absolute',
                top: 0,
                right: 2,
                width: 14,
                height: 14,
                borderRadius: 7,
                background: '#ef4444',
                color: '#fff',
                fontSize: 9,
                fontWeight: 700,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              {unreadCount}
            </span>
          )}
        </button>
        {showNotif && (
          <div
            style={{
              position: 'absolute',
              top: '100%',
              right: 0,
              marginTop: 8,
              width: 320,
              background: 'var(--bg-card)',
              border: '1px solid var(--border)',
              borderRadius: 10,
              boxShadow: '0 8px 32px rgba(0,0,0,0.4)',
              zIndex: 100,
              overflow: 'hidden',
            }}
          >
            <div style={{ padding: '12px 16px', borderBottom: '1px solid var(--border)', fontSize: 13, fontWeight: 700 }}>
              通知
            </div>
            {notifications.map((n) => (
              <div
                key={n.id}
                style={{
                  padding: '10px 16px',
                  borderBottom: '1px solid var(--border)',
                  opacity: n.read ? 0.5 : 1,
                }}
              >
                <div style={{ fontSize: 12, lineHeight: 1.5 }}>{n.text}</div>
                <div style={{ fontSize: 10, color: 'var(--text-muted)', marginTop: 4 }}>{n.time}</div>
              </div>
            ))}
            <div style={{ padding: '8px 16px', textAlign: 'center' }}>
              <span style={{ fontSize: 11, color: 'var(--accent-green)', cursor: 'pointer' }}>
                すべて既読にする
              </span>
            </div>
          </div>
        )}
      </div>

      <span
        style={{
          fontSize: 10,
          fontWeight: 700,
          padding: '2px 8px',
          borderRadius: 4,
          background: `${planColor}18`,
          color: planColor,
          letterSpacing: '0.04em',
        }}
      >
        {planLabel}
      </span>
      <span style={{ fontSize: 12, color: 'var(--text-secondary)' }}>
        {session.user.name ?? session.user.email}
      </span>
      <button
        onClick={() => signOut({ callbackUrl: '/login' })}
        style={{
          padding: '4px 10px',
          fontSize: 11,
          color: 'var(--text-muted)',
          background: 'transparent',
          border: '1px solid var(--border)',
          borderRadius: 4,
          cursor: 'pointer',
        }}
      >
        ログアウト
      </button>
    </div>
  );
}
