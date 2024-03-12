import { Text, View, Pressable } from 'react-native'
import React from 'react'

import styles from './style'
import { COLORS } from '../../constants'
import { ICON } from '../atoms'

const BarDisabled = ({
    placeholder = 'Nhập giá trị ...',
    iconName = 'search',
    iconSize = 22,
    color = COLORS.primary,
    onPress = () => { },
}) => {
    return (
        <View style={[styles.searchContainer]}>
            <Pressable
                onPress={onPress}
                style={styles.searchButton}>
                <ICON.CUSTOM name={iconName} size={iconSize} color={color} />
                <View style={{ alignItems: 'center', paddingLeft: 5 }}>
                    <Text style={[styles.searchTextInput, { justifyContent: 'center', alignItems: 'center', color: '#ccc' }]}  >{placeholder}</Text>
                </View>
            </Pressable>
        </View>
    )
}

export default BarDisabled