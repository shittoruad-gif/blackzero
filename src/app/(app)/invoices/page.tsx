'use client';

import { useState } from 'react';

interface Invoice {
  id: string;
  type: '請求書' | '見積書';
  client: string;
  items: { name: string; qty: number; unit: string; price: number }[];
  issueDate: string;
  dueDate: string;
  status: '未送付' | '送付済' | '入金済' | '遅延';
  note: string;
}

const mockInvoices: Invoice[] = [
  {
    id: 'INV-2026-001',
    type: '請求書',
    client: '株式会社テクノロジーズ',
    items: [
      { name: 'SaaSプラン月額利用料', qty: 1, unit: '式', price: 198000 },
      { name: 'カスタム開発', qty: 20, unit: '時間', price: 15000 },
    ],
    issueDate: '2026-03-01',
    dueDate: '2026-03-31',
    status: '入金済',
    note: '',
  },
  {
    id: 'INV-2026-002',
    type: '請求書',
    client: '合同会社マーケティングラボ',
    items: [
      { name: 'コンサルティング費用', qty: 1, unit: '式', price: 350000 },
    ],
    issueDate: '2026-03-05',
    dueDate: '2026-04-05',
    status: '送付済',
    note: '',
  },
  {
    id: 'INV-2026-003',
    type: '請求書',
    client: '株式会社デザインスタジオ',
    items: [
      { name: 'EC運用代行', qty: 1, unit: '月', price: 120000 },
      { name: '広告運用手数料', qty: 1, unit: '式', price: 80000 },
    ],
    issueDate: '2026-02-01',
    dueDate: '2026-02-28',
    status: '遅延',
    note: '2回催促済み',
  },
  {
    id: 'EST-2026-001',
    type: '見積書',
    client: '株式会社グロースパートナー',
    items: [
      { name: 'ダッシュボード導入費', qty: 1, unit: '式', price: 500000 },
      { name: '月額利用料（Business）', qty: 12, unit: 'ヶ月', price: 14800 },
    ],
    issueDate: '2026-03-20',
    dueDate: '',
    status: '未送付',
    note: '',
  },
];

export default function InvoicesPage() {
  const [invoices] = useState<Invoice[]>(mockInvoices);
  const [showCreate, setShowCreate] = useState(false);
  const [filter, setFilter] = useState<'all' | '請求書' | '見積書'>('all');

  const filtered = filter === 'all' ? invoices : invoices.filter((i) => i.type === filter);

  const totalUnpaid = invoices
    .filter((i) => i.type === '請求書' && (i.status === '送付済' || i.status === '遅延'))
    .reduce((sum, i) => sum + i.items.reduce((s, item) => s + item.qty * item.price, 0), 0);

  const overdueCount = invoices.filter((i) => i.status === '遅延').length;

  const statusColor: Record<string, string> = {
    '未送付': '#888',
    '送付済': '#3b82f6',
    '入金済': '#a3e635',
    '遅延': '#ef4444',
  };

  const calcTotal = (items: Invoice['items']) =>
    items.reduce((s, item) => s + item.qty * item.price, 0);

  return (
    <div style={{ padding: '28px 32px', maxWidth: 1000 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 24 }}>
        <div>
          <h2 style={{ fontSize: 20, fontWeight: 700 }}>請求書・見積書</h2>
          <p style={{ fontSize: 12, color: 'var(--text-secondary)', marginTop: 2 }}>
            請求書・見積書の作成と入金管理
          </p>
        </div>
        <button
          onClick={() => setShowCreate(!showCreate)}
          style={{
            padding: '8px 18px',
            fontSize: 12,
            fontWeight: 700,
            color: '#0a0a0a',
            background: 'var(--accent-green)',
            border: 'none',
            borderRadius: 6,
            cursor: 'pointer',
          }}
        >
          + 新規作成
        </button>
      </div>

      {/* サマリー */}
      <div style={{ display: 'flex', gap: 14, marginBottom: 24, flexWrap: 'wrap' }}>
        <div style={{ flex: 1, minWidth: 180, background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: 10, padding: 20 }}>
          <div style={{ fontSize: 11, color: 'var(--text-muted)', marginBottom: 4 }}>未回収売掛金</div>
          <div style={{ fontSize: 24, fontWeight: 800, color: '#f59e0b' }}>¥{totalUnpaid.toLocaleString()}</div>
        </div>
        <div style={{ flex: 1, minWidth: 180, background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: 10, padding: 20 }}>
          <div style={{ fontSize: 11, color: 'var(--text-muted)', marginBottom: 4 }}>入金遅延</div>
          <div style={{ fontSize: 24, fontWeight: 800, color: overdueCount > 0 ? '#ef4444' : '#a3e635' }}>
            {overdueCount}件
          </div>
          {overdueCount > 0 && (
            <div style={{ fontSize: 11, color: '#ef4444', marginTop: 4 }}>要対応</div>
          )}
        </div>
        <div style={{ flex: 1, minWidth: 180, background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: 10, padding: 20 }}>
          <div style={{ fontSize: 11, color: 'var(--text-muted)', marginBottom: 4 }}>発行済み（今月）</div>
          <div style={{ fontSize: 24, fontWeight: 800 }}>{invoices.filter((i) => i.issueDate.startsWith('2026-03')).length}件</div>
        </div>
      </div>

      {/* 新規作成フォーム */}
      {showCreate && (
        <CreateForm onClose={() => setShowCreate(false)} />
      )}

      {/* フィルター */}
      <div style={{ display: 'flex', gap: 8, marginBottom: 16 }}>
        {(['all', '請求書', '見積書'] as const).map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            style={{
              padding: '6px 14px',
              fontSize: 12,
              fontWeight: 600,
              borderRadius: 6,
              border: 'none',
              cursor: 'pointer',
              background: filter === f ? 'var(--accent-green)' : 'var(--bg-card)',
              color: filter === f ? '#0a0a0a' : 'var(--text-secondary)',
            }}
          >
            {f === 'all' ? 'すべて' : f}
          </button>
        ))}
      </div>

      {/* 一覧 */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
        {filtered.map((inv) => (
          <div
            key={inv.id}
            style={{
              background: 'var(--bg-card)',
              border: `1px solid ${inv.status === '遅延' ? 'rgba(239,68,68,0.3)' : 'var(--border)'}`,
              borderRadius: 10,
              padding: '16px 20px',
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <span style={{ fontSize: 12, color: 'var(--text-muted)', fontFamily: 'monospace' }}>{inv.id}</span>
                <span style={{ fontSize: 10, fontWeight: 700, padding: '2px 8px', borderRadius: 4, background: `${statusColor[inv.status]}18`, color: statusColor[inv.status] }}>
                  {inv.status}
                </span>
                <span style={{ fontSize: 10, fontWeight: 600, padding: '2px 8px', borderRadius: 4, background: inv.type === '請求書' ? 'rgba(59,130,246,0.1)' : 'rgba(129,140,248,0.1)', color: inv.type === '請求書' ? '#3b82f6' : '#818cf8' }}>
                  {inv.type}
                </span>
              </div>
              <div style={{ fontSize: 20, fontWeight: 800 }}>
                ¥{calcTotal(inv.items).toLocaleString()}
              </div>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <div style={{ fontSize: 14, fontWeight: 600 }}>{inv.client}</div>
                <div style={{ fontSize: 11, color: 'var(--text-muted)', marginTop: 2 }}>
                  発行日: {inv.issueDate}
                  {inv.dueDate && ` | 支払期限: ${inv.dueDate}`}
                  {inv.note && ` | ${inv.note}`}
                </div>
              </div>
              <div style={{ display: 'flex', gap: 6 }}>
                <button
                  onClick={() => window.print()}
                  style={{ padding: '6px 12px', fontSize: 11, fontWeight: 600, background: 'var(--bg-hover)', color: 'var(--text-secondary)', border: '1px solid var(--border)', borderRadius: 5, cursor: 'pointer' }}
                >
                  PDF
                </button>
                {inv.status === '遅延' && (
                  <button style={{ padding: '6px 12px', fontSize: 11, fontWeight: 600, background: 'rgba(239,68,68,0.08)', color: '#ef4444', border: 'none', borderRadius: 5, cursor: 'pointer' }}>
                    催促
                  </button>
                )}
              </div>
            </div>

            {/* 明細 */}
            <div style={{ marginTop: 10, borderTop: '1px solid var(--border)', paddingTop: 10 }}>
              {inv.items.map((item, idx) => (
                <div key={idx} style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12, color: 'var(--text-secondary)', padding: '2px 0' }}>
                  <span>{item.name}</span>
                  <span>{item.qty} {item.unit} × ¥{item.price.toLocaleString()} = ¥{(item.qty * item.price).toLocaleString()}</span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function CreateForm({ onClose }: { onClose: () => void }) {
  const [type, setType] = useState<'請求書' | '見積書'>('請求書');

  return (
    <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: 10, padding: 24, marginBottom: 20 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
        <span style={{ fontSize: 15, fontWeight: 700 }}>新規作成</span>
        <button onClick={onClose} style={{ background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer', fontSize: 16 }}>✕</button>
      </div>

      <div style={{ display: 'flex', gap: 8, marginBottom: 16 }}>
        {(['請求書', '見積書'] as const).map((t) => (
          <button
            key={t}
            onClick={() => setType(t)}
            style={{
              padding: '6px 14px', fontSize: 12, fontWeight: 600, borderRadius: 6, border: 'none', cursor: 'pointer',
              background: type === t ? 'var(--accent-green)' : 'var(--bg-primary)',
              color: type === t ? '#0a0a0a' : 'var(--text-secondary)',
            }}
          >
            {t}
          </button>
        ))}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 16 }}>
        <div>
          <label style={{ fontSize: 11, color: 'var(--text-muted)', display: 'block', marginBottom: 4 }}>取引先名</label>
          <input placeholder="株式会社〇〇" style={{ width: '100%', padding: '8px 12px', fontSize: 13, background: 'var(--bg-primary)', border: '1px solid var(--border)', borderRadius: 6, color: 'var(--text-primary)' }} />
        </div>
        <div>
          <label style={{ fontSize: 11, color: 'var(--text-muted)', display: 'block', marginBottom: 4 }}>発行日</label>
          <input type="date" defaultValue="2026-03-27" style={{ width: '100%', padding: '8px 12px', fontSize: 13, background: 'var(--bg-primary)', border: '1px solid var(--border)', borderRadius: 6, color: 'var(--text-primary)' }} />
        </div>
        <div>
          <label style={{ fontSize: 11, color: 'var(--text-muted)', display: 'block', marginBottom: 4 }}>品目</label>
          <input placeholder="サービス名" style={{ width: '100%', padding: '8px 12px', fontSize: 13, background: 'var(--bg-primary)', border: '1px solid var(--border)', borderRadius: 6, color: 'var(--text-primary)' }} />
        </div>
        <div>
          <label style={{ fontSize: 11, color: 'var(--text-muted)', display: 'block', marginBottom: 4 }}>金額（税抜）</label>
          <input type="number" placeholder="100000" style={{ width: '100%', padding: '8px 12px', fontSize: 13, background: 'var(--bg-primary)', border: '1px solid var(--border)', borderRadius: 6, color: 'var(--text-primary)' }} />
        </div>
      </div>

      {type === '請求書' && (
        <div style={{ marginBottom: 16 }}>
          <label style={{ fontSize: 11, color: 'var(--text-muted)', display: 'block', marginBottom: 4 }}>支払期限</label>
          <input type="date" style={{ padding: '8px 12px', fontSize: 13, background: 'var(--bg-primary)', border: '1px solid var(--border)', borderRadius: 6, color: 'var(--text-primary)' }} />
        </div>
      )}

      <div style={{ display: 'flex', gap: 8 }}>
        <button style={{ padding: '8px 20px', fontSize: 12, fontWeight: 700, color: '#0a0a0a', background: 'var(--accent-green)', border: 'none', borderRadius: 6, cursor: 'pointer' }}>
          作成
        </button>
        <button onClick={onClose} style={{ padding: '8px 20px', fontSize: 12, fontWeight: 600, color: 'var(--text-secondary)', background: 'var(--bg-primary)', border: '1px solid var(--border)', borderRadius: 6, cursor: 'pointer' }}>
          キャンセル
        </button>
      </div>
    </div>
  );
}
