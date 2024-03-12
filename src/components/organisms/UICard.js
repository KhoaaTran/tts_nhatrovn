import {View, Text, Pressable} from 'react-native'
import {COLORS, SIZE} from '../../constants'
import {useRef} from 'react'

import React from 'react'
import {UIIcon} from '../atoms'

const Card = (props) => {
  const {header, outsideBtn = []} = props
  const width = useRef(`${100 / outsideBtn.length}%`).current
  return (
    <View
      style={{
        borderRadius: SIZE.size20,
        borderWidth: 1.5,
        borderColor: COLORS.primary,

        backgroundColor: '#fff',

        shadowColor: '#000',
        shadowOffset: {
          width: 0,
          height: 5,
        },
        shadowOpacity: 0.34,
        shadowRadius: 6.27,

        elevation: 10,
      }}
    >
      <View
        style={{
          // borderStyle: "dashed",
          borderStyle: 'solid',
          borderImage:
            'url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+P+/HgAFDgJp6K7QDQAAAABJRU5ErkJggg==") 1 1 repeat',
          borderBottomWidth: 1,
          borderBottomColor: COLORS.primary,
          paddingVertical: SIZE.size10,
        }}
      >
        <View>
          <Text
            style={{
              color: '#333',
              fontSize: SIZE.size18,
              textAlign: 'center',
              fontWeight: 600,
            }}
          >
            {header}
          </Text>
        </View>
      </View>

      <View
        style={{
          padding: SIZE.size10,
          zIndex: -1,
        }}
      >
        <View style={{gap: 5}}>{props.children}</View>
      </View>
      {!!outsideBtn.length && (
        <View
          style={{
            flexDirection: 'row',
            borderImage:
              'url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+P+/HgAFDgJp6K7QDQAAAABJRU5ErkJggg==") 1 1 repeat',
            borderStyle: 'solid',
            borderTopWidth: 1,
            borderColor: COLORS.primary,
          }}
        >
          {outsideBtn.map((item, index) => (
            <Pressable
              key={index}
              disabled={item.disabled || false}
              onPress={item.onPress}
              style={{
                width: width,
                alignItems: 'center',
                padding: 10,
              }}
            >
              <UIIcon.CUSTOM
                color={
                  item.iconColor
                    ? item.iconColor
                    : item.disabled
                    ? '#ccc'
                    : item.iconColor
                }
                name={item.icon}
                size={SIZE.size20}
              />
            </Pressable>
          ))}
        </View>
      )}
    </View>
  )
}

export default React.memo(Card)
