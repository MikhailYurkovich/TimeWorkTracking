import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet, TouchableHighlight} from 'react-native';
import styleFile from '../style';
import Icon from 'react-native-vector-icons/AntDesign';
import {CalculateState} from '../scripts/calculateState';
import {useSelector} from 'react-redux';

export const MonthStats = ({listMonth, navigation}) => {
  const [timeWork, settimeWork] = useState(null);
  const stateStats = useSelector(state => state.stats);

  const timeWorkSum = listMonth => {
    let sum = 0;
    if (listMonth) {
      for (let i = 0; i < listMonth.listWorks.length; i++) {
        sum += listMonth.listWorks[i].timeWork;
      }
    }
    settimeWork(sum);
    // calculateWage(sum);
  };

  const salary = new CalculateState(timeWork, stateStats);

  useEffect(() => {
    timeWorkSum(listMonth);
  }, [listMonth]);

  return (
    <TouchableHighlight
      activeOpacity={styleFile.button.activeOpacity}
      underlayColor={styleFile.button.underlayColor}
      onPress={() => navigation.navigate('Stats', {timeWork})}>
      <View style={[styles.view, styles.textWrap]}>
        <Text style={styles.text}>{`Итого: ${timeWork} ч.`}</Text>

        <Text style={styles.text}>
          <Icon
            name={'barchart'}
            style={{
              color: styleFile.button.activeOpacity,
              fontSize: 23,
              fontWeight: 'bold',
              // marginRight: 16,
            }}
          />
        </Text>
        <Text
          style={styles.text}>{`Зп: ${salary.fullSettlement.salary} р.`}</Text>
      </View>
    </TouchableHighlight>
  );
};

const styles = StyleSheet.create({
  view: {
    backgroundColor: styleFile.window.backgroundColor,
  },
  textWrap: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderColor: styleFile.border.borderColor,
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  text: {
    color: styleFile.text.color,
    fontSize: 15,
  },
});
