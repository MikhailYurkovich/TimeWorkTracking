import React, {useState} from 'react';
import {View, StyleSheet, TouchableHighlight, Text} from 'react-native';
import styleFile from '../style';
import ModalClockRecords from './ModalClockRecords';
import moment from 'moment';
import {writeToDB} from '../scripts/operateDB';
import {useSelector} from 'react-redux';

export const RecordMissing = ({selectedDay, queryMount}) => {
  const [modalVisible, setmodalVisible] = useState(false);
  const timeStart = useSelector(state =>
    moment(selectedDay)
      .hours(state.settings.timeStartHour)
      .minutes(state.settings.timeStartMin),
  );
  const timeEnd = useSelector(state =>
    moment(selectedDay)
      .hours(state.settings.timeEndHour)
      .minutes(state.settings.timeEndMin),
  );
  const timeDinner = useSelector(state =>
    moment(selectedDay).hours(0).minutes(state.settings.timeDinner),
  );

  return (
    <>
      <View style={styles.wrap}>
        <Text
          style={[
            styles.text,
            {
              textAlign: 'left',
            },
          ]}>
          Запись отсутсвует
        </Text>
        <TouchableHighlight
          underlayColor={styleFile.button.underlayColor}
          activeOpacity={styleFile.button.activeOpacity}
          onPress={() => {
            setmodalVisible(true);
          }}>
          <View>
            <Text
              style={[
                styles.text,
                {
                  textAlign: 'right',
                },
              ]}>
              Добавить
            </Text>
          </View>
        </TouchableHighlight>
      </View>
      <ModalClockRecords
        selectedDay={selectedDay}
        modalVisible={modalVisible}
        setmodalVisible={setmodalVisible}
        timeStart={timeStart}
        timeEnd={timeEnd}
        timeDinner={timeDinner}
        apply={writeToDB}
        queryMount={queryMount}
      />
    </>
  );
};

const styles = StyleSheet.create({
  wrap: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  text: {
    fontSize: 15,
    color: styleFile.text.color,
    padding: 10,
  },
});
