import { View, Text, StyleSheet } from 'react-native'
import React from 'react'

const News = () => {
  const { text } = styles
  return (
    <View>
      <Text style={text}>News</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  text: {
    fontFamily: 'm-regular',
    fontSize: 18,
    color: '#fff'
  }
})
export default News
