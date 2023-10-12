import { Text, StyleSheet, View } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import Colors from '@/constants/Colors'

const index = () => {
  const { container, wrapper } = styles
  return (
    <SafeAreaView style={container}>
      <View style={wrapper}>
        <Text>test</Text>
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,

    backgroundColor: Colors.background,
    padding: 6
    // paddingBottom: 50
  },
  wrapper: {
    marginTop: 24,
    backgroundColor: 'white',
    borderRadius: 6,
    padding: 16,
    opacity: 0.3
  }
})

export default index
