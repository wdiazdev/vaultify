import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import React, { useState } from 'react'
import { Feather } from '@expo/vector-icons'
import { numberWithCommas } from '@/Utilities'

type Props = {
  data: {
    market_data: {
      price_change_percentage_24h: number
      price_change_24h: number
    }
  }
}

const PercentageChange = ({ data }: Props) => {
  const [change, setChange] = useState<boolean>(true)

  const percentage = parseFloat(
    data?.market_data?.price_change_percentage_24h.toFixed(2)
  )

  const priceChange = Math.abs(data?.market_data?.price_change_24h)

  const formatPriceChange = () => {
    if (change) {
      return `${percentage}%`
    } else if (!change && priceChange) {
      return `$${
        priceChange > 1
          ? numberWithCommas(priceChange.toFixed(2))
          : priceChange.toFixed(6)
      }`
    } else {
      return null
    }
  }

  const toggleChange = () => {
    setChange(!change)
  }

  const { percentageContainer, percentageContainerText } = styles

  return (
    <TouchableOpacity onPress={toggleChange}>
      <View
        style={
          percentage > 0
            ? percentageContainer
            : [percentageContainer, { backgroundColor: '#dc0000c8' }]
        }
      >
        <Feather
          name={percentage > 0 ? 'chevron-up' : 'chevron-down'}
          size={14}
          color={'white'}
        />
        <Text style={percentageContainerText}>{formatPriceChange()}</Text>
      </View>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  percentageContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    paddingHorizontal: 4,
    backgroundColor: '#7efd00b2',
    borderRadius: 8
  },
  percentageContainerText: {
    fontFamily: 'm-medium',
    fontSize: 12,
    color: 'white',
    marginTop: 2
  }
})

export default PercentageChange
