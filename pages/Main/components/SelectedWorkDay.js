import React, {useState, useEffect} from 'react';
import {View, StyleSheet, TouchableHighlight, Text} from 'react-native';
import styleFile from '../../style';
import ModalClockRecords from '../../components/ModalClockRecords';
import ModalWinDelete from '../../components/ModalWinDelete';
import {DeleteListWorkId} from '../../../database/allSchemas';
import moment from 'moment';
import {updateDay} from '../../scripts/operateDB';

export const SelectedWorkDay = ({workDay, queryMount, selectedDay}) => {
  const [modalVisible, setmodalVisible] = useState(false);
  const [modalVisibleModalDel, setmodalVisibleModalDel] = useState(false);
  const [timeStart, settimeStart] = useState(null);
  const [timeEnd, settimeEnd] = useState(null);
  const [timeDinner, settimeDinner] = useState(NaN);
  const [timeWorkObj, settimeWorkObj] = useState(NaN);
  const [tarifRate, settarifRate] = useState(NaN);

  useEffect(() => {
    settimeStart(workDay.timeStart);
    settimeEnd(workDay.timeEnd);
    settimeDinner(moment(new Date()).hour(0).minute(workDay.timeDinner));
    settimeWorkObj(workDay.timeWorkObj);
    settarifRate(workDay.salarySettings.tarifRate);
  }, [workDay]);

  const deleteDay = () => {
    DeleteListWorkId(workDay.id);
    queryMount(workDay.idMounth);
  };

  return (
    <View>
      <View>
        <View style={styles.textWrap}>
          <Text style={[styles.text, styles.textWidth]}>
            {`${moment(timeStart).format('HH:mm')} - ${moment(timeEnd).format(
              'HH:mm',
            )}`}
          </Text>

          <Text
            style={[
              styles.text,
              styles.textWidth,
            ]}>{`${timeWorkObj.hours} ч. ${timeWorkObj.minutes} м.`}</Text>
          <Text style={[styles.text, styles.textWidth]}>{`Перерыв: ${moment(
            timeDinner,
          ).format('H ч. m м.')}`}</Text>
          <Text
            style={[
              styles.text,
              styles.textWidth,
            ]}>{`Часовая ставка: ${tarifRate} р.`}</Text>
        </View>

        <View style={styles.btnWrap}>
          <TouchableHighlight
            underlayColor={styleFile.button.underlayColor}
            activeOpacity={styleFile.button.activeOpacity}
            style={styles.btn}
            onPress={() => {
              setmodalVisibleModalDel(true);
            }}>
            <Text style={[styles.text, {color: 'red'}]}>Удалить</Text>
          </TouchableHighlight>
          <TouchableHighlight
            underlayColor={styleFile.button.underlayColor}
            activeOpacity={styleFile.button.activeOpacity}
            style={styles.btn}
            onPress={() => {
              setmodalVisible(true);
            }}>
            <Text style={[styles.text, {color: styleFile.tab.colorActive}]}>
              Изменить
            </Text>
          </TouchableHighlight>
        </View>
      </View>
      <ModalClockRecords
        selectedDay={selectedDay}
        modalVisible={modalVisible}
        setmodalVisible={setmodalVisible}
        timeStart={timeStart}
        timeEnd={timeEnd}
        timeDinner={timeDinner}
        apply={updateDay}
        queryMount={queryMount}
        workDay={workDay}
        salarySettings={tarifRate}
      />
      <ModalWinDelete
        text={`${moment(selectedDay).format('DD MMMM YYYY')}`}
        title={'Удалить запись?'}
        setmodalVisible={setmodalVisibleModalDel}
        modalVisible={modalVisibleModalDel}
        apply={deleteDay}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  text: {
    fontSize: 15,
    color: styleFile.text.color,
    padding: 5,
    textAlign: 'center',
  },
  textWidth: {
    minWidth: 160,
  },
  textWrap: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    flexWrap: 'wrap',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: styleFile.border.borderColor,
  },
  btnWrap: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
  },
  btn: {
    minWidth: 100,
    flex: 1,
    padding: 5,
  },
});
