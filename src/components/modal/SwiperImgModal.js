import {Text, View, Pressable, Dimensions, StyleSheet, SafeAreaView} from 'react-native'
import {COLORS, FONT_SIZE, SIZE} from '../../constants'
import {UIIcon} from '../atoms'
import FastImage from 'react-native-fast-image'
import {BASE_URL} from '../../services/config'
import Swiper from 'react-native-swiper'

const WIDTH = Dimensions.get('window').width
const HEIGHT = Dimensions.get('window').height

function ConfirmModal(props) {
  const closeModal = () => {
    props.changeModelVisible(false)
  }
  return (
    <View style={styles.container}>
      <SafeAreaView style={{flex: 0, backgroundColor: COLORS.black}} />
      <View style={{alignItems: 'flex-end'}}>
        <Pressable
          onPress={() => {
            closeModal()
          }}
          style={{flexDirection: 'row', gap: 5, padding: 10, paddingTop: 0}} >
          <UIIcon.CUSTOM name='times' color='#fff' size={18} />          
        </Pressable>
      </View>
      <View
        style={{
          flex: 1,
        }}
      >
        <Swiper
          style={{alignItems: 'center'}}
          dotColor='#666'
          activeDotColor='#fff'
        >
          {props.imgArr.map((item, index) => (
            <FastImage
              key={index}
              source={{uri: `${BASE_URL}${item}?`}}
              style={{
                position: 'absolute',
                top: HEIGHT / 6,
                width: WIDTH,
                aspectRatio:1,
                resizeMode: 'cover',
              }}
            />
          ))}
        </Swiper>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },

  modal: {
    width: WIDTH,
    height: 300,
    paddingTop: 0,
    backgroundColor: '#fff',
    borderRadius: 10,
    alignItems: 'center',
  },
  modal_heading: {
    width: '100%',
    borderBottomWidth: 0,
    paddingBottom: 5,
    backgroundColor: COLORS.primary,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  modal_heading_text: {
    paddingHorizontal: SIZE.size5,
    lineHeight: SIZE.size16 * 1.5,
    marginTop: 10,
    fontWeight: '600',
    fontSize: SIZE.size16,
    color: 'black',
    textAlign: 'center',
    textTransform: 'uppercase',
    color: '#fff',
  },
  modal_content: {
    width: '100%',
    paddingVertical: SIZE.size15,
    paddingHorizontal: SIZE.size10,
    marginVertical: 0,
  },
  modal_content_text: {
    paddingHorizontal: 10,
    lineHeight: SIZE.size14 * 1.5,
    marginTop: 0,
    fontSize: SIZE.size14,
    color: 'black',
    textAlign: 'center',
    color: '#000',
  },

  btn_view: {
    width: '100%',
    marginTop: 0,
    borderTopWidth: 1,
    borderTopColor: '#ccc',
  },

  modal_btn: {
    padding: 10,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },

  modal_btn_text: {
    fontSize: SIZE.size14,
    lineHeight: SIZE.size14 * 1.5,
    fontWeight: '600',
    color: COLORS.primary,
  },
})

export default ConfirmModal
