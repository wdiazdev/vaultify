import { View, Text, StyleSheet, AnimatableStringValue } from 'react-native'
import React from 'react'
import Colors from '@/constants/Colors'
import { formatCurrency, formatNumberBN } from '@/Utilities'

type Props = {
  data: {
    market_data: {
      price_change_percentage_24h: number
      ath: { usd: number }
      market_cap: { usd: number }
      current_price: {
        usd: number
      }
      total_supply: number
      circulating_supply: number
      max_supply: number
      low_24h: {
        usd: number
      }
      high_24h: {
        usd: number
      }
    }
    name: string
    market_cap_rank: number
  }
}

type InfoRowProps = {
  label: string
  value: string | number
  color: string
}

const Overview = ({ data }: Props) => {
  const { Container, text, separator } = styles

  const InfoRow = ({ label, value, color }: InfoRowProps) => (
    <>
      <View style={{ flexDirection: 'row', paddingVertical: 2 }}>
        <Text style={[text, { flex: 1 }]}>{label}</Text>
        <Text style={[text, { color: color }]}>{value}</Text>
      </View>
      <View style={separator} />
    </>
  )

  return (
    <View style={Container}>
      <InfoRow
        label={'Rank'}
        value={`#${data?.market_cap_rank}`}
        color={Colors.primary}
      />
      <InfoRow
        label={'Current Price'}
        value={`${formatCurrency(data?.market_data?.current_price.usd)}`}
        color={Colors.primary}
      />
      <InfoRow
        label={'Market Cap'}
        value={`${formatNumberBN(data?.market_data?.market_cap.usd)}`}
        color={Colors.primary}
      />
      <InfoRow
        label={'All Time High'}
        value={`${formatCurrency(data?.market_data?.ath.usd)}`}
        color={Colors.primary}
      />
      <InfoRow
        label={'Max Supply'}
        value={`${formatCurrency(data?.market_data?.max_supply)}`}
        color={Colors.primary}
      />
      <InfoRow
        label={'Total Supply'}
        value={`${formatCurrency(data?.market_data?.total_supply)}`}
        color={Colors.primary}
      />
      <InfoRow
        label={'Circulating Supply'}
        value={`${formatCurrency(data?.market_data?.circulating_supply)}`}
        color={Colors.primary}
      />
      <InfoRow
        label={'24H Low'}
        value={`${formatCurrency(data?.market_data?.low_24h.usd)}`}
        color={Colors.primary}
      />
      <InfoRow
        label={'24H High'}
        value={`${formatCurrency(data?.market_data?.high_24h.usd)}`}
        color={Colors.primary}
      />
    </View>
  )
}
const styles = StyleSheet.create({
  Container: {
    backgroundColor: Colors.grey,
    padding: 8,
    borderRadius: 8
  },
  text: { fontFamily: 'm-medium', fontSize: 12, color: '#fff' },
  separator: {
    height: 1,
    backgroundColor: Colors.silver,
    opacity: 0.2,
    marginVertical: 5
  }
})

export default Overview
