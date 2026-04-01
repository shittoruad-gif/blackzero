'use client';

import { monthlyData, kpiData, goalRates, proposals, expenseCategories } from '@/lib/mockData';

export default function ReportPage() {
  const current = monthlyData[monthlyData.length - 1];
  const prev = monthlyData[monthlyData.length - 2];
  const revenueChange = ((current.revenue - prev.revenue) / prev.revenue * 100).toFixed(1);
  const costChange = ((current.cost - prev.cost) / prev.cost * 100).toFixed(1);
  const profitChange = ((current.profit - prev.profit) / prev.profit * 100).toFixed(1);

  const topExpense = [...expenseCategories].sort((a, b) => b.amount - a.amount).slice(0, 3);

  const sectionStyle: React.CSSProperties = {
    background: 'var(--bg-card)',
    border: '1px solid var(--border)',
    borderRadius: 10,
    padding: 24,
    marginBottom: 16,
  };

  return (
    <div style={{ padding: '28px 32px', maxWidth: 800 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 24 }}>
        <div>
          <h2 style={{ fontSize: 20, fontWeight: 700 }}>月次レポート</h2>
          <p style={{ fontSize: 12, color: 'var(--text-secondary)', marginTop: 2 }}>
            2026年3月度 経営サマリーレポート
          </p>
        </div>
        <button
          onClick={() => window.print()}
          style={{
            padding: '8px 16px',
            fontSize: 12,
            fontWeight: 600,
            color: 'var(--text-primary)',
            background: 'var(--bg-card)',
            border: '1px solid var(--border)',
            borderRadius: 8,
            cursor: 'pointer',
          }}
        >
          印刷 / PDF保存
        </button>
      </div>

      {/* レポートヘッダー */}
      <div
        style={{
          background: 'var(--bg-card)',
          border: '1px solid var(--border)',
          borderRadius: 10,
          padding: '28px 24px',
          marginBottom: 16,
          textAlign: 'center',
        }}
      >
        <div style={{ fontSize: 22, fontWeight: 800, marginBottom: 4 }}>
          Black<span style={{ color: 'var(--accent-green)' }}>Zero</span> 月次レポート
        </div>
        <div style={{ fontSize: 13, color: 'var(--text-secondary)' }}>2026年3月度</div>
        <div style={{ fontSize: 11, color: 'var(--text-muted)', marginTop: 4 }}>生成日: 2026年3月27日</div>
      </div>

      {/* 業績サマリー */}
      <div style={sectionStyle}>
        <div style={{ fontSize: 15, fontWeight: 700, marginBottom: 16 }}>業績サマリー</div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16 }}>
          {[
            { label: '売上高', value: `¥${current.revenue.toLocaleString()}万`, change: `${Number(revenueChange) > 0 ? '+' : ''}${revenueChange}%`, color: Number(revenueChange) > 0 ? '#a3e635' : '#ef4444' },
            { label: '費用', value: `¥${current.cost.toLocaleString()}万`, change: `${Number(costChange) > 0 ? '+' : ''}${costChange}%`, color: Number(costChange) > 0 ? '#ef4444' : '#a3e635' },
            { label: '利益', value: `¥${current.profit.toLocaleString()}万`, change: `${Number(profitChange) > 0 ? '+' : ''}${profitChange}%`, color: Number(profitChange) > 0 ? '#a3e635' : '#ef4444' },
          ].map((item, i) => (
            <div key={i} style={{ textAlign: 'center' }}>
              <div style={{ fontSize: 11, color: 'var(--text-muted)', marginBottom: 4 }}>{item.label}</div>
              <div style={{ fontSize: 22, fontWeight: 800 }}>{item.value}</div>
              <div style={{ fontSize: 12, color: item.color, fontWeight: 600, marginTop: 2 }}>{item.change}</div>
            </div>
          ))}
        </div>
      </div>

      {/* KPI */}
      <div style={sectionStyle}>
        <div style={{ fontSize: 15, fontWeight: 700, marginBottom: 16 }}>KPI指標</div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 12 }}>
          {kpiData.map((kpi, i) => (
            <div key={i} style={{ padding: 12, background: 'var(--bg-primary)', borderRadius: 8 }}>
              <div style={{ fontSize: 11, color: 'var(--text-muted)', marginBottom: 4 }}>{kpi.label}</div>
              <div style={{ display: 'flex', alignItems: 'baseline', gap: 8 }}>
                <span style={{ fontSize: 18, fontWeight: 700 }}>{kpi.value}</span>
                <span style={{ fontSize: 12, color: kpi.up ? '#a3e635' : '#ef4444', fontWeight: 600 }}>{kpi.change}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 事業別達成率 */}
      <div style={sectionStyle}>
        <div style={{ fontSize: 15, fontWeight: 700, marginBottom: 16 }}>事業別 目標達成率</div>
        {goalRates.map((g, i) => (
          <div key={i} style={{ marginBottom: 12 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
              <span style={{ fontSize: 13 }}>{g.label}</span>
              <span style={{ fontSize: 13, fontWeight: 700, color: g.color }}>{g.rate}%</span>
            </div>
            <div style={{ height: 6, background: 'var(--border)', borderRadius: 3, overflow: 'hidden' }}>
              <div style={{ width: `${Math.min(g.rate, 100)}%`, height: '100%', background: g.color, borderRadius: 3 }} />
            </div>
          </div>
        ))}
      </div>

      {/* 費用TOP3 */}
      <div style={sectionStyle}>
        <div style={{ fontSize: 15, fontWeight: 700, marginBottom: 16 }}>費用TOP3</div>
        {topExpense.map((e, i) => {
          const change = Math.round(((e.amount - e.prevAmount) / e.prevAmount) * 100);
          return (
            <div key={i} style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 0', borderBottom: i < 2 ? '1px solid var(--border)' : 'none' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <span style={{ fontSize: 14, fontWeight: 700, color: 'var(--text-muted)', width: 20 }}>{i + 1}</span>
                <span style={{ fontSize: 13 }}>{e.category}</span>
              </div>
              <div style={{ textAlign: 'right' }}>
                <div style={{ fontSize: 13, fontWeight: 600 }}>¥{e.amount.toLocaleString()}万</div>
                <div style={{ fontSize: 11, color: change > 0 ? '#ef4444' : '#a3e635' }}>
                  前月比 {change > 0 ? '+' : ''}{change}%
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* AI提案 */}
      <div style={sectionStyle}>
        <div style={{ fontSize: 15, fontWeight: 700, marginBottom: 16 }}>AI改善提案</div>
        {proposals.map((p, i) => (
          <div key={i} style={{ padding: '10px 0', borderBottom: i < proposals.length - 1 ? '1px solid var(--border)' : 'none' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}>
              <span style={{ fontSize: 11, fontWeight: 700, padding: '2px 8px', borderRadius: 4, background: `${p.rankColor}18`, color: p.rankColor }}>
                #{p.rank}
              </span>
              <span style={{ fontSize: 13, fontWeight: 600 }}>{p.proposal}</span>
            </div>
            <div style={{ fontSize: 12, color: 'var(--text-secondary)', paddingLeft: 36 }}>{p.effect}</div>
          </div>
        ))}
      </div>

      <div style={{ textAlign: 'center', padding: '20px 0', fontSize: 11, color: 'var(--text-muted)' }}>
        本レポートはBlackZeroにより自動生成されています
      </div>
    </div>
  );
}
