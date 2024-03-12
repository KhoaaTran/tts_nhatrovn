import {
  StyleSheet,
  Text,
  View,
  Pressable,
  Dimensions,
  ScrollView,
  TextInput,
  FlatList,
  Platform,
} from 'react-native'
import React, { useEffect, useState } from 'react'
import { COLORS, FONT_SIZE } from '../../constants'
import { FormatStringRemoveDiacritics } from '../../utils'
import ICON from './icon'

const WIDTH = Dimensions.get('window').width
const HEIGHT = Dimensions.get('window').height

const SelectMultiValues = ({
  closeModal,
  title = 'Chọn giá trị ...',
  rows = [],
  handleChooseData,
  currentData,
  handleLoadData,
}) => {
  const [textSearch, setTextSearch] = useState('')
  const handleSearchInputChange = (e) => {
    setTextSearch(e)
  }

  const [reload, setReload] = useState(false)
  const [allItems, setAllItems] = useState([])

  useEffect(() => {
    if (rows === null || rows.length === 0) {
      const fetchData = async () => {
        try {
          const data = await handleLoadData()
          setAllItems(data.data)
        } catch (err) {
          setAllItems([])
        }
      }
      fetchData()
    } else {
      setAllItems(rows)
      if (Array.isArray(currentData)) {
        let tmp =
          currentData.reduce((accumulator, currentValue) => {
            return accumulator + '|' + currentValue.code
          }, '') + '|'

        let newArr = rows
        if (newArr !== null) {
          newArr.map((item, idx) => {
            return (item.checked = tmp.indexOf('' + item.code + '|') != -1)
          })
        }
        setAllItems(newArr)
        setReload((prev) => !prev)
      }
    }
  }, [])

  useEffect(() => {
    if (rows === null || rows.length === 0) {
      if (Array.isArray(currentData)) {
        let tmp =
          currentData.reduce((accumulator, currentValue) => {
            return accumulator + '|' + currentValue.code
          }, '') + '|'
        if (allItems != null) {
          allItems.map((item, idx) => {
            item.checked = tmp.indexOf('' + item.code + '|') != -1
          })
        }

        setAllItems(allItems)
        setReload((prev) => !prev)
      }
    }
  }, [allItems])

  const renderItem = ({ item }) => {
    return textSearch === '' ||
      FormatStringRemoveDiacritics(item?.name.toLowerCase()).includes(
        FormatStringRemoveDiacritics(textSearch.toLowerCase()),
      ) ? (
      <Pressable
        style={[
          styles.containerItems,
          { backgroundColor: item?.checked ? COLORS.primary : COLORS.white },
        ]}
        onPress={() => {
          let tmp = allItems || []
          tmp.map((obj, idx) => {
            if (item?.code === obj?.code) {
              if (obj?.checked) obj['checked'] = false
              else obj['checked'] = true
            }
            return obj
          })
          setReload((prev) => !prev)
          setAllItems(tmp)
        }}
      >
        <View style={styles.checkbox}>
          <ICON.CUSTOM
            name={item?.checked ? 'check' : 'square'}
            size={FONT_SIZE.font14}
            color={item?.checked ? COLORS.white : COLORS.black}
          />
        </View>
        <Text
          style={{
            fontSize: FONT_SIZE.font13,
            color: item?.checked ? '#fff' : '#333',
          }}
        >
          {item?.name}
        </Text>
      </Pressable>
    ) : null
  }

  return (
    <Pressable style={styles.container} onPress={closeModal}>
      <View style={styles.modal}>
        <View
          style={{ flex: 1 }}
        >
          <View
            style={{
              marginBottom: 0,
              borderBottomWidth: 0.5,
              paddingBottom: 10,
              borderBottomColor: '#d3d3d3',
            }}
          >
            <Pressable onPress={closeModal} style={styles.buttonBack}>
              <ICON.CUSTOM
                name='arrow-left'
                color='#333'
                size={FONT_SIZE.font16}
              />
            </Pressable>
            <Text style={styles.modal_heading}>{title}</Text>
          </View>

          <View style={styles.viewSearchContainer}>
            <View style={styles.viewSearch}>
              <ICON.CUSTOM
                name='search'
                size={FONT_SIZE.font18}
                color={COLORS.primary}
              />
              <View style={{ alignItems: 'center', paddingLeft: 5, flex: 1 }}>
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
          {allItems != null && (
            <FlatList
              data={allItems}
              renderItem={renderItem}
              key={(item, idx) => 'k' + idx}
              //extraData={reload}
              extraData={reload}
            //keyExtractor={}
            ></FlatList>
          )}
        </View>

        {allItems && (
          <View
            style={{
              borderTopWidth: 0.5,
              paddingVertical: 30,
              borderColor: '#D4D4D4',
              marginBottom: Platform.OS === 'ios' ? 20 : 0,
            }}
          >
            <Pressable
              style={{
                backgroundColor: COLORS.primary,
                marginHorizontal: 10,
                paddingVertical: 10,
              }}
              onPress={() => {
                let rowsSelected = allItems.filter((obj) => obj.checked)
                handleChooseData(rowsSelected)
                closeModal(false)
              }}
            >
              <Text
                style={{
                  //paddingVertical: 15,
                  textAlign: 'center',
                  color: '#fff',
                  fontSize: FONT_SIZE.font15,
                  fontWeight: '600',
                }}
              >
                Áp dụng
              </Text>
            </Pressable>
          </View>
        )}
      </View>
    </Pressable>
  )
}

export default SelectMultiValues

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: HEIGHT,
    width: WIDTH,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modal: {
    justifyContent: 'space-between',
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
  buttonBack: {
    paddingHorizontal: FONT_SIZE.font15,
    paddingVertical: FONT_SIZE.font12,
    position: 'absolute',
    left: 0,
    top: 0,
    zIndex: 1,
  },
  modal_heading: {
    paddingHorizontal: FONT_SIZE.font10,
    lineHeight: FONT_SIZE.font20,
    marginTop: FONT_SIZE.font10,
    fontWeight: '600',
    fontSize: FONT_SIZE.font14,
    color: 'black',
    textAlign: 'center',
  },
  viewSearchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    //backgroundColor: COLORS.secondary,
    backgroundColor: 'white',
    padding: 10,
    borderBottomWidth: 0.5,
    borderBottomColor: '#d3d3d3',
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
  containerItems: {
    padding: FONT_SIZE.font8,
    borderBottomWidth: 1,
    borderColor: '#ccc',
    flexDirection: 'row',
    columnGap: 10,
  },
  checkbox: {
    width: FONT_SIZE.font15,
    height: FONT_SIZE.font15,
    borderWidth: 0,
    alignItems: 'center',
    justifyContent: 'center',
  },
})
