import { Text, View } from 'react-native'
import React from 'react'
import { COLORS, SIZE } from '../../constants'

const ErrorPage = ({ contentError = "Something went wrong" }) => {
    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: COLORS.primary }}>
            <Text style={{ fontSize: SIZE.size20, color: '#fff', textAlign: 'center' }}>{contentError}</Text>
        </View>
    )
}

export default ErrorPage