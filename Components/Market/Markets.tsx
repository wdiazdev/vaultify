import { View, Text, StyleSheet } from 'react-native'
import React, { useState } from 'react'

import CoinsData from './CoinsData'
import Tabs from '../Tabs'

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
  container: { marginTop: 10 },
  header: {
    color: '#fff',
    fontFamily: 'm-bold',
    fontSize: 18
  }
})

export default Markets
