import { Text, StyleSheet, View, ActivityIndicator } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import Colors from '@/constants/Colors'
import { useQuery } from '@tanstack/react-query'
import { singleCoin } from '@/query'

const index = () => {
  const { container, wrapper } = styles

  const { data, isLoading, error, isError, isSuccess } = useQuery({
    queryKey: ['Single Coins'],
    queryFn: () => singleCoin('bitcoin'),
    // keepPreviousData: true,
    staleTime: 60 * 60 * 1000,
    refetchOnWindowFocus: false
  })
  console.log('data:', data)

  return (
    <SafeAreaView style={container}>
      <View style={wrapper}>
        {isLoading ? (
          <ActivityIndicator size={'large'} />
        ) : isSuccess ? (
          <Text style={{ color: 'red' }}>{data.name}</Text>
        ) : (
          <Text>No data found.</Text>
        )}
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,

    backgroundColor: Colors.background,
    padding: 8
    // paddingBottom: 50
  },
  wrapper: {
    // position: 'relative',
    justifyContent: 'center',
    marginTop: 24,
    height: 200,
    backgroundColor: 'white',
    borderRadius: 6,
    padding: 16
    // opacity: 0.8
  }
})

export default index
