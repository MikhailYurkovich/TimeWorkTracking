import React from 'react';
import {View, Text} from 'react-native';
import styleFile from '../style';

export const LoadingPage = () => {
  return (
    <View
      style={[
        {
          flex: 1,
          backgroundColor: styleFile.view.backgroundColor,
          justifyContent: 'center',
          alignItems: 'center',
        },
      ]}>
      <Text style={{color: styleFile.text.color, fontSize: 22}}>
        Загрузка...
      </Text>
    </View>
  );
};
