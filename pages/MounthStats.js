import React, {useState} from 'react';
import {View, StyleSheet, Text, TextInput, ScrollView} from 'react-native';
import styleFile from './style';
import {Table, TableWrapper, Col} from 'react-native-table-component';
import {useSelector, useDispatch} from 'react-redux';

export const MounthStats = ({route}) => {
  // Кол-во часов
  const [timeWorkSum, settimeWorkSum] = useState(route.params.timeWorkSum);
  // Тарифная ставка
  const tariffRate = useSelector(state => state.stats.tariffRate);
  // Премия
  const premium = useSelector(state => state.stats.premium);
  // Профессиональное масстерство
  const profMaster = useSelector(state => state.stats.profMaster);
  // Выслуга лет
  const workExperiens = useSelector(state => state.stats.workExperiens);
  // Аванс
  const prepaid = useSelector(state => state.stats.prepaid);
  //Подоходный налог
  const incomeTax = useSelector(state => state.stats.incomeTax);
  // Пенсионный фонд
  const pensionFund = useSelector(state => state.stats.pensionFund);
  // Профсоюзные взносы
  const unionDues = useSelector(state => state.stats.unionDues);
  const dispatch = useDispatch();

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
      (totalTimeWorkSum + totalPremium + totalProfMaster + totalWorkExperiens) *
        100,
    ) / 100;

  //Удержания
  // Подоходный налог
  const totalIncomeTax = Math.round((totalSumm / 100) * incomeTax * 100) / 100;
  // Пенсионный фонд
  const totalPensionFund =
    Math.round((totalSumm / 100) * pensionFund * 100) / 100;
  // Профсоюзные взносы
  const totalUnionDues = Math.round((totalSumm / 100) * unionDues * 100) / 100;
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
      (totalPrepaid + totalIncomeTax + totalPensionFund + totalUnionDues) * 100,
    ) / 100;
  // К выдаче
  const Wage = Math.round((totalSumm - totalWithheld) * 100) / 100;

  const Btn = (value, type, designations) => (
    <View style={styles.btn}>
      <TextInput
        style={[styles.textStyleTable, styles.btnColorText]}
        keyboardType="numeric"
        selectTextOnFocus={true}
        onEndEditing={({nativeEvent: {text}}) => {
          // console.log(number);
          if (type == 'UPPDATE_TIMEWORKSUM') {
            settimeWorkSum(Number(text.replace(/,/, '.')));
          }
          dispatch({
            type: type,
            payload: {value: Number(text.replace(/,/, '.'))},
          });
        }}
        defaultValue={`${value}`}
        placeholder={`${designations}`}
      />
    </View>
  );

  return (
    <View style={styles.view}>
      <View>
        <View style={styles.container}>
          <ScrollView keyboardDismissMode={'on-drag'}>
            <Text style={styles.textTitle}>{route.params.nameMounth}</Text>
            <View style={{alignItems: 'center'}}>
              <Table
                style={{width: '100%'}}
                borderStyle={{
                  borderWidth: 1,
                  borderColor: styleFile.border.borderColor,
                }}>
                {/* Начисления */}
                <TableWrapper style={styles.tableWrapper}>
                  <Col
                    textStyle={styles.textStyleTable}
                    style={{flexGrow: 1}}
                    data={['Начисления']}
                  />
                </TableWrapper>
                {/* Оклад */}
                <TableWrapper style={styles.tableWrapper}>
                  <Col
                    textStyle={styles.textStyleTable}
                    style={{flexGrow: 1}}
                    data={['Оклад, руб.']}
                  />
                  <Col
                    textStyle={styles.textStyleTable}
                    style={{flexGrow: 1}}
                    data={[Btn(tariffRate, 'UPPDATE_TARIFFRATE', 'час.')]}
                  />
                </TableWrapper>
                {/* Оплата по тарифу */}
                <TableWrapper style={styles.tableWrapper}>
                  <Col
                    textStyle={styles.textStyleTable}
                    style={{flexGrow: 3}}
                    data={['Оплата по тарифу, ч.']}
                  />
                  <Col
                    textStyle={styles.textStyleTable}
                    style={{flexGrow: 1}}
                    data={[Btn(timeWorkSum, 'UPPDATE_TIMEWORKSUM', 'час.')]}
                  />
                  <Col
                    textStyle={styles.textStyleTable}
                    style={{flexGrow: 2}}
                    data={[`${totalTimeWorkSum} р.`]}
                  />
                </TableWrapper>
                {/* Премия */}
                <TableWrapper style={styles.tableWrapper}>
                  <Col
                    textStyle={styles.textStyleTable}
                    style={{flexGrow: 3}}
                    data={['Премия, %']}
                  />
                  <Col
                    textStyle={styles.textStyleTable}
                    style={{flexGrow: 1}}
                    data={[Btn(premium, 'UPPDATE_PREMIUM', '%')]}
                  />
                  <Col
                    textStyle={styles.textStyleTable}
                    style={{flexGrow: 2}}
                    data={[`${totalPremium} р.`]}
                  />
                </TableWrapper>
                {/* Проф. мастерство */}
                <TableWrapper style={styles.tableWrapper}>
                  <Col
                    textStyle={styles.textStyleTable}
                    style={{flexGrow: 3}}
                    data={['Проф. мастерство, %']}
                  />
                  <Col
                    textStyle={styles.textStyleTable}
                    style={{flexGrow: 1}}
                    data={[Btn(profMaster, 'UPPDATE_PROFMASTER', '%')]}
                  />
                  <Col
                    textStyle={styles.textStyleTable}
                    style={{flexGrow: 2}}
                    data={[`${totalProfMaster} р.`]}
                  />
                </TableWrapper>
                {/* Выслуга лет */}
                <TableWrapper style={styles.tableWrapper}>
                  <Col
                    textStyle={styles.textStyleTable}
                    style={{flexGrow: 3}}
                    data={['Выслуга лет, %']}
                  />
                  <Col
                    textStyle={styles.textStyleTable}
                    style={{flexGrow: 1}}
                    data={[Btn(workExperiens, 'UPPDATE_WORKEXPERIENS', '%')]}
                  />
                  <Col
                    textStyle={styles.textStyleTable}
                    style={{flexGrow: 2}}
                    data={[`${totalWorkExperiens} р.`]}
                  />
                </TableWrapper>
                {/* Итого начислено */}
                <TableWrapper style={styles.tableWrapper}>
                  <Col
                    textStyle={styles.textStyleTable}
                    style={{flexGrow: 1}}
                    data={['Итого начислено']}
                  />
                  <Col
                    textStyle={styles.textStyleTable}
                    style={{flexGrow: 1}}
                    data={[`${totalSumm} р.`]}
                  />
                </TableWrapper>
                {/* Удержания */}
                <TableWrapper style={styles.tableWrapper}>
                  <Col
                    textStyle={styles.textStyleTable}
                    style={{flexGrow: 1}}
                    data={['Удержания']}
                  />
                </TableWrapper>
                {/* Аванс */}
                <TableWrapper style={styles.tableWrapper}>
                  <Col
                    textStyle={styles.textStyleTable}
                    style={{flexGrow: 3}}
                    data={['Аванс, руб.']}
                  />
                  <Col
                    textStyle={styles.textStyleTable}
                    style={{flexGrow: 1}}
                    data={[Btn(prepaid, 'UPPDATE_PREPAID', 'руб')]}
                  />
                  <Col
                    textStyle={styles.textStyleTable}
                    style={{flexGrow: 2}}
                    data={[`${totalPrepaid} р.`]}
                  />
                </TableWrapper>
                {/* Подоходный */}
                <TableWrapper style={styles.tableWrapper}>
                  <Col
                    textStyle={styles.textStyleTable}
                    style={{flexGrow: 3}}
                    data={['Подоходный, %']}
                  />
                  <Col
                    textStyle={styles.textStyleTable}
                    style={{flexGrow: 1}}
                    data={[Btn(incomeTax, 'UPPDATE_INCOMETAX', '%')]}
                  />
                  <Col
                    textStyle={styles.textStyleTable}
                    style={{flexGrow: 2}}
                    data={[`${totalIncomeTax} р.`]}
                  />
                </TableWrapper>
                {/* Пенсионный */}
                <TableWrapper style={styles.tableWrapper}>
                  <Col
                    textStyle={styles.textStyleTable}
                    style={{flexGrow: 3}}
                    data={['Пенсионный, %']}
                  />
                  <Col
                    textStyle={styles.textStyleTable}
                    style={{flexGrow: 1}}
                    data={[Btn(pensionFund, 'UPPDATE_PENSIONFUND', '%')]}
                  />
                  <Col
                    textStyle={styles.textStyleTable}
                    style={{flexGrow: 2}}
                    data={[`${totalPensionFund} р.`]}
                  />
                </TableWrapper>
                {/* Профсоюз */}
                <TableWrapper style={styles.tableWrapper}>
                  <Col
                    textStyle={styles.textStyleTable}
                    style={{flexGrow: 3}}
                    data={['Профсоюз, %']}
                  />
                  <Col
                    textStyle={styles.textStyleTable}
                    style={{flexGrow: 1}}
                    data={[Btn(unionDues, 'UPPDATE_UNIONDUES', '%')]}
                  />
                  <Col
                    textStyle={styles.textStyleTable}
                    style={{flexGrow: 2}}
                    data={[`${totalUnionDues} р.`]}
                  />
                </TableWrapper>
                {/* Итого удержано */}
                <TableWrapper style={styles.tableWrapper}>
                  <Col
                    textStyle={styles.textStyleTable}
                    style={{flexGrow: 1}}
                    data={['Итого удержано']}
                  />
                  <Col
                    textStyle={styles.textStyleTable}
                    style={{flexGrow: 1}}
                    data={[`${totalWithheld} р.`]}
                  />
                </TableWrapper>
                {/* К выдаче */}
                <TableWrapper style={styles.tableWrapper}>
                  <Col
                    textStyle={styles.textStyleTable}
                    style={{flexGrow: 1}}
                    data={['К выдаче']}
                  />
                  <Col
                    textStyle={styles.textStyleTable}
                    style={{flexGrow: 1}}
                    data={[`${Wage} р.`]}
                  />
                </TableWrapper>
              </Table>
            </View>
          </ScrollView>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  view: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: styleFile.view.backgroundColor,
  },
  container: {
    padding: '3%',
    margin: '3%',
    backgroundColor: styleFile.window.backgroundColor,
    borderRadius: 15,
  },
  textTitle: {
    color: styleFile.text.color,
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
    margin: 5,
    marginBottom: 12,
  },
  tableWrapper: {
    flexDirection: 'row',
  },
  textStyleTable: {
    textAlign: 'center',
    padding: 5,
    color: styleFile.text.color,
    fontSize: 16,
  },
  btnColorText: {
    color: styleFile.tab.colorActive,
  },
  btn: {
    width: '100%',
    height: '100%',
    backgroundColor: styleFile.button.backgroundColor, //'#78B7BB',
    justifyContent: 'center',
  },
});
