import {StyleSheet, TextInput, Text, View} from 'react-native'
import React from 'react'
import {COLORS, SIZE} from '../../constants'

const UIPPTextInput = (props) => {
  const {style: propStyle, ...otherProps} = props

  return (
    <View>
      <TextInput
        {...otherProps}
        autoCorrect={false}
        placeholderTextColor={'#888'}
        multiline
        style={[
          {
            fontSize: SIZE.size13,

            lineHeight: SIZE.size13 * 1.5,
            borderColor: '#d3d3d3',
            width: '100%',
            backgroundColor: props?.disabled ? '#f2f2f2' : '#fff',
            // height: 40,
            // minHeight: 40,
            paddingVertical: 7,
            borderRadius: 5,
            borderWidth: 1,
            paddingHorizontal: 10,
          },
          propStyle,
        ]}
      />
      <Text style={styles.labelStyle}>{props?.label}</Text>
    </View>
  )
}

export default UIPPTextInput

const styles = StyleSheet.create({
  labelStyle: {
    fontSize: SIZE.size13,
    position: 'absolute',
    top: -10,
    left: 10,
    color: '#000',
    fontWeight: 'bold',
    backgroundColor: '#fff',
    paddingHorizontal: 5,
    gap: 5,
  },
})
