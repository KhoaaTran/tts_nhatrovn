import { StyleSheet, Text, View, Pressable, Dimensions, ScrollView, TextInput } from 'react-native'
import React, { useState, useEffect } from 'react'
import { COLORS, FONT_SIZE } from '../../constants'
import { FormatStringRemoveDiacritics } from '../../utils'
import ICON from './icon';

const WIDTH = Dimensions.get('window').width;
const HEIGHT = Dimensions.get('window').height;

const SelectOneValue = ({ closeModal, title = "Chọn giá trị ...", rows = [], handleChooseData, currentData, slide = false, search = false, handleLoadData }) => {
    const [textSearch, setTextSearch] = useState('');
    const handleSearchInputChange = (e) => {
        setTextSearch(e);
    };
    const [params, setParams] = useState([])

    useEffect(() => {
        if (rows === null || rows.length === 0) {
            const fetchData = async () => {
                try {
                    const data = await handleLoadData();
                    setParams(data.data)
                } catch (err) {
                    setParams([])
                }

            }
            fetchData();
        } else {
            setParams(rows)
        }
    }, [])

    return (
        <Pressable style={slide ? styles.containerSlide : styles.container} onPress={closeModal}>
            <View style={slide ? styles.modalSlide : styles.modal}
                onStartShouldSetResponder={event => true}
                onTouchEnd={e => { e.stopPropagation(); }}>
                <View style={{ marginBottom: 0, borderBottomWidth: 0.5, paddingBottom: 10, borderBottomColor: '#d3d3d3' }}>
                    {
                        slide && (
                            <Pressable
                                onPress={closeModal}
                                style={styles.buttonBack}>
                                <ICON.CUSTOM name="arrow-left" color="#333" size={FONT_SIZE.font16} />
                            </Pressable>
                        )
                    }
                    <Text style={styles.modal_heading}>{title}</Text>
                </View>
                {search && (
                    <View style={styles.viewSearchContainer}>
                        <View style={styles.viewSearch}>
                            <ICON.CUSTOM name="search" size={FONT_SIZE.font18} color={COLORS.primary} />
                            <View style={{ alignItems: 'center', paddingLeft: 5, flex: 1 }}>
                                <TextInput
                                    value={textSearch}
                                    onChangeText={(val) => handleSearchInputChange(val)}
                                    autoComplete="off"
                                    placeholder="Nhập nội dung tìm kiếm..."
                                    style={styles.searchText}></TextInput>
                            </View>
                        </View>
                    </View>
                )}
                <ScrollView>
                    {params.map((item, idx) => {
                        return (
                            textSearch === '' || FormatStringRemoveDiacritics(item?.name.toLowerCase()).includes(FormatStringRemoveDiacritics(textSearch.toLowerCase())) ?
                                (
                                    <Pressable key={idx}
                                        style={{
                                            padding: 10,
                                            marginBottom: 1,
                                            borderBottomWidth: 0.2,
                                            borderBlockColor: '#000',
                                            backgroundColor: (currentData?.code === item.code ? COLORS.primary : '#fff')
                                        }}
                                        onPress={
                                            () => {
                                                handleChooseData(item);
                                                closeModal(false)
                                            }
                                        }
                                    >
                                        <Text style={{
                                            fontSize: FONT_SIZE.font13,
                                            color: currentData?.code === item.code ? '#fff' : '#333',
                                        }}>{item?.name || item?.desc}</Text>
                                    </Pressable>
                                ) :
                                null
                        )
                    }
                    )}
                </ScrollView>
            </View>

        </Pressable>
    )
}

export default SelectOneValue

const styles = StyleSheet.create({
    container: {
        flex: 1,
        height: 100,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'rgba(0,0,0,0.5)',
    },

    viewSearchContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        //backgroundColor: COLORS.secondary,
        backgroundColor: 'white',
        padding: 10,
        borderBottomWidth: 0.5,
        borderBottomColor: '#d3d3d3'
    },
    viewSearch: {
        flex: 1,
        backgroundColor: COLORS.secondary,
        borderRadius: 12,
        paddingHorizontal: 10,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start',
        backgroundColor: 'white',
        borderWidth: 1,
        borderColor: '#d3d3d3',
    },
    searchText: {
        backgroundColor: 'white',
        width: '100%',
        fontSize: FONT_SIZE.font13,
        color: '#000',
        paddingHorizontal: FONT_SIZE.font5,
        height: FONT_SIZE.font36,
        borderColor: '#d3d3d3',
    },

    modal: {
        width: WIDTH * 0.9,
        maxHeight: HEIGHT * 0.75,
        paddingTop: 0,
        paddingBottom: 10,
        backgroundColor: '#fff',
        borderRadius: 10,
    },

    containerSlide: {
        flex: 1,
        height: HEIGHT,
        width: WIDTH,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'rgba(0,0,0,0.5)',
    },
    modalSlide: {
        position: 'absolute',
        zIndex: 999,
        //bottom: 0,
        top: HEIGHT * 0.2,
        left: 0,
        width: WIDTH,
        height: HEIGHT * 0.8,
        backgroundColor: '#fff',
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
    },

    modal_heading: {
        paddingHorizontal: 10,
        lineHeight: FONT_SIZE.font20,
        marginTop: 10,
        fontWeight: '600',
        fontSize: FONT_SIZE.font14,
        color: 'black',
        textAlign: 'center',
    },
    buttonBack: {
        paddingHorizontal: 15,
        paddingVertical: 12,
        position: 'absolute',
        left: 0,
        top: 0,
        zIndex: 1
    }
});