import React, {useState} from 'react';
import {View, StyleSheet, Text, TouchableHighlight} from 'react-native';
import styleFile from './style';
import MyDatePicker from './components/DatePicker';
import TimePicker from './components/TimePicker';
import {useSelector, useDispatch} from 'react-redux';
import moment from 'moment/min/moment-with-locales';

const Settings = ({navigation}) => {
  const timeSettings = useSelector(state => state.settings);
  const dispatch = useDispatch();

  const Render = ({timeSettings}) => {
    const [timeStartModalWin, settimeStartModalWin] = useState(false);
    const [timeEndModalWin, settimeEndModalWin] = useState(false);
    const [timeStart, setDateStart] = useState(
      new Date(
        new Date().setHours(
          timeSettings.timeStartHour,
          timeSettings.timeStartMin,
          0,
          0,
        ),
      ),
    );
    const [timeEnd, setDateEnd] = useState(
      new Date(
        new Date().setHours(
          timeSettings.timeEndHour,
          timeSettings.timeEndMin,
          0,
          0,
        ),
      ),
    );
    const [timeDinner, setTimeStart] = useState(timeSettings.timeDinner);
    const countriesDinner = timeSettings.countriesDinner;

    const insertObjSettings = {
      timeStartHour: timeStart.getHours(),
      timeStartMin: timeStart.getMinutes(),
      timeEndHour: timeEnd.getHours(),
      timeEndMin: timeEnd.getMinutes(),
      timeDinner: timeDinner,
      countriesDinner: timeSettings.countriesDinner,
    };

    return (
      <View>
        <Text style={styles.titleHeader}>Параметры по умолчанию</Text>
        <View style={styles.pickerConteiner}>
          <View style={styles.pickerWrap}>
            <Text style={[styles.text, styles.titleDatePicker]}>Начало</Text>
            <TouchableHighlight
              activeOpacity={styleFile.button.activeOpacity}
              underlayColor={styleFile.button.underlayColor}
              onPress={() => {
                settimeStartModalWin(true);
              }}
              style={styles.button}>
              <Text style={styles.text}>
                {moment(timeStart).format('HH:mm')}
              </Text>
            </TouchableHighlight>
            <MyDatePicker
              onChange={setDateStart}
              date={timeStart}
              title={'Начало'}
              formatDate={'HH:mm'}
              mode={'time'}
              open={timeStartModalWin}
              setOpen={settimeStartModalWin}
            />
          </View>
          <View style={styles.pickerWrap}>
            <Text style={[styles.text, styles.titleDatePicker]}>Конец</Text>
            <TouchableHighlight
              activeOpacity={styleFile.button.activeOpacity}
              underlayColor={styleFile.button.underlayColor}
              onPress={() => {
                settimeEndModalWin(true);
              }}
              style={styles.button}>
              <Text style={styles.text}>{moment(timeEnd).format('HH:mm')}</Text>
            </TouchableHighlight>
            <MyDatePicker
              onChange={setDateEnd}
              date={timeEnd}
              open={timeEndModalWin}
              setOpen={settimeEndModalWin}
              title={'Конец'}
              formatDate={'HH:mm'}
              mode={'time'}
            />
          </View>

          <View style={styles.pickerWrap}>
            <TimePicker
              onChange={setTimeStart}
              timeDinner={timeDinner}
              countries={countriesDinner}
              title={'Обед, мин.'}
            />
          </View>
        </View>

        <TouchableHighlight
          activeOpacity={styleFile.button.activeOpacity}
          underlayColor={styleFile.button.underlayColor}
          style={styles.buttonApply}
          onPress={() => {
            [
              dispatch({
                type: 'UPPDATE_SETTINGS',
                payload: insertObjSettings,
              }),
              navigation.goBack(),
            ];
          }}>
          <Text style={styles.text}>Применить</Text>
        </TouchableHighlight>
      </View>
    );
  };

  return (
    <View style={styles.view}>
      <View style={styles.applyDate}>
        <Render timeSettings={timeSettings} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  view: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: styleFile.view.backgroundColor,
  },
  applyDate: {
    margin: '3%',
    padding: 5,
    backgroundColor: styleFile.window.backgroundColor,
    borderRadius: 15,
  },
  titleHeader: {
    alignSelf: 'center',
    padding: 5,
    fontSize: 20,
    fontWeight: 'bold',
    color: styleFile.text.color,
  },
  pickerConteiner: {
    flexWrap: 'wrap',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignSelf: 'center',
    width: '50%',
    marginBottom: 10,
  },

  pickerWrap: {
    alignItems: 'center',
    margin: '2%',
  },

  titleDatePicker: {
    marginBottom: 5,
    fontWeight: 'bold',
  },
  button: {
    paddingTop: 4,
    paddingBottom: 4,
    paddingLeft: 20,
    paddingRight: 20,
    backgroundColor: styleFile.button.backgroundColor,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonApply: {
    paddingTop: 5,
    paddingBottom: 5,
    paddingLeft: 20,
    paddingRight: 20,
    borderRadius: 8,
    backgroundColor: styleFile.button.backgroundColor,
    alignSelf: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  text: {
    color: styleFile.text.color,
    fontSize: 18,
  },
});

export default Settings;
