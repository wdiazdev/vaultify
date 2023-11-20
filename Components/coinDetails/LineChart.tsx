import { View, Dimensions } from 'react-native'
import React, { useEffect, useState } from 'react'
import { LineChart as Chart } from 'react-native-chart-kit'
import Colors from '@/constants/Colors'
import { useQuery } from '@tanstack/react-query'
import { historicalChartData } from '@/query'

type Props = { id: string }

const LineChart = ({ id }: Props) => {
  const { data, isLoading, isSuccess } = useQuery({
    queryKey: ['Coins Chart', id],
    queryFn: () => historicalChartData(id, '1'),
    staleTime: 60 * 60 * 1000,
    refetchOnWindowFocus: false,
    retry: 2
  })

  const [pricesData, setPricesData] = useState<number[]>([])
  console.log('pricesData:', pricesData)

  useEffect(() => {
    if (isSuccess && data) {
      const filteredData = data.prices?.map((crypto: number[]) => crypto[1])

      if (filteredData && filteredData.length > 0) {
        setPricesData(filteredData)
      }
    }
  }, [isSuccess, data])

  return (
    <View>
      <Chart
        data={{
          labels: [],
          datasets: [
            {
              data: pricesData
            }
          ]
        }}
        width={Dimensions.get('window').width - 25} // from react-native
        height={220}
        withDots={false}
        yAxisLabel="$"
        yAxisInterval={1} // optional, defaults to 1
        chartConfig={{
          backgroundColor: Colors.grey,
          backgroundGradientFrom: Colors.primary,
          backgroundGradientTo: Colors.secondary,
          decimalPlaces: 0, // optional, defaults to 2dp
          color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
          labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
          style: {
            borderRadius: 16
          },
          propsForDots: {
            r: '4',
            strokeWidth: '1',
            stroke: Colors.primary
          }
        }}
        bezier
        style={{
          marginVertical: 8,
          borderRadius: 8
        }}
      />
    </View>
  )
}

export default LineChart
