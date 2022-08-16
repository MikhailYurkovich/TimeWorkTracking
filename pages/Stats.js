import React, {useState} from 'react';
import {View, Text, StyleSheet, ScrollView, TextInput} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import styleFile from './style';
import {Table, TableWrapper, Col} from 'react-native-table-component';
import {useDispatch, useSelector} from 'react-redux';
import {CalculateState} from './scripts/calculateState';

const Stats = ({route}) => {
  const [timeWork, settimeWork] = useState(route.params.timeWork);
  const stateStats = useSelector(state => state.stats);
  const salary = new CalculateState(timeWork, stateStats);
  const dispatch = useDispatch();

  const Btn = (value, type, designations) => (
    <View style={styles.btn}>
      <TextInput
        style={[styles.textStyleTable, styles.btnColorText]}
        keyboardType="numeric"
        selectTextOnFocus={true}
        onEndEditing={({nativeEvent: {text}}) => {
          if (type == 'UPPDATE_TIMEWORKSUM') {
            settimeWork(Number(text.replace(/,/, '.')));
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
    <SafeAreaView style={styles.view}>
      <View>
        <View style={styles.container}>
          <ScrollView keyboardDismissMode={'on-drag'}>
            <Text style={styles.textTitle}></Text>
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
                    data={[
                      Btn(salary.tariffRate, 'UPPDATE_TARIFFRATE', 'час.'),
                    ]}
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
                    data={[
                      Btn(salary.timeWorkSum, 'UPPDATE_TIMEWORKSUM', 'час.'),
                    ]}
                  />
                  <Col
                    textStyle={styles.textStyleTable}
                    style={{flexGrow: 2}}
                    data={[`${salary.fullSettlement.totalTimeWorkSum} р.`]}
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
                    data={[Btn(salary.premium, 'UPPDATE_PREMIUM', '%')]}
                  />
                  <Col
                    textStyle={styles.textStyleTable}
                    style={{flexGrow: 2}}
                    data={[`${salary.fullSettlement.totalPremium} р.`]}
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
                    data={[Btn(salary.profMaster, 'UPPDATE_PROFMASTER', '%')]}
                  />
                  <Col
                    textStyle={styles.textStyleTable}
                    style={{flexGrow: 2}}
                    data={[`${salary.fullSettlement.totalProfMaster} р.`]}
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
                    data={[
                      Btn(salary.workExperiens, 'UPPDATE_WORKEXPERIENS', '%'),
                    ]}
                  />
                  <Col
                    textStyle={styles.textStyleTable}
                    style={{flexGrow: 2}}
                    data={[`${salary.fullSettlement.totalWorkExperiens} р.`]}
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
                    data={[`${salary.fullSettlement.totalSumm} р.`]}
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
                    data={[Btn(salary.prepaid, 'UPPDATE_PREPAID', 'руб')]}
                  />
                  <Col
                    textStyle={styles.textStyleTable}
                    style={{flexGrow: 2}}
                    data={[`${salary.fullSettlement.totalPrepaid} р.`]}
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
                    data={[Btn(salary.incomeTax, 'UPPDATE_INCOMETAX', '%')]}
                  />
                  <Col
                    textStyle={styles.textStyleTable}
                    style={{flexGrow: 2}}
                    data={[`${salary.fullSettlement.totalIncomeTax} р.`]}
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
                    data={[Btn(salary.pensionFund, 'UPPDATE_PENSIONFUND', '%')]}
                  />
                  <Col
                    textStyle={styles.textStyleTable}
                    style={{flexGrow: 2}}
                    data={[`${salary.fullSettlement.totalPensionFund} р.`]}
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
                    data={[Btn(salary.unionDues, 'UPPDATE_UNIONDUES', '%')]}
                  />
                  <Col
                    textStyle={styles.textStyleTable}
                    style={{flexGrow: 2}}
                    data={[`${salary.fullSettlement.totalUnionDues} р.`]}
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
                    data={[`${salary.fullSettlement.totalWithheld} р.`]}
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
                    data={[`${salary.fullSettlement.wage} р.`]}
                  />
                </TableWrapper>
              </Table>
            </View>
          </ScrollView>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  view: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: styleFile.view.backgroundColor,
  },
  container: {
    padding: '2%',
    backgroundColor: styleFile.window.backgroundColor,
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

export default Stats;
