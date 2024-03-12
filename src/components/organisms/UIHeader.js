import {View, Text, Pressable, Platform} from 'react-native';
import {memo} from 'react';
import {useNavigation} from '@react-navigation/native';
import {COLORS, SIZE} from '../../constants';
import {UIIcon} from '../atoms';
import DeviceInfo from "react-native-device-info"

const UIHeader = props => {
  const {
    title = 'Title',
    bgColor = COLORS.primary,
    leftBtnName,
    leftBtnOnPress = () => {
      navigation.goBack();
    },
    rightBtnName,
    rightBtnOnPress = () => {
      navigation.goBack();
    },
    titleCenter = false,
  } = props;

  const navigation = useNavigation();
  const isTablet = DeviceInfo.isTablet()

  return (
    <View style={{backgroundColor: bgColor}}>
      <View
        style={[
          {
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: titleCenter ? 'center' : 'flex-start',
          },
        ]}>
        {leftBtnName && (
          <Pressable
            style={{
              paddingHorizontal: isTablet? 20: 10,
              //paddingVertical: SIZE.size7,
              position: 'absolute',
              left: 0,
              flex: 0,
              top: 5,
              paddingTop: Platform.OS === 'ios' ? 0 : 5,
            }}
            onPress={leftBtnOnPress}>
            <UIIcon.CUSTOM name={leftBtnName} size={isTablet? 44: 20} color="#eee" />
          </Pressable>
        )}

        <View
          style={{
            paddingVertical: 10,
            marginLeft: titleCenter ? 0 : SIZE.size16 * 2 + 23,
            paddingTop: Platform.OS === 'ios' ? 0 : SIZE.size7,
          }}>
          <View>
            {typeof title === 'string' ? (
              <Text
                numberOfLines={1}
                style={{
                  color: '#fff',
                  fontSize: isTablet? 40: 20,
                  fontWeight: '600',
                }}>
                {title}
              </Text>
            ) : (
              <View>{title}</View>
            )}
          </View>
        </View>

        {rightBtnName && (
          <Pressable
            style={{
              paddingHorizontal: SIZE.size16,
              paddingVertical: SIZE.size7,
              position: 'absolute',
              right: 0,
              flex: 0,
              top: 5,
              paddingTop: Platform.OS === 'ios' ? 0 : 5,
            }}
            onPress={rightBtnOnPress}>
            <UIIcon.CUSTOM name={rightBtnName} size={isTablet? 44: 20} color="#eee" />
          </Pressable>
        )}
      </View>
    </View>
  );
};

export default memo(UIHeader);
