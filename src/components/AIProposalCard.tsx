'use client';

import { AIProposal } from '@/lib/types';

export default function AIProposalCard({ rank, rankColor, proposal, effect }: AIProposal) {
  return (
    <div
      style={{
        background: 'var(--bg-card)',
        border: '1px solid var(--border)',
        borderRadius: 10,
        padding: '14px 16px',
        display: 'flex',
        gap: 14,
        alignItems: 'flex-start',
      }}
    >
      <div
        style={{
          width: 30,
          height: 30,
          borderRadius: 8,
          background: `${rankColor}18`,
          color: rankColor,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontWeight: 800,
          fontSize: 14,
          flexShrink: 0,
        }}
      >
        {rank}
      </div>
      <div style={{ flex: 1 }}>
        <div style={{ fontSize: 13, fontWeight: 500, marginBottom: 4 }}>{proposal}</div>
        <div style={{ fontSize: 12, color: 'var(--text-secondary)' }}>{effect}</div>
      </div>
    </div>
  );
}
