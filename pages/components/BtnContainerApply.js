import React from 'react';
import {View, StyleSheet} from 'react-native';
import styleFile from '../style';
import {Button} from './Button';

export const BtnContainerApply = ({
  btnApply_1,
  textBtn_1,
  btnApply_2,
  textBtn_2,
}) => {
  return (
    <View style={styles.battonContainer}>
      <Button apply={btnApply_1} text={textBtn_1} />
      <Button apply={btnApply_2} text={textBtn_2} />
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
    padding: 4,
    margin: 5,
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
