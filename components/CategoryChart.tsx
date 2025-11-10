import React from 'react';
import { View, Text, Dimensions } from 'react-native';
import { VictoryPie, VictoryLabel } from 'victory-native';
import { Category } from '@/types';

interface CategoryChartProps {
  categories: Category[];
}

const { width } = Dimensions.get('window');

export const CategoryChart: React.FC<CategoryChartProps> = ({ categories }) => {
  const chartData = categories.map(cat => ({
    x: cat.name,
    y: cat.spent,
    color: cat.color,
  }));

  const totalSpent = categories.reduce((sum, cat) => sum + cat.spent, 0);

  return (
    <View className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100">
      <Text className="text-lg font-bold text-gray-900 mb-4">Spending by Category</Text>
      
      <View className="items-center">
        <VictoryPie
          data={chartData}
          width={width - 80}
          height={220}
          colorScale={chartData.map(d => d.color)}
          innerRadius={60}
          labels={({ datum }) => `${((datum.y / totalSpent) * 100).toFixed(0)}%`}
          labelRadius={({ innerRadius }) => (innerRadius as number) + 25}
          style={{
            labels: { fontSize: 12, fontWeight: 'bold', fill: 'white' },
          }}
        />
        <View className="absolute" style={{ top: 95 }}>
          <Text className="text-center text-gray-500 text-xs">Total</Text>
          <Text className="text-center text-2xl font-bold text-gray-900">
            ${totalSpent}
          </Text>
        </View>
      </View>

      <View className="mt-4">
        {categories.map((cat, index) => (
          <View key={index} className="flex-row items-center justify-between mb-2">
            <View className="flex-row items-center flex-1">
              <View 
                className="w-3 h-3 rounded-full mr-2" 
                style={{ backgroundColor: cat.color }} 
              />
              <Text className="text-sm text-gray-700">{cat.name}</Text>
            </View>
            <Text className="text-sm font-semibold text-gray-900">${cat.spent}</Text>
          </View>
        ))}
      </View>
    </View>
  );
};