import { StyleSheet } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import Colors from '@/constants/Colors'
import MainCard from '@/Components/MainCard'

const index = () => {
  const { container } = styles

  return (
    <SafeAreaView style={container}>
      <MainCard />
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

export default index
