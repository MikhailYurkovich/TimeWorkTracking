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
import moment from 'moment';
import DatePicker from 'react-native-date-picker';

function MyDatePicker(props) {
  const [date, setDate] = useState(props.date);
  const [dateModal, setdateModal] = useState(props.date);
  const [open, setOpen] = useState(false);

  const handleDateChange = date => {
    props.onChange(date);
  };

  return (
    <View style={styles.view}>
      <Text style={[styles.text, {marginBottom: 5}]}>{props.title}</Text>
      <TouchableHighlight
        activeOpacity={styleFile.button.activeOpacity}
        underlayColor={styleFile.button.underlayColor}
        onPress={() => setOpen(true)}
        style={styles.button}>
        <Text style={styles.button.text}>
          {moment(date).format(props.formatDate)}
        </Text>
      </TouchableHighlight>

      <Modal
        animationType="fade"
        transparent={true}
        visible={open}
        onRequestClose={() => {
          setOpen(false);
        }}>
        <TouchableWithoutFeedback onPress={() => setOpen(false)}>
          <View style={styles.modalOverlay} />
        </TouchableWithoutFeedback>

        <View style={styles.modalContent}>
          <View style={styles.modalView}>
            <View style={styles.modalConteiner}>
              <Text style={styles.textTitle}>{props.title}</Text>
              <View style={styles.datePicker}>
                <DatePicker
                  fadeToColor={'none'}
                  textColor={styleFile.text.color}
                  date={date}
                  onDateChange={setdateModal}
                  is24hourSource={'device'}
                  minuteInterval={30}
                  title={props.title}
                  androidVariant={'nativeAndroid'}
                  locale="ru"
                  mode={props.mode}
                />
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'center',
                  flexWrap: 'wrap',
                }}>
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
                    handleDateChange(dateModal);
                    setDate(dateModal);
                    setOpen(false);
                  }}>
                  <Text style={styles.buttonApply.text}>Применить</Text>
                </TouchableHighlight>
              </View>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  view: {
    margin: 10,
    alignItems: 'center',
  },
  modalContent: {
    flex: 1,
    justifyContent: 'center',
    margin: '10%',
  },
  modalView: {
    backgroundColor: styleFile.window.backgroundColor,
    borderRadius: 15,
  },
  modalConteiner: {
    margin: 10,
  },
  modalOverlay: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  text: {
    color: styleFile.text.color,
    fontSize: 20,
  },
  textTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: styleFile.text.color,
    textAlign: 'center',
    padding: 5,
  },
  datePicker: {
    alignItems: 'center',
    marginLeft: 5,
    marginRight: 5,
  },
  buttonApply: {
    width: '35%',
    paddingTop: 4,
    paddingBottom: 4,
    marginTop: 15,
    marginBottom: 20,
    marginLeft: 10,
    marginLeft: 10,
    borderRadius: 6,
    backgroundColor: styleFile.button.backgroundColor,
    alignItems: 'center',
    alignSelf: 'center',
    marginBottom: 3,
    text: {
      fontSize: 16,
      color: styleFile.text.color,
    },
  },
  button: {
    width: '100%',
    borderRadius: 8,
    backgroundColor: styleFile.button.backgroundColor,
    paddingTop: 5,
    paddingBottom: 5,
    paddingLeft: 20,
    paddingRight: 20,
    text: {
      fontSize: 18,
      color: styleFile.text.color,
    },
  },
});

export default MyDatePicker;
