'use client';

import {
  ComposedChart,
  Bar,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from 'recharts';
import { monthlyData, kpiData, alerts, proposals, goalRates } from '@/lib/mockData';
import KPICard from '@/components/KPICard';
import AlertCard from '@/components/AlertCard';
import AIProposalCard from '@/components/AIProposalCard';

export default function DashboardPage() {
  const riskScore = 62;

  return (
    <div style={{ padding: '28px 32px', maxWidth: 1200 }}>
      <div style={{ marginBottom: 24 }}>
        <h2 style={{ fontSize: 20, fontWeight: 700 }}>ダッシュボード</h2>
        <p style={{ fontSize: 12, color: 'var(--text-secondary)', marginTop: 2 }}>
          2026年3月度 経営サマリー
        </p>
      </div>

      {/* KPI Cards */}
      <div style={{ display: 'flex', gap: 14, marginBottom: 24, flexWrap: 'wrap' }}>
        {kpiData.map((kpi, i) => (
          <KPICard key={i} {...kpi} />
        ))}
      </div>

      {/* Chart */}
      <div
        style={{
          background: 'var(--bg-card)',
          border: '1px solid var(--border)',
          borderRadius: 10,
          padding: '20px 20px 12px',
          marginBottom: 24,
        }}
      >
        <div style={{ fontSize: 13, fontWeight: 600, marginBottom: 16 }}>月次推移（万円）</div>
        <ResponsiveContainer width="100%" height={280}>
          <ComposedChart data={monthlyData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#1a1a1a" />
            <XAxis dataKey="month" tick={{ fill: '#888', fontSize: 11 }} axisLine={false} tickLine={false} />
            <YAxis tick={{ fill: '#888', fontSize: 11 }} axisLine={false} tickLine={false} />
            <Tooltip
              contentStyle={{
                background: '#1a1a1a',
                border: '1px solid #333',
                borderRadius: 8,
                fontSize: 12,
              }}
            />
            <Legend wrapperStyle={{ fontSize: 11 }} />
            <Bar dataKey="revenue" name="売上" fill="#a3e635" radius={[3, 3, 0, 0]} barSize={20} />
            <Bar dataKey="cost" name="費用" fill="#333333" radius={[3, 3, 0, 0]} barSize={20} />
            <Line
              dataKey="profit"
              name="利益"
              stroke="#3b82f6"
              strokeWidth={2}
              dot={{ fill: '#3b82f6', r: 3 }}
            />
          </ComposedChart>
        </ResponsiveContainer>
      </div>

      {/* Risk Score + Goal Rates */}
      <div style={{ display: 'flex', gap: 14, marginBottom: 24, flexWrap: 'wrap' }}>
        {/* Risk Score */}
        <div
          style={{
            background: 'var(--bg-card)',
            border: '1px solid var(--border)',
            borderRadius: 10,
            padding: '20px',
            flex: 1,
            minWidth: 200,
          }}
        >
          <div style={{ fontSize: 13, fontWeight: 600, marginBottom: 12 }}>リスクスコア</div>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: 8 }}>
            <span
              style={{
                fontSize: 40,
                fontWeight: 800,
                color: riskScore > 70 ? 'var(--accent-red)' : riskScore > 50 ? 'var(--accent-yellow)' : 'var(--accent-green)',
              }}
            >
              {riskScore}
            </span>
            <span style={{ fontSize: 14, color: 'var(--text-secondary)' }}>/ 100</span>
          </div>
          <div
            style={{
              marginTop: 12,
              height: 6,
              background: 'var(--border)',
              borderRadius: 3,
              overflow: 'hidden',
            }}
          >
            <div
              style={{
                width: `${riskScore}%`,
                height: '100%',
                background: riskScore > 70 ? 'var(--accent-red)' : riskScore > 50 ? 'var(--accent-yellow)' : 'var(--accent-green)',
                borderRadius: 3,
                transition: 'width 0.5s',
              }}
            />
          </div>
          <div style={{ fontSize: 11, color: 'var(--text-muted)', marginTop: 8 }}>
            注意レベル — キャッシュフローに要注意
          </div>
        </div>

        {/* Goal Rates */}
        <div
          style={{
            background: 'var(--bg-card)',
            border: '1px solid var(--border)',
            borderRadius: 10,
            padding: '20px',
            flex: 1,
            minWidth: 200,
          }}
        >
          <div style={{ fontSize: 13, fontWeight: 600, marginBottom: 14 }}>目標達成率</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
            {goalRates.map((g, i) => (
              <div key={i}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
                  <span style={{ fontSize: 12, color: 'var(--text-secondary)' }}>{g.label}</span>
                  <span style={{ fontSize: 12, fontWeight: 600, color: g.color }}>{g.rate}%</span>
                </div>
                <div
                  style={{
                    height: 6,
                    background: 'var(--border)',
                    borderRadius: 3,
                    overflow: 'hidden',
                  }}
                >
                  <div
                    style={{
                      width: `${Math.min(g.rate, 100)}%`,
                      height: '100%',
                      background: g.color,
                      borderRadius: 3,
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Alerts */}
      <div style={{ marginBottom: 24 }}>
        <div style={{ fontSize: 13, fontWeight: 600, marginBottom: 10 }}>アラート</div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          {alerts.map((a, i) => (
            <AlertCard key={i} {...a} />
          ))}
        </div>
      </div>

      {/* AI Proposals */}
      <div style={{ marginBottom: 40 }}>
        <div style={{ fontSize: 13, fontWeight: 600, marginBottom: 10 }}>AI 改善提案</div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          {proposals.map((p, i) => (
            <AIProposalCard key={i} {...p} />
          ))}
        </div>
      </div>
    </div>
  );
}
