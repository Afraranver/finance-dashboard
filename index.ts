export interface Transaction {
  id: string;
  title: string;
  amount: number;
  category: string;
  date: string;
  type: 'income' | 'expense';
  description?: string;
}

export interface Category {
  name: string;
  spent: number;
  budget: number;
  color: string;
  icon: string;
}

export interface AnalyticsData {
  month: string;
  income: number;
  expenses: number;
}

export interface UserPreferences {
  currency: string;
  theme: 'light' | 'dark';
  notifications: boolean;
}

import { Platform } from "react-native";

if (Platform.OS === "web") {
  require("./global.css");
}