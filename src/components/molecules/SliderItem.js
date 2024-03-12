import { View } from 'react-native';
import { memo } from 'react';
import Swiper from 'react-native-swiper';
import { COLORS } from '../../constants';
import FastImage from 'react-native-fast-image';

const SliderItem = ({ images = [], width, height }) => {
    return (
        <View >
            <Swiper
                style={{ paddingHorizontal: 0 }}
                paginationStyle={{ position: 'absolute', bottom: 10 }}
                autoplay={true}
                autoplayTimeout={5}
                height={height}
                dotStyle={{
                    backgroundColor: COLORS.grey_bold,
                    width: 8,
                    height: 8,
                    borderRadius: 4,
                }}
                activeDotStyle={{
                    backgroundColor: COLORS.grey_bold,
                    width: 20,
                    height: 8,
                    borderRadius: 4,
                }}>
                {images.map((item, index) => (
                    <View key={index} >
                        <FastImage
                            source={item}
                           //width={200}
                           //height={100}
                           resizeMode={FastImage.resizeMode.stretch}
                            
                            style={{
                                //width: '100%',
                               height: height,
                                //resizeMode: 'contain',
                            }}
                            
                            
                        />
                    </View>
                ))}
            </Swiper>
        </View>
    );
};

export default memo(SliderItem);
