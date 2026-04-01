'use client';

import { useState } from 'react';

interface Integration {
  id: string;
  name: string;
  icon: string;
  description: string;
  color: string;
  connected: boolean;
  lastSync?: string;
  dataCount?: number;
}

export default function IntegrationsPage() {
  const [integrations, setIntegrations] = useState<Integration[]>([
    {
      id: 'stripe',
      name: 'Stripe',
      icon: '💳',
      description: '決済データ・サブスクリプション売上を自動取得',
      color: '#818cf8',
      connected: true,
      lastSync: '2026-03-27 09:15',
      dataCount: 248,
    },
    {
      id: 'freee',
      name: 'freee会計',
      icon: '📗',
      description: '会計データ・経費・請求書情報を自動同期',
      color: '#a3e635',
      connected: true,
      lastSync: '2026-03-27 08:30',
      dataCount: 1520,
    },
    {
      id: 'google_ads',
      name: 'Google Ads',
      icon: '📢',
      description: '広告配信データ・ROAS・コンバージョンを取得',
      color: '#f59e0b',
      connected: false,
    },
    {
      id: 'slack',
      name: 'Slack',
      icon: '💬',
      description: 'アラート・AI提案をSlackチャンネルに自動通知',
      color: '#e879f9',
      connected: false,
    },
    {
      id: 'google_sheets',
      name: 'Google Sheets',
      icon: '📊',
      description: 'レポートデータをスプレッドシートに自動エクスポート',
      color: '#34d399',
      connected: false,
    },
    {
      id: 'chatwork',
      name: 'Chatwork',
      icon: '✉️',
      description: '日次・週次サマリーをChatworkに自動送信',
      color: '#ef4444',
      connected: false,
    },
  ]);

  const toggleConnection = (id: string) => {
    setIntegrations((prev) =>
      prev.map((i) =>
        i.id === id
          ? {
              ...i,
              connected: !i.connected,
              lastSync: !i.connected ? '2026-03-27 ' + new Date().toTimeString().slice(0, 5) : undefined,
              dataCount: !i.connected ? 0 : undefined,
            }
          : i
      )
    );
  };

  const connectedCount = integrations.filter((i) => i.connected).length;

  return (
    <div style={{ padding: '28px 32px', maxWidth: 900 }}>
      <div style={{ marginBottom: 24 }}>
        <h2 style={{ fontSize: 20, fontWeight: 700 }}>API連携</h2>
        <p style={{ fontSize: 12, color: 'var(--text-secondary)', marginTop: 2 }}>
          外部サービスとのデータ連携を管理
        </p>
      </div>

      {/* ステータスサマリー */}
      <div
        style={{
          display: 'flex',
          gap: 14,
          marginBottom: 24,
          flexWrap: 'wrap',
        }}
      >
        <div style={{ flex: 1, minWidth: 180, background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: 10, padding: 20 }}>
          <div style={{ fontSize: 11, color: 'var(--text-muted)', marginBottom: 4 }}>接続済み</div>
          <div style={{ fontSize: 28, fontWeight: 800, color: '#a3e635' }}>{connectedCount}</div>
        </div>
        <div style={{ flex: 1, minWidth: 180, background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: 10, padding: 20 }}>
          <div style={{ fontSize: 11, color: 'var(--text-muted)', marginBottom: 4 }}>未接続</div>
          <div style={{ fontSize: 28, fontWeight: 800, color: 'var(--text-muted)' }}>{integrations.length - connectedCount}</div>
        </div>
        <div style={{ flex: 1, minWidth: 180, background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: 10, padding: 20 }}>
          <div style={{ fontSize: 11, color: 'var(--text-muted)', marginBottom: 4 }}>利用可能</div>
          <div style={{ fontSize: 28, fontWeight: 800 }}>{integrations.length}</div>
        </div>
      </div>

      {/* 連携一覧 */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        {integrations.map((item) => (
          <div
            key={item.id}
            style={{
              background: 'var(--bg-card)',
              border: '1px solid var(--border)',
              borderRadius: 10,
              padding: '18px 20px',
              display: 'flex',
              alignItems: 'center',
              gap: 16,
            }}
          >
            <div
              style={{
                width: 44,
                height: 44,
                borderRadius: 10,
                background: `${item.color}12`,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: 22,
                flexShrink: 0,
              }}
            >
              {item.icon}
            </div>

            <div style={{ flex: 1 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 2 }}>
                <span style={{ fontSize: 14, fontWeight: 700 }}>{item.name}</span>
                <span
                  style={{
                    fontSize: 10,
                    fontWeight: 600,
                    padding: '2px 8px',
                    borderRadius: 4,
                    background: item.connected ? 'rgba(163,230,53,0.1)' : 'rgba(136,136,136,0.1)',
                    color: item.connected ? '#a3e635' : '#888',
                  }}
                >
                  {item.connected ? '接続済み' : '未接続'}
                </span>
              </div>
              <div style={{ fontSize: 12, color: 'var(--text-secondary)' }}>{item.description}</div>
              {item.connected && item.lastSync && (
                <div style={{ fontSize: 11, color: 'var(--text-muted)', marginTop: 4 }}>
                  最終同期: {item.lastSync} | データ: {item.dataCount?.toLocaleString()}件
                </div>
              )}
            </div>

            <button
              onClick={() => toggleConnection(item.id)}
              style={{
                padding: '8px 18px',
                fontSize: 12,
                fontWeight: 700,
                border: 'none',
                borderRadius: 6,
                cursor: 'pointer',
                color: item.connected ? 'var(--accent-red)' : '#0a0a0a',
                background: item.connected ? 'rgba(239,68,68,0.08)' : 'var(--accent-green)',
                flexShrink: 0,
              }}
            >
              {item.connected ? '切断' : '接続'}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
