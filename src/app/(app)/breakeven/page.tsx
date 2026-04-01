'use client';

import { useState } from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  ReferenceLine,
} from 'recharts';

export default function BreakevenPage() {
  const [fixedCost, setFixedCost] = useState(850);
  const [unitPrice, setUnitPrice] = useState(5);
  const [variableCostRate, setVariableCostRate] = useState(30);

  const variableCostPerUnit = unitPrice * (variableCostRate / 100);
  const contributionMargin = unitPrice - variableCostPerUnit;
  const breakevenUnits = contributionMargin > 0 ? Math.ceil(fixedCost / contributionMargin) : Infinity;
  const breakevenRevenue = breakevenUnits * unitPrice;

  // グラフデータ生成
  const maxUnits = Math.max(breakevenUnits * 1.8, 100);
  const step = Math.max(Math.floor(maxUnits / 20), 1);
  const chartData = [];
  for (let u = 0; u <= maxUnits; u += step) {
    chartData.push({
      units: u,
      revenue: u * unitPrice,
      totalCost: fixedCost + u * variableCostPerUnit,
      profit: u * unitPrice - (fixedCost + u * variableCostPerUnit),
    });
  }

  const inputStyle: React.CSSProperties = {
    width: '100%',
    padding: '8px 12px',
    fontSize: 13,
    background: 'var(--bg-primary)',
    border: '1px solid var(--border-light)',
    borderRadius: 6,
    color: 'var(--text-primary)',
    outline: 'none',
  };

  return (
    <div style={{ padding: '28px 32px', maxWidth: 1200 }}>
      <div style={{ marginBottom: 24 }}>
        <h2 style={{ fontSize: 20, fontWeight: 700 }}>損益分岐点シミュレーター</h2>
        <p style={{ fontSize: 12, color: 'var(--text-secondary)', marginTop: 2 }}>
          固定費・変動費から黒字化ラインを算出
        </p>
      </div>

      <div style={{ display: 'flex', gap: 20, flexWrap: 'wrap' }}>
        {/* 入力パネル */}
        <div
          style={{
            flex: '0 0 280px',
            background: 'var(--bg-card)',
            border: '1px solid var(--border)',
            borderRadius: 10,
            padding: 20,
          }}
        >
          <div style={{ fontSize: 13, fontWeight: 600, marginBottom: 16 }}>パラメータ設定</div>

          <div style={{ marginBottom: 14 }}>
            <label style={{ display: 'block', fontSize: 12, color: 'var(--text-secondary)', marginBottom: 4 }}>
              固定費（万円/月）
            </label>
            <input
              type="number"
              value={fixedCost}
              onChange={(e) => setFixedCost(Number(e.target.value))}
              style={inputStyle}
            />
          </div>

          <div style={{ marginBottom: 14 }}>
            <label style={{ display: 'block', fontSize: 12, color: 'var(--text-secondary)', marginBottom: 4 }}>
              単価（万円/件）
            </label>
            <input
              type="number"
              value={unitPrice}
              onChange={(e) => setUnitPrice(Number(e.target.value))}
              style={inputStyle}
              step="0.1"
            />
          </div>

          <div style={{ marginBottom: 20 }}>
            <label style={{ display: 'block', fontSize: 12, color: 'var(--text-secondary)', marginBottom: 4 }}>
              変動費率（%）
            </label>
            <input
              type="number"
              value={variableCostRate}
              onChange={(e) => setVariableCostRate(Number(e.target.value))}
              style={inputStyle}
              min={0}
              max={99}
            />
          </div>

          <div
            style={{
              padding: 16,
              background: 'var(--bg-primary)',
              borderRadius: 8,
              border: '1px solid var(--border)',
            }}
          >
            <div style={{ fontSize: 11, color: 'var(--text-muted)', marginBottom: 8 }}>損益分岐点</div>
            {breakevenUnits === Infinity ? (
              <div style={{ fontSize: 16, fontWeight: 700, color: 'var(--accent-red)' }}>
                算出不可（変動費率を確認）
              </div>
            ) : (
              <>
                <div style={{ fontSize: 24, fontWeight: 800, color: 'var(--accent-green)' }}>
                  {breakevenUnits.toLocaleString()}件
                </div>
                <div style={{ fontSize: 13, color: 'var(--text-secondary)', marginTop: 4 }}>
                  売上 ¥{breakevenRevenue.toLocaleString()}万で黒字化
                </div>
              </>
            )}
          </div>
        </div>

        {/* グラフ */}
        <div
          style={{
            flex: 1,
            minWidth: 400,
            background: 'var(--bg-card)',
            border: '1px solid var(--border)',
            borderRadius: 10,
            padding: '20px 20px 12px',
          }}
        >
          <div style={{ fontSize: 13, fontWeight: 600, marginBottom: 16 }}>損益分岐点チャート（万円）</div>
          <ResponsiveContainer width="100%" height={360}>
            <LineChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#1a1a1a" />
              <XAxis
                dataKey="units"
                tick={{ fill: '#888', fontSize: 11 }}
                axisLine={false}
                tickLine={false}
                label={{ value: '件数', position: 'insideBottomRight', offset: -5, fill: '#666', fontSize: 11 }}
              />
              <YAxis tick={{ fill: '#888', fontSize: 11 }} axisLine={false} tickLine={false} />
              <Tooltip
                contentStyle={{ background: '#1a1a1a', border: '1px solid #333', borderRadius: 8, fontSize: 12 }}
              />
              <Line type="monotone" dataKey="revenue" name="売上" stroke="#a3e635" strokeWidth={2} dot={false} />
              <Line type="monotone" dataKey="totalCost" name="総費用" stroke="#ef4444" strokeWidth={2} dot={false} />
              <Line type="monotone" dataKey="profit" name="利益" stroke="#3b82f6" strokeWidth={2} dot={false} strokeDasharray="5 5" />
              {breakevenUnits !== Infinity && (
                <ReferenceLine x={breakevenUnits} stroke="#a3e635" strokeDasharray="3 3" label={{ value: 'BEP', fill: '#a3e635', fontSize: 11 }} />
              )}
              <ReferenceLine y={0} stroke="#444" />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
