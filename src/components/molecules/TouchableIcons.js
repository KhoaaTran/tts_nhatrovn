import { Pressable, Dimensions } from 'react-native';
import { Text } from 'react-native';

const WIDTH = Dimensions.get('window').width;

export default TouchableIcons = ({ children, text, width, sizeFont = 10, onPress }) => {
    return (
        <Pressable style={{ alignItems: 'center', padding: 10, width: width }} onPress={onPress} >
            {children}
            <Text style={{ textAlign: 'center', marginTop: 5, color: '#000', fontSize: WIDTH / 360 * sizeFont }}>{text}</Text>
        </Pressable>
    )
}