import {StyleSheet} from 'react-native'
import {COLORS, FONT_SIZE, SIZE} from '../../constants'

const styles = StyleSheet.create({
  container: {
    width: '50%',
    padding: 5,
    columnGap: 10,
    marginBottom: 20,
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
    fontSize: FONT_SIZE.font12,
  },
  viewAddress: {
    // height: 45,
    color: '#000',
    fontWeight: 600,
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
    fontSize: FONT_SIZE.font12,
  },
})
export default styles
