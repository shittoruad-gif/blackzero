'use client';

import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  ReferenceLine,
} from 'recharts';
import { cashflowForecast, monthlyData } from '@/lib/mockData';

export default function CashflowPage() {
  const currentCash = 4520;
  const nextMonthOutflow = 1380;
  const ratio = Math.round((nextMonthOutflow / currentCash) * 100);
  const riskLevel = ratio > 80 ? '危険' : ratio > 60 ? '注意' : '安全';
  const riskColor = ratio > 80 ? '#ef4444' : ratio > 60 ? '#f59e0b' : '#a3e635';

  // 6ヶ月の入出金推移データ
  const flowData = monthlyData.slice(-6).map((d) => ({
    month: d.month,
    inflow: d.revenue,
    outflow: d.cost,
    net: d.revenue - d.cost,
  }));

  return (
    <div style={{ padding: '28px 32px', maxWidth: 1200 }}>
      <div style={{ marginBottom: 24 }}>
        <h2 style={{ fontSize: 20, fontWeight: 700 }}>キャッシュフロー予測</h2>
        <p style={{ fontSize: 12, color: 'var(--text-secondary)', marginTop: 2 }}>
          3ヶ月先までの資金繰り予測
        </p>
      </div>

      {/* サマリーカード */}
      <div style={{ display: 'flex', gap: 14, marginBottom: 24, flexWrap: 'wrap' }}>
        <div
          style={{
            flex: 1,
            minWidth: 200,
            background: 'var(--bg-card)',
            border: '1px solid var(--border)',
            borderRadius: 10,
            padding: 20,
          }}
        >
          <div style={{ fontSize: 12, color: 'var(--text-secondary)', marginBottom: 8 }}>現預金残高</div>
          <div style={{ fontSize: 28, fontWeight: 800 }}>¥{currentCash.toLocaleString()}万</div>
        </div>
        <div
          style={{
            flex: 1,
            minWidth: 200,
            background: 'var(--bg-card)',
            border: '1px solid var(--border)',
            borderRadius: 10,
            padding: 20,
          }}
        >
          <div style={{ fontSize: 12, color: 'var(--text-secondary)', marginBottom: 8 }}>来月支払予定比率</div>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: 8 }}>
            <span style={{ fontSize: 28, fontWeight: 800, color: riskColor }}>{ratio}%</span>
            <span
              style={{
                fontSize: 11,
                fontWeight: 700,
                padding: '2px 8px',
                borderRadius: 4,
                background: `${riskColor}18`,
                color: riskColor,
              }}
            >
              {riskLevel}
            </span>
          </div>
        </div>
        <div
          style={{
            flex: 1,
            minWidth: 200,
            background: 'var(--bg-card)',
            border: '1px solid var(--border)',
            borderRadius: 10,
            padding: 20,
          }}
        >
          <div style={{ fontSize: 12, color: 'var(--text-secondary)', marginBottom: 8 }}>3ヶ月後残高予測</div>
          <div style={{ fontSize: 28, fontWeight: 800 }}>
            ¥{cashflowForecast[cashflowForecast.length - 1].balance.toLocaleString()}万
          </div>
        </div>
      </div>

      {/* 入出金推移グラフ */}
      <div
        style={{
          background: 'var(--bg-card)',
          border: '1px solid var(--border)',
          borderRadius: 10,
          padding: '20px 20px 12px',
          marginBottom: 24,
        }}
      >
        <div style={{ fontSize: 13, fontWeight: 600, marginBottom: 16 }}>入出金推移（万円）</div>
        <ResponsiveContainer width="100%" height={260}>
          <AreaChart data={flowData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#1a1a1a" />
            <XAxis dataKey="month" tick={{ fill: '#888', fontSize: 11 }} axisLine={false} tickLine={false} />
            <YAxis tick={{ fill: '#888', fontSize: 11 }} axisLine={false} tickLine={false} />
            <Tooltip
              contentStyle={{ background: '#1a1a1a', border: '1px solid #333', borderRadius: 8, fontSize: 12 }}
            />
            <Area type="monotone" dataKey="inflow" name="入金" stroke="#a3e635" fill="#a3e63520" strokeWidth={2} />
            <Area type="monotone" dataKey="outflow" name="出金" stroke="#ef4444" fill="#ef444420" strokeWidth={2} />
            <ReferenceLine y={0} stroke="#333" />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      {/* 予測テーブル */}
      <div
        style={{
          background: 'var(--bg-card)',
          border: '1px solid var(--border)',
          borderRadius: 10,
          overflow: 'hidden',
        }}
      >
        <div style={{ padding: '16px 20px', fontSize: 13, fontWeight: 600, borderBottom: '1px solid var(--border)' }}>
          月次キャッシュフロー予測
        </div>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
          <thead>
            <tr style={{ borderBottom: '1px solid var(--border)', background: 'var(--bg-secondary)' }}>
              {['月', '入金予測', '出金予測', '残高予測', 'ステータス'].map((h) => (
                <th key={h} style={{ padding: '10px 16px', textAlign: 'left', fontWeight: 600, fontSize: 11, color: 'var(--text-secondary)' }}>
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {cashflowForecast.map((row, i) => (
              <tr key={i} style={{ borderBottom: '1px solid var(--border)' }}>
                <td style={{ padding: '12px 16px', fontWeight: 500 }}>{row.month}</td>
                <td style={{ padding: '12px 16px', color: 'var(--accent-green)' }}>+¥{row.inflow.toLocaleString()}万</td>
                <td style={{ padding: '12px 16px', color: 'var(--accent-red)' }}>-¥{row.outflow.toLocaleString()}万</td>
                <td style={{ padding: '12px 16px', fontWeight: 600 }}>¥{row.balance.toLocaleString()}万</td>
                <td style={{ padding: '12px 16px' }}>
                  {row.warning ? (
                    <span style={{ fontSize: 11, padding: '2px 8px', borderRadius: 4, background: 'rgba(245,158,11,0.1)', color: '#f59e0b', fontWeight: 600 }}>
                      要注意
                    </span>
                  ) : (
                    <span style={{ fontSize: 11, padding: '2px 8px', borderRadius: 4, background: 'rgba(163,230,53,0.1)', color: '#a3e635', fontWeight: 600 }}>
                      正常
                    </span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
