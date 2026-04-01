'use client';

import { useState } from 'react';
import { signIn } from 'next-auth/react';
import Link from 'next/link';

export default function SignupPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    const res = await fetch('/api/auth/signup', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, email, password }),
    });

    const data = await res.json();

    if (!res.ok) {
      setError(data.error);
      setLoading(false);
      return;
    }

    // 登録成功後、自動ログイン
    const result = await signIn('credentials', {
      email,
      password,
      redirect: false,
    });

    if (result?.error) {
      setError('登録は完了しましたが、自動ログインに失敗しました。ログインページからお試しください。');
      setLoading(false);
    } else {
      window.location.href = '/pricing';
    }
  };

  const inputStyle: React.CSSProperties = {
    width: '100%',
    padding: '10px 14px',
    fontSize: 13,
    background: 'var(--bg-card)',
    border: '1px solid var(--border-light)',
    borderRadius: 8,
    color: 'var(--text-primary)',
    outline: 'none',
  };

  return (
    <div style={{ width: '100%', maxWidth: 380, padding: '0 20px' }}>
      <div style={{ textAlign: 'center', marginBottom: 32 }}>
        <h1 style={{ fontSize: 24, fontWeight: 800, marginBottom: 4 }}>
          Black<span style={{ color: 'var(--accent-green)' }}>Zero</span>
        </h1>
        <p style={{ fontSize: 13, color: 'var(--text-secondary)' }}>
          7日間無料で全機能をお試し
        </p>
      </div>

      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: 16 }}>
          <label style={{ display: 'block', fontSize: 12, color: 'var(--text-secondary)', marginBottom: 6 }}>
            お名前
          </label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="山田 太郎"
            required
            style={inputStyle}
          />
        </div>

        <div style={{ marginBottom: 16 }}>
          <label style={{ display: 'block', fontSize: 12, color: 'var(--text-secondary)', marginBottom: 6 }}>
            メールアドレス
          </label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@example.com"
            required
            style={inputStyle}
          />
        </div>

        <div style={{ marginBottom: 20 }}>
          <label style={{ display: 'block', fontSize: 12, color: 'var(--text-secondary)', marginBottom: 6 }}>
            パスワード
          </label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="6文字以上"
            required
            minLength={6}
            style={inputStyle}
          />
        </div>

        {error && (
          <div
            style={{
              padding: '10px 14px',
              marginBottom: 16,
              fontSize: 12,
              color: 'var(--accent-red)',
              background: 'rgba(239,68,68,0.08)',
              borderRadius: 8,
              border: '1px solid rgba(239,68,68,0.15)',
            }}
          >
            {error}
          </div>
        )}

        <button
          type="submit"
          disabled={loading}
          style={{
            width: '100%',
            padding: '10px 0',
            fontSize: 14,
            fontWeight: 700,
            color: '#0a0a0a',
            background: loading ? '#6b7a30' : 'var(--accent-green)',
            border: 'none',
            borderRadius: 8,
            cursor: loading ? 'not-allowed' : 'pointer',
          }}
        >
          {loading ? '登録中...' : '無料で始める'}
        </button>
      </form>

      <div style={{ textAlign: 'center', marginTop: 20 }}>
        <span style={{ fontSize: 12, color: 'var(--text-muted)' }}>
          既にアカウントをお持ちの方は{' '}
        </span>
        <Link
          href="/login"
          style={{ fontSize: 12, color: 'var(--accent-green)', textDecoration: 'none', fontWeight: 600 }}
        >
          ログイン
        </Link>
      </div>
    </div>
  );
}
