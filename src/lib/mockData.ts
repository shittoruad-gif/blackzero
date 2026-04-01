import { MonthlyData, Transaction, KPI, Alert, AIProposal, GoalRate, CashflowForecast, ExpenseCategory, ActionTask } from './types';

export const monthlyData: MonthlyData[] = [
  { month: '4月', revenue: 1420, cost: 1180, profit: 240 },
  { month: '5月', revenue: 1380, cost: 1150, profit: 230 },
  { month: '6月', revenue: 1510, cost: 1200, profit: 310 },
  { month: '7月', revenue: 1460, cost: 1220, profit: 240 },
  { month: '8月', revenue: 1350, cost: 1190, profit: 160 },
  { month: '9月', revenue: 1550, cost: 1240, profit: 310 },
  { month: '10月', revenue: 1580, cost: 1260, profit: 320 },
  { month: '11月', revenue: 1620, cost: 1280, profit: 340 },
  { month: '12月', revenue: 1700, cost: 1320, profit: 380 },
  { month: '1月', revenue: 1640, cost: 1300, profit: 340 },
  { month: '2月', revenue: 1600, cost: 1310, profit: 290 },
  { month: '3月', revenue: 1680, cost: 1340, profit: 340 },
];

export const transactions: Transaction[] = [
  { id: 1, date: '2026-03-25', name: 'SaaSプラン月額（エンタープライズ）', source: 'stripe', amount: 480000, type: '売上', category: 'サブスクリプション', division: 'SaaS事業部', status: '確認済' },
  { id: 2, date: '2026-03-24', name: 'Google広告 3月配信費', source: 'google_ads', amount: 320000, type: '支出', category: '広告宣伝費', division: 'マーケティング', status: '確認済' },
  { id: 3, date: '2026-03-23', name: '経営コンサルティング報酬', source: 'freee', amount: 750000, type: '売上', category: 'コンサル売上', division: 'コンサル事業部', status: '確認済' },
  { id: 4, date: '2026-03-22', name: 'AWS利用料 3月分', source: 'freee', amount: 280000, type: '支出', category: 'インフラ費', division: 'SaaS事業部', status: '確認済' },
  { id: 5, date: '2026-03-21', name: 'ECサイト売上（物販）', source: 'stripe', amount: 190000, type: '売上', category: 'EC売上', division: 'EC事業部', status: '未分類' },
  { id: 6, date: '2026-03-20', name: 'オフィス賃料 3月分', source: 'freee', amount: 450000, type: '支出', category: '地代家賃', division: '管理部', status: '確認済' },
  { id: 7, date: '2026-03-19', name: '業務委託費（開発）', source: 'manual', amount: 600000, type: '支出', category: '外注費', division: 'SaaS事業部', status: '確認済' },
  { id: 8, date: '2026-03-18', name: 'SaaSプラン月額（スタンダード x12）', source: 'stripe', amount: 360000, type: '売上', category: 'サブスクリプション', division: 'SaaS事業部', status: '確認済' },
  { id: 9, date: '2026-03-17', name: '交通費精算 3月前半', source: 'manual', amount: 45000, type: '支出', category: '旅費交通費', division: '管理部', status: '未分類' },
  { id: 10, date: '2026-03-16', name: 'セミナー参加費収入', source: 'stripe', amount: 120000, type: '売上', category: 'セミナー売上', division: 'コンサル事業部', status: '確認済' },
];

export const kpiData: KPI[] = [
  { label: '今月売上', value: '¥1,680万', change: '+6.2%', up: true },
  { label: '今月費用', value: '¥1,340万', change: '+2.3%', up: false },
  { label: '利益率', value: '20.2%', change: '+0.8%', up: true },
  { label: 'キャッシュ', value: '¥4,520万', change: '-1.2%', up: false },
];

export const alerts: Alert[] = [
  {
    color: '#ef4444',
    bg: 'rgba(239,68,68,0.06)',
    icon: '⚠',
    title: 'キャッシュフロー警告',
    body: '来月末の支払い予定額が現預金残高の80%を超過する見込みです。資金繰り計画の見直しを推奨します。',
  },
  {
    color: '#f59e0b',
    bg: 'rgba(245,158,11,0.06)',
    icon: '📊',
    title: 'ROAS目標未達',
    body: 'Google広告のROASが目標値2.5に対して1.8で推移しています。クリエイティブの見直しを検討してください。',
  },
  {
    color: '#3b82f6',
    bg: 'rgba(59,130,246,0.06)',
    icon: '🎯',
    title: '月次売上達成率 92%',
    body: '今月の売上目標¥1,820万に対し、現在¥1,680万（達成率92%）。残り5営業日での追加受注が必要です。',
  },
];

export const proposals: AIProposal[] = [
  {
    rank: '1',
    rankColor: '#a3e635',
    proposal: 'SaaS事業のアップセル施策を強化',
    effect: '既存顧客のプランアップグレードにより月額+¥120万の収益増が見込めます。',
  },
  {
    rank: '2',
    rankColor: '#3b82f6',
    proposal: 'Google広告のターゲティング最適化',
    effect: 'コンバージョン単価を現在の¥8,500から¥6,200に改善可能と推定されます。',
  },
  {
    rank: '3',
    rankColor: '#818cf8',
    proposal: '外注費の内製化によるコスト削減',
    effect: '開発業務の一部内製化で月額¥200万の費用削減が期待できます。',
  },
];

export const goalRates: GoalRate[] = [
  { label: 'SaaS事業', rate: 92, color: '#a3e635' },
  { label: 'コンサル事業', rate: 110, color: '#3b82f6' },
  { label: 'EC事業', rate: 68, color: '#ef4444' },
];

export const sourceConfig: Record<string, { label: string; color: string }> = {
  stripe: { label: 'Stripe', color: '#818cf8' },
  freee: { label: 'freee', color: '#a3e635' },
  google_ads: { label: 'Google Ads', color: '#f59e0b' },
  manual: { label: '手動入力', color: '#888888' },
};

export const cashflowForecast: CashflowForecast[] = [
  { month: '3月（実績）', inflow: 1680, outflow: 1340, balance: 4520 },
  { month: '4月（予測）', inflow: 1620, outflow: 1380, balance: 4760 },
  { month: '5月（予測）', inflow: 1550, outflow: 1550, balance: 4760, warning: true },
  { month: '6月（予測）', inflow: 1480, outflow: 1620, balance: 4620, warning: true },
];

export const expenseCategories: ExpenseCategory[] = [
  { category: '広告宣伝費', amount: 320, prevAmount: 228, color: '#f59e0b' },
  { category: '外注費', amount: 600, prevAmount: 580, color: '#818cf8' },
  { category: '地代家賃', amount: 450, prevAmount: 450, color: '#3b82f6' },
  { category: 'インフラ費', amount: 280, prevAmount: 260, color: '#a3e635' },
  { category: '人件費', amount: 520, prevAmount: 510, color: '#ef4444' },
  { category: '旅費交通費', amount: 45, prevAmount: 62, color: '#888888' },
  { category: 'その他', amount: 125, prevAmount: 110, color: '#555555' },
];

export const actionTasks: ActionTask[] = [
  { id: 1, title: 'SaaS既存顧客へのアップセルメール配信', source: 'AI提案 #1', status: '進行中', priority: '高', dueDate: '2026-03-31', impact: '+¥120万/月' },
  { id: 2, title: 'Google広告クリエイティブA/Bテスト実施', source: 'AI提案 #2', status: '未着手', priority: '高', dueDate: '2026-04-05', impact: 'CPA ¥2,300削減' },
  { id: 3, title: '開発業務の内製化計画策定', source: 'AI提案 #3', status: '未着手', priority: '中', dueDate: '2026-04-15', impact: '-¥200万/月' },
  { id: 4, title: 'EC事業のSNS集客施策立案', source: 'アラート: EC目標未達', status: '進行中', priority: '中', dueDate: '2026-04-10', impact: '売上+15%' },
  { id: 5, title: '来月のキャッシュフロー改善策検討', source: 'アラート: CF警告', status: '未着手', priority: '高', dueDate: '2026-03-28', impact: 'リスク低減' },
  { id: 6, title: '四半期レポート作成・共有', source: '手動追加', status: '完了', priority: '低', dueDate: '2026-03-20', impact: '—' },
];
