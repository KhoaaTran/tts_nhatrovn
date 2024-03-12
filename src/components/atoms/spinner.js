import { Dimensions } from 'react-native';
import { View, ActivityIndicator, StyleSheet } from 'react-native';
import { COLORS } from '../../constants';

const WIDTH = Dimensions.get('window').width;
const HEIGHT = Dimensions.get('window').height;
const SPINNER = ({ style, indicatorColor = COLORS.primary }) => {
  return (
    <View style={[styles.spinner, style]}>
      <ActivityIndicator size="large" color={indicatorColor} />
    </View>
  );
};

const styles = StyleSheet.create({
  spinner: {
    backgroundColor: COLORS.bg_spinner,
    width: WIDTH,
    height: HEIGHT,
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1000,
  },
});

export default SPINNER;
