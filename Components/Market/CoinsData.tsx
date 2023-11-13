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
    price_change_percentage_24h: number
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

        <View style={imageContainer}>
          <Image source={{ uri: item.image }} style={coinImg} />
          <View>
            <Text style={[rowText, { marginBottom: -5 }]}>{item.name}</Text>
            <Text
              style={[
                rowText,
                {
                  color: Colors.primary,
                  fontFamily: 'm-medium'
                }
              ]}
            >
              {item.symbol.toUpperCase()}
            </Text>
          </View>
        </View>
        <View
          style={{
            flex: 1,
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginLeft: 40
          }}
        >
          <Text style={rowText}>{formatCurrency(item.current_price)}</Text>
          <Text
            style={
              item.price_change_percentage_24h > 0
                ? { color: '#7CFC00' }
                : { color: '#DC0000' }
            }
          >
            {item.price_change_percentage_24h.toFixed(2)}%
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  )

  const {
    container,
    headerContainer,
    headerText,
    rowContainer,
    coinImg,
    rowText,
    imageContainer,
    itemSeparator,
    errorContainer,
    errorText
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
          ItemSeparatorComponent={() => <View style={itemSeparator} />}
          contentContainerStyle={{ paddingBottom: data ? 340 : 0 }}
        />
      )}
      {!isLoading && !isSuccess && (
        <View style={errorContainer}>
          <Ionicons
            name={'sad-outline'}
            size={18}
            color={'#fff'}
            style={{ marginBottom: 4 }}
          />
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
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
    paddingVertical: 4,
    backgroundColor: Colors.grey
  },
  headerText: {
    fontFamily: 'm-medium',
    fontSize: 10,
    color: Colors.primary
  },
  rowContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 4
  },
  coinImg: {
    width: 25,
    height: 25,
    marginBottom: 2
  },
  rowText: {
    fontSize: 12,
    color: '#fff',
    fontFamily: 'm-regular'
  },
  imageContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 20,
    gap: 6
  },
  itemSeparator: {
    height: 1,
    backgroundColor: Colors.silver,
    opacity: 0.2,
    marginVertical: 5
  },
  errorContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 2
  },
  errorText: {
    color: '#fff',
    fontSize: 14,
    fontFamily: 'm-medium',
    marginVertical: 6
  }
})

export default CoinsData
