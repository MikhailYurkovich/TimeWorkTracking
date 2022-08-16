import React, {useState, useEffect} from 'react';
import {View, StyleSheet, ScrollView, Platform} from 'react-native';
import styleFile from '../style';
import moment from 'moment/min/moment-with-locales';
import {queryListMonth_ListWork_id} from '../../database/allSchemas';
import {CalendarPicker} from './components/Calendar';
import {SelectedDay} from './components/SelectedDay';
import {MonthStats} from './components/MonthStats';

const Main = ({navigation}) => {
  const [listMonth, setlistMonth] = useState(undefined);
  const [selectedDay, setselectedDay] = useState(
    moment(new Date()).format('YYYY-MM-DD'),
  );
  const [selectedMount, setselectedMount] = useState(
    moment(new Date()).format('YYYY-MM-DD'),
  );

  const queryMount = id => {
    queryListMonth_ListWork_id(id).then(result => {
      setlistMonth(result);
    });
  };

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      queryMount(Number(moment(selectedMount).format('YYYYMM')));
    });
    return unsubscribe;
  }, [navigation, selectedMount]);

  return (
    <ScrollView
      alwaysBounceVertical={false}
      contentContainerStyle={styles.view}>
      <View style={styles.calendarPickerWrap}>
        <CalendarPicker
          listMonth={listMonth}
          queryMount={queryMount}
          setselectedDay={setselectedDay}
          selectedDay={selectedDay}
          setselectedMount={setselectedMount}
        />
      </View>
      <View style={styles.selectedDayWrap}>
        <SelectedDay
          selectedDay={selectedDay}
          listMonth={listMonth}
          queryMount={queryMount}
          selectedMount={selectedMount}
        />
      </View>
      <View style={styles.monthStatsWrap}>
        <MonthStats listMonth={listMonth} navigation={navigation} />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  view: {
    backgroundColor: styleFile.view.backgroundColor,
    minHeight: '100%',
    margin: 0,
    flexDirection: 'column',
  },
  calendarPickerWrap: {
    marginBottom: 15,
    flexGrow: 0,
    flexShrink: 0,
    flexBasis: 'auto',
  },
  selectedDayWrap: {
    flexGrow: 1,
    flexShrink: 0,
    flexBasis: 'auto',
    marginBottom: 15,
  },
  monthStatsWrap: {
    flexGrow: 0,
    flexShrink: 0,
    flexBasis: 'auto',
    backgroundColor: styleFile.window.backgroundColor,
    paddingBottom: Platform.OS === 'ios' ? 20 : 0,
  },
});

export default Main;
