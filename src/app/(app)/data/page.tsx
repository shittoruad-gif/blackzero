'use client';

import { useState } from 'react';
import { transactions, sourceConfig } from '@/lib/mockData';

export default function DataPage() {
  const [search, setSearch] = useState('');

  const filtered = transactions.filter(
    (t) =>
      t.name.toLowerCase().includes(search.toLowerCase()) ||
      t.category.toLowerCase().includes(search.toLowerCase()) ||
      t.division.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div style={{ padding: '28px 32px', maxWidth: 1200 }}>
      <div style={{ marginBottom: 24 }}>
        <h2 style={{ fontSize: 20, fontWeight: 700 }}>生データ一覧</h2>
        <p style={{ fontSize: 12, color: 'var(--text-secondary)', marginTop: 2 }}>
          取引データの検索・確認
        </p>
      </div>

      <div style={{ marginBottom: 16, display: 'flex', gap: 10, alignItems: 'center', flexWrap: 'wrap' }}>
        <input
          type="text"
          placeholder="キーワード検索..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{
            flex: 1,
            maxWidth: 360,
            padding: '8px 14px',
            fontSize: 13,
            background: 'var(--bg-card)',
            border: '1px solid var(--border)',
            borderRadius: 8,
            color: 'var(--text-primary)',
            outline: 'none',
          }}
          onFocus={(e) => (e.currentTarget.style.borderColor = 'var(--accent-green)')}
          onBlur={(e) => (e.currentTarget.style.borderColor = 'var(--border)')}
        />
        <button
          onClick={() => {
            const headers = ['日付', '取引名', 'ソース', '金額', '種別', 'カテゴリ', '事業部', 'ステータス'];
            const rows = filtered.map((t) => [
              t.date,
              t.name,
              sourceConfig[t.source].label,
              t.amount.toString(),
              t.type,
              t.category,
              t.division,
              t.status,
            ]);
            const bom = '\uFEFF';
            const csv = bom + [headers, ...rows].map((r) => r.map((c) => `"${c}"`).join(',')).join('\n');
            const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = `blackzero_data_${new Date().toISOString().slice(0, 10)}.csv`;
            a.click();
            URL.revokeObjectURL(url);
          }}
          style={{
            padding: '8px 16px',
            fontSize: 12,
            fontWeight: 600,
            color: 'var(--text-primary)',
            background: 'var(--bg-card)',
            border: '1px solid var(--border)',
            borderRadius: 8,
            cursor: 'pointer',
            whiteSpace: 'nowrap',
          }}
        >
          CSV出力
        </button>
        <span style={{ fontSize: 11, color: 'var(--text-muted)' }}>
          {filtered.length}件
        </span>
      </div>

      <div
        style={{
          background: 'var(--bg-card)',
          border: '1px solid var(--border)',
          borderRadius: 10,
          overflow: 'hidden',
        }}
      >
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
          <thead>
            <tr
              style={{
                borderBottom: '1px solid var(--border)',
                background: 'var(--bg-secondary)',
              }}
            >
              {['日付', '取引名', 'ソース', '金額', '種別', 'カテゴリ', '事業部', 'ステータス'].map(
                (h) => (
                  <th
                    key={h}
                    style={{
                      padding: '10px 14px',
                      textAlign: 'left',
                      fontWeight: 600,
                      fontSize: 11,
                      color: 'var(--text-secondary)',
                      whiteSpace: 'nowrap',
                    }}
                  >
                    {h}
                  </th>
                )
              )}
            </tr>
          </thead>
          <tbody>
            {filtered.map((t) => {
              const src = sourceConfig[t.source];
              return (
                <tr
                  key={t.id}
                  style={{ borderBottom: '1px solid var(--border)' }}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.background = 'var(--bg-hover)')
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.background = 'transparent')
                  }
                >
                  <td style={{ padding: '10px 14px', whiteSpace: 'nowrap', color: 'var(--text-secondary)' }}>
                    {t.date}
                  </td>
                  <td style={{ padding: '10px 14px', fontWeight: 500 }}>{t.name}</td>
                  <td style={{ padding: '10px 14px' }}>
                    <span
                      style={{
                        display: 'inline-block',
                        padding: '2px 8px',
                        fontSize: 11,
                        borderRadius: 4,
                        background: `${src.color}18`,
                        color: src.color,
                        fontWeight: 600,
                      }}
                    >
                      {src.label}
                    </span>
                  </td>
                  <td
                    style={{
                      padding: '10px 14px',
                      fontWeight: 600,
                      color: t.type === '売上' ? 'var(--accent-green)' : 'var(--text-primary)',
                      whiteSpace: 'nowrap',
                    }}
                  >
                    {t.type === '売上' ? '+' : '-'}¥{t.amount.toLocaleString()}
                  </td>
                  <td style={{ padding: '10px 14px' }}>
                    <span
                      style={{
                        fontSize: 11,
                        color: t.type === '売上' ? 'var(--accent-green)' : 'var(--accent-red)',
                      }}
                    >
                      {t.type}
                    </span>
                  </td>
                  <td style={{ padding: '10px 14px', color: 'var(--text-secondary)' }}>{t.category}</td>
                  <td style={{ padding: '10px 14px', color: 'var(--text-secondary)' }}>{t.division}</td>
                  <td style={{ padding: '10px 14px' }}>
                    <span
                      style={{
                        fontSize: 11,
                        padding: '2px 8px',
                        borderRadius: 4,
                        background:
                          t.status === '確認済'
                            ? 'rgba(163,230,53,0.1)'
                            : 'rgba(245,158,11,0.1)',
                        color:
                          t.status === '確認済' ? 'var(--accent-green)' : 'var(--accent-yellow)',
                        fontWeight: 600,
                      }}
                    >
                      {t.status}
                    </span>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
        {filtered.length === 0 && (
          <div
            style={{
              padding: 40,
              textAlign: 'center',
              color: 'var(--text-muted)',
              fontSize: 13,
            }}
          >
            該当するデータがありません
          </div>
        )}
      </div>
    </div>
  );
}
