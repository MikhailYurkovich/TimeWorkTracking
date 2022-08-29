import React from 'react';
import {View, Text, StyleSheet, ScrollView} from 'react-native';
import styleFile from '../style';
import {Table, TableWrapper, Cell} from 'react-native-table-component';
import {useSelector} from 'react-redux';
import moment from 'moment';

const Stats = ({navigation}) => {
  const listMonth = useSelector(state => state.listMonth);

  if (!listMonth) {
    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <Text style={[{fontSize: 22, color: styleFile.text.color}]}>
          Записи отсутсвуют
        </Text>
      </View>
    );
  }

  const widthArr = [95, 125, 100, 100, 100, 120];

  return (
    <View style={[styles.container]}>
      <ScrollView horizontal={true}>
        <View>
          <Table borderStyle={styles.borderStyle}>
            <TableWrapper style={styles.tableWrapper}>
              <Cell
                data={'Дата'}
                textStyle={styles.textTitle}
                width={widthArr[0]}
              />
              <Cell
                data={'Часы работы'}
                textStyle={styles.textTitle}
                width={widthArr[1]}
              />
              <Cell
                data={'Часов'}
                textStyle={styles.textTitle}
                width={widthArr[2]}
              />
              <Cell
                data={'Перерыв'}
                textStyle={styles.textTitle}
                width={widthArr[3]}
              />
              <Cell
                data={'Ставка'}
                textStyle={styles.textTitle}
                width={widthArr[4]}
              />
              <Cell
                data={'Доход'}
                textStyle={styles.textTitle}
                width={widthArr[5]}
              />
            </TableWrapper>
          </Table>

          <ScrollView style={{marginTop: -1}}>
            <Table borderStyle={styles.borderStyle}>
              {listMonth.listWorks.map((item, i) => {
                return (
                  <TableWrapper key={i} style={styles.tableWrapper}>
                    <Cell
                      data={moment(item.timeStart).format('DD/MM/YY')}
                      textStyle={styles.textStyleTable}
                      width={widthArr[0]}
                    />
                    <Cell
                      data={`${moment(item.timeStart).format(
                        'HH:mm',
                      )} - ${moment(item.timeEnd).format('HH:mm')}`}
                      textStyle={styles.textStyleTable}
                      width={widthArr[1]}
                    />
                    <Cell
                      data={moment(new Date())
                        .hour(0)
                        .minute(item.timeWork)
                        .format('H ч. m м.')}
                      textStyle={styles.textStyleTable}
                      width={widthArr[2]}
                    />
                    <Cell
                      data={moment(new Date())
                        .hour(0)
                        .minute(item.timeDinner)
                        .format('H ч. m м.')}
                      textStyle={styles.textStyleTable}
                      width={widthArr[3]}
                    />
                    <Cell
                      data={`${item.salarySettings.tarifRate} р.`}
                      textStyle={styles.textStyleTable}
                      width={widthArr[4]}
                    />
                    <Cell
                      data={`${
                        Math.round(
                          item.salarySettings.tarifRate *
                            (item.timeWork / 60) *
                            Math.pow(10, 2),
                        ) / Math.pow(10, 2)
                      } р.`}
                      textStyle={styles.textStyleTable}
                      width={widthArr[5]}
                    />
                  </TableWrapper>
                );
              })}
              <TableWrapper style={styles.tableWrapper}>
                <Cell
                  data={`Итого: ${
                    listMonth ? listMonth.fullTimeFullSalary.timeWork : 0
                  } ч.`}
                  textStyle={styles.textStyleTable}
                  width={320}
                />
                <Cell
                  data={`Заработная плата: ${
                    listMonth ? listMonth.fullTimeFullSalary.salary : 0
                  } р.`}
                  textStyle={styles.textStyleTable}
                  width={320}
                />
              </TableWrapper>
            </Table>
          </ScrollView>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: '2%',
    backgroundColor: styleFile.window.backgroundColor,
    alignItems: 'center',
  },
  borderStyle: {
    borderWidth: 1,
    borderColor: '#C1C0B9',
  },
  tableWrapper: {
    flexDirection: 'row',
  },
  textTitle: {
    color: styleFile.text.color,
    fontSize: styleFile.text.fontSize,
    fontWeight: 'bold',
    textAlign: 'center',
    margin: 5,
    marginBottom: 12,
  },
  textStyleTable: {
    textAlign: 'center',
    padding: 5,
    color: styleFile.text.color,
    fontSize: styleFile.text.fontSize,
  },
});

export default Stats;
