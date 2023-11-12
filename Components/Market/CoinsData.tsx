import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  ActivityIndicator,
  TouchableOpacity
} from 'react-native'
import React from 'react'
import { useQuery } from '@tanstack/react-query'
import { coinsData } from '@/query'
import { formatCurrency } from '@/Utilities'
import Colors from '@/constants/Colors'
import { Ionicons } from '@expo/vector-icons'

type Props = {
  item: {
    id: string
    symbol: string
    name: string
    image: string
    current_price: number
    price_change_24h: number
    market_cap_rank: number
  }
}

const CoinsData = () => {
  const { data, isLoading, isSuccess } = useQuery({
    queryKey: ['Coins Data'],
    queryFn: () => coinsData(),
    staleTime: 60 * 60 * 1000,
    refetchOnWindowFocus: false,
    retry: 2
  })

  const renderItem = ({ item }: Props) => (
    <TouchableOpacity>
      <View style={rowContainer}>
        <Text style={rowText}>{item.market_cap_rank}</Text>
        <View
          style={{
            flex: 1,
            flexDirection: 'row',
            alignItems: 'center',
            gap: 6,
            marginLeft: 20
          }}
        >
          <Image source={{ uri: item.image }} style={rowImg} />
          <View>
            <Text style={rowText}>{item.name}</Text>
            <Text style={[rowText, { fontSize: 10, color: Colors.primary }]}>
              {item.symbol.toUpperCase()}
            </Text>
          </View>
        </View>
        <Text style={rowText}>{formatCurrency(item.current_price)}</Text>
        <Text
          style={
            item.price_change_24h > 0
              ? [rowText, { color: '#7CFC00' }]
              : [rowText, { color: '#DC0000' }]
          }
        >
          {item.price_change_24h.toFixed(2)}%
        </Text>
      </View>
    </TouchableOpacity>
  )

  const {
    container,
    headerContainer,
    headerText,
    rowContainer,
    rowImg,
    rowText
  } = styles

  return (
    <View style={container}>
      <View style={headerContainer}>
        <Text style={headerText}>#</Text>
        <Text style={headerText}>Name</Text>
        <Text style={headerText}>Price</Text>
        <Text style={headerText}>24h%</Text>
      </View>
      {isLoading && (
        <ActivityIndicator
          style={{ marginVertical: 6 }}
          size={'large'}
          color={Colors.primary}
        />
      )}
      {isSuccess && !isLoading && (
        <FlatList
          data={data}
          keyExtractor={(item) => item.id}
          renderItem={renderItem}
        />
      )}
      {!isLoading && !isSuccess && (
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 2 }}>
          <Ionicons
            name={'sad-outline'}
            size={18}
            color={'#fff'}
            style={{ marginBottom: 4 }}
          />
          <Text
            style={{
              color: '#fff',
              fontSize: 14,
              fontFamily: 'm-medium',
              marginVertical: 6
            }}
          >
            No data found.
          </Text>
        </View>
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    marginTop: 10
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
    paddingVertical: 4,
    backgroundColor: Colors.gray
  },
  headerText: {
    fontFamily: 'm-medium',
    fontSize: 10,
    color: Colors.primary
  },
  rowContainer: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 4
  },
  rowImg: {
    width: 25,
    height: 25
  },
  rowText: {
    fontSize: 12,
    color: '#fff',
    fontFamily: 'm-regular'
  }
})

export default CoinsData
