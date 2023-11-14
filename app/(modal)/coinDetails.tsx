import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native'
import React, { useLayoutEffect } from 'react'
import { useLocalSearchParams, useNavigation } from 'expo-router'
import Colors from '@/constants/Colors'
import { Ionicons } from '@expo/vector-icons'
import { useQuery } from '@tanstack/react-query'
import { fetchCoinData } from '@/query'
import { formatCurrency } from '@/Utilities'

const coinDetails = () => {
  const { id } = useLocalSearchParams()

  const navigation = useNavigation()

  const { data, isLoading, isSuccess } = useQuery({
    queryKey: ['Coins Data', id],
    queryFn: () => fetchCoinData(id),
    staleTime: 60 * 60 * 1000,
    refetchOnWindowFocus: false,
    retry: 2
  })

  console.log('data:', data)

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTransparent: true,
      headerTitle: topHeaderInfo,
      headerTitleAlign: 'center',
      headerTintColor: Colors.primary,
      headerBackVisible: false,
      headerLeft: topHeaderLeft,
      headerRight: topHeaderRight
    })
  })

  const topHeaderInfo = () => {
    return (
      <View style={topHeaderContainer}>
        <Image source={{ uri: data?.image.small }} style={topHeaderImg} />
        <Text style={topHeaderText}>{data?.symbol?.toUpperCase()}</Text>
      </View>
    )
  }

  const topHeaderLeft = () => {
    return (
      <TouchableOpacity
        onPress={() => navigation.goBack()}
        style={topHeaderBtn}
      >
        <Ionicons name={'arrow-back'} size={22} color={Colors.primary} />
      </TouchableOpacity>
    )
  }

  const topHeaderRight = () => {
    return (
      <TouchableOpacity style={topHeaderBtn}>
        <Ionicons name={'star-outline'} size={20} color={Colors.primary} />
      </TouchableOpacity>
    )
  }

  const {
    container,
    topHeaderContainer,
    topHeaderBtn,
    topHeaderText,
    topHeaderImg,
    coinDetailsContainer,
    coinText
  } = styles

  return (
    <View style={container}>
      <View style={coinDetailsContainer}>
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 4 }}>
          <Text style={coinText}>{data?.name}</Text>
          <View
            style={{
              paddingVertical: 2,
              paddingHorizontal: 4,
              backgroundColor: Colors.grey,
              borderRadius: 8
            }}
          >
            <Text style={[coinText, { color: Colors.secondary, fontSize: 10 }]}>
              #{data?.market_cap_rank}
            </Text>
          </View>
        </View>
        <Text style={coinText}>
          {' '}
          {formatCurrency(data?.market_data?.current_price?.usd)}
        </Text>
      </View>
    </View>
  )
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
    padding: 8
  },
  topHeaderBtn: {
    backgroundColor: Colors.grey,
    padding: 6,
    borderRadius: 50
  },
  topHeaderContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4
  },
  topHeaderText: {
    fontFamily: 'm-medium',
    color: Colors.primary,
    marginTop: 2
  },
  topHeaderImg: {
    width: 30,
    height: 30
  },
  coinDetailsContainer: {
    marginTop: 90
  },
  coinText: {
    fontFamily: 'm-regular',
    fontSize: 18,
    color: '#fff'
  }
})

export default coinDetails
