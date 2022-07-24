import React, {useState} from 'react';
import {View, StyleSheet, Text} from 'react-native';
import styleFile from './style';
import MyDatePicker from './components/DatePicker';
import {useSelector, useDispatch} from 'react-redux';
import moment from 'moment/min/moment-with-locales';
import {BtnSelectDate} from './components/BtnSelectDate';
import {BtnContainerApply} from './components/BtnContainerApply';

const Settings = ({navigation}) => {
  const [visibleDatePickerStart, setvisibleDatePickerStart] = useState(false);
  const [visibleDatePickerEnd, setvisibleDatePickerEnd] = useState(false);
  const [visibleTimePicker, setvisibleTimePicker] = useState(false);

  const [timeStart, settimeStart] = useState(
    useSelector(state =>
      moment(new Date())
        .hours(state.settings.timeStartHour)
        .minutes(state.settings.timeStartMin),
    ),
  );
  const [timeEnd, settimeEnd] = useState(
    useSelector(state =>
      moment(new Date())
        .hours(state.settings.timeEndHour)
        .minutes(state.settings.timeEndMin),
    ),
  );
  const [timeDinner, settimeDinner] = useState(
    useSelector(state =>
      moment(new Date()).hours(0).minutes(state.settings.timeDinner),
    ),
  );
  const dispatch = useDispatch();

  const apply = () => {
    const insertObjSettings = {
      timeStartHour: moment(timeStart).hours(),
      timeStartMin: moment(timeStart).minutes(),
      timeEndHour: moment(timeEnd).hours(),
      timeEndMin: moment(timeEnd).minutes(),
      timeDinner: moment(timeDinner).hour() * 60 + moment(timeDinner).minutes(),
    };

    dispatch({
      type: 'UPPDATE_SETTINGS',
      payload: insertObjSettings,
    });
    navigation.goBack();
  };

  const btnClose = () => {
    navigation.goBack();
  };

  return (
    <View style={styles.view}>
      <View style={styles.applyDate}>
        <View>
          <Text style={styles.titleHeader}>Параметры по умолчанию</Text>
          <View style={styles.pickerConteiner}>
            <BtnSelectDate
              textTitle={'Начало'}
              text={moment(timeStart).format('HH:mm')}
              apply={setvisibleDatePickerStart}
            />
            <BtnSelectDate
              textTitle={'Конец'}
              text={moment(timeEnd).format('HH:mm')}
              apply={setvisibleDatePickerEnd}
            />
            <BtnSelectDate
              textTitle={'Обед'}
              text={`${moment(timeDinner).format('H ч. mm мин.')}`}
              apply={setvisibleTimePicker}
            />
            <View style={styles.btnWrap}>
              <BtnContainerApply
                btnApply_1={btnClose}
                btnApply_2={apply}
                textBtn_1={'Отмена'}
                textBtn_2={'Применить'}
              />
            </View>
          </View>
        </View>
      </View>
      <MyDatePicker
        onChange={settimeStart}
        date={timeStart}
        open={visibleDatePickerStart}
        setOpen={setvisibleDatePickerStart}
        title={'Начало'}
        mode={'time'}
      />
      <MyDatePicker
        onChange={settimeEnd}
        date={timeEnd}
        open={visibleDatePickerEnd}
        setOpen={setvisibleDatePickerEnd}
        title={'Конец'}
        mode={'time'}
      />
      <MyDatePicker
        onChange={settimeDinner}
        date={timeDinner}
        open={visibleTimePicker}
        setOpen={setvisibleTimePicker}
        title={'Обед'}
        mode={'time'}
      />
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
    backgroundColor: styleFile.window.backgroundColor,
  },
  titleHeader: {
    color: styleFile.text.color,
    fontWeight: 'bold',
    fontSize: 17,
    textAlign: 'center',
    padding: 10,
  },
  btnWrap: {
    width: 300,
    alignSelf: 'center',
    marginVertical: 8,
  },
});

export default Settings;
