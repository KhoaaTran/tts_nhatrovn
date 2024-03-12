import {
  Dimensions,
  FlatList,
  Keyboard,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native'
import React, {useContext, useEffect, useRef, useState} from 'react'
import uuid from 'react-native-uuid'

import {COLORS, SIZE} from '../../constants'
import {ICON, UIIcon} from '../atoms'
import {AuthService} from '../../services'
import {AuthContext} from '../../services/AuthContext'

const WIDTH = Dimensions.get('window').width
const HEIGHT = Dimensions.get('window').height

const AutocompleteModal = ({
  closeModal,
  title = 'Chọn giá trị ...',
  url = '',
  dataPost = {},
  currentData,
  handleChooseData,
  isMultiChoose = true,
  fieldKeyValue = 'key',
  fieldTextShow = ['name'],
}) => {
  const {userInfo} = useContext(AuthContext)

  const [textSearch, setTextSearch] = useState('')
  const handleSearchInputChange = (e) => {
    setTextSearch(e)
  }

  const [rows, setRows] = useState([])
  const [selected, setSelected] = useState([])
  const [reload, setReload] = useState(false)

  async function fetchData(data = {}) {
    try {
      return await AuthService.postData(url, userInfo, {
        header: {
          action_code: 'autocomplete',
          rq_id: uuid.v4(),
        },
        page: {
          size: 20,
          page_no: 1,
        },
        data: {...data, text_search: textSearch},
      })
    } catch (err) {
      throw err
    }
  }

  useEffect(() => {
    if (Array.isArray(currentData)) {
      setSelected(currentData.slice(0))
    }

    const autocomplete = async () => {
      try {
        let response = await fetchData(dataPost)
        setRows(response.data)
      } catch (err) {}
    }
    autocomplete()
  }, [])

  const firstUpdate = useRef(true)
  useEffect(() => {
    if (firstUpdate.current) {
      firstUpdate.current = false
    } else {
      const autocomplete = async () => {
        try {
          let response = await fetchData(dataPost)
          setRows(response.data)
        } catch (err) {}
      }

      const delayDebounceFn = setTimeout(() => {
        autocomplete()
      }, 500)
      return () => clearTimeout(delayDebounceFn)
    }
  }, [textSearch])

  const checkItemExistsSelected = (item) => {
    var i = 0
    while (i < selected.length) {
      if (selected[i][fieldKeyValue] === item[fieldKeyValue]) {
        return i
      }
      i++
    }
    return -1
  }

  const showText = (item) => {
    let text = ''
    for (let i = 0; i < fieldTextShow.length; i++) {
      if (i == 0) {
        text += item[fieldTextShow[i]]
      } else {
        text += ' - ' + item[fieldTextShow[i]]
      }
    }
    return text
  }

  return (
    <Pressable style={styles.containerSlide} onPress={closeModal}>
      <View
        style={styles.modalSlide}
        onStartShouldSetResponder={(event) => true}
        onTouchEnd={(e) => {
          e.stopPropagation()
        }}
      >
        <View
          style={{
            borderBottomWidth: 0.8,
            paddingBottom: 10,
            borderBottomColor: '#333',
          }}
        >
          <Pressable onPress={closeModal} style={styles.buttonBack}>
            <UIIcon.CUSTOM name='arrow-left' color='#333' size={SIZE.size16} />
          </Pressable>
          <Text style={styles.modal_heading}>{title}</Text>
        </View>
        <View style={styles.viewSearchContainer}>
          <View style={styles.viewSearch}>
            <UIIcon.CUSTOM
              name='search'
              size={SIZE.size18}
              color={COLORS.primary}
            />
            <View style={{alignItems: 'center', paddingLeft: 5, flex: 1}}>
              <TextInput
                value={textSearch}
                onChangeText={(val) => handleSearchInputChange(val)}
                autoComplete='off'
                placeholder='Nhập nội dung tìm kiếm...'
                style={styles.searchText}
              ></TextInput>
            </View>
          </View>
        </View>

        <FlatList
          contentContainerStyle={
            {
              // gap: 15,
              // padding: 10,
            }
          }
          keyExtractor={(item, index) => index.toString()}
          data={rows}
          renderItem={({item, index}) => {
            return (
              <Pressable
                style={[
                  styles.containerItems,
                  {
                    backgroundColor:
                      checkItemExistsSelected(item) != -1
                        ? COLORS.primary
                        : COLORS.white,
                  },
                ]}
                onPress={() => {
                  const idx = checkItemExistsSelected(item)
                  let arrTmp = selected
                  if (isMultiChoose) {
                    if (idx === -1) {
                      arrTmp.push(item)
                    } else {
                      arrTmp.splice(idx, 1)
                    }
                  } else {
                    if (idx === -1) {
                      arrTmp = [item]
                    } else {
                      arrTmp = []
                    }
                  }

                  setSelected(arrTmp)
                  setReload((prev) => !prev)
                }}
              >
                {isMultiChoose && (
                  <View style={styles.checkbox}>
                    <ICON.CUSTOM
                      name={
                        checkItemExistsSelected(item) != -1 ? 'check' : 'square'
                      }
                      size={SIZE.size14}
                      color={
                        checkItemExistsSelected(item) != -1
                          ? COLORS.white
                          : COLORS.black
                      }
                    />
                  </View>
                )}
                <View style={{flex: 1}}>
                  <Text
                    style={{
                      fontSize: SIZE.size13,
                      color:
                        checkItemExistsSelected(item) != -1 ? '#fff' : '#333',
                    }}
                  >
                    {showText(item)}
                  </Text>
                </View>
              </Pressable>
            )
          }}
        />

        <View
          style={{
            padding: SIZE.size5,
            borderTopWidth: 1,
            borderColor: '#666',
            marginBottom: SIZE.size18,
          }}
        >
          {selected !== null && selected.length > 0 && (
            <View
              style={{
                flexDirection: 'row',
                gap: 5,
                alignItems: 'center',
                height: SIZE.size35,
              }}
            >
              <Text
                style={{color: '#666', fontWeight: 600, fontSize: SIZE.size13}}
              >
                Đã chọn:{' '}
              </Text>
              <ScrollView
                horizontal
                contentContainerStyle={{flexGrow: 1, height: SIZE.size25}}
                keyboardShouldPersistTaps='handled'
                showsHorizontalScrollIndicator={false}
              >
                {selected.map((item, index) => {
                  return (
                    <Pressable
                      onPress={Keyboard.dismiss}
                      key={index}
                      style={{
                        backgroundColor: '#eee',
                        marginRight: 10,
                        paddingHorizontal: 10,
                        paddingVertical: 5,
                        borderRadius: 10,
                        flexDirection: 'row',
                        gap: 5,
                      }}
                    >
                      <Text
                        numberOfLines={1}
                        style={{fontSize: SIZE.size12, color: '#333'}}
                      >
                        {showText(item)}
                      </Text>
                      <Pressable
                        onPress={() => {
                          const idx = checkItemExistsSelected(item)
                          let arrTmp = selected
                          if (idx !== -1) {
                            arrTmp.splice(idx, 1)
                            setSelected(arrTmp)
                            setReload((prev) => !prev)
                          }
                        }}
                      >
                        <UIIcon.CUSTOM
                          size={SIZE.size15}
                          name='times-circle'
                        ></UIIcon.CUSTOM>
                      </Pressable>
                    </Pressable>
                  )
                })}
              </ScrollView>
            </View>
          )}

          <View
            style={{
              flexDirection: 'row',
              gap: 10,
              paddingBottom: Platform.OS === 'ios' ? 10 : 0,
            }}
          >
            <Pressable
              onPress={() => setSelected([])}
              style={{
                backgroundColor: COLORS.primary,
                padding: 10,
                flex: 1,
                marginVertical: 10,
                borderRadius: 20,
              }}
            >
              <Text
                style={{
                  textAlign: 'center',
                  color: '#fff',
                  fontWeight: '600',
                  fontSize: SIZE.size15,
                }}
              >
                Bỏ chọn
              </Text>
            </Pressable>
            <Pressable
              onPress={() => {
                handleChooseData(selected)
                closeModal(false)
              }}
              style={{
                backgroundColor: COLORS.primary,
                padding: 10,
                flex: 1,
                marginVertical: 10,
                borderRadius: 20,
              }}
            >
              <Text
                style={{
                  textAlign: 'center',
                  color: '#fff',
                  fontWeight: '600',
                  fontSize: SIZE.size15,
                }}
              >
                Áp dụng {isMultiChoose ? '(' + selected.length + ')' : ''}
              </Text>
            </Pressable>
          </View>
        </View>
      </View>
    </Pressable>
  )
}

export default AutocompleteModal

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
    backgroundColor: 'white',
    padding: 10,
    borderBottomWidth: 0.5,
    borderBottomColor: '#d3d3d3',
  },

  flatlistContainer: {
    padding: 10,
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
    fontSize: SIZE.size13,
    color: '#000',
    paddingHorizontal: SIZE.size5,
    height: SIZE.size36,
    borderColor: '#d3d3d3',
  },

  modal: {
    width: WIDTH * 0.9,
    maxHeight: HEIGHT * 0.75,
    backgroundColor: '#fff',
    borderRadius: 15,
  },

  containerSlide: {
    height: HEIGHT,
    width: WIDTH,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },

  modalSlide: {
    position: 'absolute',
    zIndex: 999,
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
    lineHeight: SIZE.size20,
    marginTop: 10,
    fontWeight: '600',
    fontSize: SIZE.size14,
    color: 'black',
    textAlign: 'center',
  },

  buttonBack: {
    paddingHorizontal: 15,
    paddingVertical: 12,
    position: 'absolute',
    left: 0,
    top: 0,
    zIndex: 1,
  },

  containerItems: {
    padding: SIZE.size10,
    borderBottomWidth: 1,
    borderColor: '#ccc',
    flexDirection: 'row',
    columnGap: SIZE.size8,
  },
  checkbox: {
    width: SIZE.size15,
    height: SIZE.size15,
    borderWidth: 0,
    alignItems: 'center',
    justifyContent: 'center',
  },
})
