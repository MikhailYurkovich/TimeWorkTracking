import React, {useState, useEffect} from 'react';
import {View, StyleSheet, ScrollView} from 'react-native';
import styleFile from './style';
import moment from 'moment/min/moment-with-locales';
import {queryListMonth_ListWork_id} from '../database/allSchemas';
import {CalendarPicker} from './components/Calendar';
import {SelectedDay} from './components/SelectedDay';
import {MonthStats} from './components/MonthStats';

const Main = ({navigation}) => {
  const [listMonth, setlistMonth] = useState(null);
  const [selectedDay, setselectedDay] = useState(
    moment(new Date()).format('YYYY-MM-DD'),
  );
  const [selectedMount, setselectedMount] = useState(
    moment(new Date()).format('YYYY-MM-DD'),
  );

  // const date = ;
  // moment(new Date()).format('YYYY-MM-DD'),
  // );
  // const [modalWin, setmodalWin] = useState(false);

  // const DelMounth = id => {
  //   const newData = [...listMounth];
  //   const prevIndex = listMounth.findIndex(l => l.id == id);
  //   newData.splice(prevIndex, 1);
  //   setmodalWin({
  //     visible: true,
  //     textTitle: 'Удалить запись?',
  //     text: item.nameMounth,
  //     delFunc: () => {
  //       deleteMounthIdListId(item.id);
  //     },
  //     setlistMounth: () => {
  //       setlistMounth(newData);
  //     },
  //   });
  // };

  // const DelWorkDay = idDay => {
  //   let newListMounth = [...listMounth];
  //   let newListWorkDay = newListMounth.map((l, i) => {
  //     let ListWorkDay = [...l.listWorks];
  //     ListWorkDay.filter(idFil => {
  //       if (idFil.id === idDay) {
  //         const prevIndex = ListWorkDay.findIndex(l => l.id === idDay);
  //         ListWorkDay.splice(prevIndex, 1);
  //       }
  //     });
  //     //Клонироватть объект месяца
  //     let cloneNewListMounth = {};
  //     for (let key in l) {
  //       cloneNewListMounth[key] = l[key];
  //     }
  //     //Если список рабочих дней пуст, месяц сделать false
  //     if (ListWorkDay.length == 0) {
  //       return (ListWorkDay = false);
  //     }
  //     //Добавить массив рабочих дней в месяц
  //     cloneNewListMounth.listWorks = ListWorkDay;
  //     return cloneNewListMounth;
  //   });
  //   // очистить массив от пустых значений
  //   let cleanMounth = newListWorkDay.filter(l => {
  //     return l != false;
  //   });
  //   setmodalWin({
  //     visible: true,
  //     textTitle: 'Удалить запись?',
  //     text: 'dfgs',
  //     delFunc: () => {
  //       DeleteListWorkId(idDay);
  //     },
  //     setlistMounth: () => {
  //       setlistMounth(cleanMounth);
  //     },
  //   });
  // };
  const queryMount = id => {
    queryListMonth_ListWork_id(id).then(result => {
      setlistMonth(result);
    });
  };

  useEffect(() => {
    queryMount(Number(moment(selectedMount).format('YYYYMM')));
  }, []);
  return (
    <ScrollView contentContainerStyle={styles.view}>
      <View style={styles.calendarPickerWrap}>
        <CalendarPicker
          listMonth={listMonth}
          queryMount={queryMount}
          setselectedDay={setselectedDay}
          selectedDay={selectedDay}
          setselectedMount={setselectedMount}
        />
      </View>
      <View style={styles.selectedDayWrap}>
        <SelectedDay
          selectedDay={selectedDay}
          listMonth={listMonth}
          queryMount={queryMount}
          selectedMount={selectedMount}
        />
      </View>
      <View style={styles.monthStatsWrap}>
        <MonthStats listMonth={listMonth} navigation={navigation} />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  view: {
    backgroundColor: styleFile.view.backgroundColor,
    minHeight: '100%',
    margin: 0,
    flexDirection: 'column',
  },
  calendarPickerWrap: {
    marginBottom: 15,
    flexGrow: 0,
    flexShrink: 0,
    flexBasis: 'auto',
  },
  selectedDayWrap: {
    flexGrow: 1,
    flexShrink: 0,
    flexBasis: 'auto',
    marginBottom: 15,
  },
  monthStatsWrap: {
    flexGrow: 0,
    flexShrink: 0,
    flexBasis: 'auto',
  },
});

export default Main;
