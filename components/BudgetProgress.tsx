import React from 'react';
import { View, Text } from 'react-native';
import { Category } from '@/types';

interface BudgetProgressProps {
  category: Category;
}

export const BudgetProgress: React.FC<BudgetProgressProps> = ({ category }) => {
  const percentage = (category.spent / category.budget) * 100;
  const isOverBudget = percentage > 100;

  return (
    <View className="bg-white rounded-xl p-4 mb-3 shadow-sm border border-gray-100">
      <View className="flex-row items-center justify-between mb-2">
        <View className="flex-row items-center">
          <Text className="text-2xl mr-2">{category.icon}</Text>
          <Text className="text-base font-semibold text-gray-900">{category.name}</Text>
        </View>
        <Text className={`text-sm font-bold ${isOverBudget ? 'text-red-600' : 'text-gray-900'}`}>
          ${category.spent} / ${category.budget}
        </Text>
      </View>
      
      <View className="h-2 bg-gray-200 rounded-full overflow-hidden">
        <View 
          className={`h-full rounded-full ${isOverBudget ? 'bg-red-500' : 'bg-primary-500'}`}
          style={{ width: `${Math.min(percentage, 100)}%` }}
        />
      </View>
      
      <Text className={`text-xs mt-1 ${isOverBudget ? 'text-red-600' : 'text-gray-500'}`}>
        {isOverBudget 
          ? `Over budget by $${(category.spent - category.budget).toFixed(0)}`
          : `${(category.budget - category.spent).toFixed(0)} remaining`
        }
      </Text>
    </View>
  );
};