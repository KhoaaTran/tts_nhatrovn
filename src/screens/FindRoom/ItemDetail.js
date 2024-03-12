import {StyleSheet, Text, Pressable, View} from 'react-native'
import React, {useState, useEffect, useCallback} from 'react'
import {COLORS, SIZE} from '../../constants'
import {useNavigation} from '@react-navigation/native'
import {GuestService} from '../../services'
import uuid from 'react-native-uuid'
import {getDescRsp} from '../../utils'
import FastImage from 'react-native-fast-image'
import {BASE_URL} from '../../services/config'

const ItemDetail = ({idx, house_key, dataFindHouse = {}}) => {
  const navigation = useNavigation()
  const [heightItem, setHeightItem] = useState(0)
  const [isLoading, setLoading] = useState(true)
  const [contentError, setContentError] = useState('')
  const [data, setData] = useState({})

  const calHeightItem = useCallback((e) => {
    const {height} = e.nativeEvent.layout
    setHeightItem(height)
  }, [])

  useEffect(() => {
    const detail = async (key) => {
      setLoading(true)
      return await GuestService.postData('guest/detail-house-new', {
        header: {
          action_code: 'detail',
          rq_id: uuid.v4(),
        },
        page: {},
        data: {
          key: key,
        },
      })
    }
    setTimeout(() => {
      detail(house_key)
        .then((res) => {
          const rsp = res.data
          if (rsp.response_status.status_code === 0) {
            setData(rsp.data)
          } else {
            setContentError(rsp.response_status.status_description)
          }
        })
        .catch((error) => {
          setContentError(getDescRsp(error))
        })
        .finally(() => {
          setLoading(false)
        })
    }, (idx % 20) * 150)
  }, [])

  return isLoading ? (
    <View style={{width: '50%', height: heightItem}}>
      <View
        style={[
          styles.viewImage,
          {
            backgroundColor: '#fff',
            alignItems: 'center',
            justifyContent: 'center',
            borderWidth: 1,
          },
        ]}
      >
        <Text style={{color: COLORS.primary}}>loading...</Text>
      </View>
    </View>
  ) : (
    <Pressable
      onLayout={calHeightItem}
      style={styles.container}
      onPress={() => {
        navigation.navigate('ListRoomForHouseNavigation', {
          house_key: house_key,
          dataFindHouse: dataFindHouse,
        })
      }}
    >
      <View style={styles.viewImage}>
        <FastImage
          resizeMode='cover'
          style={styles.image}
          source={
            data.image
              ? {uri: `${BASE_URL}${data.image}?`}
              : require('../../assets/images/Image_not_available.png')
          }
        />
      </View>

      <View style={styles.viewPhongTrong}>
        <Text numberOfLines={1} style={styles.textPhongTrong}>
          Còn {data?.count_blank} phòng trống
        </Text>
      </View>
      <View style={styles.viewAddress}>
        <Text numberOfLines={2} style={styles.textAddress}>
          {data.address}
        </Text>
      </View>
      <View style={styles.viewAddress}>
        <Text numberOfLines={1} style={styles.textPrice}>
          {data?.min_max_price}
        </Text>
      </View>
      <View style={styles.viewAddress}>
        <Text style={styles.textTongPhong}>
          Tổng: <Text style={{color: COLORS.primary}}>{data?.count}</Text> phòng
        </Text>
      </View>
    </Pressable>
  )
}

export default ItemDetail

const styles = StyleSheet.create({
  container: {
    width: '50%',
    padding: 5,
    columnGap: 10,
    marginBottom: 20,
    minHeight: 100,
  },
  viewImage: {
    aspectRatio: 1,
    backgroundColor: '#f2f2f2',
    borderRadius: 10,
    borderWidth: 0,
    overflow: 'hidden',
  },
  image: {
    height: '100%',
    borderRadius: 10,
    resizeMode: 'contain',
  },
  viewPhongTrong: {
    backgroundColor: COLORS.primary,
    width: '100%',
    borderRadius: 5,
    marginTop: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  textPhongTrong: {
    color: 'white',
    fontSize: SIZE.size12,
  },
  viewAddress: {
    marginTop: 5,
    justifyContent: 'center',
  },
  textAddress: {
    color: '#000',
    fontSize: SIZE.size14,
    lineHeight: SIZE.size14 * 1.5,
    color: '#333',
  },
  textPrice: {
    fontSize: SIZE.size13,
    color: COLORS.primary,
    fontWeight: '600',
    marginTop: 0,
  },
  textTongPhong: {
    color: '#333',
    fontSize: SIZE.size12,
  },
})
