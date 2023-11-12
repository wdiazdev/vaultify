import { StyleSheet, Text } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import Colors from '@/constants/Colors'

const Portfolio = () => {
  const { container } = styles

  return (
    <SafeAreaView style={container}>
      <Text>Portfolio</Text>
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

export default Portfolio
