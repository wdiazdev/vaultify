import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  ActivityIndicator,
  Image,
  TouchableOpacity
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

  const {
    header,
    container,
    cardContainer,
    cardBg,
    cardText,
    cardImg,
    errorText
  } = styles

  return (
    <View style={container}>
      <Text style={header}>Trending</Text>

      {isLoading && <ActivityIndicator size={'small'} color={Colors.primary} />}

      {!isLoading && isSuccess && (
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{
            padding: 6
          }}
        >
          {trendingCoinsData?.map((coin: TrendingCoins, index: any) => {
            const lastIndex = index === trendingCoinsData.length - 1
            return (
              <TouchableOpacity
                //   onPress={}
                key={coin.id}
              >
                <View
                  style={
                    lastIndex
                      ? [cardContainer, { marginEnd: 0 }]
                      : cardContainer
                  }
                >
                  <Image
                    source={require('../../assets/images/cardBg.jpg')}
                    style={cardBg}
                  />
                  <Text
                    style={[
                      cardText,
                      {
                        color: Colors.primary,
                        fontFamily: 'm-bold',
                        fontSize: 10,
                        position: 'absolute',
                        top: 2,
                        right: 2
                      }
                    ]}
                  >
                    #{coin.market_cap_rank}
                  </Text>

                  <Image source={{ uri: coin.small }} style={cardImg} />
                  <Text style={cardText}>{coin.symbol.toUpperCase()}</Text>
                </View>
              </TouchableOpacity>
            )
          })}
        </ScrollView>
      )}
      {!isLoading && !isSuccess && (
        <View style={{ alignItems: 'center' }}>
          <Text style={errorText}>No data found.</Text>
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
    fontSize: 18
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
    borderColor: Colors.primary
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
  },
  errorText: {
    color: '#fff',
    fontSize: 14,
    fontFamily: 'm-medium',
    marginVertical: 6
  }
})

export default Trending
