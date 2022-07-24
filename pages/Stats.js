import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet, TouchableHighlight} from 'react-native';
// import styleFile from '../style';
import Icon from 'react-native-vector-icons/AntDesign';

const Stats = ({route}) => {
  console.log(route);
  return (
    <>
      <Text>xfgdsf</Text>
    </>
  );
  //   return (
  //     <View style={styles.view}>
  //       <View>
  //         <View style={styles.container}>
  //           <ScrollView keyboardDismissMode={'on-drag'}>
  //             <Text style={styles.textTitle}>{route.params.nameMounth}</Text>
  //             <View style={{alignItems: 'center'}}>
  //               <Table
  //                 style={{width: '100%'}}
  //                 borderStyle={{
  //                   borderWidth: 1,
  //                   borderColor: styleFile.border.borderColor,
  //                 }}>
  //                 {/* Начисления */}
  //                 <TableWrapper style={styles.tableWrapper}>
  //                   <Col
  //                     textStyle={styles.textStyleTable}
  //                     style={{flexGrow: 1}}
  //                     data={['Начисления']}
  //                   />
  //                 </TableWrapper>
  //                 {/* Оклад */}
  //                 <TableWrapper style={styles.tableWrapper}>
  //                   <Col
  //                     textStyle={styles.textStyleTable}
  //                     style={{flexGrow: 1}}
  //                     data={['Оклад, руб.']}
  //                   />
  //                   <Col
  //                     textStyle={styles.textStyleTable}
  //                     style={{flexGrow: 1}}
  //                     data={[Btn(tariffRate, 'UPPDATE_TARIFFRATE', 'час.')]}
  //                   />
  //                 </TableWrapper>
  //                 {/* Оплата по тарифу */}
  //                 <TableWrapper style={styles.tableWrapper}>
  //                   <Col
  //                     textStyle={styles.textStyleTable}
  //                     style={{flexGrow: 3}}
  //                     data={['Оплата по тарифу, ч.']}
  //                   />
  //                   <Col
  //                     textStyle={styles.textStyleTable}
  //                     style={{flexGrow: 1}}
  //                     data={[Btn(timeWorkSum, 'UPPDATE_TIMEWORKSUM', 'час.')]}
  //                   />
  //                   <Col
  //                     textStyle={styles.textStyleTable}
  //                     style={{flexGrow: 2}}
  //                     data={[`${totalTimeWorkSum} р.`]}
  //                   />
  //                 </TableWrapper>
  //                 {/* Премия */}
  //                 <TableWrapper style={styles.tableWrapper}>
  //                   <Col
  //                     textStyle={styles.textStyleTable}
  //                     style={{flexGrow: 3}}
  //                     data={['Премия, %']}
  //                   />
  //                   <Col
  //                     textStyle={styles.textStyleTable}
  //                     style={{flexGrow: 1}}
  //                     data={[Btn(premium, 'UPPDATE_PREMIUM', '%')]}
  //                   />
  //                   <Col
  //                     textStyle={styles.textStyleTable}
  //                     style={{flexGrow: 2}}
  //                     data={[`${totalPremium} р.`]}
  //                   />
  //                 </TableWrapper>
  //                 {/* Проф. мастерство */}
  //                 <TableWrapper style={styles.tableWrapper}>
  //                   <Col
  //                     textStyle={styles.textStyleTable}
  //                     style={{flexGrow: 3}}
  //                     data={['Проф. мастерство, %']}
  //                   />
  //                   <Col
  //                     textStyle={styles.textStyleTable}
  //                     style={{flexGrow: 1}}
  //                     data={[Btn(profMaster, 'UPPDATE_PROFMASTER', '%')]}
  //                   />
  //                   <Col
  //                     textStyle={styles.textStyleTable}
  //                     style={{flexGrow: 2}}
  //                     data={[`${totalProfMaster} р.`]}
  //                   />
  //                 </TableWrapper>
  //                 {/* Выслуга лет */}
  //                 <TableWrapper style={styles.tableWrapper}>
  //                   <Col
  //                     textStyle={styles.textStyleTable}
  //                     style={{flexGrow: 3}}
  //                     data={['Выслуга лет, %']}
  //                   />
  //                   <Col
  //                     textStyle={styles.textStyleTable}
  //                     style={{flexGrow: 1}}
  //                     data={[Btn(workExperiens, 'UPPDATE_WORKEXPERIENS', '%')]}
  //                   />
  //                   <Col
  //                     textStyle={styles.textStyleTable}
  //                     style={{flexGrow: 2}}
  //                     data={[`${totalWorkExperiens} р.`]}
  //                   />
  //                 </TableWrapper>
  //                 {/* Итого начислено */}
  //                 <TableWrapper style={styles.tableWrapper}>
  //                   <Col
  //                     textStyle={styles.textStyleTable}
  //                     style={{flexGrow: 1}}
  //                     data={['Итого начислено']}
  //                   />
  //                   <Col
  //                     textStyle={styles.textStyleTable}
  //                     style={{flexGrow: 1}}
  //                     data={[`${totalSumm} р.`]}
  //                   />
  //                 </TableWrapper>
  //                 {/* Удержания */}
  //                 <TableWrapper style={styles.tableWrapper}>
  //                   <Col
  //                     textStyle={styles.textStyleTable}
  //                     style={{flexGrow: 1}}
  //                     data={['Удержания']}
  //                   />
  //                 </TableWrapper>
  //                 {/* Аванс */}
  //                 <TableWrapper style={styles.tableWrapper}>
  //                   <Col
  //                     textStyle={styles.textStyleTable}
  //                     style={{flexGrow: 3}}
  //                     data={['Аванс, руб.']}
  //                   />
  //                   <Col
  //                     textStyle={styles.textStyleTable}
  //                     style={{flexGrow: 1}}
  //                     data={[Btn(prepaid, 'UPPDATE_PREPAID', 'руб')]}
  //                   />
  //                   <Col
  //                     textStyle={styles.textStyleTable}
  //                     style={{flexGrow: 2}}
  //                     data={[`${totalPrepaid} р.`]}
  //                   />
  //                 </TableWrapper>
  //                 {/* Подоходный */}
  //                 <TableWrapper style={styles.tableWrapper}>
  //                   <Col
  //                     textStyle={styles.textStyleTable}
  //                     style={{flexGrow: 3}}
  //                     data={['Подоходный, %']}
  //                   />
  //                   <Col
  //                     textStyle={styles.textStyleTable}
  //                     style={{flexGrow: 1}}
  //                     data={[Btn(incomeTax, 'UPPDATE_INCOMETAX', '%')]}
  //                   />
  //                   <Col
  //                     textStyle={styles.textStyleTable}
  //                     style={{flexGrow: 2}}
  //                     data={[`${totalIncomeTax} р.`]}
  //                   />
  //                 </TableWrapper>
  //                 {/* Пенсионный */}
  //                 <TableWrapper style={styles.tableWrapper}>
  //                   <Col
  //                     textStyle={styles.textStyleTable}
  //                     style={{flexGrow: 3}}
  //                     data={['Пенсионный, %']}
  //                   />
  //                   <Col
  //                     textStyle={styles.textStyleTable}
  //                     style={{flexGrow: 1}}
  //                     data={[Btn(pensionFund, 'UPPDATE_PENSIONFUND', '%')]}
  //                   />
  //                   <Col
  //                     textStyle={styles.textStyleTable}
  //                     style={{flexGrow: 2}}
  //                     data={[`${totalPensionFund} р.`]}
  //                   />
  //                 </TableWrapper>
  //                 {/* Профсоюз */}
  //                 <TableWrapper style={styles.tableWrapper}>
  //                   <Col
  //                     textStyle={styles.textStyleTable}
  //                     style={{flexGrow: 3}}
  //                     data={['Профсоюз, %']}
  //                   />
  //                   <Col
  //                     textStyle={styles.textStyleTable}
  //                     style={{flexGrow: 1}}
  //                     data={[Btn(unionDues, 'UPPDATE_UNIONDUES', '%')]}
  //                   />
  //                   <Col
  //                     textStyle={styles.textStyleTable}
  //                     style={{flexGrow: 2}}
  //                     data={[`${totalUnionDues} р.`]}
  //                   />
  //                 </TableWrapper>
  //                 {/* Итого удержано */}
  //                 <TableWrapper style={styles.tableWrapper}>
  //                   <Col
  //                     textStyle={styles.textStyleTable}
  //                     style={{flexGrow: 1}}
  //                     data={['Итого удержано']}
  //                   />
  //                   <Col
  //                     textStyle={styles.textStyleTable}
  //                     style={{flexGrow: 1}}
  //                     data={[`${totalWithheld} р.`]}
  //                   />
  //                 </TableWrapper>
  //                 {/* К выдаче */}
  //                 <TableWrapper style={styles.tableWrapper}>
  //                   <Col
  //                     textStyle={styles.textStyleTable}
  //                     style={{flexGrow: 1}}
  //                     data={['К выдаче']}
  //                   />
  //                   <Col
  //                     textStyle={styles.textStyleTable}
  //                     style={{flexGrow: 1}}
  //                     data={[`${Wage} р.`]}
  //                   />
  //                 </TableWrapper>
  //               </Table>
  //             </View>
  //           </ScrollView>
  //         </View>
  //       </View>
  //     </View>
  //   );
};
export default Stats;
