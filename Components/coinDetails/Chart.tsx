import { View, Text, StyleSheet, ScrollView } from 'react-native'
import React from 'react'
import { CurveType, LineChart } from 'react-native-gifted-charts'
import Colors from '@/constants/Colors'

const Chart = () => {
  const data = [
    { value: 0 },
    { value: 10 },
    { value: 80 },
    { value: 22 },
    { value: 44 },
    { value: 44 },
    { value: 40 },
    { value: 10 },
    { value: 10 },
    { value: 10 },
    { value: 30 },
    { value: 20 },
    { value: 70 }
  ]

  const { container } = styles
  return (
    <View style={container}>
      <LineChart
        data={data}
        rotateLabel
        hideDataPoints
        height={200}
        maxValue={105}
        adjustToWidth
        overflowTop={0}
        overflowBottom={0}
        // dataPointsColor={'red'}
        color={'#177AD5'}
        thickness={3}
        startFillColor={Colors.secondary}
        endFillColor1={Colors.primary}
        startOpacity={1}
        endOpacity={0.6}
        initialSpacing={5}
        // yAxisColor={Colors.primary}
        xAxisColor={Colors.primary}
        yAxisThickness={1}
        xAxisThickness={1}
        hideRules
        // rulesColor={Colors.silver}
        hideYAxisText
        // yAxisTextStyle={{ color: 'gray' }}
        showVerticalLines
        verticalLinesColor={'rgba(139, 139, 139, 0.4)'}
        verticalLinesThickness={0.5}
        // yAxisLabelPrefix=""
        // yAxisLabelSuffix=""
        curved
        curveType={CurveType.QUADRATIC}
        isAnimated
        areaChart
        //animateOnDataChange Not supported for curved
        animateOnDataChange
        pointerConfig={{
          pointerStripHeight: 100,
          pointerStripColor: Colors.silver,
          pointerStripWidth: 1,
          pointerStripUptoDataPoint: true,
          shiftPointerLabelX: 5,
          pointerColor: Colors.secondary,
          radius: 6,
          pointerLabelWidth: 100,
          pointerLabelHeight: 90,
          activatePointersOnLongPress: false,
          autoAdjustPointerLabelPosition: false,
          showPointerStrip: true,
          pointerLabelComponent: (items: any) => {
            return (
              <View
                style={{
                  width: 50,
                  justifyContent: 'center',
                  marginTop: -5,
                  marginLeft: -40
                }}
              >
                <Text
                  style={{
                    color: '#fff',
                    fontSize: 10,
                    fontFamily: 'm-regular',
                    textAlign: 'center'
                  }}
                >
                  {/* {items[0].value} */}
                  Test
                </Text>

                <View
                  style={{
                    paddingHorizontal: 8,
                    paddingVertical: 4,
                    borderRadius: 16,
                    backgroundColor: '#fff'
                  }}
                >
                  <Text
                    style={{
                      fontFamily: 'm-bold',
                      textAlign: 'center',
                      fontSize: 12
                    }}
                  >
                    {`$${items[0].value}`}
                  </Text>
                </View>
              </View>
            )
          }
        }}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    height: 220,
    paddingTop: 5,
    borderRadius: 8,
    overflow: 'scroll'
  }
})

export default Chart
