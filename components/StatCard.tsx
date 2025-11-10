import React from 'react';
import { View, Text } from 'react-native';

interface StatCardProps {
  title: string;
  amount: number;
  icon: string;
  trend?: number;
  color: string;
}

export const StatCard: React.FC<StatCardProps> = ({ title, amount, icon, trend, color }) => {
  return (
    <View className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100">
      <View className="flex-row items-center justify-between mb-2">
        <Text className="text-gray-600 text-sm font-medium">{title}</Text>
        <Text className="text-2xl">{icon}</Text>
      </View>
      <Text className="text-2xl font-bold text-gray-900 mb-1">
        ${amount.toLocaleString()}
      </Text>
      {trend !== undefined && (
        <View className="flex-row items-center">
          <Text className={`text-sm font-semibold ${trend >= 0 ? 'text-green-600' : 'text-red-600'}`}>
            {trend >= 0 ? '+' : ''}{trend}%
          </Text>
          <Text className="text-gray-500 text-xs ml-1">vs last month</Text>
        </View>
      )}
    </View>
  );
};