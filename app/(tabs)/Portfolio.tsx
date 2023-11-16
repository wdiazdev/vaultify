import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import Colors from '@/constants/Colors'

const Portfolio = () => {
  const { container, header } = styles
  return (
    <SafeAreaView style={container}>
      <View style={{ marginTop: 24 }}>
        <Text style={header}>Portfolio</Text>
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
    padding: 8
  },
  header: {
    color: '#fff',
    fontFamily: 'm-medium',
    fontSize: 18
  }
})

export default Portfolio
