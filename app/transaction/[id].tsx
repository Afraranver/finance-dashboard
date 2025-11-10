import React from 'react';
import { View, Text, ScrollView, ActivityIndicator } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import { useTransaction } from '@/services/api';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function TransactionDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { data: transaction, isLoading } = useTransaction(id);

  if (isLoading) {
    return (
      <View className="flex-1 items-center justify-center bg-gray-50">
        <ActivityIndicator size="large" color="#0ea5e9" />
      </View>
    );
  }

  if (!transaction) {
    return (
      <View className="flex-1 items-center justify-center bg-gray-50">
        <Text className="text-gray-500">Transaction not found</Text>
      </View>
    );
  }

  return (
    <SafeAreaView className="flex-1 bg-gray-50" edges={['bottom']}>
      <ScrollView className="flex-1">
        <View className="p-6">
          {/* Amount Card */}
          <View className={`rounded-3xl p-8 mb-6 ${
            transaction.type === 'income' ? 'bg-green-500' : 'bg-red-500'
          }`}>
            <Text className="text-white text-sm font-medium mb-2">Amount</Text>
            <Text className="text-white text-5xl font-bold">
              {transaction.type === 'income' ? '+' : '-'}${transaction.amount}
            </Text>
          </View>

          {/* Details Card */}
          <View className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 mb-4">
            <Text className="text-xl font-bold text-gray-900 mb-4">Transaction Details</Text>
            
            <View className="space-y-4">
              <View className="flex-row justify-between py-3 border-b border-gray-100">
                <Text className="text-gray-600">Title</Text>
                <Text className="text-gray-900 font-semibold">{transaction.title}</Text>
              </View>
              
              <View className="flex-row justify-between py-3 border-b border-gray-100">
                <Text className="text-gray-600">Category</Text>
                <View className={`px-3 py-1 rounded-lg ${
                  transaction.type === 'income' ? 'bg-green-100' : 'bg-red-100'
                }`}>
                  <Text className={`font-medium ${
                    transaction.type === 'income' ? 'text-green-700' : 'text-red-700'
                  }`}>
                    {transaction.category}
                  </Text>
                </View>
              </View>
              
              <View className="flex-row justify-between py-3 border-b border-gray-100">
                <Text className="text-gray-600">Date</Text>
                <Text className="text-gray-900 font-semibold">
                  {new Date(transaction.date).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                  })}
                </Text>
              </View>
              
              <View className="flex-row justify-between py-3">
                <Text className="text-gray-600">Type</Text>
                <Text className={`font-semibold capitalize ${
                  transaction.type === 'income' ? 'text-green-600' : 'text-red-600'
                }`}>
                  {transaction.type}
                </Text>
              </View>
            </View>
          </View>

          {/* Description Card */}
          {transaction.description && (
            <View className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
              <Text className="text-lg font-bold text-gray-900 mb-3">Description</Text>
              <Text className="text-gray-600 leading-6">{transaction.description}</Text>
            </View>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}