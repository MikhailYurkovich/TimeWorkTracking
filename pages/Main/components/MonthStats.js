import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet, Platform} from 'react-native';
import styleFile from '../../style';
import {useSelector} from 'react-redux';

export const MonthStats = ({listMonth, navigation}) => {
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
    <View style={[styles.view, styles.textWrap]}>
      <Text style={styles.text}>{`Итого: ${timeWork} ч.`}</Text>
      <Text style={styles.text}>{`Зп: ${salary} р.`}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
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
