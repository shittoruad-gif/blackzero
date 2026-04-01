export type Page = 'dashboard' | 'data';

export interface MonthlyData {
  month: string;
  revenue: number;
  cost: number;
  profit: number;
}

export interface Transaction {
  id: number;
  date: string;
  name: string;
  source: 'stripe' | 'freee' | 'google_ads' | 'manual';
  amount: number;
  type: '売上' | '支出';
  category: string;
  division: string;
  status: '確認済' | '未分類';
}

export interface KPI {
  label: string;
  value: string;
  change: string;
  up: boolean;
}

export interface Alert {
  color: string;
  bg: string;
  icon: string;
  title: string;
  body: string;
}

export interface AIProposal {
  rank: string;
  rankColor: string;
  proposal: string;
  effect: string;
}

export interface GoalRate {
  label: string;
  rate: number;
  color: string;
}

export interface CashflowForecast {
  month: string;
  inflow: number;
  outflow: number;
  balance: number;
  warning?: boolean;
}

export interface ExpenseCategory {
  category: string;
  amount: number;
  prevAmount: number;
  color: string;
}

export interface ActionTask {
  id: number;
  title: string;
  source: string;
  status: '未着手' | '進行中' | '完了';
  priority: '高' | '中' | '低';
  dueDate: string;
  impact: string;
}
