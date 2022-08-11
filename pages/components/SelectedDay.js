import React from 'react';
import {View, StyleSheet, Text} from 'react-native';
import styleFile from '../style';
import moment from 'moment';
import 'moment/locale/ru';
import {RecordMissing} from './RecordMissing';
// import {queryWorkDayId} from '../../database/allSchemas';
import {calendarSetting} from '../scripts/calendarSetting';
import {SelectedWorkDay} from './SelectedWorkDay';

export const SelectedDay = ({
  selectedDay,
  listMonth,
  queryMount,
  selectedMount,
}) => {
  const date = new Date();

  let workDay;

  if (
    moment(selectedMount).format('YYYYMM') !=
    moment(selectedDay).format('YYYYMM')
  ) {
    return <></>;
  }
  if (listMonth) {
    workDay = listMonth.listWorks.find(el => {
      return el.id == moment(selectedDay).format('YYYYMMDD');
    });
  }

  // const [workDay, setworkDay] = useState(null);
  // useEffect(() => {
  //   queryWorkDayId(Number(moment(selectedDay).format('YYYYMMDD'))).then(
  //     result => {

  //       setworkDay(result);
  //     },
  //   );
  // }, [listMonth, selectedDay]);

  // console.log(workDay);

  return (
    <>
      <View style={styles.view}>
        <Text style={styles.text}>
          {moment(selectedDay).calendar(calendarSetting)}
        </Text>

        {workDay ? (
          <SelectedWorkDay
            workDay={workDay}
            queryMount={queryMount}
            selectedDay={selectedDay}
          />
        ) : (
          <RecordMissing selectedDay={selectedDay} queryMount={queryMount} />
        )}
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  view: {
    backgroundColor: styleFile.window.backgroundColor,
  },
  text: {
    fontSize: 15,
    textAlign: 'center',
    color: styleFile.text.color,
    borderColor: styleFile.border.borderColor,
    borderBottomWidth: 1,
    padding: 10,
  },
});
