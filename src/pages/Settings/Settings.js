import React, {useEffect, useState} from 'react';
import {
  View,
  StyleSheet,
  Text,
  TouchableHighlight,
  ScrollView,
} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import styleFile from '../style';
import MyDatePicker from '../components/DatePicker';
import moment from 'moment/min/moment-with-locales';
import {BtnSelectDate} from '../components/BtnSelectDate';
import {BtnContainerApply} from '../components/BtnContainerApply';
import ModalWinDelete from '../components/ModalWinDelete';
import {clearDB, updateSettings} from '../../database/allSchemas';
import {BtnInput} from '../components/BtnInput';

const Settings = ({navigation}) => {
  const timeStart = useSelector(state =>
    moment({
      hour: state.settings.timeStart.hours,
      minute: state.settings.timeStart.minutes,
    }),
  );
  const timeEnd = useSelector(state =>
    moment({
      hour: state.settings.timeEnd.hours,
      minute: state.settings.timeEnd.minutes,
    }),
  );
  const timeDinner = useSelector(state =>
    moment().hours(0).minutes(state.settings.timeDinner),
  );
  const tarifRate = useSelector(state => state.settings.tarifRate);

  const SettingsView = ({timeStart, timeEnd, timeDinner, tarifRate}) => {
    const [start, setStart] = useState(timeStart);
    const [end, setEnd] = useState(timeEnd);
    const [dinner, setDinner] = useState(timeDinner);
    const [tarif, setTarif] = useState(tarifRate);

    const [visibleDatePickerStart, setVisibleDatePickerStart] = useState(false);
    const [visibleDatePickerEnd, setVisibleDatePickerEnd] = useState(false);
    const [visibleTimePicker, setVisibleTimePicker] = useState(false);
    const [visibleClearCache, setVisibleClearCache] = useState(false);

    const dispatch = useDispatch();

    const apply = () => {
      const insertObjSettings = {
        timeStart: moment(start).toObject(),
        timeEnd: moment(end).toObject(),
        timeDinner: moment(dinner).hour() * 60 + moment(dinner).minutes(),
        tarifRate: tarif,
      };
      updateSettings(dispatch, insertObjSettings);
      navigation.goBack();
    };

    const btnClose = () => {
      navigation.goBack();
    };

    const btnClearСache = () => {
      clearDB(dispatch);
      setVisibleClearCache(false);

      // navigation.goBack();
    };

    return (
      <ScrollView
        alwaysBounceVertical={false}
        contentContainerStyle={styles.view}>
        <View style={styles.clearСache}>
          <TouchableHighlight
            activeOpacity={styleFile.button.activeOpacity}
            underlayColor={styleFile.button.underlayColor}
            style={styles.clearСacheBtn}
            onPress={() => {
              setVisibleClearCache(true);
            }}>
            <Text style={styles.text}>Очистить кэш приложения</Text>
          </TouchableHighlight>
        </View>
        <View style={styles.applyDate}>
          <View>
            <Text style={styles.titleHeader}>Параметры по умолчанию</Text>
            <View style={styles.pickerConteiner}>
              <BtnSelectDate
                textTitle={'Начало'}
                text={moment(start).format('HH:mm')}
                apply={setVisibleDatePickerStart}
              />
              <BtnSelectDate
                textTitle={'Конец'}
                text={moment(end).format('HH:mm')}
                apply={setVisibleDatePickerEnd}
              />
              <BtnSelectDate
                textTitle={'Обед'}
                text={`${moment(dinner).format('H ч. mm мин.')}`}
                apply={setVisibleTimePicker}
              />
              <BtnInput
                textTitle={'Часовая ставка, р.'}
                text={`${tarif}`}
                onChange={setTarif}
                placeholder={'Ставка'}
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

        <ModalWinDelete
          title={'Очистить кэш?'}
          setmodalVisible={setVisibleClearCache}
          modalVisible={visibleClearCache}
          apply={btnClearСache}
        />
        <MyDatePicker
          onChange={setStart}
          date={start}
          open={visibleDatePickerStart}
          setOpen={setVisibleDatePickerStart}
          title={'Начало'}
          mode={'time'}
        />
        <MyDatePicker
          onChange={setEnd}
          date={end}
          open={visibleDatePickerEnd}
          setOpen={setVisibleDatePickerEnd}
          title={'Конец'}
          mode={'time'}
        />
        <MyDatePicker
          onChange={setDinner}
          date={dinner}
          open={visibleTimePicker}
          setOpen={setVisibleTimePicker}
          title={'Обед'}
          mode={'time'}
        />
      </ScrollView>
    );
  };

  return (
    <SettingsView
      timeStart={timeStart}
      timeEnd={timeEnd}
      timeDinner={timeDinner}
      tarifRate={tarifRate}
    />
  );
};

const styles = StyleSheet.create({
  view: {
    backgroundColor: styleFile.view.backgroundColor,
    minHeight: '100%',
    justifyContent: 'center',
  },
  clearСache: {
    backgroundColor: styleFile.window.backgroundColor,
    marginBottom: 15,
  },
  clearСacheBtn: {
    padding: 10,
  },
  applyDate: {
    backgroundColor: styleFile.window.backgroundColor,
    marginBottom: 15,
  },
  titleHeader: {
    color: styleFile.text.color,
    fontWeight: 'bold',
    fontSize: 17,
    textAlign: 'center',
    padding: 10,
  },
  text: {
    color: styleFile.text.color,
    fontSize: styleFile.text.fontSize,
    textAlign: 'center',
  },
  btnWrap: {
    width: '100%',
    alignSelf: 'center',
  },
});

export default Settings;
