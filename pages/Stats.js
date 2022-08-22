import React, {useState, useEffect} from 'react';
import {View, Text, StyleSheet, ScrollView, TextInput} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import styleFile from './style';
import {Table, TableWrapper, Col, Row} from 'react-native-table-component';
import {useDispatch, useSelector} from 'react-redux';
import {CalculateState} from './scripts/calculateState';
import {queryListMonth_ListWork_id} from '../database/allSchemas';
import moment from 'moment';

const Stats = ({route, navigation}) => {
  const listMonth = useSelector(state => state.listMonth);
  if (!listMonth) {
    return <></>;
  }

  const tableHead = [
    'Дата',
    'Часы работы',
    'Часов',
    'Перерыв',
    'Ставка, р.',
    'Доход, р.',
  ];

  const widthArr = [85, 120, 80, 80, 85, 80];

  return (
    <View style={styles.container}>
      <ScrollView horizontal={true}>
        <View>
          <Table borderStyle={{borderWidth: 1, borderColor: '#C1C0B9'}}>
            <Row
              data={tableHead}
              widthArr={widthArr}
              // style={{height: 50, backgroundColor: }}
              textStyle={styles.textStyleTable}
            />
          </Table>

          <ScrollView style={{marginTop: -1}}>
            <Table borderStyle={{borderWidth: 1, borderColor: '#C1C0B9'}}>
              {listMonth.listWorks.map((item, i) => {
                return (
                  <Row
                    data={[
                      moment(item.timeStart).format('DD/MM/YY'),
                      `${moment(item.timeStart).format('HH:mm')} - ${moment(
                        item.timeEnd,
                      ).format('HH:mm')}`,
                      moment(new Date())
                        .hour(0)
                        .minute(item.timeWork)
                        .format('H ч. m м.'),
                      moment(new Date())
                        .hour(0)
                        .minute(item.timeDinner)
                        .format('H ч. m м.'),
                      item.salarySettings.tarifRate,
                      item.salarySettings.tarifRate * (item.timeWork / 60),
                    ]}
                    widthArr={widthArr}
                    textStyle={styles.textStyleTable}
                  />
                );
              })}
            </Table>
          </ScrollView>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  // view: {
  //   flex: 1,
  //   justifyContent: 'center',
  //   backgroundColor: styleFile.view.backgroundColor,
  // },
  container: {
    flex: 1,
    padding: '2%',
    // padding: 16,
    // paddingTop: 30,
    backgroundColor: styleFile.window.backgroundColor,
    // backgroundColor: '#fff',
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
});

export default Stats;
