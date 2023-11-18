import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ActivityIndicator,
  ScrollView
} from 'react-native'
import React, { useLayoutEffect, useState } from 'react'
import { useLocalSearchParams, useNavigation } from 'expo-router'
import Colors from '@/constants/Colors'
import { Feather, Ionicons } from '@expo/vector-icons'
import { useQuery } from '@tanstack/react-query'
import { fetchCoinData } from '@/query'
import CoinDetailsHeader from '@/Components/coinDetails/CoinDetailsHeader'
import Chart from '@/Components/coinDetails/Chart'
import Tabs from '@/Components/Tabs'
import News from '@/Components/coinDetails/News'
import Overview from '@/Components/coinDetails/Overview'

const coinDetails = () => {
  const [activeTab, setActiveTab] = useState<string>('Overview')

  const { id } = useLocalSearchParams()

  const handleActiveTab = (tab: string) => {
    setActiveTab(tab)
  }

  const tabItems = ['Overview', 'News']

  const navigation = useNavigation()

  const { data, isLoading, isSuccess } = useQuery({
    queryKey: ['Coins Data', id],
    queryFn: () => fetchCoinData(id),
    staleTime: 60 * 60 * 1000,
    refetchOnWindowFocus: false,
    retry: 2
  })
  // console.log("data:", data);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTransparent: true,
      headerTitle: topHeaderInfo,
      headerTitleAlign: 'center',
      headerTintColor: Colors.primary,
      headerBackVisible: false,
      headerLeft: topHeaderLeft,
      headerRight: topHeaderRight
    })
  })

  const topHeaderInfo = () => {
    return (
      <>
        {isLoading && (
          <ActivityIndicator size={'small'} color={Colors.primary} />
        )}
        {!isLoading && isSuccess && (
          <View style={topHeaderContainer}>
            <Image source={{ uri: data?.image.small }} style={topHeaderImg} />
            <Text style={topHeaderText}>{data?.symbol?.toUpperCase()}</Text>
          </View>
        )}
      </>
    )
  }

  const topHeaderLeft = () => {
    return (
      <TouchableOpacity
        onPress={() => navigation.goBack()}
        style={topHeaderBtn}
      >
        <Ionicons name={'arrow-back'} size={22} color={Colors.primary} />
      </TouchableOpacity>
    )
  }

  const topHeaderRight = () => {
    return (
      <TouchableOpacity style={topHeaderBtn}>
        <Ionicons name={'star-outline'} size={20} color={Colors.primary} />
      </TouchableOpacity>
    )
  }

  const percentage: number =
    data?.market_data?.price_change_percentage_24h.toFixed(2)

  const {
    container,
    topHeaderContainer,
    topHeaderBtn,
    topHeaderText,
    topHeaderImg,
    coinDetailsContainer,
    errorContainer,
    errorText
  } = styles

  return (
    <View
      style={
        isLoading || !isSuccess
          ? [container, { justifyContent: 'center', alignItems: 'center' }]
          : container
      }
    >
      {isLoading && <ActivityIndicator size={'large'} color={Colors.primary} />}

      {!isLoading && isSuccess && (
        <ScrollView style={coinDetailsContainer}>
          <Tabs
            handleActiveTab={handleActiveTab}
            activeTab={activeTab}
            tabItems={tabItems}
          />
          <View style={{ marginTop: 10 }}>
            {activeTab === 'Overview' && (
              <>
                <CoinDetailsHeader data={data} />
                <Chart percentage={percentage} />
                <Overview data={data} />
              </>
            )}
            {activeTab === 'News' && (
              <>
                <News />
              </>
            )}
          </View>
        </ScrollView>
      )}

      {!isLoading && !isSuccess && (
        <View style={errorContainer}>
          <Feather
            name={'frown'}
            size={16}
            color={'white'}
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
    flex: 1,
    backgroundColor: Colors.background,
    padding: 12
  },
  topHeaderBtn: {
    backgroundColor: Colors.grey,
    padding: 6,
    borderRadius: 50
  },
  topHeaderContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4
  },
  topHeaderText: {
    fontFamily: 'm-medium',
    color: Colors.primary,
    marginTop: 2
  },
  topHeaderImg: {
    width: 30,
    height: 30
  },
  coinDetailsContainer: {
    marginTop: 70
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

export default coinDetails
