'use client';

import { KPI } from '@/lib/types';

export default function KPICard({ label, value, change, up }: KPI) {
  return (
    <div
      style={{
        background: 'var(--bg-card)',
        border: '1px solid var(--border)',
        borderRadius: 10,
        padding: '18px 20px',
        flex: 1,
        minWidth: 180,
      }}
    >
      <div style={{ fontSize: 11, color: 'var(--text-secondary)', marginBottom: 6 }}>{label}</div>
      <div style={{ fontSize: 22, fontWeight: 700, marginBottom: 4 }}>{value}</div>
      <div
        style={{
          fontSize: 12,
          fontWeight: 600,
          color: up ? 'var(--accent-green)' : 'var(--accent-red)',
        }}
      >
        {change}
      </div>
    </div>
  );
}
