import {View, TextInput, Pressable} from 'react-native'
import React, {memo} from 'react'
import {COLORS, SIZE} from '../../constants'
import {UIIcon} from '../atoms'

const UISearchBar = (props) => {
  const {
    style,
    placeholder,
    value,
    multiline,
    numberOfLines,
    color,
    textColor,
    placeholderTextColor,
    prefix,
    affix,
    allowClear,
    onChangeText,
    fontSize,
    onPress,
  } = props
  console.log('re-render')
  return (
    <Pressable onPress={onPress}>
      <View
        pointerEvents={!!onPress ? 'none' : 'auto'}
        style={[
          {
            minHeight:
              multiline && numberOfLines
                ? SIZE.size18 * numberOfLines
                : SIZE.size18,
            paddingHorizontal: SIZE.size8,
            borderRadius: SIZE.size15,
            justifyContent: 'center',
            backgroundColor: color ?? '#fff',
            flexDirection: 'row',
            alignItems: multiline ? 'flex-start' : 'center',
          },
          style,
        ]}
      >
        {prefix && <View style={{paddingVertical: SIZE.size10}}>{prefix}</View>}

        <View style={{flex: 1}}>
          <TextInput
            textAlignVertical={multiline ? 'top' : 'center'}
            autoComplete='off'
            spellCheck={false}
            autoCorrect={false}
            style={[
              {
                padding: SIZE.size10,
                fontSize: fontSize ?? SIZE.size14,
                color: textColor ?? '#000',
              },
            ]}
            placeholder={placeholder ?? 'Search...'}
            placeholderTextColor={placeholderTextColor ?? '#676767'}
            value={value}
            onChangeText={onChangeText}
            multiline={multiline}
            numberOfLines={numberOfLines}
            autoCapitalize='none'
          />
        </View>

        {affix && <View style={{paddingVertical: SIZE.size10}}>{affix}</View>}

        {allowClear && value && (
          <Pressable
            style={{paddingVertical: SIZE.size10}}
            onPress={() => onChangeText('')}
          >
            <UIIcon.CUSTOM name='times-circle' color={COLORS.primary} />
          </Pressable>
        )}
      </View>
    </Pressable>
  )
}

export default memo(UISearchBar)
