import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import styleFile from '../style';
import SelectDropdown from 'react-native-select-dropdown';

const TimePicker = props => {
  const countries = props.countries;
  const handleTimeChange = number => {
    props.onChange(number);
  };

  return (
    <View style={styles.view}>
      <Text style={styles.text}>{props.title}</Text>
      <SelectDropdown
        buttonTextStyle={styles.buttonTextStyle}
        rowTextStyle={styles.rowTextStyle}
        dropdownStyle={styles.dropdownStyle}
        buttonStyle={styles.buttonStyle}
        rowStyle={styles.rowStyle}
        data={countries}
        onSelect={selectedItem => {
          handleTimeChange(selectedItem);
        }}
        defaultButtonText={`${props.timeDinner}`}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  view: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    color: styleFile.text.color,
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  buttonTextStyle: {
    color: styleFile.text.color,
    fontSize: 18,
  },
  rowTextStyle: {
    color: styleFile.text.color,
    fontSize: 18,
  },
  dropdownStyle: {
    backgroundColor: styleFile.button.backgroundColor,
    borderRadius: 5,
  },
  buttonStyle: {
    width: 80,
    height: 31,
    borderRadius: 8,
    backgroundColor: styleFile.button.backgroundColor,
  },
  rowStyle: {
    height: 35,
  },
});

export default TimePicker;
