import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import Colors from '@/constants/Colors'
import { Ionicons } from '@expo/vector-icons'
import { useQuery } from '@tanstack/react-query'
import { marketCap } from '@/query'
import { formatNumber, numberWithCommas } from '@/Utilities'

const CustomHeader = () => {
  const {
    data: marketCapData,
    isLoading,
    isError
  } = useQuery({
    queryKey: ['Global Market Data'],
    queryFn: () => marketCap(),
    staleTime: 60 * 60 * 1000,
    refetchOnWindowFocus: false
  })

  const {
    safeArea,
    container,
    marketCapWrapper,
    headerRightContainer,
    avatarImg,
    marketCapText
  } = styles
  return (
    <SafeAreaView style={safeArea}>
      <View style={container}>
        <View style={marketCapWrapper}>
          <Text style={marketCapText}>Market Cap</Text>
          <Text style={{ ...marketCapText, color: Colors.primary }}>
            {formatNumber(marketCapData?.data.total_market_cap.usd)}T
          </Text>
        </View>
        <View style={headerRightContainer}>
          <Ionicons
            name={'notifications-outline'}
            size={26}
            color={Colors.primary}
            style={{ marginTop: 6 }}
          />
          <TouchableOpacity>
            <Image
              source={require('@/assets/images/avatar.jpg')}
              style={avatarImg}
            />
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: Colors.background,
    padding: 6
  },

  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderRadius: 6,
    padding: 16,
    height: 50
  },
  marketCapWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6
  },
  marketCapText: {
    color: '#fff',
    fontWeight: 'bold'
  },
  headerRightContainer: {
    flexDirection: 'row',
    gap: 8
  },
  avatarImg: {
    width: 40,
    height: 40,
    borderRadius: 50,
    borderWidth: 1.5,
    borderColor: Colors.primary
  }
})

export default CustomHeader
