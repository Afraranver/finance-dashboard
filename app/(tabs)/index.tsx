import React from 'react';
import { View, Text, ScrollView, ActivityIndicator, RefreshControl } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTransactions } from '@/services/api';
import { TransactionCard } from '@/components/TransactionCard';
import { StatCard } from '@/components/StatCard';
import { LinearGradient } from 'expo-linear-gradient';

export default function HomeScreen() {
  const { data: transactions, isLoading, refetch, isRefetching } = useTransactions();

  const totalIncome = transactions?.filter(t => t.type === 'income').reduce((sum, t) => sum + t.amount, 0) || 0;
  const totalExpenses = transactions?.filter(t => t.type === 'expense').reduce((sum, t) => sum + t.amount, 0) || 0;
  const balance = totalIncome - totalExpenses;

  if (isLoading) {
    return (
      <View className="flex-1 items-center justify-center bg-gray-50">
        <ActivityIndicator size="large" color="#0ea5e9" />
      </View>
    );
  }

  return (
    <SafeAreaView className="flex-1 bg-gray-50" edges={['bottom']}>
      <ScrollView
        refreshControl={
          <RefreshControl refreshing={isRefetching} onRefresh={refetch} />
        }
      >
        {/* Header Card */}
        <LinearGradient
          colors={['#0ea5e9', '#0284c7']}
          className="mx-4 mt-4 rounded-3xl p-6 shadow-lg"
        >
          <Text className="text-white text-sm font-medium mb-1">Total Balance</Text>
          <Text className="text-white text-4xl font-bold mb-4">${balance.toLocaleString()}</Text>
          <View className="flex-row justify-between">
            <View>
              <Text className="text-white/80 text-xs mb-1">Income</Text>
              <Text className="text-white text-lg font-semibold">+${totalIncome.toLocaleString()}</Text>
            </View>
            <View>
              <Text className="text-white/80 text-xs mb-1">Expenses</Text>
              <Text className="text-white text-lg font-semibold">-${totalExpenses.toLocaleString()}</Text>
            </View>
          </View>
        </LinearGradient>

        {/* Stats Grid */}
        <View className="px-4 mt-6">
          <View className="flex-row gap-3 mb-4">
            <View className="flex-1">
              <StatCard
                title="Monthly"
                amount={totalIncome}
                icon="💰"
                trend={12}
                color="#10b981"
              />
            </View>
            <View className="flex-1">
              <StatCard
                title="Spent"
                amount={totalExpenses}
                icon="💸"
                trend={-5}
                color="#ef4444"
              />
            </View>
          </View>
        </View>

        {/* Recent Transactions */}
        <View className="px-4 mt-4">
          <View className="flex-row items-center justify-between mb-4">
            <Text className="text-xl font-bold text-gray-900">Recent Transactions</Text>
            <Text className="text-primary-600 text-sm font-semibold">See All</Text>
          </View>
          {transactions?.slice(0, 5).map(transaction => (
            <TransactionCard key={transaction.id} transaction={transaction} />
          ))}
        </View>

        <View className="h-8" />
      </ScrollView>
    </SafeAreaView>
  );
}