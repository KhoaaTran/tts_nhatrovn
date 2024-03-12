import {Pressable} from 'react-native'
import {UIText, UIIcon} from '../../components/atoms'
import {COLORS, SIZE} from '../../constants'
import React from 'react'

const UIButton = (props) => {
  const {
    style = {},
    label,
    leftIcon,
    rightIcon,
    styleLabel = {},
    sizeIcon = SIZE.size20,
  } = props
  const getButtonType = (value) => {
    switch (value) {
      case 'normal': {
        return (
          <Pressable
            {...props}
            style={[
              {
                backgroundColor: COLORS.primary,
                padding: SIZE.size10,
                // borderRadius: 20,
              },
              props.style,
            ]}
          >
            <UIText style={[{textAlign: 'center'}, styleLabel]} type='labelBtn'>
              {props.label}
            </UIText>
          </Pressable>
        )
      }

      case 'text': {
        return (
          <Pressable
            {...props}
            style={[
              {flexDirection: 'row', gap: 8, alignItems: 'center'},
              style,
            ]}
          >
            {leftIcon && <UIIcon.CUSTOM name={leftIcon} size={sizeIcon} />}
            {label && (
              <UIText
                style={[{color: COLORS.primary}, styleLabel]}
                type='labelBtn'
              >
                {label}
              </UIText>
            )}
            {rightIcon && <UIIcon.CUSTOM name={rightIcon} size={SIZE.size18} />}
          </Pressable>
        )
      }

      default: {
        return (
          <Pressable
            {...props}
            style={[
              {
                backgroundColor: COLORS.primary,
                padding: SIZE.size10,
                // borderRadius: 20,
              },
              props.style,
            ]}
          >
            <UIText style={[{textAlign: 'center'}, styleLabel]} type='labelBtn'>
              {props.label}
            </UIText>
          </Pressable>
        )
      }
    }
  }
  return getButtonType(props.type)
}

export default React.memo(UIButton)
