import {Pressable, View, Text} from 'react-native'
import {useState} from 'react'
import {COLORS} from '../../constants'
import FastImage from 'react-native-fast-image'

export default UIFeatureBtn = ({
  text,
  width,
  onPress,
  src,
}) => {
  const [parentWidth, setParentWidth] = useState(0)
  return (
    <Pressable
      onLayout={(event) => {
        const {width} = event.nativeEvent.layout
        setParentWidth(width)
      }}
      style={{alignItems: 'center', padding: 10, width: width}}
      onPress={onPress}
    >
      <View
        style={{
          borderWidth: 1,
          padding: 5,
          borderRadius: 10,
          borderColor: COLORS.primary,
          backgroundColor: '#fff',
          shadowColor: '#000',
          shadowOffset: {
            width: 0,
            height: 2,
          },
          shadowOpacity: 0.25,
          shadowRadius: 3.84,

          elevation: 5,
        }}
      >
        <FastImage
          style={{
            width: (parentWidth / 365) * 125,
            height: (parentWidth / 365) * 125,
          }}
          source={src}
        />
      </View>
      <Text
        numberOfLines={2}
        style={{
          textAlign: 'center',
          marginTop: 5,
          color: '#000',
          fontSize: (parentWidth / 365) * 48,
          lineHeight: (parentWidth / 365) * 48 * 1.3,
          marginTop: 5,
        }}
      >
        {text}
      </Text>
    </Pressable>
  )
}
