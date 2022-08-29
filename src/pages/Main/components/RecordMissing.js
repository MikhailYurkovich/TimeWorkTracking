import React, {useState} from 'react';
import {View, StyleSheet, TouchableHighlight, Text} from 'react-native';
import styleFile from '../../style';
import ModalClockRecords from '../../components/ModalClockRecords';
import moment from 'moment';
import {useSelector} from 'react-redux';

export const RecordMissing = ({selectedDay}) => {
  const timeStart = useSelector(state =>
    moment(selectedDay)
      .hour(state.settings.timeStart.hours)
      .minute(state.settings.timeStart.minutes),
  );
  const timeEnd = useSelector(state =>
    moment(selectedDay)
      .hour(state.settings.timeEnd.hours)
      .minute(state.settings.timeEnd.minutes),
  );
  const timeDinner = useSelector(state =>
    moment(selectedDay).minutes(state.settings.timeDinner),
  );
  const tarifRate = useSelector(state => state.settings.tarifRate);

  const [modalVisible, setmodalVisible] = useState(false);

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
        modalVisible={modalVisible}
        setmodalVisible={setmodalVisible}
        timeStart={timeStart}
        timeEnd={timeEnd}
        timeDinner={timeDinner}
        salarySettings={tarifRate}
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
    fontSize: styleFile.text.fontSize,
    color: styleFile.text.color,
    padding: 12,
  },
});
