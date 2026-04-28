import React from 'react';
import { Tabs } from 'expo-router';
import { Platform, StyleSheet, Text, View } from 'react-native';
import { Home, ShoppingBag, Wallet, MessageCircle, User } from 'lucide-react-native';
import * as Haptics from 'expo-haptics';

import { Colors } from '@/constants/Colors';
import { FontFamily, FontSize } from '@/constants/Typography';

interface TabIconProps {
  icon: React.ReactNode;
  label: string;
  focused: boolean;
}

function TabIcon({ icon, label, focused }: TabIconProps) {
  return (
    <View style={styles.tabItem}>
      {icon}
      <Text
        style={[
          styles.tabLabel,
          { color: focused ? Colors.primary : Colors.textHint },
        ]}
        numberOfLines={1}
      >
        {label}
      </Text>
    </View>
  );
}

export default function TabLayout() {
  function handleTabPress() {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
  }

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: styles.tabBar,
        tabBarShowLabel: false,
        tabBarActiveTintColor: Colors.primary,
        tabBarInactiveTintColor: Colors.textHint,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          tabBarIcon: ({ focused }) => (
            <TabIcon
              icon={<Home size={22} color={focused ? Colors.primary : Colors.textHint} strokeWidth={focused ? 2.5 : 2} />}
              label="Beranda"
              focused={focused}
            />
          ),
        }}
        listeners={{ tabPress: handleTabPress }}
      />

      <Tabs.Screen
        name="pesanan"
        options={{
          tabBarIcon: ({ focused }) => (
            <TabIcon
              icon={<ShoppingBag size={22} color={focused ? Colors.primary : Colors.textHint} strokeWidth={focused ? 2.5 : 2} />}
              label="Pesanan"
              focused={focused}
            />
          ),
        }}
        listeners={{ tabPress: handleTabPress }}
      />

      <Tabs.Screen
        name="dompet"
        options={{
          tabBarIcon: ({ focused }) => (
            <TabIcon
              icon={<Wallet size={22} color={focused ? Colors.primary : Colors.textHint} strokeWidth={focused ? 2.5 : 2} />}
              label="Dompet"
              focused={focused}
            />
          ),
        }}
        listeners={{ tabPress: handleTabPress }}
      />

      <Tabs.Screen
        name="chat"
        options={{
          tabBarIcon: ({ focused }) => (
            <TabIcon
              icon={<MessageCircle size={22} color={focused ? Colors.primary : Colors.textHint} strokeWidth={focused ? 2.5 : 2} />}
              label="Chat"
              focused={focused}
            />
          ),
        }}
        listeners={{ tabPress: handleTabPress }}
      />

      <Tabs.Screen
        name="akun"
        options={{
          tabBarIcon: ({ focused }) => (
            <TabIcon
              icon={<User size={22} color={focused ? Colors.primary : Colors.textHint} strokeWidth={focused ? 2.5 : 2} />}
              label="Akun"
              focused={focused}
            />
          ),
        }}
        listeners={{ tabPress: handleTabPress }}
      />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  tabBar: {
    backgroundColor: Colors.white,
    borderTopWidth: 1,
    borderTopColor: Colors.divider,
    height: Platform.OS === 'ios' ? 84 : 68,
    paddingTop: 8,
    elevation: 0,
    shadowColor: Colors.textPrimary,
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.06,
    shadowRadius: 10,
  },
  tabItem: {
    alignItems: 'center',
    gap: 4,
    paddingBottom: Platform.OS === 'ios' ? 0 : 4,
  },
  tabLabel: {
    fontFamily: FontFamily.medium,
    fontSize: FontSize.small,
    includeFontPadding: false,
  },
});
