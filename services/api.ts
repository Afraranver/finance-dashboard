import { useQuery } from '@tanstack/react-query';
import { Transaction, Category, AnalyticsData } from '@/types';
import { mockTransactions, mockCategories, mockAnalytics } from './mockData';

// Simulate API delay
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

// API Functions
export const fetchTransactions = async (): Promise<Transaction[]> => {
  await delay(800);
  return mockTransactions;
};

export const fetchCategories = async (): Promise<Category[]> => {
  await delay(600);
  return mockCategories;
};

export const fetchAnalytics = async (): Promise<AnalyticsData[]> => {
  await delay(700);
  return mockAnalytics;
};

export const fetchTransactionById = async (id: string): Promise<Transaction> => {
  await delay(500);
  const transaction = mockTransactions.find(t => t.id === id);
  if (!transaction) throw new Error('Transaction not found');
  return transaction;
};

// React Query Hooks
export const useTransactions = () => {
  return useQuery({
    queryKey: ['transactions'],
    queryFn: fetchTransactions,
  });
};

export const useCategories = () => {
  return useQuery({
    queryKey: ['categories'],
    queryFn: fetchCategories,
  });
};

export const useAnalytics = () => {
  return useQuery({
    queryKey: ['analytics'],
    queryFn: fetchAnalytics,
  });
};

export const useTransaction = (id: string) => {
  return useQuery({
    queryKey: ['transaction', id],
    queryFn: () => fetchTransactionById(id),
  });
};