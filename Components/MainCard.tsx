import { View, Text, StyleSheet, Image, ActivityIndicator } from 'react-native'
import React from 'react'
import Colors from '@/constants/Colors'
import { formatCurrency } from '@/Utilities'
import { useQuery } from '@tanstack/react-query'
import { singleCoin } from '@/query'

const MainCard = () => {
  const { data, isLoading, isSuccess } = useQuery({
    queryKey: ['Single Coins'],
    queryFn: () => singleCoin('bitcoin'),
    staleTime: 60 * 60 * 1000,
    refetchOnWindowFocus: false
  })

  const {
    cardContainer,
    wrapperImg,
    coinInfoHeader,
    headerText,
    priceContainer
  } = styles

  return (
    <View
      style={
        isLoading || (!isLoading && !isSuccess)
          ? { ...cardContainer, justifyContent: 'center' }
          : cardContainer
      }
    >
      {isLoading && <ActivityIndicator size={'large'} />}

      {isSuccess && !isLoading && (
        <>
          <View style={{ alignItems: 'center', justifyContent: 'center' }}>
            <Image source={{ uri: data?.image }} style={wrapperImg} />
            <View style={coinInfoHeader}>
              <Text style={[headerText, { flex: 1 }]}>
                {data?.symbol.toUpperCase()}
              </Text>
              <Text style={[headerText, { color: Colors.primary }]}>
                #{data?.market_cap_rank}
              </Text>
            </View>
            <View style={priceContainer}>
              <Text style={[headerText, { fontSize: 18 }]}>{data?.name}</Text>
              <Text style={[headerText, { fontSize: 18 }]}>
                {formatCurrency(data?.current_price)}
              </Text>
            </View>
          </View>
        </>
      )}
      {!isLoading && !isSuccess && (
        <>
          <Text style={[headerText, { fontSize: 14 }]}>No data found.</Text>
        </>
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  cardContainer: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    marginTop: 24,
    height: 100,
    borderRadius: 6,
    overflow: 'hidden',
    padding: 8,
    borderWidth: 1,
    borderColor: '#fff'
  },
  coinInfoHeader: {
    flexDirection: 'row'
  },
  headerText: {
    fontFamily: 'm-regular',
    fontSize: 20,
    color: '#fff',
    fontWeight: 'bold'
  },
  priceContainer: {
    position: 'absolute',
    top: 18,
    justifyContent: 'center',
    alignItems: 'center'
  },
  wrapperImg: {
    position: 'absolute',
    top: -20,
    left: -40,
    width: 130,
    height: 130,
    opacity: 0.5
  }
})

export default MainCard
