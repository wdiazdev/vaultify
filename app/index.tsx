import { Text, StyleSheet, View, ActivityIndicator, Image } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import Colors from '@/constants/Colors'
import { useQuery } from '@tanstack/react-query'
import { singleCoin } from '@/query'
import { formatCurrency } from '@/Utilities'

const index = () => {
  const { data, isLoading, error, isError, isSuccess } = useQuery({
    queryKey: ['Single Coins'],
    queryFn: () => singleCoin('bitcoin'),
    staleTime: 60 * 60 * 1000,
    refetchOnWindowFocus: false
  })
  console.log('data:', data)

  const {
    container,
    cardContainer,
    cardDetails,
    wrapperImg,
    coinInfoHeader,
    headerText
  } = styles

  return (
    <SafeAreaView style={container}>
      <View
        style={
          isLoading
            ? { ...cardContainer, justifyContent: 'center' }
            : cardContainer
        }
      >
        {isLoading && <ActivityIndicator size={'large'} />}

        <View style={cardDetails}>
          {isSuccess && !isLoading && (
            <View style={{ alignItems: 'center', justifyContent: 'center' }}>
              <Image source={{ uri: data?.image }} style={wrapperImg} />
              <View style={coinInfoHeader}>
                <Text style={[headerText, { flex: 1 }]}>
                  {data?.symbol.toUpperCase()}
                </Text>
                <Text style={[headerText, { color: Colors.secondary }]}>
                  #{data?.market_cap_rank}
                </Text>
              </View>

              <Text style={[headerText, { fontSize: 18 }]}>{data?.name}</Text>
              <Text style={[headerText, { fontSize: 18 }]}>
                {formatCurrency(data?.current_price)}
              </Text>
            </View>
          )}
        </View>
        {!isLoading && !isSuccess && (
          <>
            <Text>No data found.</Text>
          </>
        )}
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
    padding: 8
  },
  cardContainer: {
    backgroundColor: '#141414',
    marginTop: 24,
    height: 100,
    borderRadius: 6,
    overflow: 'hidden',
    padding: 8,
    elevation: 1
  },
  cardDetails: { position: 'relative' },
  coinInfoHeader: {
    flexDirection: 'row'
  },
  headerText: {
    fontSize: 20,
    color: '#fff',
    fontWeight: 'bold'
  },
  wrapperImg: {
    position: 'absolute',
    top: -20,
    left: -40,
    width: 130,
    height: 130,
    opacity: 0.6
  }
})

export default index

// shadowColor: '#000'
// shadowOffset: { width: -2, height: 4 },
// shadowOpacity: 0.2,
// shadowRadius: 3,
// ShadowOffset: {
//   width: 0,
//   height: 1
// }
