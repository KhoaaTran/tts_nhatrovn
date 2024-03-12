import {Text} from 'react-native'
import React from 'react'
import {SIZE} from '../../constants'

const TextCT = (props) => {
  const {type = 'text', style = {}, children, ...otherProps} = props
  const getTextType = (value) => {
    switch (value) {
      case 'title': {
        return (
          <Text
            style={[
              {
                color: '#000',
                fontFamily: 'Roboto-Medium',
                fontSize: SIZE.size18,
              },
              style,
            ]}
          >
            {children}
          </Text>
        )
      }

      case 'h2': {
        return (
          <Text
            style={[
              {
                color: '#000',
                fontFamily: 'Roboto-Medium',
                fontSize: SIZE.size16,
              },
              style,
            ]}
          >
            {children}
          </Text>
        )
      }

      case 'error': {
        return (
          <Text
            style={[
              {
                color: '#000',
                fontFamily: 'Roboto-Medium',
                fontSize: SIZE.size14,
                color: '#f00',
              },
              style,
            ]}
          >
            {children}
          </Text>
        )
      }

      case 'text': {
        return (
          <Text
            style={[
              {
                fontFamily: 'Roboto-Regular',
                color: '#333',
                fontSize: SIZE.size13,
              },
              style,
            ]}
          >
            {children}
          </Text>
        )
      }

      case 'textCard': {
        return (
          <Text
            style={[
              {
                fontFamily: 'Roboto-Regular',
                color: '#666',
                fontSize: SIZE.size14,
                flex: 2,
              },
              style,
            ]}
          >
            {children}
          </Text>
        )
      }

      case 'contentCard': {
        return (
          <Text
            style={[
              {
                fontFamily: 'Roboto-Medium',
                color: '#34ADCD',
                fontSize: SIZE.size14,
                textAlign: 'right',
                lineHeight: SIZE.size14 * 1.5,
                flex: 3,
              },
              style,
            ]}
          >
            {children}
          </Text>
        )
      }

      case 'labelInput': {
        return (
          <Text
            style={[
              {
                fontFamily: 'Roboto-Medium',
                color: '#000',
                fontSize: SIZE.size13,
              },
              style,
            ]}
          >
            {children}
          </Text>
        )
      }

      case 'notInput': {
        return (
          <Text
            {...otherProps}
            style={[
              {
                fontFamily: 'Roboto-Regular',
                color: '#333',
                fontSize: SIZE.size13,
                lineHeight: SIZE.size13 * 1.5,
              },
              style,
            ]}
          >
            {children}
          </Text>
        )
        // return (
        //   <Text
        //     style={[
        //       {
        //         borderColor: '#d3d3d3',
        //         width: '100%',
        //         borderWidth: 1,
        //         borderRadius: 10,
        //         padding: SIZE.size10,
        //         paddingVertical: SIZE.size10,
        //         backgroundColor: '#eee',
        //         fontSize: SIZE.size13,
        //         color: '#000',
        //         lineHeight: SIZE.size13 * 1.5,
        //         //minHeight: SIZE.size32,
        //         // backgroundColor: 'red'
        //       },
        //       style,
        //     ]}>
        //     {children}
        //   </Text>
        // );
      }

      case 'labelBtn': {
        return (
          <Text
            style={[
              {
                color: '#fff',
                fontSize: SIZE.size15,
              },
              style,
            ]}
          >
            {children}
          </Text>
        )
      }

      case 'error': {
        return (
          <Text
            style={[
              {
                fontFamily: 'Roboto-Regular',
                color: 'red',
                fontSize: SIZE.size13,
                lineHeight: SIZE.size13 * 1.5,
              },
              style,
            ]}
          >
            {children}
          </Text>
        )
      }

      default: {
        return (
          <Text
            style={[
              {
                fontFamily: 'Roboto-Regular',
                color: '#888',
                fontSize: SIZE.size13,
              },
              style,
            ]}
          >
            {children}
          </Text>
        )
      }
    }
  }

  return getTextType(type)
}

export default React.memo(TextCT)
