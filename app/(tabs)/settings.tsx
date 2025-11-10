import React from 'react';
import { View, Text, ScrollView, Pressable, Switch } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useStore } from '@/store/useStore';
import { ChevronRight } from 'lucide-react-native';

export default function SettingsScreen() {
  const { preferences, setPreferences } = useStore();

  const settingsSections = [
    {
      title: 'General',
      items: [
        { label: 'Currency', value: preferences.currency, type: 'select' },
        { label: 'Theme', value: preferences.theme, type: 'select' },
      ],
    },
    {
      title: 'Notifications',
      items: [
        { 
          label: 'Push Notifications', 
          value: preferences.notifications, 
          type: 'toggle',
          onToggle: (value: boolean) => setPreferences({ notifications: value }),
        },
      ],
    },
  ];

  return (
    <SafeAreaView className="flex-1 bg-gray-50" edges={['bottom']}>
      <ScrollView className="flex-1">
        <View className="px-4 py-6">
          {/* Profile Card */}
          <View className="bg-white rounded-2xl p-6 mb-6 shadow-sm border border-gray-100">
            <View className="items-center">
              <View className="w-20 h-20 rounded-full bg-primary-100 items-center justify-center mb-3">
                <Text className="text-3xl">👤</Text>
              </View>
              <Text className="text-xl font-bold text-gray-900">John Doe</Text>
              <Text className="text-gray-500 text-sm">john.doe@example.com</Text>
            </View>
          </View>

          {/* Settings Sections */}
          {settingsSections.map((section, sectionIndex) => (
            <View key={sectionIndex} className="mb-6">
              <Text className="text-sm font-semibold text-gray-500 mb-3 uppercase tracking-wide">
                {section.title}
              </Text>
              <View className="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100">
                {section.items.map((item, itemIndex) => (
                  <View key={itemIndex}>
                    <Pressable
                      className="flex-row items-center justify-between p-4 active:bg-gray-50"
                      disabled={item.type === 'toggle'}
                    >
                      <Text className="text-base text-gray-900">{item.label}</Text>
                      {item.type === 'toggle' ? (
                        <Switch
                            value={item.value as boolean}
                            onValueChange={'onToggle' in item ? item.onToggle : undefined}
                            trackColor={{ false: '#d1d5db', true: '#0ea5e9' }}
                            thumbColor="#ffffff"
                            />
                      ) : (
                        <View className="flex-row items-center">
                          <Text className="text-gray-500 mr-2">{item.value}</Text>
                          <ChevronRight size={20} color="#9ca3af" />
                        </View>
                      )}
                    </Pressable>
                    {itemIndex < section.items.length - 1 && (
                      <View className="h-px bg-gray-100 ml-4" />
                    )}
                  </View>
                ))}
              </View>
            </View>
          ))}

          {/* About Section */}
          <View className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100">
            <Pressable className="flex-row items-center justify-between p-2 active:bg-gray-50">
              <Text className="text-base text-gray-900">About</Text>
              <ChevronRight size={20} color="#9ca3af" />
            </Pressable>
            <View className="h-px bg-gray-100 my-1" />
            <Pressable className="flex-row items-center justify-between p-2 active:bg-gray-50">
              <Text className="text-base text-gray-900">Privacy Policy</Text>
              <ChevronRight size={20} color="#9ca3af" />
            </Pressable>
            <View className="h-px bg-gray-100 my-1" />
            <Pressable className="flex-row items-center justify-between p-2 active:bg-gray-50">
              <Text className="text-base text-red-600">Logout</Text>
              <ChevronRight size={20} color="#ef4444" />
            </Pressable>
          </View>

          <Text className="text-center text-gray-400 text-xs mt-8 mb-4">Version 1.0.0</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}