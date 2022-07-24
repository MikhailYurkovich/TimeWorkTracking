import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet, TouchableHighlight} from 'react-native';
import styleFile from '../style';
import Icon from 'react-native-vector-icons/AntDesign';

export const MonthStats = ({listMonth, navigation}) => {
  const [timeWork, settimeWork] = useState(null);
  const [wage, setwage] = useState(null);

  const calculateWage = sum => {
    // console.log(sum);
    // Кол-во часов
    const timeWorkSum = sum;
    // Тарифная ставка
    const tariffRate = 4.16; //useSelector(state => state.stats.tariffRate);
    // Премия
    const premium = 45; //useSelector(state => state.stats.premium);
    // Профессиональное масстерство
    const profMaster = 16; // useSelector(state => state.stats.profMaster);
    // Выслуга лет
    const workExperiens = 15; // useSelector(state => state.stats.workExperiens);
    // Аванс
    const prepaid = 400; //useSelector(state => state.stats.prepaid);
    //Подоходный налог
    const incomeTax = 13; // useSelector(state => state.stats.incomeTax);
    // Пенсионный фонд
    const pensionFund = 1; //useSelector(state => state.stats.pensionFund);
    // Профсоюзные взносы
    const unionDues = 1; //useSelector(state => state.stats.unionDues);
    // const dispatch = useDispatch();

    //Оплата по тарифу
    const totalTimeWorkSum = Math.round(timeWorkSum * tariffRate * 100) / 100;
    // Премия
    const totalPremium =
      Math.round((totalTimeWorkSum / 100) * premium * 100) / 100;
    // Профессиональное масстерство
    const totalProfMaster =
      Math.round((totalTimeWorkSum / 100) * profMaster * 100) / 100;
    // Выслуга лет
    const totalWorkExperiens =
      Math.round((totalTimeWorkSum / 100) * workExperiens * 100) / 100;
    // Итого начислено
    const totalSumm =
      Math.round(
        (totalTimeWorkSum +
          totalPremium +
          totalProfMaster +
          totalWorkExperiens) *
          100,
      ) / 100;

    //Удержания
    // Подоходный налог
    const totalIncomeTax =
      Math.round((totalSumm / 100) * incomeTax * 100) / 100;
    // Пенсионный фонд
    const totalPensionFund =
      Math.round((totalSumm / 100) * pensionFund * 100) / 100;
    // Профсоюзные взносы
    const totalUnionDues =
      Math.round((totalSumm / 100) * unionDues * 100) / 100;
    // Аванс
    let totalPrepaid;
    if (
      totalSumm <
      prepaid + totalIncomeTax + totalPensionFund + totalUnionDues
    ) {
      totalPrepaid = 0;
    } else {
      totalPrepaid = Math.round(prepaid * 100) / 100;
    }
    // Удержано
    const totalWithheld =
      Math.round(
        (totalPrepaid + totalIncomeTax + totalPensionFund + totalUnionDues) *
          100,
      ) / 100;
    // К выдаче
    const Wage = Math.round((totalSumm - totalWithheld) * 100) / 100;

    // const wage = Math.round(sum * 6.22 * Math.pow(10, 2)) / Math.pow(10, 2);
    setwage(Wage + totalPrepaid);
  };
  const timeWorkSum = listMonth => {
    let sum = 0;
    if (listMonth) {
      for (let i = 0; i < listMonth.listWorks.length; i++) {
        sum += listMonth.listWorks[i].timeWork;
      }
    }
    settimeWork(sum);
    calculateWage(sum);
  };

  useEffect(() => {
    timeWorkSum(listMonth);
  }, [listMonth]);

  return (
    <TouchableHighlight
      activeOpacity={styleFile.button.activeOpacity}
      underlayColor={styleFile.button.underlayColor}
      onPress={() => navigation.navigate('Stats')}>
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
        <Text style={styles.text}>{`Зп: ${wage} р.`}</Text>
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
