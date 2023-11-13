import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  ActivityIndicator,
  Image
} from 'react-native'
import React from 'react'
import { trendingCoins } from '@/query'
import { useQuery } from '@tanstack/react-query'
import Colors from '@/constants/Colors'

type TrendingCoins = {
  id: string
  market_cap_rank: number
  name: string
  price_btc: number
  small: string
  symbol: string
}

const Trending = () => {
  const { data, isLoading, isSuccess } = useQuery({
    queryKey: ['Trending Coins'],
    queryFn: () => trendingCoins(),
    staleTime: 60 * 60 * 1000,
    refetchOnWindowFocus: false,
    retry: 2
  })

  const trendingCoinsData = data?.coins.map((i: any) => i.item)

  const { header, container, cardContainer, cardBg, cardText, cardImg } = styles

  return (
    <View style={container}>
      <Text style={header}>Trending</Text>

      {isLoading && <ActivityIndicator size={'small'} color={Colors.primary} />}

      {!isLoading && isSuccess && (
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          //   contentContainerStyle={{
          //     padding: 6
          //   }}
        >
          {trendingCoinsData?.map((coin: TrendingCoins) => {
            return (
              <View key={coin.id} style={cardContainer}>
                <Image
                  source={require('../../assets/images/cardBg.jpg')}
                  style={cardBg}
                />

                <Image source={{ uri: coin.small }} style={cardImg} />
                <Text style={cardText}>{coin.symbol.toUpperCase()}</Text>
              </View>
            )
          })}
        </ScrollView>
      )}
      {!isLoading && !isSuccess && (
        <View style={{ alignItems: 'center' }}>
          {/* <Text style={[headerText, { fontSize: 14 }]}>No data found.</Text> */}
        </View>
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    marginTop: 10
  },
  header: {
    color: '#fff',
    fontFamily: 'm-bold',
    fontSize: 18,
    marginBottom: 10
  },
  cardContainer: {
    width: 100,
    height: 80,
    justifyContent: 'center',
    alignItems: 'center',
    marginEnd: 8,
    borderRadius: 6,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: Colors.secondary
  },
  cardBg: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: 100,
    height: 100,
    opacity: 0.6
  },
  cardText: {
    color: '#fff',
    fontFamily: 'm-medium',
    fontSize: 14
  },
  cardImg: {
    width: 25,
    height: 25
  }
})

export default Trending
