import React from 'react';
import { View, Text, ScrollView, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useCategories } from '@/services/api';
import { BudgetProgress } from '@/components/BudgetProgress';

export default function BudgetScreen() {
  const { data: categories, isLoading } = useCategories();

  if (isLoading) {
    return (
      <View className="flex-1 items-center justify-center bg-gray-50">
        <ActivityIndicator size="large" color="#0ea5e9" />
      </View>
    );
  }

  const totalBudget = categories?.reduce((sum, cat) => sum + cat.budget, 0) || 0;
  const totalSpent = categories?.reduce((sum, cat) => sum + cat.spent, 0) || 0;
  const remaining = totalBudget - totalSpent;

  return (
    <SafeAreaView className="flex-1 bg-gray-50" edges={['bottom']}>
      <ScrollView className="flex-1">
        <View className="px-4 py-6">
          {/* Overview Card */}
          <View className="bg-primary-500 rounded-2xl p-6 mb-6 shadow-lg">
            <Text className="text-white text-sm font-medium mb-1">Monthly Budget</Text>
            <Text className="text-white text-3xl font-bold mb-4">${totalBudget.toLocaleString()}</Text>
            <View className="flex-row justify-between">
              <View>
                <Text className="text-white/80 text-xs mb-1">Spent</Text>
                <Text className="text-white text-lg font-semibold">${totalSpent.toLocaleString()}</Text>
              </View>
              <View>
                <Text className="text-white/80 text-xs mb-1">Remaining</Text>
                <Text className="text-white text-lg font-semibold">${remaining.toLocaleString()}</Text>
              </View>
            </View>
            <View className="mt-4 h-2 bg-white/20 rounded-full overflow-hidden">
              <View 
                className="h-full bg-white rounded-full" 
                style={{ width: `${(totalSpent / totalBudget) * 100}%` }}
              />
            </View>
          </View>

          {/* Category Budgets */}
          <Text className="text-xl font-bold text-gray-900 mb-4">Category Budgets</Text>
          {categories?.map((category, index) => (
            <BudgetProgress key={index} category={category} />
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}