import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import Tabs from './Tabs'
import CoinsData from './CoinsData'

const Markets = () => {
  const [activeTab, setActiveTab] = useState<string>('Coins')

  const handleActiveTab = (tab: string) => {
    setActiveTab(tab)
  }
  const { header, container } = styles

  const tabItems = ['Coins', 'Exchanges', 'Chains']

  return (
    <View style={container}>
      <Text style={header}>Markets</Text>
      <Tabs
        tabItems={tabItems}
        handleActiveTab={handleActiveTab}
        activeTab={activeTab}
      />
      {activeTab === 'Coins' && <CoinsData />}
    </View>
  )
}
const styles = StyleSheet.create({
  container: {
    marginTop: 20
  },
  header: {
    color: '#fff',
    fontFamily: 'm-bold',
    fontSize: 20,
    marginBottom: 10
  }
})

export default Markets
