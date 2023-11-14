import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import Colors from '@/constants/Colors'

type Props = {
  tabItems: string[]
  handleActiveTab: (tab: string) => void
  activeTab: string
}

const Tabs = ({ tabItems, handleActiveTab, activeTab }: Props) => {
  const { tabContainer, tabText, indicator } = styles
  return (
    <View
      style={{
        flexDirection: 'row',
        justifyContent: 'space-evenly'
      }}
    >
      {tabItems.map((tab) => {
        return (
          <TouchableOpacity key={tab} onPress={() => handleActiveTab(tab)}>
            <View
              style={
                activeTab === tab
                  ? [tabContainer, { opacity: 1 }]
                  : tabContainer
              }
            >
              <Text
                style={
                  activeTab === tab
                    ? [tabText, { fontFamily: 'm-medium' }]
                    : tabText
                }
              >
                {tab}
              </Text>
              <View
                style={
                  activeTab === tab
                    ? [indicator, { backgroundColor: Colors.primary }]
                    : indicator
                }
              ></View>
            </View>
          </TouchableOpacity>
        )
      })}
    </View>
  )
}
const styles = StyleSheet.create({
  tabContainer: {
    alignItems: 'center',
    opacity: 0.4,
    paddingVertical: 4,
    paddingHorizontal: 8
  },
  tabText: {
    color: '#fff',
    fontFamily: 'm-regular'
  },
  indicator: {
    width: 70,
    height: 2,
    backgroundColor: '#fff',
    borderRadius: 8,
    marginBottom: -3
  }
})

export default Tabs
