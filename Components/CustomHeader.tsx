import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import Colors from '@/constants/Colors'
import { Ionicons } from '@expo/vector-icons'

const CustomHeader = () => {
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
          <Text style={{ ...marketCapText, color: Colors.secondary }}>
            1.06 T
          </Text>
        </View>
        <View style={headerRightContainer}>
          <Ionicons
            name={'notifications-outline'}
            size={26}
            color={Colors.secondary}
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
    borderColor: Colors.secondary
  }
})

export default CustomHeader
