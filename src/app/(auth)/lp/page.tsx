'use client';

import Link from 'next/link';
import { PLANS } from '@/lib/auth-types';

export default function LandingPage() {
  const features = [
    { icon: '📊', title: 'ダッシュボード', desc: 'KPI・売上・コスト・利益率をリアルタイムで可視化' },
    { icon: '💰', title: 'キャッシュフロー予測', desc: '3ヶ月先の資金繰りを予測し、資金ショートを未然に防止' },
    { icon: '📈', title: '損益分岐点分析', desc: '固定費・変動費から黒字化に必要な売上を即座に算出' },
    { icon: '🎯', title: '目標進捗トラッカー', desc: '事業別の目標達成率と日次ペースをリアルタイム追跡' },
    { icon: '🤖', title: 'AI改善提案', desc: 'データに基づいた収益改善・コスト削減提案を自動生成' },
    { icon: '✅', title: 'アクション管理', desc: 'AI提案からタスクを生成し、実行・効果測定まで一元管理' },
  ];

  const prosPlan = PLANS.find((p) => p.id === 'pro');

  return (
    <div style={{ maxWidth: 960, margin: '0 auto', padding: '0 24px' }}>
      {/* Header */}
      <header
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: '20px 0',
        }}
      >
        <h1 style={{ fontSize: 20, fontWeight: 800 }}>
          Black<span style={{ color: 'var(--accent-green)' }}>Zero</span>
        </h1>
        <div style={{ display: 'flex', gap: 8 }}>
          <Link
            href="/login"
            style={{
              padding: '8px 18px',
              fontSize: 13,
              color: 'var(--text-secondary)',
              textDecoration: 'none',
              borderRadius: 6,
              border: '1px solid var(--border-light)',
            }}
          >
            ログイン
          </Link>
          <Link
            href="/signup"
            style={{
              padding: '8px 18px',
              fontSize: 13,
              fontWeight: 700,
              color: '#0a0a0a',
              background: 'var(--accent-green)',
              textDecoration: 'none',
              borderRadius: 6,
            }}
          >
            無料で始める
          </Link>
        </div>
      </header>

      {/* Hero */}
      <section style={{ textAlign: 'center', padding: '80px 0 60px' }}>
        <div
          style={{
            display: 'inline-block',
            padding: '4px 14px',
            fontSize: 11,
            fontWeight: 600,
            color: 'var(--accent-green)',
            background: 'rgba(163,230,53,0.08)',
            borderRadius: 20,
            marginBottom: 20,
          }}
        >
          7日間無料トライアル
        </div>
        <h2 style={{ fontSize: 36, fontWeight: 900, lineHeight: 1.3, marginBottom: 16 }}>
          経営数値を
          <span style={{ color: 'var(--accent-green)' }}>黒字</span>
          に導く
          <br />
          AI経営支援ダッシュボード
        </h2>
        <p style={{ fontSize: 16, color: 'var(--text-secondary)', lineHeight: 1.8, marginBottom: 32, maxWidth: 560, margin: '0 auto 32px' }}>
          Stripe・freee・Google Adsのデータを統合。
          AIがリアルタイムで経営改善を提案します。
        </p>
        <div style={{ display: 'flex', gap: 12, justifyContent: 'center' }}>
          <Link
            href="/signup"
            style={{
              padding: '14px 32px',
              fontSize: 15,
              fontWeight: 700,
              color: '#0a0a0a',
              background: 'var(--accent-green)',
              textDecoration: 'none',
              borderRadius: 10,
            }}
          >
            7日間無料で試す
          </Link>
          <Link
            href="/login"
            style={{
              padding: '14px 32px',
              fontSize: 15,
              fontWeight: 600,
              color: 'var(--text-secondary)',
              background: 'var(--bg-card)',
              border: '1px solid var(--border)',
              textDecoration: 'none',
              borderRadius: 10,
            }}
          >
            ログイン
          </Link>
        </div>
      </section>

      {/* Features */}
      <section style={{ padding: '40px 0 60px' }}>
        <h3 style={{ fontSize: 20, fontWeight: 800, textAlign: 'center', marginBottom: 32 }}>
          主な機能
        </h3>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(270px, 1fr))',
            gap: 16,
          }}
        >
          {features.map((f, i) => (
            <div
              key={i}
              style={{
                background: 'var(--bg-card)',
                border: '1px solid var(--border)',
                borderRadius: 12,
                padding: '24px 20px',
              }}
            >
              <div style={{ fontSize: 24, marginBottom: 10 }}>{f.icon}</div>
              <div style={{ fontSize: 14, fontWeight: 700, marginBottom: 6 }}>{f.title}</div>
              <div style={{ fontSize: 12, color: 'var(--text-secondary)', lineHeight: 1.6 }}>
                {f.desc}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Pricing Summary */}
      <section style={{ padding: '40px 0 60px', textAlign: 'center' }}>
        <h3 style={{ fontSize: 20, fontWeight: 800, marginBottom: 8 }}>料金</h3>
        <p style={{ fontSize: 13, color: 'var(--text-secondary)', marginBottom: 24 }}>
          個人事業主 ¥1,980〜 / 法人 ¥14,800〜（全プラン7日間無料）
        </p>
        <Link
          href="/signup"
          style={{
            display: 'inline-block',
            padding: '12px 28px',
            fontSize: 14,
            fontWeight: 700,
            color: '#0a0a0a',
            background: 'var(--accent-green)',
            textDecoration: 'none',
            borderRadius: 8,
          }}
        >
          無料トライアルを開始
        </Link>
      </section>

      {/* Footer */}
      <footer
        style={{
          borderTop: '1px solid var(--border)',
          padding: '24px 0',
          textAlign: 'center',
          fontSize: 11,
          color: 'var(--text-muted)',
        }}
      >
        &copy; 2026 BlackZero. All rights reserved.
      </footer>
    </div>
  );
}
