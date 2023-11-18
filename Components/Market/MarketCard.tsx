import {
  View,
  Text,
  StyleSheet,
  Image,
  ActivityIndicator,
  TouchableOpacity
} from 'react-native'
import React from 'react'
import Colors from '@/constants/Colors'
import { formatCurrency } from '@/Utilities'
import { useQuery } from '@tanstack/react-query'
import { singleCoin } from '@/query'
import { Link } from 'expo-router'

const MainCard = () => {
  const { data, isLoading, isSuccess } = useQuery({
    queryKey: ['Single Coin'],
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
      {isLoading && <ActivityIndicator size={'large'} color={Colors.primary} />}

      {isSuccess && !isLoading && (
        <Link
          href={{ pathname: '/coinDetails', params: { id: data?.id } }}
          asChild
        >
          <TouchableOpacity>
            <View style={{ alignItems: 'center', justifyContent: 'center' }}>
              <Image source={{ uri: data?.image }} style={wrapperImg} />
              <View style={coinInfoHeader}>
                <Text style={[headerText, { flex: 1, fontFamily: 'm-bold' }]}>
                  {data?.symbol.toUpperCase()}
                </Text>
                <Text
                  style={[
                    headerText,
                    { color: Colors.primary, fontFamily: 'm-bold' }
                  ]}
                >
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
          </TouchableOpacity>
        </Link>
      )}
      {!isLoading && !isSuccess && (
        <View style={{ alignItems: 'center' }}>
          <Text style={[headerText, { fontSize: 14 }]}>No data found.</Text>
        </View>
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  cardContainer: {
    marginTop: 24,
    height: 100,
    borderRadius: 6,
    overflow: 'hidden',
    padding: 8,
    borderWidth: 2,
    borderColor: Colors.secondary
  },
  coinInfoHeader: {
    flexDirection: 'row'
  },
  headerText: {
    fontFamily: 'm-medium',
    fontSize: 18,
    color: '#fff'
  },
  priceContainer: {
    position: 'absolute',
    top: 12,
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
