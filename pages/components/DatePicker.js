import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableHighlight,
  Modal,
  TouchableWithoutFeedback,
} from 'react-native';
import styleFile from '../style';
// import moment from 'moment';
import DatePicker from 'react-native-date-picker';

function MyDatePicker(props) {
  const [date, setDate] = useState(props.date);
  const setOpen = props.setOpen;

  const handleDateChange = date => {
    props.onChange(date);
    setDate(date);
  };

  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={props.open}
      onRequestClose={() => {
        setOpen(false);
      }}>
      <TouchableWithoutFeedback onPress={() => setOpen(false)}>
        <View style={styles.modalOverlay} />
      </TouchableWithoutFeedback>

      <View style={styles.modalContent}>
        <View style={styles.modalView}>
          <Text style={styles.textTitle}>{props.title}</Text>
          <View style={styles.datePickerWrap}>
            <DatePicker
              fadeToColor={'none'}
              textColor={styleFile.text.color}
              date={date}
              onDateChange={setDate}
              is24hourSource={'device'}
              minuteInterval={30}
              androidVariant={'nativeAndroid'}
              locale="ru"
              mode={props.mode}
            />
          </View>
          <View style={styles.buttonWrap}>
            <TouchableHighlight
              activeOpacity={styleFile.button.activeOpacity}
              underlayColor={styleFile.button.underlayColor}
              style={styles.buttonApply}
              onPress={() => {
                setOpen(false);
              }}>
              <Text style={styles.buttonApply.text}>Отмена</Text>
            </TouchableHighlight>
            <TouchableHighlight
              activeOpacity={styleFile.button.activeOpacity}
              underlayColor={styleFile.button.underlayColor}
              style={styles.buttonApply}
              onPress={() => {
                handleDateChange(date);
                setOpen(false);
              }}>
              <Text style={styles.buttonApply.text}>Применить</Text>
            </TouchableHighlight>
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalContent: {
    flex: 1,
    justifyContent: 'center',
    margin: '10%',
  },
  modalView: {
    backgroundColor: styleFile.window.backgroundColor,
    borderRadius: 15,
    padding: 5,
  },
  modalOverlay: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(0,0,0,0.5)',
  },

  textTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: styleFile.text.color,
    textAlign: 'center',
    padding: 2,
  },
  datePickerWrap: {
    alignItems: 'center',
  },
  buttonWrap: {
    flexDirection: 'row',
    justifyContent: 'center',
    flexWrap: 'wrap',
    padding: 5,
  },
  buttonApply: {
    width: '35%',
    padding: 4,
    margin: 5,
    borderRadius: 6,
    backgroundColor: styleFile.button.backgroundColor,
    alignItems: 'center',
    alignSelf: 'center',
    text: {
      fontSize: 16,
      color: styleFile.text.color,
    },
  },
  // button: {
  //   width: '100%',
  //   borderRadius: 8,
  //   backgroundColor: styleFile.button.backgroundColor,
  //   paddingTop: 5,
  //   paddingBottom: 5,
  //   paddingLeft: 20,
  //   paddingRight: 20,
  //   text: {
  //     fontSize: 16,
  //     color: styleFile.text.color,
  //   },
  // },
});

export default MyDatePicker;
