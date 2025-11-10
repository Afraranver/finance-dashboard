import React from 'react';
import { View, Text, ScrollView, ActivityIndicator, Dimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useAnalytics, useCategories } from '@/services/api';
import { CategoryChart } from '@/components/CategoryChart';
import { VictoryBar, VictoryChart, VictoryAxis, VictoryTheme, VictoryGroup } from 'victory-native';

const { width } = Dimensions.get('window');

export default function AnalyticsScreen() {
  const { data: analytics, isLoading: analyticsLoading } = useAnalytics();
  const { data: categories, isLoading: categoriesLoading } = useCategories();

  if (analyticsLoading || categoriesLoading) {
    return (
      <View className="flex-1 items-center justify-center bg-gray-50">
        <ActivityIndicator size="large" color="#0ea5e9" />
      </View>
    );
  }

  return (
    <SafeAreaView className="flex-1 bg-gray-50" edges={['bottom']}>
      <ScrollView className="flex-1">
        <View className="px-4 py-6">
          {/* Income vs Expenses Chart */}
          <View className="bg-white rounded-2xl p-4 mb-4 shadow-sm border border-gray-100">
            <Text className="text-lg font-bold text-gray-900 mb-4">Income vs Expenses</Text>
            <VictoryChart
              theme={VictoryTheme.material}
              width={width - 64}
              height={250}
              domainPadding={{ x: 20 }}
            >
              <VictoryAxis
                style={{
                  tickLabels: { fontSize: 10, fill: '#6b7280' },
                  axis: { stroke: '#e5e7eb' },
                }}
              />
              <VictoryAxis
                dependentAxis
                style={{
                  tickLabels: { fontSize: 10, fill: '#6b7280' },
                  axis: { stroke: '#e5e7eb' },
                  grid: { stroke: '#f3f4f6' },
                }}
              />
              <VictoryGroup offset={15}>
                <VictoryBar
                  data={analytics}
                  x="month"
                  y="income"
                  style={{ data: { fill: '#10b981' } }}
                  cornerRadius={{ top: 4 }}
                  barWidth={12}
                />
                <VictoryBar
                  data={analytics}
                  x="month"
                  y="expenses"
                  style={{ data: { fill: '#ef4444' } }}
                  cornerRadius={{ top: 4 }}
                  barWidth={12}
                />
              </VictoryGroup>
            </VictoryChart>
            <View className="flex-row justify-center gap-6 mt-2">
              <View className="flex-row items-center">
                <View className="w-3 h-3 rounded-full bg-green-500 mr-2" />
                <Text className="text-sm text-gray-600">Income</Text>
              </View>
              <View className="flex-row items-center">
                <View className="w-3 h-3 rounded-full bg-red-500 mr-2" />
                <Text className="text-sm text-gray-600">Expenses</Text>
              </View>
            </View>
          </View>

          {/* Category Distribution */}
          {categories && <CategoryChart categories={categories} />}

          {/* Summary Cards */}
          <View className="mt-4 bg-white rounded-2xl p-4 shadow-sm border border-gray-100">
            <Text className="text-lg font-bold text-gray-900 mb-4">Monthly Summary</Text>
            <View className="space-y-3">
              <View className="flex-row justify-between items-center py-2 border-b border-gray-100">
                <Text className="text-gray-600">Average Income</Text>
                <Text className="text-green-600 font-semibold">
                  ${(analytics?.reduce((sum, m) => sum + m.income, 0)! / analytics?.length!).toFixed(0)}
                </Text>
              </View>
              <View className="flex-row justify-between items-center py-2 border-b border-gray-100">
                <Text className="text-gray-600">Average Expenses</Text>
                <Text className="text-red-600 font-semibold">
                  ${(analytics?.reduce((sum, m) => sum + m.expenses, 0)! / analytics?.length!).toFixed(0)}
                </Text>
              </View>
              <View className="flex-row justify-between items-center py-2">
                <Text className="text-gray-600">Savings Rate</Text>
                <Text className="text-primary-600 font-semibold">32%</Text>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}