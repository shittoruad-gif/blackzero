'use client';

import { useState } from 'react';

interface DeliverySchedule {
  id: string;
  name: string;
  type: 'email' | 'slack';
  frequency: '毎日' | '毎週' | '毎月';
  time: string;
  day?: string;
  recipients: string[];
  content: string[];
  enabled: boolean;
  lastSent?: string;
}

const mockSchedules: DeliverySchedule[] = [
  {
    id: 'del-001',
    name: '日次KPIサマリー',
    type: 'slack',
    frequency: '毎日',
    time: '09:00',
    recipients: ['#general', '#management'],
    content: ['KPI概要', '前日比較'],
    enabled: true,
    lastSent: '2026-03-27 09:00',
  },
  {
    id: 'del-002',
    name: '週次経営レポート',
    type: 'email',
    frequency: '毎週',
    time: '08:00',
    day: '月曜',
    recipients: ['ceo@company.jp', 'cfo@company.jp'],
    content: ['売上推移', 'KPI指標', '目標達成率', 'AI提案'],
    enabled: true,
    lastSent: '2026-03-24 08:00',
  },
  {
    id: 'del-003',
    name: '月次完全レポート',
    type: 'email',
    frequency: '毎月',
    time: '10:00',
    day: '1日',
    recipients: ['ceo@company.jp', 'cfo@company.jp', 'managers@company.jp'],
    content: ['業績サマリー', 'KPI指標', '事業別分析', '経費分析', '競合比較', 'AI改善提案'],
    enabled: true,
    lastSent: '2026-03-01 10:00',
  },
  {
    id: 'del-004',
    name: 'アラート即時通知',
    type: 'slack',
    frequency: '毎日',
    time: 'リアルタイム',
    recipients: ['#alerts'],
    content: ['リスクアラート', '目標遅延警告'],
    enabled: false,
  },
];

const contentOptions = [
  'KPI概要', '前日比較', '売上推移', 'KPI指標', '目標達成率',
  '事業別分析', '経費分析', '競合比較', 'AI改善提案', 'AI提案',
  'リスクアラート', '目標遅延警告', 'キャッシュフロー予測',
];

export default function DeliveryPage() {
  const [schedules, setSchedules] = useState(mockSchedules);
  const [showCreate, setShowCreate] = useState(false);

  const toggleEnabled = (id: string) => {
    setSchedules((prev) =>
      prev.map((s) => (s.id === id ? { ...s, enabled: !s.enabled } : s))
    );
  };

  const enabledCount = schedules.filter((s) => s.enabled).length;

  return (
    <div style={{ padding: '28px 32px', maxWidth: 900 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 24 }}>
        <div>
          <h2 style={{ fontSize: 20, fontWeight: 700 }}>レポート自動配信</h2>
          <p style={{ fontSize: 12, color: 'var(--text-secondary)', marginTop: 2 }}>
            レポートのメール・Slack自動配信を設定
          </p>
        </div>
        <button
          onClick={() => setShowCreate(!showCreate)}
          style={{
            padding: '8px 18px', fontSize: 12, fontWeight: 700,
            color: '#0a0a0a', background: 'var(--accent-green)',
            border: 'none', borderRadius: 6, cursor: 'pointer',
          }}
        >
          + 新規スケジュール
        </button>
      </div>

      {/* サマリー */}
      <div style={{ display: 'flex', gap: 14, marginBottom: 24, flexWrap: 'wrap' }}>
        <div style={{ flex: 1, minWidth: 180, background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: 10, padding: 20 }}>
          <div style={{ fontSize: 11, color: 'var(--text-muted)', marginBottom: 4 }}>有効なスケジュール</div>
          <div style={{ fontSize: 28, fontWeight: 800, color: '#a3e635' }}>{enabledCount}</div>
        </div>
        <div style={{ flex: 1, minWidth: 180, background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: 10, padding: 20 }}>
          <div style={{ fontSize: 11, color: 'var(--text-muted)', marginBottom: 4 }}>配信チャネル</div>
          <div style={{ display: 'flex', gap: 12, marginTop: 4 }}>
            <span style={{ fontSize: 14, fontWeight: 700 }}>📧 {schedules.filter((s) => s.type === 'email').length}</span>
            <span style={{ fontSize: 14, fontWeight: 700 }}>💬 {schedules.filter((s) => s.type === 'slack').length}</span>
          </div>
        </div>
        <div style={{ flex: 1, minWidth: 180, background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: 10, padding: 20 }}>
          <div style={{ fontSize: 11, color: 'var(--text-muted)', marginBottom: 4 }}>合計スケジュール</div>
          <div style={{ fontSize: 28, fontWeight: 800 }}>{schedules.length}</div>
        </div>
      </div>

      {/* 新規作成フォーム */}
      {showCreate && (
        <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: 10, padding: 24, marginBottom: 20 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
            <span style={{ fontSize: 15, fontWeight: 700 }}>新規スケジュール</span>
            <button onClick={() => setShowCreate(false)} style={{ background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer', fontSize: 16 }}>✕</button>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 16 }}>
            <div>
              <label style={{ fontSize: 11, color: 'var(--text-muted)', display: 'block', marginBottom: 4 }}>スケジュール名</label>
              <input placeholder="例：週次レポート" style={{ width: '100%', padding: '8px 12px', fontSize: 13, background: 'var(--bg-primary)', border: '1px solid var(--border)', borderRadius: 6, color: 'var(--text-primary)' }} />
            </div>
            <div>
              <label style={{ fontSize: 11, color: 'var(--text-muted)', display: 'block', marginBottom: 4 }}>配信先</label>
              <select style={{ width: '100%', padding: '8px 12px', fontSize: 13, background: 'var(--bg-primary)', border: '1px solid var(--border)', borderRadius: 6, color: 'var(--text-primary)' }}>
                <option>メール</option>
                <option>Slack</option>
              </select>
            </div>
            <div>
              <label style={{ fontSize: 11, color: 'var(--text-muted)', display: 'block', marginBottom: 4 }}>頻度</label>
              <select style={{ width: '100%', padding: '8px 12px', fontSize: 13, background: 'var(--bg-primary)', border: '1px solid var(--border)', borderRadius: 6, color: 'var(--text-primary)' }}>
                <option>毎日</option>
                <option>毎週</option>
                <option>毎月</option>
              </select>
            </div>
            <div>
              <label style={{ fontSize: 11, color: 'var(--text-muted)', display: 'block', marginBottom: 4 }}>配信時刻</label>
              <input type="time" defaultValue="09:00" style={{ width: '100%', padding: '8px 12px', fontSize: 13, background: 'var(--bg-primary)', border: '1px solid var(--border)', borderRadius: 6, color: 'var(--text-primary)' }} />
            </div>
          </div>
          <div style={{ marginBottom: 16 }}>
            <label style={{ fontSize: 11, color: 'var(--text-muted)', display: 'block', marginBottom: 4 }}>宛先（カンマ区切り）</label>
            <input placeholder="email@company.jp, #slack-channel" style={{ width: '100%', padding: '8px 12px', fontSize: 13, background: 'var(--bg-primary)', border: '1px solid var(--border)', borderRadius: 6, color: 'var(--text-primary)' }} />
          </div>
          <div style={{ marginBottom: 16 }}>
            <label style={{ fontSize: 11, color: 'var(--text-muted)', display: 'block', marginBottom: 8 }}>含める内容</label>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
              {contentOptions.map((c) => (
                <label key={c} style={{ display: 'flex', alignItems: 'center', gap: 4, fontSize: 12, color: 'var(--text-secondary)', padding: '4px 10px', background: 'var(--bg-primary)', borderRadius: 5, cursor: 'pointer' }}>
                  <input type="checkbox" />
                  {c}
                </label>
              ))}
            </div>
          </div>
          <div style={{ display: 'flex', gap: 8 }}>
            <button style={{ padding: '8px 20px', fontSize: 12, fontWeight: 700, color: '#0a0a0a', background: 'var(--accent-green)', border: 'none', borderRadius: 6, cursor: 'pointer' }}>作成</button>
            <button onClick={() => setShowCreate(false)} style={{ padding: '8px 20px', fontSize: 12, fontWeight: 600, color: 'var(--text-secondary)', background: 'var(--bg-primary)', border: '1px solid var(--border)', borderRadius: 6, cursor: 'pointer' }}>キャンセル</button>
          </div>
        </div>
      )}

      {/* スケジュール一覧 */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
        {schedules.map((s) => (
          <div
            key={s.id}
            style={{
              background: 'var(--bg-card)',
              border: '1px solid var(--border)',
              borderRadius: 10,
              padding: '16px 20px',
              opacity: s.enabled ? 1 : 0.5,
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <span style={{ fontSize: 18 }}>{s.type === 'email' ? '📧' : '💬'}</span>
                <span style={{ fontSize: 14, fontWeight: 700 }}>{s.name}</span>
                <span style={{ fontSize: 10, fontWeight: 600, padding: '2px 8px', borderRadius: 4, background: s.enabled ? 'rgba(163,230,53,0.1)' : 'rgba(136,136,136,0.1)', color: s.enabled ? '#a3e635' : '#888' }}>
                  {s.enabled ? '有効' : '停止中'}
                </span>
              </div>
              <button
                onClick={() => toggleEnabled(s.id)}
                style={{
                  padding: '6px 14px', fontSize: 11, fontWeight: 700, border: 'none', borderRadius: 5, cursor: 'pointer',
                  background: s.enabled ? 'rgba(239,68,68,0.08)' : 'rgba(163,230,53,0.08)',
                  color: s.enabled ? '#ef4444' : '#a3e635',
                }}
              >
                {s.enabled ? '停止' : '有効化'}
              </button>
            </div>

            <div style={{ fontSize: 12, color: 'var(--text-secondary)', marginBottom: 6 }}>
              {s.frequency} {s.day && `（${s.day}）`} {s.time} | 宛先: {s.recipients.join(', ')}
            </div>

            <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
              {s.content.map((c) => (
                <span key={c} style={{ fontSize: 10, padding: '2px 8px', borderRadius: 4, background: 'var(--bg-primary)', color: 'var(--text-muted)' }}>
                  {c}
                </span>
              ))}
            </div>

            {s.lastSent && (
              <div style={{ fontSize: 11, color: 'var(--text-muted)', marginTop: 6 }}>
                最終配信: {s.lastSent}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
