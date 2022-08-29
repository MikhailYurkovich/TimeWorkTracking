import React from 'react';
import {View, Text, StyleSheet, TextInput} from 'react-native';
import styleFile from '../style';

export const BtnInput = ({textTitle, text, onChange, placeholder}) => {
  return (
    <View style={styles.textWrap}>
      <Text style={styles.text}>{textTitle}</Text>
      <TextInput
        style={[styles.text, styles.textInput]}
        automaticallyAdjustKeyboardInsets={true}
        keyboardType="numeric"
        selectTextOnFocus={true}
        onEndEditing={({nativeEvent: {text}}) => {
          onChange(
            Number(text.replace(/[,-]/g, '.'))
              ? Number(text.replace(/[,-]/g, '.'))
              : 0,
          );
        }}
        defaultValue={text}
        placeholder={placeholder}
      />
    </View>
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
  textInput: {
    color: styleFile.tab.colorActive,
    borderLeftWidth: 1,
    paddingVertical: 0,
    borderLeftColor: styleFile.border.borderColor,
    textAlign: 'center',
    width: 100,
  },
});
