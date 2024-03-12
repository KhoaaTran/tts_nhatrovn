import React from 'react'
import { UIIcon, UIPPTextInput } from '../atoms'
import { Pressable, StyleSheet, View } from 'react-native'
import { Text } from 'react-native-paper'
import { useState } from 'react'
import { COLORS, SIZE } from '../../constants'

const UIPPTextInputLB = (props) => {
    const {
        value = '',
        values = [{ 'key': '*', 'val': 'Chọn giá trị' }],
        label,
        style,
        PARENT_WIDTH = 0,
        multiline = false,
        ...otherProps
    } = props

    const [parentWidth, setParentWidth] = useState(0)

    const getInputType = (type) => {
        switch (type) {
            case 'checkbox-inline':
                return (
                    <View
                    // onLayout={(event) => {
                    //     const { width } = event.nativeEvent.layout
                    //     setParentWidth(PARENT_WIDTH === 0 ? width / 365 : PARENT_WIDTH)
                    // }}
                    >
                        <Text style={{
                            fontSize: SIZE.size15,
                            marginBottom: SIZE.size5,
                        }} >{label}</Text>
                        <View style={[style, { flexDirection: 'row', flexWrap: 'wrap', rowGap: 10, }]}>
                            {
                                values.map((val, idx) => {
                                    return (
                                        <Pressable key={idx} style={{ width: '25%', flexDirection: 'row', alignItems: 'center', gap: SIZE.size5 }}
                                            onPress={() => {
                                                props.onPress(val.key)
                                            }}
                                        >
                                            <UIIcon.CUSTOM name={value === val.key ? 'dot-circle' : 'circle'} size={SIZE.size20} />
                                            <Text style={{ flexShrink: 1, fontSize: SIZE.size15 }}>{val?.val}</Text>
                                        </Pressable>
                                    )
                                })
                            }
                        </View>
                        {props.error && (
                            <View style={{ marginLeft: SIZE.size7, marginTop: 2 }} >
                                <Text style={{ fontSize: SIZE.size12, color: 'red' }}>{props.error}</Text>
                            </View>
                        )}
                    </View>
                );
            case 'show-label':
                return (
                    <View style={[{ width: '100%' }, style]}
                    // onLayout={(event) => {
                    //     const { width } = event.nativeEvent.layout
                    //     setParentWidth(PARENT_WIDTH === 0 ? width / 365 : PARENT_WIDTH)
                    // }}
                    >
                        <View style={styles.container}>
                            <Text style={{
                                position: 'absolute',
                                // top: -1 * parentWidth * 15,
                                // left: parentWidth * 7,
                                // backgroundColor: '#fff',
                                // fontSize: parentWidth * 15,

                                top: -1 * SIZE.size15,
                                left: SIZE.size7,
                                backgroundColor: '#fff',
                                fontSize: SIZE.size15,
                            }}>{label}{props.required && <Text style={{ color: 'red' }}> *</Text>}</Text>
                            <UIPPTextInput
                                input_style={{
                                    // fontSize: parentWidth * 15,
                                    // height: parentWidth * 30,
                                    // paddingHorizontal: parentWidth * 7,
                                    // paddingVertical: parentWidth * 3,

                                    fontSize: SIZE.size15,
                                    minHeight: SIZE.size30,
                                    height: SIZE.size30,
                                    paddingHorizontal: SIZE.size7,
                                    paddingVertical: SIZE.size5,
                                }}
                                value={value}
                                {...otherProps}
                                editable={false}
                            />

                        </View>
                        {props.error && (
                            <View style={{ marginLeft: SIZE.size7, marginTop: 2 }} >
                                <Text style={{ fontSize: SIZE.size12, color: 'red' }}>{props.error}</Text>
                            </View>
                        )}
                    </View>
                )
            case 'readonly':
                return (
                    <View style={[{ width: '100%' }, style]}
                        onLayout={(event) => {
                            const { width } = event.nativeEvent.layout
                            setParentWidth(PARENT_WIDTH === 0 ? width / 365 : PARENT_WIDTH)
                        }}
                    >
                        <View style={[styles.container, { backgroundColor: COLORS.gray }]}>
                            <Text style={{
                                position: 'absolute',
                                // top: -1 * parentWidth * 15,
                                // left: parentWidth * 7,
                                // backgroundColor: '#fff',
                                // fontSize: parentWidth * 15,

                                top: -1 * SIZE.size15,
                                left: SIZE.size7,
                                backgroundColor: '#fff',
                                fontSize: SIZE.size15,
                            }}>{label}{props.required && <Text style={{ color: 'red' }}> *</Text>}</Text>
                            {multiline ?
                                <UIPPTextInput
                                    input_style={{
                                        // fontSize: parentWidth * 15,
                                        // minHeight: parentWidth * 30,
                                        // height: parentWidth * 30,
                                        // paddingHorizontal: parentWidth * 7,
                                        // paddingVertical: parentWidth * 3,

                                        fontSize: SIZE.size15,
                                        minHeight: SIZE.size30,
                                        // height: SIZE.size30,
                                        paddingHorizontal: SIZE.size7,
                                        paddingVertical: SIZE.size5,
                                        lineHeight: SIZE.size15 * 1.5
                                    }}
                                    value={value}
                                    multiline={multiline}
                                    {...otherProps}
                                    editable={false}
                                /> :
                                <UIPPTextInput
                                    input_style={{
                                        // fontSize: parentWidth * 15,
                                        // minHeight: parentWidth * 30,
                                        // height: parentWidth * 30,
                                        // paddingHorizontal: parentWidth * 7,
                                        // paddingVertical: parentWidth * 3,

                                        fontSize: SIZE.size15,
                                        minHeight: SIZE.size30,
                                        height: SIZE.size30,
                                        paddingHorizontal: SIZE.size7,
                                        paddingVertical: SIZE.size5,
                                    }}
                                    value={value}
                                    {...otherProps}
                                    editable={false}
                                />
                            }


                        </View>
                        {props.error && (
                            <View style={{ marginLeft: SIZE.size7, marginTop: 2 }} >
                                <Text style={{ fontSize: SIZE.size12, color: 'red' }}>{props.error}</Text>
                            </View>
                        )}
                    </View>
                )
            default:
                return (
                    <View style={style}
                    // onLayout={(event) => {
                    //     const { width } = event.nativeEvent.layout
                    //     setParentWidth(PARENT_WIDTH === 0 ? width / 365 : PARENT_WIDTH)
                    // }}
                    >
                        <View style={styles.container}>
                            <Text style={{
                                position: 'absolute',
                                // top: -1 * parentWidth * 15,
                                // left: parentWidth * 7,
                                // backgroundColor: '#fff',
                                // fontSize: parentWidth * 15,

                                top: -1 * SIZE.size15,
                                left: SIZE.size7,
                                backgroundColor: '#fff',
                                fontSize: SIZE.size15,
                            }}>
                                {label}
                                {props.required && <Text style={{ color: 'red' }}> *</Text>}
                            </Text>
                            <UIPPTextInput
                                input_style={{
                                    // fontSize: parentWidth * 15,
                                    // height: parentWidth * 30,
                                    // paddingHorizontal: parentWidth * 7,
                                    // paddingVertical: parentWidth * 3,

                                    fontSize: SIZE.size15,
                                    minHeight: SIZE.size30,
                                    height: SIZE.size30,
                                    paddingHorizontal: SIZE.size7,
                                    paddingVertical: SIZE.size5,
                                }}
                                value={value}
                                {...otherProps}
                            />
                        </View>
                        {props.error && (
                            <View style={{ marginLeft: SIZE.size7, marginTop: 2 }} >
                                <Text style={{ fontSize: SIZE.siz12, color: 'red' }}>{props.error}</Text>
                            </View>
                        )}
                    </View>
                );
        }
    }

    return getInputType(props.type)
}

export default React.memo(UIPPTextInputLB)

const styles = StyleSheet.create({
    container: {
        marginTop: 5,
        borderRadius: 5,
        borderWidth: 1,
        borderColor: '#d3d3d3',

    },
    label: {
        position: 'absolute',
        top: -13,
        left: 7,
        backgroundColor: '#fff',
        //fontSize: parentWidth * 14,
    },
})