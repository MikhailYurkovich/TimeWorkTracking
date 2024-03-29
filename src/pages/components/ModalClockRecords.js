import React, {useEffect, useState} from 'react';
import {
  View,
  StyleSheet,
  Text,
  Modal,
  TouchableWithoutFeedback,
  ScrollView,
} from 'react-native';
import styleFile from '../style';
import moment from 'moment';
import {calendarSetting} from '../scripts/calendarSetting';
import MyDatePicker from './DatePicker';
import {BtnSelectDate} from './BtnSelectDate';
import {BtnContainerApply} from './BtnContainerApply';
import {BtnInput} from './BtnInput';
import {BtnInputText} from './BtnInputText';
import {writeToDB} from '../scripts/operateDB';
import {useDispatch} from 'react-redux';
import {BannerAd, BannerAdSize, TestIds} from 'react-native-google-mobile-ads';
import analytics from '@react-native-firebase/analytics';

const adUnitId = __DEV__
  ? TestIds.BANNER
  : 'ca-app-pub-8017817006445043/3662242673';

const ModalClockRecords = ({
  setmodalVisible,
  modalVisible,
  timeStart,
  timeEnd,
  timeDinner,
  salarySettings,
  theNote,
}) => {
  const [start, setStart] = useState(null);
  const [end, setEnd] = useState(null);
  const [dinner, setDinner] = useState(null);
  const [tarifRate, setTarifRate] = useState(NaN);
  const [note, setNote] = useState('');
  const dispatch = useDispatch();

  const [visibleDatePickerStart, setvisibleDatePickerStart] = useState(false);
  const [visibleDatePickerEnd, setvisibleDatePickerEnd] = useState(false);
  const [visibleTimePicker, setvisibleTimePicker] = useState(false);

  useEffect(() => {
    setStart(timeStart);
    setEnd(
      moment(new Date(timeStart))
        .hour(moment(timeEnd).hour())
        .minute(moment(timeEnd).minute())
        .toDate(),
    );

    setDinner(timeDinner);
    setTarifRate(salarySettings);
    setNote(theNote);
  }, [timeStart, timeEnd, timeDinner, salarySettings, theNote]);

  const btnClose = () => {
    setmodalVisible(false);
  };
  const applyVisibleDatePickerStart = () => {
    setvisibleDatePickerStart(true);
  };
  const applyVisibleDatePickerEnd = () => {
    setvisibleDatePickerEnd(true);
  };
  const applyVisibleTimePicker = () => {
    setvisibleTimePicker(true);
  };

  const predifinedEvent = async () => {
    await analytics().logEvent('writeToBD', {
      id: start,
    });
  };

  const apply1 = () => {
    predifinedEvent();
    const obj = {
      timeStart: start,
      timeEnd: end,
      timeDinner: dinner,
      tarifRate: tarifRate,
      note: note,
      dispatch,
    };

    if (start >= end) {
      obj.timeEnd = moment(end).add(1, 'day').toDate();
      writeToDB(obj);
    } else {
      writeToDB(obj);
    }
    setmodalVisible(false);
  };

  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={modalVisible}
      onRequestClose={() => {
        btnClose();
      }}>
      <MyDatePicker
        onChange={setStart}
        date={start}
        open={visibleDatePickerStart}
        setOpen={setvisibleDatePickerStart}
        title={'Начало'}
        mode={'time'}
      />
      <MyDatePicker
        onChange={setEnd}
        date={end}
        open={visibleDatePickerEnd}
        setOpen={setvisibleDatePickerEnd}
        title={'Конец'}
        mode={'time'}
      />
      <MyDatePicker
        onChange={setDinner}
        date={dinner}
        open={visibleTimePicker}
        setOpen={setvisibleTimePicker}
        title={'Перерыв'}
        mode={'time'}
      />

      <TouchableWithoutFeedback onPress={() => btnClose()}>
        <View style={styles.modalOverlay} />
      </TouchableWithoutFeedback>

      <View style={styles.modalContent}>
        <View style={styles.modalView}>
          <ScrollView>
            <Text style={[styles.textTitle, {marginBottom: 3}]}>
              {moment(timeStart).calendar(calendarSetting)}
            </Text>
            <BtnSelectDate
              textTitle={'Начало'}
              text={moment(start).format('HH:mm')}
              apply={applyVisibleDatePickerStart}
            />
            <BtnSelectDate
              textTitle={'Конец'}
              text={moment(end).format('HH:mm')}
              apply={applyVisibleDatePickerEnd}
            />
            <BtnSelectDate
              textTitle={'Перерыв'}
              text={`${moment(dinner).format('H ч. mm мин.')}`}
              apply={applyVisibleTimePicker}
            />
            <BtnInput
              textTitle={'Часовая ставка, р.'}
              text={`${salarySettings}`}
              onChange={setTarifRate}
              placeholder={'Ставка'}
            />
            <BtnInputText
              onChange={text => setNote(text)}
              placeholder={'Заметка'}
              text={`${note}`}
            />

            <View style={styles.btnWrap}>
              <BtnContainerApply
                btnApply_1={btnClose}
                btnApply_2={apply1}
                textBtn_1={'Отмена'}
                textBtn_2={'Применить'}
              />
            </View>
          </ScrollView>
        </View>
      </View>
      <View style={styles.banner}>
        <BannerAd size={BannerAdSize.BANNER} unitId={adUnitId} />
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContent: {
    flex: 1,
    justifyContent: 'center',
    margin: 15,
    position: 'relative',
  },
  modalView: {
    backgroundColor: styleFile.window.backgroundColor,
    borderRadius: 5,
  },
  modalOverlay: {
    position: 'absolute',
    flex: 1,
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  btnWrap: {
    width: '100%',
    alignSelf: 'center',
  },

  textTitle: {
    color: styleFile.text.color,
    fontWeight: 'bold',
    fontSize: 17,
    textAlign: 'center',
    padding: 10,
  },
  banner: {
    bottom: 0,
    alignItems: 'center',
  },
});
export default ModalClockRecords;
