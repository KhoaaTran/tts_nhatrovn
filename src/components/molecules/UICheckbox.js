import {View, Pressable} from 'react-native'
import {UIText, UIIcon} from '../atoms'
import React from 'react'

const UICheckbox = (props) => {
  const {value, setValue} = props
  return (
    <Pressable
      style={{flexDirection: 'row', gap: 5}}
      onPress={() => setValue(!value)}
    >
      <View
        style={{
          width: 20,
          height: 20,
          borderWidth: 1,
          borderColor: '#888',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        {value && <UIIcon.CUSTOM name='check' size={14} />}
      </View>

      <UIText type='labelInput'>{props.label}</UIText>
    </Pressable>
  )
}

export default UICheckbox
