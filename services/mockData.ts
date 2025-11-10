import { Transaction, Category, AnalyticsData } from '@/types';

export const mockTransactions: Transaction[] = [
  {
    id: '1',
    title: 'Salary',
    amount: 5000,
    category: 'Income',
    date: '2025-11-01',
    type: 'income',
    description: 'Monthly salary payment',
  },
  {
    id: '2',
    title: 'Grocery Shopping',
    amount: 250,
    category: 'Food',
    date: '2025-11-05',
    type: 'expense',
    description: 'Weekly groceries at Walmart',
  },
  {
    id: '3',
    title: 'Electricity Bill',
    amount: 120,
    category: 'Utilities',
    date: '2025-11-08',
    type: 'expense',
    description: 'Monthly electricity payment',
  },
  {
    id: '4',
    title: 'Freelance Project',
    amount: 800,
    category: 'Income',
    date: '2025-11-10',
    type: 'income',
    description: 'Web development project',
  },
  {
    id: '5',
    title: 'Restaurant',
    amount: 85,
    category: 'Food',
    date: '2025-11-10',
    type: 'expense',
    description: 'Dinner with friends',
  },
];

export const mockCategories: Category[] = [
  { name: 'Food', spent: 335, budget: 500, color: '#ef4444', icon: '🍔' },
  { name: 'Transport', spent: 180, budget: 300, color: '#3b82f6', icon: '🚗' },
  { name: 'Utilities', spent: 120, budget: 200, color: '#f59e0b', icon: '⚡' },
  { name: 'Entertainment', spent: 90, budget: 150, color: '#8b5cf6', icon: '🎮' },
  { name: 'Shopping', spent: 420, budget: 400, color: '#ec4899', icon: '🛍️' },
];

export const mockAnalytics: AnalyticsData[] = [
  { month: 'Jul', income: 4500, expenses: 3200 },
  { month: 'Aug', income: 5200, expenses: 3800 },
  { month: 'Sep', income: 4800, expenses: 3500 },
  { month: 'Oct', income: 5500, expenses: 4200 },
  { month: 'Nov', income: 5800, expenses: 3900 },
];