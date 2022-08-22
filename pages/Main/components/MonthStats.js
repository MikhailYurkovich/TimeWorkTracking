import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet, TouchableHighlight} from 'react-native';
import styleFile from '../../style';

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

  return (
    // <TouchableHighlight
    //   underlayColor={styleFile.button.underlayColor}
    //   activeOpacity={styleFile.button.activeOpacity}
    //   onPress={() =>
    //     navigation.navigate('Stats', {
    //       selectedMount: selectedMount,
    //     })
    //   }>
    <View style={[styles.view, styles.textWrap]}>
      <Text style={styles.text}>{`Итого: ${timeWork} ч.`}</Text>
      <Text style={styles.text}>{`Зп: ${salary} р.`}</Text>
    </View>
    // </TouchableHighlight>
  );
};

const styles = StyleSheet.create({
  view: {
    // backgroundColor: '#E3E3E1',
    // borderTopColor: '#E2E2E2',
    // borderTopWidth: 1,
  },
  textWrap: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  text: {
    color: styleFile.text.color,
    fontSize: 15,
  },
});
