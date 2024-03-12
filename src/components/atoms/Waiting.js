import { StyleSheet, View } from 'react-native'
import React from 'react'
import { ActivityIndicator } from 'react-native-paper'

const Waiting = () => {
    return (
        <View
            style={{
                width: '100%',
                height: '100%',
                position: 'absolute',
                insec: 0,
                alignItems: 'center',
                justifyContent: 'center',
                zIndex: 10
            }}>
            <ActivityIndicator size="small"></ActivityIndicator>
        </View>
    )
}

export default Waiting