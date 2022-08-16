import React from 'react';
import {View, StyleSheet, TouchableHighlight, Text} from 'react-native';
import styleFile from '../style';

export const BtnContainerApply = ({
  btnApply_1,
  textBtn_1,
  colorBtn_1,
  btnApply_2,
  textBtn_2,
  colorBtn_2,
}) => {
  return (
    <View style={styles.battonContainer}>
      <TouchableHighlight
        underlayColor={styleFile.button.underlayColor}
        activeOpacity={styleFile.button.activeOpacity}
        style={[styles.button, {borderBottomLeftRadius: 5}]}
        onPress={() => {
          btnApply_1();
        }}>
        <Text
          style={[
            styles.text,
            {color: colorBtn_1 ? colorBtn_1 : styleFile.text.color},
          ]}>
          {textBtn_1}
        </Text>
      </TouchableHighlight>
      <TouchableHighlight
        underlayColor={styleFile.button.underlayColor}
        activeOpacity={styleFile.button.activeOpacity}
        style={[styles.button, {borderBottomRightRadius: 5}]}
        onPress={() => {
          btnApply_2();
        }}>
        <Text
          style={[
            styles.text,
            {color: colorBtn_2 ? colorBtn_2 : styleFile.text.color},
          ]}>
          {textBtn_2}
        </Text>
      </TouchableHighlight>
    </View>
  );
};

const styles = StyleSheet.create({
  battonContainer: {
    justifyContent: 'space-around',
    flexWrap: 'wrap',
    flexDirection: 'row',
  },
  button: {
    backgroundColor: styleFile.window.backgroundColor,
    flex: 1,
    padding: 10,
    minWidth: 100,
  },
  text: {
    textAlign: 'center',
    fontSize: 15,
  },
});
