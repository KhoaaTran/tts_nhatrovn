import {View, Pressable, Dimensions, StyleSheet} from 'react-native'

import {SIZE} from '../../constants'

const WIDTH = Dimensions.get('window').width
const HEIGHT = Dimensions.get('window').height

function ValidErrorModal({children, changeModelVisible, styleModal}) {
  const closeModal = () => {
    changeModelVisible(false)
  }

  return (
    <View style={{flex: 1}}>
      <Pressable
        onPress={closeModal}
        style={{
          height: HEIGHT,
          width: WIDTH,
          backgroundColor: 'rgba(0,0,0,0.5)',
        }}
      />
      <View style={[styles.modal]}>
        <View style={{...styles.modal_content, ...styleModal}}>{children}</View>
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
    width: WIDTH,
    backgroundColor: '#fff',
    bottom: 0,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    position: 'absolute',
  },

  modal_content: {
    width: '100%',
    // paddingVertical: SIZE.size10,
    // paddingHorizontal: SIZE.size10,
  },
})

export default ValidErrorModal
