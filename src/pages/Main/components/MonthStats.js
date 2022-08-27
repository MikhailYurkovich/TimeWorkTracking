import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableHighlight,
  Platform,
} from 'react-native';
import styleFile from '../../style';
import Icon from 'react-native-vector-icons/AntDesign';

export const MonthStats = ({listMonth, navigation, selectedMount}) => {
  const [timeWork, settimeWork] = useState(NaN);
  const [salary, setsalary] = useState(NaN);

  const timeWorkSum = listMonth => {
    let sum = 0;
    let sumSalary = 0;

    if (listMonth) {
      for (let i = 0; i < listMonth.listWorks.length; i++) {
        sum += listMonth.listWorks[i].timeWork;
        sumSalary +=
          (listMonth.listWorks[i].timeWork / 60) *
          listMonth.listWorks[i].salarySettings.tarifRate;
      }
    }

    setsalary(Math.round(sumSalary * Math.pow(10, 2)) / Math.pow(10, 2));
    settimeWork(sum / 60);
  };

  useEffect(() => {
    timeWorkSum(listMonth);
  }, [listMonth]);

  /* <View style={styles.banner}>
            <BannerAd size={BannerAdSize.BANNER} unitId={adUnitId} />
          </View> */

  return (
    <TouchableHighlight
      underlayColor={styleFile.button.underlayColor}
      activeOpacity={styleFile.button.activeOpacity}
      onPress={() =>
        navigation.navigate('Stats', {
          selectedMount: selectedMount,
        })
      }>
      <View style={styles.wrap}>
        <View style={[styles.textWrap]}>
          <Text style={[styles.text]}>{`Итого: ${timeWork} ч.`}</Text>
          <Text style={styles.text}>{`Заработная плата: ${salary} р.`}</Text>
        </View>
        <Icon name={'table'} style={styles.icon} />
      </View>
    </TouchableHighlight>
  );
};

const styles = StyleSheet.create({
  wrap: {
    flexDirection: 'row',
    marginHorizontal: 15,
    paddingBottom: Platform.OS === 'ios' ? 20 : 0,
  },
  textWrap: {
    flex: 3,
    paddingVertical: 10,
  },
  text: {
    color: styleFile.text.color,
    fontSize: 15,
  },
  icon: {
    fontSize: 26,
    fontWeight: 'bold',
    flex: 1,
    alignSelf: 'center',
    textAlign: 'right',
    color: styleFile.text.color,
  },
});
