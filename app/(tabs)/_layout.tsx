import React from 'react'
import { Tabs } from 'expo-router'
import Colors from '@/constants/Colors'
import { Feather } from '@expo/vector-icons'

const _layout = () => {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: Colors.grey,
          height: 55
        },
        tabBarActiveTintColor: Colors.primary,
        tabBarInactiveTintColor: 'white',

        tabBarLabelStyle: {
          fontFamily: 'm-regular',
          marginBottom: 5
        }
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          tabBarLabel: 'Markets',
          tabBarIcon: ({ focused }) => (
            <Feather
              name={'home'}
              size={20}
              color={focused ? Colors.primary : 'white'}
            />
          )
        }}
      />
      <Tabs.Screen
        name="Portfolio"
        options={{
          tabBarLabel: 'Portfolio',
          tabBarIcon: ({ focused }) => (
            <Feather
              name={'pie-chart'}
              size={20}
              color={focused ? Colors.primary : 'white'}
            />
          )
        }}
      />
    </Tabs>
  )
}

export default _layout
