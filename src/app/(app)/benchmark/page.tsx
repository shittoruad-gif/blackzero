'use client';

import { useState } from 'react';

interface BenchmarkItem {
  metric: string;
  myValue: number;
  avgValue: number;
  topValue: number;
  unit: string;
  higherIsBetter: boolean;
}

const industries = ['IT・SaaS', 'コンサルティング', 'EC・通販', '広告代理', '製造業'];

const benchmarkData: Record<string, BenchmarkItem[]> = {
  'IT・SaaS': [
    { metric: '売上総利益率', myValue: 72, avgValue: 65, topValue: 82, unit: '%', higherIsBetter: true },
    { metric: '営業利益率', myValue: 20.2, avgValue: 15, topValue: 30, unit: '%', higherIsBetter: true },
    { metric: '顧客獲得コスト', myValue: 35000, avgValue: 42000, topValue: 18000, unit: '円', higherIsBetter: false },
    { metric: '月次解約率', myValue: 2.1, avgValue: 3.5, topValue: 1.2, unit: '%', higherIsBetter: false },
    { metric: 'LTV/CAC比率', myValue: 4.2, avgValue: 3.0, topValue: 6.0, unit: '倍', higherIsBetter: true },
    { metric: 'ARPU', myValue: 8500, avgValue: 6800, topValue: 15000, unit: '円', higherIsBetter: true },
    { metric: '広告費率', myValue: 12, avgValue: 18, topValue: 8, unit: '%', higherIsBetter: false },
    { metric: '人件費率', myValue: 38, avgValue: 45, topValue: 32, unit: '%', higherIsBetter: false },
  ],
  'コンサルティング': [
    { metric: '売上総利益率', myValue: 72, avgValue: 58, topValue: 75, unit: '%', higherIsBetter: true },
    { metric: '営業利益率', myValue: 20.2, avgValue: 18, topValue: 28, unit: '%', higherIsBetter: true },
    { metric: '案件単価', myValue: 350000, avgValue: 280000, topValue: 500000, unit: '円', higherIsBetter: true },
    { metric: 'リピート率', myValue: 65, avgValue: 50, topValue: 80, unit: '%', higherIsBetter: true },
    { metric: '稼働率', myValue: 78, avgValue: 70, topValue: 90, unit: '%', higherIsBetter: true },
    { metric: '人件費率', myValue: 38, avgValue: 52, topValue: 35, unit: '%', higherIsBetter: false },
  ],
  'EC・通販': [
    { metric: '売上総利益率', myValue: 72, avgValue: 40, topValue: 55, unit: '%', higherIsBetter: true },
    { metric: '営業利益率', myValue: 20.2, avgValue: 8, topValue: 18, unit: '%', higherIsBetter: true },
    { metric: 'ROAS', myValue: 380, avgValue: 300, topValue: 500, unit: '%', higherIsBetter: true },
    { metric: 'CVR', myValue: 2.8, avgValue: 2.0, topValue: 4.5, unit: '%', higherIsBetter: true },
    { metric: '客単価', myValue: 8200, avgValue: 5500, topValue: 12000, unit: '円', higherIsBetter: true },
    { metric: 'リピート購入率', myValue: 35, avgValue: 25, topValue: 50, unit: '%', higherIsBetter: true },
  ],
  '広告代理': [
    { metric: '売上総利益率', myValue: 72, avgValue: 30, topValue: 45, unit: '%', higherIsBetter: true },
    { metric: '営業利益率', myValue: 20.2, avgValue: 12, topValue: 22, unit: '%', higherIsBetter: true },
    { metric: '案件継続率', myValue: 72, avgValue: 60, topValue: 85, unit: '%', higherIsBetter: true },
    { metric: '1人あたり売上', myValue: 420, avgValue: 350, topValue: 600, unit: '万', higherIsBetter: true },
    { metric: '人件費率', myValue: 38, avgValue: 48, topValue: 35, unit: '%', higherIsBetter: false },
  ],
  '製造業': [
    { metric: '売上総利益率', myValue: 72, avgValue: 25, topValue: 38, unit: '%', higherIsBetter: true },
    { metric: '営業利益率', myValue: 20.2, avgValue: 5, topValue: 12, unit: '%', higherIsBetter: true },
    { metric: '在庫回転率', myValue: 8, avgValue: 6, topValue: 12, unit: '回', higherIsBetter: true },
    { metric: '設備稼働率', myValue: 78, avgValue: 72, topValue: 92, unit: '%', higherIsBetter: true },
    { metric: '不良率', myValue: 0.5, avgValue: 1.2, topValue: 0.2, unit: '%', higherIsBetter: false },
  ],
};

export default function BenchmarkPage() {
  const [industry, setIndustry] = useState('IT・SaaS');
  const items = benchmarkData[industry] ?? [];

  const getScore = (item: BenchmarkItem) => {
    if (item.higherIsBetter) {
      if (item.myValue >= item.topValue) return { label: '上位', color: '#a3e635' };
      if (item.myValue >= item.avgValue) return { label: '平均以上', color: '#3b82f6' };
      return { label: '要改善', color: '#ef4444' };
    } else {
      if (item.myValue <= item.topValue) return { label: '上位', color: '#a3e635' };
      if (item.myValue <= item.avgValue) return { label: '平均以上', color: '#3b82f6' };
      return { label: '要改善', color: '#ef4444' };
    }
  };

  const overallScore = items.reduce((sum, item) => {
    const s = getScore(item);
    return sum + (s.label === '上位' ? 3 : s.label === '平均以上' ? 2 : 1);
  }, 0);
  const maxScore = items.length * 3;
  const scorePercent = Math.round((overallScore / maxScore) * 100);

  return (
    <div style={{ padding: '28px 32px', maxWidth: 900 }}>
      <div style={{ marginBottom: 24 }}>
        <h2 style={{ fontSize: 20, fontWeight: 700 }}>競合ベンチマーク</h2>
        <p style={{ fontSize: 12, color: 'var(--text-secondary)', marginTop: 2 }}>
          同業種・同規模の平均値と比較して自社の立ち位置を把握
        </p>
      </div>

      {/* 業種選択 */}
      <div style={{ display: 'flex', gap: 8, marginBottom: 20, flexWrap: 'wrap' }}>
        {industries.map((ind) => (
          <button
            key={ind}
            onClick={() => setIndustry(ind)}
            style={{
              padding: '6px 14px', fontSize: 12, fontWeight: 600, borderRadius: 6, border: 'none', cursor: 'pointer',
              background: industry === ind ? 'var(--accent-green)' : 'var(--bg-card)',
              color: industry === ind ? '#0a0a0a' : 'var(--text-secondary)',
            }}
          >
            {ind}
          </button>
        ))}
      </div>

      {/* 総合スコア */}
      <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: 10, padding: 24, marginBottom: 20, textAlign: 'center' }}>
        <div style={{ fontSize: 13, color: 'var(--text-muted)', marginBottom: 8 }}>総合スコア（{industry}）</div>
        <div style={{ fontSize: 48, fontWeight: 900, color: scorePercent >= 80 ? '#a3e635' : scorePercent >= 60 ? '#3b82f6' : '#ef4444' }}>
          {scorePercent}
        </div>
        <div style={{ fontSize: 12, color: 'var(--text-secondary)', marginTop: 4 }}>/ 100点</div>
        <div style={{ width: '60%', margin: '12px auto 0', height: 6, background: 'var(--border)', borderRadius: 3, overflow: 'hidden' }}>
          <div style={{ width: `${scorePercent}%`, height: '100%', background: scorePercent >= 80 ? '#a3e635' : scorePercent >= 60 ? '#3b82f6' : '#ef4444', borderRadius: 3 }} />
        </div>
      </div>

      {/* 指標一覧 */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
        {items.map((item, i) => {
          const score = getScore(item);
          const formatVal = (v: number) => v >= 10000 ? `${(v / 10000).toFixed(1)}万` : v.toLocaleString();
          return (
            <div key={i} style={{ background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: 10, padding: '16px 20px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                  <span style={{ fontSize: 14, fontWeight: 600 }}>{item.metric}</span>
                  <span style={{ fontSize: 10, fontWeight: 700, padding: '2px 8px', borderRadius: 4, background: `${score.color}18`, color: score.color }}>
                    {score.label}
                  </span>
                </div>
                <div style={{ fontSize: 20, fontWeight: 800 }}>
                  {formatVal(item.myValue)}<span style={{ fontSize: 12, color: 'var(--text-muted)' }}>{item.unit}</span>
                </div>
              </div>

              {/* 比較バー */}
              <div style={{ display: 'grid', gridTemplateColumns: '80px 1fr 60px', gap: 8, fontSize: 11 }}>
                <span style={{ color: 'var(--text-muted)' }}>業界平均</span>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <div style={{ flex: 1, height: 4, background: 'var(--border)', borderRadius: 2, overflow: 'hidden' }}>
                    <div style={{ width: `${Math.min(100, (item.avgValue / Math.max(item.myValue, item.avgValue, item.topValue)) * 100)}%`, height: '100%', background: '#555', borderRadius: 2 }} />
                  </div>
                </div>
                <span style={{ color: 'var(--text-secondary)', textAlign: 'right' }}>{formatVal(item.avgValue)}{item.unit}</span>

                <span style={{ color: 'var(--text-muted)' }}>上位企業</span>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <div style={{ flex: 1, height: 4, background: 'var(--border)', borderRadius: 2, overflow: 'hidden' }}>
                    <div style={{ width: `${Math.min(100, (item.topValue / Math.max(item.myValue, item.avgValue, item.topValue)) * 100)}%`, height: '100%', background: '#a3e635', borderRadius: 2 }} />
                  </div>
                </div>
                <span style={{ color: '#a3e635', textAlign: 'right' }}>{formatVal(item.topValue)}{item.unit}</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
