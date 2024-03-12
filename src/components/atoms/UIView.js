import {View} from 'react-native';
import React from 'react';

const UIView = props => {
  const getViewType = value => {
    switch (value) {
      case 'normal': {
        return (
          <View
            style={[
              {
                flexDirection: 'row',
                justifyContent: 'space-between',
              },
              props.style,
            ]}>
            {props?.children}
          </View>
        );
      }

      default: {
        return (
          <View
            style={[
              {
                flexDirection: 'row',
                justifyContent: 'space-between',
              },
              props.style,
            ]}>
            {props?.children}
          </View>
        );
      }
    }
  };

  return getViewType(props?.type);
};

export default React.memo(UIView);
