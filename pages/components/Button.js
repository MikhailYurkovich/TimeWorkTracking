import React from 'react';
import {Text, TouchableHighlight, StyleSheet} from 'react-native';
import styleFile from '../style';

export const Button = ({apply, text}) => {
  return (
    <TouchableHighlight
      underlayColor={styleFile.button.underlayColor}
      activeOpacity={styleFile.button.activeOpacity}
      style={styles.button}
      onPress={() => {
        apply();
      }}>
      <Text style={styles.text}>{text}</Text>
    </TouchableHighlight>
  );
};
const styles = StyleSheet.create({
  battonContainer: {
    justifyContent: 'space-around',
    flexWrap: 'wrap',
    flexDirection: 'row',
  },
  button: {
    padding: 4,
    backgroundColor: styleFile.button.backgroundColor,
    borderRadius: 5,
    minWidth: 100,
  },
  text: {
    color: styleFile.text.color,
    textAlign: 'center',
    fontSize: 15,
  },
});
