'use client';

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from 'recharts';
import { expenseCategories } from '@/lib/mockData';

export default function ExpensesPage() {
  const totalExpense = expenseCategories.reduce((s, c) => s + c.amount, 0);
  const totalPrev = expenseCategories.reduce((s, c) => s + c.prevAmount, 0);
  const totalChange = Math.round(((totalExpense - totalPrev) / totalPrev) * 100 * 10) / 10;

  const sorted = [...expenseCategories].sort((a, b) => b.amount - a.amount);

  // AI分析コメント
  const aiInsights = [
    { color: '#ef4444', text: '広告宣伝費が前月比+40.4%と大幅増加。ROASが低下傾向のため、配信チャネルの見直しを推奨します。' },
    { color: '#a3e635', text: '旅費交通費は前月比-27.4%と削減に成功。リモートワーク推進の効果が出ています。' },
    { color: '#f59e0b', text: 'インフラ費が微増傾向。AWSの未使用リソース整理で月¥30万程度の削減余地があります。' },
  ];

  return (
    <div style={{ padding: '28px 32px', maxWidth: 1200 }}>
      <div style={{ marginBottom: 24 }}>
        <h2 style={{ fontSize: 20, fontWeight: 700 }}>経費カテゴリ分析</h2>
        <p style={{ fontSize: 12, color: 'var(--text-secondary)', marginTop: 2 }}>
          費目別の内訳と前月比較
        </p>
      </div>

      {/* サマリー */}
      <div style={{ display: 'flex', gap: 14, marginBottom: 24, flexWrap: 'wrap' }}>
        <div style={{ flex: 1, minWidth: 200, background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: 10, padding: 20 }}>
          <div style={{ fontSize: 12, color: 'var(--text-secondary)', marginBottom: 8 }}>今月経費合計</div>
          <div style={{ fontSize: 28, fontWeight: 800 }}>¥{totalExpense.toLocaleString()}万</div>
        </div>
        <div style={{ flex: 1, minWidth: 200, background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: 10, padding: 20 }}>
          <div style={{ fontSize: 12, color: 'var(--text-secondary)', marginBottom: 8 }}>前月比</div>
          <div style={{ fontSize: 28, fontWeight: 800, color: totalChange > 0 ? '#ef4444' : '#a3e635' }}>
            {totalChange > 0 ? '+' : ''}{totalChange}%
          </div>
        </div>
        <div style={{ flex: 1, minWidth: 200, background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: 10, padding: 20 }}>
          <div style={{ fontSize: 12, color: 'var(--text-secondary)', marginBottom: 8 }}>最大費目</div>
          <div style={{ fontSize: 20, fontWeight: 800 }}>{sorted[0].category}</div>
          <div style={{ fontSize: 12, color: 'var(--text-muted)', marginTop: 2 }}>
            ¥{sorted[0].amount.toLocaleString()}万（{Math.round((sorted[0].amount / totalExpense) * 100)}%）
          </div>
        </div>
      </div>

      {/* グラフ */}
      <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: 10, padding: '20px 20px 12px', marginBottom: 24 }}>
        <div style={{ fontSize: 13, fontWeight: 600, marginBottom: 16 }}>費目別経費（万円）</div>
        <ResponsiveContainer width="100%" height={280}>
          <BarChart data={sorted} layout="vertical">
            <CartesianGrid strokeDasharray="3 3" stroke="#1a1a1a" horizontal={false} />
            <XAxis type="number" tick={{ fill: '#888', fontSize: 11 }} axisLine={false} tickLine={false} />
            <YAxis dataKey="category" type="category" tick={{ fill: '#888', fontSize: 11 }} axisLine={false} tickLine={false} width={90} />
            <Tooltip contentStyle={{ background: '#1a1a1a', border: '1px solid #333', borderRadius: 8, fontSize: 12 }} />
            <Bar dataKey="amount" name="今月" radius={[0, 4, 4, 0]} barSize={16}>
              {sorted.map((entry, i) => (
                <Cell key={i} fill={entry.color} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* 前月比較テーブル */}
      <div style={{ display: 'flex', gap: 20, flexWrap: 'wrap' }}>
        <div style={{ flex: 2, minWidth: 400, background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: 10, overflow: 'hidden' }}>
          <div style={{ padding: '16px 20px', fontSize: 13, fontWeight: 600, borderBottom: '1px solid var(--border)' }}>
            費目別 前月比較
          </div>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
            <thead>
              <tr style={{ borderBottom: '1px solid var(--border)', background: 'var(--bg-secondary)' }}>
                {['カテゴリ', '今月', '前月', '増減', '構成比'].map((h) => (
                  <th key={h} style={{ padding: '10px 16px', textAlign: 'left', fontWeight: 600, fontSize: 11, color: 'var(--text-secondary)' }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {sorted.map((c, i) => {
                const change = Math.round(((c.amount - c.prevAmount) / c.prevAmount) * 100 * 10) / 10;
                const ratio = Math.round((c.amount / totalExpense) * 100);
                return (
                  <tr key={i} style={{ borderBottom: '1px solid var(--border)' }}>
                    <td style={{ padding: '10px 16px' }}>
                      <span style={{ display: 'inline-block', width: 8, height: 8, borderRadius: 2, background: c.color, marginRight: 8, verticalAlign: 'middle' }} />
                      {c.category}
                    </td>
                    <td style={{ padding: '10px 16px', fontWeight: 600 }}>¥{c.amount.toLocaleString()}万</td>
                    <td style={{ padding: '10px 16px', color: 'var(--text-secondary)' }}>¥{c.prevAmount.toLocaleString()}万</td>
                    <td style={{ padding: '10px 16px', color: change > 0 ? '#ef4444' : change < 0 ? '#a3e635' : 'var(--text-secondary)', fontWeight: 600 }}>
                      {change > 0 ? '+' : ''}{change}%
                    </td>
                    <td style={{ padding: '10px 16px', color: 'var(--text-secondary)' }}>{ratio}%</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* AI分析 */}
        <div style={{ flex: 1, minWidth: 280, background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: 10, padding: 20 }}>
          <div style={{ fontSize: 13, fontWeight: 600, marginBottom: 14 }}>AI 経費分析</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {aiInsights.map((insight, i) => (
              <div
                key={i}
                style={{
                  padding: '12px 14px',
                  background: `${insight.color}08`,
                  border: `1px solid ${insight.color}20`,
                  borderRadius: 8,
                  fontSize: 12,
                  color: 'var(--text-secondary)',
                  lineHeight: 1.6,
                }}
              >
                {insight.text}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
