import { StyleSheet } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import Colors from '@/constants/Colors'
import MarketCard from '@/Components/Market/MarketCard'
import Markets from '@/Components/Market/Markets'
import Trending from '@/Components/Market/Trending'

const Main = () => {
  const { container } = styles

  return (
    <SafeAreaView style={container}>
      <MarketCard />
      <Trending />
      <Markets />
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
    padding: 8
  }
})

export default Main
