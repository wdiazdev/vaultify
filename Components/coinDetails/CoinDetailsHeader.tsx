import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import PercentageChange from './PercentageChange'
import Colors from '@/constants/Colors'
import { numberWithCommas } from '@/Utilities'

type Props = {
  data: {
    market_data: {
      price_change_percentage_24h: number
      price_change_24h: number
      current_price: {
        usd: number
      }
    }
    name: string
    market_cap_rank: number
  }
}

const CoinDetailsHeader = ({ data }: Props) => {
  const currentPrice = data?.market_data?.current_price?.usd

  const { container, rankContainer, priceAnd24hContainer, coinText } = styles

  return (
    <>
      <View style={container}>
        <Text style={coinText}>{data?.name}</Text>
        <View style={rankContainer}>
          <Text style={[coinText, { color: Colors.secondary, fontSize: 10 }]}>
            #{data?.market_cap_rank}
          </Text>
        </View>
      </View>

      <View style={priceAnd24hContainer}>
        <Text style={coinText}>
          {currentPrice > 1
            ? `$${numberWithCommas(currentPrice.toFixed(2))}`
            : `$${currentPrice.toFixed(6)}`}
        </Text>
        <PercentageChange data={data} />
      </View>
    </>
  )
}

const styles = StyleSheet.create({
  container: { flexDirection: 'row', alignItems: 'center', gap: 4 },
  rankContainer: {
    paddingVertical: 2,
    paddingHorizontal: 4,
    backgroundColor: Colors.grey,
    borderRadius: 8
  },
  priceAnd24hContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: -5
  },
  coinText: {
    fontFamily: 'm-regular',
    fontSize: 18,
    color: '#fff'
  }
})

export default CoinDetailsHeader
