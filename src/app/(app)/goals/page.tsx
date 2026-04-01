'use client';

import { useState } from 'react';
import { goalRates, monthlyData } from '@/lib/mockData';

interface Goal {
  id: number;
  division: string;
  target: number;
  current: number;
  color: string;
}

export default function GoalsPage() {
  const currentDay = 26;
  const totalDays = 31;
  const dayProgress = Math.round((currentDay / totalDays) * 100);

  const [goals] = useState<Goal[]>(
    goalRates.map((g, i) => ({
      id: i + 1,
      division: g.label,
      target: g.label === 'SaaS事業' ? 820 : g.label === 'コンサル事業' ? 630 : 370,
      current: g.label === 'SaaS事業' ? 754 : g.label === 'コンサル事業' ? 693 : 252,
      color: g.color,
    }))
  );

  const totalTarget = goals.reduce((s, g) => s + g.target, 0);
  const totalCurrent = goals.reduce((s, g) => s + g.current, 0);
  const totalRate = Math.round((totalCurrent / totalTarget) * 100);

  // 日次ペースデータ
  const expectedPace = monthlyData[monthlyData.length - 1].revenue / totalDays;
  const actualPace = totalCurrent / currentDay;
  const paceStatus = actualPace >= expectedPace ? '順調' : '遅延';
  const paceColor = actualPace >= expectedPace ? '#a3e635' : '#f59e0b';

  return (
    <div style={{ padding: '28px 32px', maxWidth: 1200 }}>
      <div style={{ marginBottom: 24 }}>
        <h2 style={{ fontSize: 20, fontWeight: 700 }}>目標 & 進捗トラッカー</h2>
        <p style={{ fontSize: 12, color: 'var(--text-secondary)', marginTop: 2 }}>
          2026年3月度 — {currentDay}日経過 / {totalDays}日
        </p>
      </div>

      {/* サマリー */}
      <div style={{ display: 'flex', gap: 14, marginBottom: 24, flexWrap: 'wrap' }}>
        <div style={{ flex: 1, minWidth: 200, background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: 10, padding: 20 }}>
          <div style={{ fontSize: 12, color: 'var(--text-secondary)', marginBottom: 8 }}>全社達成率</div>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: 8 }}>
            <span style={{ fontSize: 32, fontWeight: 800, color: totalRate >= 100 ? '#a3e635' : totalRate >= 80 ? '#f59e0b' : '#ef4444' }}>
              {totalRate}%
            </span>
            <span style={{ fontSize: 13, color: 'var(--text-secondary)' }}>
              ¥{totalCurrent.toLocaleString()}万 / ¥{totalTarget.toLocaleString()}万
            </span>
          </div>
          <div style={{ marginTop: 10, height: 6, background: 'var(--border)', borderRadius: 3, overflow: 'hidden' }}>
            <div style={{ width: `${Math.min(totalRate, 100)}%`, height: '100%', background: totalRate >= 100 ? '#a3e635' : '#f59e0b', borderRadius: 3, transition: 'width 0.5s' }} />
          </div>
        </div>

        <div style={{ flex: 1, minWidth: 200, background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: 10, padding: 20 }}>
          <div style={{ fontSize: 12, color: 'var(--text-secondary)', marginBottom: 8 }}>日次ペース</div>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: 8 }}>
            <span style={{ fontSize: 24, fontWeight: 800 }}>¥{Math.round(actualPace).toLocaleString()}万</span>
            <span style={{ fontSize: 12, color: 'var(--text-secondary)' }}>/ 日</span>
          </div>
          <div style={{ fontSize: 12, color: paceColor, marginTop: 6, fontWeight: 600 }}>
            {paceStatus} — 目標ペース ¥{Math.round(expectedPace).toLocaleString()}万/日
          </div>
        </div>

        <div style={{ flex: 1, minWidth: 200, background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: 10, padding: 20 }}>
          <div style={{ fontSize: 12, color: 'var(--text-secondary)', marginBottom: 8 }}>月進捗</div>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: 8 }}>
            <span style={{ fontSize: 24, fontWeight: 800 }}>{dayProgress}%</span>
            <span style={{ fontSize: 12, color: 'var(--text-secondary)' }}>経過</span>
          </div>
          <div style={{ fontSize: 12, color: 'var(--text-muted)', marginTop: 6 }}>
            残り{totalDays - currentDay}営業日
          </div>
        </div>
      </div>

      {/* 事業別目標 */}
      <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: 10, padding: 20, marginBottom: 24 }}>
        <div style={{ fontSize: 13, fontWeight: 600, marginBottom: 16 }}>事業別 目標達成状況</div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
          {goals.map((g) => {
            const rate = Math.round((g.current / g.target) * 100);
            const remaining = g.target - g.current;
            const dailyNeeded = remaining > 0 ? Math.ceil(remaining / (totalDays - currentDay)) : 0;

            return (
              <div key={g.id}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    <span style={{ fontSize: 14, fontWeight: 600 }}>{g.division}</span>
                    <span style={{ fontSize: 11, color: 'var(--text-muted)' }}>
                      ¥{g.current.toLocaleString()}万 / ¥{g.target.toLocaleString()}万
                    </span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                    <span style={{ fontSize: 14, fontWeight: 700, color: g.color }}>{rate}%</span>
                    {remaining > 0 && (
                      <span style={{ fontSize: 11, color: 'var(--text-muted)' }}>
                        残¥{remaining.toLocaleString()}万（¥{dailyNeeded.toLocaleString()}万/日必要）
                      </span>
                    )}
                    {remaining <= 0 && (
                      <span style={{ fontSize: 11, color: '#a3e635', fontWeight: 600 }}>達成</span>
                    )}
                  </div>
                </div>
                <div style={{ height: 8, background: 'var(--border)', borderRadius: 4, overflow: 'hidden', position: 'relative' }}>
                  <div
                    style={{
                      position: 'absolute',
                      left: `${dayProgress}%`,
                      top: 0,
                      bottom: 0,
                      width: 2,
                      background: '#ffffff40',
                    }}
                  />
                  <div style={{ width: `${Math.min(rate, 100)}%`, height: '100%', background: g.color, borderRadius: 4, transition: 'width 0.5s' }} />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
