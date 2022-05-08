import React, {useState, useEffect} from 'react';
import {View, StyleSheet, TouchableHighlight, Text} from 'react-native';
import styleFile from './style';
import moment from 'moment/min/moment-with-locales';
import ModalWinMessage from './components/ModalWindow';
import MyDatePicker from './components/DatePicker';
import TimePicker from './components/TimePicker';
import {insertListWork} from '../database/allSchemas';
import {useSelector} from 'react-redux';

const ClockRecords = ({navigation}) => {
  const timeSettings = useSelector(state => state.settings);
  const [modalWin, setmodalWin] = useState(false);

  const Render = ({timeSettings}) => {
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

    const writeToDB = () => {
      moment.locale('ru');
      let nameMounth = moment(timeStart).format('MMMM, YYYY');
      nameMounth = nameMounth[0].toUpperCase() + nameMounth.substring(1);
      let idMounth = Number(moment(timeStart).format('YYYYMM'));
      //Вычетание даты
      let timeWork = timeEnd - timeStart;
      timeWork = timeWork / 1000 / 60;

      //Проверить, чтобы дата начала и окончания не были равны
      if (timeDinner >= timeWork || timeStart >= timeEnd) {
        setmodalWin({visible: true, textTitle: 'Ошибка', text: 'Даты'});
        return false;
      }

      //Вычесть обед
      timeWork = (timeWork - timeDinner) / 60;
      const formatDate = `${moment(timeStart).format('HH:mm')} - ${moment(
        timeEnd,
      ).format('HH:mm')}`;
      const idDay = timeStart.getTime() + timeEnd.getTime() + timeDinner;

      const insertObj = {
        nameMounth: nameMounth,
        idMounth: idMounth,
        timeStart: timeStart,
        timeEnd: timeEnd,
        timeDinner: timeDinner,
        timeWork: timeWork,
        formatDate: formatDate,
        idDay: idDay,
      };

      insertListWork(insertObj)
        .then(record => {
          setmodalWin({
            visible: true,
            textTitle: record,
            text: `Начало в ${moment(timeStart)
              .locale('ru')
              .format('HH:mm; DD/MM/YY')}\nКонец в ${moment(timeEnd)
              .locale('ru')
              .format(
                'HH:mm; DD/MM/YY',
              )}\nОбед: ${timeDinner} мин.\nОтработал: ${timeWork} ч.`,
          });
        })
        .catch(error => {
          setmodalWin({
            visible: true,
            textTitle: error.textTitle,
            text: error.text,
          });
        });
    };

    return (
      <View style={styles.applyDate}>
        <View style={{alignContent: 'center', alignItems: 'center'}}>
          <Text style={styles.titleHeader}>Запись рабочих часов</Text>

          <MyDatePicker
            onChange={setDateStart}
            date={timeStart}
            title={'Начало смены'}
            formatDate={'DD.MM.YY, HH:mm'}
            mode={'datetime'}
          />

          <MyDatePicker
            onChange={setDateEnd}
            date={timeEnd}
            title={'Конец смены'}
            formatDate={'DD.MM.YY, HH:mm'}
            mode={'datetime'}
          />

          <TimePicker
            onChange={setTimeStart}
            timeDinner={timeDinner}
            countries={countriesDinner}
            title={'Обед, мин.'}
          />

          <TouchableHighlight
            activeOpacity={styleFile.button.activeOpacity}
            underlayColor={styleFile.button.underlayColor}
            style={styles.button}
            onPress={writeToDB}>
            <Text style={styles.text}>Применить</Text>
          </TouchableHighlight>
        </View>
      </View>
    );
  };

  return (
    <View style={styles.view}>
      <ModalWinMessage modalWin={modalWin} setmodalWin={setmodalWin} />
      <Render timeSettings={timeSettings} />
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
    fontSize: 20,
    fontWeight: 'bold',
    color: styleFile.text.color,
  },

  button: {
    marginTop: 15,
    paddingTop: 5,
    paddingBottom: 5,
    paddingLeft: 30,
    paddingRight: 30,
    borderRadius: 8,
    marginBottom: 15,
    backgroundColor: styleFile.button.backgroundColor,
  },
  text: {
    color: styleFile.text.color,
    fontSize: 18,
  },
});

export default ClockRecords;
