import { StyleSheet } from 'react-native';
import { COLORS, FONT_SIZE, SIZE } from '../../constants'

const styles = StyleSheet.create({
    headerContainer: {
        backgroundColor: COLORS.primary,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    headerText: {
        textAlign: 'center',
        color: '#fff',
        fontSize: FONT_SIZE.font16,
        fontWeight: '700',
        textTransform: 'uppercase'
    },

    viewItem: {
        paddingHorizontal: 10,
        marginVertical: 10,
    },
    viewItemNormal: {
        paddingHorizontal: 10,
        //marginVertical: 10
        marginBottom: 10
    },
    label: {
        marginBottom: 3,
        fontSize: FONT_SIZE.font14,
        fontWeight: '600',
    },
    showDataChoose: {
        flexDirection: 'row',
        alignItems: 'center',
        columnGap: 5,
        flexShrink: 1,
        backgroundColor: '#fff',
        borderWidth: 1,
        borderColor: '#d3d3d3',
        borderRadius: 10,
        // paddingHorizontal: 5,
        borderWidth: 0,
    },
    showDataChooseText: {
        borderColor: '#d3d3d3',
        flex: 1,
        borderWidth: 0,
        padding: 10,
        paddingHorizontal: 5,
        backgroundColor: '#fff',
        fontSize: FONT_SIZE.font13,
        color: '#000'
    },

    titleTextHeader: {
        fontSize: FONT_SIZE.font15,
        textTransform: 'uppercase',
        fontWeight: '600',
        marginHorizontal: 10
    },
    buttonChoose: {
        backgroundColor: '#fff',
        flexDirection: 'row',
        padding: SIZE.size7,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#fff',
        width: '100%',
        borderRadius: 10,
        borderWidth: 2,

        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2, },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,

        elevation: 5,
    },
    buttonChooseText: {
        fontSize: FONT_SIZE.font12,
        color: '#333',
    },

    buttonApply: {
        backgroundColor: COLORS.primary,
        position: 'absolute',
        bottom: 0,
        width: '100%'
    },
    buttonTextApply: {
        paddingVertical: 13,
        textAlign: 'center',
        color: '#fff',
        fontSize: 18,
        fontWeight: '700',
    },
    viewChooseContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap'
    },
    itemContainer2: {
        width: '50%',
        padding: 5
    },
    itemContainer3: {
        padding: 10,
        width: '33.33%',
        flexDirection: 'row',
    },
    itemCheckContainer: {
        width: 0,
        height: 0,

        borderBottomWidth: 10,
        borderRightWidth: 20,
        borderTopWidth: 10,
        borderLeftWidth: 20,

        borderTopColor: COLORS.primary,
        borderLeftColor: COLORS.primary,
        borderBottomColor: 'transparent',
        borderRightColor: 'transparent',

        position: 'absolute',
        top: 0,
        left: 0,
    },
    itemCheckIconContainer: {
        position: 'absolute',
        top: -10,
        left: -15
    },
    itemCheckIcon: {
        fontSize: SIZE.size13,
        borderTopLeftRadius: 10
    }
});

export default styles;