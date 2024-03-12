import { TextInput as TextInputRN } from 'react-native'
import React from 'react'
import { SIZE } from '../../constants'

const TextInput = (props) => {
  const { style: propStyle, ...otherProps } = props;
  return (
    <TextInputRN
      {...otherProps}
      style={[
        {
          borderColor: '#d3d3d3',
          width: '100%',
          borderWidth: 1,
          borderRadius: 10,
          padding: SIZE.size10,
          paddingVertical: SIZE.size5,
          backgroundColor: '#fff',
          fontSize: SIZE.size13,
          color: '#000',
          lineHeight: SIZE.size13 * 1.5,
        },
        propStyle,
      ]}
      autoCorrect={false}
      placeholderTextColor={'#888'}
    />
  )
}

export default React.memo(TextInput)
