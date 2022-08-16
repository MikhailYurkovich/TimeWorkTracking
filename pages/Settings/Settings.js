import React, {useState} from 'react';
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
import {clearDB} from '../../database/allSchemas';
import {BtnInput} from '../components/BtnInput';

const Settings = ({navigation}) => {
  const [visibleDatePickerStart, setvisibleDatePickerStart] = useState(false);
  const [visibleDatePickerEnd, setvisibleDatePickerEnd] = useState(false);
  const [visibleTimePicker, setvisibleTimePicker] = useState(false);
  const [visibleClearCache, setvisibleClearCache] = useState(false);

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
  const [tarifRate, settarifRate] = useState(
    useSelector(state => state.settings.tarifRate),
  );
  const dispatch = useDispatch();

  const apply = () => {
    const insertObjSettings = {
      timeStartHour: moment(timeStart).hours(),
      timeStartMin: moment(timeStart).minutes(),
      timeEndHour: moment(timeEnd).hours(),
      timeEndMin: moment(timeEnd).minutes(),
      timeDinner: moment(timeDinner).hour() * 60 + moment(timeDinner).minutes(),
      tarifRate: tarifRate,
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

  const btnClearСache = () => {
    clearDB().then(record => {
      setvisibleClearCache(false);
    });
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
            setvisibleClearCache(true);
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
            <BtnInput
              textTitle={'Часовая ставка, р.'}
              text={`${tarifRate}`}
              onChange={settarifRate}
              placeholder={'Ставка'}
            />
            <View style={styles.btnWrap}>
              <BtnContainerApply
                btnApply_1={btnClose}
                btnApply_2={apply}
                textBtn_1={'Отмена'}
                textBtn_2={'Применить'}
                colorBtn_1={'red'}
                colorBtn_2={styleFile.tab.colorActive}
              />
            </View>
          </View>
        </View>
      </View>
      <ModalWinDelete
        title={'Очистить кэш?'}
        setmodalVisible={setvisibleClearCache}
        modalVisible={visibleClearCache}
        apply={btnClearСache}
      />
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
    </ScrollView>
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
    fontSize: 15,
    textAlign: 'center',
  },
  btnWrap: {
    width: '100%',
    alignSelf: 'center',
  },
});

export default Settings;