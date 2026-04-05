'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

interface MenuItem {
  label: string;
  href: string | null;
  section?: boolean;
}

const menuItems: MenuItem[] = [
  { label: 'データ', href: null, section: true },
  { label: 'ダッシュボード', href: '/' },
  { label: '生データ一覧', href: '/data' },
  { label: '分析', href: null, section: true },
  { label: 'キャッシュフロー予測', href: '/cashflow' },
  { label: '損益分岐点', href: '/breakeven' },
  { label: '経費カテゴリ分析', href: '/expenses' },
  { label: '目標 & 進捗', href: '/goals' },
  { label: '競合ベンチマーク', href: '/benchmark' },
  { label: 'AI-CTO', href: null, section: true },
  { label: 'アクション管理', href: '/tasks' },
  { label: '月次レポート', href: '/report' },
  { label: '帳票', href: null, section: true },
  { label: '請求書・見積書', href: '/invoices' },
  { label: 'レポート配信', href: '/delivery' },
  { label: '設定', href: null, section: true },
  { label: 'API連携', href: '/integrations' },
  { label: '料金プラン', href: '/pricing' },
  { label: 'アカウント設定', href: '/settings' },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside
      style={{
        width: 'var(--sidebar-width)',
        minWidth: 'var(--sidebar-width)',
        height: '100vh',
        background: 'var(--bg-secondary)',
        borderRight: '1px solid var(--border)',
        display: 'flex',
        flexDirection: 'column',
        position: 'fixed',
        left: 0,
        top: 0,
        zIndex: 50,
      }}
    >
      <div style={{ padding: '20px 18px 16px', borderBottom: '1px solid var(--border)' }}>
        <h1 style={{ fontSize: 18, fontWeight: 800, letterSpacing: '-0.02em' }}>
          Black<span style={{ color: 'var(--accent-green)' }}>Zero</span>
        </h1>
      </div>

      <nav style={{ flex: 1, padding: '8px 0', overflowY: 'auto' }}>
        {menuItems.map((item, i) => {
          if (item.section) {
            return (
              <div
                key={i}
                style={{
                  padding: '16px 18px 6px',
                  fontSize: 10,
                  fontWeight: 600,
                  color: 'var(--text-muted)',
                  textTransform: 'uppercase',
                  letterSpacing: '0.08em',
                }}
              >
                {item.label}
              </div>
            );
          }

          const isActive = item.href !== null && pathname === item.href;

          if (item.href === null) {
            return (
              <span
                key={i}
                style={{
                  display: 'block',
                  padding: '8px 18px',
                  fontSize: 13,
                  color: 'var(--text-muted)',
                  cursor: 'not-allowed',
                }}
              >
                {item.label}
              </span>
            );
          }

          return (
            <Link
              key={i}
              href={item.href}
              style={{
                display: 'block',
                padding: '8px 18px',
                fontSize: 13,
                fontWeight: isActive ? 600 : 400,
                color: isActive ? 'var(--text-primary)' : 'var(--text-secondary)',
                background: isActive ? 'var(--border)' : 'transparent',
                borderLeft: isActive ? '2px solid var(--accent-green)' : '2px solid transparent',
                textDecoration: 'none',
                transition: 'all 0.15s',
              }}
              onMouseEnter={(e) => {
                if (!isActive) {
                  e.currentTarget.style.background = 'var(--bg-hover)';
                  e.currentTarget.style.color = 'var(--text-primary)';
                }
              }}
              onMouseLeave={(e) => {
                if (!isActive) {
                  e.currentTarget.style.background = 'transparent';
                  e.currentTarget.style.color = 'var(--text-secondary)';
                }
              }}
            >
              {item.label}
            </Link>
          );
        })}
      </nav>

      <div
        style={{
          padding: '12px 18px',
          borderTop: '1px solid var(--border)',
          fontSize: 11,
          color: 'var(--text-muted)',
        }}
      >
        v0.1.0
      </div>
    </aside>
  );
}
