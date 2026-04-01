'use client';

import { Alert } from '@/lib/types';

export default function AlertCard({ color, bg, icon, title, body }: Alert) {
  return (
    <div
      style={{
        background: bg,
        border: `1px solid ${color}22`,
        borderRadius: 10,
        padding: '14px 16px',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 6 }}>
        <span style={{ fontSize: 14 }}>{icon}</span>
        <span style={{ fontSize: 13, fontWeight: 600, color }}>{title}</span>
      </div>
      <div style={{ fontSize: 12, color: 'var(--text-secondary)', lineHeight: 1.6 }}>{body}</div>
    </div>
  );
}
