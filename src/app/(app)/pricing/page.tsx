'use client';

import { useSession } from 'next-auth/react';
import { useState } from 'react';
import { PLANS } from '@/lib/auth-types';

export default function PricingPage() {
  const { data: session } = useSession();
  const currentPlan = (session?.user as { plan?: string } | undefined)?.plan ?? 'free';
  const [loadingPlan, setLoadingPlan] = useState<string | null>(null);
  const [yearly, setYearly] = useState(false);
  const [couponCode, setCouponCode] = useState('');
  const [couponLoading, setCouponLoading] = useState(false);
  const [couponResult, setCouponResult] = useState<{
    valid?: boolean;
    benefit?: string;
    error?: string;
    applied?: boolean;
    newPlan?: string;
    message?: string;
  } | null>(null);

  const handleSubscribe = async (planId: string) => {
    if (!session) {
      window.location.href = '/login';
      return;
    }
    if (planId === 'free') return;

    setLoadingPlan(planId);
    try {
      const res = await fetch('/api/stripe/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ planId }),
      });
      const data = await res.json();
      if (data.url) {
        window.location.href = data.url;
      } else {
        alert(data.error || '決済セッションの作成に失敗しました');
      }
    } catch {
      alert('エラーが発生しました');
    } finally {
      setLoadingPlan(null);
    }
  };

  const individualPlans = PLANS.filter((p) =>
    ['free', 'starter', 'pro'].includes(p.id)
  );
  const corporatePlans = PLANS.filter((p) =>
    ['business', 'enterprise'].includes(p.id)
  );

  const renderCard = (plan: (typeof PLANS)[number]) => {
    const isCurrent = currentPlan === plan.id;
    const isRecommended = plan.recommended;
    const displayPrice = yearly && plan.priceYearly ? plan.priceYearly : plan.price;

    return (
      <div
        key={plan.id}
        style={{
          flex: '1 1 220px',
          maxWidth: 280,
          background: 'var(--bg-card)',
          border: isRecommended
            ? '2px solid var(--accent-green)'
            : '1px solid var(--border)',
          borderRadius: 14,
          padding: '28px 22px',
          position: 'relative',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        {isRecommended && (
          <div
            style={{
              position: 'absolute',
              top: -12,
              left: '50%',
              transform: 'translateX(-50%)',
              padding: '3px 14px',
              fontSize: 11,
              fontWeight: 700,
              color: '#0a0a0a',
              background: 'var(--accent-green)',
              borderRadius: 20,
              whiteSpace: 'nowrap',
            }}
          >
            おすすめ
          </div>
        )}

        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 2 }}>
          <span style={{ fontSize: 15, fontWeight: 700 }}>{plan.name}</span>
          <span
            style={{
              fontSize: 10,
              fontWeight: 700,
              padding: '2px 6px',
              borderRadius: 4,
              background: plan.priceMonthly > 0 ? 'rgba(59,130,246,0.12)' : 'transparent',
              color: plan.priceMonthly > 0 ? '#3b82f6' : 'transparent',
              visibility: plan.priceMonthly > 0 ? 'visible' : 'hidden',
            }}
          >
            7日間無料
          </span>
        </div>
        <div
          style={{
            fontSize: 11,
            color: 'var(--text-muted)',
            marginBottom: 12,
          }}
        >
          {plan.target}
        </div>

        <div style={{ display: 'flex', alignItems: 'baseline', gap: 4, marginBottom: 4 }}>
          <span style={{ fontSize: 28, fontWeight: 800 }}>{displayPrice.replace('/月', '')}</span>
          {plan.priceMonthly > 0 && (
            <span style={{ fontSize: 12, color: 'var(--text-secondary)' }}>/ 月</span>
          )}
        </div>

        {yearly && plan.priceYearly && (
          <div style={{ fontSize: 11, color: 'var(--accent-green)', marginBottom: 12 }}>
            年払いでお得
          </div>
        )}
        {!yearly && plan.priceMonthly > 0 && (
          <div style={{ fontSize: 11, color: 'var(--text-muted)', marginBottom: 12 }}>
            月払い
          </div>
        )}
        {plan.priceMonthly === 0 && <div style={{ marginBottom: 12 }} />}

        <ul style={{ listStyle: 'none', flex: 1, marginBottom: 20 }}>
          {plan.features.map((f, i) => (
            <li
              key={i}
              style={{
                fontSize: 12,
                color: 'var(--text-secondary)',
                padding: '4px 0',
                display: 'flex',
                alignItems: 'flex-start',
                gap: 7,
              }}
            >
              <span style={{ color: 'var(--accent-green)', fontSize: 13, marginTop: 1 }}>&#10003;</span>
              {f}
            </li>
          ))}
        </ul>

        <button
          onClick={() => handleSubscribe(plan.id)}
          disabled={isCurrent || loadingPlan === plan.id}
          style={{
            width: '100%',
            padding: '9px 0',
            fontSize: 13,
            fontWeight: 700,
            border: 'none',
            borderRadius: 8,
            cursor: isCurrent ? 'default' : 'pointer',
            color: isRecommended && !isCurrent ? '#0a0a0a' : 'var(--text-primary)',
            background: isCurrent
              ? 'var(--border)'
              : isRecommended
              ? 'var(--accent-green)'
              : 'var(--bg-hover)',
            transition: 'opacity 0.15s',
            opacity: loadingPlan === plan.id ? 0.6 : 1,
          }}
        >
          {isCurrent
            ? '現在のプラン'
            : loadingPlan === plan.id
            ? '処理中...'
            : plan.cta}
        </button>
      </div>
    );
  };

  return (
    <div style={{ padding: '40px 32px', maxWidth: 1100, margin: '0 auto' }}>
      <div style={{ textAlign: 'center', marginBottom: 32 }}>
        <h2 style={{ fontSize: 24, fontWeight: 800, marginBottom: 8 }}>料金プラン</h2>
        <p style={{ fontSize: 14, color: 'var(--text-secondary)', marginBottom: 20 }}>
          ビジネスの規模に合わせて選べるプラン
        </p>

        {/* 月払い / 年払い トグル */}
        <div
          style={{
            display: 'inline-flex',
            background: 'var(--bg-card)',
            border: '1px solid var(--border)',
            borderRadius: 8,
            padding: 3,
          }}
        >
          <button
            onClick={() => setYearly(false)}
            style={{
              padding: '6px 18px',
              fontSize: 12,
              fontWeight: 600,
              border: 'none',
              borderRadius: 6,
              cursor: 'pointer',
              color: !yearly ? '#0a0a0a' : 'var(--text-secondary)',
              background: !yearly ? 'var(--accent-green)' : 'transparent',
              transition: 'all 0.15s',
            }}
          >
            月払い
          </button>
          <button
            onClick={() => setYearly(true)}
            style={{
              padding: '6px 18px',
              fontSize: 12,
              fontWeight: 600,
              border: 'none',
              borderRadius: 6,
              cursor: 'pointer',
              color: yearly ? '#0a0a0a' : 'var(--text-secondary)',
              background: yearly ? 'var(--accent-green)' : 'transparent',
              transition: 'all 0.15s',
            }}
          >
            年払い（最大20%OFF）
          </button>
        </div>
      </div>

      {/* 個人事業主向け */}
      <div style={{ marginBottom: 36 }}>
        <div
          style={{
            fontSize: 13,
            fontWeight: 600,
            color: 'var(--text-secondary)',
            marginBottom: 14,
            paddingLeft: 4,
          }}
        >
          個人事業主向け
        </div>
        <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap' }}>
          {individualPlans.map(renderCard)}
        </div>
      </div>

      {/* 法人向け */}
      <div style={{ marginBottom: 36 }}>
        <div
          style={{
            fontSize: 13,
            fontWeight: 600,
            color: 'var(--text-secondary)',
            marginBottom: 14,
            paddingLeft: 4,
          }}
        >
          法人向け
        </div>
        <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap' }}>
          {corporatePlans.map(renderCard)}
        </div>
      </div>

      {/* クーポンコード入力 */}
      <div
        style={{
          maxWidth: 520,
          margin: '0 auto 36px',
          background: 'var(--bg-card)',
          border: '1px solid var(--border)',
          borderRadius: 12,
          padding: '24px',
        }}
      >
        <div style={{ fontSize: 14, fontWeight: 700, marginBottom: 4 }}>クーポンコード</div>
        <div style={{ fontSize: 12, color: 'var(--text-muted)', marginBottom: 16 }}>
          お持ちのクーポンコードを入力すると、特別料金や無料プランが適用されます
        </div>

        <div style={{ display: 'flex', gap: 8 }}>
          <input
            type="text"
            value={couponCode}
            onChange={(e) => {
              setCouponCode(e.target.value.toUpperCase());
              setCouponResult(null);
            }}
            placeholder="例: LAUNCH50"
            style={{
              flex: 1,
              padding: '10px 14px',
              fontSize: 14,
              fontWeight: 600,
              letterSpacing: '0.05em',
              background: 'var(--bg-primary)',
              border: '1px solid var(--border-light)',
              borderRadius: 8,
              color: 'var(--text-primary)',
              outline: 'none',
            }}
            onFocus={(e) => (e.currentTarget.style.borderColor = 'var(--accent-green)')}
            onBlur={(e) => (e.currentTarget.style.borderColor = 'var(--border-light)')}
          />
          <button
            onClick={async () => {
              if (!couponCode.trim()) return;
              setCouponLoading(true);
              setCouponResult(null);
              try {
                const res = await fetch('/api/coupon/validate', {
                  method: 'POST',
                  headers: { 'Content-Type': 'application/json' },
                  body: JSON.stringify({ code: couponCode }),
                });
                const data = await res.json();
                setCouponResult(data);
              } catch {
                setCouponResult({ error: 'エラーが発生しました' });
              } finally {
                setCouponLoading(false);
              }
            }}
            disabled={couponLoading || !couponCode.trim()}
            style={{
              padding: '10px 20px',
              fontSize: 13,
              fontWeight: 700,
              border: 'none',
              borderRadius: 8,
              cursor: couponLoading || !couponCode.trim() ? 'not-allowed' : 'pointer',
              color: 'var(--text-primary)',
              background: 'var(--bg-hover)',
              opacity: couponLoading ? 0.6 : 1,
              whiteSpace: 'nowrap',
            }}
          >
            {couponLoading ? '確認中...' : '確認'}
          </button>
        </div>

        {/* 検証結果 */}
        {couponResult && (
          <div style={{ marginTop: 12 }}>
            {couponResult.valid ? (
              <div
                style={{
                  padding: '12px 16px',
                  background: 'rgba(163,230,53,0.08)',
                  border: '1px solid rgba(163,230,53,0.2)',
                  borderRadius: 8,
                }}
              >
                <div style={{ fontSize: 13, fontWeight: 700, color: '#a3e635', marginBottom: 4 }}>
                  適用可能
                </div>
                <div style={{ fontSize: 12, color: 'var(--text-secondary)' }}>
                  {couponResult.benefit}
                </div>
                {!couponResult.applied && (
                  <button
                    onClick={async () => {
                      setCouponLoading(true);
                      try {
                        const res = await fetch('/api/coupon/redeem', {
                          method: 'POST',
                          headers: { 'Content-Type': 'application/json' },
                          body: JSON.stringify({ code: couponCode }),
                        });
                        const data = await res.json();
                        if (data.success) {
                          setCouponResult({
                            valid: true,
                            applied: true,
                            message: data.message,
                            newPlan: data.newPlan,
                            benefit: couponResult.benefit,
                          });
                          if (data.newPlan) {
                            // プランが変わった場合はページリロードでセッション更新
                            setTimeout(() => window.location.reload(), 1500);
                          }
                        } else {
                          setCouponResult({ error: data.error || '適用に失敗しました' });
                        }
                      } catch {
                        setCouponResult({ error: 'エラーが発生しました' });
                      } finally {
                        setCouponLoading(false);
                      }
                    }}
                    disabled={couponLoading}
                    style={{
                      marginTop: 10,
                      padding: '8px 20px',
                      fontSize: 12,
                      fontWeight: 700,
                      color: '#0a0a0a',
                      background: '#a3e635',
                      border: 'none',
                      borderRadius: 6,
                      cursor: 'pointer',
                    }}
                  >
                    {couponLoading ? '適用中...' : 'このクーポンを適用する'}
                  </button>
                )}
                {couponResult.applied && (
                  <div style={{ marginTop: 8, fontSize: 12, color: '#a3e635', fontWeight: 600 }}>
                    {couponResult.message}
                  </div>
                )}
              </div>
            ) : (
              <div
                style={{
                  padding: '12px 16px',
                  background: 'rgba(239,68,68,0.08)',
                  border: '1px solid rgba(239,68,68,0.15)',
                  borderRadius: 8,
                  fontSize: 12,
                  color: '#ef4444',
                }}
              >
                {couponResult.error}
              </div>
            )}
          </div>
        )}
      </div>

      <div
        style={{
          textAlign: 'center',
          marginTop: 16,
          fontSize: 12,
          color: 'var(--text-muted)',
        }}
      >
        全プラン7日間無料でお試しいただけます。トライアル期間中はいつでもキャンセル可能です。
      </div>
    </div>
  );
}
