import { StyleSheet } from 'react-native';
import { COLORS } from '../../constants'

const styles = StyleSheet.create({
    searchContainer: {
        backgroundColor: COLORS.primary,
        padding: 10,
    },
    searchButton: {
        backgroundColor: COLORS.primary,
        borderRadius: 12,
        padding: 9,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start',
        backgroundColor: 'white',
    },
    searchTextInput: {
        fontSize: 16,
    },
})

export default styles;