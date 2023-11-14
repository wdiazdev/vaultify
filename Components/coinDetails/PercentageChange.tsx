import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import React from 'react'
import { Feather } from '@expo/vector-icons'

type Props = {
  percentage: number
}

const PercentageChange = ({ percentage }: Props) => {
  const { percentageContainer, percentageContainerText } = styles

  return (
    <TouchableOpacity>
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
        <Text style={percentageContainerText}>{percentage}%</Text>
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
