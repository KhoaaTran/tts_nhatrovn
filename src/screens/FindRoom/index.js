import React, {useCallback, useEffect, useMemo, useRef, useState} from 'react'
import {
  ActivityIndicator,
  FlatList,
  Pressable,
  RefreshControl,
  Text,
  View,
} from 'react-native'
import uuid from 'react-native-uuid'

import {ICON} from '../../components/atoms'
import {COLORS, SIZE} from '../../constants'
import GuestService from '../../services/GuestService'

import {useNavigation} from '@react-navigation/native'
import {UIIcon} from '../../components/atoms'
import {UISearchBar} from '../../components/molecules'
import ItemDetail from './ItemDetail'
import styles from './style'

const FindRoomScreen = ({route}) => {
  const navigation = useNavigation()

  const dataStore = useRef({})
  const [reRender, setReRender] = useState(false)
  const [rows, setRows] = useState([])
  const [isLoading, setLoading] = useState(false)
  const [isRefeshing, setRefeshing] = useState(false)

  const [hasNext, setHasNext] = useState(true)
  const [lastHouseKey, setLastHouseKey] = useState('')

  const [textSearch, setTextSearch] = useState('')
  const [province, setProvince] = useState({
    code: '79',
    name: 'Thành phố Hồ Chí Minh',
  })
  const [districts, setDistricts] = useState([])
  const [wards, setWards] = useState([])

  async function fetchData(data = {}) {
    setRefeshing(false)
    try {
      setLoading(true)
      const response = await GuestService.postData('guest/find-houses-new', {
        header: {
          action_code: 'search',
          rq_id: uuid.v4(),
        },

        data: {
          ...data,
          text_search: textSearch,
          last_house_key: lastHouseKey,
        },
      })

      const rsp = response.data
      if (rsp.response_status.status_code === 0) {
        setLoading(false)
        setRows((pre) => [...pre, ...rsp.data.rows])

        setHasNext(rsp.data?.has_next || false)
        setLastHouseKey(rsp.data?.last_house_key)
      } else {
        setLoading(false)
        setHasNext(false)
      }
    } catch (err) {
      setLoading(false)
      setHasNext(false)
    }
  }

  const firstUpdate = useRef(true)
  useEffect(() => {
    if (firstUpdate.current) {
      firstUpdate.current = false
    } else {
      const delayDebounceFn = setTimeout(() => {
        setRows([])
        setLastHouseKey('')
        setHasNext(true)
        setReRender((val) => !val)
      }, 500)

      return () => clearTimeout(delayDebounceFn)
    }
  }, [textSearch])

  useEffect(() => {
    let dataPost = {}
    if (
      route.params !== undefined &&
      route.params !== null &&
      route.params?.ChangeData === true
    ) {
      setProvince(route.params.province)
      setDistricts(route.params.districts)
      setWards(route.params.wards)

      let tmp = ''

      dataPost['province'] = route.params.province?.code || ''
      if (
        route.params.districts != null &&
        Array.isArray(route.params.districts) &&
        route.params.districts.length > 0
      ) {
        tmp = route.params.districts.reduce((acc, cur) => {
          return acc + cur.code + '|'
        }, '|')
        dataPost['districts'] = tmp
      }
      if (
        route.params.wards != null &&
        Array.isArray(route.params.wards) &&
        route.params.wards.length > 0
      ) {
        tmp = route.params.wards.reduce((acc, cur) => {
          return acc + cur.code + '|'
        }, '|')
        dataPost['wards'] = tmp
      }

      dataPost['mlanh'] = route.params['mlanh'] || ''
      dataPost['gac'] = route.params['gac'] || ''
      dataPost['gigiac'] = route.params['ggiac'] || ''

      if (
        Array.isArray(route.params['price']) &&
        route.params['price'].length > 0
      ) {
        tmp = '|' + route.params['price'].join('|') + '|'
        dataPost['price_type'] = tmp
      }
    } else if ('dashoard' === route.params?.from || '') {
      dataPost['province'] = route.params.province?.code || ''
      switch (route.params?.type) {
        case 'svien':
          dataPost['price_type'] = '|1|2|3|'
          break
        case 'cgac':
          dataPost['gac'] = 'Y'
          break
        case 'gire':
          dataPost['price_type'] = '|1|2|3|'
          break
      }
    } else {
      dataPost['province'] = province?.code
    }
    dataStore.current = dataPost
    setRows([])
    setLastHouseKey('')
    setHasNext(true)
    setReRender((val) => !val)
  }, [route.params])

  useEffect(() => {
    if (!isLoading) fetchData(dataStore.current)
  }, [reRender])

  const showAllAddress = useMemo(() => {
    let desc = ''
    if (wards != null) {
      if (wards.length == 1) {
        desc += wards[0].name + ', '
      }
      if (wards.length > 1) {
        desc = wards.reduce((acc, cur) => {
          return acc + cur.name + ', '
        }, '')
      }
    }

    if (districts != null) {
      if (districts.length == 1) {
        desc += districts[0].name + ', '
      } else if (districts.length > 1) {
        desc = districts.reduce((acc, cur) => {
          return acc + cur.name + ', '
        }, '')
      }
    }
    if (province?.code != null && province?.code !== '') {
      desc += province.name
    }
    if (desc === '') desc = 'Tất cả'
    return desc
  }, [province, districts, wards])

  const renderItem = useCallback(({item, index}) => {
    return (
      <ItemDetail
        idx={index}
        house_key={item}
        dataFindHouse={dataStore.current}
      />
    )
  }, [])

  const handleRefresh = () => {
    setRows([])
    setRefeshing(true)
    setLastHouseKey('')
    setHasNext(true)
    setReRender((val) => !val)
  }

  const handleEndReached = () => {
    if (!isLoading && hasNext) {
      setReRender((val) => !val)
    }
  }

  const renderFooter = useCallback(() => {
    if (!isLoading) return null
    return (
      <View style={styles.footer}>
        {hasNext && <ActivityIndicator size='large' color={COLORS.primary} />}
      </View>
    )
  }, [isLoading])

  const onChangeText = useCallback((text) => {
    setTextSearch(text)
  }, [])

  const prefix = useMemo(
    () => <UIIcon.CUSTOM name='search' color={COLORS.primary} />,
    [],
  )

  const keyExtractor = (_, index) => index.toString()
  const [test, setTest] = useState('')

  return (
    <View style={styles.container}>
      <View style={{backgroundColor: COLORS.primary, padding: SIZE.size10}}>
        <UISearchBar
          allowClear
          prefix={prefix}
          value={textSearch}
          onChangeText={onChangeText}
          placeholder='Nhập nội dung tìm kiếm'
        />
      </View>
      <Pressable
        style={{backgroundColor: '#fff'}}
        onPress={() =>
          navigation.push('FilterRoomScreen', {
            IsLoaded: true,
            data: dataStore.current,
            province: province,
            districts: districts,
            wards: wards,
          })
        }
      >
        <View
          style={{
            borderBottomWidth: 1,
            borderColor: '#ccc',
            justifyContent: 'center',
          }}
        >
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              paddingHorizontal: 10,
            }}
          >
            <View style={styles.buttonFilterLocation}>
              <ICON.CUSTOM
                style={{fontSize: SIZE.size12}}
                name={'map-marker-alt'}
              ></ICON.CUSTOM>
              <Text style={{fontSize: SIZE.size12, color: '#888'}}>
                Khu vực:
              </Text>

              <View style={styles.viewProvince}>
                <Text numberOfLines={1} style={styles.textLocation}>
                  {showAllAddress}
                </Text>
              </View>
            </View>

            <View style={styles.buttonNavFilter}>
              <ICON.CUSTOM name={'filter'}></ICON.CUSTOM>
            </View>
          </View>
        </View>
      </Pressable>

      <FlatList
        style={{padding: 10, backgroundColor: '#fff'}}
        data={rows}
        renderItem={renderItem}
        keyExtractor={keyExtractor}
        keyboardShouldPersistTaps='handled'
        refreshControl={
          <RefreshControl refreshing={isRefeshing} onRefresh={handleRefresh} />
        }
        onEndReached={handleEndReached}
        onEndReachedThreshold={0.3}
        ListFooterComponent={renderFooter}
        initialNumToRender={6}
        numColumns={2}
        windowSize={10}
        maxToRenderPerBatch={6}
        removeClippedSubviews
      />
    </View>
  )
}
export default FindRoomScreen
