import React from 'react';
import {View, StyleSheet, Text} from 'react-native';
import styleFile from '../../style';
import moment from 'moment';
import 'moment/locale/ru';
import {RecordMissing} from './RecordMissing';
import {calendarSetting} from '../../scripts/calendarSetting';
import {SelectedWorkDay} from './SelectedWorkDay';
import {useSelector} from 'react-redux';

export const SelectedDay = ({listMonth}) => {
  const selectedMount = useSelector(state => state.selectedMount);
  const selectedDay = useSelector(state => state.selectedDay);

  if (
    moment(selectedMount).format('YYYYMM') !==
    moment(selectedDay).format('YYYYMM')
  ) {
    return <></>;
  }

  let workDay;
  if (listMonth) {
    workDay = listMonth.listWorks.find(el => {
      return el.id == moment(selectedDay).format('YYYYMMDD');
    });
  }

  return (
    <View style={styles.view}>
      <View style={styles.textWrap}>
        <Text style={styles.text}>
          {moment(selectedDay).calendar(calendarSetting)}
        </Text>
      </View>

      {workDay ? (
        <SelectedWorkDay workDay={workDay} selectedDay={selectedDay} />
      ) : (
        <RecordMissing selectedDay={selectedDay} />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  view: {
    backgroundColor: styleFile.window.backgroundColor,
  },
  textWrap: {
    borderColor: styleFile.border.borderColor,
    borderBottomWidth: 1,
    padding: 12,
  },
  text: {
    fontSize: styleFile.text.fontSize,
    textAlign: 'center',
    fontWeight: 'bold',
    color: styleFile.text.color,
  },
});
