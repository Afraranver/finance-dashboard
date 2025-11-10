import React from 'react';
import { View, Text, Pressable } from 'react-native';
import { Transaction } from '@/types';
import { useRouter } from 'expo-router';

interface TransactionCardProps {
  transaction: Transaction;
}

export const TransactionCard: React.FC<TransactionCardProps> = ({ transaction }) => {
  const router = useRouter();

  return (
    <Pressable
      onPress={() => router.push(`/transaction/${transaction.id}`)}
      className="bg-white rounded-xl p-4 mb-3 shadow-sm border border-gray-100 active:bg-gray-50"
    >
      <View className="flex-row items-center justify-between">
        <View className="flex-1">
          <Text className="text-base font-semibold text-gray-900 mb-1">
            {transaction.title}
          </Text>
          <View className="flex-row items-center">
            <View className={`px-2 py-1 rounded-md ${
              transaction.type === 'income' ? 'bg-green-100' : 'bg-red-100'
            }`}>
              <Text className={`text-xs font-medium ${
                transaction.type === 'income' ? 'text-green-700' : 'text-red-700'
              }`}>
                {transaction.category}
              </Text>
            </View>
            <Text className="text-xs text-gray-500 ml-2">
              {new Date(transaction.date).toLocaleDateString('en-US', { 
                month: 'short', 
                day: 'numeric' 
              })}
            </Text>
          </View>
        </View>
        <Text className={`text-lg font-bold ${
          transaction.type === 'income' ? 'text-green-600' : 'text-red-600'
        }`}>
          {transaction.type === 'income' ? '+' : '-'}${transaction.amount}
        </Text>
      </View>
    </Pressable>
  );
};