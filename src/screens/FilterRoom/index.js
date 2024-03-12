import {Pressable, ScrollView, Text, View, Modal} from 'react-native'
import React, {useState, useEffect, useRef, useMemo} from 'react'

import {ICON, UIText} from '../../components/atoms'

import styles from './style'
import {useNavigation} from '@react-navigation/native'
import {COLORS, PARAMS} from '../../constants'
import {SelectOneValue, SelectMultiValues} from '../../components/atoms'
import GuestService from '../../services/GuestService'
import {UIPPTextInputLB} from '../../components/molecules'

const FilterRoomScreen = ({route}) => {
  const navigation = useNavigation()
  let isLoaded = false

  const [isModalMulti, setModalMulti] = useState(false)
  const [title, setTitle] = useState('')
  const [showModalSelectValue, setShowModalSelectValue] = useState(false)
  const [showModalSelectMultiValue, setShowModalSelectMultiValue] =
    useState(false)
  const [params, setParams] = useState([])
  const [currDataChoose, setCurrDataChoose] = useState({})
  const [currDataChooseMulti, setCurrDataChooseMulti] = useState([])
  const closeModal = (bool) => {
    setShowModalSelectValue(bool)
  }
  const closeModalMulti = (bool) => {
    setShowModalSelectMultiValue(bool)
  }

  const [province, setProvince] = useState({
    code: '79',
    name: 'Thành phố Hồ Chí Minh',
  })
  const [districts, setDistricts] = useState([])
  const [wards, setWards] = useState([])
  const [typeChoose, setTypeChoose] = useState('')
  const handleLoadData = () => {
    switch (typeChoose) {
      case 'province':
        return getDataURL('provinces-has-house')
      case 'districts':
        return getDataURL(`districts-has-house/${province?.code}`)
      case 'wards':
        let dist = ''
        if (districts.length == 1) {
          dist = districts[0].code
        }
        return getDataURL(`wards-has-house/${dist}`)
      default:
        return null
    }
  }
  const handleChooseData = (item) => {
    switch (typeChoose) {
      case 'province':
        setProvince(item)
        setDistricts([])
        setWards([])
        break
      case 'districts':
        setDistricts(item)
        setWards([])
        break
      case 'wards':
        setWards(item)
        break
      default:
        break
    }
  }

  async function getDataURL(uri) {
    return await GuestService.getData(uri)
  }
  const renderMultiValue = (vals) => {
    if (vals == null || vals.length == 0) return 'Tất cả'

    return vals.map((el) => el.name).join(', ')
  }
  const renderDistricts = useMemo(() => {
    return renderMultiValue(districts)
  }, [districts])

  const renderWards = useMemo(() => {
    return renderMultiValue(wards)
  }, [wards])

  const dataChoose = useRef({})

  useEffect(() => {
    if (route.params != null) {
      if (route.params.IsLoaded) isLoaded = true
      if (route.params.data) {
        let dataTmp = {}
        dataTmp['mlanh'] = route.params.data?.mlanh || ''
        dataTmp['gac'] = route.params.data?.gac || ''
        dataTmp['ggiac'] = route.params.data?.gigiac || ''

        let tmpArr = null
        let tmp = route.params.data.price_type
        if (tmp != null && tmp != '') {
          tmpArr = []
          tmp.split('|').forEach(function (e) {
            if ('' !== e) tmpArr.push(e)
          })
          dataTmp['price'] = tmpArr

          let objTmp = dataPrices.map((item) => {
            return {...item, checked: tmp.indexOf(`|${item.code}|`) != -1}
          })
          setDataPrices(objTmp)
        }

        if (route.params.province != null) {
          setProvince(route.params.province)
        }
        if (route.params.districts != null) {
          setDistricts(route.params.districts)
        }
        if (route.params.wards != null) {
          setWards(route.params.wards)
        }

        dataChoose.current = dataTmp

        //SET STATE FOR RELOAD COMPONENT
        setChangeMLanh(!changeMLanh)
      }
    }
  }, [])

  const eventItem = (type, data) => {
    let v = null
    let objTmp = null
    switch (type) {
      case 'price':
        v =
          dataChoose.current.price === undefined ? [] : dataChoose.current.price
        if (data == 'ALL') {
          if (v.indexOf(data) === -1) {
            v = []
          } else {
            v.push(data)
          }
        } else {
          v = v.filter((obj) => obj !== 'ALL')
        }

        if (v.indexOf(data) === -1) {
          v.push(data)
        } else {
          v = v.filter((obj) => obj !== data)
        }

        objTmp = dataPrices.map((item) => {
          return {...item, checked: v.indexOf(item.code) != -1}
        })

        setDataPrices(objTmp)
        break
      case 'mlanh':
      case 'gac':
      case 'ggiac':
        v =
          dataChoose.current[type] === undefined ? '' : dataChoose.current[type]
        if (v === data) v = ''
        else v = data
        switch (type) {
          case 'mlanh':
            setChangeMLanh((prev) => !prev)
            break
          case 'gac':
            setChangeGac((prev) => !prev)
            break
          case 'ggiac':
            setChangeGGiac((prev) => !prev)
            break
        }
        break
      default:
        break
    }
    dataChoose.current[type] = v
  }

  const [dataPrices, setDataPrices] = useState(PARAMS.PRICES)
  const [dataYN_ALL] = useState(PARAMS.YNALL)
  const [dataGGiac] = useState(PARAMS.GIGIAC)

  const [changeMLanh, setChangeMLanh] = useState(false)
  const [changeGac, setChangeGac] = useState(false)
  const [changeGGiac, setChangeGGiac] = useState(false)

  const applyDataSearch = () => {
    dataChoose.current.province = province
    dataChoose.current.districts = districts
    dataChoose.current.wards = wards

    dataChoose.current.ChangeData = true
    navigation.navigate('FindRoom', dataChoose.current)
  }

  return (
    <View style={{flex: 1, backgroundColor: COLORS.white}}>
      <View style={styles.headerContainer}>
        <Pressable
          disabled
          onPress={() => {
            navigation.navigate('FindRoom')
          }}
          style={{padding: 15}}
        ></Pressable>
        <Text style={styles.headerText}>Lọc kết quả</Text>
        <Pressable
          onPress={() => {
            if (isLoaded) navigation.goBack()
            else navigation.navigate('FindRoom')
          }}
          style={{padding: 15}}
        >
          <ICON.CUSTOM name='times-circle' color='#fff'></ICON.CUSTOM>
        </Pressable>
      </View>
      <ScrollView>
        <View style={{gap: 0, marginTop: 5}}>
          <UIText type='labelInput' style={styles.titleTextHeader}>
            Tìm phòng theo khu vực
          </UIText>
          <View
            style={[
              styles.viewItem,
              {backgroundColor: COLORS.gray, marginTop: 20},
            ]}
          >
            <Pressable
              style={[styles.showDataChoose]}
              onPress={async () => {
                setParams([])
                setTitle('Chọn tỉnh/thành phố...')
                setTypeChoose('province')
                setCurrDataChoose(province)
                setShowModalSelectValue(true)
                setModalMulti(false)
              }}
            >
              <UIPPTextInputLB
                type='show-label'
                label='Tỉnh/Thành phố'
                value={province?.name}
              />
              <ICON.CUSTOM
                style={{
                  position: 'absolute',
                  right: 2,
                  paddingHorizontal: 10,
                  backgroundColor: '#fff',
                }}
                name={'sort-down'}
                color={'#aaa'}
              />
            </Pressable>
          </View>
          <View style={styles.viewItem}>
            <Pressable
              style={styles.showDataChoose}
              onPress={() => {
                setParams([])
                setTitle('Chọn quận/huyện...')
                setTypeChoose('districts')
                setCurrDataChooseMulti(districts)
                setShowModalSelectValue(true)
                setModalMulti(true)
              }}
            >
              <UIPPTextInputLB
                type='show-label'
                label='Quận/huyện'
                value={renderDistricts}
              />
              <ICON.CUSTOM
                style={{
                  position: 'absolute',
                  right: 2,
                  paddingHorizontal: 10,
                  backgroundColor: '#fff',
                }}
                name={'sort-down'}
                color={'#aaa'}
              ></ICON.CUSTOM>
            </Pressable>
          </View>
          {districts != null && districts.length == 1 && (
            <View style={styles.viewItem}>
              <Pressable
                style={styles.showDataChoose}
                onPress={async () => {
                  setParams([])
                  setTitle('Chọn phường/xã...')
                  setTypeChoose('wards')
                  setCurrDataChooseMulti(wards)
                  setShowModalSelectValue(true)
                  setModalMulti(true)
                }}
              >
                <UIPPTextInputLB
                  type='show-label'
                  label='Phường/xã'
                  value={renderWards}
                />
                <ICON.CUSTOM
                  style={{
                    position: 'absolute',
                    right: 2,
                    paddingHorizontal: 10,
                    backgroundColor: '#fff',
                  }}
                  name={'sort-down'}
                  color={'#aaa'}
                ></ICON.CUSTOM>
              </Pressable>
            </View>
          )}
        </View>
        {/* GIÁ */}
        <View style={{gap: 0, marginTop: 5}}>
          <UIText type='labelInput' style={styles.titleTextHeader}>
            Giá
          </UIText>
          <View style={styles.viewChooseContainer}>
            {dataPrices.map((item, idx) => {
              return (
                <View key={idx} style={styles.itemContainer2}>
                  <Pressable
                    style={[
                      styles.buttonChoose,
                      item?.checked && {borderColor: COLORS.primary},
                    ]}
                    onPress={() => {
                      eventItem('price', item.code)
                    }}
                  >
                    <Text
                      style={[
                        styles.buttonChooseText,
                        item?.checked && {color: COLORS.primary},
                      ]}
                    >
                      {item.desc}{' '}
                    </Text>
                    {item?.checked && false && (
                      <View style={styles.itemCheckContainer}>
                        <View style={styles.itemCheckIconContainer}>
                          <ICON.CUSTOM
                            name='check'
                            color='#fff'
                            style={styles.itemCheckIcon}
                          />
                        </View>
                      </View>
                    )}
                  </Pressable>
                </View>
              )
            })}
          </View>
        </View>

        <View style={{gap: 10, marginTop: 10}}>
          <View style={styles.viewChooseContainer}>
            <UIText type='labelInput' style={styles.titleTextHeader}>
              Máy lạnh
            </UIText>
            <View style={{flexDirection: 'row'}}>
              {dataYN_ALL.map((item, idx) => {
                return (
                  <View key={idx} style={styles.itemContainer3}>
                    <Pressable
                      style={[
                        styles.buttonChoose,
                        item.code === dataChoose?.current?.mlanh && {
                          borderColor: COLORS.primary,
                        },
                      ]}
                      onPress={() => {
                        eventItem('mlanh', item.code)
                      }}
                    >
                      <Text
                        style={[
                          styles.buttonChooseText,
                          item.code === dataChoose?.current?.mlanh && {
                            color: COLORS.primary,
                          },
                        ]}
                      >
                        {item.desc}{' '}
                      </Text>

                      {item.code === dataChoose?.current?.mlanh && false && (
                        <View style={styles.itemCheckContainer}>
                          <View style={styles.itemCheckIconContainer}>
                            <ICON.CUSTOM
                              name='check'
                              color='#fff'
                              style={styles.itemCheckIcon}
                            />
                          </View>
                        </View>
                      )}
                    </Pressable>
                  </View>
                )
              })}
            </View>
          </View>
        </View>

        <View style={{gap: 10, marginTop: 10}}>
          <View>
            <UIText type='labelInput' style={styles.titleTextHeader}>
              Gác
            </UIText>
            <View style={styles.viewChooseContainer}>
              {dataYN_ALL.map((item, idx) => {
                return (
                  <View key={idx} style={styles.itemContainer3}>
                    <Pressable
                      style={[
                        styles.buttonChoose,
                        item.code === dataChoose?.current?.gac && {
                          borderColor: COLORS.primary,
                        },
                      ]}
                      onPress={() => {
                        eventItem('gac', item.code)
                      }}
                    >
                      <Text
                        style={[
                          styles.buttonChooseText,
                          item.code === dataChoose?.current?.gac && {
                            color: COLORS.primary,
                          },
                        ]}
                      >
                        {item.desc}
                      </Text>
                      {item.code === dataChoose?.current?.gac && false && (
                        <View style={styles.itemCheckContainer}>
                          <View style={styles.itemCheckIconContainer}>
                            <ICON.CUSTOM
                              name='check'
                              color='#fff'
                              style={styles.itemCheckIcon}
                            />
                          </View>
                        </View>
                      )}
                    </Pressable>
                  </View>
                )
              })}
            </View>
          </View>
        </View>

        <View style={{gap: 10, marginTop: 10}}>
          <View>
            <UIText type='labelInput' style={styles.titleTextHeader}>
              Giờ giấc
            </UIText>
            <View style={styles.viewChooseContainer}>
              {dataGGiac.map((item, idx) => {
                return (
                  <View key={idx} style={styles.itemContainer3}>
                    <Pressable
                      style={[
                        styles.buttonChoose,
                        ,
                        item.code === dataChoose?.current?.ggiac && {
                          borderColor: COLORS.primary,
                        },
                      ]}
                      onPress={() => {
                        eventItem('ggiac', item.code)
                      }}
                    >
                      <Text
                        style={[
                          styles.buttonChooseText,
                          item.code === dataChoose?.current?.ggiac && {
                            color: COLORS.primary,
                          },
                        ]}
                      >
                        {item.desc}
                      </Text>
                      {item.code === dataChoose?.current?.ggiac && false && (
                        <View style={styles.itemCheckContainer}>
                          <View style={styles.itemCheckIconContainer}>
                            <ICON.CUSTOM
                              name='check'
                              color='#fff'
                              style={styles.itemCheckIcon}
                            />
                          </View>
                        </View>
                      )}
                    </Pressable>
                  </View>
                )
              })}
            </View>
          </View>
        </View>
        <View style={{gap: 10, marginBottom: 50}}></View>
      </ScrollView>
      <Pressable style={styles.buttonApply} onPress={applyDataSearch}>
        <Text style={styles.buttonTextApply}>Áp dụng</Text>
      </Pressable>

      <Modal
        animationType='slide'
        transparent={true}
        visible={showModalSelectValue}
        onRequestClose={() => closeModal(false)}
      >
        {isModalMulti ? (
          <SelectMultiValues
            title={title}
            rows={params}
            currentData={currDataChooseMulti}
            closeModal={closeModal}
            handleChooseData={handleChooseData}
            handleLoadData={handleLoadData}
          />
        ) : (
          <SelectOneValue
            title={title}
            rows={params}
            currentData={currDataChoose}
            closeModal={closeModal}
            handleChooseData={handleChooseData}
            handleLoadData={handleLoadData}
            slide={true}
            search={true}
          />
        )}
      </Modal>
    </View>
  )
}

export default FilterRoomScreen
