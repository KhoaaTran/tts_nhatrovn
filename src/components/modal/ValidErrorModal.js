import {
  Text,
  View,
  Pressable,
  Dimensions,
  StyleSheet,
  ScrollView,
} from 'react-native'
import { COLORS, SIZE } from '../../constants'
import { useState } from 'react'

const WIDTH = Dimensions.get('window').width
const HEIGHT = Dimensions.get('window').height

function ValidErrorModal(props) {
  const { errors = [], changeModelVisible } = props
  const closeModal = () => {
    changeModelVisible(false)
  }

  const [translateYModal, setTranslateYModal] = useState(0)

  return (
    <View style={{ flex: 1 }}>
      <Pressable
        onPress={closeModal}
        style={{
          height: HEIGHT,
          width: WIDTH,
          backgroundColor: 'rgba(0,0,0,0.5)',
        }}
      ></Pressable>
      <View
        onLayout={(event) => {
          const { height, y } = event.nativeEvent.layout
          setTranslateYModal(height)
        }}
        style={[
          styles.modal,
          {
            transform: [
              { translateX: WIDTH * 0.05 },
              { translateY: HEIGHT * 0.5 - translateYModal * 0.5 },
            ],
          },
        ]}
      >
        <View style={styles.modal_heading}>
          <Text style={styles.modal_heading_text}>Thông báo</Text>
        </View>

        <View style={styles.modal_content}>
          <View>
            <Text style={styles.error_title}>Thông tin nhập vào chưa đúng.</Text>
          </View>
          <ScrollView style={{ marginTop: 5 }}>
            {errors.slice(0, 5).map((item, idx) => (
              <Text key={idx} style={styles.modal_content_text}>* {item}</Text>
            ))}
          </ScrollView>
        </View>

        <View style={[styles.btn_view, { flexDirection: 'row' }]}>
          <Pressable style={[styles.modal_btn]} onPress={closeModal}>
            <Text style={[styles.modal_btn_text]}>Đóng</Text>
          </Pressable>
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },

  modal: {
    width: WIDTH * 0.9,
    backgroundColor: '#fff',
    borderRadius: 10,
    alignItems: 'center',
    position: 'absolute',
    zIndex: 999,
  },
  modal_heading: {
    width: '100%',
    paddingBottom: 5,
    backgroundColor: COLORS.warning,
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
    maxHeight: 500,
    paddingVertical: SIZE.size10,
    paddingHorizontal: SIZE.size10,
  },
  error_title: {
    paddingHorizontal: 10,
    lineHeight: SIZE.size14 * 1.5,
    fontSize: SIZE.size14,
    textAlign: 'left',
    color: '#fc4b6c',
    borderBottomWidth: 1,
    borderBottomColor: 'red',
    paddingBottom: 5,
  },
  modal_content_text: {
    paddingHorizontal: 10,
    lineHeight: SIZE.size12 * 1.5,
    marginTop: 0,
    fontSize: SIZE.size12,
    color: 'black',
    textAlign: 'left',
    color: '#ffa500',
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

export default ValidErrorModal
