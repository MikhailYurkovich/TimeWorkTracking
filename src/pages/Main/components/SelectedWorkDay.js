import React, {useState} from 'react';
import {View, StyleSheet, TouchableHighlight, Text} from 'react-native';
import styleFile from '../../style';
import ModalClockRecords from '../../components/ModalClockRecords';
import ModalWinDelete from '../../components/ModalWinDelete';
import {deleteDay} from '../../../database/allSchemas';
import moment from 'moment';
import {useDispatch} from 'react-redux';

export const SelectedWorkDay = ({workDay, selectedDay}) => {
  const timeStart = workDay.timeStart;
  const timeEnd = workDay.timeEnd;
  const timeDinner = moment(new Date()).hour(0).minute(workDay.timeDinner);
  const timeWork = workDay.timeWork;
  const tarifRate = workDay.salarySettings.tarifRate;
  const dispatch = useDispatch();

  const [modalVisible, setmodalVisible] = useState(false);
  const [modalVisibleModalDel, setmodalVisibleModalDel] = useState(false);

  return (
    <View>
      <View>
        <View style={styles.textWrap}>
          <Text style={[styles.text, styles.textWidth]}>
            {`${moment(timeStart).format('HH:mm')} - ${moment(timeEnd).format(
              'HH:mm',
            )}`}
          </Text>

          <Text style={[styles.text, styles.textWidth]}>
            {moment(new Date()).hour(0).minute(timeWork).format('H ч. m м.')}
          </Text>
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
            style={[
              styles.btn,
              {
                borderLeftWidth: 1,
                borderLeftColor: styleFile.border.borderColor,
              },
            ]}
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
        modalVisible={modalVisible}
        setmodalVisible={setmodalVisible}
        timeStart={timeStart}
        timeEnd={timeEnd}
        timeDinner={timeDinner}
        salarySettings={tarifRate}
      />
      <ModalWinDelete
        text={`${moment(selectedDay).format('DD MMMM YYYY')}`}
        title={'Удалить запись?'}
        setmodalVisible={setmodalVisibleModalDel}
        modalVisible={modalVisibleModalDel}
        apply={() => [
          setmodalVisibleModalDel(false),
          deleteDay(dispatch, Number(moment(selectedDay).format('YYYYMMDD'))),
        ]}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  text: {
    fontSize: styleFile.text.fontSize,
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
    paddingHorizontal: 5,
    paddingVertical: 7,
  },
});
