import {View, StyleSheet, Image, Pressable} from 'react-native'
import React from 'react'
import Ring from './Ring'
import {COLORS} from '../../../constants'

const COLOR = '#6E01EF'
const SIZE = 50

const PhoneRing = (props) => {
  const {size, backgroundColor, onPress, tintColor} = props
  return (
    <Pressable onPress={onPress} style={styles.container}>
      <View
        style={[
          styles.dot,
          styles.center,
          {
            height: size ? size * 2 : SIZE,
            width: size ? size * 2 : SIZE,
            borderRadius: 999,
            backgroundColor: backgroundColor ?? COLOR,
          },
        ]}
      >
        {[...Array(2).keys()].map((_, index) => (
          <Ring key={index} index={index} />
        ))}
        <Image
          tintColor={tintColor ?? COLORS.primary}
          style={{width: size ?? 30, height: size ?? 30}}
          source={require('../../../assets/icon/call_support.png')}
        />
      </View>
    </Pressable>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  dot: {
    height: SIZE,
    width: SIZE,
    borderRadius: SIZE / 2,
    backgroundColor: COLOR,
  },
  center: {
    justifyContent: 'center',
    alignItems: 'center',
  },
})

export default PhoneRing
