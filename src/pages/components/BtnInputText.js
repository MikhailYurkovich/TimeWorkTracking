import React from 'react';
import {View, StyleSheet, TextInput} from 'react-native';
import styleFile from '../style';

export const BtnInputText = ({onChange, placeholder, text}) => {
  return (
    <View style={styles.textWrap}>
      <TextInput
        style={[styles.text]}
        automaticallyAdjustKeyboardInsets={true}
        keyboardType="default"
        selectTextOnFocus={true}
        multiline={true}
        onEndEditing={({nativeEvent: {text}}) => {
          onChange(text);
        }}
        placeholder={placeholder}
        defaultValue={text}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  textWrap: {
    borderBottomWidth: 1,
    borderColor: styleFile.border.borderColor,
  },
  text: {
    color: styleFile.text.color,
    padding: 8,
    fontSize: styleFile.text.fontSize,
    width: '100%',
  },
});
