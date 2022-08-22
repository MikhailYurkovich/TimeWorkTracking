import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Modal,
  TouchableWithoutFeedback,
} from 'react-native';
import styleFile from '../style';
import DatePicker from 'react-native-date-picker';
import {BtnContainerApply} from './BtnContainerApply';

const MyDatePicker = ({onChange, date, open, setOpen, title, mode}) => {
  const [datePicker, setdatePicker] = useState(new Date());
  useEffect(() => {
    setdatePicker(new Date(date));
  }, [date]);

  const handleDateChange = () => {
    onChange(datePicker);
    setdatePicker(datePicker);
    setOpen(false);
  };

  const btnClose = () => {
    setOpen(false);
  };

  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={open}
      style={{zIndex: 100}}
      onRequestClose={() => {
        setOpen(false);
      }}>
      <TouchableWithoutFeedback onPress={() => setOpen(false)}>
        <View style={styles.modalOverlay} />
      </TouchableWithoutFeedback>

      <View style={styles.modalContent}>
        <View style={styles.modalView}>
          <Text style={styles.textTitle}>{title}</Text>
          <View style={styles.datePickerWrap}>
            <DatePicker
              fadeToColor={'none'}
              textColor={styleFile.text.color}
              date={datePicker}
              onDateChange={setdatePicker}
              is24hourSource={'device'}
              minuteInterval={30}
              androidVariant={'iosClone'}
              locale="ru"
              mode={mode}
            />
          </View>
          <View style={styles.buttonWrap}>
            <BtnContainerApply
              btnApply_1={btnClose}
              btnApply_2={handleDateChange}
              textBtn_1={'Отмена'}
              textBtn_2={'Применить'}
              colorBtn_1={'red'}
              colorBtn_2={styleFile.tab.colorActive}
            />
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContent: {
    flex: 1,
    justifyContent: 'center',

    alignSelf: 'center',
  },
  modalView: {
    backgroundColor: styleFile.window.backgroundColor,
    borderRadius: 5,
  },
  modalOverlay: {
    position: 'absolute',
    top: 0,
    flex: 1,
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
    marginBottom: 5,
  },
  datePickerWrap: {
    width: '100%',
  },
  buttonWrap: {
    width: '100%',
    alignSelf: 'center',
    marginTop: 8,
  },
});
export default MyDatePicker;
