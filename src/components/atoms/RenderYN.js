import {StyleSheet, Text, View} from 'react-native'
import React from 'react'
import {FONT_SIZE, COLORS} from '../../constants'
import {ICON} from '.'

const RenderYN = ({val}) => {
  //   console.log('RenderYN', val)
  return 'Y' === val ? (
    <ICON.CUSTOM
      style={{marginLeft: 5}}
      name='check'
      color={COLORS.primary}
      size={FONT_SIZE.font14}
    ></ICON.CUSTOM>
  ) : (
    <ICON.CUSTOM
      style={{marginLeft: 5}}
      name='times'
      color='red'
      size={FONT_SIZE.font14}
    ></ICON.CUSTOM>
  )
}

export default RenderYN
