import React from 'react'
import { Pressable, View } from 'react-native'
import { UITextInput, UIText, UIIcon } from '../../components/atoms'
import { SIZE } from '../../constants'

const UITextInputLB = (props) => {
  const {
    style: propStyle,
    leftType = 'text',
    rightType = 'text',
    leftInputValue,
    onChangeLeftInputValue,
    rightInputValue,
    onChangeRightInputValue,
    readOnly,
    warning = false,
    iconDate = 'calendar',
    ...otherProps
  } = props

  const getInputType = (value) => {
    switch (value) {
      case 'text': {
        return (
          <View style={[{ gap: 5 }, propStyle]}>
            <View style={{ marginLeft: 5 }}>
              <UIText type='labelInput'>
                {props.label}
                {props.required && <UIText style={{ color: 'red' }}> *</UIText>}
              </UIText>
            </View>
            {props.readOnly ? (
              props.onPress ? (
                <View>
                  <Pressable
                    onPress={props.onPress}
                    style={{
                      padding: SIZE.size8,
                      borderRadius: 10,
                      gap: 5,
                      borderWidth: 1,
                      borderColor: '#d3d3d3',
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                    }}
                  >
                    {!!warning ? (
                      <UIText
                        style={{ textAlign: 'left', color: 'red', flexShrink: 1 }}
                        type='notInput'
                      >
                        {warning}
                      </UIText>
                    ) : (
                      <UIText
                        style={{ textAlign: 'left', flexShrink: 1 }}
                        type='notInput'
                      >
                        {props.value}
                      </UIText>
                    )}

                    <UIIcon.CUSTOM
                      name='chevron-down'
                      size={18}
                    ></UIIcon.CUSTOM>
                  </Pressable>
                  {props.error && (
                    <View
                      style={{
                        marginLeft: 5,
                      }}
                    >
                      <UIText style={{ textAlign: 'left' }} type='error'>
                        {props.error}
                      </UIText>
                    </View>
                  )}
                </View>
              ) : (
                <View
                  style={{
                    padding: 12,
                    backgroundColor: '#ecf0f1',
                    borderRadius: 10,
                    gap: 5,
                  }}
                >
                  <UIText style={{ textAlign: 'left' }} type='notInput'>
                    {props.value}
                  </UIText>
                </View>
              )
            ) : (
              <View>
                <View
                  style={{
                    paddingHorizontal: 8,
                    borderColor: '#d3d3d3',
                    width: '100%',
                    borderWidth: 1,
                    borderRadius: 10,
                    backgroundColor: '#fff',
                  }}
                >
                  <UITextInput
                    style={{
                      backgroundColor: 'transparent',
                      borderWidth: 0,
                      borderRadius: 10,
                      padding: 0,
                    }}
                    {...otherProps}
                  />
                </View>

                {props.error && (
                  <View
                    style={{
                      marginLeft: 5,
                    }}
                  >
                    <UIText style={{ textAlign: 'left' }} type='error'>
                      {props.error}
                    </UIText>
                  </View>
                )}
              </View>
            )}
          </View>
        )
      }

      case 'normal': {
        return (
          <View style={{ gap: 5 }}>
            <View style={{ marginLeft: 5 }}>
              <UIText type='labelInput'>
                {props.label}
                {props.required && <UIText style={{ color: 'red' }}> *</UIText>}
              </UIText>
            </View>
            {props.readOnly ? (
              <View
                style={{
                  padding: 0,
                  backgroundColor: '#ecf0f1',
                  borderRadius: 10,
                  gap: 5,
                }}
              >
                <UITextInput
                  editable={false}
                  style={{
                    textAlign: props.align || 'left',
                    backgroundColor: '#eee',
                    color: '#000',
                  }}
                  {...props}
                />
              </View>
            ) : (
              <UITextInput
                style={{ textAlign: props.align || 'left' }}
                {...props}
              />
            )}
          </View>
        )
      }

      case 'number': {
        return (
          <View style={[{ gap: 5 }, propStyle]}>
            <View style={{ marginLeft: 5 }}>
              <UIText type='labelInput'>
                {props.label}
                {props.required && <UIText style={{ color: 'red' }}> *</UIText>}
              </UIText>
            </View>
            {props.readOnly ? (
              props.onPress ? (
                <View>
                  <Pressable
                    onPress={props.onPress}
                    style={{
                      padding: SIZE.size8,
                      borderRadius: 10,
                      gap: 5,
                      borderWidth: 1,
                      borderColor: '#d3d3d3',
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                    }}
                  >
                    {!!warning ? (
                      <UIText
                        style={{ textAlign: 'left', color: 'red', flexShrink: 1 }}
                        type='notInput'
                      >
                        {warning}
                      </UIText>
                    ) : (
                      <UIText
                        style={{ textAlign: 'left', flexShrink: 1 }}
                        type='notInput'
                      >
                        {props.value}
                      </UIText>
                    )}

                    <UIIcon.CUSTOM
                      name='chevron-down'
                      size={18}
                    ></UIIcon.CUSTOM>
                  </Pressable>
                  {props.error && (
                    <View
                      style={{
                        marginLeft: 5,
                      }}
                    >
                      <UIText style={{ textAlign: 'left' }} type='error'>
                        {props.error}
                      </UIText>
                    </View>
                  )}
                </View>
              ) : (
                <View
                  style={{
                    padding: 12,
                    backgroundColor: '#ecf0f1',
                    borderRadius: 10,
                    gap: 5,
                  }}
                >
                  <UIText style={{ textAlign: 'left' }} type='notInput'>
                    {props.value}
                  </UIText>
                </View>
              )
            ) : (
              <View>
                <View
                  style={{
                    paddingHorizontal: 8,
                    borderColor: '#d3d3d3',
                    width: '100%',
                    borderWidth: 1,
                    borderRadius: 10,
                    backgroundColor: '#fff',
                  }}
                >
                  <UITextInput
                    style={{
                      backgroundColor: 'transparent',
                      borderWidth: 0,
                      borderRadius: 10,
                      padding: 0,
                      textAlign: 'right',
                    }}
                    inputMode='decimal'
                    multiline={true}
                    numberOfLines={1}
                    {...otherProps}
                  />
                </View>

                {props.error && (
                  <View
                    style={{
                      marginLeft: 5,
                    }}
                  >
                    <UIText style={{ textAlign: 'left' }} type='error'>
                      {props.error}
                    </UIText>
                  </View>
                )}
              </View>
            )}
          </View>
        )
      }

      case 'date': {
        return (
          <View style={[{ gap: 5 }, props.style]}>
            <View style={{ marginLeft: 5 }}>
              <UIText type='labelInput'>
                {props.label}{' '}
                {props.required && <UIText style={{ color: 'red' }}> *</UIText>}
              </UIText>
            </View>

            <Pressable
              onPress={props.onPress}
              disabled={readOnly}
              style={{
                padding: SIZE.size8,
                backgroundColor: readOnly ? '#ecf0f1' : '#fff',
                borderWidth: readOnly ? 0 : 1,
                borderColor: '#d3d3d3',
                borderRadius: 10,
                flexDirection: 'row',
                gap: 5,
                alignItems: 'center',
              }}
            >
              <UIIcon.CUSTOM name={iconDate} size={SIZE.size18}></UIIcon.CUSTOM>
              <UIText type='notInput'>{props.value}</UIText>
            </Pressable>

            {props.error && (
              <View
                style={{
                  marginLeft: 5,
                }}
              >
                <UIText style={{ textAlign: 'left' }} type='error'>
                  {props.error}
                </UIText>
              </View>
            )}
          </View>
        )
      }

      case 'twoColumn': {
        return (
          <View style={[{ gap: 5 }, props.style]}>
            <View style={{ marginLeft: 5 }}>
              <UIText type='labelInput'>
                {props.label}
                {props.required && <UIText style={{ color: 'red' }}> *</UIText>}
              </UIText>
            </View>
            <View style={{ flexDirection: 'row' }}>
              {leftType === 'text' ? (
                <View style={{ flex: 1 }}>
                  <UITextInput
                    style={{
                      textAlign: 'left',
                      borderTopRightRadius: 0,
                      borderBottomRightRadius: 0,
                    }}
                    value={leftInputValue}
                    onChangeText={onChangeLeftInputValue}
                  />
                </View>
              ) : leftType === 'func' ? (
                <Pressable
                  onPress={props.onLeftPress}
                  style={{
                    flexDirection: 'row',
                    flex: props.rightType === 'func' ? 1 : undefined,
                    gap: 5,
                    borderWidth: 1,
                    padding: SIZE.size10,
                    paddingVertical: SIZE.size5,
                    borderColor: '#d3d3d3',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    borderTopLeftRadius: 10,
                    borderBottomLeftRadius: 10,
                    maxWidth: '70%',
                  }}
                >
                  <UIText numberOfLines={1} type='notInput'>
                    {props.leftBtnValue}
                  </UIText>
                  <UIIcon.CUSTOM name='chevron-down' size={SIZE.size16} />
                </Pressable>
              ) : leftType === 'number' ? (
                <View style={{ flex: 1 }}>
                  <UITextInput
                    inputMode='numeric'
                    style={{
                      // textAlign: 'right',
                      borderTopRightRadius: 0,
                      borderBottomRightRadius: 0,
                    }}
                    value={leftInputValue}
                    onChangeText={onChangeLeftInputValue}
                  />
                </View>
              ) : null}

              {rightType === 'text' ? (
                <View style={{ flex: 1 }}>
                  <UITextInput
                    style={{
                      textAlign: 'left',
                      borderTopLeftRadius: 0,
                      borderBottomLeftRadius: 0,
                    }}
                    onChangeText={onChangeRightInputValue}
                    value={rightInputValue}
                  />
                </View>
              ) : rightType === 'func' ? (
                <Pressable
                  onPress={props.onRightPress}
                  style={{
                    flexDirection: 'row',
                    flex: props.leftType === 'func' ? 1 : undefined,
                    gap: 5,
                    borderWidth: 1,
                    padding: SIZE.size10,
                    paddingVertical: SIZE.size8,
                    borderColor: '#d3d3d3',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    borderTopRightRadius: 10,
                    borderBottomRightRadius: 10,
                    maxWidth: '75%',
                  }}
                >
                  <UIText
                    style={{ flexShrink: 1 }}
                    numberOfLines={1}
                    type='notInput'
                  >
                    {props.rightBtnValue}
                  </UIText>
                  <UIIcon.CUSTOM name='chevron-down' size={SIZE.size16} />
                </Pressable>
              ) : rightType === 'number' ? (
                <View style={{ flex: 1 }}>
                  <UITextInput
                    inputMode='decimal'
                    style={{
                      textAlign: 'right',
                      borderTopLeftRadius: 0,
                      borderBottomLeftRadius: 0,
                    }}
                    onChangeText={onChangeRightInputValue}
                    value={rightInputValue}
                  />
                </View>
              ) : null}
            </View>

            {props.error && (
              <View
                style={{
                  marginLeft: 5,
                }}
              >
                <UIText style={{ textAlign: 'left' }} type='error'>
                  {props.error}
                </UIText>
              </View>
            )}
          </View>
        )
      }

      default: {
        return (
          <View style={[{ gap: 5 }, props.style]}>
            <View style={{ marginLeft: 5 }}>
              <UIText type='labelInput'>
                {props.label}
                {props.required && <UIText style={{ color: 'red' }}> *</UIText>}
              </UIText>
            </View>
            {props.readOnly ? (
              props.onPress ? (
                props.twoColumn ? (
                  <View
                    style={{
                      flexDirection: 'row',
                      backgroundColor: '#fff',
                      borderWidth: 1,
                      borderColor: '#333',
                      borderRadius: 10,
                    }}
                  >
                    <Pressable
                      onPress={props.onSelectPress}
                      style={{
                        borderRightWidth: 1,
                        padding: 10,
                        flexDirection: 'row',
                        gap: 10,
                        alignItems: 'center',
                      }}
                    >
                      <UIText
                        style={{ textAlign: 'left', flexShrink: 1 }}
                        type='notInput'
                      >
                        {selectedValue}
                      </UIText>
                      <UIIcon.CUSTOM name='chevron-down' size={SIZE.size16} />
                    </Pressable>

                    <Pressable
                      onPress={props.onPress}
                      style={{
                        flex: 1,
                        padding: 10,
                        flexDirection: 'row',
                        gap: 5,
                        alignItems: 'center',
                        justifyContent: 'space-between',
                      }}
                    >
                      <UIText type='notInput'>{props.value}</UIText>
                      <UIIcon.CUSTOM name='chevron-down' size={SIZE.size16} />
                    </Pressable>
                  </View>
                ) : (
                  <View>
                    <Pressable
                      onPress={props.onPress}
                      style={{
                        padding: 12,
                        borderRadius: 10,
                        gap: 5,
                        borderWidth: 1,
                        borderColor: '#666',
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                      }}
                    >
                      <UIText style={{ textAlign: 'left' }} type='notInput'>
                        {props.value}
                      </UIText>
                      <UIIcon.CUSTOM name='chevron-down' size={SIZE.size16} />
                    </Pressable>
                    {props.error && (
                      <View
                        style={{
                          marginLeft: 5,
                        }}
                      >
                        <UIText style={{ textAlign: 'left' }} type='error'>
                          {props.error}
                        </UIText>
                      </View>
                    )}
                  </View>
                )
              ) : (
                <View
                  style={[
                    {
                      padding: 12,
                      backgroundColor: '#ecf0f1',
                      borderRadius: 10,
                      gap: 5,
                    },
                  ]}
                >
                  <UIText style={{ textAlign: 'left' }} type='notInput'>
                    {props.value}
                  </UIText>
                </View>
              )
            ) : (
              <View>
                <UITextInput {...props} />
                {props.error && (
                  <View
                    style={{
                      marginLeft: 5,
                    }}
                  >
                    <UIText style={{ textAlign: 'left' }} type='error'>
                      {props.error}
                    </UIText>
                  </View>
                )}
              </View>
            )}
          </View>
        )
      }
    }
  }

  return getInputType(props.type)
}

export default React.memo(UITextInputLB)
