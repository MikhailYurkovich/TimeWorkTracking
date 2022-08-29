import React, {useEffect} from 'react';
import {View, StyleSheet, ScrollView, Dimensions} from 'react-native';
import styleFile from '../style';
import moment from 'moment/min/moment-with-locales';
import {useSelector, useDispatch} from 'react-redux';
import {CalendarPicker} from './components/Calendar';
import {SelectedDay} from './components/SelectedDay';
import {MonthStats} from './components/MonthStats';
import {querySettings, queryListMonth} from '../../database/allSchemas';
import {BannerAd, BannerAdSize, TestIds} from 'react-native-google-mobile-ads';

const Main = ({navigation}) => {
  const listMonth = useSelector(state => state.listMonth);
  const selectedMount = useSelector(state => state.selectedMount);
  const dispatch = useDispatch();

  const adUnitId = __DEV__
    ? TestIds.BANNER
    : 'ca-app-pub-8017817006445043/6458654762';

  useEffect(() => {
    querySettings(dispatch);
    queryListMonth(dispatch, Number(moment(selectedMount).format('YYYYMM')));
  }, [selectedMount]);
  return (
    <ScrollView
      alwaysBounceVertical={false}
      contentContainerStyle={styles.view}>
      <View style={styles.calendarPickerWrap}>
        <CalendarPicker listMonth={listMonth} />
      </View>
      <View style={styles.selectedDayWrap}>
        <SelectedDay listMonth={listMonth} />
      </View>
      <View style={styles.monthStatsWrap}>
        <View style={styles.banner}>
          <BannerAd size={BannerAdSize.BANNER} unitId={adUnitId} />
        </View>
        <MonthStats
          listMonth={listMonth}
          selectedMount={selectedMount}
          navigation={navigation}
        />
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
    flexGrow: 0,
    flexShrink: 0,
    flexBasis: 'auto',
    marginBottom: 10,
  },
  selectedDayWrap: {
    flexGrow: 1,
    flexShrink: 0,
    flexBasis: 'auto',
  },
  banner: {
    alignItems: 'center',
    marginVertical: 5,
  },
  monthStatsWrap: {
    flexGrow: 0,
    flexShrink: 0,
    flexBasis: 'auto',
  },
});

export default Main;
