import React from 'react';
import {View, Text, TouchableHighlight, StyleSheet} from 'react-native';
import styleFile from '../style';

export const BtnSelectDate = ({textTitle, text, apply}) => {
  return (
    <TouchableHighlight
      activeOpacity={styleFile.button.activeOpacity}
      underlayColor={styleFile.button.underlayColor}
      onPress={() => {
        apply();
      }}>
      <View style={styles.textWrap}>
        <Text style={styles.text}>{textTitle}</Text>
        <Text style={styles.text}>{text}</Text>
      </View>
    </TouchableHighlight>
  );
};

const styles = StyleSheet.create({
  textWrap: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderColor: styleFile.border.borderColor,
  },
  text: {
    color: styleFile.text.color,
    padding: 10,
    fontSize: styleFile.text.fontSize,
  },
  textTitle: {
    fontWeight: 'bold',
    fontSize: 17,
    textAlign: 'center',
  },
});
