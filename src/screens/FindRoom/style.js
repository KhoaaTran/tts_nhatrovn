import { StyleSheet } from 'react-native';
import { COLORS, SIZE } from '../../constants'

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    searchContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: COLORS.primary,
        padding: 10,
    },
    searchButton: {
        flex: 1,
        backgroundColor: COLORS.primary,
        borderRadius: 12,
        paddingHorizontal: 10,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start',
        backgroundColor: 'white',
    },
    searchTextInput: {
        backgroundColor: 'white',
        // flex: 1,
        width: '100%',
        fontSize: SIZE.size15,
        paddingHorizontal: 5,
        height: SIZE.size40,
        color: COLORS.black
    },
    buttonFilterLocation: {
        flexDirection: 'row',
        alignItems: 'center',
        columnGap: 5,
        marginVertical: 5,
        flexShrink: 1,
    },
    viewProvince: {
        flexDirection: 'row',
        alignItems: 'center',
        columnGap: 5,
        flexShrink: 1,
    },
    textLocation: {
        color: '#000',
        fontSize: SIZE.size12
    },
    buttonNavFilter: {
        flexDirection: 'row',
        padding: 5,
        alignItems: 'center',
        borderRadius: 5,
        borderColor: '#666',
    }
});

export default styles;