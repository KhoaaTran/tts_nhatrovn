import { Text, View, Pressable, Dimensions, StyleSheet } from 'react-native';
import { COLORS, FONT_SIZE, SIZE } from '../../constants';

const WIDTH = Dimensions.get('window').width;

function ConfirmModal(props) {
  const closeModal = () => {
    props.changeModelVisible(false);
  };
  return (
    <View style={styles.container} onPress={closeModal}>
      <View
        style={styles.modal}
        onStartShouldSetResponder={event => true}
        onTouchEnd={e => {
          e.stopPropagation();
        }}>

        <View style={styles.modal_heading}>
          <Text style={styles.modal_heading_text}>{props.title ? props.title : 'Xác nhận'}</Text>
        </View>
        <View style={styles.modal_content}>
          <Text style={styles.modal_content_text}>{props.content}</Text>
        </View>

        <View style={[styles.btn_view, { flexDirection: 'row' }]}>
          <Pressable
            style={[
              styles.modal_btn,
              { flex: 0.5, borderRightWidth: 1, borderColor: '#ccc' },
            ]}
            onPress={props.btnLeftPress}>
            <Text style={styles.modal_btn_text}>{props.btnLeftText}</Text>
          </Pressable>

          <Pressable
            style={[styles.modal_btn, { flex: 0.5, }]}
            onPress={props.btnRightPress}>
            <Text style={[styles.modal_btn_text]}>{props.btnRightText}</Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
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
    color: '#fff'
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
    color: '#000'
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
    color: COLORS.primary
  },
});

export default ConfirmModal;
