'use client';

import { useState } from 'react';
import { actionTasks } from '@/lib/mockData';
import type { ActionTask } from '@/lib/types';

export default function TasksPage() {
  const [tasks, setTasks] = useState<ActionTask[]>(actionTasks);
  const [filter, setFilter] = useState<'全て' | '未着手' | '進行中' | '完了'>('全て');

  const filtered = filter === '全て' ? tasks : tasks.filter((t) => t.status === filter);

  const counts = {
    total: tasks.length,
    todo: tasks.filter((t) => t.status === '未着手').length,
    doing: tasks.filter((t) => t.status === '進行中').length,
    done: tasks.filter((t) => t.status === '完了').length,
  };

  const cycleStatus = (task: ActionTask) => {
    const next: Record<string, ActionTask['status']> = {
      '未着手': '進行中',
      '進行中': '完了',
      '完了': '未着手',
    };
    setTasks((prev) =>
      prev.map((t) => (t.id === task.id ? { ...t, status: next[t.status] } : t))
    );
  };

  const statusStyle = (status: ActionTask['status']): React.CSSProperties => {
    const map = {
      '未着手': { bg: 'rgba(136,136,136,0.1)', color: '#888' },
      '進行中': { bg: 'rgba(59,130,246,0.1)', color: '#3b82f6' },
      '完了': { bg: 'rgba(163,230,53,0.1)', color: '#a3e635' },
    };
    const s = map[status];
    return {
      padding: '3px 10px',
      fontSize: 11,
      fontWeight: 600,
      borderRadius: 4,
      background: s.bg,
      color: s.color,
      border: 'none',
      cursor: 'pointer',
    };
  };

  const priorityColor = (p: ActionTask['priority']) =>
    p === '高' ? '#ef4444' : p === '中' ? '#f59e0b' : '#888';

  const filterButtons: Array<'全て' | '未着手' | '進行中' | '完了'> = ['全て', '未着手', '進行中', '完了'];

  return (
    <div style={{ padding: '28px 32px', maxWidth: 1200 }}>
      <div style={{ marginBottom: 24 }}>
        <h2 style={{ fontSize: 20, fontWeight: 700 }}>アクション管理</h2>
        <p style={{ fontSize: 12, color: 'var(--text-secondary)', marginTop: 2 }}>
          AI提案・アラートから生成されたタスク
        </p>
      </div>

      {/* カウンター */}
      <div style={{ display: 'flex', gap: 14, marginBottom: 24, flexWrap: 'wrap' }}>
        {[
          { label: '全タスク', count: counts.total, color: 'var(--text-primary)' },
          { label: '未着手', count: counts.todo, color: '#888' },
          { label: '進行中', count: counts.doing, color: '#3b82f6' },
          { label: '完了', count: counts.done, color: '#a3e635' },
        ].map((c) => (
          <div key={c.label} style={{ flex: 1, minWidth: 140, background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: 10, padding: '16px 20px' }}>
            <div style={{ fontSize: 11, color: 'var(--text-secondary)', marginBottom: 4 }}>{c.label}</div>
            <div style={{ fontSize: 24, fontWeight: 800, color: c.color }}>{c.count}</div>
          </div>
        ))}
      </div>

      {/* フィルター */}
      <div style={{ display: 'flex', gap: 6, marginBottom: 16 }}>
        {filterButtons.map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            style={{
              padding: '6px 14px',
              fontSize: 12,
              fontWeight: 600,
              border: 'none',
              borderRadius: 6,
              cursor: 'pointer',
              color: filter === f ? '#0a0a0a' : 'var(--text-secondary)',
              background: filter === f ? 'var(--accent-green)' : 'var(--bg-card)',
            }}
          >
            {f}
          </button>
        ))}
      </div>

      {/* タスクリスト */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
        {filtered.map((task) => (
          <div
            key={task.id}
            style={{
              background: 'var(--bg-card)',
              border: '1px solid var(--border)',
              borderRadius: 10,
              padding: '16px 20px',
              display: 'flex',
              alignItems: 'center',
              gap: 16,
              opacity: task.status === '完了' ? 0.5 : 1,
            }}
          >
            <button onClick={() => cycleStatus(task)} style={statusStyle(task.status)}>
              {task.status}
            </button>

            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 14, fontWeight: 600, textDecoration: task.status === '完了' ? 'line-through' : 'none' }}>
                {task.title}
              </div>
              <div style={{ fontSize: 11, color: 'var(--text-muted)', marginTop: 3, display: 'flex', gap: 12 }}>
                <span>{task.source}</span>
                <span>期限: {task.dueDate}</span>
              </div>
            </div>

            <div style={{ textAlign: 'right' }}>
              <span
                style={{
                  fontSize: 10,
                  fontWeight: 700,
                  padding: '2px 6px',
                  borderRadius: 3,
                  color: priorityColor(task.priority),
                  background: `${priorityColor(task.priority)}15`,
                }}
              >
                {task.priority}
              </span>
              <div style={{ fontSize: 12, color: 'var(--accent-green)', marginTop: 4, fontWeight: 600 }}>
                {task.impact}
              </div>
            </div>
          </div>
        ))}
      </div>

      {filtered.length === 0 && (
        <div style={{ textAlign: 'center', padding: 40, color: 'var(--text-muted)', fontSize: 13 }}>
          該当するタスクがありません
        </div>
      )}
    </div>
  );
}
